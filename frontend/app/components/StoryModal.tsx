"use client";

import { useState } from "react";
import Image from "next/image";
import { HouseData } from "../data/houses";

interface StoryModalProps {
  house: HouseData;
  academicInfo?: string;
  onBack: () => void;
  onClose: () => void;
}

export default function StoryModal({
  house,
  academicInfo,
  onBack,
  onClose,
}: StoryModalProps) {
  const [copied, setCopied] = useState(false);

  // Determine story image (fallback to custom 9:16 layout if not aakash/astra)
  const storyImg =
    house.storyImage ||
    (house.id === "aakash"
      ? "/images/stories/aakash-9_16.png"
      : house.id === "astra"
      ? "/images/stories/astra-9_16.png"
      : null);

  const handleDownloadBadge = () => {
    const link = document.createElement("a");
    link.href = house.badgeImage;
    link.download = `${house.name}_House_Badge.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadStory = () => {
    const link = document.createElement("a");
    link.href = storyImg || house.cardImage;
    link.download = `${house.name}_Story_1080x1920.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareText = `I have been chosen by House ${house.name} (${house.deity}) for JHALAK '26 — OLYMPUS ASCENDANT! Claim your throne now.`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Jhalak '26 — House ${house.name}`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }

    // Fallback: copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-[420px] rounded-2xl border border-amber-400/40 bg-[#090d19] p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,175,55,0.25)] flex flex-col items-center my-auto">
        {/* Top Controls: Back, Title, Close */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800/80">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-200 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
            title="Back to House Reveal"
          >
            ←
          </button>

          <div className="text-center">
            <h3 className="font-playfair font-bold text-lg text-slate-100">
              Share to Story
            </h3>
            <p className="font-inter text-[11px] text-slate-400">
              Your {house.name} story · portrait 9:16
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-200 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* 9:16 Story Card Preview */}
        <div className="relative w-[210px] sm:w-[230px] aspect-[9/16] rounded-xl overflow-hidden border border-amber-400/50 shadow-[0_0_25px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.3)] my-5 bg-[#050811]">
          {storyImg ? (
            <Image
              src={storyImg}
              alt={`${house.name} Story Card`}
              fill
              sizes="240px"
              className="object-cover"
              priority
            />
          ) : (
            /* Custom 9:16 Story Composition for houses without standalone 9:16 Figma file */
            <div className="relative w-full h-full flex flex-col items-center justify-between p-3.5 bg-gradient-to-b from-[#0a1020] via-[#050811] to-[#04060d]">
              {/* Top Seals */}
              <div className="w-full flex items-center justify-between pt-1">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-amber-400/40">
                  <Image src="/images/header/dsa-logo.png" alt="DSA" fill className="object-contain" />
                </div>
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-amber-400/40">
                  <Image src="/images/header/srmist-seal.png" alt="SRMIST" fill className="object-contain" />
                </div>
              </div>

              {/* Title Header */}
              <div className="text-center -mt-2">
                <span className="font-cinzel-dec text-sm font-bold text-gold-gradient block">
                  JHALAK &apos;26
                </span>
                <span className="font-cinzel text-[7px] text-amber-200/90 tracking-widest uppercase">
                  OLYMPUS ASCENDANT
                </span>
              </div>

              {/* Deity Artwork */}
              <div className="relative w-[130px] h-[190px] rounded-lg overflow-hidden border border-amber-400/40 shadow-md">
                <Image
                  src={house.cardImage}
                  alt={house.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Badge & Slogan */}
              <div className="flex flex-col items-center text-center -mt-1 pb-1">
                <div className="relative w-9 h-9 rounded-full overflow-hidden p-1 border border-amber-400/50 bg-black/60 shadow-md mb-1">
                  <Image src={house.badgeImage} alt={house.name} fill className="object-contain" />
                </div>
                <span className="text-[7px] uppercase tracking-widest text-amber-200/80 font-sans">
                  MY OLYMPIAN SPIRIT
                </span>
                <h4 className="font-playfair text-base font-bold uppercase text-gold-gradient">
                  {house.name}
                </h4>
                <p className="font-serif italic text-[9px] text-slate-300">
                  {house.deity} · {house.deityTitle}
                </p>
                <span className="font-sans text-[7px] tracking-wider text-amber-400/80 uppercase mt-1">
                  8 HOUSES. 1 THRONE.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Specification Caption */}
        <p className="font-inter text-[11px] text-slate-400 mb-4">
          1080 × 1920 · PNG export specification
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={handleDownloadBadge}
            className="w-full h-11 btn-gold rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold cursor-pointer"
          >
            <span>Download My House Badge</span>
            <span className="text-sm">⤓</span>
          </button>

          <button
            onClick={handleDownloadStory}
            className="w-full h-11 rounded-lg border border-amber-400/40 bg-black/40 hover:bg-amber-400/10 text-amber-200 hover:text-amber-100 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
          >
            <span>Download Story Graphic</span>
            <span className="text-sm">⤓</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full h-11 rounded-lg border border-amber-400/30 bg-[#060913] hover:border-amber-400/70 text-slate-200 hover:text-white flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
          >
            <span>{copied ? "Link Copied to Clipboard!" : "Share to Story"}</span>
            <span className="text-sm">⠷</span>
          </button>
        </div>

        {/* Bottom microcopy */}
        <p className="font-inter text-[10px] text-slate-500 mt-3 text-center">
          Static preview · download and share are functional.
        </p>
      </div>
    </div>
  );
}
