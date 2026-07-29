# Research & Technical Decisions: Myth Upvote Rate Limiting

**Feature Identifier**: `2-limit-myth-upvotes`  
**Created Date**: 2026-07-29  

---

## Technical Unknowns & Research Findings

### Decision 1: Rate Limiting Cooldown Calculation
- **Decision**: Track exact Unix timestamp (in milliseconds) of each vote in client `localStorage` under key `eczemawiki_myth_upvote_timestamps`. Rate limit status is evaluated via `Date.now() - lastVotedAt < 86,400,000` (24 hours).
- **Rationale**: 
  - Meets requirement for a strict 24-hour rolling window per myth card.
  - Requires minimal storage overhead (a single lightweight JSON object mapping `cardId` -> `timestamp`).
  - Executes synchronously during render (< 1ms execution time per card), keeping UI fast and responsive without network delays or framework overhead.
- **Alternatives Considered**:
  - *Calendar Date Reset (`YYYY-MM-DD`)*: Resetting at midnight local time allows users who vote at 11:59 PM to vote again at 12:01 AM (2 minutes later). Rejected in favor of exact 24-hour rolling window.
  - *Backend Cookie / IP Rate Limiter*: Requires a backend server and database. Violates YAGNI principles for a client-side wiki SPA.

### Decision 2: Disabled Button & Tooltip UX Pattern
- **Decision**: Use standard HTML `disabled` attribute, `aria-disabled="true"`, button text `"Voted ✓"`, and native HTML `title` / custom tooltip attribute `"You have already upvoted this myth. You can vote again after 24 hours."`.
- **Rationale**:
  - Standard HTML `disabled` and `title` attributes provide native accessibility, tooltip support, and visual state cues out of the box.
  - Keeps CSS minimal while fulfilling UX consistency requirements.
- **Alternatives Considered**:
  - *Active button with toast alert on re-click*: Preserves clickable appearance, but allows confusing repeated clicks. Rejected per user feedback.
  - *"Voted Today"* button text: Rejected per user feedback in favor of simpler `"Voted ✓"`.

### Decision 3: Storage Failure & Private Browsing Fallbacks
- **Decision**: Wrap all `localStorage` access in safe `try/catch` blocks. If `localStorage` is disabled or throws quota/security errors, allow the current vote in memory without crashing the UI.
- **Rationale**: Complies with Constitution Principle 1 (strict boundary validation and explicit error handling without silent unhandled crashes).
