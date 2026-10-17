# KaamSaathi — Gig Worker Companion

A responsive English/Hindi prototype for a gig-worker support platform.

## Features implemented
- Demo login with visible credentials
- Required flow: login → language selection → multi-select professions → dashboard
- English and Hindi interface translations
- Language and onboarding preferences saved in browser local storage
- Profession cards with image backgrounds and multi-select support
- Dashboard and responsive navigation
- Functional earnings/expenses tracker with local persistence and net calculation
- Rule-based demo AI assistant with English/Hindi responses
- Starter links and cautious information for worker schemes
- Document upload UI (processing not connected)
- Complaint draft generator in English/Hindi with edit and copy support
- Settings to switch language and update professions

## Demo credentials
- Email: `demo@kaamsaathi.in`
- Password: `Worker@123`

## Run locally
Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

For a production build:

```bash
npm run build
npm run preview
```

## Important prototype limitations
- Authentication is demo-only and is not secure production authentication.
- Earnings data is stored in this browser's local storage, not a shared backend database.
- The AI assistant uses local rule-based demo responses. It does not call a live LLM.
- Document OCR/AI analysis is not connected.
- Scheme content is only an informational starting point. Confirm current rules and eligibility on official portals.
- Profession photos are loaded from Unsplash URLs and therefore need an internet connection.

## Suggested next development steps
1. Add real authentication and a backend database.
2. Connect the AI assistant to an LLM using server-side environment variables.
3. Add a verified scheme knowledge base and source dates.
4. Integrate OCR/document understanding.
5. Add tests for onboarding, language switching, and earnings calculations.
