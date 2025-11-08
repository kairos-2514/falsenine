import type { MetadataRoute } from "next";
import { mockProducts } from "@/lib/products";

// Server-safe route constants (not importing from client-side navigation.ts)
const ROUTES = {
  DRIP_ROOM: "/drip-room",
  DRIP_ROOM_DETAIL: "/drip-room/[id]",
  THE_PLAYBOOK: "/the-playbook",
  THE_CODE: "/the-code",
  ON_THE_MOVE: "/on-the-move",
  REFUND_KICK: "/refund-kick",
} as const;

// Server-side route builder (server-safe version)
const buildProductRoute = (productId: string): string => {
  if (!productId || typeof productId !== "string" || productId.trim() === "") {
    throw new Error("[Sitemap] Invalid product ID");
  }
  // Replace [id] placeholder with actual product ID
  return ROUTES.DRIP_ROOM_DETAIL.replace("[id]", encodeURIComponent(productId.trim()));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://falseninejersey.shop";
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${ROUTES.DRIP_ROOM}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.THE_PLAYBOOK}`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}${ROUTES.THE_CODE}`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}${ROUTES.ON_THE_MOVE}`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}${ROUTES.REFUND_KICK}`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic product routes
  try {
    const productRoutes: MetadataRoute.Sitemap = mockProducts.map((product) => {
      const productPath = buildProductRoute(product.id);
      return {
        url: `${baseUrl}${productPath}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    console.error("[Sitemap] Error generating product routes:", error);
    return staticRoutes;
  }
}
