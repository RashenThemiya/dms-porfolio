import { useEffect, useState } from 'react';
import { pricingOffer } from '../../../data/pricing.js';

function getOfferTimeLeft(now) {
  const seconds = Math.max(0, Math.floor((Date.parse(pricingOffer.endsAt) - now) / 1000));
  return {
    expired: seconds === 0,
    values: [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60],
  };
}

export default function OfferCountdown() {
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    const update = () => setRemaining(getOfferTimeLeft(Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-md rounded-2xl border border-orange-500/35 bg-orange-500/10 p-4 sm:p-5">
      <p className="text-sm font-bold text-orange-400">{remaining?.expired ? '11.11 Sale has ended' : '11.11 Sale ends in'}</p>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Time remaining in the 11.11 Sale" aria-live="off">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
          <div key={label} className="min-w-0 rounded-xl border border-dms-border bg-dms-bg px-1 py-3">
            <span className="block text-2xl font-extrabold tabular-nums text-white sm:text-3xl">{remaining ? String(remaining.values[index]).padStart(2, '0') : '--'}</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-dms-secondary sm:text-xs">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-dms-secondary">Ends {pricingOffer.validUntil}, 11:59 PM (Sri Lanka)</p>
    </div>
  );
}
