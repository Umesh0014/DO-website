"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

import "./ScrollReveal.css";

type ScrollRevealProps = {
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  children: ReactNode;
  containerClassName?: string;
  enableBlur?: boolean;
  rotationEnd?: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  textClassName?: string;
  wordAnimationEnd?: string;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) =>
      /^\s+$/.test(word) ? (
        word
      ) : (
        <span className="scroll-reveal-word" key={`${word}-${index}`}>
          {word}
        </span>
      ),
    );
  }, [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let cancelled = false;
    let animationContext: { revert: () => void } | undefined;

    const setupAnimation = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const scroller = scrollContainerRef?.current ?? window;

      animationContext = gsap.context(() => {
        gsap.fromTo(
          element,
          { rotate: baseRotation, transformOrigin: "0% 50%" },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
            },
          },
        );

        const words = element.querySelectorAll<HTMLElement>(
          ".scroll-reveal-word",
        );

        gsap.fromTo(
          words,
          { opacity: baseOpacity, willChange: "opacity, filter" },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );

        if (enableBlur) {
          gsap.fromTo(
            words,
            { filter: `blur(${blurStrength}px)` },
            {
              filter: "blur(0px)",
              ease: "none",
              stagger: 0.05,
              scrollTrigger: {
                trigger: element,
                scroller,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }
      }, element);
    };

    void setupAnimation();

    return () => {
      cancelled = true;
      animationContext?.revert();
    };
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    rotationEnd,
    scrollContainerRef,
    wordAnimationEnd,
  ]);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`.trim()}
    >
      <p className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</p>
    </div>
  );
}
