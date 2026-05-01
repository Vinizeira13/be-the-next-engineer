"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useAnimationControls, type PanInfo } from "framer-motion"
import { useLocale } from "@/components/locale-provider"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

/**
 * Interactive component for Cap. 0 — Inference.
 *
 * Concept-target: the 3-layer mental model (Runtime / Infrastructure / Tooling)
 * that Kiely uses as the spine of the entire book. Static bullet list does not
 * make this stick; dragging tools onto the right layer does.
 *
 * Mechanic: 9 chips representing real tools/concepts. User drags each chip
 * onto one of three layers. Correct = lock in green. Wrong = bounce back with
 * a hint. All 9 correct = subtle celebration and unlock signal for the next
 * section.
 */

type Layer = "runtime" | "infra" | "tooling"

type Chip = {
  id: string
  label: string
  layer: Layer
  hint: { en: string; pt: string }
}

const CHIPS: Chip[] = [
  {
    id: "vllm",
    label: "vLLM",
    layer: "runtime",
    hint: {
      en: "Inference engine — fits the Runtime layer (one model fast on one instance).",
      pt: "Inference engine — encaixa na camada Runtime (um modelo rápido em uma instância).",
    },
  },
  {
    id: "kv-cache",
    label: "KV cache",
    layer: "runtime",
    hint: {
      en: "Attention optimization inside the engine. Lives in the Runtime layer.",
      pt: "Otimização de attention dentro do engine. Vive na camada Runtime.",
    },
  },
  {
    id: "flashattention",
    label: "FlashAttention",
    layer: "runtime",
    hint: {
      en: "A kernel — Runtime concern. Implements attention with fewer memory reads.",
      pt: "Um kernel — Runtime. Implementa attention com menos leituras de memória.",
    },
  },
  {
    id: "k8s",
    label: "Kubernetes",
    layer: "infra",
    hint: {
      en: "Container orchestration across nodes. Infrastructure layer.",
      pt: "Orquestração de containers entre nós. Camada Infrastructure.",
    },
  },
  {
    id: "autoscaling",
    label: "autoscaling",
    layer: "infra",
    hint: {
      en: "Adjusting replica count to traffic — Infrastructure, not single-instance.",
      pt: "Ajustar número de réplicas pelo tráfego — Infrastructure, não single-instance.",
    },
  },
  {
    id: "multicloud",
    label: "multi-cloud",
    layer: "infra",
    hint: {
      en: "Spanning regions and providers. Pure Infrastructure problem.",
      pt: "Múltiplas regiões e providers. Problema puro de Infrastructure.",
    },
  },
  {
    id: "openai-sdk",
    label: "OpenAI SDK",
    layer: "tooling",
    hint: {
      en: "Client abstraction developers use — Tooling layer.",
      pt: "Abstração que devs usam pra chamar inferência — camada Tooling.",
    },
  },
  {
    id: "evals",
    label: "eval framework",
    layer: "tooling",
    hint: {
      en: "Quality measurement is a Tooling concern, not Runtime/Infra.",
      pt: "Medir qualidade é Tooling, não Runtime/Infra.",
    },
  },
  {
    id: "observability",
    label: "Grafana dashboard",
    layer: "tooling",
    hint: {
      en: "Visibility/UX for engineers — Tooling layer.",
      pt: "Visibilidade/UX pros engenheiros — Tooling.",
    },
  },
]

const LAYER_INFO: Record<Layer, { en: string; pt: string; desc: { en: string; pt: string } }> = {
  runtime: {
    en: "Runtime",
    pt: "Runtime",
    desc: {
      en: "One model, one instance. Kernels, engines, batching, caching.",
      pt: "Um modelo, uma instância. Kernels, engines, batching, caching.",
    },
  },
  infra: {
    en: "Infrastructure",
    pt: "Infrastructure",
    desc: {
      en: "Across clusters, regions, clouds. Scale and uptime.",
      pt: "Entre clusters, regiões, clouds. Escala e uptime.",
    },
  },
  tooling: {
    en: "Tooling",
    pt: "Tooling",
    desc: {
      en: "The right abstraction for the team. Control vs productivity.",
      pt: "Abstração certa pro time. Controle vs produtividade.",
    },
  },
}

export function ThreeLayerArchitecture() {
  const { locale } = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = {
    runtime: useRef<HTMLDivElement>(null),
    infra: useRef<HTMLDivElement>(null),
    tooling: useRef<HTMLDivElement>(null),
  }
  const [placed, setPlaced] = useState<Record<string, Layer | null>>({})
  const [shuffled, setShuffled] = useState<Chip[]>([])

  useEffect(() => {
    // Shuffle chips on mount so order is not memorizable.
    setShuffled([...CHIPS].sort(() => Math.random() - 0.5))
  }, [])

  const allCorrect = CHIPS.every((c) => placed[c.id] === c.layer)

  useEffect(() => {
    if (allCorrect && Object.keys(placed).length === CHIPS.length) {
      toast.success(
        locale === "en"
          ? "9/9 — you've internalized the 3-layer model. Ready for Cap. 1."
          : "9/9 — você internalizou o modelo de 3 camadas. Pronto pro Cap. 1.",
        { duration: 5000 },
      )
    }
  }, [allCorrect, placed, locale])

  const handleDragEnd = (chip: Chip, info: PanInfo) => {
    const x = info.point.x
    const y = info.point.y

    let target: Layer | null = null
    for (const layer of ["runtime", "infra", "tooling"] as Layer[]) {
      const el = layerRefs[layer].current
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        target = layer
        break
      }
    }

    if (target === null) return // dropped outside any zone, snap back via Framer

    if (target === chip.layer) {
      setPlaced((p) => ({ ...p, [chip.id]: target }))
    } else {
      toast.error(chip.hint[locale], { duration: 4000 })
    }
  }

  const placedCount = Object.values(placed).filter(Boolean).length

  return (
    <div ref={containerRef} className="my-8 select-none">
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
          {locale === "en" ? "Try it" : "Tenta aí"} · 01
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">
          {placedCount} / {CHIPS.length}
        </span>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {locale === "en"
          ? "Drag each tool onto the layer where it actually lives. Wrong drops bounce back with a hint."
          : "Arrasta cada ferramenta pra camada onde ela vive de verdade. Drop errado volta com uma dica."}
      </p>

      <div className="space-y-2">
        {(["tooling", "infra", "runtime"] as Layer[]).map((layer) => {
          const info = LAYER_INFO[layer]
          const placedChips = CHIPS.filter((c) => placed[c.id] === layer)
          return (
            <div
              key={layer}
              ref={layerRefs[layer]}
              className="rounded-lg border-2 border-dashed border-border/40 bg-card/30 p-4 transition-colors"
            >
              <div className="mb-2 flex items-baseline gap-3">
                <span className="font-mono text-sm font-semibold tracking-tight">
                  {info[locale]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {info.desc[locale]}
                </span>
              </div>
              <div className="flex min-h-[42px] flex-wrap gap-2">
                {placedChips.map((chip) => (
                  <motion.div
                    key={chip.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-700 dark:text-emerald-300"
                  >
                    ✓ {chip.label}
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="mt-6 flex flex-wrap gap-2">
        {shuffled
          .filter((chip) => !placed[chip.id])
          .map((chip) => (
            <ChipDraggable
              key={chip.id}
              chip={chip}
              onDragEnd={(_, info) => handleDragEnd(chip, info)}
            />
          ))}
      </div>

      {allCorrect && Object.keys(placed).length === CHIPS.length && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4"
        >
          <p className="text-sm">
            <span className="font-semibold">
              {locale === "en" ? "Locked in." : "Travou."}
            </span>{" "}
            {locale === "en"
              ? "You'll feel this 3-layer split every chapter. Caps. 2-6 explore Runtime, Cap. 7 covers Infrastructure, and Tooling shows up as ergonomic decisions throughout."
              : "Você vai sentir essa divisão de 3 camadas todo capítulo. Caps. 2-6 exploram Runtime, Cap. 7 cobre Infrastructure, e Tooling aparece como decisões ergonômicas ao longo do livro."}
          </p>
        </motion.div>
      )}
    </div>
  )
}

function ChipDraggable({
  chip,
  onDragEnd,
}: {
  chip: Chip
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}) {
  const controls = useAnimationControls()

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragMomentum={false}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.02 }}
      animate={controls}
      onDragEnd={onDragEnd}
      className="cursor-grab rounded-md border border-border/60 bg-background px-3 py-1.5 font-mono text-xs shadow-sm transition-shadow hover:shadow-md"
    >
      {chip.label}
    </motion.div>
  )
}

function Separator() {
  return <div className="my-6 h-px w-full bg-border/40" />
}
