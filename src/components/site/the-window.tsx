import { useEffect, useRef, useState } from "react";
import { AnalogClock } from "@/components/site/analog-clock";
import { Eyebrow } from "@/components/site/marks";
import { cn } from "@/lib/utils";

function formatWindow(progress: number) {
  const total = 11 * 60 + progress * 4 * 60;
  const h24 = Math.floor(total / 60);
  const m = Math.round(total % 60) % 60;
  const h = h24 % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

export function TheWindow() {
  const pin = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce) {
      setP(1);
      return;
    }
    const el = pin.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  const hours = 11 + p * 4;
  const minutes = (p * 4 * 60) % 60;
  const time = formatWindow(p);
  const made = p > 0.55;

  return (
    <section ref={pin} id="window" className="relative h-[240vh] bg-navy text-cream">
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow tone="cream">The window</Eyebrow>
            <p className="font-sans text-[clamp(4.5rem,12vw,8rem)] font-light leading-none tracking-tight tabular-nums">
              {time}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/85 md:text-base">
              Check-out to guest-ready. Scroll the clock. The room follows.
            </p>
            <div className="mt-10 flex items-end gap-8">
              <div className="w-36 sm:w-44">
                <AnalogClock
                  hours={hours}
                  minutes={minutes}
                  windowProgress={p}
                  tone="cream"
                />
              </div>
              <div className="pb-2 text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
                <p className={cn("transition-colors", p < 0.15 ? "text-cream" : "text-cream/80")}>11:00 check-out</p>
                <p className="my-2 text-cream/75">↓</p>
                <p className={cn("transition-colors", p > 0.85 ? "text-cream" : "text-cream/80")}>3:00 guest-ready</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-navy-2">
              <img
                src="/images/airbnb-checkout.webp"
                srcSet="/images/airbnb-checkout-800.webp 800w, /images/airbnb-checkout.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 58vw"
                alt="Airbnb bedroom after check-out"
                width={1200}
                height={800}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/images/airbnb-bedroom.webp"
                srcSet="/images/airbnb-bedroom-800.webp 800w, /images/airbnb-bedroom.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 58vw"
                alt="Same room, hotel-made"
                width={1200}
                height={800}
                className="absolute inset-0 size-full object-cover"
                style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute top-0 z-10 h-full w-px bg-cream/80"
                style={{ left: `${p * 100}%` }}
              >
                <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-between p-4 text-[0.625rem] uppercase tracking-[0.18em]">
                <span className={cn("rounded-full bg-navy/80 px-3 py-1", !made && "text-cream")}>
                  After check-out
                </span>
                <span className={cn("rounded-full bg-navy/80 px-3 py-1", made && "text-cream")}>
                  Guest-ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
