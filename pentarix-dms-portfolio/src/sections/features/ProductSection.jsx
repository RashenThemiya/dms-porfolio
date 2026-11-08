import { Tags } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { productTools } from '../../data/features.js';
import { ProductPanel, ToolIcon } from './FeatureVisuals.jsx';
import { FeatureMark } from './components/FeatureMark.jsx';

function ProductSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:min-h-[675px] lg:py-[81px]">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-between lg:gap-8 xl:gap-12">
          <ProductPanel />
          <div>
            <FeatureMark>
              <Tags className="h-7 w-7" />
            </FeatureMark>
            <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Product Management
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-slate-500 sm:text-lg">
              Centralize your entire product catalog. Manage variants, pricing
              <br className="hidden lg:block" /> tiers, and rich media in one intuitive interface.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {productTools.map(({ icon, title, text }) => (
                <div
                  key={title}
                  className="min-h-[114px] rounded-xl border border-slate-200 bg-white p-4"
                >
                  <ToolIcon name={icon} />
                  <h3 className="mt-2 text-sm font-extrabold">{title}</h3>
                  <p className="mt-1 text-xs leading-4 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductSection;
