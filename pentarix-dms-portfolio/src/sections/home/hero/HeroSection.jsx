import CallLink from '../../../components/ui/CallLink.jsx';
import { heroFacts, initialNetwork } from '../../../data/home/hero.js';
import useFrameMessage from '../../../hooks/useFrameMessage.js';
import { useCallback, useRef, useState } from 'react';

import { Check, Pause, Play } from 'lucide-react';
import Container from '../../../components/ui/Container.jsx';

function HeroSection() {
  const frameRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [network, setNetwork] = useState(initialNetwork);

  const receiveCounts = useCallback(({ branches, routes, reps, lorries }) => {
    if ([branches, routes, reps, lorries].every((value) => Number.isInteger(value) && value >= 0)) {
      setNetwork({ branches, routes, reps, lorries });
    }
  }, []);
  useFrameMessage(frameRef, 'pentarix-network-counts', receiveCounts);

  function toggleAnimation() {
    const nextPaused = !paused;
    setPaused(nextPaused);
    frameRef.current?.contentWindow?.postMessage(
      { type: 'pentarix-route-pause', paused: nextPaused },
      window.location.origin,
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-dms-bg py-16 text-dms-text sm:py-20 lg:pt-28 lg:pb-16">
      <iframe
        ref={frameRef}
        src="/animations/network/index.html"
        title="Illustrative 3D distribution network with branches, sales reps and delivery lorries"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={() =>
          frameRef.current?.contentWindow?.postMessage(
            { type: 'pentarix-route-pause', paused },
            window.location.origin,
          )
        }
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full border-0"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,17,32,.88),rgba(11,17,32,.65)_60%,rgba(11,17,32,.9))] lg:bg-[linear-gradient(90deg,rgba(11,17,32,.96)_0%,rgba(11,17,32,.85)_32%,rgba(11,17,32,.25)_65%,transparent_85%),linear-gradient(0deg,rgba(11,17,32,.9),transparent_35%)]"
        aria-hidden="true"
      />
      <Container className="!max-w-[1480px]">
        <div className="flex min-h-0 flex-col justify-between gap-8 sm:min-h-[520px] sm:gap-12 lg:min-h-[540px] lg:flex-row lg:items-end lg:gap-8">
          <div className="min-w-0 max-w-[640px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-dms-accent">
              {'Distribution Management System'}
            </p>
            <h1 className="mt-5 max-w-2xl text-[34px] sm:mt-6 font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-5xl xl:text-[62px]">
              {'Every shop on the route.'}{' '}
              <span className="text-dms-accent">{'Every case accounted for.'}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] sm:mt-7 leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {
                'Pentarix DMS runs the whole distribution business in one place: suppliers and stock, sales reps on daily routes, shop orders, delivery runs and returns. Built for multi-branch FMCG distributors.'
              }
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallLink className="inline-flex min-h-11 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-slate-600 bg-dms-bg/95 px-5 py-2.5 text-sm font-bold leading-5 text-white transition-colors hover:border-slate-400 sm:min-h-12 sm:bg-transparent sm:px-6 sm:py-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400">
                {'Request a Demo'}
              </CallLink>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {heroFacts.map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-dms-bg/65 px-3 py-2 text-xs font-semibold backdrop-blur-sm"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full min-w-0 lg:w-auto lg:max-w-[440px]">
            <div
              className="rounded-2xl border border-white/10 bg-dms-bg/75 p-3 backdrop-blur-md sm:p-5"
              aria-label="Example distribution network shown in the background"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Live network view
              </span>
              <dl className="mt-3 grid grid-cols-4 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-x-7 sm:gap-y-5 lg:grid-cols-2 xl:grid-cols-4">
                {[
                  [network.branches, 'Branches'],
                  [network.routes, 'Routes'],
                  [network.reps, 'Reps on route'],
                  [network.lorries, 'Lorries out'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dd className="text-xl font-extrabold tabular-nums sm:text-2xl">{value}</dd>
                    <dt className="mt-1 text-[10px] leading-4 text-slate-400 sm:whitespace-nowrap sm:text-xs">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>{'Illustrative route preview'}</span>
              <button
                type="button"
                onClick={toggleAnimation}
                aria-pressed={paused}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 py-2 text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-orange-400"
              >
                {paused ? (
                  <Play className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Pause className="h-3 w-3" aria-hidden="true" />
                )}
                {paused ? 'Resume animation' : 'Pause animation'}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
