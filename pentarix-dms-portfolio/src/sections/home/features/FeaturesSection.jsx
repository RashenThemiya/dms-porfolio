import ModuleIcon from '../../../components/icons/ModuleIcon.jsx';
import { modules } from '../../../data/home/features.js';
import Container from '../../../components/ui/Container.jsx';

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-dms-line/60 bg-dms-bg py-16 text-dms-text sm:py-20 lg:py-24"
      aria-labelledby="core-features-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,15,0.05),transparent_55%)]"
        aria-hidden="true"
      />
      <Container className="relative !max-w-[1480px]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-dms-accent">Features</p>
          <h2
            id="core-features-heading"
            className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-dms-text sm:text-4xl lg:text-[42px]"
          >
            Core Power for Modern Distribution.
          </h2>
          <p className="mt-4 text-base leading-7 text-dms-muted sm:text-lg">
            Comprehensive modules designed for every department.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
          {modules.map((module) => (
            <article
              key={module.title}
              id={`feature-${module.icon}`}
              className="group min-w-0 rounded-2xl border border-dms-border bg-dms-panel p-4 sm:p-5 transition-colors duration-200 hover:border-orange-500/40 hover:bg-[#152036] motion-reduce:transition-none"
            >
              <div className="flex items-center gap-3">
                <ModuleIcon name={module.icon} />
                <h3 className="min-w-0 text-base font-bold text-dms-text">{module.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-dms-muted">{module.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturesSection;
