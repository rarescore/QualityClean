export const serviceOptions = [
  { id: "airbnb", label: "Airbnb turnover" },
  { id: "recurring", label: "Recurring home clean" },
  { id: "deep", label: "Deep clean" },
  { id: "move", label: "Move-in / move-out" },
  { id: "commercial", label: "Commercial / office" },
  { id: "carpet", label: "Carpet & floors" },
  { id: "windows", label: "Window cleaning" },
] as const;

export type ServiceId = (typeof serviceOptions)[number]["id"];

export const frequencyOptions = [
  { id: "once", label: "One time" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Every other week" },
  { id: "monthly", label: "Monthly" },
] as const;

export type FrequencyId = (typeof frequencyOptions)[number]["id"];

export type EstimateInput = {
  service: ServiceId;
  beds: number;
  baths: number;
  frequency: FrequencyId;
  sameDay: boolean;
};

export type EstimateResult = {
  low: number;
  high: number;
  note: string;
  custom: boolean;
};

function roundTo(n: number, step = 5) {
  return Math.round(n / step) * step;
}

export function estimateRange(input: EstimateInput): EstimateResult {
  const beds = Math.max(0, Math.min(8, input.beds));
  const baths = Math.max(1, Math.min(8, input.baths));

  if (input.service === "commercial") {
    return {
      low: 0,
      high: 0,
      custom: true,
      note: "Commercial work is quoted from a walkthrough or a few photos — usually the same day you call.",
    };
  }

  let base = 0;
  switch (input.service) {
    case "airbnb":
      base = 135 + beds * 38 + baths * 28;
      break;
    case "recurring":
      base = 120 + beds * 32 + baths * 24;
      break;
    case "deep":
      base = 195 + beds * 48 + baths * 36;
      break;
    case "move":
      base = 240 + beds * 55 + baths * 42;
      break;
    case "carpet":
      base = 95 + (beds + 1) * 45;
      break;
    case "windows":
      base = 110 + (beds + baths) * 22;
      break;
  }

  const freq =
    input.frequency === "weekly"
      ? 0.84
      : input.frequency === "biweekly"
        ? 0.92
        : input.frequency === "monthly"
          ? 0.97
          : 1;
  base *= freq;
  if (input.sameDay) base *= 1.18;

  const low = roundTo(base * 0.88);
  const high = roundTo(base * 1.14);

  const serviceLabel =
    serviceOptions.find((s) => s.id === input.service)?.label ?? "this service";

  return {
    low,
    high,
    custom: false,
    note: `Typical range for ${serviceLabel.toLowerCase()} — final price is given before we begin.`,
  };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
