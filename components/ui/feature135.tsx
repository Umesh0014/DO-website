import { cn } from "@/lib/utils"

interface Feature135Props {
  className?: string
  description: string
  firstTileImage?: {
    alt: string
    src: string
  }
  heading: string
  tileCount?: number
}

export function Feature135({
  className,
  description,
  firstTileImage,
  heading,
  tileCount = 4,
}: Feature135Props) {
  return (
    <section className={cn("relative z-10 w-full py-24 md:py-32", className)}>
      <div className="mx-auto max-w-[1250px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal tracking-[-0.045em] text-[#171717] md:text-5xl lg:text-[56px] lg:leading-[1.03]">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {description}
          </p>
        </div>

        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-4 md:mt-16 md:gap-6"
        >
          {Array.from({ length: tileCount }, (_, index) => (
            <div
              aria-hidden={index === 0 && firstTileImage ? undefined : true}
              className="flex h-20 w-36 items-center justify-center rounded-[18px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(46,64,48,0.10)] sm:h-24 sm:w-44"
              key={`control-tile-${index + 1}`}
            >
              {index === 0 && firstTileImage ? (
                <img
                  alt={firstTileImage.alt}
                  className="h-auto max-h-14 w-[104px] object-contain sm:max-h-[68px] sm:w-[132px]"
                  src={firstTileImage.src}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature135
