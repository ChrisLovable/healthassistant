# Phila — Content Workflow

## Content authoring sequence

1. Write disease content in English in Supabase admin (or markdown drafts)
2. Pay medical reviewer (pharmacist or GP on retainer) to review and approve each disease page
3. Translate to Afrikaans (Chris) — review by Afrikaans-speaking medical professional
4. Translate to isiZulu and isiXhosa (paid medical translators only — never machine translation for medical content)
5. Generate hero image per disease using prompts in IMAGE-PROMPTS.md
6. QA on mobile devices in all 4 languages
7. Ship

## Medical review

Every disease page MUST carry:
- \last_reviewed_at\ date
- \eviewer_id\ linking to medical_reviewers table
- Sources cited (WHO, NDoH, NICD, peer-reviewed)
- Disclaimer footer

## Update cadence

- High-priority diseases (HIV, TB, mental health): reviewed every 6 months
- All other diseases: reviewed every 12 months
- Helpline numbers verified quarterly
