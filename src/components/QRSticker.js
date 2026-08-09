import { MYTH_CARDS } from '../data/eczema-db.js';
import { renderQRStickerCanvas, downloadCanvasAsPNG } from '../utils/qr-export.js';

let qrOptions = {
  selectedMythId: MYTH_CARDS[0].id,
  ctaText: 'Scan to bust Eczema Myths! 💙',
  themeColor: '#0D9488',
  badgeShape: 'rounded'
};

export function renderQRStickerGenerator() {
  const currentMyth = MYTH_CARDS.find(m => m.id === qrOptions.selectedMythId) || MYTH_CARDS[0];

  return `
    <section class="container" style="padding-top: 2rem; max-width: 900px;">
      <div class="section-header">
        <span class="badge badge-purple">Physical Awareness Tool</span>
        <h2 class="section-title">Printable QR Code Sticker Generator</h2>
        <p class="section-desc">Create custom, high-resolution QR code stickers to print and attach to your water tumblers, laptops, water bottles, or notebooks so peers can scan & learn!</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; align-items: start;">
        
        <!-- Controls Column -->
        <div class="card" style="padding: 1.75rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Sticker Customizer</h3>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem;">1. Select Myth Topic for QR Redirection</label>
            <select id="qr-myth-select" style="width: 100%; padding: 0.65rem; border-radius: var(--radius-md); border: 1px solid var(--neutral-300); font-family: inherit;">
              ${MYTH_CARDS.map(m => `
                <option value="${m.id}" ${m.id === qrOptions.selectedMythId ? 'selected' : ''}>
                  ${m.mythStatement.substring(0, 45)}...
                </option>
              `).join('')}
            </select>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem;">2. Custom Sticker Badge Label</label>
            <input 
              type="text" 
              id="qr-cta-text" 
              value="${qrOptions.ctaText}"
              maxlength="45"
              style="width: 100%; padding: 0.65rem; border-radius: var(--radius-md); border: 1px solid var(--neutral-300); font-family: inherit;"
            />
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem;">3. Badge Shape</label>
            <div style="display: flex; gap: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="qr-shape" value="rounded" ${qrOptions.badgeShape === 'rounded' ? 'checked' : ''} /> Rounded Badge
              </label>
              <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer;">
                <input type="radio" name="qr-shape" value="circle" ${qrOptions.badgeShape === 'circle' ? 'checked' : ''} /> Circle Badge
              </label>
            </div>
          </div>

          <div style="margin-bottom: 1.75rem;">
            <label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem;">4. Theme Accent Color</label>
            <div style="display: flex; gap: 0.75rem;">
              <button class="qr-color-btn" data-color="#0D9488" style="width: 32px; height: 32px; border-radius: 50%; background: #0D9488; border: 2px solid ${qrOptions.themeColor === '#0D9488' ? '#0F172A' : 'transparent'};"></button>
              <button class="qr-color-btn" data-color="#0284C7" style="width: 32px; height: 32px; border-radius: 50%; background: #0284C7; border: 2px solid ${qrOptions.themeColor === '#0284C7' ? '#0F172A' : 'transparent'};"></button>
              <button class="qr-color-btn" data-color="#8B5CF6" style="width: 32px; height: 32px; border-radius: 50%; background: #8B5CF6; border: 2px solid ${qrOptions.themeColor === '#8B5CF6' ? '#0F172A' : 'transparent'};"></button>
              <button class="qr-color-btn" data-color="#F43F5E" style="width: 32px; height: 32px; border-radius: 50%; background: #F43F5E; border: 2px solid ${qrOptions.themeColor === '#F43F5E' ? '#0F172A' : 'transparent'};"></button>
            </div>
          </div>

          <button class="btn-primary" id="qr-download-btn" style="width: 100%; justify-content: center;">
            📥 Download Printable Sticker PNG
          </button>
        </div>

        <!-- Preview Column -->
        <div style="text-align: center;">
          <div style="background: white; padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--neutral-200); box-shadow: var(--shadow-md); display: inline-block;">
            <h4 style="font-size: 0.95rem; color: var(--neutral-600); margin-bottom: 1rem;">Live High-DPI Sticker Preview (300 DPI)</h4>
            <canvas id="qr-preview-canvas" style="max-width: 280px; height: auto; box-shadow: var(--shadow-sm); border-radius: var(--radius-md);"></canvas>
            <p style="font-size: 0.8rem; color: var(--neutral-600); margin-top: 1rem;">Format: 1.5" x 1.5" Printable Badge (Ideal for tumblers & laptops)</p>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function bindQRStickerEvents() {
  const canvas = document.getElementById('qr-preview-canvas');

  async function updatePreview() {
    if (!canvas) return;
    const currentMyth = MYTH_CARDS.find(m => m.id === qrOptions.selectedMythId) || MYTH_CARDS[0];
    await renderQRStickerCanvas(canvas, {
      url: currentMyth.canonicalUrl,
      ctaText: qrOptions.ctaText,
      themeColor: qrOptions.themeColor,
      badgeShape: qrOptions.badgeShape
    });
  }

  // Initial preview render
  updatePreview();

  const select = document.getElementById('qr-myth-select');
  if (select) {
    select.addEventListener('change', (e) => {
      qrOptions.selectedMythId = e.target.value;
      updatePreview();
    });
  }

  const ctaInput = document.getElementById('qr-cta-input');
  if (ctaInput) {
    ctaInput.addEventListener('input', (e) => {
      qrOptions.ctaText = e.target.value;
      updatePreview();
    });
  }

  const shapeRadios = document.querySelectorAll('input[name="qr-badge-shape"]');
  shapeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      qrOptions.badgeShape = e.target.value;
      updatePreview();
    });
  });

  const colorBtns = document.querySelectorAll('.qr-color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      qrOptions.themeColor = btn.getAttribute('data-color');
      colorBtns.forEach(b => {
        b.style.borderColor = b.getAttribute('data-color') === qrOptions.themeColor ? '#0F172A' : 'transparent';
      });
      updatePreview();
    });
  });

  const downloadBtn = document.getElementById('qr-download-btn');
  if (downloadBtn && canvas) {
    downloadBtn.addEventListener('click', async () => {
      await updatePreview();
      downloadCanvasAsPNG(canvas, `eczema-awareness-sticker-${qrOptions.selectedMythId}.png`);
    });
  }
}

