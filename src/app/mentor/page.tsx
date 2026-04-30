"use client"

import { useLocale } from "@/components/locale-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorIndex() {
  const { locale } = useLocale()
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        03 / Mentor
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">AI Mentor</h1>
      <p className="mt-3 text-muted-foreground">
        {locale === "en"
          ? "Claude Sonnet with RAG over the book + curated facts.json. Cites pages. Refuses to guess. Will be live by end of D1."
          : "Claude Sonnet com RAG sobre o livro + facts.json curado. Cita páginas. Recusa chutar. Fica live até o fim do D1."}
      </p>

      <Card className="mt-10 border-border/60 bg-card/50">
        <CardContent className="p-6">
          <Badge variant="outline" className="font-mono text-[10px] uppercase">
            D1 in progress
          </Badge>
          <p className="mt-4 text-sm text-muted-foreground">
            {locale === "en"
              ? "The mentor endpoint, RAG pipeline, and facts.json validator are being assembled. Come back when D1 is shipped — or watch the build log on GitHub."
              : "O endpoint do mentor, pipeline de RAG e validator de facts.json estão sendo montados. Volta quando D1 estiver enviado — ou acompanha o build log no GitHub."}
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
