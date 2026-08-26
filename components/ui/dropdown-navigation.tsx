"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Boxes,
  ChevronDown,
  Compass,
  GraduationCap,
  HandCoins,
  Handshake,
  Headphones,
  HeartHandshake,
  LayoutGrid,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type NavigationSubItem = {
  description?: string;
  href: string;
  label: string;
};

type NavigationGroup = {
  items: NavigationSubItem[];
  label: string;
};

type NavigationItem = {
  groups?: NavigationGroup[];
  href?: string;
  items?: NavigationSubItem[];
  label: string;
  layout?: "single-column";
};

type DropdownNavigationProps = {
  navItems: NavigationItem[];
};

const navigationGroupIcons: Record<string, LucideIcon> = {
  Products: LayoutGrid,
  Explore: Compass,
  "By team": UsersRound,
};

const navigationGroupDescriptions: Record<string, string> = {
  Products: "Intelligence for every conversation.",
  Explore: "Discover the DataOrb platform.",
  "By team": "Built around your operating model.",
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

export function DropdownNavigation({ navItems }: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <ul
      className={`top-navigation-list${openMenu ? " top-navigation-list--open" : ""}`}
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
            if (!item.href) setOpenMenu(item.label);
          }}
          onMouseLeave={() => setOpenMenu(null)}
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
              onClick={() => setOpenMenu(item.label)}
              onFocus={() => setOpenMenu(item.label)}
              type="button"
            >
              {item.label}
              <ChevronDown aria-hidden="true" className="top-navigation-chevron" />
            </button>
          )}

          {!item.href && openMenu === item.label ? (
            <div
              className={`top-navigation-dropdown-shell${item.groups ? " top-navigation-dropdown-shell--grouped" : ""}`}
            >
              {item.groups ? (
                <div
                  aria-label={`${item.label} links`}
                  className="top-navigation-dropdown top-navigation-dropdown--grouped"
                  role="menu"
                >
                  {item.groups.map((group) => {
                    const GroupIcon = navigationGroupIcons[group.label] ?? LayoutGrid;

                    return (
                      <section
                        className="top-navigation-dropdown-group"
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
                              {navigationGroupDescriptions[group.label]}
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
