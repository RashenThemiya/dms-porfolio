export const customer = {
  name: 'Thilina Distributors',
  initials: 'TD',
  branches: 1,
  routes: 12,
  shops: 865,
  items: 247,
  reps: 1,
  deliveryPersons: 1,
};

export const customerStats = [
  [String(customer.branches), 'Branch'],
  [String(customer.routes), 'Routes'],
  [String(customer.shops), 'Shops'],
  [String(customer.items), 'Items'],
  [String(customer.reps), 'Sales Rep'],
  [String(customer.deliveryPersons), 'Delivery Person'],
];
