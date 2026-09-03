"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ClipboardCheck,
  Database,
  GraduationCap,
  HandCoins,
  Headphones,
  TrendingUp,
  Workflow,
} from "lucide-react";

const productCards = [
  { title: "Service Intelligence", href: "/service-intelligence", icon: Headphones, active: true, bullets: ["See every touchpoint", "Find and fix the cause", "Resolve more, repeat less"] },
  { title: "Revenue Intelligence", href: "/revenue-intelligence", icon: TrendingUp, bullets: ["Spot churn early", "Track sales signals", "Turn losses into pipeline"] },
  { title: "Collection Intelligence", href: "/collection-intelligence", icon: HandCoins, bullets: ["Score performance and compliance", "Drive campaign KPIs", "Coach difficult calls"] },
  { title: "Quality and Coaching", href: "/platform/quality-and-coaching", icon: ClipboardCheck, bullets: ["Auto-score every interaction", "Track SOP adherence", "Coach with evidence"] },
  { title: "Training and Learning", href: "/platform/training-and-learning", icon: GraduationCap, bullets: ["Practise with AI roleplay", "Turn failures into training", "Prove shift readiness"] },
  { title: "Agentic BI", href: "/platform/agentic-bi", icon: BarChart3, bullets: ["Ask and get cited answers", "Automate recurring briefs", "Trace every number"] },
];

const teamCards = [
  { title: "Service Ops", copy: "Find repeat-contact drivers and fix them at the source.", image: "/home-team-service.png" },
  { title: "Chief Customer Office", copy: "See what drives churn, cost, and satisfaction and prove what works.", image: "/home-team-customer.png", active: true },
  { title: "AI and Transformation", copy: "Deploy AI safely, measure its impact, and scale what works.", image: "/home-team-ai.png" },
  { title: "Retention Ops", copy: "Prevent churn by exposing root causes, owners, and impact.", image: "/home-team-retention.png" },
  { title: "Sales Teams", copy: "See every sales opportunity, coach better, and win more.", image: "/home-team-sales.png" },
  { title: "Enablement", copy: "Build confident advisors faster and link enablement to business outcomes.", image: "/home-team-enablement.png" },
];

const marqueeItems = Array.from({ length: 15 }, (_, index) => index);

const footerGroups = [
  { title: "Platform", links: [["Service Intelligence", "/service-intelligence"], ["Revenue Intelligence", "/revenue-intelligence"], ["Collection Intelligence", "/collection-intelligence"], ["Quality and Coaching", "/platform/quality-and-coaching"], ["Training and Learning", "/platform/training-and-learning"], ["Agentic BI", "/platform/agentic-bi"], ["Context Engine", "#platform-foundation"]] },
  { title: "Trust", links: [["Security", "#go-deeper"], ["Responsible AI", "#go-deeper"], ["AAPES", "#go-deeper"], ["Privacy", "#footer"], ["Sub-processors", "#footer"]] },
  { title: "Resources", links: [["Customer stories", "#stories"], ["Features", "#platform"], ["DataOrb Ecosystem", "#go-deeper"], ["Blog", "#footer"]] },
  { title: "Solutions", links: teamCards.map(({ title }) => [title, "#teams"]) },
  { title: "Company", links: [["About", "#footer"], ["Careers", "#footer"], ["Contact", "#demo"]] },
  { title: "Legal", links: [["Terms", "#footer"], ["Cookie policy", "#footer"], ["© DataOrb", "#top"]] },
];

function ArrowLink({ children }: { children: React.ReactNode }) {
  return <span className="home-arrow-link">{children} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} /></span>;
}

export default function HomeLandingPage() {
  const parallaxStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = parallaxStageRef.current;
    if (!stage) return;

    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      const hero = stage.querySelector<HTMLElement>(".home-hero");
      if (!hero || window.matchMedia("(max-width: 700px)").matches) {
        stage.style.setProperty("--home-parallax-y", "0px");
        stage.style.setProperty("--home-background-far-y", "0px");
        stage.style.setProperty("--home-background-mid-y", "0px");
        stage.style.setProperty("--home-background-near-y", "0px");
        return;
      }

      const maxTravel = Math.max(0, stage.offsetHeight - hero.offsetHeight);
      const travel = Math.min(maxTravel, Math.max(0, -stage.getBoundingClientRect().top));
      stage.style.setProperty("--home-parallax-y", `${-travel}px`);
      stage.style.setProperty("--home-background-far-y", `${-travel * 0.05}px`);
      stage.style.setProperty("--home-background-mid-y", `${-travel * 0.18}px`);
      stage.style.setProperty("--home-background-near-y", `${-travel * 0.38}px`);
    };
    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="home-page" id="top">
      <div className="home-parallax-stage" ref={parallaxStageRef}>
      <div className="home-parallax-header-wrap">
        <header className="home-header home-shell">
          <Link className="home-brand" href="/" aria-label="DataOrb home"><img src="/home-dataorb-logo.svg" alt="DataOrb" /></Link>
          <nav className="home-nav" aria-label="Primary navigation"><a href="#platform">Platform</a><a href="#teams">Solutions</a><a href="#stories">Resources</a><a href="#footer">Company</a></nav>
          <a className="home-demo-button home-demo-button--small" href="#demo">Book a demo</a>
        </header>
      </div>
      <section className="home-hero">
        <div className="home-hero-background home-hero-background--far" aria-hidden="true" />
        <div className="home-hero-background home-hero-background--mid" aria-hidden="true" />
        <div className="home-hero-background home-hero-background--near" aria-hidden="true" />
        <div className="home-hero-copy home-shell">
          <p className="home-pill"><i /> Decision Intelligence Platform</p>
          <h1>Customer was <span>always</span><br />trying to tell you something.</h1>
          <div className="home-hero-actions"><a className="home-demo-button" href="#demo">Book a demo <ArrowRight size={20} /></a><a className="home-watch-button" href="#platform">See how it works</a></div>
        </div>
        <div className="home-parallax-layer">
          <img className="home-hero-foreground" src="/home-hero-foreground.png" alt="" />
          <div className="home-hero-transition" />
          <div className="home-marquee" aria-label="Technology partners">
            <div className="home-marquee-track">
              {marqueeItems.map((item) => (
                <span className="home-logoipsum" key={item}>
                  <img src="/home-logoipsum-mark.svg" alt="" />
                  <img src="/home-logoipsum-type.svg" alt="Logoipsum" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="home-manifesto"><p><span>DataOrb is the Decision Intelligence Platform for Customer Operations.</span> Decode every interaction, remember what worked, and act before the next one goes wrong.</p></section>
      </div>

      <section className="home-agentic-section">
        <div className="home-shell home-section-heading home-section-heading--light"><h2>The <span>agentic</span> customer operations platform</h2><p>Every insight is grounded in the conversation, every winning play becomes reusable, and every action fits the systems you already run.</p></div>
        <div className="home-shell home-agentic-stack">
          <article className="home-agentic-card"><div className="home-agentic-copy"><div className="home-icon-tile"><Database size={29} /></div><h3>Every insight traces to its source</h3><p>Every insight is backed by evidence. Every claim cites its source.</p><span className="home-card-pill">One source of truth for every insight</span></div><div className="home-evidence-visual" aria-hidden="true"><div className="home-evidence-orb"><span>do</span></div><div className="home-evidence-line home-evidence-line--one" /><div className="home-evidence-line home-evidence-line--two" /><div className="home-evidence-note home-evidence-note--one">Customer said: “I called last week.”</div><div className="home-evidence-note home-evidence-note--two">Evidence cited <Check size={14} /></div></div></article>
          <article className="home-agentic-card home-agentic-card--offset"><div className="home-agentic-copy"><div className="home-icon-tile"><Workflow size={29} /></div><h3>What worked once works everywhere</h3><p>Your best strategies stop living in your best people. DataOrb captures the winning play from real interactions that succeeded, and every advisor and every AI teammate runs it after that.</p><span className="home-card-pill">One winning play, reused across every team</span></div><div className="home-playbook-visual" aria-hidden="true"><span className="home-playbook-label">Winning play</span><div className="home-playbook-card"><Check size={18} /> Evidence-backed response</div><div className="home-playbook-split"><span>Human advisor</span><span>AI teammate</span></div></div></article>
          <article className="home-agentic-card home-agentic-card--wide"><div className="home-agentic-copy"><div className="home-icon-tile"><Bot size={29} /></div><h3>Headless by design</h3><p>Your orchestrator, your bot platform, your warehouse, running on DataOrb memory, context, and next best action. The intelligence is the constant. The runtime is your choice.</p><span className="home-card-pill">One intelligence layer</span></div><div className="home-headless-visual" aria-hidden="true"><span>Orchestrator</span><span>Bot platform</span><span>Warehouse</span><div><img src="/home-orb-logo.svg" alt="" /></div><span>Memory</span><span>Context</span><span>Next action</span></div></article>
        </div>
      </section>

      <section className="home-platform home-shell" id="platform"><div className="home-platform-intro"><p className="home-kicker">The Platform</p><h2>The OS for Human + <span>AI Teams</span></h2><p>DataOrb connects every conversation, team, &amp; touchpoint through one source of truth.</p></div><div className="home-product-grid">{productCards.map(({ title, href, icon: Icon, bullets, active }) => <Link className={`home-product-card${active ? " is-active" : ""}`} href={href} key={title}><div className="home-product-title"><Icon size={25} strokeWidth={1.7} /><h3>{title}</h3></div><ul>{bullets.map((bullet) => <li key={bullet}><Check size={14} />{bullet}</li>)}</ul><ArrowLink>Learn more</ArrowLink></Link>)}</div></section>

      <section className="home-foundation" id="platform-foundation"><div className="home-shell"><div className="home-section-heading home-section-heading--dark"><h2>One platform <span>underneath all of it</span></h2><a href="#go-deeper"><ArrowLink>Learn more</ArrowLink></a></div><div className="home-foundation-line"><i /><i /><i /></div><div className="home-foundation-grid"><article><h3>One platform, every team</h3><p>Keep in-house teams and BPOs aligned on shared workflows, insights, and standards.</p></article><article><h3>Multilingual by design</h3><p>Deliver consistent service across every language, region, and team.</p></article><article><h3>Governance built in</h3><p>Secure every workflow with enterprise-grade controls, permissions, and oversight.</p></article></div></div></section>

      <section className="home-stories" id="stories"><div className="home-shell"><div className="home-section-heading home-section-heading--dark"><h2>Join the brands turning 100+ million <span>interactions into outcomes</span></h2><p>See how enterprises and service providers are using DataOrb in live production, at scale.</p></div><div className="home-story-tabs"><span className="is-active">Enterprise</span><span>Service provider</span></div><article className="home-story-card"><div className="home-story-copy"><img src="/home-masorange-logo.svg" alt="MasOrange" /><h3>Seven brands,<br />no blind spots</h3><div className="home-story-meta"><span><strong>Carlos Fernandez Rodriguez</strong>MasOrange</span><a href="#stories"><ArrowLink>Read the story</ArrowLink></a></div></div><div className="home-story-portrait"><img src="/home-masorange-customer.png" alt="Carlos Fernandez Rodriguez" /></div></article></div></section>

      <section className="home-teams" id="teams"><div className="home-shell"><div className="home-section-heading home-section-heading--dark"><h2>Every team <span>One customer context</span></h2><p>DataOrb unifies your entire customer operation on one context, helping every team move faster, decide with evidence, and scale what works.</p></div></div><div className="home-team-scroller">{teamCards.map((card) => <article className={`home-team-card${card.active ? " is-active" : ""}`} key={card.title}><img src={card.image} alt="" /><h3>{card.title}</h3><p>{card.copy}</p><ArrowLink>Learn more</ArrowLink></article>)}</div><div className="home-shell home-slider-controls"><button aria-label="Previous"><ArrowLeft /></button><span><i /></span><button aria-label="Next"><ArrowRight /></button></div></section>

      <section className="home-deeper" id="go-deeper"><div className="home-shell"><div className="home-section-heading home-section-heading--dark"><h2><span>Go deeper</span> on DataOrb.</h2><p>Three ways to look under the hood: the partners we plug into, the features behind each product, and the standard we hold our AI teammates to.</p></div><div className="home-ecosystem" aria-label="DataOrb ecosystem partners"><div className="home-ecosystem-ring home-ecosystem-ring--outer" /><div className="home-ecosystem-ring home-ecosystem-ring--inner" /><div className="home-partner home-partner--aws"><img src="/home-logo-aws.svg" alt="AWS" /></div><div className="home-partner home-partner--twilio"><img src="/home-logo-twilio.svg" alt="Twilio" /></div><div className="home-partner home-partner--service"><img src="/home-logo-servicenow.svg" alt="ServiceNow" /></div><div className="home-partner home-partner--zendesk"><img src="/home-logo-zendesk.svg" alt="Zendesk" /></div><div className="home-partner home-partner--hubspot">HubSpot</div><div className="home-partner home-partner--okta">okta</div><div className="home-ecosystem-core"><img src="/home-orb-logo.svg" alt="DataOrb" /></div></div><div className="home-deeper-grid"><article><h3>DataOrb Ecosystem</h3><p>The partners, integrations, and services that make DataOrb fit the way you already work.</p><ArrowLink>Explore</ArrowLink></article><article id="agentic-bi"><h3>Browse Features</h3><p>See everything the platform can do, feature by feature.</p><ArrowLink>Explore</ArrowLink></article><article><h3>Responsible AI and AAPES</h3><p>The open standard we published for evaluating AI agents before they reach a customer.</p><ArrowLink>Explore</ArrowLink></article></div></div></section>

      <footer className="home-footer" id="footer"><div className="home-shell"><div className="home-footer-cta" id="demo"><h2>Ready to Run<br />Smarter Operations?</h2><p>Start with your conversations. See what customers are saying and where outcomes can improve.</p><a className="home-demo-button" href="mailto:hello@dataorb.ai">Book a demo <ArrowRight size={20} /></a></div><div className="home-footer-links">{footerGroups.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}</div></div><div className="home-footer-art" aria-hidden="true"><span>DataOrb</span><img src="/home-footer-landscape.png" alt="" /></div></footer>
    </main>
  );
}
