import Link from "next/link"
import { ExternalLink, MapPin, Calendar } from "lucide-react"

export const metadata = {
  title: "イベントリスト | 運営用",
}

const EVENTS = [
  {
    id: "kurawaku2",
    path: "/kurawaku2",
    fullName: "くらわくトーク#2 変える力",
    date: "2026年8月1日",
    venue: "クラフトワーク京島",
    type: "講演会",
    status: "archived" as const,
  },
  {
    id: "monoS26",
    path: "/monoS26",
    fullName: "全日本学生ものづくりExpo@信州",
    date: "2026年8月20日（木）",
    venue: "ホテルメトロポリタン長野",
    type: "ブース出展",
    status: "active" as const,
  },
  {
    id: "monoK26",
    path: "/monoK26",
    fullName: "全日本学生ものづくりExpo@関東",
    date: "2026年8月28日（金）",
    venue: "東京都立産業貿易センター台東館",
    type: "ブース出展",
    status: "active" as const,
  },
  {
    id: "SDF26",
    path: "/SDF26",
    fullName: "宇宙開発フォーラム2026",
    date: "2026年8月28日（木）",
    venue: "日本科学未来館 7F",
    type: "ポスターセッション",
    status: "active" as const,
  },
]

const STATUS = {
  active:   { label: "公開中", dot: "bg-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  draft:    { label: "準備中", dot: "bg-yellow-400",  bg: "bg-yellow-400/10",  border: "border-yellow-400/20" },
  archived: { label: "終了",   dot: "bg-zinc-500",    bg: "bg-zinc-500/10",    border: "border-zinc-500/20" },
} as const

const TOOLS = [
  {
    name: "CBMD",
    description: "Cosmo Base Museum Database\n宇宙系展示施設データベース",
    logo: "/event/CBMD_logo.png",
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
    logo: "/event/CBED_logo.png",
    links: [
      { label: "TOP", href: "/kurawaku2/cbed" },
      { label: "マップ", href: "/kurawaku2/cbed/map" },
      { label: "カレンダー", href: "/kurawaku2/cbed/calendar" },
      { label: "検索", href: "/kurawaku2/cbed/search" },
    ],
  },
  {
    name: "CosmoMatch",
    description: "推し診断ツール\nロケット編・88星座編",
    logo: "/event/CosmoMatch_logo.png",
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
    logo: "/event/CBtype_logo.png",
    links: [
      { label: "診断", href: "/kurawaku2/type" },
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

export default function EventListPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/event/CB_icon.png" alt="Cosmo Base" width={48} height={48} className="rounded-xl" />
          <div>
            <h1 className="text-2xl font-bold text-white">Cosmo Base 運営ポータル</h1>
            <p className="text-sm text-zinc-400">イベントページ・コンテンツ一覧</p>
          </div>
        </div>

        {/* Events */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
            イベントページ
          </h2>
          <div className="space-y-3">
            {EVENTS.map((ev) => {
              const s = STATUS[ev.status]
              return (
                <Link key={ev.id} href={`${ev.path}?ref=list`} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 hover:bg-zinc-800/60 transition-colors group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/event/CB_icon.png" alt="Cosmo Base" width={36} height={36} className="rounded-lg shrink-0 opacity-80" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{ev.fullName}</span>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>
                      <span className="text-zinc-600">{ev.type}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </Link>
              )
            })}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
            共通コンテンツ・ツール
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 hover:bg-zinc-800/60 transition-colors group">
                {/* stretched link — covers whole card, goes to first (TOP) link */}
                <Link href={tool.links[0].href} className="absolute inset-0 rounded-xl" aria-label={tool.name} />
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                    {tool.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={tool.logo} alt={tool.name} className="object-contain w-full h-full p-1.5" />
                    ) : (
                      <span className="text-2xl">{tool.icon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-0.5">{tool.name}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed whitespace-pre-line">{tool.description}</p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  {tool.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 rounded-md transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
