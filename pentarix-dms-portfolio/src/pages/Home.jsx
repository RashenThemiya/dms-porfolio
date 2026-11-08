import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import FeaturesSection from '../sections/home/features/FeaturesSection.jsx';
import HeroSection from '../sections/home/hero/HeroSection.jsx';
import WhyDmsSection from '../sections/home/why-dms/WhyDmsSection.jsx';
import HowItWorksSection from '../sections/home/how-it-works/HowItWorksSection.jsx';
import ScreensSection from '../sections/home/screens/ScreensSection.jsx';
import CustomersSection from '../sections/home/customers/CustomersSection.jsx';
import PricingSection from '../sections/home/pricing/PricingSection.jsx';
import ProblemFixBanner from '../sections/home/problem-fix/ProblemFixBanner.jsx';

function Home() {
  return (
    <>
      <main>
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProblemFixBanner />
        </ScrollReveal>
        <ScrollReveal>
          <WhyDmsSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal>
          <ScreensSection />
        </ScrollReveal>
        <ScrollReveal>
          <CustomersSection />
        </ScrollReveal>
        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default Home;
