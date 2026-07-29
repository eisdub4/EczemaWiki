import { ECZEMA_TYPES } from '../data/eczema-db.js';

export function renderEczemaTypes(types = ECZEMA_TYPES) {
  return `
    <section class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <h2 class="section-title">Eczema Types Directory</h2>
        <p class="section-desc">Learn about the distinct clinical variations, symptoms, and body regions affected by different types of eczema.</p>
      </div>

      <div class="grid-3">
        ${types.map(type => `
          <div class="card">
            <div>
              <span class="badge badge-${type.badgeColor}">${type.latinName || 'Clinical Variant'}</span>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">${type.title}</h3>
              <p style="color: var(--neutral-600); font-size: 0.95rem; margin-bottom: 1.25rem;">${type.summary}</p>
            </div>

            <div style="margin-top: auto; border-top: 1px solid var(--neutral-200); padding-top: 1rem;">
              <div style="font-size: 0.85rem; color: var(--neutral-600); margin-bottom: 0.75rem;">
                <strong>Key Locations:</strong> ${type.commonLocations.slice(0, 2).join(', ')}...
              </div>
              <button class="btn-secondary view-type-btn" data-type-id="${type.id}" style="width: 100%; text-align: center;">
                View Full Details & Triggers →
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

export function bindEczemaTypesEvents(onSelectType) {
  const btns = document.querySelectorAll('.view-type-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const typeId = btn.getAttribute('data-type-id');
      const found = ECZEMA_TYPES.find(t => t.id === typeId);
      if (found) onSelectType(found);
    });
  });
}
