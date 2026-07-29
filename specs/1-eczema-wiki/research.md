# Technical Research & Architectural Decisions: Eczema Knowledge Wiki

**Feature Identifier**: `1-eczema-wiki`  
**Created Date**: 2026-07-29  

---

## 1. Technology Stack & Framework Selection

### Decision: Vite + Standard HTML5 / ES Modules / Vanilla JS + Canvas API
- **Rationale**: 
  - Aligns directly with **Ponytail Principle** (minimal dependencies, stdlib/native browser features, zero unnecessary framework overhead).
  - Web Vitals (LCP < 1.0s, instant client-side rendering) are easily guaranteed with pure native DOM & ES Modules.
  - Zero server/backend requirement for core wiki browsing, quiz execution, search, and sticker generation.
- **Alternatives Considered**:
  - *Next.js / Server-Side React*: Over-engineered for a client-side wiki & offline-first awareness sticker generator. Adds build complexity and heavy node server runtime.
  - *Static Markdown Generators (Hugo/Docusaurus)*: Harder to customize with interactive 3-step canvas quiz, live myth voting counters, and custom QR sticker canvas exporter.

---

## 2. Client-Side QR Code Sticker Generation

### Decision: `qrcode` JavaScript Library + HTML5 Canvas API Renderer
- **Rationale**:
  - `qrcode` is a ultra-lightweight (3KB) client-side QR generator library.
  - Renders QR matrices directly onto an HTML5 `<canvas>` element.
  - Custom sticker frames (e.g. rounded badge borders, call-to-action text *"Scan to bust Eczema Myths! 💙"*, custom theme colors) can be composited using native Canvas 2D Context API (`ctx.fillText`, `ctx.arc`, `ctx.drawImage`).
  - Supports instant client-side PNG export (`canvas.toDataURL("image/png")`) for high-DPI printable stickers.
- **Alternatives Considered**:
  - *External Server QR API (e.g., Google Chart QR API)*: Deprecated, relies on external network calls, requires internet connection for QR sticker design, breaks offline privacy.

---

## 3. Data Storage & Local Persistence

### Decision: LocalStorage / IndexedDB + Pre-Populated JSON Data Store
- **Rationale**:
  - Core wiki content (Eczema Types, Treatment Entries, Myth vs. Fact Cards) is stored in a clean, versioned `eczema-wiki-db.json` static asset file loaded into memory at startup.
  - User interactions (interactive quiz answers, *"I've heard this myth!"* vote counters, saved QR sticker presets, user-suggested myth drafts) persist locally in `localStorage`.
- **Alternatives Considered**:
  - *Full Relational Backend Database (PostgreSQL / Supabase)*: Unnecessary for a client-first educational wiki. Local storage keeps the app fast, static-hostable (GitHub Pages / Firebase Hosting), and instantly accessible.

---

## 4. Search & Filter Architecture

### Decision: In-Memory Client-Side FlexSearch / Regex Full-Text Indexing
- **Rationale**:
  - The dataset of eczema types, treatments, and myth cards fits well under 500KB.
  - Client-side keyword and multi-tag indexing delivers sub-50ms instant search response with zero network latency.
