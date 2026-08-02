import { fetchEventsData } from "@/data/cbed"
import { fetchLaunchesData } from "@/data/launches"
import CbedEventCalendar from "@/components/cbed-event-calendar"

export const metadata = {
  title: "イベントカレンダー | CBED",
}

export default async function CbedCalendarPage() {
  const [events, launches] = await Promise.all([
    fetchEventsData(),
    fetchLaunchesData().catch(() => []),
  ])

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2">イベントカレンダー</h1>
      <p className="text-white/50 text-sm mb-6">全国の宇宙イベントやロケット打ち上げ日程を月別に確認できます。</p>
      <CbedEventCalendar events={events} launches={launches} />
    </>
  )
}
