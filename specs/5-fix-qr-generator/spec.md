# Feature Specification: QR Code Generator Repair & Enhancement

**Feature Identifier**: `5-fix-qr-generator`  
**Created Date**: 2026-08-09  
**Status**: Draft  

---

## 1. Feature Overview & User Scenarios

### 1.1 Overview
The **Printable QR Code Sticker Generator** on EczemaWiki allows visitors to generate, customize, and download high-resolution QR code stickers (1.5" x 1.5" high-DPI badges) to print and stick on tumblers, laptops, water bottles, and notebooks. These stickers promote physical awareness by directing scanner users to validated clinical eczema myth explanations.

Currently, the QR generator fails to render actual scannable QR matrix codes, falling back to a static placeholder text `[QR CODE MATRIX]`. This breakage is caused by an API mismatch in `src/utils/qr-export.js` (attempting `new window.QRCode(...)` constructor calls on the `qrcode` library instead of using `QRCode.toCanvas` or module imports), along with asynchronous timing race conditions during canvas rendering and PNG downloading.

This feature fixes the QR code generation runtime, upgrades canvas rendering to be synchronous and reliable, ensures accurate redirection target URLs, and provides instant live preview updates and high-resolution sticker PNG exports across both desktop and mobile devices.

### 1.2 Clarifications

#### Session 2026-08-09
- Q: How is the target redirection URL for the QR code sticker set? → A: Option A - Automatically derived from the selected Myth Topic (`canonicalUrl`).

### 1.3 User Scenarios

#### Scenario 1: Visitor Customizing an Awareness QR Sticker for a Myth
- **Actor**: An EczemaWiki visitor or advocate customizing a sticker for a laptop or tumbler
- **Goal**: Select a specific eczema myth topic, customize the badge label and color, and instantly see a fully rendered, scannable QR code preview.
- **Flow**:
  1. User navigates to the QR Code Sticker section on EczemaWiki.
  2. User selects an eczema myth from the dropdown (e.g., *"Eczema is Contagious"*).
  3. User customizes the badge text label (e.g., *"Scan to bust Eczema Myths! 💙"*), badge shape (rounded square vs circle), and theme accent color.
  4. The live sticker preview canvas immediately updates to show a crisp, fully generated black-and-white QR code matrix surrounded by the selected badge styling and custom text.

#### Scenario 2: Visitor Downloading High-Resolution Printable Sticker PNG
- **Actor**: A user preparing to print awareness stickers
- **Goal**: Download a high-quality PNG image of the customized sticker that contains the actual scanned QR code.
- **Flow**:
  1. User clicks the *"📥 Download Printable Sticker PNG"* button.
  2. The system triggers a browser file download for a PNG named `eczema-awareness-sticker-<myth-id>.png`.
  3. The downloaded image file contains the complete high-resolution sticker graphic with the valid QR code, custom text, and badge frame intact.

#### Scenario 3: Scanning the QR Code with a Smartphone Camera
- **Actor**: A peer or passerby scanning a printed sticker on a notebook or water bottle
- **Goal**: Scan the QR code using a mobile device camera and land directly on the relevant EczemaWiki myth clarification page.
- **Flow**:
  1. Peer points their smartphone camera at the printed QR code sticker.
  2. The camera reads the encoded URL (e.g., `https://eczemawiki.org/#myth-contagious` or full canonical URL).
  3. Opening the link opens EczemaWiki directly to the selected myth section.

---

## 2. Functional Requirements

### FR-01: Reliable QR Matrix Rendering Engine
- The system MUST render valid, scannable 2D QR code matrix graphics onto the preview canvas using standard npm `qrcode` library APIs (`QRCode.toCanvas` / `QRCode.toDataURL` or direct module rendering).
- The system MUST NOT rely on invalid legacy global constructor patterns (`new window.QRCode`) or unverified window objects.
- In environments where module bundling or CDN script fallbacks are used, the engine MUST gracefully degrade or handle async loading without throwing uncaught runtime type errors.

### FR-02: Synchronous & Deterministic Canvas Export
- The canvas rendering function (`renderQRStickerCanvas`) MUST complete QR code matrix drawing deterministically before returning or resolving, eliminating `setTimeout` race conditions.
- Clicking the download button MUST guarantee that the exported PNG image contains the fully rendered QR code matrix and badge graphics, never an empty canvas or unrendered placeholder.

### FR-03: Dynamic Customization & Live Preview Sync
- Any user interaction with sticker customization controls (myth selection dropdown, badge label text input, badge shape radio buttons, accent color palette selectors) MUST immediately re-render the preview canvas without full page reloads.
- The target URL encoded into the QR code matrix MUST automatically derive from the selected myth's canonical URL (`currentMyth.canonicalUrl`).
- Input changes to the custom badge label text MUST adjust text wrapping and placement cleanly to fit within the designated footer area.

### FR-04: High-DPI Resolution & Output Formatting
- The output canvas MUST render at a minimum resolution of 300x300 pixels (suitable for crisp physical printing at 1.5" x 1.5" at 200–300 DPI).
- The exported PNG file name MUST reflect the selected myth identifier (e.g. `eczema-awareness-sticker-myth-contagious.png`).


---

## 3. Success Criteria

### SC-01: QR Code Generation Reliability
- 100% of generated preview canvases display a real, scannable QR code matrix rather than text placeholders or blank areas.

### SC-02: QR Scan Accuracy
- 100% of rendered QR codes successfully parse and decode with standard mobile camera QR readers to valid EczemaWiki URLs.

### SC-03: Export Integrity
- 100% of downloaded PNG sticker files contain the full graphic, including border, header, QR code matrix, and footer CTA label.

### SC-04: Real-time UI Responsiveness
- Preview canvas re-rendering completes in under 50 milliseconds upon control state changes.

---

## 4. Key Entities & Data Schema

### QR Sticker Options State
```typescript
interface QRStickerOptions {
  selectedMythId: string;   // Identifier for the myth (e.g., 'myth-contagious')
  url: string;              // Target URL encoded in QR matrix
  ctaText: string;          // Custom badge label text (max 45 chars)
  themeColor: string;       // Accent hex color code (e.g., '#0D9488')
  badgeShape: 'rounded' | 'circle'; // Outer frame boundary shape
}
```

---

## 5. Constitution & Principles Compliance

- **Principle 1 (Code Quality)**: Clean ES module imports and robust canvas API usage without unnecessary external dependencies.
- **Principle 2 (Testing Standards)**: Unit tests for QR canvas export utilities and end-to-end user interaction validation.
- **Principle 3 (UX Consistency)**: Seamless alignment with design system typography, colors, and interactive control feedback.
- **Principle 4 (Performance)**: Fast canvas rendering without memory leaks or repeated DOM node allocations.

---

## 6. Assumptions & Risks

- **Assumptions**:
  - The `qrcode` package (`^1.5.3`) is already installed in `package.json` and supported by modern browsers and bundlers.
  - HTML5 `<canvas>` 2D rendering contexts are available in target user browser environments.
- **Risks**:
  - Extremely long CTA text strings could overflow the lower canvas badge area. This is mitigated by enforcing a `maxlength="45"` on input fields and smart multi-line text wrapping logic.
