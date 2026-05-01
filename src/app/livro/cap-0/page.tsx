"use client"

import Link from "next/link"
import { useLocale } from "@/components/locale-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThreeLayerArchitecture } from "@/components/lab/three-layer-architecture"

export default function Cap0Page() {
  const { locale } = useLocale()
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Link href="/livro" className="font-mono text-xs text-muted-foreground hover:text-foreground">
        ← {locale === "en" ? "All chapters" : "Todos capítulos"}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
          {locale === "en" ? "Chapter 0" : "Capítulo 0"}
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">p. 15–22</span>
      </div>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Inference</h1>

      {locale === "en" ? <ContentEN /> : <ContentPT />}

      <div className="mt-12 flex justify-between gap-3">
        <Button variant="ghost" disabled>
          ← {locale === "en" ? "Preface" : "Preface"}
        </Button>
        <Button variant="default" disabled>
          {locale === "en" ? "Cap. 1 — Prerequisites" : "Cap. 1 — Prerequisites"} →
        </Button>
      </div>
    </main>
  )
}

function ContentEN() {
  return (
    <article className="mt-8 max-w-none space-y-5 text-base leading-relaxed [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_strong]:font-semibold [&_em]:italic [&_em]:text-foreground/90 [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_p]:text-foreground/80">
      <p className="lead text-xl text-muted-foreground">
        Inference is the second life of an AI model — when the weights stop being learned and start
        serving real users at real cost. <em>Inference engineering</em> is the discipline of doing this
        fast, cheap, and reliably across the full stack: from CUDA kernels to Kubernetes clusters.
      </p>

      <h2>The mental model that holds the rest of the book</h2>

      <p>
        Kiely opens by drawing a three-layer architecture you should keep in your head from now until
        the last page. Don&apos;t just read it — drag the pieces yourself:
      </p>

      <ThreeLayerArchitecture />

      <p className="text-sm text-muted-foreground">
        That mapping is not arbitrary. <strong>Runtime</strong> is single-instance optimization
        (Caps. 2–6 live here). <strong>Infrastructure</strong> is everything that emerges when one
        instance is not enough (Cap. 7). <strong>Tooling</strong> is the abstraction layer
        engineers actually touch.
      </p>

      <h2>Why now</h2>

      <p>
        Until late 2022, serving generative models meant either calling a closed API (no control) or
        suffering through fragile ML infrastructure (no leverage). Three things changed: open models
        caught up to closed ones in late 2024 (DeepSeek V3, Llama 3, Qwen 2.5), GPU economics started
        making sense again, and the toolchain (vLLM, SGLang, TensorRT-LLM, NVIDIA Dynamo) matured
        enough to be production-grade.
      </p>

      <p>
        Inference engineering exists because the gap between &ldquo;I have weights&rdquo; and &ldquo;my
        users have a fast, reliable, sustainable product&rdquo; is enormous and keeps getting wider as
        models get bigger.
      </p>

      <h2>The optimization triangle</h2>

      <p>
        Three goals fight each other constantly: <strong>latency</strong> (how fast a single user gets
        a response), <strong>throughput</strong> (how many users you serve per dollar), and{" "}
        <strong>quality</strong> (how good the output is). You don&apos;t maximize all three. You{" "}
        <em>balance</em> them given the workload, the constraints, the SLA. The book is structured
        around the techniques that move the levers.
      </p>

      <h2>What you take from this chapter</h2>

      <ol>
        <li>The 3 layers — Runtime, Infrastructure, Tooling — are independent disciplines.</li>
        <li>
          A symptom of &ldquo;app feels slow&rdquo; could be a Runtime problem, an Infra problem, or a
          Tooling problem. Diagnosing the layer matters more than the fix.
        </li>
        <li>
          You optimize <em>against constraints</em>. The same model with the same hardware can have 5
          different optimal configurations for 5 different products.
        </li>
      </ol>

      <p className="mt-8 text-sm text-muted-foreground">
        Open the <Link href="/mentor" className="underline underline-offset-4">AI Mentor</Link> to
        ask anything about this chapter. It cites chapters and won&apos;t bullshit you.
      </p>
    </article>
  )
}

function ContentPT() {
  return (
    <article className="mt-8 max-w-none space-y-5 text-base leading-relaxed [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_strong]:font-semibold [&_em]:italic [&_em]:text-foreground/90 [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_p]:text-foreground/80">
      <p className="lead text-xl text-muted-foreground">
        Inference é a segunda vida de um modelo de IA — quando os pesos param de aprender e começam a
        servir usuários reais a custo real. <em>Inference engineering</em> é a disciplina de fazer isso
        de forma rápida, barata e confiável atravessando a stack inteira: de CUDA kernels a clusters
        Kubernetes.
      </p>

      <h2>O modelo mental que sustenta o livro inteiro</h2>

      <p>
        Kiely abre desenhando uma arquitetura de três camadas que você deveria manter na cabeça daqui
        até a última página. Não só leia — arrasta as peças você mesmo:
      </p>

      <ThreeLayerArchitecture />

      <p className="text-sm text-muted-foreground">
        Esse mapeamento não é arbitrário. <strong>Runtime</strong> é otimização single-instance
        (Caps. 2–6 vivem aqui). <strong>Infrastructure</strong> é tudo que emerge quando uma
        instância não basta (Cap. 7). <strong>Tooling</strong> é a camada de abstração que engineers
        de fato tocam.
      </p>

      <h2>Por que agora</h2>

      <p>
        Até final de 2022, servir modelos generativos significava ou chamar uma closed API (sem
        controle) ou sofrer com infraestrutura ML frágil (sem leverage). Três coisas mudaram: open
        models alcançaram closed models no final de 2024 (DeepSeek V3, Llama 3, Qwen 2.5), economia de
        GPU voltou a fazer sentido, e o toolchain (vLLM, SGLang, TensorRT-LLM, NVIDIA Dynamo)
        amadureceu o suficiente pra production-grade.
      </p>

      <p>
        Inference engineering existe porque o gap entre &ldquo;eu tenho os pesos&rdquo; e &ldquo;meus
        usuários têm um produto rápido, confiável e sustentável&rdquo; é enorme — e continua crescendo
        conforme os modelos crescem.
      </p>

      <h2>O triângulo da otimização</h2>

      <p>
        Três objetivos brigam o tempo todo: <strong>latency</strong> (quão rápido um único usuário
        recebe a resposta), <strong>throughput</strong> (quantos usuários você serve por dólar) e{" "}
        <strong>quality</strong> (quão boa é a saída). Você não maximiza os três. Você os{" "}
        <em>equilibra</em> dado o workload, os constraints, o SLA. O livro inteiro é estruturado em
        torno das técnicas que mexem nessas alavancas.
      </p>

      <h2>O que você leva desse capítulo</h2>

      <ol>
        <li>As 3 camadas — Runtime, Infrastructure, Tooling — são disciplinas independentes.</li>
        <li>
          Um sintoma de &ldquo;app tá lento&rdquo; pode ser problema de Runtime, de Infra, ou de
          Tooling. Diagnosticar a camada importa mais que o fix.
        </li>
        <li>
          Você otimiza <em>contra constraints</em>. O mesmo modelo no mesmo hardware pode ter 5
          configurações ótimas diferentes pra 5 produtos diferentes.
        </li>
      </ol>

      <p className="mt-8 text-sm text-muted-foreground">
        Abre o <Link href="/mentor" className="underline underline-offset-4">AI Mentor</Link> pra
        perguntar qualquer coisa sobre esse capítulo. Ele cita capítulos e não inventa.
      </p>
    </article>
  )
}
