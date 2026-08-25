import type { Metadata } from "next";
import IntelligenceLandingPage from "../components/IntelligenceLandingPage";

const title = "Collection Intelligence | dataOrb";
const description =
  "Collection Intelligence from dataOrb turns every customer interaction into evidence, action, and measurable outcomes.";

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
      heroHeading="Stop guessing what happened"
      heroBody="Every interaction, evidence-linked: what happened, customer impact, and what's next."
    />
  );
}
