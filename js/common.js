// ── CURSOR ──
const cursor = document.getElementById('cursor');
if(cursor) document.addEventListener('mousemove', e => { cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; });

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { const nl = document.getElementById('navLinks'); if(nl) nl.classList.remove('open'); });
});

// ── CART STORAGE (Hybrid: supabaseClient server-backed + localStorage fallback) ──
// The cart uses localStorage as immediate cache for UI responsiveness,
// and syncs to supabaseClient when connected. On page load, server data takes priority.

let _cartSyncInProgress = false;

function getCart() {
  try { return JSON.parse(localStorage.getItem('nv_cart') || '[]'); } catch(e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem('nv_cart', JSON.stringify(cart));
  updateCartBadge();
  // Fire async sync to server (non-blocking)
  _syncCartToServer(cart);
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount, #cartCountMobile').forEach(el => { if(el) el.textContent = total; });
}

function addToCartById(id, btn) {
  const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === id) : null;
  if(!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, mrp: product.mrp, emoji: product.emoji, category: product.category, qty: 1 });
  saveCart(cart);
  if(btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#2d5a3d';
    btn.style.color = '#f5d87a';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1800);
  }
  showToast('Added to cart! 🛒');
}

// Async sync: push local cart state to supabaseClient
async function _syncCartToServer(cart) {
  if (_cartSyncInProgress) return;
  if (typeof CartAPI === 'undefined' || !supabaseClient) return;
  
  _cartSyncInProgress = true;
  try {
    // Clear server cart then re-add all items
    const clearResult = await CartAPI.clearCart();
    if (clearResult.error) console.warn('[NutriVeda] Cart clear error:', clearResult.error);
    
    for (const item of cart) {
      if (item.id && item.qty > 0) {
        const result = await CartAPI.addItem(item.id, item.qty);
        if (result.error) console.warn('[NutriVeda] Cart add error for product', item.id, ':', result.error);
      }
    }
  } catch (e) {
    console.warn('[NutriVeda] Cart sync failed:', e.message || e);
  } finally {
    _cartSyncInProgress = false;
  }
}

// On page load: pull server cart and merge/override local cache
async function _loadCartFromServer() {
  if (typeof CartAPI === 'undefined' || !supabaseClient) return;
  
  try {
    const { data, error } = await CartAPI.getItems();
    if (error || !data || data.length === 0) return;
    
    // Server has items — use server as source of truth
    const serverCart = data.map(item => ({
      id: item.product_id,
      name: item.products?.name || '',
      price: item.products?.price || 0,
      mrp: item.products?.mrp || 0,
      emoji: item.products?.emoji || '',
      category: item.products?.category_name || '',
      qty: item.quantity
    })).filter(item => item.name); // filter out items where product join failed
    
    if (serverCart.length > 0) {
      localStorage.setItem('nv_cart', JSON.stringify(serverCart));
      updateCartBadge();
      // Trigger re-render if cart page is active
      if (typeof renderCart === 'function') renderCart();
    }
  } catch (e) {
    console.warn('[NutriVeda] Failed to load cart from server:', e.message || e);
  }
}

// Merge guest cart into user cart after login
async function mergeCartOnLogin() {
  if (typeof CartAPI === 'undefined' || !supabaseClient) return;
  
  try {
    const user = await getAuthUser();
    if (user) {
      await CartAPI.mergeGuestCart(user.id);
      await _loadCartFromServer();
    }
  } catch (e) {
    console.warn('[NutriVeda] Cart merge failed:', e.message || e);
  }
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if(!toast) { toast = document.createElement('div'); toast.id='globalToast'; toast.className='toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// ── WISHLIST SERVER SYNC ──
// Hooks into WishlistManager (defined in advanced-features.js) to add server persistence
let _wishlistSyncInProgress = false;

async function _syncWishlistToServer() {
  if (_wishlistSyncInProgress) return;
  if (typeof WishlistAPI === 'undefined' || !supabaseClient) return;
  if (typeof WishlistManager === 'undefined') return;
  
  _wishlistSyncInProgress = true;
  try {
    const localWishlist = WishlistManager.getWishlist(); // array of product IDs
    
    // Get current server wishlist
    const { data: serverItems } = await WishlistAPI.getItems();
    const serverIds = serverItems ? serverItems.map(i => i.product_id) : [];
    
    // Add items that are local but not on server
    for (const id of localWishlist) {
      if (!serverIds.includes(id)) {
        await WishlistAPI.addItem(id);
      }
    }
    
    // Remove items that are on server but not local
    for (const id of serverIds) {
      if (!localWishlist.includes(id)) {
        await WishlistAPI.removeItem(id);
      }
    }
  } catch (e) {
    console.warn('[NutriVeda] Wishlist sync failed:', e.message || e);
  } finally {
    _wishlistSyncInProgress = false;
  }
}

async function _loadWishlistFromServer() {
  if (typeof WishlistAPI === 'undefined' || !supabaseClient) return;
  if (typeof WishlistManager === 'undefined') return;
  
  try {
    const { data, error } = await WishlistAPI.getItems();
    if (error || !data || data.length === 0) return;
    
    // Server has items — use as source of truth
    const serverIds = data.map(item => item.product_id);
    localStorage.setItem(WishlistManager.storageKey || 'nutriveda_wishlist', JSON.stringify(serverIds));
    WishlistManager.updateWishlistCount();
    WishlistManager.updateAllWishlistButtons();
  } catch (e) {
    console.warn('[NutriVeda] Failed to load wishlist from server:', e.message || e);
  }
}

async function mergeWishlistOnLogin() {
  if (typeof WishlistAPI === 'undefined' || !supabaseClient) return;
  
  try {
    const user = await getAuthUser();
    if (user) {
      await WishlistAPI.mergeGuestWishlist(user.id);
      await _loadWishlistFromServer();
    }
  } catch (e) {
    console.warn('[NutriVeda] Wishlist merge failed:', e.message || e);
  }
}

// Listen for wishlist changes and sync to server
window.addEventListener('wishlistUpdated', () => {
  _syncWishlistToServer();
});

// ── REVEAL ON SCROLL ──
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', () => { initReveal(); updateCartBadge(); renderFooter(); updateNavForUser(); _loadCartFromServer(); _loadWishlistFromServer(); if (typeof lucide !== 'undefined') lucide.createIcons(); });

// ── CONTACT FORM ──
function submitForm(btn) {
  btn.textContent = '✓ Enquiry Sent! We\'ll contact you soon.';
  btn.style.background = 'linear-gradient(135deg,#2d5a3d,#3d7a52)';
  setTimeout(() => { btn.textContent = 'Send Enquiry →'; btn.style.background = ''; }, 3500);
}

// ── RENDER FOOTER ──
function renderFooter() {
  const fp = document.getElementById('footer-placeholder');
  if(!fp) return;
  fp.outerHTML = `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">Nutri<span>Veda</span></div>
        <p>Premium nutrition rooted in Ayurvedic wisdom and modern science. Based in Hyderabad, serving all of India.</p>
        <div class="footer-social">
          <a href="https://wa.me/917893639037" target="_blank" rel="noopener" class="social-btn" title="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="https://www.instagram.com/nutriveda.shop" target="_blank" rel="noopener" class="social-btn" title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/nutriveda.shop" target="_blank" rel="noopener" class="social-btn" title="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.youtube.com/@nutriveda" target="_blank" rel="noopener" class="social-btn" title="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="products.html?cat=protein">Protein Powders</a></li>
          <li><a href="products.html?cat=vitamins">Vitamins & Supplements</a></li>
          <li><a href="products.html?cat=herbal">Herbal Blends</a></li>
          <li><a href="products.html?cat=kids">Kids Nutrition</a></li>
          <li><a href="products.html">All Products</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="index.html#why-us">About Us</a></li>
          <li><a href="index.html#testimonials">Reviews</a></li>
          <li><a href="index.html#contact">Contact</a></li>
          <li><a href="login.html">Login</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+917893639037"><i data-lucide="phone" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i>+91 78936 39037</a></li>
          <li><a href="mailto:customercare.nutriveda@gmail.com"><i data-lucide="mail" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i>customercare.nutriveda@gmail.com</a></li>
          <li><a href="#"><i data-lucide="map-pin" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i>Chandanagar, Hyderabad 500049</a></li>
          <li><a href="cart.html"><i data-lucide="shopping-cart" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i>My Cart</a></li>
        </ul>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <span>© 2025 Nutri Veda - For Healthy Life. All rights reserved. Owned by Ravindar Nidigonda.</span>
      <span>Made with 💚 in Hyderabad</span>
    </div>
  </footer>`;
  // Re-initialize Lucide icons in the newly rendered footer
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ── USER SESSION MANAGEMENT ──
function isUserLoggedIn() {
  return localStorage.getItem('nv_user_logged_in') === 'true';
}

function getUserPhone() {
  return localStorage.getItem('nv_user_phone') || '';
}

function getUserFirstName() {
  return localStorage.getItem('nv_user_first_name') || '';
}

function getUserLastName() {
  return localStorage.getItem('nv_user_last_name') || '';
}

function getUserEmail() {
  return localStorage.getItem('nv_user_email') || '';
}

// Helper function to get correct login path based on current page location
function getLoginPath() {
  const currentPath = window.location.pathname;
  // If we're already in /pages/ folder, use relative path
  if (currentPath.includes('/pages/')) {
    return 'login.html';
  }
  // If we're in root, use pages/login.html
  return 'pages/login.html';
}

function logoutUser() {
  localStorage.removeItem('nv_user_logged_in');
  localStorage.removeItem('nv_user_phone');
  localStorage.removeItem('nv_user_first_name');
  localStorage.removeItem('nv_user_last_name');
  localStorage.removeItem('nv_user_email');
  localStorage.removeItem('nv_user_login_time');
  window.location.href = getLoginPath();
}

function updateNavForUser() {
  const navLinks = document.getElementById('navLinks');
  const loginNavItem = document.getElementById('loginNavItem');
  const loginMobile = document.getElementById('loginMobile');
  
  if (!navLinks) return;
  
  if (isUserLoggedIn()) {
    // User is logged in - replace login button with account menu
    const phone = getUserPhone();
    const email = getUserEmail();
    const firstName = getUserFirstName();
    const lastName = getUserLastName();
    
    // Prioritize first name, fallback to "User" if not available
    const displayName = firstName || 'User';
    const contactInfo = email || (phone ? `+91 ${phone}` : 'No contact');
    
    // Update desktop nav
    if (loginNavItem) {
      loginNavItem.innerHTML = `
        <a href="#" id="accountBtn" style="display:flex;align-items:center;gap:6px;position:relative;">
          <span style="font-size:20px;">👤</span> <span style="font-size:14px;">${displayName}</span>
        </a>
      `;
      
      // Account dropdown
      document.getElementById('accountBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove existing menu if any
        document.querySelector('.account-menu')?.remove();
        
        const menu = document.createElement('div');
        menu.className = 'account-menu';
        menu.style.cssText = `
          position: fixed;
          top: 60px;
          right: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          padding: 8px;
          min-width: 220px;
          z-index: 10000;
          border: 1px solid #e5e5e5;
        `;
        menu.innerHTML = `
          <div style="padding:12px 16px;border-bottom:1px solid #e5e5e5;">
            <div style="font-weight:600;color:var(--primary);font-size:15px;margin-bottom:4px;">
              ${firstName} ${lastName}
            </div>
            <div style="font-size:12px;color:#666;">📧 ${email}</div>
            ${phone ? `<div style="font-size:12px;color:#666;">📱 +91 ${phone}</div>` : ''}
          </div>
          <a href="#" id="logoutBtn" style="display:flex;align-items:center;gap:8px;padding:12px 16px;color:var(--text);text-decoration:none;transition:all 0.3s;border-radius:8px;font-size:14px;margin-top:4px;">
            <span style="font-size:18px;">🚪</span> Logout
          </a>
        `;
        
        document.body.appendChild(menu);
        
        // Logout handler
        menu.querySelector('#logoutBtn').addEventListener('click', function(e) {
          e.preventDefault();
          logoutUser();
        });
        
        // Close menu on outside click
        setTimeout(() => {
          document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.closest('#accountBtn')) {
              menu.remove();
              document.removeEventListener('click', closeMenu);
            }
          });
        }, 100);
      });
    }
    
    // Update mobile nav
    if (loginMobile) {
      loginMobile.textContent = firstName.charAt(0).toUpperCase() || '👤';
      loginMobile.style.fontSize = '18px';
      loginMobile.style.fontWeight = '600';
      loginMobile.title = `${firstName} ${lastName}`;
      loginMobile.onclick = function(e) {
        e.preventDefault();
        if (confirm(`Logged in as ${firstName} ${lastName}\n\nDo you want to logout?`)) {
          logoutUser();
        }
      };
    }
  } else {
    // User not logged in - show login button
    const loginPath = getLoginPath();
    if (loginNavItem) {
      loginNavItem.innerHTML = `<a href="${loginPath}" class="nav-login">👤 Login</a>`;
    }
    if (loginMobile) {
      loginMobile.href = loginPath;
      loginMobile.title = 'Login';
      loginMobile.onclick = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => { 
  initReveal(); 
  updateCartBadge(); 
  renderFooter();
  updateNavForUser();
  _loadCartFromServer();
  _loadWishlistFromServer();
  if (typeof lucide !== 'undefined') lucide.createIcons();
});


// ══════════════════════════════════════════════════════
//                   SEARCH FUNCTIONALITY
// ══════════════════════════════════════════════════════

// Toggle search modal
function toggleSearch() {
  const modal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  
  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  } else {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus input after animation
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 300);
  }
}

// Close search on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('searchModal');
    if (modal && modal.classList.contains('active')) {
      toggleSearch();
    }
  }
});

// Close search when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('searchModal');
  if (modal && modal.classList.contains('active')) {
    if (e.target === modal) {
      toggleSearch();
    }
  }
});

// Search for products
function searchProducts(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  // Search in product data
  const results = PRODUCTS.filter(product => {
    // Search in name
    if (product.name.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in category
    if (product.category.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in description
    if (product.desc && product.desc.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Search in tags
    if (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
      return true;
    }
    
    // Search in benefits
    if (product.benefits && product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))) {
      return true;
    }
    
    return false;
  });
  
  // Sort results by relevance
  return results.sort((a, b) => {
    // Exact name match gets highest priority
    const aNameMatch = a.name.toLowerCase() === searchTerm;
    const bNameMatch = b.name.toLowerCase() === searchTerm;
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    
    // Name starts with search term
    const aNameStarts = a.name.toLowerCase().startsWith(searchTerm);
    const bNameStarts = b.name.toLowerCase().startsWith(searchTerm);
    if (aNameStarts && !bNameStarts) return -1;
    if (!aNameStarts && bNameStarts) return 1;
    
    // Sort by rating
    return b.rating - a.rating;
  });
}

// Highlight matched text
function highlightMatch(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Display search results
function displaySearchResults(results, query) {
  const resultsContainer = document.getElementById('searchResults');
  const currentPath = window.location.pathname;
  
  if (!results || results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-no-results">
        <div class="search-no-results-icon">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.2;">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            <line x1="11" y1="8" x2="11" y2="11"></line>
            <line x1="11" y1="14" x2="11.01" y2="14"></line>
          </svg>
        </div>
        <h3>No products found</h3>
        <p>We couldn't find any products matching "${query}"</p>
        <button onclick="clearSearch()">Clear Search</button>
      </div>
    `;
    return;
  }
  
  let html = `
    <div class="search-stats">
      Found <strong>${results.length}</strong> product${results.length > 1 ? 's' : ''} matching "<strong>${query}</strong>"
    </div>
  `;
  
  results.forEach(product => {
    const productLink = currentPath.includes('/pages/') ? `product.html?id=${product.id}` : `pages/product.html?id=${product.id}`;
    html += `
      <a href="${productLink}" class="search-result-item" onclick="toggleSearch()">
        <div class="search-result-icon">${product.emoji}</div>
        <div class="search-result-info">
          <div class="search-result-name">${highlightMatch(product.name, query)}</div>
          <div class="search-result-category">${product.category}</div>
          <div class="search-result-desc">${highlightMatch(product.desc, query)}</div>
        </div>
        <div class="search-result-price">
          <span class="price">₹${product.price.toLocaleString()}</span>
          ${product.mrp !== product.price ? `<span class="mrp">₹${product.mrp.toLocaleString()}</span>` : ''}
        </div>
      </a>
    `;
  });
  
  resultsContainer.innerHTML = html;
}

// Search input handler
let searchTimeout;
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      
      // Show/hide clear button
      if (searchClear) {
        searchClear.style.display = query ? 'flex' : 'none';
      }
      
      // Clear previous timeout
      clearTimeout(searchTimeout);
      
      // Debounce search (wait 300ms after user stops typing)
      searchTimeout = setTimeout(() => {
        if (query.trim() === '') {
          // Show placeholder
          const resultsContainer = document.getElementById('searchResults');
          if (resultsContainer) {
            resultsContainer.innerHTML = `
              <div class="search-placeholder">
                <div class="search-placeholder-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.2;">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <p>Start typing to search through 94+ products</p>
                <div class="search-suggestions">
                  <p style="font-size:13px;color:#666;margin-top:12px;">Try searching for:</p>
                  <div class="search-tags">
                    <span onclick="searchFor('protein')">Protein</span>
                    <span onclick="searchFor('kids')">Kids Nutrition</span>
                    <span onclick="searchFor('immunity')">Immunity</span>
                    <span onclick="searchFor('weight')">Weight Loss</span>
                    <span onclick="searchFor('herbal')">Herbal</span>
                  </div>
                </div>
              </div>
            `;
          }
        } else {
          // Perform search
          const results = searchProducts(query);
          displaySearchResults(results, query);
        }
      }, 300);
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query && searchProducts(query).length > 0) {
          // Go to first result
          const firstResult = searchProducts(query)[0];
          const currentPath = window.location.pathname;
          const productLink = currentPath.includes('/pages/') ? `product.html?id=${firstResult.id}` : `pages/product.html?id=${firstResult.id}`;
          window.location.href = productLink;
        }
      }
    });
  }
});

// Clear search
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const resultsContainer = document.getElementById('searchResults');
  
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  
  if (searchClear) {
    searchClear.style.display = 'none';
  }
  
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div class="search-placeholder">
        <div class="search-placeholder-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.2;">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        <p>Start typing to search through 94+ products</p>
        <div class="search-suggestions">
          <p style="font-size:13px;color:#666;margin-top:12px;">Try searching for:</p>
          <div class="search-tags">
            <span onclick="searchFor('protein')">Protein</span>
            <span onclick="searchFor('kids')">Kids Nutrition</span>
            <span onclick="searchFor('immunity')">Immunity</span>
            <span onclick="searchFor('weight')">Weight Loss</span>
            <span onclick="searchFor('herbal')">Herbal</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Search for specific term (from suggestions)
function searchFor(term) {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = term;
    searchInput.dispatchEvent(new Event('input'));
  }
}
