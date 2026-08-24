import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Collection Intelligence | dataOrb",
  description:
    "Collection Intelligence from dataOrb turns every customer interaction into evidence, action, and measurable outcomes.",
};

export default function CollectionIntelligencePage() {
  return <Home />;
}
