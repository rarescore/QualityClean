import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";
import {
  frequencyOptions,
  serviceOptions,
  type FrequencyId,
  type ServiceId,
} from "@/lib/estimate";
import { deliverQuote, quoteMessage, type QuoteInput } from "@/lib/quote-mail";
import { submitQuote } from "@/lib/quote.functions";
import { cn } from "@/lib/utils";

type Props = {
  defaultService?: ServiceId;
  compact?: boolean;
};

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function QuoteForm({ defaultService = "airbnb", compact = false }: Props) {
  const [service, setService] = useState<ServiceId>(defaultService);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(2);
  const [frequency, setFrequency] = useState<FrequencyId>("once");
  const [sameDay, setSameDay] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [date, setDate] = useState("");
  const [checkout, setCheckout] = useState("11:00");
  const [checkin, setCheckin] = useState("15:00");
  const [listing, setListing] = useState("");
  const [notes, setNotes] = useState("");
  const [military, setMilitary] = useState(false);
  const [sent, setSent] = useState<"email" | "activate" | "mailto" | null>(null);
  const [mailHref, setMailHref] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (!error) return;
    document.getElementById("quote-error")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [error]);

  const closeThanks = useCallback(() => setSent(null), []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot.trim()) {
      setSent("email");
      return;
    }
    if (busy) return;

    const nameOk = name.trim().length >= 2;
    const phoneOk = digits(phone).length >= 10;
    if (!nameOk || !phoneOk) {
      setError("Name and a 10-digit phone number are required so we can quote you.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email does not look valid.");
      return;
    }

    setError("");
    setBusy(true);

    const payload: QuoteInput = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      neighborhood: neighborhood.trim(),
      date,
      checkout,
      checkin,
      listing: listing.trim(),
      notes: notes.trim(),
      service,
      beds,
      baths,
      frequency,
      sameDay,
      military,
    };

    const mail = quoteMessage(payload);
    const href = `mailto:${company.quotesEmail}?subject=${encodeURIComponent(
      mail.subject,
    )}&body=${encodeURIComponent(`${mail.text}\n\nSent from extremequalityclean.com/quote`)}`;
    setMailHref(href);

    const direct = await deliverQuote(payload);
    if (direct === "sent") {
      setSent("email");
      setBusy(false);
      return;
    }
    if (direct === "queued") {
      setSent("activate");
      setBusy(false);
      return;
    }

    try {
      const result = await Promise.race([
        submitQuote({ data: { ...payload, honeypot: "" } }),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 9000)),
      ]);
      if (result?.ok) {
        setSent(result.delivery === "queued" ? "activate" : "email");
        setBusy(false);
        return;
      }
    } catch {
      /* show the on-page email link below */
    }

    setSent("mailto");
    setBusy(false);
  }

  const first = name.split(" ")[0];

  return (
    <>
      {sent ? (
        <ThankYouDialog
          first={first}
          kind={sent}
          mailHref={mailHref}
          onClose={closeThanks}
        />
      ) : null}
      <form onSubmit={onSubmit} className="relative grid gap-6" noValidate>
      <div
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div
        className={cn(
          "grid items-start gap-6",
          compact ? "lg:grid-cols-1" : "lg:grid-cols-5",
        )}
      >
        <div className={cn("min-w-0 space-y-4", compact ? "" : "lg:col-span-3")}>
          <div>
            <Label htmlFor="service">Service</Label>
            <select
              id="service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value as ServiceId)}
              className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
            >
              {serviceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="beds">Bedrooms</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                min={0}
                max={8}
                inputMode="numeric"
                value={beds}
                onChange={(e) => setBeds(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="baths">Bathrooms</Label>
              <Input
                id="baths"
                name="baths"
                type="number"
                min={1}
                max={8}
                inputMode="numeric"
                value={baths}
                onChange={(e) => setBaths(Number(e.target.value))}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="frequency">Cadence</Label>
              <select
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as FrequencyId)}
                className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
              >
                {frequencyOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                autoComplete="name"
                value={name}
                aria-invalid={Boolean(error) && name.trim().length < 2}
                aria-describedby={error ? "quote-error" : undefined}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                aria-invalid={Boolean(error) && digits(phone).length < 10}
                aria-describedby={error ? "quote-error" : undefined}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="neighborhood">Neighborhood</Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                autoComplete="address-level2"
                placeholder="Sherman Oaks, Santa Monica…"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Preferred date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {service === "airbnb" && (
              <>
                <div>
                  <Label htmlFor="checkout">Check-out</Label>
                  <Input
                    id="checkout"
                    name="checkout"
                    type="time"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="checkin">Check-in</Label>
                  <Input
                    id="checkin"
                    name="checkin"
                    type="time"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="listing">Listing URL</Label>
                  <Input
                    id="listing"
                    name="listing"
                    type="url"
                    inputMode="url"
                    placeholder="airbnb.com/rooms/…"
                    value={listing}
                    onChange={(e) => setListing(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col justify-end gap-2 pb-1">
              <label className="flex h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="sameDay"
                  checked={sameDay}
                  onChange={(e) => setSameDay(e.target.checked)}
                  className="size-4 accent-red"
                />
                Same-day if possible
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="military"
                  checked={military}
                  onChange={(e) => setMilitary(e.target.checked)}
                  className="size-4 accent-red"
                />
                Senior / military discount
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Access, linens, anything we should know</Label>
            <Textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Lockbox code timing, pets, extra add-ons, square footage…"
            />
          </div>
        </div>

        <aside
          className={cn(
            "flex flex-col justify-between rounded-xl bg-navy p-6 text-cream lg:sticky lg:top-28",
            compact ? "" : "lg:col-span-2",
          )}
        >
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-cream/75">
              Before we start
            </p>
            <p className="mt-3 font-display text-4xl leading-none md:text-5xl">
              Quoted first.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/85">
              Tell us the property and the window. You get the number in writing
              before a crew is booked — no surprise add-ons at the door. This
              request is emailed straight to our office.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {error ? (
              <p id="quote-error" role="alert" className="text-sm font-medium text-cream">
                {error}
              </p>
            ) : null}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? "Sending…" : "Request this quote"}
            </Button>
            <a
              href={`tel:${company.phoneTel}`}
              className="block text-center text-sm text-cream/85 hover:text-cream"
            >
              Or call {company.phoneDisplay} — 24/7
            </a>
          </div>
        </aside>
      </div>
    </form>
    </>
  );
}

function ThankYouDialog({
  first,
  kind,
  mailHref,
  onClose,
}: {
  first: string;
  kind: "email" | "activate" | "mailto";
  mailHref: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const sent = kind !== "mailto";

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

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-navy/70"
        aria-label="Close thank you message"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-thanks-title"
        className="relative w-full max-w-md rounded-xl bg-navy p-8 text-cream shadow-card outline-none"
      >
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red">
          <Check className="size-6" aria-hidden />
        </div>
        <h3 id="quote-thanks-title" className="font-display text-4xl leading-none">
          {sent ? "Thank you." : "One more step."}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-cream/85">
          {sent
            ? `Thank you, ${first || "there"}. Your request was sent. We’ll call or email you. We do not confirm a price until we’ve seen the rooms.`
            : `Thank you, ${first || "there"}. This did not send on its own. Click below and send the message that opens so the office gets it.`}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {sent ? (
            <Button type="button" variant="cream" onClick={onClose}>
              Done
            </Button>
          ) : (
            <Button asChild variant="cream">
              <a href={mailHref}>Email this request</a>
            </Button>
          )}
          <Button asChild variant="invert">
            <a href={`tel:${company.phoneTel}`}>Call {company.phoneDisplay}</a>
          </Button>
          {!sent ? (
            <Button type="button" variant="invert" onClick={onClose}>
              Close
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
