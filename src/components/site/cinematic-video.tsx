import { useEffect, useRef } from "react";
import { webp800 } from "@/lib/img";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
  priority?: boolean;
  mobileSrc?: string;
  mobilePoster?: string;
};

export function CinematicVideo({
  src,
  poster,
  className,
  alt = "",
  priority = false,
  mobileSrc,
  mobilePoster,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const poster800 = webp800(poster);
  const phoneStill = mobilePoster ?? poster;

  useEffect(() => {
    const el = ref.current;
    if (!el || priority) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (reduce || nav.connection?.saveData) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      el.src = mobile && mobileSrc ? mobileSrc : src;
      el.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, mobileSrc, priority]);

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <picture>
        {mobilePoster ? (
          <source media="(max-width: 767px)" srcSet={phoneStill} type="image/webp" />
        ) : (
          <source media="(max-width: 767px)" srcSet={poster800} type="image/webp" />
        )}
        <source media="(min-width: 768px)" srcSet={poster} type="image/webp" />
        <img
          src={priority && mobilePoster ? phoneStill : poster800}
          alt={alt}
          width={1216}
          height={2160}
          className="absolute inset-0 size-full object-cover"
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      <video
        ref={ref}
        className="cinematic-video absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        autoPlay={priority}
        preload={priority ? "auto" : "none"}
        poster={priority ? phoneStill : undefined}
        aria-hidden="true"
      >
        {priority && mobileSrc ? (
          <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
        ) : null}
        {priority ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}