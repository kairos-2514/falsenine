import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#4169B8] overflow-hidden">
      {/* Hero Content */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Large Text - Bottom Left */}
        <div className="absolute left-16 bottom-16 z-20">
          <h1 className="text-white text-[9rem] lg:text-[12rem] xl:text-[14rem] font-thunder font-extralight leading-[0.85] tracking-tight">
            FALSE
            <br />
            NINE
          </h1>
        </div>

        {/* Full Screen Center Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-section-image.png"
            alt="Model wearing False Nine jersey"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side Text */}
        <div className="absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 z-20 text-white text-right space-y-12">
          <p className="text-lg lg:text-xl tracking-[0.4em]">
            ( PLAY DIFFERENT )
          </p>
          <div className="text-xs lg:text-sm leading-loose tracking-[0.25em] space-y-1">
            <p>BORN FROM THE GAME.</p>
            <p>BUILT FOR THE STREETS.</p>
            <p>FALSE NINE REDEFINES HOW</p>
            <p>FOOTBALL MEETS FASHION.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
