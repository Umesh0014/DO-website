import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  className?: string
  gradientFrom?: string
  gradientPosition?: string
  gradientSize?: string
  gradientStop?: string
  gradientTo?: string
}

export const Component = ({
  className,
  gradientFrom = "#fff",
  gradientTo = "#63e",
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "40%",
}: GradientBackgroundProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 -z-10 h-full w-full bg-white",
        className,
      )}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`,
      }}
    />
  )
}
