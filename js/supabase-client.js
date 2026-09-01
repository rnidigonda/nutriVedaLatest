// ══════════════════════════════════════════════════════
//  SUPABASE CLIENT - NutriVeda
//  Initializes Supabase client for auth, database, and storage
// ══════════════════════════════════════════════════════

// Supabase configuration - loaded from config.js
const SUPABASE_URL = CONFIG.SUPABASE?.URL || '';
const SUPABASE_ANON_KEY = CONFIG.SUPABASE?.ANON_KEY || '';

// Initialize Supabase client (loaded via CDN in HTML)
// Using _supabaseClient to avoid collision with the CDN's window.supabase
var supabaseClient = null;

function initSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[NutriVeda] supabaseClient not configured. Running in offline/localStorage mode.');
    return null;
  }
  
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'nv_supabase_auth'
      }
    });
    return supabaseClient;
  }
  
  console.warn('[NutriVeda] supabaseClient JS library not loaded. Running in offline mode.');
  return null;
}

// ─── GUEST SESSION ──────────────────────────────────────
// For non-logged-in users, create/retrieve a guest session ID
function getGuestSessionId() {
  let sessionId = localStorage.getItem('nv_guest_session_id');
  if (!sessionId) {
    sessionId = 'guest_' + crypto.randomUUID();
    localStorage.setItem('nv_guest_session_id', sessionId);
  }
  return sessionId;
}

function clearGuestSession() {
  localStorage.removeItem('nv_guest_session_id');
}

// ─── AUTH HELPERS ───────────────────────────────────────
async function getAuthUser() {
  if (!supabaseClient) return null;
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  } catch (e) {
    return null;
  }
}

async function getSessionContext() {
  const user = await getAuthUser();
  if (user) {
    return { type: 'authenticated', userId: user.id, guestSessionId: null };
  }
  return { type: 'guest', userId: null, guestSessionId: getGuestSessionId() };
}

// ─── PRODUCT API ────────────────────────────────────────
const ProductAPI = {
  async getAll(options = {}) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    let query = supabaseClient
      .from('products')
      .select('*')
      .eq('is_active', true);
    
    if (options.category) {
      query = query.ilike('cat_key', `%${options.category}%`);
    }
    if (options.minPrice) {
      query = query.gte('price', options.minPrice);
    }
    if (options.maxPrice) {
      query = query.lte('price', options.maxPrice);
    }
    if (options.minRating) {
      query = query.gte('rating', options.minRating);
    }
    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,tags.cs.{${options.search}}`);
    }
    if (options.featured) {
      query = query.eq('is_featured', true);
    }
    
    // Sorting
    switch (options.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'popularity':
        query = query.order('review_count', { ascending: false });
        break;
      default:
        query = query.order('id', { ascending: true });
    }
    
    // Pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }
    
    return await query;
  },
  
  async getById(id) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    return await supabaseClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
  },
  
  async getBySlug(slug) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    return await supabaseClient
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
  },
  
  async getCategories() {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    return await supabaseClient
      .from('categories')
      .select('*')
      .order('display_order');
  }
};

// ─── PRODUCT DATA LOADER ────────────────────────────────
// Maps a Supabase product row to the shape the UI expects
// (matches the structure of the hardcoded PRODUCTS in data.js)
function mapDbProductToUi(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_name,
    catKey: row.cat_key,
    emoji: row.emoji || '📦',
    badge: row.badge || '',
    price: row.price,
    mrp: row.mrp,
    rating: Number(row.rating) || 0,
    reviews: row.review_count || 0,
    desc: row.description || '',
    tagline: row.tagline || '',
    benefits: row.benefits || [],
    tags: row.tags || [],
    howToUse: row.how_to_use || '',
    ingredients: row.ingredients || '',
    storageInfo: row.storage_info || '',
    shelfLife: row.shelf_life || '',
    isFeatured: !!row.is_featured
  };
}

// Fetch all products from Supabase and replace the global PRODUCTS array.
// Falls back silently to the hardcoded data.js PRODUCTS if the DB is
// unavailable or returns nothing.
async function loadProductsFromDB() {
  if (!supabaseClient) return false;
  try {
    // Fetch all active products (paginate to bypass default 1000 row cap safely)
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })
      .limit(1000);

    if (error || !data || data.length === 0) return false;

    const mapped = data.map(mapDbProductToUi);
    // Replace the global PRODUCTS contents in place so existing references stay valid
    if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
      PRODUCTS.length = 0;
      mapped.forEach(p => PRODUCTS.push(p));
    } else {
      window.PRODUCTS = mapped;
    }
    return true;
  } catch (e) {
    console.warn('[NutriVeda] Failed to load products from DB, using local data:', e.message || e);
    return false;
  }
}

// ─── CART API ───────────────────────────────────────────
const CartAPI = {
  async getItems() {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (id, name, price, mrp, emoji, category_name, slug, image_url, in_stock)
      `);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async addItem(productId, quantity = 1) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    const insertData = {
      product_id: productId,
      quantity: quantity
    };
    
    if (ctx.type === 'authenticated') {
      insertData.customer_id = ctx.userId;
    } else {
      insertData.guest_session_id = ctx.guestSessionId;
    }
    
    // Try insert first; on conflict, update quantity
    const { data, error } = await supabaseClient
      .from('cart_items')
      .insert(insertData);
    
    // If duplicate key error, update instead
    if (error && error.code === '23505') {
      let updateQuery = supabaseClient
        .from('cart_items')
        .update({ quantity })
        .eq('product_id', productId);
      
      if (ctx.type === 'authenticated') {
        updateQuery = updateQuery.eq('customer_id', ctx.userId);
      } else {
        updateQuery = updateQuery.eq('guest_session_id', ctx.guestSessionId);
      }
      return await updateQuery;
    }
    
    return { data, error };
  },
  
  async updateQuantity(productId, quantity) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('cart_items')
      .update({ quantity })
      .eq('product_id', productId);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async removeItem(productId) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('cart_items')
      .delete()
      .eq('product_id', productId);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async clearCart() {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('cart_items')
      .delete();
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async getCount() {
    if (!supabaseClient) return 0;
    
    const { data } = await this.getItems();
    if (!data) return 0;
    return data.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  // Merge guest cart into authenticated user cart on login
  async mergeGuestCart(userId) {
    if (!supabaseClient) return;
    
    const guestSessionId = localStorage.getItem('nv_guest_session_id');
    if (!guestSessionId) return;
    
    // Get guest cart items
    const { data: guestItems } = await supabaseClient
      .from('cart_items')
      .select('product_id, quantity')
      .eq('guest_session_id', guestSessionId);
    
    if (!guestItems || guestItems.length === 0) return;
    
    // Upsert each guest item into user's cart
    for (const item of guestItems) {
      await supabaseClient
        .from('cart_items')
        .upsert({
          customer_id: userId,
          product_id: item.product_id,
          quantity: item.quantity
        }, {
          onConflict: 'customer_id,product_id'
        });
    }
    
    // Delete guest cart items
    await supabaseClient
      .from('cart_items')
      .delete()
      .eq('guest_session_id', guestSessionId);
    
    // Clear guest session
    clearGuestSession();
  }
};

// ─── WISHLIST API ───────────────────────────────────────
const WishlistAPI = {
  async getItems() {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('wishlist_items')
      .select(`
        id,
        product_id,
        created_at,
        products (id, name, price, mrp, emoji, category_name, slug, image_url, in_stock, rating, review_count)
      `);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query.order('created_at', { ascending: false });
  },
  
  async addItem(productId) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    const insertData = { product_id: productId };
    
    if (ctx.type === 'authenticated') {
      insertData.customer_id = ctx.userId;
    } else {
      insertData.guest_session_id = ctx.guestSessionId;
    }
    
    return await supabaseClient
      .from('wishlist_items')
      .upsert(insertData, {
        onConflict: ctx.type === 'authenticated' ? 'customer_id,product_id' : 'guest_session_id,product_id'
      });
  },
  
  async removeItem(productId) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('wishlist_items')
      .delete()
      .eq('product_id', productId);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async isInWishlist(productId) {
    if (!supabaseClient) return false;
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('wishlist_items')
      .select('id')
      .eq('product_id', productId);
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    const { data } = await query.maybeSingle();
    return !!data;
  },
  
  async getCount() {
    if (!supabaseClient) return 0;
    
    const { data } = await this.getItems();
    return data ? data.length : 0;
  },
  
  // Merge guest wishlist into authenticated user on login
  async mergeGuestWishlist(userId) {
    if (!supabaseClient) return;
    
    const guestSessionId = localStorage.getItem('nv_guest_session_id');
    if (!guestSessionId) return;
    
    const { data: guestItems } = await supabaseClient
      .from('wishlist_items')
      .select('product_id')
      .eq('guest_session_id', guestSessionId);
    
    if (!guestItems || guestItems.length === 0) return;
    
    for (const item of guestItems) {
      await supabaseClient
        .from('wishlist_items')
        .upsert({
          customer_id: userId,
          product_id: item.product_id
        }, {
          onConflict: 'customer_id,product_id'
        });
    }
    
    await supabaseClient
      .from('wishlist_items')
      .delete()
      .eq('guest_session_id', guestSessionId);
    
    clearGuestSession();
  }
};

// ─── REVIEWS API ────────────────────────────────────────
const ReviewsAPI = {
  async getForProduct(productId, options = {}) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    let query = supabaseClient
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_approved', true);
    
    // Sort
    switch (options.sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'highest':
        query = query.order('rating', { ascending: false });
        break;
      case 'lowest':
        query = query.order('rating', { ascending: true });
        break;
      case 'helpful':
        query = query.order('helpful_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    return await query;
  },
  
  async submitReview(productId, reviewData) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const user = await getAuthUser();
    if (!user) return { data: null, error: 'Must be logged in to submit a review' };
    
    return await supabaseClient
      .from('reviews')
      .insert({
        product_id: productId,
        customer_id: user.id,
        customer_name: reviewData.name,
        rating: reviewData.rating,
        title: reviewData.title || null,
        body: reviewData.body || null,
        photo_urls: reviewData.photos || null,
        is_verified_purchase: reviewData.isVerifiedPurchase || false
      });
  },
  
  async markHelpful(reviewId) {
    if (!supabaseClient) return;
    
    await supabaseClient.rpc('increment_helpful_count', { review_id: reviewId });
  }
};

// ─── ORDERS API ─────────────────────────────────────────
const OrdersAPI = {
  async create(orderData) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    
    const order = {
      customer_id: ctx.userId,
      guest_session_id: ctx.type === 'guest' ? ctx.guestSessionId : null,
      payment_method: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      shipping_fee: orderData.shippingFee || 0,
      cod_fee: orderData.codFee || 0,
      discount: orderData.discount || 0,
      total: orderData.total,
      shipping_name: orderData.shippingName,
      shipping_phone: orderData.shippingPhone,
      shipping_email: orderData.shippingEmail,
      shipping_address_line1: orderData.addressLine1,
      shipping_address_line2: orderData.addressLine2,
      shipping_city: orderData.city,
      shipping_state: orderData.state,
      shipping_pincode: orderData.pincode,
      customer_notes: orderData.notes || null,
      payment_id: orderData.paymentId || null,
      payment_order_id: orderData.paymentOrderId || null,
      payment_signature: orderData.paymentSignature || null,
      payment_status: orderData.paymentStatus || 'pending'
    };
    
    const { data, error } = await supabaseClient
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) return { data: null, error };
    
    // Insert order items
    if (orderData.items && orderData.items.length > 0) {
      const orderItems = orderData.items.map(item => ({
        order_id: data.id,
        product_id: item.productId,
        product_name: item.productName,
        product_emoji: item.emoji,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.unitPrice * item.quantity
      }));
      
      await supabaseClient.from('order_items').insert(orderItems);
    }
    
    return { data, error: null };
  },
  
  async getMyOrders() {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    const ctx = await getSessionContext();
    let query = supabaseClient
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });
    
    if (ctx.type === 'authenticated') {
      query = query.eq('customer_id', ctx.userId);
    } else {
      query = query.eq('guest_session_id', ctx.guestSessionId);
    }
    
    return await query;
  },
  
  async getById(orderId) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    return await supabaseClient
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();
  },
  
  async updatePaymentStatus(orderId, paymentData) {
    if (!supabaseClient) return { data: null, error: 'Not connected' };
    
    return await supabaseClient
      .from('orders')
      .update({
        payment_status: paymentData.status,
        payment_id: paymentData.paymentId,
        payment_signature: paymentData.signature,
        status: paymentData.status === 'captured' ? 'confirmed' : 'placed'
      })
      .eq('id', orderId);
  }
};

// ─── INITIALIZATION ─────────────────────────────────────
// Initialize immediately (this script loads after the Supabase CDN)
initSupabase();

// Kick off product loading right away and expose a promise pages can await.
// Pages should render inside: NV_PRODUCTS_READY.then(renderProducts)
window.NV_PRODUCTS_READY = (async function () {
  const loaded = await loadProductsFromDB();
  // Notify any listeners (pages that render on event rather than promise)
  document.dispatchEvent(new CustomEvent('nv-products-ready', { detail: { fromDB: loaded } }));
  return loaded;
})();
