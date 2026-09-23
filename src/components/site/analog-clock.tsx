import { cn } from "@/lib/utils";

type Props = {
  hours: number;
  minutes?: number;
  windowProgress?: number;
  tone?: "cream" | "navy";
  className?: string;
};

function polar(cx: number, cy: number, r: number, degFrom12: number) {
  const a = ((degFrom12 - 90) * Math.PI) / 180;
  return [
    Number((cx + r * Math.cos(a)).toFixed(3)),
    Number((cy + r * Math.sin(a)).toFixed(3)),
  ] as const;
}

export function AnalogClock({
  hours,
  minutes = 0,
  windowProgress,
  tone = "navy",
  className,
}: Props) {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const stroke = tone === "cream" ? "rgb(244 239 230)" : "rgb(23 24 52)";
  const muted = tone === "cream" ? "rgb(244 239 230 / 0.35)" : "rgb(23 24 52 / 0.28)";
  const p = Math.min(1, Math.max(0, windowProgress ?? 0));
  const [arcStartX, arcStartY] = polar(50, 50, 40, 330);
  const [arcEndX, arcEndY] = polar(50, 50, 40, 330 + 120 * Math.max(p, 0.001));

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block", className)}
      aria-hidden
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke={muted} strokeWidth="0.6" />
      {Array.from({ length: 12 }, (_, i) => {
        const major = i % 3 === 0;
        const [x1, y1] = polar(50, 50, major ? 41 : 43.5, i * 30);
        const [x2, y2] = polar(50, 50, 46.5, i * 30);
        const elevenOrThree = i === 11 || i === 3;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={elevenOrThree ? "#c43b36" : stroke}
            strokeWidth={major ? 1.4 : 0.7}
            strokeLinecap="round"
            opacity={elevenOrThree ? 1 : 0.7}
          />
        );
      })}
      {p > 0 && (
        <path
          d={`M ${arcStartX} ${arcStartY} A 40 40 0 0 1 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="#c43b36"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="18"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 50 50)`}
        opacity="0.7"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="28"
        stroke="#c43b36"
        strokeWidth="2.4"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 50 50)`}
      />
      <circle cx="50" cy="50" r="2.2" fill="#c43b36" />
    </svg>
  );
}
