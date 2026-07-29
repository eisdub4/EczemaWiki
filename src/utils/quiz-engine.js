import { ECZEMA_TYPES } from '../data/eczema-db.js';

export function calculateQuizMatches(selectedLocations = [], selectedSymptoms = [], selectedTriggers = []) {
  if (selectedLocations.length === 0 && selectedSymptoms.length === 0 && selectedTriggers.length === 0) {
    return [];
  }

  const results = ECZEMA_TYPES.map(type => {
    let score = 0;
    let totalPossible = 0;

    const matchedLocations = [];
    const matchedSymptoms = [];
    const matchedTriggers = [];

    // Location scoring
    if (selectedLocations.length > 0) {
      totalPossible += selectedLocations.length * 3;
      selectedLocations.forEach(loc => {
        const hasLoc = type.commonLocations.some(l => l.toLowerCase().includes(loc.toLowerCase()));
        if (hasLoc) {
          score += 3;
          matchedLocations.push(loc);
        }
      });
    }

    // Symptom scoring
    if (selectedSymptoms.length > 0) {
      totalPossible += selectedSymptoms.length * 4;
      selectedSymptoms.forEach(sym => {
        const hasSym = type.symptoms.some(s => s.toLowerCase().includes(sym.toLowerCase()));
        if (hasSym) {
          score += 4;
          matchedSymptoms.push(sym);
        }
      });
    }

    // Trigger scoring
    if (selectedTriggers.length > 0) {
      totalPossible += selectedTriggers.length * 2;
      selectedTriggers.forEach(trig => {
        const hasTrig = type.triggers.some(t => t.toLowerCase().includes(trig.toLowerCase()));
        if (hasTrig) {
          score += 2;
          matchedTriggers.push(trig);
        }
      });
    }

    const matchPercentage = totalPossible > 0 ? Math.min(100, Math.round((score / totalPossible) * 100)) : 0;

    return {
      type,
      matchPercentage,
      matchedLocations,
      matchedSymptoms,
      matchedTriggers
    };
  });

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
