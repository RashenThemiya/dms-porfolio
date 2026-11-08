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
      {/* Popular badge docked in top right corner */}
      {tier.badge && (
        <div className="absolute -top-[2px] -right-[2px]">
          <span className="inline-flex items-center rounded-bl-xl rounded-tr-[26px] bg-dms-accent px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-sm">
            {tier.badge}
          </span>
        </div>
      )}

      <div>
        <h3
          className={`text-2xl font-extrabold tracking-tight ${
            tier.isDark ? 'text-white' : 'text-dms-text'
          }`}
        >
          {tier.name}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            tier.isDark ? 'text-slate-400' : 'text-dms-muted'
          }`}
        >
          {tier.description}
        </p>

        <div className="mt-8 mb-8">
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
