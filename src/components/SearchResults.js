import { performGlobalSearch } from '../utils/search.js';

export function renderSearchResults(query, onSelectType) {
  const results = performGlobalSearch(query);
  const totalMatches = results.types.length + results.treatments.length + results.myths.length;

  return `
    <section class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <h2 class="section-title">Search Results for "${query}"</h2>
        <p class="section-desc">Found ${totalMatches} matching topics across Eczema Types, Treatments, and Myth Cards.</p>
      </div>

      ${totalMatches === 0 ? `
        <div class="card" style="text-align: center; padding: 3rem;">
          <h3 style="color: var(--neutral-600); margin-bottom: 0.5rem;">No exact matching topics found</h3>
          <p style="color: var(--neutral-600);">Try searching for terms like "hands", "contagious", "steroids", "blisters", or "infant".</p>
        </div>
      ` : ''}

      ${results.types.length > 0 ? `
        <div style="margin-bottom: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-700); margin-bottom: 1rem;">📖 Eczema Types (${results.types.length})</h3>
          <div class="grid-3">
            ${results.types.map(t => `
              <div class="card">
                <span class="badge badge-${t.badgeColor}">${t.latinName || 'Type'}</span>
                <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${t.title}</h4>
                <p style="font-size: 0.9rem; color: var(--neutral-600); margin-bottom: 1rem;">${t.summary}</p>
                <button class="btn-secondary search-view-type-btn" data-type-id="${t.id}">View Profile →</button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${results.treatments.length > 0 ? `
        <div style="margin-bottom: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-700); margin-bottom: 1rem;">💊 Treatment Guides (${results.treatments.length})</h3>
          <div class="grid-3">
            ${results.treatments.map(t => `
              <div class="card">
                <span class="badge badge-teal">${t.category}</span>
                <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${t.title}</h4>
                <p style="font-size: 0.9rem; color: var(--neutral-600);">${t.summary}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${results.myths.length > 0 ? `
        <div style="margin-bottom: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-700); margin-bottom: 1rem;">💙 Myth vs. Fact Cards (${results.myths.length})</h3>
          <div class="grid-3">
            ${results.myths.map(m => `
              <div class="card">
                <span class="badge badge-coral">Myth Busted</span>
                <h4 style="font-size: 1.1rem; color: #9F1239; margin-bottom: 0.5rem;">${m.mythStatement}</h4>
                <p style="font-size: 0.9rem; color: var(--primary-900); font-weight: 600;">${m.factStatement}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </section>
  `;
}

export function bindSearchResultsEvents(onSelectType) {
  const btns = document.querySelectorAll('.search-view-type-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const typeId = btn.getAttribute('data-type-id');
      if (typeId && onSelectType) onSelectType(typeId);
    });
  });
}
