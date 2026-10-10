/* =========================================================
   APP PRINCIPAL — Encanto do Lar
   ========================================================= */
const CFG = window.STORE_CONFIG;
const currency = (n) => 'R$ ' + (Number(n)||0).toFixed(2).replace('.',',');

/* ---------- TOAST ---------- */
function toast(msg, type=''){
  const el = document.getElementById('toast');
  el.className = 'toast show ' + type;
  el.textContent = msg;
  clearTimeout(el._t);
  el._t = setTimeout(()=> el.classList.remove('show'), 3200);
}

/* ---------- NAVEGAÇÃO ENTRE PÁGINAS ---------- */
function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if(target) target.classList.add('active');
  window.scrollTo({top:0, behavior:'instant'});
  closeSideMenu();
}

/* ---------- MENU LATERAL ---------- */
function openSideMenu(){ document.getElementById('sideMenu').classList.add('open'); document.getElementById('overlay').classList.add('active'); }
function closeSideMenu(){ document.getElementById('sideMenu').classList.remove('open'); document.getElementById('overlay').classList.remove('active'); }

/* ---------- CATEGORIAS GRID (home) ---------- */
function renderCategories(){
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = window.CATEGORIES.slice(0,8).map(c => `
    <div class="category-card" data-cat="${c.id}">
      <img src="${c.img}" alt="${c.label}" loading="lazy">
      <div class="category-card-overlay">
        <h3>${c.label}</h3>
        <span>Ver produtos</span>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.category-card').forEach(el => {
    el.addEventListener('click', () => { filterByCategory(el.dataset.cat); scrollToCatalog(); });
  });
}

/* ---------- CARD DE PRODUTO ---------- */
function productCard(p){
  const hasPromo = p.previousPrice && p.previousPrice > p.price;
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card-media">
        ${hasPromo ? '<span class="badge-promo">Promoção</span>' : ''}
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        <span class="product-cat">${catLabel(p.category)}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-price-row">
          <span class="product-price">${currency(p.price)}</span>
          ${hasPromo ? `<span class="product-price-old">${currency(p.previousPrice)}</span>` : ''}
        </div>
        <div class="product-colors">
          ${p.colors.map(c => `<span class="color-dot" style="background:${c.hex}" title="${c.label}"></span>`).join('')}
        </div>
        <div class="product-actions">
          <button class="btn btn-outline" data-action="view">Ver produto</button>
          <button class="btn btn-primary" data-action="add">Adicionar</button>
        </div>
      </div>
    </article>
  `;
}
function catLabel(id){ const c = window.CATEGORIES.find(x=>x.id===id); return c ? c.label : id; }

/* ---------- RENDERIZAR PRODUTOS COM FILTROS ---------- */
function renderProducts(list){
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultsCount');
  if(!list.length){
    grid.innerHTML = ''; empty.style.display = 'block'; count.textContent = '0 produtos';
    return;
  }
  empty.style.display = 'none';
  count.textContent = list.length + (list.length === 1 ? ' produto' : ' produtos');
  grid.innerHTML = list.map(productCard).join('');
  bindProductCards();
}

function bindProductCards(){
  document.querySelectorAll('.product-card').forEach(card => {
    const id = Number(card.dataset.id);
    card.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if(action === 'add'){
        e.stopPropagation();
        const p = window.findProductById(id);
        const defaultColor = p.colors[0]?.id;
        const defaultSize = p.sizes ? p.sizes[0] : null;
        if(window.addToCart(id, defaultColor, defaultSize, 1)){
          toast(`${p.name} adicionado ao carrinho`, 'success');
        }
      } else {
        openProduct(id);
      }
    });
  });
}

/* ---------- FILTROS E ORDENAÇÃO ---------- */
let filters = { cat:'', price:'', sort:'featured', search:'' };

function applyFilters(){
  let list = [...window.ALL_PRODUCTS];
  if(filters.cat) list = list.filter(p => p.category === filters.cat);
  if(filters.search){
    const q = filters.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      catLabel(p.category).toLowerCase().includes(q)
    );
  }
  if(filters.price){
    const [min,max] = filters.price.split('-').map(Number);
    list = list.filter(p => p.price >= min && p.price <= max);
  }
  switch(filters.sort){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'name': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    default: list.sort((a,b)=> (b.featured?1:0) - (a.featured?1:0));
  }
  renderProducts(list);
}

function filterByCategory(cat){
  filters.cat = cat === 'all' ? '' : cat;
  document.getElementById('filterCat').value = filters.cat;
  document.querySelectorAll('.cat-link').forEach(l => l.classList.toggle('active', l.dataset.cat === (cat||'all')));
  applyFilters();
}
function scrollToCatalog(){ document.getElementById('catalog').scrollIntoView({behavior:'smooth'}); }

/* ---------- DESTAQUES (HOME) ---------- */
function renderFeatured(){
  const grid = document.getElementById('featuredGrid');
  const list = window.ALL_PRODUCTS.filter(p => p.featured).slice(0,4);
  grid.innerHTML = list.map(productCard).join('');
  bindProductCards();
}

/* ---------- PÁGINA DE PRODUTO ---------- */
let currentProductState = { id:null, color:null, size:null, qty:1 };

function openProduct(id){
  const p = window.findProductById(id);
  if(!p) return;
  currentProductState = {
    id: p.id,
    color: p.colors[0]?.id || null,
    size: p.sizes ? p.sizes[0] : null,
    qty: 1
  };
  renderProductPage();
  showPage('product');
}

function renderProductPage(){
  const p = window.findProductById(currentProductState.id);
  if(!p) return;
  const hasPromo = p.previousPrice && p.previousPrice > p.price;
  const related = window.ALL_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,4);

  document.getElementById('productDetail').innerHTML = `
    <div class="product-gallery">
      <div class="product-gallery-main"><img id="galleryMain" src="${p.images[0]}" alt="${p.name}"></div>
      <div class="product-thumbs">
        ${p.images.map((src,i)=>`<div class="product-thumb ${i===0?'active':''}" data-idx="${i}"><img src="${src}" alt="${p.name} ${i+1}"></div>`).join('')}
      </div>
    </div>
    <div class="product-info">
      <span class="cat-pill">${catLabel(p.category)}</span>
      <h1>${p.name}</h1>
      <p class="product-desc">${p.description}</p>

      <div class="product-price-row">
        <span class="product-price">${currency(p.price)}</span>
        ${hasPromo ? `<span class="product-price-old">${currency(p.previousPrice)}</span>` : ''}
      </div>

      <div class="option-group">
        <h3>Cor</h3>
        <div class="option-list" id="colorList">
          ${p.colors.map(c => `<div class="color-chip ${c.id===currentProductState.color?'active':''}" data-color="${c.id}" style="background:${c.hex}" title="${c.label}"></div>`).join('')}
        </div>
      </div>

      ${p.sizes ? `
      <div class="option-group">
        <h3>Tamanho</h3>
        <div class="option-list" id="sizeList">
          ${p.sizes.map(s => `<button class="option-chip ${s===currentProductState.size?'active':''}" data-size="${s}">${s}</button>`).join('')}
        </div>
      </div>` : ''}

      <div class="option-group">
        <h3>Quantidade</h3>
        <div class="qty-selector">
          <button id="qtyMinus" aria-label="Diminuir">−</button>
          <input type="number" id="qtyInput" value="1" min="1" max="10" readonly>
          <button id="qtyPlus" aria-label="Aumentar">+</button>
        </div>
        <p class="stock-info"><span class="stock-available">● Disponível em estoque</span></p>
      </div>

      <div class="detail-actions">
        <button class="btn btn-primary" id="addToCartBtn"><i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho</button>
        <button class="btn btn-outline" id="buyNowBtn"><i class="fab fa-whatsapp"></i> Comprar agora</button>
      </div>

      <div class="product-meta">
        <details open><summary>Material</summary><p>${p.material}</p></details>
        <details><summary>Dimensões</summary><p>${p.dimensions}</p></details>
        <details><summary>Instruções de lavagem</summary><p>${p.washing}</p></details>
        <details><summary>Entrega e Frete</summary><p>Frete combinado pelo WhatsApp após o envio do pedido. Para São Bento (PB): entrega local ou retirada.</p></details>
      </div>
    </div>
  `;

  // Galeria
  document.querySelectorAll('.product-thumb').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.product-thumb').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('galleryMain').src = p.images[Number(t.dataset.idx)];
    });
  });

  // Cor
  document.querySelectorAll('#colorList .color-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#colorList .color-chip').forEach(x=>x.classList.remove('active'));
      chip.classList.add('active');
      currentProductState.color = chip.dataset.color;
    });
  });

  // Tamanho
  document.querySelectorAll('#sizeList .option-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#sizeList .option-chip').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      currentProductState.size = btn.dataset.size;
    });
  });

  // Quantidade
  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').addEventListener('click', ()=>{
    if(currentProductState.qty > 1){ currentProductState.qty--; qtyInput.value = currentProductState.qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', ()=>{
    if(currentProductState.qty < 10){ currentProductState.qty++; qtyInput.value = currentProductState.qty; }
    else toast('Máximo de 10 unidades', 'error');
  });

  // Adicionar
  document.getElementById('addToCartBtn').addEventListener('click', ()=>{
    const ok = window.addToCart(p.id, currentProductState.color, currentProductState.size, currentProductState.qty);
    if(ok) toast(`${p.name} adicionado ao carrinho`, 'success');
  });

  // Comprar agora
  document.getElementById('buyNowBtn').addEventListener('click', ()=>{
    window.addToCart(p.id, currentProductState.color, currentProductState.size, currentProductState.qty);
    showPage('checkout');
    renderCheckoutSummary();
  });

  // Relacionados
  const relatedHTML = related.length ? `
    <div class="related-section">
      <h2>Produtos relacionados</h2>
      <div class="products-grid">${related.map(productCard).join('')}</div>
    </div>` : '';
  document.getElementById('productDetail').insertAdjacentHTML('afterend', relatedHTML);
  bindProductCards();
}

/* ---------- CARRINHO ---------- */
function renderCartPage(){
  const cart = window.getCart();
  const wrap = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if(!cart.length){
    wrap.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><h3>Seu carrinho está vazio</h3><p>Adicione produtos para continuar.</p><button class="btn btn-primary" id="emptyGoHome">Ver produtos</button></div>`;
    summary.innerHTML = '';
    document.getElementById('emptyGoHome')?.addEventListener('click', ()=>showPage('home'));
    return;
  }
  wrap.innerHTML = cart.map(item => {
    const key = window.cartItemKey(item);
    const color = window.findProductById(item.productId)?.colors.find(c=>c.id===item.color);
    const sizeTxt = item.size ? `Tamanho: ${item.size}` : '';
    return `
      <div class="cart-item" data-key="${key}">
        <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          ${color ? `<p class="meta">Cor: ${color.label}</p>` : ''}
          ${sizeTxt ? `<p class="meta">${sizeTxt}</p>` : ''}
          <p class="meta">Unitário: ${currency(item.unitPrice)}</p>
          <p class="price">Subtotal: ${currency(item.unitPrice * item.quantity)}</p>
        </div>
        <div class="cart-item-right">
          <div class="qty-selector">
            <button data-q="-1">−</button>
            <input type="number" value="${item.quantity}" readonly>
            <button data-q="1">+</button>
          </div>
          <button class="remove-btn" data-remove>Remover</button>
        </div>
      </div>`;
  }).join('');

  wrap.querySelectorAll('.cart-item').forEach(row => {
    const key = row.dataset.key;
    row.querySelectorAll('[data-q]').forEach(btn => {
      btn.addEventListener('click', ()=>{
        window.updateQuantity(key, Number(btn.dataset.q));
        renderCartPage();
      });
    });
    row.querySelector('[data-remove]').addEventListener('click', ()=>{
      window.removeFromCart(key);
      renderCartPage();
      toast('Produto removido', 'success');
    });
  });

  const t = window.getCartTotals();
  summary.innerHTML = `
    <h3>Resumo</h3>
    <div class="summary-line"><span>Subtotal</span><span>${currency(t.subtotal)}</span></div>
    <div class="summary-line"><span>Frete</span><span>${CFG.shipping.defaultMessage.includes('confirmar') ? 'A confirmar' : currency(t.shipping)}</span></div>
    <div class="summary-line total"><span>Total estimado</span><span>${currency(t.total)}</span></div>
    <button class="btn btn-primary btn-block" id="goCheckout">Finalizar pedido</button>
    <a href="#" class="link-cart" id="continueShopping">Continuar comprando</a>
  `;
  document.getElementById('goCheckout').addEventListener('click', ()=>{ showPage('checkout'); renderCheckoutSummary(); });
  document.getElementById('continueShopping').addEventListener('click', (e)=>{ e.preventDefault(); showPage('home'); });
}

/* ---------- CHECKOUT ---------- */
function renderCheckoutSummary(){
  const cart = window.getCart();
  const wrap = document.getElementById('checkoutSummary');
  if(!cart.length){
    wrap.innerHTML = `<h3>Resumo do pedido</h3><p>Seu carrinho está vazio.</p>`;
    return;
  }
  const t = window.getCartTotals();
  wrap.innerHTML = `
    <h3>Resumo do pedido</h3>
    ${cart.map(i => `
      <div class="checkout-item">
        <div class="checkout-item-img"><img src="${i.image}" alt="${i.name}"></div>
        <div class="checkout-item-info">
          <strong>${i.name}</strong>
          <span>${i.color||''} ${i.size ? '· '+i.size : ''} · Qtd: ${i.quantity}</span>
        </div>
        <div class="checkout-item-price">${currency(i.unitPrice*i.quantity)}</div>
      </div>
    `).join('')}
    <div class="summary-line" style="margin-top:12px"><span>Subtotal</span><span>${currency(t.subtotal)}</span></div>
    <div class="summary-line"><span>Frete</span><span>A confirmar</span></div>
    <div class="summary-line total"><span>Total estimado</span><span>${currency(t.total)}</span></div>
  `;
}

/* ---------- VIACEP ---------- */
async function lookupCep(cep){
  cep = (cep||'').replace(/\D/g,'');
  if(cep.length !== 8) return;
  const hint = document.getElementById('cepHint');
  hint.textContent = 'Consultando CEP...';
  hint.classList.remove('ok');
  try{
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await r.json();
    if(data.erro){ hint.textContent = 'CEP não encontrado. Preencha manualmente.'; return; }
    const form = document.getElementById('checkoutForm');
    form.street.value = data.logradouro || '';
    form.neighborhood.value = data.bairro || '';
    form.city.value = data.localidade || '';
    form.state.value = data.uf || '';
    hint.textContent = 'Endereço preenchido automaticamente. Edite se necessário.';
    hint.classList.add('ok');
  }catch(e){
    hint.textContent = 'Não foi possível buscar o CEP. Preencha manualmente.';
  }
}

/* ---------- FINALIZAR PELO WHATSAPP ---------- */
function finalizeOrder(){
  const form = document.getElementById('checkoutForm');
  const required = ['name','phone','cep','street','number','neighborhood','city','state'];
  let valid = true;
  required.forEach(name => {
    const el = form[name];
    if(!el.value.trim()){ el.classList.add('error'); valid = false; }
    else el.classList.remove('error');
  });
  const err = document.getElementById('formError');
  if(!valid){
    err.textContent = 'Preencha todos os campos obrigatórios.';
    err.style.display = 'block';
    err.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }
  err.style.display = 'none';

  if(!CFG.whatsapp){
    alert('⚠️ O número de WhatsApp da loja ainda não foi configurado.\n\nO administrador deve editar o arquivo js/config.js e preencher o campo "whatsapp" antes de publicar a loja.');
    return;
  }

  const cart = window.getCart();
  if(!cart.length){ alert('Seu carrinho está vazio.'); return; }
  const t = window.getCartTotals();

  const lines = cart.map((i,idx) => {
    const sub = i.unitPrice * i.quantity;
    return `${idx+1}. ${i.name}${i.color ? ' — '+i.color : ''}${i.size ? ' / '+i.size : ''} — ${i.quantity}x ${currency(i.unitPrice)} = ${currency(sub)}`;
  }).join('\n');

  const msg = [
    `*NOVO PEDIDO — ${CFG.name}*`,
    ``,
    `*👤 Cliente*`,
    `Nome: ${form.name.value}`,
    `Telefone: ${form.phone.value}`,
    form.email.value ? `E-mail: ${form.email.value}` : '',
    ``,
    `*📍 Endereço*`,
    `${form.street.value}, ${form.number.value}${form.complement.value ? ' — '+form.complement.value : ''}`,
    `Bairro: ${form.neighborhood.value}`,
    `Cidade: ${form.city.value} - ${form.state.value}`,
    `CEP: ${form.cep.value}`,
    form.reference.value ? `Referência: ${form.reference.value}` : '',
    ``,
    `*🛍️ Itens*`,
    lines,
    ``,
    `*💰 Resumo*`,
    `Subtotal: ${currency(t.subtotal)}`,
    `Frete: a confirmar`,
    `Total estimado: ${currency(t.total)}`,
    form.notes.value ? `\n*📝 Observações*\n${form.notes.value}` : ''
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  toast('Pedido enviado para o WhatsApp. Confirme o envio no aplicativo.', 'success');
}

/* ---------- CONTATOS CONFIGURÁVEIS ---------- */
function applyConfig(){
  document.getElementById('promoMessage').textContent = CFG.promoMessage;
  document.getElementById('year').textContent = new Date().getFullYear();
  const waUrl = CFG.whatsapp ? `https://wa.me/${CFG.whatsapp}` : '#';
  document.getElementById('whatsFloat').href = waUrl;
  const fw = document.getElementById('footerWhats');
  fw.href = waUrl;
  if(!CFG.whatsapp){
    fw.addEventListener('click', (e)=>{
      e.preventDefault();
      alert('WhatsApp ainda não configurado. Edite js/config.js');
    });
  }
  const insta = document.getElementById('footerInsta');
  if(CFG.instagram){
    insta.href = `https://instagram.com/${CFG.instagram}`;
  } else {
    insta.href = '#';
    insta.addEventListener('click', e => e.preventDefault());
  }
  document.getElementById('sideContact').addEventListener('click', (e)=>{
    e.preventDefault();
    closeSideMenu();
    if(CFG.whatsapp) window.open(waUrl,'_blank');
    else alert('WhatsApp não configurado. Edite js/config.js');
  });
}

/* ---------- EVENTOS ---------- */
function bindEvents(){
  // Menu lateral
  document.getElementById('menuToggle').addEventListener('click', openSideMenu);
  document.getElementById('closeMenu').addEventListener('click', closeSideMenu);
  document.getElementById('overlay').addEventListener('click', closeSideMenu);
  document.querySelectorAll('#sideMenuLinks a[data-cat]').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const cat = a.dataset.cat;
      if(cat === 'all'){ filters.cat=''; document.getElementById('filterCat').value=''; applyFilters(); }
      else filterByCategory(cat);
      showPage('home');
      setTimeout(scrollToCatalog, 120);
    });
  });

  // Logo
  document.getElementById('logoLink').addEventListener('click', (e)=>{ e.preventDefault(); showPage('home'); });

  // Categoria nav topo
  document.querySelectorAll('.cat-link').forEach(l => {
    l.addEventListener('click', (e)=>{
      e.preventDefault();
      const cat = l.dataset.cat;
      if(cat === 'all'){ filters.cat=''; document.getElementById('filterCat').value=''; applyFilters(); }
      else filterByCategory(cat);
      showPage('home');
      setTimeout(scrollToCatalog, 120);
    });
  });

  // Busca
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  searchInput.addEventListener('input', ()=>{
    filters.search = searchInput.value.trim();
    searchClear.classList.toggle('visible', filters.search.length>0);
    applyFilters();
    if(document.getElementById('page-home').classList.contains('active')) {
      if(filters.search) setTimeout(scrollToCatalog, 60);
    } else {
      showPage('home');
      setTimeout(scrollToCatalog, 80);
    }
  });
  searchClear.addEventListener('click', ()=>{
    searchInput.value = ''; filters.search='';
    searchClear.classList.remove('visible');
    applyFilters();
  });

  // Botão hero
  document.getElementById('heroExplore').addEventListener('click', scrollToCatalog);

  // Filtros
  document.getElementById('filterCat').addEventListener('change', (e)=>{ filters.cat = e.target.value; applyFilters(); });
  document.getElementById('filterPrice').addEventListener('change', (e)=>{ filters.price = e.target.value; applyFilters(); });
  document.getElementById('sortBy').addEventListener('change', (e)=>{ filters.sort = e.target.value; applyFilters(); });

  // Carrinho
  document.getElementById('cartBtn').addEventListener('click', ()=>{ renderCartPage(); showPage('cart'); });
  document.getElementById('backFromProduct').addEventListener('click', ()=>{ showPage('home'); });
  document.getElementById('backFromCart').addEventListener('click', ()=>{ showPage('home'); });
  document.getElementById('backFromCheckout').addEventListener('click', ()=>{ renderCartPage(); showPage('cart'); });

  // Páginas estáticas
  document.querySelectorAll('[data-page]').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const pg = a.dataset.page;
      showPage(pg);
    });
  });
  document.querySelectorAll('[data-back-home]').forEach(b => {
    b.addEventListener('click', ()=> showPage('home'));
  });

  // Checkout
  document.getElementById('cepInput').addEventListener('blur', (e)=> lookupCep(e.target.value));
  document.getElementById('finalizeBtn').addEventListener('click', finalizeOrder);
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  applyConfig();
  renderCategories();
  renderFeatured();
  applyFilters();
  bindEvents();
  window.updateCartCount();
});