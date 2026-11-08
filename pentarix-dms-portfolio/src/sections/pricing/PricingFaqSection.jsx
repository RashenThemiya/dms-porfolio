import { useState } from 'react';
import Container from '../../components/ui/Container.jsx';
import { pricingFaqs } from '../../data/pricing.js';

function PricingFaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="pricing-faq-heading">
      <Container className="!max-w-[1240px] lg:!px-6">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="pricing-faq-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[40px]"
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {pricingFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-200"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 sm:px-7 sm:py-6 text-left text-base font-bold text-slate-900 sm:text-lg"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`shrink-0 text-2xl font-light text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-45 text-[#ea580c]' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div className={`faq-answer-grid ${isOpen ? 'faq-answer-open' : ''}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600 sm:px-7 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default PricingFaqSection;
