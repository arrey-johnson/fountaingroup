export type Partner = {
  id: string;
  name: string;
  logo: string;
  /** Use a dark plate when the source logo is designed for a dark background. */
  darkPlate?: boolean;
};

/** Retail partners where Fountain Group products can be found. */
export const partners: Partner[] = [
  { id: "arno", name: "ARNO", logo: "/partners/arno.png" },
  { id: "super-u", name: "Super U", logo: "/partners/super-u.webp", darkPlate: true },
  { id: "casino", name: "Casino", logo: "/partners/casino.png", darkPlate: true },
  {
    id: "santa-lucia",
    name: "Complexe Santa Lucia",
    logo: "/partners/santa-lucia.webp",
    darkPlate: true,
  },
  { id: "spar", name: "SPAR", logo: "/partners/spar.png" },
];
