import { contactPhone } from './phone.js';

export const contactHero = {
  badge: {
    icon: 'sparkles',
    label: 'REQUEST A DEMO & CONTACT SALES',
  },
  title: 'Experience Pentarix DMS',
  titleHighlight: 'in Action.',
  description:
    'Call 075 135 2570 to arrange a personalized walkthrough of Pentarix DMS for your business.',
  trustMetrics: [
    {
      icon: 'timer',
      title: 'Call Us Directly',
      description: 'Direct specialist support',
    },
    {
      icon: 'sparkles',
      title: '1-on-1 Walkthrough',
      description: 'Tailored to your sector',
    },
    {
      icon: 'shield-check',
      title: 'Enterprise Privacy',
      description: '100% confidential discussion',
    },
  ],
};

export const contactDirectChannels = {
  badge: 'DIRECT COMMUNICATION',
  title: 'Prefer to reach out directly?',
  description: 'Call 075 135 2570 for technical questions, demo arrangements and pricing.',
  channels: [
    {
      id: 'phone',
      icon: 'phone',
      title: 'Phone Consultation',
      description: 'Direct hotline for immediate sales assistance and queries.',
      links: [{ ...contactPhone, isPrimary: true }],
    },
    {
      id: 'location',
      icon: 'map-pin',
      title: 'Headquarters',
      description: 'Pentarix Labs enterprise development & support hub.',
      address: 'Kalutara North, Kalutara',
      country: 'Sri Lanka',
    },
  ],
};

export const contactFaqs = {
  badge: 'FREQUENTLY ASKED QUESTIONS',
  title: 'Demo & Consultation Questions',
  items: [
    {
      question: 'How long does the personalized demo take?',
      answer:
        'Typically 25 to 35 minutes. We customize the session around your specific industry (retail, wholesale, or specialty distribution) so you only see features directly relevant to your workflows.',
    },
    {
      question: 'Can we test Pentarix with our own products and pricing rules?',
      answer:
        'Yes! Following the initial demo, our solutions team can import a sample subset of your catalog, stores, and custom price matrices into a dedicated sandbox environment.',
    },
    {
      question: 'Does Pentarix support offline sales and existing hardware?',
      answer:
        'Absolutely. Registers and POS terminals maintain complete billing functionality during Internet disruptions and sync automatically when connectivity returns. Standard barcode scanners, receipt printers, and cash drawers are supported out of the box.',
    },
    {
      question: 'What is the implementation timeline?',
      answer:
        'Single-store and standard retail setups can go live within 2 to 4 days. Multi-location distribution networks with existing ERP data migration typically take between 1 to 2 weeks with our guided deployment specialists.',
    },
  ],
};

const contact = {
  hero: contactHero,
  channels: contactDirectChannels,
  faqs: contactFaqs,
};

export default contact;
