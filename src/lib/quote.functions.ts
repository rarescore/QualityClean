import { createServerFn } from "@tanstack/react-start";
import {
  frequencyOptions,
  serviceOptions,
  type FrequencyId,
  type ServiceId,
} from "@/lib/estimate";
import { deliverQuote, type QuoteInput } from "@/lib/quote-mail";

const serviceIds = new Set<string>(serviceOptions.map((option) => option.id));
const frequencyIds = new Set<string>(frequencyOptions.map((option) => option.id));

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function asService(value: unknown): ServiceId {
  return typeof value === "string" && serviceIds.has(value)
    ? (value as ServiceId)
    : "airbnb";
}

function asFrequency(value: unknown): FrequencyId {
  return typeof value === "string" && frequencyIds.has(value)
    ? (value as FrequencyId)
    : "once";
}

export const submitQuote = createServerFn({ method: "POST" })
  .validator((raw: unknown) => {
    if (!raw || typeof raw !== "object") throw new Error("Invalid quote.");
    const data = raw as Record<string, unknown>;
    const honeypot = clip(data.honeypot, 200);
    const name = clip(data.name, 80);
    const email = clip(data.email, 120);
    const phone = clip(data.phone, 30);
    const digits = phone.replace(/\D/g, "");
    if (honeypot) {
      return { honeypot, quote: null as QuoteInput | null };
    }
    if (name.length < 2 || digits.length < 10) {
      throw new Error("Name and a 10-digit phone number are required.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("That email does not look valid.");
    }
    const beds = Number(data.beds);
    const baths = Number(data.baths);
    const quote: QuoteInput = {
      name,
      email,
      phone,
      neighborhood: clip(data.neighborhood, 80),
      date: clip(data.date, 20),
      checkout: clip(data.checkout, 8),
      checkin: clip(data.checkin, 8),
      listing: clip(data.listing, 300),
      notes: clip(data.notes, 2000),
      service: asService(data.service),
      beds: Number.isFinite(beds) ? Math.max(0, Math.min(8, Math.round(beds))) : 0,
      baths: Number.isFinite(baths) ? Math.max(1, Math.min(8, Math.round(baths))) : 1,
      frequency: asFrequency(data.frequency),
      sameDay: data.sameDay === true,
      military: data.military === true,
    };
    return { honeypot: "", quote };
  })
  .handler(async ({ data }) => {
    if (!data.quote) return { ok: true as const, delivery: "sent" as const };
    const delivery = await deliverQuote(data.quote);
    return { ok: delivery === "sent" || delivery === "queued", delivery };
  });
