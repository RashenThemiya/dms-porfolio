import { useRef } from 'react';
import useInView from '../../hooks/useInView.js';

function ScrollReveal({ children, className = '' }) {
  const elementRef = useRef(null);
  const isVisible = useInView(elementRef, {
    threshold: 0.08,
    rootMargin: '0px 0px -6% 0px',
    once: true,
  });

  return (
    <div
      ref={elementRef}
      className={`reveal-section ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
