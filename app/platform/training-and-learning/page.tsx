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
      heroBody="Every ramping advisor learns the job somewhere. Without a simulator, they learn it live, on your revenue, your satisfaction scores, and your compliance exposure. DataOrb turns real interactions into rehearsal scenarios, plays the other side in live voice roleplay, and grades every session against the same scorecard QA runs on the floor. By the time the situation walks in the door, it is not the first time. It is the fifth."
    />
  );
}
