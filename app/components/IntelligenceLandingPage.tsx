"use client";

import { useEffect, useRef, useState } from "react";

import { Component as GradientBackground } from "../../components/ui/bg-gredient";
import { Feature135 } from "../../components/ui/feature135";
import { Stats } from "../../components/ui/stats-section-with-text";
import { ArrowIcon, SiteFooter } from "./SiteChrome";
import SiteHeader from "./SiteHeader";

const heroBackground =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85";

type IntelligencePage = "collection" | "revenue" | "service";

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

type IntelligenceLandingPageProps = {
  activePage: IntelligencePage;
  heroBody: string;
  heroEyebrow?: string;
  heroHeading: string;
};

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

function IntelligenceSections({
  page,
  sections,
}: {
  page: "collection" | "revenue";
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
        : "Service Intelligence";
  const isCommercialLayout =
    activePage === "collection" || activePage === "revenue";
  const commercialSections =
    activePage === "collection" ? collectionSections : revenueSections;
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
        <SiteHeader />

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
            heading="You hold the controls."
            description={
              activePage === "collection"
                ? "You choose which conversations DataOrb reads and who sees each advisor’s record. Every commitment and recommended action cites the exchange behind it, identities are stripped from practice personas, and a person confirms every treatment decision."
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

      <SiteFooter activePage={activePage} />
    </main>
  );
}
