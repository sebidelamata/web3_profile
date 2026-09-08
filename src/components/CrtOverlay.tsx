import React from "react"

/**
 * Uniform-darken CRT flicker with 7 irregular dips per loop. Spacing,
 * depth, and width are all deliberately uneven — no two dips are the same
 * shape or same gap apart — so it reads as electrical imperfection rather
 * than a metronome. See CrtOverlay history: no mix-blend-mode (dead on a
 * near-black backdrop), keyframes self-contained via <style> tag,
 * prefers-reduced-motion checked in JS.
 */
const CrtOverlay: React.FC = () => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <>
      <style>{`
        @keyframes crt-flicker-4 {
          0%, 100% { opacity: 0; }

          /* dip 1 — quick, faint blip */
          6%    { opacity: 0; }
          6.15% { opacity: 0.06; }
          6.3%  { opacity: 0; }

          /* dip 2 — deeper, slightly longer */
          17%   { opacity: 0; }
          17.2% { opacity: 0.14; }
          17.4% { opacity: 0; }

          /* dip 3 — very quick, tiny */
          29%   { opacity: 0; }
          29.1% { opacity: 0.04; }
          29.2% { opacity: 0; }

          /* dip 4 — double-blink, close together */
          44%   { opacity: 0; }
          44.15%{ opacity: 0.091; }
          44.3% { opacity: 0; }
          44.5% { opacity: 0.07; }
          44.65%{ opacity: 0; }

          /* dip 5 — the deepest one, still brief */
          58%   { opacity: 0; }
          58.2% { opacity: 0.14; }
          58.5% { opacity: 0; }

          /* dip 6 — faint, lingers slightly longer than the others */
          74%   { opacity: 0; }
          74.2% { opacity: 0.08; }
          74.5% { opacity: 0.05; }
          75.1% { opacity: 0; }

          /* dip 7 — quick, near the end */
          89%   { opacity: 0; }
          89.15%{ opacity: 0.10; }
          89.3% { opacity: 0; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] bg-black"
        style={{ animation: "crt-flicker-4 17s linear infinite" }}
      />
    </>
  )
}

export default CrtOverlay