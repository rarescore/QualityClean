import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/company";
import { cn } from "@/lib/utils";

export function FaqList({
  items = faqs,
}: {
  items?: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-a-${i}`;
        const buttonId = `faq-q-${i}`;
        return (
          <div key={item.q}>
            <h3 className="font-display text-xl md:text-2xl">
              <button
                type="button"
                id={buttonId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-ink">{item.q}</span>
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-red transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
