# Phila — Architecture

## Three-layer system

### 1. Curated medical knowledge base (Supabase)

Every disease page, FAQ, red flag, helpline lives as approved content with medical reviewer attribution and version history. Zero AI-invented medical facts.

Tables:
- \disease_groups\ (10 groups)
- \diseases\ (32+ diseases, FK to groups)
- \disease_sections\ (6 core + 4 optional sections per disease, with content per language)
- \disease_translations\ (per-language content overrides)
- \ed_flags\ (phrases that trigger emergency mode)
- \medical_reviewers\ (paid pharmacist/GP)
- \content_revisions\ (audit trail)
- \helplines\ (province-specific helpline numbers)
- \chat_logs\ (chatbot interaction logs, anonymised)

### 2. RAG-based AI explanation layer

Chatbot queries hybrid keyword + pgvector embedding search over the approved knowledge base. LLM rewrites retrieved chunks in the user's chosen language. LLM never answers from its own knowledge.

Same zero-hallucination architecture as Casebook's legal AI pipeline.

### 3. Safety triage layer

Input classifier runs before any AI response. Red-flag language bypasses chatbot and shows immediate emergency guidance with provincial helplines.

Red flags include:
- Chest pain, stroke signs, severe breathing difficulty
- Pregnancy bleeding, severe headache with stiff neck
- Anaphylaxis, suicidal ideation, child dehydration
- Overdose, severe burns

## Page structure

- **Home (\/\):** Logo + 10 category cards + "Ask Phila" chatbot
- **Category (\/[group]\):** Group title + diseases in that group
- **Disease (\/[group]/[disease]\):** Hero infographic image + title + 6 core sections + 4 optional modules

## TTS provider mesh

| Language    | Provider          | Voice                |
|-------------|-------------------|----------------------|
| en-ZA       | ElevenLabs v3     | Warm female narrator |
| af-ZA       | Google Cloud TTS  | af-ZA-Wavenet-A      |
| zu-ZA       | Google Cloud TTS  | zu-ZA-Standard-A     |
| xh-ZA       | Google Cloud TTS  | xh-ZA-Standard-A     |

## STT

ElevenLabs Scribe v2 via \/api/transcribe\ route. MediaRecorder pipeline on mobile. Never Web Speech API.
