import CallLink from '../../components/ui/CallLink.jsx';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container.jsx';

function FeatureCtaSection() {
  return (
    <section className="flex min-h-[440px] items-center bg-[#f95708] py-16 text-white">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-[48px]">
            Ready to see it in action?
          </h2>
          <p className="mx-auto mt-7 max-w-[850px] text-lg leading-7 text-orange-100 sm:text-[20px] sm:leading-7">
            Get a personalized walkthrough of the platform and see how Pentarix can transform your
            <br className="hidden sm:block" /> distribution.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <CallLink className="inline-flex h-16 w-[260px] items-center justify-center rounded-[20px] bg-[#111827] text-base font-bold shadow-[0_18px_30px_-12px_rgba(17,24,39,0.45)] transition hover:bg-slate-800">
              Request a Live Demo
            </CallLink>
            <Link
              to="/pricing"
              className="inline-flex h-16 w-[242px] items-center justify-center rounded-[20px] bg-white text-base font-bold text-[#111827] shadow-[0_18px_30px_-12px_rgba(17,24,39,0.3)] transition hover:bg-slate-50"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeatureCtaSection;
