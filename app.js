// Daynet Tools - Enhanced Version
let activeCategory = 'all';

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    toggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light-mode');
    toggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Load Saved Theme
function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.theme-toggle').textContent = '🌙';
  }
}

// Filter Tools
function filterByCategory(category) {
  activeCategory = category;
  const cards = document.querySelectorAll('.tool-card');
  const pills = document.querySelectorAll('.filter-pill');
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();

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
    const cardText = card.textContent.toLowerCase();
    const keywords = card.dataset.keywords || '';

    const matchesCategory = category === 'all' || cardCategory === category;
    const matchesSearch = searchTerm === '' || 
                         cardText.includes(searchTerm) || 
                         keywords.includes(searchTerm);

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

// Search Function
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    filterByCategory(activeCategory);
  });
}

// Empty State
function updateEmptyState(visibleCount) {
  const emptyState = document.getElementById('emptyState');
  const main = document.getElementById('main-content');
  
  if (visibleCount === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (main) main.style.display = 'none';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (main) main.style.display = 'grid';
  }
}

// Reset Filters
function resetFilters() {
  document.getElementById('searchInput').value = '';
  filterByCategory('all');
}

// Help Modal
function toggleHelp() {
  document.getElementById('helpModal').classList.toggle('show');
}

// Back to Top
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+K toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleTheme();
    }
    // / to focus search
    if (e.key === '/' && !e.ctrlKey) {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    // Escape to reset
    if (e.key === 'Escape') {
      resetFilters();
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initSearch();
  initBackToTop();
  initKeyboardShortcuts();
  
  // Hide loading
  setTimeout(() => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }, 800);
});
