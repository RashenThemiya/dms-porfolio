import Container from '../../components/ui/Container.jsx';
import { companyStats, missionVision } from '../../data/about.js';

function AboutMissionSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image Column with Badge */}
          <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-slate-100 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={companyStats.image}
                alt={companyStats.imageAlt}
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[490px]"
                loading="lazy"
              />
            </div>

            {/* 10+ Years of Supply Chain Expertise Badge */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 flex h-40 w-40 sm:h-44 sm:w-44 flex-col items-center justify-center rounded-[28px] bg-[#ea580c] p-4 text-center text-white shadow-xl shadow-orange-500/25">
              <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {companyStats.experienceYears}
              </span>
              <span className="mt-1 text-xs font-semibold leading-tight text-white/95 sm:text-sm whitespace-pre-line">
                {companyStats.experienceLabel}
              </span>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="flex flex-col justify-center space-y-10 lg:col-span-6 lg:pl-8">
            {/* Mission */}
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-[3px] w-8 rounded-full bg-[#ea580c]" />
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  {missionVision.mission.title}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                {missionVision.mission.description}
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-[3px] w-8 rounded-full bg-[#ea580c]" />
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  {missionVision.vision.title}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                {missionVision.vision.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutMissionSection;
