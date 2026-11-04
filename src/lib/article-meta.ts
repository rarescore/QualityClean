export type ArticleMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keyword: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  related: string[];
  minutes: number;
  serviceTo: string;
  serviceLabel: string;
};

export const articleMeta: ArticleMeta[] = [
  {
    slug: "los-angeles-house-cleaning-checklist",
    title: "The Ultimate Los Angeles House Cleaning Checklist: 35 Places Most People Forget",
    seoTitle: "Los Angeles House Cleaning Checklist: 35 Often-Missed Spots",
    description:
      "Think your home is clean? 35 commonly missed areas in this Los Angeles house cleaning checklist — and when a deeper clean is actually needed.",
    keyword: "house cleaning Los Angeles",
    category: "Homes",
    date: "2026-07-08",
    image: "/images/articles/house-cleaning-checklist.webp",
    alt: "A microfiber cloth cutting a clean streak through dust on a door frame in a Los Angeles home",
    related: [
      "deep-cleaning-vs-regular-cleaning-los-angeles",
      "how-often-should-you-clean-your-house",
      "why-is-my-house-so-dusty-los-angeles",
    ],
    minutes: 9,
    serviceTo: "/services#residential",
    serviceLabel: "House cleaning",
  },
  {
    slug: "deep-cleaning-vs-regular-cleaning-los-angeles",
    title: "Deep Cleaning vs. Regular Cleaning in Los Angeles: The Difference That Actually Matters",
    seoTitle: "Deep Cleaning vs Regular Cleaning Los Angeles: What You Need",
    description:
      "Regular clean or deep clean? What actually separates the two, which one your Los Angeles home needs, and when a reset is worth it.",
    keyword: "deep cleaning Los Angeles",
    category: "Homes",
    date: "2026-07-22",
    image: "/images/articles/deep-vs-regular.webp",
    alt: "A Los Angeles kitchen range hood with baked-on grease — the kind of buildup a deep clean is for",
    related: [
      "los-angeles-house-cleaning-checklist",
      "house-cleaning-cost-los-angeles",
      "how-often-should-you-clean-your-house",
    ],
    minutes: 7,
    serviceTo: "/services#deep",
    serviceLabel: "Deep cleaning",
  },
  {
    slug: "los-angeles-move-out-cleaning-checklist",
    title: "Moving Out in Los Angeles? Use This 47-Point Cleaning Checklist Before You Hand Over the Keys",
    seoTitle: "Los Angeles Move-Out Cleaning Checklist: Before You Return Keys",
    description:
      "Moving out in Los Angeles? Room-by-room cleaning checklist before the walkthrough, landlord inspection, and key handoff.",
    keyword: "move out cleaning Los Angeles",
    category: "Move-out",
    date: "2026-08-05",
    image: "/images/articles/move-out-checklist.webp",
    alt: "Empty Los Angeles apartment after move-out, keys on the windowsill, dust outlines on the floor",
    related: [
      "deep-cleaning-vs-regular-cleaning-los-angeles",
      "post-construction-cleaning-los-angeles-guide",
      "house-cleaning-cost-los-angeles",
    ],
    minutes: 6,
    serviceTo: "/services#deep",
    serviceLabel: "Move-out cleaning",
  },
  {
    slug: "house-cleaning-cost-los-angeles",
    title: "How Much Does House Cleaning Cost in Los Angeles in 2026? The Real Factors Behind the Price",
    seoTitle: "House Cleaning Cost Los Angeles 2026: What Changes the Price?",
    description:
      "How much does house cleaning cost in Los Angeles? 2026 market ranges from Angi and the seven factors that actually change a quote.",
    keyword: "house cleaning cost Los Angeles",
    category: "Homes",
    date: "2026-08-12",
    image: "/images/articles/cleaning-cost.webp",
    alt: "A cleaning coordinator walking a Sherman Oaks kitchen with a homeowner before quoting",
    related: [
      "deep-cleaning-vs-regular-cleaning-los-angeles",
      "los-angeles-house-cleaning-checklist",
      "los-angeles-move-out-cleaning-checklist",
    ],
    minutes: 7,
    serviceTo: "/quote",
    serviceLabel: "Request a quote",
  },
  {
    slug: "why-is-my-house-so-dusty-los-angeles",
    title: "Why Is My Los Angeles Home So Dusty? 12 Hidden Causes—and How to Fix Them",
    seoTitle: "Why Is My Los Angeles Home So Dusty? 12 Causes & Fixes",
    description:
      "Dust coming back right after you clean? Twelve hidden reasons Los Angeles homes get dusty, and what actually keeps it under control.",
    keyword: "why is my house so dusty",
    category: "Homes",
    date: "2026-08-19",
    image: "/images/articles/dusty-home.webp",
    alt: "Sunbeam through a Los Angeles living room making dust motes visible in the air",
    related: [
      "los-angeles-house-cleaning-checklist",
      "how-often-should-you-clean-your-house",
      "hard-water-stains-windows-los-angeles",
    ],
    minutes: 7,
    serviceTo: "/services#deep",
    serviceLabel: "Deep cleaning",
  },
  {
    slug: "pet-stain-odor-carpet-cleaning-los-angeles",
    title: "Carpet Cleaning for Los Angeles Pet Owners: Why Urine Smell Keeps Coming Back",
    seoTitle: "Pet Urine Smell Keeps Coming Back? Los Angeles Carpet Guide",
    description:
      "Pet urine smell disappeared and returned? Why contamination can reach the pad, what DIY misses, and when deeper carpet treatment is needed.",
    keyword: "carpet cleaning Los Angeles",
    category: "Specialty",
    date: "2026-08-26",
    image: "/images/articles/pet-carpet.webp",
    alt: "Golden retriever on a cream living-room carpet with a professional extractor nearby",
    related: [
      "why-is-my-house-so-dusty-los-angeles",
      "los-angeles-house-cleaning-checklist",
      "how-often-should-you-clean-your-house",
    ],
    minutes: 7,
    serviceTo: "/services#carpet",
    serviceLabel: "Carpet & pet odor",
  },
  {
    slug: "hard-water-stains-windows-los-angeles",
    title: "Why Your Windows Still Look Dirty After You Clean Them: The Los Angeles Hard-Water Stain Guide",
    seoTitle: "Hard Water Stains on Windows? The Los Angeles Cleaning Guide",
    description:
      "Windows still cloudy after cleaning? Los Angeles hard water leaves mineral deposits. What causes spots, what to avoid, and when to call a pro.",
    keyword: "window cleaning Los Angeles",
    category: "Specialty",
    date: "2026-09-02",
    image: "/images/articles/hard-water-windows.webp",
    alt: "Los Angeles home windows spotted with white hard-water mineral residue from sprinklers",
    related: [
      "why-is-my-house-so-dusty-los-angeles",
      "post-construction-cleaning-los-angeles-guide",
      "los-angeles-house-cleaning-checklist",
    ],
    minutes: 6,
    serviceTo: "/services#windows",
    serviceLabel: "Window cleaning",
  },
  {
    slug: "los-angeles-office-cleaning-checklist",
    title: "The Office Cleaning Checklist Los Angeles Businesses Should Actually Use",
    seoTitle: "Los Angeles Office Cleaning Checklist: Daily to Monthly Guide",
    description:
      "What should actually be cleaned in an office? A Los Angeles commercial cleaning checklist covering daily, weekly, and periodic work.",
    keyword: "office cleaning Los Angeles",
    category: "Commercial",
    date: "2026-09-05",
    image: "/images/articles/office-cleaning.webp",
    alt: "A Los Angeles office at dusk with fingerprints on the glass entry door",
    related: [
      "post-construction-cleaning-los-angeles-guide",
      "how-often-should-you-clean-your-house",
      "house-cleaning-cost-los-angeles",
    ],
    minutes: 6,
    serviceTo: "/services#commercial",
    serviceLabel: "Office cleaning",
  },
  {
    slug: "post-construction-cleaning-los-angeles-guide",
    title: "Just Finished a Remodel? A Los Angeles Post-Construction Cleaning Guide",
    seoTitle: "Post-Construction Cleaning Los Angeles: After-Remodel Guide",
    description:
      "Renovation finished but dust is everywhere? How post-construction cleaning differs from house cleaning, and how to make a remodeled home livable.",
    keyword: "post construction cleaning Los Angeles",
    category: "Specialty",
    date: "2026-09-09",
    image: "/images/articles/post-construction.webp",
    alt: "Newly remodeled Los Angeles kitchen still filmed with fine drywall dust",
    related: [
      "deep-cleaning-vs-regular-cleaning-los-angeles",
      "why-is-my-house-so-dusty-los-angeles",
      "los-angeles-move-out-cleaning-checklist",
    ],
    minutes: 6,
    serviceTo: "/services#deep",
    serviceLabel: "Post-construction cleaning",
  },
  {
    slug: "how-often-should-you-clean-your-house",
    title: "How Often Should You Clean Everything in Your Home? Daily, Weekly, Monthly & Seasonal",
    seoTitle: "How Often Should You Clean Your House? Complete Cleaning Schedule",
    description:
      "Daily, weekly, or monthly? A complete home cleaning schedule for kitchens, bathrooms, floors, carpet, windows, and the surfaces people skip.",
    keyword: "how often should you clean your house",
    category: "Homes",
    date: "2026-09-12",
    image: "/images/articles/cleaning-schedule.webp",
    alt: "Professional cleaning caddy and a weekly checklist on a sunlit Los Angeles kitchen counter",
    related: [
      "los-angeles-house-cleaning-checklist",
      "deep-cleaning-vs-regular-cleaning-los-angeles",
      "why-is-my-house-so-dusty-los-angeles",
    ],
    minutes: 10,
    serviceTo: "/services#residential",
    serviceLabel: "Recurring house cleaning",
  },
];

export function getArticleMeta(slug: string) {
  return articleMeta.find((a) => a.slug === slug);
}

export function latestArticles(n?: number) {
  const sorted = [...articleMeta].sort((a, b) => b.date.localeCompare(a.date));
  return n ? sorted.slice(0, n) : sorted;
}

export function formatArticleDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
