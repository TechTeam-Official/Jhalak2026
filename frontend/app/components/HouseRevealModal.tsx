"use client";

import { useEffect } from "react";
import Image from "next/image";
import { HouseData } from "../data/houses";

interface HouseRevealModalProps {
  house: HouseData;
  academicInfo?: string;
  onClose: () => void;
  onOpenStory: () => void;
}

export default function HouseRevealModal({
  house,
  onClose,
}: HouseRevealModalProps) {
  // ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-2xl border border-amber-400/50 bg-[#090d18] shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.25)] flex flex-col items-center overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-end px-5 pt-4 pb-2 z-20">

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-amber-400/30 bg-black/50 flex items-center justify-center text-amber-200 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
            title="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Deity Artwork / Visual Hero */}
        <div className="relative w-full overflow-visible flex items-center justify-center mt-2 mb-6">
          {/* Ambient Glow */}
          <div
            className="absolute inset-0 opacity-30 blur-[40px] pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${house.accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Deity Image inside frame */}
          <div className="relative w-[220px] sm:w-[260px] h-[350px] sm:h-[416px] rounded-xl overflow-hidden border border-amber-400/50 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <Image
              src={house.cardImage}
              alt={`${house.name} - ${house.deity}`}
              fill
              sizes="(max-width: 640px) 220px, 260px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* House Content */}
        <div className="w-full px-6 pb-8 flex flex-col items-center text-center z-10">
          <p className="font-playfair italic text-amber-200/90 text-sm sm:text-base mt-2 font-semibold tracking-wide">
            {house.deityTitle}
          </p>

          <p className="font-inter italic text-xs sm:text-sm text-slate-300 mt-2 max-w-xs">
            &ldquo;{house.slogan}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
