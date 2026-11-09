import OfferCountdown from './components/OfferCountdown.jsx';
import PricingExtras from './components/PricingExtras.jsx';

import PricingPlanCard from './components/PricingPlanCard.jsx';
import Container from '../../components/ui/Container.jsx';
import { pricingTiers, pricingOffer } from '../../data/pricing.js';

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
            {pricingOffer.label} — {pricingOffer.discountPercent}% OFF
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

        <OfferCountdown />

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <PricingPlanCard key={tier.id} tier={tier} />
          ))}
        </div>
        <PricingExtras />
      </Container>
    </section>
  );
}

export default PricingHeroSection;
