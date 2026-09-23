import { Instagram } from "lucide-react";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

type Tone = "cream" | "ink";

export function SocialLinks({
  tone = "ink",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const item =
    tone === "cream"
      ? "border-cream/25 text-cream hover:border-red hover:text-cream"
      : "border-line text-ink hover:border-red hover:text-red";

  const links = [
    { href: company.social.google, label: "Google" },
    { href: company.social.yelp, label: "Yelp" },
    { href: company.social.instagram, label: "Instagram", icon: true },
  ];

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
              item,
            )}
          >
            {l.icon ? <Instagram className="size-4" /> : null}
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
