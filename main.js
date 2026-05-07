// ===== NAV =====
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK (home page) =====
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 100;
    sections.forEach(sec => {
      const link = navLinks?.querySelector(`a[href="#${sec.id}"]`);
      if (!link) return;
      const inView = pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight;
      link.classList.toggle('active', inView);
    });
  }, { passive: true });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.08 });

document.querySelectorAll('.numbers__item, .sobre__text, .c-item, .gal-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
