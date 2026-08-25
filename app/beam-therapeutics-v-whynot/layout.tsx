import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beam Therapeutics v. Whynot | Flint Witness Research",
  description: "Post-filing DTSA technical issue mapping and preliminary expert research for Beam Therapeutics v. Whynot.",
  alternates: { canonical: "/beam-therapeutics-v-whynot" },
  openGraph: {
    title: "Beam Therapeutics v. Whynot | Flint Witness Research",
    description: "A preliminary DTSA technical issue map and source-backed slate of ten potential experts.",
    url: "/beam-therapeutics-v-whynot",
  },
};

export default function BeamTherapeuticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
