export function renderNavbar(activeTab = 'types', onTabChange, onSearch) {
  return `
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="#" class="logo" id="nav-logo">
          <div class="logo-icon">🌿</div>
          <span>EczemaWiki</span>
        </a>

        <ul class="nav-links">
          <li>
            <button class="nav-btn ${activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">
              🧩 Symptom Quiz
            </button>
          </li>
          <li>
            <button class="nav-btn ${activeTab === 'types' ? 'active' : ''}" data-tab="types">
              📖 Eczema Types
            </button>
          </li>
          <li>
            <button class="nav-btn ${activeTab === 'treatments' ? 'active' : ''}" data-tab="treatments">
              💊 Treatments
            </button>
          </li>
          <li>
            <button class="nav-btn ${activeTab === 'myths' ? 'active' : ''}" data-tab="myths">
              💙 Myths & Stigma
            </button>
          </li>
          <li>
            <button class="nav-btn ${activeTab === 'qr' ? 'active' : ''}" data-tab="qr">
              🏷️ QR Stickers
            </button>
          </li>
        </ul>

        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            id="global-search-input"
            class="search-input" 
            placeholder="Search symptoms, types, myths..."
            aria-label="Search Eczema Wiki"
          />
        </div>
      </div>
    </header>
  `;
}

export function bindNavbarEvents(onTabChange, onSearch) {
  const logo = document.getElementById('nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      onTabChange('types');
    });
  }

  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) onTabChange(tab);
    });
  });

  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      onSearch(e.target.value.trim());
    });
  }
}
