export const inventoryItems = [
  {
    name: 'Premium Widget A',
    sku: 'SKU: WID-001',
    status: '1,240 in Stock',
    note: '4 Locations',
    color: 'text-emerald-500',
  },
  {
    name: 'Industrial Gear Set',
    sku: 'SKU: GEA-772',
    status: '12 Low Stock',
    note: 'Main Warehouse',
    color: 'text-orange-500',
  },
  {
    name: 'Electronic Sensor V2',
    sku: 'SKU: SEN-909',
    status: 'Out of Stock',
    note: 'Pending Reorder',
    color: 'text-slate-500',
  },
];

export const productTools = [
  {
    icon: 'settings',
    title: 'Variant Groups',
    text: 'Manage size, color, and technical variants effortlessly.',
  },
  {
    icon: 'price',
    title: 'Dynamic Pricing',
    text: 'Set wholesale, retail, and promotional prices per region.',
  },
  {
    icon: 'media',
    title: 'Digital Asset Hub',
    text: 'Store and sync high-res images and manuals.',
  },
  {
    icon: 'barcode',
    title: 'Barcode Engine',
    text: 'Generate and print custom QR codes and barcodes.',
  },
];

export const reportTools = [
  {
    title: 'Automated Forecasts',
    text: 'Predict demand using historical sales and seasonal trends.',
  },
  {
    title: 'Profitability Audit',
    text: 'Detailed breakdown of margins by SKU, category, and location.',
  },
  {
    title: 'Custom Dashboards',
    text: 'Drag-and-drop builder to create the views your team needs.',
  },
  {
    title: 'Export Everything',
    text: 'One-click export to Excel, CSV, or direct API data streams.',
  },
];

export const supportingFeatures = [
  {
    icon: 'users',
    title: 'Roles & Access',
    text: 'Granular permissions. Control exactly who sees what, from the warehouse floor to the C-suite.',
    color: 'blue',
  },
  {
    icon: 'bell',
    title: 'Smart Notifications',
    text: 'Never miss a beat. Real-time SMS, Email, and Push alerts for critical inventory or sales events.',
    color: 'orange',
  },
  {
    icon: 'api',
    title: 'API & Extensibility',
    text: 'Connect with your favorite tools. Robust REST API for ERP, Accounting, and CRM integrations.',
    color: 'violet',
  },
];

const features = { inventoryItems, productTools, reportTools, supportingFeatures };

export default features;
