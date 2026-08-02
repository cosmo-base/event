import Link from "next/link"
import { notFound } from "next/navigation"
import { getConstellations, Constellation } from "@/data/CMconstellation"
import { CMRadarChart } from "@/components/cm-radar-chart"
import { VisualToggle } from "./visual-toggle"
import { Globe, Eye, Languages, ExternalLink, ArrowLeft, Bookmark, Activity, Star, Telescope, List } from "lucide-react"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const constellations = await getConstellations()
    if (!constellations || constellations.length === 0) return [{ id: "_placeholder" }]
    return constellations.map((c) => ({ id: c.slug }))
  } catch {
    return [{ id: "_placeholder" }]
  }
}

function RelationLinks({ text, allData, type }: { text: string; allData: Constellation[]; type: 'rival' | 'similar' }) {
  if (!text || text === "特になし") return <p className="text-sm text-muted-foreground">特になし</p>
  const match = text.match(/^(.+?)([(（].+)$/)
  let namesPart = text, descPart = ""
  if (match) { namesPart = match[1].trim(); descPart = match[2].trim() }
  const names = namesPart.split(/[\/／・、,]+/).map(n => n.trim()).filter(Boolean)
  const title = type === 'rival' ? '▼ ライバル' : '▼ 似ている星座'
  const titleColor = type === 'rival' ? 'text-accent' : 'text-foreground'
  return (
    <div className="mb-6">
      <h4 className={`text-sm font-bold mb-3 ${titleColor}`}>{title}</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {names.map((name, idx) => {
          const target = allData.find(c => c.name === name || c.name.includes(name) || name.includes(c.name))
          if (target) {
            return (
              <Link key={idx} href={`/cosmomatch/constellation/dictionary/${target.slug}`} className="inline-flex items-center gap-2 bg-background/60 hover:bg-primary/10 border border-border/50 rounded-lg p-2 pr-4 transition-colors group">
                <span className="text-2xl">{target.emoji}</span>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{target.name}</span>
              </Link>
            )
          }
          return <span key={idx} className="inline-flex items-center bg-background/30 border border-border/30 rounded-lg p-2 px-3 text-sm font-bold">{name}</span>
        })}
      </div>
      {descPart && <p className="text-xs text-muted-foreground leading-relaxed">{descPart}</p>}
    </div>
  )
}

export default async function ConstellationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const constellations = await getConstellations()
  const constellation = constellations.find(r => r.slug === id)
  if (!constellation) notFound()

  const relatedList = constellations.filter(r => constellation.relatedConstellations.includes(r.name))

  const chartData = [
    { subject: "物語", A: constellation.stats.origin },
    { subject: "活動", A: constellation.stats.energy },
    { subject: "役割", A: constellation.stats.role },
    { subject: "関係", A: constellation.stats.bond },
    { subject: "対象", A: constellation.stats.form },
    { subject: "温度", A: constellation.stats.mood },
    { subject: "存在", A: constellation.stats.presence },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 animate-in fade-in duration-500">
      <div className="mb-6 pt-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-secondary/20 p-3 rounded-2xl border border-border/40 inline-flex">
          <Link href="/cosmomatch/constellation" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> 診断へ
          </Link>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <Link href="/cosmomatch/constellation/dictionary" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            <Telescope className="w-4 h-4" /> 星空マップへ
          </Link>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <Link href="/cosmomatch/constellation/dictionary/list" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            <List className="w-4 h-4" /> 詳細検索へ
          </Link>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 border border-border/50 relative overflow-hidden flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30 bg-primary" />
        <div className="flex-1 flex flex-col justify-center text-center sm:text-left z-40 order-2 sm:order-1 w-full">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full">{constellation.season}</span>
            <span className="bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-3 py-1 rounded-full">{constellation.visibility}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">{constellation.name}</h2>
          <p className="text-primary font-bold text-lg leading-snug">「{constellation.catchCopy}」</p>
        </div>
        <div className="z-40 order-1 sm:order-2 shrink-0">
          <VisualToggle
            slug={constellation.slug}
            name={constellation.name}
            emoji={constellation.emoji}
            imageUrl={constellation.imageUrl}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Globe className="w-3.5 h-3.5" /> 見頃の季節</span>
          <p className="text-sm font-bold text-foreground">{constellation.season}</p>
        </div>
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Languages className="w-3.5 h-3.5" /> 英語名</span>
          <p className="text-sm font-bold text-foreground truncate">{constellation.englishName}</p>
        </div>
        <div className="bg-secondary/20 p-4 rounded-xl border border-border/40">
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Eye className="w-3.5 h-3.5" /> 見つけやすさ</span>
          <p className="text-sm font-bold text-foreground">{constellation.visibility}</p>
        </div>
      </div>

      {constellation.highlights.length > 0 && (
        <div className="space-y-6 mb-10">
          <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            ここが推しポイント！
          </h3>
          <div className="grid gap-3">
            {constellation.highlights.map((point, index) => (
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
          星座パラメーター
        </h3>
        <div className="bg-secondary/10 border border-border/40 p-4 rounded-2xl h-[320px] flex items-center justify-center">
          <CMRadarChart name={constellation.name} data={chartData} />
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <h3 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-accent" />
          星座の背景
        </h3>
        <div className="bg-secondary/10 p-6 rounded-2xl border border-border/50 leading-relaxed">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-primary mb-2">▼ 名前の由来</h4>
            <p className="text-sm text-muted-foreground">{constellation.nameOrigin}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 pt-6 border-t border-border/40">
            <RelationLinks text={constellation.rival} allData={constellations} type="rival" />
            <RelationLinks text={constellation.similar} allData={constellations} type="similar" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-foreground text-base">関連する星座</h4>
          <div className="space-y-2">
            {relatedList.length > 0 ? relatedList.map((rel) => (
              <Link key={rel.slug} href={`/cosmomatch/constellation/dictionary/${rel.slug}`} className="block bg-background/50 hover:bg-secondary/30 border border-border/50 rounded-xl p-3 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{rel.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{rel.name}</span>
                </div>
              </Link>
            )) : (
              <p className="text-sm text-muted-foreground">関連データはありません</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-foreground text-base">参考・公式リンク</h4>
          <div className="space-y-2">
            {constellation.articleLinks && constellation.articleLinks.length > 0 ? constellation.articleLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-background/50 hover:bg-secondary/30 border border-border/50 rounded-xl p-3 transition-colors group">
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors truncate max-w-[240px]">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4 bg-secondary/10 rounded-xl border border-border/30">関連記事は準備中です</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
