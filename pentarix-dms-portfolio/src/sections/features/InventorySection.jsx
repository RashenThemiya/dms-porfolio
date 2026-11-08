import { Check, Network } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { InventoryPanel } from './FeatureVisuals.jsx';
import { FeatureMark } from './components/FeatureMark.jsx';

function InventorySection() {
  const benefits = [
    'Real-time stock synchronization across branches',
    'Batch & Expiry tracking for sensitive goods',
    'Automated stock adjustment and auditing logs',
    'Intelligent low-stock threshold alerts',
  ];
  return (
    <section id="inventory" className="bg-white py-20 sm:py-24 lg:min-h-[640px] lg:py-[95px]">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-between lg:gap-8 xl:gap-12">
          <div>
            <FeatureMark>
              <Network className="h-7 w-7" />
            </FeatureMark>
            <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Inventory Management
            </h2>
            <p className="mt-6 max-w-[520px] text-base leading-7 text-slate-500 sm:text-lg sm:leading-7">
              Take control of your stock with real-time visibility across all storage
              <br className="hidden lg:block" /> locations. Never lose track of a single SKU again.
            </p>
            <ul className="mt-8 space-y-[18px]">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-base font-medium text-slate-700"
                >
                  <Check className="h-4 w-4 stroke-[2.5] text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <InventoryPanel />
        </div>
      </Container>
    </section>
  );
}

export default InventorySection;
