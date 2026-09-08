import React from "react"

/**
 * Scanlines: fine repeating horizontal lines, mimicking CRT/TV line
 * granularity. Pure CSS gradient — no blur, no backdrop-filter, no
 * per-frame sampling — so unlike GhostOverlay this is essentially free to
 * keep running, even on lower-end phones.
 *
 * Line pitch is in fixed px (not vw/em) deliberately: scanlines are meant
 * to look like a fixed physical line count, not scale with the viewport.
 * A 2px line pitch (~1px dark, 1px transparent) reads as fine texture
 * without visibly banding at typical viewing distance; going much coarser
 * (4px+) starts to look like a deliberate stripe pattern rather than
 * scanline granularity.
 */
const ScanlineOverlay: React.FC = () => {
  return (
    <>
     <style>{`
       @keyframes scan-sweep {
         0%   { background-position-y: 0; }
         100% { background-position-y: 100vh; }
       }
     `}</style>
     <div
       aria-hidden="true"
       className="pointer-events-none fixed inset-0 z-[9997]"
       style={{
         backgroundImage:
           "repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 2px), linear-gradient(to bottom, transparent, rgba(232,224,212,0.05) 50%, transparent)",
         backgroundSize: "100% 2px, 100% 6px",
         animation: "scan-sweep 6s linear infinite",
       }}
     />
   </>
  )
}

export default ScanlineOverlay

/**
 * Optional variant: add a faint traveling highlight line to simulate a
 * raster scan sweeping down the screen, on top of the static scanlines.
 * This is a much busier effect than plain scanlines — try the static
 * version first and only reach for this if it still feels too flat once
 * you've got flicker + ghost + scanlines all stacked.
 *
 * const ScanlineOverlaySweeping: React.FC = () => (
 *   <>
 *     <style>{`
 *       @keyframes scan-sweep {
 *         0%   { background-position-y: 0; }
 *         100% { background-position-y: 100vh; }
 *       }
 *     `}</style>
 *     <div
 *       aria-hidden="true"
 *       className="pointer-events-none fixed inset-0 z-[9997]"
 *       style={{
 *         backgroundImage:
 *           "repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 2px), linear-gradient(to bottom, transparent, rgba(232,224,212,0.05) 50%, transparent)",
 *         backgroundSize: "100% 2px, 100% 6px",
 *         animation: "scan-sweep 6s linear infinite",
 *       }}
 *     />
 *   </>
 * )
 */