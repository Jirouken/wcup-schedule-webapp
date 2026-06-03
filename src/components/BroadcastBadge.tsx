import type { FC } from 'react';
import type { Broadcaster } from '../types/match';

interface Props {
  broadcaster: Broadcaster;
  small?: boolean;
}

const config: Record<Broadcaster, { label: string; bg: string; text: string }> = {
  'NHK総合': { label: 'NHK総合', bg: 'bg-blue-700', text: 'text-white' },
  'NHK BS': { label: 'NHK BS', bg: 'bg-cyan-800', text: 'text-white' },
  'NHK BSP4K': { label: 'NHK BSP4K', bg: 'bg-cyan-900', text: 'text-cyan-300' },
  '日本テレビ': { label: '日テレ', bg: 'bg-red-700', text: 'text-white' },
  'フジテレビ': { label: 'フジ', bg: 'bg-violet-700', text: 'text-white' },
  'DAZN': { label: 'DAZN', bg: 'bg-green-700', text: 'text-white' },
};

export const BroadcastBadge: FC<Props> = ({ broadcaster, small }) => {
  const { label, bg, text } = config[broadcaster];
  const sizeClass = small ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-block rounded font-medium ${bg} ${text} ${sizeClass}`}>
      {label}
      {broadcaster === 'NHK BSP4K' && (
        <span className="ml-1 opacity-75 text-[10px]">録画含</span>
      )}
    </span>
  );
};
