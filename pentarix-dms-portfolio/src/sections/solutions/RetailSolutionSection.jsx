import CallLink from '../../components/ui/CallLink.jsx';
import { ArrowRight, CreditCard, RefreshCw, Smartphone, Zap } from 'lucide-react';

import Container from '../../components/ui/Container.jsx';
import { retailCapabilities, retailSolution } from '../../data/solutions.js';

const icons = { zap: Zap, sync: RefreshCw, loyalty: CreditCard, mobile: Smartphone };

function RetailSolutionSection() {
  const { title, image, imageAlt, challenge, solution, testimonial } = retailSolution;

  return (
    <section id="retail" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-start lg:gap-10 xl:gap-20 2xl:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-slate-900 2xl:h-[600px]">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/20" aria-hidden="true" />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/70 to-transparent"
              aria-hidden="true"
            />
            <figure className="absolute bottom-10 left-10 right-10 rounded-[22px] border border-white/20 bg-slate-900/75 p-6 text-white shadow-2xl backdrop-blur-md">
              <blockquote className="text-lg font-semibold italic leading-7">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-700 text-xs font-extrabold">
                  {testimonial.initials}
                </span>
                <span>
                  <strong className="block text-sm">{testimonial.name}</strong>
                  <span className="text-xs text-slate-300">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-7">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#f95708]">
                THE CHALLENGE
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{challenge}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-slate-950">
                OUR SOLUTION
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{solution}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {retailCapabilities.map(({ icon, label }) => {
                const Icon = icons[icon];
                return (
                  <div
                    key={label}
                    className="flex h-[51px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[#f95708]" />
                    <span className="text-sm font-extrabold text-slate-950">{label}</span>
                  </div>
                );
              })}
            </div>
            <CallLink className="mt-10 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#f95708] text-base font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600">
              Retail Demo <ArrowRight className="h-5 w-5" />
            </CallLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RetailSolutionSection;
