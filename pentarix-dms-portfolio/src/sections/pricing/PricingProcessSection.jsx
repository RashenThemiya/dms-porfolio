import Container from '../../components/ui/Container.jsx';
import { onboardingSteps } from '../../data/pricing.js';

function PricingProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c1222] py-20 sm:py-24 lg:py-28">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-orange-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ea580c]">
            DEPLOYMENT JOURNEY
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">
            From setup to daily operations.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Implementation shouldn&apos;t be painful. We&apos;ve refined a four-step process to
            ensure your distribution management system is configured for success.
          </p>
        </div>

        {/* 4 Connected Steps */}
        <div className="relative mt-16 lg:mt-24">
          {/* Solid clean horizontal connecting line across desktop */}
          <div
            className="hidden lg:block absolute top-7 left-16 right-16 h-[2px] bg-white/80"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {onboardingSteps.map(({ step, title, description }) => (
              <div key={step} className="group relative flex flex-col items-center text-center">
                {/* Solid Orange Glowing Circle Badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#ea580c] text-base font-extrabold text-white shadow-[0_0_24px_rgba(234,88,12,0.6)] transition-transform duration-300 group-hover:scale-110">
                  {step}
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight text-white">{title}</h3>

                <p className="mt-3.5 text-sm leading-relaxed text-slate-400 max-w-[260px] mx-auto">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PricingProcessSection;
