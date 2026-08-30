import type { Metadata } from "next";
import IntelligenceLandingPage from "../../components/IntelligenceLandingPage";

const title = "Quality and Coaching | dataOrb";
const description =
  "Evaluate every customer conversation, focus coaching on the gaps that matter, and verify improvement against one evidence-linked standard.";

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

export default function QualityAndCoachingPage() {
  return (
    <IntelligenceLandingPage
      activePage="quality"
      heroEyebrow="Quality and Coaching"
      heroHeading="Stop coaching from anecdotes."
      heroBody="DataOrb evaluates every interaction and turns missed metrics into targeted coaching."
    />
  );
}
