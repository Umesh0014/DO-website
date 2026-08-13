"use client";

import { useEffect, useRef, useState } from "react";

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
        <a className="logo-link" href="#top" aria-label="Questly home">
          <BrandMark />
        </a>
        <a className="header-cta" href="#demo">
          <span>Book a demo</span>
          <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
          <h1 id="hero-heading">Stop guessing what happened</h1>
          <p>
            Every interaction, evidence-linked: what happened, customer impact,
            and what&apos;s next.
          </p>

          <div className="hero-actions" id="demo">
            <a className="button button-primary" href="mailto:hello@questly.ai">
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

        <div className="product-stage" id="product">
          <div className="product-glow" aria-hidden="true" />
          <img
            className="product-image"
            src="/questly-product.svg"
            alt="Questly evidence-linked customer interaction dashboard"
          />
        </div>

        <img
          className="grass"
          src="/grass-foreground-v2.png"
          alt=""
          aria-hidden="true"
        />
      </section>

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

      <section ref={faqRef} className="faq-section" aria-labelledby="faq-heading">
        <div className="faq-panel">
          <h2 id="faq-heading">
            Questions we
            <br />
            get asked.
          </h2>

          <div className="faq-list">
            <details className="faq-item" open={openFaqIndex === 0}>
              <summary
                aria-expanded={openFaqIndex === 0}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenFaqIndex((current) => (current === 0 ? null : 0));
                }}
              >
                <span>How is this different from speech analytics?</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>
                  Speech analytics tells you which words appeared and how often.
                  Service Intelligence tells you what happened: whether the
                  issue was resolved, what it cost the customer in effort, where
                  the conversation turned, and who owns the failure. Topics are
                  an index. This is a record.
                </p>
              </div>
            </details>

            <details className="faq-item" open={openFaqIndex === 1}>
              <summary
                aria-expanded={openFaqIndex === 1}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenFaqIndex((current) => (current === 1 ? null : 1));
                }}
              >
                <span>How do we know the scores are right?</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>
                  Every score links back to the interaction evidence that
                  produced it. Teams can review the source, calibrate the model
                  against human-reviewed examples, and track consistency over
                  time.
                </p>
              </div>
            </details>

            <details className="faq-item" open={openFaqIndex === 2}>
              <summary
                aria-expanded={openFaqIndex === 2}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenFaqIndex((current) => (current === 2 ? null : 2));
                }}
              >
                <span>Does this replace our CSAT survey?</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>
                  No. CSAT remains a useful signal from customers who respond.
                  Service Intelligence complements it with evidence from every
                  interaction, including the customers who never complete a
                  survey.
                </p>
              </div>
            </details>

            <details className="faq-item" open={openFaqIndex === 3}>
              <summary
                aria-expanded={openFaqIndex === 3}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenFaqIndex((current) => (current === 3 ? null : 3));
                }}
              >
                <span>Does this work for AI teammates, or only for advisors?</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>
                  Both. The same evidence standard can evaluate human advisors,
                  AI teammates, and journeys that move between them, so every
                  outcome can be compared in one view.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-cta-block">
            <div className="footer-message">
              <h2>See what your last 1,000 conversations are telling you.</h2>
              <p>
                Bring your interactions. We&apos;ll reveal resolution rates,
                effort hotspots, and repeat-contact drivers.
              </p>
            </div>

            <a className="footer-cta" href="mailto:hello@questly.ai">
              <span>Book a demo</span>
              <ArrowIcon />
            </a>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <div className="footer-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link}>
                      {link === "© DataOrb" ? (
                        <span>{link}</span>
                      ) : (
                        <a href="#top">{link}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <img
          className="footer-landscape"
          src="/footer-landscape.svg"
          alt=""
          aria-hidden="true"
        />
      </footer>
    </main>
  );
}
