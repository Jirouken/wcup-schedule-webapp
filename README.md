# FIFA W杯 2026 放送ガイド

W杯2026の全試合スケジュール・放送局情報をまとめたウェブアプリ。
試合のウォッチリスト作成、スコア自動更新、グループ順位表に対応。

**本番サイト:** https://wcup-schedule-webapp.vercel.app/

## 主な機能

- **全試合一覧** — グループ別／日付別切り替え、フィルター（フェーズ・放送局・日本戦・ウォッチ済）
- **マイウォッチリスト** — 「見たい」ボタンでブックマーク（LocalStorage保存、URLシェア対応）
- **スコア自動更新** — GitHub Actions が15分ごとにfootball-data.org APIを叩き、結果をcommit→Vercel自動デプロイ
- **グループ順位表** — 12グループ全表示、大会前は0統計でチーム一覧表示

## 技術スタック

| 項目 | 内容 |
|---|---|
| フロントエンド | React 19 + TypeScript + Vite + Tailwind CSS v3 |
| ホスティング | Vercel（GitHubと連携、pushで自動デプロイ） |
| スコア更新 | GitHub Actions（cron: */15, football-data.org API v4） |
| データ永続化 | LocalStorage（ウォッチリスト）、public/scores.json・standings.json（スコア/順位） |

## 開発手順

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 本番ビルド
```

変更は `master` ブランチにpushするとVercelが自動デプロイ。

## スコア更新の仕組み

```
GitHub Actions (*/15 cron)
  └─ scripts/fetch-scores.mjs
       ├─ GET /competitions/WC/matches  → public/scores.json
       └─ GET /competitions/WC/standings → public/standings.json
            └─ git commit "[skip ci]" → push → Vercel deploy
```

APIキー `FOOTBALL_DATA_API_KEY` はGitHub Secretsにのみ保存。コードには絶対に書かない。

## 今後の実装予定

### フェーズ2（グループステージ終了後 〜 2026年7月上旬）

- [ ] **R32対戦カード自動確定** — グループ順位確定後、TBDだったR32のhome/awayを実際のチーム名に自動書き換え
- [ ] **3位通過チームの選出ロジック** — 12グループ中上位成績の8チームを特定し、どのポジションに入るか自動マッピング
- [ ] **R16以降のブラケット自動更新** — 試合結果に基づき、R16/QF/SFのTBDを順次埋めていく

### フェーズ3（任意）

- [ ] **シミュレーション機能** — 「もし○○が勝ったら」を仮定してトーナメント進行をシミュレート
- [ ] **プッシュ通知** — ウォッチリストの試合開始前に通知（PWA化が前提）
