"use client";

import HouseCard from "./HouseCard";
import { HOUSES, HouseData } from "../data/houses";

interface PantheonProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function Pantheon({ onSelectHouse }: PantheonProps) {
  return (
    <section id="pantheon" className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
  
        <h2 className="font-playfair font-bold text-xl sm:text-3xl md:text-5xl tracking-wider sm:tracking-widest text-slate-100 uppercase mt-2.5">
          EIGHT HOUSES, EIGHT LEGACIES  
        </h2>
        <p className="font-inter text-base sm:text-lg text-slate-400 mt-3 max-w-xl mx-auto">
          A constellation of courage, creativity, and rivalry.
        </p>
      </div>

      {/* 8 House Cards Grid: Desktop 4x2, Tablet & Mobile 2x4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {HOUSES.map((house) => (
          <HouseCard
            key={house.id}
            house={house}
          />
        ))}
      </div>
    </section>
  );
}
