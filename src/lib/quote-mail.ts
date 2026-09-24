import { company } from "@/lib/company";
import {
  frequencyOptions,
  serviceOptions,
  type FrequencyId,
  type ServiceId,
} from "@/lib/estimate";

export type QuoteInput = {
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  date: string;
  checkout: string;
  checkin: string;
  listing: string;
  notes: string;
  service: ServiceId;
  beds: number;
  baths: number;
  frequency: FrequencyId;
  sameDay: boolean;
  military: boolean;
};

export type QuoteDelivery = "sent" | "queued" | "limited" | "failed";

function label(id: string, options: readonly { id: string; label: string }[]) {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function quoteMessage(input: QuoteInput) {
  const serviceLabel = label(input.service, serviceOptions);
  const cadence = label(input.frequency, frequencyOptions);
  const lines = [
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : "Email: not given",
    input.neighborhood ? `Neighborhood: ${input.neighborhood}` : null,
    `Service: ${serviceLabel}`,
    `Bedrooms: ${input.beds}`,
    `Bathrooms: ${input.baths}`,
    `Cadence: ${cadence}`,
    input.date ? `Preferred date: ${input.date}` : null,
    input.service === "airbnb" ? `Check-out: ${input.checkout || "—"}` : null,
    input.service === "airbnb" ? `Check-in: ${input.checkin || "—"}` : null,
    input.listing ? `Listing: ${input.listing}` : null,
    input.sameDay ? "Same-day if possible: yes" : null,
    input.military ? "Senior / military discount: requested" : null,
    input.notes ? `Notes: ${input.notes}` : null,
  ].filter((line): line is string => Boolean(line));

  const fields: Record<string, string> = {
    _subject: `Quote request — ${serviceLabel} — ${input.name}`,
    _template: "table",
    _captcha: "false",
    _url: "https://www.extremequalityclean.com/quote",
    name: input.name,
    phone: input.phone,
    service: serviceLabel,
    message: lines.join("\n"),
  };
  if (input.email) {
    fields.email = input.email;
    fields._replyto = input.email;
  }

  return { subject: fields._subject, text: lines.join("\n"), fields };
}

export async function deliverQuote(input: QuoteInput): Promise<QuoteDelivery> {
  const { fields } = quoteMessage(input);
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(company.quotesEmail)}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      },
    );
    const body = (await res.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;
    const message = body?.message ?? "";
    const success = body?.success === true || body?.success === "true";
    if (success) return "sent";
    if (/activat/i.test(message)) return "queued";
    if (res.status === 429 || /rate limit/i.test(message)) return "limited";
    return "failed";
  } catch {
    return "failed";
  }
}
