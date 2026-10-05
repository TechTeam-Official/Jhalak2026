"use client";

import { useState } from "react";
import { SCHOOLS, SchoolType, allocateHouse, AllocationResult } from "../data/houses";

interface HouseFinderProps {
  onReveal: (result: AllocationResult) => void;
}

const ChevronIcon = ({ isOpen }: { isOpen?: boolean }) => (
  <svg
    className={`w-4 h-4 text-amber-500/70 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:text-amber-400 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

const inputClasses =
  "w-full h-14 bg-[#0a0f1c]/90 border-2 border-[#1a233a] hover:border-amber-500/50 focus:border-amber-400 rounded-xl px-5 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/15 transition-all duration-300 shadow-inner";

interface Option {
  label: string;
  value: string;
}

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative group">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputClasses} flex items-center justify-between cursor-pointer select-none ${
          isOpen ? "border-amber-400 ring-4 ring-amber-500/15" : ""
        }`}
      >
        <span className={value ? "text-slate-100" : "text-slate-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-full mt-2 rounded-xl bg-[#090d1a]/95 border border-amber-500/30 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-fadeIn py-1">
            <ul className="max-h-[104px] overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-5 py-3.5 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0 ${
                    value === opt.value
                      ? "bg-amber-500/20 text-amber-300 font-bold"
                      : "text-slate-300 hover:bg-amber-500/10 hover:text-amber-100"
                  }`}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default function HouseFinder({ onReveal }: HouseFinderProps) {
  const [school, setSchool] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [registrationId, setRegistrationId] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isEngineeringUG = school === "Engineering and Technology" && program === "UG";
  const isIdValid = isEngineeringUG ? /^\d{3}$/.test(registrationId) : true;
  const isIdInvalid = isEngineeringUG && registrationId.length > 0 && !isIdValid;

  // Compute current preview allocation
  const currentAllocation = allocateHouse(school, program, registrationId);



  const handleReveal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);

    if (!school || !program) return;
    if (isEngineeringUG && !isIdValid) return;

    if (currentAllocation) {
      onReveal(currentAllocation);
    }
  };

  const isButtonDisabled = !school || !program || (isEngineeringUG && !isIdValid);



  return (
    <section id="finder" className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 my-12 sm:my-20">
      <div className="relative p-8 sm:p-12 pb-12 sm:pb-16 flex flex-col">
        {/* Background layer with hidden overflow to contain the glow */}
        <div className="absolute inset-0 rounded-3xl border border-amber-500/20 bg-[#090d1a]/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(212,175,55,0.05)] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Content layer that allows dropdowns to overflow visibly */}
        <div className="relative z-10">
          {/* Top Gold Accent Line */}
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

        {/* Headings */}
        <div className="relative text-center mb-10 z-10">
          <h2 className="font-playfair font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-widest text-gold-gradient uppercase drop-shadow-md">
            Find Your House
          </h2>
          <p className="font-inter text-xs sm:text-sm text-slate-300/80 mt-3 font-medium tracking-wide">
            Enter your Details to Know your House
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleReveal} className="relative z-10 flex flex-col items-center w-full mt-10">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 w-full relative z-20">
            {/* Field 1: School of study */}
            <div className="flex-1 min-w-[260px] max-w-sm flex flex-col gap-2.5 animate-fadeIn">
              <label className="font-cinzel text-[11px] font-bold tracking-[0.15em] text-amber-200/90 uppercase ml-1">
                School of Study
              </label>
              <CustomSelect
                placeholder="Select Your School..."
                value={school}
                options={SCHOOLS.map((s) => ({ label: s, value: s }))}
                onChange={(val) => {
                  setSchool(val as SchoolType);
                  setRegistrationId("");
                  setIsTouched(false);
                }}
              />
            </div>

            {/* Field 2: Academic Program */}
            {school && (
              <div className="flex-1 min-w-[260px] max-w-sm flex flex-col gap-2.5 animate-fadeIn">
                <label className="font-cinzel text-[11px] font-bold tracking-[0.15em] text-amber-200/90 uppercase ml-1">
                  Academic Program
                </label>
                <CustomSelect
                  placeholder="Choose Level..."
                  value={program}
                  options={[
                    { label: "Undergraduate (UG)", value: "UG" },
                    { label: "Postgraduate (PG)", value: "PG" },
                  ]}
                  onChange={(val) => {
                    setProgram(val);
                    setRegistrationId("");
                    setIsTouched(false);
                  }}
                />
              </div>
            )}

            {/* Field 3: Registration ID */}
            {isEngineeringUG && (
              <div className="flex-1 min-w-[260px] max-w-sm flex flex-col gap-2.5 animate-fadeIn">
                <label className="font-cinzel text-[11px] font-bold tracking-[0.15em] text-amber-200/90 uppercase ml-1 flex justify-between">
                  <span>Registration No. (Last 3 Digits)</span>
                  {isIdInvalid && <span className="text-red-400">Invalid</span>}
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="E.g., 042"
                    value={registrationId}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setRegistrationId(val);
                    }}
                    className={`${inputClasses} cursor-text text-slate-100 placeholder-slate-500 ${
                      isIdInvalid ? "!border-red-500 focus:ring-red-500/20 text-red-100" : ""
                    }`}
                  />
                  {isIdInvalid && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-bold">
                      !
                    </div>
                  )}
                </div>
                {isIdInvalid ? (
                  <p className="text-[10px] text-red-400/90 mt-1 ml-1 leading-tight">
                    Enter exactly 3 numeric digits (0–9).
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400/80 mt-1 ml-1 leading-tight">
                    Last 3 digits of your Register Number.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="w-full flex flex-col items-center mt-10 sm:mt-12 z-10">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full sm:w-auto min-w-[320px] h-14 btn-gold rounded-xl flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] font-extrabold cursor-pointer disabled:cursor-not-allowed group"
            >
              <span>REVEAL MY HOUSE</span>
              <span className="text-lg leading-none transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
}
