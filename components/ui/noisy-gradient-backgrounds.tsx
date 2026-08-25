"use client"

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react"

type GradientColor = {
  color: string
  stop: string
}

type GradientBackgroundProps = {
  children?: ReactNode
  className?: string
  colors?: GradientColor[]
  customGradient?: string
  enableNoise?: boolean
  gradientOrigin?:
    | "bottom-left"
    | "bottom-middle"
    | "bottom-right"
    | "center"
    | "left-middle"
    | "right-middle"
    | "top-left"
    | "top-middle"
    | "top-right"
  gradientSize?: string
  gradientType?: "conic-gradient" | "linear-gradient" | "radial-gradient"
  noiseIntensity?: number
  noisePatternAlpha?: number
  noisePatternRefreshInterval?: number
  noisePatternScaleX?: number
  noisePatternScaleY?: number
  noisePatternSize?: number
  style?: CSSProperties
}

type NoiseProps = {
  intensity: number
  patternAlpha: number
  patternRefreshInterval: number
  patternScaleX: number
  patternScaleY: number
  patternSize: number
}

const gradientPositions = {
  "bottom-middle": "50% 101%",
  "bottom-left": "0% 101%",
  "bottom-right": "100% 101%",
  "top-middle": "50% -1%",
  "top-left": "0% -1%",
  "top-right": "100% -1%",
  "left-middle": "-1% 50%",
  "right-middle": "101% 50%",
  center: "50% 50%",
} as const

const linearGradientAngles = {
  "bottom-middle": "0deg",
  "bottom-left": "45deg",
  "bottom-right": "315deg",
  "top-middle": "180deg",
  "top-left": "135deg",
  "top-right": "225deg",
  "left-middle": "90deg",
  "right-middle": "270deg",
  center: "0deg",
} as const

const defaultColors: GradientColor[] = [
  { color: "rgba(245,87,2,1)", stop: "10.5%" },
  { color: "rgba(245,120,2,1)", stop: "16%" },
  { color: "rgba(245,140,2,1)", stop: "17.5%" },
  { color: "rgba(245,170,100,1)", stop: "25%" },
  { color: "rgba(238,174,202,1)", stop: "40%" },
  { color: "rgba(202,179,214,1)", stop: "65%" },
  { color: "rgba(148,201,233,1)", stop: "100%" },
]

function Noise({
  intensity,
  patternAlpha,
  patternRefreshInterval,
  patternScaleX,
  patternScaleY,
  patternSize,
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement

    if (!canvas || !parent) return

    const context = canvas.getContext("2d")
    if (!context) return

    const patternCanvas = document.createElement("canvas")
    patternCanvas.width = patternSize
    patternCanvas.height = patternSize

    const patternContext = patternCanvas.getContext("2d")
    if (!patternContext) return

    const patternData = patternContext.createImageData(patternSize, patternSize)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let animationFrameId = 0
    let frame = 0
    let cssWidth = 0
    let cssHeight = 0

    const resize = () => {
      const parentRect = parent.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1
      cssWidth = parentRect.width
      cssHeight = parentRect.height
      canvas.width = cssWidth * devicePixelRatio
      canvas.height = cssHeight * devicePixelRatio
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = () => {
      for (let index = 0; index < patternData.data.length; index += 4) {
        const value = Math.random() * 255 * intensity
        patternData.data[index] = value
        patternData.data[index + 1] = value
        patternData.data[index + 2] = value
        patternData.data[index + 3] = patternAlpha
      }

      patternContext.putImageData(patternData, 0, 0)
      context.clearRect(0, 0, cssWidth, cssHeight)
      context.save()
      context.scale(patternScaleX, patternScaleY)

      const pattern = context.createPattern(patternCanvas, "repeat")
      if (pattern) {
        context.fillStyle = pattern
        context.fillRect(
          0,
          0,
          cssWidth / patternScaleX,
          cssHeight / patternScaleY,
        )
      }

      context.restore()
    }

    const loop = () => {
      if (frame % Math.max(1, patternRefreshInterval) === 0) draw()
      frame += 1
      animationFrameId = window.requestAnimationFrame(loop)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })

    resize()
    draw()
    resizeObserver.observe(parent)

    if (!reduceMotion.matches && patternRefreshInterval > 0) loop()

    return () => {
      resizeObserver.disconnect()
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
    }
  }, [
    intensity,
    patternAlpha,
    patternRefreshInterval,
    patternScaleX,
    patternScaleY,
    patternSize,
  ])

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
      ref={canvasRef}
    />
  )
}

function GradientBackground({
  children,
  className = "",
  colors = defaultColors,
  customGradient,
  enableNoise = true,
  gradientOrigin = "bottom-middle",
  gradientSize = "125% 125%",
  gradientType = "radial-gradient",
  noiseIntensity = 0.7,
  noisePatternAlpha = 22,
  noisePatternRefreshInterval = 4,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternSize = 90,
  style,
}: GradientBackgroundProps) {
  const position = gradientPositions[gradientOrigin]
  const colorStops = colors
    .map(({ color, stop }) => `${color} ${stop}`)
    .join(",")
  const generatedGradient =
    gradientType === "linear-gradient"
      ? `linear-gradient(${linearGradientAngles[gradientOrigin]},${colorStops})`
      : gradientType === "conic-gradient"
        ? `conic-gradient(from 0deg at ${position},${colorStops})`
        : `radial-gradient(${gradientSize} at ${position},${colorStops})`

  return (
    <div
      className={`absolute inset-0 size-full ${className}`}
      style={{ background: customGradient ?? generatedGradient, ...style }}
    >
      {enableNoise ? (
        <Noise
          intensity={noiseIntensity}
          patternAlpha={noisePatternAlpha}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternScaleX={Math.max(0.001, noisePatternScaleX)}
          patternScaleY={Math.max(0.001, noisePatternScaleY)}
          patternSize={noisePatternSize}
        />
      ) : null}
      {children}
    </div>
  )
}

export { GradientBackground }
