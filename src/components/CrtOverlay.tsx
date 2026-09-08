import React, { useEffect, useRef } from "react"

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * Uniform-darken CRT flicker, driven by a JS random scheduler instead of
 * CSS keyframes.
 *
 * Why: a fixed @keyframes loop repeats EXACTLY every N seconds no matter
 * how irregular the dips look within one cycle — a viewer who has the tab
 * open for a couple minutes will eventually lock onto that period, and a
 * detected loop reads as more artificial than a plain steady pulse would,
 * not less. Real flicker has no period. Generating each dip's timing,
 * depth, and shape from Math.random() at runtime removes the loop point
 * entirely — it never repeats the same way twice in a session.
 *
 * Mechanics:
 * - Gaps between dips are mostly short (1.5–4.5s) with an occasional
 *   longer pause (up to 11s, ~20% of the time) — an all-short-gaps
 *   flicker feels busy/mechanical; occasional calm stretches feel organic.
 * - Depth (0.03–0.17) and rise/hold/fall timing are all randomized per
 *   dip, so no two dips are ever the same shape.
 * - ~22% chance of chaining a second, usually fainter dip right after —
 *   a "double-blink" — without hand-authoring specific double-blink cases.
 * - Opacity is set directly via ref (no React state), so this never
 *   triggers a re-render — cheap regardless of how often it fires.
 * - Scheduling pauses while the tab is hidden (visibilitychange) so
 *   nothing builds up or fires pointlessly in a background tab.
 * - Listens for prefers-reduced-motion changes live, not just at mount,
 *   so toggling the OS setting while the page is open takes effect
 *   immediately.
 */
const CrtOverlay: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let active = !mq.matches

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    const triggerFlicker = () => {
      const el = ref.current
      if (!el) return

      const depth = rand(0.03, 0.12)
      const riseMs = rand(15, 45)
      const holdMs = rand(15, 80)
      const fallMs = rand(30, 130)

      el.style.transition = `opacity ${riseMs}ms linear`
      el.style.opacity = String(depth)

      setTimeout(() => {
        if (!ref.current) return
        ref.current.style.transition = `opacity ${fallMs}ms ease-out`
        ref.current.style.opacity = "0"
      }, riseMs + holdMs)

      // occasional double-blink: a second, usually fainter dip right after
      if (Math.random() < 0.22) {
        setTimeout(() => {
          if (active) triggerFlicker()
        }, riseMs + holdMs + fallMs + rand(50, 160))
      }
    }

    const scheduleNext = () => {
      // mostly short gaps, occasionally a longer calm stretch
      const gap = Math.random() < 0.2 ? rand(5000, 11000) : rand(1500, 4500)
      timeoutRef.current = setTimeout(() => {
        if (active) triggerFlicker()
        scheduleNext()
      }, gap)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        clear()
      } else if (active) {
        scheduleNext()
      }
    }

    const handleMotionChange = () => {
      active = !mq.matches
      clear()
      if (active && !document.hidden) scheduleNext()
      else if (ref.current) ref.current.style.opacity = "0"
    }

    if (active) scheduleNext()
    document.addEventListener("visibilitychange", handleVisibility)
    mq.addEventListener("change", handleMotionChange)

    return () => {
      clear()
      document.removeEventListener("visibilitychange", handleVisibility)
      mq.removeEventListener("change", handleMotionChange)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] bg-black"
      style={{ opacity: 0 }}
    />
  )
}

export default CrtOverlay