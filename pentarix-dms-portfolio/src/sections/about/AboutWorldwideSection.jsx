import Container from '../../components/ui/Container.jsx';
import { worldwideData } from '../../data/about.js';

function AboutWorldwideSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[40px]">
            {worldwideData.title}
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{worldwideData.description}</p>
        </div>

        {/* Global Map Display */}
        <div className="mt-12 overflow-hidden rounded-[26px] border border-slate-900/10 bg-[#060a14] p-2 shadow-2xl shadow-slate-950/20 sm:p-3 lg:p-4">
          <div className="relative overflow-hidden rounded-[20px]">
            <img
              src={worldwideData.image}
              alt={worldwideData.imageAlt}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
            {/* Subtle atmospheric gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutWorldwideSection;
