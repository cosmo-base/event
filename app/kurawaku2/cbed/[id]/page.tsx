import { fetchEventsData } from "@/data/cbed"
import { notFound } from "next/navigation"
import { Calendar, Clock, MapPin, Users, ArrowLeft, ExternalLink, User, Building, CalendarPlus } from "lucide-react"
import Link from "next/link"

export const dynamicParams = false

export async function generateStaticParams() {
  const events = await fetchEventsData()
  const seen = new Set<string>()
  const params: { id: string }[] = []
  events.forEach((e) => {
    const id = String(e.id).trim()
    if (id && !seen.has(id)) { seen.add(id); params.push({ id }) }
  })
  // Ensure at least one param so the route is not flagged as missing generateStaticParams
  // when data is unavailable at build time (e.g. proxy restrictions in CI).
  if (params.length === 0) params.push({ id: "_placeholder" })
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const events = await fetchEventsData()
  const event = events.find((e) => String(e.id).trim() === decodeURIComponent(id))
  if (!event) return { title: "イベントが見つかりません" }
  return {
    title: `${event.title} | くらわくトーク#2 CBED`,
    description: event.description?.slice(0, 100) ?? `${event.title}の詳細情報ページです。`,
  }
}

function getGoogleCalendarUrl(event: { title?: string; description?: string; link?: string; date?: string; endDate?: string; time?: string; location?: string }) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  const title = encodeURIComponent(event.title || "宇宙イベント")
  const details = encodeURIComponent((event.description || "") + (event.link ? `\n\n🔗 ${event.link}` : ""))
  const location = encodeURIComponent(event.location || "")

  let datesParam = ""
  try {
    const m = event.date?.match(/(\d{4})[-/年\.]\s*(\d{1,2})[-/月\.]\s*(\d{1,2})/)
    if (m) {
      const startDate = `${m[1]}${m[2].padStart(2, "0")}${m[3].padStart(2, "0")}`
      const em = event.endDate?.match(/(\d{4})[-/年\.]\s*(\d{1,2})[-/月\.]\s*(\d{1,2})/)
      const endDate = em ? `${em[1]}${em[2].padStart(2, "0")}${em[3].padStart(2, "0")}` : startDate
      const times = event.time?.match(/(\d{1,2}):(\d{2})/g)
      if (times) {
        const st = times[0].replace(":", "").padStart(4, "0") + "00"
        const et = times[1] ? times[1].replace(":", "").padStart(4, "0") + "00" : `${String((parseInt(times[0].split(":")[0]) + 1) % 24).padStart(2, "0")}${times[0].split(":")[1]}00`
        datesParam = `&dates=${startDate}T${st}/${endDate}T${et}&ctz=Asia/Tokyo`
      } else {
        const nextDay = new Date(`${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`)
        nextDay.setDate(nextDay.getDate() + 1)
        datesParam = `&dates=${startDate}/${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, "0")}${String(nextDay.getDate()).padStart(2, "0")}`
      }
    }
  } catch { /* ignore */ }

  return `${base}&text=${title}&details=${details}&location=${location}${datesParam}`
}

export default async function CbedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const events = await fetchEventsData()
  const event = events.find((e) => String(e.id).trim() === decodeURIComponent(id))
  if (!event) notFound()

  const isCosmoBase = event.organizer ? String(event.organizer).replace(/\s+/g, "").toLowerCase().includes("cosmobase") : false
  const isPartner = Boolean(event.isPartner && String(event.isPartner).toUpperCase() === "TRUE")

  let orgLabel = "外部イベント"
  let orgStyle = "bg-white/10 text-white/50 border-white/20"
  if (isCosmoBase) { orgLabel = "主催イベント"; orgStyle = "bg-purple-500/20 text-purple-300 border-purple-500/30" }
  else if (isPartner) { orgLabel = "パートナー"; orgStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" }

  return (
    <>
      <div className="mb-6">
        <Link href="/kurawaku2/cbed/search" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          検索に戻る
        </Link>
      </div>

      <div className="glass-card rounded-xl p-6 md:p-8 max-w-3xl border border-white/10">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${orgStyle}`}>{orgLabel}</span>
            {event.type && String(event.type).split(",").map((t, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {t.trim()}
              </span>
            ))}
            {event.difficulty && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/50 border border-white/15">
                {event.difficulty}
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-balance">{event.title}</h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-white bg-white/5 p-5 rounded-lg border border-white/10">
            {event.date && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                <span>{event.endDate ? `${event.date} 〜 ${event.endDate}` : event.date}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap leading-relaxed">{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            {event.capacity && (
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white/40 shrink-0" />
                <span className="text-white/70">定員: {event.capacity}</span>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white/40 shrink-0" />
                <span className="text-white/70">登壇: {event.speaker}</span>
              </div>
            )}
            {event.organizer && (
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-white/40 shrink-0" />
                <span className="text-white/70">主催: {event.organizer}</span>
              </div>
            )}
          </div>
        </div>

        {event.description && (
          <div className="mb-10">
            <h3 className="text-base font-semibold text-white/70 border-b border-white/10 pb-2 mb-4">イベントについて</h3>
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm">{event.description}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6 border-t border-white/10">
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:min-w-[180px]">
              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-colors">
                詳細・申し込み
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          )}
          {event.date && (
            <a href={getGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:min-w-[180px]">
              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-colors">
                Googleカレンダーに追加
                <CalendarPlus className="w-4 h-4" />
              </div>
            </a>
          )}
          {event.location && (
            <a
              href={
                event.lat && event.lng
                  ? `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&ll=${event.lat},${event.lng}&z=16`
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:min-w-[180px]"
            >
              <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-colors">
                Googleマップで開く
                <MapPin className="w-4 h-4" />
              </div>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
