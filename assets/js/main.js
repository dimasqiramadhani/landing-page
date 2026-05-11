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

// Typewriter effect
(function() {
    var texts = ['Security Engineer', 'Python Developer'];
    var el = document.querySelector('.tagline');
    if (!el) return;

    var prefix = '$ whoami → ';
    var current = 0;
    var charIndex = 0;
    var deleting = false;
    var pauseTime = 1800;
    var typeSpeed = 80;
    var deleteSpeed = 40;

    function type() {
        var text = texts[current];
        if (!deleting) {
            el.textContent = prefix + text.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === text.length) {
                deleting = true;
                setTimeout(type, pauseTime);
                return;
            }
        } else {
            el.textContent = prefix + text.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                current = (current + 1) % texts.length;
            }
        }
        setTimeout(type, deleting ? deleteSpeed : typeSpeed);
    }

    setTimeout(type, 800);
})();