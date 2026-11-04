import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { AnalogClock } from "@/components/site/analog-clock";
import { Eyebrow } from "@/components/site/marks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { company } from "@/lib/company";
import { submitQuote } from "@/lib/quote.functions";
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
  const [lead, setLead] = useState(false);

  const asked = useRef(false);
  const leadTimer = useRef(0);

  useEffect(() => {
    try {
      asked.current = sessionStorage.getItem("eqc-frame-lead") === "1";
    } catch {
      asked.current = false;
    }
  }, []);

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
      const next = total > 0 ? scrolled / total : 0;
      setP(next);
      if (!asked.current && next >= 0.96) {
        if (!leadTimer.current) {
          leadTimer.current = window.setTimeout(() => {
            asked.current = true;
            leadTimer.current = 0;
            setLead(true);
          }, 700);
        }
      } else if (next < 0.86 && leadTimer.current) {
        window.clearTimeout(leadTimer.current);
        leadTimer.current = 0;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (leadTimer.current) window.clearTimeout(leadTimer.current);
    };
  }, [reduce]);

  const hours = 11 + p * 4;
  const minutes = (p * 4 * 60) % 60;
  const time = formatWindow(p);
  const made = p > 0.55;

  return (
    <section ref={pin} id="window" className="relative h-[220vh] bg-navy text-cream md:h-[240vh]">
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden md:items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-3 px-5 pb-16 pt-20 sm:gap-8 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow tone="cream">The window</Eyebrow>
            <p className="font-sans text-6xl font-light leading-none tracking-tight tabular-nums sm:text-7xl md:text-[clamp(4.5rem,12vw,8rem)]">
              {time}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-snug text-cream md:mt-4 md:text-lg md:leading-relaxed">
              Don't keep your guests waiting. They dont like to wait.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-4 md:mt-6">
              <a
                href={`sms:${company.phoneTel}?body=${encodeURIComponent(
                  "Hey, I would like to request a cleaning.",
                )}`}
              >
                Text Us
              </a>
            </Button>
            <div className="mt-4 flex items-end gap-6 md:mt-10 md:gap-8">
              <div className="w-24 sm:w-36 md:w-44">
                <AnalogClock
                  hours={hours}
                  minutes={minutes}
                  windowProgress={p}
                  tone="cream"
                />
              </div>
              <div className="pb-1 text-[0.625rem] uppercase tracking-[0.18em] text-cream/80 md:pb-2 md:text-[0.6875rem] md:tracking-[0.2em]">
                <p className={cn("transition-colors", p < 0.15 ? "text-cream" : "text-cream/80")}>11:00 check-out</p>
                <p className="my-1 text-cream/75 md:my-2">↓</p>
                <p className={cn("transition-colors", p > 0.85 ? "text-cream" : "text-cream/80")}>3:00 guest-ready</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] max-h-[22vh] overflow-hidden rounded-xl bg-navy-2 sm:max-h-[32vh] sm:aspect-[3/2] lg:max-h-none">
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
      {lead ? (
        <FrameLead
          onClose={() => {
            setLead(false);
            try {
              sessionStorage.setItem("eqc-frame-lead", "1");
            } catch {
              /* private mode */
            }
          }}
        />
      ) : null}
    </section>
  );
}

function FrameLead({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const phoneOk = phone.replace(/\D/g, "").length >= 10;
    if (name.trim().length < 2 || !phoneOk) {
      setError("Name and a 10-digit phone number, so we can reach you.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const result = await submitQuote({
        data: {
          name: name.trim(),
          email: "",
          phone: phone.trim(),
          neighborhood: "",
          date,
          checkout: "",
          checkin: "",
          listing: "",
          lockbox: "",
          notes: address.trim() ? `Address: ${address.trim()}` : "",
          service: "airbnb",
          beds: 2,
          baths: 2,
          frequency: "once",
          sameDay: false,
          military: false,
          honeypot: "",
        },
      });
      if (result?.ok) {
        setSent(true);
        setBusy(false);
        return;
      }
    } catch {
      /* fall through */
    }
    setError("That did not send. Text us and we’ll take it from there.");
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-navy/35"
        aria-label="Dismiss"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="frame-lead-title"
        className="sheet-in relative w-full max-w-md rounded-t-2xl bg-cream px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-ink shadow-lift outline-none sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full text-ink hover:bg-sand"
        >
          <X className="size-5" />
        </button>
        <div className="pl-11">
          <h2 id="frame-lead-title" className="font-display text-3xl leading-none sm:text-4xl">
            {sent ? "Got it." : "The room’s ready."}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {sent
              ? "We’ll call about that date. Nothing is booked until you have the number."
              : "Name, number, address, and a date. We’ll quote before a crew is booked."}
          </p>
        </div>
        {sent ? null : (
          <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
            <div>
              <Label htmlFor="frame-name">Name</Label>
              <Input
                id="frame-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="frame-phone">Number</Label>
              <Input
                id="frame-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="frame-address">Address</Label>
              <Input
                id="frame-address"
                name="address"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="frame-date">Date</Label>
              <Input
                id="frame-date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {error ? (
              <p role="alert" className="text-sm font-medium text-red">
                {error}
              </p>
            ) : null}
            <Button type="submit" variant="primary" size="lg" className="mt-2 w-full" disabled={busy}>
              {busy ? "Sending…" : "Send"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
