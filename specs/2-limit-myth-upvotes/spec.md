# Feature Specification: Myth Upvote Rate Limiting & Anti-Spam Safeguard

**Feature Identifier**: `2-limit-myth-upvotes`  
**Created Date**: 2026-07-29  
**Status**: Clarified  

---

## Clarifications

### Session 2026-07-29
- **Scope of Daily Limit**: Option A — 1 upvote per myth card per user within a 24-hour rolling window. Users can upvote different myth cards once per day each, but cannot upvote the same myth card more than once in 24 hours.
- **Cooldown Reset Window**: Option A — 24-hour rolling window calculated strictly from the timestamp of the last successful upvote on a given myth card.
- **Rate-Limited UI & Feedback**: Option A (Modified) — When a myth card has been upvoted, the button label changes to `"Voted ✓"` (disabled state) accompanied by an accessible native HTML title/tooltip on hover and focus explaining: `"You have already upvoted this myth. You can vote again after 24 hours."`

---

## 1. Feature Overview & User Scenarios

### 1.1 Overview
The **Myth Upvote Rate Limiting & Anti-Spam Safeguard** protects the integrity of community stigma metrics on Eczema Myth & Fact cards. Currently, the *"I've heard this myth!"* validation counter can be clicked repeatedly by a single user without restrictions, making it susceptible to accidental or intentional spam. 

This feature introduces a rate-limiting rule restricting upvotes to 1 upvote per myth card per user within a 24-hour rolling window, maintaining accurate community consensus while providing transparent, user-friendly visual feedback.

### 1.2 User Scenarios

#### Scenario 1: First Upvote of the Day
- **Actor**: A site visitor reading a Myth & Fact card
- **Goal**: Confirm that they have personally heard or experienced a specific myth.
- **Flow**:
  1. User navigates to the Stigma Reduction & Myth/Fact page.
  2. User clicks the *"I've heard this myth!"* button on an active myth card.
  3. The system records the upvote, increments the counter by 1, updates the local vote timestamp for that card, and changes the button text to `"Voted ✓"` in a disabled state.

#### Scenario 2: Viewing a Card Already Upvoted Within 24 Hours
- **Actor**: A visitor who previously upvoted a myth card less than 24 hours ago
- **Goal**: Viewing the myth card again or attempting to re-click the upvote button.
- **Flow**:
  1. User views the previously upvoted myth card.
  2. The system checks the stored vote timestamp and detects that 24 hours have not elapsed.
  3. The upvote button renders in a disabled state showing `"Voted ✓"`. On hover or focus, a tooltip displays: `"You have already upvoted this myth. You can vote again after 24 hours."`

#### Scenario 3: Returning After 24-Hour Cooldown Expiration
- **Actor**: A returning visitor viewing the myth card 24+ hours later
- **Goal**: Upvoting the myth card again on a new day.
- **Flow**:
  1. User views the myth card after 24 hours have elapsed since their last upvote.
  2. The system evaluates the timestamp and determines the 24-hour cooldown has expired.
  3. The upvote button returns to the active state (showing *"I've heard this myth!"*), allowing the user to cast a new vote.

---

## 2. Functional Requirements

### FR-01: Per-Card Daily Rate Limiting
- The system MUST limit *"I've heard this myth!"* upvotes to 1 vote per myth card per user per 24-hour rolling window.
- Users MUST be permitted to upvote multiple distinct myth cards, with independent 24-hour cooldown timers tracked separately for each card.

### FR-02: Client-Side Timestamp Tracking
- The system MUST persist upvote timestamps locally on the client device (using browser `localStorage`) mapping myth card identifiers to the timestamp of the last vote.
- On card component mount, the system MUST inspect stored timestamps and determine whether the 24-hour cooldown is currently active.

### FR-03: Disabled State & Tooltip UI Feedback
- When the 24-hour cooldown is active for a card, the upvote button MUST render in a disabled state (`disabled` attribute and `aria-disabled="true"`).
- The text of the disabled upvote button MUST display `"Voted ✓"`.
- Hovering over or focusing on a disabled upvote button MUST display an accessible tooltip stating: `"You have already upvoted this myth. You can vote again after 24 hours."`

### FR-04: Storage Fallback & Edge Case Handling
- If local client storage is unavailable or throws errors (e.g. private browsing restrictions), the system MUST gracefully fallback without breaking card rendering or throwing unhandled exceptions.

---

## 3. Success Criteria

### SC-01: Spam Prevention Effectiveness
- 100% of repeated clicks on an already upvoted myth card within a 24-hour window are blocked from incrementing the vote counter.

### SC-02: Interaction Speed & Performance
- Rate limit state evaluation and UI update occur in under 50ms upon button interaction.
- `localStorage` timestamp checks during component rendering complete in under 5ms per card without degrading layout performance.

### SC-03: Accessibility & UI Compliance
- The disabled upvote button satisfies standard accessibility criteria: proper ARIA attributes, adequate color contrast, and tooltip visibility on keyboard focus.

---

## 4. Key Entities & Data Schema

### Entity: UpvoteRecord Map (`eczema_wiki_myth_upvotes`)
- Key: `cardId` (string) - Unique identifier for the myth card.
- Value: `lastVotedAt` (number) - Unix timestamp (milliseconds) of the most recent valid upvote.

---

## 5. Constitution & Principles Compliance

- **Principle 1 (Code Quality)**: Minimal, clean rate-limiting state management using browser `localStorage` and standard `Date.now()` comparison without external rate-limiting libraries.
- **Principle 2 (Testing Standards)**: Automated unit test coverage verifying vote validation, 24-hour cooldown expiration, and fallback behavior when `localStorage` is empty or cleared.
- **Principle 3 (UX Consistency)**: Disabled button showing `"Voted ✓"` with tooltip visual feedback, adhering to design system tokens and accessibility requirements.
- **Principle 4 (Performance)**: Fast client-side synchronous checks with zero impact on main thread or network request overhead.

---

## 6. Assumptions & Risks

- **Assumptions**:
  - The EczemaWiki application uses client-side state / `localStorage` for managing guest interactions on myth cards.
  - A 24-hour rolling window per card provides an optimal balance between user engagement and anti-spam protection.
- **Risks**:
  - Clearing browser cache/cookies or using incognito mode resets client-side `localStorage`. This is an acceptable trade-off for a public, non-authenticated wiki application.
