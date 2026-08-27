"use client";

import LogoLoop, { type LogoItem } from "../../components/ui/LogoLoop";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { ArrowIcon, SiteFooter } from "./SiteChrome";
import SiteHeader from "./SiteHeader";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

const placeholderLogos: LogoItem[] = [
  {
    node: <span className="placeholder-logo placeholder-logo-orbit">ORBIT</span>,
    title: "Orbit",
  },
  {
    node: (
      <span className="placeholder-logo placeholder-logo-northstar">
        Northstar
      </span>
    ),
    title: "Northstar",
  },
  {
    node: (
      <span className="placeholder-logo placeholder-logo-meridian">
        MERIDIAN
      </span>
    ),
    title: "Meridian",
  },
  {
    node: (
      <span className="placeholder-logo placeholder-logo-aperture">
        aperture
      </span>
    ),
    title: "Aperture",
  },
  {
    node: <span className="placeholder-logo placeholder-logo-vertex">VERTEX</span>,
    title: "Vertex",
  },
  {
    node: (
      <span className="placeholder-logo placeholder-logo-kinetic">Kinetic</span>
    ),
    title: "Kinetic",
  },
];

export default function MainLandingPage() {
  return (
    <main className="main-landing-page" id="top">
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          src={BG_VIDEO}
          aria-hidden="true"
        />
        <div className="home-hero-overlay" aria-hidden="true" />

        <SiteHeader />

        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">Decision intelligence for customer operations</p>
          <h1 id="home-hero-heading">
            Turn conversations into better decisions.
          </h1>
          <div className="home-hero-actions" id="demo">
            <a className="button button-primary" href="mailto:hello@dataorb.ai?subject=Book%20a%20DataOrb%20demo">
              <span>Book a demo</span>
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href="/platform/features">
              <span className="play-icon" aria-hidden="true">
                <span className="play-triangle" />
              </span>
              <span>See how it works</span>
            </a>
          </div>
        </div>
      </section>

      <section className="home-logo-strip" aria-labelledby="logo-strip-heading">
        <p className="home-logo-strip-label" id="logo-strip-heading">
          Built for modern customer operations
        </p>
        <LogoLoop
          logos={placeholderLogos}
          speed={72}
          direction="left"
          logoHeight={34}
          gap={78}
          hoverSpeed={18}
          scaleOnHover
          fadeOut
          fadeOutColor="#07090d"
          ariaLabel="Placeholder customer logos"
        />
      </section>

      <section className="home-reveal-section" aria-label="What DataOrb does">
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          baseRotation={2}
          blurStrength={8}
          rotationEnd="center center"
          wordAnimationEnd="center center"
          containerClassName="home-scroll-reveal"
          textClassName="home-scroll-reveal-text"
        >
          DataOrb decodes interactions across voice, chat, email, and chatbot in
          80+ languages, remembers what worked, and acts before the next one goes
          wrong, with the evidence attached.
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  );
}
