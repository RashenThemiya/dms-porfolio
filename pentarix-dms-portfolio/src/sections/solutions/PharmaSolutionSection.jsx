import CallLink from '../../components/ui/CallLink.jsx';

import Container from '../../components/ui/Container.jsx';
import { pharmaSolution } from '../../data/solutions.js';

function PharmaSolutionSection() {
  const { title, image, imageAlt, challenge, solution, alerts } = pharmaSolution;
  return (
    <section className="flex min-h-[700px] items-center bg-slate-50 py-20 lg:py-24">
      <Container className="!max-w-[1280px] lg:!px-6 2xl:!max-w-[1760px]">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:justify-start lg:gap-10 xl:gap-20 2xl:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-7">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#f95708]">
                THE CHALLENGE
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{challenge}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-slate-950">
                OUR SOLUTION
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{solution}</p>
            </div>
            <div className="mt-8 space-y-3">
              {alerts.map(({ color, label, status }) => (
                <div
                  key={label}
                  className="flex min-h-[54px] items-center justify-between gap-4 rounded-[18px] border border-slate-200 bg-white px-4"
                >
                  <span className="flex items-center gap-3 text-sm font-extrabold text-slate-950">
                    <i
                      className={`h-2 w-2 rounded-full ${color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
                    />
                    {label}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{status}</span>
                </div>
              ))}
            </div>
            <CallLink className="mt-10 inline-flex h-14 min-w-[220px] items-center justify-center rounded-xl border-2 border-slate-950 px-8 text-base font-bold text-slate-950 transition hover:bg-slate-950 hover:text-white">
              Specialty Solutions
            </CallLink>
          </div>
          <div className="h-[500px] overflow-hidden rounded-[28px] bg-white 2xl:h-[600px]">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PharmaSolutionSection;
