// ===== DADOS DO CARDÁPIO =====
const pizzas = [
  { id: 'margherita', nome: 'Margherita', desc: 'Molho de tomate, mozzarella e manjericão fresco.', emoji: '🍅', destaque: false },
  { id: 'calabresa',  nome: 'Calabresa',  desc: 'Molho de tomate, mozzarella, calabresa e cebola.', emoji: '🌶️', destaque: true },
  { id: 'frango',     nome: 'Frango com Catupiry', desc: 'Frango desfiado temperado com catupiry cremoso.', emoji: '🐔', destaque: true },
  { id: 'quatro',     nome: 'Quatro Queijos', desc: 'Mozzarella, catupiry, provolone e parmesão.', emoji: '🧀', destaque: false },
  { id: 'portuguesa', nome: 'Portuguesa', desc: 'Presunto, ovos, cebola, azeitonas e pimentão.', emoji: '🥚', destaque: false },
  { id: 'pepperoni',  nome: 'Pepperoni',  desc: 'Molho de tomate, mozzarella e pepperoni artesanal.', emoji: '🍕', destaque: false },
  { id: 'frango-brocolis', nome: 'Frango com Brócolis', desc: 'Frango desfiado, brócolis refogado e cream cheese.', emoji: '🥦', destaque: false },
  { id: 'bacon',      nome: 'Bacon com Cheddar', desc: 'Bacon crocante, cheddar cremoso e cebola caramelizada.', emoji: '🥓', destaque: true },
];

const bebidas = [
  { id: 'coca2l',       nome: 'Coca-Cola 2L',              desc: 'Normal ou Zero', emoji: '🥤', preco: 'R$ 15,00' },
  { id: 'coca600',      nome: 'Coca-Cola 600ml',            desc: 'Normal ou Zero', emoji: '🍶', preco: 'R$ 9,00'  },
  { id: 'delvalle-c',   nome: 'Suco Del Valle Cítrico 1,5L',desc: 'Laranja, limão e outros',  emoji: '🍊', preco: 'R$ 12,00' },
  { id: 'delvalle-u',   nome: 'Suco Del Valle Uva 1,5L',   desc: 'Sabor uva refrescante',    emoji: '🍇', preco: 'R$ 12,00' },
  { id: 'kuat',         nome: 'Guaraná Kuat 2L',            desc: 'Gelado e refrescante',     emoji: '🟢', preco: 'R$ 13,00' },
];

// ===== ESTADO DO PEDIDO =====
let saboresSelecionados = []; // max 2
let querBebida = false;

// ===== RENDER PIZZAS =====
function renderPizzas() {
  const list = document.getElementById('listaPizzas');
  const titulo = list.querySelector('.item-group-title');
  list.innerHTML = '';
  list.appendChild(titulo);

  pizzas.forEach(p => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = p.id;
    if (saboresSelecionados.find(s => s.id === p.id)) card.classList.add('selected');
    if (saboresSelecionados.length >= 2 && !saboresSelecionados.find(s => s.id === p.id)) card.classList.add('disabled');

    card.innerHTML = `
      <div class="item-card__emoji">${p.emoji}</div>
      <div class="item-card__info">
        <h3>${p.nome}${p.destaque ? '<span class="destaque">⭐ MAIS PEDIDO</span>' : ''}</h3>
        <p>${p.desc}</p>
      </div>
      <div class="item-card__preco">a partir de<br><strong>R$ 48</strong></div>
      <div class="item-card__check"></div>
    `;

    card.addEventListener('click', () => toggleSabor(p));
    list.appendChild(card);
  });
}

// ===== RENDER BEBIDAS =====
function renderBebidas() {
  const list = document.getElementById('listaBebidas');
  const titulo = list.querySelector('.item-group-title');
  list.innerHTML = '';
  list.appendChild(titulo);

  bebidas.forEach(b => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card__emoji">${b.emoji}</div>
      <div class="item-card__info">
        <h3>${b.nome}</h3>
        <p>${b.desc}</p>
      </div>
      <div class="item-card__preco"><strong>${b.preco}</strong></div>
    `;
    // bebidas são informativas; seleção via select no form
    list.appendChild(card);
  });
}

// ===== TOGGLE SABOR =====
function toggleSabor(pizza) {
  const idx = saboresSelecionados.findIndex(s => s.id === pizza.id);
  if (idx > -1) {
    saboresSelecionados.splice(idx, 1);
  } else {
    if (saboresSelecionados.length >= 2) return; // max 2
    saboresSelecionados.push(pizza);
  }
  renderPizzas();
  atualizarSaboresForm();
}

// ===== ATUALIZAR TAGS DE SABORES NO FORM =====
function atualizarSaboresForm() {
  const area = document.getElementById('saboresEscolhidos');
  area.innerHTML = '';
  if (saboresSelecionados.length === 0) {
    area.innerHTML = '<p class="placeholder-text">← Toque em um sabor no cardápio</p>';
    return;
  }
  saboresSelecionados.forEach(s => {
    const tag = document.createElement('span');
    tag.className = 'sabor-tag';
    tag.innerHTML = `${s.emoji} ${s.nome} <button onclick="removerSabor('${s.id}')" title="Remover">×</button>`;
    area.appendChild(tag);
  });
}

function removerSabor(id) {
  saboresSelecionados = saboresSelecionados.filter(s => s.id !== id);
  renderPizzas();
  atualizarSaboresForm();
}

// ===== TOGGLE BEBIDA =====
window.toggleBebida = function(quer) {
  querBebida = quer;
  document.getElementById('btnSemBebida').classList.toggle('active', !quer);
  document.getElementById('btnComBebida').classList.toggle('active', quer);
  document.getElementById('bebidaSelect').classList.toggle('hidden', !quer);
};

// ===== FILTROS =====
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.getElementById('listaPizzas').classList.toggle('hidden', cat !== 'pizzas');
    document.getElementById('listaBebidas').classList.toggle('hidden', cat !== 'bebidas');
  });
});

// ===== ENVIAR PEDIDO =====
window.enviarPedido = function() {
  // Validações
  if (saboresSelecionados.length === 0) {
    alert('Por favor, escolha pelo menos 1 sabor de pizza.');
    document.getElementById('listaPizzas').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const tamanhoEl = document.querySelector('input[name="tamanho"]:checked');
  if (!tamanhoEl) {
    alert('Por favor, escolha o tamanho: Broto ou Grande.');
    return;
  }
  const endereco = document.getElementById('endereco').value.trim();
  if (!endereco) {
    alert('Por favor, informe o endereço de entrega.');
    document.getElementById('endereco').focus();
    return;
  }

  const tamanho = tamanhoEl.value;
  const precoBase = tamanho === 'Broto' ? 48 : 64;
  const saboresNomes = saboresSelecionados.map(s => s.nome).join(' + ');

  // Verifica pedido mínimo
  const bebidaSelecionada = querBebida ? document.getElementById('selectBebida').value : '';
  let valorEstimado = precoBase;
  if (bebidaSelecionada) {
    const match = bebidaSelecionada.match(/R\$ ([\d,]+)/);
    if (match) valorEstimado += parseFloat(match[1].replace(',', '.'));
  }

  if (valorEstimado < 50) {
    document.getElementById('avisoMin').style.display = 'block';
    document.getElementById('avisoMin').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  } else {
    document.getElementById('avisoMin').style.display = 'none';
  }

  const obs = document.getElementById('obs').value.trim();

  // Monta a mensagem
  let msg = `🍕 *Olá, Supreme Pizzaria!* Quero fazer um pedido:\n\n`;
  msg += `*📋 PEDIDO*\n`;
  msg += `• Pizza: *${saboresNomes}*\n`;
  msg += `• Tamanho: *${tamanho}* (${tamanho === 'Broto' ? '4 fatias' : '8 fatias'}) — a partir de *R$ ${precoBase},00*\n`;
  if (bebidaSelecionada) msg += `• Bebida: *${bebidaSelecionada}*\n`;
  else msg += `• Bebida: Sem bebida\n`;
  if (obs) msg += `• Observações: ${obs}\n`;
  msg += `\n*📍 ENTREGA*\n`;
  msg += `• Endereço: ${endereco}\n`;
  msg += `\n_Aguardo confirmação e o valor total! 😊_`;

  // NÚMERO REAL DA SUPREME — substitua abaixo:
  const numero = '5535997555795';
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
};

// ===== INIT =====
renderPizzas();
renderBebidas();
