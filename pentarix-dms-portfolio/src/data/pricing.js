export const pricingTiers = [
  {
    id: 'basic',
    name: 'Basic',
    badge: null,
    description: 'For small teams',
    price: 'Rs. 150,000',
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    isPopular: false,
    isDark: false,
    features: [
      '1 Branch',
      '2 Sales Reps',
      '2 Delivery Persons',
      'Unlimited Shops',
      'Unlimited Routes',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    badge: 'RECOMMENDED',
    description: 'For growing operations',
    price: 'Rs. 395,000',
    buttonText: 'Contact Sales',
    buttonVariant: 'primary',
    isPopular: true,
    isDark: false,
    features: [
      '6 Branches',
      '12 Sales Reps',
      '12 Delivery Persons',
      'Unlimited Shops',
      'Unlimited Routes',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: null,
    description: 'For large-scale operations',
    price: 'Rs. 1M',
    buttonText: 'Contact Sales',
    buttonVariant: 'enterprise',
    isPopular: false,
    isDark: true,
    features: [
      '30 Branches',
      '60 Sales Reps',
      '60 Delivery Persons',
      'Unlimited Shops',
      'Unlimited Routes',
    ],
  },
];

export const comparisonCategories = [
  {
    category: 'BRANCH & FIELD-TEAM LICENSES',
    features: [
      { name: 'Branches', basic: '1', professional: '6', enterprise: '30' },
      { name: 'Sales Reps', basic: '2', professional: '12', enterprise: '60' },
      { name: 'Delivery Persons', basic: '2', professional: '12', enterprise: '60' },
      { name: 'Shops', basic: 'Unlimited', professional: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Routes', basic: 'Unlimited', professional: 'Unlimited', enterprise: 'Unlimited' },
    ],
  },
];

export const additionalLicenses = [
  { name: 'Extra Branch', price: 'Rs. 40,000' },
  { name: 'Extra Sales Rep', price: 'Rs. 8,000' },
  { name: 'Extra Delivery Person', price: 'Rs. 8,000' },
];

export const commercialNotes = [
  'All plans include unlimited shops and routes; branch and user limits differ.',
  'Server / hosting costs are payable monthly and quoted separately.',
  'Taxes, integrations and custom features are quoted separately.',
  'Long-term maintenance is available on request at mutually agreed costs.',
  'User licenses may be reassigned when staff change (active-account limits apply).',
  'Proposed payment terms: 50% advance and 50% at agreed acceptance.',
];

export const onboardingSteps = [
  {
    step: '01',
    title: 'Understand',
    description:
      'We understand your business, workflows and operational requirements through a deep-dive audit.',
  },
  {
    step: '02',
    title: 'Configure',
    description:
      'We configure the platform around your business structure, terminologies, and specific processes.',
  },
  {
    step: '03',
    title: 'Launch',
    description:
      'Your team gets a centralized platform designed for everyday operations with hands-on onboarding.',
  },
  {
    step: '04',
    title: 'Scale',
    description:
      'As your business grows, your system grows with it through continuous optimization and new features.',
  },
];

export const integrationFeatures = [
  {
    icon: 'database',
    title: 'Legacy Data Migration',
    description: 'We import your historical stock and customer data safely from your old systems.',
  },
  {
    icon: 'link',
    title: 'Hardware Connectivity',
    description: 'Connect barcode scanners, label printers, and POS registers in minutes.',
  },
  {
    icon: 'smartphone',
    title: 'Staff Enablement',
    description: 'Simple, modern interfaces that warehouse staff and store managers love to use.',
  },
];

export const pricingFaqs = [
  {
    question: 'What costs are separate from the license price?',
    answer:
      'Plans use one-time license pricing. Server / hosting costs are payable monthly and quoted separately. Taxes, integrations and custom features are also quoted separately. Proposed prices are subject to final commercial agreement.',
  },
  {
    question: 'Can I switch plans as my business grows?',
    answer:
      'Additional licenses are available for Rs. 40,000 per branch, Rs. 8,000 per sales rep and Rs. 8,000 per delivery person as one-time add-on charges. For tailored branch and field-team limits, request a custom quote. User licenses may be reassigned when staff change, subject to active-account limits.',
  },
  {
    question: 'How long does it take to migrate from an old DMS?',
    answer:
      'Most standard migrations take between 2 to 7 business days depending on data volume and hygiene. Our technical team handles full data mapping and import of products, SKUs, barcode lists, customer accounts, and opening stock balances.',
  },
  {
    question: 'Do you offer on-site training for staff?',
    answer:
      'Yes, we provide both interactive remote webinars and dedicated on-site training sessions for cashiers, warehouse teams, route dispatchers, and finance managers to ensure 100% operational confidence before go-live.',
  },
  {
    question: 'Is my data backed up and secure?',
    answer:
      'Absolutely. Pentarix DMS uses enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit, with automated daily multi-region backups and 99.99% infrastructure uptime monitoring.',
  },
];

const pricing = {
  pricingTiers,
  comparisonCategories,
  additionalLicenses,
  commercialNotes,
  onboardingSteps,
  integrationFeatures,
  pricingFaqs,
};

export default pricing;
