import type { Metadata } from "next";
import "./globals.css";
import { ROUTE_METADATA, SOCIAL_LINKS } from "@/lib/navigation";

// Dynamic metadata generation based on route metadata from navigation.ts
export const metadata: Metadata = {
  title: {
    default: "FalseNine - Born from Football, Built for Streets",
    template: "%s | FalseNine",
  },
  description:
    "FalseNine is a premium streetwear label inspired by football culture. Born from the game, built for the streets — crafted for players, creators, and rule-breakers who move different.",
  keywords: [
    "FalseNine",
    "football streetwear",
    "sportswear brand",
    "athletic fashion",
    "urban football apparel",
    "premium jerseys",
    "street fashion",
   "performance wear",
  ],
  metadataBase: new URL("https://falseninejersey.shop"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FalseNine",
    title: "FalseNine — Born from Football, Built for Streets",
    description:
      "Premium football-inspired streetwear brand redefining sports fashion. Born from the game, built for the streets.",
    images: [
      {
        url: "/falsenine-logo.jpg",
        width: 1200,
        height: 630,
        alt: "FalseNine — Born from Football, Built for Streets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FalseNine — Born from Football, Built for Streets",
    description:
      "Premium football-inspired streetwear. For those who play different — on and off the pitch.",
    images: ["/falsenine-logo.jpg"],
    creator: "@kairosartifex",
    site: "@kairosartifex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  // Additional metadata from navigation system
  authors: [{ name: "FalseNine", url: "https://falseninejersey.shop" }],
  creator: "FalseNine",
  publisher: "FalseNine",
  alternates: {
    canonical: "https://falseninejersey.shop",
  },
  // Social media links from navigation.ts
  other: {
    "instagram:url": SOCIAL_LINKS.INSTAGRAM,
    "twitter:url": SOCIAL_LINKS.TWITTER,
    "pinterest:url": SOCIAL_LINKS.PINTEREST,
  },
};

// Structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "FalseNine",
  description:
    "Premium football-inspired streetwear brand. Born from the game, built for the streets.",
  url: "https://falseninejersey.shop",
  logo: "https://falseninejersey.shop/falsenine-logo.jpg",
  sameAs: [
    SOCIAL_LINKS.INSTAGRAM,
    SOCIAL_LINKS.TWITTER,
    SOCIAL_LINKS.PINTEREST,
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0d0208" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for social media platforms */}
        <link rel="dns-prefetch" href="https://instagram.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        <link rel="dns-prefetch" href="https://pinterest.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

// Export route metadata for use in page components
export { ROUTE_METADATA };
