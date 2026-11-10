"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import {
  ExternalLink, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  RefreshCw, Loader2, Upload, FileText, X, FolderOpen,
  Calendar, MapPin, TableProperties, Lock, Search, CheckSquare, Copy,
  ChevronUp, ChevronDown,
} from "lucide-react"
import type { GasCarouselSlide, GasQuickLink, GasCommunityCta, GasEventFullData, GasContentItem, GasLimitedContentItem } from "@/lib/gas-public"
import { EventGacha, type GachaPrize } from "@/components/event-gacha"
import { OperatorModeSetter } from "@/components/operator-mode-setter"
import { AdminStats, type StatsData } from "./AdminStats"

// ─── Types ──────────────────────────────────────────────────────────────────

export interface StaticEvent {
  id: string
  path: string
  fullName: string
  date: string
  venue: string
  type: string
  status: "active" | "draft" | "archived"
}

export interface StaticTool {
  name: string
  description: string
  logo: string | null
  icon?: string
  links: { label: string; href: string }[]
  previewUrl?: string
}

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
  // ─ 基本情報 ─
  eventId: string
  name: string
  shortName: string
  date: string
  venue: string
  // ─ 参加情報 ─
  participationType: string
  exhibitorName: string
  boothNumber: string
  pitchTime: string
  // ─ リンク ─
  websiteUrl: string
  registrationUrl: string
  twitterUrl: string
  reportUrl: string
  // ─ メッセージ・告知 ─
  message: string
  announcementText: string
  staffNote: string
  // ─ ヒーロースライド ─
  heroTitle: string
  heroDescription: string
  heroGradient: string
  heroButtonLabel: string
  heroButtonHref: string
  // ─ 発表・ポスター ─
  presentationTitle: string
  presentationDescription: string
  speakerName: string
  presentationDate: string
  slideUrl: string
  pdfUrl: string
  embedUrl: string
  poster1Title: string
  poster1PdfUrl: string
  poster1EmbedUrl: string
  poster2Title: string
  poster2PdfUrl: string
  // ─ アンケート ─
  surveyQ1: string
  surveyQ2: string
  surveyQ3: string
  // ─ クイズ ─
  quizIntro: string
  quizQuestion: string
  quizOptions: string
  quizCorrectIndex: string
  quizExplanation: string
  quizLinkLabel: string
  quizLinkHref: string
  quizLinkDescription: string
  // ─ コンテンツ選択 ─
  selectedContentIds: string
  // ─ CBMD設定 ─
  cbmdPrefectures: string
  cbmdRegion: string
  cbmdMapLat: string
  cbmdMapLng: string
  cbmdMapZoom: string
  cbmdExpiryDate: string
  // ─ ページ設定 ─
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
  websiteUrl: "", registrationUrl: "", twitterUrl: "", reportUrl: "",
  message: "", announcementText: "", staffNote: "",
  heroTitle: "", heroDescription: "", heroGradient: "", heroButtonLabel: "", heroButtonHref: "",
  presentationTitle: "", presentationDescription: "", speakerName: "", presentationDate: "",
  slideUrl: "", pdfUrl: "", embedUrl: "",
  poster1Title: "", poster1PdfUrl: "", poster1EmbedUrl: "",
  poster2Title: "", poster2PdfUrl: "",
  surveyQ1: "", surveyQ2: "", surveyQ3: "",
  quizIntro: "", quizQuestion: "", quizOptions: "", quizCorrectIndex: "0",
  quizExplanation: "", quizLinkLabel: "", quizLinkHref: "", quizLinkDescription: "",
  selectedContentIds: "",
  cbmdPrefectures: "", cbmdRegion: "", cbmdMapLat: "", cbmdMapLng: "", cbmdMapZoom: "", cbmdExpiryDate: "",
  pageTitle: "", pageDescription: "", accentColor: "#f59e0b",
  noindex: true, published: false,
}

const STATUS_CONFIG = {
  active:   { label: "公開中", dot: "bg-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  draft:    { label: "準備中", dot: "bg-yellow-400",  bg: "bg-yellow-400/10",  border: "border-yellow-400/20" },
  archived: { label: "終了",   dot: "bg-zinc-500",    bg: "bg-zinc-500/10",    border: "border-zinc-500/20" },
} as const

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

// ─── Array Item Wrapper ───────────────────────────────────────────────────────

function ArrayItemWrapper({
  index, total, onMoveUp, onMoveDown, onDelete, label, children,
}: {
  index: number; total: number; onMoveUp: () => void; onMoveDown: () => void
  onDelete: () => void; label?: string; children: React.ReactNode
}) {
  const btn = "p-1 text-zinc-600 hover:text-zinc-300 transition-colors disabled:opacity-30"
  return (
    <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-zinc-600">{label ?? `#${index + 1}`}</span>
        <div className="flex items-center gap-0.5">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className={btn} title="上へ"><ChevronUp className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className={btn} title="下へ"><ChevronDown className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onDelete} className={`${btn} hover:text-red-400`} title="削除"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      {children}
    </div>
  )
}

// ─── Carousel Editor ──────────────────────────────────────────────────────────

function CarouselEditor({ slides, onChange }: { slides: GasCarouselSlide[]; onChange: (s: GasCarouselSlide[]) => void }) {
  const upd = (i: number, patch: Partial<GasCarouselSlide>) => {
    const next = [...slides]; next[i] = { ...next[i], ...patch }; onChange(next)
  }
  const move = (i: number, dir: -1 | 1) => {
    const next = [...slides]; [next[i], next[i + dir]] = [next[i + dir], next[i]]; onChange(next)
  }
  return (
    <div className="space-y-2.5">
      {slides.map((s, i) => (
        <ArrayItemWrapper key={s.id || i} index={i} total={slides.length} label={s.title ? `#${i + 1} ${s.title}` : `#${i + 1}`}
          onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)}
          onDelete={() => onChange(slides.filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="タイトル"><input value={s.title} onChange={e => upd(i, { title: e.target.value })} className={INPUT} /></Field>
            <Field label="バッジラベル"><input value={s.label ?? ""} onChange={e => upd(i, { label: e.target.value })} className={INPUT} placeholder="NEW" /></Field>
          </div>
          <Field label="説明文">
            <textarea value={s.description} onChange={e => upd(i, { description: e.target.value })} rows={2} className={`${INPUT} resize-none`} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="ボタンラベル"><input value={s.buttonLabel ?? ""} onChange={e => upd(i, { buttonLabel: e.target.value })} className={INPUT} /></Field>
            <Field label="ボタンリンク"><input value={s.href ?? ""} onChange={e => upd(i, { href: e.target.value })} className={INPUT} placeholder="#contents" /></Field>
          </div>
          <Field label="グラデーション"><input value={s.gradient ?? ""} onChange={e => upd(i, { gradient: e.target.value })} className={INPUT} placeholder="linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%)" /></Field>
          <Field label="画像URL"><input value={s.imageUrl ?? ""} onChange={e => upd(i, { imageUrl: e.target.value })} className={INPUT} placeholder="https://..." /></Field>
        </ArrayItemWrapper>
      ))}
      <button type="button"
        onClick={() => onChange([...slides, { id: `slide-${Date.now()}`, title: "", description: "" }])}
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors w-full justify-center">
        <Plus className="w-3.5 h-3.5" /> スライドを追加
      </button>
    </div>
  )
}

// ─── QuickLinks Editor ────────────────────────────────────────────────────────

function QuickLinksEditor({ links, onChange }: { links: GasQuickLink[]; onChange: (l: GasQuickLink[]) => void }) {
  const upd = (i: number, patch: Partial<GasQuickLink>) => {
    const next = [...links]; next[i] = { ...next[i], ...patch }; onChange(next)
  }
  const move = (i: number, dir: -1 | 1) => {
    const next = [...links]; [next[i], next[i + dir]] = [next[i + dir], next[i]]; onChange(next)
  }
  return (
    <div className="space-y-2.5">
      {links.map((l, i) => (
        <ArrayItemWrapper key={l.id || i} index={i} total={links.length} label={l.title ? `#${i + 1} ${l.title}` : `#${i + 1}`}
          onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)}
          onDelete={() => onChange(links.filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="タイトル"><input value={l.title} onChange={e => upd(i, { title: e.target.value })} className={INPUT} /></Field>
            <Field label="アイコン" note="例: rocket, sparkles, users">
              <input value={l.icon} onChange={e => upd(i, { icon: e.target.value })} className={INPUT} placeholder="rocket" />
            </Field>
          </div>
          <Field label="説明文">
            <textarea value={l.description} onChange={e => upd(i, { description: e.target.value })} rows={1} className={`${INPUT} resize-none`} />
          </Field>
          <Field label="リンクURL"><input value={l.href} onChange={e => upd(i, { href: e.target.value })} className={INPUT} placeholder="https://..." /></Field>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-sm">
              <input type="checkbox" checked={!!l.external} onChange={e => upd(i, { external: e.target.checked })} className="w-3.5 h-3.5 accent-blue-500" />
              <span className="text-zinc-400">外部リンク</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-sm">
              <input type="checkbox" checked={!!l.featured} onChange={e => upd(i, { featured: e.target.checked })} className="w-3.5 h-3.5 accent-amber-500" />
              <span className="text-zinc-400">おすすめ表示</span>
            </label>
          </div>
        </ArrayItemWrapper>
      ))}
      <button type="button"
        onClick={() => onChange([...links, { id: `link-${Date.now()}`, title: "", description: "", href: "", icon: "external", external: false }])}
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors w-full justify-center">
        <Plus className="w-3.5 h-3.5" /> リンクを追加
      </button>
    </div>
  )
}

// ─── CommunityCta Editor ──────────────────────────────────────────────────────

function CommunityCтaEditor({ cta, onChange }: { cta: GasCommunityCta | null; onChange: (c: GasCommunityCta) => void }) {
  const c: GasCommunityCta = cta ?? { title: "", description: "", primaryLabel: "", primaryHref: "", secondaryLinks: [] }
  const upd = (patch: Partial<GasCommunityCta>) => onChange({ ...c, ...patch })
  const updSecondary = (i: number, patch: Partial<{ label: string; href: string }>) => {
    const links = [...(c.secondaryLinks ?? [])]
    links[i] = { ...links[i], ...patch }
    upd({ secondaryLinks: links })
  }
  return (
    <div className="space-y-3">
      <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-3 space-y-2.5">
        <Field label="タイトル"><input value={c.title} onChange={e => upd({ title: e.target.value })} className={INPUT} /></Field>
        <Field label="説明文">
          <textarea value={c.description} onChange={e => upd({ description: e.target.value })} rows={2} className={`${INPUT} resize-none`} />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="メインボタンラベル"><input value={c.primaryLabel} onChange={e => upd({ primaryLabel: e.target.value })} className={INPUT} /></Field>
          <Field label="メインボタンURL"><input value={c.primaryHref} onChange={e => upd({ primaryHref: e.target.value })} className={INPUT} placeholder="https://discord.gg/..." /></Field>
        </div>
      </div>
      <div>
        <span className="text-[10px] font-bold text-zinc-600 block mb-2">サブリンク</span>
        <div className="space-y-2">
          {(c.secondaryLinks ?? []).map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={link.label} onChange={e => updSecondary(i, { label: e.target.value })}
                className={`${INPUT} flex-1`} placeholder="ラベル" />
              <input value={link.href} onChange={e => updSecondary(i, { href: e.target.value })}
                className={`${INPUT} flex-1`} placeholder="URL" />
              <button type="button" onClick={() => upd({ secondaryLinks: (c.secondaryLinks ?? []).filter((_, idx) => idx !== i) })}
                className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button type="button"
            onClick={() => upd({ secondaryLinks: [...(c.secondaryLinks ?? []), { label: "", href: "" }] })}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors w-full justify-center">
            <Plus className="w-3.5 h-3.5" /> サブリンクを追加
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Contents Editor ─────────────────────────────────────────────────────────

const CONTENT_STATUS_OPTIONS = ["available", "limited", "coming-soon", "ended"]

function ContentsEditor({ items, onChange }: { items: GasContentItem[]; onChange: (v: GasContentItem[]) => void }) {
  const upd = (i: number, patch: Partial<GasContentItem>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next)
  }
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items]; [next[i], next[i + dir]] = [next[i + dir], next[i]]; onChange(next)
  }
  return (
    <div className="space-y-2.5">
      {items.map((c, i) => (
        <ArrayItemWrapper key={c.id || i} index={i} total={items.length} label={c.title ? `#${i + 1} ${c.title}` : `#${i + 1}`}
          onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)}
          onDelete={() => onChange(items.filter((_, idx) => idx !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="タイトル"><input value={c.title} onChange={e => upd(i, { title: e.target.value })} className={INPUT} /></Field>
            <Field label="アイコン" note="例: rocket, sparkles">
              <input value={c.icon ?? ""} onChange={e => upd(i, { icon: e.target.value })} className={INPUT} placeholder="rocket" />
            </Field>
          </div>
          <Field label="説明文">
            <textarea value={c.description} onChange={e => upd(i, { description: e.target.value })} rows={2} className={`${INPUT} resize-none`} />
          </Field>
          <Field label="URL"><input value={c.href} onChange={e => upd(i, { href: e.target.value })} className={INPUT} placeholder="https://..." /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="対象者">
              <input value={c.audience ?? ""} onChange={e => upd(i, { audience: e.target.value })} className={INPUT} placeholder="初心者向け" />
            </Field>
            <Field label="所要時間">
              <input value={c.duration ?? ""} onChange={e => upd(i, { duration: e.target.value })} className={INPUT} placeholder="約5分" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="ラベル" note="| で区切る">
              <input value={(c.labels ?? []).join("|")} onChange={e => upd(i, { labels: e.target.value.split("|").map(s => s.trim()).filter(Boolean) })} className={INPUT} placeholder="クイズ|無料" />
            </Field>
            <Field label="ステータス">
              <select value={c.status ?? "available"} onChange={e => upd(i, { status: e.target.value })} className={INPUT}>
                {CONTENT_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-sm">
            <input type="checkbox" checked={!!c.external} onChange={e => upd(i, { external: e.target.checked })} className="w-3.5 h-3.5 accent-blue-500" />
            <span className="text-zinc-400">外部リンク</span>
          </label>
        </ArrayItemWrapper>
      ))}
      <button type="button"
        onClick={() => onChange([...items, { id: `content-${Date.now()}`, title: "", description: "", href: "", labels: [], status: "available", external: false }])}
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors w-full justify-center">
        <Plus className="w-3.5 h-3.5" /> コンテンツを追加
      </button>
    </div>
  )
}

// ─── Limited Contents Editor ──────────────────────────────────────────────────

function LimitedContentsEditor({ items, onChange }: { items: GasLimitedContentItem[]; onChange: (v: GasLimitedContentItem[]) => void }) {
  const upd = (i: number, patch: Partial<GasLimitedContentItem>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next)
  }
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items]; [next[i], next[i + dir]] = [next[i + dir], next[i]]; onChange(next)
  }
  return (
    <div className="space-y-2.5">
      {items.map((c, i) => (
        <ArrayItemWrapper key={c.id || i} index={i} total={items.length} label={c.title ? `#${i + 1} ${c.title}` : `#${i + 1}`}
          onMoveUp={() => move(i, -1)} onMoveDown={() => move(i, 1)}
          onDelete={() => onChange(items.filter((_, idx) => idx !== i))}>
          <Field label="タイトル"><input value={c.title} onChange={e => upd(i, { title: e.target.value })} className={INPUT} /></Field>
          <Field label="説明文">
            <textarea value={c.description} onChange={e => upd(i, { description: e.target.value })} rows={2} className={`${INPUT} resize-none`} />
          </Field>
          <Field label="URL"><input value={c.href} onChange={e => upd(i, { href: e.target.value })} className={INPUT} placeholder="https://..." /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="ラベル" note="| で区切る">
              <input value={(c.labels ?? []).join("|")} onChange={e => upd(i, { labels: e.target.value.split("|").map(s => s.trim()).filter(Boolean) })} className={INPUT} placeholder="限定|メンバー" />
            </Field>
            <Field label="ステータス">
              <select value={c.status ?? "available"} onChange={e => upd(i, { status: e.target.value })} className={INPUT}>
                {CONTENT_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="公開開始日">
              <input type="date" value={c.availableFrom ?? ""} onChange={e => upd(i, { availableFrom: e.target.value })} className={INPUT} />
            </Field>
            <Field label="公開終了日">
              <input type="date" value={c.availableUntil ?? ""} onChange={e => upd(i, { availableUntil: e.target.value })} className={INPUT} />
            </Field>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-sm">
            <input type="checkbox" checked={!!c.external} onChange={e => upd(i, { external: e.target.checked })} className="w-3.5 h-3.5 accent-blue-500" />
            <span className="text-zinc-400">外部リンク</span>
          </label>
        </ArrayItemWrapper>
      ))}
      <button type="button"
        onClick={() => onChange([...items, { id: `lcontent-${Date.now()}`, title: "", description: "", href: "", labels: [], status: "available", external: false }])}
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors w-full justify-center">
        <Plus className="w-3.5 h-3.5" /> 限定コンテンツを追加
      </button>
    </div>
  )
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function LivePreview({ form, slides, quickLinks }: { form: EventFormData; slides: GasCarouselSlide[]; quickLinks: GasQuickLink[] }) {
  return (
    <div className="p-4 space-y-3 text-sm overflow-y-auto h-full">
      {/* Accent bar */}
      <div className="h-1 rounded-full w-full mb-2" style={{ background: form.accentColor || "#f59e0b" }} />

      {/* Event info */}
      <div className="bg-zinc-800/60 rounded-xl p-3 space-y-1">
        <div className="font-bold text-white text-base">{form.name || <span className="text-zinc-600">イベント名未設定</span>}</div>
        {form.date && <div className="text-zinc-400 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{form.date}</div>}
        {form.venue && <div className="text-zinc-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{form.venue}</div>}
      </div>

      {/* Announcement */}
      {form.announcementText && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg px-3 py-2 text-xs">
          {form.announcementText}
        </div>
      )}

      {/* Hero slide (first slide or heroTitle) */}
      {(slides[0]?.title || form.heroTitle) && (
        <div className="rounded-xl p-3 text-center space-y-1" style={{ background: slides[0]?.gradient || form.heroGradient || "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
          <div className="font-bold text-white text-xs whitespace-pre-line">{slides[0]?.title || form.heroTitle}</div>
          {(slides[0]?.description || form.heroDescription) && (
            <div className="text-white/70 text-[10px]">{slides[0]?.description || form.heroDescription}</div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500">
        <div className="bg-zinc-800/50 rounded-lg px-2 py-1.5">カルーセル: {slides.length}件</div>
        <div className="bg-zinc-800/50 rounded-lg px-2 py-1.5">クイックリンク: {quickLinks.length}件</div>
      </div>

      {/* Page settings */}
      <div className="flex flex-wrap gap-2 text-[10px]">
        <span className={`px-2 py-0.5 rounded-full border ${form.published ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-zinc-700/50 border-zinc-700 text-zinc-500"}`}>
          {form.published ? "公開中" : "非公開"}
        </span>
        {form.noindex && <span className="px-2 py-0.5 rounded-full border bg-zinc-700/50 border-zinc-700 text-zinc-500">noindex</span>}
        {form.accentColor && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: form.accentColor }} />
            {form.accentColor}
          </span>
        )}
      </div>
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
  const [savedOk, setSavedOk] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [previewTab, setPreviewTab] = useState<"live" | "iframe">("live")

  // Array data state
  const [slides, setSlides] = useState<GasCarouselSlide[]>([])
  const [quickLinks, setQuickLinks] = useState<GasQuickLink[]>([])
  const [cta, setCta] = useState<GasCommunityCta | null>(null)
  const [contents, setContents] = useState<GasContentItem[]>([])
  const [limitedContents, setLimitedContents] = useState<GasLimitedContentItem[]>([])
  const [fullDataLoading, setFullDataLoading] = useState(false)

  useEffect(() => {
    if (!isEdit || !GAS_URL || !event?.eventId) return
    setFullDataLoading(true)
    fetch(`${GAS_URL}?action=event&id=${encodeURIComponent(event.eventId as string)}`)
      .then(r => r.json())
      .then((data: GasEventFullData) => {
        setSlides(data.carousel ?? [])
        setQuickLinks(data.quickLinks ?? [])
        setCta(data.communityCta ?? null)
        setContents(data.contents ?? [])
        setLimitedContents(data.limitedContents ?? [])
      })
      .catch(() => {})
      .finally(() => setFullDataLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (key: keyof EventFormData, value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }))

  const isEdit = !!event?.eventId

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.eventId.trim()) { setError("イベントIDは必須です"); return }
    setSaving(true)
    setError("")
    setSavedOk(false)
    try {
      await onSave(form)
      if (isEdit) {
        await gasPost(idToken, "updateFullEvent", {
          eventId: form.eventId,
          carousel: slides,
          quickLinks,
          communityCta: cta,
          contents,
          limitedContents,
        })
        setIframeKey(k => k + 1)
        setSavedOk(true)
        setTimeout(() => setSavedOk(false), 2500)
      } else {
        onClose()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={isEdit
      ? "fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm"
      : "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"}
      onClick={onClose}>
      <div className={isEdit
        ? "flex w-full h-full max-w-[1400px] mx-auto my-3 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl"
        : "bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"}
        onClick={e => e.stopPropagation()}>
        {/* Left / only panel: Form */}
        <div className={isEdit ? "w-[440px] shrink-0 bg-zinc-900 flex flex-col" : ""}>
          <div className={isEdit
            ? "bg-zinc-900 border-b border-zinc-800 px-5 py-3.5 flex items-center justify-between shrink-0"
            : "sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-10"}>
            <h2 className="font-bold text-white text-sm">{isEdit ? "イベント編集" : "新規イベント作成"}</h2>
            <div className="flex items-center gap-2">
              {savedOk && <span className="text-xs text-emerald-400">保存しました ✓</span>}
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors text-lg leading-none">✕</button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={isEdit ? "overflow-y-auto flex-1 p-5 space-y-4" : "p-6 space-y-4"}>
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
              <input type="date" value={form.date} onChange={e => set("date", e.target.value)} className={INPUT} />
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

          <Field label="レポートURL" note="イベント終了後">
            <input value={form.reportUrl} onChange={e => set("reportUrl", e.target.value)}
              className={INPUT} placeholder="https://..." />
          </Field>

          {/* ヒーロースライド */}
          <SectionDivider label="ヒーロースライド" />

          <Field label="スライドタイトル">
            <input value={form.heroTitle} onChange={e => set("heroTitle", e.target.value)}
              className={INPUT} placeholder="イベント名\nサブタイトル" />
          </Field>

          <Field label="スライド説明文">
            <input value={form.heroDescription} onChange={e => set("heroDescription", e.target.value)}
              className={INPUT} placeholder="Cosmo Base のコンテンツをこの会場で体験できます。" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="ボタンラベル">
              <input value={form.heroButtonLabel} onChange={e => set("heroButtonLabel", e.target.value)}
                className={INPUT} placeholder="コンテンツを見る" />
            </Field>
            <Field label="ボタンリンク先">
              <input value={form.heroButtonHref} onChange={e => set("heroButtonHref", e.target.value)}
                className={INPUT} placeholder="#contents" />
            </Field>
          </div>

          <Field label="グラデーション" note="CSSのlinear-gradient">
            <input value={form.heroGradient} onChange={e => set("heroGradient", e.target.value)}
              className={INPUT} placeholder="linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#0ea5e9 100%)" />
          </Field>

          {/* カルーセル（配列データ） */}
          {isEdit && (
            <>
              <SectionDivider label="カルーセル（配列）" />
              {fullDataLoading
                ? <div className="flex items-center gap-2 text-zinc-600 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...</div>
                : <CarouselEditor slides={slides} onChange={setSlides} />}
            </>
          )}

          {/* QuickLinks（配列データ） */}
          {isEdit && (
            <>
              <SectionDivider label="クイックリンク（配列）" />
              {fullDataLoading
                ? <div className="flex items-center gap-2 text-zinc-600 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...</div>
                : <QuickLinksEditor links={quickLinks} onChange={setQuickLinks} />}
            </>
          )}

          {/* CommunityCta（配列データ） */}
          {isEdit && (
            <>
              <SectionDivider label="コミュニティCTA（配列）" />
              {fullDataLoading
                ? <div className="flex items-center gap-2 text-zinc-600 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...</div>
                : <CommunityCтaEditor cta={cta} onChange={setCta} />}
            </>
          )}

          {/* コンテンツ（配列データ） */}
          {isEdit && (
            <>
              <SectionDivider label="コンテンツ（配列）" />
              {fullDataLoading
                ? <div className="flex items-center gap-2 text-zinc-600 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...</div>
                : <ContentsEditor items={contents} onChange={setContents} />}
            </>
          )}

          {/* 限定コンテンツ（配列データ） */}
          {isEdit && (
            <>
              <SectionDivider label="限定コンテンツ（配列）" />
              {fullDataLoading
                ? <div className="flex items-center gap-2 text-zinc-600 text-xs"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 読み込み中...</div>
                : <LimitedContentsEditor items={limitedContents} onChange={setLimitedContents} />}
            </>
          )}

          {/* 発表・ポスター */}
          <SectionDivider label="発表・ポスター" />

          <Field label="発表タイトル">
            <input value={form.presentationTitle} onChange={e => set("presentationTitle", e.target.value)}
              className={INPUT} />
          </Field>

          <Field label="発表説明文">
            <textarea value={form.presentationDescription} onChange={e => set("presentationDescription", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="発表者名">
              <input value={form.speakerName} onChange={e => set("speakerName", e.target.value)} className={INPUT} />
            </Field>
            <Field label="発表日">
              <input type="date" value={form.presentationDate} onChange={e => set("presentationDate", e.target.value)}
                className={INPUT} />
            </Field>
          </div>

          <Field label="スライドURL">
            <input value={form.slideUrl} onChange={e => set("slideUrl", e.target.value)}
              className={INPUT} placeholder="https://speakerdeck.com/..." />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="PDF URL">
              <input value={form.pdfUrl} onChange={e => set("pdfUrl", e.target.value)}
                className={INPUT} placeholder="/documents/..." />
            </Field>
            <Field label="埋め込みURL">
              <input value={form.embedUrl} onChange={e => set("embedUrl", e.target.value)}
                className={INPUT} placeholder="https://..." />
            </Field>
          </div>

          <Field label="ポスター1 タイトル">
            <input value={form.poster1Title} onChange={e => set("poster1Title", e.target.value)} className={INPUT} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="ポスター1 PDF URL">
              <input value={form.poster1PdfUrl} onChange={e => set("poster1PdfUrl", e.target.value)}
                className={INPUT} placeholder="/documents/..." />
            </Field>
            <Field label="ポスター1 埋め込みURL">
              <input value={form.poster1EmbedUrl} onChange={e => set("poster1EmbedUrl", e.target.value)}
                className={INPUT} placeholder="https://..." />
            </Field>
          </div>

          <Field label="ポスター2 タイトル">
            <input value={form.poster2Title} onChange={e => set("poster2Title", e.target.value)} className={INPUT} />
          </Field>

          <Field label="ポスター2 PDF URL">
            <input value={form.poster2PdfUrl} onChange={e => set("poster2PdfUrl", e.target.value)}
              className={INPUT} placeholder="/documents/..." />
          </Field>

          {/* アンケート */}
          <SectionDivider label="アンケート設問" />

          <Field label="設問1">
            <input value={form.surveyQ1} onChange={e => set("surveyQ1", e.target.value)}
              className={INPUT} placeholder="このイベントをどこで知りましたか？" />
          </Field>

          <Field label="設問2">
            <input value={form.surveyQ2} onChange={e => set("surveyQ2", e.target.value)}
              className={INPUT} placeholder="ご感想をお聞かせください" />
          </Field>

          <Field label="設問3">
            <input value={form.surveyQ3} onChange={e => set("surveyQ3", e.target.value)}
              className={INPUT} placeholder="Cosmo Base への興味はありますか？" />
          </Field>

          {/* クイズ */}
          <SectionDivider label="限定クイズ" />

          <Field label="前置き文" note="任意">
            <textarea value={form.quizIntro} onChange={e => set("quizIntro", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} placeholder="クイズの前に表示するテキスト（省略可）" />
          </Field>

          <Field label="問題文">
            <textarea value={form.quizQuestion} onChange={e => set("quizQuestion", e.target.value)}
              rows={2} className={`${INPUT} resize-none`} placeholder="どれが正解でしょう？" />
          </Field>

          <Field label="選択肢" note="| で区切る（例: 選択肢A|選択肢B|選択肢C）">
            <input value={form.quizOptions} onChange={e => set("quizOptions", e.target.value)}
              className={INPUT} placeholder="MMRTG|RTG-II|SNAP-27" />
          </Field>

          <Field label="正解">
            {form.quizOptions
              ? form.quizOptions.split("|").map(s => s.trim()).filter(Boolean).map((opt, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="quizCorrectIndex"
                    value={String(i)}
                    checked={form.quizCorrectIndex === String(i)}
                    onChange={() => set("quizCorrectIndex", String(i))}
                    className="accent-primary"
                  />
                  <span className="text-sm">{i + 1}. {opt}</span>
                </label>
              ))
              : <span className="text-xs text-muted-foreground">先に選択肢を入力してください</span>
            }
          </Field>

          <Field label="解説文">
            <textarea value={form.quizExplanation} onChange={e => set("quizExplanation", e.target.value)}
              rows={4} className={`${INPUT} resize-none`} />
          </Field>

          <Field label="リンクラベル" note="任意">
            <input value={form.quizLinkLabel} onChange={e => set("quizLinkLabel", e.target.value)}
              className={INPUT} placeholder="詳しくはこちら👇" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="リンクURL">
              <input value={form.quizLinkHref} onChange={e => set("quizLinkHref", e.target.value)}
                className={INPUT} placeholder="https://..." />
            </Field>
            <Field label="リンク説明">
              <input value={form.quizLinkDescription} onChange={e => set("quizLinkDescription", e.target.value)}
                className={INPUT} placeholder="リンク先の説明" />
            </Field>
          </div>

          {/* コンテンツ選択 */}
          <SectionDivider label="コンテンツ選択" />

          <Field label="表示するコンテンツID" note="| で区切る（空=全表示）">
            <input value={form.selectedContentIds} onChange={e => set("selectedContentIds", e.target.value)}
              className={INPUT} placeholder="c-space-type|c-cbmd" />
          </Field>

          {/* CBMD設定 */}
          <SectionDivider label="CBMD設定" />

          <Field label="都道府県" note="| で区切る（例: 東京都|神奈川県）">
            <input value={form.cbmdPrefectures} onChange={e => set("cbmdPrefectures", e.target.value)}
              className={INPUT} placeholder="東京都|神奈川県|埼玉県|千葉県" />
          </Field>

          <Field label="地方区分" note="都道府県の代わりに指定（例: 北信越）">
            <input value={form.cbmdRegion} onChange={e => set("cbmdRegion", e.target.value)}
              className={INPUT} placeholder="北信越" />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="地図中心 緯度">
              <input type="number" step="0.001" value={form.cbmdMapLat} onChange={e => set("cbmdMapLat", e.target.value)}
                className={INPUT} placeholder="35.681" />
            </Field>
            <Field label="地図中心 経度">
              <input type="number" step="0.001" value={form.cbmdMapLng} onChange={e => set("cbmdMapLng", e.target.value)}
                className={INPUT} placeholder="139.767" />
            </Field>
            <Field label="ズーム">
              <input type="number" min="1" max="18" value={form.cbmdMapZoom} onChange={e => set("cbmdMapZoom", e.target.value)}
                className={INPUT} placeholder="10" />
            </Field>
            <Field label="公開終了日">
              <input type="date" value={form.cbmdExpiryDate} onChange={e => set("cbmdExpiryDate", e.target.value)}
                className={INPUT} />
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
                {isEdit ? "閉じる" : "キャンセル"}
              </button>
              <button type="submit" disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEdit ? "保存する" : "作成する"}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Preview (edit mode only) */}
        {isEdit && (
          <div className="flex-1 bg-zinc-950 flex flex-col min-w-0">
            <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-2 flex items-center justify-between shrink-0 gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPreviewTab("live")}
                  className={`text-xs px-3 py-1 rounded-md transition-colors ${previewTab === "live" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  ライブ
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("iframe")}
                  className={`text-xs px-3 py-1 rounded-md transition-colors ${previewTab === "iframe" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  デプロイ済み
                </button>
              </div>
              <Link href={`/${form.eventId}?ref=preview`} target="_blank"
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                <ExternalLink className="w-3 h-3" />
                ページを開く
              </Link>
            </div>
            {previewTab === "live" ? (
              <div className="flex-1 overflow-y-auto bg-zinc-950">
                <LivePreview form={form} slides={slides} quickLinks={quickLinks} />
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={`/${form.eventId}?ref=preview`}
                className="flex-1 w-full border-0"
                title="イベントプレビュー（デプロイ済み）"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminShell({
  staticEvents,
  tools,
  gachaPrizes,
  spreadsheetUrl,
}: {
  staticEvents: StaticEvent[]
  tools: StaticTool[]
  gachaPrizes: GachaPrize[]
  spreadsheetUrl: string
}) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [idToken, setIdToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<AdminEvent[] | null>(null)
  const [gasError, setGasError] = useState("")
  const [modalEvent, setModalEvent] = useState<Partial<EventFormData> | null | "new">(null)
  const [buildState, setBuildState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"events" | "data">("events")
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
    setSelectedIds(new Set())
    setSearchQuery("")
    window.google?.accounts.id.disableAutoSelect()
    if (signInRef.current) {
      window.google?.accounts.id.renderButton(signInRef.current, {
        theme: "filled_black",
        size: "medium",
        locale: "ja",
      })
    }
  }

  const filteredEvents = events?.filter(ev => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      ev.eventId.toLowerCase().includes(q) ||
      ev.name.toLowerCase().includes(q) ||
      (ev.venue?.toLowerCase().includes(q) ?? false) ||
      (ev.date?.toLowerCase().includes(q) ?? false)
    )
  }) ?? null

  async function handleBulkPublish(publish: boolean) {
    if (!idToken || selectedIds.size === 0) return
    if (!confirm(`選択した ${selectedIds.size} 件を${publish ? "公開" : "非公開に"}しますか？`)) return
    setBulkLoading(true)
    try {
      await Promise.all(
        Array.from(selectedIds).map(id =>
          gasPost(idToken, publish ? "publishEvent" : "unpublishEvent", { eventId: id })
        )
      )
      setEvents(prev => prev?.map(e =>
        selectedIds.has(e.eventId) ? { ...e, published: publish } : e
      ) ?? null)
      setSelectedIds(new Set())
    } catch (err) {
      alert(err instanceof Error ? err.message : "エラー")
    } finally {
      setBulkLoading(false)
    }
  }

  function toggleSelect(eventId: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(eventId)) next.delete(eventId)
      else next.add(eventId)
      return next
    })
  }

  function toggleSelectAll() {
    if (!filteredEvents) return
    if (selectedIds.size === filteredEvents.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredEvents.map(ev => ev.eventId)))
    }
  }

  return (
    <>
      {/* ── Slim admin bar ───────────────────────────────────────────────── */}
      {isConfigured && (
        <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
            {user ? (
              <>
                <span className="text-[10px] font-bold tracking-widest text-zinc-600 mr-auto uppercase">
                  ● 管理モード
                </span>
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
      )}

      {/* ── Full portal ──────────────────────────────────────────────────── */}
      <div className="min-h-screen bg-zinc-950 text-white">
        <OperatorModeSetter />
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/CB_icon.png" alt="Cosmo Base" width={48} height={48} className="rounded-xl" />
            <div>
              <h1 className="text-2xl font-bold text-white">Cosmo Base 運営ポータル</h1>
              <p className="text-sm text-zinc-400">イベントページ・コンテンツ一覧</p>
            </div>
          </div>

          {/* ── Tabs (admin only) ────────────────────────────────────────── */}
          {user && (
            <div className="flex gap-1 mb-8 border-b border-zinc-800">
              {(["events", "data"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-white"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab === "events" ? "イベント管理" : "データ集計"}
                </button>
              ))}
            </div>
          )}

          {/* ── Data tab ─────────────────────────────────────────────────── */}
          {user && activeTab === "data" && (
            <section className="mb-12">
              <AdminStats
                idToken={idToken!}
                gasPost={gasPost as (idToken: string, action: string, data?: object) => Promise<StatsData>}
              />
            </section>
          )}

          {/* ── Events section ───────────────────────────────────────────── */}
          <section className={`mb-12 ${user && activeTab === "data" ? "hidden" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                イベントページ
              </h2>
              {user && (
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
              )}
            </div>

            {/* Admin: GAS events with edit controls */}
            {user && (
              <>
                {gasError && (
                  <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2 mb-3">{gasError}</p>
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-zinc-600 text-sm py-4">
                    <Loader2 className="w-4 h-4 animate-spin" /> 読み込み中...
                  </div>
                )}
                {events && (
                  <>
                    {/* Search + bulk toolbar */}
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
                        <input
                          type="search"
                          placeholder="イベント名・ID・会場で絞り込み"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                      {selectedIds.size > 0 && (
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-zinc-500">{selectedIds.size}件選択</span>
                          <button
                            onClick={() => handleBulkPublish(true)}
                            disabled={bulkLoading}
                            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50"
                          >
                            {bulkLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Eye className="w-3 h-3" />}
                            一括公開
                          </button>
                          <button
                            onClick={() => handleBulkPublish(false)}
                            disabled={bulkLoading}
                            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors disabled:opacity-50"
                          >
                            {bulkLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <EyeOff className="w-3 h-3" />}
                            一括非公開
                          </button>
                          <button onClick={() => setSelectedIds(new Set())} className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Select-all row */}
                      {filteredEvents && filteredEvents.length > 0 && (
                        <button
                          onClick={toggleSelectAll}
                          className="flex items-center gap-1.5 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                          {selectedIds.size === filteredEvents.length ? "すべて解除" : "すべて選択"}
                        </button>
                      )}

                      {events.length === 0 && !loading && (
                        <p className="text-zinc-600 text-sm py-4">イベントがありません。「新規作成」から追加してください。</p>
                      )}
                      {filteredEvents?.length === 0 && events.length > 0 && (
                        <p className="text-zinc-600 text-sm py-4">該当するイベントがありません。</p>
                      )}
                      {filteredEvents?.map(ev => {
                        const isLoading = actionLoading?.startsWith(ev.eventId)
                        const isPublished = ev.published === true || ev.published === "TRUE"
                        const isSelected = selectedIds.has(ev.eventId)
                        return (
                          <div key={ev.eventId}
                            className={`flex items-center gap-3 bg-zinc-900 border rounded-xl px-4 py-3 hover:border-zinc-700 transition-colors ${isSelected ? "border-blue-600/50 bg-blue-950/20" : "border-zinc-800"}`}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(ev.eventId)}
                              className="w-3.5 h-3.5 accent-blue-500 shrink-0 cursor-pointer"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/CB_icon.png" alt="Cosmo Base" width={36} height={36} className="rounded-lg shrink-0 opacity-80" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-white text-sm">{ev.name || ev.eventId}</span>
                                <StatusBadge published={ev.published} />
                                <span className="text-xs text-zinc-700">{ev.eventId}</span>
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-zinc-500">
                                {ev.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>}
                                {ev.venue && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>}
                                {ev.participationType && <span className="text-zinc-600">{ev.participationType}</span>}
                                {ev.staffNote && (
                                  <span className="text-yellow-600/70 truncate max-w-[200px]" title={ev.staffNote}>
                                    📝 {ev.staffNote}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <Link href={`/${ev.eventId}?ref=list`} target="_blank"
                                className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors" title="イベントページを開く">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${ev.eventId}`)}
                                className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors" title="リンクをコピー">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setModalEvent(ev as Partial<EventFormData>)}
                                disabled={!!isLoading}
                                className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors" title="編集">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handlePublishToggle(ev)}
                                disabled={!!isLoading}
                                className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
                                title={isPublished ? "非公開にする" : "公開する"}>
                                {isLoading && actionLoading === ev.eventId + ":publish"
                                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  : isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleDelete(ev)}
                                disabled={!!isLoading}
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
                  </>
                )}
              </>
            )}

            {/* Non-admin: static event cards */}
            {!user && (
              <div className="space-y-3">
                {staticEvents.map(ev => {
                  const s = STATUS_CONFIG[ev.status]
                  return (
                    <Link key={ev.id} href={`${ev.path}?ref=list`}
                      className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 hover:bg-zinc-800/60 transition-colors group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/CB_icon.png" alt="Cosmo Base" width={36} height={36} className="rounded-lg shrink-0 opacity-80" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{ev.fullName}</span>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.border} border`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-zinc-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>
                          <span className="text-zinc-600">{ev.type}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          {/* ── Spreadsheet link ─────────────────────────────────────────── */}
          {spreadsheetUrl && (!user || activeTab === "events") && (
            <div className="mb-8">
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <TableProperties className="w-4 h-4" />
                データスプレッドシートを開く
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}

          {/* ── Tools ────────────────────────────────────────────────────── */}
          <section className={`mb-12 ${user && activeTab === "data" ? "hidden" : ""}`}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              共通コンテンツ・ツール
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tools.map(tool => (
                <div key={tool.name} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 hover:bg-zinc-800/60 transition-colors group">
                  <Link href={tool.links[0].href} className="absolute inset-0 rounded-xl" aria-label={tool.name} />
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                      {tool.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={tool.logo} alt={tool.name} className="object-contain w-full h-full p-1.5" />
                      ) : (
                        <span className="text-2xl">{tool.icon}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-0.5">{tool.name}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed whitespace-pre-line">{tool.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {tool.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 rounded-md transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    {"previewUrl" in tool && tool.previewUrl && (
                      <Link
                        href={tool.previewUrl}
                        className="text-xs font-medium text-zinc-600 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-2.5 py-1 rounded-md transition-colors inline-flex items-center gap-1"
                        title="コンテンツロック画面をプレビュー"
                      >
                        <Lock className="w-3 h-3" />
                        ロック確認
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Gacha ────────────────────────────────────────────────────── */}
          <section className={`mb-12 ${user && activeTab === "data" ? "hidden" : ""}`}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              ガチャ
            </h2>
            <div className="flex flex-col gap-4 max-w-sm">
              <Link
                href="/gacha"
                className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 hover:bg-zinc-800/60 transition-colors group"
              >
                <div>
                  <p className="text-sm font-bold text-white">ガチャページ（参加者向け）</p>
                  <p className="text-xs text-zinc-500 mt-0.5">クリアファイル 10% / ステッカー 90%</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </Link>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-xs text-zinc-500 mb-4">テスト用。結果はスプシの「ガチャ」シートに記録されます。</p>
                <EventGacha eventId="list" prizes={gachaPrizes} />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Event Modal ──────────────────────────────────────────────────── */}
      {modalEvent !== null && idToken && (
        <EventModal
          event={modalEvent === "new" ? null : modalEvent}
          onClose={() => setModalEvent(null)}
          onSave={handleSave}
          idToken={idToken}
        />
      )}
    </>
  )
}
