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
};

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
  },
];

export function locationByPath(path: string) {
  return locations.find((location) => location.path === path);
}
