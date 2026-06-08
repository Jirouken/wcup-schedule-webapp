import { useState } from 'react';
import { matches as allMatches } from '../data/matches';

export interface SimState {
  groupRankings: Record<string, string[]>;
  thirdPlaceAssignments: Record<string, string>;
  knockoutWinners: Record<string, string>;
}

const STORAGE_KEY = 'wcup_sim_v1';
const EMPTY: SimState = { groupRankings: {}, thirdPlaceAssignments: {}, knockoutWinners: {} };

export const INITIAL_GROUPS: Record<string, string[]> = (() => {
  const g: Record<string, Set<string>> = {};
  for (const m of allMatches) {
    if (m.phase !== 'group' || !m.group) continue;
    if (!g[m.group]) g[m.group] = new Set();
    g[m.group].add(m.home);
    g[m.group].add(m.away);
  }
  return Object.fromEntries(Object.entries(g).map(([k, v]) => [k, [...v]]));
})();

export const NUM_TO_ID: Record<string, string> = Object.fromEntries(
  allMatches.filter(m => m.matchNumber).map(m => [m.matchNumber!, m.id])
);

export const THIRD_PLACE_SLOTS = [
  { matchId: 'R32_04', matchNum: '[3]',  groups: ['A','B','C','D','F'] },
  { matchId: 'R32_06', matchNum: '[6]',  groups: ['C','D','F','G','H'] },
  { matchId: 'R32_07', matchNum: '[7]',  groups: ['C','E','F','H','I'] },
  { matchId: 'R32_08', matchNum: '[8]',  groups: ['E','H','I','J','K'] },
  { matchId: 'R32_09', matchNum: '[9]',  groups: ['A','E','H','I','J'] },
  { matchId: 'R32_10', matchNum: '[10]', groups: ['B','E','F','I','J'] },
  { matchId: 'R32_13', matchNum: '[13]', groups: ['E','F','G','I','J'] },
  { matchId: 'R32_16', matchNum: '[16]', groups: ['D','E','I','J','L'] },
] as const;

// When a match winner changes, these downstream matches must be invalidated
const DOWNSTREAM: Record<string, string[]> = {
  R32_03: ['R16_01','QF_01','SF_01','FINAL','THIRD'],
  R32_01: ['R16_01','QF_01','SF_01','FINAL','THIRD'],
  R32_04: ['R16_02','QF_01','SF_01','FINAL','THIRD'],
  R32_06: ['R16_02','QF_01','SF_01','FINAL','THIRD'],
  R32_11: ['R16_05','QF_02','SF_01','FINAL','THIRD'],
  R32_12: ['R16_05','QF_02','SF_01','FINAL','THIRD'],
  R32_09: ['R16_06','QF_02','SF_01','FINAL','THIRD'],
  R32_10: ['R16_06','QF_02','SF_01','FINAL','THIRD'],
  R32_02: ['R16_03','QF_03','SF_02','FINAL','THIRD'],
  R32_05: ['R16_03','QF_03','SF_02','FINAL','THIRD'],
  R32_07: ['R16_04','QF_03','SF_02','FINAL','THIRD'],
  R32_08: ['R16_04','QF_03','SF_02','FINAL','THIRD'],
  R32_14: ['R16_07','QF_04','SF_02','FINAL','THIRD'],
  R32_15: ['R16_07','QF_04','SF_02','FINAL','THIRD'],
  R32_13: ['R16_08','QF_04','SF_02','FINAL','THIRD'],
  R32_16: ['R16_08','QF_04','SF_02','FINAL','THIRD'],
  R16_01: ['QF_01','SF_01','FINAL','THIRD'],
  R16_02: ['QF_01','SF_01','FINAL','THIRD'],
  R16_05: ['QF_02','SF_01','FINAL','THIRD'],
  R16_06: ['QF_02','SF_01','FINAL','THIRD'],
  R16_03: ['QF_03','SF_02','FINAL','THIRD'],
  R16_04: ['QF_03','SF_02','FINAL','THIRD'],
  R16_07: ['QF_04','SF_02','FINAL','THIRD'],
  R16_08: ['QF_04','SF_02','FINAL','THIRD'],
  QF_01:  ['SF_01','FINAL','THIRD'],
  QF_02:  ['SF_01','FINAL','THIRD'],
  QF_03:  ['SF_02','FINAL','THIRD'],
  QF_04:  ['SF_02','FINAL','THIRD'],
  SF_01:  ['FINAL','THIRD'],
  SF_02:  ['FINAL','THIRD'],
};

export function resolveTeam(
  desc: string,
  matchId: string,
  isHome: boolean,
  state: SimState,
): string {
  const gm = desc.match(/グループ([A-L]) (\d)位/);
  if (gm) {
    const teams = state.groupRankings[gm[1]];
    if (!teams) return desc;
    return teams[parseInt(gm[2]) - 1] ?? desc;
  }
  if (desc.startsWith('3位通過')) return state.thirdPlaceAssignments[matchId] ?? '(3位枠)';

  const r32 = desc.match(/R32\[(\d+)\] 勝者/);
  if (r32) {
    const id = NUM_TO_ID[`[${r32[1]}]`];
    return (id && state.knockoutWinners[id]) || `[${r32[1]}]勝者`;
  }
  const r16 = desc.match(/R16\[([A-H])\] 勝者/);
  if (r16) {
    const id = NUM_TO_ID[`[${r16[1]}]`];
    return (id && state.knockoutWinners[id]) || `[${r16[1]}]勝者`;
  }
  const qf = desc.match(/QF(〈[^〉]+〉) 勝者/);
  if (qf) {
    const id = NUM_TO_ID[qf[1]];
    return (id && state.knockoutWinners[id]) || `${qf[1]}勝者`;
  }
  if (desc === '準決勝勝者') {
    const sfId = isHome ? 'SF_01' : 'SF_02';
    return state.knockoutWinners[sfId] || (isHome ? 'SF1勝者' : 'SF2勝者');
  }
  if (desc === '準決勝敗者') {
    const sfId = isHome ? 'SF_01' : 'SF_02';
    const w = state.knockoutWinners[sfId];
    if (w) {
      const sf = allMatches.find(m => m.id === sfId)!;
      const h = resolveTeam(sf.home, sfId, true, state);
      const a = resolveTeam(sf.away, sfId, false, state);
      return w === h ? a : h;
    }
    return isHome ? 'SF1敗者' : 'SF2敗者';
  }
  return desc;
}

export function isResolved(name: string): boolean {
  return !name.match(/勝者|敗者|枠|グループ[A-L]/);
}

export function useSimulation() {
  const [state, setState] = useState<SimState>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? EMPTY; }
    catch { return EMPTY; }
  });

  function persist(next: SimState) {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return {
    state,
    setGroupRanking(group: string, teams: string[]) {
      persist({ ...state, groupRankings: { ...state.groupRankings, [group]: teams } });
    },
    setThirdPlace(matchId: string, team: string) {
      persist({ ...state, thirdPlaceAssignments: { ...state.thirdPlaceAssignments, [matchId]: team } });
    },
    setWinner(matchId: string, winner: string) {
      const winners = { ...state.knockoutWinners, [matchId]: winner };
      for (const id of DOWNSTREAM[matchId] ?? []) delete winners[id];
      persist({ ...state, knockoutWinners: winners });
    },
    reset() { persist(EMPTY); },
  };
}
