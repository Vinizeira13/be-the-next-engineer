"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CHAPTERS = [
  { id: "cap-0", num: "0", en: "Inference", pt: "Inference", pages: "p. 15-22", status: "ready" },
  { id: "cap-1", num: "1", en: "Prerequisites", pt: "Prerequisites", pages: "p. 23-38", status: "soon" },
  { id: "cap-2", num: "2", en: "Models", pt: "Models", pages: "p. 39-70", status: "soon" },
  { id: "cap-3", num: "3", en: "Hardware", pt: "Hardware", pages: "p. 71-92", status: "soon" },
  { id: "cap-4", num: "4", en: "Software", pt: "Software", pages: "p. 93-116", status: "soon" },
  { id: "cap-5", num: "5", en: "Techniques", pt: "Techniques", pages: "p. 117-152", status: "soon" },
  { id: "cap-6", num: "6", en: "Modalities", pt: "Modalities", pages: "p. 153-176", status: "soon" },
  { id: "cap-7", num: "7", en: "Production", pt: "Production", pages: "p. 177-208", status: "soon" },
] as const

export default function LivroIndex() {
  const { locale } = useLocale()
  const heading = locale === "en" ? "The Book" : "O Livro"
  const sub =
    locale === "en"
      ? "Inference Engineering by Philip Kiely · 8 chapters · 259 pages · distilled and bilingual."
      : "Inference Engineering por Philip Kiely · 8 capítulos · 259 páginas · destilado e bilíngue."

  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        01 / Livro
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{heading}</h1>
      <p className="mt-3 text-muted-foreground">{sub}</p>

      <div className="mt-10 grid gap-3">
        {CHAPTERS.map((c) => {
          const isReady = c.status === "ready"
          const inner = (
            <Card
              className={`border-border/60 bg-card/50 transition-colors ${isReady ? "hover:border-primary/40 hover:bg-accent/40" : "opacity-50"}`}
            >
              <CardContent className="flex items-center gap-6 p-5">
                <span className="w-8 font-mono text-2xl font-semibold tabular-nums text-muted-foreground">
                  {c.num}
                </span>
                <div className="flex-1">
                  <div className="text-base font-medium">
                    {locale === "en" ? c.en : c.pt}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {c.pages}
                  </div>
                </div>
                <Badge variant={isReady ? "default" : "outline"} className="font-mono text-[10px] uppercase">
                  {isReady ? (locale === "en" ? "ready" : "pronto") : "soon"}
                </Badge>
              </CardContent>
            </Card>
          )
          return isReady ? (
            <Link key={c.id} href={`/livro/${c.id}`}>{inner}</Link>
          ) : (
            <div key={c.id}>{inner}</div>
          )
        })}
      </div>
    </main>
  )
}
