// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== CARDÁPIO DATA =====
const itens = [
  // PIZZAS — broto a partir de R$48, grande a partir de R$64
  {
    nome: 'Margherita',
    categoria: 'pizzas',
    desc: 'Molho de tomate, mozzarella e manjericão fresco. O clássico perfeito.',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🍅',
    bg: 'linear-gradient(135deg, #1A3A10, #0D2010)',
    destaque: false
  },
  {
    nome: 'Calabresa',
    categoria: 'pizzas',
    desc: 'Molho de tomate, mozzarella, calabresa fatiada e cebola em rodelas.',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🌶️',
    bg: 'linear-gradient(135deg, #3A1010, #200A0A)',
    destaque: true
  },
  {
    nome: 'Frango Catupiry',
    categoria: 'pizzas',
    desc: 'Frango desfiado temperado com catupiry cremoso. Favorito da casa!',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🐔',
    bg: 'linear-gradient(135deg, #2A2A10, #1A1A08)',
    destaque: true
  },
  {
    nome: 'Portuguesa',
    categoria: 'pizzas',
    desc: 'Presunto, ovos, cebola, azeitonas, pimentão e mozzarella.',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🥚',
    bg: 'linear-gradient(135deg, #103A1A, #082010)',
    destaque: false
  },
  {
    nome: 'Quatro Queijos',
    categoria: 'pizzas',
    desc: 'Mozzarella, catupiry, provolone e parmesão. Pura indulgência.',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🧀',
    bg: 'linear-gradient(135deg, #2A2010, #1A1308)',
    destaque: false
  },
  {
    nome: 'Pepperoni',
    categoria: 'pizzas',
    desc: 'Molho de tomate, mozzarella generosa e fatias de pepperoni artesanal.',
    precoFrom: 'R$ 48,00',
    precoExtra: 'Grande: R$ 64,00',
    emoji: '🍕',
    bg: 'linear-gradient(135deg, #3A0A0A, #200505)',
    destaque: false
  },
  // BEBIDAS
  {
    nome: 'Coca-Cola 2L',
    categoria: 'bebidas',
    desc: 'Coca-Cola normal ou Zero. Gelada e refrescante.',
    precoFrom: 'R$ 15,00',
    precoExtra: null,
    emoji: '🥤',
    bg: 'linear-gradient(135deg, #200505, #100202)',
    destaque: false
  },
  {
    nome: 'Coca-Cola 600ml',
    categoria: 'bebidas',
    desc: 'Garrafa individual Coca-Cola normal ou Zero.',
    precoFrom: 'R$ 9,00',
    precoExtra: null,
    emoji: '🍶',
    bg: 'linear-gradient(135deg, #200505, #100202)',
    destaque: false
  },
  {
    nome: 'Suco Del Valle Cítrico 1,5L',
    categoria: 'bebidas',
    desc: 'Suco Del Valle sabores cítricos. Laranja, limão e mais.',
    precoFrom: 'R$ 12,00',
    precoExtra: null,
    emoji: '🍊',
    bg: 'linear-gradient(135deg, #2A1A05, #1A1003)',
    destaque: false
  },
  {
    nome: 'Suco Del Valle Uva 1,5L',
    categoria: 'bebidas',
    desc: 'Suco Del Valle sabor uva. Refrescante e saboroso.',
    precoFrom: 'R$ 12,00',
    precoExtra: null,
    emoji: '🍇',
    bg: 'linear-gradient(135deg, #180A2A, #0D0518)',
    destaque: false
  },
  {
    nome: 'Guaraná Kuat 2L',
    categoria: 'bebidas',
    desc: 'Guaraná Kuat gelado para acompanhar sua pizza.',
    precoFrom: 'R$ 13,00',
    precoExtra: null,
    emoji: '🟢',
    bg: 'linear-gradient(135deg, #0A2010, #051008)',
    destaque: false
  }
];

function renderItens(filter = 'todas') {
  const grid = document.getElementById('cardapioGrid');
  grid.innerHTML = '';
  const filtered = filter === 'todas' ? itens : itens.filter(i => i.categoria === filter);

  filtered.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    card.style.animationDelay = `${i * 0.06}s`;

    const badgeLabel = item.categoria === 'pizzas' ? 'Pizza' : 'Bebida';

    card.innerHTML = `
      <div class="pizza-card__img" style="background: ${item.bg}">
        ${item.emoji}
        ${item.destaque ? '<div style="position:absolute;top:12px;right:12px;background:var(--green);color:#fff;font-size:.7rem;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:.05em;">⭐ MAIS PEDIDO</div>' : ''}
      </div>
      <div class="pizza-card__body">
        <span class="pizza-card__badge badge-${item.categoria}">${badgeLabel}</span>
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
        ${item.categoria === 'pizzas' ? `<p style="font-size:.78rem;color:rgba(255,255,255,.3);margin-top:-8px;margin-bottom:12px;">Broto (4 fatias) · Grande (8 fatias) · Até 2 sabores</p>` : ''}
        <div class="pizza-card__footer">
          <div class="pizza-card__prices">
            <span class="from">a partir de</span>
            <strong>${item.precoFrom}</strong>
          </div>
          <button class="pizza-card__add" title="Pedir pelo WhatsApp" onclick="pedirWhatsApp('${item.nome}')">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderItens(btn.dataset.filter);
  });
});

renderItens();

// ===== PEDIR PELO WHATSAPP =====
function pedirWhatsApp(nome) {
  const msg = encodeURIComponent(`Olá! Gostaria de pedir: ${nome} 🍕`);
  // Troque pelo número real da Supreme
  window.open(`https://wa.me/5535997555795?text=${msg}`, '_blank');
}

// ===== TOAST NOTIFICAÇÃO =====
function showToast(texto) {
  const toast = document.createElement('div');
  toast.textContent = texto;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
    background: '#0A0A0A', color: '#fff',
    border: '1px solid rgba(26,107,53,.4)',
    padding: '14px 20px', borderRadius: '12px',
    fontSize: '.9rem', fontFamily: "'Outfit', sans-serif",
    boxShadow: '0 8px 30px rgba(0,0,0,.5)',
    transform: 'translateY(20px)', opacity: '0',
    transition: 'all .3s ease', maxWidth: '320px'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.numbers__item, .depo-card, .contato__item, .sobre__text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop, h = sec.offsetHeight;
    const link = document.querySelector(`.nav__links a[href="#${sec.id}"]`);
    if (link) link.style.color = (pos >= top && pos < top + h) ? 'var(--green-l)' : '';
  });
});
