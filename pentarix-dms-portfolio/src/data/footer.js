import navigation from './navigation.js';
import { contactPhone } from './phone.js';

export const productLinks = [
  { label: 'Inventory', to: '/#feature-inventory' },
  { label: 'Sales Management', to: '/#feature-sales' },
  { label: 'Product Catalog', to: '/#feature-catalog' },
  { label: 'Dynamic Reports', to: '/#feature-reports' },
  { label: 'Multi-Store', to: '/#feature-multiStore' },
];

export const footerNavigation = navigation;

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
