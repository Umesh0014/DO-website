import type { Metadata } from "next";
import IntelligenceLandingPage from "../components/IntelligenceLandingPage";

const title = "Revenue Intelligence | dataOrb";
const description =
  "Find the buying signals, objections, and missed sales in every inbound and outbound conversation.";

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

export default function RevenueIntelligencePage() {
  return (
    <IntelligenceLandingPage
      activePage="revenue"
      heroEyebrow="Revenue Intelligence"
      heroHeading="Stop leaving revenue on the call."
      heroBody="DataOrb uncovers missed sales and who to call back and why."
    />
  );
}
