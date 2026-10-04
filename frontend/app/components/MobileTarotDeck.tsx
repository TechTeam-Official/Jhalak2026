"use client";

import { useState } from "react";
import Image from "next/image";
import { HOUSES, HouseData } from "../data/houses";

interface MobileTarotDeckProps {
  onSelectHouse: (house: HouseData) => void;
}

export default function MobileTarotDeck({ onSelectHouse }: MobileTarotDeckProps) {
  const [activeIndex, setActiveIndex] = useState(6); // Default to Aakash (index 6) as in Figma Mobile frame!
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevIndex = (activeIndex - 1 + HOUSES.length) % HOUSES.length;
  const nextIndex = (activeIndex + 1) % HOUSES.length;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40) {
      // Swipe left -> next
      setActiveIndex(nextIndex);
    } else if (diff < -40) {
      // Swipe right -> prev
      setActiveIndex(prevIndex);
    }
    setTouchStartX(null);
  };

  const activeHouse = HOUSES[activeIndex];
  const prevHouse = HOUSES[prevIndex];
  const nextHouse = HOUSES[nextIndex];

  return (
    <div
      className="relative w-full max-w-[380px] mx-auto flex flex-col items-center my-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tarot Deck Visual Container */}
      <div className="relative w-full h-[340px] flex items-center justify-center">
        {HOUSES.map((house, idx) => {
          let diff = idx - activeIndex;
          if (diff > 4) diff -= 8;
          if (diff < -3) diff += 8;

          let translateX = 0;
          let scale = 0.5;
          let rotate = "0deg";
          let opacity = 0;
          let zIndex = 0;
          let classNameExt = "";

          if (diff === 0) {
            translateX = 0;
            scale = 1;
            rotate = "0deg";
            opacity = 1;
            zIndex = 20;
            classNameExt = "border-2 border-amber-400/70 shadow-[0_0_30px_rgba(212,175,55,0.45),0_10px_25px_rgba(0,0,0,0.8)]";
          } else if (diff === -1) {
            translateX = -95;
            scale = 0.72;
            rotate = "-12deg";
            opacity = 0.4;
            zIndex = 10;
            classNameExt = "border border-amber-400/25 shadow-lg hover:opacity-60";
          } else if (diff === 1) {
            translateX = 95;
            scale = 0.72;
            rotate = "12deg";
            opacity = 0.4;
            zIndex = 10;
            classNameExt = "border border-amber-400/25 shadow-lg hover:opacity-60";
          } else if (diff < -1) {
            translateX = -150;
            scale = 0.5;
            opacity = 0;
            zIndex = 0;
          } else if (diff > 1) {
            translateX = 150;
            scale = 0.5;
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={house.id}
              className={`absolute top-1/2 left-1/2 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-center ${classNameExt}`}
              style={{
                width: "184px",
                height: "298px",
                marginTop: "-149px",
                marginLeft: "-92px",
                transform: `translate(${translateX}px, 0) scale(${scale}) rotate(${rotate})`,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: opacity === 0 ? "none" : "auto",
              }}
              onClick={() => {
                if (diff === 0) onSelectHouse(house);
                else if (diff === -1) setActiveIndex(prevIndex);
                else if (diff === 1) setActiveIndex(nextIndex);
              }}
            >
              <Image
                src={house.cardImage}
                alt={house.name}
                fill
                sizes="(max-width: 768px) 200px"
                className="object-cover"
                priority={Math.abs(diff) <= 1}
              />
              {diff === 0 && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-amber-300/10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* 8 Pagination Indicators (Dots / Pills) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {HOUSES.map((house, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={house.id}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "w-6 h-2 bg-gradient-to-r from-amber-400 to-amber-200 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  : "w-2 h-2 bg-amber-400/30 hover:bg-amber-400/60"
              }`}
              aria-label={`Select ${house.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}
