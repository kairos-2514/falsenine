import type { Metadata } from "next";
import { seoConfig } from "@/config/seo-config";
import { ROUTES } from "@/lib/navigation";

// Generate SEO metadata using seoConfig
const pageMetadata = seoConfig.getPageMetadata(ROUTES.LOCKER);

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  keywords: pageMetadata.keywords,
  authors: [{ name: seoConfig.brand.siteName, url: seoConfig.brand.siteUrl }],
  creator: seoConfig.brand.siteName,
  publisher: seoConfig.brand.siteName,
  metadataBase: new URL(seoConfig.brand.siteUrl),
  openGraph: {
    type: "website",
    url: pageMetadata.openGraph.url,
    title: pageMetadata.openGraph.title,
    description: pageMetadata.openGraph.description,
    siteName: pageMetadata.openGraph.siteName,
    images: pageMetadata.openGraph.images.map((img) => ({
      url: img.url,
      width: img.width,
      height: img.height,
      alt: img.alt || pageMetadata.title,
    })),
    locale: "en_US",
  },
  twitter: {
    card: pageMetadata.twitter.card,
    title: pageMetadata.twitter.title,
    description: pageMetadata.twitter.description,
    images: pageMetadata.twitter.images,
    creator: pageMetadata.twitter.creator,
  },
  alternates: {
    canonical: pageMetadata.alternates.canonical,
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
};

export default function LockerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

