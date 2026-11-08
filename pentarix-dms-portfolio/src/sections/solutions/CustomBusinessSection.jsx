import CallLink from '../../components/ui/CallLink.jsx';
import { Puzzle } from 'lucide-react';

import Container from '../../components/ui/Container.jsx';

function CustomBusinessSection() {
  return (
    <section className="flex min-h-[340px] items-center bg-[#111827] py-14 text-white">
      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="relative grid min-h-[230px] overflow-hidden rounded-[24px] border border-slate-700 bg-[linear-gradient(105deg,#40251f_0%,#211e27_48%,#111827_100%)] px-7 py-10 sm:px-12 lg:grid-cols-[1fr_280px] lg:items-center lg:px-12">
          <div className="relative z-10 max-w-[650px]">
            <h2 className="text-2xl font-extrabold tracking-[-0.025em] sm:text-3xl">
              Don&apos;t see your business?
            </h2>
            <p className="mt-5 max-w-[620px] text-sm leading-6 text-slate-300 sm:text-base">
              Every business has its own rhythm. If our standard modules don&apos;t fit your
              <br className="hidden lg:block" /> unique workflow, our solutions team will build a
              configuration that does.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallLink className="inline-flex h-12 min-w-[145px] items-center justify-center rounded-lg bg-[#f95708] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600">
                Let&apos;s Build It
              </CallLink>
              <CallLink className="inline-flex h-12 min-w-[174px] items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                Talk to an Architect
              </CallLink>
            </div>
          </div>
          <div className="relative mx-auto mt-10 hidden h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-slate-600/60 lg:mt-0 lg:flex">
            <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#f95708] text-white shadow-lg shadow-orange-950/30">
              <Puzzle className="h-6 w-6 fill-current" />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CustomBusinessSection;
