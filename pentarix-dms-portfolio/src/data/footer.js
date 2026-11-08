import { contactPhone } from './phone.js';

export const productLinks = [
  { label: 'Inventory Management', to: '/features#inventory' },
  { label: 'Sales & POS', to: '/features' },
  { label: 'Multi-Store Sync', to: '/features' },
  { label: 'Reporting & BI', to: '/features' },
  { label: 'Integrations', to: '/features' },
];

export const footerNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About Us', to: '/about' },
];

export const socialLinks = [
  {
    label: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/share/1LeiaEmjHG/?mibextid=wwXIfr',
  },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/pentarixlabs/' },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/pentarix_labs?stkn=NmRjZzdycGZxZHB6',
  },
];

export const contactDetails = [
  { type: 'phone', ...contactPhone },
  { type: 'location', label: 'Kalutara North, Kalutara, Sri Lanka' },
];
