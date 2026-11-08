import { asset } from '../../utils/asset.js';
import CallLink from '../../components/ui/CallLink.jsx';
import { ArrowRight, Check } from 'lucide-react';

import Container from '../../components/ui/Container.jsx';
import { distributionSolutions } from '../../data/solutions.js';

const icons = {
  route: asset('/icons/route-optimization.svg'),
  warehouse: asset('/icons/wms-advanced.svg'),
  forecast: asset('/icons/demand-forecasting.svg'),
};

function DistributionNetworksSection() {
  return (
    <section className="bg-white py-20 lg:min-h-[700px] lg:py-24">
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
          Distribution Networks
        </h2>
        <p className="mt-4 max-w-[560px] text-base leading-7 text-slate-600 sm:text-lg">
          Control the flow from manufacturer to consumer with high-precision supply chain
          visibility.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {distributionSolutions.map(({ icon, title, text, points }) => {
            const iconSrc = icons[icon];
            return (
              <article
                key={title}
                className="relative flex min-h-[335px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-8"
              >
                <span
                  className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/70"
                  aria-hidden="true"
                />
                <img
                  src={iconSrc}
                  alt=""
                  className="relative h-[30px] w-auto self-start"
                  aria-hidden="true"
                />
                <h3 className="relative mt-2 text-xl font-extrabold text-slate-950">{title}</h3>
                <p className="relative mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                  {text}
                </p>
                <ul className="relative mt-6 space-y-2">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-xs text-slate-600 sm:text-sm"
                    >
                      <Check className="h-4 w-4 text-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                <CallLink className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#f95708]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </CallLink>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default DistributionNetworksSection;
