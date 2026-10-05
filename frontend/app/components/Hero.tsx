"use client";

import Image from "next/image";
import Header from "./Header";
import CelestialWheel from "./CelestialWheel";
import MobileTarotDeck from "./MobileTarotDeck";
import { HouseData } from "../data/houses";

interface HeroProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function Hero({ onSelectHouse }: HeroProps) {

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden pt-1 pb-6 sm:pb-8 flex flex-col items-center justify-center">
      {/* Background Celestial Atmosphere — Authoritative Figma 'Marble heavens' with planets, orbital rings, and cosmic linework */}
      <div className="absolute inset-0 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <Image
          src="/images/bg/marble-heavens.png"
          alt=""
          fill
          className="object-cover object-top opacity-22"
          priority
        />
      </div>

      {/* Decorative Classical Clouds at top corners */}
      <div className="absolute top-0 left-0 w-52 sm:w-80 md:w-[460px] h-40 sm:h-60 pointer-events-none opacity-30 mix-blend-screen z-0 [mask-image:radial-gradient(ellipse_at_top_left,black_40%,transparent_70%)]">
        <Image
          src="/images/hero/cloud-left.png"
          alt=""
          fill
          className="object-contain object-top-left"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-52 sm:w-80 md:w-[460px] h-40 sm:h-60 pointer-events-none opacity-30 mix-blend-screen z-0 [mask-image:radial-gradient(ellipse_at_top_right,black_40%,transparent_70%)]">
        <Image
          src="/images/hero/cloud-right.png"
          alt=""
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Hero Headings (Absolutely Centered on Desktop, Shifted up on Mobile) */}
      <div className="absolute top-[20%] sm:top-[25%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none w-full px-4 mt-8 sm:mt-0">
        <div className="relative flex justify-center items-center w-full">
          {/* Glowing Aura Behind Logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl scale-[1.2]" />
          
          <div className="relative z-10 w-[360px] h-[140px] sm:w-[450px] sm:h-[160px] md:w-[600px] md:h-[220px] lg:w-[700px] lg:h-[260px] xl:w-[800px] xl:h-[280px] drop-shadow-[0_0_35px_rgba(212,175,55,0.45)] scale-110 sm:scale-100">
            <Image
              src="/images/hero/jhalak-header.png"
              alt="JHALAK '26"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Responsive Visual Centerpiece */}
      {/* Desktop / Tablet View: Celestial Wheel */}
      <div className="relative z-20 w-full hidden md:flex flex-1 items-center justify-center min-h-0">
        <div className="scale-[0.55] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-100 origin-center transition-transform">
          <CelestialWheel onSelectHouse={onSelectHouse} />
        </div>
      </div>

      {/* Mobile View: Tarot Card Deck Carousel */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-end pb-8 sm:pb-12 md:hidden">
        <MobileTarotDeck onSelectHouse={onSelectHouse} />
      </div>


    </section>
  );
}
