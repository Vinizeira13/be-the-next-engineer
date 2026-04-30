"use client"

import { useLocale } from "@/components/locale-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SIMS = [
  { id: "latency", num: "01", title: "Latency Distribution Lab", concept: "p50/p90/p99 · right-skewed", day: "D2", status: "soon" },
  { id: "prefill-decode", num: "02", title: "Prefill vs Decode Race", concept: "compute-bound vs memory-bound", day: "D2", status: "soon" },
  { id: "kv-cache", num: "03", title: "KV Cache Observer", concept: "memory pressure · long context", day: "D3", status: "soon" },
  { id: "quantization", num: "04", title: "Quantization Bench", concept: "FP16 / Q8 / Q6 / Q4 trade-off", day: "D3", status: "soon" },
  { id: "roofline", num: "05", title: "Roofline Plot", concept: "arithmetic intensity vs ops:byte", day: "D4", status: "soon" },
] as const

export default function LabIndex() {
  const { locale } = useLocale()
  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        02 / Lab
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        {locale === "en" ? "Live Instruments" : "Instrumentos ao Vivo"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {locale === "en"
          ? "5 simulations running real computation. Browser baseline using WebLLM Llama 3.2 1B; Mac-real overlay using MLX-LM with Llama 70B 4-bit when the bridge is running."
          : "5 simulações rodando computação real. Baseline no browser usando WebLLM Llama 3.2 1B; overlay Mac-real usando MLX-LM com Llama 70B 4-bit quando o bridge está rodando."}
      </p>

      <div className="mt-10 grid gap-3">
        {SIMS.map((s) => (
          <Card key={s.id} className="border-border/60 bg-card/50 opacity-60">
            <CardContent className="flex items-center gap-6 p-5">
              <span className="font-mono text-sm font-semibold tabular-nums text-muted-foreground">
                {s.num}
              </span>
              <div className="flex-1">
                <div className="text-base font-medium">{s.title}</div>
                <div className="font-mono text-xs text-muted-foreground">{s.concept}</div>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] uppercase">
                {s.day}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px] uppercase">
                soon
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
