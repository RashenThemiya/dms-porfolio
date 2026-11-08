import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import CallContactSection from '../sections/contact/CallContactSection.jsx';
import AboutHeroSection from '../sections/about/AboutHeroSection.jsx';
import AboutMissionSection from '../sections/about/AboutMissionSection.jsx';
import AboutValuesSection from '../sections/about/AboutValuesSection.jsx';
import AboutWorldwideSection from '../sections/about/AboutWorldwideSection.jsx';

function About() {
  return (
    <>
      <main>
        <ScrollReveal>
          <AboutHeroSection />
        </ScrollReveal>

        <ScrollReveal>
          <AboutMissionSection />
        </ScrollReveal>

        <ScrollReveal>
          <AboutValuesSection />
        </ScrollReveal>

        <ScrollReveal>
          <CallContactSection />
        </ScrollReveal>

        <ScrollReveal>
          <AboutWorldwideSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default About;
