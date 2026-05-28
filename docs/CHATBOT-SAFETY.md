# Phila Chatbot Safety Guardrails (must hold before "Ask Phila" goes live)

1. SOURCE OF TRUTH: approved disease JSON is the only medical source. The AI
   explains/rephrases that content in plain language and in the user's language.
2. THE AI MUST NOT: diagnose, prescribe, name specific medicines or doses,
   calculate anything clinical, or contradict the emergency guidance on the pages.
3. TRIAGE LAYER FIRST: scan the user message for red-flag/emergency terms BEFORE
   calling the model. On a hit, return the emergency banner + 10177 / crisis line
   directly, bypassing the LLM.
4. OUT OF SCOPE: if a question isn't covered by approved content, the bot says so
   and points to a clinic (/clinic-finder) or the relevant helpline. It does not guess.
5. LANGUAGE: respond in the selected phila-lang (en/af). Pass it into the request.
6. GOVERNANCE: every content change is clinically reviewed before publish; bot
   responses are logged; a visible "not a substitute for medical advice" line shows.

Basis: WHO guidance on AI for health — safety, transparency, accountability,
human oversight.