// app/page.tsx
import type { Metadata } from "next";
import { seoConfig } from "@/config/seo-config";
import { ROUTES } from "@/lib/navigation";

// Generate metadata for homepage
export const metadata: Metadata = {
  ...seoConfig.getPageMetadata(ROUTES.THE_PLAY),
  alternates: {
    canonical: seoConfig.getCanonicalUrl(ROUTES.THE_PLAY),
  },
};

export default function HomePage() {
  // Generate structured data for homepage
  const websiteSchema = seoConfig.createWebsiteSchema();
  const faqSchema = seoConfig.createFAQSchema();

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="flex flex-col min-h-screen bg-luna">
        {/* Hero / Main Section */}
        <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-24">
          <h1 className="font-falsenine text-5xl md:text-6xl tracking-widest mb-6">
            WELCOME TO <span className="text-flame">FALSE NINE</span>
          </h1>
          <p className="font-montserrat text-night max-w-lg text-sm md:text-base leading-relaxed uppercase">
            Game built. Street tested. Premium football-inspired streetwear for
            players who move different.
          </p>
        </section>
      </main>
    </>
  );
}
