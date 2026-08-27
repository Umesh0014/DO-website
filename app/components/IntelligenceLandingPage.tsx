"use client";

import { useEffect, useRef, useState } from "react";

import { Component as GradientBackground } from "../../components/ui/bg-gredient";
import { DropdownNavigation } from "../../components/ui/dropdown-navigation";
import { Feature135 } from "../../components/ui/feature135";
import { Stats } from "../../components/ui/stats-section-with-text";

const heroBackground =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85";

const footerGroups = [
  {
    title: "Platform",
    links: [
      "Service Intelligence",
      "Revenue Intelligence",
      "Collection Intelligence",
      "Quality and Coaching",
      "Training and Learning",
      "Agentic BI",
      "Context Engine",
    ],
  },
  {
    title: "Trust",
    links: ["Security", "Responsible AI", "AAPES", "Privacy", "Sub-processors"],
  },
  {
    title: "Resources",
    links: ["Customer stories", "Features", "DataOrb Ecosystem", "Blog"],
  },
  {
    title: "Solutions",
    links: [
      "Chief Customer Office",
      "AI and Transformation",
      "Service Ops",
      "Retention Ops",
      "Sales Teams",
      "Enablement",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms", "Cookie policy", "© DataOrb"],
  },
];

type IntelligencePage = "collection" | "quality" | "revenue" | "service";

type IntelligenceSection = {
  body: string;
  eyebrow: string;
  features: Array<{
    body: string;
    title: string;
  }>;
  heading: string;
  note?: string;
};

const revenueSections: IntelligenceSection[] = [
  {
    eyebrow: "Recover",
    heading: "Recover missed revenue.",
    body: "Find missed buying signals, stalled interest, and churn risk in time to recover them.",
    features: [
      {
        title: "The lead nobody pitched",
        body: "A customer calls about a bill and mentions a new phone, a second line, a competitor’s price. DataOrb flags every interaction where a buying signal appeared and no offer followed. The lead goes to recovery instead of the archive.",
      },
      {
        title: "The customer still deciding",
        body: "“Call me back next week.” “I need to talk it over at home.” Neither a yes nor a no. DataOrb reads the response, marks the opportunity as considering, and queues the follow-up with the context of the original call attached, while the interest is still warm.",
      },
      {
        title: "The customer about to leave",
        body: "Some conversations end with a sale missed. Others end with a customer halfway out the door. DataOrb flags high churn risk the moment the interaction closes, so your retention campaign reaches them before they act.",
      },
    ],
  },
  {
    eyebrow: "See",
    heading: "Every offer, recorded.",
    body: "Track every offer, objection, outcome, and open opportunity across teams and partners.",
    features: [
      {
        title: "Objections and competitors, named",
        body: "DataOrb logs every objection raised, every competitor mentioned, and how the advisor handled each one. You learn which rival you actually lose to, and why, in the customer’s own words.",
      },
      {
        title: "Training problem or process problem",
        body: "When conversion drops, DataOrb separates how advisors sell from what they were given to sell with. One points to coaching. The other points to the offer, the pricing, or the playbook itself.",
      },
      {
        title: "Telesales, funnel to outcome",
        body: "For dedicated telesales programs, DataOrb tracks the funnel per campaign and per product: right-party contact, offers made, objections faced, win rate. You see where each program leaks before the month-end report does.",
      },
    ],
    note: "All of this arrives as structured, trended data, queryable through Ask Mira on the Insights page. Ask why conversion dropped and get a cited answer.",
  },
  {
    eyebrow: "Prepare",
    heading: "Train on lost deals.",
    body: "Turn the calls your team loses into focused practice, QA, and coaching.",
    features: [
      {
        title: "A digital twin of the hard customer",
        body: "DataOrb turns a real lost conversation into a practice persona, with the identity stripped and the objection intact. Advisors rehearse the exact scenario the team keeps losing, through AI roleplay, before it comes around again.",
      },
      {
        title: "Sales QA on every call",
        body: "DataOrb evaluates every sales conversation against your compliance rules and your best practices, not a sample. Supervisors spend their hours coaching, not listening back.",
      },
      {
        title: "Coaching from their own calls",
        body: "Each advisor’s record shows where they pitch, where they miss, and where they convert. You see who leads, who needs coaching, and who needs reskilling, and the coaching starts from their own calls, not a generic script.",
      },
    ],
  },
];

const collectionSections: IntelligenceSection[] = [
  {
    eyebrow: "Recover",
    heading: "Find the lift in your funnel.",
    body: "Recovery lives in margins. A point of right-party contact here, a point of promise-to-pay there, multiplied across millions of dials. DataOrb tracks every funnel KPI against the goal you set, from contactability and contact utility to dials per arrangement and recovery conversion, and shows you where the next point is hiding.",
    features: [
      {
        title: "Every outcome, on the record",
        body: "DataOrb tracks every contact to its outcome: payment taken, promise made, rescheduled, refused, disputed, or wrong party. Your funnel, from dial to cash, becomes a record you can read and trend, campaign by campaign.",
      },
      {
        title: "Objections, named and graded",
        body: "Non-recognition of the debt, financial hardship, disputed services, timing, already paid, hard refusal. DataOrb names the objection on every call and grades how it was handled. You learn which objections cost you the most, and which rebuttals actually move them.",
      },
      {
        title: "Promises, tracked to the cash",
        body: "A promise to pay is not a payment. DataOrb follows each promise through to resolution or refusal, so you see which arrangements hold, which collapse, and where to intervene before the money slips.",
      },
    ],
  },
  {
    eyebrow: "Protect",
    heading: "Compliance you can prove.",
    body: "Collection is one of the most regulated conversations in financial services, and a sampled QA program leaves most of it unwitnessed. DataOrb monitors every call against your compliance scorecard, across EU and US programs, and cites the exact moment anything goes wrong.",
    features: [
      {
        title: "The disclosures, verified",
        body: "Identity confirmed, reason for the call stated, required notifications given, payment details and amounts checked, the outcome reformulated. DataOrb verifies the mandatory steps on every call and flags the one that was skipped, with the moment cited.",
      },
      {
        title: "The lines never to cross",
        body: "DataOrb flags prohibited language, harassment risk, and pressure where restraint is required. A violation surfaces the day it happens, while it is still a coaching matter.",
      },
      {
        title: "Vulnerability, detected",
        body: "When a customer signals hardship or vulnerability, DataOrb flags the account, so it gets the treatment your policy and the regulator require. Customer treatment stops depending on which calls QA happened to pull.",
      },
    ],
  },
  {
    eyebrow: "Prepare",
    heading: "Scale what your best closers do.",
    body: "What works in collection lives inside the conversation: how the questions are sequenced, how the anchor is set, when to hold the silence. DataOrb finds it in your best calls and turns it into coaching and practice for everyone else.",
    features: [
      {
        title: "Coaching, per agent, per gap",
        body: "Every agent's record shows the objection they lose to, the disclosure they skip, the metric they miss. DataOrb writes the coaching recommendation against each one, drawn from 100% of their calls. Team leads intervene where it counts, not where the sample pointed.",
      },
      {
        title: "The hard call, rehearsed",
        body: "DataOrb turns real collection scenarios into practice personas, identity stripped, hardship and refusal intact. New hires meet the hard refusal in simulation, through AI roleplay, before they meet it live.",
      },
      {
        title: "Ramp you can verify",
        body: "Drills built from real calls take the fear out of the first shift. New advisors reach proficiency sooner, their next real calls are evaluated against the same scorecard, and better-prepared advisors stay longer. The loop runs until the outcome moves.",
      },
    ],
  },
];

const qualitySections: IntelligenceSection[] = [
  {
    eyebrow: "Measure",
    heading: "Quality you can see.",
    body: "Sampled QA shows you a fraction of the operation. DataOrb evaluates every conversation against the scorecard you set, so quality becomes a complete, evidence-linked record instead of an estimate.",
    features: [
      {
        title: "Every interaction, scored",
        body: "DataOrb checks 100% of conversations for the behaviors, outcomes, and mandatory steps that matter to your program. Teams see the full distribution, not the luck of the sample.",
      },
      {
        title: "One standard across every team",
        body: "In-house advisors, BPO partners, voice, chat, and AI teammates are evaluated against the same standard. Performance comparisons become consistent, transparent, and fair.",
      },
      {
        title: "Every score, cited",
        body: "Each result links to the exact moment that produced it. Reviewers can verify the evidence, calibrate quickly, and spend less time searching through recordings.",
      },
    ],
  },
  {
    eyebrow: "Coach",
    heading: "Coach the gap that matters.",
    body: "DataOrb turns each advisor’s complete interaction record into focused coaching: the behavior to change, the moment it appeared, and the outcome it affected.",
    features: [
      {
        title: "A coaching plan per advisor",
        body: "Every advisor sees the patterns holding them back, from missed discovery and weak ownership to incomplete disclosures. Team leads get a prioritized recommendation instead of another dashboard to interpret.",
      },
      {
        title: "The moment, ready to review",
        body: "Coaching starts at the cited exchange, with the surrounding context attached. One click takes the lead from the score to the behavior, without listening through the whole call.",
      },
      {
        title: "Effort follows impact",
        body: "Gaps are ranked by frequency, severity, and business outcome. Leaders spend coaching time where it can move resolution, compliance, conversion, and customer effort.",
      },
    ],
  },
  {
    eyebrow: "Improve",
    heading: "Make better performance repeatable.",
    body: "The best interaction in your operation should not stay hidden in one advisor’s headset. DataOrb finds what works, turns it into practice, and measures whether the next conversation improves.",
    features: [
      {
        title: "Best practice, found in the work",
        body: "DataOrb identifies the questions, explanations, and recovery moves that consistently lead to better outcomes, then makes those examples available to the rest of the team.",
      },
      {
        title: "Hard moments, rehearsed",
        body: "Real scenarios become identity-stripped practice conversations. Advisors can rehearse objections, vulnerability, escalation, and difficult customer moments before handling them live.",
      },
      {
        title: "A closed coaching loop",
        body: "The next real conversations are evaluated against the same scorecard. Leaders see whether the coached behavior changed and whether the customer and business outcomes moved with it.",
      },
    ],
  },
];

type IntelligenceLandingPageProps = {
  activePage: IntelligencePage;
  heroBody: string;
  heroEyebrow?: string;
  heroHeading: string;
};

function getFooterLinkHref(link: string) {
  if (link === "Service Intelligence") return "/";
  if (link === "Revenue Intelligence") return "/revenue-intelligence";
  if (link === "Collection Intelligence") return "/collection-intelligence";
  if (link === "Quality and Coaching") return "/platform/quality-and-coaching";
  return "#top";
}

const primaryNavigation = [
  {
    label: "Platform",
    groups: [
      {
        label: "Products",
        items: [
          { label: "Service Intelligence", href: "/" },
          { label: "Revenue Intelligence", href: "/revenue-intelligence" },
          { label: "Collection Intelligence", href: "/collection-intelligence" },
          { label: "Quality and Coaching", href: "/platform/quality-and-coaching" },
          { label: "Training and Learning", href: "/platform/training-and-learning" },
          { label: "Insights", href: "/platform/insights" },
          { label: "Context Engine", href: "/platform/context-engine" },
        ],
      },
      {
        label: "Explore",
        items: [
          { label: "Browse features", href: "/platform/features" },
          { label: "DataOrb Ecosystem", href: "/platform/ecosystem" },
          { label: "Responsible AI and AAPES", href: "/trust/responsible-ai" },
        ],
      },
      {
        label: "By team",
        items: [
          { label: "Chief Customer Office", href: "/teams/chief-customer-office" },
          { label: "AI and Transformation", href: "/teams/ai-and-transformation" },
          { label: "Service Ops", href: "/teams/service-ops" },
          { label: "Retention Ops", href: "/teams/retention-ops" },
          { label: "Sales Teams", href: "/teams/sales" },
          { label: "Enablement", href: "/teams/enablement" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    layout: "split-card" as const,
    feature: {
      label: "Industries overview",
      description: "Intelligence built for your market.",
    },
    groups: [
      {
        label: "Markets",
        items: [],
      },
      {
        label: "Industry intelligence",
        description: "Segment-specific intelligence for regulated conversations.",
        hideHeader: true,
        items: [
          { label: "Telecommunications", href: "/industries/telecommunications" },
          { label: "Energy and utilities", href: "/industries/energy-utilities" },
          { label: "Insurance", href: "/industries/insurance" },
        ],
      },
    ],
  },
  { label: "Resources", href: "/resources" },
  {
    label: "Company",
    layout: "split-card" as const,
    feature: {
      label: "About DataOrb",
      description: "The team building intelligence for every conversation.",
      href: "/company/about",
    },
    groups: [
      {
        label: "Company",
        items: [],
      },
      {
        label: "Trust and responsibility",
        description: "Security and responsible AI by design.",
        hideHeader: true,
        items: [
          { label: "Careers", href: "/company/careers" },
          { label: "Contact", href: "/company/contact" },
          { label: "Security", href: "/trust/security" },
          { label: "Responsible AI and AAPES", href: "/trust/responsible-ai" },
        ],
      },
    ],
  },
];

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="95 31 32 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M95.3203 44.265C95.3203 42.7073 95.6263 41.3257 96.2383 40.1203C96.8688 38.9149 97.7218 37.9877 98.7974 37.3386C99.873 36.6895 101.069 36.365 102.386 36.365C103.387 36.365 104.342 36.5876 105.251 37.0326C106.16 37.4592 106.883 38.034 107.421 38.7573V31.4414H111.371V52.026H107.421V49.745C106.939 50.5053 106.262 51.1173 105.39 51.5809C104.518 52.0445 103.508 52.2764 102.358 52.2764C101.06 52.2764 99.873 51.9425 98.7974 51.2749C97.7218 50.6073 96.8688 49.6708 96.2383 48.4654C95.6263 47.2415 95.3203 45.8413 95.3203 44.265ZM107.449 44.3207C107.449 43.3749 107.263 42.5682 106.892 41.9006C106.521 41.2144 106.021 40.6952 105.39 40.3429C104.76 39.972 104.083 39.7865 103.359 39.7865C102.636 39.7865 101.969 39.9627 101.357 40.315C100.745 40.6674 100.244 41.1866 99.8545 41.8728C99.4836 42.5404 99.2981 43.3378 99.2981 44.265C99.2981 45.1923 99.4836 46.0082 99.8545 46.7129C100.244 47.3991 100.745 47.9276 101.357 48.2985C101.987 48.6694 102.655 48.8549 103.359 48.8549C104.083 48.8549 104.76 48.6787 105.39 48.3263C106.021 47.9554 106.521 47.4362 106.892 46.7686C107.263 46.0824 107.449 45.2665 107.449 44.3207Z"
        fill="currentColor"
      />
      <path
        d="M118.473 36.2305C122.851 36.2305 126.401 39.7799 126.401 44.1582C126.401 48.5366 122.851 52.0859 118.473 52.0859C116.08 52.0858 113.936 51.0242 112.482 49.3477V38.9697C113.936 37.293 116.079 36.2306 118.473 36.2305Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.2 0.75 10.13 1.82l4.4 4.43H0v1.5h14.53l-4.4 4.43 1.07 1.07L17.45 7 11.2.75Z" fill="currentColor" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg
      aria-hidden="true"
      className="trend-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 17.5 9 11l4 4 7-8" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 7H20v4.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <a className="logo-link" href="#top" aria-label="dataOrb home">
          <BrandMark />
          <span className="brand-wordmark">dataOrb</span>
        </a>
        <DropdownNavigation navItems={primaryNavigation} />
        <a className="header-cta" href="#demo">
          <span>Book a demo</span>
          <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}

function IntelligenceSections({
  page,
  sections,
}: {
  page: "collection" | "quality" | "revenue";
  sections: IntelligenceSection[];
}) {
  return (
    <>
      {sections.map((section, sectionIndex) => {
        const isReverse = sectionIndex === 1;
        const headingId = `${page}-${section.eyebrow.toLowerCase()}-heading`;

        return (
          <section
            className={`standard-section revenue-section revenue-section-${sectionIndex + 1}`}
            aria-labelledby={headingId}
            key={section.eyebrow}
          >
            <div className="standard-inner">
              <div className={`standard-top revenue-top${isReverse ? " revenue-top-reverse" : ""}`}>
                <div className="standard-visual revenue-blank-visual" aria-hidden="true" />

                <div className="standard-copy revenue-copy">
                  <span className="standard-eyebrow">{section.eyebrow}</span>
                  <h2 id={headingId}>{section.heading}</h2>
                  <p>{section.body}</p>
                  {section.note ? (
                    <p className="revenue-insights-note">{section.note}</p>
                  ) : null}
                </div>
              </div>

              <div className="standard-features revenue-features">
                {section.features.map((feature) => (
                  <article className="standard-feature" key={feature.title}>
                    <TrendIcon />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default function IntelligenceLandingPage({
  activePage,
  heroBody,
  heroEyebrow,
  heroHeading,
}: IntelligenceLandingPageProps) {
  const intelligenceName =
    activePage === "collection"
      ? "Collection Intelligence"
      : activePage === "revenue"
        ? "Revenue Intelligence"
        : activePage === "quality"
          ? "Quality and Coaching"
        : "Service Intelligence";
  const isCommercialLayout =
    activePage === "collection" ||
    activePage === "quality" ||
    activePage === "revenue";
  const commercialSections =
    activePage === "collection"
      ? collectionSections
      : activePage === "quality"
        ? qualitySections
        : revenueSections;
  const heroRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqItems =
    activePage === "revenue"
      ? [
          {
            question:
              "How is this different from a conversation intelligence tool?",
            answer:
              "Most tools tell you what was said. Revenue Intelligence tells you what it was worth: which interactions carried a buying signal, whether an offer followed, what the customer objected to, and which opportunities are still open. Then it queues the recovery, with the evidence attached.",
          },
          {
            question:
              "Does this work for outbound telesales, or only service-to-sales?",
            answer:
              "Yes, both. DataOrb reads inbound service conversations for missed sales moments, and it runs full-funnel intelligence on dedicated telesales programs in telco, insurance, energy, and medical devices, from right-party contact through to the close.",
          },
          {
            question: "Does DataOrb call the customer itself?",
            answer:
              "No. DataOrb builds the recovery list, the evidence, and the context for the callback. Your team, your dialer, or your orchestrator runs the campaign. The intelligence is headless, the runtime is yours. A person confirms the move.",
          },
          {
            question: "Do the practice personas expose customer data?",
            answer:
              "No. The digital twin keeps the scenario — the objection, the mood, the turn where the deal was lost — and strips the identity. Advisors practice the situation, not the person.",
          },
          {
            question: "Can we compare in-house teams with our BPO partners?",
            answer:
              "Yes. DataOrb measures every advisor, in-house or BPO, against the same offer tracking and the same scorecards. Brand and partner read from one record, which is the only way the conversation about performance stays honest.",
          },
        ]
      : activePage === "collection"
        ? [
            {
              question:
                "How is this different from speech analytics on our recorder?",
              answer:
                "Most tools transcribe and tag. Collection Intelligence reads the negotiation: the objection raised, the rebuttal used, the promise made, the disclosure met or missed. Then it trends the funnel and writes the coaching, with every claim cited to the call.",
            },
            {
              question: "Do we have to configure keywords or compliance rules?",
              answer:
                "No. DataOrb is context-aware out of the box, in 80+ languages, with no keywords, taxonomies, or prompts to maintain. Bring your compliance scorecard and your procedures, and DataOrb evaluates every call against them.",
            },
            {
              question: "Which regulations does it cover?",
              answer:
                "Your scorecard defines the standard, and DataOrb runs it on every call: mandatory disclosures, verification, consumer-rights language, prohibited conduct, vulnerability handling. Programs run today under both EU and US regulatory regimes.",
            },
            {
              question: "How quickly are insights available?",
              answer:
                "The moment the call concludes. Every conversation is analyzed as it ends, so a compliance flag or a coaching gap reaches the team lead the same day. Recovery probability decays with the age of the account; a QA loop measured in weeks arrives too late to matter.",
            },
            {
              question: "Does this cover our BPO collection partners?",
              answer:
                "Yes. Every agency and every in-house team is measured against the same scorecards and the same funnel, in one record. Brand and partner see the same numbers, which is the only way the conversation about recovery stays honest.",
            },
          ]
        : activePage === "quality"
          ? [
              {
                question: "Does this replace our existing QA scorecard?",
                answer:
                  "No. Your scorecard defines the standard. DataOrb applies it to every conversation, cites the evidence behind each result, and makes the record available for calibration and coaching.",
              },
              {
                question: "Does this replace human quality reviewers?",
                answer:
                  "No. DataOrb removes the listening and searching burden so reviewers can focus on calibration, judgment, coaching, and the exceptions that need human attention.",
              },
              {
                question: "Can different programs use different scorecards?",
                answer:
                  "Yes. Scorecards can reflect the requirements of each product, market, channel, and partner while still rolling up into a consistent enterprise view.",
              },
              {
                question: "How quickly is coaching available?",
                answer:
                  "As soon as the interaction ends. The score, cited evidence, and recommended coaching gap can reach the team lead the same day, while the conversation is still fresh.",
              },
              {
                question: "Can we use this with BPO partners?",
                answer:
                  "Yes. In-house teams and partners can be measured against the same standards in one record, with access controlled for each program and organization.",
              },
            ]
        : [
          {
            question: "How is this different from speech analytics?",
            answer: `Speech analytics tells you which words appeared and how often. ${intelligenceName} tells you what happened: whether the issue was resolved, what it cost the customer in effort, where the conversation turned, and who owns the failure. Topics are an index. This is a record.`,
          },
          {
            question: "How do we know the scores are right?",
            answer:
              "Every score links back to the interaction evidence that produced it. Teams can review the source, calibrate the model against human-reviewed examples, and track consistency over time.",
          },
          {
            question: "Does this replace our CSAT survey?",
            answer: `No. CSAT remains a useful signal from customers who respond. ${intelligenceName} complements it with evidence from every interaction, including the customers who never complete a survey.`,
          },
          {
            question: "Does this work for AI teammates, or only for advisors?",
            answer:
              "Both. The same evidence standard can evaluate human advisors, AI teammates, and journeys that move between them, so every outcome can be compared in one view.",
          },
        ];

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!hero || reduceMotion.matches) {
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      const progress = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);

      hero.style.setProperty("--hero-bg-y", `${progress * 44}px`);
      hero.style.setProperty("--hero-copy-y", `${progress * -34}px`);
      hero.style.setProperty("--hero-product-y", `${progress * 66}px`);
      hero.style.setProperty("--hero-grass-y", `${progress * 18}px`);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const faq = faqRef.current;

    if (!faq) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateFaqTransition = () => {
      const rect = faq.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.08;
      const rawProgress = Math.min(
        Math.max((start - rect.top) / (start - end), 0),
        1,
      );
      const progress = reduceMotion.matches
        ? rect.top <= viewportHeight * 0.45
          ? 1
          : 0
        : rawProgress;
      const maxInsetX = Math.min(96, Math.max(20, window.innerWidth * 0.0667));
      const maxInsetY = window.innerWidth <= 640 ? 64 : window.innerWidth <= 900 ? 80 : 100;
      const maxRadius = window.innerWidth <= 640 ? 28 : 40;
      const cardWidth = Math.min(1250, window.innerWidth - maxInsetX * 2);
      const panelWidth = cardWidth + (window.innerWidth - cardWidth) * progress;

      faq.style.setProperty("--faq-inset-x", `${maxInsetX * (1 - progress)}px`);
      faq.style.setProperty("--faq-inset-y", `${maxInsetY * (1 - progress)}px`);
      faq.style.setProperty("--faq-radius", `${maxRadius * (1 - progress)}px`);
      faq.style.setProperty("--faq-panel-width", `${panelWidth}px`);
      frame = 0;
    };

    const queueUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateFaqTransition);
      }
    };

    updateFaqTransition();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main id="top">
      <section
        ref={heroRef}
        className="hero"
        aria-labelledby="hero-heading"
        style={{ backgroundImage: `url("${heroBackground}")` }}
      >
        <div className="hero-wash" aria-hidden="true" />
        <Header />

        <div className="hero-copy">
          {heroEyebrow ? (
            <p className="hero-eyebrow">{heroEyebrow}</p>
          ) : null}
          <h1 id="hero-heading">{heroHeading}</h1>
          <p>{heroBody}</p>

          <div className="hero-actions" id="demo">
            <a className="button button-primary" href="mailto:hello@dataorb.ai">
              <span>Book a demo</span>
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#product">
              <span className="play-icon" aria-hidden="true">
                <span className="play-triangle" />
              </span>
              <span>See how it works</span>
            </a>
          </div>
        </div>

        <div
          className={`product-stage${isCommercialLayout ? " product-stage-blank" : ""}`}
          id="product"
        >
          <div className="product-glow" aria-hidden="true" />
          {isCommercialLayout ? (
            <div className="product-placeholder" aria-hidden="true" />
          ) : (
            <img
              className="product-image"
              src="/dataorb-product-dark.png"
              alt="dataOrb Collection Insights dashboard in a dark theme"
            />
          )}
        </div>

        <img
          className="grass"
          src="/grass-foreground-v2.png"
          alt=""
          aria-hidden="true"
        />
      </section>

      {isCommercialLayout ? (
        <IntelligenceSections page={activePage} sections={commercialSections} />
      ) : (
        <>
      <section className="standard-section" aria-labelledby="standard-heading">
        <div className="standard-inner">
          <div className="standard-top">
            <div className="standard-visual">
              <img
                src="/standard-channel-graphic.svg"
                alt="Customer effort and drift detection analytics cards"
              />
            </div>

            <div className="standard-copy">
              <span className="standard-eyebrow">See</span>
              <h2 id="standard-heading">One standard. Every channel.</h2>
              <p>
                DataOrb unifies every channel into one structured view,
                revealing demand, repeat contacts, risk, and customer effort.
              </p>
            </div>
          </div>

          <div className="standard-features">
            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Service demand, at the root</h3>
                <p>
                  Reveals what drives contacts, repeats, and customer effort.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Nothing hides in the average</h3>
                <p>
                  Spots small drift early across queues, markets, and channels.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Every language, one standard</h3>
                <p>
                  Unifies 80+ languages into one standard while preserving every
                  customer&apos;s original voice.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        className="standard-section diagnose-section"
        aria-labelledby="diagnose-heading"
      >
        <div className="standard-inner">
          <div className="standard-top diagnose-top">
            <div className="standard-copy diagnose-copy">
              <span className="standard-eyebrow">Diagnose</span>
              <h2 id="diagnose-heading">Diagnose the pain, fix the cause.</h2>
              <p>
                Separates why customers contact you from the friction they face,
                identifying the driver, severity, and exact evidence.
              </p>
            </div>

            <div className="standard-visual diagnose-visual">
              <img
                src="/diagnose-graphic.svg"
                alt="Trajectory deterioration and defect ticket analytics cards"
              />
            </div>
          </div>

          <div className="standard-features">
            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Know which failures you own</h3>
                <p>
                  Separates advisor-fixable issues from business defects turning
                  one into coaching &amp; the other into action.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Watch the moment it turns</h3>
                <p>
                  Tracks sentiment from entry to exit, pinpointing where the
                  customer&apos;s mood changed.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>From anecdote to business case</h3>
                <p>
                  Turns frustration into evidence: volume, severity, and
                  relationship impact that can drive action.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        className="standard-section resolve-section"
        aria-labelledby="resolve-heading"
      >
        <div className="standard-inner">
          <div className="standard-top resolve-top">
            <div className="standard-visual resolve-visual">
              <img
                src="/resolve-graphic.svg"
                alt="Recommended intervention and repeat-contact prevention cards"
              />
            </div>

            <div className="standard-copy resolve-copy">
              <span className="standard-eyebrow">Resolve</span>
              <h2 id="resolve-heading">Resolve more, repeat less.</h2>
              <p>
                Measures what was actually resolved, issue by issue, and what
                still blocks resolution.
              </p>
            </div>
          </div>

          <div className="standard-features">
            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>True resolution, per issue</h3>
                <p>
                  Tracks each issue to its true outcome, separate from what the
                  advisor declared.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Repeat contact risk</h3>
                <p>
                  Flags unfinished issues early to predict and prevent repeat
                  contacts.
                </p>
              </div>
            </article>

            <article className="standard-feature">
              <TrendIcon />
              <div>
                <h3>Next best intervention</h3>
                <p>
                  Recommends the next best follow-up for unresolved issues, with
                  a person confirming the action.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

        </>
      )}

      <div
        className={
          isCommercialLayout
            ? "proof-faq-background relative isolate overflow-hidden"
            : undefined
        }
      >
        {isCommercialLayout ? (
          <GradientBackground gradientTo="#c2d8cb" />
        ) : null}
        {activePage === "revenue" ? <Stats /> : null}
        {isCommercialLayout ? (
          <Feature135
            heading={
              activePage === "quality"
                ? "You keep the standard."
                : "You hold the controls."
            }
            description={
              activePage === "collection"
                ? "You choose which conversations DataOrb reads and who sees each advisor’s record. Every commitment and recommended action cites the exchange behind it, identities are stripped from practice personas, and a person confirms every treatment decision."
                : activePage === "quality"
                  ? "You choose the scorecards, the calibration process, and who sees each advisor’s record. Every score and coaching recommendation cites the interaction behind it, and your quality leaders remain in control of the standard."
                : "You choose which conversations DataOrb reads and who sees each advisor’s record. Every opportunity cites the exchange behind it, identities are stripped from digital twins, and a person confirms every recovery move."
            }
          />
        ) : null}

      <section
        ref={faqRef}
        className={`faq-section${isCommercialLayout ? " faq-section--proof-bg" : ""}`}
        aria-labelledby="faq-heading"
      >
        <div className="faq-panel">
          <div className="faq-content">
            <h2 id="faq-heading">
              Questions we
              <br />
              get asked.
            </h2>

            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details
                  className="faq-item"
                  key={item.question}
                  open={openFaqIndex === index}
                >
                  <summary
                    aria-expanded={openFaqIndex === index}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenFaqIndex((current) =>
                        current === index ? null : index,
                      );
                    }}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <div className="footer-brand-lockup">
              <span className="footer-brand-icon" aria-hidden="true">
                <BrandMark />
              </span>
              <span>dataOrb</span>
            </div>

            <div className="footer-message">
              <h2>
                {activePage === "revenue"
                  ? "See the revenue sitting in last month's calls."
                  : activePage === "collection"
                    ? "See what last month's campaigns left on the table."
                    : activePage === "quality"
                      ? "See what your QA sample is missing."
                    : "See what your last 1,000 conversations are telling you."}
              </h2>
              <p>
                {activePage === "revenue"
                  ? "Bring a sample of your own sales conversations. We will decode them and show you how many carried a buying signal that was never pitched, which offers are converting, and where your next recovery campaign is hiding."
                  : activePage === "collection"
                    ? "Bring a batch of your own collection calls. We will decode them and show you your real promise-to-pay conversion, the objections costing you the most, and where your compliance coverage actually stands."
                    : activePage === "quality"
                      ? "Bring a batch of your own conversations and your scorecard. We will show you the gaps your sample missed, the coaching priorities for each team, and the evidence behind every result."
                    : "Bring your interactions. We'll reveal resolution rates, effort hotspots, and repeat-contact drivers."}
              </p>
            </div>

            <a className="footer-cta" href="mailto:hello@dataorb.ai">
              <span>Book a demo</span>
              <ArrowIcon />
            </a>

            <p className="footer-copyright">
              © 2026 dataOrb. All rights reserved.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {[footerGroups.slice(0, 2), footerGroups.slice(2, 4), footerGroups.slice(4)].map(
              (column, columnIndex) => (
                <div
                  className="footer-nav-column"
                  key={columnIndex}
                >
                  {column.map((group) => (
                    <div
                      className="footer-group"
                      id={group.title.toLowerCase()}
                      key={group.title}
                    >
                      <h3>{group.title}</h3>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link}>
                            {link === "© DataOrb" ? (
                              <span>{link}</span>
                            ) : (
                              <a
                                href={getFooterLinkHref(link)}
                                aria-current={
                                  (activePage === "service" &&
                                    link === "Service Intelligence") ||
                                  (activePage === "revenue" &&
                                    link === "Revenue Intelligence") ||
                                  (activePage === "collection" &&
                                    link === "Collection Intelligence") ||
                                  (activePage === "quality" &&
                                    link === "Quality and Coaching")
                                    ? "page"
                                    : undefined
                                }
                              >
                                {link}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            )}
          </nav>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          dataOrb
        </div>

        <img
          className="footer-landscape"
          src="/footer-landscape-warm.png"
          alt=""
          aria-hidden="true"
        />
      </footer>
    </main>
  );
}
