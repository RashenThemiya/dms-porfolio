import { useEffect, useRef, useState } from 'react';
import useInView from './useInView.js';
import useMediaQuery from './useMediaQuery.js';
import usePageVisibility from './usePageVisibility.js';

export default function useCarousel({ count, interval }) {
  const ref = useRef(null);
  const [selection, setSelection] = useState({ index: 0, revision: 0 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const visible = useInView(ref);
  const pageVisible = usePageVisibility();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const stopped = paused || hovered || focused || !visible || !pageVisible || reducedMotion;

  useEffect(() => {
    if (stopped || count < 2) return undefined;
    const timer = window.setTimeout(() => {
      setSelection((current) => ({
        index: (current.index + 1) % count,
        revision: current.revision + 1,
      }));
    }, interval);
    return () => window.clearTimeout(timer);
  }, [selection, stopped, count, interval]);

  function select(index) {
    setSelection((current) => ({ index, revision: current.revision + 1 }));
  }

  return {
    ref,
    selected: selection.index,
    revision: selection.revision,
    paused,
    setPaused,
    select,
    stopped,
    visible,
    pageVisible,
    interactionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      },
    },
  };
}
