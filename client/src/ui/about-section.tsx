"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="grid min-h-[calc(100vh-196px)] grid-cols-1 md:grid-cols-2">
      {/* Text Column */}
      <div className="bg-white text-night">
        <div className="flex h-full flex-col justify-between py-8 sm:py-10 md:py-12 lg:py-16">
          {/* Top Content */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <p className="max-w-md font-montserrat text-xs font-normal leading-relaxed uppercase tracking-wide text-night/70 sm:text-sm md:text-base lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Bottom Content */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <div className="flex flex-wrap gap-3 font-montserrat font-bold text-[10px] uppercase tracking-[0.35em] text-night sm:gap-4 sm:text-xs md:text-sm">
              <span>Keyword</span>
              <span>Keyword</span>
            </div>

            <p className="mt-4 max-w-sm font-montserrat text-xs font-normal leading-relaxed uppercase tracking-[0.2em] text-night/70 sm:mt-6 sm:text-sm md:text-base lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Image Column */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[calc(100vh-196px)]">
        <Image
          src="/images/about-section-image.png"
          alt="About FalseNine"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
    </section>
  );
}
