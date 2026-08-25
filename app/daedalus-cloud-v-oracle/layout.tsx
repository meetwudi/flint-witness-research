import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daedalus Cloud v. Oracle | Flint Witness Research",
  description: "Post-filing technical issue mapping and preliminary expert research for Daedalus Cloud v. Oracle.",
  alternates: { canonical: "/daedalus-cloud-v-oracle" },
  openGraph: {
    title: "Daedalus Cloud v. Oracle | Flint Witness Research",
    description: "A post-filing technical issue map and researched slate of ten potential experts.",
    url: "/daedalus-cloud-v-oracle"
  }
};

export default function DaedalusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
