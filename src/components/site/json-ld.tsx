import { useRouterState } from "@tanstack/react-router";
import { areas, company, faqs, services } from "@/lib/company";

export function JsonLd() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const id = `${company.siteUrl}#business`;
  const showRating = path === "/";
  const showFaq = path === "/";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CleaningService", "HouseCleaner", "LocalBusiness"],
        "@id": id,
        name: company.legal,
        legalName: company.legal,
        image: `${company.siteUrl}/logo.png`,
        logo: `${company.siteUrl}/logo.png`,
        telephone: company.phoneTel,
        email: company.email,
        url: company.siteUrl,
        hasMap: company.address.maps,
        sameAs: [company.social.google, company.social.yelp, company.social.instagram],
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.line1,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          postalCode: company.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.1527,
          longitude: -118.4473,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Los Angeles County" },
          ...areas.map((name) => ({ "@type": "City", name })),
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        ...(showRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: company.ratings.google.value,
                reviewCount: company.ratings.google.count,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning services in Los Angeles",
          itemListElement: services.map((svc) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: svc.title,
              description: svc.summary,
              url: `${company.siteUrl}${svc.href}`,
              areaServed: "Los Angeles",
            },
          })),
        },
        description:
          "Airbnb turnovers, residential and commercial cleaning in greater Los Angeles. 25 years. 24/7. Licensed, insured, bonded. Sherman Oaks.",
      },
      {
        "@type": "WebSite",
        "@id": `${company.siteUrl}#website`,
        url: company.siteUrl,
        name: company.short,
        publisher: { "@id": id },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${company.siteUrl}#organization`,
        name: company.legal,
        url: company.siteUrl,
        logo: `${company.siteUrl}/logo.png`,
        sameAs: [company.social.google, company.social.yelp, company.social.instagram],
      },
      ...(showFaq
        ? [
            {
              "@type": "FAQPage",
              "@id": `${company.siteUrl}#faq`,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
