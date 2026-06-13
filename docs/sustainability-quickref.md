# Sustainability & Environmental Impact of AI — Quick Reference

**For Claude Code: Architectural decisions, not personal guilt.**

---

## The Numbers (Real Data)

### Inference Cost (Per-Prompt)
| Model/Service | Energy | CO₂e | Water | Source |
|---|---|---|---|---|
| **Google Gemini (median)** | 0.24 Wh | 0.03 gCO₂e | 0.26 mL | Google Cloud Blog, 2025 |
| **ChatGPT baseline** | 0.3 Wh | — | — | Andy Masley analysis |
| **Mistral Le Chat (400-token)** | — | 1.14 gCO₂e | 45 mL | Mistral LCA, 2025 |
| **Google Search (2009)** | 0.3 Wh | — | — | Historical baseline |

**Takeaway:** Modern LLMs are **equivalent to or better than Google Search 2009**. Worrying about personal use is irrelevant to climate.

### Training Cost (One-Time, Amortized)
| Model | Total CO₂e | Water | Resource Depletion | Lifecycle |
|---|---|---|---|---|
| **Mistral Large 2** | 20.4 ktCO₂e | 281,000 m³ | 660 kg Sb eq | Training + manufacturing, ~18 mo post-launch |

**Insight:** Amortized across billions of inferences = negligible per-prompt.

---

## Model Selection: SLMs vs LLMs

### Small Language Models (SLMs) — <10B parameters

| Model | Size | Performance vs LLM | Speed | Efficiency | Use Case |
|---|---|---|---|---|---|
| **Phi-3 Small** | 7B | Code generation on par w/ 70B | ~15x faster | ✅ Excellent | Coding agents |
| **Nemotron-H** | 2-9B | Instruction following ≈ 30B | ~100x fewer FLOPs | ✅✅ Exceptional | Tool calling |
| **SmolLM2** | 125M-1.7B | Tool calling ≈ 14B | Ultra-fast | ✅✅✅ Perfect | Lightweight tasks |

**Rule:** For **repetitive, scoped, non-conversational tasks** (90% of agent workloads), SLMs suffice.

**Carbon Impact:** SLM vs LLM = **10-100x fewer emissions per inference**.

---

## Deployment Location Decision Tree

```
Does task require offline or ultra-low latency? (<500ms)
├─ YES → Client-side SLM (Transformers.js, ONNX Web, WebLLM)
│   Emissions: Device-only (10-50W TDP)
│   Privacy: Data never leaves browser
│   Fallback: Server-side for heavy reasoning
│
└─ NO → Server-side optimized
    ├─ Repetitive/tactical? → SLM API (Phi, SmolLM)
    ├─ Open-ended/strategic? → LLM API (Gemini, Claude)
    └─ Mixed? → Hybrid (SLM default + LLM fallback)
```

**Emissions Comparison:**
- Client-side SLM: **~1-10 gCO₂e** (device energy).
- Server-side SLM: **~0.05-0.3 gCO₂e** (shared infrastructure, optimized).
- Server-side LLM: **~1-5 gCO₂e** (larger model, more resources).

**Winner:** Client-side SLM = **99% less transport energy vs server LLM**.

---

## Caching & Reuse (Emissions → 0)

**Principle:** If you don't re-infer, you don't emit.

### Strategies

| Strategy | Implementation | Emissions Reduction |
|---|---|---|
| **Result caching** | Redis, localStorage, IndexedDB | 100% for cached hits |
| **Batch processing** | Group N queries, infer once | Up to 90% (amortize overhead) |
| **Embedding reuse** | Cache vector embeddings, don't re-encode | 80-95% |
| **Model caching (Chrome)** | Store model on disk, reuse | 70-80% faster loads |

### Code Example: ONNX + Caching

```javascript
// Initialize session once, reuse
const session = await ort.InferenceSession.create(modelUrl, {
  executionProviders: ['webgpu'],
  graphOptimizationLevel: 'all', // Reduces FLOPs
});

// Cache inference results
const cache = new Map();
async function infer(input) {
  const key = hashInput(input);
  if (cache.has(key)) return cache.get(key); // Zero emissions
  
  const result = await session.run({ input });
  cache.set(key, result);
  return result;
}
```

---

## Water Consumption (Overlooked)

**Data Centers use massive water for cooling.**

- **Mistral Large 2 training:** 281,000 m³ (Olympic swimming pools).
- **Gemini per-prompt:** 0.26 mL negligible individually, significant at scale.
- **Regional impact:** California, India, Middle East have water stress. Data centers compete with agriculture.

**Mitigation:**
- Use providers with renewable energy + water replenishment (Google, Microsoft).
- **Client-side AI = zero cooling water** (device runs normally).

---

## Decision Matrix for Claude Code

| Project Requirement | Recommendation | Emissions | Notes |
|---|---|---|---|
| **Fast, offline-first** | Client SLM (Transformers.js, Gemini Nano) | **99% lower** | Latency <500ms acceptable |
| **Repetitive/tactical tasks** | SLM API (<10B) | **10-100x lower** | Batch if possible |
| **Open reasoning/dialogue** | Hybrid: SLM default + LLM fallback | **Balanced** | Strategic decisions only |
| **Mission-critical accuracy** | LLM, but cache results | **10-100x lower via caching** | One inference, reuse N times |
| **High-volume processing** | Batch + cache | **50-99% reduction** | Group queries |

---

## Key Principles

1. **SLM vs LLM = Gasoline vs EV** (10-100x efficiency).
2. **Client-side vs Server-side = Local vs Cloud transport** (99% less).
3. **Caching = Zero emissions** (don't re-infer).
4. **Training cost is one-time, amortized** (never retrain if you can fine-tune).
5. **Personal use guilt is irrelevant** (architectural decisions matter).

---

## Sources

- Google Cloud Blog: "Measuring the environmental impact of AI inference" (Aug 2025).
- Mistral AI: Comprehensive LCA of Large Language Models.
- arxiv:2506.02153: "Small Language Models are the Future of Agentic AI" (NVIDIA Research).
- Nature Scientific Reports: "The carbon emissions of writing and illustrating are lower for AI than for humans" (Feb 2024).
- Andy Masley: "Using ChatGPT is not bad for the environment — a cheat sheet" (Apr 2025).
