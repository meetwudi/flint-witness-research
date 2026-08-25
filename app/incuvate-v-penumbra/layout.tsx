import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incuvate v. Penumbra | Flint Witness Research",
  description: "Post-filing technical issue mapping and preliminary expert research for Incuvate v. Penumbra.",
  alternates: { canonical: "/incuvate-v-penumbra" },
  openGraph: {
    title: "Incuvate v. Penumbra | Flint Witness Research",
    description: "A post-filing technical issue map and researched slate of ten potential experts.",
    url: "/incuvate-v-penumbra",
    images: ["/incuvate-penumbra-og.png"]
  }
};

export default function IncuvateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
