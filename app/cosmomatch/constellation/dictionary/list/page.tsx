"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Constellation, getConstellations } from "@/data/CMconstellation"
import { Loader2, ArrowLeft, Search, Telescope, Star, ArrowUpDown, Sparkles, Map } from "lucide-react"

type ExtendedConstellation = Constellation & {
  englishName?: string
  discoverability?: string
}

export default function ConstellationListPage() {
  const [constellations, setConstellations] = useState<ExtendedConstellation[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("すべて")
  const [sortOrder, setSortOrder] = useState<"default" | "kana">("default")

  useEffect(() => {
    getConstellations().then((data) => { setConstellations(data as ExtendedConstellation[]); setIsLoaded(true) })
  }, [])

  const filteredAndSorted = useMemo(() => {
    let result = [...constellations]
    if (activeFilter !== "すべて") {
      result = result.filter(c => {
        const s = c.season || ''
        if (activeFilter === "北天・通年") return s.includes("北") || s.includes("通年")
        if (activeFilter === "南天") return s.includes("南") || s.includes("見えな")
        const monthMatch = s.match(/(\d+)月/)
        if (monthMatch) {
          const m = parseInt(monthMatch[1], 10)
          if (activeFilter === "春") return m >= 3 && m <= 5
          if (activeFilter === "夏") return m >= 6 && m <= 8
          if (activeFilter === "秋") return m >= 9 && m <= 11
          if (activeFilter === "冬") return m === 12 || m === 1 || m === 2
        }
        return s.includes(activeFilter)
      })
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.slug && c.slug.toLowerCase().includes(q)) ||
        (c.catchCopy && c.catchCopy.toLowerCase().includes(q)) ||
        (c.englishName && c.englishName.toLowerCase().includes(q)) ||
        (c.season && c.season.includes(q))
      )
    }
    if (sortOrder === "kana") result.sort((a, b) => a.name.localeCompare(b.name, 'ja'))
    return result
  }, [constellations, searchQuery, activeFilter, sortOrder])

  const filters = ["すべて", "春", "夏", "秋", "冬", "北天・通年", "南天"]

  if (!isLoaded) {
    return (
      <div className="max-w-md mx-auto py-32 flex flex-col items-center justify-center animate-in fade-in">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <p className="text-muted-foreground font-bold">データベースに接続中...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-in fade-in duration-500">
      <div className="mb-8 pt-4">
        <Link href="/cosmomatch/constellation/dictionary" className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors mb-4 font-bold">
          <Telescope className="w-4 h-4" /> 星空マップに戻る
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2 flex items-center gap-3">
              <Map className="w-7 h-7 text-primary" />
              詳細検索
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              キーワードから全天88星座を検索できます。
            </p>
          </div>
        </div>

        <div className="bg-secondary/20 border border-border/50 rounded-3xl p-4 sm:p-6 shadow-sm backdrop-blur-sm space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="星座名、キーワードで検索... (例: オリオン、さそり)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border/60 rounded-2xl py-4 pl-12 pr-4 text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                    activeFilter === filter
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                      : 'bg-background text-muted-foreground border-border/40 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSortOrder(prev => prev === "default" ? "kana" : "default")}
              className="flex items-center gap-2 px-4 py-2 bg-background border border-border/40 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === "default" ? "デフォルト順" : "五十音順"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 text-muted-foreground text-sm font-bold">
        <Sparkles className="w-4 h-4 text-primary" />
        <span>該当: <span className="text-foreground text-base">{filteredAndSorted.length}</span> 件</span>
      </div>

      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSorted.map((c) => (
            <Link
              key={c.slug}
              href={`/cosmomatch/constellation/dictionary/${c.slug}`}
              className="group bg-secondary/10 border border-border/40 rounded-2xl p-4 flex gap-4 hover:bg-primary/5 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,242,254,0.1)] transition-all duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#000015] border border-white/10 shrink-0 flex items-center justify-center relative shadow-inner group-hover:scale-105 transition-transform">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : null}
                <span className="absolute text-4xl opacity-40 -z-10 group-hover:opacity-60">{c.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="min-w-0 mb-1">
                  {c.englishName && (
                    <p className="text-[10px] text-primary/80 font-bold uppercase tracking-wider truncate mb-0.5">{c.englishName}</p>
                  )}
                  <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">{c.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-2.5">{c.catchCopy}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-white/70">{c.season}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-black/20 border border-border/30 text-muted-foreground uppercase">ID: {c.slug}</span>
                  {c.discoverability && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                      <Star className="w-3 h-3 fill-yellow-500/50" /> {c.discoverability}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <Telescope className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">星座が見つかりません</h3>
          <p className="text-muted-foreground text-sm">検索ワードを変えるか、フィルターを解除してみてください。</p>
        </div>
      )}
    </div>
  )
}
