import CallLink from '../ui/CallLink.jsx';
import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import navigation from '../../data/navigation.js';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState('why');

  useEffect(() => {
    if (pathname !== '/') return undefined;
    let frame = 0;
    const update = () => {
      let current = navigation[0].id;
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 150) current = item.id;
      }
      setActiveSection(current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const close = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [isOpen]);

  const isCurrent = (item) => pathname === '/' && activeSection === item.id;
  const navLinkClasses = (item) =>
    `inline-flex min-h-11 items-center rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 ${isCurrent(item) ? 'text-slate-100' : 'text-dms-muted'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-dms-bg/95 shadow-sm shadow-slate-950/10 backdrop-blur-sm transition-shadow duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-[-0.035em] text-white max-[380px]:text-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Pentarix DMS home"
          >
            <img src="/logo/pentarix-logo.svg" alt="" className="h-8 w-auto" aria-hidden="true" />
            <span>
              PENTARIX <span className="text-orange-500">DMS</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={navLinkClasses(item)}
                aria-current={isCurrent(item) ? 'location' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:block">
            <Button as={CallLink} className="rounded-xl px-6 py-2.5 shadow-lg shadow-orange-950/20">
              Request a Demo
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border shrink-0 border-slate-700 text-slate-200 hover:bg-slate-800 xl:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={`h-0.5 bg-current transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-0.5 bg-current transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>

        {isOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-menu-enter max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-t border-slate-800 py-3 sm:max-h-[calc(100dvh-80px)] xl:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className={navLinkClasses(item)}
                  aria-current={isCurrent(item) ? 'location' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button as={CallLink} className="mt-3 w-full" onClick={() => setIsOpen(false)}>
                Request a Demo
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}

export default Navbar;
