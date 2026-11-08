import { Hammer, Puzzle, Share2, TrendingUp } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { companyValues } from '../../data/about.js';

const iconMap = {
  puzzle: Puzzle,
  'trending-up': TrendingUp,
  share: Share2,
  hammer: Hammer,
};

function AboutValuesSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1d] py-20 sm:py-24 lg:py-28">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px]"
        aria-hidden="true"
      />

      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[40px]">
            Values that drive us.
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            The four pillars of the Pentarix philosophy.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map(({ icon, title, description }) => {
            const Icon = iconMap[icon] || Puzzle;
            return (
              <div
                key={title}
                className="group relative flex flex-col justify-start rounded-[26px] border border-slate-800/80 bg-[#131b2e] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-[#162038] hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#34221c] text-[#ea580c] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight text-white">{title}</h3>

                <p className="mt-3.5 text-sm leading-relaxed text-slate-400">{description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default AboutValuesSection;
