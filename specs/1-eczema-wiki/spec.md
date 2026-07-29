# Feature Specification: Interactive Eczema Knowledge Wiki & Stigma Reduction Hub

**Feature Identifier**: `1-eczema-wiki`  
**Created Date**: 2026-07-29  
**Status**: Clarified  

---

## Clarifications

### Session 2026-07-29
- Q: Interactive Symptom & Type Discovery → A: Option A - Include a guided 3-step interactive "Symptom Helper" quiz that filters and highlights matching eczema types based on user-selected symptoms, flare appearance, and affected body regions.
- Q: Shareable Awareness Cards & Physical Sharing → A: Custom User Request - Provide a built-in **Printable QR Code Sticker Generator** alongside digital PNG image cards and Web Share API / Copy Link. Users can generate and print custom QR code stickers (e.g. for tumblers, laptops, notebooks, or water bottles) that friends/peers can scan to open the interactive Myth vs. Fact hub directly.
- Q: Community Engagement on Myth & Fact Cards → A: Option A + B Combined - Deliver a curated core set of medically-validated Myth vs. Fact cards with an interactive *"I've heard this myth!"* validation counter on each card, plus a community *"Suggest a Myth"* submission form for crowd-sourced stigma insights.

---

## 1. Feature Overview & User Scenarios

### 1.1 Overview
The **Eczema Wiki & Stigma Reduction Hub** is an accessible, user-friendly, and comprehensive web platform designed to empower individuals living with eczema, their families, and the general public. 

The platform delivers clear knowledge across three core pillars:
1. **Eczema Types Explorer**: Detailed breakdowns of different eczema types, symptoms, triggers, and diagnostic traits, accompanied by a 3-step interactive Symptom Helper quiz.
2. **Treatment & Care Guide**: Up-to-date guidance on clinical treatments, daily skin maintenance, over-the-counter care, lifestyle modifications, and trigger management.
3. **Stigma Reduction & Myth/Fact Hub**: An interactive educational space dispelling misconceptions (e.g., contagion myths, hygiene fallacies) equipped with shareable micro-content cards, interactive myth validation counters, community myth submissions, and a printable QR Code sticker generator for physical awareness sharing.

### 1.2 User Scenarios

#### Scenario 1: Exploring & Identifying Eczema Types (with Symptom Helper Quiz)
- **Actor**: A newly diagnosed patient or concerned individual unsure of their specific eczema type
- **Goal**: Identify potential eczema types matching their current symptoms without searching through complex medical jargon.
- **Flow**:
  1. User opens the Eczema Types section and launches the 3-step "Symptom Helper" quiz.
  2. User selects symptom characteristics (e.g., intense itch, blisters, coin-shaped patches), body locations (e.g., hands, flexural folds), and triggers.
  3. The system filters and presents matching eczema type cards sorted by relevance, with visual guides and medical disclaimers.

#### Scenario 2: Learning About Treatment Options & Daily Care
- **Actor**: An eczema patient or caregiver looking for management strategies
- **Goal**: Learn how people usually treat their condition safely and effectively.
- **Flow**:
  1. User navigates to the Treatment & Management guide.
  2. User filters treatments by category: Prescription Medications (topical steroids, non-steroidals, biologics, phototherapy), Daily Skincare Regimens (emollients, baths, moisturizers), or Lifestyle/Trigger Avoidance (dietary factors, fabric choices, stress relief).
  3. User reads evidence-based overview cards outlining how each treatment works, typical usage patterns, safety precautions, and questions to ask their dermatologist.

#### Scenario 3: Debunking Myths, Voting, & Sharing Awareness Cards
- **Actor**: An individual with eczema experiencing social stigma or wanting to spark conversations with peers
- **Goal**: Educate friends, family, or coworkers by sharing accurate myth vs. fact information digitally or via physical QR code stickers on personal items (tumblers, laptops, water bottles).
- **Flow**:
  1. User opens the Stigma Reduction & Myth/Fact page.
  2. User flips interactive "Myth vs. Fact" cards (e.g., "Myth: Eczema is contagious", "Fact: Eczema is a non-contagious inflammatory skin condition").
  3. User taps the *"I've heard this myth!"* counter to validate how widespread a misconception is.
  4. User clicks "Share Card" to choose digital sharing (PNG quote image download, WhatsApp/iMessage link) OR clicks "Generate QR Sticker" to export a high-resolution printable QR badge formatted for stickers on tumblers and personal accessories.
  5. User submits a new myth they encountered in their daily life via the *"Suggest a Myth"* community form.

#### Scenario 4: Fast Search & Filtering Across the Wiki
- **Actor**: A user looking for a quick answer to a specific symptom or myth
- **Goal**: Locate relevant topics rapidly without browsing long pages.
- **Flow**:
  1. User enters keywords in the global search bar (e.g., "steroid withdrawal", "contagious", "hands").
  2. System displays instant categorised search results spanning Eczema Types, Treatments, and Myth/Facts.
  3. User clicks a search result to jump directly to the highlighted answer.

---

## 2. Functional Requirements

### FR-01: Eczema Types Catalog & Interactive Explorer
- The system MUST provide dedicated, structured profiles for major eczema variations:
  - Atopic Dermatitis
  - Contact Dermatitis (Allergic & Irritant)
  - Dyshidrotic Eczema (Pompholyx)
  - Nummular Eczema (Discoid)
  - Seborrheic Dermatitis
  - Stasis Dermatitis
- Each type profile MUST include: visual appearance descriptions, primary symptoms, common trigger factors, affected body locations, and diagnostic notes.

### FR-02: Guided 3-Step "Symptom Helper" Quiz
- The system MUST provide a guided 3-step interactive self-assessment quiz:
  - **Step 1**: Body Location selection (e.g., hands/feet, scalp, flexural creases, face/neck, torso).
  - **Step 2**: Visual & Tactile Symptom selection (e.g., fluid-filled blisters, coin-shaped scaling, intense redness, dry leathery skin).
  - **Step 3**: Onset & Trigger factors (e.g., contact with harsh soap, seasonal changes, stress, nickel exposure).
- The quiz MUST output a ranked shortlist of matching eczema types with clear disclaimers that the tool is for educational guidance only and not a clinical diagnosis.

### FR-03: Treatment & Management Guide
- The system MUST present clear, categorized medical and daily self-care information:
  - **Topical & Systemic Treatments**: Overview of prescription options (topical corticosteroids, topical calcineurin inhibitors, JAK inhibitors, biologics, phototherapy).
  - **Over-the-Counter & Daily Skincare**: Guidance on moisturizers, bath oils, gentle cleansers, wet wrap therapy, and barrier restoration creams.
  - **Trigger Management & Lifestyle**: Strategies for identifying and avoiding common flare triggers (allergens, climate changes, fabrics, emotional stress, harsh soaps).
- Treatment entries MUST include clear disclaimers encouraging professional medical consultation.

### FR-04: Stigma Reduction & Interactive Myth vs. Fact Hub
- The system MUST feature a dedicated section tackling social stigma and public misconceptions surrounding eczema.
- The section MUST contain a curated core set of interactive Myth vs. Fact components covering key stigma topics:
  - Contagion & Transmission (debunking fears that eczema is contagious)
  - Hygiene & Cleanliness (debunking myths connecting eczema to poor hygiene)
  - Severity & Impact (highlighting psychological and physical impacts beyond "just dry skin")
  - Diet & Cure Myths (clarifying non-miracle cure realities and allergen facts)
- Each Myth card MUST feature an interactive *"I've heard this myth!"* counter allowing users to register agreement/experience.
- The section MUST include a *"Suggest a Myth"* form allowing users to submit new misconceptions for review.

### FR-05: One-Click Digital Sharing & Printable QR Code Sticker Generator
- The system MUST allow users to export or share individual Myth vs. Fact cards and awareness insights via:
  - **Digital Share**: Web Share API, clipboard link copy, and downloadable social media PNG image cards.
  - **Physical Sticker Export**: Built-in QR Code Sticker Generator that produces vector/PNG printable badge designs with call-to-action text (e.g. *"Scan to bust Eczema Myths! 💙"*) linking directly to the specific Myth vs. Fact topic URL, designed for printing on stickers (for tumblers, laptops, water bottles).

### FR-06: Search & Tag Filtering System
- The system MUST provide an instant search input allowing full-text matching across article titles, body text, symptoms, and myth topics.
- The system MUST support multi-tag filtering (e.g., filter by "Childhood Eczema", "Facial Eczema", "Topical Care", "Social Stigma").

### FR-07: Accessibility & Reader-Friendly Layout
- The system MUST offer a clean, high-contrast visual design, readable typography, and structured headings optimized for accessibility across mobile and desktop devices.

---

## 3. Key Entities & Data Model (Conceptual)

- **Eczema Type**: Represents a specific variant of eczema (ID, name, summary, symptoms list, triggers list, common locations, medical overview).
- **Symptom Quiz State**: Represents transient quiz choices (selected body parts, symptom tags, trigger options, calculated match scores).
- **Treatment Entry**: Represents a treatment modality (ID, title, category [Prescription | OTC | Daily Care | Lifestyle], description, usage guidance, precautions, medical disclaimer).
- **Myth vs. Fact Card**: Represents an educational stigma-busting card (ID, topic category, myth statement, fact statement, detailed explanation, heard_count, share count, shareable graphics payload, canonical URL for QR redirection).
- **Community Myth Submission**: Represents a user-submitted myth suggestion (ID, submitted_text, context, timestamp, status [Pending | Approved]).
- **QR Sticker Configuration**: Represents printable QR sticker settings (target myth URL, sticker size/badge frame, custom CTA label, foreground/background color themes).
- **Tag / Category**: Taxonomy entity used to cross-reference types, treatments, and myths (ID, label, slug, type).

---

## 4. Success Criteria

- **Information Accessibility**: Users can locate any eczema type or treatment guide within 3 clicks, 1 search query, or 1 quiz completion from the homepage.
- **Symptom Helper Efficiency**: Users can complete the 3-step Symptom Helper quiz and view matching results in under 45 seconds.
- **Physical QR Sticker Usability**: Generated QR stickers scan accurately from mobile camera apps at physical sizes as small as 1.5 inches x 1.5 inches (ideal for tumblers/laptops).
- **Stigma Reduction Engagement**: At least 80% of surveyed users report gaining actionable knowledge to explain eczema to non-patients after exploring the Myth vs. Fact hub.
- **Sharing Usability**: Generating a digital awareness card or QR sticker image takes under 5 seconds on both mobile and desktop.
- **User Comprehension**: Non-medical readers can successfully distinguish between 5 distinct eczema types and understand key treatment categories without requiring medical background.
- **Performance**: Wiki pages and search results render in under 1 second on standard mobile web connections.

---

## 5. Assumptions & Dependencies

- **Assumptions**:
  - Medical content provided in the wiki and quiz serves strictly as educational information and does not constitute formal medical advice.
  - QR codes redirect to public web URLs hosted on the wiki platform so any standard smartphone camera can open them instantly.
- **Dependencies**:
  - Validated dermatological medical literature and public health guidelines (e.g., National Eczema Association specs) for medical accuracy.
  - Client-side QR code generator utility (e.g., standard canvas QR library) for generating sticker graphics without backend overhead.
