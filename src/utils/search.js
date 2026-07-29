import { ECZEMA_TYPES, TREATMENTS, MYTH_CARDS } from '../data/eczema-db.js';

export function performGlobalSearch(query = '') {
  const q = query.toLowerCase().trim();
  if (!q) return { types: [], treatments: [], myths: [] };

  const matchedTypes = ECZEMA_TYPES.filter(t => 
    t.title.toLowerCase().includes(q) ||
    t.summary.toLowerCase().includes(q) ||
    t.symptoms.some(s => s.toLowerCase().includes(q)) ||
    t.triggers.some(tr => tr.toLowerCase().includes(q)) ||
    t.commonLocations.some(l => l.toLowerCase().includes(q))
  );

  const matchedTreatments = TREATMENTS.filter(t => 
    t.title.toLowerCase().includes(q) ||
    t.summary.toLowerCase().includes(q) ||
    t.mechanism.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );

  const matchedMyths = MYTH_CARDS.filter(m => 
    m.mythStatement.toLowerCase().includes(q) ||
    m.factStatement.toLowerCase().includes(q) ||
    m.explanation.toLowerCase().includes(q)
  );

  return {
    types: matchedTypes,
    treatments: matchedTreatments,
    myths: matchedMyths
  };
}
