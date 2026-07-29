# Data Model Specification: Eczema Knowledge Wiki & Stigma Reduction Hub

**Feature Identifier**: `1-eczema-wiki`  
**Created Date**: 2026-07-29  

---

## 1. Entities & Schema Definitions

### 1.1 EczemaType
Represents a clinical variation of eczema displayed in the Eczema Types Explorer.

```typescript
interface EczemaType {
  id: string;                    // Unique slug (e.g., "atopic-dermatitis")
  title: string;                 // Display name (e.g., "Atopic Dermatitis")
  latinName?: string;            // Secondary name (e.g., "Eczema Flexural")
  summary: string;               // 1-2 sentence plain-language description
  symptoms: string[];            // Key visual/physical symptoms
  commonLocations: string[];     // Affected body regions (e.g., "hands", "flexural-creases")
  triggers: string[];            // Primary flare triggers (e.g., "dry-air", "harsh-soaps")
  onsetAge: string;              // Typical age of onset (e.g., "Infancy / Early Childhood")
  contagiousStatus: false;       // Always false (educational safety check)
  whenToSeeDoctor: string;      // Guidance on when clinical consultation is required
  badgeColor: string;            // UI design token color
}
```

### 1.2 SymptomQuizState & MatchResult
Represents transient user input during the 3-step Symptom Helper Quiz.

```typescript
interface SymptomQuizState {
  currentStep: 1 | 2 | 3;
  selectedLocations: string[];   // Step 1 choices
  selectedSymptoms: string[];    // Step 2 choices
  selectedTriggers: string[];    // Step 3 choices
}

interface EczemaMatchResult {
  eczemaType: EczemaType;
  matchScore: number;            // Percentage match (0 - 100%)
  matchedSymptoms: string[];
  matchedLocations: string[];
}
```

### 1.3 TreatmentEntry
Represents a medical or lifestyle treatment option in the Treatment & Care Guide.

```typescript
interface TreatmentEntry {
  id: string;                    // Unique slug (e.g., "topical-corticosteroids")
  title: string;                 // Name (e.g., "Topical Corticosteroids")
  category: 'prescription' | 'otc-skincare' | 'lifestyle-triggers' | 'home-routine';
  summary: string;               // High-level overview
  mechanism: string;             // How it works on skin inflammation
  commonUsage: string;           // How it is typically applied/used
  precautions: string[];         // Safety guidelines & warnings
  disclaimer: string;            // Mandatory medical advice disclaimer
  tags: string[];
}
```

### 1.4 MythFactCard
Represents an interactive stigma-busting Myth vs. Fact educational card.

```typescript
interface MythFactCard {
  id: string;                    // Unique slug (e.g., "myth-contagious")
  category: 'contagion' | 'hygiene' | 'severity' | 'diet-cures';
  mythStatement: string;         // Common misconception
  factStatement: string;         // Verified clinical fact
  explanation: string;           // Detailed compassionate explanation
  heardCount: number;            // Count of user "I've heard this myth!" validations
  shareableSummary: string;      // Short string formatted for social sharing
  canonicalUrl: string;          // Deep-link URL for QR code redirection
}
```

### 1.5 QRStickerConfig
Represents printable QR code sticker design parameters.

```typescript
interface QRStickerConfig {
  targetMythId: string;          // Myth ID to link to
  ctaText: string;               // Label (e.g. "Scan to bust Eczema Myths! 💙")
  badgeShape: 'circle' | 'square' | 'rounded';
  themeColor: string;            // Hex color code (e.g., "#0D9488" Teal)
  stickerDimensionsInches: number; // e.g. 2.0 (2x2 inches)
}
```

### 1.6 CommunityMythSubmission
Represents a user-submitted myth suggestion.

```typescript
interface CommunityMythSubmission {
  id: string;
  submittedMyth: string;
  contextNote?: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}
```
