"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCbmdContext } from "@/components/cbmd-region-context"

export function CbmdBackLink() {
  const { basePath } = useCbmdContext()
  return (
    <Link href={`${basePath}/database`}>
      <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4 mr-1" /> 一覧に戻る
      </Button>
    </Link>
  )
}

export function CbmdTagLinks({ tags }: { tags: string[] }) {
  const { basePath } = useCbmdContext()
  return (
    <>
      {tags.map((tag) => (
        <Link key={tag} href={`${basePath}/search?tag=${encodeURIComponent(tag)}`}>
          <button className="glass px-4 py-2 rounded-full text-foreground text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all">
            {tag}
          </button>
        </Link>
      ))}
    </>
  )
}
