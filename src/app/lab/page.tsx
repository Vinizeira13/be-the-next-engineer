"use client"

import { useLocale } from "@/components/locale-provider"

const SIMS = [
  {
    id: "latency",
    num: "01",
    title: "Latency Distribution Lab",
    concept: "p50 / p90 / p99 · right-skewed · why mean lies",
    day: "D2",
    state: "queued",
  },
  {
    id: "prefill-decode",
    num: "02",
    title: "Prefill vs Decode Race",
    concept: "compute-bound vs memory-bound · the central insight",
    day: "D2",
    state: "queued",
  },
  {
    id: "kv-cache",
    num: "03",
    title: "KV Cache Observer",
    concept: "memory pressure · long context · PagedAttention",
    day: "D3",
    state: "queued",
  },
  {
    id: "quantization",
    num: "04",
    title: "Quantization Bench",
    concept: "FP16 → Q4 · perplexity vs speed · real Llama",
    day: "D3",
    state: "queued",
  },
  {
    id: "roofline",
    num: "05",
    title: "Roofline Plot",
    concept: "arithmetic intensity vs ops:byte · the universal diagnostic",
    day: "D4",
    state: "queued",
  },
] as const

export default function LabIndex() {
  const { locale } = useLocale()
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
        ▎ 02 / lab
      </p>
      <h1 className="mt-3 text-5xl font-medium tracking-tight md:text-6xl">
        {locale === "en" ? "Live Instruments" : "Instrumentos ao Vivo"}
      </h1>
      <p className="mt-3 max-w-2xl text-foreground/75">
        {locale === "en"
          ? "Five real simulations running real computation. Browser baseline using WebLLM Llama 3.2 1B. Mac-real overlay with MLX-LM Llama 70B 4-bit when the bridge is running."
          : "Cinco simulações rodando computação real. Baseline no browser usando WebLLM Llama 3.2 1B. Overlay Mac-real com MLX-LM Llama 70B 4-bit quando o bridge tá rodando."}
      </p>

      <ul className="mt-12 grid gap-px bg-border">
        {SIMS.map((s) => (
          <li
            key={s.id}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 bg-background px-2 py-5 opacity-60"
          >
            <span className="w-12 font-mono text-2xl font-medium tabular-nums text-foreground/40">
              {s.num}
            </span>
            <div>
              <div className="text-base font-medium">{s.title}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.concept}
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.day}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              ○ queued
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
