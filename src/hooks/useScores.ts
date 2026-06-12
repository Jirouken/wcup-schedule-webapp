import { useState, useEffect } from 'react';
import type { Match } from '../types/match';

export interface MatchScore {
  date: string;
  time: string;
  homeJa: string;
  awayJa: string;
  status: 'SCHEDULED' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  homeScore: number | null;
  awayScore: number | null;
}

export function useScores() {
  const [scores, setScores] = useState<MatchScore[]>([]);

  async function load() {
    try {
      const res = await fetch(`/scores.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.matches)) setScores(data.matches);
    } catch {
      // スコアが取得できなくても無視
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  function getScore(match: Match): MatchScore | undefined {
    if (match.phase === 'group') {
      return scores.find(s => s.date === match.date && s.homeJa === match.home && s.awayJa === match.away);
    }
    // ノックアウトステージは日時で一致
    return scores.find(s => s.date === match.date && s.time === match.time);
  }

  return { getScore };
}
