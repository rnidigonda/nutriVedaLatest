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

// ── CART STORAGE ──
function getCart() {
  try { return JSON.parse(localStorage.getItem('nv_cart') || '[]'); } catch(e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('nv_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount, #cartCountMobile').forEach(el => { if(el) el.textContent = total; });
}
function addToCartById(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
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

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if(!toast) { toast = document.createElement('div'); toast.id='globalToast'; toast.className='toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// ── REVEAL ON SCROLL ──
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', () => { initReveal(); updateCartBadge(); renderFooter(); updateNavForUser(); });

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
          <div class="social-btn">📘</div>
          <div class="social-btn">📸</div>
          <div class="social-btn">🐦</div>
          <div class="social-btn">💬</div>
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
          <li><a href="tel:+917893639037">📞 +91 78936 39037</a></li>
          <li><a href="mailto:nidigondaravindar@gmail.com">✉️ nidigondaravindar@gmail.com</a></li>
          <li><a href="#">📍 Chandanagar, Hyderabad 500049</a></li>
          <li><a href="cart.html">🛒 My Cart</a></li>
        </ul>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <span>© 2025 NutriVeda. All rights reserved. Owned by Ravindar Nidigonda.</span>
      <span>Made with 💚 in Hyderabad</span>
    </div>
  </footer>`;
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

function logoutUser() {
  localStorage.removeItem('nv_user_logged_in');
  localStorage.removeItem('nv_user_phone');
  localStorage.removeItem('nv_user_first_name');
  localStorage.removeItem('nv_user_last_name');
  localStorage.removeItem('nv_user_email');
  localStorage.removeItem('nv_user_login_time');
  window.location.href = 'pages/login.html';
}

function updateNavForUser() {
  const navLinks = document.getElementById('navLinks');
  const loginNavItem = document.getElementById('loginNavItem');
  const loginMobile = document.getElementById('loginMobile');
  
  if (!navLinks) return;
  
  if (isUserLoggedIn()) {
    // User is logged in - replace login button with account menu
    const phone = getUserPhone();
    const firstName = getUserFirstName();
    const lastName = getUserLastName();
    
    // Prioritize first name, fallback to "User" if not available
    const displayName = firstName || 'User';
    
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
            <div style="font-size:12px;color:#666;">📱 +91 ${phone}</div>
            <div style="font-size:12px;color:#666;">📧 ${getUserEmail()}</div>
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
    if (loginNavItem) {
      loginNavItem.innerHTML = '<a href="pages/login.html" class="nav-login">👤 Login</a>';
    }
    if (loginMobile) {
      loginMobile.href = 'pages/login.html';
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
});