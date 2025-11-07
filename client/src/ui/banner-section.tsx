"use client";

import Image from "next/image";
import { useNavigation, ROUTES } from "@/lib/navigation";

// ============================================================================
// BANNER SECTION COMPONENT
// ============================================================================

export default function BannerSection() {
  const { navigateTo } = useNavigation();

  const handleCTAClick = () => {
    navigateTo(ROUTES.DRIP_ROOM);
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Banner section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner-section-image.png"
          alt="Banner section background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Left Text Block - Top Left */}
        <div className="absolute left-16 top-[196px] w-[400px] max-w-[500px] space-y-6 text-left md:w-[500px]">
          <div className="space-y-2 font-montserrat text-sm font-normal leading-relaxed uppercase tracking-wide text-white md:text-base">
            <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</p>
            <p>ADIPISCING ELIT, SED DO EIUSMOD TEMPOR</p>
            <p>INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.</p>
            <p>UT ENIM AD MINIM VENIAM, QUIS NOSTRUD</p>
            <p>EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP</p>
            <p>EX EA COMMODO CONSEQUAT.</p>
          </div>
          <button
            onClick={handleCTAClick}
            className="font-montserrat text-base font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80 md:text-lg"
            aria-label="Check the lineup"
          >
            CHECK THE LINEUP →
          </button>
        </div>

        {/* Right Text Block - Bottom Right */}
        <div className="absolute bottom-[196px] right-16 w-[400px] max-w-[500px] space-y-2 text-right font-montserrat text-sm font-normal leading-relaxed uppercase tracking-wide text-white md:w-[500px] md:text-base">
          <p>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR</p>
          <p>ADIPISCING ELIT, SED DO EIUSMOD TEMPOR</p>
          <p>INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.</p>
          <p>UT ENIM AD MINIM VENIAM, QUIS NOSTRUD</p>
          <p>EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP</p>
          <p>EX EA COMMODO CONSEQUAT.</p>
        </div>
      </div>
    </section>
  );
}

