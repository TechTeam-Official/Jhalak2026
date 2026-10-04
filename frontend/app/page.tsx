"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import HouseFinder from "./components/HouseFinder";
import Pantheon from "./components/Pantheon";
import Footer from "./components/Footer";
import HouseRevealModal from "./components/HouseRevealModal";
import StoryModal from "./components/StoryModal";
import { HouseData, AllocationResult } from "./data/houses";

export default function Home() {
  const [revealedHouse, setRevealedHouse] = useState<HouseData | null>(null);
  const [academicInfo, setAcademicInfo] = useState<string | undefined>(undefined);
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

  // When triggered from HouseFinder
  const handleFinderReveal = (result: AllocationResult) => {
    setRevealedHouse(result.house);
    setAcademicInfo(result.academicInfo);
    setShowStoryModal(false);
  };

  // When clicked directly from Wheel or Pantheon
  const handleSelectHouse = (house: HouseData) => {
    setRevealedHouse(house);
    setAcademicInfo(undefined);
    setShowStoryModal(false);
  };

  const handleCloseModals = () => {
    setRevealedHouse(null);
    setShowStoryModal(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050811] text-slate-100 overflow-x-hidden flex flex-col justify-between">
      {/* Background Starry Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial nebula gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.08),rgba(2,6,23,0.95))]" />
        {/* Deep navy vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,23,42,0.4),rgba(5,8,17,0.98))]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero onSelectHouse={handleSelectHouse} />

        {/* Claim Your Throne / House Finder Section */}
        <HouseFinder onReveal={handleFinderReveal} />

        {/* Pantheon Section */}
        <Pantheon onSelectHouse={handleSelectHouse} />

        {/* Footer */}
        <Footer />
      </div>

      {/* House Reveal Modal */}
      {revealedHouse && !showStoryModal && (
        <HouseRevealModal
          house={revealedHouse}
          academicInfo={academicInfo}
          onClose={handleCloseModals}
          onOpenStory={() => setShowStoryModal(true)}
        />
      )}

      {/* Story Share Modal */}
      {revealedHouse && showStoryModal && (
        <StoryModal
          house={revealedHouse}
          academicInfo={academicInfo}
          onBack={() => setShowStoryModal(false)}
          onClose={handleCloseModals}
        />
      )}
    </main>
  );
}
