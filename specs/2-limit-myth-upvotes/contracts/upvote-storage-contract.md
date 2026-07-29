# Client Storage API Contract: Myth Upvote Storage Module

**Feature Identifier**: `2-limit-myth-upvotes`  
**Module**: `src/utils/storage.js`  

---

## Function Signatures & Contracts

### 1. `getUpvoteTimestamps()`
- **Parameters**: None
- **Returns**: `Record<string, number>` - Key-value map of `mythId` -> Unix timestamp (ms).
- **Behavior**: Reads `eczemawiki_myth_upvote_timestamps` from `localStorage`. Safely parses JSON; returns `{}` if empty, missing, or corrupted.

```javascript
/**
 * @returns {Record<string, number>} Map of myth ID to last voted Unix timestamp (ms)
 */
export function getUpvoteTimestamps();
```

---

### 2. `canUserUpvote(mythId: string)`
- **Parameters**: `mythId` (string) - Unique identifier of the myth card.
- **Returns**: `boolean` - `true` if user can vote (no vote cast within 24h), `false` if 24h cooldown is active.
- **Behavior**:
  - Fetches timestamp for `mythId` from `getUpvoteTimestamps()`.
  - If no timestamp exists, returns `true`.
  - Returns `(Date.now() - timestamp) >= 86400000`.

```javascript
/**
 * @param {string} mythId
 * @returns {boolean} Whether the user is eligible to upvote this card
 */
export function canUserUpvote(mythId);
```

---

### 3. `recordUpvoteTimestamp(mythId: string)`
- **Parameters**: `mythId` (string) - Unique identifier of the myth card.
- **Returns**: `boolean` - `true` if successfully recorded, `false` if rejected due to active cooldown or storage error.
- **Behavior**:
  - Checks `canUserUpvote(mythId)`.
  - If `false`, returns `false` without modifying storage.
  - If `true`, updates timestamp map with `[mythId]: Date.now()` and saves to `localStorage`.

```javascript
/**
 * @param {string} mythId
 * @returns {boolean} Success status of recording the upvote timestamp
 */
export function recordUpvoteTimestamp(mythId);
```

---

### 4. `incrementHeardVote(mythId: string)` (Updated)
- **Parameters**: `mythId` (string) - Unique identifier of the myth card.
- **Returns**: `{ newCount: number, success: boolean }`
- **Behavior**:
  - Calls `recordUpvoteTimestamp(mythId)`.
  - If rate limit check fails, returns current vote count without incrementing and sets `success: false`.
  - If check passes, increments persistent vote count and returns updated count with `success: true`.

```javascript
/**
 * @param {string} mythId
 * @returns {{ newCount: number, success: boolean }}
 */
export function incrementHeardVote(mythId);
```
