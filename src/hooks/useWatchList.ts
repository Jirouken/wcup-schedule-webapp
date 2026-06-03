import { useState, useEffect } from 'react';

export function useWatchList() {
  const [watched, setWatched] = useState<Set<string>>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlWatched = params.get('watched');
    if (urlWatched) {
      return new Set(urlWatched.split(',').filter(Boolean));
    }
    const saved = localStorage.getItem('wc2026_watched');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('wc2026_watched', JSON.stringify([...watched]));
  }, [watched]);

  const toggle = (id: string) => {
    setWatched(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getShareUrl = () => {
    const url = new URL(window.location.href);
    if (watched.size > 0) {
      url.searchParams.set('watched', [...watched].join(','));
    } else {
      url.searchParams.delete('watched');
    }
    return url.toString();
  };

  const copyShareUrl = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
  };

  return { watched, toggle, copyShareUrl };
}
