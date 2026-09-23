import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { company, nav } from "@/lib/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/marks";

function LaTime({ overlay }: { overlay: boolean }) {
  const [t, setT] = useState("");

  useEffect(() => {
    const tick = () => {
      setT(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-5">
      <span className="tabular-nums">
        {t ? `${t} LA` : "24 hours · 7 days"}
        <span className={overlay ? "text-cream/90" : "text-cream/85"}> · we pick up</span>
      </span>
      <span className={overlay ? "text-cream/70" : "text-cream/70"}>/</span>
      <span>Licensed & bonded</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overlay = (path === "/" || path === "/airbnb") && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden h-9 items-center text-[0.6875rem] uppercase tracking-[0.16em] md:flex",
          overlay ? "bg-transparent text-cream [text-shadow:0_1px_8px_rgb(23_24_52_/_0.55)]" : "bg-navy text-cream",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <p>Sherman Oaks · Greater Los Angeles · {company.years}+ years</p>
          <p className="flex items-center gap-5">
            <LaTime overlay={overlay} />
            <a
              href={`tel:${company.phoneTel}`}
              className="transition-opacity hover:opacity-80"
            >
              {company.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          overlay
            ? "border-transparent bg-transparent"
            : "border-line/80 bg-paper/90 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <span
              className={cn(
                "inline-flex rounded-md px-2 py-1",
                overlay ? "bg-cream" : "bg-transparent",
              )}
            >
              <LogoMark className="h-10 w-[4.7rem] sm:h-11 sm:w-[5.2rem]" />
            </span>
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-8 lg:flex",
              overlay ? "text-cream" : "text-ink/80",
            )}
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link text-sm transition-colors hover:text-red"
                activeProps={{ className: "nav-link text-sm text-red" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.phoneTel}`}
              aria-label={`Call ${company.phoneDisplay}`}
              className={cn(
                "hidden h-11 items-center gap-2 rounded-full px-3 text-sm md:inline-flex hover:text-red",
                overlay ? "text-cream" : "text-ink",
              )}
            >
              <Phone className="size-4" aria-hidden />
              <span className="hidden xl:inline">{company.phoneDisplay}</span>
            </a>
            <Button asChild size="md">
              <Link to="/quote">Book a turnover</Link>
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border lg:hidden",
                overlay ? "border-cream/30 text-cream" : "border-line text-ink",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-line bg-paper lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex h-12 items-center border-b border-line/70 text-base"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${company.phoneTel}`}
            className="flex h-12 items-center gap-2 text-base"
          >
            <Phone className="size-4" />
            Call {company.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
