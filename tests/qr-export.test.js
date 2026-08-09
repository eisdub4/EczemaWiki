import test from 'node:test';
import assert from 'node:assert/strict';

const { renderQRStickerCanvas } = await import('../src/utils/qr-export.js');

test('QR Code Canvas Export Utility', async (t) => {
  await t.test('handles null canvas gracefully without throwing', async () => {
    await assert.doesNotReject(async () => {
      await renderQRStickerCanvas(null);
    });
  });

  await t.test('configures canvas size and draws badge graphics', async () => {
    const fillRectCalls = [];
    let strokeCalls = 0;
    const fillTextCalls = [];

    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: () => ({
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        font: '',
        textAlign: '',
        fillRect: (...args) => fillRectCalls.push(args),
        stroke: () => { strokeCalls++; },
        beginPath: () => {},
        arc: () => {},
        roundRect: () => {},
        moveTo: () => {},
        arcTo: () => {},
        fillText: (...args) => fillTextCalls.push(args),
        drawImage: () => {}
      })
    };

    await renderQRStickerCanvas(mockCanvas, {
      url: 'https://eczemawiki.org/myth/myth-contagious',
      ctaText: 'Scan to bust Eczema Myths!',
      themeColor: '#0D9488',
      badgeShape: 'rounded'
    });

    assert.equal(mockCanvas.width, 300);
    assert.equal(mockCanvas.height, 300);
    assert.ok(fillRectCalls.length >= 2, 'Should fill background and banner');
    assert.ok(fillTextCalls.some(call => call[0] === 'EczemaWiki Awareness'), 'Should draw header text');
  });
});
