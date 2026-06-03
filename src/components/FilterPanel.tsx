import type { FC } from 'react';
import type { Phase, Broadcaster } from '../types/match';

export interface Filters {
  phase: Phase | 'all';
  broadcaster: Broadcaster | 'all';
  japanOnly: boolean;
  watchedOnly: boolean;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  watchedCount: number;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const phaseOptions: { value: Phase | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'group', label: 'グループステージ' },
  { value: 'round32', label: 'ラウンド32' },
  { value: 'round16', label: 'ラウンド16' },
  { value: 'quarter', label: '準々決勝' },
  { value: 'semi', label: '準決勝' },
  { value: 'third', label: '3位決定戦' },
  { value: 'final', label: '決勝' },
];

const broadcasterOptions: { value: Broadcaster | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'NHK総合', label: 'NHK総合' },
  { value: 'NHK BS', label: 'NHK BS' },
  { value: 'NHK BSP4K', label: 'NHK BSP4K' },
  { value: '日本テレビ', label: '日本テレビ' },
  { value: 'フジテレビ', label: 'フジテレビ' },
  { value: 'DAZN', label: 'DAZNのみ' },
];

export const FilterPanel: FC<Props> = ({
  filters,
  onChange,
  watchedCount,
  isOpen,
  onClose,
  isMobile,
}) => {
  const content = (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">フェーズ</label>
        <div className="flex flex-wrap gap-1.5">
          {phaseOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, phase: opt.value })}
              className={`
                px-2.5 py-1 rounded text-xs font-medium transition-colors
                ${filters.phase === opt.value
                  ? 'bg-amber-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">放送局</label>
        <div className="flex flex-wrap gap-1.5">
          {broadcasterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, broadcaster: opt.value })}
              className={`
                px-2.5 py-1 rounded text-xs font-medium transition-colors
                ${filters.broadcaster === opt.value
                  ? 'bg-amber-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.japanOnly}
            onChange={e => onChange({ ...filters, japanOnly: e.target.checked })}
            className="w-4 h-4 accent-amber-500"
          />
          <span className="text-sm text-gray-300">🇯🇵 日本代表戦のみ</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.watchedOnly}
            onChange={e => onChange({ ...filters, watchedOnly: e.target.checked })}
            className="w-4 h-4 accent-amber-500"
          />
          <span className="text-sm text-gray-300">
            ✓ チェック済みのみ
            {watchedCount > 0 && (
              <span className="ml-1 text-amber-400">({watchedCount})</span>
            )}
          </span>
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;
    return (
      <>
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50 p-4 rounded-t-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-100">絞り込み</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-xl">✕</button>
          </div>
          {content}
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50">
      <h3 className="font-bold text-gray-100 mb-4">絞り込み</h3>
      {content}
    </div>
  );
};
