"use client";

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

type ParallaxComponentProps = ComponentPropsWithoutRef<"section"> & {
  backgroundImage: string;
};

export function ParallaxComponent({
  backgroundImage,
  children,
  className = "hero",
  style,
  ...props
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = parallaxRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const background = root.querySelector<HTMLElement>(
        '[data-parallax-layer="background"]',
      );
      const copy = root.querySelector<HTMLElement>(
        '[data-parallax-layer="copy"]',
      );
      const product = root.querySelector<HTMLElement>(
        '[data-parallax-layer="product"]',
      );
      const grass = root.querySelector<HTMLElement>(
        '[data-parallax-layer="grass"]',
      );
      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: isMobile ? 0.45 : 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        root,
        { "--hero-bg-y": isMobile ? "20px" : "72px" },
        0,
      );

      if (background) {
        timeline.to(
          background,
          { "--hero-wash-y": isMobile ? "10px" : "34px" },
          0,
        );
      }

      if (copy) {
        timeline.to(
          copy,
          {
            "--hero-copy-y": isMobile ? "-18px" : "-72px",
            "--hero-copy-opacity": isMobile ? 0.74 : 0.18,
          },
          0,
        );
      }

      if (product) {
        timeline.to(
          product,
          {
            "--hero-product-y": isMobile ? "30px" : "96px",
            "--hero-product-scale": isMobile ? 0.99 : 0.955,
          },
          0,
        );
      }

      if (grass) {
        timeline.to(
          grass,
          { "--hero-grass-y": isMobile ? "50px" : "120px" },
          0,
        );
      }

      if (isMobile) {
        return () => timeline.scrollTrigger?.kill();
      }

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      const handleLenisScroll = () => ScrollTrigger.update();
      const tick = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", handleLenisScroll);
      gsap.ticker.add(tick);

      return () => {
        timeline.scrollTrigger?.kill();
        gsap.ticker.remove(tick);
        lenis.off("scroll", handleLenisScroll);
        lenis.destroy();
      };
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={parallaxRef}
      className={className}
      data-parallax-hero
      style={{ ...style, backgroundImage: `url("${backgroundImage}")` }}
      {...props}
    >
      {children}
    </section>
  );
}
