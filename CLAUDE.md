# CLAUDE.md — プロジェクトコンテキスト

## プロジェクト概要

FIFA W杯 2026 の全試合スケジュール・放送局情報をまとめたウェブアプリ。
個人開発、本番運用中。

**本番URL:** https://wcup-schedule-webapp.vercel.app/
**GitHub:** https://github.com/Jirouken/wcup-schedule-webapp

## 技術スタック

- React 19 + TypeScript + Vite + Tailwind CSS v3
- Vercel（masterブランチpush → 自動デプロイ）
- GitHub Actions（cron */15 でスコア/順位を自動更新）
- football-data.org API v4（無料プラン: 10req/min）

## セキュリティ制約（厳守）

**APIキー `FOOTBALL_DATA_API_KEY` はGitHub Secretsにのみ保存。**
コードファイル・設定ファイル・コミットログのいずれにも絶対に書かない。
`scripts/fetch-scores.mjs` は `process.env.FOOTBALL_DATA_API_KEY` で受け取る。

## ディレクトリ構成

```
src/
  data/matches.ts         # 全試合データ（手動管理）
  types/match.ts          # Match型定義
  hooks/
    useWatchList.ts       # ウォッチリスト（LocalStorage）
    useScores.ts          # scores.json読み込み・マッチング
    useStandings.ts       # standings.json読み込み（5分ごと更新）
  components/
    MatchCard.tsx         # 試合カード（スコア表示含む）
    MatchList.tsx         # グループ別／日付別リスト
    WatchList.tsx         # ウォッチリストタブ
    StandingsPanel.tsx    # 順位表（大会前は0統計で表示）
    FilterPanel.tsx       # フィルター（デスクトップサイドバー＋モバイルドロワー）
    Header.tsx
    BroadcastInfoBanner.tsx
  App.tsx                 # タブ管理（matches / watchlist / standings）

public/
  scores.json             # GitHub Actionsが自動更新（初期値: null/[]）
  standings.json          # GitHub Actionsが自動更新（初期値: null/{}）

scripts/
  fetch-scores.mjs        # APIフェッチスクリプト（Node.js ESM）

.github/workflows/
  update-scores.yml       # GitHub Actions定義
```

## 試合データ（matches.ts）の構造

```typescript
interface Match {
  id: string;
  phase: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final';
  group?: string;         // グループステージのみ（'A'〜'L'）
  date: string;           // JST: 'YYYY-MM-DD'
  time: string;           // JST: 'HH:MM'
  home: string;           // 日本語チーム名 or "R32[1] 勝者" 等のTBD文字列
  away: string;
  venue?: string;
  city?: string;
  broadcast: Broadcaster[];
  isJapan: boolean;
  note?: string;
  isTBD?: boolean;
  matchNumber?: string;   // '[1]'〜'[16]' / '[A]'〜'[H]' / '〈I〉'〜'〈IV〉'
}
```

## スコアマッチングのロジック

- **グループステージ:** `date + homeJa + awayJa` で照合
- **ノックアウトステージ:** `date + time` で照合（チーム名がTBDのため）

## APIレスポンス注意点

- `TIMED` ステータスは `SCHEDULED` と同義 → fetch-scores.mjs で正規化済み
- standings APIの `s.group` は `"GROUP_A"` 形式 → `replace('GROUP_', '')` でキーに変換

## ノックアウトステージ番号体系

| フェーズ | 番号 |
|---|---|
| R32（16試合） | [1]〜[16] |
| R16（8試合） | [A]〜[H] |
| QF（4試合） | 〈I〉〈II〉〈III〉〈IV〉 |
| SF・決勝・3位決定戦 | 番号なし |

## 実装済み機能 vs 今後の予定

### 実装済み（フェーズ1）

- 全試合一覧（グループ別／日付別、フィルター）
- ウォッチリスト（LocalStorage、URLシェア）
- R32対戦カード・日時（Wikipedia情報で正確に修正済み）
- 試合番号表示
- 3位通過候補グループ表示（例：「3位通過（A/B/C/D/F）」）
- スコア自動更新（GitHub Actions + football-data.org）
- グループ順位表タブ（大会前は0統計でチーム表示）

### 未実装（フェーズ2 — グループステージ終了後）

- R32 TBD → 確定チームへの自動書き換え
- 3位通過チームの選出・マッピングロジック
- R16以降ブラケットの自動更新

### 未実装（フェーズ3 — 任意）

- トーナメントシミュレーション機能
- PWA化・プッシュ通知
