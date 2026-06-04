export type Broadcaster = 'NHK総合' | 'NHK BS' | 'NHK BSP4K' | '日本テレビ' | 'フジテレビ' | 'DAZN';
export type Phase = 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'third' | 'final';

export interface Match {
  id: string;
  phase: Phase;
  group?: string;
  date: string;
  time: string;
  home: string;
  away: string;
  venue?: string;
  city?: string;
  broadcast: Broadcaster[];
  isJapan: boolean;
  note?: string;
  isTBD?: boolean;
  matchNumber?: string;
}
