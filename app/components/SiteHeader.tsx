"use client";

import Link from "next/link";

import { DropdownNavigation } from "../../components/ui/dropdown-navigation";
import { ArrowIcon, BrandMark } from "./SiteChrome";

const primaryNavigation = [
  {
    label: "Platform",
    groups: [
      {
        label: "Products",
        items: [
          { label: "Service Intelligence", href: "/service-intelligence" },
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

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <Link className="logo-link" href="/" aria-label="dataOrb home">
          <BrandMark />
          <span className="brand-wordmark">dataOrb</span>
        </Link>
        <DropdownNavigation navItems={primaryNavigation} />
        <a className="header-cta" href="#demo">
          <span>Book a demo</span>
          <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}
