import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import DistributionNetworksSection from '../sections/solutions/DistributionNetworksSection.jsx';
import CustomBusinessSection from '../sections/solutions/CustomBusinessSection.jsx';
import GrowthPathSection from '../sections/solutions/GrowthPathSection.jsx';
import PharmaSolutionSection from '../sections/solutions/PharmaSolutionSection.jsx';
import RequirementsCtaSection from '../sections/solutions/RequirementsCtaSection.jsx';
import RetailSolutionSection from '../sections/solutions/RetailSolutionSection.jsx';
import SolutionsHeroSection from '../sections/solutions/SolutionsHeroSection.jsx';
import WholesaleSolutionSection from '../sections/solutions/WholesaleSolutionSection.jsx';

function Solutions() {
  return (
    <>
      <main>
        <ScrollReveal>
          <SolutionsHeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <RetailSolutionSection />
        </ScrollReveal>
        <ScrollReveal>
          <WholesaleSolutionSection />
        </ScrollReveal>
        <ScrollReveal>
          <DistributionNetworksSection />
        </ScrollReveal>
        <ScrollReveal>
          <PharmaSolutionSection />
        </ScrollReveal>
        <ScrollReveal>
          <GrowthPathSection />
        </ScrollReveal>
        <ScrollReveal>
          <CustomBusinessSection />
        </ScrollReveal>
        <ScrollReveal>
          <RequirementsCtaSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default Solutions;
