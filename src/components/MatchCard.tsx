import type { FC } from 'react';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Match, Phase } from '../types/match';
import type { MatchScore } from '../hooks/useScores';
import { BroadcastBadge } from './BroadcastBadge';

const phaseShortLabels: Record<Phase, string> = {
  group: 'グループ',
  round32: 'ラウンド32',
  round16: 'ラウンド16',
  quarter: '準々決勝',
  semi: '準決勝',
  third: '3位決定戦',
  final: '決勝',
};

interface Props {
  match: Match;
  isWatched: boolean;
  onToggle: (id: string) => void;
  showPhase?: boolean;
  score?: MatchScore;
}

const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

export const MatchCard: FC<Props> = ({ match, isWatched, onToggle, showPhase, score }) => {
  const date = parseISO(match.date);
  const dayName = dayNames[date.getDay()];
  const formattedDate = format(date, 'M/d', { locale: ja });
  const isJapanMatch = match.isJapan;

  const phaseLabel = match.phase === 'group' && match.group
    ? `グループ${match.group}`
    : phaseShortLabels[match.phase];

  return (
    <div
      className={`
        relative rounded-lg p-3 border transition-all duration-200
        ${isWatched
          ? 'bg-amber-900/30 border-amber-500/60'
          : isJapanMatch
          ? 'bg-blue-900/20 border-blue-500/30 hover:border-blue-400/50'
          : 'bg-gray-900/40 border-gray-700/50 hover:border-gray-600/70'
        }
      `}
    >
      {/* Japan badge */}
      {isJapanMatch && (
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">🇯🇵 日本代表</span>
        </div>
      )}

      {/* Date & time */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-sm font-medium text-gray-300">
          {formattedDate}({dayName})
        </span>
        <span className="text-sm font-bold text-amber-400">{match.time}</span>
        {match.matchNumber && (
          <span className="text-xs bg-indigo-700/80 text-indigo-200 px-1.5 py-0.5 rounded font-bold font-mono">
            {match.matchNumber}
          </span>
        )}
        {showPhase && (
          <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded font-medium">
            {phaseLabel}
          </span>
        )}
        {match.note && (
          <span className="text-xs bg-amber-600/80 text-amber-100 px-1.5 py-0.5 rounded">{match.note}</span>
        )}
        {match.isTBD && !match.note && (
          <span className="text-xs text-gray-500">対戦TBD</span>
        )}
      </div>

      {/* Teams & Score */}
      {score?.status === 'FINISHED' || score?.status === 'IN_PLAY' || score?.status === 'PAUSED' ? (
        <div className="mb-2">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-sm font-bold flex-1 ${isJapanMatch ? 'text-blue-100' : 'text-gray-100'}`}>{match.home}</span>
            <span className={`text-xl font-bold font-mono tabular-nums px-2 ${score.status === 'FINISHED' ? 'text-white' : 'text-green-400'}`}>
              {score.homeScore ?? '-'} - {score.awayScore ?? '-'}
            </span>
            <span className={`text-sm font-bold flex-1 text-right ${isJapanMatch ? 'text-blue-100' : 'text-gray-100'}`}>{match.away}</span>
          </div>
          {score.status === 'IN_PLAY' && (
            <div className="text-xs text-green-400 text-center mt-0.5 animate-pulse">● 試合中</div>
          )}
          {score.status === 'PAUSED' && (
            <div className="text-xs text-yellow-400 text-center mt-0.5">ハーフタイム</div>
          )}
          {score.status === 'FINISHED' && (
            <div className="text-xs text-gray-500 text-center mt-0.5">終了</div>
          )}
        </div>
      ) : (
        <div className={`text-base font-bold mb-2 ${isJapanMatch ? 'text-blue-100' : 'text-gray-100'}`}>
          {match.home} <span className="text-gray-400 font-normal text-sm">vs</span> {match.away}
        </div>
      )}

      {/* City */}
      {match.city && (
        <div className="text-xs text-gray-500 mb-2">📍 {match.city}</div>
      )}

      {/* Broadcaster badges */}
      <div className="flex flex-wrap gap-1 mb-2">
        {match.broadcast
          .filter(b => b !== 'NHK BSP4K' && b !== 'DAZN')
          .map(b => (
            <BroadcastBadge key={b} broadcaster={b} small />
          ))}
        {match.broadcast.includes('DAZN') && (
          <BroadcastBadge broadcaster="DAZN" small />
        )}
        {match.broadcast.includes('NHK BSP4K') && (
          <BroadcastBadge broadcaster="NHK BSP4K" small />
        )}
        {match.broadcast.includes('NHK BS') && (
          <BroadcastBadge broadcaster="NHK BS" small />
        )}
      </div>

      {/* Watch button */}
      <button
        onClick={() => onToggle(match.id)}
        className={`
          w-full py-1.5 rounded text-sm font-medium transition-all duration-200
          ${isWatched
            ? 'bg-amber-500 text-black hover:bg-amber-400'
            : 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/80 hover:text-white'
          }
        `}
      >
        {isWatched ? '✓ 見たい！' : '＋ 見たい'}
      </button>
    </div>
  );
};
