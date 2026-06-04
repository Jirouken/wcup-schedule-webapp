import type { FC } from 'react';
import type { TeamStanding } from '../hooks/useStandings';

interface Props {
  groups: Record<string, TeamStanding[]>;
}

const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export const StandingsPanel: FC<Props> = ({ groups }) => {
  const hasData = Object.keys(groups).length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-4xl mb-3">📊</div>
        <div>大会開幕後に順位表が表示されます</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {GROUP_LETTERS.map(letter => {
        const table = groups[letter];
        if (!table) return null;
        return (
          <div key={letter} className="bg-gray-900/60 border border-gray-700/50 rounded-lg overflow-hidden">
            <div className="bg-gray-800/80 px-3 py-2 text-xs font-bold text-amber-400">
              グループ {letter}
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-700/50">
                  <th className="text-left px-2 py-1.5 font-normal w-5">#</th>
                  <th className="text-left px-2 py-1.5 font-normal">チーム</th>
                  <th className="text-center px-1 py-1.5 font-normal">試</th>
                  <th className="text-center px-1 py-1.5 font-normal">勝</th>
                  <th className="text-center px-1 py-1.5 font-normal">分</th>
                  <th className="text-center px-1 py-1.5 font-normal">敗</th>
                  <th className="text-center px-1 py-1.5 font-normal">得失</th>
                  <th className="text-center px-1 py-1.5 font-normal text-amber-400">点</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row, i) => (
                  <tr
                    key={row.teamJa}
                    className={`border-b border-gray-800/50 last:border-0 ${
                      i < 2 ? 'text-gray-100' : i === 2 ? 'text-gray-400' : 'text-gray-600'
                    } ${i === 1 ? 'border-b border-amber-500/30' : ''}`}
                  >
                    <td className="px-2 py-1.5 text-gray-500">{row.position}</td>
                    <td className="px-2 py-1.5 font-medium">
                      {row.teamJa}
                      {i < 2 && <span className="ml-1 text-amber-500/60">●</span>}
                    </td>
                    <td className="text-center px-1 py-1.5">{row.played}</td>
                    <td className="text-center px-1 py-1.5">{row.won}</td>
                    <td className="text-center px-1 py-1.5">{row.draw}</td>
                    <td className="text-center px-1 py-1.5">{row.lost}</td>
                    <td className="text-center px-1 py-1.5">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                    <td className="text-center px-1 py-1.5 font-bold text-amber-400">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
