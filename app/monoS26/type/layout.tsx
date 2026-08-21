import { ContentExpiryGate } from "@/components/content-expiry-gate"

export default function TypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentExpiryGate expiryDate="2026-08-27" discordUrl="https://discord.gg/X78w86XE3v">
      {children}
    </ContentExpiryGate>
  )
}
