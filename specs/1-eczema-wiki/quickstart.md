# Developer Quickstart Guide: Eczema Knowledge Wiki

**Feature Identifier**: `1-eczema-wiki`  
**Created Date**: 2026-07-29  

---

## 1. Environment Setup

### System Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: `npm` (v9+)

### Local Installation
```bash
# Navigate to workspace directory
cd c:\Users\sjcab\EczemaWiki

# Install dependencies (if any) or run Vite dev server directly
npx -y create-vite@latest ./ --template vanilla

# Start local development server
npm run dev
```

---

## 2. Project Architecture Overview

```text
c:\Users\sjcab\EczemaWiki/
├── index.html              # Main Single Page App Entrypoint
├── src/
│   ├── data/
│   │   └── eczema-db.js    # Pre-populated Eczema Types, Treatments & Myth Cards
│   ├── components/
│   │   ├── Navbar.js       # Global header with Search Bar & Theme toggle
│   │   ├── SymptomQuiz.js  # 3-step interactive self-assessment quiz component
│   │   ├── EczemaTypes.js  # Eczema Types library with detail modals
│   │   ├── Treatments.js   # Categorized medical & OTC care guide
│   │   ├── MythCards.js    # Interactive Myth vs. Fact cards with voting counter
│   │   └── QRSticker.js    # HTML5 Canvas QR code badge & sticker generator
│   ├── utils/
│   │   ├── search.js       # Client-side multi-tag search index
│   │   └── qr-export.js    # Canvas PNG sticker rendering utility
│   └── styles/
│       └── index.css       # Design System Tokens, CSS Variables & Micro-animations
```

---

## 3. Verification & Testing

```bash
# Run ESLint & Code style validation
npm run lint

# Run Unit tests (Vitest)
npm run test
```
