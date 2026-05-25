# Health Assistant

A poster-and-QR-code system that brings clinic-grade, multilingual community health information to every pharmacy, clinic, and waiting room in South Africa.

**Twenty-four diseases. Four languages. One scan.**

---

## What's in this repo

| File | Purpose |
|---|---|
| `client-pitch.html` | The proposal document. Mobile-first. Editorial. Send this to clients. |
| `hiv-prototype.html` | Standalone HIV mobile disease page — example of what a customer sees when they scan a QR code. |
| `disease-selection.html` | Interactive checklist for clients to pick which diseases to include. Sends a selection email when complete. |
| `diseases.json` | Single source of truth for all 24 recommended + 10 alternate diseases. Drives the site, the QR generator, and the poster. |

## Concept

One A1 poster goes on the wall of every participating pharmacy, clinic, or waiting room. It carries 24 disease cards, each with a QR code. A customer scans any code and instantly lands on a plain-language mobile page in their chosen language (English, Afrikaans, isiZulu, or isiXhosa). The page tells them what they need to know, what to do today, and where to get help.

The user never pays. Revenue comes from pharma module sponsorship, pharmacy chain partnerships, medical aid co-funding, corporate wellness contracts, NDoH tenders, donor grants, and (later) anonymised engagement data. Ten distinct streams in total — see `client-pitch.html`.

## Disease structure

Every disease page follows the same 6-core-section template, with up to 4 optional modules switched on per condition:

**Core (all 24):** What is it · Know this · Signs to look for · What to do · Get help · Footer
**Optional modules:** When it's urgent · How it spreads (and doesn't) · Myths vs facts · Prevention

See `hiv-prototype.html` for the live template applied.

## Status

Phase 1 — pitch + prototype. Active.

- ✅ Client pitch document
- ✅ Disease list locked (24 + 10 alternates)
- ✅ HIV prototype (English)
- ✅ Disease selection form for clients
- ⏳ Full content for all 24 diseases (English)
- ⏳ Translations (Afrikaans, isiZulu, isiXhosa)
- ⏳ Next.js production site
- ⏳ QR code generator
- ⏳ A1 poster builder

## Contact

**Chris de Vries** · Founder, myAIpartner · Cape Town
[chris@myaipartner.co.za](mailto:chris@myaipartner.co.za) · [myaipartner.co.za](https://myaipartner.co.za)
