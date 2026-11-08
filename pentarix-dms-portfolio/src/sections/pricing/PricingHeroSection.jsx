import CallLink from '../../components/ui/CallLink.jsx';

import PricingPlanCard from './components/PricingPlanCard.jsx';
import Container from '../../components/ui/Container.jsx';
import { pricingTiers, additionalLicenses, commercialNotes } from '../../data/pricing.js';

function PricingHeroSection({ as: Heading = 'h1' }) {
  return (
    <section className="relative overflow-hidden bg-dms-bg py-16 text-dms-text sm:py-20 lg:py-24">
      {/* Ambient background decoration */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[760px] rounded-full bg-gradient-to-tr from-orange-400/5 via-amber-300/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative !max-w-[1480px]">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-dms-accent shadow-sm shadow-orange-500/5">
            {'TRANSPARENT PRICING'}
          </span>

          <Heading className="mt-6 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-dms-text sm:text-4xl lg:text-[42px]">
            {'Flexible plans for your business.'}
          </Heading>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-dms-secondary sm:text-lg sm:leading-8">
            {
              'One-time license pricing for growing distribution businesses. Choose the right plan by branch count and field-team users.'
            }
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <PricingPlanCard key={tier.id} tier={tier} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-dms-border bg-dms-panel p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-dms-text">{'Custom Plan'}</h2>
            <p className="mt-2 text-dms-secondary">
              {'Tailored branches, sales reps and delivery team.'}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-300">
              {'Unlimited Shops • Unlimited Routes'}
            </p>
            <p className="mt-2 text-sm text-dms-muted">
              {'Pricing based on your business requirements.'}
            </p>
          </div>
          <CallLink className="shrink-0 rounded-xl bg-dms-accent px-6 py-3.5 text-center text-sm font-bold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">
            {'Request a Quote'}
          </CallLink>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-dms-text">{'Additional Licenses'}</h2>
          <p className="mt-2 text-sm text-dms-muted">{'One-time add-on charges'}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {additionalLicenses.map((license) => (
              <div
                key={license.name}
                className="rounded-2xl border border-dms-border bg-dms-panel p-6"
              >
                <h3 className="text-sm font-semibold text-dms-secondary">{license.name}</h3>
                <p className="mt-2 text-2xl font-extrabold text-dms-text">{license.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-dms-border bg-dms-panel p-6 sm:p-8">
          <h2 className="text-lg font-bold text-dms-text">{'Commercial Notes'}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-dms-secondary">
            {commercialNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-semibold text-slate-300">
            {'Proposed prices — subject to final commercial agreement.'}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default PricingHeroSection;
