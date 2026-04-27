// ============================================================================
// ACECOM LANKA TECH STORE - Main JavaScript
// Static HTML e-commerce site with cart, filtering, product details
// ============================================================================

// ============================================================================
// PRODUCT DATA - 16 Products
// ============================================================================
const products = [
  { id: 1, name: 'ASUS ROG Strix G16', category: 'gaming', brand: 'ASUS', price: 372000, oldPrice: 410000, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i7-13650HX', RAM: '16GB DDR5', Storage: '512GB NVMe SSD', Display: '16" FHD 165Hz', GPU: 'NVIDIA RTX 4060 8GB' }, description: 'Dominate the battlefield with the ASUS ROG Strix G16. Engineered for peak gaming performance with cutting-edge hardware and immersive display technology.' },
  { id: 2, name: 'HP Victus 15-fa1082wm', category: 'gaming', brand: 'HP', price: 281000, oldPrice: 315000, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i5-12500H', RAM: '8GB DDR4', Storage: '512GB NVMe SSD', Display: '15.6" FHD 144Hz', GPU: 'NVIDIA RTX 3050 4GB' }, description: 'Performance and affordability for gamers. The Victus 15 delivers exceptional gaming power without breaking the bank.' },
  { id: 3, name: 'Lenovo Yoga 7 2-in-1', category: 'business', brand: 'Lenovo', price: 320000, oldPrice: 355000, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop', specs: { Processor: 'AMD Ryzen 7 7730U', RAM: '16GB DDR4', Storage: '512GB NVMe SSD', Display: '14" 2.8K OLED Touch', GPU: 'AMD Radeon Integrated' }, description: 'Perfect companion for business professionals with a stunning OLED touchscreen.' },
  { id: 4, name: 'Dell XPS 15 9530', category: 'business', brand: 'Dell', price: 445000, oldPrice: 490000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i7-13700H', RAM: '16GB DDR5', Storage: '1TB NVMe SSD', Display: '15.6" 3.5K OLED', GPU: 'NVIDIA RTX 4050 6GB' }, description: 'Premium performance with a breathtaking 3.5K OLED display.' },
  { id: 5, name: 'ASUS Vivobook R1502V', category: 'entertainment', brand: 'ASUS', price: 232000, oldPrice: 260000, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i5-1335U', RAM: '8GB DDR4', Storage: '512GB NVMe SSD', Display: '15.6" FHD IPS', GPU: 'Intel Iris Xe' }, description: 'Versatile everyday laptop for work and entertainment.' },
  { id: 6, name: 'HP OmniBook 5 Flip', category: 'business', brand: 'HP', price: 255000, oldPrice: 280000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i5-1335U', RAM: '16GB DDR4', Storage: '256GB NVMe SSD', Display: '14" FHD IPS Touch', GPU: 'Intel Iris Xe' }, description: 'Convertible design perfect for presentations and everyday tasks.' },
  { id: 7, name: 'MSI Thin 15 B13VE', category: 'gaming', brand: 'MSI', price: 305000, oldPrice: 340000, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i7-13620H', RAM: '16GB DDR5', Storage: '512GB NVMe SSD', Display: '15.6" FHD 144Hz', GPU: 'NVIDIA RTX 4050 6GB' }, description: 'Serious gaming power in a sleek form factor.' },
  { id: 8, name: 'ASUS TUF Gaming FX607V', category: 'gaming', brand: 'ASUS', price: 372000, oldPrice: 399000, image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i7-13700H', RAM: '16GB DDR5', Storage: '1TB NVMe SSD', Display: '16" QHD 165Hz', GPU: 'NVIDIA RTX 4060 8GB' }, description: 'Military-grade durability meets top-tier gaming performance.' },
  { id: 9, name: 'Lenovo IdeaPad Slim 3', category: 'entertainment', brand: 'Lenovo', price: 178000, oldPrice: 199000, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop', specs: { Processor: 'AMD Ryzen 5 7520U', RAM: '8GB DDR5', Storage: '256GB NVMe SSD', Display: '15.6" FHD IPS', GPU: 'AMD Radeon 610M' }, description: 'Budget-friendly laptop for streaming and everyday tasks.' },
  { id: 10, name: 'Dell Inspiron 16 5630', category: 'entertainment', brand: 'Dell', price: 265000, oldPrice: 295000, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=400&fit=crop', specs: { Processor: 'Intel Core i7-1360P', RAM: '16GB DDR5', Storage: '512GB NVMe SSD', Display: '16" FHD+ IPS', GPU: 'Intel Iris Xe' }, description: 'Large-screen entertainment laptop with premium specs.' },
  { id: 11, name: 'HP Envy x360 15', category: 'business', brand: 'HP', price: 358000, oldPrice: 390000, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop', specs: { Processor: 'AMD Ryzen 7 7730U', RAM: '16GB DDR5', Storage: '512GB NVMe SSD', Display: '15.6" FHD OLED Touch', GPU: 'AMD Radeon Integrated' }, description: 'Premium design meets versatile performance.' },
  { id: 12, name: 'Armageddon Shield 7 Backpack', category: 'accessories', brand: 'Armageddon', price: 8500, oldPrice: 12000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop', specs: { Type: 'Laptop Backpack', Material: 'Water Resistant Polyester', Size: '15.6" Compatible', Features: 'USB Charging Port' }, description: 'Protect your laptop in style.' },
  { id: 13, name: 'Gaming Mouse RGB Pro', category: 'accessories', brand: 'Generic', price: 4500, oldPrice: 6000, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=400&fit=crop', specs: { Type: 'Gaming Mouse', DPI: '16000 DPI', Buttons: '7 Programmable', Connectivity: 'Wired USB' }, description: 'Precision gaming mouse with RGB lighting.' },
  { id: 14, name: 'Mechanical Keyboard TKL', category: 'accessories', brand: 'Generic', price: 12500, oldPrice: 15000, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&h=400&fit=crop', specs: { Type: 'Mechanical Keyboard', Switches: 'Blue Mechanical', Layout: 'TKL (Tenkeyless)', Backlight: 'RGB Per-Key' }, description: 'Compact mechanical keyboard with blue switches.' },
  { id: 15, name: 'USB-C Hub 7-in-1', category: 'accessories', brand: 'Generic', price: 6800, oldPrice: 8500, image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=400&fit=crop', specs: { Type: 'USB-C Hub', Ports: 'HDMI, USB3.0 x2, SD, microSD, USB-C PD', Power: '100W Pass-Through', Compatibility: 'Universal' }, description: 'Expand your laptop connectivity.' },
  { id: 16, name: 'Laptop Cooling Pad', category: 'accessories', brand: 'Generic', price: 5500, oldPrice: 7000, image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=400&fit=crop', specs: { Type: 'Cooling Pad', Fans: '5 Quiet Fans', Size: 'Up to 17"', Features: 'Adjustable Height, LED' }, description: 'Keep your laptop cool during intense sessions.' }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatPrice(num) {
  return 'Rs. ' + num.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getUrlParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function setUrlParam(param, value) {
  const params = new URLSearchParams(window.location.search);
  if (value === null || value === '') {
    params.delete(param);
  } else {
    params.set(param, value);
  }
  const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
  window.history.replaceState({}, '', newUrl);
}

function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function isShopPage() {
  return window.location.pathname.includes('shop.html');
}

function isProductPage() {
  return window.location.pathname.includes('product.html');
}

function isCartPage() {
  return window.location.pathname.includes('cart.html');
}

// ============================================================================
// CART SYSTEM (localStorage)
// ============================================================================

function getCart() {
  const cartData = localStorage.getItem('acecom-cart');
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
  localStorage.setItem('acecom-cart', JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }

  saveCart(cart);
  updateCartBadge();
  showToast('Product added to cart!', 'success');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();

  if (isCartPage()) {
    renderCartPage();
  }
}

function updateCartQty(productId, newQty) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.qty = newQty;
      saveCart(cart);
      updateCartBadge();

      if (isCartPage()) {
        renderCartPage();
      }
    }
  }
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, cartItem) => {
    const product = getProductById(cartItem.id);
    return total + (product ? product.price * cartItem.qty : 0);
  }, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const count = getCartCount();

  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    background: white;
    padding: 16px 24px;
    border-radius: 8px;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 14px;
    font-weight: 500;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-left: 4px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);

  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================================================
// SHOP PAGE - PRODUCT FILTERING & DISPLAY
// ============================================================================

function renderShopProducts() {
  if (!isShopPage()) return;

  const productGrid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');

  if (!productGrid) return;

  const category = getUrlParam('category') || 'all';
  const brand = getUrlParam('brand') || 'all';
  const search = (getUrlParam('search') || '').toLowerCase();
  const sort = getUrlParam('sort') || 'featured';

  let filtered = products.filter(product => {
    const categoryMatch = category === 'all' || product.category === category;
    const brandMatch = brand === 'all' || product.brand === brand;
    const searchMatch = !search || product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search);
    return categoryMatch && brandMatch && searchMatch;
  });

  // Sort
  switch (sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Render
  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    if (resultsCount) resultsCount.textContent = '0';
  } else {
    productGrid.innerHTML = filtered.map(p => `
      <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
          <div class="product-overlay"><button class="btn">View Details</button></div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <div class="product-pricing">
            <span class="old-price">Rs. ${p.oldPrice.toLocaleString('en-LK')}</span>
            <span class="product-price">${formatPrice(p.price)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id}, 1)">Add to Cart</button>
        </div>
      </div>
    `).join('');
    if (noResults) noResults.style.display = 'none';
    if (resultsCount) resultsCount.textContent = filtered.length;
  }
}

function setupFilterListeners() {
  if (!isShopPage()) return;

  const categoryFilter = document.getElementById('category-filter');
  const brandFilter = document.getElementById('brand-filter');
  const sortFilter = document.getElementById('sort-filter');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  if (categoryFilter) {
    categoryFilter.value = getUrlParam('category') || 'all';
    categoryFilter.addEventListener('change', function() {
      setUrlParam('category', this.value === 'all' ? null : this.value);
      renderShopProducts();
    });
  }

  if (brandFilter) {
    brandFilter.value = getUrlParam('brand') || 'all';
    brandFilter.addEventListener('change', function() {
      setUrlParam('brand', this.value === 'all' ? null : this.value);
      renderShopProducts();
    });
  }

  if (sortFilter) {
    sortFilter.value = getUrlParam('sort') || 'featured';
    sortFilter.addEventListener('change', function() {
      setUrlParam('sort', this.value === 'featured' ? null : this.value);
      renderShopProducts();
    });
  }

  if (searchInput) {
    searchInput.value = getUrlParam('search') || '';
    const doSearch = () => {
      const val = searchInput.value.trim();
      setUrlParam('search', val === '' ? null : val);
      renderShopProducts();
    };
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') doSearch();
    });
  }
}

// ============================================================================
// PRODUCT DETAIL PAGE
// ============================================================================

function renderProductDetail() {
  if (!isProductPage()) return;

  const productId = getUrlParam('id');
  if (!productId) {
    window.location.href = 'shop.html';
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    window.location.href = 'shop.html';
    return;
  }

  document.title = product.name + ' | Acecom Lanka';

  const breadcrumb = document.getElementById('breadcrumb-product');
  if (breadcrumb) breadcrumb.textContent = product.name;

  const detailContainer = document.getElementById('product-detail');
  if (!detailContainer) return;

  const specsHtml = Object.entries(product.specs)
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
    .join('');

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  detailContainer.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-detail-info">
        <span class="badge">${product.brand}</span>
        <span class="badge">${product.category}</span>
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="product-detail-pricing">
          <span class="old-price">${formatPrice(product.oldPrice)}</span>
          <span class="current-price">${formatPrice(product.price)}</span>
          <span class="savings">You save ${formatPrice(product.oldPrice - product.price)}</span>
        </div>
        <p class="product-description">${product.description}</p>
        <h3>Specifications</h3>
        <table class="specs-table">${specsHtml}</table>
        <div class="quantity-selector">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <input type="number" class="qty-input" id="detail-qty" value="1" min="1" max="10">
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary btn-large" onclick="addDetailToCart(${product.id})">Add to Cart</button>
          <button class="btn btn-accent btn-large" onclick="addDetailToCart(${product.id}); window.location.href='cart.html'">Buy Now</button>
        </div>
        <div class="product-features">
          <div>Free Shipping</div>
          <div>2 Year Warranty</div>
          <div>Expert Support</div>
        </div>
      </div>
    </div>

    <div class="product-tabs">
      <div class="tab-buttons">
        <button class="tab-btn active" onclick="switchTab('description')">Description</button>
        <button class="tab-btn" onclick="switchTab('specifications')">Specifications</button>
        <button class="tab-btn" onclick="switchTab('reviews')">Reviews</button>
      </div>
      <div class="tab-content active" id="tab-description"><p>${product.description}</p></div>
      <div class="tab-content" id="tab-specifications">
        <table class="specs-table">${specsHtml}</table>
      </div>
      <div class="tab-content" id="tab-reviews"><p>No reviews yet.</p></div>
    </div>

    <div class="related-products">
      <h2>You May Also Like</h2>
      <div class="product-grid">${products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map(p => `
        <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
          <div class="product-image">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-overlay"><button class="btn">View Details</button></div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-pricing">
              <span class="old-price">Rs. ${p.oldPrice.toLocaleString('en-LK')}</span>
              <span class="product-price">${formatPrice(p.price)}</span>
            </div>
            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id}, 1)">Add to Cart</button>
          </div>
        </div>
      `).join('')}
      </div>
    </div>
  `;
}

function changeQty(delta) {
  const input = document.getElementById('detail-qty');
  const newVal = Math.max(1, Math.min(10, parseInt(input.value) + delta));
  input.value = newVal;
}

function addDetailToCart(productId) {
  const qty = parseInt(document.getElementById('detail-qty').value);
  addToCart(productId, qty);
  document.getElementById('detail-qty').value = 1;
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(pane => pane.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');
}

// ============================================================================
// CART PAGE
// ============================================================================

function renderCartPage() {
  if (!isCartPage()) return;

  const itemsContainer = document.getElementById('cart-items');
  const summaryContainer = document.getElementById('cart-summary');
  const emptyCart = document.getElementById('empty-cart');

  if (!itemsContainer || !summaryContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (itemsContainer) itemsContainer.style.display = 'none';
    if (summaryContainer) summaryContainer.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    return;
  }

  const itemsHtml = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';
    const lineTotal = product.price * item.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>${product.brand}</p>
          <p>${formatPrice(product.price)}</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${product.id}, ${item.qty - 1})">−</button>
          <input type="number" value="${item.qty}" onchange="updateCartQty(${product.id}, parseInt(this.value))" min="1">
          <button class="qty-btn" onclick="updateCartQty(${product.id}, ${item.qty + 1})">+</button>
        </div>
        <div class="cart-item-total"><p>${formatPrice(lineTotal)}</p></div>
        <button class="cart-item-remove" onclick="removeFromCart(${product.id})">×</button>
      </div>
    `;
  }).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  itemsContainer.innerHTML = itemsHtml;
  itemsContainer.style.display = 'block';

  summaryContainer.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row">
      <span>Subtotal:</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping:</span>
      <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
    </div>
    ${shipping === 0 ? '<p class="free-shipping-note">Free shipping on orders over Rs.10,000</p>' : ''}
    <div class="summary-divider"></div>
    <div class="summary-total">
      <span>Total:</span>
      <span>${formatPrice(total)}</span>
    </div>
    <button class="btn btn-primary btn-checkout" onclick="proceedToCheckout()">Proceed to Checkout</button>
    <a href="shop.html" class="btn btn-secondary" style="display: block; text-align: center; text-decoration: none;">Continue Shopping</a>
  `;
  summaryContainer.style.display = 'block';
  if (emptyCart) emptyCart.style.display = 'none';
}

function proceedToCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }
  showToast('Proceeding to checkout...', 'info');
  setTimeout(() => {
    alert('Thank you for your order! Checkout functionality coming soon.');
  }, 1500);
}

// ============================================================================
// UI INTERACTIONS
// ============================================================================

function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!hamburgerBtn || !mobileNav) return;

  hamburgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent successfully!', 'success');
    form.reset();
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  initScrollToTop();
  initMobileMenu();
  initContactForm();

  // Initialize Supabase auth if available
  if (typeof initAuth === 'function') {
    initAuth();
  }

  if (isShopPage()) {
    renderShopProducts();
    setupFilterListeners();
  } else if (isProductPage()) {
    renderProductDetail();
  } else if (isCartPage()) {
    renderCartPage();
  }

  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQty = updateCartQty;
  window.changeQty = changeQty;
  window.addDetailToCart = addDetailToCart;
  window.switchTab = switchTab;
});
