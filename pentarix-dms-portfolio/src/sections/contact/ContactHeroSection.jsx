import { ShieldCheck, Sparkles, Timer } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { contactHero } from '../../data/contact.js';

const metricIconMap = {
  timer: Timer,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
};

function ContactHeroSection() {
  const { badge, title, titleHighlight, description, trustMetrics } = contactHero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#111827] to-[#0f172a] pt-16 pb-20 text-white sm:pt-20 sm:pb-24">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 top-1/3 h-48 w-48 rounded-full bg-orange-600/10 blur-2xl"
        aria-hidden="true"
      />

      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-orange-400 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {badge.label}
            </span>
          )}

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] text-white sm:text-5xl lg:text-[54px]">
            {title} {titleHighlight && <span className="text-orange-500">{titleHighlight}</span>}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8">
            {description}
          </p>

          {/* Quick trust metrics */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {trustMetrics.map(({ icon, title: metricTitle, description: metricDesc }) => {
              const Icon = metricIconMap[icon] || Sparkles;
              return (
                <div
                  key={metricTitle}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-orange-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">{metricTitle}</p>
                    <p className="text-[11px] text-slate-400">{metricDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactHeroSection;
