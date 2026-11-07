import { AdminShell, type StaticEvent, type StaticTool } from "./AdminShell"
import type { GachaPrize } from "@/components/event-gacha"

export const metadata = {
  title: "イベントリスト | 運営用",
}

const EVENTS: StaticEvent[] = [
  {
    id: "kurawaku2",
    path: "/kurawaku2",
    fullName: "くらわくトーク#2 変える力",
    date: "2026年8月1日",
    venue: "クラフトワーク京島",
    type: "講演会",
    status: "archived",
  },
  {
    id: "monoS26",
    path: "/monoS26",
    fullName: "全日本学生ものづくりExpo@信州",
    date: "2026年8月20日（木）",
    venue: "ホテルメトロポリタン長野",
    type: "ブース出展",
    status: "active",
  },
  {
    id: "monoK26",
    path: "/monoK26",
    fullName: "全日本学生ものづくりExpo@関東",
    date: "2026年8月28日（金）",
    venue: "東京都立産業貿易センター台東館",
    type: "ブース出展",
    status: "active",
  },
  {
    id: "SDF26",
    path: "/SDF26",
    fullName: "宇宙開発フォーラム2026",
    date: "2026年8月28日（木）",
    venue: "日本科学未来館 7F",
    type: "ポスターセッション",
    status: "active",
  },
  {
    id: "MCF26",
    path: "/MCF26",
    fullName: "MIRAI CREATOR'Z FES 2026",
    date: "2026年9月14日（日）",
    venue: "ベルサール半蔵門",
    type: "ブース出展",
    status: "active",
  },
  {
    id: "StEX26",
    path: "/StEX26",
    fullName: "学生宇宙探査カンファレンスStEX 2026",
    date: "2026年9月15日（月）",
    venue: "Tokyo Innovation Base（TIB）",
    type: "ブース出展",
    status: "active",
  },
]

const TOOLS: StaticTool[] = [
  {
    name: "CBMD",
    description: "Cosmo Base Museum Database\n宇宙系展示施設データベース",
    logo: "/CBMD_logo.png",
    links: [
      { label: "TOP", href: "/cbmd" },
      { label: "マップ", href: "/cbmd/map" },
      { label: "検索", href: "/cbmd/search" },
      { label: "DB", href: "/cbmd/database" },
    ],
  },
  {
    name: "CBED",
    description: "Cosmo Base Event Database\n宇宙系イベントデータベース",
    logo: "/CBED_logo.png",
    previewUrl: "/kurawaku2/cbed?preview=locked",
    links: [
      { label: "TOP", href: "/cbed" },
      { label: "マップ", href: "/cbed/map" },
      { label: "カレンダー", href: "/cbed/calendar" },
      { label: "検索", href: "/cbed/search" },
    ],
  },
  {
    name: "CosmoMatch",
    description: "推し診断ツール\nロケット編・88星座編",
    logo: "/CosmoMatch_logo.png",
    links: [
      { label: "TOP", href: "/cosmomatch" },
      { label: "ロケット診断", href: "/cosmomatch/rocket" },
      { label: "ロケット図鑑", href: "/cosmomatch/rocket/dictionary" },
      { label: "星座診断", href: "/cosmomatch/constellation" },
      { label: "星空マップ", href: "/cosmomatch/constellation/dictionary" },
      { label: "星座一覧", href: "/cosmomatch/constellation/dictionary/list" },
    ],
  },
  {
    name: "宇宙タイプ診断",
    description: "あなたの宇宙タイプを診断\nRI / RO / DI / DO の4タイプ",
    logo: "/CBtype_logo.png",
    previewUrl: "/kurawaku2/type?preview=locked",
    links: [
      { label: "診断", href: "/type" },
    ],
  },
  {
    name: "アンケート",
    description: "イベント参加後アンケート",
    logo: null,
    icon: "📋",
    links: [
      { label: "アンケート", href: "/feedback" },
    ],
  },
]

const GACHA_PRIZES: GachaPrize[] = [
  { name: "シール", weight: 40, emoji: "🌟" },
  { name: "クリアファイル", weight: 30, emoji: "📂" },
  { name: "ステッカーセット", weight: 20, emoji: "✨" },
  { name: "特製グッズ", weight: 10, emoji: "🎁" },
]

const SPREADSHEET_URL = process.env.NEXT_PUBLIC_LIST_SPREADSHEET_URL ?? ""

export default function EventListPage() {
  return (
    <AdminShell
      staticEvents={EVENTS}
      tools={TOOLS}
      gachaPrizes={GACHA_PRIZES}
      spreadsheetUrl={SPREADSHEET_URL}
    />
  )
}
