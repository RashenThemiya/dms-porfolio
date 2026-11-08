import { FileText, Zap } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { PosPanel } from './FeatureVisuals.jsx';
import { FeatureMark, RegisterIcon } from './components/FeatureMark.jsx';

function SalesSection() {
  const points = [
    [
      Zap,
      'Multi-Channel Fulfillment',
      'Route orders to the nearest branch automatically for faster delivery.',
    ],
    [
      FileText,
      'Flexible Invoicing',
      'Generate GST-compliant invoices and custom tax reports instantly.',
    ],
  ];
  return (
    <section className="bg-white py-20 sm:py-24 lg:min-h-[670px] lg:py-[96px]">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-between lg:gap-8 xl:gap-12">
          <div>
            <FeatureMark>
              <RegisterIcon />
            </FeatureMark>
            <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Sales &amp; POS
            </h2>
            <p className="mt-6 max-w-[550px] text-base leading-7 text-slate-500 sm:text-lg">
              Unified sales stream for retail, wholesale, and e-commerce.
              <br className="hidden lg:block" /> Process transactions faster and with greater
              accuracy.
            </p>
            <div className="mt-12 space-y-10">
              {points.map(([Icon, title, text]) => (
                <div key={title} className="flex gap-4">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                  <div>
                    <h3 className="text-base font-extrabold">{title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PosPanel />
        </div>
      </Container>
    </section>
  );
}

export default SalesSection;
