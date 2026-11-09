import useFrameMessage from '../../../hooks/useFrameMessage.js';
import { useCallback, useRef, useState } from 'react';
import Container from '../../../components/ui/Container.jsx';

export default function HowItWorksSection() {
  const frameRef = useRef(null);
  const [height, setHeight] = useState(640);

  const resize = useCallback(({ height: nextHeight }) => {
    if (Number.isFinite(nextHeight) && nextHeight > 0 && nextHeight < 3000)
      setHeight(Math.ceil(nextHeight));
  }, []);
  useFrameMessage(frameRef, 'pentarix-story-height', resize);

  return (
    <section id="how-it-works" className="bg-dms-bg py-16 text-white sm:py-20">
      <Container className="!max-w-[1480px]">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-[42px]">
            From the rep&apos;s bike
            <br />
            to the shop&apos;s shelf
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Follow one order through every step in Pentarix DMS.
          </p>
        </div>
        <iframe
          ref={frameRef}
          src="/animations/order-story/index.html"
          title="Animated order journey: sales rep, phone order, office processing, loading and delivery"
          className="mt-9 block w-full border-0"
          style={{ height }}
          onLoad={() => {
            const contentHeight = frameRef.current?.contentDocument?.body.scrollHeight;
            if (contentHeight) setHeight(contentHeight);
          }}
        />
      </Container>
    </section>
  );
}
