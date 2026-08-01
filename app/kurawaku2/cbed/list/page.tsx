import { fetchEventsData, SpaceEvent } from "@/data/cbed"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "宇宙イベント一覧 | くらわくトーク#2",
  description: "Cosmo Base Event Database — 今後開催される宇宙関連イベントの一覧です。",
}

function isFutureEvent(event: SpaceEvent): boolean {
  const targetDate = event.endDate || event.date || ""
  if (!targetDate) return true
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  return targetDate >= todayStr
}

function OrgBadge({ event }: { event: SpaceEvent }) {
  const isCosmoBase = event.organizer
    ? String(event.organizer).replace(/\s+/g, "").toLowerCase().includes("cosmobase")
    : false
  const isPartner = event.isPartner === true || String(event.isPartner).toUpperCase() === "TRUE"

  if (isCosmoBase)
    return (
      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border bg-purple-500/20 text-purple-300 border-purple-500/30">
        主催イベント
      </span>
    )
  if (isPartner)
    return (
      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
        パートナー
      </span>
    )
  return (
    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border bg-white/10 text-white/60 border-white/20">
      外部イベント
    </span>
  )
}

export default async function CbedListPage() {
  const allEvents = await fetchEventsData()
  const futureEvents = allEvents
    .filter((e) => e.title && String(e.title).trim() !== "" && isFutureEvent(e))
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""))

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2">宇宙イベント一覧</h1>
      <p className="text-white/50 text-sm mb-6">
        Cosmo Base Event Database — 今後開催される宇宙関連イベントをまとめています。
      </p>

      {futureEvents.length === 0 ? (
        <div className="text-center py-20 text-white/30 border border-dashed border-white/10 rounded-xl">
          現在掲載中のイベントはありません。
        </div>
      ) : (
        <div className="space-y-4">
          {futureEvents.map((event) => {
            const displayTypes = event.type
              ? String(event.type).split(",").map((t) => t.trim()).filter(Boolean)
              : []

            return (
              <Link href={`/kurawaku2/cbed/${event.id}`} key={event.id} className="block group">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 hover:border-white/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <OrgBadge event={event} />
                        {displayTypes.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {t}
                          </span>
                        ))}
                        {event.difficulty && (
                          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/10 text-white/50 border border-white/20">
                            {event.difficulty}
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-white group-hover:text-white/90 mb-3 break-words">
                        {event.title}
                      </h2>
                      <div className="flex flex-col gap-1.5 text-sm text-white/50">
                        {(event.date || event.time) && (
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-purple-400" />
                            <span>
                              {event.endDate ? `${event.date} 〜 ${event.endDate}` : event.date}
                              {event.time ? ` ${event.time}` : ""}
                            </span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      詳細 <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
      <p className="mt-10 text-xs text-white/20 leading-relaxed">
        掲載されているイベントの内容は予告なく変更・中止される場合があります。参加にあたってはご自身の判断と責任において、必ず主催者の公式情報をご確認ください。
      </p>
    </>
  )
}
