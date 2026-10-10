/* =========================================================
   CARRINHO — localStorage
   ========================================================= */
const CART_KEY = "encanto_cart_v1";

function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }

function cartItemKey(item){
  return [item.productId,item.color||'',item.size||''].join('|');
}

function addToCart(productId, color, size, quantity){
  const product = window.findProductById(productId);
  if(!product) return false;
  quantity = Math.max(1, Math.min(10, Number(quantity)||1));
  const cart = getCart();
  const key = cartItemKey({productId,color,size});
  const idx = cart.findIndex(i => cartItemKey(i) === key);
  if(idx >= 0){
    cart[idx].quantity = Math.min(10, cart[idx].quantity + quantity);
  } else {
    const unitPrice = product.price;
    cart.push({ productId, color, size, quantity, unitPrice, name: product.name, image: product.images[0] });
  }
  saveCart(cart);
  return true;
}

function updateQuantity(key, delta){
  const cart = getCart();
  const idx = cart.findIndex(i => cartItemKey(i) === key);
  if(idx < 0) return;
  const newQty = cart[idx].quantity + delta;
  if(newQty <= 0){ cart.splice(idx,1); }
  else if(newQty <= 10){ cart[idx].quantity = newQty; }
  saveCart(cart);
}

function removeFromCart(key){
  const cart = getCart().filter(i => cartItemKey(i) !== key);
  saveCart(cart);
}

function clearCart(){ saveCart([]); }

function getCartTotals(){
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=> s + i.unitPrice * i.quantity, 0);
  const discount = 0; // espaço para descontos futuros
  const shipping = 0; // frete calculado no checkout
  const total = subtotal - discount + shipping;
  return { subtotal, discount, shipping, total, itemCount: cart.reduce((s,i)=>s+i.quantity,0) };
}

function updateCartCount(){
  const badge = document.getElementById('cartCount');
  if(!badge) return;
  const { itemCount } = getCartTotals();
  badge.textContent = itemCount;
  badge.style.display = itemCount > 0 ? 'grid' : 'none';
}

window.getCart = getCart;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.getCartTotals = getCartTotals;
window.cartItemKey = cartItemKey;
window.updateCartCount = updateCartCount;