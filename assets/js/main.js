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
    var el = document.querySelector('.tagline-role');
    if (!el) return;

    // Read the role out of the markup instead of repeating it here. The two
    // used to be separate: the HTML said one thing, this array said another,
    // and because the animation overwrites the element the array always won.
    // That left sighted visitors reading the old title while the .sr-only span
    // announced the new one to screen readers — the page contradicting itself.
    var texts = [el.textContent.trim()];
    if (!texts[0]) return;

    // Respect reduced-motion: keep the role static instead of animating.
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
        el.textContent = texts[0];
        return;
    }

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
    var BASE_URL = 'https://portfolio.dimasqiramadhani.com';
    var STATS_URL = BASE_URL + '/api/stats/';
    var PROJECTS_URL = BASE_URL + '/api/projects/';

    // ---- Category icon mapping ----
    var CATEGORY_ICONS = {
        'Detection Engineering': 'fa-solid fa-shield-halved',
        'Project Implementation': 'fa-solid fa-cubes',
        'Offensive Security': 'fa-solid fa-skull-crossbones',
        'Vulnerability Assessment': 'fa-solid fa-magnifying-glass-chart',
        'Threat Intelligence': 'fa-solid fa-brain',
        'Log Management': 'fa-solid fa-circle-nodes',
        'Digital Forensic': 'fa-solid fa-fingerprint',
        'Automation Engine': 'fa-solid fa-robot',
        'Other': 'fa-solid fa-folder'
    };

    // ---- Stats sync ----
    function updateStats(data) {
        var projectsEl = document.querySelector('[data-stat="projects"]');
        var skillsEl = document.querySelector('[data-stat="skills"]');
        var expEl = document.querySelector('[data-stat="experience"]');

        if (projectsEl && data.projects != null) {
            projectsEl.textContent = String(data.projects);
        }

        if (skillsEl && data.skills != null) {
            var s = data.skills;
            skillsEl.textContent = s < 10 ? String(s) :
                (s % 10 === 0 ? String(s) : (Math.floor(s / 10) * 10) + '+');
        }

        if (expEl && data.experience_months != null) {
            var months = data.experience_months || 0;
            var years = Math.floor(months / 12);
            if (years < 1) years = 1;
            var remainder = months % 12;
            expEl.textContent = remainder === 0 ? String(years) : years + '+';
        }
    }

    // ---- Dynamic project list ----
    function renderProjects(projects) {
        var container = document.getElementById('proj-list');
        if (!container || !projects || !projects.length) return;

        var html = '';
        for (var i = 0; i < projects.length; i++) {
            var p = projects[i];
            var icon = CATEGORY_ICONS[p.category] || CATEGORY_ICONS['Other'];
            var url = BASE_URL + '/project/' + p.slug + '/';
            html += '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="proj-item">'
                  + '<i class="' + icon + ' proj-icon"></i>'
                  + '<span class="proj-name">' + p.slug + '</span>'
                  + '<i class="fa-solid fa-arrow-right proj-arrow"></i>'
                  + '</a>';
        }
        container.innerHTML = html;
    }

    // ---- Shared fetch helper with 5s timeout ----
    function fetchJSON(url, callback) {
        var controller = ('AbortController' in window) ? new AbortController() : null;
        var timer = controller ? setTimeout(function () { controller.abort(); }, 5000) : null;

        fetch(url, controller ? { signal: controller.signal } : undefined)
            .then(function (r) {
                if (timer) clearTimeout(timer);
                if (!r.ok) throw new Error('bad status');
                return r.json();
            })
            .then(function (data) { callback(data); })
            .catch(function () {
                if (timer) clearTimeout(timer);
                // Silent: keep static fallbacks visible.
            });
    }

    fetchJSON(STATS_URL, updateStats);
    fetchJSON(PROJECTS_URL, renderProjects);
})();