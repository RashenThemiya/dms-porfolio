import CallLink from '../../components/ui/CallLink.jsx';

import Button from '../../components/ui/Button.jsx';
import Container from '../../components/ui/Container.jsx';

function FeatureHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#111827] py-16 text-white sm:py-20 lg:min-h-[477px] lg:py-[67px]">
      <div
        className="absolute left-[45%] top-[40%] h-20 w-36 rounded-[50%] bg-orange-500/[0.09] blur-xl"
        aria-hidden="true"
      />
      <Container className="max-w-[1280px] lg:px-6">
        <div className="max-w-[830px]">
          <span className="inline-flex rounded bg-orange-500/15 px-3 py-1.5 text-[12px] font-extrabold tracking-[0.12em] text-orange-500">
            COMPREHENSIVE SUITE
          </span>
          <h1 className="mt-[28px] max-w-[820px] text-4xl font-extrabold leading-[1.18] tracking-[-0.025em] sm:text-5xl lg:text-[50px]">
            Powerful features for every part
            <br className="hidden sm:block" /> of your operation.
          </h1>
          <p className="mt-[28px] max-w-[800px] text-base leading-7 text-slate-300 sm:text-[20px] sm:leading-8">
            From inventory tracking to deep business analytics, Pentarix DMS provides a
            <br className="hidden lg:block" /> centralized ecosystem designed for enterprise-level
            distribution.
          </p>
          <div className="mt-[34px] flex flex-col gap-4 sm:flex-row">
            <Button as={CallLink} className="min-h-[58px] min-w-[179px] rounded-xl px-8 text-base">
              Start Free Trial
            </Button>
            <a
              href="#inventory"
              className="inline-flex min-h-[58px] min-w-[230px] items-center justify-center rounded-xl border border-[#4b5563] bg-[#252d3a] px-8 text-base font-bold text-white transition-colors hover:border-slate-500 hover:bg-[#303949] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              View Documentation
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeatureHeroSection;
