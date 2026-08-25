import { MoveUpRight } from "lucide-react"

import { Badge } from "./badge"

type Metric = {
  annotation: string
  description: string
  value: string
}

type CaseStudy = {
  description: string
  id: string
  metrics: Metric[]
  title: string
}

const caseStudies: CaseStudy[] = [
  {
    id: "masorange",
    title: "MasOrange — telco, seven brands",
    description:
      "Revenue and retention outcomes recovered directly from customer interactions.",
    metrics: [
      {
        value: "+13.5%",
        annotation: "Recovered",
        description:
          "Additional sales recovered from interactions that did not close",
      },
      {
        value: "+25%",
        annotation: "Conversion",
        description: "Sales conversion",
      },
      {
        value: "~1,000",
        annotation: "Monthly",
        description:
          "High-risk churners identified for outbound retention each month",
      },
      {
        value: "+15%",
        annotation: "Uptake",
        description: "Uptake of the marketing-recommended tariff",
      },
    ],
  },
  {
    id: "konecta-energy",
    title: "Konecta — energy telesales program",
    description:
      "Inbound lead qualification and outbound recovery performance measured across the program.",
    metrics: [
      {
        value: "14.5%",
        annotation: "Qualified",
        description: "Inbound interactions converted into qualified leads",
      },
      {
        value: "6.5%",
        annotation: "Recovery",
        description: "Conversion on outbound recovery calls",
      },
      {
        value: "65%",
        annotation: "Contactability",
        description: "Right-party contactability",
      },
    ],
  },
  {
    id: "konecta-insurance",
    title: "Konecta — insurance telesales program",
    description:
      "Sales growth and quality-assurance automation measured across the program.",
    metrics: [
      {
        value: "Up to 10%",
        annotation: "Uplift",
        description: "Uplift in outbound sales",
      },
      {
        value: "~3 FTE",
        annotation: "Automated",
        description: "QA effort automated",
      },
    ],
  },
]

function Stats() {
  return (
    <div className="dark bg-[#111111] text-white">
      {caseStudies.map((caseStudy, caseStudyIndex) => (
        <section
          className={`w-full py-24 lg:py-32${caseStudyIndex > 0 ? " border-t border-white/[0.08]" : ""}`}
          aria-labelledby={`${caseStudy.id}-stats-heading`}
          key={caseStudy.id}
        >
          <div className="mx-auto w-full max-w-[1250px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div className="flex flex-col items-start gap-7">
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/75"
                >
                  Proof in production
                </Badge>

                <div className="flex flex-col gap-5">
                  <h2
                    id={`${caseStudy.id}-stats-heading`}
                    className="max-w-xl text-left text-4xl font-normal tracking-[-0.045em] text-white md:text-5xl lg:text-[56px] lg:leading-[1.03]"
                  >
                    {caseStudy.title}
                  </h2>
                  <p className="max-w-md text-left text-base leading-relaxed text-white/55 md:text-lg">
                    {caseStudy.description}
                  </p>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
                {caseStudy.metrics.map((metric, metricIndex) => (
                  <article
                    className={`flex min-h-64 flex-col justify-between rounded-[22px] border border-white/10 bg-white/[0.035] p-6 md:p-7${caseStudy.metrics.length === 3 && metricIndex === 2 ? " sm:col-span-2" : ""}`}
                    key={`${caseStudy.id}-${metric.value}`}
                  >
                    <MoveUpRight
                      className="mb-12 size-5 text-white/55"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                        <strong className="text-5xl font-normal tracking-[-0.055em] text-white md:text-6xl">
                          {metric.value}
                        </strong>
                        <span className="pb-1 text-xs font-medium uppercase tracking-[0.12em] text-white/38">
                          {metric.annotation}
                        </span>
                      </div>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55 md:text-[15px]">
                        {metric.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export { Stats }
