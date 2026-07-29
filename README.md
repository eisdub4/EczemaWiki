# EczemaWiki

An interactive, evidence-backed web application providing accessible knowledge on eczema types, evidence-based treatments, myth-busting, symptom checking, and public awareness tools.

## Features

- 🩺 **Eczema Types Guide**: Detailed breakdowns of distinct eczema types (Atopic Dermatitis, Contact Dermatitis, Dyshidrotic Eczema, Seborrheic Dermatitis, etc.) including symptoms, causes, and care recommendations.
- 💊 **Evidence-Based Treatments**: Clear guidance on medical treatments, topical therapies, skin barrier care, and lifestyle management.
- 💡 **Myth Busting & Stigma Reduction**: Community-driven myth cards with upvoting and community submission capabilities.
- 🩺 **Interactive Symptom Quiz**: Self-assessment tool guiding users to potential eczema types based on selected symptoms.
- 🖨️ **QR Awareness Sticker Generator**: Customizable, printable QR code awareness stickers for public education.
- 🔍 **Universal Search & Fast Navigation**: Search across myths, treatments, and types with real-time filtered results.

## Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), CSS3
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Dependencies**: [`qrcode`](https://www.npmjs.com/package/qrcode)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
EczemaWiki/
├── index.html            # Main HTML entry point
├── src/
│   ├── components/       # UI modules (Navbar, EczemaTypes, MythCards, QRSticker, SymptomQuiz, etc.)
│   ├── data/             # Educational datasets (types, treatments, myths, quiz questions)
│   ├── styles/           # CSS design system & component styles
│   ├── utils/            # Storage and helper utilities
│   └── main.js           # Application entry point & state management
├── package.json
└── vite.config.js
```
