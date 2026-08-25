"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

type NavigationSubItem = {
  description: string;
  href: string;
  label: string;
};

type NavigationItem = {
  items: NavigationSubItem[];
  label: string;
};

type DropdownNavigationProps = {
  navItems: NavigationItem[];
};

export function DropdownNavigation({ navItems }: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <ul className="top-navigation-list">
      {navItems.map((item) => (
        <li
          className="top-navigation-item"
          key={item.label}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setOpenMenu(null);
            }
          }}
          onMouseEnter={() => setOpenMenu(item.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button
            aria-expanded={openMenu === item.label}
            aria-haspopup="menu"
            className="top-navigation-link"
            onClick={() =>
              setOpenMenu((current) =>
                current === item.label ? null : item.label,
              )
            }
            onFocus={() => setOpenMenu(item.label)}
            type="button"
          >
            {item.label}
            <ChevronDown aria-hidden="true" className="top-navigation-chevron" />
          </button>

          {openMenu === item.label ? (
            <div className="top-navigation-dropdown-shell">
              <ul aria-label={`${item.label} links`} className="top-navigation-dropdown" role="menu">
                {item.items.map((subItem) => (
                  <li key={subItem.label} role="none">
                    <a href={subItem.href} role="menuitem">
                      <span className="top-navigation-dropdown-title">
                        {subItem.label}
                      </span>
                      <span className="top-navigation-dropdown-description">
                        {subItem.description}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="top-navigation-dropdown-arrow"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
