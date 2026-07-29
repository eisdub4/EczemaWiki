# Quickstart & Verification Guide: Myth Upvote Rate Limiting

**Feature Identifier**: `2-limit-myth-upvotes`  

---

## Overview

This guide provides step-by-step instructions for running automated tests and manually verifying the 1-upvote-per-day rate limiting safeguard on Eczema Myth & Fact cards.

---

## 1. Automated Verification

Run unit tests covering rate limit state evaluation, 24-hour expiration math, and localStorage fallback handling:

```bash
npm test
```

Expected output:
- `storage.test.js`: All tests for `canUserUpvote`, `recordUpvoteTimestamp`, and `incrementHeardVote` passing.

---

## 2. Manual Verification Walkthrough

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
2. **Open Application**:
   Navigate to `http://localhost:5173/` in your browser.
3. **Navigate to Myth Cards**:
   Scroll down or navigate to the **Stigma Reduction & Myth/Fact Hub** section.
4. **Cast Initial Upvote**:
   - Click the *"I've heard this!"* button on any card (e.g. "Myth: Eczema is contagious").
   - Verify that the vote count increments by 1.
   - Verify that the button text immediately changes to `"Voted ✓"`.
   - Verify that the button enters a disabled state (`disabled` and `aria-disabled="true"`).
5. **Verify Tooltip Feedback**:
   - Hover over or focus on the disabled `"Voted ✓"` button.
   - Verify that a tooltip appears reading: `"You have already upvoted this myth. You can vote again after 24 hours."`
6. **Verify Persistence Across Refresh**:
   - Reload the browser page (`F5`).
   - Verify that the upvoted card remains in the disabled `"Voted ✓"` state with the active tooltip.
7. **Verify Independent Card Voting**:
   - Click *"I've heard this!"* on a different myth card that has not been upvoted yet today.
   - Verify that the second card successfully accepts its upvote and transitions to `"Voted ✓"` independently.
