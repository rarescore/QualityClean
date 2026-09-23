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
};

export function CinematicVideo({
  src,
  poster,
  className,
  alt = "",
  priority = false,
  mobileSrc,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const poster800 = webp800(poster);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (reduce || nav.connection?.saveData) return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const pick = mobileSrc && mobile ? mobileSrc : src;
    const start = () => {
      if (el.getAttribute("src") !== pick) {
        el.src = pick;
      }
      el.play().catch(() => {});
    };
    const wait = priority ? (mobile ? 2800 : 900) : mobile ? 5000 : 1800;
    const t = window.setTimeout(start, wait);
    return () => window.clearTimeout(t);
  }, [src, mobileSrc, priority]);

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <picture>
        <source media="(max-width: 767px)" srcSet={poster800} type="image/webp" />
        <source media="(min-width: 768px)" srcSet={poster} type="image/webp" />
        <img
          src={poster800}
          alt={alt}
          width={1280}
          height={720}
          className="absolute inset-0 size-full object-cover"
          fetchPriority={priority ? "high" : "auto"}
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
        preload="none"
        poster={poster800}
        aria-hidden="true"
      />
    </div>
  );
}
