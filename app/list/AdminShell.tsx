"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ExternalLink, LogOut, Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw, Loader2, Upload, FileText, X, FolderOpen, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// ─── Types ──────────────────────────────────────────────────────────────────

interface AdminEvent {
  eventId: string
  published: boolean | string
  noindex?: boolean | string
  name: string
  shortName?: string
  date?: string
  venue?: string
  participationType?: string
  exhibitorName?: string
  boothNumber?: string
  pitchTime?: string
  websiteUrl?: string
  registrationUrl?: string
  twitterUrl?: string
  message?: string
  announcementText?: string
  staffNote?: string
  pageTitle?: string
  pageDescription?: string
  accentColor?: string
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

interface DriveFile {
  fileId: string
  fileName: string
  fileUrl: string
  mimeType?: string
  uploadedAt?: string
}

interface EventFormData {
  eventId: string
  name: string
  shortName: string
  date: string
  venue: string
  participationType: string
  exhibitorName: string
  boothNumber: string
  pitchTime: string
  websiteUrl: string
  registrationUrl: string
  twitterUrl: string
  message: string
  announcementText: string
  staffNote: string
  pageTitle: string
  pageDescription: string
  accentColor: string
  noindex: boolean
  published: boolean
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
const DRIVE_FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID ?? ""

const EMPTY_FORM: EventFormData = {
  eventId: "", name: "", shortName: "", date: "", venue: "",
  participationType: "", exhibitorName: "", boothNumber: "", pitchTime: "",
  websiteUrl: "", registrationUrl: "", twitterUrl: "",
  message: "", announcementText: "", staffNote: "",
  pageTitle: "", pageDescription: "", accentColor: "#f59e0b",
  noindex: true, published: false,
}

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
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ idToken, action, data }),
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.result
}

function normalizeFormEvent(event: Partial<EventFormData>): Partial<EventFormData> {
  return {
    ...event,
    published: event.published === true || (event.published as unknown) === "TRUE",
    noindex: event.noindex === true || (event.noindex as unknown) === "TRUE",
  }
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(",")[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

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

// ─── Field ────────────────────────────────────────────────────────────────────

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

const INPUT = "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"

// ─── File Upload Section ───────────────────────────────────────────────────────

function FileUploadSection({ eventId, idToken }: { eventId: string; idToken: string }) {
  const [files, setFiles] = useState<DriveFile[] | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    gasPost(idToken, "getEventFiles", { eventId })
      .then(result => setFiles(result || []))
      .catch(() => setFiles([]))
  }, [eventId, idToken])

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("ファイルサイズは10MB以下にしてください")
      return
    }
    setUploading(true)
    setUploadError("")
    try {
      const base64 = await readFileAsBase64(file)
      const result = await gasPost(idToken, "uploadFile", {
        eventId,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        content: base64,
      })
      setFiles(prev => [...(prev || []), result])
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "アップロードに失敗しました")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function handleDeleteFile(fileId: string) {
    if (!confirm("このファイルを削除しますか？")) return
    try {
      await gasPost(idToken, "deleteFile", { fileId })
      setFiles(prev => prev?.filter(f => f.fileId !== fileId) ?? null)
    } catch (err) {
      alert(err instanceof Error ? err.message : "削除に失敗しました")
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">アップロード済みファイル</span>
        <label className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
          uploading ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}>
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          {uploading ? "アップロード中..." : "ファイルを追加"}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.zip,.txt,.csv"
          />
        </label>
      </div>

      {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}

      {files === null && (
        <div className="flex items-center gap-2 text-zinc-600 text-xs">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...
        </div>
      )}

      {files?.length === 0 && (
        <p className="text-zinc-600 text-xs">ファイルがありません</p>
      )}

      {files && files.length > 0 && (
        <div className="space-y-1.5">
          {files.map(file => (
            <div key={file.fileId} className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-2">
              <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-xs text-blue-400 hover:text-blue-300 truncate transition-colors">
                {file.fileName}
              </a>
              {file.uploadedAt && (
                <span className="text-[10px] text-zinc-600 shrink-0">{file.uploadedAt}</span>
              )}
              <button onClick={() => handleDeleteFile(file.fileId)}
                className="p-0.5 text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-zinc-600">PDF, Word, Excel, PowerPoint, 画像, ZIP など（最大10MB）</p>
    </div>
  )
}

// ─── Section Divider ─────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-2 pb-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{label}</span>
    </div>
  )
}

// ─── Event Modal ─────────────────────────────────────────────────────────────

function EventModal({
  event,
  onClose,
  onSave,
  idToken,
}: {
  event: Partial<EventFormData> | null
  onClose: () => void
  onSave: (data: EventFormData) => Promise<void>
  idToken: string
}) {
  const [form, setForm] = useState<EventFormData>(
    event ? { ...EMPTY_FORM, ...normalizeFormEvent(event) } as EventFormData : EMPTY_FORM
  )
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

  const isEdit = !!event?.eventId

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-bold text-white">{isEdit ? "イベント編集" : "新規イベント作成"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}

          {/* 基本情報 */}
          <SectionDivider label="基本情報" />

          <Field label="イベントID *" note="URLのパスになります（例: StEX26）">
            <input value={form.eventId} onChange={e => set("eventId", e.target.value)}
              disabled={isEdit} className={INPUT} placeholder="NewEvent26" />
          </Field>

          <Field label="イベント名">
            <input value={form.name} onChange={e => set("name", e.target.value)} className={INPUT} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="略称">
              <input value={form.shortName} onChange={e => set("shortName", e.target.value)} className={INPUT} />
            </Field>
            <Field label="開催日">
              <input value={form.date} onChange={e => set("date", e.target.value)} className={INPUT}
                placeholder="2026年9月1日（火）" />
            </Field>
          </div>

          <Field label="会場">
            <input value={form.venue} onChange={e => set("venue", e.target.value)} className={INPUT} />
          </Field>

          {/* 参加情報 */}
          <SectionDivider label="参加情報" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="参加形態">
              <input value={form.participationType} onChange={e => set("participationType", e.target.value)}
                className={INPUT} placeholder="ブース出展" />
            </Field>
            <Field label="出展者名">
              <input value={form.exhibitorName} onChange={e => set("exhibitorName", e.target.value)} className={INPUT} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="ブース番号">
              <input value={form.boothNumber} onChange={e => set("boothNumber", e.target.value)}
                className={INPUT} placeholder="A-12" />
            </Field>
            <Field label="ピッチ時間">
              <input value={form.pitchTime} onChange={e => set("pitchTime", e.target.value)}
                className={INPUT} placeholder="14:30〜14:45" />
            </Field>
          </div>

          {/* リンク */}
          <SectionDivider label="リンク" />

          <Field label="公式サイトURL">
            <input value={form.websiteUrl} onChange={e => set("websiteUrl", e.target.value)}
              className={INPUT} placeholder="https://example.com" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="参加申込みURL">
              <input value={form.registrationUrl} onChange={e => set("registrationUrl", e.target.value)}
                className={INPUT} placeholder="https://..." />
            </Field>
            <Field label="Twitter/X">
              <input value={form.twitterUrl} onChange={e => set("twitterUrl", e.target.value)}
                className={INPUT} placeholder="https://x.com/..." />
            </Field>
          </div>

          {/* ページ設定 */}
          <SectionDivider label="ページ設定" />

          <Field label="ページタイトル">
            <input value={form.pageTitle} onChange={e => set("pageTitle", e.target.value)} className={INPUT} />
          </Field>

          <Field label="ページ説明文">
            <textarea value={form.pageDescription} onChange={e => set("pageDescription", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} />
          </Field>

          <Field label="アクセントカラー">
            <div className="flex items-center gap-2">
              <input type="color" value={form.accentColor} onChange={e => set("accentColor", e.target.value)}
                className="w-10 h-9 rounded-md border border-zinc-700 bg-zinc-800 cursor-pointer" />
              <input value={form.accentColor} onChange={e => set("accentColor", e.target.value)}
                className={`${INPUT} flex-1`} placeholder="#f59e0b" />
            </div>
          </Field>

          {/* 告知・メモ */}
          <SectionDivider label="告知・メモ" />

          <Field label="お知らせ文" note="イベントページに表示">
            <textarea value={form.announcementText} onChange={e => set("announcementText", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} placeholder="「○○で会いましょう！」など" />
          </Field>

          <Field label="本文メッセージ">
            <textarea value={form.message} onChange={e => set("message", e.target.value)}
              rows={3} className={`${INPUT} resize-none`} />
          </Field>

          <Field label="社内メモ" note="非公開・管理用">
            <textarea value={form.staffNote} onChange={e => set("staffNote", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} placeholder="準備状況・連絡事項など" />
          </Field>

          {/* 表示設定 */}
          <SectionDivider label="表示設定" />

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={!!form.published} onChange={e => set("published", e.target.checked)}
                className="w-4 h-4 accent-emerald-500" />
              <span className="text-sm text-zinc-300">公開する</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={!!form.noindex} onChange={e => set("noindex", e.target.checked)}
                className="w-4 h-4 accent-blue-500" />
              <span className="text-sm text-zinc-300">検索エンジンにインデックスしない</span>
            </label>
          </div>

          {/* 資料ファイル（編集時のみ） */}
          {isEdit && (
            <>
              <SectionDivider label="資料ファイル" />
              <FileUploadSection eventId={form.eventId} idToken={idToken} />
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-800 mt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors">
              キャンセル
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "保存する" : "作成する"}
            </button>
          </div>
        </form>
      </div>
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
        use_fedcm_for_prompt: true,
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
    const normalized: EventFormData = {
      ...data,
      published: data.published === true || (data.published as unknown) === "TRUE",
      noindex: data.noindex === true || (data.noindex as unknown) === "TRUE",
    }
    await gasPost(idToken, isEdit ? "updateEvent" : "createEvent", normalized)
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
    window.google?.accounts.id.disableAutoSelect()
    if (signInRef.current) {
      window.google?.accounts.id.renderButton(signInRef.current, {
        theme: "filled_black",
        size: "medium",
        locale: "ja",
      })
    }
  }

  if (!isConfigured) {
    return <>{children}</>
  }

  return (
    <>
      {/* ── Slim admin bar ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
          {user ? (
            <>
              <span className="text-[10px] font-bold tracking-widest text-zinc-600 mr-auto uppercase">
                ● 管理モード
              </span>
              {/* Build */}
              <button
                onClick={handleTriggerBuild}
                disabled={buildState === "loading"}
                title="GitHub Actions でビルドをトリガー"
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                  buildState === "done" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                  : buildState === "error" ? "bg-red-500/20 border-red-500/30 text-red-400"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {buildState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                {buildState === "done" ? "開始済み" : buildState === "error" ? "失敗" : "ビルド"}
              </button>
              {/* User + logout */}
              <div className="flex items-center gap-2">
                {user.picture && <img src={user.picture} alt="" className="w-5 h-5 rounded-full" />}
                <span className="text-xs text-zinc-500 hidden sm:inline">{user.name ?? user.email}</span>
                <button onClick={logout} title="ログアウト"
                  className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold tracking-widest text-zinc-700 mr-auto uppercase">管理</span>
              <div ref={signInRef} />
            </>
          )}
        </div>
      </div>

      {/* ── Admin events section (inline, looks like portal section) ─────── */}
      {user && (
        <div className="bg-zinc-950">
          <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
            {/* Section header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  イベント管理
                </h2>
                <span className="text-xs text-zinc-700">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                {DRIVE_FOLDER_ID && (
                  <a
                    href={`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="資料フォルダを開く"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Drive</span>
                  </a>
                )}
                <button
                  onClick={() => setModalEvent("new")}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> 新規作成
                </button>
              </div>
            </div>

            {/* Error */}
            {gasError && (
              <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2 mb-4">{gasError}</p>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center gap-2 text-zinc-600 text-sm py-4">
                <Loader2 className="w-4 h-4 animate-spin" /> 読み込み中...
              </div>
            )}

            {/* Events list */}
            {events && (
              <div className="space-y-2">
                {events.length === 0 && !loading && (
                  <p className="text-zinc-600 text-sm py-4">
                    イベントがありません。「新規作成」から追加してください。
                  </p>
                )}
                {events.map(ev => {
                  const isLoading = actionLoading?.startsWith(ev.eventId)
                  const isPublished = ev.published === true || ev.published === "TRUE"
                  return (
                    <div key={ev.eventId}
                      className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-700 transition-colors">
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white text-sm">{ev.name || ev.eventId}</span>
                          <StatusBadge published={ev.published} />
                          <span className="text-xs text-zinc-700">{ev.eventId}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 mt-0.5 text-xs text-zinc-600">
                          {ev.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />{ev.date}
                            </span>
                          )}
                          {ev.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{ev.venue}
                            </span>
                          )}
                          {ev.staffNote && (
                            <span className="text-yellow-600/70 truncate max-w-[200px]" title={ev.staffNote}>
                              📝 {ev.staffNote}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <Link href={`/${ev.eventId}`} target="_blank"
                          className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors" title="開く">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setModalEvent(ev as Partial<EventFormData>)}
                          disabled={isLoading}
                          className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors" title="編集">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handlePublishToggle(ev)}
                          disabled={isLoading}
                          className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
                          title={isPublished ? "非公開にする" : "公開する"}>
                          {isLoading && actionLoading === ev.eventId + ":publish"
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : isPublished
                              ? <EyeOff className="w-3.5 h-3.5" />
                              : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(ev)}
                          disabled={isLoading}
                          className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors" title="削除">
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

            {/* Divider before portal content */}
            <div className="mt-8 border-t border-zinc-800/60" />
          </div>
        </div>
      )}

      {/* Event Modal */}
      {modalEvent !== null && idToken && (
        <EventModal
          event={modalEvent === "new" ? null : modalEvent}
          onClose={() => setModalEvent(null)}
          onSave={handleSave}
          idToken={idToken}
        />
      )}

      {/* Portal content */}
      {children}
    </>
  )
}
