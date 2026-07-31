"use client"

import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"

const linkButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        onDark:
          "bg-white text-navy shadow-sm hover:bg-white/90",
        onDarkOutline:
          "border border-white/40 bg-white/10 text-white hover:bg-white/20",
      },
      size: {
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-sm",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      block: false,
    },
  },
)

interface ExternalLinkButtonProps extends VariantProps<typeof linkButtonVariants> {
  href: string
  children: ReactNode
  /** true の場合は外部リンク扱い（新しいタブ + ExternalLink アイコン） */
  external?: boolean
  /** 明示的に外部アイコンを消したい場合 false */
  showIcon?: boolean
  className?: string
  ariaLabel?: string
  /** アクセス解析イベント名 */
  event?: string
  eventProps?: Record<string, string | number | boolean>
  disabled?: boolean
  /** download 属性（ファイル名を指定してダウンロード） */
  download?: string
}

export function ExternalLinkButton({
  href,
  children,
  external,
  showIcon = true,
  variant,
  size,
  block,
  className,
  ariaLabel,
  event,
  eventProps,
  disabled,
  download,
}: ExternalLinkButtonProps) {
  const isInternalAnchor = href.startsWith("#")
  const isExternal = external ?? (!isInternalAnchor && /^https?:\/\//.test(href))

  const handleClick = () => {
    if (event) trackEvent(event, eventProps)
  }

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(linkButtonVariants({ variant, size, block }), "cursor-not-allowed opacity-60", className)}
      >
        {children}
      </span>
    )
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download } : {})}
      className={cn(linkButtonVariants({ variant, size, block }), className)}
    >
      {children}
      {isExternal && showIcon ? <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden="true" /> : null}
    </a>
  )
}
