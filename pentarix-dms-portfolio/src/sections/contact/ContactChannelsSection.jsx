import { Mail, MapPin, Phone } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { contactDirectChannels } from '../../data/contact.js';

const channelIconMap = {
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin,
};

function ContactChannelsSection() {
  const { badge, title, description, channels } = contactDirectChannels;

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200/80">
      <Container className="!max-w-[1280px] lg:!px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
            {badge}
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {channels.map((channel) => {
            const Icon = channelIconMap[channel.icon] || Mail;
            return (
              <div
                key={channel.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ea580c]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-950">{channel.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{channel.description}</p>

                {channel.links && (
                  <div className="mt-4 space-y-1">
                    {channel.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={
                          link.isPrimary
                            ? 'block text-sm font-semibold text-orange-600 hover:underline'
                            : 'block text-xs font-medium text-slate-600 hover:text-slate-900'
                        }
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {channel.address && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-800">{channel.address}</p>
                    {channel.country && <p className="text-xs text-slate-500">{channel.country}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ContactChannelsSection;
