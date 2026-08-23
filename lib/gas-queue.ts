// Client-only: localStorage queue for GAS POST requests.
// Saves data before sending; retries on next page load if network fails.
// Works with no-cors — assumes success unless fetch() throws (network error).

const GAS_URL = process.env.NEXT_PUBLIC_EVENT_GAS_URL ?? ""
const QUEUE_KEY = "gas_pending"
const MAX_ATTEMPTS = 5

interface QueuedItem {
  id: string
  ts: number
  attempts: number
  payload: Record<string, unknown>
}

function readQueue(): QueuedItem[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]")
  } catch {
    return []
  }
}

function writeQueue(q: QueuedItem[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q))
  } catch { /* storage full — ignore */ }
}

async function postToGas(payload: Record<string, unknown>): Promise<void> {
  await fetch(GAS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
}

function isOperatorMode(): boolean {
  try { return sessionStorage.getItem("operator_mode") === "1" } catch { return false }
}

/** Enqueue payload, attempt to send immediately. Falls back to queue on network error. */
export async function sendToGas(payload: Record<string, unknown>, { force = false } = {}): Promise<void> {
  if (!force && isOperatorMode()) return
  const item: QueuedItem = {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    ts: Date.now(),
    attempts: 0,
    payload,
  }

  // Persist before sending
  const q = readQueue()
  q.push(item)
  writeQueue(q)

  try {
    await postToGas(payload)
    // Success: remove from queue
    writeQueue(readQueue().filter((i) => i.id !== item.id))
  } catch {
    // Network failure: leave in queue, update attempt count
    writeQueue(readQueue().map((i) => i.id === item.id ? { ...i, attempts: 1 } : i))
  }
}

/** Retry all queued items. Call once on page load. */
export async function flushGasQueue(): Promise<void> {
  if (isOperatorMode()) return
  const q = readQueue()
  if (q.length === 0) return

  const remaining: QueuedItem[] = []
  for (const item of q) {
    if (item.attempts >= MAX_ATTEMPTS) continue // give up
    try {
      await postToGas(item.payload)
      // success — don't add to remaining
    } catch {
      remaining.push({ ...item, attempts: item.attempts + 1 })
    }
  }
  writeQueue(remaining)
}
