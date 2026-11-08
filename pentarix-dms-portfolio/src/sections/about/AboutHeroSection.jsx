import Container from '../../components/ui/Container.jsx';

function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
      {/* Decorative ambient subtle gradient */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-orange-400/5 via-amber-300/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fcd7bf] bg-[#ffeadc] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#ea580c] shadow-sm shadow-orange-500/5">
            OUR STORY &amp; PHILOSOPHY
          </span>

          <h1 className="mt-7 text-3xl font-extrabold leading-[1.16] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[54px] xl:text-[58px]">
            Flexible. Scalable.
            <span className="mt-2 block text-[#ea580c] sm:whitespace-nowrap">
              Built around{' '}
              <span className="relative inline-block">
                <span
                  className="pointer-events-none absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 h-[20px] w-[62px] sm:h-[26px] sm:w-[80px] lg:h-[30px] lg:w-[92px] rounded-[50%] bg-[#e5e7eb]"
                  aria-hidden="true"
                />
                <span className="relative z-10">your</span>
              </span>{' '}
              business.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            We believe that software should adapt to the way you work, not the other way around.
            Pentarix DMS was born from the need to solve complex distribution challenges with
            intuitive, enterprise-grade technology.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutHeroSection;
