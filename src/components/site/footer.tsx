import { Link } from "@tanstack/react-router";
import { company, nav } from "@/lib/company";
import { locations } from "@/lib/locations";
import { latestArticles } from "@/lib/article-meta";
import { Sparkle, LogoMark } from "@/components/site/marks";
import { SocialLinks } from "@/components/site/social-links";

export function SiteFooter() {
  const latest = latestArticles(5);

  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <div className="mb-6 inline-flex rounded-lg bg-cream px-3 py-2">
            <LogoMark className="h-12 w-[5.6rem]" />
          </div>
          <p className="max-w-sm font-display text-3xl leading-tight text-cream">
            Hotel corners. Valley crews.{" "}
            <em className="text-cream/85">Twenty-five years.</em>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/85">
            Extreme Quality Clean Inc. — Airbnb turnovers, homes, and offices
            across greater Los Angeles. Licensed, insured, bonded.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
            <Sparkle className="size-3 text-red" aria-hidden />
            Visit
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-red">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-red">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/quote" className="hover:text-red">
                Get a quote
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
            <Sparkle className="size-3 text-red" aria-hidden />
            Guides
          </p>
          <ul className="space-y-2.5 text-sm">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/articles/$slug"
                  params={{ slug: a.slug }}
                  className="hover:text-red"
                >
                  {a.seoTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
            <Sparkle className="size-3 text-red" aria-hidden />
            Contact
          </p>
          <address className="space-y-2.5 text-sm not-italic">
            <p>
              <a href={`tel:${company.phoneTel}`} className="hover:text-red">
                {company.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-red">
                {company.email}
              </a>
            </p>
            <p>
              <a
                href={company.address.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                {company.address.line1}
                <br />
                {company.address.city}, {company.address.state}{" "}
                {company.address.zip}
              </a>
            </p>
            <p className="text-cream/85">{company.hours}</p>
          </address>
          <div className="mt-6">
            <SocialLinks tone="cream" />
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-cream/75 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {company.legal}. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            {locations.map((location, index) => (
              <span key={location.path}>
                {index > 0 ? " · " : null}
                <Link to={location.path} className="hover:text-cream">
                  {location.city}
                </Link>
              </span>
            ))}
            <span> · and greater L.A.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
