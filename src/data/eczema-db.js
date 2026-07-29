export const ECZEMA_TYPES = [
  {
    id: 'atopic-dermatitis',
    title: 'Atopic Dermatitis',
    latinName: 'Eczema Flexural',
    summary: 'The most common chronic form of eczema, driven by immune overactivity and skin barrier compromise.',
    symptoms: ['Intense itching (pruritus)', 'Dry, red, inflamed patches', 'Thickened leathery skin (lichenification)', 'Raw skin from scratching'],
    commonLocations: ['Flexural creases (elbows & knees)', 'Face & Neck', 'Wrists & Ankle flexures'],
    triggers: ['Dry winter air', 'Dust mites & pet dander', 'Harsh soaps & wool fabrics', 'Emotional stress'],
    onsetAge: 'Infancy / Early Childhood (often persists into adulthood)',
    contagiousStatus: false,
    whenToSeeDoctor: 'Seek medical evaluation if skin leaks yellowish fluid, becomes painful, or disrupts sleep repeatedly.',
    badgeColor: 'teal'
  },
  {
    id: 'contact-dermatitis',
    title: 'Contact Dermatitis',
    latinName: 'Dermatitis Contacta',
    summary: 'An inflammatory skin reaction caused by direct contact with allergens or toxic irritants.',
    symptoms: ['Sharp localized redness', 'Burning or stinging sensation', 'Fluid-filled blisters (vesicles)', 'Crusting & peeling'],
    commonLocations: ['Hands & Fingers', 'Face (cosmetics)', 'Neck (jewelry/nickel)', 'Arms & Legs'],
    triggers: ['Nickel metal', 'Fragrances & hair dyes', 'Poison ivy / Oak', 'Industrial solvents & dish soaps'],
    onsetAge: 'Any age following substance exposure',
    contagiousStatus: false,
    whenToSeeDoctor: 'Consult a dermatologist if rash spreads beyond contact zone or shows signs of secondary skin infection.',
    badgeColor: 'blue'
  },
  {
    id: 'dyshidrotic-eczema',
    title: 'Dyshidrotic Eczema',
    latinName: 'Pompholyx',
    summary: 'Characterized by sudden outbreaks of intensely itchy, tiny deep-seated blisters on palms and soles.',
    symptoms: ['Deep-seated tiny blisters (tapioca-like)', 'Intense burning itch', 'Scaling and painful skin cracking', 'Flaking skin during healing phase'],
    commonLocations: ['Palms of hands', 'Sides of fingers', 'Soles of feet'],
    triggers: ['Excessive sweating (hyperhidrosis)', 'Cobalt / Nickel exposure', 'Wet work / frequent handwashing', 'High stress levels'],
    onsetAge: 'Adults aged 20 to 40 years',
    contagiousStatus: false,
    whenToSeeDoctor: 'Visit a doctor if blisters become infected or make standing/walking painful.',
    badgeColor: 'purple'
  },
  {
    id: 'nummular-eczema',
    title: 'Nummular Eczema',
    latinName: 'Discoid Eczema',
    summary: 'Distinctive coin-shaped (discoid) itchy lesions that often develop after minor skin injury or dry winter weather.',
    symptoms: ['Coin-shaped (round) scaly patches', 'Extreme itching and burning', 'Oozing or crusting spots', 'Dry skin surround'],
    commonLocations: ['Lower legs', 'Forearms', 'Torso & Back'],
    triggers: ['Insect bites or burns', 'Cold, dry climate', 'Harsh cleansing chemicals', 'Skin trauma'],
    onsetAge: 'Mid-to-late adulthood (more common in men)',
    contagiousStatus: false,
    whenToSeeDoctor: 'See a physician if coin-shaped spots weep fluid or fail to respond to thick moisturizers.',
    badgeColor: 'amber'
  },
  {
    id: 'seborrheic-dermatitis',
    title: 'Seborrheic Dermatitis',
    latinName: 'Cradle Cap / Dandruff',
    summary: 'An inflammatory condition affecting oil-rich areas of the body, linked to Malassezia yeast sensitivity.',
    symptoms: ['Greasy, yellowish scaly patches', 'Red skin underneath flakes', 'Mild itching or stinging', 'Dandruff flakes'],
    commonLocations: ['Scalp', 'Eyebrows & Eyelids', 'Sides of nose', 'Behind ears & chest'],
    triggers: ['Yeast overgrowth (Malassezia)', 'Stress & fatigue', 'Cold, dry weather', 'Hormonal shifts'],
    onsetAge: 'Infants (Cradle Cap) and Adults 30–60 years',
    contagiousStatus: false,
    whenToSeeDoctor: 'Seek care if scalp scaling is painful, inflamed, or resistant to over-the-counter medicated shampoos.',
    badgeColor: 'coral'
  },
  {
    id: 'stasis-dermatitis',
    title: 'Stasis Dermatitis',
    latinName: 'Venous Eczema',
    summary: 'Occurs in people with poor venous circulation, typically causing fluid build-up and skin discoloration in the lower legs.',
    symptoms: ['Swollen ankles and lower legs', 'Reddish-brown skin discoloration', 'Heavy or aching feeling in legs', 'Itchy, scaly, thin skin'],
    commonLocations: ['Lower legs & Ankles'],
    triggers: ['Poor blood circulation (venous insufficiency)', 'Long periods of standing or sitting', 'High blood pressure', 'Varicose veins'],
    onsetAge: 'Older adults (typically 50+ years)',
    contagiousStatus: false,
    whenToSeeDoctor: 'Immediate medical evaluation is needed if legs become severely swollen, painful, or develop open skin ulcers.',
    badgeColor: 'teal'
  }
];

export const TREATMENTS = [
  {
    id: 'topical-steroids',
    title: 'Topical Corticosteroids (TCS)',
    category: 'prescription',
    summary: 'The primary medical treatment for reducing acute skin inflammation and itching during flare-ups.',
    mechanism: 'Suppresses inflammatory cytokines and immune activity in dermal tissue.',
    commonUsage: 'Applied thinly to affected flare areas once or twice daily for short, controlled durations prescribed by a doctor.',
    precautions: [
      'Do not apply near eyes unless specifically prescribed by a physician.',
      'Follow your doctor\'s schedule to prevent skin thinning or topical steroid withdrawal (TSW).',
      'Use the exact potency class recommended for the specific body area (e.g., lower potency for facial skin).'
    ],
    disclaimer: 'Prescription treatment. Always consult a licensed dermatologist before starting or modifying steroid applications.'
  },
  {
    id: 'non-steroid-topicals',
    title: 'Non-Steroidal Topicals (TCIs & JAK Inhibitors)',
    category: 'prescription',
    summary: 'Targeted non-hormonal cream treatments ideal for sensitive areas like the face, eyelids, and skin folds.',
    mechanism: 'Inhibits calcineurin or JAK pathways to block inflammatory signaling without thinning skin.',
    commonUsage: 'Applied twice daily to active eczema areas; suitable for longer-term maintenance.',
    precautions: [
      'May cause a temporary mild warming or burning sensation during the first few days of use.',
      'Apply sun protection when spending extended time outdoors.'
    ],
    disclaimer: 'Requires medical prescription and professional evaluation.'
  },
  {
    id: 'emollients-moisturizers',
    title: 'Barrier Repair Emollients & Ointments',
    category: 'otc-skincare',
    summary: 'Rich, unfragranced creams and ointments essential for restoring the damaged skin barrier and locking in moisture.',
    mechanism: 'Supplies ceramides, lipids, and protective occlusive barriers to prevent transepidermal water loss.',
    commonUsage: 'Apply generously within 3 minutes after bathing ("Soak & Seal" routine) and reapply 2–4 times daily.',
    precautions: [
      'Choose ointments (petroleum jelly based) or thick creams over thin water-based lotions containing alcohol.',
      'Avoid products containing fragrances, essential oils, or artificial colorants.'
    ],
    disclaimer: 'Over-the-counter maintenance routine suitable for daily preventative care.'
  },
  {
    id: 'gentle-cleansing-baths',
    title: 'Gentle Cleansing & Bleach / Oatmeal Baths',
    category: 'home-routine',
    summary: 'Therapeutic bathing techniques designed to soothe itching, soften scale, and reduce skin bacterial loads (Staph).',
    mechanism: 'Colloidal oatmeal calms neurogenic itch; diluted bleach baths decrease Staphylococcus aureus colonization.',
    commonUsage: 'Lukewarm 10–15 minute baths daily or twice weekly. Never use hot water.',
    precautions: [
      'Diluted bleach baths MUST be prepared precisely according to physician instructions (approx. 1/4 cup household bleach per full bathtub).',
      'Pat dry gently with a clean towel—do not rub skin vigorously.'
    ],
    disclaimer: 'Consult your doctor before starting diluted bleach baths for children or severe eczema.'
  },
  {
    id: 'trigger-avoidance',
    title: 'Trigger Identification & Fabric Selection',
    category: 'lifestyle-triggers',
    summary: 'Lifestyle modifications aimed at eliminating environmental and physical irritants that ignite flares.',
    mechanism: 'Prevents mechanical friction and allergen-induced histamine release.',
    commonUsage: 'Wear 100% loose-fitting cotton or silk; use fragrance-free laundry detergent; maintain 40–50% indoor humidity.',
    precautions: [
      'Avoid wool, polyester, and scratchy synthetic fabrics.',
      'Wash new clothing before wearing to remove manufacturing chemicals.'
    ],
    disclaimer: 'Lifestyle management practice.'
  }
];

export const MYTH_CARDS = [
  {
    id: 'myth-contagious',
    category: 'contagion',
    mythStatement: 'Myth: Eczema is contagious and you can catch it by touching someone.',
    factStatement: 'Fact: Eczema is completely NON-CONTAGIOUS. You cannot catch or spread it.',
    explanation: 'Eczema is an internal inflammatory skin condition driven by genetics, immune system overactivity, and skin barrier weakness. Touching, hugging, or sharing items with someone who has eczema carries ZERO risk of transmission.',
    heardCount: 142,
    shareableSummary: 'Eczema is 100% NON-CONTAGIOUS! It is an internal skin barrier condition, not an infection. Spread awareness, not stigma. 💙 #EczemaAwareness #StopStigma',
    canonicalUrl: 'https://eczemawiki.org/myth/myth-contagious'
  },
  {
    id: 'myth-hygiene',
    category: 'hygiene',
    mythStatement: 'Myth: Eczema is caused by poor personal hygiene or not washing enough.',
    factStatement: 'Fact: Eczema has NOTHING to do with poor hygiene.',
    explanation: 'Over-washing or scrubbing with harsh soaps actually strips natural protective oils and makes eczema significantly worse! People with eczema maintain meticulous skincare routines involving specialized emollients.',
    heardCount: 98,
    shareableSummary: 'Myth Busted: Eczema is NOT caused by poor hygiene! Excessive scrubbing actually damages the skin barrier. Be kind to eczema warriors. 💙 #EczemaFacts',
    canonicalUrl: 'https://eczemawiki.org/myth/myth-hygiene'
  },
  {
    id: 'myth-just-dry-skin',
    category: 'severity',
    mythStatement: 'Myth: Eczema is "just dry skin" and not a serious condition.',
    factStatement: 'Fact: Eczema is a complex immune-mediated disorder affecting physical and mental health.',
    explanation: 'Severe eczema causes relentless, agonizing itch that disrupts sleep, leads to painful bleeding cracks, increases infection risks, and can severely impact anxiety, depression, and daily quality of life.',
    heardCount: 215,
    shareableSummary: 'Eczema is NOT "just dry skin." It is a chronic immune-mediated condition that impacts sleep, mental health, and physical wellbeing. Empathy matters. 💙',
    canonicalUrl: 'https://eczemawiki.org/myth/myth-just-dry-skin'
  },
  {
    id: 'myth-miracle-cure',
    category: 'diet-cures',
    mythStatement: 'Myth: You can cure eczema permanently by cutting out gluten or buying a miracle cream.',
    factStatement: 'Fact: There is currently no permanent cure, but it CAN be effectively managed.',
    explanation: 'Eczema is a chronic condition with periods of flare-ups and remission. Unvalidated extreme elimination diets can cause malnutrition, and "miracle cure" creams online often contain hidden undeclared steroids.',
    heardCount: 176,
    shareableSummary: 'Beware of "miracle cures." Eczema is a manageable chronic condition, not a quick-fix illness. Always consult registered dermatologists. 💙 #EczemaTruth',
    canonicalUrl: 'https://eczemawiki.org/myth/myth-miracle-cure'
  }
];
