import { calculateQuizMatches } from '../utils/quiz-engine.js';

let quizState = {
  step: 1,
  locations: [],
  symptoms: [],
  triggers: []
};

const LOCATION_OPTIONS = [
  { id: 'hands', label: '✋ Hands & Fingers' },
  { id: 'flexural-creases', label: '💪 Elbow Creases & Back of Knees' },
  { id: 'face', label: '😊 Face, Eyelids & Neck' },
  { id: 'scalp', label: '💆 Scalp & Behind Ears' },
  { id: 'legs', label: '🦵 Lower Legs & Ankles' },
  { id: 'torso', label: '👕 Chest, Back & Torso' }
];

const SYMPTOM_OPTIONS = [
  { id: 'itching', label: '🔥 Intense, persistent itching (pruritus)' },
  { id: 'blisters', label: '💧 Tiny fluid-filled blisters (vesicles)' },
  { id: 'coin-shaped', label: '🪙 Distinct round / coin-shaped patches' },
  { id: 'scaling', label: '❄️ Dry, scaly, or greasy yellowish flakes' },
  { id: 'thickened', label: '🛡️ Thickened, leathery skin from scratching' },
  { id: 'swelling', label: '🦵 Leg swelling & reddish-brown discoloration' }
];

const TRIGGER_OPTIONS = [
  { id: 'soaps', label: '🧼 Harsh soaps, chemicals or detergents' },
  { id: 'dry-air', label: '❄️ Cold, dry winter weather' },
  { id: 'sweat', label: '💦 Excessive sweating or wet hands' },
  { id: 'stress', label: '🧠 High emotional stress or fatigue' },
  { id: 'nickel', label: '💍 Nickel jewelry or metal contact' }
];

export function renderSymptomQuiz() {
  const matches = quizState.step === 4 ? calculateQuizMatches(quizState.locations, quizState.symptoms, quizState.triggers) : [];

  return `
    <section class="container" style="padding-top: 2rem; max-width: 800px;">
      <div class="section-header">
        <span class="badge badge-teal">Guided Assessment</span>
        <h2 class="section-title">3-Step Eczema Symptom Helper</h2>
        <p class="section-desc">Select your current symptoms to discover which eczema types match your experience.</p>
      </div>

      <!-- Step Indicator Bar -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem;">
        <div style="flex: 1; height: 6px; border-radius: 3px; background: ${quizState.step >= 1 ? 'var(--primary-600)' : 'var(--neutral-200)'}"></div>
        <div style="flex: 1; height: 6px; border-radius: 3px; background: ${quizState.step >= 2 ? 'var(--primary-600)' : 'var(--neutral-200)'}"></div>
        <div style="flex: 1; height: 6px; border-radius: 3px; background: ${quizState.step >= 3 ? 'var(--primary-600)' : 'var(--neutral-200)'}"></div>
        <div style="flex: 1; height: 6px; border-radius: 3px; background: ${quizState.step >= 4 ? 'var(--primary-600)' : 'var(--neutral-200)'}"></div>
      </div>

      <div class="card" style="padding: 2.25rem;">
        ${quizState.step === 1 ? `
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Step 1: Where is your eczema located?</h3>
          <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">Select all body regions currently affected:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            ${LOCATION_OPTIONS.map(opt => `
              <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid ${quizState.locations.includes(opt.id) ? 'var(--primary-500)' : 'var(--neutral-200)'}; background: ${quizState.locations.includes(opt.id) ? 'var(--primary-50)' : 'white'}; border-radius: var(--radius-md); cursor: pointer;">
                <input type="checkbox" class="quiz-check-loc" value="${opt.id}" ${quizState.locations.includes(opt.id) ? 'checked' : ''} />
                <span style="font-weight: 500;">${opt.label}</span>
              </label>
            `).join('')}
          </div>
          <button class="btn-primary" id="quiz-next-1" style="align-self: flex-end;">Continue to Step 2 →</button>
        ` : ''}

        ${quizState.step === 2 ? `
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Step 2: What symptoms do you see or feel?</h3>
          <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">Select all matching visual and skin traits:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            ${SYMPTOM_OPTIONS.map(opt => `
              <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid ${quizState.symptoms.includes(opt.id) ? 'var(--primary-500)' : 'var(--neutral-200)'}; background: ${quizState.symptoms.includes(opt.id) ? 'var(--primary-50)' : 'white'}; border-radius: var(--radius-md); cursor: pointer;">
                <input type="checkbox" class="quiz-check-sym" value="${opt.id}" ${quizState.symptoms.includes(opt.id) ? 'checked' : ''} />
                <span style="font-weight: 500;">${opt.label}</span>
              </label>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <button class="btn-secondary" id="quiz-back-2">← Back</button>
            <button class="btn-primary" id="quiz-next-2">Continue to Step 3 →</button>
          </div>
        ` : ''}

        ${quizState.step === 3 ? `
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Step 3: What triggers or environmental factors apply?</h3>
          <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">Select common flare triggers:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            ${TRIGGER_OPTIONS.map(opt => `
              <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid ${quizState.triggers.includes(opt.id) ? 'var(--primary-500)' : 'var(--neutral-200)'}; background: ${quizState.triggers.includes(opt.id) ? 'var(--primary-50)' : 'white'}; border-radius: var(--radius-md); cursor: pointer;">
                <input type="checkbox" class="quiz-check-trig" value="${opt.id}" ${quizState.triggers.includes(opt.id) ? 'checked' : ''} />
                <span style="font-weight: 500;">${opt.label}</span>
              </label>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <button class="btn-secondary" id="quiz-back-3">← Back</button>
            <button class="btn-primary" id="quiz-finish">See Matching Types ✨</button>
          </div>
        ` : ''}

        ${quizState.step === 4 ? `
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Your Symptom Match Results</h3>
          <p style="color: var(--neutral-600); margin-bottom: 1.5rem;">Based on your choices, here are the most relevant eczema types sorted by match confidence:</p>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
            ${matches.map(m => `
              <div style="border: 1px solid var(--neutral-200); padding: 1.25rem; border-radius: var(--radius-md); background: ${m.matchPercentage > 50 ? 'var(--primary-50)' : 'white'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <h4 style="font-size: 1.2rem; color: var(--neutral-900);">${m.type.title}</h4>
                  <span class="badge badge-teal" style="font-size: 0.9rem; margin-bottom: 0;">${m.matchPercentage}% Match</span>
                </div>
                <p style="font-size: 0.95rem; color: var(--neutral-600); margin-bottom: 0.75rem;">${m.type.summary}</p>
                <div style="font-size: 0.85rem; color: var(--neutral-700);">
                  ${m.matchedSymptoms.length > 0 ? `<div><strong>Matched Symptoms:</strong> ${m.matchedSymptoms.join(', ')}</div>` : ''}
                  ${m.matchedLocations.length > 0 ? `<div><strong>Matched Locations:</strong> ${m.matchedLocations.join(', ')}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <p style="font-size: 0.85rem; color: #78350F;">⚠️ Disclaimer: This self-assessment tool is for educational guidance only and is not a formal medical diagnosis. Always consult a board-certified dermatologist for clinical evaluation.</p>
          </div>

          <button class="btn-secondary" id="quiz-restart" style="width: 100%;">🔄 Restart Quiz</button>
        ` : ''}
      </div>
    </section>
  `;
}

export function bindSymptomQuizEvents(onRender) {
  // Step 1 Checkbox updates
  document.querySelectorAll('.quiz-check-loc').forEach(chk => {
    chk.addEventListener('change', () => {
      const val = chk.value;
      if (chk.checked) {
        if (!quizState.locations.includes(val)) quizState.locations.push(val);
      } else {
        quizState.locations = quizState.locations.filter(x => x !== val);
      }
    });
  });

  const next1 = document.getElementById('quiz-next-1');
  if (next1) {
    next1.addEventListener('click', () => {
      quizState.step = 2;
      onRender();
    });
  }

  // Step 2
  document.querySelectorAll('.quiz-check-sym').forEach(chk => {
    chk.addEventListener('change', () => {
      const val = chk.value;
      if (chk.checked) {
        if (!quizState.symptoms.includes(val)) quizState.symptoms.push(val);
      } else {
        quizState.symptoms = quizState.symptoms.filter(x => x !== val);
      }
    });
  });

  const back2 = document.getElementById('quiz-back-2');
  if (back2) {
    back2.addEventListener('click', () => {
      quizState.step = 1;
      onRender();
    });
  }

  const next2 = document.getElementById('quiz-next-2');
  if (next2) {
    next2.addEventListener('click', () => {
      quizState.step = 3;
      onRender();
    });
  }

  // Step 3
  document.querySelectorAll('.quiz-check-trig').forEach(chk => {
    chk.addEventListener('change', () => {
      const val = chk.value;
      if (chk.checked) {
        if (!quizState.triggers.includes(val)) quizState.triggers.push(val);
      } else {
        quizState.triggers = quizState.triggers.filter(x => x !== val);
      }
    });
  });

  const back3 = document.getElementById('quiz-back-3');
  if (back3) {
    back3.addEventListener('click', () => {
      quizState.step = 2;
      onRender();
    });
  }

  const finish = document.getElementById('quiz-finish');
  if (finish) {
    finish.addEventListener('click', () => {
      quizState.step = 4;
      onRender();
    });
  }

  const restart = document.getElementById('quiz-restart');
  if (restart) {
    restart.addEventListener('click', () => {
      quizState = { step: 1, locations: [], symptoms: [], triggers: [] };
      onRender();
    });
  }
}
