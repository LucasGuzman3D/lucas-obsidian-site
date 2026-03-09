---
title: AI Marketing Intern
date: 2024
status: draft
tags:
  - portfolio
  - Project
  - AI
  - product-design
publish: true
---

# AI Marketing Intern

**Role:** Identified the workflow problem, designed the system, built the tool (Claude Code + Claude API + Grok + Imagen 4), and iterated with the Sophon marketing team through three major versions: news research, AI copywriting, and image generation.
![[ai-intern-cover.webp]]

Every early-stage startup faces the same marketing tension: moving fast enough to capture trending moments without losing brand voice. In crypto and DeFi, this is especially brutal. Narratives shift in hours. The Sophon team had the instincts but not the bandwidth to research, draft, review, and publish at that pace without either slipping off-brand or missing the window.

## How it started

The first version was simple: Grok pulling real-time news from X/Twitter on topics relevant to Sophon. But once the team started using it, a gap became obvious. Raw news isn't content. Someone still had to translate those trends into Sophon's voice, and that was eating the same hours the tool was supposed to save. That's when I added a second layer: a writing agent (Claude API) that takes the research output and drafts copy in the brand's voice. One problem revealed the next.
![[fetch-news.webm]]

The interesting question was never "can we let AI do all the work?" It was: what does a good content workflow actually look like, and how do you encode that into a system? The answer I landed on was a diverge-critique-converge loop. Three agents generate in parallel at different creative temperatures (safe, experimental, remix), a brand analyst evaluates each against Sophon's voice and objectives, and a synthesizer merges the best elements. The same process a strong creative team uses, minus the scheduling overhead.

```
 ┌─── FRONTEND ──────────┐     ┌─── BACKEND ──────────────┐
 │  + Next.js 14         │     │  + FastAPI               │
 │  + React 18           │     │  + Uvicorn               │
 │  + TypeScript         │     │  + Python 3.10+          │
 │  + Tailwind CSS       │     │  + Pydantic              │
 │  + Lucide Icons       │     │  + SQLAlchemy            │
 │                       │     │  + PyJWT                 │
 └───────────────────────┘     └──────────────────────────┘
 ┌─── AI / LLM LAYER ─────────────────────────────────────┐
 │  + LangChain          Orchestration framework          │
 │  + LangGraph          5-agent stateful pipeline        │
 │  + Claude Sonnet 4    All LLM reasoning [ANTHROPIC API]│
 │                                                        │
 │    ┌── HYBRID CREATIVE FLOW ──────────────────────┐    │
 │    │  PHASE 1: DIVERGE (parallel)                 │    │
 │    │    [01] Standard Copywriter ── on-brand      │    │
 │    │    [02] Wild Card ──────────── risk-taking   │    │
 │    │    [03] Remix Agent ────────── fresh angles  │    │
 │    │                                              │    │
 │    │  PHASE 2: CRITIQUE                           │    │
 │    │    [04] Brand Analyst ──────── quality gate  │    │
 │    │                                              │    │
 │    │  PHASE 3: CONVERGE                           │    │
 │    │    [05] Synthesizer ────────── final output  │    │
 │    │                                              │    │
 │    └──────────────────────────────────────────────┘    │
 │                                                        │
 └────────────────────────────────────────────────────────┘

 ┌─── EXTERNAL APIs ──────────────────────────────────────┐
 │  + Perplexity API ────── web search & citations        │
 │  + xAI Grok API ──────── real-time X/Twitter data      │
 │    └─ X Search tool ──── live posts & trending         │
 │  + Anthropic API ──────── Claude Sonnet 4 inference    │
 │  + Google Imagen 4 ───── brand-informed image gen      │
 └────────────────────────────────────────────────────────┘
```

## Human-in-the-loop as a product decision

The tool deliberately doesn't auto-publish. The user could just copy-paste, it's their choice. But that's not the goal. AI handles the volume problem. Humans retain judgment on what actually represents the brand. Having the human involved in each step was an important part of the product design work.

![[copywrite.webm]]

## Brand settings as a product feature
![[brandsettings.webp]]
One thing that became clear early: brand voice isn't static, and any tool that hardcodes it will be wrong within a month (Specially when working at a startup that is constantly pivoting!) So the brand settings are fully editable through the UI. Tone guidelines, content pillars, hook samples, post examples, communication objectives. The team can save multiple presets (different campaigns, different market conditions) and switch between them without touching code. The AI is only as good as the brief you give it; this makes writing that brief a first-class part of the product.

## Impact

The tool gave the marketing team something they didn't have before: intentional content research. Instead of depending on their personal feeds and algorithms to surface what's relevant (which is unreliable and biased toward engagement, not relevance), they could point the system at specific subjects and get structured analysis back. It became the team's go-to for quick brainstorming and staying current on narratives that mattered to Sophon's positioning, without the noise.

## Image generation: the third pivot

Once the copy pipeline was running, the next bottleneck surfaced. The marketing team had draft-ready text but still needed a designer to produce matching visuals. The same pattern as before: one solved problem revealing the next.

So I built the Image Studio. It takes the marketing copy as input, lets the team define an aesthetic style (either by describing it or extracting it from a reference image), and runs a 3-step generation pipeline: aesthetics analysis, prompt construction, and image generation via Google Imagen 4. The result is brand-aligned imagery that matches the tone and subject of the copy, without a separate design brief.

The key product decisions here mirror the ones from the copy side. Saved style presets work the same way brand voice presets do: the team defines their visual language once and reuses it across campaigns, or switches between styles for different contexts. A built-in gallery with favorites lets them curate and reuse what works. And like the rest of the tool, nothing auto-publishes. The team reviews, selects, and decides.

Some of the outputs: 

![[renders-ai-intern.webp]]

The tool now covers the full content pipeline: research, copy, and visuals. What started as a simple news fetcher evolved through three clear iterations, each one driven by watching the team hit the next wall.