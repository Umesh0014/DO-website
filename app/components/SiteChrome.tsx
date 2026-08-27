import Link from "next/link";

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

export type IntelligencePage = "collection" | "revenue" | "service";

function getFooterLinkHref(link: string) {
  if (link === "Service Intelligence") return "/service-intelligence";
  if (link === "Revenue Intelligence") return "/revenue-intelligence";
  if (link === "Collection Intelligence") return "/collection-intelligence";
  return "#top";
}

export function BrandMark() {
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

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.2 0.75 10.13 1.82l4.4 4.43H0v1.5h14.53l-4.4 4.43 1.07 1.07L17.45 7 11.2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter({ activePage }: { activePage?: IntelligencePage }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-column">
          <Link className="footer-brand-lockup" href="/" aria-label="dataOrb home">
            <span className="footer-brand-icon" aria-hidden="true">
              <BrandMark />
            </span>
            <span>dataOrb</span>
          </Link>

          <div className="footer-message">
            <h2>
              {activePage === "revenue"
                ? "See the revenue sitting in last month's calls."
                : activePage === "collection"
                  ? "See what last month's campaigns left on the table."
                  : "See what your last 1,000 conversations are telling you."}
            </h2>
            <p>
              {activePage === "revenue"
                ? "Bring a sample of your own sales conversations. We will decode them and show you how many carried a buying signal that was never pitched, which offers are converting, and where your next recovery campaign is hiding."
                : activePage === "collection"
                  ? "Bring a batch of your own collection calls. We will decode them and show you your real promise-to-pay conversion, the objections costing you the most, and where your compliance coverage actually stands."
                  : "Bring your interactions. We'll reveal resolution rates, effort hotspots, and repeat-contact drivers."}
            </p>
          </div>

          <a className="footer-cta" href="mailto:hello@dataorb.ai">
            <span>Book a demo</span>
            <ArrowIcon />
          </a>

          <p className="footer-copyright">© 2026 dataOrb. All rights reserved.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {[footerGroups.slice(0, 2), footerGroups.slice(2, 4), footerGroups.slice(4)].map(
            (column, columnIndex) => (
              <div className="footer-nav-column" key={columnIndex}>
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
                                  link === "Collection Intelligence")
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
            ),
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
  );
}
