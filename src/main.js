import { renderNavbar, bindNavbarEvents } from './components/Navbar.js';
import { renderEczemaTypes, bindEczemaTypesEvents } from './components/EczemaTypes.js';
import { renderTypeModal, bindTypeModalEvents } from './components/TypeModal.js';
import { renderSymptomQuiz, bindSymptomQuizEvents } from './components/SymptomQuiz.js';
import { renderTreatments, bindTreatmentsEvents } from './components/Treatments.js';
import { renderMythCards, bindMythCardsEvents } from './components/MythCards.js';
import { renderMythSubmissionModal, bindMythSubmissionEvents } from './components/MythSubmissionModal.js';
import { renderQRStickerGenerator, bindQRStickerEvents } from './components/QRSticker.js';
import { renderSearchResults, bindSearchResultsEvents } from './components/SearchResults.js';
import { ECZEMA_TYPES } from './data/eczema-db.js';

let state = {
  activeTab: 'types',
  selectedTypeModal: null,
  isSuggestModalOpen: false,
  searchQuery: ''
};

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const isSearchActive = Boolean(state.searchQuery.trim());

  app.innerHTML = `
    ${renderNavbar(state.activeTab, handleTabChange, handleSearchInput)}

    <!-- Hero Banner -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Empowering Knowledge. <span>Reducing Stigma.</span></h1>
        <p class="hero-subtitle">Discover validated clinical guidance on eczema types, daily skincare treatments, and shareable myth-busting QR stickers for tumblers & laptops.</p>
        
        <div class="hero-actions">
          <button class="btn-primary" id="hero-quiz-btn">🧩 Take Symptom Quiz</button>
          <button class="btn-secondary" id="hero-stigma-btn">💙 Bust Myths & Print Stickers</button>
        </div>
      </div>
    </section>

    <!-- Main View Content -->
    <main style="flex: 1; padding-bottom: 4rem;">
      ${isSearchActive ? renderSearchResults(state.searchQuery) : renderActiveTabContent(state.activeTab)}
    </main>

    <!-- Footer -->
    <footer style="background: var(--neutral-900); color: var(--neutral-300); padding: 2.5rem 0; text-align: center; font-size: 0.9rem;">
      <div class="container">
        <p style="margin-bottom: 0.5rem; font-weight: 600;">🌿 EczemaWiki — Open Educational Knowledge & Stigma Reduction Hub</p>
        <p style="color: var(--neutral-600); max-width: 600px; margin: 0 auto;">Disclaimer: Information provided is for educational and stigma-reduction purposes only and does not substitute professional medical advice. Always consult a board-certified dermatologist.</p>
      </div>
    </footer>

    <!-- Modals -->
    ${state.selectedTypeModal ? renderTypeModal(state.selectedTypeModal) : ''}
    ${state.isSuggestModalOpen ? renderMythSubmissionModal() : ''}
  `;

  bindEvents();
}

function renderActiveTabContent(tab) {
  switch (tab) {
    case 'quiz': return renderSymptomQuiz();
    case 'types': return renderEczemaTypes();
    case 'treatments': return renderTreatments();
    case 'myths': return renderMythCards();
    case 'qr': return renderQRStickerGenerator();
    default: return renderEczemaTypes();
  }
}

function bindEvents() {
  bindNavbarEvents(handleTabChange, handleSearchInput);

  const heroQuizBtn = document.getElementById('hero-quiz-btn');
  if (heroQuizBtn) heroQuizBtn.addEventListener('click', () => handleTabChange('quiz'));

  const heroStigmaBtn = document.getElementById('hero-stigma-btn');
  if (heroStigmaBtn) heroStigmaBtn.addEventListener('click', () => handleTabChange('myths'));

  if (state.searchQuery.trim()) {
    bindSearchResultsEvents((typeId) => {
      const found = ECZEMA_TYPES.find(t => t.id === typeId);
      if (found) {
        state.selectedTypeModal = found;
        renderApp();
      }
    });
  } else {
    switch (state.activeTab) {
      case 'quiz':
        bindSymptomQuizEvents(() => renderApp());
        break;
      case 'types':
        bindEczemaTypesEvents((type) => {
          state.selectedTypeModal = type;
          renderApp();
        });
        break;
      case 'treatments':
        bindTreatmentsEvents(() => renderApp());
        break;
      case 'myths':
        bindMythCardsEvents(
          () => renderApp(),
          () => {
            state.isSuggestModalOpen = true;
            renderApp();
          }
        );
        break;
      case 'qr':
        bindQRStickerEvents();
        break;
    }
  }

  if (state.selectedTypeModal) {
    bindTypeModalEvents(() => {
      state.selectedTypeModal = null;
      renderApp();
    });
  }

  if (state.isSuggestModalOpen) {
    bindMythSubmissionEvents(
      () => {
        alert('Thank you! Your myth suggestion has been saved for community review.');
        state.isSuggestModalOpen = false;
        renderApp();
      },
      () => {
        state.isSuggestModalOpen = false;
        renderApp();
      }
    );
  }
}

function handleTabChange(tab) {
  state.activeTab = tab;
  state.searchQuery = '';
  renderApp();
}

function handleSearchInput(query) {
  state.searchQuery = query;
  renderApp();
}

// Initial Launch
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
