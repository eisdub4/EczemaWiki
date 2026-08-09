# Technical Research: Mobile & Tablet Responsiveness

**Feature Identifier**: `4-mobile-responsive`  
**Created Date**: 2026-07-29  

---

## 1. Breakpoint Strategy Selection

### Decision
Use standard 3-tier CSS Breakpoints:
- **Mobile**: `< 640px` (Portrait & Landscape Smartphones)
- **Tablet**: `640px - 1024px` (iPads & Android Tablets)
- **Desktop**: `> 1024px` (Laptops & Desktop Monitors)

### Rationale
- 640px covers almost all common smartphone viewports (iPhone SE at 375px, iPhone 14/15 Pro at 393px, Pixel 7 at 412px).
- 1024px accommodates portrait and landscape tablet orientations (iPad 768px portrait, 1024px landscape).
- Aligns perfectly with standard CSS container and flexbox wrapping rules without unnecessary breakpoint fragmentation.

### Alternatives Considered
- *2-tier breakpoint (mobile/desktop at 768px)*: Rejected because tablet landscape layouts benefit from 2-column card layouts rather than forced mobile single-column stacks.
- *Framework media utility classes (Tailwind/Bootstrap)*: Rejected in accordance with Project Constitution Principle 1 & repository guidelines (Vanilla CSS design system in `src/styles/index.css`).

---

## 2. Touch Target Sizing & Accessibility Guidelines

### Decision
Set minimum touch target dimension of `44px x 44px` for all interactive elements (buttons, inputs, menu links, modal close controls) on viewports `< 640px`.

### Rationale
- Satisfies WCAG 2.1 Success Criterion 2.5.5 (Target Size) and Apple/Android Human Interface Guidelines for mobile touch devices.
- Prevents mis-taps on dense mobile screens.

---

## 3. Mobile Navigation Drawer Strategy

### Decision
Enhance `Navbar.js` with a semantic hamburger toggle button (`aria-expanded="false"`, `aria-label="Toggle Navigation Menu"`) that toggles an `.is-open` class on `.nav-menu` via standard DOM event handlers. Auto-close on link click.

### Rationale
- Pure JavaScript + CSS transition implementation. Zero external dependencies.
- Completely accessible with keyboard navigation (`Enter`/`Space` trigger) and screen readers (`aria-expanded`).

---

## 4. Modal Viewport Overflow & Scrolling

### Decision
Style `.modal-content` using CSS relative viewport units (`width: min(560px, 92vw); max-height: 88vh; overflow-y: auto;`) with `overscroll-behavior: contain`.

### Rationale
- Eliminates clipping on short mobile viewports or when mobile soft keyboards open.
- Ensures modal close button remains visible and reachable.
