import type { ServiceId } from "@/lib/estimate";

export type LocationJob = { title: string; text: string };

export type LocationPage = {
  path: string;
  city: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lede: string;
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  housingTitle: string;
  housing: string;
  housingAside: string;
  jobsTitle: string;
  jobs: LocationJob[];
  reviewNames: string[];
  quoteService: ServiceId;
  addressNote?: string;
  /** Hub grouping on /service-areas. */
  region: LocationRegion;
  /** Paths of the nearest neighborhood pages, shown under "Also nearby". */
  neighbors: string[];
  /** Visible, page-specific questions. Answers only restate what the site already says. */
  faqs?: { q: string; a: string }[];
};

export type LocationRegion = "office" | "east" | "west" | "over";

export const regions: { id: LocationRegion; title: string; text: string }[] = [
  {
    id: "office",
    title: "Around the office",
    text: "Sherman Oaks and the neighborhoods that touch it. The shortest drives from Ventura Blvd.",
  },
  {
    id: "east",
    title: "East Valley and Glendale",
    text: "East on the 101 and the 134: North Hollywood, Burbank, and Glendale.",
  },
  {
    id: "west",
    title: "West Valley",
    text: "West on Ventura Blvd and the 101: Tarzana, Reseda, Woodland Hills, and Calabasas.",
  },
  {
    id: "over",
    title: "Over the hill",
    text: "South through the canyons, out of the Valley.",
  },
];

export const locations: LocationPage[] = [
  {
    path: "/house-cleaning-van-nuys",
    city: "Van Nuys",
    title: "House Cleaning in Van Nuys | Extreme Quality Clean",
    description:
      "House cleaning in Van Nuys for apartments, family houses, and move-outs. Recurring or one-time. Quoted before we start. Call (818) 294-3141, 24/7.",
    h1: "House cleaning in Van Nuys",
    eyebrow: "Van Nuys · House cleaning",
    lede: "Courtyard apartments south of Victory, and the smaller houses that take the Valley dust. This is recurring work and lease-end move-outs, not a hills estate.",
    image: "/images/kitchen.webp",
    imageAlt: "A Valley kitchen after a regular house clean, counters clear and the sink reset",
    secondaryImage: "/images/bathroom.webp",
    secondaryAlt: "A bathroom after a Van Nuys apartment clean, glass and fixtures wiped",
    housingTitle: "The flats, not the hills",
    housing:
      "Van Nuys sits on the Valley floor. South of Victory the stock is courtyard apartments and compact houses: kitchens that get used hard, one or two baths, and floors that show every week you skip. North toward Vanowen and Sherman Way the lots open up a little, still without the canyon glass you get in Sherman Oaks or the hills of Studio City. Dust does not blow through. It settles. A house clean here is kitchens, baths, floors, and the baseboards the dust finds first.",
    housingAside:
      "Most of what we book in Van Nuys is a regular clean on a repeating week, or a move-out when a lease ends near the 405. Tell us which one. The list is not the same.",
    jobsTitle: "What we actually book here",
    jobs: [
      {
        title: "Recurring apartment clean",
        text: "Kitchen, both baths if there are two, floors, and the surfaces that collect dust between visits. Built for a place someone lives in, not a listing photo.",
      },
      {
        title: "Family house, one visit",
        text: "A reset before relatives or after a stretch of work weeks. Inside the rooms you use, not a construction clean and not a coat of polish on an empty house.",
      },
      {
        title: "Move-out for a rental",
        text: "Appliances, inside cabinets when the landlord will look, baths, and floors. We quote it as a move-out, not as a regular clean with a different name.",
      },
    ],
    reviewNames: ["Tanya M.", "Michael G."],
    quoteService: "recurring",
    addressNote:
      "Google still shows an older shop at 6829 Murietta Ave, Van Nuys, CA 91405. That is not the office we work from now. The current address is 15130 Ventura Blvd, Sherman Oaks, CA 91403. The phone is the same: (818) 294-3141, answered 24/7. Crews are in Van Nuys the same day.",
    region: "office",
    neighbors: [
      "/house-cleaning-sherman-oaks",
      "/cleaning-services-encino",
      "/service-areas/reseda-ca",
      "/service-areas/north-hollywood-ca",
    ],
  },
  {
    path: "/house-cleaning-sherman-oaks",
    city: "Sherman Oaks",
    title: "House Cleaning in Sherman Oaks | Extreme Quality Clean",
    description:
      "House cleaning in Sherman Oaks from our Ventura Blvd office. Hills homes, boulevard condos, and listing turnovers. Quoted first. (818) 294-3141, 24/7.",
    h1: "House cleaning in Sherman Oaks",
    eyebrow: "Sherman Oaks · Where we are based",
    lede: "The office is on Ventura Blvd. South of it the streets climb, and the houses pick up more glass and more dust. On the boulevard, condos and smaller homes. Some of those addresses are also listings.",
    image: "/images/exterior.webp",
    imageAlt: "A Los Angeles hillside house of the kind we quote in Sherman Oaks",
    secondaryImage: "/images/linen.webp",
    secondaryAlt: "Folded linens ready for a Sherman Oaks home or a short-term listing",
    housingTitle: "Boulevard condos and hill houses are different jobs",
    housing:
      "Sherman Oaks is not one housing type. North of Ventura and along the boulevard you get condos, duplexes, and compact houses with a normal room count. South of the boulevard, toward the hills, driveways get longer, glass gets bigger, and the dust comes off the slope instead of off the Valley floor. A recurring clean in a hills house spends real time on glass, sills, and the rooms guests never see on a listing. A condo on the boulevard is kitchens, baths, and floors on a shorter clock. We price them as different visits.",
    housingAside:
      "We are based at 15130 Ventura Blvd. Same-day house cleaning in Sherman Oaks is a drive across the neighborhood, not a drive across the city. If the house is also an Airbnb, say so. A turnover is a different product.",
    jobsTitle: "The three visits we see most",
    jobs: [
      {
        title: "Hills house, on a schedule",
        text: "Recurring clean for a larger home south of the boulevard. Glass, dust on the sills, and every bath. Not a “kitchen and floors” stop.",
      },
      {
        title: "Boulevard condo or smaller house",
        text: "A regular clean with a normal room count. Useful if you live in it all week and want it kept, not staged.",
      },
      {
        title: "When the same house is a listing",
        text: "If guests check out at 11 and check in at 3, that is a turnover: linens, restock, and a photo-ready reset. We do not quietly treat it as a house clean.",
      },
    ],
    reviewNames: ["Michael G.", "Razo R."],
    quoteService: "recurring",
    region: "office",
    neighbors: [
      "/cleaning-services-encino",
      "/cleaning-services-studio-city",
      "/house-cleaning-van-nuys",
      "/service-areas/north-hollywood-ca",
    ],
  },
  {
    path: "/cleaning-services-encino",
    city: "Encino",
    title: "Cleaning Services in Encino | Extreme Quality Clean",
    description:
      "Cleaning services in Encino for larger homes: recurring cleans, deep cleans, and windows. Quoted in writing before we start. Call (818) 294-3141, 24/7.",
    h1: "Cleaning services in Encino",
    eyebrow: "Encino · Homes, not apartments",
    lede: "Encino is mostly houses, and many of them are bigger than a standard Valley clean. More baths, more floor, more glass. People here book a service, not a single named visit.",
    image: "/images/windows.webp",
    imageAlt: "Large windows on a Los Angeles home, the glass work Encino houses usually include",
    secondaryImage: "/images/hands.webp",
    secondaryAlt: "A cleaner’s hands on a detail pass, the kind of work a larger Encino house needs",
    housingTitle: "Larger floors, and glass the sun will expose",
    housing:
      "The flats of Encino are single-story and two-story houses with real room counts. Toward the reservoir and the hills the houses get larger still: more bathrooms, more window, longer halls. An apartment-style “regular clean” under-serves them. What we book here is usually a recurring whole-house clean, a deep clean when the house has gone too long, or interior work plus windows in one visit because the light shows every mark. Offices are the exception, not the pattern.",
    housingAside:
      "We drive Encino from Sherman Oaks, a few minutes east. Same crew standards, a longer room list. If you want carpet called out separately, or glass only, say that when you ask for the number.",
    jobsTitle: "How Encino jobs are usually scoped",
    jobs: [
      {
        title: "Whole-house recurring",
        text: "Every used room, not a kitchen-and-bath shortcut. Built for a house with several baths and more floor than a condo.",
      },
      {
        title: "Deep clean after a gap",
        text: "After travel, a party, or months of a light tidy. Inside the details a weekly clean does not touch. Quoted as a deep clean.",
      },
      {
        title: "Interior and windows together",
        text: "Encino glass is part of the house, not an add-on people remember later. We can include it in the same visit when you want the sun to be honest.",
      },
    ],
    reviewNames: ["Razo R.", "David C."],
    quoteService: "deep",
    region: "office",
    neighbors: [
      "/house-cleaning-sherman-oaks",
      "/service-areas/tarzana-ca",
      "/house-cleaning-van-nuys",
      "/service-areas/reseda-ca",
    ],
  },
  {
    path: "/cleaning-services-studio-city",
    city: "Studio City",
    title: "Cleaning Services in Studio City | Extreme Quality Clean",
    description:
      "Cleaning services in Studio City for flats, hillside homes, listings, and small offices. Odd hours welcome. Quoted first. (818) 294-3141, 24/7.",
    h1: "Cleaning services in Studio City",
    eyebrow: "Studio City · Flats and the canyon",
    lede: "Studio City is two neighborhoods. Apartments and bungalows on the flats, many of them listings. Hill houses toward Fryman and the canyon, with stairs and more glass. A lot of the calendars belong to people who do not work Saturday morning.",
    image: "/images/night.webp",
    imageAlt: "A Los Angeles home in the evening, when many Studio City cleans are scheduled",
    secondaryImage: "/images/airbnb-checkout.webp",
    secondaryAlt: "A short-term rental bedroom reset, common on the Studio City flats",
    housingTitle: "Listings on the flats. Stairs in the hills.",
    housing:
      "Along Ventura, Moorpark, and Laurel Canyon Boulevard the buildings are apartments, bungalows, and small houses. A large share are short-term rentals that need a turnover, not a family recurring clean. Up toward Fryman and the canyon the houses change: tighter driveways, stairs, and glass that a flat-neighborhood crew plan will underestimate. Production schedules also change the clock. We take evening and odd-Monday visits because that is when these homes are empty. Small offices and guest houses used as rentals or work rooms are part of the same map, and they are quoted on their own.",
    housingAside:
      "Say which Studio City you mean: a listing on the flats, a house in the hills, or a small office. Those are three different cleans. We are 24/7 out of Sherman Oaks, a short drive west.",
    jobsTitle: "Three different cleans, often on the same street",
    jobs: [
      {
        title: "Flat-neighborhood home or bungalow",
        text: "A lived-in apartment or small house. Regular clean, or a move-out if you are handing the keys back.",
      },
      {
        title: "Hill house",
        text: "Stairs, more glass, a longer walk from the truck. Scoped like a house, not like the bungalow down the hill.",
      },
      {
        title: "Listing or small work room",
        text: "An 11-to-3 turnover if guests are coming, or a reset of a guest house or small office if the use is work, not a family kitchen.",
      },
    ],
    reviewNames: ["David C.", "Tanya M."],
    quoteService: "airbnb",
    region: "office",
    neighbors: [
      "/house-cleaning-sherman-oaks",
      "/service-areas/north-hollywood-ca",
      "/service-areas/burbank-ca",
      "/service-areas/beverly-hills-ca",
    ],
  },
  {
    path: "/service-areas/north-hollywood-ca",
    city: "North Hollywood",
    title: "House Cleaning in North Hollywood | Extreme Quality Clean",
    description:
      "House cleaning in North Hollywood, CA for apartments, shared units, bungalows, and lease-end move-outs. Quoted in writing first. (818) 294-3141, 24/7.",
    h1: "House cleaning in North Hollywood",
    eyebrow: "North Hollywood · Apartments and bungalows",
    lede: "Apartment buildings around the Arts District and the Metro station, and older bungalows on the side streets toward Valley Village. Most of it is rental housing, and a lot of it changes hands at lease end.",
    image: "/images/articles/move-out-checklist.webp",
    imageAlt: "An empty apartment bedroom after a move-out clean, floor bare and the window clear",
    secondaryImage: "/images/kitchen.webp",
    secondaryAlt: "A small kitchen reset after a regular apartment clean, counters clear",
    housingTitle: "Renters, roommates, and the lease-end clean",
    housing:
      "North Hollywood is mostly renters. Around Lankershim and Magnolia, near the Arts District and the end of the Metro B Line, the housing is apartment buildings, many of them newer and plenty of them shared by roommates. Off the boulevards the streets turn into post-war bungalows and small houses with a yard and a garage. Both share the same pressure points: a kitchen three people use, one bathroom that never gets a day off, and floors that carry the street in. When the lease ends, the question changes to whether the deposit comes back. That is a move-out, and we scope it to the empty unit, not to the apartment you were living in last month.",
    housingAside:
      "North Hollywood is a short drive east of our Ventura Blvd office. In a shared place, one person can book and put the access details in the quote notes. If the unit is a listing, say so. A turnover is a different visit.",
    jobsTitle: "The visits North Hollywood books",
    jobs: [
      {
        title: "Shared apartment, every other week",
        text: "Kitchen, bathroom, floors, and the common room everybody uses and nobody cleans. Scoped to the rooms people share, not a staged living room.",
      },
      {
        title: "Move-out, empty unit",
        text: "Inside the oven, fridge, and cabinets as agreed, baseboards and tracks, and the bathroom down to the grout. Quoted to the empty apartment so key day has no surprises.",
      },
      {
        title: "Bungalow catch-up",
        text: "A one-time deep clean for a small house that slipped: switches, vents, baseboards, and the corners a quick weekly tidy never reaches.",
      },
    ],
    reviewNames: ["Tanya M.", "David C."],
    quoteService: "move",
    region: "east",
    neighbors: [
      "/cleaning-services-studio-city",
      "/service-areas/burbank-ca",
      "/house-cleaning-van-nuys",
      "/house-cleaning-sherman-oaks",
    ],
    faqs: [
      {
        q: "Can you do the move-out right before we hand back the keys?",
        a: "Often, yes. Same-day work happens when the calendar allows, and the phone is answered 24/7, but a fixed key date is safer booked early. Move-outs are quoted to the empty unit, in writing, before a crew is booked.",
      },
      {
        q: "We share the apartment. Who books?",
        a: "One person books. Put the access details, and anything the crew should know about the rooms, in the notes on the quote form. The price is set before the visit, so nobody gets an invoice they did not agree to.",
      },
    ],
  },
  {
    path: "/service-areas/burbank-ca",
    city: "Burbank",
    title: "Cleaning Services in Burbank | Extreme Quality Clean",
    description:
      "Cleaning services in Burbank, CA for Magnolia Park houses, foothill homes, and Media District offices after hours. Quoted first. (818) 294-3141, 24/7.",
    h1: "Cleaning services in Burbank",
    eyebrow: "Burbank · Houses and offices",
    lede: "Burbank is its own city with its own mix: post-war houses in Magnolia Park and on the flats, homes climbing toward the Verdugo foothills, and offices around the studios that keep odd hours.",
    image: "/images/articles/cleaning-schedule.webp",
    imageAlt: "Cleaning supplies and folded cloths set out for a recurring house clean",
    secondaryImage: "/images/articles/inline-office-dusk.webp",
    secondaryAlt: "An empty office at dusk, the kind of suite cleaned after the last person leaves",
    housingTitle: "Two calendars in one city",
    housing:
      "Most of residential Burbank is single-family houses on a grid: Magnolia Park, the streets around downtown, and the neighborhoods that climb toward the hills below the Verdugo Mountains. The houses are modest in square footage and heavy on use, with families, pets, and yards that walk in on shoes and paws. The other Burbank is work. The Media District around Olive, Alameda, and Riverside, plus the offices downtown and near the airport, run on production schedules, so the useful clean is after hours or on a weekend, when nobody is at a desk. We quote a house and an office as different jobs because they are.",
    housingAside:
      "Burbank is a short run east from Sherman Oaks on the 101 and the 134. For an office, a walkthrough or a few photos is usually enough for a same-day quote. For a house, tell us about the pets and we plan around them.",
    jobsTitle: "What Burbank calls us for",
    jobs: [
      {
        title: "Family house on a cadence",
        text: "Weekly, every other week, or monthly. Kitchen, baths, floors, and the dust that settles in a house people actually live in.",
      },
      {
        title: "After-hours office",
        text: "Nightly or weekly janitorial for suites: kitchenettes, restrooms, floors, and glass. After-hours and weekend crews, so the clean happens when the room is empty.",
      },
      {
        title: "Carpet and pet odor",
        text: "Truck-mounted steam for carpet, upholstery, and rugs. Pet stain and odor treated as a specialty, not a spray at the end of a house clean.",
      },
    ],
    reviewNames: ["David C.", "Michael G."],
    quoteService: "recurring",
    region: "east",
    neighbors: [
      "/service-areas/north-hollywood-ca",
      "/service-areas/glendale-ca",
      "/cleaning-services-studio-city",
    ],
    faqs: [
      {
        q: "Can you clean a Burbank office outside business hours?",
        a: "Yes. Crews run 24/7, with after-hours and weekend crews for commercial work. Larger jobs are quoted from a walkthrough or a few photos, usually the same day.",
      },
      {
        q: "Is the cleaning safe with pets in the house?",
        a: "Pets are part of the household. We work around them and keep the chemistry appropriate: organic, biodegradable, EPA-approved solutions.",
      },
    ],
  },
  {
    path: "/service-areas/glendale-ca",
    city: "Glendale",
    title: "House Cleaning in Glendale | Extreme Quality Clean",
    description:
      "House cleaning in Glendale, CA for downtown apartments near Brand Blvd and hillside homes above the 134. Move-ins, deep cleans, windows. (818) 294-3141.",
    h1: "House cleaning in Glendale",
    eyebrow: "Glendale · Downtown and the canyons",
    lede: "Downtown Glendale is apartment buildings, many of them new, around Brand Boulevard, the Americana, and the Galleria. North of the 134 the streets narrow into canyon neighborhoods with older houses and a lot of glass facing the hills.",
    image: "/images/windows.webp",
    imageAlt: "A city view through a clean apartment window at sunset",
    secondaryImage: "/images/bathroom.webp",
    secondaryAlt: "A bathroom after a move-in clean, glass and fixtures wiped",
    housingTitle: "New units downtown, older houses uphill",
    housing:
      "Glendale splits by elevation. Downtown, along Brand and Central, most people live in mid-rise and high-rise apartment buildings: move-in dust, large windows, one or two baths, and building rules about when the service elevator can be used. Above the 134, neighborhoods like Verdugo Woodlands and Chevy Chase Canyon are older houses on slopes and curves, with wood floors, tile, and windows that look out at the Verdugo Mountains. A downtown unit is a tight, fast clean. A canyon house is a longer visit with more glass and more stairs. We quote them separately so neither one is a guess.",
    housingAside:
      "Glendale is east of our Sherman Oaks office on the 134. Moving into a downtown building? Tell us the move-in date and any elevator booking in the quote notes so the crew arrives while the unit is still empty.",
    jobsTitle: "Where Glendale work usually starts",
    jobs: [
      {
        title: "Move-in, before the boxes",
        text: "Inside the fridge, oven, and cabinets as agreed, baths to the grout and glass, and the dust out of the window tracks before anything is unpacked.",
      },
      {
        title: "Apartment on a schedule",
        text: "A regular clean for one- and two-bath units: kitchen, baths, floors, and dusting. The same crews, on a cadence.",
      },
      {
        title: "Canyon house and its glass",
        text: "An interior clean plus windows, inside and out, with tracks and sills as scoped. Planned for a house on a slope, not a flat.",
      },
    ],
    reviewNames: ["Tanya M.", "Razo R."],
    quoteService: "move",
    region: "east",
    neighbors: [
      "/service-areas/burbank-ca",
      "/service-areas/north-hollywood-ca",
      "/cleaning-services-studio-city",
    ],
    faqs: [
      {
        q: "What does a move-in clean include?",
        a: "It is scoped to the empty home: inside the oven, fridge, and cabinets as agreed, baseboards, window tracks, switches, vents, and bathrooms to the grout and glass. The price is in writing before a crew is booked.",
      },
      {
        q: "Do you clean windows on the outside too?",
        a: "Yes. Residential glass is cleaned interior and exterior, with tracks and sills as scoped. Tell us which windows when you ask for the quote.",
      },
    ],
  },
  {
    path: "/service-areas/tarzana-ca",
    city: "Tarzana",
    title: "House Cleaning in Tarzana | Extreme Quality Clean",
    description:
      "House cleaning in Tarzana, CA for hillside homes south of Ventura Blvd and condos on the flats. Deep and recurring cleans, quoted first. (818) 294-3141.",
    h1: "House cleaning in Tarzana",
    eyebrow: "Tarzana · Hills and the boulevard",
    lede: "The land was once Edgar Rice Burroughs’ ranch, which is where the name comes from. Today it is hillside houses south of Ventura Boulevard, and condos and single-story homes north of it.",
    image: "/images/exterior.webp",
    imageAlt: "A Los Angeles hillside house of the kind found south of Ventura Blvd in Tarzana",
    secondaryImage: "/images/articles/house-cleaning-checklist.webp",
    secondaryAlt: "A hand wiping a baseboard during a deep clean",
    housingTitle: "Ventura Blvd is the dividing line",
    housing:
      "Tarzana sits just west of Encino on the same boulevard, and it splits the same way. South of Ventura, the streets wind up into the Santa Monica Mountains: larger houses, pools, big windows, and the dust that comes off a hillside lot. North of the boulevard toward the 101, it flattens into condos, townhomes, and single-story houses with an ordinary room count. Along Ventura itself are office buildings and professional suites that need their cleaning done after the doors close. A hill house here is a whole-house visit that includes the glass. A condo is a regular clean on a shorter clock. An office is its own quote.",
    housingAside:
      "Tarzana is a straight drive west on Ventura Blvd from our office. If the house has not had a proper clean in a while, start with a deep clean and move to a cadence after. Both are quoted in writing.",
    jobsTitle: "How Tarzana visits are scoped",
    jobs: [
      {
        title: "Hillside house, deep clean first",
        text: "Baseboards, switches, vents, window tracks, and baths to the grout. The first visit catches up. The visits after it keep up.",
      },
      {
        title: "Condo or townhome, regular",
        text: "Kitchen, baths, floors, and dusting on a weekly, every-other-week, or monthly cadence, with no surprise extras.",
      },
      {
        title: "Suite on the boulevard",
        text: "Offices along Ventura cleaned nightly or weekly: restrooms, kitchenettes, floors, and the front glass.",
      },
    ],
    reviewNames: ["Razo R.", "David C."],
    quoteService: "deep",
    region: "west",
    neighbors: [
      "/cleaning-services-encino",
      "/service-areas/reseda-ca",
      "/service-areas/woodland-hills-ca",
    ],
    faqs: [
      {
        q: "Should the first visit be a deep clean?",
        a: "If it has been a long time, usually yes. The reset covers inside appliances as agreed, baseboards, tracks, switches, vents, and grout. A recurring clean keeps it there afterward. Each one is quoted before we start.",
      },
      {
        q: "Do you offer a senior or military discount?",
        a: "Yes. Mention it when you call or tick the box on the quote form.",
      },
    ],
  },
  {
    path: "/service-areas/reseda-ca",
    city: "Reseda",
    title: "House & Carpet Cleaning in Reseda | Extreme Quality Clean",
    description:
      "House and carpet cleaning in Reseda, CA for ranch houses, apartments, and homes with pets. Truck-mounted steam. Quoted first. (818) 294-3141, 24/7.",
    h1: "House and carpet cleaning in Reseda",
    eyebrow: "Reseda · The middle of the Valley",
    lede: "Reseda is the flat middle of the Valley: a grid of post-war ranch houses, with apartment buildings along Sherman Way and Reseda Boulevard. Yards, pets, and summer heat all end up on the floors first.",
    image: "/images/articles/pet-carpet.webp",
    imageAlt: "A dog sitting on a freshly steamed carpet in a Valley living room",
    secondaryImage: "/images/hands.webp",
    secondaryAlt: "A cleaner’s hands on a detail pass during a house clean",
    housingTitle: "Ranch houses, yards, and floors that take the hit",
    housing:
      "Most of Reseda was built as single-story ranch houses on a grid, with apartment buildings lining the big boulevards. It sits in the middle of the Valley floor, away from the hills, so summers run hot and doors stay open. That means dust on every sill and yard traffic across the floors. In a house with pets, the carpet and the couch hold on to what a vacuum misses. A regular clean covers the rooms. Carpet, upholstery, and pet odor are a separate specialty, done with truck-mounted steam instead of a rental wand, and we price that work on its own line.",
    housingAside:
      "Reseda is just west of Van Nuys along Sherman Way and Victory. Tell us which rooms have carpet and which pets live there. The quote says what is included before the truck arrives.",
    jobsTitle: "The Reseda list",
    jobs: [
      {
        title: "Pet stain and odor",
        text: "Carpet and upholstery treated for pet stain and odor as a specialty. Truck-mounted steam, not a rental wand.",
      },
      {
        title: "Ranch house, regular clean",
        text: "Floors swept, mopped, and vacuumed, kitchen and baths, and the dust on sills and baseboards that the Valley floor delivers.",
      },
      {
        title: "Apartment move-out",
        text: "Quoted to the empty unit: appliances inside as agreed, cabinets, baths, and floors.",
      },
    ],
    reviewNames: ["Razo R.", "Tanya M."],
    quoteService: "carpet",
    region: "west",
    neighbors: [
      "/house-cleaning-van-nuys",
      "/service-areas/tarzana-ca",
      "/cleaning-services-encino",
    ],
    faqs: [
      {
        q: "What does your carpet cleaning cover?",
        a: "Truck-mounted deep steam and shampoo, upholstery, drapery, mattresses, rugs, natural stone, wood floors, pet stain and odor, and water-damage cleanup. Tell us the rooms and pieces and we quote before we start.",
      },
      {
        q: "Are you pet friendly?",
        a: "Yes. Pets are part of the household. We work around them and keep the chemistry appropriate, with organic, biodegradable, EPA-approved solutions.",
      },
    ],
  },
  {
    path: "/service-areas/woodland-hills-ca",
    city: "Woodland Hills",
    title: "Cleaning Services in Woodland Hills | Extreme Quality Clean",
    description:
      "Cleaning services in Woodland Hills, CA: Warner Center offices, apartments, and hillside homes south of Ventura. Quoted first. (818) 294-3141, 24/7.",
    h1: "Cleaning services in Woodland Hills",
    eyebrow: "Woodland Hills · Warner Center and the hills",
    lede: "At the west end of the Valley, Warner Center packs office buildings and apartment complexes into a few blocks. South of Ventura Boulevard, the streets climb into the Santa Monica Mountains.",
    image: "/images/office.webp",
    imageAlt: "An open-plan office with glass walls, the kind of suite cleaned after hours",
    secondaryImage: "/images/articles/hard-water-windows.webp",
    secondaryAlt: "Spotted exterior windows before a glass cleaning",
    housingTitle: "Office blocks, apartment complexes, hill houses",
    housing:
      "Woodland Hills has three kinds of work. Warner Center, around Topanga Canyon Boulevard and Oxnard Street, is office buildings, the Topanga shopping district, and large apartment complexes. Around it are single-family streets on the flats. South of Ventura the houses climb into the hills, with views, big windows, and dust that blows off open slopes. Summer at the west end of the Valley runs hot, and glass and sills show it fast. Offices want a nightly or weekly clean after the last person leaves. Apartments want the same crew on a cadence. Hill houses want a regular clean with the windows on the schedule too.",
    housingAside:
      "Woodland Hills is west of us on the 101 or along Ventura Blvd. For an office, send a few photos or book a walkthrough; larger jobs are usually quoted the same day.",
    jobsTitle: "The Woodland Hills split",
    jobs: [
      {
        title: "Warner Center office",
        text: "Daily, nightly, or weekly janitorial: restrooms, kitchenettes, floors, and glass. After-hours and weekend crews.",
      },
      {
        title: "Apartment on a cadence",
        text: "One- and two-bath units cleaned weekly, every other week, or monthly by the same crews, not a rotating roster.",
      },
      {
        title: "Hill house and windows",
        text: "Interior and exterior glass with tracks and sills as scoped, alongside the house clean, so the view is part of the job.",
      },
    ],
    reviewNames: ["David C.", "Michael G."],
    quoteService: "commercial",
    region: "west",
    neighbors: [
      "/service-areas/tarzana-ca",
      "/service-areas/calabasas-ca",
      "/service-areas/reseda-ca",
    ],
    faqs: [
      {
        q: "How fast can you quote an office?",
        a: "Larger jobs are quoted from a walkthrough or a few photos, usually the same day. The number is in writing before a crew is booked.",
      },
      {
        q: "Can the crew come at night or on weekends?",
        a: "Yes. We are open 24 hours, 7 days a week, and commercial work runs on after-hours and weekend crews.",
      },
    ],
  },
  {
    path: "/service-areas/calabasas-ca",
    city: "Calabasas",
    title: "House Cleaning in Calabasas | Extreme Quality Clean",
    description:
      "House cleaning in Calabasas, CA for larger homes and gated communities: deep cleans, windows, stone and wood floors. Quoted first. (818) 294-3141, 24/7.",
    h1: "House cleaning in Calabasas",
    eyebrow: "Calabasas · Larger homes, gated streets",
    lede: "Past the west end of the Valley on the 101, Calabasas is its own city: gated communities, larger houses on hillside lots, and Old Town along Calabasas Road.",
    image: "/images/airbnb-bedroom.webp",
    imageAlt: "A large bedroom with fresh linens and an open balcony door",
    secondaryImage: "/images/articles/deep-vs-regular.webp",
    secondaryAlt: "A stone backsplash and range before a deep clean",
    housingTitle: "More rooms, more glass, a gate at the front",
    housing:
      "Much of residential Calabasas sits behind gates or along winding hillside streets, and the houses run larger than a typical Valley clean: more bathrooms, more floor, and walls of glass toward the hills. The surfaces change with the size. Stone counters, wood floors, and large rugs show up often in homes like these, and each needs the right method instead of one mop for everything. Access is part of the job too. Gate codes, guard lists, and who lets the crew in all have to line up before anyone starts. Put that in the quote notes and we plan the visit around it.",
    housingAside:
      "Calabasas is west along the 101 from our Sherman Oaks office. Book ahead when you can. Same-day happens when the calendar allows, and the phone is answered 24/7.",
    jobsTitle: "How Calabasas homes are scoped",
    jobs: [
      {
        title: "Whole-house deep clean",
        text: "Inside appliances as agreed, baseboards, switches, vents, and every bath to the grout. Scoped by the rooms, not by a published rate.",
      },
      {
        title: "Stone, wood, and rugs",
        text: "Natural stone, wood floors, rugs, and upholstery handled as a specialty, with furniture and floors protected before work begins.",
      },
      {
        title: "Windows, inside and out",
        text: "The glass that faces the hills, cleaned interior and exterior, with tracks and sills as scoped.",
      },
    ],
    reviewNames: ["Razo R.", "Michael G."],
    quoteService: "deep",
    region: "west",
    neighbors: [
      "/service-areas/woodland-hills-ca",
      "/service-areas/tarzana-ca",
      "/cleaning-services-encino",
    ],
    faqs: [
      {
        q: "We live in a gated community. How does access work?",
        a: "Put the gate instructions, or the name of whoever will let the crew in, in the access notes on the quote form, or tell us when you call.",
      },
      {
        q: "Do you protect floors and furniture?",
        a: "Yes. Furniture, carpets, wood, and tile are covered before work begins.",
      },
    ],
  },
  {
    path: "/service-areas/beverly-hills-ca",
    city: "Beverly Hills",
    title: "House Cleaning in Beverly Hills | Extreme Quality Clean",
    description:
      "House cleaning in Beverly Hills, CA, over Coldwater Canyon from our Sherman Oaks office. Homes, condos, and storefront glass. Quoted first. (818) 294-3141.",
    h1: "House cleaning in Beverly Hills",
    eyebrow: "Beverly Hills · Over the canyon",
    lede: "Coldwater Canyon runs from Studio City over the hill into Beverly Hills. On the other side: houses on the flats, hillside homes north of Sunset, condos and apartments south of Wilshire, and storefront glass on the shopping streets.",
    image: "/images/night.webp",
    imageAlt: "A Los Angeles home in the evening",
    secondaryImage: "/images/linen.webp",
    secondaryAlt: "A freshly made bed with pressed white linens",
    housingTitle: "Flats, hills, and the blocks south of Wilshire",
    housing:
      "Beverly Hills is small and tightly defined. Between Santa Monica Boulevard and Sunset are the flats: wide streets and large single-family houses. North of Sunset the houses climb into the canyons and get larger again, with more glass and more stairs. South of Wilshire the city is mostly condos, duplexes, and apartment buildings, where a regular clean is kitchens, baths, and floors on a shorter clock. The commercial streets add a different job: storefront windows and office suites that have to look right before the doors open. We quote each type on its own terms instead of pricing the city as one thing.",
    housingAside:
      "We are a Valley company, and Beverly Hills is a drive over the hill from Sherman Oaks, so give us your window early. Crews run 24/7, and the price is in writing before anyone is booked.",
    jobsTitle: "Beverly Hills, by building type",
    jobs: [
      {
        title: "House on the flats or in the hills",
        text: "A whole-house recurring or deep clean, every bath included, with interior and exterior glass added to the same visit if you want it.",
      },
      {
        title: "Condo south of Wilshire",
        text: "A regular clean on a weekly, every-other-week, or monthly cadence. Kitchen, baths, floors, and dusting.",
      },
      {
        title: "Storefront and office glass",
        text: "High-visibility panes and storefronts, interior and exterior, plus weekly suites and after-hours janitorial.",
      },
    ],
    reviewNames: ["Michael G.", "David C."],
    quoteService: "recurring",
    region: "over",
    neighbors: [
      "/cleaning-services-studio-city",
      "/house-cleaning-sherman-oaks",
      "/cleaning-services-encino",
    ],
    faqs: [
      {
        q: "Do you work outside the Valley?",
        a: "Yes. We are based in Sherman Oaks and cover greater Los Angeles County, including the Westside. Statewide work is quoted case by case.",
      },
      {
        q: "Can storefront glass be done before opening?",
        a: "Yes. Storefronts and high-visibility panes are part of our window work, and commercial crews work after hours and on weekends.",
      },
    ],
  },
];

/** The four original neighborhood pages (flat URLs), featured on the home page. */
export const coreLocations = locations.filter((location) => location.region === "office");

export function locationByPath(path: string) {
  return locations.find((location) => location.path === path);
}
