import CallLink from '../../components/ui/CallLink.jsx';

import Container from '../../components/ui/Container.jsx';

function RequirementsCtaSection() {
  return (
    <section className="flex min-h-[320px] items-center bg-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Discuss Your Requirements
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-sm leading-6 text-slate-500 sm:text-base">
            Take the first step towards a unified, high-efficiency distribution system. Our experts
            are
            <br className="hidden sm:block" /> ready to map out your digital transformation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CallLink className="inline-flex h-14 min-w-[216px] items-center justify-center rounded-xl bg-[#f95708] px-8 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600">
              Request a Live Demo
            </CallLink>
            <CallLink className="inline-flex h-14 min-w-[174px] items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
              Contact Sales
            </CallLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RequirementsCtaSection;
