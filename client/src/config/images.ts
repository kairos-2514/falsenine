// ============================================================================
// IMAGE CONFIGURATION
// ============================================================================

/**
 * Get the full S3 image URL
 * @param imagePath - The image filename/path
 * @returns Full S3 URL
 */
export const getImageUrl = (imagePath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  if (!baseUrl) {
    console.warn("[Images] S3_BASE_URL not configured, using fallback");
    return `https://falsenine-image-storage.s3.ap-south-1.amazonaws.com/${imagePath}`;
  }
  return `${baseUrl}/${imagePath}`;
};

// Pre-configured image URLs
export const IMAGES = {
  HERO_SECTION: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_HERO_SECTION || "hero-section-image.png"
  ),
  BANNER: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_BANNER || "banner-image.png"
  ),
  ABOUT_SECTION: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_ABOUT_SECTION || "about-section-image.png"
  ),
  CONTACT_SECTION: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_CONTACT_SECTION || "contact-section-image.png"
  ),
  LEFT_SIDE: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_LEFT_SIDE || "left-side-image.png"
  ),
  RIGHT_SIDE: getImageUrl(
    process.env.NEXT_PUBLIC_IMAGE_RIGHT_SIDE || "right-side-image.png"
  ),
} as const;
