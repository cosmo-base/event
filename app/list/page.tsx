import Link from "next/link"
import { ExternalLink, Calendar, Users, Database, Heart, ClipboardList } from "lucide-react"

export const metadata = {
  title: "イベントリスト | 運営用",
}

const EVENT_PAGES = [
  {
    id: "kurawaku2",
    name: "くらわく 第2回",
    path: "/kurawaku2",
    status: "active",
    description: "宇宙 × ビジネスの交流イベント第2回",
    features: ["診断", "ピッチ", "クイズ"],
  },
]

const TOOLS = [
  {
    name: "CBMD",
    description: "Cosmo Base Museum Database — 宇宙系展示施設データベース",
    path: "/cbmd",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    name: "Cosmo Match",
    description: "推し診断ツール — ロケット編・88星座編",
    path: "/cosmomatch",
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  {
    name: "アンケート",
    description: "イベント参加後アンケート (宇宙知っトク用)",
    path: "/feedback",
    icon: ClipboardList,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
]

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  active: { label: "● 公開中", color: "text-emerald-400" },
  draft: { label: "◆ 準備中", color: "text-yellow-400" },
  archived: { label: "✖ アーカイブ", color: "text-muted-foreground" },
}

export default function EventListPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            イベントリスト
          </h1>
          <p className="text-muted-foreground text-sm">Cosmo Base 運営用ページ一覧</p>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            イベントページ
          </h2>
          <div className="space-y-4">
            {EVENT_PAGES.map((event) => {
              const status = STATUS_LABEL[event.status] || STATUS_LABEL.draft
              return (
                <div key={event.id} className="border border-border rounded-xl p-5 bg-secondary/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-foreground">{event.name}</h3>
                        <span className={`text-xs font-bold ${status.color}`}>{status.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {event.features.map(f => (
                        <span key={f} className="text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={event.path}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      ページを開く
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">共通ツール・機能</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className={`group block border ${tool.border} rounded-xl p-5 ${tool.bg} hover:opacity-90 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${tool.bg} border ${tool.border} shrink-0`}>
                      <Icon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold mb-1 ${tool.color}`}>{tool.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">クイックリンク</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "CBMD TOP", href: "/cbmd" },
              { label: "CBMD マップ", href: "/cbmd/map" },
              { label: "CBMD 検索", href: "/cbmd/search" },
              { label: "CBMD DB", href: "/cbmd/database" },
              { label: "CBMD 問合せ", href: "/cbmd/inquiry" },
              { label: "CosmoMatch TOP", href: "/cosmomatch" },
              { label: "ロケット診断", href: "/cosmomatch/rocket" },
              { label: "ロケット図鑑", href: "/cosmomatch/rocket/dictionary" },
              { label: "星座診断", href: "/cosmomatch/constellation" },
              { label: "星空マップ", href: "/cosmomatch/constellation/dictionary" },
              { label: "星座一覧", href: "/cosmomatch/constellation/dictionary/list" },
              { label: "アンケート", href: "/feedback" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-center text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-3 py-2.5 bg-secondary/10 hover:bg-secondary/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
