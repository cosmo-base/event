// data/CMrockets.ts
import Papa from 'papaparse';

export interface RocketStats {
  power: number;
  technology: number;
  history: number;
  ace: number;
  challenge: number;
  individuality: number;
  future: number;
  trust: number;
}

export interface Rocket {
  slug: string;
  name: string;
  reading: string;
  emoji: string;
  catchCopy: string;
  intro: string;
  country: string;
  operator: string;
  manufacturer: string;
  status: "active" | "retired" | "development";
  category: string;
  type: string;
  lineage: string;
  firstFlight: string;
  lastFlight: string;
  stages: string;
  propulsion: string;
  propellant: string;
  launchSite: string;
  height: string;
  diameter: string;
  mass: string;
  payload: string;
  missions: string;
  launchRecord: string;
  successFailure: string;
  techFeatures: string;
  keyPerson: string;
  rivals: string;
  diagTags: string;
  dataReliability: string;
  notes: string;
  appearance: number;
  stats: RocketStats;
  highlights: string[];
  story: {
    origin: string;
    struggle: string;
    today: string;
  };
  relatedRockets: string[];
  predecessors: string;
  successors: string;
  articleLinks: { title: string; url: string }[];
}

export interface Choice {
  text: string;
  score: Partial<RocketStats>;
}

export interface Question {
  id: number;
  title: string;
  choices: Choice[];
}

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQENBPEZ3ep1J54G09l7I-vPMaMC6wNxr55bXBsdAdj_xp6gy5ksoM27EyITCuGObi0Kzxbzu2HpLM1/pub?gid=0&single=true&output=csv";

function parseStatus(val: string): "active" | "retired" | "development" {
  if (!val) return "retired";
  if (val.includes("現役") || val.includes("運用中")) return "active";
  if (val.includes("開発中") || val.includes("計画")) return "development";
  return "retired";
}

export async function getRockets(): Promise<Rocket[]> {
  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const csvText = await res.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
        complete: (results) => {
          const rows = results.data as Record<string, string>[];

          const rockets: Rocket[] = rows
            .filter((row) => row['ロケット名']?.trim())
            .map((row) => {
              const reading = row['読み方']?.trim() || '';
              const slug = row['id']?.trim() || reading || row['ロケット名']?.trim() || '';

              const links: { title: string; url: string }[] = [];
              if (row['公式ページ']?.trim())
                links.push({ title: '公式ページ', url: row['公式ページ'].trim() });
              if (row['参考サイト①']?.trim())
                links.push({ title: '参考サイト①', url: row['参考サイト①'].trim() });
              if (row['参考サイト②']?.trim())
                links.push({ title: '参考サイト②', url: row['参考サイト②'].trim() });
              if (row['参考サイト③']?.trim())
                links.push({ title: '参考サイト③', url: row['参考サイト③'].trim() });

              return {
                slug,
                name: row['ロケット名']?.trim() || '',
                reading,
                emoji: '🚀',
                catchCopy: row['キャッチコピー']?.trim() || '',
                intro: row['一言紹介']?.trim() || '',
                country: row['国']?.trim() || '',
                operator: row['開発・運用主体']?.trim() || '',
                manufacturer: row['主な製造/主契約']?.trim() || '',
                status: parseStatus(row['現役/退役'] || ''),
                category: row['分類']?.trim() || '',
                type: row['種別']?.trim() || '',
                lineage: row['系列/位置づけ']?.trim() || '',
                firstFlight: row['初飛行年']?.trim() || '',
                lastFlight: row['最終飛行年']?.trim() || '',
                stages: row['段数']?.trim() || '',
                propulsion: row['推進方式']?.trim() || '',
                propellant: row['主な推進剤']?.trim() || '',
                launchSite: row['主な打上げ場所']?.trim() || '',
                height: row['高さ/全長(m)']?.trim() || '',
                diameter: row['直径(m)']?.trim() || '',
                mass: row['重量(t)']?.trim() || '',
                payload: row['打上げ能力・到達高度（代表値）']?.trim() || '',
                missions: row['代表ミッション/搭載衛星']?.trim() || '',
                launchRecord: row['打上げ実績（概略）']?.trim() || '',
                successFailure: row['成功/失敗の要点']?.trim() || '',
                techFeatures: row['技術的特徴']?.trim() || '',
                keyPerson: row['関連人物']?.trim() || '',
                rivals: row['ライバル/類似']?.trim() || '',
                diagTags: row['診断タグ']?.trim() || '',
                dataReliability: row['データ信頼度']?.trim() || '',
                notes: row['注記']?.trim() || '',
                appearance: parseFloat(row['出現係数'] || '1') || 1,
                stats: {
                  power:         parseInt(row['パワー']       || '0', 10) || 0,
                  technology:    parseInt(row['技術']         || '0', 10) || 0,
                  history:       parseInt(row['歴史']         || '0', 10) || 0,
                  ace:           parseInt(row['エース']       || '0', 10) || 0,
                  challenge:     parseInt(row['挑戦']         || '0', 10) || 0,
                  individuality: parseInt(row['個性']         || '0', 10) || 0,
                  future:        parseInt(row['未来']         || '0', 10) || 0,
                  trust:         parseInt(row['信頼（現在）'] || '0', 10) || 0,
                },
                highlights: [
                  row['推しポイント1'],
                  row['推しポイント2'],
                  row['推しポイント3'],
                ].map((s) => s?.trim() || '').filter(Boolean),
                story: {
                  origin:   row['誕生の背景']?.trim() || '',
                  struggle: row['苦労したこと/課題']?.trim() || '',
                  today:    row['象徴するエピソード']?.trim() || row['一言紹介']?.trim() || '',
                },
                relatedRockets: [],
                predecessors: row['前世代ロケット']?.trim() || '',
                successors: row['後継ロケット']?.trim() || '',
                articleLinks: links,
              } as Rocket;
            });

          const nameToSlug = new Map<string, string>();
          rockets.forEach((r) => nameToSlug.set(r.name, r.slug));

          const rowMap = new Map<string, Record<string, string>>();
          rows.forEach((row) => {
            const name = row['ロケット名']?.trim();
            if (name) rowMap.set(name, row);
          });

          rockets.forEach((r) => {
            const row = rowMap.get(r.name);
            if (!row) return;
            const related: string[] = [];
            [row['前世代ロケット'], row['後継ロケット']].forEach((field) => {
              if (!field?.trim() || field.trim() === 'なし') return;
              field.split(/[、,，]/).forEach((part) => {
                const s = nameToSlug.get(part.trim());
                if (s && !related.includes(s)) related.push(s);
              });
            });
            r.relatedRockets = related;
          });

          resolve(rockets);
        },
      });
    });
  } catch (err) {
    console.error('ロケットデータの取得に失敗しました:', err);
    return [];
  }
}

// Legacy static array kept for backward compatibility (empty — use getRockets() instead)
export const ROCKETS: Rocket[] = [];
