"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"

const CHAPTERS = [
  { id: "cap-0", num: "00", title: "Inference", pages: "p. 15–22", state: "shipped" },
  { id: "cap-1", num: "01", title: "Prerequisites", pages: "p. 23–38", state: "queued" },
  { id: "cap-2", num: "02", title: "Models", pages: "p. 39–70", state: "queued" },
  { id: "cap-3", num: "03", title: "Hardware", pages: "p. 71–92", state: "queued" },
  { id: "cap-4", num: "04", title: "Software", pages: "p. 93–116", state: "queued" },
  { id: "cap-5", num: "05", title: "Techniques", pages: "p. 117–152", state: "queued" },
  { id: "cap-6", num: "06", title: "Modalities", pages: "p. 153–176", state: "queued" },
  { id: "cap-7", num: "07", title: "Production", pages: "p. 177–208", state: "queued" },
] as const

export default function LivroIndex() {
  const { locale } = useLocale()
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
        ▎ {locale === "en" ? "01 / book" : "01 / livro"}
      </p>
      <h1 className="mt-3 text-5xl font-medium tracking-tight md:text-6xl">
        {locale === "en" ? "The Book" : "O Livro"}
      </h1>
      <p className="mt-3 max-w-2xl text-foreground/75">
        {locale === "en"
          ? "Inference Engineering by Philip Kiely. 8 chapters · 259 pages · distilled, bilingual, with interactive moments where bullet lists alone won't make it stick."
          : "Inference Engineering por Philip Kiely. 8 capítulos · 259 páginas · destilado, bilíngue, com momentos interativos onde uma bullet list não bastaria."}
      </p>

      <ul className="mt-12 grid gap-px bg-border">
        {CHAPTERS.map((c) => {
          const isReady = c.state === "shipped"
          const inner = (
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-6 bg-background px-2 py-5 transition-colors hover:bg-card">
              <span className="w-12 font-mono text-2xl font-medium tabular-nums text-foreground/60 group-hover:text-foreground">
                {c.num}
              </span>
              <div>
                <div className="text-base font-medium">{c.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {c.pages}
                </div>
              </div>
              <span
                className={
                  "font-mono text-[10px] uppercase tracking-widest " +
                  (isReady ? "text-phosphor" : "text-muted-foreground/50")
                }
              >
                {isReady ? "● shipped" : "○ queued"}
              </span>
              <span
                className={
                  "font-mono text-xs " +
                  (isReady ? "text-foreground" : "text-muted-foreground/30")
                }
              >
                →
              </span>
            </div>
          )
          return (
            <li key={c.id} className="group">
              {isReady ? <Link href={`/livro/${c.id}`}>{inner}</Link> : inner}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
