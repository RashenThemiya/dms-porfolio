import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { contactFaqs } from '../../data/contact.js';

function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { badge, title, items } = contactFaqs;

  return (
    <section className="bg-white py-16 sm:py-20 border-t border-slate-100">
      <Container className="!max-w-[900px] lg:!px-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
            {badge}
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between text-left text-base font-bold text-slate-950 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ContactFaqSection;
