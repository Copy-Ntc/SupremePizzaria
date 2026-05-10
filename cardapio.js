/* ============================================================
   cardapio.js — Supreme Pizzaria
   Usado apenas em cardapio.html
   Sistema de carrinho estilo iFood:
   - Clique no item → abre modal (tipo, tamanho, 2º sabor, obs)
   - Adiciona ao carrinho → exibe no painel direito
   - Bebidas também são adicionadas ao carrinho pelo card
   - Envio gera mensagem formatada no WhatsApp
   ============================================================ */


/* ============================================================
   1. DADOS — Pizzas e Bebidas
   ============================================================ */

/* ── PIZZAS ──
   TODO: Ao ter fotos reais, altere "img" de .svg para .jpg (ou .webp)
   Ex: img: 'images/margherita.jpg'
   ── */
const PIZZAS = [
  {
    id: 'margherita',
    nome: 'Margherita',
    desc: 'Molho de tomate, mozzarella e manjericão fresco. O clássico perfeito.',
    img: 'images/margherita.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: false,
  },
  {
    id: 'calabresa',
    nome: 'Calabresa',
    desc: 'Molho de tomate, mozzarella, calabresa fatiada e cebola em rodelas.',
    img: 'images/calabresa.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: true,
  },
  {
    id: 'frango-catupiry',
    nome: 'Frango c/ Catupiry',
    desc: 'Frango desfiado temperado com catupiry cremoso. Favorito da casa!',
    img: 'images/frango-catupiry.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: true,
  },
  {
    id: 'quatro-queijos',
    nome: 'Quatro Queijos',
    desc: 'Mozzarella, catupiry, provolone e parmesão. Pura indulgência.',
    img: 'images/quatro-queijos.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: false,
  },
  {
    id: 'portuguesa',
    nome: 'Portuguesa',
    desc: 'Presunto, ovos, cebola, azeitonas, pimentão e mozzarella.',
    img: 'images/portuguesa.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: false,
  },
  {
    id: 'pepperoni',
    nome: 'Pepperoni',
    desc: 'Molho de tomate, mozzarella generosa e pepperoni artesanal.',
    img: 'images/pepperoni.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: false,
  },
  {
    id: 'bacon-cheddar',
    nome: 'Bacon c/ Cheddar',
    desc: 'Bacon crocante, cheddar cremoso e cebola caramelizada.',
    img: 'images/bacon-cheddar.svg',
    precoBroto: 48,
    precoGrande: 64,
    destaque: true,
  },
];

/* ── BEBIDAS ──
   Sem imagem SVG — usando emoji como ícone visual
   TODO: Se quiser fotos de bebidas, adicione img: 'images/nome-bebida.jpg'
   ── */
const BEBIDAS = [
  { id: 'coca2l-normal', nome: 'Coca-Cola 2L',             desc: 'Normal',       emoji: '🥤', preco: 15 },
  { id: 'coca2l-zero',   nome: 'Coca-Cola Zero 2L',        desc: 'Zero açúcar',  emoji: '🥤', preco: 15 },
  { id: 'coca600-normal',nome: 'Coca-Cola 600ml',           desc: 'Normal',       emoji: '🍶', preco: 9  },
  { id: 'coca600-zero',  nome: 'Coca-Cola Zero 600ml',      desc: 'Zero açúcar',  emoji: '🍶', preco: 9  },
  { id: 'delvalle-c',    nome: 'Del Valle Cítrico 1,5L',   desc: 'Sabor cítrico',emoji: '🍊', preco: 12 },
  { id: 'delvalle-u',    nome: 'Del Valle Uva 1,5L',       desc: 'Sabor uva',    emoji: '🍇', preco: 12 },
  { id: 'kuat2l',        nome: 'Guaraná Kuat 2L',           desc: 'Guaraná',      emoji: '🟢', preco: 13 },
];

const PEDIDO_MINIMO = 50;
const WHATSAPP_NUM  = '5535999999999'; // ← SUBSTITUA pelo número real da Supreme


/* ============================================================
   2. ESTADO DO PEDIDO (carrinho)
   ============================================================ */
let carrinho = []; // array de itens adicionados
let modalPizzaAtual = null; // pizza que está sendo configurada no modal


/* ============================================================
   3. RENDER — Lista de pizzas
   ============================================================ */
function renderPizzas() {
  const list = document.getElementById('listaPizzas');
  // Remove cards anteriores mas mantém o título
  list.querySelectorAll('.item-card').forEach(c => c.remove());

  PIZZAS.forEach(pizza => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card__img">
        <img src="${pizza.img}" alt="${pizza.nome}" loading="lazy"/>
      </div>
      <div class="item-card__info">
        <h3>
          ${pizza.nome}
          ${pizza.destaque ? '<span class="item-card__badge">⭐ Mais pedido</span>' : ''}
        </h3>
        <p>${pizza.desc}</p>
      </div>
      <div class="item-card__preco">
        <small>a partir de</small>
        R$ ${pizza.precoBroto},00
      </div>
      <button class="item-card__btn" aria-label="Adicionar ${pizza.nome}">+</button>
    `;

    // Clique em qualquer lugar do card ou no botão abre o modal
    card.addEventListener('click', () => abrirModal(pizza));
    list.appendChild(card);
  });
}


/* ============================================================
   4. RENDER — Lista de bebidas
   ============================================================ */
function renderBebidas() {
  const list = document.getElementById('listaBebidas');
  list.querySelectorAll('.item-card').forEach(c => c.remove());

  BEBIDAS.forEach(beb => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card__img" style="display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:var(--black3);">
        ${beb.emoji}
      </div>
      <div class="item-card__info">
        <h3>${beb.nome}</h3>
        <p>${beb.desc}</p>
      </div>
      <div class="item-card__preco">
        R$ ${beb.preco.toFixed(2).replace('.', ',')}
      </div>
      <button class="item-card__btn" aria-label="Adicionar ${beb.nome}">+</button>
    `;

    // Bebida adiciona direto ao carrinho (sem modal)
    card.addEventListener('click', () => adicionarBebida(beb));
    list.appendChild(card);
  });
}


/* ============================================================
   5. MODAL — Abrir / Fechar
   ============================================================ */
function abrirModal(pizza) {
  modalPizzaAtual = pizza;

  // Preenche header com imagem
  const header = document.getElementById('modalHeader');
  header.innerHTML = `<img src="${pizza.img}" alt="${pizza.nome}"/>`;

  // Preenche nome e descrição
  document.getElementById('modalTitulo').textContent = pizza.nome;
  document.getElementById('modalDesc').textContent   = pizza.desc;

  // Reseta opções
  document.querySelector('input[name="tipo"][value="inteira"]').checked  = true;
  document.querySelector('input[name="tamanho"][value="Broto"]').checked = true;
  document.getElementById('modalObs').value = '';
  document.getElementById('segundoSaborSection').classList.add('hidden');

  // Atualiza preços exibidos
  document.getElementById('precoBroto').textContent  = `R$ ${pizza.precoBroto},00`;
  document.getElementById('precoGrande').textContent = `R$ ${pizza.precoGrande},00`;

  // Renderiza lista de 2º sabor (exclui a pizza atual)
  renderSegundoSabor(pizza.id);

  // Abre overlay
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  modalPizzaAtual = null;
}

// Fecha ao clicar fora do modal
window.fecharModal = function(e) {
  if (e.target === document.getElementById('modalOverlay')) fecharModalBtn();
};

// Fecha com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModalBtn();
});


/* ============================================================
   6. MODAL — Segundo sabor (metade/metade)
   ============================================================ */
function renderSegundoSabor(idExcluido) {
  const lista = document.getElementById('segundoSaborList');
  lista.innerHTML = '';

  PIZZAS
    .filter(p => p.id !== idExcluido)
    .forEach(p => {
      const opt = document.createElement('div');
      opt.className = 'sabor2-opt';
      opt.dataset.id = p.id;
      opt.innerHTML = `
        <img src="${p.img}" alt="${p.nome}"/>
        <span>${p.nome}</span>
      `;
      opt.addEventListener('click', () => {
        // Toggle seleção
        lista.querySelectorAll('.sabor2-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
      lista.appendChild(opt);
    });
}

// Mostra/oculta seção do 2º sabor conforme o tipo escolhido
window.onTipoChange = function() {
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  document.getElementById('segundoSaborSection').classList.toggle('hidden', tipo !== 'metade');
  // Limpa seleção anterior
  document.querySelectorAll('.sabor2-opt').forEach(o => o.classList.remove('selected'));
};


/* ============================================================
   7. ADICIONAR AO CARRINHO — Pizza (vindo do modal)
   ============================================================ */
window.adicionarAoCarrinho = function() {
  if (!modalPizzaAtual) return;

  const tipo    = document.querySelector('input[name="tipo"]:checked')?.value;
  const tamanho = document.querySelector('input[name="tamanho"]:checked')?.value;
  const obs     = document.getElementById('modalObs').value.trim();

  // Valida 2º sabor se metade/metade
  let sabor2 = null;
  if (tipo === 'metade') {
    const sel = document.querySelector('.sabor2-opt.selected');
    if (!sel) {
      alert('Escolha o 2º sabor para pizza metade a metade!');
      return;
    }
    sabor2 = PIZZAS.find(p => p.id === sel.dataset.id);
  }

  const preco = tamanho === 'Broto' ? modalPizzaAtual.precoBroto : modalPizzaAtual.precoGrande;

  // Monta descrição do item
  let nomeItem = tipo === 'metade'
    ? `½ ${modalPizzaAtual.nome} + ½ ${sabor2.nome}`
    : modalPizzaAtual.nome;

  carrinho.push({
    tipo: 'pizza',
    nome: nomeItem,
    tamanho,
    preco,
    obs: obs || null,
  });

  fecharModalBtn();
  renderCarrinho();
  mostrarToast(`🍕 ${nomeItem} adicionada!`);
};


/* ============================================================
   8. ADICIONAR AO CARRINHO — Bebida (direto do card)
   ============================================================ */
function adicionarBebida(beb) {
  // Verifica se já tem no carrinho — se tiver, só incrementa quantidade
  const existente = carrinho.find(i => i.tipo === 'bebida' && i.id === beb.id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ tipo: 'bebida', id: beb.id, nome: beb.nome, preco: beb.preco, qtd: 1 });
  }
  renderCarrinho();
  mostrarToast(`🥤 ${beb.nome} adicionada!`);
}


/* ============================================================
   9. RENDER — Carrinho
   ============================================================ */
function renderCarrinho() {
  const cartEmpty  = document.getElementById('cartEmpty');
  const cartItems  = document.getElementById('cartItems');
  const cartTotal  = document.getElementById('cartTotal');
  const formEnd    = document.getElementById('formEndereco');
  const btnEnviar  = document.getElementById('btnEnviar');
  const pedidoHint = document.getElementById('pedidoHint');

  if (carrinho.length === 0) {
    cartEmpty.style.display  = 'block';
    cartItems.style.display  = 'none';
    cartTotal.style.display  = 'none';
    formEnd.style.display    = 'none';
    btnEnviar.style.display  = 'none';
    pedidoHint.style.display = 'none';
    return;
  }

  // Mostra elementos
  cartEmpty.style.display  = 'none';
  cartItems.style.display  = 'flex';
  cartTotal.style.display  = 'flex';
  formEnd.style.display    = 'block';
  btnEnviar.style.display  = 'flex';
  pedidoHint.style.display = 'block';

  // Renderiza itens
  cartItems.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, idx) => {
    const precoItem = item.tipo === 'bebida' ? item.preco * item.qtd : item.preco;
    total += precoItem;

    const div = document.createElement('div');
    div.className = 'cart-item';

    if (item.tipo === 'pizza') {
      div.innerHTML = `
        <div class="cart-item__info">
          <strong>${item.nome}</strong>
          <span>${item.tamanho}${item.obs ? ' · ' + item.obs : ''}</span>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__preco">R$ ${precoItem.toFixed(2).replace('.', ',')}</span>
          <button class="btn--remove" onclick="removerItem(${idx})" title="Remover">🗑</button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="cart-item__info">
          <strong>${item.nome}</strong>
          <span>Qtd: ${item.qtd}</span>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__preco">R$ ${precoItem.toFixed(2).replace('.', ',')}</span>
          <button class="btn--remove" onclick="removerItem(${idx})" title="Remover">🗑</button>
        </div>
      `;
    }
    cartItems.appendChild(div);
  });

  document.getElementById('cartTotalValue').textContent =
    `R$ ${total.toFixed(2).replace('.', ',')}`;
}


/* ============================================================
   10. REMOVER ITEM DO CARRINHO
   ============================================================ */
window.removerItem = function(idx) {
  carrinho.splice(idx, 1);
  renderCarrinho();
};


/* ============================================================
   11. ENVIAR PEDIDO — monta mensagem e abre WhatsApp
   ============================================================ */
window.enviarPedido = function() {
  if (carrinho.length === 0) return;

  // Calcula total
  const total = carrinho.reduce((acc, i) => acc + (i.tipo === 'bebida' ? i.preco * i.qtd : i.preco), 0);

  // Valida pedido mínimo
  if (total < PEDIDO_MINIMO) {
    document.getElementById('avisoMin').classList.remove('hidden');
    document.getElementById('avisoMin').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }
  document.getElementById('avisoMin').classList.add('hidden');

  // Valida endereço
  const rua    = document.getElementById('endRua').value.trim();
  const num    = document.getElementById('endNum').value.trim();
  const bairro = document.getElementById('endBairro').value.trim();
  const comp   = document.getElementById('endComp').value.trim();
  const obs    = document.getElementById('obsGeral').value.trim();

  if (!rua || !num || !bairro) {
    alert('Preencha rua, número e bairro para continuar.');
    document.getElementById('endRua').focus();
    return;
  }

  // ── Monta a mensagem ──
  let msg = `🍕 *Olá, Supreme Pizzaria!* Gostaria de fazer um pedido:\n\n`;
  msg += `*📋 ITENS DO PEDIDO*\n`;

  carrinho.forEach((item, i) => {
    const preco = item.tipo === 'bebida' ? item.preco * item.qtd : item.preco;
    if (item.tipo === 'pizza') {
      msg += `${i + 1}. *${item.nome}*\n`;
      msg += `   Tamanho: ${item.tamanho} (${item.tamanho === 'Broto' ? '4 fatias' : '8 fatias'})\n`;
      msg += `   Valor: R$ ${preco.toFixed(2).replace('.', ',')}\n`;
      if (item.obs) msg += `   Obs: ${item.obs}\n`;
    } else {
      msg += `${i + 1}. *${item.nome}* (x${item.qtd})\n`;
      msg += `   Valor: R$ ${preco.toFixed(2).replace('.', ',')}\n`;
    }
    msg += '\n';
  });

  msg += `💰 *Total estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  msg += `_(Confirme o valor final com a loja)_\n\n`;

  msg += `📍 *ENDEREÇO DE ENTREGA*\n`;
  msg += `Rua/Av.: ${rua}, Nº ${num}\n`;
  msg += `Bairro: ${bairro}\n`;
  if (comp) msg += `Complemento: ${comp}\n`;
  if (obs)  msg += `\n📝 *Observações:* ${obs}\n`;

  msg += `\n_Aguardo confirmação e prazo de entrega! 😊_`;

  // Abre WhatsApp
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
};


/* ============================================================
   12. FILTROS — Pizzas / Bebidas
   ============================================================ */
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.getElementById('listaPizzas').classList.toggle('hidden', cat !== 'pizzas');
    document.getElementById('listaBebidas').classList.toggle('hidden', cat !== 'bebidas');
  });
});


/* ============================================================
   13. TOAST — Notificação rápida ao adicionar item
   ============================================================ */
function mostrarToast(texto) {
  const toast = document.createElement('div');
  toast.textContent = texto;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#0A0A0A', color: '#F2EDE6',
    border: '1px solid rgba(26,107,53,.4)',
    padding: '12px 22px', borderRadius: '100px',
    fontSize: '.88rem', fontFamily: "'Outfit', sans-serif",
    boxShadow: '0 8px 30px rgba(0,0,0,.5)',
    opacity: '0', transition: 'all .28s ease',
    zIndex: '2000', whiteSpace: 'nowrap',
  });
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}


/* ============================================================
   14. INICIALIZAÇÃO
   ============================================================ */
renderPizzas();
renderBebidas();
