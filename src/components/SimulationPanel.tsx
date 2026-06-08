import { type FC, type ReactNode, useState } from 'react';
import { matches as allMatches } from '../data/matches';
import {
  useSimulation, resolveTeam, isResolved,
  INITIAL_GROUPS, THIRD_PLACE_SLOTS,
  type SimState,
} from '../hooks/useSimulation';

// ── Layout constants (matches TournamentBracket) ─────────────
const UNIT   = 64;
const CARD_W = 140;
const CONN_W = 22;

const R32_NUMS = ['[1]','[4]','[3]','[6]','[11]','[12]','[9]','[10]','[2]','[5]','[7]','[8]','[14]','[15]','[13]','[16]'];
const R16_NUMS = ['[A]','[B]','[E]','[F]','[C]','[D]','[G]','[H]'];
const QF_NUMS  = ['〈I〉','〈II〉','〈III〉','〈IV〉'];
const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

const byNum = (n: string) => allMatches.find(m => m.matchNumber === n)!;
const byId  = (id: string) => allMatches.find(m => m.id === id)!;

// ── Bracket connector SVG ─────────────────────────────────────
const Connector: FC<{ pairs: number; slotH: number }> = ({ pairs, slotH }) => {
  const h = pairs * 2 * slotH;
  const lines: ReactNode[] = [];
  const c = '#374151';
  for (let i = 0; i < pairs; i++) {
    const y1 = (i * 2 + 0.5) * slotH;
    const y2 = (i * 2 + 1.5) * slotH;
    const ym = (y1 + y2) / 2;
    lines.push(
      <line key={`a${i}`} x1={0}        y1={y1} x2={CONN_W/2} y2={y1} stroke={c} strokeWidth={1}/>,
      <line key={`b${i}`} x1={CONN_W/2} y1={y1} x2={CONN_W/2} y2={y2} stroke={c} strokeWidth={1}/>,
      <line key={`c${i}`} x1={0}        y1={y2} x2={CONN_W/2} y2={y2} stroke={c} strokeWidth={1}/>,
      <line key={`d${i}`} x1={CONN_W/2} y1={ym} x2={CONN_W}   y2={ym} stroke={c} strokeWidth={1}/>,
    );
  }
  return <svg width={CONN_W} height={h} style={{ flexShrink: 0, display: 'block' }}>{lines}</svg>;
};

// ── Interactive match card ────────────────────────────────────
const SimCard: FC<{
  home: string; away: string; winner?: string;
  matchNum?: string; isJapan?: boolean; date: string; time: string;
  onPick: (team: string) => void;
}> = ({ home, away, winner, matchNum, isJapan, date, time, onPick }) => {
  const both = isResolved(home) && isResolved(away);

  const rowCls = (team: string) => {
    if (!both) return 'text-gray-600 cursor-default';
    if (winner === team) return 'bg-amber-500/25 text-amber-300 font-bold cursor-pointer rounded px-1';
    if (winner)          return 'text-gray-600 line-through cursor-pointer rounded px-1 hover:bg-gray-700/40';
    return 'text-gray-200 cursor-pointer rounded px-1 hover:bg-gray-700/40';
  };

  return (
    <div
      style={{ width: CARD_W, padding: '2px 4px' }}
      className={`rounded border ${isJapan ? 'border-amber-500/60 bg-amber-900/10' : 'border-gray-700 bg-gray-800/90'}`}
    >
      {matchNum && (
        <div className="text-indigo-400 font-bold" style={{ fontSize: 9, lineHeight: '13px' }}>{matchNum}</div>
      )}
      <button
        className={`w-full text-left truncate transition-colors ${rowCls(home)}`}
        style={{ fontSize: 10, paddingTop: 1, paddingBottom: 1 }}
        onClick={() => both && onPick(home)}
      >{home}</button>
      <div className={`border-t my-px ${isJapan ? 'border-amber-700/30' : 'border-gray-700/50'}`} />
      <button
        className={`w-full text-left truncate transition-colors ${rowCls(away)}`}
        style={{ fontSize: 10, paddingTop: 1, paddingBottom: 1 }}
        onClick={() => both && onPick(away)}
      >{away}</button>
      <div className="text-gray-500" style={{ fontSize: 9, lineHeight: '13px', marginTop: 1 }}>
        {date.slice(5).replace('-','/')} {time}
        {!both && <span className="text-gray-700 ml-1">待定</span>}
      </div>
    </div>
  );
};

// ── ① グループ予想 ───────────────────────────────────────────
const GroupsView: FC<{ state: SimState; onChange: (g: string, teams: string[]) => void }> = ({ state, onChange }) => {
  const move = (group: string, i: number, dir: -1 | 1) => {
    const t = [...(state.groupRankings[group] ?? INITIAL_GROUPS[group] ?? [])];
    const j = i + dir;
    if (j < 0 || j >= t.length) return;
    [t[i], t[j]] = [t[j], t[i]];
    onChange(group, t);
  };

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">▲▼ で各グループの順位を予想してください。上位2チームが決勝トーナメント進出です。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {GROUP_LETTERS.map(letter => {
          const teams = state.groupRankings[letter] ?? INITIAL_GROUPS[letter] ?? [];
          return (
            <div key={letter} className="bg-gray-900/60 border border-gray-700/50 rounded-lg overflow-hidden">
              <div className="bg-gray-800/80 px-3 py-2 text-xs font-bold text-amber-400">グループ {letter}</div>
              <div className="divide-y divide-gray-800/50">
                {teams.map((team, i) => (
                  <div key={team} className="flex items-center gap-2 px-2 py-1.5">
                    <span className={`text-xs font-bold w-4 tabular-nums ${i < 2 ? 'text-amber-500' : 'text-gray-600'}`}>{i+1}</span>
                    <span className={`flex-1 text-xs ${i < 2 ? 'text-gray-200' : i === 2 ? 'text-gray-400' : 'text-gray-600'}`}>{team}</span>
                    {i === 1 && <span className="text-amber-500/40 text-xs mr-1">●</span>}
                    <div className="flex flex-col gap-px">
                      <button onClick={() => move(letter, i, -1)} disabled={i === 0}
                        className="text-gray-600 hover:text-gray-300 disabled:opacity-20 text-xs leading-none px-1">▲</button>
                      <button onClick={() => move(letter, i, 1)} disabled={i === teams.length-1}
                        className="text-gray-600 hover:text-gray-300 disabled:opacity-20 text-xs leading-none px-1">▼</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── ② 3位通過 ────────────────────────────────────────────────
const ThirdView: FC<{ state: SimState; onPick: (matchId: string, team: string) => void }> = ({ state, onPick }) => {
  const assigned = new Set(Object.values(state.thirdPlaceAssignments).filter(Boolean));

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">
        各R32スロットに入る3位通過チームを選択してください。<br/>
        選択肢はそのスロットに割り当て可能なグループの3位チームに絞られています。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {THIRD_PLACE_SLOTS.map(slot => {
          const current = state.thirdPlaceAssignments[slot.matchId] ?? '';
          const options = slot.groups.map(g => {
            const teams = state.groupRankings[g] ?? INITIAL_GROUPS[g] ?? [];
            return { group: g, team: teams[2] ?? '(未設定)' };
          });
          return (
            <div key={slot.matchId} className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-3">
              <div className="text-xs font-bold text-indigo-400 mb-0.5">{slot.matchNum} の3位枠</div>
              <div className="text-xs text-gray-500 mb-2">対象: {slot.groups.join(', ')} 組</div>
              <select
                value={current}
                onChange={e => onPick(slot.matchId, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-amber-500/60"
              >
                <option value="">-- 選択 --</option>
                {options.map(({ group, team }) => {
                  const taken = assigned.has(team) && team !== current;
                  return (
                    <option key={group} value={team} disabled={taken || team === '(未設定)'}>
                      {group}組: {team}{taken ? ' ✓割当済' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── ③ トーナメント予想 ────────────────────────────────────────
const HEADER_COLS = [
  { label: 'ラウンド32', w: CARD_W }, { label: '', w: CONN_W },
  { label: 'ラウンド16', w: CARD_W }, { label: '', w: CONN_W },
  { label: '準々決勝',   w: CARD_W }, { label: '', w: CONN_W },
  { label: '準決勝',     w: CARD_W }, { label: '', w: CONN_W },
  { label: '決勝',       w: CARD_W },
];

const BracketView: FC<{ state: SimState; onWin: (matchId: string, winner: string) => void }> = ({ state, onWin }) => {
  const r32 = R32_NUMS.map(byNum);
  const r16 = R16_NUMS.map(byNum);
  const qf  = QF_NUMS.map(byNum);
  const sf1 = byId('SF_01');
  const sf2 = byId('SF_02');
  const fin = byId('FINAL');
  const trd = byId('THIRD');
  const totalH = 16 * UNIT;
  const totalW = HEADER_COLS.reduce((s, c) => s + c.w, 0);

  const card = (m: ReturnType<typeof byNum>, slotH: number) => (
    <div key={m.id} style={{ height: slotH, display: 'flex', alignItems: 'center' }}>
      <SimCard
        home={resolveTeam(m.home, m.id, true, state)}
        away={resolveTeam(m.away, m.id, false, state)}
        winner={state.knockoutWinners[m.id]}
        matchNum={m.matchNumber}
        isJapan={m.isJapan}
        date={m.date} time={m.time}
        onPick={team => onWin(m.id, team)}
      />
    </div>
  );

  return (
    <div className="overflow-x-auto pb-4">
      <p className="text-xs text-gray-400 mb-3">
        チーム名をクリックして勝者を予想。グループ予想が完了すると選択可能になります。勝者を変えると以降の予想は自動でリセットされます。
      </p>
      <div style={{ display: 'flex', minWidth: totalW }} className="mb-2">
        {HEADER_COLS.map((c, i) => (
          <div key={i} style={{ width: c.w, flexShrink: 0 }} className="text-center text-xs font-bold text-gray-400">{c.label}</div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: totalW }}>
        <div style={{ width: CARD_W, flexShrink: 0 }}>{r32.map(m => card(m, UNIT))}</div>
        <Connector pairs={8} slotH={UNIT} />
        <div style={{ width: CARD_W, flexShrink: 0 }}>{r16.map(m => card(m, UNIT * 2))}</div>
        <Connector pairs={4} slotH={UNIT * 2} />
        <div style={{ width: CARD_W, flexShrink: 0 }}>{qf.map(m => card(m, UNIT * 4))}</div>
        <Connector pairs={2} slotH={UNIT * 4} />
        <div style={{ width: CARD_W, flexShrink: 0 }}>
          {card(sf1, UNIT * 8)}
          {card(sf2, UNIT * 8)}
        </div>
        <Connector pairs={1} slotH={UNIT * 8} />
        <div style={{ width: CARD_W, flexShrink: 0, height: totalH, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
            <div className="text-amber-400 text-xs font-bold text-center mb-1">🏆 決勝</div>
            <SimCard
              home={resolveTeam(fin.home, fin.id, true, state)}
              away={resolveTeam(fin.away, fin.id, false, state)}
              winner={state.knockoutWinners[fin.id]}
              date={fin.date} time={fin.time}
              onPick={team => onWin(fin.id, team)}
            />
          </div>
          <div style={{ position: 'absolute', top: UNIT * 12, transform: 'translateY(-50%)', width: '100%' }}>
            <div className="text-gray-500 text-xs text-center mb-1">3位決定戦</div>
            <SimCard
              home={resolveTeam(trd.home, trd.id, true, state)}
              away={resolveTeam(trd.away, trd.id, false, state)}
              winner={state.knockoutWinners[trd.id]}
              date={trd.date} time={trd.time}
              onPick={team => onWin(trd.id, team)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────
type SimTab = 'groups' | 'third' | 'bracket';

export const SimulationPanel: FC = () => {
  const { state, setGroupRanking, setThirdPlace, setWinner, reset } = useSimulation();
  const [tab, setTab] = useState<SimTab>('groups');

  const groupsDone  = GROUP_LETTERS.filter(g => state.groupRankings[g]).length;
  const thirdDone   = THIRD_PLACE_SLOTS.filter(s => state.thirdPlaceAssignments[s.matchId]).length;
  const winnersDone = Object.keys(state.knockoutWinners).length;

  const tabCls = (t: SimTab) =>
    `px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
      tab === t
        ? 'bg-gray-800 text-amber-400 border-t border-x border-gray-700'
        : 'text-gray-400 hover:text-gray-200'
    }`;

  return (
    <div>
      <div className="border-b border-gray-700/50 mb-4 flex items-end justify-between">
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setTab('groups')} className={tabCls('groups')}>
            ① グループ予想 <span className="text-gray-500">({groupsDone}/12)</span>
          </button>
          <button onClick={() => setTab('third')} className={tabCls('third')}>
            ② 3位通過 <span className="text-gray-500">({thirdDone}/8)</span>
          </button>
          <button onClick={() => setTab('bracket')} className={tabCls('bracket')}>
            ③ トーナメント予想
            {winnersDone > 0 && <span className="text-gray-500 ml-1">({winnersDone}試合)</span>}
          </button>
        </div>
        <button
          onClick={() => { if (window.confirm('予想をすべてリセットしますか？')) reset(); }}
          className="text-xs text-gray-600 hover:text-red-400 mb-2 mr-1 transition-colors"
        >
          🗑 リセット
        </button>
      </div>

      {tab === 'groups'  && <GroupsView  state={state} onChange={setGroupRanking} />}
      {tab === 'third'   && <ThirdView   state={state} onPick={setThirdPlace} />}
      {tab === 'bracket' && <BracketView state={state} onWin={setWinner} />}
    </div>
  );
};
