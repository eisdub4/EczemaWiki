import test from 'node:test';
import assert from 'node:assert/strict';
import { renderQRStickerCanvas, downloadCanvasAsPNG } from '../src/utils/qr-export.js';

test('QR Code Canvas Export Utility', async (t) => {
  await t.test('handles null canvas gracefully without throwing', async () => {
    assert.doesNotThrow(() => {
      renderQRStickerCanvas(null);
      downloadCanvasAsPNG(null);
    });
  });

  await t.test('configures canvas size and draws badge graphics', async () => {
    const drawnOperations = [];
    const mockContext = {
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      font: '',
      textAlign: '',
      fillRect(...args) { drawnOperations.push({ op: 'fillRect', args }); },
      strokeRect(...args) { drawnOperations.push({ op: 'strokeRect', args }); },
      beginPath() { drawnOperations.push({ op: 'beginPath' }); },
      arc(...args) { drawnOperations.push({ op: 'arc', args }); },
      stroke() { drawnOperations.push({ op: 'stroke' }); },
      fillText(...args) { drawnOperations.push({ op: 'fillText', args }); },
      moveTo(...args) { drawnOperations.push({ op: 'moveTo', args }); },
      arcTo(...args) { drawnOperations.push({ op: 'arcTo', args }); }
    };

    const mockCanvas = {
      width: 0,
      height: 0,
      getContext(type) {
        if (type === '2d') return mockContext;
        return null;
      }
    };

    await renderQRStickerCanvas(mockCanvas, {
      url: 'https://eczemawiki.org/myth/myth-contagious',
      ctaText: 'Scan to Learn',
      themeColor: '#0D9488',
      badgeShape: 'circle'
    });

    assert.equal(mockCanvas.width, 300);
    assert.equal(mockCanvas.height, 300);
    assert.ok(drawnOperations.some(op => op.op === 'arc'));
    assert.ok(drawnOperations.some(op => op.op === 'fillText' && op.args[0] === 'EczemaWiki Awareness'));
  });
});
