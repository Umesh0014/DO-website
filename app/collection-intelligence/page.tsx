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
      heroBody="Every collections conversation contains a commitment, a barrier, or a signal that the next action should change. DataOrb analyzes every interaction to show what was promised, what is at risk, and what your team should do next."
    />
  );
}
