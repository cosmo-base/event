import Link from "next/link"
import { SocialFooter } from "@/components/social-footer"
import { orgData } from "@/data/org-data"

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#000033] dark">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center">
          <Link href="/feedback" className="text-white font-bold text-sm">
            📋 アンケート
          </Link>
        </div>
      </header>
      <main className="pt-14">{children}</main>
      <SocialFooter
        cosmoBase={orgData.cosmoBase}
        fsif={orgData.fsif}
        socialLinks={orgData.socialLinks}
        legalLinks={orgData.legalLinks}
      />
    </div>
  )
}
