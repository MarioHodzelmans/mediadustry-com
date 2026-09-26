import IndexDigitalAgencyPage, {
  metadata,
} from "./(homes)/index-digital-agency/page";
import HomeHeader from "@/components/home/HomeHeader";

export { metadata };

export default function Home() {
  return <><HomeHeader /><IndexDigitalAgencyPage /></>;
}
