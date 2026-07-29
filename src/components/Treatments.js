import { TREATMENTS } from '../data/eczema-db.js';

let activeCategory = 'all';

export function renderTreatments() {
  const filtered = activeCategory === 'all' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === activeCategory);

  return `
    <section class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <h2 class="section-title">Treatment & Care Guide</h2>
        <p class="section-desc">Explore how people usually manage and treat eczema through clinical therapies, daily skincare routines, and trigger avoidance.</p>
      </div>

      <!-- Category Filter Tabs -->
      <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
        <button class="nav-btn ${activeCategory === 'all' ? 'active' : ''}" data-treatment-cat="all">All Category Guides</button>
        <button class="nav-btn ${activeCategory === 'prescription' ? 'active' : ''}" data-treatment-cat="prescription"> Prescription Treatments</button>
        <button class="nav-btn ${activeCategory === 'otc-skincare' ? 'active' : ''}" data-treatment-cat="otc-skincare">🧴 Daily Emollients & OTC</button>
        <button class="nav-btn ${activeCategory === 'home-routine' ? 'active' : ''}" data-treatment-cat="home-routine">🛀 Bathing & Soothing Routines</button>
        <button class="nav-btn ${activeCategory === 'lifestyle-triggers' ? 'active' : ''}" data-treatment-cat="lifestyle-triggers">🛡️ Trigger Avoidance</button>
      </div>

      <div class="grid-3">
        ${filtered.map(t => `
          <div class="card">
            <div>
              <span class="badge badge-${getCategoryBadgeColor(t.category)}">${getCategoryLabel(t.category)}</span>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">${t.title}</h3>
              <p style="color: var(--neutral-600); font-size: 0.95rem; margin-bottom: 1.25rem;">${t.summary}</p>
            </div>

            <div style="margin-bottom: 1rem; background: var(--neutral-50); padding: 0.75rem 1rem; border-radius: var(--radius-md);">
              <strong style="color: var(--primary-700); font-size: 0.85rem;">HOW IT WORKS:</strong>
              <p style="font-size: 0.9rem; color: var(--neutral-700);">${t.mechanism}</p>
            </div>

            <div style="margin-top: auto; border-top: 1px solid var(--neutral-200); padding-top: 1rem;">
              <h4 style="font-size: 0.85rem; color: var(--neutral-600); margin-bottom: 0.5rem;">SAFETY PRECAUTIONS:</h4>
              <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: var(--neutral-700); margin-bottom: 1rem;">
                ${t.precautions.map(p => `<li>${p}</li>`).join('')}
              </ul>
              
              <div style="font-size: 0.75rem; color: var(--neutral-600); font-style: italic; background: #FFFBEB; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);">
                ⚠️ ${t.disclaimer}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function getCategoryBadgeColor(category) {
  switch (category) {
    case 'prescription': return 'coral';
    case 'otc-skincare': return 'teal';
    case 'home-routine': return 'blue';
    case 'lifestyle-triggers': return 'amber';
    default: return 'teal';
  }
}

function getCategoryLabel(category) {
  switch (category) {
    case 'prescription': return 'Prescription Therapy';
    case 'otc-skincare': return 'OTC Barrier Skincare';
    case 'home-routine': return 'Bathing & Soothing Routine';
    case 'lifestyle-triggers': return 'Lifestyle & Triggers';
    default: return 'Treatment';
  }
}

export function bindTreatmentsEvents(onRender) {
  const btns = document.querySelectorAll('[data-treatment-cat]');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-treatment-cat');
      onRender();
    });
  });
}
