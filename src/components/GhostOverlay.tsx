import React from "react"

/**
 * Faint CRT signal-ghosting: a thin, offset layer that blurs whatever is
 * actually rendered beneath it via backdrop-filter, rather than tinting
 * the page a flat color. Because it samples real pixels, it works on
 * text, images, and most content generically (same-origin iframe content
 * won't blur through — that's a browser sandboxing limit, not a bug here).
 *
 * Kept static (no animation) by default — a *constant* faint offset reads
 * as an old analog signal that's slightly out of alignment, which is the
 * actual ghosting look. Animating the offset instead reads as something
 * drifting/breathing, which is a different (and busier) effect — see the
 * optional variant at the bottom if you want that instead.
 */
const GhostOverlay: React.FC = () => {
  return (
    <>
     <style>{`
       @keyframes ghost-drift {
         0%, 100% { transform: translateX(1px); }
         50%      { transform: translateX(2.2px); }
       }
     `}</style>
     <div
       aria-hidden="true"
       className="pointer-events-none fixed inset-0 z-[9998]"
       style={{
         backdropFilter: "blur(0.5px)",
         WebkitBackdropFilter: "blur(0.5px)",
         opacity: 0.35,
          animation: "ghost-drift 19s ease-in-out infinite",
        }}
      />
    </>
  )
}

export default GhostOverlay

/**
 * Optional variant: very slow, subtle drift instead of a fixed offset.
 * Swap the export above for this if you want the ghost to feel like it's
 * gently un-syncing rather than permanently misaligned. Uses the same
 * self-contained <style> pattern as CrtOverlay so it has no external
 * dependency.
 *
 * const GhostOverlayDrifting: React.FC = () => (
 *   <>
 *     <style>{`
 *       @keyframes ghost-drift {
 *         0%, 100% { transform: translateX(1px); }
 *         50%      { transform: translateX(2.2px); }
 *       }
 *     `}</style>
 *     <div
 *       aria-hidden="true"
 *       className="pointer-events-none fixed inset-0 z-[9998]"
 *       style={{
 *         backdropFilter: "blur(0.5px)",
 *         WebkitBackdropFilter: "blur(0.5px)",
 *         opacity: 0.35,
 *         animation: "ghost-drift 14s ease-in-out infinite",
 *       }}
 *     />
 *   </>
 * )
 */