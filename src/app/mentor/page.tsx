"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const COPY = {
  en: {
    eyebrow: "03 / Mentor",
    title: "AI Mentor",
    subtitle:
      "Claude Sonnet 4.6 reading the book with you. Cites chapters. Refuses to invent specifics. RAG over the full PDF lands in D2 — for now relies on a curated facts.json + training data.",
    placeholder: "Ask anything about inference engineering. Press ⌘+Enter to send.",
    send: "Send",
    stop: "Stop",
    thinking: "Thinking…",
    empty: "Empty thread. Try: \"Why is decode memory-bound?\" or \"Compare vLLM and SGLang.\"",
    you: "You",
    mentor: "Mentor",
    error:
      "AI Gateway not authenticated. Run `vercel link && vercel env pull .env.local`, or set AI_GATEWAY_API_KEY in .env.local.",
  },
  pt: {
    eyebrow: "03 / Mentor",
    title: "AI Mentor",
    subtitle:
      "Claude Sonnet 4.6 lendo o livro com você. Cita capítulos. Recusa inventar especificidades. RAG completo no PDF chega no D2 — por enquanto se apoia em facts.json curado + training data.",
    placeholder: "Pergunte qualquer coisa sobre inference engineering. Pressione ⌘+Enter pra enviar.",
    send: "Enviar",
    stop: "Parar",
    thinking: "Pensando…",
    empty: "Thread vazio. Tenta: \"Por que decode é memory-bound?\" ou \"Compara vLLM e SGLang.\"",
    you: "Você",
    mentor: "Mentor",
    error: "AI Gateway não autenticado. Roda `vercel link && vercel env pull .env.local`, ou seta AI_GATEWAY_API_KEY no .env.local.",
  },
} as const

export default function MentorPage() {
  const { locale } = useLocale()
  const t = COPY[locale]
  const [input, setInput] = useState("")

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/mentor" }),
  })

  const isStreaming = status === "submitted" || status === "streaming"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 pt-32 pb-6">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
          ▎ 03 / mentor
        </p>
        <h1 className="mt-3 text-5xl font-medium tracking-tight md:text-6xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/75">
          {t.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border border-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
            <span className="status-dot status-dot-live" />
            anthropic/claude-sonnet-4.6
          </span>
          <span className="inline-flex items-center gap-2 border border-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
            via Vercel AI Gateway
          </span>
          <span className="inline-flex items-center gap-2 border border-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
            facts.json · 47 facts
          </span>
          <span className="inline-flex items-center gap-2 border border-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            ○ RAG @ D2
          </span>
        </div>
      </header>

      <section className="mt-8 flex-1 space-y-4">
        {messages.length === 0 && (
          <Card className="border-dashed border-border/60 bg-card/30">
            <CardContent className="p-6 text-sm text-muted-foreground">
              {t.empty}
            </CardContent>
          </Card>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={
                  m.role === "user"
                    ? "border-border/60 bg-accent/30"
                    : "border-border/60 bg-card/40"
                }
              >
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {m.role === "user" ? t.you : t.mentor}
                    </span>
                  </div>
                  <div className="space-y-3 text-[15px] leading-relaxed">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <p key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      ) : null,
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {error && (
          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="p-5 text-sm text-destructive">
              {t.error}
            </CardContent>
          </Card>
        )}
      </section>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-4 mt-6 rounded-xl border border-border/60 bg-background/80 p-3 backdrop-blur-xl"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          rows={2}
          disabled={isStreaming}
          className="min-h-[60px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {isStreaming ? t.thinking : "⌘ + Enter"}
          </span>
          {isStreaming ? (
            <Button type="button" variant="ghost" size="sm" onClick={stop}>
              {t.stop}
            </Button>
          ) : (
            <Button type="submit" size="sm" disabled={!input.trim()}>
              {t.send} →
            </Button>
          )}
        </div>
      </form>
    </main>
  )
}
