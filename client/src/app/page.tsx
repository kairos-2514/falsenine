"use client";

import React from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-luna">
      {/* Hero / Main Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="font-falsenine text-5xl md:text-6xl tracking-widest mb-6">
          WELCOME TO <span className="text-flame">FALSE NINE</span>
        </h1>
        <p className="font-montserrat text-night max-w-lg text-sm md:text-base leading-relaxed uppercase">
          Game built. Street tested. Premium football-inspired streetwear for
          players who move different.
        </p>
      </section>
    </main>
  );
}
