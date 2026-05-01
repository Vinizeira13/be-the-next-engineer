"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { ThreeLayerArchitecture } from "@/components/lab/three-layer-architecture"

const COMPANIES = [
  "Cursor",
  "Notion",
  "Clay",
  "Gamma",
  "Mercor",
  "Superhuman",
  "OpenEvidence",
  "Abridge",
  "Ambience",
  "Writer",
] as const

const TECHNIQUES = [
  {
    id: "batching",
    label: "Batching",
    chapter: "Cap. 5",
    en: "Run many requests through one forward pass — turn idle GPU into served users.",
    pt: "Roda muitos requests num único forward pass — transforma GPU idle em usuários servidos.",
  },
  {
    id: "caching",
    label: "Caching",
    chapter: "Cap. 5.3",
    en: "Reuse KV cache across requests sharing prefixes. Skip prefill in chats and RAG.",
    pt: "Reusa KV cache entre requests com prefixos comuns. Skipa prefill em chats e RAG.",
  },
  {
    id: "quant",
    label: "Quantization",
    chapter: "Cap. 5.1",
    en: "Lower precision (FP8, FP4). Faster compute, smaller memory, ~30-50% speedup.",
    pt: "Precisão menor (FP8, FP4). Compute mais rápido, memória menor, ~30-50% speedup.",
  },
  {
    id: "spec",
    label: "Speculation",
    chapter: "Cap. 5.2",
    en: "Draft model proposes tokens, target validates. Multiple tokens per forward pass.",
    pt: "Draft model propõe tokens, target valida. Múltiplos tokens por forward pass.",
  },
  {
    id: "parallel",
    label: "Parallelism",
    chapter: "Cap. 5.4",
    en: "Tensor / Expert / Pipeline. Split a model across GPUs without melting interconnects.",
    pt: "Tensor / Expert / Pipeline. Divide um modelo entre GPUs sem derreter interconnects.",
  },
  {
    id: "disagg",
    label: "Disaggregation",
    chapter: "Cap. 5.5",
    en: "Separate prefill (compute-bound) from decode (memory-bound) onto different workers.",
    pt: "Separa prefill (compute-bound) de decode (memory-bound) em workers diferentes.",
  },
] as const

export default function Cap0Page() {
  const { locale } = useLocale()
  return (
    <main className="relative">
      {/* Top bar */}
      <div className="border-b border-border/60 bg-background/80 pt-20 pb-6 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/livro"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            ← {locale === "en" ? "all chapters" : "todos capítulos"}
          </Link>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
              ▎ {locale === "en" ? "chapter 0" : "capítulo 0"}
            </span>
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
              p. 15–22 · 8 pages
            </span>
          </div>
          <h1 className="mt-3 text-5xl font-medium tracking-tight md:text-6xl">
            Inference
          </h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {locale === "en"
              ? "the second life of an AI model · the discipline of serving it well"
              : "a segunda vida de um modelo de IA · a disciplina de servi-lo bem"}
          </p>
        </div>
      </div>

      {/* Companies marquee */}
      <div className="border-b border-border/60 py-4">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {locale === "en"
              ? "companies pulling this off in production"
              : "empresas fazendo isso em produção"}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-foreground/70">
            {COMPANIES.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {locale === "en" ? <ContentEN /> : <ContentPT />}

        <Preview6 locale={locale} />

        <div className="mt-16 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:justify-between">
          <button
            disabled
            className="cursor-not-allowed font-mono text-[11px] uppercase tracking-widest text-muted-foreground/50"
          >
            ← preface
          </button>
          <button
            disabled
            className="cursor-not-allowed font-mono text-[11px] uppercase tracking-widest text-muted-foreground/50"
          >
            cap. 1 — prerequisites · {locale === "en" ? "soon" : "em breve"} →
          </button>
        </div>
      </div>
    </main>
  )
}

function ContentEN() {
  return (
    <article className="space-y-6 text-base leading-relaxed [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic [&_em]:text-foreground [&_p]:text-foreground/80">
      <p className="text-xl leading-relaxed text-foreground/95 md:text-[1.4rem]">
        Inference is the second life of an AI model — when the weights stop
        being learned and start serving real users at real cost.{" "}
        <em>Inference engineering</em> is the discipline of doing this fast,
        cheap, and reliably across the full stack: from CUDA kernels to
        Kubernetes clusters. It is, in Kiely&apos;s words, <em>still in its
        infancy</em>. Few people are good at it. The ones who are end up at
        Baseten, Together, Modal, Anyscale, the frontier labs.
      </p>

      <h2>The mental model that holds the rest of the book</h2>

      <p>
        Kiely opens by drawing a three-layer architecture you should keep in
        your head from now until the last page. Don&apos;t just read it — drag
        the pieces yourself:
      </p>

      <ThreeLayerArchitecture />

      <p className="text-sm leading-relaxed text-foreground/70">
        That mapping is not arbitrary. <strong>Runtime</strong> is
        single-instance optimization (Caps. 2–6 live here).{" "}
        <strong>Infrastructure</strong> is everything that emerges when one
        instance is not enough (Cap. 7). <strong>Tooling</strong> is the
        abstraction layer engineers actually touch.
      </p>

      <h2>Why now</h2>

      <p>
        Until late 2022, serving generative models meant either calling a
        closed API (no control) or suffering through fragile ML infra (no
        leverage). Three things changed: open models caught up to closed ones
        in late 2024 (DeepSeek V3, Llama 3, Qwen 2.5), GPU economics started
        making sense again, and the toolchain (vLLM, SGLang, TensorRT-LLM,
        NVIDIA Dynamo) matured enough to be production-grade.
      </p>

      <p>
        Inference engineering exists because the gap between &ldquo;I have
        weights&rdquo; and &ldquo;my users have a fast, reliable, sustainable
        product&rdquo; is enormous and keeps getting wider as models get
        bigger.
      </p>

      <h2>The optimization triangle</h2>

      <p>
        Three goals fight each other constantly: <strong>latency</strong> (how
        fast a single user gets a response), <strong>throughput</strong> (how
        many users you serve per dollar), and <strong>quality</strong> (how
        good the output is). You don&apos;t maximize all three. You{" "}
        <em>balance</em> them given the workload, the constraints, the SLA.
        The book is structured around the techniques that move the levers.
      </p>

      <h2>What you take from this chapter</h2>

      <ul className="list-none space-y-3 pl-0">
        <li className="border-l-2 border-phosphor pl-4">
          The 3 layers — Runtime, Infrastructure, Tooling — are independent
          disciplines.
        </li>
        <li className="border-l-2 border-phosphor pl-4">
          A symptom of &ldquo;app feels slow&rdquo; could be a Runtime,
          Infrastructure, or Tooling problem. <strong>Diagnosing the layer
          matters more than the fix.</strong>
        </li>
        <li className="border-l-2 border-phosphor pl-4">
          You optimize <em>against constraints</em>. The same model with the
          same hardware can have 5 different optimal configurations for 5
          different products.
        </li>
      </ul>

      <p className="mt-10 text-sm text-foreground/70">
        Open the{" "}
        <Link
          href="/mentor"
          className="text-phosphor underline-offset-4 hover:underline"
        >
          AI Mentor
        </Link>{" "}
        to interrogate this chapter. It cites chapters and refuses to invent.
      </p>
    </article>
  )
}

function ContentPT() {
  return (
    <article className="space-y-6 text-base leading-relaxed [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic [&_em]:text-foreground [&_p]:text-foreground/80">
      <p className="text-xl leading-relaxed text-foreground/95 md:text-[1.4rem]">
        Inference é a segunda vida de um modelo de IA — quando os pesos param
        de aprender e começam a servir usuários reais a custo real.{" "}
        <em>Inference engineering</em> é a disciplina de fazer isso rápido,
        barato e confiável atravessando a stack inteira: de CUDA kernels a
        clusters Kubernetes. Está, nas palavras do Kiely,{" "}
        <em>ainda na infância</em>. Pouca gente é boa nisso. Quem é, acaba na
        Baseten, Together, Modal, Anyscale, nos frontier labs.
      </p>

      <h2>O modelo mental que sustenta o livro inteiro</h2>

      <p>
        Kiely abre desenhando uma arquitetura de três camadas que você deveria
        manter na cabeça daqui até a última página. Não só leia — arrasta as
        peças você mesmo:
      </p>

      <ThreeLayerArchitecture />

      <p className="text-sm leading-relaxed text-foreground/70">
        Esse mapeamento não é arbitrário. <strong>Runtime</strong> é
        otimização single-instance (Caps. 2–6 vivem aqui).{" "}
        <strong>Infrastructure</strong> é tudo que emerge quando uma instância
        não basta (Cap. 7). <strong>Tooling</strong> é a camada de abstração
        que engineers de fato tocam.
      </p>

      <h2>Por que agora</h2>

      <p>
        Até final de 2022, servir modelos generativos significava ou chamar
        uma closed API (sem controle) ou sofrer com infra ML frágil (sem
        leverage). Três coisas mudaram: open models alcançaram closed models
        no final de 2024 (DeepSeek V3, Llama 3, Qwen 2.5), economia de GPU
        voltou a fazer sentido, e o toolchain (vLLM, SGLang, TensorRT-LLM,
        NVIDIA Dynamo) amadureceu o suficiente pra production-grade.
      </p>

      <p>
        Inference engineering existe porque o gap entre &ldquo;eu tenho os
        pesos&rdquo; e &ldquo;meus usuários têm um produto rápido, confiável e
        sustentável&rdquo; é enorme — e continua crescendo conforme os modelos
        crescem.
      </p>

      <h2>O triângulo da otimização</h2>

      <p>
        Três objetivos brigam o tempo todo: <strong>latency</strong> (quão
        rápido um único usuário recebe a resposta),{" "}
        <strong>throughput</strong> (quantos usuários você serve por dólar) e{" "}
        <strong>quality</strong> (quão boa é a saída). Você não maximiza os
        três. Você os <em>equilibra</em> dado o workload, os constraints, o
        SLA. O livro inteiro é estruturado em torno das técnicas que mexem
        nessas alavancas.
      </p>

      <h2>O que você leva desse capítulo</h2>

      <ul className="list-none space-y-3 pl-0">
        <li className="border-l-2 border-phosphor pl-4">
          As 3 camadas — Runtime, Infrastructure, Tooling — são disciplinas
          independentes.
        </li>
        <li className="border-l-2 border-phosphor pl-4">
          Um sintoma de &ldquo;app tá lento&rdquo; pode ser problema de
          Runtime, Infrastructure, ou Tooling.{" "}
          <strong>Diagnosticar a camada importa mais que o fix.</strong>
        </li>
        <li className="border-l-2 border-phosphor pl-4">
          Você otimiza <em>contra constraints</em>. O mesmo modelo no mesmo
          hardware pode ter 5 configurações ótimas diferentes pra 5 produtos
          diferentes.
        </li>
      </ul>

      <p className="mt-10 text-sm text-foreground/70">
        Abre o{" "}
        <Link
          href="/mentor"
          className="text-phosphor underline-offset-4 hover:underline"
        >
          AI Mentor
        </Link>{" "}
        pra interrogar esse capítulo. Ele cita capítulos e recusa inventar.
      </p>
    </article>
  )
}

function Preview6({ locale }: { locale: "en" | "pt" }) {
  return (
    <section className="not-prose mt-16">
      <div className="mb-6 border-t border-border/60 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
          ▎ preview · the 6 levers
        </p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight">
          {locale === "en"
            ? "What Cap. 5 will hand you"
            : "O que o Cap. 5 vai te entregar"}
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          {locale === "en"
            ? "Cap. 0 closes by naming the optimization techniques you'll learn. They show up everywhere from D3 onward — preview them now so you recognize the words."
            : "Cap. 0 fecha nomeando as técnicas de otimização que você vai aprender. Elas aparecem em todo lugar a partir do D3 — preview agora pra você reconhecer as palavras."}
        </p>
      </div>
      <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUES.map((t) => (
          <div key={t.id} className="bg-card p-5 transition-colors hover:bg-accent">
            <div className="flex items-baseline justify-between">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-phosphor">
                {t.label}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {t.chapter}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-foreground/75">
              {t[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
