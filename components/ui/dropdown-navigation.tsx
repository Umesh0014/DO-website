"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
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
  items?: NavigationSubItem[];
  label: string;
  layout?: "single-column";
};

type DropdownNavigationProps = {
  navItems: NavigationItem[];
};

function DropdownLink({ item }: { item: NavigationSubItem }) {
  return (
    <a href={item.href} role="menuitem">
      <span className="top-navigation-dropdown-title">{item.label}</span>
      {item.description ? (
        <span className="top-navigation-dropdown-description">
          {item.description}
        </span>
      ) : null}
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
            <div
              className={`top-navigation-dropdown-shell${item.groups ? " top-navigation-dropdown-shell--grouped" : ""}`}
            >
              {item.groups ? (
                <div
                  aria-label={`${item.label} links`}
                  className="top-navigation-dropdown top-navigation-dropdown--grouped"
                  role="menu"
                >
                  {item.groups.map((group) => (
                    <section
                      className="top-navigation-dropdown-group"
                      key={group.label}
                      role="none"
                    >
                      <h3 className="top-navigation-dropdown-group-title">
                        {group.label}
                      </h3>
                      <ul className="top-navigation-dropdown-group-list" role="none">
                        {group.items.map((subItem) => (
                          <li key={subItem.label} role="none">
                            <DropdownLink item={subItem} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
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
