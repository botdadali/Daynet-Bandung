// Daynet Tools - Fixed JavaScript
console.log('🚀 Daynet Tools loaded successfully!');

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        toggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        
        // Update CSS variables for light mode
        document.documentElement.style.setProperty('--dark-bg', '#ffffff');
        document.documentElement.style.setProperty('--dark-text', '#111827');
        document.documentElement.style.setProperty('--dark-card', '#f9fafb');
        document.documentElement.style.setProperty('--dark-secondary', '#6b7280');
        document.documentElement.style.setProperty('--border', 'rgba(0,0,0,0.1)');
    } else {
        toggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        
        // Reset to dark mode
        document.documentElement.style.setProperty('--dark-bg', '#0a0a0a');
        document.documentElement.style.setProperty('--dark-text', '#ffffff');
        document.documentElement.style.setProperty('--dark-card', '#1a1a1a');
        document.documentElement.style.setProperty('--dark-secondary', '#9ca3af');
        document.documentElement.style.setProperty('--border', 'rgba(255,255,255,0.1)');
    }
}

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        // Apply light mode immediately
        document.body.classList.add('light-mode');
        document.querySelector('.theme-toggle').textContent = '🌙';
        
        document.documentElement.style.setProperty('--dark-bg', '#ffffff');
        document.documentElement.style.setProperty('--dark-text', '#111827');
        document.documentElement.style.setProperty('--dark-card', '#f9fafb');
        document.documentElement.style.setProperty('--dark-secondary', '#6b7280');
        document.documentElement.style.setProperty('--border', 'rgba(0,0,0,0.1)');
    }
}

// Filter by category
function filterByCategory(category) {
    console.log('Filtering by:', category);
    
    // Update active pill
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        if (pill.textContent.includes(category) || category === 'all') {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
    
    // Filter cards
    const cards = document.querySelectorAll('.tool-card');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardText = card.textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.error('Search input not found!');
        return;
    }
    
    searchInput.addEventListener('input', function() {
        // Find active filter
        const activePill = document.querySelector('.filter-pill.active');
        let activeCategory = 'all';
        
        if (activePill) {
            if (activePill.textContent.includes('Dokumensi')) activeCategory = 'dokumensi';
            else if (activePill.textContent.includes('Konversi')) activeCategory = 'konversi';
            else if (activePill.textContent.includes('PDF')) activeCategory = 'pdf';
            else if (activePill.textContent.includes('Kalkulator')) activeCategory = 'kalkulator';
        }
        
        filterByCategory(activeCategory);
    });
    
    // Keyboard shortcut: / to focus search
    document.addEventListener('keydown', function(e) {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Ctrl+K for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Open tool function
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
    
    const toolTitle = toolNames[toolName] || 'Tool';
    alert(`🚧 ${toolTitle}\n\nTool dalam pengembangan. Akan segera hadir!`);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Initializing Daynet Tools...');
    
    try {
        // 1. Load saved theme
        loadTheme();
        
        // 2. Initialize search
        initSearch();
        
        // 3. Set default filter
        filterByCategory('all');
        
        // 4. Add click events to buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            const originalOnClick = btn.getAttribute('onclick');
            if (!originalOnClick) {
                const toolId = btn.closest('.tool-card').querySelector('h2').textContent
                    .toLowerCase()
                    .split(' ')[0];
                btn.setAttribute('onclick', `openTool('${toolId}')`);
            }
        });
        
        console.log('✅ Daynet Tools initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing Daynet Tools:', error);
        alert('Terjadi error saat memuat aplikasi. Silakan refresh halaman.');
    }
});

// Handle errors
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});
