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

// Typewriter effect (on the role only — prefix "$ whoami" and the green dot
// stay static, matching the portfolio CMS hero style)
(function() {
    var texts = ['Security Engineer'];
    var el = document.querySelector('.tagline-role');
    if (!el) return;

    var current = 0;
    var charIndex = 0;
    var deleting = false;
    var pauseTime = 1800;
    var typeSpeed = 80;
    var deleteSpeed = 40;

    function type() {
        var text = texts[current];
        if (!deleting) {
            el.textContent = text.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === text.length) {
                deleting = true;
                setTimeout(type, pauseTime);
                return;
            }
        } else {
            el.textContent = text.slice(0, charIndex - 1);
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

        // Index 0: Current projects — show exact number
        if (statNums[0]) statNums[0].textContent = String(data.projects);

        // Index 1: Core technologies / skills — threshold at 10s
        if (statNums[1]) {
            var s = data.skills;
            statNums[1].textContent = s < 10 ? String(s) :
                (s % 10 === 0 ? String(s) : (Math.floor(s / 10) * 10) + '+');
        }

        // Index 2: Years experience — derived from experience_months
        if (statNums[2]) {
            var months = data.experience_months || 0;
            var years = Math.floor(months / 12);
            if (years < 1) years = 1;
            var remainder = months % 12;
            statNums[2].textContent = remainder === 0 ? String(years) : years + '+';
        }
    }

    fetch(STATS_URL)
        .then(function (r) { return r.json(); })
        .then(function (data) { updateStats(data); })
        .catch(function () {
        });
})();