import { asset } from '../../../utils/asset.js';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { customer } from '../../../data/home/customers.js';

export default function CustomerRoutePreview() {
  const frameRef = useRef(null);
  const [paused, setPaused] = useState(false);

  function initialize() {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'pentarix-customer-profile', customer },
      window.location.origin,
    );
    frameRef.current?.contentWindow?.postMessage(
      { type: 'pentarix-customer-pause', paused },
      window.location.origin,
    );
  }

  function togglePlayback() {
    const nextPaused = !paused;
    setPaused(nextPaused);
    frameRef.current?.contentWindow?.postMessage(
      { type: 'pentarix-customer-pause', paused: nextPaused },
      window.location.origin,
    );
  }

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-3xl border border-dms-border bg-dms-bg shadow-xl shadow-black/20">
        <iframe
          ref={frameRef}
          src={asset('/animations/customer-route/index.html')}
          title={`${customer.name} illustrative network of 12 routes from one branch`}
          onLoad={initialize}
          className="block aspect-[5/4.2] w-full border-0 max-[420px]:aspect-[4/5]"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-dms-muted">
        <p>Illustrative route view · Totals across all routes</p>
        <button
          type="button"
          onClick={togglePlayback}
          aria-pressed={paused}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
  );
}
