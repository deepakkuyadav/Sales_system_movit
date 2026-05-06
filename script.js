// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('tb-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('tb-theme', next);
});

// ===== Sticky nav state =====
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('scrollProgress').style.width = pct + '%';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
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

// ===== Animated counters =====
const counters = document.querySelectorAll('.s-num');
const cIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1600;
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
}, { threshold: 0.5 });
counters.forEach(c => cIo.observe(c));

// ===== Year =====
document.getElementById('yr').textContent = new Date().getFullYear();

// ===== Hero parallax (subtle) =====
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((o, i) => {
    const f = (i + 1) * 0.5;
    o.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
}, { passive: true });
