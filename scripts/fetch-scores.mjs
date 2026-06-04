import { writeFileSync } from 'fs';

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const API_BASE = 'https://api.football-data.org/v4';

const EN_TO_JA = {
  // Group A
  'Mexico': 'メキシコ',
  'South Africa': '南アフリカ',
  'Korea Republic': '韓国',
  'Czech Republic': 'チェコ',
  'Czechia': 'チェコ',
  // Group B
  'Canada': 'カナダ',
  'Bosnia-Herzegovina': 'ボスニア・ヘルツェゴビナ',
  'Bosnia and Herzegovina': 'ボスニア・ヘルツェゴビナ',
  'Qatar': 'カタール',
  'Switzerland': 'スイス',
  // Group C
  'Brazil': 'ブラジル',
  'Morocco': 'モロッコ',
  'Haiti': 'ハイチ',
  'Scotland': 'スコットランド',
  // Group D
  'USA': 'アメリカ',
  'United States': 'アメリカ',
  'Paraguay': 'パラグアイ',
  'Australia': 'オーストラリア',
  'Turkey': 'トルコ',
  'Türkiye': 'トルコ',
  // Group E
  'Germany': 'ドイツ',
  'Curaçao': 'キュラソー',
  'Curacao': 'キュラソー',
  "Côte d'Ivoire": 'コートジボワール',
  'Ivory Coast': 'コートジボワール',
  'Ecuador': 'エクアドル',
  // Group F
  'Netherlands': 'オランダ',
  'Japan': '日本',
  'Sweden': 'スウェーデン',
  'Tunisia': 'チュニジア',
  // Group G
  'Belgium': 'ベルギー',
  'Egypt': 'エジプト',
  'Iran': 'イラン',
  'New Zealand': 'ニュージーランド',
  // Group H
  'Spain': 'スペイン',
  'Cape Verde': 'カーボベルデ',
  'Saudi Arabia': 'サウジアラビア',
  'Uruguay': 'ウルグアイ',
  // Group I
  'France': 'フランス',
  'Senegal': 'セネガル',
  'Iraq': 'イラク',
  'Norway': 'ノルウェー',
  // Group J
  'Argentina': 'アルゼンチン',
  'Algeria': 'アルジェリア',
  'Austria': 'オーストリア',
  'Jordan': 'ヨルダン',
  // Group K
  'Portugal': 'ポルトガル',
  'DR Congo': 'DRコンゴ',
  'Congo DR': 'DRコンゴ',
  'Uzbekistan': 'ウズベキスタン',
  'Colombia': 'コロンビア',
  // Group L
  'England': 'イングランド',
  'Croatia': 'クロアチア',
  'Ghana': 'ガーナ',
  'Panama': 'パナマ',
};

function toJST(utcDateStr) {
  const utc = new Date(utcDateStr);
  const jst = new Date(utc.getTime() + 9 * 60 * 60 * 1000);
  return {
    date: jst.toISOString().slice(0, 10),
    time: `${String(jst.getUTCHours()).padStart(2, '0')}:${String(jst.getUTCMinutes()).padStart(2, '0')}`,
  };
}

function toJa(name) {
  return EN_TO_JA[name] || name;
}

async function main() {
  if (!API_KEY) throw new Error('FOOTBALL_DATA_API_KEY is not set');

  const res = await fetch(`${API_BASE}/competitions/WC/matches`, {
    headers: { 'X-Auth-Token': API_KEY },
  });

  const remaining = res.headers.get('X-Requests-Available-Minute');
  console.log(`Rate limit: ${remaining} requests remaining this minute`);

  if (!res.ok) throw new Error(`API error: ${res.status} ${await res.text()}`);

  const { matches } = await res.json();

  const result = matches.map(m => {
    const { date, time } = toJST(m.utcDate);
    return {
      date,
      time,
      homeJa: toJa(m.homeTeam.name),
      awayJa: toJa(m.awayTeam.name),
      status: m.status,
      homeScore: m.score.fullTime.home,
      awayScore: m.score.fullTime.away,
    };
  });

  writeFileSync('public/scores.json', JSON.stringify({
    lastUpdated: new Date().toISOString(),
    matches: result,
  }, null, 2));

  console.log(`Wrote ${result.length} matches`);
}

main().catch(err => { console.error(err); process.exit(1); });
