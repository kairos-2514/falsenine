import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "falsenine-image-storage.s3.ap-south-1.amazonaws.com",
      },
    ],
    // Increase timeout for external image optimization
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
