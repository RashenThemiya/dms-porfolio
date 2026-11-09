import { pricingOffer, getOriginalPrice, formatPlanPrice } from '../../../data/pricing.js';
import CallLink from '../../../components/ui/CallLink.jsx';

import { Check } from 'lucide-react';

export default function PricingPlanCard({ tier }) {
  return (
    <div
      className={`relative flex flex-col justify-between min-w-0 rounded-[24px] p-5 pt-9 sm:rounded-[28px] sm:p-8 transition-colors duration-200 motion-reduce:transition-none ${
        tier.isDark
          ? 'border border-dms-border bg-[#0e1729] text-white'
          : tier.isPopular
            ? 'border-2 border-dms-accent bg-[#172033] shadow-xl shadow-orange-950/15'
            : 'border border-dms-border bg-dms-panel'
      }`}
    >
      <div className="pointer-events-none absolute top-0 right-0 h-36 w-36 overflow-hidden rounded-tr-[24px] sm:rounded-tr-[28px]">
        <div className="absolute top-7 -right-12 w-52 rotate-45 bg-gradient-to-r from-orange-500 to-amber-400 py-2 text-center text-slate-950 shadow-lg shadow-orange-950/30">
          <span className="block text-[10px] font-extrabold uppercase tracking-widest">{pricingOffer.label}</span>
          <span className="block text-xl font-black leading-6">{pricingOffer.discountPercent}% OFF</span>
        </div>
      </div>

      <div>
        <h3
          className={`max-w-[calc(100%-64px)] text-xl sm:text-2xl font-extrabold tracking-tight ${
            tier.isDark ? 'text-white' : 'text-dms-text'
          }`}
        >
          {tier.name}
        </h3>
        <p
          className={`mt-2 max-w-[calc(100%-64px)] text-sm leading-relaxed ${
            tier.isDark ? 'text-slate-400' : 'text-dms-muted'
          }`}
        >
          {tier.description}
        </p>

        {tier.badge && <p className="mt-3 w-fit rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-orange-400">{tier.badge}</p>}
        <div className="mt-7 mb-8">
          <p className="mb-1 text-base text-dms-muted">
            <span className="sr-only">Original price: </span>
            <del className="decoration-slate-400">{formatPlanPrice(getOriginalPrice(tier.offerAmount))}</del>
          </p>
          <span className="sr-only">Offer price: </span>
          <span
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              tier.isDark ? 'text-white' : 'text-dms-text'
            }`}
          >
            {tier.price}
          </span>
          <p
            className={`mt-2 text-xs font-bold uppercase tracking-wider ${tier.isDark ? 'text-slate-400' : 'text-dms-muted'}`}
          >
            {'One-time license'}
          </p>
          <p className="mt-2 text-xs leading-5 text-dms-muted">Valid until {pricingOffer.validUntil}</p>
        </div>

        <div className="space-y-4">
          {tier.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dms-accent text-slate-950">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span className="text-sm font-medium text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-2">
        <CallLink
          className={`flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 ${
            tier.buttonVariant === 'primary'
              ? 'bg-dms-accent hover:bg-orange-400 text-slate-950'
              : tier.buttonVariant === 'enterprise'
                ? 'border border-orange-500/35 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
                : 'border border-[#35435e] bg-[#182338] text-dms-text hover:border-orange-500/50 hover:bg-[#202e46]'
          }`}
        >
          {tier.buttonText}
        </CallLink>
      </div>
    </div>
  );
}
