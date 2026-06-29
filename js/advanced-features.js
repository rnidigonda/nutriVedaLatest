// ============================================
// NUTRIVEDA ADVANCED E-COMMERCE FEATURES
// ============================================
// Features: Quick View, Sticky Cart, Smart Recommendations, 
// Wishlist, Live Search with Autocomplete
// ============================================

(function() {
  'use strict';

  // ============================================
  // FEATURE 1: WISHLIST / SAVE FOR LATER
  // ============================================
  
  const WishlistManager = {
    storageKey: 'nutriveda_wishlist',
    
    getWishlist() {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    },
    
    saveWishlist(wishlist) {
      localStorage.setItem(this.storageKey, JSON.stringify(wishlist));
      this.updateWishlistCount();
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist } }));
    },
    
    addToWishlist(productId) {
      const wishlist = this.getWishlist();
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        this.saveWishlist(wishlist);
        this.showNotification('Added to wishlist! ❤️', 'success');
        return true;
      }
      this.showNotification('Already in wishlist', 'info');
      return false;
    },
    
    removeFromWishlist(productId) {
      let wishlist = this.getWishlist();
      wishlist = wishlist.filter(id => id !== productId);
      this.saveWishlist(wishlist);
      this.showNotification('Removed from wishlist', 'info');
    },
    
    toggleWishlist(productId) {
      if (this.isInWishlist(productId)) {
        this.removeFromWishlist(productId);
        return false;
      } else {
        this.addToWishlist(productId);
        return true;
      }
    },
    
    isInWishlist(productId) {
      return this.getWishlist().includes(productId);
    },
    
    clearWishlist() {
      if (confirm('Are you sure you want to clear your entire wishlist?')) {
        localStorage.removeItem(this.storageKey);
        this.updateWishlistCount();
        this.showNotification('Wishlist cleared', 'info');
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    },
    
    updateWishlistCount() {
      const count = this.getWishlist().length;
      const countElements = document.querySelectorAll('.wishlist-count');
      countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
      });
    },
    
    showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `wishlist-notification ${type}`;
      
      const icon = type === 'success' ? '✓' : type === 'info' ? 'ℹ' : '⚠';
      notification.innerHTML = `
        <span class="notif-icon">${icon}</span>
        <span class="notif-message">${message}</span>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => notification.classList.add('show'), 10);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 2500);
    },
    
    initWishlistButtons() {
      // Handle wishlist button clicks with event delegation
      document.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.wishlist-btn');
        if (wishlistBtn) {
          e.preventDefault();
          e.stopPropagation(); // Prevent card click
          
          const productId = parseInt(wishlistBtn.dataset.productId);
          const isAdded = this.toggleWishlist(productId);
          
          // Update button state with animation
          if (isAdded) {
            wishlistBtn.classList.add('active');
            wishlistBtn.classList.add('pulse');
            setTimeout(() => wishlistBtn.classList.remove('pulse'), 600);
          } else {
            wishlistBtn.classList.remove('active');
          }
          
          // Update all buttons for this product
          this.updateButtonsForProduct(productId);
        }
      });
      
      // Update all wishlist buttons on page load
      this.updateAllWishlistButtons();
      
      // Listen for wishlist updates from other pages
      window.addEventListener('wishlistUpdated', () => {
        this.updateAllWishlistButtons();
      });
    },
    
    updateAllWishlistButtons() {
      document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (this.isInWishlist(productId)) {
          btn.classList.add('active');
          const icon = btn.querySelector('.wishlist-icon');
          if (icon) icon.textContent = '❤';
        } else {
          btn.classList.remove('active');
          const icon = btn.querySelector('.wishlist-icon');
          if (icon) icon.textContent = '♡';
        }
      });
    },
    
    updateButtonsForProduct(productId) {
      const isInWishlist = this.isInWishlist(productId);
      document.querySelectorAll(`.wishlist-btn[data-product-id="${productId}"]`).forEach(btn => {
        if (isInWishlist) {
          btn.classList.add('active');
          const icon = btn.querySelector('.wishlist-icon');
          if (icon) icon.textContent = '❤';
        } else {
          btn.classList.remove('active');
          const icon = btn.querySelector('.wishlist-icon');
          if (icon) icon.textContent = '♡';
        }
      });
    },
    
    getWishlistProducts() {
      const wishlist = this.getWishlist();
      if (typeof PRODUCTS === 'undefined') return [];
      return wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    }
  };

  // Make WishlistManager globally available
  window.WishlistManager = WishlistManager;

  // ============================================
  // FEATURE 2: STICKY ADD TO CART BAR
  // ============================================
  
  const StickyCartBar = {
    init() {
      this.createStickyBar();
      this.updateCartDisplay();
      this.setupScrollListener();
      
      // Update on cart changes
      window.addEventListener('cartUpdated', () => this.updateCartDisplay());
    },
    
    createStickyBar() {
      const stickyBar = document.createElement('div');
      stickyBar.className = 'sticky-cart-bar';
      stickyBar.innerHTML = `
        <div class="sticky-cart-content">
          <div class="sticky-cart-info">
            <span class="sticky-cart-icon">🛒</span>
            <div class="sticky-cart-text">
              <span class="sticky-cart-items">0 items</span>
              <span class="sticky-cart-total">₹0</span>
            </div>
          </div>
          <button class="sticky-cart-btn" onclick="window.location.href='cart.html'">
            View Cart →
          </button>
        </div>
      `;
      document.body.appendChild(stickyBar);
    },
    
    updateCartDisplay() {
      const cart = JSON.parse(localStorage.getItem('nv_cart') || '[]');
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const itemsEl = document.querySelector('.sticky-cart-items');
      const totalEl = document.querySelector('.sticky-cart-total');
      const stickyBar = document.querySelector('.sticky-cart-bar');
      
      if (itemsEl) itemsEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
      if (totalEl) totalEl.textContent = `₹${total}`;
      
      if (stickyBar) {
        if (itemCount > 0) {
          stickyBar.classList.add('has-items');
        } else {
          stickyBar.classList.remove('has-items');
        }
      }
    },
    
    setupScrollListener() {
      let lastScroll = 0;
      const stickyBar = document.querySelector('.sticky-cart-bar');
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 300) {
          if (currentScroll > lastScroll) {
            // Scrolling down
            stickyBar.classList.add('visible');
          }
        } else {
          stickyBar.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
      });
    }
  };

  // ============================================
  // FEATURE 3: PRODUCT QUICK VIEW MODAL
  // ============================================
  
  const QuickView = {
    init() {
      this.createModal();
      this.setupEventListeners();
    },
    
    createModal() {
      const modal = document.createElement('div');
      modal.className = 'quick-view-modal';
      modal.id = 'quickViewModal';
      modal.innerHTML = `
        <div class="quick-view-overlay"></div>
        <div class="quick-view-content">
          <button class="quick-view-close">×</button>
          <div class="quick-view-body">
            <div class="quick-view-image">
              <img src="" alt="" id="quickViewImage">
              <button class="wishlist-btn-quick" data-product-id="">
                <span class="wishlist-icon">♡</span>
              </button>
            </div>
            <div class="quick-view-details">
              <div class="quick-view-badge"></div>
              <h2 class="quick-view-title"></h2>
              <div class="quick-view-rating"></div>
              <div class="quick-view-price">
                <span class="quick-view-current-price"></span>
                <span class="quick-view-mrp"></span>
                <span class="quick-view-discount"></span>
              </div>
              <p class="quick-view-desc"></p>
              <div class="quick-view-benefits"></div>
              <div class="quick-view-actions">
                <button class="quick-view-add-cart btn-primary">Add to Cart</button>
                <a href="#" class="quick-view-full-details btn-secondary">Full Details →</a>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    },
    
    setupEventListeners() {
      // Quick view button clicks
      document.addEventListener('click', (e) => {
        const quickViewBtn = e.target.closest('.quick-view-btn');
        if (quickViewBtn) {
          e.preventDefault();
          const productId = parseInt(quickViewBtn.dataset.productId);
          this.showProduct(productId);
        }
      });
      
      // Close modal
      document.addEventListener('click', (e) => {
        if (e.target.matches('.quick-view-close, .quick-view-overlay')) {
          this.closeModal();
        }
      });
      
      // ESC key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
        }
      });
    },
    
    showProduct(productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      
      const modal = document.getElementById('quickViewModal');
      
      // Update content
      document.getElementById('quickViewImage').src = `../assets/products/${product.id}.jpg`;
      modal.querySelector('.quick-view-badge').textContent = product.badge || '';
      modal.querySelector('.quick-view-title').textContent = product.name;
      modal.querySelector('.quick-view-rating').innerHTML = this.getRatingHTML(product.rating, product.reviews);
      modal.querySelector('.quick-view-current-price').textContent = `₹${product.price}`;
      modal.querySelector('.quick-view-mrp').textContent = `₹${product.mrp}`;
      
      const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
      modal.querySelector('.quick-view-discount').textContent = `${discount}% OFF`;
      
      modal.querySelector('.quick-view-desc').textContent = product.desc;
      modal.querySelector('.quick-view-benefits').innerHTML = this.getBenefitsHTML(product.benefits);
      modal.querySelector('.quick-view-full-details').href = `product.html?id=${product.id}`;
      
      // Add to cart functionality
      const addCartBtn = modal.querySelector('.quick-view-add-cart');
      addCartBtn.onclick = () => {
        this.addToCart(product);
      };
      
      // Wishlist button
      const wishlistBtn = modal.querySelector('.wishlist-btn-quick');
      wishlistBtn.dataset.productId = product.id;
      wishlistBtn.classList.toggle('active', WishlistManager.isInWishlist(product.id));
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    
    closeModal() {
      const modal = document.getElementById('quickViewModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    },
    
    getRatingHTML(rating, reviews) {
      const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
      return `<span class="stars">${stars}</span> <span class="review-count">(${reviews} reviews)</span>`;
    },
    
    getBenefitsHTML(benefits) {
      return '<ul class="benefits-list">' + 
        benefits.map(b => `<li>✓ ${b}</li>`).join('') + 
        '</ul>';
    },
    
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem('nv_cart') || '[]');
      const existing = cart.find(item => item.id === product.id);
      
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: `../assets/products/${product.id}.jpg`
        });
      }
      
      localStorage.setItem('nv_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show success message
      const btn = document.querySelector('.quick-view-add-cart');
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = '#2d5016';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1500);
    }
  };

  // ============================================
  // FEATURE 4: SMART RECOMMENDATIONS
  // ============================================
  
  const SmartRecommendations = {
    // Frequently bought together combinations
    combinations: {
      1: [3, 4],    // Whey protein with Multivitamin & Fish Oil
      2: [3, 5],    // Vegan protein with Multivitamin & Ashwagandha
      7: [8, 51],   // Kids nutrition combos
      13: [14, 23], // Weight management combos
      15: [37, 34], // Health mix combos
      25: [62, 39], // Amla products
      38: [39, 40], // Immunity products
      59: [60, 61], // Makhana varieties
    },
    
    getCrossSellProducts(productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return [];
      
      // Get products from same category
      const sameCategory = PRODUCTS
        .filter(p => p.id !== productId && p.catKey === product.catKey)
        .slice(0, 4);
      
      return sameCategory;
    },
    
    getFrequentlyBoughtTogether(productId) {
      const recommendedIds = this.combinations[productId] || [];
      return PRODUCTS.filter(p => recommendedIds.includes(p.id));
    },
    
    renderRecommendations(containerId, products, title) {
      const container = document.getElementById(containerId);
      if (!container || products.length === 0) return;
      
      const html = `
        <div class="recommendations-section">
          <h3 class="recommendations-title">${title}</h3>
          <div class="recommendations-grid">
            ${products.map(p => this.getProductCardHTML(p)).join('')}
          </div>
        </div>
      `;
      
      container.innerHTML = html;
    },
    
    getProductCardHTML(product) {
      const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
      return `
        <div class="recommendation-card" data-product-id="${product.id}">
          <div class="recommendation-image">
            <img src="../assets/products/${product.id}.jpg" alt="${product.name}" onerror="this.src='../assets/products/placeholder.jpg'">
            <span class="recommendation-badge">${product.badge}</span>
          </div>
          <div class="recommendation-info">
            <h4>${product.name}</h4>
            <div class="recommendation-price">
              <span class="current">₹${product.price}</span>
              <span class="mrp">₹${product.mrp}</span>
              <span class="discount">${discount}% OFF</span>
            </div>
            <button class="recommendation-add-btn btn-primary" onclick="SmartRecommendations.quickAdd(${product.id})">
              Quick Add
            </button>
          </div>
        </div>
      `;
    },
    
    quickAdd(productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      
      const cart = JSON.parse(localStorage.getItem('nv_cart') || '[]');
      const existing = cart.find(item => item.id === product.id);
      
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: `../assets/products/${product.id}.jpg`
        });
      }
      
      localStorage.setItem('nv_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Visual feedback
      WishlistManager.showNotification('Added to cart! 🛒');
    }
  };

  // Make SmartRecommendations globally accessible
  window.SmartRecommendations = SmartRecommendations;

  // ============================================
  // FEATURE 5: LIVE SEARCH WITH AUTOCOMPLETE
  // ============================================
  
  const LiveSearch = {
    init() {
      this.createSearchBox();
      this.setupEventListeners();
    },
    
    createSearchBox() {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'live-search-container';
      searchContainer.innerHTML = `
        <div class="live-search-wrapper">
          <input 
            type="text" 
            class="live-search-input" 
            placeholder="🔍 Search products, categories..." 
            id="liveSearchInput"
          >
          <button class="live-search-clear" style="display: none;">×</button>
        </div>
        <div class="live-search-results" id="liveSearchResults"></div>
      `;
      
      // Insert after header or at top of main content
      const header = document.querySelector('header') || document.querySelector('.hero');
      if (header && header.nextSibling) {
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
      } else {
        document.body.insertBefore(searchContainer, document.body.firstChild);
      }
    },
    
    setupEventListeners() {
      const input = document.getElementById('liveSearchInput');
      const clearBtn = document.querySelector('.live-search-clear');
      const results = document.getElementById('liveSearchResults');
      
      if (!input) return;
      
      let debounceTimer;
      
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        // Show/hide clear button
        clearBtn.style.display = query ? 'block' : 'none';
        
        clearTimeout(debounceTimer);
        
        if (query.length < 2) {
          results.innerHTML = '';
          results.classList.remove('active');
          return;
        }
        
        debounceTimer = setTimeout(() => {
          this.search(query);
        }, 300);
      });
      
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        results.innerHTML = '';
        results.classList.remove('active');
        input.focus();
      });
      
      // Close results when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.live-search-container')) {
          results.classList.remove('active');
        }
      });
      
      input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2) {
          results.classList.add('active');
        }
      });
    },
    
    search(query) {
      const results = document.getElementById('liveSearchResults');
      const lowerQuery = query.toLowerCase();
      
      // Search in products
      const matchedProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.desc.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      ).slice(0, 8);
      
      if (matchedProducts.length === 0) {
        results.innerHTML = '<div class="search-no-results">No products found</div>';
        results.classList.add('active');
        return;
      }
      
      results.innerHTML = matchedProducts.map(p => this.getSearchResultHTML(p, lowerQuery)).join('');
      results.classList.add('active');
    },
    
    getSearchResultHTML(product, query) {
      const highlightedName = this.highlightText(product.name, query);
      return `
        <a href="product.html?id=${product.id}" class="search-result-item">
          <img src="../assets/products/${product.id}.jpg" alt="${product.name}" onerror="this.src='../assets/products/placeholder.jpg'">
          <div class="search-result-info">
            <div class="search-result-name">${highlightedName}</div>
            <div class="search-result-category">${product.category}</div>
            <div class="search-result-price">₹${product.price}</div>
          </div>
        </a>
      `;
    },
    
    highlightText(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }
  };

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  
  function initAdvancedFeatures() {
    // Wait for DOM and PRODUCTS to be ready
    if (typeof PRODUCTS === 'undefined') {
      console.log('Waiting for PRODUCTS data...');
      setTimeout(initAdvancedFeatures, 100);
      return;
    }
    
    console.log('Initializing Advanced Features...');
    
    WishlistManager.initWishlistButtons();
    WishlistManager.updateWishlistCount();
    
    StickyCartBar.init();
    QuickView.init();
    LiveSearch.init();
    
    console.log('✓ All Advanced Features Loaded!');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
  } else {
    initAdvancedFeatures();
  }

})();
