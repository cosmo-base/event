"use client"

import { useState } from "react"
import Link from "next/link"
import { BookMarked, Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Cosmo Base 宇宙用語集</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Hamburger menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors"
            aria-label="メニュー"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-full sm:w-[320px] bg-background/95 backdrop-blur-xl border-b border-l border-border/50 rounded-bl-2xl shadow-2xl animate-in slide-in-from-top-2 fade-in duration-200">
          <nav className="p-3">
            <ul className="flex flex-col gap-1">

              <li>
                <a
                  href="https://fsifofficial.github.io/CosmoBase/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                    <img src="/glossary/CB_icon.png" className="w-5 h-5 object-contain" alt="Cosmo Base" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Cosmo Base</p>
                    <p className="text-xs text-muted-foreground mt-0.5">公式サイト</p>
                  </div>
                </a>
              </li>

              {/* 区切り線 */}
              <div className="h-px w-full bg-border/50 my-1 rounded-full" />

              <li>
                <a
                  href="https://x.com/CosmoBase"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                    <img src="/glossary/X.png" alt="X" className="w-4 h-4 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">X (Twitter)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">最新情報をチェック</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/cosmobase.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                    <img src="/glossary/Instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Instagram</p>
                    <p className="text-xs text-muted-foreground mt-0.5">活動の様子をチェック</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://note.com/cosmobase"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                    <img src="/glossary/note.png" alt="note" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">note</p>
                    <p className="text-xs text-muted-foreground mt-0.5">記事を読む</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/channel/UC3bcWCM6ccvsyQyiXLIwhkQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                    <img src="/glossary/youtube.png" alt="YouTube" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">YouTube</p>
                    <p className="text-xs text-muted-foreground mt-0.5">動画を見る</p>
                  </div>
                </a>
              </li>

            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
