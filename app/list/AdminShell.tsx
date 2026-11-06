"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ExternalLink, LogOut, Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw, Loader2, ChevronDown } from "lucide-react"
import Link from "next/link"

// ─── Types ──────────────────────────────────────────────────────────────────

interface AdminEvent {
  eventId: string
  published: boolean | string
  name: string
  shortName: string
  date: string
  venue: string
  participationType: string
  createdAt?: string
  updatedAt?: string
}

interface AdminUser {
  email: string
  name?: string
  picture?: string
}

interface GoogleCredential {
  credential: string
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: object) => void
          renderButton: (el: HTMLElement, config: object) => void
          disableAutoSelect: () => void
        }
      }
    }
    handleGoogleCredential: (response: GoogleCredential) => void
  }
}

// ─── Constants ──────────────────────────────────────────────────────────────

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL ?? ""
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""

// ─── Helpers ────────────────────────────────────────────────────────────────

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
  } catch {
    return null
  }
}

async function gasPost(idToken: string, action: string, data?: object) {
  if (!GAS_URL) throw new Error("NEXT_PUBLIC_GAS_URL not set")
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken, action, data }),
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.result
}

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ published }: { published: boolean | string }) {
  const isPublished = published === true || published === "TRUE"
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
      isPublished
        ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
        : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-400" : "bg-zinc-500"}`} />
      {isPublished ? "公開中" : "非公開"}
    </span>
  )
}

// ─── Event Edit Modal ────────────────────────────────────────────────────────

interface EventFormData {
  eventId: string
  name: string
  shortName: string
  date: string
  venue: string
  boothNumber: string
  pitchTime: string
  participationType: string
  exhibitorName: string
  message: string
  pageTitle: string
  pageDescription: string
  accentColor: string
  noindex: boolean
  published: boolean
}

const EMPTY_FORM: EventFormData = {
  eventId: "", name: "", shortName: "", date: "", venue: "",
  boothNumber: "", pitchTime: "", participationType: "", exhibitorName: "",
  message: "", pageTitle: "", pageDescription: "", accentColor: "#f59e0b",
  noindex: true, published: false,
}

function EventModal({
  event,
  onClose,
  onSave,
}: {
  event: Partial<EventFormData> | null
  onClose: () => void
  onSave: (data: EventFormData) => Promise<void>
}) {
  const [form, setForm] = useState<EventFormData>(event ? { ...EMPTY_FORM, ...event } as EventFormData : EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const set = (key: keyof EventFormData, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.eventId.trim()) { setError("イベントIDは必須です"); return }
    setSaving(true)
    setError("")
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-white">{event?.eventId ? "イベント編集" : "新規イベント作成"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Field label="イベントID *" note="URLのパスになります (例: StEX26)">
            <input
              value={form.eventId}
              onChange={e => set("eventId", e.target.value)}
              disabled={!!event?.eventId}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
              placeholder="NewEvent26"
            />
          </Field>

          <Field label="イベント名">
            <input value={form.name} onChange={e => set("name", e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="略称">
              <input value={form.shortName} onChange={e => set("shortName", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </Field>
            <Field label="開催日">
              <input value={form.date} onChange={e => set("date", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="2026年9月1日（火）" />
            </Field>
          </div>

          <Field label="会場">
            <input value={form.venue} onChange={e => set("venue", e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="参加形態">
              <input value={form.participationType} onChange={e => set("participationType", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="ブース出展" />
            </Field>
            <Field label="出展者名">
              <input value={form.exhibitorName} onChange={e => set("exhibitorName", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </Field>
          </div>

          <Field label="ページタイトル">
            <input value={form.pageTitle} onChange={e => set("pageTitle", e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </Field>

          <Field label="ページ説明文">
            <textarea value={form.pageDescription} onChange={e => set("pageDescription", e.target.value)} rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" />
          </Field>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={form.noindex} onChange={e => set("noindex", e.target.checked)}
                className="w-4 h-4 accent-blue-500" />
              <span className="text-sm text-zinc-300">検索エンジンにインデックスしない</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors">
              キャンセル
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {event?.eventId ? "保存する" : "作成する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
        {label}
        {note && <span className="ml-1.5 text-zinc-600 font-normal">{note}</span>}
      </label>
      {children}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [idToken, setIdToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<AdminEvent[] | null>(null)
  const [gasError, setGasError] = useState("")
  const [modalEvent, setModalEvent] = useState<Partial<EventFormData> | null | "new">(null)
  const [buildState, setBuildState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const signInRef = useRef<HTMLDivElement>(null)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)

  const isConfigured = !!GAS_URL && !!GOOGLE_CLIENT_ID

  const handleCredential = useCallback(async (response: GoogleCredential) => {
    const payload = decodeJwt(response.credential)
    if (!payload) return
    setUser({ email: payload.email, name: payload.name, picture: payload.picture })
    setIdToken(response.credential)
    setLoading(true)
    setGasError("")
    try {
      const result = await gasPost(response.credential, "getEvents")
      setEvents(result || [])
    } catch (err) {
      setGasError(err instanceof Error ? err.message : "読み込みエラー")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isConfigured) return
    window.handleGoogleCredential = handleCredential
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredential,
      })
      if (signInRef.current) {
        window.google?.accounts.id.renderButton(signInRef.current, {
          theme: "filled_black",
          size: "medium",
          locale: "ja",
        })
      }
    }
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [isConfigured, handleCredential])

  async function handlePublishToggle(ev: AdminEvent) {
    if (!idToken) return
    const isPublished = ev.published === true || ev.published === "TRUE"
    setActionLoading(ev.eventId + ":publish")
    try {
      await gasPost(idToken, isPublished ? "unpublishEvent" : "publishEvent", { eventId: ev.eventId })
      setEvents(prev => prev?.map(e => e.eventId === ev.eventId ? { ...e, published: !isPublished } : e) ?? null)
    } catch (err) {
      alert(err instanceof Error ? err.message : "エラー")
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDelete(ev: AdminEvent) {
    if (!idToken) return
    if (!confirm(`「${ev.name}」を削除しますか？この操作は元に戻せません。`)) return
    setActionLoading(ev.eventId + ":delete")
    try {
      await gasPost(idToken, "deleteEvent", { eventId: ev.eventId })
      setEvents(prev => prev?.filter(e => e.eventId !== ev.eventId) ?? null)
    } catch (err) {
      alert(err instanceof Error ? err.message : "エラー")
    } finally {
      setActionLoading(null)
    }
  }

  async function handleSave(data: EventFormData) {
    if (!idToken) return
    const isEdit = events?.some(e => e.eventId === data.eventId)
    await gasPost(idToken, isEdit ? "updateEvent" : "createEvent", data)
    const result = await gasPost(idToken, "getEvents")
    setEvents(result || [])
  }

  async function handleTriggerBuild() {
    if (!idToken) return
    if (!confirm("GitHub Actionsでビルドをトリガーしますか？")) return
    setBuildState("loading")
    try {
      await gasPost(idToken, "triggerBuild")
      setBuildState("done")
      setTimeout(() => setBuildState("idle"), 5000)
    } catch (err) {
      setBuildState("error")
      alert(err instanceof Error ? err.message : "ビルドトリガーに失敗しました")
      setTimeout(() => setBuildState("idle"), 3000)
    }
  }

  function logout() {
    setUser(null)
    setIdToken(null)
    setEvents(null)
    setAdminPanelOpen(false)
    window.google?.accounts.id.disableAutoSelect()
    if (signInRef.current) {
      window.google?.accounts.id.renderButton(signInRef.current, {
        theme: "filled_black",
        size: "medium",
        locale: "ja",
      })
    }
  }

  // Not configured — render children without admin
  if (!isConfigured) {
    return <>{children}</>
  }

  return (
    <>
      {/* Admin Bar */}
      <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-auto">管理画面</span>

          {!user ? (
            <div ref={signInRef} />
          ) : (
            <div className="flex items-center gap-3">
              {/* Build button */}
              <button
                onClick={handleTriggerBuild}
                disabled={buildState === "loading"}
                title="GitHub Actions でビルドをトリガー"
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  buildState === "done" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" :
                  buildState === "error" ? "bg-red-500/20 border-red-500/30 text-red-400" :
                  "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {buildState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                {buildState === "done" ? "ビルド開始" : buildState === "error" ? "失敗" : "ビルド"}
              </button>

              {/* Admin panel toggle */}
              <button
                onClick={() => setAdminPanelOpen(v => !v)}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                {user.picture && <img src={user.picture} alt="" className="w-5 h-5 rounded-full" />}
                <span className="text-xs text-zinc-300">{user.name ?? user.email}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${adminPanelOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Panel */}
      {user && adminPanelOpen && (
        <div className="bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-white">イベントページ管理</h2>
                <p className="text-xs text-zinc-500 mt-0.5">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalEvent("new")}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> 新規作成
                </button>
                <button onClick={logout} className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1.5 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> ログアウト
                </button>
              </div>
            </div>

            {/* GAS not configured notice */}
            {!GAS_URL && (
              <p className="text-yellow-400 text-xs">NEXT_PUBLIC_GAS_URL が設定されていません。GAS をデプロイして設定してください。</p>
            )}

            {/* Error */}
            {gasError && <p className="text-red-400 text-sm">{gasError}</p>}

            {/* Loading */}
            {loading && (
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> 読み込み中...
              </div>
            )}

            {/* Events table */}
            {events && (
              <div className="space-y-2">
                {events.length === 0 && (
                  <p className="text-zinc-500 text-sm">イベントがありません。「新規作成」から追加してください。</p>
                )}
                {events.map(ev => {
                  const isLoading = actionLoading?.startsWith(ev.eventId)
                  return (
                    <div key={ev.eventId} className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white text-sm">{ev.name || ev.eventId}</span>
                          <StatusBadge published={ev.published} />
                          <span className="text-xs text-zinc-600">{ev.eventId}</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">{ev.date} · {ev.venue}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link href={`/${ev.eventId}`} target="_blank"
                          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors" title="開く">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button onClick={() => setModalEvent(ev as Partial<EventFormData>)} disabled={isLoading}
                          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors" title="編集">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handlePublishToggle(ev)} disabled={isLoading}
                          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                          title={(ev.published === true || ev.published === "TRUE") ? "非公開にする" : "公開する"}>
                          {isLoading && actionLoading === ev.eventId + ":publish"
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : (ev.published === true || ev.published === "TRUE")
                              ? <EyeOff className="w-3.5 h-3.5" />
                              : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => handleDelete(ev)} disabled={isLoading}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors" title="削除">
                          {isLoading && actionLoading === ev.eventId + ":delete"
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Modal */}
      {modalEvent !== null && (
        <EventModal
          event={modalEvent === "new" ? null : modalEvent}
          onClose={() => setModalEvent(null)}
          onSave={handleSave}
        />
      )}

      {/* Page content */}
      {children}
    </>
  )
}
