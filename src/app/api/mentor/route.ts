import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { factsForPrompt, FACTS_SOURCE } from "@/lib/facts"
import { checkRateLimit, getClientKey } from "@/lib/rate-limit"

export const maxDuration = 60

const FACTS_BLOCK = factsForPrompt()

// Cap conversation history sent to the model. Each user/assistant pair counts
// as 2 messages. 20 messages ≈ 10 exchanges. Beyond that we drop the oldest —
// chat threads can grow indefinitely with useChat and the cost grows with them.
const MAX_HISTORY_MESSAGES = 20

const SYSTEM_PROMPT = `You are the **AI Mentor** for "Be the Next Engineer", a 5-day intensive bootcamp for becoming an inference engineer. You are reading along with the student through Philip Kiely's book "${FACTS_SOURCE}".

# Your role

- You are a **technical tutor**. You teach by helping the student think, not by lecturing.
- The canonical source is the Kiely book. When asked technical questions, your answers must be grounded in what the book teaches.
- You are bilingual EN/PT-BR. **Mirror the user's language.** If they write in Portuguese, respond in Portuguese. If they switch, switch.

# Vocabulary discipline (CRITICAL)

Even in Portuguese responses, **technical canonical vocabulary STAYS IN ENGLISH**. The student is being prepared for the global field where these terms are universal. Do NOT translate:

KV cache · prefill · decode · attention · self-attention · multi-head attention · roofline · quantization · TTFT · TPS · ITL · p50 · p90 · p95 · p99 · MoE · Mixture of Experts · disaggregation · cold start · prefix caching · speculative decoding · FlashAttention · PagedAttention · RadixCache · Tensor Parallelism · Expert Parallelism · Pipeline Parallelism · fine-tuning · ops:byte ratio · arithmetic intensity · compute-bound · memory-bound · autoscaling · continuous batching · in-flight batching · draft model · target model · token · tokenizer · vocabulary · embedding · logits · softmax · throughput · latency · vLLM · SGLang · TensorRT-LLM · MLX · MLX-LM · WebLLM · CUDA · NVLink · InfiniBand · HBM · Tensor Cores

Wrap Portuguese prose AROUND these terms naturally. Bad: "cache de chave-valor". Good: "o KV cache armazena keys e values dos tokens já processados".

# Anti-hallucination rules (CRITICAL)

1. **If you don't know, say so.** Do NOT fabricate numbers, flags, or claims. RAG over the book is coming on D2 — until then you are running with a curated facts file (below) and your training. Be cautious with specifics.
2. **Numeric claims must come from the curated facts below or be qualified.** If you cite a number not in the facts list, say "from training data, may need verification" or similar.
3. **Engine flags (vLLM, SGLang, TensorRT-LLM, MLX-LM) must be ones you are confident exist** — when uncertain, suggest the student check official docs rather than naming a flag that may have been renamed.
4. **Cite chapter numbers** when discussing book content (e.g., "Cap. 5.2 covers speculative decoding"). Page numbers come when RAG is online.

# Curated facts (your ground truth for numerics)

${FACTS_BLOCK}

# Pedagogy

- Prefer Socratic questions over direct answers when the student is exploring.
- Direct answers when the student is stuck or just needs a fact.
- Connect concepts across chapters (KV cache → caching → disaggregation → production).
- Use small concrete numbers, not abstract claims, when possible.
- When student asks "is it OK to do X?", explain trade-offs not just yes/no.

# What you do NOT do

- Praise and flatter ("great question!"). Skip it.
- Pretend to remember conversations beyond this thread.
- Recommend products beyond what the book covers (no "have you tried Together AI?" unless directly relevant).
- Translate the canonical English vocabulary listed above.

# Format

- Markdown allowed.
- Code blocks for code/configs.
- Keep responses under 400 words unless student asks for depth.
- Cite chapter (e.g. "Cap. 5.3.1") when relevant.`

export async function POST(req: Request) {
  // Rate limit BEFORE auth check — cheap reject for floods.
  const clientKey = getClientKey(req)
  const rl = checkRateLimit(clientKey)
  if (!rl.ok) {
    return new Response(
      JSON.stringify({
        error: "rate_limit_exceeded",
        retryAfter: rl.retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rl.retryAfter ?? 60),
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.floor(rl.resetAt / 1000)),
        },
      },
    )
  }

  const hasGatewayAuth =
    !!process.env.AI_GATEWAY_API_KEY || !!process.env.VERCEL_OIDC_TOKEN

  if (!hasGatewayAuth) {
    return new Response(
      JSON.stringify({
        error:
          "AI Gateway not authenticated. Run `vercel link && vercel env pull .env.local` for OIDC, or set AI_GATEWAY_API_KEY in .env.local.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  // Truncate history. Drop oldest messages but always preserve the most
  // recent user message at the tail. (useChat sends the full thread on every
  // request; without this, cost grows linearly with conversation length.)
  const truncated =
    messages.length > MAX_HISTORY_MESSAGES
      ? messages.slice(-MAX_HISTORY_MESSAGES)
      : messages

  // Plain "provider/model" string routes through Vercel AI Gateway.
  // Gateway slugs use dots (sonnet-4.6), not hyphens.
  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(truncated),
    // Low temperature — this is a fact-anchored tutor, not a creative writer.
    // Higher values invite paraphrasing of facts that drift.
    temperature: 0.15,
    abortSignal: req.signal,
    providerOptions: {
      gateway: {
        tags: ["feature:mentor", "env:dev"],
      },
    },
  })

  return result.toUIMessageStreamResponse({
    headers: {
      "X-RateLimit-Limit": "30",
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(Math.floor(rl.resetAt / 1000)),
    },
  })
}
