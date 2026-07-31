"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Search, MapPin, Calendar, Loader2, Filter, RotateCcw } from "lucide-react"
import { fetchEventsData, SpaceEvent } from "@/data/cbed"

export default function CbedSearchPage() {
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedOrganizer, setSelectedOrganizer] = useState("all")
  const [showPastEvents, setShowPastEvents] = useState(false)

  useEffect(() => {
    fetchEventsData().then((data) => {
      setEvents(data.filter((e) => e.title && String(e.title).trim() !== ""))
      setIsLoading(false)
    })
  }, [])

  const uniqueTypes = useMemo(() => {
    const s = new Set<string>()
    events.forEach((e) => {
      if (e.type) String(e.type).split(",").forEach((t) => { const v = t.trim(); if (v) s.add(v) })
    })
    return Array.from(s).sort((a, b) => a === "その他" ? 1 : b === "その他" ? -1 : 0)
  }, [events])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedDifficulty("all")
    setSelectedOrganizer("all")
    setShowPastEvents(false)
  }

  const filteredEvents = useMemo(() => {
    const d = new Date()
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

    return events
      .filter((event) => {
        const title = (event.title ?? "").toLowerCase()
        const location = (event.location ?? "").toLowerCase()
        const eventTypes = event.type ? String(event.type).split(",").map((t) => t.trim()) : []
        const difficulty = event.difficulty ? String(event.difficulty).trim() : ""
        const query = searchQuery.toLowerCase().trim()

        const isCosmoBase = event.organizer ? String(event.organizer).replace(/\s+/g, "").toLowerCase().includes("cosmobase") : false
        const isPartner = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"

        const targetDate = event.endDate || event.date || ""
        if (!showPastEvents && targetDate && targetDate < todayStr) return false

        const matchQuery = !query || title.includes(query) || location.includes(query)
        const matchType = selectedType === "all" || eventTypes.includes(selectedType)

        let matchDifficulty = true
        if (selectedDifficulty !== "all") {
          if (difficulty === "全レベル") matchDifficulty = true
          else if (selectedDifficulty === "初心者向け") matchDifficulty = difficulty === "初心者向け"
          else if (selectedDifficulty === "中級者向け") matchDifficulty = difficulty === "中級者向け" || difficulty === "中級者以上"
          else if (selectedDifficulty === "上級者向け") matchDifficulty = difficulty === "上級者向け" || difficulty === "中級者以上"
          else matchDifficulty = false
        }

        let matchOrg = true
        if (selectedOrganizer === "cosmobase") matchOrg = isCosmoBase
        else if (selectedOrganizer === "partner") matchOrg = isPartner
        else if (selectedOrganizer === "others") matchOrg = !isCosmoBase && !isPartner

        return matchQuery && matchType && matchDifficulty && matchOrg
      })
      .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
  }, [events, searchQuery, selectedType, selectedDifficulty, selectedOrganizer, showPastEvents])

  const selectCls = "w-full h-10 px-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/40"

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">詳細検索</h1>

      <div className="glass-card rounded-xl p-5 mb-8 border border-white/10">
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="イベント名や会場で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-white/40"
            />
          </div>
          <button
            onClick={handleReset}
            className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors"
            title="絞り込みをリセット"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">リセット</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-white/50 block mb-2">主催・運営</span>
            <select value={selectedOrganizer} onChange={(e) => setSelectedOrganizer(e.target.value)} className={selectCls}>
              <option value="all">すべてのイベント</option>
              <option value="cosmobase">Cosmo Base主催</option>
              <option value="partner">パートナー主催</option>
              <option value="others">外部イベント</option>
            </select>
          </div>
          <div>
            <span className="text-xs font-semibold text-white/50 block mb-2">イベントの形式</span>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectCls}>
              <option value="all">すべての形式</option>
              {uniqueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <span className="text-xs font-semibold text-white/50 block mb-2">対象者のレベル</span>
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className={selectCls}>
              <option value="all">すべてのレベル</option>
              <option value="初心者向け">初心者向け</option>
              <option value="中級者向け">中級者向け</option>
              <option value="上級者向け">上級者向け</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer w-max hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={showPastEvents}
            onChange={(e) => setShowPastEvents(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          過去のイベントも表示する
        </label>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-white/40" />
            <p className="text-sm text-white/40">イベントを読み込み中...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const displayTypes = event.type ? String(event.type).split(",").map((t) => t.trim()) : []
            const isCosmoBase = event.organizer ? String(event.organizer).replace(/\s+/g, "").toLowerCase().includes("cosmobase") : false
            const isPartner = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"

            let orgLabel = "外部イベント"
            let orgStyle = "bg-white/10 text-white/50 border-white/20"
            if (isCosmoBase) { orgLabel = "主催イベント"; orgStyle = "bg-purple-500/20 text-purple-300 border-purple-500/30" }
            else if (isPartner) { orgLabel = "パートナー"; orgStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" }

            return (
              <Link href={`/kurawaku2/cbed/${event.id}`} key={event.id} className="block group">
                <div className="glass-card rounded-xl p-5 border border-white/10 hover:border-white/25 hover:bg-white/8 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${orgStyle}`}>{orgLabel}</span>
                      {displayTypes.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">{t}</span>
                      ))}
                      {event.difficulty && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/10 text-white/40 border border-white/15">{event.difficulty}</span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-white/90 transition-colors break-words">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-white/50 w-full md:w-[260px] shrink-0">
                    {(event.date || event.time) && (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="whitespace-pre-wrap leading-relaxed">
                          {event.endDate ? `${event.date} 〜 ${event.endDate}` : event.date} {event.time}
                        </span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="text-center py-20 text-white/30 border border-dashed border-white/10 rounded-xl">
            <Filter className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="font-medium">条件に一致するイベントが見つかりません。</p>
            <p className="text-sm mt-1">フィルターをリセットするか、キーワードを変えてみてください。</p>
            <button onClick={handleReset} className="mt-4 px-4 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors">
              絞り込みをリセット
            </button>
          </div>
        )}
      </div>
    </>
  )
}
