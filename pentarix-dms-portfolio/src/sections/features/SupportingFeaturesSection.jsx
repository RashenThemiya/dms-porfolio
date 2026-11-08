import { Bell, Cpu, UserShield } from 'lucide-react';
import Container from '../../components/ui/Container.jsx';
import { supportingFeatures } from '../../data/features.js';

const icons = { users: UserShield, bell: Bell, api: Cpu };
const colors = {
  blue: 'bg-blue-50 text-blue-500',
  orange: 'bg-orange-50 text-orange-500',
  violet: 'bg-violet-50 text-violet-500',
};

function SupportingFeaturesSection() {
  return (
    <section className="bg-slate-50 py-20 lg:min-h-[500px] lg:py-24">
      <Container className="max-w-[1280px] lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {supportingFeatures.map(({ icon, title, text, color }) => {
            const Icon = icons[icon];
            return (
              <article
                key={title}
                className="flex min-h-[244px] flex-col items-center justify-center rounded-[20px] border border-slate-200 bg-white px-8 py-8 text-center"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${colors[color]}`}
                >
                  <Icon
                    className={`h-7 w-7 ${icon === 'bell' ? 'fill-current' : ''}`}
                    strokeWidth="2.25"
                  />
                </span>
                <h2 className="mt-6 text-[21px] font-extrabold text-slate-950">{title}</h2>
                <p className="mt-4 max-w-[330px] text-[15px] leading-6 text-slate-500">{text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default SupportingFeaturesSection;
