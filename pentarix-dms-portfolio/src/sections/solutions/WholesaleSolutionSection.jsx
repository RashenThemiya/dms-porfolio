import CallLink from '../../components/ui/CallLink.jsx';
import { FileText, Layers3 } from 'lucide-react';

import Container from '../../components/ui/Container.jsx';
import { wholesaleCapabilities, wholesaleSolution } from '../../data/solutions.js';

const icons = { pricing: Layers3, invoice: FileText };

function WholesaleSolutionSection() {
  const { title, image, imageAlt, challenge, solution } = wholesaleSolution;

  return (
    <section className="flex min-h-[736px] items-center bg-[#111827] py-20 text-white lg:py-28">
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-start lg:gap-10 xl:gap-20 2xl:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">{title}</h2>
            <div className="mt-7">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#f95708]">
                THE CHALLENGE
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">{challenge}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-white">OUR SOLUTION</h3>
              <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">{solution}</p>
            </div>
            <div className="mt-8 space-y-4">
              {wholesaleCapabilities.map(({ icon, title: capabilityTitle, text }) => {
                const Icon = icons[icon];
                return (
                  <div
                    key={capabilityTitle}
                    className="flex min-h-[81px] items-center gap-4 rounded-[18px] border border-slate-700 bg-[#1d2533] px-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#43251f] text-[#f95708]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <strong className="block text-base">{capabilityTitle}</strong>
                      <span className="mt-0.5 block text-xs text-slate-400 sm:text-sm">{text}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <CallLink className="mt-10 inline-flex h-14 min-w-[240px] items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-slate-100">
              Wholesale Solutions
            </CallLink>
          </div>
          <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-slate-900 2xl:h-[600px]">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/15" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WholesaleSolutionSection;
