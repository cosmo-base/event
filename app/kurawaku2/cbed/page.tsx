import Image from "next/image"
import Link from "next/link"
import { Map, Calendar, Filter } from "lucide-react"

export const metadata = {
  title: "Cosmo Base Event Database | くらわくトーク#2",
  description: "全国の宇宙関連イベントを地図・カレンダー・検索で探せるデータベース。",
}

export default function CbedPage() {
  return (
    <>
      {/* Title + Logo header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-balance">
          Cosmo Base Event Database
        </h1>
        <div className="shrink-0">
          <Image
            src="/event/CBED_logo.png"
            alt="CBED logo"
            width={200}
            height={96}
            className="h-24 w-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Hero description */}
      <div className="glass-card rounded-xl p-8 mb-8 border border-white/10">
        <div className="text-white/60 leading-relaxed space-y-3 text-sm">
          <p>
            全国で開催される宇宙関連のイベント情報を、カレンダー形式で一覧できるデータベースです。「どこで探せばいいか分からない」「気づいたら終わっていた」という悩みを解決するために生まれました。
          </p>
          <p>
            気軽な交流会から専門的なカンファレンスまで幅広く掲載しており、探しやすさと見つけやすさにこだわっています。一つひとつ探し回らなくても、ここを見るだけでイベントの全体像をつかむことができます。
          </p>
          <p>
            じっくり学びたい方も、まずは気軽に参加してみたい方も、ご自身の興味やスケジュールに合わせて探せます。
          </p>
          <p className="text-xs text-white/30 mt-4">
            掲載されているイベントの内容は予告なく変更・中止される場合があります。ご参加にあたってはご自身の判断と責任において、必ず主催者の公式情報をご確認ください。
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Map className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">地図で探す</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">
            日本地図上でイベントを探せます。<br />
            お近くのイベントを見つけましょう。
          </p>
          <Link
            href="/kurawaku2/cbed/map"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
          >
            地図で探す
          </Link>
        </div>

        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">カレンダーで探す</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">
            月間カレンダーでイベントをチェック。<br />
            スケジュール管理に便利です。
          </p>
          <Link
            href="/kurawaku2/cbed/calendar"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
          >
            カレンダーで探す
          </Link>
        </div>

        <div className="glass-card rounded-xl p-6 border border-white/10 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">詳細検索</h3>
          </div>
          <p className="text-white/60 text-sm mb-4">
            日付、エリア、カテゴリ、参加費など様々な条件で絞り込み検索。
          </p>
          <Link
            href="/kurawaku2/cbed/search"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
          >
            詳細検索
          </Link>
        </div>
      </div>
    </>
  )
}
