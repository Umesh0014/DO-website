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
      heroBody="Collection is a negotiation over cash, run at massive volume, under heavy regulation. DataOrb reads 100% of your collection calls: every promise, every objection, every disclosure, every risk. The insight arrives the moment the call ends, while the account is still young. Every conversation, not a sample."
    />
  );
}
