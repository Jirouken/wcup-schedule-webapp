import { writeFileSync } from 'fs';

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const API_BASE = 'https://api.football-data.org/v4';

const EN_TO_JA = {
  'Mexico': 'メキシコ', 'South Africa': '南アフリカ', 'Korea Republic': '韓国',
  'Czech Republic': 'チェコ', 'Czechia': 'チェコ',
  'Canada': 'カナダ', 'Bosnia-Herzegovina': 'ボスニア・ヘルツェゴビナ',
  'Bosnia and Herzegovina': 'ボスニア・ヘルツェゴビナ', 'Qatar': 'カタール', 'Switzerland': 'スイス',
  'Brazil': 'ブラジル', 'Morocco': 'モロッコ', 'Haiti': 'ハイチ', 'Scotland': 'スコットランド',
  'USA': 'アメリカ', 'United States': 'アメリカ', 'Paraguay': 'パラグアイ',
  'Australia': 'オーストラリア', 'Turkey': 'トルコ', 'Türkiye': 'トルコ',
  'Germany': 'ドイツ', 'Curaçao': 'キュラソー', 'Curacao': 'キュラソー',
  "Côte d'Ivoire": 'コートジボワール', 'Ivory Coast': 'コートジボワール', 'Ecuador': 'エクアドル',
  'Netherlands': 'オランダ', 'Japan': '日本', 'Sweden': 'スウェーデン', 'Tunisia': 'チュニジア',
  'Belgium': 'ベルギー', 'Egypt': 'エジプト', 'Iran': 'イラン', 'New Zealand': 'ニュージーランド',
  'Spain': 'スペイン', 'Cape Verde': 'カーボベルデ', 'Saudi Arabia': 'サウジアラビア', 'Uruguay': 'ウルグアイ',
  'France': 'フランス', 'Senegal': 'セネガル', 'Iraq': 'イラク', 'Norway': 'ノルウェー',
  'Argentina': 'アルゼンチン', 'Algeria': 'アルジェリア', 'Austria': 'オーストリア', 'Jordan': 'ヨルダン',
  'Portugal': 'ポルトガル', 'DR Congo': 'DRコンゴ', 'Congo DR': 'DRコンゴ',
  'Uzbekistan': 'ウズベキスタン', 'Colombia': 'コロンビア',
  'England': 'イングランド', 'Croatia': 'クロアチア', 'Ghana': 'ガーナ', 'Panama': 'パナマ',
};

function toJST(utcDateStr) {
  const utc = new Date(utcDateStr);
  const jst = new Date(utc.getTime() + 9 * 60 * 60 * 1000);
  return {
    date: jst.toISOString().slice(0, 10),
    time: `${String(jst.getUTCHours()).padStart(2, '0')}:${String(jst.getUTCMinutes()).padStart(2, '0')}`,
  };
}

function toJa(name) { return EN_TO_JA[name] || name; }

async function get(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'X-Auth-Token': API_KEY } });
  const remaining = res.headers.get('X-Requests-Available-Minute');
  console.log(`${path} → ${res.status} (remaining: ${remaining})`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  if (!API_KEY) throw new Error('FOOTBALL_DATA_API_KEY is not set');

  // 1. スコア取得
  const { matches } = await get('/competitions/WC/matches');
  const scores = matches.map(m => {
    const { date, time } = toJST(m.utcDate);
    return {
      date, time,
      homeJa: toJa(m.homeTeam.name),
      awayJa: toJa(m.awayTeam.name),
      // TIMEDはSCHEDULEDと同義
      status: m.status === 'TIMED' ? 'SCHEDULED' : m.status,
      homeScore: m.score.fullTime.home,
      awayScore: m.score.fullTime.away,
    };
  });
  writeFileSync('public/scores.json', JSON.stringify({ lastUpdated: new Date().toISOString(), matches: scores }, null, 2));
  console.log(`scores.json: ${scores.length} matches`);

  // 2. 順位表取得
  const { standings } = await get('/competitions/WC/standings');
  const groups = {};
  for (const s of standings) {
    if (s.type !== 'TOTAL') continue;
    const groupKey = s.group?.replace('GROUP_', '') ?? s.stage;
    groups[groupKey] = s.table.map(row => ({
      position: row.position,
      teamJa: toJa(row.team.name),
      played: row.playedGames,
      won: row.won,
      draw: row.draw,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalDifference,
      points: row.points,
    }));
  }
  writeFileSync('public/standings.json', JSON.stringify({ lastUpdated: new Date().toISOString(), groups }, null, 2));
  console.log(`standings.json: ${Object.keys(groups).length} groups`);
}

main().catch(err => { console.error(err); process.exit(1); });
