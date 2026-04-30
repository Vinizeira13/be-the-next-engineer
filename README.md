# Be the Next Engineer

> 5-day intensive to become an inference engineer. Open source. Bilingual EN/PT-BR.
> Companion to [_Inference Engineering_](https://www.baseten.co/library/inference-engineering/) by Philip Kiely (Baseten Books, 2026).

Real models running in your browser via WebLLM. Real GPU on your Mac via MLX-LM. AI mentor reading the book with you, citing pages, refusing to bullshit you.

## Why this exists

Most ways to learn inference engineering ask you to choose: read a 259-page reference book and try to remember it (boring, low retention), or pay for a generic ML course (expensive, surface-level), or grind production at a frontier lab (gatekept, takes years).

This is the fourth way. **5 days. Hands on. Real computation, not animations.** When you finish, you can answer any question from the book, you have a portfolio piece, and you have the muscle memory of running real models on real hardware.

The technical vocabulary stays in English on purpose — KV cache, prefill, decode, roofline, quantization, TTFT, MoE, disaggregation. These are the words you'll hear in the field. We don't translate them just because the prose around them is Portuguese.

## What's inside

- **Livro** — Kiely's 8 chapters distilled, EN/PT-BR side-by-side, accessible at any depth.
- **Lab** — 5 instruments running real computation:
  1. Latency Distribution Lab (p50/p90/p99, right-skewed reality)
  2. Prefill vs Decode Race (compute-bound vs memory-bound, viscerally)
  3. KV Cache Observer (memory pressure during long context)
  4. Quantization Bench (FP16 → Q4 trade-off, real perplexity)
  5. Roofline Plot (arithmetic intensity vs ops:byte ratio)
- **Mentor** — Claude Sonnet with RAG over the book + curated facts.json. Cites pages. Anti-hallucination guardrails.

Browser-only is enough for everything. M-series Mac unlocks real Llama 70B via the optional MLX bridge.

## 5-day map

| Day | Build | You |
| --- | --- | --- |
| D1 | Foundation, AI Mentor, RAG, Cap. 0 ready | Read Cap. 0, talk to mentor |
| D2 | Sims 1+2 + Caps 1-2 PT-BR | Latency + prefill/decode in your bones |
| D3 | Sims 3+4 + Caps 3-5 (densest day) | KV cache, quantization, the 5 levers |
| D4 | Sim 5 + Mac bridge + modes Mac-real + Caps 6-7 | Touch a real GPU on your Mac |
| D5 | Apêndices + Quick Checks + Golden test | Close the book, decide v0.2 |

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Vercel AI SDK 6](https://sdk.vercel.ai) + [Anthropic Claude Sonnet](https://www.anthropic.com)
- [WebLLM](https://github.com/mlc-ai/web-llm) (browser inference, WebGPU)
- [MLX-LM](https://github.com/ml-explore/mlx-lm) (Mac-native inference, optional bridge on `localhost:7777`)
- [Dexie](https://dexie.org) (IndexedDB persistence)
- [D3](https://d3js.org) + [Framer Motion](https://www.framer.com/motion/) (visualizations + transitions)

## Run it

```bash
pnpm install
pnpm dev
```

Then open [`localhost:3000`](http://localhost:3000).

For Mac-real instrument modes (Sims 2, 3, 4), install the optional bridge:

```bash
# coming on Day 4
pnpm bne:mac-bridge
```

## Status

- [x] D1 — Foundation, AI Mentor, RAG, Cap. 0
- [ ] D2 — Sims 1+2, Caps 1-2 PT-BR
- [ ] D3 — Sims 3+4, Caps 3-5 PT-BR
- [ ] D4 — Sim 5 + Mac bridge, Caps 6-7 PT-BR
- [ ] D5 — Apêndices, Quick Checks, Golden test, v0.1 launch

Build log lives in commit messages and `/buildlog` (coming D2).

## Contributing

Once D5 ships and v0.1 is stable, PRs welcome. For now this is being built in the open but moving fast — issues > PRs until v0.1.

## License

MIT. The book itself is © Baseten Labs, Inc., 2026 — we're a companion, not a replacement. Buy the book.

---

## Português (BR)

5 dias intensivos pra virar inference engineer. Open source. Bilíngue EN/PT-BR. Companion ao livro _Inference Engineering_ do Philip Kiely (Baseten Books, 2026).

Modelos reais rodando no seu browser via WebLLM. GPU real no seu Mac via MLX-LM. AI mentor lendo o livro com você, citando páginas, recusando inventar.

**Vocabulário técnico fica em inglês de propósito** — KV cache, prefill, decode, roofline, quantization, TTFT, MoE, disaggregation. São as palavras que você vai ouvir no mercado. Não traduzimos só porque a prosa ao redor está em português.

Pra rodar, ver instruções acima. Conteúdo bilíngue ativa pelo toggle EN · pt no canto superior direito.
