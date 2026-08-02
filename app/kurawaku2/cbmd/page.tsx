import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EventHeader } from "@/components/event-header"
import { eventPageData } from "@/data/event-page-data"

export const metadata = {
  title: "Cosmo Base Museum Database | くらわくトーク#2",
  description: "全国の宇宙関連施設を地図・検索で探せるデータベース。",
}

export default function KurawakuCbmdPage() {
  const data = eventPageData
  return (
    <div className="min-h-dvh bg-[#000033]">
      <EventHeader logoUrl={data.site.logoUrl} eventName={data.event.shortName} />
      <div className="pt-14 flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-md w-full text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/event/CBMD_logo.png" alt="CBMD" className="h-20 w-auto object-contain mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-3">Cosmo Base Museum Database</h1>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">
            全国の宇宙関連施設を地図・検索で探せるデータベース。<br />
            科学館、博物館、プラネタリウムなど幅広く掲載しています。
          </p>
          <Link
            href="/cbmd"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            CBMDを開く
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
