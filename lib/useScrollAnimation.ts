"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "./gsap";

interface ScrollAnimationOptions {
  /** CSS selector for children to stagger (e.g. ".card") */
  stagger?: string;
  /** Stagger delay between children (default 0.15) */
  staggerDelay?: number;
  /** Animation duration per element (default 0.8) */
  duration?: number;
  /** Y offset to animate from (default 60) */
  y?: number;
  /** Start position for ScrollTrigger (default "top 85%") */
  start?: string;
  /** Whether to animate the container itself (default true) */
  animateContainer?: boolean;
}

/**
 * Hook for scroll-triggered fade-in animations.
 * Returns a ref to attach to the container element.
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    stagger,
    staggerDelay = 0.15,
    duration = 0.8,
    y = 60,
    start = "top 85%",
    animateContainer = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (stagger) {
        const children = containerRef.current.querySelectorAll(stagger);
        if (children.length === 0) return;

        gsap.set(children, { opacity: 0, y });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          once: true,
          onEnter: () => {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration,
              stagger: staggerDelay,
              ease: "power3.out",
            });
          },
        });
      } else if (animateContainer) {
        gsap.set(containerRef.current, { opacity: 0, y });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          once: true,
          onEnter: () => {
            gsap.to(containerRef.current, {
              opacity: 1,
              y: 0,
              duration,
              ease: "power3.out",
            });
          },
        });
      }
    },
    { scope: containerRef }
  );

  return containerRef;
}

/**
 * Hook for animating number counters on scroll.
 * Returns a ref to attach to the container with [data-count] elements.
 */
export function useCountUp(duration = 2) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const counters = containerRef.current.querySelectorAll("[data-count]");
      if (counters.length === 0) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          counters.forEach((el) => {
            const target = parseFloat(el.getAttribute("data-count") || "0");
            const prefix = el.getAttribute("data-prefix") || "";
            const suffix = el.getAttribute("data-suffix") || "";
            const decimals = target % 1 !== 0 ? 1 : 0;
            const obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
              },
            });
          });
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
