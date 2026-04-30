"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LocaleToggle } from "@/components/locale-toggle"
import { useLocale } from "@/components/locale-provider"

const COPY = {
  en: {
    eyebrow: "Open source · 5-day intensive",
    title: "Be the Next Engineer.",
    subtitle:
      "From zero to inference engineer in 5 days. Real models in your browser. Real GPUs on your Mac. AI mentor reading the book with you.",
    bookCredit:
      'Companion to "Inference Engineering" by Philip Kiely (Baseten Books, 2026).',
    cta: "Start Day 1",
    secondary: "How it works",
    sections: {
      livro: {
        label: "01 / Livro",
        title: "The Book",
        body: "Philip Kiely's 259-page Inference Engineering, distilled per chapter. Bilingual EN/PT-BR. Technical vocabulary stays in English on purpose.",
      },
      lab: {
        label: "02 / Lab",
        title: "Live Instruments",
        body: "5 real simulations: latency percentiles, prefill vs decode, KV cache pressure, quantization, roofline. Browser baseline + Mac-real overlay using your M-series GPU.",
      },
      mentor: {
        label: "03 / Mentor",
        title: "AI Mentor",
        body: "Claude with RAG over the book. Cites pages. Will not bullshit you — outputs are validated against a curated facts.json.",
      },
    },
    days: [
      { d: "D1", t: "Foundation + Cap. 0" },
      { d: "D2", t: "Sims 1+2 · Caps 1-2" },
      { d: "D3", t: "Sims 3+4 · Caps 3-5" },
      { d: "D4", t: "Sim 5 + Mac bridge · Caps 6-7" },
      { d: "D5", t: "Apêndices · Quick Checks" },
    ],
    footer:
      "Built with Next.js 16 · Tailwind v4 · shadcn/ui · WebLLM · MLX-LM · Claude Sonnet",
  },
  pt: {
    eyebrow: "Open source · Intensivo de 5 dias",
    title: "Be the Next Engineer.",
    subtitle:
      "Do zero a inference engineer em 5 dias. Modelos rodando no seu browser. GPU real no seu Mac. AI mentor lendo o livro com você.",
    bookCredit:
      'Companion ao livro "Inference Engineering" do Philip Kiely (Baseten Books, 2026).',
    cta: "Começar pelo Dia 1",
    secondary: "Como funciona",
    sections: {
      livro: {
        label: "01 / Livro",
        title: "O Livro",
        body: "As 259 páginas de Inference Engineering destiladas por capítulo. Bilíngue EN/PT-BR. Vocabulário técnico fica em inglês de propósito.",
      },
      lab: {
        label: "02 / Lab",
        title: "Instrumentos ao Vivo",
        body: "5 simulações reais: latency percentiles, prefill vs decode, KV cache, quantization, roofline. Baseline no browser + overlay Mac-real usando sua GPU M-series.",
      },
      mentor: {
        label: "03 / Mentor",
        title: "AI Mentor",
        body: "Claude com RAG sobre o livro. Cita páginas. Não inventa — outputs validados contra facts.json curado.",
      },
    },
    days: [
      { d: "D1", t: "Foundation + Cap. 0" },
      { d: "D2", t: "Sims 1+2 · Caps 1-2" },
      { d: "D3", t: "Sims 3+4 · Caps 3-5" },
      { d: "D4", t: "Sim 5 + Mac bridge · Caps 6-7" },
      { d: "D5", t: "Apêndices · Quick Checks" },
    ],
    footer:
      "Feito com Next.js 16 · Tailwind v4 · shadcn/ui · WebLLM · MLX-LM · Claude Sonnet",
  },
} as const

export default function HomePage() {
  const { locale } = useLocale()
  const t = COPY[locale]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight"
          >
            BTNE
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/livro">
              <Button variant="ghost" size="sm" className="text-xs">
                {locale === "en" ? "Book" : "Livro"}
              </Button>
            </Link>
            <Link href="/lab">
              <Button variant="ghost" size="sm" className="text-xs">
                Lab
              </Button>
            </Link>
            <Link href="/mentor">
              <Button variant="ghost" size="sm" className="text-xs">
                Mentor
              </Button>
            </Link>
            <LocaleToggle />
          </nav>
        </div>
      </header>

      <section className="relative pt-40 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-6 font-mono text-[10px] uppercase tracking-widest"
            >
              {t.eyebrow}
            </Badge>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
              {t.subtitle}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground/80">
              {t.bookCredit}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/livro/cap-0">
                <Button size="lg" className="font-medium">
                  {t.cta} →
                </Button>
              </Link>
              <Link href="#how">
                <Button size="lg" variant="ghost" className="font-medium">
                  {t.secondary}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how" className="border-t border-border/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {(["livro", "lab", "mentor"] as const).map((key, i) => {
            const sec = t.sections[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full border-border/60 bg-card/50">
                  <CardContent className="p-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {sec.label}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {sec.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {sec.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {locale === "en" ? "5 days" : "5 dias"}
          </h2>
          <ul className="mt-6 grid gap-1">
            {t.days.map((d) => (
              <li
                key={d.d}
                className="group flex items-center gap-6 border-b border-border/30 py-4 transition-colors hover:bg-accent/30"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {d.d}
                </span>
                <span className="text-sm">{d.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator />

      <footer className="py-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {t.footer}
        </p>
      </footer>
    </main>
  )
}
