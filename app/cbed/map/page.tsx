"use client"

import { useEffect, useState, useMemo } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MapPin, Navigation, Map as MapIcon, Loader2, ChevronRight } from "lucide-react"
import { fetchEventsData, SpaceEvent } from "@/data/cbed"

const IMPERIAL_PALACE: [number, number] = [35.6852, 139.7528]

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function isPastEvent(dateStr?: string, endDateStr?: string): boolean {
  const targetStr = endDateStr || dateStr
  if (!targetStr) return false
  const match = targetStr.match(/(\d{4})[-/年\.]\s*(\d{1,2})[-/月\.]\s*(\d{1,2})/)
  if (!match) return false
  const eventDate = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return eventDate < today
}

const DynamicMap = dynamic(() => import("@/components/cbed-event-map"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full w-full text-white/40 min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="text-sm">地図を読み込み中...</p>
    </div>
  ),
})

export default function CbedMapPage() {
  const pathname = usePathname()
  const base = pathname.match(/^(.*cbed)/)?.[1] ?? "/cbed"

  const [center, setCenter] = useState<[number, number]>(IMPERIAL_PALACE)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [mapBounds, setMapBounds] = useState<{ n: number; s: number; e: number; w: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEventsData().then((data) => {
      setEvents(data.filter((e) => typeof e.lat === "number" && typeof e.lng === "number" && !isPastEvent(e.date, e.endDate)))
      setIsLoading(false)
    })
  }, [])

  const handleGetLocation = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude]
          setUserLocation(loc)
          setCenter(loc)
          setIsLocating(false)
        },
        () => {
          alert("現在地を取得できませんでした。")
          setIsLocating(false)
        }
      )
    } else {
      alert("お使いのブラウザは位置情報に対応していません。")
      setIsLocating(false)
    }
  }

  const visibleEvents = useMemo(() => {
    const filtered = mapBounds
      ? events.filter(
          (e) => e.lat! <= mapBounds.n && e.lat! >= mapBounds.s && e.lng! <= mapBounds.e && e.lng! >= mapBounds.w
        )
      : events
    const ref = userLocation || center
    return filtered
      .map((e) => {
        const dist = calculateDistance(ref[0], ref[1], e.lat!, e.lng!)
        return { ...e, distanceKm: dist, distanceStr: dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km` }
      })
      .sort((a, b) => a.distanceKm - b.distanceKm)
  }, [events, mapBounds, userLocation, center])

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">地図で探す</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-xl overflow-hidden flex flex-col h-[450px] md:h-[600px] relative border border-white/10">
          <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-start gap-3 pointer-events-none">
            <div className="bg-[#000033]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 pointer-events-auto">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-white">
                <MapIcon className="w-4 h-4 text-white/60" />
                全国のイベントマップ
              </h3>
            </div>
            <button
              onClick={handleGetLocation}
              disabled={isLocating}
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-medium border border-white/20 transition-colors disabled:opacity-50"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? "animate-pulse" : ""}`} />
              現在地から探す
            </button>
          </div>
          <div className="flex-1 relative w-full h-full min-h-[400px] bg-[#000033]/50">
            {!isLoading && <DynamicMap events={events} center={center} onBoundsChange={setMapBounds} />}
          </div>
        </div>

        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="glass-card rounded-xl p-5 h-[500px] md:h-[600px] flex flex-col border border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              表示中のイベント ({visibleEvents.length}件)
            </h3>
            <div className="space-y-2 overflow-y-auto flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-white/40" />
                </div>
              ) : visibleEvents.length > 0 ? (
                visibleEvents.map((event) => (
                  <Link href={`${base}/${event.id}`} key={event.id} className="block group">
                    <div className="p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors relative">
                      <h4 className="font-medium text-sm text-white mb-1 pr-5 group-hover:text-white/90">
                        {event.title}
                      </h4>
                      <ChevronRight className="w-4 h-4 text-white/30 absolute right-3 top-3 group-hover:text-white/60" />
                      <div className="flex flex-col gap-1 text-[11px] text-white/40 mt-1">
                        {event.location && (
                          <div className="flex items-center justify-between">
                            <span className="line-clamp-1 mr-2">{event.location}</span>
                            <span className="text-blue-400 font-medium shrink-0">{event.distanceStr}</span>
                          </div>
                        )}
                        {(event.date || event.time) && (
                          <div className="bg-white/5 w-fit px-2 py-0.5 rounded text-white/40">
                            {event.date} {event.time}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-white/30 text-center mt-10">
                  このエリアにはイベントがありません。<br />地図を移動するか縮小してみてください。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
