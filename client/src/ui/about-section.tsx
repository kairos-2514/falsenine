"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="grid min-h-[calc(100vh-196px)] grid-cols-1 md:grid-cols-2">
      {/* Text Column */}
      <div className="bg-white text-night">
        <div className="flex h-full flex-col justify-between">
          {/* Top Content */}
          <div className="px-5 pt-6 sm:px-6 sm:pt-8 md:px-8 md:pt-10 lg:px-16 lg:pt-16">
            <p className="max-w-md font-montserrat text-sm font-normal leading-relaxed uppercase tracking-wide text-night/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Bottom Content */}
          <div className="px-5 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:px-16 lg:pb-16">
            <div className="flex flex-wrap gap-4 font-montserrat font-bold text-xs uppercase tracking-[0.35em] text-night">
              <span>Keyword</span>
              <span>Keyword</span>
            </div>

            <p className="mt-6 max-w-sm font-montserrat text-sm font-normal leading-relaxed uppercase tracking-[0.2em] text-night/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Image Column */}
      <div className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[calc(100vh-196px)]">
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
