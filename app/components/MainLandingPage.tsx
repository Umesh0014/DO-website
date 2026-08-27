"use client";

import { ChevronDown, Menu, Play, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import LogoLoop, { type LogoItem } from "../../components/ui/LogoLoop";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { BrandMark, SiteFooter } from "./SiteChrome";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

const navLinks = [
  { label: "Platform", href: "/platform/features", dropdown: true },
  { label: "Industries", href: "/industries/telecommunications", dropdown: true },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company/about", dropdown: true },
];

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
  const [menuOpen, setMenuOpen] = useState(false);

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

        <header className="home-header">
          <nav className="home-navbar" aria-label="Primary navigation">
            <Link className="home-logo" href="/" aria-label="dataOrb home">
              <BrandMark />
              <span>dataOrb</span>
            </Link>

            <div className="home-nav-pill liquid-glass" aria-label="Site sections">
              {navLinks.map((item) => (
                <a className="home-nav-link" href={item.href} key={item.label}>
                  <span>{item.label}</span>
                  {item.dropdown ? <ChevronDown aria-hidden="true" size={13} /> : null}
                </a>
              ))}
            </div>

            <div className="home-header-actions">
              <a className="home-header-secondary liquid-glass" href="mailto:hello@dataorb.ai">
                Contact
              </a>
              <a className="home-header-primary" href="mailto:hello@dataorb.ai?subject=Book%20a%20DataOrb%20demo">
                Book a demo
              </a>
            </div>

            <button
              className="home-menu-toggle liquid-glass"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
            </button>
          </nav>

          {menuOpen ? (
            <div className="home-mobile-menu liquid-glass">
              {navLinks.map((item) => (
                <a
                  className="home-mobile-link"
                  href={item.href}
                  key={item.label}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.dropdown ? <ChevronDown aria-hidden="true" size={15} /> : null}
                </a>
              ))}
              <div className="home-mobile-actions">
                <a className="home-header-secondary liquid-glass" href="mailto:hello@dataorb.ai">
                  Contact
                </a>
                <a className="home-header-primary" href="mailto:hello@dataorb.ai?subject=Book%20a%20DataOrb%20demo">
                  Book a demo
                </a>
              </div>
            </div>
          ) : null}
        </header>

        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">Decision intelligence for customer operations</p>
          <h1 id="home-hero-heading">
            Turn every customer conversation into your next best decision.
          </h1>
          <div className="home-hero-actions">
            <a className="home-hero-primary" href="mailto:hello@dataorb.ai?subject=Book%20a%20DataOrb%20demo">
              Book a demo
            </a>
            <a className="home-hero-secondary liquid-glass" href="/platform/features">
              <Play aria-hidden="true" size={16} fill="currentColor" />
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
          fadeOutColor="#f7f5ef"
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

      <SiteFooter activePage="service" />
    </main>
  );
}
