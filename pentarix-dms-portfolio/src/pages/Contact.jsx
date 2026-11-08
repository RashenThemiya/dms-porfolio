import ScrollReveal from '../components/ui/ScrollReveal.jsx';
import ContactHeroSection from '../sections/contact/ContactHeroSection.jsx';
import CallContactSection from '../sections/contact/CallContactSection.jsx';
import ContactChannelsSection from '../sections/contact/ContactChannelsSection.jsx';
import ContactFaqSection from '../sections/contact/ContactFaqSection.jsx';

function Contact() {
  return (
    <>
      <main>
        <ScrollReveal>
          <ContactHeroSection />
        </ScrollReveal>

        <ScrollReveal>
          <CallContactSection />
        </ScrollReveal>

        <ScrollReveal>
          <ContactChannelsSection />
        </ScrollReveal>

        <ScrollReveal>
          <ContactFaqSection />
        </ScrollReveal>
      </main>
    </>
  );
}

export default Contact;
