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
      heroHeading="Coach what actually happened."
      heroBody="Sampled QA leaves most performance unseen. DataOrb evaluates 100% of customer conversations against your scorecard, cites every result to the evidence, and turns each advisor’s real gaps into focused coaching that you can verify on the next call."
    />
  );
}
