// main.js - Versão sem streetwear, com Cama/Mesa/Banho
function getColorHex(colorName) {
    const map = {
        'preto': '#000000', 'branco': '#FFFFFF', 'off branco': '#F5F5F5', 'branco off': '#F5F5F5',
        'vermelho': '#FF0000', 'azul escuro': '#000080', 'azul claro': '#87CEEB', 'azul': '#0000FF',
        'rosa': '#FFC0CB', 'caqui': '#C3B091', 'cinza': '#808080',
        'casal': '#0D9488', 'solteiro': '#14B8A6', 'queen': '#0284C7', 'king': '#0369A1',
        'padrao': '#06B6D4', 'banho': '#0E7490'
    };
    return map[colorName] || colorName;
}

function formatColorName(colorName) {
    const map = {
        'preto': 'Preto', 'branco': 'Branco', 'off branco': 'Off White', 'branco off': 'Off White',
        'vermelho': 'Vermelho', 'azul escuro': 'Azul Escuro', 'azul claro': 'Azul Claro',
        'azul': 'Azul', 'rosa': 'Rosa', 'caqui': 'Caqui', 'cinza': 'Cinza',
        'casal': 'Casal', 'solteiro': 'Solteiro', 'queen': 'Queen', 'king': 'King',
        'padrao': 'Padrão', 'banho': 'Banho'
    };
    return map[colorName] || colorName.charAt(0).toUpperCase() + colorName.slice(1);
}

const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'preto';
let currentSize = 'M';
let currentQuantity = 1;
let currentSection = 'home';

let homePage, productPage, cartPage, locationPage, detailImage, detailTitle, detailDescription;
let detailPrice, modalColorOptions, detailSizeOptions, addToCartDetailButton;
let cartIcon, cartItemsContainer, cartSummary, continueShoppingBtn, checkoutBtn, cartCount;
let backFromProduct, backFromCart, backFromLocation, backToHomeFromProduct;
let finalizeWhatsappButton, productThumbnailsContainer;

let viewedProducts = new Set();

function trackViewContentOnce(productId, productName, category, price) {
    if (!viewedProducts.has(productId)) {
        viewedProducts.add(productId);
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_ids: [productId.toString()],
                content_name: productName,
                content_category: category,
                value: price,
                currency: 'BRL',
                content_type: 'product'
            });
        }
    }
}

// ===== BARRA DE ANÚNCIOS =====
let currentAnnouncement = 0;
let announcementInterval;

function startAnnouncementSlider() {
    const slides = document.querySelectorAll('.announcement-slide');
    if (!slides.length) return;
    slides.forEach((slide, idx) => slide.classList.toggle('active', idx === 0));
    if (announcementInterval) clearInterval(announcementInterval);
    announcementInterval = setInterval(() => {
        slides[currentAnnouncement].classList.remove('active');
        currentAnnouncement = (currentAnnouncement + 1) % slides.length;
        slides[currentAnnouncement].classList.add('active');
    }, 4000);
}

// ===== MENU LATERAL =====
function initSideMenu() {
    const menuBtn = document.getElementById('menuHamburger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeMenu');
    if (!menuBtn || !sideMenu || !overlay) return;
    
    function openMenu() { sideMenu.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { sideMenu.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
    
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    const instagramLink = document.getElementById('instagramLink');
    if (instagramLink) instagramLink.href = 'https://instagram.com/wfcustomm';
    
    const cmbLink = document.getElementById('cmbLink');
    if (cmbLink) {
        cmbLink.addEventListener('click', (e) => {
            e.preventDefault(); closeMenu(); showHome();
            setTimeout(() => {
                const el = document.getElementById('cmb-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
    
    const basicasLink = document.getElementById('basicasLink');
    if (basicasLink) {
        basicasLink.addEventListener('click', (e) => {
            e.preventDefault(); closeMenu(); showHome();
            setTimeout(() => {
                const el = document.getElementById('featured-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
    
    const trackLink = document.getElementById('trackOrderLink');
    if (trackLink) trackLink.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); alert('Para rastrear seu pedido, entre em contato conosco pelo WhatsApp.'); });
    
    const returnsLink = document.getElementById('returnsLink');
    if (returnsLink) returnsLink.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); alert('Nossas políticas de troca e devolução: entre em contato pelo WhatsApp para mais informações.'); });
    
    const contactLink = document.getElementById('contactLink');
    if (contactLink) contactLink.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); window.open(`https://wa.me/${phoneNumber}`, '_blank'); });
}

// ===== CARROSSEL PRINCIPAL (1 banner) =====
function initMainCarousel() {
    const track = document.getElementById('carouselTrack');
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!track || !wrapper) return;
    const slides = Array.from(track.children);
    if (slides.length <= 1) {
        // Com 1 slide, apenas garante que a largura está correta
        slides.forEach(slide => {
            slide.style.width = '100%';
            slide.style.flex = '0 0 100%';
        });
        return;
    }
}

// Delegação para botões VER MAIS e categorias
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-ver-mais');
    if (btn && btn.getAttribute('data-produto-id')) {
        e.preventDefault();
        const produtoId = parseInt(btn.getAttribute('data-produto-id'));
        if (!isNaN(produtoId) && window.showProductDetail) window.showProductDetail(produtoId);
    }
});

// ===== BOTÃO VOLTAR AO TOPO =====
function initScrollTopButton() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupViewportControl() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => { input.style.fontSize = '16px'; });
}

function applyFastLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        * { -webkit-font-smoothing: antialiased; }
        .grade-container { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 15px; }
        @media (max-width: 768px) { .grade-container { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; } }
    `;
    document.head.appendChild(style);
}

function init() {
    setupViewportControl();
    applyFastLoadingStyles();
    document.body.style.overflowX = 'hidden';
    setTimeout(() => {
        initializeDOMElements();
        setupEventListeners();
        initMainCarousel();
        if (window.initializeCart) window.initializeCart();
        if (window.populateAllGrades) window.populateAllGrades();
        startAnnouncementSlider();
        initSideMenu();
        initScrollTopButton();
    }, 0);
    window.scrollTo(0, 0);
}

function initializeDOMElements() {
    homePage = document.getElementById('home-page');
    productPage = document.getElementById('product-page');
    cartPage = document.getElementById('cart-page');
    locationPage = document.getElementById('location-page');
    detailImage = document.getElementById('detail-image');
    detailTitle = document.getElementById('detail-title');
    detailDescription = document.getElementById('detail-description');
    detailPrice = document.getElementById('detail-price');
    modalColorOptions = document.getElementById('modal-color-options');
    detailSizeOptions = document.getElementById('detail-size-options');
    addToCartDetailButton = document.getElementById('add-to-cart-detail');
    cartIcon = document.getElementById('cart-icon');
    cartItemsContainer = document.getElementById('cart-items');
    cartSummary = document.getElementById('cart-summary');
    continueShoppingBtn = document.getElementById('continue-shopping');
    checkoutBtn = document.getElementById('checkout-btn');
    cartCount = document.querySelector('.cart-count');
    backFromProduct = document.getElementById('back-from-product');
    backFromCart = document.getElementById('back-from-cart');
    backFromLocation = document.getElementById('back-from-location');
    backToHomeFromProduct = document.getElementById('back-to-home-from-product');
    finalizeWhatsappButton = document.getElementById('finalize-whatsapp');
    productThumbnailsContainer = document.getElementById('product-thumbnails');
}

function setupEventListeners() {
    if (cartIcon) cartIcon.addEventListener('click', showCart);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', showHome);
    if (checkoutBtn) checkoutBtn.addEventListener('click', showLocation);
    if (backFromProduct) backFromProduct.addEventListener('click', showHome);
    if (backFromCart) backFromCart.addEventListener('click', showHome);
    if (backFromLocation) backFromLocation.addEventListener('click', showHome);
    if (backToHomeFromProduct) backToHomeFromProduct.addEventListener('click', showHome);
    if (finalizeWhatsappButton) finalizeWhatsappButton.addEventListener('click', finalizeOrderOnWhatsApp);
    if (addToCartDetailButton) addToCartDetailButton.addEventListener('click', addToCartFromDetail);
    
    const decrBtn = document.getElementById('detail-qty-decr');
    const incrBtn = document.getElementById('detail-qty-incr');
    const qtyInput = document.getElementById('detail-quantity');
    if (decrBtn && incrBtn && qtyInput) {
        decrBtn.addEventListener('click', () => { let v = parseInt(qtyInput.value) || 1; if (v > 1) { v--; qtyInput.value = v; currentQuantity = v; } });
        incrBtn.addEventListener('click', () => { let v = parseInt(qtyInput.value) || 1; if (v < 999) { v++; qtyInput.value = v; currentQuantity = v; } });
        qtyInput.addEventListener('change', () => {
            let v = parseInt(qtyInput.value);
            if (isNaN(v) || v < 1) v = 1;
            qtyInput.value = v; currentQuantity = v;
        });
    }
    
    const cityInput = document.getElementById('city');
    if (cityInput) cityInput.addEventListener('input', updateShippingEstimate);
    document.querySelectorAll('input[name="delivery-method"]').forEach(r => r.addEventListener('change', updateShippingEstimate));
}

function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (homePage) homePage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCart() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (cartPage) cartPage.classList.add('active');
    if (window.renderCart) setTimeout(() => window.renderCart(), 50);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLocation() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (locationPage) locationPage.classList.add('active');
    setTimeout(() => updateLocationOrderSummary(), 50);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateThumbnails(galleryImages) {
    if (!productThumbnailsContainer) return;
    productThumbnailsContainer.innerHTML = '';
    if (!galleryImages || galleryImages.length === 0) return;
    galleryImages.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.classList.add('product-thumb');
        if (index === 0) thumb.classList.add('active');
        thumb.addEventListener('click', () => {
            if (detailImage) detailImage.src = imgSrc;
            document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        productThumbnailsContainer.appendChild(thumb);
    });
}

function showProductDetail(productId, selectedColor = null) {
    const product = window.findProductById ? window.findProductById(productId) : null;
    if (!product) { alert('Produto não encontrado.'); return; }
    currentProduct = product;
    const availableColors = Object.keys(product.variants);
    currentColor = (selectedColor && availableColors.includes(selectedColor)) ? selectedColor : availableColors[0];
    currentSize = product.variants[currentColor].sizes[0];
    currentQuantity = 1;
    const qtyInput = document.getElementById('detail-quantity');
    if (qtyInput) qtyInput.value = '1';
    
    if (detailTitle) detailTitle.textContent = product.name;
    if (detailDescription) detailDescription.textContent = product.description;
    
    const variant = product.variants[currentColor];
    const price = variant.prices[currentSize] || 35;
    trackViewContentOnce(product.id, product.name, product.category, price);
    
    const gallery = variant.gallery || [variant.image];
    updateThumbnails(gallery);
    if (detailImage && gallery.length) detailImage.src = gallery[0];
    
    // Se for cama/mesa/banho, esconder tabela de medidas (é só para camisetas)
    const sizeTable = document.querySelector('.size-table-container-premium');
    if (sizeTable) {
        sizeTable.style.display = (product.category === 'cama_mesa_banho') ? 'none' : 'block';
    }
    
    updateProductDetailView();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (productPage) productPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateDetailPrice() {
    if (!currentProduct) return;
    const variant = currentProduct.variants[currentColor];
    if (variant && variant.prices && variant.prices[currentSize]) {
        const price = variant.prices[currentSize];
        if (detailPrice) detailPrice.textContent = price.toFixed(2);
    }
}

function updateProductDetailView() {
    if (!currentProduct) return;
    const variant = currentProduct.variants[currentColor];
    if (!variant) return;
    const gallery = variant.gallery || [variant.image];
    updateThumbnails(gallery);
    if (detailImage && gallery.length) detailImage.src = gallery[0];
    updateDetailPrice();
    updateColorOptions();
    updateSizeOptions();
}

function updateColorOptions() {
    if (!modalColorOptions || !currentProduct) return;
    modalColorOptions.innerHTML = '';
    modalColorOptions.style.display = 'flex';
    modalColorOptions.style.flexWrap = 'wrap';
    modalColorOptions.style.gap = '6px';
    Object.keys(currentProduct.variants).forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option-premium ${color === currentColor ? 'active' : ''}`;
        colorOption.setAttribute('data-color', color);
        const bgColor = getColorHex(color);
        colorOption.innerHTML = `
            <div style="background-color: ${bgColor}; width: 36px; height: 36px; border-radius: 50%; margin-bottom: 4px; border: 1px solid ${color === currentColor ? '#000' : '#ccc'}; display: flex; align-items: center; justify-content: center;">
                ${color === currentColor ? '<i class="fas fa-check" style="color: ' + (bgColor === '#FFFFFF' || bgColor === '#FDF5E6' || bgColor === '#F5F5DC' || bgColor === '#FFF8E7' ? '#000' : '#fff') + ';"></i>' : ''}
            </div>
            <span style="font-size: 10px;">${formatColorName(color)}</span>
        `;
        colorOption.style.cursor = 'pointer';
        colorOption.style.textAlign = 'center';
        colorOption.addEventListener('click', () => {
            if (color === currentColor) return;
            currentColor = color;
            const newVariant = currentProduct.variants[currentColor];
            if (detailImage) detailImage.src = (newVariant.gallery?.[0] || newVariant.image);
            currentSize = newVariant.sizes[0];
            updateProductDetailView();
        });
        modalColorOptions.appendChild(colorOption);
    });
}

function updateSizeOptions() {
    if (!detailSizeOptions || !currentProduct) return;
    detailSizeOptions.innerHTML = '';
    detailSizeOptions.style.display = 'flex';
    detailSizeOptions.style.flexWrap = 'wrap';
    detailSizeOptions.style.gap = '6px';
    const variant = currentProduct.variants[currentColor];
    if (!variant) return;
    variant.sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option-premium ${size === currentSize ? 'active' : ''}`;
        sizeOption.textContent = size;
        sizeOption.style.padding = '8px 12px';
        sizeOption.style.border = '1px solid #000';
        sizeOption.style.borderRadius = '4px';
        sizeOption.style.cursor = 'pointer';
        sizeOption.style.minWidth = '45px';
        sizeOption.style.backgroundColor = size === currentSize ? '#000' : '#fff';
        sizeOption.style.color = size === currentSize ? '#fff' : '#000';
        sizeOption.addEventListener('click', () => { currentSize = size; updateDetailPrice(); updateSizeOptions(); });
        detailSizeOptions.appendChild(sizeOption);
    });
}

function addToCartFromDetail() {
    if (!currentProduct) return;
    const variant = currentProduct.variants[currentColor];
    if (!variant || !variant.prices || !variant.prices[currentSize]) return;
    const price = variant.prices[currentSize];
    
    // Verificar mínimo de atacado para cama/mesa/banho
    if (currentProduct.category === 'cama_mesa_banho' && currentProduct.minQuantity && currentQuantity < currentProduct.minQuantity) {
        const confirmAdd = confirm(`⚠️ Este produto é vendido no ATACADO.\n\nQuantidade mínima: ${currentProduct.minQuantity} unidades.\n\nDeseja adicionar ${currentProduct.minQuantity} unidades?`);
        if (confirmAdd) {
            currentQuantity = currentProduct.minQuantity;
        } else {
            return;
        }
    }
    
    const success = window.addToCart ? window.addToCart(currentProduct, currentColor, currentSize, '', price, currentQuantity, 'normal') : false;
    if (success && addToCartDetailButton) {
        const original = addToCartDetailButton.innerHTML;
        addToCartDetailButton.textContent = '✅ Adicionado!';
        addToCartDetailButton.style.background = '#8A2BE2';
        setTimeout(() => {
            addToCartDetailButton.innerHTML = original;
            addToCartDetailButton.style.background = '';
        }, 2000);
    }
}

function updateCartCount() {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const countEl = document.querySelector('.cart-count');
    if (countEl) countEl.textContent = totalQuantity;
}

function updateLocationOrderSummary() {
    const container = document.getElementById('location-order-summary');
    if (!container) return;
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) { container.innerHTML = '<p>Carrinho vazio</p>'; return; }
    let totals = { subtotal: 0, discount: 0, total: 0 };
    if (window.calculateCartTotals) totals = window.calculateCartTotals();
    else {
        let subtotal = 0;
        cartItems.forEach(item => subtotal += (item.price || 0) * (item.quantity || 1));
        totals.subtotal = subtotal; totals.total = subtotal;
    }
    let html = '';
    cartItems.forEach(item => {
        const qty = item.quantity || 1;
        const itemTotal = (item.price || 0) * qty;
        html += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                    <div>${item.product.name}<br><small>${formatColorName(item.color)} | ${item.size} | Qtd: ${qty}</small></div>
                    <div>R$ ${itemTotal.toFixed(2)}</div>
                 </div>`;
    });
    html += `<hr><div><strong>Subtotal:</strong> R$ ${totals.subtotal.toFixed(2)}</div>`;
    if (totals.discount > 0) html += `<div style="color:green;"><strong>Desconto 3x100:</strong> -R$ ${totals.discount.toFixed(2)}</div>`;
    html += `<div><strong>Total:</strong> R$ ${totals.total.toFixed(2)}</div>`;
    container.innerHTML = html;
    updateShippingEstimate();
}

function updateShippingEstimate() {
    const cityInput = document.getElementById('city');
    const shippingPriceElem = document.getElementById('shipping-price');
    const shippingInfoElem = document.getElementById('shipping-info');
    const deliveryOptions = document.getElementById('delivery-options');
    const shippingContainer = document.getElementById('shipping-price-container');
    if (!cityInput || !shippingPriceElem || !shippingContainer) return;
    const city = cityInput.value.trim().toLowerCase();
    const isSaoBento = city.includes('são bento') || city.includes('sao bento');
    if (isSaoBento) {
        if (deliveryOptions) deliveryOptions.style.display = 'block';
        shippingContainer.style.display = 'block';
        const method = document.querySelector('input[name="delivery-method"]:checked')?.value || 'delivery';
        if (method === 'pickup') { shippingPriceElem.textContent = 'R$ 0,00 (retirada)'; shippingInfoElem.textContent = 'Retirada na loja - Grátis'; }
        else { shippingPriceElem.textContent = 'R$ 4,00'; shippingInfoElem.textContent = 'Entrega em São Bento - R$ 4,00'; }
    } else if (city !== '') {
        if (deliveryOptions) deliveryOptions.style.display = 'none';
        shippingContainer.style.display = 'block';
        shippingPriceElem.textContent = 'A combinar';
        shippingInfoElem.innerHTML = '📦 Frete será combinado no WhatsApp após a confirmação do pedido.';
    } else {
        if (deliveryOptions) deliveryOptions.style.display = 'none';
        shippingContainer.style.display = 'block';
        shippingPriceElem.textContent = 'R$ 0,00';
        shippingInfoElem.textContent = 'Informe sua cidade para calcular o frete';
    }
}

function finalizeOrderOnWhatsApp() {
    const name = document.getElementById('name').value.trim();
    const street = document.getElementById('street').value.trim();
    const address = document.getElementById('address').value.trim();
    const neighborhood = document.getElementById('neighborhood').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const observations = document.getElementById('observations').value.trim();
    
    if (!name || !street || !address || !neighborhood || !city || !state) { alert('Preencha todos os campos obrigatórios!'); return; }
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) { alert('Carrinho vazio'); return; }
    
    let totals = { subtotal: 0, discount: 0, total: 0 };
    if (window.calculateCartTotals) totals = window.calculateCartTotals();
    else { let sub = 0; cartItems.forEach(i => sub += (i.price || 0) * (i.quantity || 1)); totals.subtotal = sub; totals.total = sub; }
    
    const cityLower = city.toLowerCase();
    const isSaoBento = cityLower.includes('são bento') || cityLower.includes('sao bento');
    let shippingCost = 0;
    if (isSaoBento) {
        const method = document.querySelector('input[name="delivery-method"]:checked')?.value || 'delivery';
        if (method !== 'pickup') shippingCost = 4;
    }
    const finalTotal = totals.total + shippingCost;
    
    let itemsMessage = '';
    cartItems.forEach((item, idx) => {
        const qty = item.quantity || 1;
        const itemTotal = (item.price || 0) * qty;
        itemsMessage += `${idx+1}. ${item.product.name} (${formatColorName(item.color)} - ${item.size}) - Qtd: ${qty} - R$ ${item.price.toFixed(2)}/un = R$ ${itemTotal.toFixed(2)}\n`;
    });
    
    let shippingText = '';
    if (isSaoBento) {
        const method = document.querySelector('input[name="delivery-method"]:checked')?.value || 'delivery';
        shippingText = method === 'pickup' ? 'Retirada na loja (Grátis)' : `Entrega em São Bento: R$ ${shippingCost.toFixed(2)}`;
    } else shippingText = 'Frete a combinar no WhatsApp';
    
    let message = `*NOVO PEDIDO - WFCUSTOM*\n\n*👤 CLIENTE*\nNome: ${name}\n\n*📍 ENDEREÇO*\nRua: ${street}\nNúmero/Complemento: ${address}\nBairro: ${neighborhood}\nCidade: ${city}\nEstado: ${state}\n${cep ? `CEP: ${cep}\n` : ''}${observations ? `Observações: ${observations}\n` : ''}\n*🛍️ ITENS*\n${itemsMessage}\n*💰 RESUMO*\nSubtotal: R$ ${totals.subtotal.toFixed(2)}\n${totals.discount > 0 ? `Desconto 3x100: -R$ ${totals.discount.toFixed(2)}\n` : ''}Frete: ${shippingText}\n*Total: R$ ${finalTotal.toFixed(2)}*`;
    
    if (typeof fbq !== 'undefined') {
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const contents = cartItems.map(item => ({ id: item.product.id.toString(), quantity: item.quantity || 1 }));
        fbq('track', 'InitiateCheckout', {
            content_ids: cartItems.map(item => item.product.id.toString()),
            contents: contents,
            content_name: cartItems.map(item => item.product.name).join(', '),
            num_items: totalQuantity,
            value: finalTotal,
            currency: 'BRL',
            content_type: 'product'
        });
    }
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    
    const modal = document.getElementById('whatsapp-confirmation-modal');
    if (modal) {
        modal.style.display = 'block';
        const close = () => {
            modal.style.display = 'none';
            localStorage.removeItem('cartItems');
            updateCartCount();
            showHome();
        };
        modal.querySelector('.close-modal-premium')?.addEventListener('click', close);
        modal.querySelector('#close-whatsapp-modal')?.addEventListener('click', close);
    }
}

document.addEventListener('DOMContentLoaded', () => { init(); });
window.showHome = showHome;
window.showLocation = showLocation;
window.updateLocationOrderSummary = updateLocationOrderSummary;
window.showProductDetail = showProductDetail;
window.formatColorName = formatColorName;
window.updateCartCount = updateCartCount;
window.addToCartFromDetail = addToCartFromDetail;