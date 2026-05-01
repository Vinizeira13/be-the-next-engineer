"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"

const COPY = {
  en: {
    statusLive: "live · building day 1 of 5",
    titleLine1: "Be the Next",
    titleLine2: "Inference Engineer",
    subtitle:
      "Five days. Real models in your browser. Real GPU on your Mac. An AI mentor that reads the book with you and refuses to bullshit.",
    bookCredit:
      'Companion to "Inference Engineering" by Philip Kiely (Baseten Books, 2026, 259 p.).',
    cta: "open chapter 0",
    secondary: "see how it works",
    sectionLabel: "// what's inside",
    sections: {
      livro: {
        kicker: "01",
        title: "The Book",
        body: "Kiely's 8 chapters distilled. Bilingual EN/PT-BR. Technical vocabulary stays in English on purpose — KV cache, prefill, decode, roofline, MoE. The words you'll hear in the field.",
        meta: "8 chapters · 259 pages · 2 languages",
      },
      lab: {
        kicker: "02",
        title: "Live Instruments",
        body: "Five real simulations running real computation. Latency percentiles, prefill vs decode, KV cache pressure, quantization, roofline. Browser baseline; M-series Mac unlocks Llama 70B.",
        meta: "5 instruments · WebLLM + MLX-LM",
      },
      mentor: {
        kicker: "03",
        title: "AI Mentor",
        body: "Claude Sonnet 4.6 via Vercel AI Gateway, with curated facts.json as ground truth. Cites chapters. Refuses to invent. RAG over the full PDF lands in D2.",
        meta: "claude-sonnet-4.6 · facts.json v0.1",
      },
    },
    daysLabel: "// 5 days",
    days: [
      { d: "D1", t: "Foundation · AI Mentor · Cap. 0", state: "shipped" },
      { d: "D2", t: "Sim 1 + 2 · Caps 1-2 · RAG over PDF", state: "next" },
      { d: "D3", t: "Sim 3 + 4 · Caps 3-5 · the densest day", state: "queued" },
      { d: "D4", t: "Sim 5 · Mac bridge · Caps 6-7", state: "queued" },
      { d: "D5", t: "Apêndices · Quick Checks · Golden test", state: "queued" },
    ],
    stateLabels: { shipped: "shipped", next: "→ up next", queued: "queued" },
    footer:
      "Next.js 16 · Tailwind v4 · shadcn/ui · WebLLM · MLX-LM · Vercel AI Gateway · Claude Sonnet 4.6",
  },
  pt: {
    statusLive: "live · construindo dia 1 de 5",
    titleLine1: "Be the Next",
    titleLine2: "Inference Engineer",
    subtitle:
      "Cinco dias. Modelos reais no seu browser. GPU real no seu Mac. Um AI mentor que lê o livro com você e recusa inventar.",
    bookCredit:
      'Companion ao livro "Inference Engineering" do Philip Kiely (Baseten Books, 2026, 259 p.).',
    cta: "abrir capítulo 0",
    secondary: "como funciona",
    sectionLabel: "// o que tem dentro",
    sections: {
      livro: {
        kicker: "01",
        title: "O Livro",
        body: "Os 8 capítulos do Kiely destilados. Bilíngue EN/PT-BR. Vocabulário técnico fica em inglês de propósito — KV cache, prefill, decode, roofline, MoE. As palavras que você vai ouvir no mercado.",
        meta: "8 capítulos · 259 páginas · 2 idiomas",
      },
      lab: {
        kicker: "02",
        title: "Instrumentos ao Vivo",
        body: "Cinco simulações rodando computação real. Latency percentiles, prefill vs decode, KV cache, quantization, roofline. Baseline no browser; M-series Mac destrava Llama 70B.",
        meta: "5 instrumentos · WebLLM + MLX-LM",
      },
      mentor: {
        kicker: "03",
        title: "AI Mentor",
        body: "Claude Sonnet 4.6 via Vercel AI Gateway, com facts.json curado como ground truth. Cita capítulos. Recusa inventar. RAG sobre o PDF completo chega no D2.",
        meta: "claude-sonnet-4.6 · facts.json v0.1",
      },
    },
    daysLabel: "// 5 dias",
    days: [
      { d: "D1", t: "Foundation · AI Mentor · Cap. 0", state: "shipped" },
      { d: "D2", t: "Sim 1 + 2 · Caps 1-2 · RAG sobre o PDF", state: "next" },
      { d: "D3", t: "Sim 3 + 4 · Caps 3-5 · o dia mais denso", state: "queued" },
      { d: "D4", t: "Sim 5 · Mac bridge · Caps 6-7", state: "queued" },
      { d: "D5", t: "Apêndices · Quick Checks · Golden test", state: "queued" },
    ],
    stateLabels: { shipped: "enviado", next: "→ em andamento", queued: "na fila" },
    footer:
      "Next.js 16 · Tailwind v4 · shadcn/ui · WebLLM · MLX-LM · Vercel AI Gateway · Claude Sonnet 4.6",
  },
} as const

export default function HomePage() {
  const { locale } = useLocale()
  const t = COPY[locale]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="relative pt-36 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="status-dot status-dot-live" aria-hidden />
              {t.statusLive}
            </div>

            <h1 className="text-[12vw] leading-[0.9] tracking-tighter sm:text-[9vw] md:text-[7.5rem] xl:text-[9rem] font-medium">
              <span className="block">{t.titleLine1}</span>
              <span className="block text-phosphor cursor-blink">
                {t.titleLine2}
              </span>
            </h1>

            <div className="grid max-w-5xl gap-6 md:grid-cols-[2fr_1fr]">
              <p className="text-balance text-xl leading-snug text-foreground/85 md:text-2xl">
                {t.subtitle}
              </p>
              <p className="border-l border-border/60 pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
                {t.bookCredit}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link href="/livro/cap-0">
                <Button
                  size="lg"
                  className="rounded-none border border-primary bg-primary px-6 font-mono text-[11px] uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_oklch(0.88_0.25_145/_0.4)]"
                >
                  {t.cta} →
                </Button>
              </Link>
              <Link href="#how">
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-none border border-border/60 px-6 font-mono text-[11px] uppercase tracking-widest text-foreground/80 hover:bg-accent hover:text-foreground"
                >
                  {t.secondary}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how" className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.sectionLabel}
          </p>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-3">
            {(["livro", "lab", "mentor"] as const).map((key, i) => {
              const sec = t.sections[key]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative bg-background p-8 transition-colors hover:bg-card"
                >
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-phosphor">{sec.kicker}</span>
                    <span className="ml-2">/</span>
                    <span className="ml-2 uppercase tracking-widest">
                      {sec.title}
                    </span>
                  </div>
                  <h3 className="mt-6 text-3xl font-medium tracking-tight">
                    {sec.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                    {sec.body}
                  </p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {sec.meta}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t.daysLabel}
          </p>
          <ul className="mt-8 grid gap-px bg-border">
            {t.days.map((d, i) => (
              <motion.li
                key={d.d}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-6 bg-background px-2 py-5 transition-colors hover:bg-card"
              >
                <span className="w-12 font-mono text-sm font-semibold tabular-nums text-foreground">
                  {d.d}
                </span>
                <span className="text-sm md:text-base">{d.t}</span>
                <span
                  className={
                    "font-mono text-[10px] uppercase tracking-widest " +
                    (d.state === "shipped"
                      ? "text-phosphor"
                      : d.state === "next"
                        ? "text-foreground"
                        : "text-muted-foreground/60")
                  }
                >
                  {d.state === "shipped" && "● "}
                  {d.state === "next" && "◐ "}
                  {d.state === "queued" && "○ "}
                  {t.stateLabels[d.state as keyof typeof t.stateLabels]}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="hr-phosphor mx-auto max-w-6xl" />

      <footer className="py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {t.footer}
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground/60">
          <a
            href="https://github.com/Vinizeira13/be-the-next-engineer"
            className="hover:text-phosphor"
          >
            github.com/Vinizeira13/be-the-next-engineer
          </a>
        </p>
      </footer>
    </main>
  )
}

