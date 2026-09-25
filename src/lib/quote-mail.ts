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
  const { subject, text, fields } = quoteMessage(input);
  try {
    const res = await fetch("https://email.gosecureserver.in/api/send.php", {
      method: "POST",
      redirect: "manual",
      signal: AbortSignal.timeout(12000),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        to: company.quotesEmail,
        subject,
        name: input.name,
        email: input.email || company.quotesEmail,
        phone: input.phone,
        service: fields.service,
        message: text,
        hp_email: "",
      }),
    });
    const location = res.headers.get("location") ?? "";
    if ((res.status === 302 || res.status === 303) && /thank/i.test(location)) return "sent";
    if (res.ok) return "sent";
    return "failed";
  } catch {
    return "failed";
  }
}
