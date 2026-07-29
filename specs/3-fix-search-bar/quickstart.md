# Quickstart Guide: Testing Search Bar Continuous Typing Fix

**Feature Identifier**: `3-fix-search-bar`  
**Created Date**: 2026-07-29  

---

## 1. Running Unit Tests

```bash
npm test
```

Verifies search state handling and search filtering logic using `node --test`.

---

## 2. Testing in Browser

1. Start development server (if not already running):
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173/` in your browser.
3. Click into the search input at the top right of the navbar.
4. Type `"atopic eczema"` or any multi-word query.
5. Confirm that typing is fluid, input focus is maintained, and search results appear immediately below the hero banner.
6. Delete text to return to the active tab view.
