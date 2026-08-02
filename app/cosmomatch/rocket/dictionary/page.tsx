"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { getRockets, Rocket } from "@/data/CMrockets"
import { Search, Loader2, ArrowLeft } from "lucide-react"

const STATUS_LABEL: Record<string, string> = {
  active: "● 現役",
  development: "◆ 開発中",
  retired: "✖ 退役",
}

const STATUS_COLOR: Record<string, string> = {
  active: "text-emerald-400",
  development: "text-accent",
  retired: "text-muted-foreground",
}

export default function RocketDictionaryPage() {
  const [rockets, setRockets] = useState<Rocket[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [query, setQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  useEffect(() => {
    getRockets().then((data) => { setRockets(data); setIsLoaded(true) })
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rockets.filter((r) => {
      if (filterStatus && r.status !== filterStatus) return false
      if (q) {
        return (
          r.name.toLowerCase().includes(q) ||
          r.reading.toLowerCase().includes(q) ||
          r.catchCopy.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [rockets, query, filterStatus])

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 animate-in fade-in duration-500">
      <div className="mb-6 pt-4">
        <Link href="/cosmomatch/rocket" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> 診断トップに戻る
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-foreground mb-1">日本のロケット図鑑</h2>
        <p className="text-sm text-muted-foreground">日本のロケットを一覧で探せます</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="名前・カテゴリで検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/60 bg-secondary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-secondary/30 transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm rounded-xl border border-border/60 bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-primary/50 transition-colors [&>option]:bg-background [&>option]:text-foreground"
        >
          <option value="">すべてのステータス</option>
          <option value="active">現役</option>
          <option value="development">開発中</option>
          <option value="retired">退役</option>
        </select>
      </div>

      {!isLoaded ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground font-bold">ロケットデータを読み込み中...</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-4">{filtered.length} 件表示</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map((rocket) => (
              <Link
                key={rocket.slug}
                href={`/cosmomatch/rocket/dictionary/${encodeURIComponent(rocket.slug)}`}
                className="group block bg-secondary/10 hover:bg-secondary/30 border border-border/40 hover:border-primary/40 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl mt-0.5 filter drop-shadow-sm">{rocket.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors truncate">
                        {rocket.name}
                      </span>
                      {rocket.reading && (
                        <span className="text-[11px] text-muted-foreground">（{rocket.reading}）</span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate mb-2">{rocket.catchCopy}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">{rocket.country}</span>
                      <span className="text-[10px] font-bold bg-secondary/40 text-muted-foreground border border-border/40 px-2 py-0.5 rounded-full">{rocket.category}</span>
                      <span className={`text-[10px] font-bold ${STATUS_COLOR[rocket.status]}`}>
                        {STATUS_LABEL[rocket.status]}
                      </span>
                      {rocket.firstFlight && (
                        <span className="text-[10px] text-muted-foreground">{rocket.firstFlight}年〜</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">
              該当するロケットが見つかりませんでした
            </div>
          )}
        </>
      )}
    </div>
  )
}
