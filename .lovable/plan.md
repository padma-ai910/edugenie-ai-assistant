# EduGenie implementation plan

## Goal
Build a polished, responsive college project for EduGenie with six working screens and real FastAPI request wiring. No database, login, payments, admin tools, or fake AI responses will be added.

## Screens and navigation
- Build a shared responsive header with links to Home, Dashboard, Quiz, Summarizer, AI Tutor, and Structurer.
- Create separate routes for `/`, `/dashboard`, `/quiz`, `/summarize`, `/tutor`, and `/structure`.
- Make every feature card and call-to-action navigate to a real screen.
- Add unique page titles and social descriptions for each route.

## Visual direction
- Use a clean, futuristic blue-and-purple education theme with soft gradient atmosphere, compact rounded cards, subtle shadows, and restrained motion.
- Use Lucide icons consistently for tools and actions.
- Keep controls readable and touch-friendly across desktop, tablet, and mobile.

## Feature behavior
- **Quiz:** collect topic, difficulty, and question count; show request, error, quiz, answer selection, scoring, explanations, and reset states.
- **Summarizer:** accept study material; show loading, error, result, copy, and clear actions.
- **AI Tutor:** accept a question and optional subject; show loading, error, formatted answer, and ask-again action.
- **Structurer:** accept raw notes; render every structured response section and provide a raw JSON toggle.
- Validate required inputs before requests and keep all failures visible and recoverable.

## API integration
- Centralize typed requests in `src/services/api.ts` using `VITE_API_URL`, defaulting to `http://localhost:8000`.
- Add `.env.example` containing only `VITE_API_URL=http://localhost:8000`.
- Keep all AI credentials out of the frontend and do not generate fallback responses.

## Technical details
- Use the existing React, TypeScript, Tailwind CSS, TanStack Router, and Lucide setup.
- Add small shared layout and UI helpers only where they reduce duplication.
- Record the frontend/API boundary decision in `AGENTS.md`.
- Verify the preview, navigation, key interactions, mobile layout, and current build diagnostics.
