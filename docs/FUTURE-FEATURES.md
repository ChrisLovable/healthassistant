# Phila — Future Features Backlog

## Emergency numbers + First aid instructional videos

For each disease (especially emergency-tier), surface:
- Quick-access emergency numbers (10177 ambulance, 112 from mobile) prominently on the disease page
- Link to first aid instructional video for the specific condition

Potential content sources:
- St John Ambulance South Africa — free public first aid resources (https://www.stjohn.org.za/)
- Resuscitation Council of Southern Africa — CPR + emergency guidelines (https://resus.co.za/)
- Mayo Clinic First Aid library
- YouTube channels: SA Heart Foundation, ER24, Western Cape Government EMS

Implementation options:
1. Curated external links per emergency condition (zero licensing risk, fastest to ship)
2. Embedded YouTube videos where licensing permits
3. Custom SA-specific first aid video production (highest control, highest cost)

Recommendation: start with option 1, layer in option 2 where allowed, evaluate option 3 once traffic justifies investment.

## Backlog
- AI chatbot RAG over disease content (Supabase + pgvector)
- STT integration (ElevenLabs Scribe via /api/transcribe)
- TTS integration (ElevenLabs v3 for EN, Google Cloud TTS for AF/ZU/XH)
- Translation pipeline for Afrikaans / Zulu / Xhosa
- Supabase content backend (replace static JSON files in src/data/diseases/)
- POPIA-compliant chat logging
- Pharmacy partner portal (later phase)
- Hero infographic images per disease (4:5 portrait, 1080x1350)
- Medical reviewer attribution + audit trail
- Per-province helpline overrides
- Severity-based search and filtering
- "Save for later" / "Share with family" features
- Web push notifications for medical-review-due reminders