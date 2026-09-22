"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type UseCaseMediaItem = {
  src: string;
  alt: string;
};

type UseCaseMediaProps = {
  images: readonly UseCaseMediaItem[];
  /** Used to label the controls, e.g. "Transporte urbano". */
  label: string;
};

const ADVANCE_MS = 1400;

/**
 * Cycles through several photographs of the same unit.
 *
 * Hover drives it on pointer devices, which is what the client asked for, but
 * hover alone would hide the extra angles from every phone visitor. The dots
 * below the frame are real buttons, so touch and keyboard reach the same
 * photographs. Under reduced motion the frame never advances on its own and
 * the crossfade is dropped; the dots still work.
 */
export function UseCaseMedia({ images, label }: UseCaseMediaProps) {
  const [index, setIndex] = useState(0);
  const [loadAlternates, setLoadAlternates] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setLoadAlternates(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || images.length < 2 || timer.current) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, ADVANCE_MS);
  }, [images.length]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopWhenReduced = () => {
      if (reducedMotion.matches) stop();
    };
    reducedMotion.addEventListener("change", stopWhenReduced);
    return () => {
      stop();
      reducedMotion.removeEventListener("change", stopWhenReduced);
    };
  }, [stop]);

  const handleLeave = useCallback(() => {
    stop();
    setIndex(0);
  }, [stop]);

  return (
    <div className="use-media">
      <div
        className="use-image"
        onMouseEnter={start}
        onMouseLeave={handleLeave}
      >
        {images.map((image, i) => (i === 0 || loadAlternates) ? (
          <Image
            key={image.src}
            className={i === index ? "is-active" : undefined}
            src={image.src}
            alt={i === index ? image.alt : ""}
            aria-hidden={i === index ? undefined : true}
            fill
            sizes="(max-width: 620px) 100vw, 58vw"
          />
        ) : null)}
      </div>
      {images.length > 1 ? (
        <div className="use-dots" role="group" aria-label={`Fotos de ${label.toLowerCase()}`}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={i === index ? "is-active" : undefined}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === index}
              onClick={() => {
                stop();
                setLoadAlternates(true);
                setIndex(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
