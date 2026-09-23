import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { company } from "@/lib/company";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${company.phoneTel}`}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-navy text-sm font-medium text-cream"
        >
          <Phone className="size-4" />
          Call now
        </a>
        <Link
          to="/quote"
          className="flex h-12 items-center justify-center rounded-full bg-red text-sm font-medium text-cream"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
