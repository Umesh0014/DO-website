"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Compass,
  FileText,
  GraduationCap,
  HandCoins,
  Handshake,
  Headphones,
  HeartHandshake,
  LayoutGrid,
  Library,
  LockKeyhole,
  Mail,
  Network,
  Newspaper,
  RadioTower,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Umbrella,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NavigationSubItem = {
  description?: string;
  href: string;
  label: string;
};

type NavigationGroup = {
  description?: string;
  items: NavigationSubItem[];
  label: string;
};

type NavigationFeature = {
  description: string;
  href?: string;
  label: string;
};

type NavigationItem = {
  feature?: NavigationFeature;
  groups?: NavigationGroup[];
  href?: string;
  items?: NavigationSubItem[];
  label: string;
  layout?: "compact-card" | "single-column" | "split-card";
};

type DropdownNavigationProps = {
  navItems: NavigationItem[];
};

const navigationGroupIcons: Record<string, LucideIcon> = {
  Products: LayoutGrid,
  Explore: Compass,
  "By team": UsersRound,
  Industries: Building2,
  Resources: Library,
  Company: Building2,
  "Industry intelligence": RadioTower,
  "Customer proof": BookOpen,
  "Trust and responsibility": ShieldCheck,
};

const navigationGroupDescriptions: Record<string, string> = {
  Products: "Intelligence for every conversation.",
  Explore: "Discover the DataOrb platform.",
  "By team": "Built around your operating model.",
  Industries: "Intelligence built for your market.",
  Resources: "Ideas, guidance, and customer proof.",
  Company: "Company, careers, contact, and trust.",
  "Industry intelligence": "Segment-specific intelligence for regulated conversations.",
  "Customer proof": "Stories and evidence from teams using DataOrb.",
  "Trust and responsibility": "Security and responsible AI by design.",
};

const navigationItemIcons: Record<string, LucideIcon> = {
  "Service Intelligence": Headphones,
  "Revenue Intelligence": TrendingUp,
  "Collection Intelligence": HandCoins,
  "Quality and Coaching": BadgeCheck,
  "Training and Learning": GraduationCap,
  Insights: BarChart3,
  "Context Engine": Network,
  "Browse features": LayoutGrid,
  "DataOrb Ecosystem": Boxes,
  "Responsible AI and AAPES": ShieldCheck,
  "Chief Customer Office": UsersRound,
  "AI and Transformation": Sparkles,
  "Service Ops": Settings2,
  "Retention Ops": HeartHandshake,
  "Sales Teams": Handshake,
  Enablement: BookOpenCheck,
  Telecommunications: RadioTower,
  "Energy and utilities": Zap,
  Insurance: Umbrella,
  "Resources index": Library,
  Blog: Newspaper,
  "Technical posts": FileText,
  "Customer stories": BookOpen,
  About: Building2,
  Careers: BriefcaseBusiness,
  Contact: Mail,
  Security: LockKeyhole,
};

function DropdownLink({
  item,
  showIcon = false,
}: {
  item: NavigationSubItem;
  showIcon?: boolean;
}) {
  const ItemIcon = showIcon ? navigationItemIcons[item.label] : null;

  return (
    <a
      className={showIcon ? "top-navigation-dropdown-link--with-icon" : undefined}
      href={item.href}
      role="menuitem"
    >
      {ItemIcon ? (
        <ItemIcon aria-hidden="true" className="top-navigation-dropdown-item-icon" />
      ) : null}
      <span className="top-navigation-dropdown-copy">
        <span className="top-navigation-dropdown-title">{item.label}</span>
        {item.description ? (
          <span className="top-navigation-dropdown-description">
            {item.description}
          </span>
        ) : null}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="top-navigation-dropdown-arrow"
      />
    </a>
  );
}

function NavigationFeatureCard({ feature }: { feature: NavigationFeature }) {
  const content = (
    <>
      <span className="top-navigation-feature-title">{feature.label}</span>
      <span className="top-navigation-feature-description">
        {feature.description}
      </span>
      {feature.href ? (
        <ArrowUpRight aria-hidden="true" className="top-navigation-feature-arrow" />
      ) : null}
    </>
  );

  return feature.href ? (
    <a className="top-navigation-feature" href={feature.href} role="menuitem">
      {content}
    </a>
  ) : (
    <div className="top-navigation-feature">{content}</div>
  );
}

export function DropdownNavigation({ navItems }: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openNavigationMenu = (label: string) => {
    cancelClose();
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <ul
      className={`top-navigation-list${openMenu ? " top-navigation-list--open" : ""}`}
      role="menubar"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenMenu(null);
      }}
    >
      {navItems.map((item) => (
        <li
          className="top-navigation-item"
          key={item.label}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setOpenMenu(null);
            }
          }}
          onMouseEnter={() => {
            if (!item.href) openNavigationMenu(item.label);
          }}
          onMouseLeave={scheduleClose}
        >
          {item.href ? (
            <a className="top-navigation-link" href={item.href}>
              {item.label}
            </a>
          ) : (
            <button
              aria-expanded={openMenu === item.label}
              aria-haspopup="menu"
              className="top-navigation-link"
              onClick={() => openNavigationMenu(item.label)}
              onFocus={() => openNavigationMenu(item.label)}
              type="button"
            >
              {item.label}
              <ChevronDown aria-hidden="true" className="top-navigation-chevron" />
            </button>
          )}

          {!item.href && openMenu === item.label ? (
            <div
              className={`top-navigation-dropdown-shell${item.groups ? " top-navigation-dropdown-shell--grouped" : ""}${item.layout === "compact-card" ? " top-navigation-dropdown-shell--compact" : ""}${item.layout === "split-card" ? " top-navigation-dropdown-shell--split" : ""}`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {item.groups ? (
                <div
                  aria-label={`${item.label} links`}
                  className={`top-navigation-dropdown top-navigation-dropdown--grouped${item.layout === "compact-card" ? " top-navigation-dropdown--compact" : ""}${item.layout === "split-card" ? " top-navigation-dropdown--split" : ""}`}
                  role="menu"
                >
                  {item.layout === "split-card" && item.feature ? (
                    <section
                      className="top-navigation-dropdown-split-overview"
                      role="none"
                    >
                      <NavigationFeatureCard feature={item.feature} />
                      {item.groups[0] ? (
                        <ul
                          className="top-navigation-dropdown-group-list top-navigation-dropdown-split-list"
                          role="none"
                        >
                          {item.groups[0].items.map((subItem) => (
                            <li key={subItem.label} role="none">
                              <DropdownLink item={subItem} showIcon />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ) : null}
                  {item.groups.map((group) => {
                    const GroupIcon = navigationGroupIcons[group.label] ?? LayoutGrid;

                    if (item.layout === "split-card" && group === item.groups?.[0]) {
                      return null;
                    }

                    return (
                      <section
                        className={`top-navigation-dropdown-group${item.layout === "split-card" ? " top-navigation-dropdown-split-detail" : ""}`}
                        key={group.label}
                        role="none"
                      >
                        <div className="top-navigation-dropdown-group-header">
                          <span className="top-navigation-dropdown-group-icon">
                            <GroupIcon aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="top-navigation-dropdown-group-title">
                              {group.label}
                            </h3>
                            <p className="top-navigation-dropdown-group-description">
                              {group.description ?? navigationGroupDescriptions[group.label]}
                            </p>
                          </div>
                        </div>
                        <ul className="top-navigation-dropdown-group-list" role="none">
                          {group.items.map((subItem) => (
                            <li key={subItem.label} role="none">
                              <DropdownLink item={subItem} showIcon />
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <ul
                  aria-label={`${item.label} links`}
                  className={`top-navigation-dropdown${item.layout === "single-column" ? " top-navigation-dropdown--single" : ""}`}
                  role="menu"
                >
                  {(item.items ?? []).map((subItem) => (
                    <li key={subItem.label} role="none">
                      <DropdownLink item={subItem} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
