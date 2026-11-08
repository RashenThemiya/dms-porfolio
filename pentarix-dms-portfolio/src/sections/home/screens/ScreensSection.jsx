import { screens } from '../../../data/home/screens.js';
import useCarousel from '../../../hooks/useCarousel.js';
import { Pause, Play } from 'lucide-react';
import Container from '../../../components/ui/Container.jsx';

export default function ScreensSection() {
  const { ref, selected, paused, setPaused, select, stopped, interactionProps } = useCarousel({
    count: screens.length,
    interval: 5000,
  });

  const screen = screens[selected];
  return (
    <section
      ref={ref}
      id="screens"
      className="bg-dms-bg py-16 text-dms-text sm:py-20 lg:py-24"
      aria-label="Product screenshots"
      aria-roledescription="carousel"
      {...interactionProps}
    >
      <Container className="!max-w-[1480px]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-dms-accent">
            Inside the product
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[42px]">
            Real screens from a live distributor
          </h2>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center gap-3"
          aria-label="Product screen selection"
        >
          {screens.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => select(index)}
              aria-pressed={selected === index}
              aria-controls="product-screen-preview"
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 motion-reduce:transition-none ${selected === index ? 'border-dms-accent bg-dms-accent text-slate-950' : 'border-dms-border bg-dms-panel text-dms-muted hover:border-orange-500/50 hover:text-white'}`}
            >
              {item.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-pressed={paused}
            aria-label={paused ? 'Resume screenshot slideshow' : 'Pause screenshot slideshow'}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dms-border px-4 py-2.5 text-sm font-semibold text-dms-muted hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:ml-auto"
          >
            {paused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>

        <div
          id="product-screen-preview"
          className="mt-6 overflow-hidden rounded-2xl border border-dms-border bg-dms-panel shadow-2xl shadow-black/20"
        >
          <div className="flex items-center gap-4 border-b border-dms-border px-4 py-3 sm:px-5">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#45516a]" />
              <span className="h-2 w-2 rounded-full bg-[#45516a]" />
              <span className="h-2 w-2 rounded-full bg-[#45516a]" />
            </div>
            <p className="min-w-0 truncate text-xs text-dms-muted">
              dms.pentarixlabs.com / <span className="text-slate-300">{screen.name}</span>
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden bg-[#060b18]">
            {screens.map((item, index) => (
              <img
                key={item.name}
                src={item.image}
                alt={selected === index ? `Pentarix DMS ${item.name.toLowerCase()} screen` : ''}
                aria-hidden={selected !== index}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 motion-reduce:transition-none ${selected === index ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <a
          href={screen.image}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-dms-accent underline underline-offset-4"
        >
          View full-size screenshot <span className="sr-only">(opens in a new tab)</span>
        </a>
        <div
          className="mt-7 grid gap-3 border-b border-dms-line pb-7 md:grid-cols-2 md:gap-10"
          aria-live={stopped ? 'polite' : 'off'}
          aria-atomic="true"
        >
          <h3 className="text-xl font-bold text-dms-text">{screen.title}</h3>
          <p className="text-sm leading-7 text-dms-muted">{screen.text}</p>
        </div>
      </Container>
    </section>
  );
}
