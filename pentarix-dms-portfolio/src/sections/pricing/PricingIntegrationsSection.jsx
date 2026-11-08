import { Check, Database, Link2, PieChart, Smartphone } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { integrationFeatures } from '../../data/pricing.js';

const iconMap = {
  database: Database,
  link: Link2,
  smartphone: Smartphone,
};

function PricingIntegrationsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container className="!max-w-[1240px] lg:!px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & 3 Feature Cards */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
              Integration that feels invisible.
            </h2>

            <div className="mt-9 space-y-4">
              {integrationFeatures.map(({ icon, title, description }) => {
                const Icon = iconMap[icon] || Database;
                return (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-[22px] border border-slate-100/90 bg-[#f9fafb] p-6 transition-all duration-200 hover:bg-slate-50/80 hover:shadow-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white text-[#ea580c] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual UI Window Mockup */}
          <div className="relative mx-auto w-full max-w-[540px] lg:col-span-6 lg:max-w-none">
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60">
              {/* Background decorative faint dashed circle */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full border-2 border-dashed border-slate-100"
                aria-hidden="true"
              />

              {/* Window dots */}
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              {/* Window interior layout */}
              <div className="mt-6 grid grid-cols-12 gap-5">
                {/* Left sub-column */}
                <div className="col-span-7 space-y-3.5">
                  <div className="h-3.5 w-20 rounded-full bg-slate-100" />
                  <div className="h-24 rounded-2xl border border-orange-100/60 bg-[#fff8f0]" />
                  <div className="pt-1">
                    <div className="h-3.5 w-20 rounded-full bg-slate-100" />
                    <div className="mt-3.5 h-32 rounded-2xl border border-slate-100 bg-[#f8fafc]" />
                  </div>
                </div>

                {/* Right sub-column */}
                <div className="col-span-5 space-y-3.5">
                  <div className="h-10 w-full rounded-2xl bg-[#111827]" />
                  <div className="h-10 w-full rounded-2xl bg-[#ea580c]" />
                  <div className="mt-3.5 flex h-36 items-center justify-center rounded-2xl border border-slate-100 bg-[#f8fafc]">
                    <PieChart className="h-16 w-16 stroke-[1.5] text-slate-200/90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating 'Data Migrated Successfully' Toast */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-5 z-10 flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white px-5 py-3.5 shadow-xl shadow-slate-900/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Check className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-slate-900">Data Migrated Successfully</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PricingIntegrationsSection;
