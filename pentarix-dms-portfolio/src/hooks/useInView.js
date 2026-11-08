import { useEffect, useState } from 'react';

export default function useInView(
  ref,
  { threshold = 0.15, rootMargin = '0px', once = false } = {},
) {
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  );

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return visible;
}
