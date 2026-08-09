# Implementation Plan: QR Code Generator Fix

**Feature Identifier**: `5-fix-qr-generator`  
**Created Date**: 2026-08-09  

---

## Technical Context

- **Framework**: Vanilla JS + Vite
- **Dependencies**: `qrcode` (^1.5.3)
- **Canvas Rendering**: 2D HTML5 Canvas API (`getContext('2d')`)
- **Testing**: Node built-in test runner (`node --test`)

---

## Proposed Changes

### Component 1: QR Utility (`src/utils/qr-export.js`)
- Refactor `renderQRStickerCanvas` to be `async/await`.
- Update QR library resolution logic (`getQRLib`) to resolve `toCanvas` across CJS/ESM interop and window global.
- Use `qrLib.toCanvas(tempCanvas, url, options)` to draw the QR matrix onto a temporary canvas, then composite onto the preview canvas.

### Component 2: QR UI Binding (`src/components/QRSticker.js`)
- Update `bindQRStickerEvents` to handle `async` preview rendering (`updatePreview`).
- Ensure custom text, shape change, and color button clicks invoke `updatePreview()`.
- Provide visual feedback for color selection buttons.

### Component 3: Unit Tests (`tests/qr-export.test.js`)
- Create unit test suite covering `renderQRStickerCanvas` with canvas mock/stubbing.
- Validate null handling, canvas dimension setup, and error boundaries.

---

## Verification Plan

### Automated Tests
- Run `npm test` (`node --test`) to verify all 14 unit tests pass cleanly.

### Manual Verification
- Run `npm run build` to verify production bundling succeeds.
