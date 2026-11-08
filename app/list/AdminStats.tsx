"use client"

import { useEffect, useState } from "react"
import { Loader2, RefreshCw, Users, Activity, HelpCircle, Gift, BookOpen, MessageSquare } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StatsData {
  access: { eventId: string; count: number }[]
  spaceType: {
    eventId: string
    types: Record<string, number>
    axis: { R: number; D: number; I: number; O: number }
    pDist: Record<number, number>
    total: number
  }[]
  quiz: { eventId: string; question: string; total: number; correct: number }[]
  gacha: { eventId: string; prizes: { name: string; count: number }[] }[]
  contentViews: { eventId: string; contents: { id: string; name: string; count: number }[] }[]
  cbedViews: { eventId: string; contents: { id: string; name: string; count: number }[] }[]
  survey: { eventId: string; questions: { text: string; answers: { text: string; count: number }[] }[] }[]
  updatedAt?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pct(n: number, total: number) {
  if (!total) return "0%"
  return `${Math.round((n / total) * 100)}%`
}

function Bar({ value, max, color = "bg-blue-500" }: { value: number; max: number; color?: string }) {
  const w = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden flex-1">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${w}%` }} />
    </div>
  )
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
        <span className="text-zinc-500">{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Empty() {
  return <p className="text-zinc-600 text-xs">データなし</p>
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function AccessSection({ data, filter }: { data: StatsData["access"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  const max = Math.max(...rows.map(r => r.count))
  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div key={r.eventId} className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 w-28 shrink-0 truncate">{r.eventId}</span>
          <Bar value={r.count} max={max} color="bg-blue-500" />
          <span className="text-xs font-mono text-zinc-300 w-16 text-right shrink-0">{r.count} PV</span>
        </div>
      ))}
    </div>
  )
}

const SPACE_TYPE_COLORS: Record<string, string> = {
  RI: "#cbace4", DI: "#85c68b", RO: "#d4d49a", DO: "#83CBEB",
}
const SPACE_TYPE_LABELS: Record<string, string> = {
  RI: "天文台トラベラー (RI)", DI: "人工衛星 (DI)",
  RO: "ロケット打ち上げ (RO)", DO: "宇宙ステーション (DO)",
}
const P_COLORS = ["#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c"]

function SpaceAxisBar({ labelLeft, labelRight, countLeft, countRight }: {
  labelLeft: string; labelRight: string; countLeft: number; countRight: number
}) {
  const total = countLeft + countRight || 1
  const leftPct = Math.round((countLeft / total) * 100)
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-[10px] mb-1">
        <span className="text-zinc-400">{labelLeft} <span className="text-zinc-600">({countLeft})</span></span>
        <span className="text-zinc-400"><span className="text-zinc-600">({countRight})</span> {labelRight}</span>
      </div>
      <div className="h-2 w-full flex rounded-full overflow-hidden bg-zinc-800">
        <div style={{ width: `${leftPct}%` }} className="bg-zinc-300 transition-all" />
        <div style={{ width: `${100 - leftPct}%` }} className="bg-zinc-600 transition-all" />
      </div>
    </div>
  )
}

function SpaceTypeSection({ data, filter }: { data: StatsData["spaceType"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  return (
    <div className="space-y-6">
      {rows.map(r => (
        <div key={r.eventId}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-400">{r.eventId}</span>
            <span className="text-[10px] text-zinc-600">計 {r.total}件</span>
          </div>

          {/* 4タイプ分布 */}
          <div className="space-y-1.5 mb-4">
            {(["RI", "DI", "RO", "DO"] as const)
              .filter(k => r.types[k])
              .sort((a, b) => (r.types[b] || 0) - (r.types[a] || 0))
              .map(type => (
                <div key={type} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: SPACE_TYPE_COLORS[type] }} />
                  <span className="text-[10px] text-zinc-500 w-40 shrink-0 truncate">{SPACE_TYPE_LABELS[type]}</span>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden flex-1">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct(r.types[type] || 0, r.total)}`, backgroundColor: SPACE_TYPE_COLORS[type] }} />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 w-20 text-right shrink-0">
                    {r.types[type] || 0} ({pct(r.types[type] || 0, r.total)})
                  </span>
                </div>
              ))}
          </div>

          {/* 軸バー */}
          <SpaceAxisBar labelLeft="R (ロマン)" labelRight="D (実用)" countLeft={r.axis.R} countRight={r.axis.D} />
          <SpaceAxisBar labelLeft="I (個人)" labelRight="O (社会)" countLeft={r.axis.I} countRight={r.axis.O} />

          {/* P分布（参加意欲 1-5） */}
          <div className="mt-1">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-zinc-500">P（参加意欲）</span>
            </div>
            <div className="h-2 w-full flex rounded-full overflow-hidden bg-zinc-800 mb-1">
              {[1, 2, 3, 4, 5].map((v, i) => {
                const count = r.pDist[v] || 0
                const total = Object.values(r.pDist).reduce((s, c) => s + c, 0) || 1
                const w = Math.round((count / total) * 100)
                return w > 0 ? (
                  <div key={v} style={{ width: `${w}%`, backgroundColor: P_COLORS[i] }}
                    title={`P=${v}: ${count}`} className="transition-all" />
                ) : null
              })}
            </div>
            <div className="flex gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((v, i) => (
                <span key={v} className="flex items-center gap-1 text-[9px] text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P_COLORS[i] }} />
                  P={v}: {r.pDist[v] || 0}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function QuizSection({ data, filter }: { data: StatsData["quiz"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  return (
    <div className="space-y-3">
      {rows.map((r, i) => {
        const rate = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0
        return (
          <div key={i} className="bg-zinc-800/50 rounded-lg px-3 py-2.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] text-zinc-600 mr-2">{r.eventId}</span>
                <span className="text-xs text-zinc-300 leading-snug">{r.question || "（設問テキスト未取得）"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bar value={r.correct} max={r.total} color="bg-emerald-500" />
              <span className="text-xs font-mono text-emerald-400 shrink-0">
                {rate}% ({r.correct}/{r.total})
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GachaSection({ data, filter }: { data: StatsData["gacha"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  return (
    <div className="space-y-5">
      {rows.map(r => {
        const total = r.prizes.reduce((s, p) => s + p.count, 0)
        return (
          <div key={r.eventId}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400">{r.eventId}</span>
              <span className="text-[10px] text-zinc-600">計 {total}件</span>
            </div>
            <div className="space-y-1.5">
              {r.prizes.sort((a, b) => b.count - a.count).map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 w-32 shrink-0 truncate">{p.name}</span>
                  <Bar value={p.count} max={total} color="bg-purple-500" />
                  <span className="text-[10px] font-mono text-zinc-400 w-16 text-right shrink-0">
                    {p.count} ({pct(p.count, total)})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ContentViewsSection({ data, filter }: { data: StatsData["contentViews"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  return (
    <div className="space-y-5">
      {rows.map(r => {
        const max = Math.max(...r.contents.map(c => c.count))
        return (
          <div key={r.eventId}>
            <span className="text-xs font-medium text-zinc-400 block mb-2">{r.eventId}</span>
            <div className="space-y-1.5">
              {r.contents.sort((a, b) => b.count - a.count).map(c => (
                <div key={c.id} className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 w-36 shrink-0 truncate" title={c.name}>{c.name || c.id}</span>
                  <Bar value={c.count} max={max} color="bg-teal-500" />
                  <span className="text-[10px] font-mono text-zinc-400 w-10 text-right shrink-0">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SurveySection({ data, filter }: { data: StatsData["survey"]; filter: string }) {
  const rows = filter ? data.filter(r => r.eventId === filter) : data
  if (!rows.length) return <Empty />
  return (
    <div className="space-y-6">
      {rows.map(r => (
        <div key={r.eventId}>
          <span className="text-xs font-medium text-zinc-400 block mb-3">{r.eventId}</span>
          <div className="space-y-5">
            {r.questions.map((q, qi) => {
              const total = q.answers.reduce((s, a) => s + a.count, 0)
              return (
                <div key={qi} className="bg-zinc-800/50 rounded-lg px-3 py-3">
                  <p className="text-xs text-zinc-300 mb-3 leading-snug">Q{qi + 1}. {q.text}</p>
                  <div className="space-y-2">
                    {q.answers.sort((a, b) => b.count - a.count).map(a => (
                      <div key={a.text} className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 w-40 shrink-0 truncate" title={a.text}>{a.text}</span>
                        <Bar value={a.count} max={total} color="bg-indigo-500" />
                        <span className="text-[10px] font-mono text-zinc-400 w-20 text-right shrink-0">
                          {a.count} ({pct(a.count, total)})
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-2">計 {total}件</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminStats({
  idToken,
  gasPost,
}: {
  idToken: string
  gasPost: (idToken: string, action: string, data?: object) => Promise<StatsData>
}) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("")

  async function load() {
    setLoading(true)
    setError("")
    try {
      const result = await gasPost(idToken, "getStats")
      setStats(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みエラー")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Collect all event IDs across all data types
  const allEventIds = stats
    ? Array.from(new Set([
        ...stats.access.map(r => r.eventId),
        ...stats.spaceType.map(r => r.eventId),
        ...stats.quiz.map(r => r.eventId),
        ...stats.gacha.map(r => r.eventId),
        ...stats.contentViews.map(r => r.eventId),
        ...(stats.cbedViews ?? []).map(r => r.eventId),
        ...stats.survey.map(r => r.eventId),
      ])).sort()
    : []

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {stats && allEventIds.length > 0 && (
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-600"
            >
              <option value="">すべてのイベント</option>
              {allEventIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          )}
          {stats?.updatedAt && (
            <span className="text-[10px] text-zinc-600">更新: {stats.updatedAt}</span>
          )}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          更新
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2 mb-5">{error}</p>
      )}

      {/* Loading skeleton */}
      {loading && !stats && (
        <div className="flex items-center gap-2 text-zinc-600 text-sm py-8">
          <Loader2 className="w-4 h-4 animate-spin" /> 読み込み中...
        </div>
      )}

      {/* Stats grid */}
      {stats && (
        <div className="space-y-5">
          <SectionCard icon={<Activity className="w-4 h-4" />} title="アクセス">
            <AccessSection data={stats.access} filter={filter} />
          </SectionCard>

          <SectionCard icon={<MessageSquare className="w-4 h-4" />} title="アンケート">
            <SurveySection data={stats.survey} filter={filter} />
          </SectionCard>

          <SectionCard icon={<Users className="w-4 h-4" />} title="宇宙タイプ診断">
            <SpaceTypeSection data={stats.spaceType} filter={filter} />
          </SectionCard>

          <SectionCard icon={<HelpCircle className="w-4 h-4" />} title="限定クイズ">
            <QuizSection data={stats.quiz} filter={filter} />
          </SectionCard>

          <SectionCard icon={<Gift className="w-4 h-4" />} title="ガチャ">
            <GachaSection data={stats.gacha} filter={filter} />
          </SectionCard>

          <SectionCard icon={<BookOpen className="w-4 h-4" />} title="コンテンツ閲覧 (CBMD)">
            <ContentViewsSection data={stats.contentViews} filter={filter} />
          </SectionCard>

          {stats.cbedViews?.length > 0 && (
            <SectionCard icon={<BookOpen className="w-4 h-4" />} title="イベント閲覧 (CBED)">
              <ContentViewsSection data={stats.cbedViews} filter={filter} />
            </SectionCard>
          )}
        </div>
      )}
    </div>
  )
}
