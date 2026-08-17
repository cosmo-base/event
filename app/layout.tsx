import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

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
    <html lang="ja" className={notoSans.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
