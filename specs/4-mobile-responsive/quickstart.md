# Quickstart Guide: Mobile & Tablet Testing

**Feature Identifier**: `4-mobile-responsive`  
**Created Date**: 2026-07-29  

---

## 1. Running the Application Locally

```bash
npm run dev
```

Open `http://localhost:5173/` in your web browser.

---

## 2. Responsive Device Testing in Chrome / Edge DevTools

1. Open Developer Tools (`F12` or `Ctrl + Shift + I`).
2. Toggle Device Toolbar (`Ctrl + Shift + M`).
3. Test against target device presets:
   - **Mobile Small**: iPhone SE (`375 x 667`)
   - **Mobile Medium/Large**: iPhone 14 Pro (`393 x 852`) / Pixel 7 (`412 x 915`)
   - **Tablet Portrait**: iPad Mini (`768 x 1024`)
   - **Tablet Landscape**: iPad Air (`1024 x 768`)
4. Verify:
   - Hamburger menu opens and closes cleanly on screens under `640px`.
   - No horizontal scrolling occurs at `320px` viewport width.
   - Modals fit on screen with internal scrollbars when content is long.
