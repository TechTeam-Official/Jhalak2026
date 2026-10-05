export interface HouseData {
  id: string;
  name: string;
  deity: string;
  deityTitle: string;
  slogan: string;
  eligibility: string;
  accentColor: string;
  accentName: string;
  cardImage: string;
  badgeImage: string;
  badgeBg: string;
  badgeScale?: number;
  storyImage?: string;
  revealImage?: string;
  description: string;
}

export const HOUSES: HouseData[] = [
  {
    id: "trishul",
    name: "TRISHUL",
    deity: "Poseidon",
    deityTitle: "God of the Sea",
    slogan: "Rule the tides. Command the storm.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#0284c7",
    accentName: "Deep Azure",
    cardImage: "/images/cards/trishul-hd2.png",
    badgeImage: "/images/badges/trishul-hd2.png",
    badgeBg: "#060913",
    badgeScale: 2.2,
    description: "God of the sea; iconic three-pronged trident",
  },
  {
    id: "brahmos",
    name: "BRAHMOS",
    deity: "Ares",
    deityTitle: "God of War",
    slogan: "Strength forged in combat. Fearless and supreme.",
    eligibility: "Non-Medical PG · Management UG (BBA)",
    accentColor: "#e11d48",
    accentName: "Crimson",
    cardImage: "/images/cards/brahmos-hd2.png",
    badgeImage: "/images/badges/brahmos-hd2.png",
    badgeBg: "#000000",
    description: "God of war; weapons, combat and military power",
  },
  {
    id: "astra",
    name: "ASTRA",
    deity: "Athena",
    deityTitle: "Goddess of Wisdom & Warfare",
    slogan: "Let wisdom lead. Let courage follow.",
    eligibility: "FSH/FLAB and Law UG",
    accentColor: "#10b981",
    accentName: "Emerald",
    cardImage: "/images/cards/astra-hd2.png",
    badgeImage: "/images/badges/astra-hd2.png",
    badgeBg: "#380a48",
    revealImage: "/images/reveals/astra-modal-crop-hd2.png",
    storyImage: "/images/stories/astra-9_16-hd2.png",
    description: "Goddess of wisdom, strategy and warfare",
  },
  {
    id: "prithvi",
    name: "PRITHVI",
    deity: "Gaia",
    deityTitle: "Primordial Earth Mother",
    slogan: "Rooted in power. Unshakable as mountains.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#16a34a",
    accentName: "Verdant Jade",
    cardImage: "/images/cards/prithvi-hd2.png",
    badgeImage: "/images/badges/prithvi-hd2.png",
    badgeBg: "#050505",
    description: "Primordial goddess and personification of Earth",
  },
  {
    id: "agni",
    name: "AGNI",
    deity: "Hephaestus",
    deityTitle: "God of the Forge",
    slogan: "Forged in flame, rising unbound from ashes.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#ea580c",
    accentName: "Blazing Ember",
    cardImage: "/images/cards/agni-hd2.png",
    badgeImage: "/images/badges/agni-hd2.png",
    badgeBg: "#ffffff",
    description: "God of the forge, fire and metalworking",
  },
  {
    id: "shaurya",
    name: "SHAURYA",
    deity: "Nike",
    deityTitle: "Goddess of Victory",
    slogan: "Carry courage. Claim victory.",
    eligibility: "Medical · UG and PG",
    accentColor: "#eab308",
    accentName: "Gilded wings",
    cardImage: "/images/cards/shaurya-hd2.png",
    badgeImage: "/images/badges/shaurya-hd2.png",
    badgeBg: "#0d4024",
    revealImage: "/images/reveals/shaurya-modal-clean-hd2.png",
    description: "Goddess of victory; wings and triumph",
  },
  {
    id: "aakash",
    name: "AAKASH",
    deity: "Zeus",
    deityTitle: "King of Gods",
    slogan: "Let the skies witness your ascent.",
    eligibility: "Engineering and Technology UG",
    accentColor: "#06b6d4",
    accentName: "Sky Cyan",
    cardImage: "/images/cards/aakash-hd2.png",
    badgeImage: "/images/badges/aakash-hd2.png",
    badgeBg: "#1d2c41",
    revealImage: "/images/reveals/aakash-modal-crop-hd2.png",
    storyImage: "/images/stories/aakash-9_16-hd2.png",
    description: "King of the gods; sky, thunder and lightning",
  },
  {
    id: "naag",
    name: "NAAG",
    deity: "Asclepius",
    deityTitle: "God of Medicine",
    slogan: "Wisdom to heal, power to endure.",
    eligibility: "Architecture and Hotel Management UG",
    accentColor: "#84cc16",
    accentName: "Venom Green",
    cardImage: "/images/cards/naag-hd2.png",
    badgeImage: "/images/badges/naag-hd2.png",
    badgeBg: "#ffffff",
    description: "Greek god of medicine; wields the serpent-entwined rod",
  },
];

export const SCHOOLS = [
  "Medical",
  "Engineering and Technology",
  "FSH/FLAB",
  "Architecture",
  "Management",
  "Law",
  "Hotel Management",
] as const;

export type SchoolType = (typeof SCHOOLS)[number];

export interface AllocationResult {
  house: HouseData;
  academicInfo: string;
  allocationReason: string;
}

export function allocateHouse(
  school: string,
  program: string,
  registrationId?: string
): AllocationResult | null {
  if (!school || !program) return null;

  const s = school.toLowerCase();
  const isMed = s.includes("medic");
  const isEng = s.includes("engineering");
  const isMgmt = s.includes("management") && !s.includes("hotel") && !s.includes("catering");
  const isLaw = s.includes("law");
  const isFsh = s.includes("fsh") || s.includes("flab") || s.includes("humanities") || s.includes("agricultural");
  const isArch = s.includes("architect");
  const isHotel = s.includes("hotel") || s.includes("catering");

  // 1. Medical UG or PG -> Shaurya (Medical takes priority over the PG rule)
  if (isMed) {
    const house = HOUSES.find((h) => h.id === "shaurya")!;
    return {
      house,
      academicInfo: `Medical · ${program === "PG" ? "Postgraduate (PG)" : "Undergraduate (UG)"}`,
      allocationReason: "Direct allocation · Medical → Shaurya",
    };
  }

  // 2. Every other PG -> Brahmos
  if (program === "PG") {
    const house = HOUSES.find((h) => h.id === "brahmos")!;
    return {
      house,
      academicInfo: `${school} · Postgraduate (PG)`,
      allocationReason: "Non-Medical Postgraduate → Brahmos",
    };
  }

  // 3. UG rules:
  if (isMgmt) {
    const house = HOUSES.find((h) => h.id === "brahmos")!;
    return {
      house,
      academicInfo: "Management · Undergraduate (UG)",
      allocationReason: "Management UG (BBA) → Brahmos",
    };
  }

  if (isFsh || isLaw) {
    const house = HOUSES.find((h) => h.id === "astra")!;
    return {
      house,
      academicInfo: `${school} · Undergraduate (UG)`,
      allocationReason: "FSH/FLAB or Law UG → Astra",
    };
  }

  if (isArch || isHotel) {
    const house = HOUSES.find((h) => h.id === "naag")!;
    return {
      house,
      academicInfo: `${school} · Undergraduate (UG)`,
      allocationReason: "Architecture or Hotel Management UG → Naag",
    };
  }

  if (isEng) {
    if (!registrationId || !/^\d{3}$/.test(registrationId)) {
      return null;
    }
    const num = parseInt(registrationId, 10);
    const mod = num % 4;
    const mapping: Record<number, string> = {
      0: "trishul",
      1: "agni",
      2: "aakash",
      3: "prithvi",
    };
    const targetId = mapping[mod];
    const house = HOUSES.find((h) => h.id === targetId)!;
    return {
      house,
      academicInfo: `Engineering and Technology · UG · ${registrationId}`,
      allocationReason: `Registration Digits ${registrationId} (${num} mod 4 = ${mod}) → ${house.name}`,
    };
  }

  return null;
}
