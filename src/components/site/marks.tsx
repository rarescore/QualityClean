import type { ReactNode } from "react";
import { AnalogClock } from "@/components/site/analog-clock";
import { cn } from "@/lib/utils";

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0.6 13.55 10.45 23.4 12 13.55 13.55 12 23.4 10.45 13.55 0.6 12 10.45 10.45Z" />
    </svg>
  );
}

export function Bolt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 36"
      className={cn("h-5 w-3", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.2 0 0 19.4h8.4L6.2 36 20 14.2h-8.1z" />
    </svg>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "red",
}: {
  children: ReactNode;
  className?: string;
  tone?: "red" | "cream" | "navy";
}) {
  const color =
    tone === "cream"
      ? "text-cream/80"
      : tone === "navy"
        ? "text-navy"
        : "text-red";
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em]",
        color,
        className,
      )}
    >
      <Sparkle className="size-3 shrink-0" />
      {children}
    </p>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Extreme Quality Clean Inc."
      className={cn("logo-mark h-10 w-[4.7rem]", className)}
    />
  );
}

export function ClockLockup({
  tone = "ink",
}: {
  tone?: "ink" | "cream";
}) {
  const time = tone === "cream" ? "text-cream" : "text-navy";
  const label = tone === "cream" ? "text-cream/80" : "text-muted";
  const clockTone = tone === "cream" ? "cream" : "navy";

  return (
    <div className="flex items-end gap-5 sm:gap-7">
      <div className="flex flex-col items-center">
        <AnalogClock hours={11} minutes={0} tone={clockTone} className="w-16 sm:w-20" />
        <p className={cn("mt-2 font-sans text-lg font-light tabular-nums tracking-tight sm:text-xl", time)}>
          11:00
        </p>
        <p className={cn("mt-0.5 text-[0.625rem] uppercase tracking-[0.2em]", label)}>
          Check-out
        </p>
      </div>
      <Bolt className="mb-10 h-8 w-4 text-red sm:mb-12 sm:h-9 sm:w-5" />
      <div className="flex flex-col items-center">
        <AnalogClock hours={3} minutes={0} windowProgress={1} tone={clockTone} className="w-16 sm:w-20" />
        <p className={cn("mt-2 font-sans text-lg font-light tabular-nums tracking-tight sm:text-xl", time)}>
          3:00
        </p>
        <p className={cn("mt-0.5 text-[0.625rem] uppercase tracking-[0.2em]", label)}>
          Guest-ready
        </p>
      </div>
    </div>
  );
}
