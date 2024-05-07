import { useState, useEffect } from 'react';

/**
 *
 * @param query - This query will be used to check the viewport
 * @example const isDesktop = useMediaQuery("(min-width: 1024px)")
 * @return {boolean}
 */

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

export { useMediaQuery };
