# Data Model & UI State: Mobile & Tablet Responsiveness

**Feature Identifier**: `4-mobile-responsive`  
**Created Date**: 2026-07-29  

---

## 1. UI State Entities

### Navigation Drawer State (`Navbar.js`)
- **State Property**: `isMenuOpen` (boolean)
- **Default**: `false`
- **Transitions**:
  - `false` -> `true` on hamburger toggle click.
  - `true` -> `false` on hamburger toggle click, navigation link click, or outside overlay click.
- **DOM Representation**: `aria-expanded` attribute on `.nav-toggle` and `.is-open` class on `.nav-menu`.

---

## 2. CSS Layout Tokens (`src/styles/index.css`)

```css
:root {
  /* Breakpoint Dimensions */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;

  /* Touch Standards */
  --touch-target-min: 44px;
  --touch-gap-min: 8px;

  /* Fluid Spacing */
  --container-padding-mobile: 1rem;
  --container-padding-desktop: 2rem;
}
```
