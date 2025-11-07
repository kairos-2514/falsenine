"use client";

import Image from "next/image";
import { useNavigation, ROUTES } from "@/lib/navigation";

// ============================================================================
// FEATURED PRODUCTS SECTION COMPONENT
// ============================================================================

export default function FeaturedProductsSection() {
  const { navigateTo } = useNavigation();

  const handleCTAClick = () => {
    navigateTo(ROUTES.DRIP_ROOM);
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2"
      aria-label="Featured products section"
    >
      {/* Left Column */}
      <div className="flex flex-col">
        {/* Text Block - Black Background */}
        <div className="bg-night text-white">
          <div className="p-4 md:p-8 lg:p-16">
            <div className="space-y-2 font-montserrat text-sm font-normal leading-relaxed uppercase tracking-wide md:text-base">
              <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</p>
              <p>ADIPISCING ELIT, SED DO EIUSMOD TEMPOR</p>
              <p>INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.</p>
            </div>
            <button
              onClick={handleCTAClick}
              className="mt-6 font-montserrat text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80 md:text-base"
              aria-label="Check the lineup"
            >
              CHECK THE LINEUP →
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh]">
          <Image
            src="/images/featured-product-left-side-image.png"
            alt="Featured product left"
            fill
            className="object-cover"
            quality={100}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        {/* Image */}
        <div className="relative min-h-[70vh] bg-iron md:min-h-[80vh] lg:min-h-[90vh]">
          <Image
            src="/images/featured-product-right-side-image.png"
            alt="Featured product right"
            fill
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Text Block - Light Blue-Grey Background */}
        <div className="bg-iron text-night">
          <div className="p-4 md:p-8 lg:p-16">
            <div className="space-y-2 font-montserrat text-sm font-normal leading-relaxed uppercase tracking-wide md:text-base">
              <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</p>
              <p>ADIPISCING ELIT, SED DO EIUSMOD TEMPOR</p>
              <p>INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.</p>
            </div>
            <button
              onClick={handleCTAClick}
              className="mt-6 font-montserrat text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80 md:text-base"
              aria-label="Check the lineup"
            >
              CHECK THE LINEUP →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
