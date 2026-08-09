# Implementation Plan: Search Bar Continuous Typing & Live Query Resolution

**Feature Identifier**: `3-fix-search-bar`  
**Created Date**: 2026-07-29  
**Status**: Completed Planning (Ready for Tasks `/speckit-tasks`)  

---

## Technical Context

- **Target User Scenario**: Visitors searching for eczema symptoms, treatments, or myths via the header search bar.
- **Technology Stack**: Native HTML5, ES Modules, Vanilla JavaScript, CSS3, `node:test` runner.
- **Architecture Pattern**: Targeted DOM sub-tree updates (selective DOM re-rendering) for active views instead of full-page `innerHTML` replacement upon search keystroke.

---

## Constitution Check

All principles from `.specify/memory/constitution.md` (v1.0.0) have been evaluated against this implementation plan:

- **Principle 1: Code Quality**:
  - *Compliance*: Minimal, targeted DOM updates. Updating `<main>` content container when search query changes rather than re-creating the entire navbar header. Preserves native HTML input state without adding unneeded third-party libraries.
- **Principle 2: Testing Standards**:
  - *Compliance*: Automated tests in `tests/search.test.js` verifying query update handling, state synchronization, and DOM node retention.
- **Principle 3: User Experience Consistency**:
  - *Compliance*: Seamless text typing without losing input focus, dropping characters, or resetting cursor position.
- **Principle 4: Performance Requirements**:
  - *Compliance*: Lightweight element-level DOM update without full page re-renders on every keystroke. Zero frame lag during typing.

---

## Component Architecture & System Design

### 1. Main Application Routing & DOM Preservation (`src/main.js`)
- Refactor `handleSearchInput(query)` in `src/main.js`:
  - Update `state.searchQuery = query`.
  - Instead of invoking full `renderApp()`, update only the `<main>` container element:
    - If `isSearchActive`: render `renderSearchResults(state.searchQuery)` inside `<main>` and bind search results events.
    - If search query is cleared (`!isSearchActive`): render `renderActiveTabContent(state.activeTab)` inside `<main>` and re-bind tab-specific events.
- Update `renderNavbar()` in `src/components/Navbar.js`:
  - Preserve `value="${searchQuery || ''}"` on `#global-search-input` when initial navbar render happens.
- Ensure event binding in `Navbar.js` does not unbind or replace `#global-search-input` element while typing.

### 2. Header Navbar Component (`src/components/Navbar.js`)
- Ensure `renderNavbar(activeTab, searchQuery)` receives the current search query and sets `value="${searchQuery}"` on `#global-search-input`.
- Keep input listener firing `onSearch` cleanly without replacing the input element.

### 3. Automated Unit & Integration Tests (`tests/search.test.js`)
- Node test suite verifying:
  - Search query state updates.
  - Active search detection (`isSearchActive`).
  - Search result filtering matching expected types/treatments/myths for multi-character words.

---

## Verification Plan

### Automated Testing
```bash
npm test
```
- Run `node --test` to ensure all tests pass (storage tests and new search tests).

### Manual Verification
- Open `http://localhost:5173/` in browser.
- Focus `#global-search-input` in navbar.
- Type multi-word query (e.g. "atopic dermatitis").
- Verify input focus remains on search input continuously.
- Verify live search results update smoothly below header.
- Clear search input using Backspace/Delete.
- Verify active tab view is restored cleanly.
