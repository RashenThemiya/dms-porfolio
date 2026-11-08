import { Building2, Crown, Rocket, Sprout } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { growthStages } from '../../data/solutions.js';

const icons = { seed: Sprout, rocket: Rocket, building: Building2, crown: Crown };

function GrowthPathSection() {
  return (
    <section className="bg-white py-20 lg:min-h-[600px] lg:py-24">
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Startups to Scaleups
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Pentarix is designed to grow with you. Choose the modules you need today
            <br className="hidden sm:block" /> and toggle on enterprise features as you scale.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {growthStages.map(({ icon, title, badge, text }) => {
            const Icon = icons[icon];
            return (
              <article
                key={title}
                tabIndex={0}
                className="group relative flex min-h-[225px] flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#f95708] hover:shadow-xl hover:shadow-slate-300/50 focus:-translate-y-1 focus:border-[#f95708] focus:outline-none focus:shadow-xl focus:shadow-slate-300/50"
              >
                <span className="pointer-events-none absolute -top-3 translate-y-1 rounded-full bg-[#f95708] px-4 py-1 text-[10px] font-extrabold tracking-[0.12em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                  {badge}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-orange-50 text-[#f95708] transition-all duration-300 group-hover:bg-[#f95708] group-hover:text-white group-focus:bg-[#f95708] group-focus:text-white">
                  <Icon className="h-7 w-7 fill-current transition-transform duration-300 group-hover:scale-110 group-focus:scale-110" />
                </span>
                <h3 className="mt-6 text-base font-extrabold text-slate-950">{title}</h3>
                <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-sm">{text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default GrowthPathSection;
