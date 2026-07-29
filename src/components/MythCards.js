import { MYTH_CARDS } from '../data/eczema-db.js';
import { getHeardVotes, incrementHeardVote, canUserUpvote } from '../utils/storage.js';

let flippedCards = {};

export function renderMythCards() {
  const votes = getHeardVotes();

  return `
    <section class="container" style="padding-top: 2rem;">
      <div class="section-header">
        <h2 class="section-title">Stigma Reduction & Myth/Fact Hub</h2>
        <p class="section-desc">Demystifying common misconceptions about eczema. Click any card to flip and discover clinical facts!</p>
        
        <div style="margin-top: 1.5rem;">
          <button class="btn-primary" id="open-suggest-myth-btn">
            ✨ Suggest a Myth You've Heard
          </button>
        </div>
      </div>

      <div class="grid-3" style="gap: 2rem;">
        ${MYTH_CARDS.map(myth => {
          const isFlipped = Boolean(flippedCards[myth.id]);
          const currentVoteCount = (myth.heardCount || 0) + (votes[myth.id] || 0);
          const isUpvotable = canUserUpvote(myth.id);

          const voteButtonHtml = isUpvotable
            ? `<button class="btn-heard-vote" data-myth-id="${myth.id}" style="color: var(--neutral-600); font-weight: 600;" aria-label="I've heard this myth, click to upvote. Current count: ${currentVoteCount}">
                 🙋‍♂️ I've heard this! (${currentVoteCount})
               </button>`
            : `<button class="btn-heard-vote" data-myth-id="${myth.id}" disabled aria-disabled="true" title="You have already upvoted this myth. You can vote again after 24 hours." style="color: var(--neutral-600); font-weight: 600;" aria-label="Voted. You have already upvoted this myth. You can vote again after 24 hours. Current count: ${currentVoteCount}">
                 Voted ✓ (${currentVoteCount})
               </button>`;

          return `
            <div class="flip-card-container ${isFlipped ? 'flipped' : ''}" data-myth-id="${myth.id}">
              <div class="flip-card-inner">
                
                <!-- Front Side: Myth -->
                <div class="flip-card-front">
                  <div>
                    <span class="badge badge-coral">Misconception</span>
                    <h3 style="font-size: 1.25rem; color: #9F1239; margin-bottom: 0.75rem;">${myth.mythStatement}</h3>
                  </div>

                  <div>
                    <button class="btn-secondary flip-toggle-btn" data-myth-id="${myth.id}" style="width: 100%; margin-bottom: 0.75rem;">
                      🔄 Flip to Reveal Clinical Fact
                    </button>

                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                      ${voteButtonHtml}
                      <button class="btn-share-card" data-myth-id="${myth.id}" style="color: var(--primary-700); font-weight: 600;">
                        📤 Share Fact
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Back Side: Verified Fact -->
                <div class="flip-card-back">
                  <div>
                    <span class="badge badge-teal">Verified Fact</span>
                    <h3 style="font-size: 1.2rem; color: var(--primary-900); margin-bottom: 0.5rem;">${myth.factStatement}</h3>
                    <p style="font-size: 0.9rem; color: var(--neutral-700); line-height: 1.5;">${myth.explanation}</p>
                  </div>

                  <div>
                    <button class="btn-secondary flip-toggle-btn" data-myth-id="${myth.id}" style="width: 100%; background: white;">
                      ↩️ Flip Back
                    </button>
                  </div>
                </div>

              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

export function bindMythCardsEvents(onRender, onOpenSuggestModal) {
  const flipBtns = document.querySelectorAll('.flip-toggle-btn');
  flipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mythId = btn.getAttribute('data-myth-id');
      if (mythId) {
        flippedCards[mythId] = !flippedCards[mythId];
        onRender();
      }
    });
  });

  const voteBtns = document.querySelectorAll('.btn-heard-vote');
  voteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.disabled) return;
      const mythId = btn.getAttribute('data-myth-id');
      if (mythId) {
        const result = incrementHeardVote(mythId);
        if (result.success) {
          onRender();
        }
      }
    });
  });

  const shareBtns = document.querySelectorAll('.btn-share-card');
  shareBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mythId = btn.getAttribute('data-myth-id');
      const myth = MYTH_CARDS.find(m => m.id === mythId);
      if (myth) {
        if (navigator.share) {
          navigator.share({
            title: 'Eczema Myth Busted!',
            text: myth.shareableSummary,
            url: window.location.href
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(`${myth.shareableSummary} — ${window.location.href}`);
          alert('Fact summary copied to clipboard! You can share it to your social apps.');
        }
      }
    });
  });

  const suggestBtn = document.getElementById('open-suggest-myth-btn');
  if (suggestBtn) {
    suggestBtn.addEventListener('click', onOpenSuggestModal);
  }
}
