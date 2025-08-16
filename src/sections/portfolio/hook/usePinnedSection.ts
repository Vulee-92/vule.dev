// usePinnedSection.ts
import { useEffect, useState } from 'react';

export function usePinnedSection(ref: React.RefObject<HTMLElement>) {
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Khi entry rời khỏi màn hình thì unpin
        setIsPinned(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return isPinned;
}
