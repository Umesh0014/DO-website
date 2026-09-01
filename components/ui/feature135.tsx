import { cn } from "@/lib/utils"

interface Feature135Props {
  className?: string
  description: string
  firstTileImage?: {
    alt: string
    src: string
  }
  heading: string
  logoWallImage?: {
    alt: string
    src: string
  }
  logoWallItems?: Array<{
    image?: {
      alt: string
      compact?: boolean
      src: string
    }
    label?: string
  }>
  tileCount?: number
}

export function Feature135({
  className,
  description,
  firstTileImage,
  heading,
  logoWallImage,
  logoWallItems,
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

        {logoWallItems?.length ? (
          <div className="mx-auto mt-10 flex w-full max-w-[720px] flex-wrap items-center justify-center gap-8 py-4 md:gap-12">
            {logoWallItems.map((item, index) => (
              <div
                className="flex min-h-24 items-center justify-center"
                key={item.label ?? item.image?.alt ?? `logo-wall-item-${index + 1}`}
              >
                {item.image ? (
                  <img
                    alt={item.image.alt}
                    className={cn(
                      "object-contain grayscale",
                      item.image.compact
                        ? "h-[68px] w-[68px]"
                        : "h-20 w-20",
                    )}
                    src={item.image.src}
                  />
                ) : (
                  <span className="text-center text-xl font-semibold tracking-[-0.035em] text-black/55 md:text-2xl">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : logoWallImage ? (
          <img
            alt={logoWallImage.alt}
            className="mx-auto mt-10 h-auto w-full max-w-[1038px] object-contain"
            src={logoWallImage.src}
          />
        ) : null}

        {tileCount > 0 ? (
          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 md:gap-6",
              logoWallImage || logoWallItems?.length
                ? "mt-10 md:mt-12"
                : "mt-14 md:mt-16",
            )}
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
                    className="h-auto max-h-12 w-[100px] object-contain sm:max-h-14 sm:w-[120px]"
                    src={firstTileImage.src}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Feature135
