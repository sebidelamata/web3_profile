import React from "react"

/**
 * Subtle amber-CRT flicker. Deliberately irregular (two short dips inside a
 * 6s loop rather than a steady pulse) so it reads as an old monitor
 * imperfection, not a strobe. Lives on its own overlay div — never applied
 * as a filter on <body> — so it can't affect text legibility or layout,
 * and respects prefers-reduced-motion via the global rule in globals.css.
 */
const CrtOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] animate-crt-flicker bg-accent/[0.015] mix-blend-overlay"
    />
  )
}

export default CrtOverlay