# Feature Specification: QR Code Generator Fix & High-DPI Export

**Feature Identifier**: `5-fix-qr-generator`  
**Created Date**: 2026-08-09  
**Status**: Draft  

---

## 1. Feature Overview & User Scenarios

### 1.1 Overview
The **Printable QR Code Sticker Generator** allows users to create high-resolution, custom QR code stickers to promote eczema awareness and myth-busting. Users select a myth topic, customize label text, pick a badge shape (rounded square or circle), choose an accent color, and download a 300x300 high-DPI PNG file ready for printing.

This feature fixes the canvas QR matrix rendering issue where legacy `new window.QRCode(...)` calls failed or fell back to visual placeholder text (`[QR CODE MATRIX]`). It ensures seamless canvas rendering using the `qrcode` library's `toCanvas` API across dev mode, Vite production builds, and unit testing environments.

### 1.2 User Scenarios

#### Scenario 1: Live Customization & Canvas Preview
- **Actor**: Visitor customizing a sticker on EczemaWiki
- **Goal**: Instantly preview QR code sticker changes on the 300 DPI preview canvas.
- **Flow**:
  1. User navigates to the QR Stickers tab.
  2. The sticker canvas renders with the selected myth URL encoded in a crisp, dark-mode QR matrix.
  3. Changing topic, custom text, shape, or color dynamically updates the canvas preview asynchronously without errors.

#### Scenario 2: High-Resolution PNG Export
- **Actor**: Visitor printing a physical sticker
- **Goal**: Download the customized sticker canvas as a PNG image.
- **Flow**:
  1. User clicks *"Download Printable Sticker PNG"*.
  2. The current canvas content is exported as a PNG file named `eczema-awareness-sticker-<mythId>.png`.

---

## 2. Functional Requirements

### FR-01: QR Code Matrix Canvas Rendering
- The system MUST use `qrcode` library's `toCanvas` method (`renderQRStickerCanvas`) to paint the QR code onto a temporary canvas and composite it onto the sticker preview canvas.
- The canvas rendering function MUST be asynchronous (`async/await`) to ensure complete QR matrix generation before footer text or export triggers.

### FR-02: Robust Module & Browser Interop
- The canvas export utility MUST safely resolve `qrcode` methods across ES module imports, CommonJS bundler interop (`QRCode.toCanvas`, `QRCode.default.toCanvas`), and window global objects (`window.QRCode`).

### FR-03: Event Binding & State Sync
- The UI controller MUST bind input events (`change`, `input`, `click`) to state changes and trigger canvas updates smoothly.
- Color button selection MUST provide visual feedback (border highlighting) when clicked.

---

## 3. Success Criteria

### SC-01: QR Code Render Integrity
- 100% of custom options render a scannable, valid QR code on the preview canvas in dev mode, production builds, and deployed environments.

### SC-02: Automated Testing Coverage
- 100% unit test pass rate for `renderQRStickerCanvas` and canvas state handling.
