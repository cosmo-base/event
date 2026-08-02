import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Clock, Calendar, DollarSign, Train,
  ExternalLink, Globe, Star, ChevronLeft, Twitter, Instagram, Youtube, Edit3
} from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TagBadge } from "@/components/tag-badge"
import { Button } from "@/components/ui/button"
import { fetchFacilitiesData } from "@/data/CBMD"
import { FacilityImage } from "@/components/facility-image"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const facilities = await fetchFacilitiesData()
    if (!facilities || facilities.length === 0) return []
    return facilities.map((f) => ({ id: String(f.id).trim() }))
  } catch {
    return []
  }
}

export default async function FacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const facilities = await fetchFacilitiesData()
  const facility = facilities.find((f) => f.id === id)

  if (!facility) notFound()

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address || facility.name)}`

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link href="/cbmd/database">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> 一覧に戻る
          </Button>
        </Link>
      </div>

      <FacilityImage src={facility.image} alt={facility.name} variant="detail" priority />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <TagBadge variant="primary">{facility.category}</TagBadge>
                {facility.hasPlanetarium && <TagBadge variant="accent"><Star className="w-3 h-3 mr-1" />プラネタリウム</TagBadge>}
                {facility.isFree && <TagBadge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">無料</TagBadge>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{facility.name}</h1>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="underline decoration-transparent group-hover:decoration-primary underline-offset-4">{facility.address}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {facility.tags && facility.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">展示タグ</h2>
                <div className="flex flex-wrap gap-2">
                  {facility.tags.map((tag) => (
                    <Link key={tag} href={`/cbmd/search?tag=${encodeURIComponent(tag)}`}>
                      <button className="glass px-4 py-2 rounded-full text-foreground text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all">
                        {tag}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {facility.description && (
              <GlassCard>
                <h2 className="text-lg font-semibold text-foreground mb-4">施設紹介</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{facility.description}</p>
              </GlassCard>
            )}

          </div>

          <div className="space-y-6 mt-8 lg:mt-0">
            <GlassCard className="sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">基本情報</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-primary mt-0.5" /><div><h3 className="text-sm font-medium text-foreground">営業時間</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{facility.openingHours || "-"}</p></div></div>
                <div className="flex items-start gap-3"><Calendar className="w-5 h-5 text-primary mt-0.5" /><div><h3 className="text-sm font-medium text-foreground">休館日</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{facility.closedDays || "-"}</p></div></div>
                <div className="flex items-start gap-3"><DollarSign className="w-5 h-5 text-primary mt-0.5" /><div><h3 className="text-sm font-medium text-foreground">入館料</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{facility.admissionFee || "-"}</p></div></div>
                <div className="flex items-start gap-3"><Train className="w-5 h-5 text-primary mt-0.5" /><div><h3 className="text-sm font-medium text-foreground">アクセス</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{facility.access || "-"}</p></div></div>
              </div>

              {(facility.website || facility.twitter || facility.instagram || facility.youtube) && (
                <div className="mt-6 pt-6 border-t border-border/30">
                  <h3 className="text-sm font-medium text-foreground mb-3">リンク</h3>
                  <div className="flex flex-wrap gap-2">
                    {facility.website && <a href={facility.website} target="_blank" rel="noopener noreferrer" className="glass p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all"><Globe className="w-5 h-5" /></a>}
                    {facility.twitter && <a href={facility.twitter.startsWith("http") ? facility.twitter : `https://twitter.com/${facility.twitter}`} target="_blank" rel="noopener noreferrer" className="glass p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all"><Twitter className="w-5 h-5" /></a>}
                    {facility.instagram && <a href={facility.instagram.startsWith("http") ? facility.instagram : `https://instagram.com/${facility.instagram}`} target="_blank" rel="noopener noreferrer" className="glass p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all"><Instagram className="w-5 h-5" /></a>}
                    {facility.youtube && <a href={facility.youtube.startsWith("http") ? facility.youtube : `https://youtube.com/channel/${facility.youtube}`} target="_blank" rel="noopener noreferrer" className="glass p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all"><Youtube className="w-5 h-5" /></a>}
                  </div>
                </div>
              )}

              {facility.website && (
                <div className="mt-6">
                  <a href={facility.website} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow">公式サイトを見る <ExternalLink className="w-4 h-4 ml-2" /></Button>
                  </a>
                </div>
              )}

              {facility.updatedAt && (
                <div className="mt-6 pt-4 border-t border-border/30 flex flex-col items-center gap-4">
                  <p className="text-xs text-muted-foreground">最終更新: {facility.updatedAt}</p>
                  <Link href={`/cbmd/inquiry?facility=${encodeURIComponent(facility.name)}`} className="w-full">
                    <Button variant="outline" className="w-full text-xs text-muted-foreground hover:text-primary border-border/50 hover:bg-primary/10">
                      <Edit3 className="w-3 h-3 mr-2" />この施設の情報を修正・更新する
                    </Button>
                  </Link>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
