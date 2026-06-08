import type { FC } from 'react';
import { matches as allMatches } from '../data/matches';
import type { Match } from '../types/match';
import type { MatchScore } from '../hooks/useScores';

interface Props {
  getScore: (match: Match) => MatchScore | undefined;
}

const UNIT = 64;   // px per R32 slot
const CARD_W = 140;
const CONN_W = 22;

// Bracket order top-to-bottom
// Upper half → SF_01: [1][4] → [A], [3][6] → [B] → 〈I〉; [11][12] → [E], [9][10] → [F] → 〈II〉
// Lower half → SF_02: [2][5] → [C], [7][8] → [D] → 〈III〉; [14][15] → [G], [13][16] → [H] → 〈IV〉
const R32_NUMS = ['[1]','[4]','[3]','[6]','[11]','[12]','[9]','[10]','[2]','[5]','[7]','[8]','[14]','[15]','[13]','[16]'];
const R16_NUMS = ['[A]','[B]','[E]','[F]','[C]','[D]','[G]','[H]'];
const QF_NUMS  = ['〈I〉','〈II〉','〈III〉','〈IV〉'];

const byNum = (num: string): Match => allMatches.find(m => m.matchNumber === num)!;
const byId  = (id: string):  Match => allMatches.find(m => m.id === id)!;

const BracketCard: FC<{ match: Match; score?: MatchScore }> = ({ match, score }) => {
  const fin  = score?.status === 'FINISHED';
  const live = score?.status === 'IN_PLAY' || score?.status === 'PAUSED';
  return (
    <div
      style={{ width: CARD_W, padding: '3px 5px' }}
      className={`rounded border leading-snug ${
        match.isJapan
          ? 'border-amber-500/60 bg-amber-900/20'
          : 'border-gray-700 bg-gray-800/90'
      }`}
    >
      {match.matchNumber && (
        <div className="text-indigo-400 font-bold" style={{ fontSize: 9, lineHeight: '13px' }}>
          {match.matchNumber}
        </div>
      )}
      <div className="flex justify-between gap-1">
        <span
          className={`truncate ${match.isJapan ? 'text-amber-300' : 'text-gray-200'}`}
          style={{ fontSize: 10, maxWidth: 108 }}
        >
          {match.home}
        </span>
        {(fin || live) && (
          <span className={`font-bold font-mono shrink-0 ${live ? 'text-green-400' : 'text-white'}`} style={{ fontSize: 10 }}>
            {score?.homeScore ?? '-'}
          </span>
        )}
      </div>
      <div className={`border-t my-px ${match.isJapan ? 'border-amber-700/30' : 'border-gray-700/50'}`} />
      <div className="flex justify-between gap-1">
        <span
          className={`truncate ${match.isJapan ? 'text-amber-300' : 'text-gray-200'}`}
          style={{ fontSize: 10, maxWidth: 108 }}
        >
          {match.away}
        </span>
        {(fin || live) && (
          <span className={`font-bold font-mono shrink-0 ${live ? 'text-green-400' : 'text-white'}`} style={{ fontSize: 10 }}>
            {score?.awayScore ?? '-'}
          </span>
        )}
      </div>
      <div className="text-gray-500" style={{ fontSize: 9, lineHeight: '13px', marginTop: 1 }}>
        {match.date.slice(5).replace('-', '/')} {match.time}
        {live && <span className="text-green-400 ml-1">●</span>}
        {fin  && <span className="text-gray-600 ml-1">終了</span>}
      </div>
    </div>
  );
};

// Draws bracket connectors: pairs × 2 source slots → pairs destination slots
const Connector: FC<{ pairs: number; slotH: number }> = ({ pairs, slotH }) => {
  const totalH = pairs * 2 * slotH;
  const lines: React.ReactNode[] = [];
  const c = '#374151';
  for (let i = 0; i < pairs; i++) {
    const y1 = (i * 2 + 0.5) * slotH;
    const y2 = (i * 2 + 1.5) * slotH;
    const ym = (y1 + y2) / 2;
    lines.push(
      <line key={`a${i}`} x1={0}        y1={y1} x2={CONN_W/2} y2={y1} stroke={c} strokeWidth={1} />,
      <line key={`b${i}`} x1={CONN_W/2} y1={y1} x2={CONN_W/2} y2={y2} stroke={c} strokeWidth={1} />,
      <line key={`c${i}`} x1={0}        y1={y2} x2={CONN_W/2} y2={y2} stroke={c} strokeWidth={1} />,
      <line key={`d${i}`} x1={CONN_W/2} y1={ym} x2={CONN_W}   y2={ym} stroke={c} strokeWidth={1} />,
    );
  }
  return <svg width={CONN_W} height={totalH} style={{ flexShrink: 0, display: 'block' }}>{lines}</svg>;
};

const HEADER_COLS = [
  { label: 'ラウンド32', w: CARD_W },
  { label: '',          w: CONN_W },
  { label: 'ラウンド16', w: CARD_W },
  { label: '',          w: CONN_W },
  { label: '準々決勝',   w: CARD_W },
  { label: '',          w: CONN_W },
  { label: '準決勝',     w: CARD_W },
  { label: '',          w: CONN_W },
  { label: '決勝',       w: CARD_W },
];

export const TournamentBracket: FC<Props> = ({ getScore }) => {
  const r32    = R32_NUMS.map(byNum);
  const r16    = R16_NUMS.map(byNum);
  const qf     = QF_NUMS.map(byNum);
  const sf1    = byId('SF_01');
  const sf2    = byId('SF_02');
  const final_ = byId('FINAL');
  const third  = byId('THIRD');
  const totalH = 16 * UNIT;
  const totalW = HEADER_COLS.reduce((s, c) => s + c.w, 0);

  return (
    <div className="overflow-x-auto pb-4">
      {/* Round header */}
      <div style={{ display: 'flex', minWidth: totalW }} className="mb-2">
        {HEADER_COLS.map((col, i) => (
          <div
            key={i}
            style={{ width: col.w, flexShrink: 0 }}
            className="text-center text-xs font-bold text-gray-400"
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Bracket body */}
      <div style={{ display: 'flex', alignItems: 'flex-start', minWidth: totalW }}>

        {/* R32 */}
        <div style={{ width: CARD_W, flexShrink: 0 }}>
          {r32.map(m => (
            <div key={m.id} style={{ height: UNIT, display: 'flex', alignItems: 'center' }}>
              <BracketCard match={m} score={getScore(m)} />
            </div>
          ))}
        </div>

        <Connector pairs={8} slotH={UNIT} />

        {/* R16 */}
        <div style={{ width: CARD_W, flexShrink: 0 }}>
          {r16.map(m => (
            <div key={m.id} style={{ height: UNIT * 2, display: 'flex', alignItems: 'center' }}>
              <BracketCard match={m} score={getScore(m)} />
            </div>
          ))}
        </div>

        <Connector pairs={4} slotH={UNIT * 2} />

        {/* QF */}
        <div style={{ width: CARD_W, flexShrink: 0 }}>
          {qf.map(m => (
            <div key={m.id} style={{ height: UNIT * 4, display: 'flex', alignItems: 'center' }}>
              <BracketCard match={m} score={getScore(m)} />
            </div>
          ))}
        </div>

        <Connector pairs={2} slotH={UNIT * 4} />

        {/* SF */}
        <div style={{ width: CARD_W, flexShrink: 0 }}>
          <div style={{ height: UNIT * 8, display: 'flex', alignItems: 'center' }}>
            <BracketCard match={sf1} score={getScore(sf1)} />
          </div>
          <div style={{ height: UNIT * 8, display: 'flex', alignItems: 'center' }}>
            <BracketCard match={sf2} score={getScore(sf2)} />
          </div>
        </div>

        <Connector pairs={1} slotH={UNIT * 8} />

        {/* Final + 3rd place */}
        <div style={{ width: CARD_W, flexShrink: 0, height: totalH, position: 'relative' }}>
          {/* Final: centered at UNIT*8 from top (= 50% of totalH) */}
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
            <div className="text-amber-400 text-xs font-bold text-center mb-1">🏆 決勝</div>
            <BracketCard match={final_} score={getScore(final_)} />
          </div>
          {/* 3rd place: at UNIT*12 (aligned with SF_02 center) */}
          <div style={{ position: 'absolute', top: UNIT * 12, transform: 'translateY(-50%)', width: '100%' }}>
            <div className="text-gray-500 text-xs text-center mb-1">3位決定戦</div>
            <BracketCard match={third} score={getScore(third)} />
          </div>
        </div>

      </div>
    </div>
  );
};
