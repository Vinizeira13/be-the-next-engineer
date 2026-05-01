/**
 * In-memory rate limiter — fine for local dev and single-instance deploys.
 * For multi-instance prod (Vercel serverless), swap to Upstash Redis or
 * Vercel KV before opening the mentor to anonymous traffic.
 *
 * NOT a security boundary. Headers can be spoofed. This is to prevent
 * accidental loops, not abuse.
 */

type Window = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Window>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 30

export type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
  retryAfter?: number
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || now >= existing.resetAt) {
    const window: Window = { count: 1, resetAt: now + WINDOW_MS }
    buckets.set(key, window)
    return { ok: true, remaining: MAX_REQUESTS - 1, resetAt: window.resetAt }
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1
  return {
    ok: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  }
}

export function getClientKey(req: Request): string {
  // Vercel sets x-forwarded-for; fallback to x-real-ip; final fallback "anon"
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "anon"
}
