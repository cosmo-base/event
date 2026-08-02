"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, X, Bookmark, Rocket, ExternalLink } from "lucide-react"
import { TagBadge } from "@/components/tag-badge"
import { GlassCard } from "@/components/glass-card"
import { SpaceEvent } from "@/data/cbed"
import { LaunchEvent } from "@/data/launches"

type ParsedSpaceEvent = Omit<SpaceEvent, "date" | "endDate"> & {
  date: Date
  endDate: Date | null
}

type CalendarItem = ParsedSpaceEvent | LaunchEvent

function getSafeDate(dateValue: unknown): Date {
  if (dateValue instanceof Date) return dateValue
  if (typeof dateValue === "string" || typeof dateValue === "number") return new Date(dateValue)
  return new Date(0)
}

function isLaunch(item: CalendarItem): item is LaunchEvent {
  return "isLaunch" in item && item.isLaunch === true
}

export default function CbedEventCalendar({
  events = [],
  launches = [],
}: {
  events: SpaceEvent[]
  launches?: LaunchEvent[]
}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarItem | null>(null)
  const [selectedDayItems, setSelectedDayItems] = useState<{ date: Date; items: CalendarItem[] } | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [hostFilter, setHostFilter] = useState<"all" | "host" | "partner" | "external">("all")
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDayOfWeek + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
    }
    return null
  })

  const safeEvents = useMemo(() => {
    return (events || [])
      .filter((e) => e && e.date)
      .map((e) => ({
        ...e,
        date: getSafeDate(e.date),
        endDate: e.endDate ? getSafeDate(e.endDate) : null,
      }))
      .filter((e) => !isNaN(e.date.getTime())) as unknown as ParsedSpaceEvent[]
  }, [events])

  const eventTypes = useMemo(() => {
    const types = Array.from(new Set(safeEvents.map((e) => e.type).filter(Boolean))) as string[]
    return types.sort((a, b) => {
      if (a === "その他") return 1
      if (b === "その他") return -1
      return a.localeCompare(b, "ja")
    })
  }, [safeEvents])

  const filteredEvents = safeEvents.filter((event) => {
    const isHost = event.organizer && (event.organizer.includes("Cosmo Base") || event.organizer.includes("CosmoBase"))
    const isPartner = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"
    const isExternal = !isHost && !isPartner

    const hostMatch =
      hostFilter === "all" ||
      (hostFilter === "host" && isHost) ||
      (hostFilter === "partner" && isPartner) ||
      (hostFilter === "external" && isExternal)
    const typeMatch = typeFilter === "all" || event.type === typeFilter

    let difficultyMatch = true
    if (difficultyFilter !== "all") {
      if (event.difficulty === "全レベル") difficultyMatch = true
      else if (difficultyFilter === "初心者向け") difficultyMatch = event.difficulty === "初心者向け"
      else if (difficultyFilter === "中級者向け")
        difficultyMatch = event.difficulty === "中級者向け" || event.difficulty === "中級者以上向け"
      else if (difficultyFilter === "上級者向け")
        difficultyMatch = event.difficulty === "上級者向け" || event.difficulty === "中級者以上向け"
      else difficultyMatch = event.difficulty === difficultyFilter
    }

    return hostMatch && typeMatch && difficultyMatch
  })

  const SEVEN_DAYS_MS = 6 * 24 * 60 * 60 * 1000
  const shortTermEvents = filteredEvents.filter((e) => !e.endDate || e.endDate.getTime() - e.date.getTime() < SEVEN_DAYS_MS)
  const longTermEvents = filteredEvents.filter((e) => e.endDate && e.endDate.getTime() - e.date.getTime() >= SEVEN_DAYS_MS)

  const currentMonthLongTermEvents = longTermEvents
    .filter((event) => {
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime()
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).getTime()
      return event.date.getTime() <= monthEnd && event.endDate!.getTime() >= monthStart
    })
    .sort((a, b) => {
      const score = (e: ParsedSpaceEvent) =>
        e.organizer && (e.organizer.includes("Cosmo Base") || e.organizer.includes("CosmoBase")) ? 2 : e.isPartner ? 1 : 0
      return score(b) - score(a)
    })

  const getItemsForDay = (date: Date | null) => {
    if (!date) return { dayLaunches: [], dayEvents: [] }
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

    const dayLaunches = (launches || []).filter((launch) => {
      const lDate = getSafeDate(launch.date)
      return new Date(lDate.getFullYear(), lDate.getMonth(), lDate.getDate()).getTime() === checkDate
    })

    const dayEvents = shortTermEvents
      .filter((event) => {
        const start = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()).getTime()
        const end = event.endDate
          ? new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate()).getTime()
          : start
        return checkDate >= start && checkDate <= end
      })
      .sort((a, b) => {
        const score = (e: ParsedSpaceEvent) =>
          e.organizer && (e.organizer.includes("Cosmo Base") || e.organizer.includes("CosmoBase")) ? 2 : e.isPartner ? 1 : 0
        return score(b) - score(a)
      })

    return { dayLaunches, dayEvents }
  }

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"]
  const MAX_EVENTS_PER_DAY = 3
  const selectCls = "h-9 px-2 rounded-lg border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/40"

  return (
    <>
      {/* Filters */}
      <GlassCard variant="glass-card" className="mb-6 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white/70">種別:</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectCls}>
              <option value="all">すべて</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white/70">難易度:</span>
            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className={selectCls}>
              <option value="all">すべて</option>
              <option value="初心者向け">初心者向け</option>
              <option value="中級者向け">中級者向け</option>
              <option value="上級者向け">上級者向け</option>
            </select>
          </div>
          <div className="inline-flex bg-white/10 border border-white/20 rounded-lg p-1">
            {(["all", "host", "partner", "external"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setHostFilter(v)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  hostFilter === v ? "bg-white/20 text-white font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                {{ all: "すべて", host: "主催", partner: "パートナー", external: "外部" }[v]}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Calendar grid */}
      <GlassCard variant="glass-card" className="p-4 sm:p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <button onClick={previousMonth} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-bold text-white">
            {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, i) => (
            <div
              key={day}
              className={`text-center py-1.5 text-xs font-bold ${
                i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-white/50"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const { dayLaunches, dayEvents } = getItemsForDay(day)
            const allItems = [...dayLaunches, ...dayEvents]
            const isToday =
              day &&
              today &&
              day.getDate() === today.getDate() &&
              day.getMonth() === today.getMonth() &&
              day.getFullYear() === today.getFullYear()
            const displayItems = allItems.slice(0, MAX_EVENTS_PER_DAY)
            const hasMore = allItems.length > MAX_EVENTS_PER_DAY

            return (
              <div
                key={index}
                className={`min-h-[80px] sm:min-h-[110px] p-1 rounded-lg border flex flex-col transition-colors ${
                  day
                    ? isToday
                      ? "bg-white/15 border-white/40"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                    : "bg-transparent border-transparent"
                }`}
              >
                {day && (
                  <>
                    <div
                      className={`text-right mb-1 text-xs font-medium ${
                        index % 7 === 0 ? "text-red-400" : index % 7 === 6 ? "text-blue-400" : "text-white/70"
                      }`}
                    >
                      {day.getDate()}
                    </div>
                    <div className="space-y-0.5 flex-grow overflow-hidden flex flex-col justify-between">
                      <div className="space-y-0.5">
                        {displayItems.map((item) => {
                          if (isLaunch(item)) {
                            return (
                              <button
                                key={item.id}
                                onClick={() => setSelectedEvent(item)}
                                className="w-full text-left text-[9px] sm:text-[10px] p-1 rounded truncate bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border-l-2 border-orange-400 transition-colors block"
                                title={item.title}
                              >
                                🚀 {item.title}
                              </button>
                            )
                          }
                          const event = item as ParsedSpaceEvent
                          const isHostEvent = event.organizer && (event.organizer.includes("Cosmo Base") || event.organizer.includes("CosmoBase"))
                          const isPartnerEvent = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"
                          const btnCls = isHostEvent
                            ? "bg-purple-500/20 hover:bg-purple-500/30 border-l-2 border-purple-400 text-purple-200"
                            : isPartnerEvent
                            ? "bg-emerald-500/20 hover:bg-emerald-500/30 border-l-2 border-emerald-400 text-emerald-200"
                            : "bg-white/10 hover:bg-white/15 border-l-2 border-white/30 text-white/70"
                          return (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event as CalendarItem)}
                              className={`w-full text-left text-[9px] sm:text-[10px] p-1 rounded truncate transition-colors block ${btnCls}`}
                              title={event.title}
                            >
                              {event.title}
                            </button>
                          )
                        })}
                      </div>
                      {hasMore && (
                        <button
                          onClick={() => setSelectedDayItems({ date: day, items: allItems })}
                          className="w-full text-center text-[9px] sm:text-[10px] font-bold py-0.5 rounded bg-white/10 text-white/60 hover:bg-white/20 transition-colors mt-0.5 block"
                        >
                          ＋他{allItems.length - MAX_EVENTS_PER_DAY}件
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Long-term events */}
      {currentMonthLongTermEvents.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-purple-400" />
            今月の長期開催イベント
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentMonthLongTermEvents.map((event) => {
              const isHostEvent = event.organizer && (event.organizer.includes("Cosmo Base") || event.organizer.includes("CosmoBase"))
              const isPartnerEvent = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event as CalendarItem)}
                  className="text-left w-full rounded-xl transition-all hover:scale-[1.02]"
                >
                  <GlassCard
                    variant="glass-card"
                    className={`h-full flex flex-col gap-2 ${
                      isHostEvent ? "border border-purple-500/30" : isPartnerEvent ? "border border-emerald-500/30" : ""
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {isHostEvent ? (
                        <TagBadge variant="primary">主催イベント</TagBadge>
                      ) : isPartnerEvent ? (
                        <TagBadge variant="accent">パートナー</TagBadge>
                      ) : null}
                      {event.type && <TagBadge>{event.type}</TagBadge>}
                    </div>
                    <h4 className="text-white font-bold leading-tight">{event.title}</h4>
                    <div className="text-white/50 text-xs flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date.getMonth() + 1}/{event.date.getDate()} 〜 {event.endDate!.getMonth() + 1}/{event.endDate!.getDate()}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Day events modal */}
      {selectedDayItems && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#000033] border border-white/20 rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-6 flex flex-col h-full min-h-0">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-base font-bold text-white">
                  {selectedDayItems.date.getMonth() + 1}月{selectedDayItems.date.getDate()}日のイベント（{selectedDayItems.items.length}件）
                </h3>
                <button
                  onClick={() => setSelectedDayItems(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2 overflow-y-auto flex-1">
                {selectedDayItems.items.map((item) => {
                  const isRocket = isLaunch(item)
                  const isHost = !isRocket && item.organizer && (item.organizer.includes("Cosmo Base") || item.organizer.includes("CosmoBase"))
                  const isPartner = !isRocket && (item.isPartner === true || String(item.isPartner).toUpperCase() === "TRUE")
                  return (
                    <div
                      key={item.id}
                      onClick={() => { setSelectedEvent(item); setSelectedDayItems(null) }}
                      className="p-3 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-2">
                        {isRocket ? (
                          <TagBadge className="bg-orange-500/20 text-orange-300 text-[10px]">🚀 打ち上げ</TagBadge>
                        ) : isHost ? (
                          <TagBadge variant="primary">主催イベント</TagBadge>
                        ) : isPartner ? (
                          <TagBadge variant="accent">パートナー</TagBadge>
                        ) : (
                          <TagBadge>外部イベント</TagBadge>
                        )}
                        {item.time && <TagBadge className="text-[10px] text-white/50">{item.time}</TagBadge>}
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-2">{item.title}</h4>
                      {item.location && (
                        <p className="text-xs text-white/50 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {item.location}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#000033] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {isLaunch(selectedEvent) ? (
                      <TagBadge className="bg-orange-500/20 text-orange-300">ロケット打ち上げ</TagBadge>
                    ) : (
                      <>
                        {selectedEvent.organizer && (selectedEvent.organizer.includes("Cosmo Base") || selectedEvent.organizer.includes("CosmoBase")) ? (
                          <TagBadge variant="primary">主催イベント</TagBadge>
                        ) : selectedEvent.isPartner === true || String(selectedEvent.isPartner).toUpperCase() === "TRUE" ? (
                          <TagBadge variant="accent">パートナー</TagBadge>
                        ) : null}
                        {selectedEvent.type && <TagBadge>{selectedEvent.type}</TagBadge>}
                        {selectedEvent.difficulty && <TagBadge className="text-white/50">{selectedEvent.difficulty}</TagBadge>}
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white pr-8 leading-tight">{selectedEvent.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/10 rounded-lg shrink-0"><Calendar className="h-4 w-4 text-white/60" /></div>
                  <span className="text-sm">
                    {getSafeDate(selectedEvent.date).getFullYear()}年
                    {getSafeDate(selectedEvent.date).getMonth() + 1}月
                    {getSafeDate(selectedEvent.date).getDate()}日
                    {!isLaunch(selectedEvent) && selectedEvent.endDate &&
                      getSafeDate(selectedEvent.endDate).getTime() !== getSafeDate(selectedEvent.date).getTime() && (
                        <> 〜 {getSafeDate(selectedEvent.endDate).getFullYear()}年
                             {getSafeDate(selectedEvent.endDate).getMonth() + 1}月
                             {getSafeDate(selectedEvent.endDate).getDate()}日</>
                      )}
                    {" "}{selectedEvent.time}
                  </span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0"><MapPin className="h-4 w-4 text-white/60" /></div>
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                )}
                {isLaunch(selectedEvent) ? (
                  selectedEvent.rocket && (
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-orange-500/20 rounded-lg shrink-0"><Rocket className="h-4 w-4 text-orange-400" /></div>
                      <span className="text-sm">機体: {selectedEvent.rocket}</span>
                    </div>
                  )
                ) : (
                  <>
                    {Number(selectedEvent.capacity) > 0 && (
                      <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/10 rounded-lg shrink-0"><Users className="h-4 w-4 text-white/60" /></div>
                        <span className="text-sm">定員: {selectedEvent.capacity}名</span>
                      </div>
                    )}
                    {selectedEvent.speaker && (
                      <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/10 rounded-lg shrink-0"><Award className="h-4 w-4 text-white/60" /></div>
                        <span className="text-sm">講師: {selectedEvent.speaker}</span>
                      </div>
                    )}
                    {selectedEvent.organizer && (
                      <p className="text-white/40 text-xs pt-2 border-t border-white/10">主催: {selectedEvent.organizer}</p>
                    )}
                  </>
                )}
              </div>

              {selectedEvent.description && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-white/40 mb-3 uppercase tracking-wider">イベント詳細</h3>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-3">
              {isLaunch(selectedEvent) ? (
                <a
                  href={selectedEvent.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                >
                  打ち上げ詳細を見る <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href={`/kurawaku2/cbed/${selectedEvent.id}`}
                  className="flex-1"
                  onClick={() => setSelectedEvent(null)}
                >
                  <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-colors">
                    このイベントの詳細ページへ
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
