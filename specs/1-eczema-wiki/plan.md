# Implementation Plan: Interactive Eczema Knowledge Wiki & Stigma Reduction Hub

**Feature Identifier**: `1-eczema-wiki`  
**Created Date**: 2026-07-29  
**Status**: Ready for Tasks (`/speckit-tasks`)  

---

## Technical Context

- **Target Audience**: General public, eczema patients, family members, and non-medical peers.
- **Technology Stack**: Native HTML5, ES Modules, Vanilla JavaScript, CSS3 Design Tokens, HTML5 Canvas API, lightweight client-side QR library (`qrcode`), Vite dev server.
- **Architecture Pattern**: Component-driven SPA with client-side state management, static pre-populated JSON dataset, and local storage persistence.
- **Hosting Strategy**: Static Web App (deployable to Firebase Hosting / GitHub Pages).

---

## Constitution Check

All principles from `.specify/memory/constitution.md` (v1.0.0) have been evaluated against this plan:

- **Principle 1: Code Quality**: 
  - *Compliance*: Uses standard HTML/CSS/JS without heavy frameworks or unnecessary third-party abstractions. Single-responsibility component modules (`SymptomQuiz.js`, `QRSticker.js`, `MythCards.js`).
- **Principle 2: Testing Standards**: 
  - *Compliance*: Unit test suite (Vitest) for quiz matching logic, search indexing algorithms, and QR canvas helper functions.
- **Principle 3: User Experience Consistency**: 
  - *Compliance*: Centralized CSS design tokens for typography (Google Fonts Inter), dermatology-inspired color palette (Soothing Teal `#0D9488`, Soft Slate `#F8FAFC`, Warm Coral accent), full keyboard navigation, accessible contrast ratios, and interactive hover/focus states.
- **Principle 4: Performance Requirements**: 
  - *Compliance*: Zero server roundtrips for browsing/quiz/QR export. Instant load time (< 1s LCP), zero main-thread blocking operations, DOM element count optimized via dynamic rendering.

---

## Component Architecture & System Design

### 1. Core Data Repository (`src/data/eczema-db.js`)
- Pre-populated static database containing:
  - 6 major Eczema Types (Atopic, Contact, Dyshidrotic, Nummular, Seborrheic, Stasis).
  - 4 Treatment Categories (Prescription, OTC Skincare, Trigger Avoidance, Daily Routines).
  - 8 Interactive Myth vs. Fact Cards spanning contagion, hygiene, severity, and diet fallacies.

### 2. Interactive 3-Step Symptom Helper Quiz (`src/components/SymptomQuiz.js`)
- **Step 1**: Body Location selector.
- **Step 2**: Visual & Tactile Symptom selector.
- **Step 3**: Trigger & Onset selector.
- **Engine**: Client-side match algorithm computing score percentages against `EczemaType` profiles.

### 3. Stigma Reduction & Myth/Fact Hub (`src/components/MythCards.js`)
- Flip-card animation for Myth → Fact transition.
- *"I've heard this myth!"* validation counter saved in `localStorage`.
- Community *"Suggest a Myth"* modal form.

### 4. Printable QR Code Sticker Generator (`src/components/QRSticker.js`)
- Renders custom QR code onto an HTML5 `<canvas>`.
- Composites sticker call-to-action text (e.g. *"Scan to bust Eczema Myths! 💙"*) and badge border frame.
- Exports printable high-resolution 300 DPI PNG sticker file formatted for water tumblers, laptops, and water bottles.

### 5. Global Search & Tag Index (`src/utils/search.js`)
- Real-time multi-tag filter and full-text keyword matching across titles, summaries, symptoms, and myth statements.

---

## Verification Plan

### Automated Testing
- **Quiz Algorithm Unit Tests**: Verify match scoring accuracy for all 6 eczema types.
- **Search Engine Unit Tests**: Verify keyword matching and tag filter combinations.
- **QR Render Tests**: Verify canvas data URL generation and QR payload integrity.

### Manual Verification & Usability
- **Sticker Scan Test**: Print or preview generated QR code stickers on smartphone camera to verify instant redirection to Myth pages.
- **Accessibility & Keyboard Navigation**: Verify full tab navigation, focus indicators, and screen reader labels.
- **Responsive Mobile Layout**: Verify rendering on 9:16 mobile screens and desktop monitors.
