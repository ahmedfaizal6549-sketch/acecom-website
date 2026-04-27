// ============================================================================
// SUPABASE CLIENT CONFIGURATION
// Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual values
// Find them at: Supabase Dashboard > Project Settings > API
// ============================================================================

const SUPABASE_URL = 'https://orwmrumttsqdhrdzxizx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yd21ydW10dHNxZGhyZHp4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTQ4MTAsImV4cCI6MjA5MjU5MDgxMH0.q3_JnGtDy_ZSzxKLzGEb_Rld2gPJrpvz06ua3PUoir0';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// AUTH STATE MANAGEMENT
// ============================================================================

let currentUser = null;

async function initAuth() {
  // Check for existing session
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentUser = session.user;
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    updateAuthUI();

    if (event === 'SIGNED_IN') {
      // Sync localStorage cart to Supabase
      syncLocalCartToSupabase();
    }
    if (event === 'SIGNED_OUT') {
      currentUser = null;
    }
  });

  updateAuthUI();
}

// ============================================================================
// AUTH UI UPDATES
// ============================================================================

function updateAuthUI() {
  const authLinks = document.querySelectorAll('.auth-link');
  const userMenus = document.querySelectorAll('.user-menu');
  const userNameEls = document.querySelectorAll('.user-name');

  if (currentUser) {
    // User is logged in
    authLinks.forEach(el => el.style.display = 'none');
    userMenus.forEach(el => el.style.display = 'flex');
    const name = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User';
    userNameEls.forEach(el => el.textContent = name);
  } else {
    // User is logged out
    authLinks.forEach(el => el.style.display = 'inline-flex');
    userMenus.forEach(el => el.style.display = 'none');
  }
}

// ============================================================================
// AUTH FUNCTIONS
// ============================================================================

async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });

  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = 'index.html';
}

async function getProfile() {
  if (!currentUser) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .single();
  if (error) throw error;
  return data;
}

async function updateProfile(updates) {
  if (!currentUser) return null;
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', currentUser.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================================
// SUPABASE PRODUCT FUNCTIONS
// ============================================================================

async function fetchProducts(filters = {}) {
  let query = supabase.from('products').select('*');

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }
  if (filters.brand && filters.brand !== 'all') {
    query = query.eq('brand', filters.brand);
  }
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  if (filters.featured) {
    query = query.eq('featured', true);
  }

  // Sort
  switch (filters.sort) {
    case 'price-low':
      query = query.order('price', { ascending: true });
      break;
    case 'price-high':
      query = query.order('price', { ascending: false });
      break;
    case 'name':
      query = query.order('name');
      break;
    default:
      query = query.order('id');
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function fetchProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// ============================================================================
// SUPABASE CART FUNCTIONS (for logged-in users)
// ============================================================================

async function getSupabaseCart() {
  if (!currentUser) return [];
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', currentUser.id);
  if (error) throw error;
  return data || [];
}

async function addToSupabaseCart(productId, qty = 1) {
  if (!currentUser) return;

  // Upsert: insert or update quantity
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', currentUser.id)
    .eq('product_id', productId)
    .single();

  if (existing) {
    await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + qty })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('cart_items')
      .insert({ user_id: currentUser.id, product_id: productId, quantity: qty });
  }
}

async function updateSupabaseCartQty(productId, newQty) {
  if (!currentUser) return;

  if (newQty <= 0) {
    await removeFromSupabaseCart(productId);
  } else {
    await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('user_id', currentUser.id)
      .eq('product_id', productId);
  }
}

async function removeFromSupabaseCart(productId) {
  if (!currentUser) return;
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', currentUser.id)
    .eq('product_id', productId);
}

async function clearSupabaseCart() {
  if (!currentUser) return;
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', currentUser.id);
}

// Sync localStorage cart to Supabase when user logs in
async function syncLocalCartToSupabase() {
  const localCart = JSON.parse(localStorage.getItem('acecom-cart') || '[]');
  if (localCart.length === 0 || !currentUser) return;

  for (const item of localCart) {
    await addToSupabaseCart(item.id, item.qty);
  }

  // Clear localStorage cart after syncing
  localStorage.removeItem('acecom-cart');
}

// ============================================================================
// SUPABASE ORDER FUNCTIONS
// ============================================================================

async function createOrder(shippingDetails) {
  if (!currentUser) throw new Error('Must be logged in to place an order');

  const cartItems = await getSupabaseCart();
  if (cartItems.length === 0) throw new Error('Cart is empty');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 500;
  const total = subtotal + shipping;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: currentUser.id,
      total: total,
      shipping: shipping,
      shipping_name: shippingDetails.name,
      shipping_address: shippingDetails.address,
      shipping_city: shippingDetails.city,
      shipping_phone: shippingDetails.phone
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Clear cart
  await clearSupabaseCart();

  return order;
}

async function getOrders() {
  if (!currentUser) return [];
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Make functions available globally
window.supabaseClient = supabase;
window.currentUser = () => currentUser;
window.initAuth = initAuth;
window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.getProfile = getProfile;
window.updateProfile = updateProfile;
window.fetchProducts = fetchProducts;
window.fetchProductById = fetchProductById;
window.getSupabaseCart = getSupabaseCart;
window.addToSupabaseCart = addToSupabaseCart;
window.updateSupabaseCartQty = updateSupabaseCartQty;
window.removeFromSupabaseCart = removeFromSupabaseCart;
window.clearSupabaseCart = clearSupabaseCart;
window.createOrder = createOrder;
window.getOrders = getOrders;
