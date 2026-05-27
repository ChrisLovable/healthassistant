# MyMedic

> Multilingual AI health navigation for South Africa.

Mobile-first health information app covering 32 core conditions across 10 medical categories, with an AI chatbot for medical and pharmaceutical questions. Available in English, Afrikaans, isiZulu, and isiXhosa.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL + pgvector for RAG)
- **AI:** OpenAI / Anthropic for chat, ElevenLabs Scribe for STT, ElevenLabs + Google Cloud TTS
- **Hosting:** Vercel (frontend), Supabase (backend)

## Project Structure

\\\
MyMedic/
+-- public/
|   +-- images/
|   |   +-- diseases/   # Hero images (hero-{slug}.webp)
|   |   +-- brand/      # Logo, favicon
|   +-- fonts/
+-- src/
|   +-- app/
|   |   +-- page.tsx                       # Home (logo + 10 categories + chatbot)
|   |   +-- [group]/page.tsx               # Category page
|   |   +-- [group]/[disease]/page.tsx     # Disease detail page
|   |   +-- api/                           # API routes (chat, STT, TTS)
|   +-- components/
|   |   +-- home/        # Home page components
|   |   +-- disease/     # Disease page components
|   |   +-- chatbot/     # Chatbot UI
|   |   +-- ui/          # Shared UI (Sticker, TopBar, LanguageToggle)
|   +-- lib/
|   |   +-- supabase/    # Supabase clients
|   |   +-- ai/          # Chat, RAG, safety triage, STT, TTS
|   |   +-- content/     # Content loaders
|   |   +-- i18n/        # Translations (en, af, zu, xh)
|   +-- data/
|   |   +-- diseases.json  # 10 groups + 32 diseases schema
|   +-- styles/          # Design tokens, 3D sticker styles
|   +-- types/           # TypeScript types
+-- supabase/
|   +-- migrations/      # SQL migrations
|   +-- seed/            # Seed data
+-- scripts/             # Maintenance scripts
+-- docs/                # Architecture, content workflow, image prompts
\\\

## Getting Started

1. Copy \.env.local.example\ to \.env.local\ and fill in your API keys
2. Replace \src/data/diseases.json\ with the real one from the design session
3. \
pm install\
4. \
pm run dev\
5. Open http://localhost:3000

## Languages

MVP Phase 1: English + Afrikaans
MVP Phase 2: isiZulu + isiXhosa (paid medical translator review required)

## Critical Principles

- **Zero hallucination tolerance** — AI never invents medical facts; all output grounded in approved Supabase content
- **Safety triage first** — red-flag classifier runs before any AI response
- **STT via MediaRecorder + ElevenLabs Scribe only** — never Web Speech API (duplication bug)
- **Production-grade from day one** — every component handles thousands of concurrent users

## License

Proprietary - myAIpartner (Pty) Ltd
