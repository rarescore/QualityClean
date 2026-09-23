import { webpSrcSet } from "@/lib/img";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
};

export function SmartImg({
  src,
  alt,
  className,
  width = 1200,
  height = 800,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  decorative = false,
}: Props) {
  return (
    <img
      src={src.replace(/\.webp$/, "-800.webp")}
      srcSet={webpSrcSet(src)}
      sizes={sizes}
      alt={decorative ? "" : alt}
      width={width}
      height={height}
      className={cn("bg-sand object-cover", className)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
