// ============================================================================
// アクセス解析用の共通関数
// ----------------------------------------------------------------------------
// 初期版では console.log に出力するだけです。
// Google Analytics や Vercel Analytics を導入する際は、この関数の内部だけを
// 書き換えれば、呼び出し側のコードを変更せずに計測を有効化できます。
// ============================================================================

export type TrackProperties = Record<string, string | number | boolean>

export function trackEvent(eventName: string, properties?: TrackProperties): void {
  // 例: 本番導入時はここで window.gtag(...) や va.track(...) を呼び出す
  if (typeof window !== "undefined") {
    console.log("[analytics]", eventName, properties ?? {})
  }
}
