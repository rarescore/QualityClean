import { useMemo, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/company";
import {
  estimateRange,
  frequencyOptions,
  serviceOptions,
  type FrequencyId,
  type ServiceId,
} from "@/lib/estimate";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "eqc-quotes";

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
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const estimate = useMemo(
    () => estimateRange({ service, beds, baths, frequency, sameDay }),
    [service, beds, baths, frequency, sameDay],
  );

  const serviceLabel = serviceOptions.find((s) => s.id === service)?.label ?? service;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot.trim()) return;
    if (busy) return;

    const nameOk = name.trim().length >= 2;
    const phoneOk = digits(phone).length >= 10;
    if (!nameOk || !phoneOk) {
      const msg = "Name and a 10-digit phone number are required so we can quote you.";
      setError(msg);
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      const msg = "That email does not look valid.";
      setError(msg);
      return;
    }

    setError("");
    setBusy(true);

    const payload = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
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
      estimateNote: estimate.note,
    };

    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...prev].slice(0, 25)));
    } catch {
      /* ignore quota */
    }

    const lines = [
      `Quote request — ${serviceLabel}`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : null,
      payload.neighborhood ? `Neighborhood: ${payload.neighborhood}` : null,
      `Bedrooms: ${beds} · Bathrooms: ${baths} · Cadence: ${frequency}`,
      payload.date ? `Preferred date: ${payload.date}` : null,
      service === "airbnb"
        ? `Check-out ${checkout} / Check-in ${checkin}${payload.listing ? ` · ${payload.listing}` : ""}`
        : null,
      sameDay ? "Same-day if possible" : null,
      military ? "Senior / military discount requested" : null,
      payload.notes ? `Notes: ${payload.notes}` : null,
      "",
      "Sent from extremequalityclean.com/quote",
    ].filter(Boolean);

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      `Quote request — ${serviceLabel} — ${payload.name}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
    setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-navy p-8 text-cream md:p-10" role="status">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red">
          <Check className="size-6" aria-hidden />
        </div>
        <h3 className="font-display text-3xl">Open the message, or call.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/85">
          Thank you, {name.split(" ")[0]}. Your email app should open a message
          to {company.email}. If nothing opened, call us — we pick up 24/7. We
          do not confirm a price until a coordinator has the rooms.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="cream">
            <a href={`tel:${company.phoneTel}`}>Call {company.phoneDisplay}</a>
          </Button>
          <Button asChild variant="invert">
            <a href={`mailto:${company.email}`}>Email {company.email}</a>
          </Button>
          <Button
            type="button"
            variant="invert"
            onClick={() => {
              setSent(false);
              setNotes("");
              setError("");
            }}
          >
            Edit and resend
          </Button>
        </div>
      </div>
    );
  }

  return (
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

      {error ? (
        <p id="quote-error" role="alert" className="text-sm text-red">
          {error}
        </p>
      ) : null}

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
              before a crew is booked — no surprise add-ons at the door. Submitting
              opens an email to us; if it doesn’t, call.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? "Opening email…" : "Request this quote"}
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
  );
}
