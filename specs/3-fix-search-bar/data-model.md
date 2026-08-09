# Data Model & State Specifications: Search Bar Fix

**Feature Identifier**: `3-fix-search-bar`  
**Created Date**: 2026-07-29  

---

## State Schema

### Application State (`src/main.js`)

```javascript
let state = {
  activeTab: 'types',        // 'quiz' | 'types' | 'treatments' | 'myths' | 'qr'
  selectedTypeModal: null,   // EczemaType object | null
  isSuggestModalOpen: false, // boolean
  searchQuery: ''            // string (raw user search input)
};
```

### Derived State

- `isSearchActive`: `Boolean(state.searchQuery.trim())`
  - When `true`: Main view renders `renderSearchResults(state.searchQuery)`.
  - When `false`: Main view renders `renderActiveTabContent(state.activeTab)`.
