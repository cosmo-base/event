// src/data/CMconstellation.ts
import Papa from 'papaparse';

export interface ConstellationStats {
  origin: number;
  energy: number;
  role: number;
  bond: number;
  form: number;
  mood: number;
  presence: number;
}

export interface Constellation {
  slug: string;
  name: string;
  englishName: string;
  emoji: string;
  season: string;
  visibility: string;
  catchCopy: string;
  highlights: string[];
  nameOrigin: string;
  rival: string;
  similar: string;
  relatedConstellations: string[];
  imageUrl: string;
  appearance: number;
  story: string;
  stats: ConstellationStats;
  articleLinks: { title: string; url: string }[];
}

export interface Choice {
  text: string;
  score: Partial<ConstellationStats>;
}

export interface Question {
  id: number;
  title: string;
  choices: Choice[];
}

export const QUESTIONS = [
  {
    id: 1,
    title: "新しいプロジェクトや趣味を始める時、あなたの原動力は？",
    choices: [
      { text: "まずは歴史やデータを徹底的に調べ上げ、勝算と計画を立ててから動きたい。", score: { origin: -2, energy: -1 } },
      { text: "「面白そう！」という直感のままに、前例のない未知の領域へ飛び込みたい。", score: { origin: 2, energy: 1 } }
    ]
  },
  {
    id: 2,
    title: "チームでの仕事や文化祭の準備。あなたが一番実力を発揮できるポジションは？",
    choices: [
      { text: "方向性をバシッと決めて、みんなの前に立ってプロジェクトを引っ張る役。", score: { role: -1, presence: -1 } },
      { text: "必要な機材の調達やタスクの整理など、プロジェクトを裏から確実に支える役。", score: { role: 1, presence: 1 } }
    ]
  },
  {
    id: 3,
    title: "初対面の人ばかりが集まる交流会やキックオフ。あなたの振る舞いは？",
    choices: [
      { text: "自分からフランクに声をかけ、いろんな背景を持つ人と広くワイワイ打ち解ける。", score: { bond: 2, mood: 1 } },
      { text: "たまたま隣になった数人と、お互いの価値観や専門分野について静かに深く語り合う。", score: { bond: -2, mood: -1 } }
    ]
  },
  {
    id: 4,
    title: "仕事や作業で使う「新しいツール」を導入するなら、どちらを選ぶ？",
    choices: [
      { text: "長く愛され、多くの人を助けてきた実績のある、信頼できる定番ツール。", score: { form: 1, origin: -1 } },
      { text: "まだ誰も使いこなしていない、最新鋭の機能を持った挑戦的なツール。", score: { form: -1, origin: 1 } }
    ]
  },
  {
    id: 5,
    title: "業務中に想定外のトラブル発生！チームが焦る中、あなたの行動は？",
    choices: [
      { text: "自ら率先して動き、その場の直感と判断力でスピーディに火消しに走る。", score: { energy: 1, role: -1 } },
      { text: "一歩引いて原因のデータを整理し、リーダーが正しい指示を出せるようサポートする。", score: { energy: -1, role: 1 } }
    ]
  },
  {
    id: 6,
    title: "大きな目標を達成した時、その成果をどうやって周りに共有する？",
    choices: [
      { text: "「最高だった！」という熱量や感動を、エモーショナルな言葉やデザインで発信する。", score: { mood: 2, form: 1 } },
      { text: "どんな成果が出たのかを、正確な数値や客観的なレポートとして冷静にまとめる。", score: { mood: -2, form: -1 } }
    ]
  },
  {
    id: 7,
    title: "プロジェクト成功の打ち上げ・飲み会。あなたはどのポジションにいる？",
    choices: [
      { text: "中心のテーブルに陣取り、たくさんの人とグラスを交わして場を盛り上げる。", score: { presence: -2, bond: 1 } },
      { text: "隅の席で、苦労を共にした数人のコアメンバーと静かに達成感を分かち合う。", score: { presence: 2, bond: -1 } }
    ]
  },
  {
    id: 8,
    title: "次の仕事を選ぶなら、どちらの依頼を受けたい？",
    choices: [
      { text: "確実な成果と正確性が求められる、地に足のついたルーティンワーク。", score: { origin: -1, mood: -1 } },
      { text: "リスクはあるが胸が熱くなる、まだ誰も成功したことのない新規開拓。", score: { origin: 1, mood: 1 } }
    ]
  },
  {
    id: 9,
    title: "チームに余った予算が支給されました。何に投資する？",
    choices: [
      { text: "メンバーのモチベーションが上がるような、イベントやリフレッシュ空間の充実。", score: { energy: 1, form: 1 } },
      { text: "今後の業務効率や成功率を論理的に引き上げる、高価な分析ソフトや機材。", score: { energy: -1, form: -1 } }
    ]
  },
  {
    id: 10,
    title: "チームに新しく入ったメンバーが、上手く馴染めず悩んでいます。どう助ける？",
    choices: [
      { text: "自分がハブになって全員に声をかけ、みんなで歓迎するオープンな場を作る。", score: { role: -1, bond: 1 } },
      { text: "1対1でじっくり話を聞き、その人が得意な作業に集中できるよう裏から環境を整える。", score: { role: 1, bond: -1 } }
    ]
  },
  {
    id: 11,
    title: "あなたの活躍が社内報（またはメディア）で紹介されることに。理想の紹介のされ方は？",
    choices: [
      { text: "自分の顔写真や熱いインタビューが、プロジェクトの「顔」として大々的に載る。", score: { form: 1, presence: -1 } },
      { text: "自分が裏で組み上げた完璧なシステムや仕組みが、プロジェクトの「成果」として渋く紹介される。", score: { form: -1, presence: 1 } }
    ]
  },
  {
    id: 12,
    title: "最後に。あなたにとって、チームで働く（活動する）最大の意義とは？",
    choices: [
      { text: "自らが先陣を切り、次々と新しい価値や前例をアクティブに生み出し続けること。", score: { energy: 1, role: -1 } },
      { text: "自分の得意な役割を全うし、チーム全体が確実に前へ進むのを縁の下で支えること。", score: { energy: -1, role: 1 } }
    ]
  }
];

export async function getConstellations(): Promise<Constellation[]> {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTbfWKxGFEmOkuaszkGJNUcX4FySkqmdxKJtaXG0esrjJoHSo5zmEoOGLTmzH09YJd9BZY1DyqNc7P/pub?gid=0&single=true&output=csv";

  try {
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const csvText = await res.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          const data = results.data.map((row: any) => {
            const slug = row['ID'] || '';
            return {
              slug: slug,
              name: row['星座名'] || '',
              englishName: row['英語名'] || '',
              emoji: row['アイコン'] || '✨',
              season: row['見頃の季節'] || '',
              visibility: row['見つけやすさ'] || '',
              catchCopy: row['キャッチコピー'] || '',
              highlights: [row['推しポイント1'], row['推しポイント2'], row['推しポイント3']].filter(Boolean),
              nameOrigin: row['名前の由来'] || '',
              rival: row['ライバル'] || '',
              similar: row['似ている星座'] || '',
              relatedConstellations: row['一緒に好きになりそうな星座'] ? row['一緒に好きになりそうな星座'].split(',').map((s: string) => s.trim()) : [],
              imageUrl: row['画像URL'] || `/member_only/constellation/${slug}.jpeg`, appearance: Number(row['出現係数']) || 1,
              story: "",
              stats: {
                origin: parseInt(row['物語'], 10) || 0,
                energy: parseInt(row['活動'], 10) || 0,
                role: parseInt(row['役割'], 10) || 0,
                bond: parseInt(row['関係'], 10) || 0,
                form: parseInt(row['対象'], 10) || 0,
                mood: parseInt(row['温度'], 10) || 0,
                presence: parseInt(row['存在'], 10) || 0,
              },
              articleLinks: []
            } as Constellation;
          });
          resolve(data);
        }
      });
    });
  } catch (error) {
    console.error("星座データの取得に失敗しました:", error);
    return [];
  }
}
