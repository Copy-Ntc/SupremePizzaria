/* ============================================================
   main.js — Supreme Pizzaria
   Usado em TODAS as páginas: nav, scroll reveal, galeria
   ============================================================ */


/* ============================================================
   1. NAVEGAÇÃO — scroll + hambúrguer
   ============================================================ */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

// Torna a nav sólida ao rolar
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Abre/fecha menu mobile
hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em um link
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});

// Destaca o link ativo conforme a seção visível (só na home)
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


/* ============================================================
   2. SCROLL REVEAL — fade-in ao entrar na tela
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target); // anima só uma vez
    }
  });
}, { threshold: 0.08 });

// Elementos que devem aparecer com animação
document.querySelectorAll('.c-item, .sobre__text, .gal-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


/* ============================================================
   3. GALERIA — carousel infinito com imagens da pasta /images
   ============================================================ */

/* ── Lista de pizzas para a galeria ──
   TODO: Quando tiver fotos reais, altere a extensão de .svg para .jpg (ou .webp)
   mantendo o mesmo nome de arquivo na pasta /images
   ── */
const pizzasGaleria = [
  { nome: 'Margherita',         img: 'images/margherita.svg'      },
  { nome: 'Calabresa',          img: 'images/calabresa.svg'       },
  { nome: 'Frango c/ Catupiry', img: 'images/frango-catupiry.svg' },
  { nome: 'Quatro Queijos',     img: 'images/quatro-queijos.svg'  },
  { nome: 'Portuguesa',         img: 'images/portuguesa.svg'      },
  { nome: 'Pepperoni',          img: 'images/pepperoni.svg'       },
  { nome: 'Bacon c/ Cheddar',   img: 'images/bacon-cheddar.svg'   },
];

const galeriaTrack = document.getElementById('galeriaTrack');
if (galeriaTrack) {
  // Duplica os cards para loop infinito suave
  const todosCards = [...pizzasGaleria, ...pizzasGaleria];

  todosCards.forEach(p => {
    const card = document.createElement('div');
    card.className = 'gal-card';
    card.innerHTML = `
      <img src="${p.img}" alt="Pizza ${p.nome}" loading="lazy"/>
      <p>${p.nome}</p>
    `;
    galeriaTrack.appendChild(card);
  });
}
