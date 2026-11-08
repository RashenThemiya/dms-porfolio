import '../styles/features.css';
import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import FeatureCtaSection from '../sections/features/FeatureCtaSection.jsx';
import InventorySection from '../sections/features/InventorySection.jsx';
import ProductSection from '../sections/features/ProductSection.jsx';
import SalesSection from '../sections/features/SalesSection.jsx';
import BranchSection from '../sections/features/BranchSection.jsx';
import ReportsSection from '../sections/features/ReportsSection.jsx';
import FeatureHeroSection from '../sections/features/FeatureHeroSection.jsx';
import SupportingFeaturesSection from '../sections/features/SupportingFeaturesSection.jsx';

function Features() {
  return (
    <>
      <main className="features-page">
        <ScrollReveal>
          <FeatureHeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <InventorySection />
        </ScrollReveal>
        <ScrollReveal>
          <ProductSection />
        </ScrollReveal>
        <ScrollReveal>
          <SalesSection />
        </ScrollReveal>
        <ScrollReveal>
          <BranchSection />
        </ScrollReveal>
        <ScrollReveal>
          <ReportsSection />
        </ScrollReveal>
        <ScrollReveal>
          <SupportingFeaturesSection />
        </ScrollReveal>
        <ScrollReveal>
          <FeatureCtaSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default Features;
