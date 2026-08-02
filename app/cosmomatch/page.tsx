import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Rocket, Stars, BookOpen } from "lucide-react"

export const metadata = {
  title: "Cosmo Match",
  description: "直感で答えるだけ。広大な宇宙の中から、あなたにぴったりの「推し」を見つける参加型シリーズ。",
}

export default function CosmoMatchTopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-card rounded-xl p-8 mb-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-2">
          <div className="p-3 rounded-lg bg-primary/20 shrink-0">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">あなたの「推し」を見つけよう。</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3 text-sm sm:text-base">
              <p>
                「学ぶ」のではなく、「推す」ことから始めてみませんか？<br />
                Cosmo Matchは、知識ゼロからあなただけの「推し」を見つけるための参加型シリーズです。いくつかの簡単な質問に直感で答えるだけで、あなたが心惹かれる運命の対象をナビゲートします。
              </p>
              <p>
                ロケットから始まり、天体や宇宙ミッションなど、出会える推しのジャンルは今後どんどん追加されていきます。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">～日本のロケット編～</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">
            日本の宇宙輸送を担うエースから、独自路線を貫く個性派まで。あなたの「ワクワクの原動力」にシンクロする運命の1機をマッチングします。
          </p>
          <Link href="/cosmomatch/rocket">
            <Button variant="outline" className="w-full bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 font-bold">
              マッチングを始める
            </Button>
          </Link>
          <div className="flex flex-col items-center gap-6 mt-3">
            <Link href="/cosmomatch/rocket/dictionary" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100">
              <BookOpen className="w-4 h-4" />
              <span>図鑑だけを見る</span>
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Stars className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">～88星座編～</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed opacity-80">
            季節を彩る星々の並びや、裏側に隠された神話の物語。あなたの性格や情緒に最もフィットする「夜空の道標」を見つけ出します。
          </p>
          <Link href="/cosmomatch/constellation">
            <Button variant="outline" className="w-full bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 font-bold">
              マッチングを始める
            </Button>
          </Link>
          <div className="flex flex-col items-center gap-6 mt-3">
            <Link href="/cosmomatch/constellation/dictionary" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100">
              <BookOpen className="w-4 h-4" />
              <span>図鑑だけを見る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
