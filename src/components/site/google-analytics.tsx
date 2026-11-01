/**
 * GA4 gtag.js, rendered in the root <head> only when VITE_GA4_ID is set at build
 * time (Netlify: Site configuration > Environment variables). Unset = no tag at all.
 * Enhanced Measurement "history events" counts client-side navigations; no manual
 * page_view here (it would double count).
 */
const RAW_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() ?? "";
export const GA4_ID = /^G-[A-Z0-9]+$/.test(RAW_ID) ? RAW_ID : "";

export function GoogleAnalyticsTag() {
  if (!GA4_ID) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');`,
        }}
      />
    </>
  );
}
