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

// Footer year (kept for compatibility if a #year element exists)
document.addEventListener('DOMContentLoaded', function() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Typewriter effect
(function() {
    var texts = ['Security Engineer', 'Full Stack Developer'];
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

(function () {
    var STATS_URL = 'https://portfolio.dimasqiramadhani.com/api/stats/';

    function fmt(value, threshold) {
        if (value >= threshold) return value + '+';
        return String(value);
    }

    function updateStats(data) {
        var statNums = document.querySelectorAll('.term-stat-num');
        if (!statNums.length) return;

        // Index 0: Current projects (threshold 10)
        if (statNums[0]) statNums[0].textContent = fmt(data.projects, 10);

        // Index 1: Focus areas — static, dibiarkan
        
        // Index 2: Core technologies / skills (threshold 20)
        if (statNums[2]) statNums[2].textContent = (Math.floor(data.skills / 10) * 10) + '+';

        // Index 3: Years experience (threshold 2)
        if (statNums[3]) {
            var yr = data.experience_years < 1 ? 1 : data.experience_years;
            statNums[3].textContent = (yr < 1 ? 1 : yr) + '+';
        }
    }

    fetch(STATS_URL)
        .then(function (r) { return r.json(); })
        .then(function (data) { updateStats(data); })
        .catch(function () {
        });
})();