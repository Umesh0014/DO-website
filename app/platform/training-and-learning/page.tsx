import type { Metadata } from "next";
import IntelligenceLandingPage from "../../components/IntelligenceLandingPage";

const title = "Training and Learning | dataOrb";
const description =
  "Turn real customer interactions into identity-safe practice, targeted drills, and measurable readiness for every advisor.";

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

export default function TrainingAndLearningPage() {
  return (
    <IntelligenceLandingPage
      activePage="training"
      heroEyebrow="Training and Learning"
      heroHeading="Stop practicing on customers."
      heroBody="DataOrb prepares advisors through realistic, scorecard-based AI roleplay."
    />
  );
}
