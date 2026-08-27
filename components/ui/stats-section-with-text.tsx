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
    title: "MasOrange — a controlled trial on the hardest queue",
    description:
      "MasOrange put Training and Learning on the cancellation queue and ran it like a clinical study: two practiced cohorts, two matched controls, baselines captured, six weeks, measured on the production KPIs the operation already reports. Handle time was deliberately excluded, because roleplay trains the conversation, not the CRM.",
    metrics: [
      {
        value: "2",
        annotation: "Practiced",
        description: "Practiced cohorts assigned to roleplay rehearsal",
      },
      {
        value: "2",
        annotation: "Controls",
        description: "Matched control cohorts used for comparison",
      },
      {
        value: "6 weeks",
        annotation: "Window",
        description: "Baselines captured before the controlled study period",
      },
      {
        value: "Production",
        annotation: "KPIs",
        description: "Measured on existing operational KPIs; handle time excluded",
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

function CaseStudySection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section
      className="relative z-10 w-full py-24 lg:py-32"
      aria-labelledby={`${caseStudy.id}-stats-heading`}
    >
      <div className="mx-auto w-full max-w-[1250px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="flex flex-col items-start gap-7">
            <Badge
              variant="outline"
              className="border-black/15 bg-white/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/65 backdrop-blur-sm"
            >
              Proof in production
            </Badge>

            <div className="flex flex-col gap-5">
              <h2
                id={`${caseStudy.id}-stats-heading`}
                className="max-w-xl text-left text-4xl font-normal tracking-[-0.045em] text-[#171717] md:text-5xl lg:text-[56px] lg:leading-[1.03]"
              >
                {caseStudy.title}
              </h2>
              <p className="max-w-md text-left text-base leading-relaxed text-black/58 md:text-lg">
                {caseStudy.description}
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {caseStudy.metrics.map((metric, metricIndex) => (
              <article
                className={`flex min-h-64 flex-col justify-between rounded-[22px] border border-black/10 bg-white/42 p-6 shadow-[0_18px_60px_rgba(46,35,25,0.08)] backdrop-blur-[3px] md:p-7${caseStudy.metrics.length === 3 && metricIndex === 2 ? " sm:col-span-2" : ""}`}
                key={`${caseStudy.id}-${metric.value}`}
              >
                <MoveUpRight
                  className="mb-12 size-5 text-black/50"
                  aria-hidden="true"
                />
                <div>
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                    <strong className="text-5xl font-normal tracking-[-0.055em] text-[#171717] md:text-6xl">
                      {metric.value}
                    </strong>
                    <span className="pb-1 text-xs font-medium uppercase tracking-[0.12em] text-black/38">
                      {metric.annotation}
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/58 md:text-[15px]">
                    {metric.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <div className="relative isolate my-[120px] overflow-hidden text-[#171717]">
      {caseStudies.map((caseStudy) => (
        <CaseStudySection caseStudy={caseStudy} key={caseStudy.id} />
      ))}
    </div>
  )
}

function TrainingProof() {
  return (
    <div className="relative isolate my-[120px] overflow-hidden text-[#171717]">
      <CaseStudySection caseStudy={caseStudies[0]} />
    </div>
  )
}

// Interim study figures and the open quote slot remain under publication hold.
export { Stats, TrainingProof }
