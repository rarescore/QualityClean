export function webpSrcSet(src: string) {
  if (!src.endsWith(".webp")) return undefined;
  const base = src.replace(/\.webp$/, "");
  return `${base}-400.webp 400w, ${base}-800.webp 800w, ${src} 1600w`;
}

export function webp800(src: string) {
  if (!src.endsWith(".webp")) return src;
  return src.replace(/\.webp$/, "-800.webp");
}
