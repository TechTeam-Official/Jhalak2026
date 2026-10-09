"use client";

import { useState } from "react";
import Image from "next/image";
import { HOUSES, HouseData } from "../data/houses";

interface CelestialWheelProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function CelestialWheel({ onSelectHouse }: CelestialWheelProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredHouse, setHoveredHouse] = useState<string | null>(null);

  // 8 houses in exact radial clockwise order starting from top (0 deg)
  const orderedHouses = [
    HOUSES.find((h) => h.id === "trishul")!,
    HOUSES.find((h) => h.id === "brahmos")!,
    HOUSES.find((h) => h.id === "astra")!,
    HOUSES.find((h) => h.id === "prithvi")!,
    HOUSES.find((h) => h.id === "agni")!,
    HOUSES.find((h) => h.id === "shaurya")!,
    HOUSES.find((h) => h.id === "aakash")!,
    HOUSES.find((h) => h.id === "nag")!,
  ];

  return (
    <div
      className="relative w-full max-w-[960px] h-[720px] sm:h-[800px] lg:h-[920px] mx-auto flex items-center justify-center my-2 select-none overflow-visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredHouse(null);
      }}
    >
      {/* Background Orbital Rings (Fixed Center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <div className="w-[500px] sm:w-[620px] lg:w-[740px] h-[500px] sm:h-[620px] lg:h-[740px] rounded-full bg-gradient-to-tr from-amber-500/10 via-sky-500/5 to-transparent blur-3xl" />

        {/* Outer Circular Orbit Ring */}
        <div className="absolute w-[440px] sm:w-[550px] lg:w-[640px] h-[440px] sm:h-[550px] lg:h-[640px] rounded-full border border-amber-400/20 shadow-[0_0_25px_rgba(212,175,55,0.08)]" />

        {/* Inner Dashed Guide Ring */}
        <div className="absolute w-[300px] sm:w-[380px] lg:w-[440px] h-[300px] sm:h-[380px] lg:h-[440px] rounded-full border border-amber-400/10 border-dashed" />
      </div>

      {/* Orbiting Cards Ring Container (Rotates 360 deg over 32s) */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 transition-all ${
          isPaused ? "animate-orbit animate-orbit-paused" : "animate-orbit"
        }`}
      >
        {orderedHouses.map((house, idx) => {
          const angle = idx * 45; // 0, 45, 90, 135, 180, 225, 270, 315
          const isCurrentHovered = hoveredHouse === house.id;

          return (
            <div
              key={house.id}
              className="absolute left-0 top-0 cursor-pointer transition-all duration-300"
              style={{
                // Position card along the radius pointing outward
                transform: `rotate(${angle}deg) translateY(calc(-1 * var(--wheel-radius))) translate(-50%, -50%)`,
                transformOrigin: "0 0",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectHouse(house);
              }}
              onMouseEnter={() => setHoveredHouse(house.id)}
            >
              {/* Individual Card Graphic */}
              <div
                className={`relative w-[92px] h-[150px] sm:w-[114px] sm:h-[185px] lg:w-[130px] lg:h-[212px] rounded-lg overflow-hidden transition-all duration-300 ${
                  isCurrentHovered
                    ? "scale-115 -translate-y-2 shadow-[0_0_30px_rgba(212,175,55,0.9)] z-40 border border-amber-300"
                    : "shadow-[0_4px_16px_rgba(0,0,0,0.7)] border border-amber-400/40 hover:border-amber-300/80"
                }`}
              >
                <Image
                  src={house.cardImage}
                  alt={`${house.name} - ${house.deity}`}
                  fill
                  sizes="(max-width: 640px) 100px, 140px"
                  className="object-cover"
                  priority={idx < 4}
                />

                {/* Subtle highlight sheen on hover */}
                {isCurrentHovered && (
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-transparent to-white/15 pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}
