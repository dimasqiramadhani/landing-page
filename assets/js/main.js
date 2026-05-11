// ============================================
// Landing Page — Dimasqi Ramadhani
// ============================================

// Theme toggle
function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Sync lintas subdomain via cookie
    document.cookie = 'theme=' + next + ';domain=.dimasqiramadhani.com;path=/;max-age=31536000';
}

// Cross-tab theme sync
window.addEventListener('storage', function(e) {
    if (e.key === 'theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
    }
});

// Footer year
document.addEventListener('DOMContentLoaded', function() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});