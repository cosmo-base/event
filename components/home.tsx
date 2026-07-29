"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, BookOpen, ChevronRight, ArrowUpDown, RotateCcw } from "lucide-react"
import { StarBackground } from "@/components/star-background"
import { SiteHeader } from "@/components/site-header"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"


export default function EventHome (){

  return (
    <div className="relative min-h-screen">
      <StarBackground />
      <main className="relative z-10">
        <SiteHeader />
        <div className="h-16" />

        {/* Hero */}
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Cosmo Base
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mt-3">
            「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。初心者から宇宙産業に関心がある人まで、誰もが交流できる優しい場所です。
          </p>

        </div>


        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm py-8">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; 2026 Cosmo Base. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  )
}

