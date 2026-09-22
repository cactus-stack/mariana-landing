"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Content is visible in the server HTML, with or without JavaScript. Enhance
 * only sections below the fold, so animation never delays the initial paint.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches || !window.IntersectionObserver || !element.animate) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reducedMotion.matches) return;
      animation = element.animate(
        [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "none" }],
        { duration: 600, delay: delay * 1000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" },
      );
    }, { threshold: 0.1 });
    const stopMotion = () => {
      if (reducedMotion.matches) animation?.cancel();
    };

    observer.observe(element);
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
