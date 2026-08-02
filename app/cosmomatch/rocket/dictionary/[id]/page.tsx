import Link from "next/link"
import { notFound } from "next/navigation"
import { getRockets } from "@/data/CMrockets"
import { CMRadarChart } from "@/components/cm-radar-chart"
import { Globe, Shield, Layers, ExternalLink, ArrowLeft, Bookmark, Activity, BarChart3, Tag } from "lucide-react"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  const rockets = await getRockets()
  return rockets.map((rocket) => ({ id: encodeURIComponent(rocket.slug) }))
}

function SpecRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex gap-3 py-2.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground w-36 shrink-0 pt-0.5">{label}</span>
      <span className="text-xs text-foreground font-medium leading-relaxed">{value}</span>
    </div>
  )
}

function LinkedSpecRow({ label, value, nameToSlug }: { label: string; value: string; nameToSlug: Map<string, string> }) {
  if (!value) return null
  const parts = value.split(/[、,，]/).map(s => s.trim()).filter(Boolean)
  return (
    <div className="flex gap-3 py-2.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground w-36 shrink-0 pt-0.5">{label}</span>
      <span className="text-xs text-foreground font-medium leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
        {parts.map((part, i) => {
          const slug = nameToSlug.get(part)
          return slug ? (
            <Link key={i} href={`/cosmomatch/rocket/dictionary/${encodeURIComponent(slug)}`} className="text-primary hover:underline underline-offset-2">
              {part}
            </Link>
          ) : (
            <span key={i}>{part}{i < parts.length - 1 ? '、' : ''}</span>
          )
        })}
      </span>
    </div>
  )
}

export default async function RocketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const currentId = decodeURIComponent(id)
  const rockets = await getRockets()
  const rocket = rockets.find(r => r.slug === currentId)
  if (!rocket) notFound()

  const relatedList = rockets.filter(r => rocket.relatedRockets.includes(r.slug))
  const nameToSlug = new Map(rockets.map(r => [r.name, r.slug]))

  const chartData = [
    { subject: "パワー", A: rocket.stats.power },
    { subject: "技術", A: rocket.stats.technology },
    { subject: "歴史", A: rocket.stats.history },
    { subject: "エース", A: rocket.stats.ace },
    { subject: "挑戦", A: rocket.stats.challenge },
    { subject: "個性", A: rocket.stats.individuality },
    { subject: "未来", A: rocket.stats.future },
    { subject: "信頼", A: rocket.stats.trust },
  ]

  const statusLabel = rocket.status === "active" ? "● 現役稼働" : rocket.status === "development" ? "◆ 開発中" : "✖ 退役機"

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 animate-in fade-in duration-500">
      <div className="mb-6 pt-4">
        <Link href="/cosmomatch/rocket/dictionary" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> 図鑑一覧に戻る
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 border border-border/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30" style={{ backgroundColor: rocket.stats.ace > 4 ? '#00f2fe' : '#38bdf8' }} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full">{rocket.country}</span>
            <span className="bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-3 py-1 rounded-full">{rocket.category}</span>
            {rocket.type && (
              <span className="bg-secondary/40 text-muted-foreground border border-border/40 text-xs font-bold px-3 py-1 rounded-full">{rocket.type}</span>
            )}
            <span className="bg-secondary text-muted-foreground border border-border/50 text-xs font-bold px-3 py-1 rounded-full">{statusLabel}</span>
          </div>
          <div className="text-4xl filter drop-shadow-md">{rocket.emoji}</div>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground mb-1">{rocket.name}</h2>
        {rocket.reading && <p className="text-sm text-muted-foreground mb-2">（{rocket.reading}）</p>}
        <p className="text-primary font-bold text-lg">「{rocket.catchCopy}」</p>
        {rocket.intro && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{rocket.intro}</p>}
        {rocket.diagTags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {rocket.diagTags.split(/[,、]/).map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-primary/5 text-primary border border-primary/15 px-2 py-0.5 rounded-full">
                <Tag className="w-2.5 h-2.5" />{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Globe className="w-3.5 h-3.5" /> 国 / 地域</span>
          <p className="text-sm font-bold text-foreground">{rocket.country}</p>
        </div>
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Layers className="w-3.5 h-3.5" /> カテゴリ</span>
          <p className="text-sm font-bold text-foreground truncate">{rocket.category}</p>
        </div>
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Shield className="w-3.5 h-3.5" /> 運用ステータス</span>
          <p className="text-sm font-bold text-foreground">{statusLabel}</p>
        </div>
        {rocket.firstFlight && (
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
            <span className="text-xs text-muted-foreground mb-1 block">初飛行</span>
            <p className="text-sm font-bold text-foreground">{rocket.firstFlight}年</p>
          </div>
        )}
        {rocket.lastFlight && rocket.status === "retired" && (
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
            <span className="text-xs text-muted-foreground mb-1 block">最終飛行</span>
            <p className="text-sm font-bold text-foreground">{rocket.lastFlight}年</p>
          </div>
        )}
        {rocket.stages && (
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
            <span className="text-xs text-muted-foreground mb-1 block">段数</span>
            <p className="text-sm font-bold text-foreground">{rocket.stages}</p>
          </div>
        )}
      </div>

      {rocket.highlights.length > 0 && (
        <div className="space-y-4 mb-10">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2">推しポイント</h3>
          <div className="grid gap-3">
            {rocket.highlights.map((point, index) => (
              <div key={index} className="bg-secondary/20 border border-border/50 rounded-xl p-4 flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold mt-0.5 shrink-0">{index + 1}</span>
                <p className="text-sm text-foreground font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6 mb-10">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          機体パラメーター
        </h3>
        <div className="bg-secondary/10 border border-border/40 p-4 rounded-2xl h-[320px] flex items-center justify-center">
          <CMRadarChart name={rocket.name} data={chartData} />
        </div>
      </div>

      {(rocket.story.origin || rocket.story.struggle || rocket.story.today) && (
        <div className="space-y-6 mb-10">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-accent" />
            機体ストーリー・背景
          </h3>
          <div className="space-y-6 bg-secondary/10 p-6 rounded-2xl border border-border/50 leading-relaxed">
            {rocket.story.origin && (
              <div>
                <h4 className="text-sm font-bold text-primary mb-1">▼ なぜ生まれたのか？</h4>
                <p className="text-sm text-muted-foreground">{rocket.story.origin}</p>
              </div>
            )}
            {rocket.story.struggle && (
              <div>
                <h4 className="text-sm font-bold text-accent mb-1">▼ どんな試練や苦労があったのか？</h4>
                <p className="text-sm text-muted-foreground">{rocket.story.struggle}</p>
              </div>
            )}
            {rocket.story.today && (
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">▼ 象徴するエピソード</h4>
                <p className="text-sm text-muted-foreground">{rocket.story.today}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-10">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          詳細スペック
        </h3>
        <div className="bg-secondary/10 border border-border/40 rounded-2xl px-5 py-2">
          <SpecRow label="開発・運用主体" value={rocket.operator} />
          <SpecRow label="主な製造/主契約" value={rocket.manufacturer} />
          <SpecRow label="系列/位置づけ" value={rocket.lineage} />
          <SpecRow label="推進方式" value={rocket.propulsion} />
          <SpecRow label="主な推進剤" value={rocket.propellant} />
          <SpecRow label="主な打上げ場所" value={rocket.launchSite} />
          <SpecRow label="高さ/全長 (m)" value={rocket.height} />
          <SpecRow label="直径 (m)" value={rocket.diameter} />
          <SpecRow label="重量 (t)" value={rocket.mass} />
          <SpecRow label="打上げ能力・到達高度" value={rocket.payload} />
          <SpecRow label="代表ミッション/衛星" value={rocket.missions} />
          <SpecRow label="打上げ実績" value={rocket.launchRecord} />
          <SpecRow label="成功/失敗の要点" value={rocket.successFailure} />
          <SpecRow label="技術的特徴" value={rocket.techFeatures} />
          <SpecRow label="関連人物" value={rocket.keyPerson} />
          <LinkedSpecRow label="ライバル/類似機" value={rocket.rivals} nameToSlug={nameToSlug} />
          <LinkedSpecRow label="前世代ロケット" value={rocket.predecessors === 'なし' ? '' : rocket.predecessors} nameToSlug={nameToSlug} />
          <LinkedSpecRow label="後継ロケット" value={rocket.successors === 'なし' ? '' : rocket.successors} nameToSlug={nameToSlug} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {relatedList.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-base">関連するロケット</h4>
            <div className="space-y-2">
              {relatedList.map((rel) => (
                <Link key={rel.slug} href={`/cosmomatch/rocket/dictionary/${encodeURIComponent(rel.slug)}`} className="block bg-background/50 hover:bg-secondary/30 border border-border/50 rounded-xl p-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{rel.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{rel.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {rocket.articleLinks.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-base">参考・公式リンク</h4>
            <div className="space-y-2">
              {rocket.articleLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-background/50 hover:bg-secondary/30 border border-border/50 rounded-xl p-3 transition-colors group">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate max-w-[240px]">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
