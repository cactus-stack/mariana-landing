"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

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
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduce = useReducedMotion();

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (reduce || images.length < 2 || timer.current) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, ADVANCE_MS);
  }, [images.length, reduce]);

  // An interval that outlives the component would keep setting state on an
  // unmounted tree, so it is always torn down.
  useEffect(() => stop, [stop]);

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
        {images.map((image, i) => (
          <Image
            key={image.src}
            className={i === index ? "is-active" : undefined}
            src={image.src}
            alt={i === 0 ? image.alt : ""}
            aria-hidden={i === 0 ? undefined : true}
            fill
            sizes="(max-width: 620px) 100vw, 58vw"
          />
        ))}
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
                setIndex(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
