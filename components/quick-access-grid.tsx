"use client"

import { ExternalLink } from "lucide-react"
import type { QuickLink } from "@/data/event-page-data"
import { QuickIcon } from "@/components/icons"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

export function QuickAccessGrid({ links }: { links: QuickLink[] }) {
  return (
    <section aria-labelledby="quick-access-heading" className="mx-auto max-w-6xl px-4 pt-8">
      <h2 id="quick-access-heading" className="sr-only">
        クイックアクセス
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => {
          const isExternal = link.external
          return (
            <li
              key={link.id}
              className={cn(link.featured && "col-span-2 sm:col-span-3 lg:col-span-2")}
            >
              <a
                href={link.href}
                onClick={() => link.event && trackEvent(link.event)}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "group flex h-full min-h-[104px] flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:translate-y-0",
                  link.featured
                    ? "border-primary/20 bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground",
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      link.featured ? "bg-white/15 text-white" : "bg-secondary text-primary",
                    )}
                  >
                    <QuickIcon name={link.icon} className="size-5" />
                  </span>
                  {isExternal ? (
                    <ExternalLink
                      className={cn(
                        "size-4 shrink-0",
                        link.featured ? "text-white/70" : "text-muted-foreground",
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold leading-snug text-balance">{link.title}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs leading-snug",
                      link.featured ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {link.description}
                    {isExternal ? <span className="sr-only">（新しいタブで開きます）</span> : null}
                  </p>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
