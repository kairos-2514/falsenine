"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="grid min-h-[calc(100vh-196px)] grid-cols-1 md:grid-cols-2">
      {/* Image Column */}
      <div className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[calc(100vh-196px)]">
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
        <div className="flex flex-1 flex-col justify-between">
          {/* Header Section */}
          <div className="px-5 pt-6 sm:px-6 sm:pt-8 md:px-8 md:pt-10 lg:px-16 lg:pt-16">
            <p className="max-w-md font-montserrat text-sm font-normal leading-relaxed uppercase tracking-[0.35em] text-night/60">
              Your direct line to the squad. Questions, collabs, or just want to
              talk football —{" "}
              <span className="text-flame">we&apos;re listening.</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-4 font-montserrat font-bold text-xs uppercase tracking-[0.35em] text-night">
              <span>Keyword</span>
              <span>Keyword</span>
              <span>Keyword</span>
            </div>
          </div>

          {/* Form Section */}
          <form className="px-5 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10 lg:px-16 lg:pb-16">
            <div className="space-y-6">
              <label className="block">
                <span className="font-montserrat text-xs font-normal uppercase tracking-[0.3em] text-night/50">
                  Name..?
                </span>
                <input
                  type="text"
                  className="mt-2 w-full border-b border-night/50 bg-transparent pb-2 font-montserrat text-sm font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night"
                />
              </label>

              <label className="block">
                <span className="font-montserrat text-xs font-normal uppercase tracking-[0.3em] text-night/50">
                  Email..?
                </span>
                <input
                  type="email"
                  className="mt-2 w-full border-b border-night/50 bg-transparent pb-2 font-montserrat text-sm font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night"
                />
              </label>

              <label className="block">
                <span className="font-montserrat text-xs font-normal uppercase tracking-[0.3em] text-night/50">
                  Message..?
                </span>
                <textarea
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-night/50 bg-transparent pb-2 font-montserrat text-sm font-normal uppercase tracking-[0.2em] text-night outline-none transition-colors focus:border-night"
                />
              </label>

              <button
                type="submit"
                className="smooth-hover mt-4 inline-flex w-full items-center justify-center bg-night px-6 py-2.5 font-montserrat text-xs font-normal uppercase tracking-[0.3em] text-white hover:bg-night/90 active:scale-[0.98] sm:w-auto"
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
