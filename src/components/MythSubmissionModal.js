import { saveCommunitySubmission } from '../utils/storage.js';

export function renderMythSubmissionModal() {
  return `
    <div class="modal-overlay" id="submission-modal-overlay">
      <div class="modal-content" role="dialog" aria-labelledby="sub-modal-title">
        <button class="modal-close" id="sub-modal-close" aria-label="Close modal">&times;</button>

        <span class="badge badge-purple">Community Input</span>
        <h2 class="section-title" id="sub-modal-title" style="text-align: left; margin-bottom: 0.5rem;">Suggest a Myth</h2>
        <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">Have you heard a frustrating misconception or myth about eczema from friends, family, or online? Submit it here so we can address it in the wiki!</p>

        <form id="myth-submit-form">
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">What is the myth or misconception? *</label>
            <textarea 
              id="sub-myth-text" 
              required 
              rows="3" 
              style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--neutral-300); font-family: inherit;"
              placeholder="e.g. Someone told me that drinking salt water cures eczema overnight..."
            ></textarea>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem;">Where did you hear this? (Optional context)</label>
            <input 
              type="text" 
              id="sub-context-text" 
              style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--neutral-300); font-family: inherit;"
              placeholder="e.g. Social media comment, school peer, relative..."
            />
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem;">
            <button type="button" class="btn-secondary" id="sub-modal-cancel">Cancel</button>
            <button type="submit" class="btn-primary">Submit Myth ✨</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function bindMythSubmissionEvents(onSuccess, onClose) {
  const overlay = document.getElementById('submission-modal-overlay');
  const closeBtn = document.getElementById('sub-modal-close');
  const cancelBtn = document.getElementById('sub-modal-cancel');
  const form = document.getElementById('myth-submit-form');

  if (closeBtn) closeBtn.addEventListener('click', onClose);
  if (cancelBtn) cancelBtn.addEventListener('click', onClose);

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) onClose();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const mythText = document.getElementById('sub-myth-text').value.trim();
      const contextText = document.getElementById('sub-context-text').value.trim();

      if (mythText) {
        saveCommunitySubmission({ submittedMyth: mythText, contextNote: contextText });
        onSuccess();
      }
    });
  }
}
