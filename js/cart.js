// cart.js - Promoção 3x100 (featured) + Cama/Mesa/Banho (atacado)
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let isAddingToCart = false;

function updateCartCount() {
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = totalQuantity;
    const cartStatItems = document.getElementById('cart-stat-items');
    if (cartStatItems) cartStatItems.textContent = totalQuantity;
    const cartStatShirts = document.getElementById('cart-stat-shirts');
    if (cartStatShirts) cartStatShirts.textContent = getTotalFeaturedCount();
}

function saveCartToLocalStorage() {
    try { localStorage.setItem('cartItems', JSON.stringify(cartItems)); }
    catch (e) { console.error('Erro ao salvar carrinho:', e); }
}

function getTotalFeaturedCount() {
    return cartItems.reduce((sum, item) => {
        const isFeatured = item.product && item.product.category === 'featured';
        return sum + (isFeatured ? (item.quantity || 1) : 0);
    }, 0);
}

function calculateCartTotals() {
    let subtotal = 0;
    let featuredItems = [];
    let otherItemsTotal = 0;

    for (const item of cartItems) {
        const qty = item.quantity || 1;
        let itemPrice = item.price || 0;
        if (item.product && item.product.id && window.findProductById) {
            const freshProduct = window.findProductById(item.product.id);
            if (freshProduct && freshProduct.variants[item.color] && freshProduct.variants[item.color].prices[item.size]) {
                itemPrice = freshProduct.variants[item.color].prices[item.size];
                item.price = itemPrice;
            }
        }
        const isFeatured = item.product && item.product.category === 'featured';
        if (isFeatured) {
            for (let i = 0; i < qty; i++) featuredItems.push(itemPrice);
        } else {
            otherItemsTotal += itemPrice * qty;
        }
        subtotal += itemPrice * qty;
    }

    const totalFeatured = featuredItems.length;
    let discount = 0;
    let featuredTotal = 0;
    if (totalFeatured === 3) {
        featuredTotal = 100;
        discount = featuredItems.reduce((a, b) => a + b, 0) - 100;
    } else {
        featuredTotal = featuredItems.reduce((a, b) => a + b, 0);
        discount = 0;
    }
    const total = featuredTotal + otherItemsTotal;
    return { subtotal, discount, total, totalFeatured, featuredTotal, otherItemsTotal };
}

function addToCart(product, color, size, position, price, quantity = 1, printSize = 'normal') {
    if (isAddingToCart) return false;
    isAddingToCart = true;
    
    const existingIndex = cartItems.findIndex(item => 
        item.product.id === product.id && 
        item.color === color && 
        item.size === size
    );
    
    if (existingIndex !== -1) {
        cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + quantity;
    } else {
        cartItems.push({
            id: Date.now() + Math.random(),
            product: {
                id: product.id, name: product.name, category: product.category,
                description: product.description, variants: product.variants,
                minQuantity: product.minQuantity || null
            },
            color: color || 'unico',
            size: size || 'Único',
            position: '',
            printSize: printSize || 'normal',
            price: price,
            quantity: quantity
        });
    }
    
    saveCartToLocalStorage();
    updateCartCount();
    if (document.getElementById('cart-page')?.classList.contains('active')) renderCart();
    showCartNotification(product.name, quantity);
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
            content_ids: [product.id.toString()],
            content_name: product.name,
            content_category: product.category,
            value: price * quantity,
            currency: 'BRL',
            quantity: quantity,
            content_type: 'product'
        });
    }
    
    setTimeout(() => { isAddingToCart = false; }, 500);
    return true;
}

function addMultipleToCart(product, color, size, position, price, quantity, printSize = 'normal') {
    return addToCart(product, color, size, position, price, quantity, printSize);
}

function updateCartItemQuantity(cartId, delta) {
    const index = cartItems.findIndex(item => item.id == cartId);
    if (index !== -1) {
        const newQuantity = (cartItems[index].quantity || 1) + delta;
        if (newQuantity <= 0) removeFromCart(cartId);
        else {
            cartItems[index].quantity = newQuantity;
            saveCartToLocalStorage();
            updateCartCount();
            renderCart();
        }
    }
}

function removeFromCart(cartId) {
    cartItems = cartItems.filter(item => item.id != cartId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCart();
}

function showCartNotification(productName, quantity) {
    document.querySelectorAll('.cart-notification').forEach(n => n.remove());
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<div class="notification-content"><i class="fas fa-check-circle"></i><span>${productName} (${quantity} un.) adicionado!</span></div>`;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: #2563EB; color: white;
        padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px;`;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => { notification.style.transform = 'translateX(400px)'; setTimeout(() => notification.remove(), 300); }, 3000);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    
    for (let item of cartItems) {
        if (item.product && item.product.id && window.findProductById) {
            const freshProduct = window.findProductById(item.product.id);
            if (freshProduct && freshProduct.variants[item.color] && freshProduct.variants[item.color].prices[item.size]) {
                item.price = freshProduct.variants[item.color].prices[item.size];
            }
        }
    }
    saveCartToLocalStorage();
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-premium" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Seu carrinho está vazio</h3>
                <p style="color: #999;">Adicione alguns produtos para continuar</p>
            </div>`;
        if (cartSummary) cartSummary.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
        updateCartStats();
        return;
    }
    
    updateCartStats();
    
    const featuredItems = cartItems.filter(item => item.product.category === 'featured');
    const cmbItems = cartItems.filter(item => item.product.category === 'cama_mesa_banho');
    const otherItems = cartItems.filter(item => item.product.category !== 'featured' && item.product.category !== 'cama_mesa_banho');
    
    if (cmbItems.length > 0) {
        const section = document.createElement('div');
        section.className = 'cart-category-section';
        section.innerHTML = `<h3 class="cart-section-title cmb-title"><i class="fas fa-bed"></i> Cama, Mesa e Banho</h3>`;
        cartItemsContainer.appendChild(section);
        cmbItems.forEach(item => appendCartItemElement(cartItemsContainer, item));
    }
    
    if (featuredItems.length > 0) {
        const section = document.createElement('div');
        section.className = 'cart-category-section';
        section.innerHTML = `<h3 class="cart-section-title"><i class="fas fa-star"></i> Camisetas Básicas</h3>`;
        cartItemsContainer.appendChild(section);
        featuredItems.forEach(item => appendCartItemElement(cartItemsContainer, item));
    }
    
    if (otherItems.length > 0) {
        const section = document.createElement('div');
        section.className = 'cart-category-section';
        section.innerHTML = `<h3 class="cart-section-title"><i class="fas fa-box"></i> Outros Produtos</h3>`;
        cartItemsContainer.appendChild(section);
        otherItems.forEach(item => appendCartItemElement(cartItemsContainer, item));
    }
    
    function appendCartItemElement(container, item) {
        const quantity = item.quantity || 1;
        const itemTotal = (item.price || 0) * quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item-ultra-premium';
        cartItemElement.setAttribute('data-cart-id', item.id);
        
        const imageSrc = item.product.variants?.[item.color]?.image || 'https://via.placeholder.com/100x100?text=Produto';
        
        cartItemElement.innerHTML = `
            <img src="${imageSrc}" alt="${item.product.name}" class="cart-item-image-ultra">
            <div class="cart-item-details-ultra">
                <h3>${item.product.name || 'Produto'}</h3>
                <div class="cart-item-specs">
                    <span class="cart-item-spec">Modelo: ${item.color || 'N/A'}</span>
                    <span class="cart-item-spec">Tam: ${item.size || 'N/A'}</span>
                </div>
                <div class="cart-item-price-ultra">R$ ${(item.price || 0).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-decr" data-id="${item.id}">-</button>
                    <span class="qty-value">${quantity}</span>
                    <button class="qty-incr" data-id="${item.id}">+</button>
                    <span class="cart-item-line-total">Total: R$ ${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions-ultra">
                <button class="remove-item-ultra" data-cart-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>`;
        container.appendChild(cartItemElement);
    }
    
    document.querySelectorAll('.remove-item-ultra').forEach(button => {
        button.onclick = (e) => { e.stopPropagation(); removeFromCart(e.currentTarget.getAttribute('data-cart-id')); };
    });
    document.querySelectorAll('.qty-decr').forEach(btn => {
        btn.onclick = (e) => { e.stopPropagation(); updateCartItemQuantity(btn.getAttribute('data-id'), -1); };
    });
    document.querySelectorAll('.qty-incr').forEach(btn => {
        btn.onclick = (e) => { e.stopPropagation(); updateCartItemQuantity(btn.getAttribute('data-id'), 1); };
    });
    
    requestAnimationFrame(() => renderCartSummary());
    if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.style.opacity = '1'; }
}

function updateCartStats() {
    const totals = calculateCartTotals();
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const statItems = document.getElementById('cart-stat-items');
    const statShirts = document.getElementById('cart-stat-shirts');
    const statSavings = document.getElementById('cart-stat-savings');
    if (statItems) statItems.textContent = totalQuantity;
    if (statShirts) statShirts.textContent = totals.totalFeatured;
    if (statSavings) statSavings.textContent = `R$ ${totals.discount.toFixed(2)}`;
}

function renderCartSummary() {
    const totals = calculateCartTotals();
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscount = document.getElementById('cart-discount');
    const cartTotal = document.getElementById('cart-total');
    const totalSavings = document.getElementById('total-savings');
    const freeShippingMessage = document.getElementById('free-shipping-message');
    
    if (cartSubtotal) cartSubtotal.textContent = `R$ ${totals.subtotal.toFixed(2)}`;
    if (cartDiscount) cartDiscount.textContent = totals.discount.toFixed(2);
    if (cartTotal) cartTotal.textContent = totals.total.toFixed(2);
    if (totalSavings) totalSavings.textContent = totals.discount.toFixed(2);
    
    if (freeShippingMessage) {
        if (totals.subtotal >= 200) freeShippingMessage.style.display = 'block';
        else freeShippingMessage.style.display = 'none';
    }
    
    const cartSummaryElement = document.getElementById('cart-summary');
    if (cartSummaryElement) {
        cartSummaryElement.style.display = 'block';
        cartSummaryElement.style.opacity = '1';
        cartSummaryElement.style.visibility = 'visible';
    }
}

function goToLocation() {
    if (cartItems.length === 0) { alert('❌ Seu carrinho está vazio!'); return false; }
    if (window.showLocation) { window.showLocation(); return true; }
    return false;
}

function initializeCart() {
    try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) cartItems = JSON.parse(storedItems);
        for (let item of cartItems) {
            if (item.product && item.product.id && window.findProductById) {
                const freshProduct = window.findProductById(item.product.id);
                if (freshProduct && freshProduct.variants[item.color] && freshProduct.variants[item.color].prices[item.size]) {
                    item.price = freshProduct.variants[item.color].prices[item.size];
                }
            }
        }
        saveCartToLocalStorage();
    } catch (e) { cartItems = []; }
    updateCartCount();
    if (document.getElementById('cart-page')?.classList.contains('active')) renderCart();
}

window.addToCart = addToCart;
window.addMultipleToCart = addMultipleToCart;
window.updateCartCount = updateCartCount;
window.removeFromCart = removeFromCart;
window.renderCart = renderCart;
window.initializeCart = initializeCart;
window.renderCartSummary = renderCartSummary;
window.goToLocation = goToLocation;
window.getTotalFeaturedCount = getTotalFeaturedCount;
window.calculateCartTotals = calculateCartTotals;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) checkoutBtn.onclick = goToLocation;
    }, 500);
    setTimeout(initializeCart, 100);
});
window.addEventListener('load', function() { setTimeout(initializeCart, 200); });