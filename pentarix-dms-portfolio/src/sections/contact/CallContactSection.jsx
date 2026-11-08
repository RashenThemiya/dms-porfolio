import { Phone } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import CallLink from '../../components/ui/CallLink.jsx';
import { contactPhone } from '../../data/phone.js';

export default function CallContactSection() {
  return (
    <section
      className="bg-dms-bg py-16 text-dms-text sm:py-20"
      aria-labelledby="call-contact-heading"
    >
      <Container>
        <div className="rounded-3xl border border-dms-border bg-dms-panel p-8 text-center sm:p-12">
          <Phone className="mx-auto h-9 w-9 text-dms-accent" aria-hidden="true" />
          <h2 id="call-contact-heading" className="mt-5 text-3xl font-extrabold">
            Let&apos;s talk about your business.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-dms-muted">
            Call us directly to arrange a demo, discuss pricing or ask about Pentarix DMS.
          </p>
          <CallLink className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-dms-accent px-7 py-4 text-lg font-bold text-slate-950 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {contactPhone.label}
          </CallLink>
        </div>
      </Container>
    </section>
  );
}
