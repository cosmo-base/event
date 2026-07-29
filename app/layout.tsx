import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Cosmo Base",
    default: "Cosmo Base",
  },
  description:
    "「宇宙を身近なものにする」「宇宙をすべての産業の選択肢にする」をビジョンに掲げる宇宙コミュニティ『Cosmo Base（コスモベース）』。初心者から宇宙産業に関心がある人まで、誰もが交流できる優しい場所です。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
