"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "発表資料", href: "#pitch" },
  { label: "コンテンツ体験", href: "#contents" },
  { label: "Cosmo Base", href: "#cosmo-base" },
  { label: "運営団体", href: "#organization" },
  { label: "SNS", href: "#social" },
];

export function EventHeader({ logoUrl, eventName, homeHref }: { logoUrl?: string; eventName?: string; homeHref?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Resolve the home destination: explicit prop wins, then auto-detect from pathname
  const resolvedHome = homeHref
    ?? (pathname?.match(/^\/(kurawaku2|monoS26|monoK26|SDF26)\/.+/) ? `/${pathname.split("/")[1]}` : null)

  const scrollTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        {/* 左: ロゴ */}
        {resolvedHome ? (
          <Link
            href={resolvedHome}
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center gap-2 rounded-lg py-1 pr-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="イベントトップへ戻る"
          >
            <span className="flex flex-col items-start leading-none">
              <img className="h-6 w-max" src="/event/CB_logo.png" alt="CB" aria-hidden="true" />
              <span className="text-[10px] font-medium text-muted-foreground">イベント特設ページ</span>
            </span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={scrollTop}
            className="flex shrink-0 items-center gap-2 rounded-lg py-1 pr-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="ページ最上部へ戻る"
          >
            <span className="flex flex-col items-start leading-none">
              <img className="h-6 w-max" src="/event/CB_logo.png" alt="CB" aria-hidden="true" />
              <span className="text-[10px] font-medium text-muted-foreground">イベント特設ページ</span>
            </span>
          </button>
        )}

        {/* 中央: イベント名 */}
        {eventName && (
          resolvedHome ? (
            <Link
              href={resolvedHome}
              onClick={() => setOpen(false)}
              className="absolute left-1/2 -translate-x-1/2 text-sm font-bold text-foreground whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {eventName}
            </Link>
          ) : (
            <button
              type="button"
              onClick={scrollTop}
              className="absolute left-1/2 -translate-x-1/2 text-sm font-bold text-foreground whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {eventName}
            </button>
          )
        )}

        {/* 右: ナビ / ハンバーガー */}
        <div className="ml-auto flex items-center">
          <nav
            className="hidden md:flex md:items-center md:gap-1"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:hidden"
            aria-label="メニューを開く"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* モバイルメニュー（Drawer） */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-navy/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="メニュー"
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col bg-background shadow-xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            <span className="text-sm font-bold text-foreground">メニュー</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              aria-label="メニューを閉じる"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            className="flex flex-col gap-1 p-3"
            aria-label="モバイルナビゲーション"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
