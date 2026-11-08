import { ChartNoAxesCombined } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { reportTools } from '../../data/features.js';
import { ReportsPanel } from './FeatureVisuals.jsx';
import { FeatureMark } from './components/FeatureMark.jsx';

function ReportsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:min-h-[691px] lg:py-[95px]">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-between lg:gap-8 xl:gap-12">
          <div>
            <FeatureMark>
              <ChartNoAxesCombined className="h-7 w-7" />
            </FeatureMark>
            <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Reports &amp; Analytics
            </h2>
            <p className="mt-6 max-w-[550px] text-base leading-7 text-slate-500 sm:text-lg">
              Turn data into decisions. Our advanced BI engine delivers
              <br className="hidden lg:block" /> actionable insights on every facet of your business
              operations.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-8">
              {reportTools.map(({ title, text }) => (
                <div key={title}>
                  <h3 className="text-base font-extrabold">{title}</h3>
                  <p className="mt-2 max-w-[245px] text-sm leading-5 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <ReportsPanel />
        </div>
      </Container>
    </section>
  );
}

export default ReportsSection;
