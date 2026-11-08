import { ArrowLeftRight, Store } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { BranchPanel } from './FeatureVisuals.jsx';
import { FeatureMark } from './components/FeatureMark.jsx';

function BranchSection() {
  const points = [
    [Store, 'Regional Hubs', 'Cluster stores by region for easier management.'],
    [
      ArrowLeftRight,
      'Inter-Branch Transfers',
      'Move stock between locations with digital waybills.',
    ],
  ];
  return (
    <section className="bg-[#111827] py-20 text-white sm:py-24 lg:min-h-[627px] lg:py-[94px]">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-between lg:gap-8 xl:gap-12">
          <BranchPanel />
          <div>
            <FeatureMark dark>
              <Store className="h-7 w-7" />
            </FeatureMark>
            <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Store &amp; Branch Control
            </h2>
            <p className="mt-6 max-w-[550px] text-base leading-7 text-slate-300 sm:text-lg sm:leading-7">
              Scale from one store to hundreds. Control every location from a
              <br className="hidden lg:block" /> single dashboard with location-specific settings
              and aggregate
              <br className="hidden lg:block" /> reporting.
            </p>
            <div className="mt-8 space-y-4">
              {points.map(([Icon, title, text]) => (
                <div
                  key={title}
                  className="flex h-[79px] items-center gap-4 rounded-xl border border-slate-700 bg-[#1e2635] px-4"
                >
                  <Icon className="h-6 w-6 shrink-0 text-orange-500" />
                  <div>
                    <h3 className="text-base font-extrabold">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BranchSection;
