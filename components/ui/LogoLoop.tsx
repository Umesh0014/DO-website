"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
} from "react";

import "./LogoLoop.css";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

type LogoNodeItem = {
  ariaLabel?: string;
  href?: string;
  node: ReactNode;
  title?: string;
};

type LogoImageItem = {
  alt?: string;
  height?: number;
  href?: string;
  sizes?: string;
  src: string;
  srcSet?: string;
  title?: string;
  width?: number;
};

export type LogoItem = LogoNodeItem | LogoImageItem;

type LogoLoopProps = {
  ariaLabel?: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  fadeOut?: boolean;
  fadeOutColor?: string;
  gap?: number;
  hoverSpeed?: number;
  logoHeight?: number;
  logos: LogoItem[];
  pauseOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  scaleOnHover?: boolean;
  speed?: number;
  style?: CSSProperties;
  width?: number | string;
};

type LogoLoopStyle = CSSProperties & {
  "--logoloop-fadeColor"?: string;
  "--logoloop-gap": string;
  "--logoloop-logoHeight": string;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === "up" || direction === "down";
  const effectiveHoverSpeed =
    hoverSpeed ?? (pauseOnHover === false ? undefined : 0);
  const directionMultiplier =
    direction === "left" || direction === "up" ? 1 : -1;
  const targetVelocity =
    Math.abs(speed) * directionMultiplier * (speed < 0 ? -1 : 1);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = seqRef.current;

    if (!container || !sequence) return;

    const sequenceRect = sequence.getBoundingClientRect();
    const sequenceWidth = Math.ceil(sequenceRect.width);
    const sequenceHeight = Math.ceil(sequenceRect.height);

    if (isVertical) {
      const parentHeight = container.parentElement?.clientHeight ?? 0;
      if (parentHeight > 0) container.style.height = `${Math.ceil(parentHeight)}px`;
      if (sequenceHeight > 0) {
        setSeqHeight(sequenceHeight);
        const viewport = container.clientHeight || parentHeight || sequenceHeight;
        setCopyCount(
          Math.max(
            ANIMATION_CONFIG.MIN_COPIES,
            Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM,
          ),
        );
      }
      return;
    }

    if (sequenceWidth > 0) {
      setSeqWidth(sequenceWidth);
      setCopyCount(
        Math.max(
          ANIMATION_CONFIG.MIN_COPIES,
          Math.ceil(container.clientWidth / sequenceWidth) +
            ANIMATION_CONFIG.COPY_HEADROOM,
        ),
      );
    }
  }, [isVertical]);

  useEffect(() => {
    const container = containerRef.current;
    const sequence = seqRef.current;
    if (!container || !sequence) return;

    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    observer.observe(sequence);
    updateDimensions();
    return () => observer.disconnect();
  }, [gap, logoHeight, logos, updateDimensions]);

  useEffect(() => {
    const images = Array.from(seqRef.current?.querySelectorAll("img") ?? []);
    if (images.length === 0) {
      updateDimensions();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) updateDimensions();
    };

    images.forEach((image) => {
      if (image.complete) handleImageLoad();
      else {
        image.addEventListener("load", handleImageLoad, { once: true });
        image.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
        image.removeEventListener("error", handleImageLoad);
      });
    };
  }, [gap, logoHeight, logos, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sequenceSize = isVertical ? seqHeight : seqWidth;
    if (sequenceSize > 0) {
      offsetRef.current =
        ((offsetRef.current % sequenceSize) + sequenceSize) % sequenceSize;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target =
        isHovered && effectiveHoverSpeed !== undefined
          ? effectiveHoverSpeed
          : targetVelocity;
      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sequenceSize > 0) {
        const nextOffset =
          offsetRef.current + velocityRef.current * deltaTime;
        offsetRef.current =
          ((nextOffset % sequenceSize) + sequenceSize) % sequenceSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [effectiveHoverSpeed, isHovered, isVertical, seqHeight, seqWidth, targetVelocity]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key}>
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = "node" in item;
      const content = isNodeItem ? (
        <span
          className="logoloop__node"
          aria-hidden={Boolean(item.href && !item.ariaLabel)}
        >
          {item.node}
        </span>
      ) : (
        // Dynamic logo sources are intentionally supported for future replacements.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const itemAriaLabel = isNodeItem
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;

      return (
        <li className="logoloop__item" key={key}>
          {item.href ? (
            <a
              className="logoloop__link"
              href={item.href}
              aria-label={itemAriaLabel || "Logo link"}
              target="_blank"
              rel="noreferrer noopener"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </li>
      );
    },
    [renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  const containerStyle = useMemo<LogoLoopStyle>(
    () => ({
      width: isVertical
        ? toCssLength(width) === "100%"
          ? undefined
          : toCssLength(width)
        : toCssLength(width) ?? "100%",
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
      ...style,
    }),
    [fadeOutColor, gap, isVertical, logoHeight, style, width],
  );

  const rootClassName = [
    "logoloop",
    isVertical ? "logoloop--vertical" : "logoloop--horizontal",
    fadeOut ? "logoloop--fade" : "",
    scaleOnHover ? "logoloop--scale-hover" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => {
          if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }}
      >
        {logoLists}
      </div>
    </div>
  );
});

export default LogoLoop;
