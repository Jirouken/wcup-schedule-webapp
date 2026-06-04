import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { format, parseISO, differenceInSeconds } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Match } from '../types/match';
import type { MatchScore } from '../hooks/useScores';
import { BroadcastBadge } from './BroadcastBadge';

interface Props {
  matches: Match[];
  watched: Set<string>;
  onToggle: (id: string) => void;
  getScore: (match: Match) => MatchScore | undefined;
}

const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

function formatCountdown(seconds: number) {
  if (seconds <= 0) return null;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}日 ${h}時間 ${m}分`;
  if (h > 0) return `${h}時間 ${m}分 ${s}秒`;
  return `${m}分 ${s}秒`;
}

export const WatchList: FC<Props> = ({ matches, watched, onToggle, getScore }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const watchedMatches = matches
    .filter(m => watched.has(m.id))
    .sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}:00+09:00`).getTime();
      const db = new Date(`${b.date}T${b.time}:00+09:00`).getTime();
      return da - db;
    });

  if (watchedMatches.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-5xl mb-4">📋</div>
        <div className="text-lg mb-2 text-gray-400">ウォッチリストが空です</div>
        <div className="text-sm">試合カードの「見たい」ボタンを押して追加しましょう</div>
      </div>
    );
  }

  const nextMatch = watchedMatches.find(m => {
    const matchTime = new Date(`${m.date}T${m.time}:00+09:00`);
    return matchTime > now;
  });

  const countdownSeconds = nextMatch
    ? Math.floor(differenceInSeconds(new Date(`${nextMatch.date}T${nextMatch.time}:00+09:00`), now))
    : 0;

  return (
    <div className="space-y-4">
      {/* Countdown */}
      {nextMatch && countdownSeconds > 0 && (
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/40 rounded-xl p-4">
          <div className="text-xs text-amber-400 font-medium mb-1">次の試合まで</div>
          <div className="text-2xl font-bold text-amber-300 font-mono">
            {formatCountdown(countdownSeconds)}
          </div>
          <div className="text-sm text-gray-300 mt-1">
            {format(parseISO(nextMatch.date), 'M/d', { locale: ja })}
            ({dayNames[parseISO(nextMatch.date).getDay()]})
            {' '}{nextMatch.time}〜
            {' '}{nextMatch.home} vs {nextMatch.away}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-400">
        チェック済み: <span className="text-amber-400 font-bold">{watchedMatches.length}試合</span>
      </div>

      {/* Date-ordered list */}
      <div className="space-y-2">
        {watchedMatches.map(m => {
          const date = parseISO(m.date);
          const dayName = dayNames[date.getDay()];
          const isPast = new Date(`${m.date}T${m.time}:00+09:00`) < now;
          const isNext = nextMatch?.id === m.id;
          return (
            <div
              key={m.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                isNext
                  ? 'border-amber-500/60 bg-amber-900/20'
                  : isPast
                  ? 'opacity-50 border-gray-800 bg-gray-900/30'
                  : 'border-gray-700/50 bg-gray-900/40'
              }`}
            >
              {/* Date column */}
              <div className="flex-shrink-0 text-center w-14">
                <div className="text-xs text-gray-400">{format(date, 'M/d', { locale: ja })}</div>
                <div className={`text-xs font-medium ${isNext ? 'text-amber-400' : 'text-gray-500'}`}>{dayName}</div>
                <div className={`text-sm font-bold ${isNext ? 'text-amber-300' : 'text-gray-300'}`}>{m.time}</div>
              </div>

              {/* Match info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {m.isJapan && <span className="text-xs">🇯🇵</span>}
                  {isNext && <span className="text-xs bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">NEXT</span>}
                  {m.phase !== 'group' && (
                    <span className="text-xs text-gray-500">
                      {m.phase === 'round32' ? 'R32' : m.phase === 'round16' ? 'R16' : m.phase === 'quarter' ? 'QF' : m.phase === 'semi' ? 'SF' : m.phase === 'third' ? '3位決定戦' : '決勝'}
                    </span>
                  )}
                  {m.group && <span className="text-xs text-gray-600">G{m.group}</span>}
                </div>
                {(() => {
                  const s = getScore(m);
                  if (s && (s.status === 'FINISHED' || s.status === 'IN_PLAY' || s.status === 'PAUSED')) {
                    return (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200 truncate flex-1">{m.home}</span>
                        <span className={`text-base font-bold font-mono tabular-nums ${s.status === 'IN_PLAY' ? 'text-green-400' : 'text-white'}`}>
                          {s.homeScore ?? '-'} - {s.awayScore ?? '-'}
                        </span>
                        <span className="text-sm font-medium text-gray-200 truncate flex-1 text-right">{m.away}</span>
                      </div>
                    );
                  }
                  return (
                    <div className="text-sm font-medium text-gray-200 truncate">
                      {m.home} <span className="text-gray-500 font-normal text-xs">vs</span> {m.away}
                    </div>
                  );
                })()}
                <div className="flex flex-wrap gap-1 mt-1">
                  {m.broadcast.filter(b => b !== 'NHK BSP4K').map(b => (
                    <BroadcastBadge key={b} broadcaster={b} small />
                  ))}
                  {m.broadcast.includes('NHK BSP4K') && (
                    <BroadcastBadge broadcaster="NHK BSP4K" small />
                  )}
                </div>
              </div>

              <button
                onClick={() => onToggle(m.id)}
                className="text-amber-400 hover:text-red-400 transition-colors text-lg flex-shrink-0"
                title="ウォッチリストから削除"
              >
                ✓
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
