export function renderTypeModal(type) {
  if (!type) return '';

  return `
    <div class="modal-overlay" id="type-modal-overlay">
      <div class="modal-content" role="dialog" aria-labelledby="modal-type-title">
        <button class="modal-close" id="modal-close-btn" aria-label="Close modal">&times;</button>
        
        <span class="badge badge-${type.badgeColor}">${type.latinName || 'Clinical Variant'}</span>
        <h2 class="section-title" id="modal-type-title" style="text-align: left; margin-bottom: 0.5rem;">${type.title}</h2>
        <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">${type.summary}</p>
        
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--primary-700); margin-bottom: 0.4rem;">🔍 Key Symptoms</h4>
          <ul style="padding-left: 1.25rem; color: var(--neutral-700);">
            ${type.symptoms.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--primary-700); margin-bottom: 0.4rem;">📍 Common Affected Body Regions</h4>
          <p style="color: var(--neutral-700);">${type.commonLocations.join(' • ')}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--primary-700); margin-bottom: 0.4rem;">⚡ Typical Flare Triggers</h4>
          <p style="color: var(--neutral-700);">${type.triggers.join(' • ')}</p>
        </div>

        <div style="margin-bottom: 1.25rem; background: var(--neutral-100); padding: 0.75rem 1rem; border-radius: var(--radius-md);">
          <strong>Typical Onset Age:</strong> ${type.onsetAge}
        </div>

        <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 1rem; border-radius: var(--radius-sm); margin-top: 1.5rem;">
          <h5 style="color: #92400E; margin-bottom: 0.25rem;">🩺 Medical Consultation Guidance</h5>
          <p style="font-size: 0.9rem; color: #78350F;">${type.whenToSeeDoctor}</p>
        </div>
      </div>
    </div>
  `;
}

export function bindTypeModalEvents(onClose) {
  const overlay = document.getElementById('type-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', onClose);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) onClose();
    });
  }
}
