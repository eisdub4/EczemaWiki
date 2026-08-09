export function renderQRStickerCanvas(canvas, options = {}) {
  if (!canvas) return;

  const {
    url = 'https://eczemawiki.org/myth/myth-contagious',
    ctaText = 'Scan to bust Eczema Myths! 💙',
    themeColor = '#0D9488',
    badgeShape = 'rounded'
  } = options;

  const ctx = canvas.getContext('2d');
  const size = 300; // 300x300 high resolution canvas for printing

  canvas.width = size;
  canvas.height = size;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  // Outer Border / Badge Frame
  ctx.lineWidth = 10;
  ctx.strokeStyle = themeColor;

  if (badgeShape === 'circle') {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Rounded square badge
    const r = 24;
    ctx.beginPath();
    ctx.roundRect(8, 8, size - 16, size - 16, r);
    ctx.stroke();
  }

  // Header Banner
  ctx.fillStyle = themeColor;
  ctx.fillRect(15, 15, size - 30, 42);

  // Title Text inside Banner
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EczemaWiki Awareness', size / 2, 42);

  // Render QR Code onto temp canvas via qrcode library
  if (window.QRCode) {
    const tempContainer = document.createElement('div');
    new window.QRCode(tempContainer, {
      text: url,
      width: 150,
      height: 150,
      colorDark: "#0F172A",
      colorLight: "#FFFFFF",
      correctLevel: window.QRCode.CorrectLevel ? window.QRCode.CorrectLevel.H : 2
    });

    setTimeout(() => {
      const qrImg = tempContainer.querySelector('img') || tempContainer.querySelector('canvas');
      if (qrImg) {
        ctx.drawImage(qrImg, (size - 150) / 2, 70, 150, 150);
        drawFooterCTA(ctx, size, ctaText, themeColor);
      } else {
        drawFallbackQR(ctx, size, ctaText, themeColor);
      }
    }, 100);
  } else {
    drawFallbackQR(ctx, size, ctaText, themeColor);
  }
}

function drawFooterCTA(ctx, size, ctaText, themeColor) {
  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';

  // Wrap CTA text if long
  const words = ctaText.split(' ');
  if (words.length > 4) {
    ctx.fillText(words.slice(0, 4).join(' '), size / 2, 245);
    ctx.fillText(words.slice(4).join(' '), size / 2, 265);
  } else {
    ctx.fillText(ctaText, size / 2, 255);
  }
}

function drawFallbackQR(ctx, size, ctaText, themeColor) {
  // Simple visual QR placeholder if qrcode script not loaded
  ctx.fillStyle = '#0F172A';
  ctx.fillRect((size - 140) / 2, 75, 140, 140);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('[QR CODE MATRIX]', size / 2, 145);
  drawFooterCTA(ctx, size, ctaText, themeColor);
}

export function downloadCanvasAsPNG(canvas, filename = 'eczema-awareness-sticker.png') {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}
