"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { useLocale } from "@/components/locale-provider"
import { shuffle } from "@/lib/utils"

/**
 * Cap. 0 — interactive 3-layer architecture.
 *
 * Drag tools onto the layer where they actually live. Wrong drops do not
 * disappear into a toast; they pulse the chip red with an inline hint that
 * stays until next attempt. Correct drops lock in green AND reveal an
 * inline explanation of *why* the chip belongs there.
 */

type Layer = "runtime" | "infra" | "tooling"

type Chip = {
  id: string
  label: string
  layer: Layer
  why: { en: string; pt: string }
  hint: { en: string; pt: string }
}

const CHIPS: Chip[] = [
  {
    id: "vllm",
    label: "vLLM",
    layer: "runtime",
    why: {
      en: "Inference engine — makes ONE model fast on ONE instance. Pure Runtime.",
      pt: "Inference engine — faz UM modelo rápido em UMA instância. Runtime puro.",
    },
    hint: {
      en: "An engine that batches requests and runs kernels — does that fit Runtime, Infra, or Tooling?",
      pt: "Um engine que batchea requests e roda kernels — encaixa em Runtime, Infra, ou Tooling?",
    },
  },
  {
    id: "kv-cache",
    label: "KV cache",
    layer: "runtime",
    why: {
      en: "Reuses key/value tensors so attention is O(N) per token in decode. Lives inside the engine.",
      pt: "Reusa tensores key/value pra attention ser O(N) por token no decode. Vive dentro do engine.",
    },
    hint: {
      en: "It's an attention mechanism inside the model serving stack. Which layer owns the model serving?",
      pt: "É um mecanismo de attention dentro da stack de serving. Qual camada cuida de serving do modelo?",
    },
  },
  {
    id: "flashattention",
    label: "FlashAttention",
    layer: "runtime",
    why: {
      en: "Hand-fused CUDA kernel for attention. Hardware-coupled. Runtime.",
      pt: "Kernel CUDA hand-fused pra attention. Acoplado a hardware. Runtime.",
    },
    hint: {
      en: "It's a kernel — code that runs on the GPU itself.",
      pt: "É um kernel — código que roda na própria GPU.",
    },
  },
  {
    id: "k8s",
    label: "Kubernetes",
    layer: "infra",
    why: {
      en: "Container orchestration across nodes. Single instance? Not its job. Infrastructure.",
      pt: "Orquestração de containers entre nós. Single instance? Não é o trabalho dele. Infrastructure.",
    },
    hint: {
      en: "K8s is famously about scaling across machines, not optimizing one.",
      pt: "K8s é famoso por escalar entre máquinas, não otimizar uma.",
    },
  },
  {
    id: "autoscaling",
    label: "autoscaling",
    layer: "infra",
    why: {
      en: "Spins replicas up/down based on traffic. Cross-instance by definition.",
      pt: "Sobe/desce réplicas conforme tráfego. Cross-instance por definição.",
    },
    hint: {
      en: "Adjusting replica count means you're operating across multiple instances.",
      pt: "Ajustar número de réplicas significa que você opera entre múltiplas instâncias.",
    },
  },
  {
    id: "multicloud",
    label: "multi-cloud",
    layer: "infra",
    why: {
      en: "Spanning AWS + GCP + neoclouds. Pure Infrastructure problem — geo, capacity, failover.",
      pt: "AWS + GCP + neoclouds. Problema puro de Infrastructure — geo, capacidade, failover.",
    },
    hint: {
      en: "If it involves regions and providers, it's not single-instance.",
      pt: "Se envolve regiões e providers, não é single-instance.",
    },
  },
  {
    id: "openai-sdk",
    label: "OpenAI SDK",
    layer: "tooling",
    why: {
      en: "Client abstraction the developer touches. Wraps an API call into idiomatic code.",
      pt: "Abstração que o dev toca. Embrulha uma API call em código idiomático.",
    },
    hint: {
      en: "An SDK is the surface engineers write code against — that's a developer abstraction.",
      pt: "Um SDK é a superfície contra a qual engenheiros escrevem código — abstração de dev.",
    },
  },
  {
    id: "evals",
    label: "eval framework",
    layer: "tooling",
    why: {
      en: "Measures quality. Sits in the engineer's workflow, not in the serving path.",
      pt: "Mede qualidade. Vive no workflow do engineer, não no caminho de serving.",
    },
    hint: {
      en: "Evals are how you decide if your stack is good — they don't run inside the request path.",
      pt: "Evals são como você decide se sua stack é boa — não rodam dentro do request path.",
    },
  },
  {
    id: "observability",
    label: "Grafana dashboard",
    layer: "tooling",
    why: {
      en: "Visibility for engineers. Reads metrics; doesn't generate or scale.",
      pt: "Visibilidade pros engineers. Lê métricas; não gera nem escala.",
    },
    hint: {
      en: "A dashboard is a UI for humans, not part of inference itself.",
      pt: "Um dashboard é UI pra humanos, não parte da inferência em si.",
    },
  },
]

const LAYER_INFO: Record<
  Layer,
  {
    en: string
    pt: string
    desc: { en: string; pt: string }
    accent: string
  }
> = {
  runtime: {
    en: "Runtime",
    pt: "Runtime",
    desc: {
      en: "ONE model fast on ONE instance. Kernels, engines, batching, caching.",
      pt: "UM modelo rápido em UMA instância. Kernels, engines, batching, caching.",
    },
    accent: "var(--color-phosphor)",
  },
  infra: {
    en: "Infrastructure",
    pt: "Infrastructure",
    desc: {
      en: "Across clusters, regions, clouds. Scale and uptime.",
      pt: "Entre clusters, regiões, clouds. Escala e uptime.",
    },
    accent: "var(--color-amber)",
  },
  tooling: {
    en: "Tooling",
    pt: "Tooling",
    desc: {
      en: "The right abstraction for the team. Control vs productivity.",
      pt: "Abstração certa pro time. Controle vs produtividade.",
    },
    accent: "var(--color-violet)",
  },
}

export function ThreeLayerArchitecture() {
  const { locale } = useLocale()
  const layerRefs = {
    runtime: useRef<HTMLDivElement>(null),
    infra: useRef<HTMLDivElement>(null),
    tooling: useRef<HTMLDivElement>(null),
  }
  // Lazy initializer — runs once on mount, no useEffect needed.
  const [shuffled, setShuffled] = useState<Chip[]>(() => shuffle(CHIPS))
  const [placed, setPlaced] = useState<Record<string, Layer | null>>({})
  const [hoverLayer, setHoverLayer] = useState<Layer | null>(null)
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({})
  const [showHint, setShowHint] = useState<string | null>(null)

  const placedCount = Object.values(placed).filter(Boolean).length
  const allCorrect =
    CHIPS.every((c) => placed[c.id] === c.layer) &&
    Object.keys(placed).length === CHIPS.length

  /**
   * Hit-test using a chip-center point rather than the cursor position.
   * Cursor-based detection is wrong when the user grabs a chip by its corner
   * — the cursor can sit outside the chip while the chip itself is visually
   * on top of a layer. The chip's `currentTarget` rect is the truth.
   */
  const layerForRect = (rect: DOMRect): Layer | null => {
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    for (const layer of ["runtime", "infra", "tooling"] as Layer[]) {
      const el = layerRefs[layer].current
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) {
        return layer
      }
    }
    return null
  }

  const handleDrag = (e: PointerEvent | MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    setHoverLayer(layerForRect(target.getBoundingClientRect()))
  }

  const handleDragEnd = (
    chip: Chip,
    e: PointerEvent | MouseEvent | TouchEvent,
  ) => {
    setHoverLayer(null)
    const target = e.target as HTMLElement | null
    if (!target) return
    const dropLayer = layerForRect(target.getBoundingClientRect())
    if (dropLayer === null) return
    if (dropLayer === chip.layer) {
      setPlaced((p) => ({ ...p, [chip.id]: dropLayer }))
      setShowHint(null)
    } else {
      setWrongAttempts((w) => ({ ...w, [chip.id]: (w[chip.id] ?? 0) + 1 }))
      setShowHint(chip.id)
    }
  }

  const reset = () => {
    setPlaced({})
    setWrongAttempts({})
    setShowHint(null)
    setShuffled(shuffle(CHIPS))
  }

  return (
    <div className="not-prose my-10 select-none">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor">
            ▎ Try it · 01
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {locale === "en"
              ? "drag each chip onto its layer"
              : "arrasta cada chip pra sua camada"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={placedCount} total={CHIPS.length} />
          <button
            onClick={reset}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            {locale === "en" ? "reset" : "resetar"}
          </button>
        </div>
      </div>

      {/* layers stacked */}
      <div className="space-y-2">
        {(["tooling", "infra", "runtime"] as Layer[]).map((layer) => {
          const info = LAYER_INFO[layer]
          const placedChips = CHIPS.filter((c) => placed[c.id] === layer)
          const isHover = hoverLayer === layer
          return (
            <div
              key={layer}
              ref={layerRefs[layer]}
              className="relative bg-card transition-all"
              style={{
                borderLeft: `2px solid ${info.accent}`,
                boxShadow: isHover
                  ? `inset 0 0 0 1px ${info.accent}, 0 0 32px -8px ${info.accent}`
                  : "inset 0 0 0 1px var(--border)",
              }}
            >
              <div className="grid grid-cols-[auto_1fr] gap-6 p-5">
                <div className="w-32 shrink-0">
                  <div
                    className="font-mono text-xs font-semibold uppercase tracking-widest"
                    style={{ color: info.accent }}
                  >
                    {info[locale]}
                  </div>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted-foreground">
                    {info.desc[locale]}
                  </p>
                </div>
                <div className="flex min-h-[44px] flex-wrap items-start gap-2">
                  <AnimatePresence>
                    {placedChips.map((chip) => (
                      <PlacedChip
                        key={chip.id}
                        chip={chip}
                        locale={locale}
                        accent={info.accent}
                      />
                    ))}
                  </AnimatePresence>
                  {placedChips.length === 0 && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                      {locale === "en" ? "drop zone" : "zona de drop"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* hint banner */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded border border-destructive/40 bg-destructive/10 p-3"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-destructive">
              {locale === "en" ? "wrong layer" : "camada errada"} ·{" "}
              {wrongAttempts[showHint] ?? 1}x
            </p>
            <p className="mt-1 text-sm">
              {CHIPS.find((c) => c.id === showHint)?.hint[locale]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* draggable chip pool */}
      <div className="mt-6 border border-dashed border-border/60 bg-background p-4">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {locale === "en" ? "tools to place" : "ferramentas pra colocar"}
        </div>
        <div className="flex flex-wrap gap-2">
          {shuffled
            .filter((chip) => !placed[chip.id])
            .map((chip) => (
              <ChipDraggable
                key={chip.id}
                chip={chip}
                onDrag={handleDrag}
                onDragEnd={(e) => handleDragEnd(chip, e)}
                isErrored={showHint === chip.id}
              />
            ))}
          {shuffled.filter((c) => !placed[c.id]).length === 0 && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
              ● all placed
            </span>
          )}
        </div>
      </div>

      {/* completion reveal */}
      <AnimatePresence>
        {allCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 border border-phosphor/40 bg-card p-5"
            style={{ boxShadow: "0 0 32px -8px var(--color-phosphor)" }}
          >
            <div className="flex items-center gap-3">
              <span className="status-dot status-dot-live" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-phosphor">
                9/9 · model locked in
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              {locale === "en"
                ? "You'll feel this 3-layer split in every chapter. Caps. 2-6 explore Runtime in detail. Cap. 7 covers Infrastructure. Tooling shows up as ergonomic decisions throughout. When something is slow in production, the first move is always: which layer?"
                : "Você vai sentir essa divisão de 3 camadas todo capítulo. Caps. 2-6 exploram Runtime em detalhe. Cap. 7 cobre Infrastructure. Tooling aparece como decisões ergonômicas ao longo do livro. Quando algo está lento em produção, o primeiro movimento é sempre: qual camada?"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = (value / total) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-32 bg-border">
        <motion.div
          className="h-full"
          style={{ backgroundColor: "var(--color-phosphor)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
        {value}/{total}
      </span>
    </div>
  )
}

function PlacedChip({
  chip,
  locale,
  accent,
}: {
  chip: Chip
  locale: "en" | "pt"
  accent: string
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setExpanded((v) => !v)}
      className="cursor-pointer"
      style={{ maxWidth: expanded ? "100%" : "auto" }}
    >
      <div
        className="inline-flex items-start gap-2 px-2.5 py-1.5 font-mono text-xs"
        style={{
          border: `1px solid ${accent}`,
          color: accent,
        }}
      >
        <span>✓</span>
        <span className="font-medium">{chip.label}</span>
        {expanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[42ch] normal-case"
            style={{ color: "var(--foreground)" }}
          >
            — {chip.why[locale]}
          </motion.span>
        )}
        {!expanded && <span className="text-muted-foreground/60">·</span>}
      </div>
    </motion.div>
  )
}

function ChipDraggable({
  chip,
  onDrag,
  onDragEnd,
  isErrored,
}: {
  chip: Chip
  onDrag: (e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => void
  onDragEnd: (e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => void
  isErrored: boolean
}) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragMomentum={false}
      whileDrag={{ scale: 1.06, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.02 }}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      animate={
        isErrored
          ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }
          : {}
      }
      className="cursor-grab border border-border bg-background px-2.5 py-1.5 font-mono text-xs hover:border-foreground"
    >
      {chip.label}
    </motion.div>
  )
}
