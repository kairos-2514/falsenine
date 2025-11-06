import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/drip-room/",
          "/the-playbook",
          "/the-code",
          "/on-the-move",
          "/refund-kick",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/locker",
          "/player-card",
          "/kickoff/",
        ],
      },
    ],
    sitemap: "https://falseninejersey.shop/sitemap.xml",
  };
}
