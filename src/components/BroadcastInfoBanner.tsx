import { useState } from 'react';
import type { FC } from 'react';

const broadcasterInfo = [
  { name: 'NHK総合', count: '34試合', type: '地上波・生中継', cost: '無料', note: '日本戦含む', color: 'bg-blue-900/40 border-blue-700/50' },
  { name: 'NHK BS', count: '1試合', type: '衛星・生中継', cost: '無料（受信料）', note: 'チュニジア戦のみ', color: 'bg-cyan-900/40 border-cyan-700/50' },
  { name: 'NHK BSP4K', count: '全104試合', type: '衛星・生中継+録画混在', cost: '無料（受信料）', note: '⚠️ 全試合生中継ではない', color: 'bg-cyan-950/40 border-cyan-800/50' },
  { name: '日本テレビ', count: '15試合', type: '地上波・生中継', cost: '無料', note: 'チュニジア戦含む', color: 'bg-red-900/40 border-red-700/50' },
  { name: 'フジテレビ', count: '10試合', type: '地上波・生中継', cost: '無料', note: '日本決勝T1回戦含む', color: 'bg-violet-900/40 border-violet-700/50' },
  { name: 'DAZN', count: '全104試合', type: 'ネット・生中継', cost: '有料（日本戦のみ無料）', note: '全試合リアルタイム視聴はDAZNのみ', color: 'bg-green-900/40 border-green-700/50' },
];

export const BroadcastInfoBanner: FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl mb-4">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-200">📺 放送局情報</span>
          <span className="text-xs text-gray-500">全104試合配信：DAZN・NHK BSP4K</span>
        </div>
        <span className="text-gray-400 text-sm">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {broadcasterInfo.map(info => (
              <div key={info.name} className={`rounded-lg p-3 border ${info.color}`}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-gray-200">{info.name}</span>
                  <span className="text-xs text-amber-400 font-medium">{info.count}</span>
                </div>
                <div className="text-xs text-gray-400">{info.type}</div>
                <div className="text-xs text-gray-300 mt-0.5">{info.cost}</div>
                <div className="text-xs text-gray-400 mt-0.5 italic">{info.note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            ※ ABEMA・スカパー・WOWOW・Netflixは今大会の放映権なし。NHK ONEはNHK地上波の同時・見逃し配信のみ。
          </p>
        </div>
      )}
    </div>
  );
};
