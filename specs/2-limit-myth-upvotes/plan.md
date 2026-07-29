# Implementation Plan: Myth Upvote Rate Limiting & Anti-Spam Safeguard

**Feature Identifier**: `2-limit-myth-upvotes`  
**Created Date**: 2026-07-29  
**Status**: Completed Planning (Ready for Tasks `/speckit-tasks`)  

---

## Technical Context

- **Target User Scenario**: Visitors interacting with Eczema Myth & Fact cards who want to validate misconceptions without spamming counters.
- **Technology Stack**: Native HTML5, ES Modules, Vanilla JavaScript, CSS3, `localStorage` browser storage, Vitest for automated testing.
- **Architecture Pattern**: Component-driven SPA with local storage persistence and client-side timestamp validation.

---

## Constitution Check

All principles from `.specify/memory/constitution.md` (v1.0.0) have been evaluated against this implementation plan:

- **Principle 1: Code Quality**:
  - *Compliance*: Pure client-side `localStorage` timestamp storage and standard `Date.now()` arithmetic. No external rate-limiting libraries or unneeded abstractions. Single-responsibility utility functions in `src/utils/storage.js`.
- **Principle 2: Testing Standards**:
  - *Compliance*: Automated unit test coverage in `tests/storage.test.js` verifying vote acceptance, duplicate rejection, 24-hour expiration calculation, and graceful error handling for missing/corrupted storage.
- **Principle 3: User Experience Consistency**:
  - *Compliance*: Disabled button state showing `"Voted ✓"`, equipped with native HTML `title` and accessible `aria-disabled="true"` tooltip explaining: `"You have already upvoted this myth. You can vote again after 24 hours."`
- **Principle 4: Performance Requirements**:
  - *Compliance*: Zero network overhead, zero server roundtrips, synchronous < 1ms timestamp checks during card rendering. Zero main-thread blocking operations.

---

## Component Architecture & System Design

### 1. Storage Utility Enhancements (`src/utils/storage.js`)
- Add `getUpvoteTimestamps()` helper to safely parse `eczemawiki_myth_upvote_timestamps` from `localStorage`.
- Add `canUserUpvote(mythId)` helper to check if `Date.now() - timestamp >= 86,400,000` (24 hours).
- Update `incrementHeardVote(mythId)` to check `canUserUpvote(mythId)` before recording votes and updating timestamps.

### 2. Myth Card UI & Event Handling (`src/components/MythCards.js`)
- Update `renderMythCards()` to check `canUserUpvote(myth.id)` for each card.
- If `canUserUpvote` returns `false` (rate-limited):
  - Render upvote button with `disabled` attribute and `aria-disabled="true"`.
  - Display button text `"Voted ✓"`.
  - Set `title="You have already upvoted this myth. You can vote again after 24 hours."`.
- If `canUserUpvote` returns `true` (available):
  - Render active upvote button `"🙋‍♂️ I've heard this! (${currentVoteCount})"`.

### 3. Automated Unit Tests (`tests/storage.test.js`)
- Unit tests verifying:
  - Fresh myth card allows voting.
  - Card voted within 24 hours blocks secondary vote attempt.
  - Card voted 24 hours + 1 ms ago allows voting again.
  - Multiple cards track independent timestamps correctly.

---

## Verification Plan

### Automated Testing
```bash
npm test
```
- Verify all storage rate-limiting unit tests pass cleanly.

### Manual Verification
- Click upvote on a myth card in `http://localhost:5173/`.
- Verify button transitions to `"Voted ✓"` disabled state.
- Verify hover tooltip shows 24-hour reset explanation.
- Refresh page and verify state remains persistent.
