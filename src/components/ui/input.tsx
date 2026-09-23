import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-sm text-ink shadow-none outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-navy focus:ring-2 focus:ring-navy/15",
        className,
      )}
      {...props}
    />
  );
}
