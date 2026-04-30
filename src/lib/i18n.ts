// Minimal locale handling. EN is canonical (per project decision);
// PT-BR is companion. Technical vocabulary stays in English regardless of locale.
// Upgrade to next-intl later if scale demands it.

export type Locale = "en" | "pt"

export const DEFAULT_LOCALE: Locale = "en"

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português (BR)",
}

// Technical terms that MUST stay in English even within Portuguese prose.
// Source: project decisions, 2026-04-30. Add to this list as content grows.
export const KEEP_IN_ENGLISH = new Set([
  "KV cache",
  "prefill",
  "decode",
  "attention",
  "self-attention",
  "multi-head attention",
  "roofline",
  "quantization",
  "TTFT",
  "TPS",
  "ITL",
  "p50",
  "p90",
  "p95",
  "p99",
  "MoE",
  "Mixture of Experts",
  "disaggregation",
  "cold start",
  "prefix caching",
  "speculative decoding",
  "FlashAttention",
  "PagedAttention",
  "RadixCache",
  "Tensor Parallelism",
  "Expert Parallelism",
  "Pipeline Parallelism",
  "fine-tuning",
  "ops:byte ratio",
  "arithmetic intensity",
  "compute-bound",
  "memory-bound",
  "autoscaling",
  "continuous batching",
  "in-flight batching",
  "engine",
  "worker",
  "gateway",
  "draft model",
  "target model",
  "token",
  "tokenizer",
  "vocabulary",
  "embedding",
  "logits",
  "softmax",
  "throughput",
  "latency",
  "vLLM",
  "SGLang",
  "TensorRT-LLM",
  "MLX",
  "MLX-LM",
  "WebLLM",
  "CUDA",
  "NVLink",
  "InfiniBand",
  "HBM",
  "Tensor Cores",
])
