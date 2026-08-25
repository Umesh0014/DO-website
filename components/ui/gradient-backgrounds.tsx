import { cn } from "@/lib/utils"

export const Component = () => {
  return (
    <div
      className={cn("absolute inset-0 -z-10 min-h-screen w-full")}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #c2d8cb 100%)",
        }}
      />
    </div>
  )
}
