import type { Metadata } from "next";

import IntelligenceLandingPage from "../components/IntelligenceLandingPage";

const title = "Service Intelligence | dataOrb";
const description =
  "Every service interaction, evidence-linked: what happened, customer impact, and what comes next.";

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

export default function ServiceIntelligencePage() {
  return (
    <IntelligenceLandingPage
      activePage="service"
      heroEyebrow="Service Intelligence"
      heroHeading="Stop guessing what happened"
      heroBody="Every interaction, evidence-linked: what happened, customer impact, and what's next."
    />
  );
}
