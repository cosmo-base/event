"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function CbedBackButton() {
  const pathname = usePathname()
  const base = pathname.match(/^(.*cbed)/)?.[1] ?? "/cbed"
  return (
    <Link href={`${base}/search`} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
      <ArrowLeft className="w-4 h-4" />
      検索に戻る
    </Link>
  )
}
