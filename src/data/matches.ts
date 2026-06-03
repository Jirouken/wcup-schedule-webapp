import type { Match } from '../types/match';

// 放送局注記: 日本代表戦は公式発表済み。その他の試合のNHK総合/日テレ/フジ割り当ては
// 公式発表に基づくもので、未発表分は NHK BSP4K + DAZN をデフォルトとしています。
// 出典: Goal.com Japan / Wikipedia / ABEMA Times (2026年6月時点)

export const matches: Match[] = [
  // ===== グループA（メキシコ・南アフリカ・韓国・チェコ）=====
  { id: 'A1', phase: 'group', group: 'A', date: '2026-06-12', time: '04:00', home: 'メキシコ', away: '南アフリカ', city: 'メキシコシティ（墨）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, note: '開幕戦' },
  { id: 'A2', phase: 'group', group: 'A', date: '2026-06-12', time: '11:00', home: '韓国', away: 'チェコ', city: 'グアダラハラ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'A3', phase: 'group', group: 'A', date: '2026-06-19', time: '01:00', home: 'チェコ', away: '南アフリカ', city: 'アトランタ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'A4', phase: 'group', group: 'A', date: '2026-06-19', time: '10:00', home: 'メキシコ', away: '韓国', city: 'グアダラハラ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'A5', phase: 'group', group: 'A', date: '2026-06-25', time: '10:00', home: '南アフリカ', away: '韓国', city: 'モンテレイ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'A6', phase: 'group', group: 'A', date: '2026-06-25', time: '10:00', home: 'チェコ', away: 'メキシコ', city: 'メキシコシティ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループB（カナダ・ボスニア・カタール・スイス）=====
  { id: 'B1', phase: 'group', group: 'B', date: '2026-06-13', time: '04:00', home: 'カナダ', away: 'ボスニア・ヘルツェゴビナ', city: 'トロント（加）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'B2', phase: 'group', group: 'B', date: '2026-06-14', time: '04:00', home: 'カタール', away: 'スイス', city: 'サンフランシスコ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'B3', phase: 'group', group: 'B', date: '2026-06-19', time: '04:00', home: 'スイス', away: 'ボスニア・ヘルツェゴビナ', city: 'ロサンゼルス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'B4', phase: 'group', group: 'B', date: '2026-06-19', time: '07:00', home: 'カナダ', away: 'カタール', city: 'バンクーバー（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'B5', phase: 'group', group: 'B', date: '2026-06-25', time: '04:00', home: 'スイス', away: 'カナダ', city: 'バンクーバー（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'B6', phase: 'group', group: 'B', date: '2026-06-25', time: '04:00', home: 'ボスニア・ヘルツェゴビナ', away: 'カタール', city: 'シアトル（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループC（ブラジル・モロッコ・ハイチ・スコットランド）=====
  { id: 'C1', phase: 'group', group: 'C', date: '2026-06-14', time: '07:00', home: 'ブラジル', away: 'モロッコ', city: 'ニューヨーク（米）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'C2', phase: 'group', group: 'C', date: '2026-06-14', time: '10:00', home: 'ハイチ', away: 'スコットランド', city: 'ボストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'C3', phase: 'group', group: 'C', date: '2026-06-20', time: '07:00', home: 'スコットランド', away: 'モロッコ', city: 'ボストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'C4', phase: 'group', group: 'C', date: '2026-06-20', time: '10:00', home: 'ブラジル', away: 'ハイチ', city: 'フィラデルフィア（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'C5', phase: 'group', group: 'C', date: '2026-06-25', time: '07:00', home: 'スコットランド', away: 'ブラジル', city: 'マイアミ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'C6', phase: 'group', group: 'C', date: '2026-06-25', time: '07:00', home: 'モロッコ', away: 'ハイチ', city: 'アトランタ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループD（アメリカ・パラグアイ・オーストラリア・トルコ）=====
  { id: 'D1', phase: 'group', group: 'D', date: '2026-06-13', time: '10:00', home: 'アメリカ', away: 'パラグアイ', city: 'ロサンゼルス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'D2', phase: 'group', group: 'D', date: '2026-06-14', time: '13:00', home: 'オーストラリア', away: 'トルコ', city: 'バンクーバー（加）', broadcast: ['日本テレビ', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'D3', phase: 'group', group: 'D', date: '2026-06-20', time: '04:00', home: 'アメリカ', away: 'オーストラリア', city: 'シアトル（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'D4', phase: 'group', group: 'D', date: '2026-06-20', time: '13:00', home: 'トルコ', away: 'パラグアイ', city: 'サンフランシスコ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'D5', phase: 'group', group: 'D', date: '2026-06-26', time: '11:00', home: 'トルコ', away: 'アメリカ', city: 'ロサンゼルス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'D6', phase: 'group', group: 'D', date: '2026-06-26', time: '11:00', home: 'パラグアイ', away: 'オーストラリア', city: 'サンフランシスコ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループE（ドイツ・キュラソー・コートジボワール・エクアドル）=====
  { id: 'E1', phase: 'group', group: 'E', date: '2026-06-15', time: '02:00', home: 'ドイツ', away: 'キュラソー', city: 'ヒューストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'E2', phase: 'group', group: 'E', date: '2026-06-15', time: '08:00', home: 'コートジボワール', away: 'エクアドル', city: 'フィラデルフィア（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'E3', phase: 'group', group: 'E', date: '2026-06-21', time: '05:00', home: 'ドイツ', away: 'コートジボワール', city: 'トロント（加）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'E4', phase: 'group', group: 'E', date: '2026-06-21', time: '09:00', home: 'エクアドル', away: 'キュラソー', city: 'カンザスシティ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'E5', phase: 'group', group: 'E', date: '2026-06-26', time: '05:00', home: 'キュラソー', away: 'コートジボワール', city: 'フィラデルフィア（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'E6', phase: 'group', group: 'E', date: '2026-06-26', time: '05:00', home: 'エクアドル', away: 'ドイツ', city: 'ニューヨーク（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループF（オランダ・日本・スウェーデン・チュニジア）=====
  { id: 'F1', phase: 'group', group: 'F', date: '2026-06-15', time: '05:00', home: 'オランダ', away: '日本', venue: 'ダラス・スタジアム', city: 'ダラス（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: true },
  { id: 'F2', phase: 'group', group: 'F', date: '2026-06-15', time: '11:00', home: 'スウェーデン', away: 'チュニジア', city: 'モンテレイ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'F3', phase: 'group', group: 'F', date: '2026-06-21', time: '02:00', home: 'オランダ', away: 'スウェーデン', city: 'ヒューストン（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'F4', phase: 'group', group: 'F', date: '2026-06-21', time: '13:00', home: 'チュニジア', away: '日本', venue: 'エスタディオ・モンテレー', city: 'モンテレイ（墨）', broadcast: ['日本テレビ', 'NHK BS', 'NHK BSP4K', 'DAZN'], isJapan: true },
  { id: 'F5', phase: 'group', group: 'F', date: '2026-06-26', time: '08:00', home: '日本', away: 'スウェーデン', venue: 'ダラス・スタジアム', city: 'ダラス（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: true },
  { id: 'F6', phase: 'group', group: 'F', date: '2026-06-26', time: '08:00', home: 'チュニジア', away: 'オランダ', city: 'カンザスシティ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループG（ベルギー・エジプト・イラン・ニュージーランド）=====
  { id: 'G1', phase: 'group', group: 'G', date: '2026-06-16', time: '04:00', home: 'ベルギー', away: 'エジプト', city: 'シアトル（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'G2', phase: 'group', group: 'G', date: '2026-06-16', time: '10:00', home: 'イラン', away: 'ニュージーランド', city: 'ロサンゼルス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'G3', phase: 'group', group: 'G', date: '2026-06-22', time: '04:00', home: 'ベルギー', away: 'イラン', city: 'ロサンゼルス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'G4', phase: 'group', group: 'G', date: '2026-06-22', time: '10:00', home: 'ニュージーランド', away: 'エジプト', city: 'バンクーバー（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'G5', phase: 'group', group: 'G', date: '2026-06-27', time: '12:00', home: 'エジプト', away: 'イラン', city: 'シアトル（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'G6', phase: 'group', group: 'G', date: '2026-06-27', time: '12:00', home: 'ニュージーランド', away: 'ベルギー', city: 'バンクーバー（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループH（スペイン・カーボベルデ・サウジアラビア・ウルグアイ）=====
  { id: 'H1', phase: 'group', group: 'H', date: '2026-06-16', time: '01:00', home: 'スペイン', away: 'カーボベルデ', city: 'アトランタ（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'H2', phase: 'group', group: 'H', date: '2026-06-16', time: '07:00', home: 'サウジアラビア', away: 'ウルグアイ', city: 'マイアミ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'H3', phase: 'group', group: 'H', date: '2026-06-22', time: '01:00', home: 'スペイン', away: 'サウジアラビア', city: 'アトランタ（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'H4', phase: 'group', group: 'H', date: '2026-06-22', time: '07:00', home: 'ウルグアイ', away: 'カーボベルデ', city: 'マイアミ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'H5', phase: 'group', group: 'H', date: '2026-06-27', time: '09:00', home: 'カーボベルデ', away: 'サウジアラビア', city: 'ヒューストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'H6', phase: 'group', group: 'H', date: '2026-06-27', time: '09:00', home: 'ウルグアイ', away: 'スペイン', city: 'グアダラハラ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループI（フランス・セネガル・イラク・ノルウェー）=====
  { id: 'I1', phase: 'group', group: 'I', date: '2026-06-17', time: '04:00', home: 'フランス', away: 'セネガル', city: 'ニューヨーク（米）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'I2', phase: 'group', group: 'I', date: '2026-06-17', time: '07:00', home: 'イラク', away: 'ノルウェー', city: 'ボストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'I3', phase: 'group', group: 'I', date: '2026-06-23', time: '06:00', home: 'フランス', away: 'イラク', city: 'フィラデルフィア（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'I4', phase: 'group', group: 'I', date: '2026-06-23', time: '09:00', home: 'ノルウェー', away: 'セネガル', city: 'ニューヨーク（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'I5', phase: 'group', group: 'I', date: '2026-06-27', time: '04:00', home: 'ノルウェー', away: 'フランス', city: 'ボストン（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'I6', phase: 'group', group: 'I', date: '2026-06-27', time: '04:00', home: 'セネガル', away: 'イラク', city: 'トロント（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループJ（アルゼンチン・アルジェリア・オーストリア・ヨルダン）=====
  { id: 'J1', phase: 'group', group: 'J', date: '2026-06-17', time: '10:00', home: 'アルゼンチン', away: 'アルジェリア', city: 'カンザスシティ（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'J2', phase: 'group', group: 'J', date: '2026-06-17', time: '13:00', home: 'オーストリア', away: 'ヨルダン', city: 'サンフランシスコ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'J3', phase: 'group', group: 'J', date: '2026-06-23', time: '02:00', home: 'アルゼンチン', away: 'オーストリア', city: 'ダラス（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'J4', phase: 'group', group: 'J', date: '2026-06-23', time: '12:00', home: 'ヨルダン', away: 'アルジェリア', city: 'サンフランシスコ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'J5', phase: 'group', group: 'J', date: '2026-06-28', time: '11:00', home: 'アルジェリア', away: 'オーストリア', city: 'カンザスシティ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'J6', phase: 'group', group: 'J', date: '2026-06-28', time: '11:00', home: 'ヨルダン', away: 'アルゼンチン', city: 'ダラス（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループK（ポルトガル・DRコンゴ・ウズベキスタン・コロンビア）=====
  { id: 'K1', phase: 'group', group: 'K', date: '2026-06-18', time: '02:00', home: 'ポルトガル', away: 'DRコンゴ', city: 'ヒューストン（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'K2', phase: 'group', group: 'K', date: '2026-06-18', time: '11:00', home: 'ウズベキスタン', away: 'コロンビア', city: 'メキシコシティ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'K3', phase: 'group', group: 'K', date: '2026-06-24', time: '02:00', home: 'ポルトガル', away: 'ウズベキスタン', city: 'ヒューストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'K4', phase: 'group', group: 'K', date: '2026-06-24', time: '11:00', home: 'コロンビア', away: 'DRコンゴ', city: 'グアダラハラ（墨）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'K5', phase: 'group', group: 'K', date: '2026-06-28', time: '08:30', home: 'コロンビア', away: 'ポルトガル', city: 'マイアミ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'K6', phase: 'group', group: 'K', date: '2026-06-28', time: '08:30', home: 'DRコンゴ', away: 'ウズベキスタン', city: 'アトランタ（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== グループL（イングランド・クロアチア・ガーナ・パナマ）=====
  { id: 'L1', phase: 'group', group: 'L', date: '2026-06-18', time: '05:00', home: 'イングランド', away: 'クロアチア', city: 'ダラス（米）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'L2', phase: 'group', group: 'L', date: '2026-06-18', time: '08:00', home: 'ガーナ', away: 'パナマ', city: 'トロント（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'L3', phase: 'group', group: 'L', date: '2026-06-24', time: '05:00', home: 'イングランド', away: 'ガーナ', city: 'ボストン（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'L4', phase: 'group', group: 'L', date: '2026-06-24', time: '08:00', home: 'パナマ', away: 'クロアチア', city: 'トロント（加）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'L5', phase: 'group', group: 'L', date: '2026-06-28', time: '06:00', home: 'パナマ', away: 'イングランド', city: 'ニューヨーク（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },
  { id: 'L6', phase: 'group', group: 'L', date: '2026-06-28', time: '06:00', home: 'クロアチア', away: 'ガーナ', city: 'フィラデルフィア（米）', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false },

  // ===== ラウンド32（1回戦）=====
  { id: 'R32_01', phase: 'round32', date: '2026-06-29', time: '02:00', home: 'グループC 2位', away: 'グループF 1位', city: 'モンテレイ（墨）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: true, isTBD: true, note: '日本の決勝T1回戦（1位通過時）' },
  { id: 'R32_02', phase: 'round32', date: '2026-06-29', time: '10:00', home: 'グループC 1位', away: 'グループF 2位', city: 'ヒューストン（米）', broadcast: ['フジテレビ', 'NHK BSP4K', 'DAZN'], isJapan: true, isTBD: true, note: '日本の決勝T1回戦（2位通過時）' },
  { id: 'R32_03', phase: 'round32', date: '2026-06-29', time: '05:00', home: 'グループA 1位', away: 'グループB 2位', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_04', phase: 'round32', date: '2026-06-30', time: '02:00', home: 'グループD 1位', away: 'グループE 2位', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_05', phase: 'round32', date: '2026-06-30', time: '05:00', home: 'グループA 2位', away: 'グループB 1位', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_06', phase: 'round32', date: '2026-06-30', time: '09:00', home: 'グループD 2位', away: 'グループE 1位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_07', phase: 'round32', date: '2026-07-01', time: '02:00', home: 'グループG 1位', away: 'グループH 2位', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_08', phase: 'round32', date: '2026-07-01', time: '05:00', home: 'グループG 2位', away: 'グループH 1位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_09', phase: 'round32', date: '2026-07-02', time: '02:00', home: 'グループI 1位', away: 'グループJ 2位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_10', phase: 'round32', date: '2026-07-02', time: '05:00', home: 'グループI 2位', away: 'グループJ 1位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_11', phase: 'round32', date: '2026-07-02', time: '09:00', home: 'グループK 1位', away: 'グループL 2位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_12', phase: 'round32', date: '2026-07-03', time: '02:00', home: 'グループK 2位', away: 'グループL 1位', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_13', phase: 'round32', date: '2026-07-03', time: '05:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_14', phase: 'round32', date: '2026-07-04', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_15', phase: 'round32', date: '2026-07-04', time: '05:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R32_16', phase: 'round32', date: '2026-07-05', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },

  // ===== ラウンド16（2回戦）=====
  { id: 'R16_01', phase: 'round16', date: '2026-07-07', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_02', phase: 'round16', date: '2026-07-07', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_03', phase: 'round16', date: '2026-07-08', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_04', phase: 'round16', date: '2026-07-08', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_05', phase: 'round16', date: '2026-07-09', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_06', phase: 'round16', date: '2026-07-09', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_07', phase: 'round16', date: '2026-07-10', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'R16_08', phase: 'round16', date: '2026-07-10', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },

  // ===== 準々決勝 =====
  { id: 'QF_01', phase: 'quarter', date: '2026-07-11', time: '01:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'QF_02', phase: 'quarter', date: '2026-07-11', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'QF_03', phase: 'quarter', date: '2026-07-12', time: '02:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'QF_04', phase: 'quarter', date: '2026-07-12', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },

  // ===== 準決勝 =====
  { id: 'SF_01', phase: 'semi', date: '2026-07-15', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
  { id: 'SF_02', phase: 'semi', date: '2026-07-16', time: '09:00', home: 'TBD', away: 'TBD', city: '', broadcast: ['日本テレビ', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },

  // ===== 3位決定戦 =====
  { id: 'THIRD', phase: 'third', date: '2026-07-18', time: '09:00', home: 'TBD', away: 'TBD', city: 'マイアミ（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },

  // ===== 決勝 =====
  { id: 'FINAL', phase: 'final', date: '2026-07-19', time: '09:00', home: 'TBD', away: 'TBD', venue: 'ニューアークスタジアム', city: 'ニューヨーク（米）', broadcast: ['NHK総合', 'NHK BSP4K', 'DAZN'], isJapan: false, isTBD: true },
];
