import { useState, useEffect } from 'react';

export interface TeamStanding {
  position: number;
  teamJa: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface StandingsData {
  lastUpdated: string | null;
  groups: Record<string, TeamStanding[]>;
}

export function useStandings() {
  const [data, setData] = useState<StandingsData>({ lastUpdated: null, groups: {} });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/standings.json?t=${Date.now()}`);
        if (!res.ok) return;
        setData(await res.json());
      } catch { /* ignore */ }
    }
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
