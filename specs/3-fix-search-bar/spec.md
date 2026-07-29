# Feature Specification: Search Bar Continuous Typing & Live Query Resolution

**Feature Identifier**: `3-fix-search-bar`  
**Created Date**: 2026-07-29  
**Status**: Specified  

---

## 1. Feature Overview & User Scenarios

### 1.1 Overview
The **Search Bar Continuous Typing & Live Query Resolution** feature restores smooth, continuous text input in the global search header. Currently, typing a single character into the search field triggers an immediate full-page DOM re-render that destroys the active input field, causes loss of focus, and prevents users from typing full words or phrases.

This feature enables users to seamlessly type full words, phrases, and symptoms into the global search bar with continuous focus, smooth input retention, and real-time live search results without disruptive DOM recreation or focus stealing.

### 1.2 User Scenarios

#### Scenario 1: Typing Full Words and Multi-Word Queries
- **Actor**: A site visitor seeking information about specific symptoms or treatments.
- **Goal**: Type a full search term (e.g. "atopic dermatitis" or "itchy hands") without losing input focus.
- **Flow**:
  1. User clicks or focuses on the global search input in the navigation header.
  2. User types a full multi-word query (e.g., "atopic dermatitis").
  3. The search bar retains input focus throughout typing, updating search results in real time or as the user types without resetting the input field or losing focus after the first character.

#### Scenario 2: Clearing or Modifying Search Queries
- **Actor**: A site visitor modifying or deleting characters in their search input.
- **Goal**: Edit or clear the search query to view different wiki topics or return to the main tab content.
- **Flow**:
  1. User uses backspace or clears text in the active search input field.
  2. The input field maintains continuous focus and cursor position during editing.
  3. Clearing the search input entirely restores the default active tab view seamlessly.

#### Scenario 3: Navigating Search Results with Keyboard & Mouse
- **Actor**: A user browsing live search results while typing.
- **Goal**: Review filtered search results or click/press Enter to select a matched eczema type or treatment modal.
- **Flow**:
  1. User views updated search result cards displayed below the header while typing.
  2. User selects a search result item, which opens the detailed modal or page view.
  3. Search query and navbar state remain clean and responsive.

---

## 2. Functional Requirements

### FR-01: Continuous Focus & Input Retention
- The system MUST maintain continuous input focus (`#global-search-input`) while the user is typing, ensuring key presses are not dropped or interrupted.
- The search input field MUST preserve the typed value, cursor placement, and focus state across live input events.

### FR-02: Live Search Feedback & Debounced Updating
- The system MUST update the main view content with relevant search results based on the full typed query.
- The system MUST update search results without destroying or re-instantiating the active header search input DOM element on every keystroke.

### FR-03: Query Clearing & View Restoration
- When the search query is emptied, the system MUST automatically restore the active tab view (e.g. Eczema Types, Treatments, Symptom Quiz) without requiring manual page reloads.

### FR-04: Accessible Search Controls
- The search input MUST maintain valid ARIA attributes (`aria-label="Search Eczema Wiki"`, `type="text"`) and remain accessible via keyboard navigation (Tab, Esc, Enter).

---

## 3. Success Criteria

### SC-01: Uninterrupted Typing Experience
- 100% of multi-character queries (e.g., "atopic", "hydrocortisone") can be typed in a single continuous typing session without losing text box focus or missing characters.

### SC-02: Input Field Stability & Performance
- The search input DOM element persists during typing without unnecessary DOM unmounting or re-creation.
- Search result content updates render in under 100ms from user input/debounce.

### SC-03: Usability & Functional Completeness
- Clearing the search box immediately returns the main content area to the active tab view with zero visual layout shifts or errors.

---

## 4. Key Entities & Data Schema

### Entity: SearchState
- `searchQuery` (string) - Current string typed into the global search bar.
- `isSearchActive` (boolean) - Derived state: `true` if `searchQuery.trim().length > 0`, otherwise `false`.

---

## 5. Constitution & Principles Compliance

- **Principle 1 (Code Quality)**: Short, simple fix preserving DOM elements or isolating search result view updates without heavy third-party state frameworks.
- **Principle 2 (Testing Standards)**: Automated unit and component tests verifying search input retains value, focus, and correctly renders search results for multi-character inputs.
- **Principle 3 (UX Consistency)**: Smooth, expected search UX consistent with web standard inputs.
- **Principle 4 (Performance)**: Zero unnecessary full-page DOM re-renders during text input.

---

## 6. Assumptions & Risks

- **Assumptions**:
  - Main app layout separates static header shell updates from dynamic main content updates to avoid full innerHTML replacement on input.
- **Risks**:
  - None identified.
