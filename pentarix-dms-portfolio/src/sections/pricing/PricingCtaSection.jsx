import CallLink from '../../components/ui/CallLink.jsx';

import Container from '../../components/ui/Container.jsx';

function PricingCtaSection() {
  return (
    <section
      className="bg-[#ea580c] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="pricing-cta-heading"
    >
      <Container className="!max-w-[1240px] lg:!px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="pricing-cta-heading"
            className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[50px]"
          >
            Ready to transform your
            <br className="hidden sm:block" /> distribution?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Talk to our product specialists and get a tailored configuration for your unique
            operational workflow.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CallLink className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-2xl bg-[#111827] px-8 text-sm font-bold text-white shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0c1220] active:translate-y-0">
              Request Your Demo
            </CallLink>
            <CallLink className="inline-flex min-h-[52px] min-w-[180px] items-center justify-center rounded-2xl bg-white px-8 text-sm font-bold text-slate-950 shadow-xl shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0">
              Contact Sales
            </CallLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PricingCtaSection;
