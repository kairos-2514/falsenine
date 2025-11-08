import type { Metadata } from "next";
import { seoConfig } from "@/config/seo-config";
import { ROUTES, buildDripRoomRoute } from "@/lib/navigation";
import { getProductById } from "@/lib/products";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    // Fallback metadata if product not found
    const pageMetadata = seoConfig.getPageMetadata(ROUTES.DRIP_ROOM);
    return {
      title: "Product Not Found - FalseNine",
      description: pageMetadata.description,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate product-specific metadata
  const productUrl = seoConfig.getCanonicalUrl(buildDripRoomRoute(product.id));
  const productMetadata = seoConfig.generateMetaTags({
    title: `${product.pName} - FalseNine`,
    description: `${product.pDescription} Shop ${product.pName} at FalseNine. ${product.pCategory} - ₹${product.pPrice.toLocaleString()}.`,
    keywords: [
      product.pName,
      product.pCategory,
      "FalseNine",
      "football jersey",
      "streetwear",
      product.pFit,
    ],
    image: product.image,
    url: productUrl,
  });

  return {
    title: productMetadata.title,
    description: productMetadata.description,
    keywords: productMetadata.keywords,
    authors: [{ name: seoConfig.brand.siteName, url: seoConfig.brand.siteUrl }],
    creator: seoConfig.brand.siteName,
    publisher: seoConfig.brand.siteName,
    metadataBase: new URL(seoConfig.brand.siteUrl),
    openGraph: {
      type: "website",
      url: productMetadata.openGraph.url,
      title: productMetadata.openGraph.title,
      description: productMetadata.openGraph.description,
      siteName: productMetadata.openGraph.siteName,
      images: productMetadata.openGraph.images.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt || productMetadata.title,
      })),
      locale: "en_US",
    },
    twitter: {
      card: productMetadata.twitter.card,
      title: productMetadata.twitter.title,
      description: productMetadata.twitter.description,
      images: productMetadata.twitter.images,
      creator: productMetadata.twitter.creator,
    },
    alternates: {
      canonical: productMetadata.alternates.canonical,
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
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

