// ===== Sticky nav + scroll progress =====
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
}));

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Solutions tabs =====
document.querySelectorAll('.tab[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.tab;
    btn.parentElement.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tc = btn.closest('.section').querySelector('.tab-content');
    tc.querySelectorAll('.tc-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === key));
  });
});

// ===== Technology tabs (data-driven) =====
const techData = {
  mobile: [
    { name: 'Android', svg: '<rect x="14" y="6" width="36" height="52" rx="6" fill="#a4c639"/><circle cx="32" cy="50" r="3" fill="#fff"/>' },
    { name: 'iOS', svg: '<rect x="10" y="6" width="44" height="52" rx="6" fill="#000"/><text x="32" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="700"></text>' },
    { name: 'Flutter', svg: '<polygon points="14,32 32,14 50,14 26,38" fill="#54c5f8"/><polygon points="32,38 50,38 38,50 26,50" fill="#01579b"/>' },
    { name: 'React Native', svg: '<circle cx="32" cy="32" r="6" fill="#61dafb"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2" transform="rotate(-60 32 32)"/>' },
    { name: 'Kotlin', svg: '<polygon points="8,8 56,8 32,32 56,56 8,56" fill="#7f52ff"/>' },
    { name: 'Xamarin', svg: '<polygon points="32,8 56,32 32,56 8,32" fill="#3498db"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">X</text>' }
  ],
  frontend: [
    { name: 'React', svg: '<circle cx="32" cy="32" r="5" fill="#61dafb"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#61dafb" stroke-width="2" transform="rotate(-60 32 32)"/>' },
    { name: 'Vue.js', svg: '<polygon points="8,12 32,52 56,12 44,12 32,32 20,12" fill="#41b883"/><polygon points="20,12 32,32 44,12 38,12 32,22 26,12" fill="#34495e"/>' },
    { name: 'Angular', svg: '<polygon points="32,6 56,16 52,46 32,58 12,46 8,16" fill="#dd0031"/><polygon points="32,12 32,52 46,46 50,18" fill="#c3002f"/><path d="M22 40 L32 16 L42 40 L38 40 L36 32 L28 32 L26 40 Z" fill="#fff"/>' },
    { name: 'Next.js', svg: '<circle cx="32" cy="32" r="26" fill="#000"/><text x="32" y="40" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">N</text>' },
    { name: 'HTML5', svg: '<polygon points="10,6 54,6 50,52 32,58 14,52" fill="#e34f26"/><polygon points="32,12 32,54 46,50 49,12" fill="#f06529"/><path d="M22 26h20l-1 6H24l1 12 7 2 7-2 1-6h-6v-4h10l-2 14-10 4-10-4-1-10h6l1 4 4 1 4-1 1-4H22z" fill="#fff"/>' },
    { name: 'Tailwind', svg: '<path d="M16 28c4-12 12-12 16 0 4 6 8 6 12 0-4 12-12 12-16 0-4-6-8-6-12 0zm-4 16c4-12 12-12 16 0 4 6 8 6 12 0-4 12-12 12-16 0-4-6-8-6-12 0z" fill="#06b6d4"/>' }
  ],
  database: [
    { name: 'MySQL', svg: '<ellipse cx="32" cy="20" rx="20" ry="6" fill="#00758f"/><path d="M12 20 v22 c0 4 9 7 20 7s20-3 20-7 v-22" fill="#f29111"/>' },
    { name: 'MongoDB', svg: '<path d="M32 6 C40 16 44 28 44 38 C44 50 38 58 32 58 C26 58 20 50 20 38 C20 28 24 16 32 6z" fill="#47a248"/><path d="M32 12 v40" stroke="#fff" stroke-width="2"/>' },
    { name: 'PostgreSQL', svg: '<ellipse cx="32" cy="32" rx="22" ry="22" fill="#336791"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">P</text>' },
    { name: 'Redis', svg: '<polygon points="8,28 32,16 56,28 32,40" fill="#dc382d"/><polygon points="8,40 32,28 56,40 32,52" fill="#a41e1d"/>' },
    { name: 'Firebase', svg: '<path d="M14 50 L24 12 L34 26 L20 50z" fill="#ffa000"/><path d="M14 50 L40 14 L50 50z" fill="#ffca28"/>' },
    { name: 'Oracle', svg: '<rect x="8" y="22" width="48" height="20" rx="10" fill="#f80000"/><text x="32" y="36" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">ORACLE</text>' }
  ],
  backend: [
    { name: 'Node.js', svg: '<polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="#339933"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">JS</text>' },
    { name: 'Laravel', svg: '<polygon points="8,32 32,8 56,32 32,56" fill="#ff2d20"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">L</text>' },
    { name: 'Python', svg: '<rect x="14" y="10" width="36" height="44" rx="10" fill="#3776ab"/><circle cx="22" cy="20" r="3" fill="#fff"/><circle cx="42" cy="44" r="3" fill="#ffd43b"/>' },
    { name: 'PHP', svg: '<ellipse cx="32" cy="32" rx="28" ry="16" fill="#777bb3"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">PHP</text>' },
    { name: 'Java', svg: '<path d="M22 22 c0-8 4-10 10-10 c6 0 10 2 10 10" fill="none" stroke="#ed8b00" stroke-width="3"/><path d="M16 36 c8 6 24 6 32 0" stroke="#5382a1" stroke-width="3" fill="none"/><rect x="20" y="42" width="24" height="10" rx="2" fill="#5382a1"/>' },
    { name: '.NET', svg: '<rect x="6" y="14" width="52" height="36" rx="6" fill="#512bd4"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="13" font-weight="800">.NET</text>' }
  ],
  cms: [
    { name: 'WordPress', svg: '<circle cx="32" cy="32" r="26" fill="#21759b"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="20" font-weight="800">W</text>' },
    { name: 'Drupal', svg: '<path d="M32 6 C42 18 50 26 50 38 C50 48 42 56 32 56 C22 56 14 48 14 38 C14 26 22 18 32 6z" fill="#0678be"/>' },
    { name: 'Joomla', svg: '<rect x="8" y="22" width="48" height="20" rx="10" fill="#f44321"/><text x="32" y="36" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">Joomla</text>' },
    { name: 'Magento', svg: '<polygon points="32,6 56,18 56,46 32,58 8,46 8,18" fill="#ee672f"/><polygon points="32,18 32,46 22,40 22,24" fill="#fff"/><polygon points="32,18 32,46 42,40 42,24" fill="#fff"/>' },
    { name: 'Shopify', svg: '<path d="M22 12 L42 12 L48 18 L48 52 L16 52 L16 18z" fill="#95bf47"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">S</text>' },
    { name: 'WooCommerce', svg: '<rect x="6" y="22" width="52" height="22" rx="11" fill="#7f54b3"/><text x="32" y="36" text-anchor="middle" fill="#fff" font-size="9" font-weight="800">Woo</text>' }
  ],
  devops: [
    { name: 'AWS', svg: '<text x="32" y="30" text-anchor="middle" fill="#232f3e" font-size="14" font-weight="800">aws</text><path d="M14 40 c10 6 26 6 36 0" stroke="#ff9900" stroke-width="3" fill="none"/>' },
    { name: 'Azure', svg: '<polygon points="22,10 50,10 56,54 28,54 22,50 36,38 30,30 16,54 8,54" fill="#0089d6"/>' },
    { name: 'Google Cloud', svg: '<path d="M20 36 L32 16 L44 36 z" fill="#ea4335"/><circle cx="44" cy="40" r="10" fill="#4285f4"/><circle cx="20" cy="40" r="10" fill="#fbbc04"/><rect x="20" y="40" width="24" height="10" fill="#34a853"/>' },
    { name: 'Docker', svg: '<rect x="6" y="30" width="52" height="14" rx="2" fill="#2496ed"/><rect x="10" y="22" width="6" height="6" fill="#2496ed"/><rect x="18" y="22" width="6" height="6" fill="#2496ed"/><rect x="26" y="22" width="6" height="6" fill="#2496ed"/><rect x="18" y="14" width="6" height="6" fill="#2496ed"/>' },
    { name: 'Kubernetes', svg: '<polygon points="32,6 54,18 54,42 32,54 10,42 10,18" fill="#326ce5"/><circle cx="32" cy="30" r="10" fill="none" stroke="#fff" stroke-width="2"/>' },
    { name: 'Jenkins', svg: '<ellipse cx="32" cy="22" rx="14" ry="14" fill="#d33833"/><circle cx="28" cy="20" r="2" fill="#fff"/><circle cx="36" cy="20" r="2" fill="#fff"/><rect x="22" y="36" width="20" height="22" rx="4" fill="#335061"/>' },
    { name: 'GIT', svg: '<polygon points="32,6 58,32 32,58 6,32" fill="#f05033"/><circle cx="22" cy="32" r="3" fill="#fff"/><circle cx="32" cy="22" r="3" fill="#fff"/><circle cx="42" cy="32" r="3" fill="#fff"/><line x1="22" y1="32" x2="42" y2="32" stroke="#fff" stroke-width="2"/>' },
    { name: 'Selenium', svg: '<rect x="8" y="8" width="48" height="48" rx="4" fill="#43b02a"/><text x="32" y="40" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">Se</text>' },
    { name: 'Gradle', svg: '<circle cx="32" cy="32" r="26" fill="#02303a"/><path d="M14 40 c8-12 20-12 28 0" stroke="#fff" stroke-width="3" fill="none"/>' }
  ]
};

const techGrid = document.getElementById('techGrid');
const renderTech = (key) => {
  if (!techGrid) return;
  techGrid.innerHTML = (techData[key] || []).map(t =>
    `<div class="tech-item"><div class="tech-logo"><svg viewBox="0 0 64 64">${t.svg}</svg></div><span>${t.name}</span></div>`
  ).join('');
};
renderTech('mobile');
document.querySelectorAll('.tab[data-techtab]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTech(btn.dataset.techtab);
  });
});

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  const cIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      cIo.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cIo.observe(c));
}

// ===== Project Cost Estimator =====
const estimator = document.getElementById('estimator');
if (estimator) {
  const state = { type: 40000, complexity: 1, timeline: 1, addons: {} };
  const labels = { type: 'Web App', complexity: 'Simple', timeline: 'Standard' };
  const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const calc = () => {
    let base = state.type * state.complexity * state.timeline;
    let addonsTotal = Object.values(state.addons).reduce((a, b) => a + b, 0);
    let total = base + addonsTotal;
    document.getElementById('estTotal').textContent = fmt(total);
    document.getElementById('estLow').textContent = fmt(total * 0.9);
    document.getElementById('estHigh').textContent = fmt(total * 1.2);
    const sum = document.getElementById('estSummary');
    const items = [
      ['Type', labels.type],
      ['Complexity', labels.complexity],
      ['Timeline', labels.timeline],
    ];
    Object.keys(state.addons).forEach(k => items.push(['+ ' + k, '$' + fmt(state.addons[k])]));
    sum.innerHTML = items.map(([k, v]) => `<li>${k}<span>${v}</span></li>`).join('');
  };

  estimator.querySelectorAll('.est-options').forEach(group => {
    const key = group.dataset.key;
    group.querySelectorAll('.est-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.est-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state[key] = +btn.dataset.val;
        labels[key] = btn.dataset.label;
        calc();
      });
    });
  });
  estimator.querySelectorAll('.est-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.textContent.trim();
      const val = +btn.dataset.add;
      if (btn.classList.toggle('active')) state.addons[name] = val;
      else delete state.addons[name];
      calc();
    });
  });
  calc();
}

// ===== Year =====
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
