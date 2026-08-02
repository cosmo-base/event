"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Map, Search, Database, ArrowRight, Calendar, Sparkles, AlertCircle, MessageSquarePlus } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TagBadge } from "@/components/tag-badge"
import { Button } from "@/components/ui/button"
import { fetchFacilitiesData, spacecraftTags, Facility } from "@/data/CBMD"
import { fetchEventsData, SpaceEvent } from "@/data/cbed"
import { FacilityImage } from "@/components/facility-image"

export default function CbmdPage() {
  const [featuredFacilities, setFeaturedFacilities] = useState<Facility[]>([])
  const [recentFacilities, setRecentFacilities] = useState<Facility[]>([])
  const [recentEvents, setRecentEvents] = useState<SpaceEvent[]>([])

  useEffect(() => {
    async function loadData() {
      const [fetchedFacilities, fetchedEvents] = await Promise.all([
        fetchFacilitiesData(),
        fetchEventsData(),
      ])

      setFeaturedFacilities([...fetchedFacilities].sort(() => Math.random() - 0.5).slice(0, 4))
      setRecentFacilities(
        [...fetchedFacilities]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 4)
      )

      const parseDate = (dStr: string) => {
        if (!dStr) return null
        const match = dStr.match(/(\d{4})[-/年\.]\s*(\d{1,2})[-/月\.]\s*(\d{1,2})/)
        if (!match) return null
        return new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10))
      }

      const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
      today.setHours(0, 0, 0, 0)

      const activeEvents = fetchedEvents.filter((e) => {
        const isAtFacility = fetchedFacilities.some((f) => e.location && e.location.includes(f.name))
        if (!isAtFacility) return false
        const start = parseDate(e.date || "")
        const end = parseDate(e.endDate || "") || start
        if (!start || !end) return false
        return today >= start && today <= end
      })

      setRecentEvents(activeEvents.slice(0, 3))
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">宇宙好きのためのミュージアムデータベース</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            日本中の宇宙展示を
            <br />
            <span className="text-primary">探しに行こう</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            科学館、博物館、プラネタリウム、JAXA施設など、日本全国の宇宙関連施設を検索・探索できます。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link href="/cbmd/map">
              <GlassCard hover className="h-full">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center glow">
                    <Map className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">地図から探す</h3>
                    <p className="text-sm text-muted-foreground">日本地図で施設を検索</p>
                  </div>
                </div>
              </GlassCard>
            </Link>

            <Link href="/cbmd/search">
              <GlassCard hover className="h-full">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <Search className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">検索で探す</h3>
                    <p className="text-sm text-muted-foreground">条件を指定して検索</p>
                  </div>
                </div>
              </GlassCard>
            </Link>

            <Link href="/cbmd/database">
              <GlassCard hover className="h-full">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Database className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">データベース一覧</h3>
                    <p className="text-sm text-muted-foreground">すべての施設を閲覧</p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Facilities */}
      <section id="featured" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">注目施設</h2>
              <p className="text-muted-foreground">人気の宇宙関連施設をピックアップ</p>
            </div>
            <Link href="/cbmd/database">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                すべて見る <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFacilities.length > 0 ? featuredFacilities.map((facility) => (
              <Link key={facility.id} href={`/cbmd/facility/${facility.id}`}>
                <GlassCard hover className="h-full">
                  <div className="aspect-video rounded-xl bg-secondary/30 mb-4 overflow-hidden relative">
                    <FacilityImage src={facility.image} alt={facility.name} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <TagBadge variant="primary" className="mb-2">{facility.category}</TagBadge>
                      {facility.isFree && <TagBadge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-1">無料</TagBadge>}
                      <h3 className="font-semibold text-foreground line-clamp-2 mt-1">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground">{facility.prefecture}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {facility.tags.slice(0, 3).map((tag) => <TagBadge key={tag}>{tag}</TagBadge>)}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            )) : (
              <div className="col-span-4 text-center text-muted-foreground py-10">読み込み中...</div>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {recentEvents.length > 0 && (
        <section className="py-20 px-4 bg-secondary/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">施設で開催中のイベント</h2>
              <p className="text-muted-foreground">CBMD登録施設で今注目のイベント</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentEvents.map((event) => (
                <GlassCard key={event.id} className="h-full">
                  <div className="space-y-3">
                    <p className="text-xs text-primary font-medium">
                      {event.endDate ? `${event.date} 〜 ${event.endDate}` : event.date}
                    </p>
                    <h3 className="font-semibold text-foreground line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Added */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">最近追加された施設</h2>
              <p className="text-muted-foreground">新しく登録された施設情報</p>
            </div>
            <Link href="/cbmd/database">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                すべて見る <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentFacilities.length > 0 ? recentFacilities.map((facility) => (
              <Link key={facility.id} href={`/cbmd/facility/${facility.id}`}>
                <GlassCard hover className="h-full">
                  <div className="aspect-video rounded-xl bg-secondary/30 mb-4 overflow-hidden relative">
                    <FacilityImage src={facility.image} alt={facility.name} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <TagBadge variant="primary" className="mb-2">{facility.category}</TagBadge>
                      {facility.isFree && <TagBadge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-1">無料</TagBadge>}
                      <h3 className="font-semibold text-foreground line-clamp-2 mt-1">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground">{facility.prefecture}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">更新: {facility.updatedAt}</p>
                  </div>
                </GlassCard>
              </Link>
            )) : (
              <div className="col-span-4 text-center text-muted-foreground py-10">読み込み中...</div>
            )}
          </div>
        </div>
      </section>

      {/* Spacecraft Tags */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">宇宙探査機タグ一覧</h2>
            <p className="text-muted-foreground">興味のある探査機から施設を探そう</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {spacecraftTags.map((tag) => (
              <Link key={tag} href={`/cbmd/search?tag=${encodeURIComponent(tag)}`}>
                <button className="glass px-6 py-3 rounded-full text-foreground font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:glow">
                  {tag}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">CBMDをみんなで作る</h2>
          <p className="text-muted-foreground mb-8">
            「近所の科学館がまだ載っていない」「営業時間が変わっていた」などの情報がありましたら、ぜひお知らせください。
          </p>
          <Link href="/cbmd/inquiry">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow px-8 rounded-full">
              <MessageSquarePlus className="w-5 h-5 mr-2" />
              施設追加・修正リクエストを送る
            </Button>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="border-l-4 border-l-primary/50 text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <h3 className="font-semibold text-foreground text-base">当サイトをご利用になる皆様へ</h3>
                <p>
                  CBMDに掲載されている施設情報は、各施設の公式ホームページ等を元に収集したものです。
                  営業時間・休館日・入館料などは変更される場合がありますので、お出かけの際は<strong className="text-foreground">必ず各施設の公式サイトをご確認ください。</strong>
                </p>
                <p className="text-accent font-medium pt-2">
                  ※ 本サイトの掲載内容に関して、各施設へ直接お問い合わせすることはご遠慮ください。
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
