"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { TagBadge } from "@/components/tag-badge"
import { Button } from "@/components/ui/button"

export function LinkedEvents({ events }: { events: any[] }) {
  const [showPast, setShowPast] = useState(false)

  const parseDate = (dStr: string) => {
    if (!dStr) return null
    const match = dStr.match(/(\d{4})[-/年\.]\s*(\d{1,2})[-/月\.]\s*(\d{1,2})/)
    if (!match) return null
    return new Date(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10))
  }

  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = events.filter((e) => {
    const end = parseDate(e.endDate) || parseDate(e.date)
    if (!end) return true
    return end >= today
  })

  const pastEvents = events.filter((e) => {
    const end = parseDate(e.endDate) || parseDate(e.date)
    if (!end) return false
    return end < today
  })

  const getDateDisplay = (event: any) => {
    if (event.endDate) return `${event.date} 〜 ${event.endDate}`
    return event.date
  }

  if (events.length === 0) return null

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">連携イベント情報</h2>
      </div>
      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div key={`upcoming-${index}`} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-medium text-foreground">{event.title}</h3>
              <TagBadge variant="accent" className="shrink-0">{getDateDisplay(event)}</TagBadge>
            </div>
          </div>
        ))}

        {upcomingEvents.length === 0 && (
          <p className="text-sm text-muted-foreground px-2">現在予定されているイベントはありません。</p>
        )}

        {pastEvents.length > 0 && (
          <div className="pt-2">
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={() => setShowPast(!showPast)}>
              {showPast ? <><ChevronUp className="w-4 h-4 mr-2" />過去のイベントを隠す</> : <><ChevronDown className="w-4 h-4 mr-2" />過去のイベントを表示する ({pastEvents.length}件)</>}
            </Button>
            {showPast && (
              <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                {pastEvents.map((event, index) => (
                  <div key={`past-${index}`} className="glass rounded-xl p-4 opacity-60">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-medium text-foreground">{event.title}</h3>
                      <TagBadge className="shrink-0">{getDateDisplay(event)}</TagBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  )
}
