"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="grid min-h-[calc(100vh-196px)] grid-cols-1 md:grid-cols-2">
      {/* Image Column */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[calc(100vh-196px)]">
        <Image
          src="/images/contact-section-image.png"
          alt="Contact FalseNine"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Form Column */}
      <div className="flex h-full flex-col bg-white text-night">
        <div className="flex flex-1 flex-col justify-between py-8 sm:py-10 md:py-12 lg:py-16">
          {/* Header Section */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <p className="max-w-md font-montserrat text-xs font-normal leading-relaxed uppercase tracking-[0.35em] text-night/60 sm:text-sm md:text-base lg:text-lg">
              Your direct line to the squad. Questions, collabs, or just want to
              talk football —{" "}
              <span className="text-flame">we&apos;re listening.</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-3 font-montserrat font-bold text-[10px] uppercase tracking-[0.35em] text-night sm:mt-6 sm:gap-4 sm:text-xs md:text-sm">
              <span>DROP</span>
              <span>PLAY</span>
              <span>REPRESENT</span>
            </div>
          </div>

          {/* Form Section */}
          <form className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <div className="space-y-4 sm:space-y-6">
              <label className="block">
                <span className="font-montserrat text-[10px] font-normal uppercase tracking-[0.3em] text-night/50 sm:text-xs">
                  Name..?
                </span>
                <input
                  type="text"
                  className="mt-1.5 w-full border-b border-night/50 bg-transparent pb-2 font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night sm:mt-2 sm:text-sm md:text-base"
                />
              </label>

              <label className="block">
                <span className="font-montserrat text-[10px] font-normal uppercase tracking-[0.3em] text-night/50 sm:text-xs">
                  Email..?
                </span>
                <input
                  type="email"
                  className="mt-1.5 w-full border-b border-night/50 bg-transparent pb-2 font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night sm:mt-2 sm:text-sm md:text-base"
                />
              </label>

              <label className="block">
                <span className="font-montserrat text-[10px] font-normal uppercase tracking-[0.3em] text-night/50 sm:text-xs">
                  Message..?
                </span>
                <textarea
                  rows={4}
                  className="mt-1.5 w-full resize-none border-b border-night/50 bg-transparent pb-2 font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night sm:mt-2 sm:text-sm md:text-base"
                />
              </label>

              <button
                type="submit"
                className="smooth-hover mt-4 inline-flex w-full items-center justify-center bg-night px-6 py-2.5 font-montserrat text-[10px] font-normal uppercase tracking-[0.3em] text-white hover:bg-night/90 active:scale-[0.98] sm:text-xs sm:w-auto md:px-8 md:py-3"
              >
                Send the Pass
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
