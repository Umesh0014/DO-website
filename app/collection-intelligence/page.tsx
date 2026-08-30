import type { Metadata } from "next";
import IntelligenceLandingPage from "../components/IntelligenceLandingPage";

const title = "Collection Intelligence | dataOrb";
const description =
  "Turn every collections conversation into evidence, action, and measurable recovery outcomes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [],
  },
};

export default function CollectionIntelligencePage() {
  return (
    <IntelligenceLandingPage
      activePage="collection"
      heroEyebrow="Collection Intelligence"
      heroHeading="Stop dialing in the dark."
      heroBody="DataOrb analyzes every collection call for promises, objections, compliance, and risk."
    />
  );
}
