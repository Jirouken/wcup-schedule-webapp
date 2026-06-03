import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { ShareButton } from './ShareButton';

interface Props {
  onCopyShare: () => Promise<void>;
}

const TOURNAMENT_START = '2026-06-12';
const TOURNAMENT_END = '2026-07-19';

export const Header: FC<Props> = ({ onCopyShare }) => {
  const [daysUntil, setDaysUntil] = useState<number | null>(null);
  const [isOngoing, setIsOngoing] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = parseISO(TOURNAMENT_START);
    const end = parseISO(TOURNAMENT_END);
    if (now >= start && now <= end) {
      setIsOngoing(true);
    } else if (now < start) {
      setDaysUntil(differenceInDays(start, now));
    }
  }, []);

  return (
    <header className="bg-gray-900/80 border-b border-gray-700/50 sticky top-0 z-30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl">⚽</span>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-gray-100 leading-tight">W杯2026 放送ガイド</h1>
            <p className="text-xs text-gray-500 leading-tight hidden sm:block">FIFA ワールドカップ 2026 日本放送スケジュール</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {isOngoing ? (
            <span className="flex items-center gap-1.5 text-sm font-bold text-red-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              開催中
            </span>
          ) : daysUntil !== null ? (
            <span className="text-sm text-amber-400 font-medium hidden sm:block">
              開幕まであと<span className="text-xl font-bold mx-1">{daysUntil}</span>日
            </span>
          ) : null}
          <ShareButton onCopy={onCopyShare} />
        </div>
      </div>
    </header>
  );
};
