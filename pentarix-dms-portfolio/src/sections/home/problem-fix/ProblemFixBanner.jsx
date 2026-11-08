import { slides } from '../../../data/home/banner.js';
import useCarousel from '../../../hooks/useCarousel.js';
import { ArrowRight, Check, X } from 'lucide-react';
import Container from '../../../components/ui/Container.jsx';
import './ProblemFixBanner.css';

function ProblemFixBanner() {
  const languages = Object.keys(slides);
  const { ref, selected, revision, select, stopped, visible, pageVisible, interactionProps } =
    useCarousel({ count: languages.length, interval: 10000 });
  const selectedLanguage = languages[selected];

  return (
    <section
      ref={ref}
      className="bg-dms-bg pt-2 pb-8 text-white sm:pb-12"
      aria-label="DMS solutions / DMS විසඳුම්"
      aria-roledescription="carousel"
    >
      <Container className="!max-w-[1480px]">
        <div
          className={`dms-promo ${!visible || !pageVisible ? 'dms-promo-paused' : ''}`}
          {...interactionProps}
        >
          <div className="dms-promo-slides" aria-live={stopped ? 'polite' : 'off'}>
            {Object.entries(slides).map(([language, slide]) => (
              <article
                key={`${language}-${revision}`}
                lang={language}
                className={`dms-promo-slide ${language === selectedLanguage ? 'is-active' : ''}`}
                aria-hidden={language !== selectedLanguage}
              >
                <div className="dms-promo-shine" aria-hidden="true" />
                <h2 className="dms-promo-heading">
                  {slide.heading.before}
                  <em>{slide.heading.accent}</em>
                  {slide.heading.after}
                </h2>
                <p className="dms-promo-subtitle">
                  {slide.subtitle.before}
                  <strong>{slide.subtitle.accent}</strong>
                  {slide.subtitle.after}
                </p>
                <div className="dms-promo-grid">
                  <div className="dms-promo-label text-rose-400">{slide.problemLabel}</div>
                  <div className="dms-promo-spacer" aria-hidden="true" />
                  <div className="dms-promo-label text-emerald-400">{slide.fixLabel}</div>
                  {slide.fixes.map(([problem, fix], index) => (
                    <div key={problem} className="dms-promo-row" style={{ '--row': index }}>
                      <p className="dms-promo-problem">
                        <span className="dms-promo-icon" aria-hidden="true">
                          <X />
                        </span>
                        <span>
                          <span className="sr-only">{slide.problemLabel}: </span>
                          {problem}
                        </span>
                      </p>
                      <span className="dms-promo-arrow" aria-hidden="true">
                        <ArrowRight />
                      </span>
                      <p className="dms-promo-fix">
                        <span className="dms-promo-icon" aria-hidden="true">
                          <Check />
                        </span>
                        <span>
                          <span className="sr-only">{slide.fixLabel}: </span>
                          {fix}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="dms-promo-closing">
                  {slide.closing.before}
                  <em>{slide.closing.accent}</em>
                  {slide.closing.after}
                </p>
              </article>
            ))}
          </div>
          <div className="dms-promo-controls" aria-label="Banner controls / දැන්වීම් පාලන">
            {[
              ['si', 'සිංහල'],
              ['en', 'English'],
            ].map(([language, label]) => (
              <button
                key={language}
                type="button"
                lang={language}
                aria-pressed={language === selectedLanguage}
                onClick={() => select(languages.indexOf(language))}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProblemFixBanner;
