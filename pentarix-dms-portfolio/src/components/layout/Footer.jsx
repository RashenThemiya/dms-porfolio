import { asset } from '../../utils/asset.js';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactDetails, footerNavigation, productLinks, socialLinks } from '../../data/footer.js';
import Container from '../ui/Container.jsx';

const contactIcons = { phone: Phone, location: MapPin };

function SocialIcon({ name }) {
  const paths = {
    facebook: <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" />,
    linkedin: (
      <path d="M5.2 7.7A2.2 2.2 0 1 0 5.2 3.3a2.2 2.2 0 0 0 0 4.4ZM3.4 9h3.7v11.6H3.4V9Zm6 0H13v1.6h.1c.5-.9 1.7-2 3.5-2 3.8 0 4.5 2.5 4.5 5.7v6.3h-3.7V15c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.7H9.4V9Z" />
    ),
    instagram: (
      <path
        fillRule="evenodd"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.3-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
        clipRule="evenodd"
      />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex w-fit items-center gap-2 text-xl font-extrabold tracking-[-0.035em] text-white"
      aria-label="Pentarix DMS home"
    >
      <img src={asset('/logo/pentarix-logo.svg')} alt="" className="h-9 w-auto" aria-hidden="true" />
      <span>
        PENTARIX <span className="text-orange-500">DMS</span>
      </span>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-16 text-slate-400 lg:pt-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.15fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-6 sm:text-base sm:leading-7">
              The next generation distribution management system for ambitious enterprise
              businesses.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ label, icon, href }) => {
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-orange-500"
                  >
                    <SocialIcon name={icon} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Product</h2>
            <ul className="mt-6 space-y-4">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors hover:text-orange-500 sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Quick Navigation</h2>
            <ul className="mt-6 space-y-4">
              {footerNavigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors hover:text-orange-500 sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Contact</h2>
            <ul className="mt-6 space-y-5 text-sm sm:text-base">
              {contactDetails.map((item) => {
                const Icon = contactIcons[item.type];
                const content = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                    <span>{item.label}</span>
                  </>
                );
                return (
                  <li key={item.type}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-4 transition-colors hover:text-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-slate-800 pt-8 text-[11px] tracking-[0.16em] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>© 2026 PENTARIX DMS. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH PRECISION FOR MODERN COMMERCE.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
