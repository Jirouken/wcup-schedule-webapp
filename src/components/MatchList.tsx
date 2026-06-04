import type { FC } from 'react';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Match, Phase } from '../types/match';
import { MatchCard } from './MatchCard';
import type { Filters } from './FilterPanel';
import type { MatchScore } from '../hooks/useScores';

interface Props {
  matches: Match[];
  watched: Set<string>;
  onToggle: (id: string) => void;
  filters: Filters;
  viewMode: 'group' | 'date';
  onViewModeChange: (mode: 'group' | 'date') => void;
  getScore: (match: Match) => MatchScore | undefined;
}

const phaseLabels: Record<Phase, string> = {
  group: 'グループステージ',
  round32: 'ラウンド32（1回戦）',
  round16: 'ラウンド16（2回戦）',
  quarter: '準々決勝',
  semi: '準決勝',
  third: '3位決定戦',
  final: '決勝',
};

const phaseOrder: Phase[] = ['group', 'round32', 'round16', 'quarter', 'semi', 'third', 'final'];

const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

export const MatchList: FC<Props> = ({ matches, watched, onToggle, filters, viewMode, onViewModeChange, getScore }) => {
  const filtered = matches.filter(m => {
    if (filters.phase !== 'all' && m.phase !== filters.phase) return false;
    if (filters.broadcaster !== 'all' && !m.broadcast.includes(filters.broadcaster)) return false;
    if (filters.japanOnly && !m.isJapan) return false;
    if (filters.watchedOnly && !watched.has(m.id)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <>
        <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">⚽</div>
          <div>条件に一致する試合がありません</div>
        </div>
      </>
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    const da = new Date(`${a.date}T${a.time}:00+09:00`).getTime();
    const db = new Date(`${b.date}T${b.time}:00+09:00`).getTime();
    return da - db;
  });

  const grouped = new Map<string, Match[]>();

  if (viewMode === 'date') {
    sorted.forEach(m => {
      const d = parseISO(m.date);
      const key = `${format(d, 'M月d日', { locale: ja })}（${dayNames[d.getDay()]}）`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(m);
    });
  } else {
    if (filters.phase !== 'all') {
      if (filters.phase === 'group') {
        const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        groups.forEach(g => {
          const ms = sorted.filter(m => m.group === g);
          if (ms.length > 0) grouped.set(`グループ${g}`, ms);
        });
      } else {
        grouped.set(phaseLabels[filters.phase as Phase], sorted);
      }
    } else {
      phaseOrder.forEach(phase => {
        const phaseMatches = sorted.filter(m => m.phase === phase);
        if (phaseMatches.length === 0) return;
        if (phase === 'group') {
          const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
          groups.forEach(g => {
            const ms = phaseMatches.filter(m => m.group === g);
            if (ms.length > 0) grouped.set(`グループ${g}`, ms);
          });
        } else {
          grouped.set(phaseLabels[phase], phaseMatches);
        }
      });
    }
  }

  return (
    <div className="space-y-6">
      <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />

      {[...grouped.entries()].map(([label, ms]) => (
        <section key={label}>
          <h2 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-amber-500/20" />
            {label}
            <span className="text-gray-500 font-normal">{ms.length}試合</span>
            <span className="h-px flex-1 bg-amber-500/20" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {ms.map(m => (
              <MatchCard
                key={m.id}
                match={m}
                isWatched={watched.has(m.id)}
                onToggle={onToggle}
                showPhase={viewMode === 'date'}
                score={getScore(m)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const ViewModeToggle: FC<{ viewMode: 'group' | 'date'; onChange: (m: 'group' | 'date') => void }> = ({ viewMode, onChange }) => (
  <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1 w-fit mb-2">
    <button
      onClick={() => onChange('group')}
      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
        viewMode === 'group' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      グループ別
    </button>
    <button
      onClick={() => onChange('date')}
      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
        viewMode === 'date' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      日時順
    </button>
  </div>
);
