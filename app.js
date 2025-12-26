// app.js - Enhanced with all improvements

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  const currentTheme = body.getAttribute('data-theme');

  if (currentTheme === 'light') {
    // Switch to dark mode (default)
    body.removeAttribute('data-theme');
    toggle.textContent = '☀️';
    toggle.setAttribute('aria-pressed', 'false');
    localStorage.setItem('theme', 'dark');
  } else {
    // Switch to light mode
    body.setAttribute('data-theme', 'light');
    toggle.textContent = '🌙';
    toggle.setAttribute('aria-pressed', 'true');
    localStorage.setItem('theme', 'light');
  }
}

function loadTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const toggle = document.querySelector('.theme-toggle');

    if (saved === 'light') {
      // Apply light mode
      document.body.setAttribute('data-theme', 'light');
      if (toggle) {
        toggle.textContent = '🌙';
        toggle.setAttribute('aria-pressed', 'true');
      }
    } else {
      // Default is dark mode
      if (toggle) {
        toggle.textContent = '☀️';
        toggle.setAttribute('aria-pressed', 'false');
      }
    }
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
}

// Help modal toggle
function toggleHelp() {
  const modal = document.getElementById('helpModal');
  if (modal) {
    modal.classList.toggle('show');
  }
}

// Category filter
let activeCategory = 'all';

function filterByCategory(category) {
  activeCategory = category;
  const cards = document.querySelectorAll('.tool-card');
  const pills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('searchInput');

  // Update active pill
  pills.forEach(pill => {
    if (pill.dataset.category === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Filter cards
  let visibleCount = 0;
  cards.forEach(card => {
    const cardCategory = card.dataset.category;
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const cardText = card.textContent.toLowerCase();
    const cardKeywords = card.dataset.keywords || '';

    const matchesCategory = category === 'all' || cardCategory === category;
    const matchesSearch = searchTerm === '' || cardText.includes(searchTerm) || cardKeywords.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Show/hide empty state
  updateEmptyState(visibleCount);
}

// Search functionality with highlighting
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.tool-card');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardText = card.textContent.toLowerCase();
      const cardKeywords = card.dataset.keywords || '';

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = term === '' || cardText.includes(term) || cardKeywords.includes(term);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    updateEmptyState(visibleCount);
  });
}

// Update empty state visibility
function updateEmptyState(visibleCount) {
  const emptyState = document.getElementById('emptyState');
  const main = document.getElementById('main-content');

  if (visibleCount === 0) {
    if (main) main.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (main) main.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
  }
}

// Reset filters
function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  filterByCategory('all');
}

// Back-to-top button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Tool card button click handler
function initToolButtons() {
  const buttons = document.querySelectorAll('.tool-btn[data-url]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    });
  });
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl+K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleTheme();
    }
    // '/' to focus search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const search = document.getElementById('searchInput');
      if (search) search.focus();
    }
    // Escape to clear search and reset filter
    if (e.key === 'Escape') {
      const modal = document.getElementById('helpModal');
      if (modal && modal.classList.contains('show')) {
        toggleHelp();
      } else {
        resetFilters();
      }
    }
    // Number shortcuts 1-6 to open first six tools
    if (e.key >= '1' && e.key <= '6') {
      const idx = parseInt(e.key, 10) - 1;
      const btn = document.querySelectorAll('.tool-btn[data-url]')[idx];
      if (btn) btn.click();
    }
    // ? to show help
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleHelp();
    }
  });
}

// Loading overlay handling
function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
  setTimeout(() => { overlay.style.display = 'none'; }, 300);
}

// Close help modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('helpModal');
  const helpBtn = document.querySelector('.help-btn');
  if (modal && modal.classList.contains('show') &&
    e.target === modal && e.target !== helpBtn) {
    toggleHelp();
  }
});

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initSearch();
  initBackToTop();
  initToolButtons();
  initKeyboardShortcuts();
  if (document.readyState === 'complete') {
    hideLoading();
  } else {
    window.addEventListener('load', hideLoading);
  }
});

// Respect prefers-color-scheme when no saved theme
if (window.matchMedia) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  prefersDark.addEventListener('change', e => {
    try {
      if (!localStorage.getItem('theme')) {
        const toggle = document.querySelector('.theme-toggle');
        if (e.matches) {
          // User prefers dark (which is our default)
          document.body.removeAttribute('data-theme');
          if (toggle) toggle.textContent = '☀️';
        } else {
          // User prefers light
          document.body.setAttribute('data-theme', 'light');
          if (toggle) toggle.textContent = '🌙';
        }
      }
    } catch (err) {
      console.warn('matchMedia listener error:', err);
    }
  });
}
