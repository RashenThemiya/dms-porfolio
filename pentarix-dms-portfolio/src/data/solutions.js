import { asset } from '../utils/asset.js';
export const retailCapabilities = [
  { icon: 'zap', label: 'Real-time POS' },
  { icon: 'sync', label: 'Omni-Sync' },
  { icon: 'loyalty', label: 'Loyalty Engine' },
  { icon: 'mobile', label: 'Mobile Ops' },
];

export const retailSolution = {
  title: 'Modern Retail Stores',
  image: asset('/images/solutions/modern-retail-store.png'),
  imageAlt: 'Interior of a modern fashion retail store',
  challenge:
    'Managing fast-moving consumer goods across storefronts and warehouses while keeping online stock accurate 24/7.',
  solution:
    'Omni-channel synchronization. Sell in-store and online from a single inventory pool with real-time POS integration.',
  testimonial: {
    quote:
      '“Pentarix unified our 12 stores and online shop overnight. Inventory sync is now flawless.”',
    name: 'Sarah Jenkins',
    role: 'COO, Urban Trends',
    initials: 'SJ',
  },
};

export const wholesaleCapabilities = [
  {
    icon: 'pricing',
    title: 'Tiered Pricing',
    text: 'Set unique prices for different customer segments automatically.',
  },
  {
    icon: 'invoice',
    title: 'Bulk Invoicing',
    text: 'Generate and send thousands of invoices with one click.',
  },
];

export const wholesaleSolution = {
  title: 'Wholesale & B2B',
  image: asset('/images/solutions/wholesale-b2b-warehouse.png'),
  imageAlt: 'Large wholesale distribution warehouse with stocked pallet racks',
  challenge:
    'Complex pricing tiers, bulk order fulfillment, and managing large accounts with specific credit terms.',
  solution:
    'Advanced B2B modules featuring custom price books, volume discounts, and automated credit limit enforcement.',
};

export const distributionSolutions = [
  {
    icon: 'route',
    title: 'Route Optimization',
    text: 'Map the most efficient delivery routes to reduce fuel costs and improve turnaround times.',
    points: ['GPS Tracking Integration', 'Driver Performance Logs', 'Real-time POD'],
  },
  {
    icon: 'warehouse',
    title: 'WMS Advanced',
    text: 'Bin management, zone picking, and wave release designed for massive storage facilities.',
    points: ['Cross-docking Support', 'FIFO/LIFO Logic', 'Multi-Unit Support'],
  },
  {
    icon: 'forecast',
    title: 'Demand Forecasting',
    text: 'AI-driven insights that help you stock the right amount of product before the rush starts.',
    points: ['Seasonal Analysis', 'Supplier Lead-Time Tracking', 'Margin Analysis'],
  },
];

export const pharmaSolution = {
  title: 'Pharma & Specialty Stores',
  image: asset('/images/solutions/pharma-specialty-store.png'),
  imageAlt: 'Climate-controlled pharmaceutical storage facility',
  challenge:
    'Strict compliance, expiration date management, and batch-level tracking for medical or perishable goods.',
  solution:
    'Compliance-first inventory logic. Automatic alerts for aging stock and complete traceability from producer to patient.',
  alerts: [
    { color: 'red', label: 'Expiration Alert: Batch #9921', status: 'EXPIRING IN 3 DAYS' },
    { color: 'blue', label: 'Cold Chain Log: Warehouse C', status: 'STABLE AT 4°C' },
  ],
};

export const growthStages = [
  {
    icon: 'seed',
    title: 'Seed Phase',
    badge: 'GETTING STARTED',
    text: 'Core inventory & simple POS. Get up and running in hours.',
  },
  {
    icon: 'rocket',
    title: 'Expansion',
    badge: 'GROWTH PATH',
    text: 'Multi-location sync, basic reporting, and staff management.',
  },
  {
    icon: 'building',
    title: 'Established',
    badge: 'SCALE READY',
    text: 'Advanced BI, API integrations, and custom workflow automation.',
  },
  {
    icon: 'crown',
    title: 'Enterprise',
    badge: 'ENTERPRISE READY',
    text: 'Global tax compliance, dedicated servers, and 24/7 priority support.',
  },
];
