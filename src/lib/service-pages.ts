import { residentialIncludes } from "@/lib/company";

/**
 * One indexable page per core service. All copy below is the copy already
 * published on /services (moved here so /services and /services/<slug> share
 * it). No new facts, prices, or areas.
 */
export type ServicePageCopy = {
  /** Anchor id on /services, kept so old #links still land. */
  id: string;
  slug: string;
  path: string;
  /** Short name used in cards and cross-links. */
  title: string;
  /** Keyword H1 for /services/<slug>. */
  h1: string;
  seoTitle: string;
  description: string;
  /** ServiceId preselected on /quote. */
  quoteService: string;
  image: string;
  alt: string;
  lead: string;
  body: string;
  items: readonly string[];
  guides: { slug: string; label: string }[];
};

export const servicePages: ServicePageCopy[] = [
  {
    id: "residential",
    slug: "house-cleaning",
    path: "/services/house-cleaning",
    title: "Residential cleaning",
    h1: "House cleaning in Los Angeles",
    seoTitle: "House Cleaning Los Angeles | Extreme Quality Clean",
    description:
      "Recurring and one-time house cleaning in Los Angeles from our Sherman Oaks office. Kitchens, baths, floors, dusting. 24/7. Price before we start.",
    quoteService: "recurring",
    image: "/images/kitchen.webp",
    alt: "Los Angeles kitchen after a residential house cleaning",
    lead: "House cleaning is serious work. We treat every home as if it were ours — no rushed rooms, no skipped edges.",
    body: "A standard visit covers living areas, kitchens, and baths: floors swept, mopped, and vacuumed; furniture and décor dusted; entry glass inside and out; doors and frames spotted; trash out. Kitchens get counters, sinks, faucets, appliances, microwave, coffee pot, and cabinet faces. Bathrooms are disinfected — vanity, toilet, tub and shower, glass.",
    items: residentialIncludes,
    guides: [
      { slug: "los-angeles-house-cleaning-checklist", label: "House cleaning checklist" },
      { slug: "how-often-should-you-clean-your-house", label: "Home cleaning schedule" },
    ],
  },
  {
    id: "deep",
    slug: "deep-cleaning",
    path: "/services/deep-cleaning",
    title: "Deep clean & move-in / out",
    h1: "Deep cleaning and move-out cleaning in Los Angeles",
    seoTitle: "Deep Cleaning & Move-Out Cleaning Los Angeles | Extreme Quality Clean",
    description:
      "Deep cleaning and move-in / move-out cleaning in Los Angeles: inside appliances, baseboards, tracks, vents, grout. Quoted in writing before we start.",
    quoteService: "deep",
    image: "/images/bathroom.webp",
    alt: "Bathroom grout and glass after a deep clean in Los Angeles",
    lead: "The heavy reset — for a new lease, a listing going live, or the first time in a long time.",
    body: "We scope inside appliances, baseboards, tracks, switches, vents, and the grout weekly service never sees. Move-in and move-out work is quoted to the empty (or almost empty) house so there are no surprises on key day.",
    items: [
      "Inside oven, fridge, and cabinets as agreed",
      "Baseboards, window tracks, switches, vents",
      "Bathrooms to grout and glass",
      "Empty-home move-in / move-out",
    ],
    guides: [
      { slug: "deep-cleaning-vs-regular-cleaning-los-angeles", label: "Deep vs regular cleaning" },
      { slug: "los-angeles-move-out-cleaning-checklist", label: "Move-out checklist" },
      { slug: "post-construction-cleaning-los-angeles-guide", label: "Post-construction cleaning guide" },
    ],
  },
  {
    id: "commercial",
    slug: "office-cleaning",
    path: "/services/office-cleaning",
    title: "Commercial & offices",
    h1: "Office and commercial cleaning in Los Angeles",
    seoTitle: "Office & Commercial Cleaning Los Angeles | Extreme Quality Clean",
    description:
      "Office and commercial cleaning in Los Angeles: nightly janitorial, weekly suites, after-hours and weekend crews, event turnarounds. Crews run 24/7.",
    quoteService: "commercial",
    image: "/images/office.webp",
    alt: "Los Angeles office suite after nightly commercial cleaning",
    lead: "Most companies cannot absorb a large commercial night. We can — and we can be there within hours.",
    body: "Nightly janitorial, weekly suites, event resets, and the glass conference room that has to look invisible by 8am. Crews run 24/7. Larger jobs are quoted from a walkthrough or a few photos, usually the same day.",
    items: [
      "Daily, nightly, or weekly janitorial",
      "Kitchenettes, restrooms, floors, glass",
      "After-hours and weekend crews",
      "Emergency and event turnarounds",
    ],
    guides: [{ slug: "los-angeles-office-cleaning-checklist", label: "Office cleaning checklist" }],
  },
  {
    id: "carpet",
    slug: "carpet-cleaning",
    path: "/services/carpet-cleaning",
    title: "Carpet, upholstery & floors",
    h1: "Carpet and upholstery cleaning in Los Angeles",
    seoTitle: "Carpet & Upholstery Cleaning Los Angeles | Extreme Quality Clean",
    description:
      "Truck-mounted steam carpet cleaning in Los Angeles, plus upholstery, rugs, stone, wood floors, pet stain and odor, and water-damage cleanup.",
    quoteService: "carpet",
    image: "/images/linen.webp",
    alt: "Freshly extracted carpet and upholstery in a Los Angeles home",
    lead: "Carpet and upholstery are a specialty — truck-mounted steam, not a rental wand.",
    body: "Deep steam carpets, shampoo, drapery, mattresses, oriental rugs, natural stone, wood floors, pet stain and odor, and water-damage cleanup. We also steam chairs, couches, and restaurant or office carpet.",
    items: [
      "Truck-mounted deep steam",
      "Upholstery, drapery, mattresses",
      "Rugs, stone, and wood",
      "Pet odor and water-damage cleanup",
    ],
    guides: [{ slug: "pet-stain-odor-carpet-cleaning-los-angeles", label: "Pet stain and odor guide" }],
  },
  {
    id: "windows",
    slug: "window-cleaning",
    path: "/services/window-cleaning",
    title: "Window cleaning",
    h1: "Window cleaning in Los Angeles",
    seoTitle: "Window Cleaning Los Angeles | Extreme Quality Clean",
    description:
      "Window cleaning in Los Angeles for homes and storefronts: interior and exterior glass, floor-to-ceiling panes, tracks and sills as scoped. Fast quotes.",
    quoteService: "windows",
    image: "/images/windows.webp",
    alt: "Floor-to-ceiling windows after professional cleaning in Los Angeles",
    lead: "Too many dirty windows is a Los Angeles problem we actually enjoy.",
    body: "Residential and commercial glass, interior and exterior, storefronts and the floor-to-ceiling wall you put on the listing. Tracks and sills as scoped. Quote is fast.",
    items: [
      "Interior and exterior glass",
      "Storefronts and high-visibility panes",
      "Tracks and sills as scoped",
      "Homes and commercial",
    ],
    guides: [{ slug: "hard-water-stains-windows-los-angeles", label: "Hard-water window guide" }],
  },
];

export function servicePageBySlug(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

