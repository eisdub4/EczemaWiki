# Research & Decision Log: Search Bar Continuous Typing

**Feature Identifier**: `3-fix-search-bar`  
**Created Date**: 2026-07-29  

---

## 1. Issue Analysis: Single Character Typing Focus Loss

### Problem Summary
In `src/main.js`, `handleSearchInput(query)` was calling `renderApp()` on every `input` event from `#global-search-input`. `renderApp()` re-assigned `app.innerHTML = ...` with a freshly evaluated string from `renderNavbar()`. 

Replacing `app.innerHTML` destroys the existing input DOM element and creates a brand-new input DOM element. Because the browser DOM node was destroyed, keyboard focus was immediately lost after typing 1 character.

### Evaluation of Options

#### Option A: Full Virtual DOM or Heavy UI Library (React/Vue/Preact)
- **Rationale**: Uses VDOM diffing to preserve DOM input node and focus.
- **Verdict**: Rejected (violates YAGNI & Principle 1: over-engineering for vanilla JS app).

#### Option B: Targeted Sub-tree DOM Re-rendering (Selective `<main>` update)
- **Rationale**: Keep `#global-search-input` and header shell mounted in DOM. On search query change, update only the inner HTML of the `<main>` element (`document.querySelector('main').innerHTML = ...`).
- **Verdict**: Selected (simple, 0 external dependencies, standard vanilla JS pattern).

---

## 2. Decision Record

- **Decision**: Update `handleSearchInput` to target the `<main>` container directly for rendering `renderSearchResults` or `renderActiveTabContent`, keeping the Navbar DOM node persistent.
- **Rationale**: Solves 100% of focus loss issues with minimal code diff and instant performance.
