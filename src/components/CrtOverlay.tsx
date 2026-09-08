import React from "react"

/**
 * Brief, irregular uniform darken — reads as CRT power-flicker.
 *
 * Two things changed from earlier attempts, both root causes rather than
 * tuning:
 *  1. Dropped `mix-blend-mode: overlay`. Overlay/multiply-family blend
 *     modes multiply against the backdrop, so on a near-black background
 *     (#161310) the result is always close to zero regardless of opacity
 *     or keyframe amplitude — it was structurally incapable of being
 *     visible here.
 *  2. Dropped the amber tint. A plain black overlay that briefly increases
 *     opacity (0 -> ~0.12 -> 0) is a much more reliable way to simulate a
 *     flicker than trying to animate a colored, blended layer — it reads
 *     as a brightness dip regardless of what's under it.
 *
 * The @keyframes are embedded directly in this file via a <style> tag,
 * so this component has zero dependency on globals.css being in sync.
 * Respects prefers-reduced-motion (checked in JS, not just CSS, so it
 * can't be silently overridden by cascade/specificity issues elsewhere).
 */
const CrtOverlay: React.FC = () => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <>
      <style>{`
        @keyframes crt-flicker-3 {
          0%, 100% { opacity: 0; }
          91% { opacity: 0; }
          91.3% { opacity: 0.12; }
          91.6% { opacity: 0; }
          95% { opacity: 0; }
          95.2% { opacity: 0.08; }
          95.5% { opacity: 0; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] bg-black"
        style={{ animation: "crt-flicker-3 6s linear infinite" }}
      />
    </>
  )
}

export default CrtOverlay