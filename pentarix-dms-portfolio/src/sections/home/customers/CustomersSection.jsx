import { customer, customerStats } from '../../../data/home/customers.js';
import Container from '../../../components/ui/Container.jsx';
import CustomerRoutePreview from './CustomerRoutePreview.jsx';

export default function CustomersSection() {
  return (
    <section
      id="customers"
      className="border-y border-dms-line/60 bg-dms-bg py-16 text-dms-text sm:py-20 lg:py-24"
    >
      <Container className="!max-w-[1480px]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-dms-accent">
          Happy customers
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-dms-text sm:text-4xl lg:text-[42px]">
          Running daily distribution with Pentarix DMS
        </h2>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <article className="min-w-0 rounded-3xl border border-dms-border bg-dms-panel p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 font-extrabold text-dms-accent"
                aria-hidden="true"
              >
                {customer.initials}
              </span>
              <div>
                <h3 className="text-xl font-bold text-dms-text">{customer.name}</h3>
                <p className="mt-1 text-sm text-dms-muted">
                  Distribution operations powered by Pentarix DMS
                </p>
              </div>
            </div>
            <dl className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {customerStats.map(([value, label]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-dms-border bg-dms-bg/60 p-4"
                >
                  <dd className="text-3xl font-extrabold tabular-nums text-dms-accent">{value}</dd>
                  <dt className="mt-2 text-sm text-dms-muted">{label}</dt>
                </div>
              ))}
            </dl>
            <p className="max-w-3xl text-base leading-7 text-dms-secondary">
              {customer.name} manages {customer.routes} routes, {customer.shops} shops and{' '}
              {customer.items} items from {customer.branches} branch, with {customer.reps} sales rep
              and {customer.deliveryPersons} delivery person using Pentarix DMS.
            </p>
          </article>
          <CustomerRoutePreview />
        </div>
      </Container>
    </section>
  );
}
