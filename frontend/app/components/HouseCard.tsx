"use client";

import Image from "next/image";
import { HouseData } from "../data/houses";

interface HouseCardProps {
  house: HouseData;
  onClick?: (house: HouseData) => void;
}

export default function HouseCard({ house, onClick }: HouseCardProps) {
  return (
    <div
      onClick={onClick ? () => onClick(house) : undefined}
      className={`group relative rounded-xl overflow-hidden border border-slate-800/80 bg-[#0d1220]/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/80 hover:shadow-[0_0_28px_rgba(212,175,55,0.25)] flex flex-col ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Top Badge Compartment */}
      <div 
        className="relative w-full h-44 sm:h-48 flex items-center justify-center p-0 border-b border-slate-800/60 overflow-hidden"
        style={{ backgroundColor: house.badgeBg }}
      >
        {/* Subtle accent halo for transparent PNGs */}
        <div
          className="absolute z-0 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: house.accentColor }}
        />

        <div className="relative z-10 w-full h-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ transform: `scale(${house.badgeScale || 1})` }}
          >
            <Image
              src={house.badgeImage}
              alt={`${house.name} crest`}
              fill
              sizes="(max-width: 640px) 150px, 200px"
              className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Text Compartment */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#0d1220] to-[#080c16]">
        <div>
          {/* House Name */}
          <h3 className="font-playfair text-xl sm:text-2xl font-bold tracking-wider text-slate-100 uppercase group-hover:text-amber-200 transition-colors">
            {house.name}
          </h3>

          {/* Deity Name */}
          <p className="font-playfair text-sm font-semibold text-slate-300 mt-1">
            {house.deity}
          </p>

          {/* Deity Domain */}
          <p className="font-inter text-xs text-slate-400">
            {house.deityTitle}
          </p>
        </div>


      </div>
    </div>
  );
}
