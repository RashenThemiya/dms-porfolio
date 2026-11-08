import { comparisons } from '../../../data/home/problems.js';
import { Check, X } from 'lucide-react';
import Container from '../../../components/ui/Container.jsx';

function WhyDmsSection() {
  return (
    <section
      id="why"
      className="bg-dms-bg py-16 text-dms-text sm:py-20 lg:py-24"
      aria-labelledby="problem-solution-heading"
    >
      <Container className="!max-w-[1480px]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-dms-accent">
            {'Why you need a DMS'}
          </p>
          <h2
            id="problem-solution-heading"
            className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[44px]"
          >
            {'Notebooks and spreadsheets stop working once you have more than one route'}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            {
              'These are the problems distributors tell us about most, and what changes with Pentarix DMS.'
            }
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map(({ before, after }) => (
            <article
              key={before}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-dms-line bg-dms-panel p-6"
            >
              <p className="flex items-start gap-3 text-[15px] leading-6 text-slate-400">
                <span
                  className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400"
                  aria-hidden="true"
                >
                  <X className="h-3 w-3 stroke-[3]" />
                </span>
                <span className="line-through decoration-rose-500/60">{before}</span>
              </p>
              <p className="flex items-start gap-3 text-[15px] font-medium leading-6 text-dms-text">
                <span
                  className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>{after}</span>
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyDmsSection;
