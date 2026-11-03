import React, { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/**
 * Branded intro / loading screen.
 *
 * Concept: a four-colour print run. The iKASLÉ logo is "printed" as four
 * separate CMYK plates that start out of register and slide into perfect
 * alignment (screen-blended, so they resolve to white), then a gold-foil sheen
 * sweeps across, the sparkle stamps in and the tagline draws on. When the
 * page is genuinely ready the whole sheet wipes upward to reveal the site.
 */

const MIN_DURATION = 2600; // minimum time the loader stays up (ms)
const MAX_DURATION = 9000; // safety net – never trap the visitor (ms)
const FONT_TIMEOUT = 1500; // don't wait forever for web fonts (ms)
const EXIT_DELAY = 450; // pause on "100%" before the wipe (ms)
const EXIT_DURATION = 1000; // must match the CSS transition on .ik-loader (ms)

const STATUS_STEPS = [
  { below: 25, label: 'Mixing the inks' },
  { below: 50, label: 'Aligning the plates' },
  { below: 78, label: 'Registering colours' },
  { below: 100, label: 'Pressing your pages' },
  { below: Infinity, label: 'Fresh off the press' },
];

type Phase = 'loading' | 'exiting' | 'done';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Corner registration mark, as seen on real press sheets. */
const RegMark: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => (
  <svg className={`ik-reg ik-reg-${position}`} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 1V43M1 22H43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [fontsReady, setFontsReady] = useState(false);
  const pageReadyRef = useRef(false);

  // 1. Track real readiness: web fonts + the window "load" event.
  useEffect(() => {
    let cancelled = false;

    const fontsLoaded =
      typeof document !== 'undefined' && document.fonts
        ? Promise.all([
            document.fonts.load("800 29px 'Outfit'"),
            document.fonts.load("700 12px 'Outfit'"),
          ]).catch(() => undefined)
        : Promise.resolve();

    Promise.race([fontsLoaded, new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT))]).then(() => {
      if (!cancelled) setFontsReady(true);
    });

    const onLoad = () => {
      pageReadyRef.current = true;
    };
    if (document.readyState === 'complete') {
      pageReadyRef.current = true;
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
    };
  }, []);

  // 2. Drive the progress bar. It eases towards 92% on a timer, and only
  //    reaches 100% once the page is genuinely ready.
  useEffect(() => {
    if (!fontsReady) return;

    const duration = prefersReducedMotion() ? 1200 : MIN_DURATION;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2.2);
      const canFinish = pageReadyRef.current || elapsed >= MAX_DURATION;
      const value = Math.min(eased * 100, canFinish ? 100 : 92);
      setProgress(Math.round(value));
      if (!(canFinish && t >= 1)) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fontsReady]);

  // 3. At 100% → hold a beat, wipe the sheet away, then unmount.
  useEffect(() => {
    if (progress < 100) return;
    const exitTimer = setTimeout(() => setPhase('exiting'), EXIT_DELAY);
    const doneTimer = setTimeout(() => setPhase('done'), EXIT_DELAY + EXIT_DURATION);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [progress]);

  // 4. Lock page scroll while the loader is on screen.
  const active = phase !== 'done';
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  if (phase === 'done') return null;

  const status = STATUS_STEPS.find((step) => progress < step.below)!.label;
  const className = ['ik-loader', fontsReady && 'is-play', phase === 'exiting' && 'is-exiting']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} role="status" aria-live="polite" aria-busy={phase === 'loading'}>
      <span className="ik-sr-only">Loading Ikasle PrintHub</span>

      {/* Background: aurora + drifting halftone + press registration marks */}
      <div className="ik-loader-bg" aria-hidden="true">
        <span className="ik-blob ik-blob-cyan" />
        <span className="ik-blob ik-blob-magenta" />
        <span className="ik-blob ik-blob-violet" />
        <span className="ik-blob ik-blob-yellow" />
        <span className="ik-halftone" />
      </div>
      <RegMark position="tl" />
      <RegMark position="tr" />
      <RegMark position="bl" />
      <RegMark position="br" />

      <div className="ik-loader-center">
        {/* Official iKASLÉ Print Hub Brand Logo */}
        <div className="ik-logo-stage" aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
          <span className="ik-logo-halo" />
          <img
            src="/assets/printhub.png"
            alt="iKASLÉ Print Hub"
            style={{
              width: '240px',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 0 18px rgba(255, 240, 0, 0.4))',
            }}
          />
        </div>

        {/* Progress meter */}
        <div className="ik-meter" aria-hidden="true">
          <div className="ik-track">
            <div className="ik-fill" style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }} />
            <span className="ik-head" style={{ left: `${progress}%` }} />
          </div>
          <div className="ik-meta">
            <span className="ik-cmyk">
              <i className="c" />
              <i className="m" />
              <i className="y" />
              <i className="k" />
            </span>
            <span key={status} className="ik-status">
              {status}
            </span>
            <span className="ik-percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
