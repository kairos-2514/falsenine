"use client";

import Image from "next/image";

// ============================================================================
// HERO SECTION COMPONENT
// ============================================================================

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Bottom Right - Descriptive Text */}
        <div className="absolute bottom-[364px] right-16 hidden space-y-8 text-right lg:block">
          <p className="font-montserrat text-lg font-normal uppercase tracking-[0.2em] text-white">
            ( PLAY DIFFERENT )
          </p>
          <div className="space-y-1 font-montserrat text-base font-normal leading-relaxed tracking-wide text-white">
            <p>BORN FROM THE GAME.</p>
            <p>BUILT FOR THE STREETS.</p>
            <p>FALSE NINE REDEFINES HOW</p>
            <p>FOOTBALL MEETS FASHION.</p>
          </div>
        </div>

        {/* Bottom Left  */}
        <div className="absolute bottom-16 left-4 md:left-8 lg:left-16">
          <h1
            className="font-thunder font-extralight uppercase leading-[0.85] tracking-tight text-white"
            style={{ fontSize: "clamp(80px, 15vw, 224px)" }}
          >
            FALSE
            <br />
            NINE
          </h1>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-section-image.png"
          alt="FalseNine Hero"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
      </div>
    </section>
  );
}
