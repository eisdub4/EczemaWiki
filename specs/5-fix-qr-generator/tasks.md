# Implementation Tasks: QR Code Generator Fix

**Feature Identifier**: `5-fix-qr-generator`  

---

## Tasks

- [x] **Task 1: Spec & Requirement Setup**
  - Create `specs/5-fix-qr-generator/spec.md` and quality checklist.

- [x] **Task 2: Technical Planning & Architecture**
  - Create `specs/5-fix-qr-generator/plan.md` outlining async canvas rendering and library interop.

- [ ] **Task 3: Implement Async Canvas QR Export Utility (`src/utils/qr-export.js`)**
  - Update `renderQRStickerCanvas` to accept options and render via `qrcode` `toCanvas`.
  - Add robust fallback handling.

- [ ] **Task 4: Implement Event Bindings (`src/components/QRSticker.js`)**
  - Bind custom topic select, CTA text input, shape radios, and accent color triggers to `updatePreview()`.
  - Highlight active color button.

- [ ] **Task 5: Unit Test Suite (`tests/qr-export.test.js`)**
  - Implement Node unit tests for canvas export helper methods and error handling.

- [ ] **Task 6: Verification & Build Check**
  - Execute `npm test` and `npm run build` to confirm zero errors.
