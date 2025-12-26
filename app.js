// Daynet Tools - Simple Working Version
console.log('Daynet Tools loaded');

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const toggle = document.querySelector('.theme-toggle');
  if (document.body.classList.contains('light-theme')) {
    toggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#111827';
  } else {
    toggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#ffffff';
  }
}

// Load saved theme
function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-theme');
    document.querySelector('.theme-toggle').textContent = '🌙';
  }
}

// Filter tools by category
function filterByCategory(category) {
  console.log('Filter by:', category);
  
  // Update active pill
  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.dataset.category === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  
  // Filter cards
  const cards = document.querySelectorAll('.tool-card');
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  cards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardText = card.textContent.toLowerCase();
    const keywords = card.dataset.keywords || '';
    
    const matchesCategory = category === 'all' || cardCategory === category;
    const matchesSearch = searchTerm === '' || 
                         cardText.includes(searchTerm) || 
                         keywords.includes(searchTerm);
    
    if (matchesCategory && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Search function
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const activePill = document.querySelector('.filter-pill.active');
    const category = activePill ? activePill.dataset.category : 'all';
    filterByCategory(category);
  });
}

// Open tool with alert
function openTool(toolName) {
  const toolNames = {
    'evident': 'Evident Pekerjaan Daynet',
    'opm': 'Evident OPM',
    'kml2dxf': 'KML to DXF Converter',
    'kml2csv': 'KML to CSV Extractor',
    'csv2kml': 'CSV to KML Converter',
    'pdf': 'PDF Utility',
    'linkbudget': 'Link Budget Calculator'
  };
  
  alert(`🚧 ${toolNames[toolName] || 'Tool'}\n\nSedang dalam pengembangan. Akan segera hadir!`);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Load theme
  loadTheme();
  
  // Initialize search
  initSearch();
  
  // Add click events to all tool buttons
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const toolId = this.getAttribute('data-tool') || 
                     this.closest('.tool-card').querySelector('h2').textContent.toLowerCase().split(' ')[0];
      openTool(toolId);
    });
  });
  
  // Hide loading overlay
  setTimeout(() => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }, 500);
});
