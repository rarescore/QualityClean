const services = [
  "Airbnb turnover",
  "Deep clean",
  "Move-in clean",
  "Post-construction",
] as const;

export type StripService = (typeof services)[number];

export type ThinLocation = {
  slug: string;
  city: string;
  service: StripService;
  body: string;
};

const cities: { city: string; body: string }[] = [
  {
    city: "Sherman Oaks",
    body: "The office is on Ventura Blvd. South of it the streets climb and the glass gets bigger; on the boulevard the work is condos and smaller homes, some of them listings with a 3 o’clock check-in.",
  },
  {
    city: "Van Nuys",
    body: "Courtyard apartments south of Victory, and compact houses toward Vanowen and Sherman Way. Dust settles on the Valley floor, so the visit is kitchens, baths, floors, and the baseboards.",
  },
  {
    city: "Studio City",
    body: "Hills streets off the 101 and the smaller places along Ventura. A first clean before keys change hands spends its time on empty kitchens, baths, and the dust a vacant week leaves on the sills.",
  },
  {
    city: "Encino",
    body: "Larger houses south of the boulevard, many of them mid-remodel. After the trades leave we pull dust from cabinets, tracks, and glass before anyone moves a sofa back in.",
  },
  {
    city: "Tarzana",
    body: "Family houses west of the office, plus a run of short-term listings near Ventura. Turnovers here are linens, kitchens, and a photo-ready bath before the next guest.",
  },
  {
    city: "Reseda",
    body: "Post-war houses and small rentals on the west Valley floor. A deep clean is the kitchen that gets used every night, both baths, and floors that show the week you skipped.",
  },
  {
    city: "Woodland Hills",
    body: "Hillside houses toward the west end of the 101, and townhomes closer to Ventura. Move-in work is an empty place: inside appliances, baths, and the closets the last tenant left dusty.",
  },
  {
    city: "Calabasas",
    body: "Gated streets and larger hillside houses past the west end of the Valley. Construction dust sits in tracks and on high glass; we clear it before the house is lived in.",
  },
  {
    city: "Burbank",
    body: "Houses near the studios and apartments off Magnolia and Olive. Hosts here book a same-day reset between checkout and the next check-in, not a weekly maid visit.",
  },
  {
    city: "Glendale",
    body: "Adams Hill houses, downtown condos, and the apartments along Brand. A deep clean covers the kitchen, the baths, and the dust that comes off the 134.",
  },
  {
    city: "North Hollywood",
    body: "Apartment buildings around the Arts District and older bungalows toward Valley Village. Move-in cleans are scoped to the empty unit, not to the apartment someone was living in last month.",
  },
  {
    city: "Hollywood",
    body: "Walk-up apartments off Franklin and the denser blocks south of Sunset. After a remodel we get drywall dust out of the kitchen, the bath, and the window tracks before the listing photos.",
  },
  {
    city: "West Hollywood",
    body: "Small apartments and guesthouses that turn over on a tight clock. The job is hotel corners, a reset kitchen, and a bath that looks ready in the listing photo.",
  },
  {
    city: "Beverly Hills",
    body: "Flats north of Santa Monica Blvd and houses south of it with more glass than a Valley bungalow. A deep clean is surfaces, baths, and the floors a weekly visit never quite finishes.",
  },
  {
    city: "Bel Air",
    body: "Long driveways and houses that sit empty between owners. A move-in clean is the kitchen, the baths, and the rooms that collected dust while the place was off the market.",
  },
  {
    city: "Santa Monica",
    body: "Condos near the bluffs and smaller rentals off Montana and Pico. After paint and punch-list work we clear the fine dust before the first night in.",
  },
  {
    city: "Brentwood",
    body: "Houses off San Vicente and a handful of short-term listings closer to the 405. Turnovers are linens, kitchens, and a guest-ready bath the same afternoon.",
  },
  {
    city: "Culver City",
    body: "Bungalows in Carlson Park and newer apartments toward the studios. Deep cleans here are lived-in kitchens and baths, not an empty construction site.",
  },
  {
    city: "Pasadena",
    body: "Older houses off Orange Grove and apartments closer to Colorado Blvd. Move-in work is inside the cabinets, the baths, and the floors after the boxes are gone.",
  },
  {
    city: "Silver Lake",
    body: "Hills houses with a lot of glass, and smaller rentals down the slope. Post-construction means tracks, sills, and the dust a remodel leaves in the kitchen.",
  },
  {
    city: "Los Feliz",
    body: "Hillside streets above Los Feliz Blvd and courtyard apartments below it. Hosts book a turnover when a guest leaves in the morning and the next one arrives the same day.",
  },
  {
    city: "Downtown LA",
    body: "Lofts and high-rise apartments that collect city dust on every horizontal surface. A deep clean is the kitchen, the bath, and the glass that faces the street.",
  },
  {
    city: "Century City",
    body: "High-rise condos with a tight freight-elevator window. Move-in cleans are booked for the empty unit: appliances, baths, and floors before the furniture arrives.",
  },
  {
    city: "Marina del Rey",
    body: "Marina-front condos and apartments that take salt air on the glass. After a remodel we clear the dust from tracks and baths before anyone unpacks.",
  },
  {
    city: "Pacific Palisades",
    body: "Houses off Sunset toward the bluffs, many of them between owners or between guests. We quote the visit before a crew is on the driveway.",
  },
];

function slugify(city: string) {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const thinLocations: ThinLocation[] = cities.map((entry, index) => ({
  slug: slugify(entry.city),
  city: entry.city,
  service: services[index % services.length]!,
  body: entry.body,
}));

export function thinLocationBySlug(slug: string) {
  return thinLocations.find((location) => location.slug === slug);
}

export type MarqueeItem =
  | { kind: "city"; label: string; slug: string }
  | { kind: "service"; label: string };

/** Half the city names, interleaved with service phrases. Same length as the old city strip. */
export const marqueeItems: MarqueeItem[] = (() => {
  const kept = thinLocations.filter((_, index) => index % 2 === 0);
  const items: MarqueeItem[] = [];
  kept.forEach((location, index) => {
    items.push({ kind: "city", label: location.city, slug: location.slug });
    if (index < kept.length - 1) {
      items.push({ kind: "service", label: services[index % services.length]! });
    }
  });
  return items;
})();
