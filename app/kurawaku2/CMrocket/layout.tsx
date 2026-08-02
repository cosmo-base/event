import { ContentExpiryGate } from "@/components/content-expiry-gate"

export default function KurawakuCMrocketLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentExpiryGate expiryDate="2026-08-08" discordUrl="https://discord.gg/X78w86XE3v">
      {children}
    </ContentExpiryGate>
  )
}
