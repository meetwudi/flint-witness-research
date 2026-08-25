import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PacketPage, type PacketData } from "../components/packet-page";
import packetIndex from "../data/generated-packets.json";

const packets = packetIndex as unknown as Record<string, PacketData>;

export function generateStaticParams() {
  return Object.keys(packets).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const packet = packets[slug];
  if (!packet) return {};
  return {
    title: `${packet.title} | Flint Witness Research`,
    description: packet.deck,
    openGraph: { title: `${packet.title} | Flint Witness Research`, description: packet.deck, images: [] },
    twitter: { card: "summary", title: `${packet.title} | Flint Witness Research`, description: packet.deck, images: [] },
  };
}

export default async function GeneratedPacketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const packet = packets[slug];
  if (!packet) notFound();
  return <PacketPage packet={packet} />;
}
