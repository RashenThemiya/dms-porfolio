import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import PricingComparisonSection from '../sections/pricing/PricingComparisonSection.jsx';
import PricingCtaSection from '../sections/pricing/PricingCtaSection.jsx';
import PricingFaqSection from '../sections/pricing/PricingFaqSection.jsx';
import PricingHeroSection from '../sections/pricing/PricingHeroSection.jsx';
import PricingIntegrationsSection from '../sections/pricing/PricingIntegrationsSection.jsx';
import PricingProcessSection from '../sections/pricing/PricingProcessSection.jsx';

function Pricing() {
  return (
    <>
      <main>
        <ScrollReveal>
          <PricingHeroSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingComparisonSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingProcessSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingIntegrationsSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingFaqSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingCtaSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default Pricing;
