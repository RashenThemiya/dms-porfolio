import { ChevronDown } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';

function SolutionsHeroSection() {
  return (
    <section className="relative flex min-h-[570px] items-center overflow-hidden bg-[#f8fafc] py-20 lg:min-h-[603px] lg:py-0">
      <div
        className="absolute left-[72%] top-[44%] h-[76px] w-[90px] rounded-[50%] bg-orange-500/10 blur-sm"
        aria-hidden="true"
      />
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <div className="max-w-[820px]">
          <span className="inline-flex rounded-full bg-[#ffeadc] px-4 py-1.5 text-xs font-extrabold tracking-[0.08em] text-[#f95708]">
            TAILORED FOR YOUR INDUSTRY
          </span>
          <h1 className="mt-7 text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[62px]">
            Management built around
            <br className="hidden sm:block" />{' '}
            <span className="text-[#f95708]">your business.</span>
          </h1>
          <p className="mt-8 max-w-[790px] text-base leading-7 text-slate-600 sm:text-xl sm:leading-8">
            Pentarix DMS isn&apos;t a one-size-fits-all tool. Our platform is engineered to be
            highly adaptable, mapping perfectly to your unique operational models, terminology, and
            growth stages.
          </p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              href="#retail"
              className="inline-flex h-14 min-w-[216px] items-center justify-center gap-3 rounded-[18px] bg-slate-950 px-7 text-base font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Explore Sectors <ChevronDown className="h-5 w-5" />
            </a>
            <p className="text-sm font-medium leading-5 text-slate-500 sm:text-base">
              Trusted by 500+ businesses
              <br /> globally
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SolutionsHeroSection;
