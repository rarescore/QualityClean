export const company = {
  name: "Extreme Quality Clean Inc.",
  short: "Extreme Quality Clean",
  legal: "Extreme Quality Cleaning Inc",
  tagline: "Check-out at 11. Guest-ready at 3.",
  phoneDisplay: "(818) 294-3141",
  phoneTel: "+18182943141",
  email: "info@extremequalityclean.com",
  siteUrl: "https://www.extremequalityclean.com",
  address: {
    line1: "15130 Ventura Blvd",
    city: "Sherman Oaks",
    state: "CA",
    zip: "91403",
    maps: "https://maps.google.com/?q=15130+Ventura+Blvd+Sherman+Oaks+CA+91403",
  },
  hours: "Open 24 hours, 7 days a week",
  years: 25,
  licensed: "Licensed, insured, and bonded",
  social: {
    google:
      "https://www.google.com/maps/search/?api=1&query=Extreme+Quality+Clean+Inc",
    yelp: "https://www.yelp.com/biz/extreme-quality-clean-van-nuys-2",
    instagram: "https://www.instagram.com/extremequalitycleaning/",
  },
  ratings: {
    google: { value: 5, count: 17 },
  },
};

export const nav = [
  { to: "/airbnb", label: "Airbnb hosts" },
  { to: "/services", label: "Services" },
  { to: "/articles", label: "Articles" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const areas = [
  "Sherman Oaks",
  "Van Nuys",
  "Studio City",
  "Encino",
  "Tarzana",
  "Reseda",
  "Woodland Hills",
  "Calabasas",
  "Burbank",
  "Glendale",
  "North Hollywood",
  "Hollywood",
  "West Hollywood",
  "Beverly Hills",
  "Bel Air",
  "Santa Monica",
  "Brentwood",
  "Culver City",
  "Pasadena",
  "Silver Lake",
  "Los Feliz",
  "Downtown LA",
  "Century City",
  "Marina del Rey",
  "Pacific Palisades",
];

export const services = [
  {
    slug: "airbnb",
    title: "Airbnb turnovers",
    kicker: "The host standard",
    summary:
      "Same-day guest-ready resets designed around 11am check-out and 3pm check-in. Hotel corners. Restock. Photo-ready.",
    image: "/images/airbnb-bedroom.webp",
    href: "/airbnb",
    featured: true,
    includes: [
      "Full guest-ready clean, every visible surface",
      "Hotel-made beds and fresh staging",
      "Kitchens, baths, glass, and floors",
      "Trash out, linens reset, restock check",
      "Optional linen laundry and photo report",
    ],
  },
  {
    slug: "residential",
    title: "Residential cleaning",
    kicker: "Homes",
    summary:
      "Recurring and one-time house cleaning treated like our own — no rushed corners, no surprise extras.",
    image: "/images/kitchen.webp",
    href: "/services#residential",
    featured: false,
    includes: [],
  },
  {
    slug: "commercial",
    title: "Commercial & offices",
    kicker: "Workspaces",
    summary:
      "Nightly janitorial, weekly suites, and the glass that has to be invisible by 8am. Crews run 24/7.",
    image: "/images/office.webp",
    href: "/services#commercial",
    featured: false,
    includes: [],
  },
  {
    slug: "carpet",
    title: "Carpet & floors",
    kicker: "Specialty",
    summary:
      "Truck-mounted steam, upholstery, rugs, stone, wood, pet odor, and water-damage cleanup.",
    image: "/images/linen.webp",
    href: "/services#carpet",
    featured: false,
    includes: [],
  },
  {
    slug: "windows",
    title: "Window cleaning",
    kicker: "Glass",
    summary:
      "Interior and exterior, homes and storefronts — the floor-to-ceiling wall on the listing included.",
    image: "/images/windows.webp",
    href: "/services#windows",
    featured: false,
    includes: [],
  },
  {
    slug: "deep",
    title: "Deep / move-in",
    kicker: "The reset",
    summary:
      "The first clean, the last clean, the listing going live. Grout, tracks, inside appliances.",
    image: "/images/bathroom.webp",
    href: "/services#deep",
    featured: false,
    includes: [],
  },
];

export const team = [
  {
    name: "Olga",
    initials: "OL",
    role: "Lead technician",
    bio: "Quick, efficient, and in the spaces most crews skip. She goes the extra mile so every nook is actually done.",
  },
  {
    name: "Anna",
    initials: "AN",
    role: "Window specialist",
    bio: "Glass is her craft. Streak-free panes, inside and out — the kind of clean you only notice because the view got sharper.",
  },
  {
    name: "Evgenii",
    initials: "EV",
    role: "Crew professional",
    bio: "Takes the work seriously and measures the day by one thing: whether the client would let us back in tomorrow.",
  },
  {
    name: "Natasha",
    initials: "NA",
    role: "Hospitality lead",
    bio: "Keeps the crew light and the guest experience warm. The person who notices the coffee cups, the extra towels, the small things hosts get reviewed on.",
  },
];

export const proofs = [
  {
    label: "25 years",
    text: "Greater Los Angeles, the same standard — houses, offices, and now the listings that live or die by the next review.",
  },
  {
    label: "24 / 7",
    text: "Late checkout. Dawn turnover. Emergency water. Call anytime — we actually answer.",
  },
  {
    label: "Licensed",
    text: "Fully licensed, insured, and bonded. Pricing given before we begin. No ambush invoices.",
  },
  {
    label: "EPA products",
    text: "Organic, biodegradable, EPA-approved chemistry. Pet-friendly. Built for people who live in the rooms we clean.",
  },
];

export const hostTimeline = [
  { time: "11:00", title: "Guest checks out", text: "You send the code. We take the lockbox, keypad, or meet the manager.", image: "/images/exterior.webp" },
  { time: "11:20", title: "Crew is inside", text: "Trash out, linens stripped, kitchen and baths opened first — the rooms that lose stars.", image: "/images/kitchen.webp" },
  { time: "13:30", title: "Rooms reset", text: "Beds hotel-made, surfaces detailed, floors done, restock checked against your list.", image: "/images/linen.webp" },
  { time: "15:00", title: "Guest-ready", text: "Walkthrough, optional photos, door locked. The next review starts here.", image: "/images/airbnb-bedroom.webp" },
];

export const hostChecklist = [
  "Beds made hotel-tight, extra pillows staged",
  "Bathrooms disinfected, glass clear, towels folded",
  "Kitchen wiped, sink shined, appliances faced",
  "Floors vacuumed and mopped, edges included",
  "Trash out; linens reset when provided",
  "Restock checked against your list",
  "Mirrors, entry glass, and high-touch points",
  "Walkthrough before the door is locked",
  "Optional timestamped photo report",
  "Pet-friendly chemistry on request",
];

export const hostAddons = [
  { title: "Linen laundry", text: "Strip, wash, dry, remake. You keep a par level; we keep the closet honest." },
  { title: "Restock run", text: "Soap, paper, coffee, water. You set the list, we keep it full." },
  { title: "Photo report", text: "Timestamped pictures after every turnover so you are never guessing." },
  { title: "Same-day rush", text: "Tight windows happen. We run 24/7 crews for a reason." },
];

export const faqs = [
  {
    q: "Do you specialize in Airbnb and short-term rentals?",
    a: "Yes. Turnovers are built around real check-out / check-in windows, not a leisurely weekly house clean. Hotel-made beds, restock checks, and a guest-ready walkthrough are the default — not extras you have to beg for.",
  },
  {
    q: "Can you really come 24 hours a day?",
    a: "We are open 24 hours, 7 days a week. Late check-outs, dawn turnovers, and genuine emergencies are normal for us. Call (818) 294-3141 anytime — including nights and weekends.",
  },
  {
    q: "How does pricing work?",
    a: "You get the price before we begin. Tell us the property and the window — we quote in writing. No surprise add-ons at the door.",
  },
  {
    q: "What products do you use?",
    a: "Organic, 100% biodegradable, EPA-approved solutions. We also run professional equipment — truck-mounted carpet systems, sanitizing tools, and fully stocked vans. Furniture, floors, and belongings are protected before we start.",
  },
  {
    q: "Are you pet friendly?",
    a: "Yes. Pets are part of the household. We work around them, keep chemistry appropriate, and treat stain and odor work as a specialty — not an afterthought.",
  },
  {
    q: "Do you offer senior or military discounts?",
    a: "Yes. Mention it when you call or note it on the quote form. We would rather keep a good client than win a slightly larger invoice.",
  },
  {
    q: "Where do you work?",
    a: "We are based in Sherman Oaks and cover greater Los Angeles County — the Valley, the Westside, Hollywood, Glendale, Pasadena, and the neighborhoods in between. Statewide work is quoted case by case.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Fully licensed, insured, and bonded. Crews use proper protection gear, and we inspect tools daily. We have been doing this in Los Angeles for over 25 years.",
  },
];

export const residentialIncludes = [
  "Sweep, mop, and vacuum all floors",
  "Furniture dusted; décor, shelving, and lamps",
  "Front entry glass, inside and outside",
  "Doors and door frames spot-cleaned",
  "Trash emptied; linens replaced when provided",
  "Kitchen counters, sink, and faucet",
  "Appliances cleaned and shined, microwave in and out",
  "Coffee pot in and out; cabinets wiped",
  "Kitchen furniture — tables, chairs, desks",
  "Bathrooms disinfected: vanity, toilet, tub/shower, glass",
];

export const values = [
  {
    title: "Price before we start",
    text: "We quote first. Keeping a home clean can get expensive; every dollar we save a client is part of the job, not a slogan.",
  },
  {
    title: "Protect the room",
    text: "Furniture, carpets, wood, tile, cars — covered before work begins. The same rule applies to pets.",
  },
  {
    title: "Teach the crew",
    text: "Twice a week we meet on safety and client care. Tools are checked at the end of every day so the next morning starts honest.",
  },
  {
    title: "No job too odd",
    text: "Houses, offices, carpets, glass, water damage, last-minute turnovers. If it needs to be clean in Los Angeles, we have probably already done it.",
  },
];

export const turnoverProduct = {
  name: "The Turnover",
  kicker: "The product",
  promise: "Check-out at 11. Guest-ready at 3.",
  pitch:
    "You are not buying hours. You are buying the next review — hotel corners, restock, a walkthrough, the door locked before the new code is issued.",
};

export const sellable = [
  {
    id: "airbnb",
    name: "The Turnover",
    kicker: "Lead product",
    service: "airbnb" as const,
    to: "/airbnb",
    pitch: "Hotel reset between 11 and 3. The next review is the product.",
    cta: "Book this window",
  },
  {
    id: "recurring",
    name: "The House",
    kicker: "Recurring",
    service: "recurring" as const,
    to: "/services",
    pitch: "The same crews, on a cadence. No rotating strangers.",
    cta: "Plan a cadence",
  },
  {
    id: "deep",
    name: "The Reset",
    kicker: "Deep / move",
    service: "deep" as const,
    to: "/services",
    pitch: "The first clean, the last clean, the listing going live.",
    cta: "Scope a reset",
  },
] as const;

export const versus = [
  {
    them: "A rotating stranger from an app",
    us: "Named crews who already know the linen closet",
  },
  {
    them: "A leisurely weekly house clean on a listing clock",
    us: "A hotel window: 11 to 3, every time",
  },
  {
    them: "Invoice after. Extras at the door.",
    us: "The price, in writing, before we start",
  },
  {
    them: "Weekdays. Business hours. Voicemail.",
    us: "24 hours. Including Sunday at 6am.",
  },
];

export const hostFails = [
  {
    title: "Hair in the drain",
    text: "Guests do not write novels. They write ‘bathroom was dirty’ and hit three stars. We start in the rooms that lose Superhost.",
  },
  {
    title: "An empty soap dish",
    text: "A missed restock is a review. You send the list once. We check it every turnover.",
  },
  {
    title: "A bed that looks slept in",
    text: "Hotel corners or it does not go out. The next guest photographs the pillow. So do we, if you want the report.",
  },
];

export const reviews = [
  {
    name: "Michael G.",
    source: "Google" as const,
    stars: 5,
    text: "They did a great job, the house looks amazing.",
  },
  {
    name: "Tanya M.",
    source: "Google" as const,
    stars: 5,
    text: "I got great experience with this cleaning company. I needed just a regular cleaning of my apartment. Girls did their job perfect. I appreciated it and I recommended already to my friends.",
  },
  {
    name: "Razo R.",
    source: "Google" as const,
    stars: 5,
    text: "My wife loved the cleaning. They do more than we asked for. They don't rush or skip any area. We love their company.",
  },
  {
    name: "David C.",
    source: "Google" as const,
    stars: 5,
    text: "I have used them for regular and deep cleaning of my house. They do an amazing job. Always on time and very professional. I highly recommend them.",
  },
];
