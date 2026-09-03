import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, Check, MessageSquareText } from "lucide-react";

const title = "Agentic BI | dataOrb";
const description = "Ask operational questions and get evidence-linked answers from every customer interaction.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function AgenticBiPage() {
  return (
    <main className="agentic-bi-page">
      <header className="agentic-bi-header home-shell">
        <Link className="home-brand" href="/" aria-label="DataOrb home"><img src="/home-dataorb-logo.svg" alt="DataOrb" /></Link>
        <Link href="/#platform"><ArrowLeft size={17} /> All products</Link>
      </header>
      <section className="agentic-bi-hero home-shell">
        <div>
          <p className="agentic-bi-kicker"><BarChart3 size={16} /> Agentic BI</p>
          <h1>Ask your operations.<br /><span>Get cited answers.</span></h1>
          <p>DataOrb turns every customer interaction into trusted operational intelligence, so teams can ask, automate, and act with evidence.</p>
          <a className="home-demo-button" href="mailto:hello@dataorb.ai">Book a demo <ArrowRight size={19} /></a>
        </div>
        <div className="agentic-bi-panel">
          <div className="agentic-bi-question"><MessageSquareText size={19} /> Why did repeat contact rise this week?</div>
          <div className="agentic-bi-answer"><span>Evidence-linked answer</span><h2>Billing confusion drove 38% of the increase.</h2><p>Based on 12,480 conversations across service and retention.</p><div><Check size={15} /> Every number traces to source dialogue</div></div>
        </div>
      </section>
    </main>
  );
}
