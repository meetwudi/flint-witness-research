import { PacketPage } from "../components/packet-page";
import { daedalusPacket } from "../data/daedalus";

export default function DaedalusCloudOraclePage() {
  return <PacketPage packet={daedalusPacket} />;
}
