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
      heroHeading="Practice the work before it is real."
      heroBody="DataOrb turns real customer interactions into identity-safe simulations, targeted drills, and measurable learning paths. Advisors rehearse the moments that matter, and the next live interaction shows whether the learning held."
    />
  );
}
