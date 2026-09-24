import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { company, turnoverProduct } from "@/lib/company";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteExperience() {
  return (
    <>
      <ScrollProgress />
      <StickyBook />
      <div className="film-grain" aria-hidden />
    </>
  );
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden />;
}

function StickyBook() {
  const [on, setOn] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (path === "/quote") return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center transition-[opacity,transform] duration-300 ease-out md:flex",
        on ? "opacity-100" : "invisible translate-y-3 opacity-0",
      )}
      aria-hidden={!on}
      inert={!on || undefined}
    >
      <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-navy py-2 pl-5 pr-2 text-cream shadow-card">
        <p className="text-sm">
          <span className="font-medium">{turnoverProduct.name}</span>
          <span className="mx-2 text-cream/70">·</span>
          <span className="text-cream/80">Quoted first</span>
        </p>
        <Button asChild size="md">
          <Link to="/quote">
            Book it
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
        <a
          href={`tel:${company.phoneTel}`}
          className="pr-3 text-sm text-cream/85 hover:text-cream"
        >
          {company.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
