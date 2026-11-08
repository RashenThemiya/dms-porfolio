import { asset } from '../../utils/asset.js';
export const screens = [
  {
    name: 'Routes',
    image: asset('/images/screens/screen-1.webp'),
    title: 'Distribution planning',
    text: 'View shop coverage, stops and map previews for each route in your branch.',
  },
  {
    name: 'Items',
    image: asset('/images/screens/screen-3.webp'),
    title: 'Your product catalog',
    text: 'Find products by name, SKU or barcode, with category, brand and status filters.',
  },
  {
    name: 'Branches',
    image: asset('/images/screens/screen-2.webp'),
    title: 'Branch management',
    text: 'Manage depots within each company, with branch-specific contact details, currency and timezone.',
  },
  {
    name: 'Live Tracking',
    image: asset('/images/screens/live-tracking.webp'),
    title: 'Live rep & delivery tracking',
    text: 'Follow field-team routes on the map, check the latest reported GPS position and monitor shop visits, orders and route progress.',
  },
];
