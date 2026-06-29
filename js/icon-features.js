/**
 * NutriVeda Icon Features
 * Implements functionality for product action icons:
 * - Product Catalog/Details View
 * - Product Image Upload/Camera
 * - Social Media Sharing
 * - Customer Support Chat
 */

// ===================================================================
// 1. PRODUCT CATALOG/DETAILS VIEWER
// ===================================================================

// Fallback product data if main PRODUCTS array is not loaded
const CATALOG_PRODUCTS = [
  { id:1, name:'VedaProtein Elite Whey', category:'Protein Powders', catKey:'protein', emoji:'💪', badge:'Best Seller', price:1299, mrp:1599, rating:5, reviews:128, desc:'24g protein per scoop. Mixes instantly. Chocolate & Vanilla flavors. Ideal for muscle recovery.', benefits:['24g Protein per serving','Zero added sugar','Digestive enzyme blend','Chocolate & Vanilla flavors','30 servings per pack'], tags:['Whey Protein','Muscle Gain','Post-Workout'] },
  { id:2, name:'PlantPower Vegan Protein', category:'Protein Powders', catKey:'protein', emoji:'🌱', badge:'New', price:1099, mrp:1299, rating:4.8, reviews:64, desc:'100% plant-based pea & brown rice blend. 20g protein. Vegan & lactose-free.', benefits:['20g Plant Protein','Pea + Brown Rice Blend','Vegan & Lactose-Free','No Artificial Colours','Unflavored & Vanilla'], tags:['Plant Protein','Vegan','Lactose-Free'] },
  { id:7, name:'GrowStrong Kids NutriMix', category:'Kids Nutrition', catKey:'kids', emoji:'💛', badge:'Kids Fav', price:649, mrp:799, rating:5, reviews:176, desc:'For children 2–12 years. DHA, Calcium, Iron & essential vitamins for growth and energy.', benefits:['DHA for brain development','Calcium + Vitamin D','Iron for energy','Prebiotic fibre','Chocolate & Mango flavor'], tags:['Kids 2-12','Brain Development','Growth'] },
  { id:13, name:'30 Days Slimming Kit', category:'Weight Management', catKey:'weight', emoji:'🌿', badge:'Best Seller', price:1399, mrp:1475, rating:4.89, reviews:156, desc:'100% Natural Slimming Kit for Healthy Weight Loss. Complete 30-day program with nutritional malts and supplements.', benefits:['100% Natural ingredients','30-day complete program','Supports healthy weight loss','No harmful chemicals','Includes diet plan guide'], tags:['Weight Loss','Slimming','Natural','30-Day Kit'] },
  { id:15, name:'Sprouted Sathu Maavu Health Mix', category:'Health Mix', catKey:'health,immunity,bone,kids', emoji:'🌾', badge:'The Desi Protein', price:489, mrp:549, rating:4.85, reviews:203, desc:'Traditional South Indian health mix made from sprouted grains. Rich in protein, fiber, and essential nutrients.', benefits:['Made from sprouted grains','High protein content','Rich in fiber','Traditional recipe','Easy to prepare'], tags:['Health Mix','Protein','Sprouted Grains','Traditional'] },
  { id:18, name:'Nannari Sharbath Syrup', category:'Summer Essentials', catKey:'summer', emoji:'🥤', badge:'Your Body Coolant', price:329, mrp:399, rating:4.9, reviews:178, desc:'Traditional South Indian cooling drink. Made from Nannari roots, perfect for hot summer days. Natural body coolant.', benefits:['Natural body coolant','Made from Nannari roots','Refreshing taste','No artificial colors','Traditional recipe'], tags:['Summer Drink','Cooling','Natural','Traditional'] },
  { id:21, name:'Dryfruit Laddu Dates Punch', category:'Healthy Snacks', catKey:'snacks', emoji:'🍬', badge:'Your Super Snack', price:619, mrp:699, rating:4.81, reviews:134, desc:'Healthy energy balls made from dates, dry fruits, and nuts. Pure cow ghee and natural sweetness. Perfect snack for all ages.', benefits:['Made with dates & dry fruits','Pure cow ghee','No refined sugar','Energy booster','Rich in iron & calcium'], tags:['Healthy Snack','Energy Balls','Dates','Dry Fruits'] },
  { id:25, name:'Amla Candy', category:'Healthy Snacks', catKey:'snacks,immunity,amla', emoji:'🍭', badge:'All Time Favorite', price:259, mrp:299, rating:4.78, reviews:189, desc:'Natural dried amla candy packed with Vitamin C. Traditional Indian superfood candy for immunity and digestion.', benefits:['Rich in Vitamin C','Boosts immunity','Aids digestion','Natural ingredients','Tangy & sweet taste'], tags:['Amla','Vitamin C','Immunity','Candy'] },
  { id:38, name:'Immunity Booster Kit', category:'Immunity', catKey:'immunity', emoji:'🛡️', badge:'Complete Protection', price:1111, mrp:1476, rating:4.9, reviews:198, desc:'Complete immunity strengthening kit with herbal teas, health mixes, and natural supplements. Build strong immunity naturally.', benefits:['Complete immunity kit','Multiple products','Herbal formulations','Natural protection','Value combo'], tags:['Immunity','Kit','Herbal','Protection'] },
  { id:39, name:'Moringa Powder', category:'Immunity', catKey:'immunity', emoji:'🌿', badge:'Pure Greens', price:179, mrp:219, rating:5.0, reviews:145, desc:'Pure moringa powder packed with vitamins and minerals. Everyday vitality booster for complete nutrition and immunity.', benefits:['Rich in vitamins & minerals','Boosts immunity','Pure moringa leaves','Natural energy','Daily wellness'], tags:['Moringa','Superfood','Immunity','Vitamins'] },
  { id:45, name:'ABC Malt', category:'Kids Nutrition', catKey:'kids,malts', emoji:'🥕', badge:'All-in-One', price:349, mrp:399, rating:4.86, reviews:189, desc:'All-in-One malt with Amla, Beetroot, and Carrot goodness. Complete nutrition for kids with natural ingredients.', benefits:['Amla, Beetroot, Carrot','Rich in vitamins','Boosts immunity','Natural ingredients','Kids love it'], tags:['ABC','Malt','Kids','Immunity'] },
  { id:59, name:'Moringa Sesame Makhana', category:'Healthy Snacks', catKey:'snacks,makhana', emoji:'🌿', badge:'Unique Flavour', price:199, mrp:249, rating:4.81, reviews:123, desc:'World\'s unique flavoured makhana with moringa and sesame. Crunchy, nutritious, and packed with superfood goodness.', benefits:['Moringa superfood','Sesame calcium','Crunchy texture','Low calorie snack','Protein rich'], tags:['Makhana','Moringa','Sesame','Healthy Snack'] },
  { id:5, name:'AshwaBalance Herbal Blend', category:'Herbal Blends', catKey:'herbal', emoji:'🌿', badge:'Ayurvedic', price:549, mrp:699, rating:4.8, reviews:95, desc:'Ashwagandha + Brahmi + Shatavari. Stress relief, hormonal balance & mental clarity.', benefits:['KSM-66 Ashwagandha','Brahmi for focus','Shatavari for balance','Adaptogenic formula','60 veg capsules'], tags:['Stress Relief','Adaptogen','Hormonal Balance'] },
  { id:16, name:'Veg Goat Leg Soup Mix', category:'Bone & Joint Health', catKey:'bone', emoji:'🦴', badge:'Bones & Joints Partner', price:299, mrp:349, rating:4.93, reviews:142, desc:'Mudavattukal Kilangu - Traditional vegetarian soup mix for bone and joint health. Natural calcium source.', benefits:['Supports bone health','Joint strength formula','100% vegetarian','Traditional Ayurvedic recipe','Natural calcium source'], tags:['Bone Health','Joint Support','Vegetarian','Ayurvedic'] },
  { id:26, name:'Gond Laddu', category:'Healthy Snacks', catKey:'snacks', emoji:'🥥', badge:'Postpartum Snack', price:599, mrp:699, rating:4.77, reviews:145, desc:'Traditional immunity-boosting sweets made with edible gum, pure cow ghee, almonds, and cashews. Perfect for new mothers.', benefits:['Made with pure cow ghee','Boosts immunity','Postpartum nutrition','Rich in protein','Traditional recipe'], tags:['Gond','Postpartum','Energy','Traditional'] },
  { id:49, name:'Sprouted Ragi Choco Malt', category:'Kids Nutrition', catKey:'kids', emoji:'🍫', badge:'Chocolate Twist', price:249, mrp:299, rating:4.8, reviews:145, desc:'Delicious chocolate-flavored malt with sprouted ragi. Perfect combination of taste and nutrition for kids.', benefits:['Chocolate flavor kids love','Sprouted ragi nutrition','Calcium rich','Energy booster','Tasty & healthy'], tags:['Ragi','Chocolate','Kids','Malt'] },
];

function showProductCatalog(productId = null) {
  const modal = document.createElement('div');
  modal.className = 'icon-modal catalog-modal';
  modal.innerHTML = `
    <div class="icon-modal-content catalog-content">
      <div class="icon-modal-header">
        <div class="catalog-header-content">
          <h2>🛍️ NutriVeda Product Catalog</h2>
          <div class="catalog-view-switcher">
            <button class="view-btn active" onclick="switchCatalogView('grid')" title="Grid View">
              <span>⊞</span>
            </button>
            <button class="view-btn" onclick="switchCatalogView('list')" title="List View">
              <span>☰</span>
            </button>
            <button class="view-btn" onclick="switchCatalogView('magazine')" title="Magazine View">
              <span>📖</span>
            </button>
          </div>
        </div>
        <button class="icon-modal-close" onclick="closeIconModal()">&times;</button>
      </div>
      <div class="catalog-filters">
        <button class="filter-btn active" onclick="filterCatalog('all')">All Products</button>
        <button class="filter-btn" onclick="filterCatalog('protein')">💪 Protein</button>
        <button class="filter-btn" onclick="filterCatalog('kids')">👶 Kids</button>
        <button class="filter-btn" onclick="filterCatalog('weight')">⚖️ Weight</button>
        <button class="filter-btn" onclick="filterCatalog('immunity')">🛡️ Immunity</button>
        <button class="filter-btn" onclick="filterCatalog('herbal')">🌿 Herbal</button>
        <button class="filter-btn" onclick="filterCatalog('snacks')">🥜 Snacks</button>
        <button class="filter-btn" onclick="filterCatalog('health')">🌾 Health Mix</button>
      </div>
      <div class="catalog-search">
        <input type="text" id="catalogSearch" placeholder="🔍 Search products..." onkeyup="searchCatalog()">
      </div>
      <div class="icon-modal-body">
        <div class="catalog-stats" id="catalogStats">
          <span>Loading products...</span>
        </div>
        <div class="catalog-grid" id="catalogGrid" data-view="grid">
          <!-- Products will be loaded here -->
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Load products
  loadCatalogProducts();
  
  // Show modal with animation
  setTimeout(() => modal.classList.add('active'), 10);
}

function loadCatalogProducts(category = 'all') {
  const grid = document.getElementById('catalogGrid');
  const stats = document.getElementById('catalogStats');
  if (!grid) return;
  
  // Try to get products from main PRODUCTS array, fallback to CATALOG_PRODUCTS
  let products = window.PRODUCTS || CATALOG_PRODUCTS;
  
  // If still no products, show error message
  if (!products || products.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty">
        <div class="empty-icon">📦</div>
        <h3>No Products Found</h3>
        <p>Unable to load product catalog. Please refresh the page.</p>
      </div>
    `;
    stats.innerHTML = `<span>No products available</span>`;
    return;
  }
  
  // Filter by category if specified
  if (category !== 'all') {
    products = products.filter(p => {
      const catKey = (p.catKey || '').toLowerCase();
      return catKey.includes(category);
    });
  }
  
  // Update stats
  stats.innerHTML = `
    <span>Showing <strong>${products.length}</strong> product${products.length !== 1 ? 's' : ''}</span>
  `;
  
  // Get current view mode
  const viewMode = grid.dataset.view || 'grid';
  
  if (viewMode === 'list') {
    // List View - Compact horizontal layout
    grid.innerHTML = products.map(product => `
      <div class="catalog-list-item" data-category="${product.catKey || ''}" data-name="${product.name.toLowerCase()}" onclick="viewProductDetails('${product.id}')">
        <div class="list-item-emoji">${product.emoji || '🏷️'}</div>
        <div class="list-item-content">
          <div class="list-item-header">
            <h3>${product.name}</h3>
            ${product.badge ? `<span class="list-badge">${product.badge}</span>` : ''}
          </div>
          <p class="list-category">${product.category}</p>
          <p class="list-desc">${product.desc ? product.desc.substring(0, 120) + '...' : ''}</p>
          <div class="list-item-footer">
            <div class="list-rating">
              ${'⭐'.repeat(Math.floor(product.rating || 4.5))} 
              <span>${product.rating || 4.5} (${product.reviews || 0})</span>
            </div>
            <div class="list-price">
              <span class="price-current">₹${product.price}</span>
              ${product.mrp ? `<span class="price-mrp">₹${product.mrp}</span>` : ''}
            </div>
            <div class="list-actions">
              <button class="btn-list-cart" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
                🛒 Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } else if (viewMode === 'magazine') {
    // Magazine View - Beautiful featured layout
    grid.innerHTML = products.map((product, index) => `
      <div class="catalog-magazine-item ${index === 0 ? 'featured' : ''}" data-category="${product.catKey || ''}" data-name="${product.name.toLowerCase()}" onclick="viewProductDetails('${product.id}')">
        <div class="magazine-content">
          <div class="magazine-badge-area">
            ${product.badge ? `<span class="magazine-badge">${product.badge}</span>` : ''}
            <span class="magazine-emoji">${product.emoji || '🏷️'}</span>
          </div>
          <div class="magazine-text">
            <p class="magazine-category">${product.category}</p>
            <h3 class="magazine-title">${product.name}</h3>
            <p class="magazine-desc">${product.desc || ''}</p>
            <div class="magazine-features">
              ${(product.benefits || []).slice(0, 3).map(b => `<span class="feature-pill">✓ ${b}</span>`).join('')}
            </div>
            <div class="magazine-bottom">
              <div class="magazine-rating">
                ${'⭐'.repeat(Math.floor(product.rating || 4.5))} 
                <span>${product.rating || 4.5}</span>
              </div>
              <div class="magazine-price">
                <span class="price-label">Starting at</span>
                <span class="price-value">₹${product.price}</span>
                ${product.mrp ? `<span class="save-tag">Save ₹${product.mrp - product.price}</span>` : ''}
              </div>
              <button class="btn-magazine-shop" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
                Shop Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } else {
    // Grid View - Original card layout (default)
    grid.innerHTML = products.map(product => `
      <div class="catalog-card" data-category="${product.catKey || ''}" data-name="${product.name.toLowerCase()}" onclick="viewProductDetails('${product.id}')">
        <div class="catalog-card-badge">
          ${product.badge ? `<span class="badge-tag">${product.badge}</span>` : ''}
          ${product.emoji ? `<span class="badge-emoji">${product.emoji}</span>` : ''}
        </div>
        <div class="catalog-card-body">
          <h3 class="catalog-card-title">${product.name}</h3>
          <p class="catalog-card-category">${product.category}</p>
          <p class="catalog-card-desc">${product.desc ? product.desc.substring(0, 80) + '...' : 'Premium quality product'}</p>
          <div class="catalog-card-rating">
            ${'⭐'.repeat(Math.floor(product.rating || 4.5))} 
            <span class="rating-text">${product.rating || 4.5} (${product.reviews || 0})</span>
          </div>
          <div class="catalog-card-price">
            <span class="price-current">₹${product.price}</span>
            ${product.mrp ? `<span class="price-mrp">₹${product.mrp}</span>` : ''}
            ${product.mrp ? `<span class="price-discount">${Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF</span>` : ''}
          </div>
        </div>
        <div class="catalog-card-footer">
          <button class="btn-catalog-view" onclick="event.stopPropagation(); viewProductDetails('${product.id}')">
            View Details
          </button>
          <button class="btn-catalog-cart" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    `).join('');
  }
}

function switchCatalogView(viewMode) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  
  // Update grid data attribute
  grid.dataset.view = viewMode;
  
  // Update active button
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  event.target.closest('.view-btn').classList.add('active');
  
  // Update grid class based on view
  grid.className = `catalog-${viewMode}`;
  
  // Reload products with new view
  loadCatalogProducts();
}

function filterCatalog(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Reload products with filter
  loadCatalogProducts(category);
}

function searchCatalog() {
  const searchInput = document.getElementById('catalogSearch');
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.catalog-card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const productName = card.dataset.name;
    if (productName.includes(searchTerm)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update stats
  const stats = document.getElementById('catalogStats');
  if (stats) {
    stats.innerHTML = `<span>Showing <strong>${visibleCount}</strong> product${visibleCount !== 1 ? 's' : ''}</span>`;
  }
}

function quickAddToCart(productId) {
  if (typeof addToCart === 'function') {
    addToCart(productId);
    showToast('🛒 Product added to cart!', 'success');
  } else {
    showToast('✅ Product selected!', 'success');
  }
}

function viewProductDetails(productId) {
  const product = (window.PRODUCTS || []).find(p => p.id === productId);
  if (!product) return;
  
  const detailModal = document.createElement('div');
  detailModal.className = 'icon-modal detail-modal';
  detailModal.innerHTML = `
    <div class="icon-modal-content detail-content">
      <div class="icon-modal-header">
        <h2>${product.name}</h2>
        <button class="icon-modal-close" onclick="closeIconModal()">&times;</button>
      </div>
      <div class="icon-modal-body">
        <div class="detail-grid">
          <div class="detail-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/placeholder.jpg'">
          </div>
          <div class="detail-info">
            <p class="detail-category">${product.category}</p>
            <h3 class="detail-price">₹${product.price}</h3>
            <div class="detail-benefits">
              <h4>Benefits:</h4>
              <ul>
                ${(product.benefits || []).map(b => `<li>${b}</li>`).join('')}
              </ul>
            </div>
            <div class="detail-actions">
              <button class="btn-primary" onclick="addToCartFromDetail('${productId}')">
                🛒 Add to Cart
              </button>
              <button class="btn-secondary" onclick="addToWishlistFromDetail('${productId}')">
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Close catalog modal and show detail
  closeIconModal();
  document.body.appendChild(detailModal);
  setTimeout(() => detailModal.classList.add('active'), 10);
}

function addToCartFromDetail(productId) {
  if (typeof addToCart === 'function') {
    addToCart(productId);
  }
  closeIconModal();
}

function addToWishlistFromDetail(productId) {
  if (typeof toggleWishlist === 'function') {
    toggleWishlist(productId);
  }
}

// ===================================================================
// 2. PRODUCT IMAGE UPLOAD/CAMERA FEATURE
// ===================================================================

function openImageUpload(context = 'product') {
  const modal = document.createElement('div');
  modal.className = 'icon-modal image-upload-modal';
  modal.innerHTML = `
    <div class="icon-modal-content">
      <div class="icon-modal-header">
        <h2>📷 Upload Product Image</h2>
        <button class="icon-modal-close" onclick="closeIconModal()">&times;</button>
      </div>
      <div class="icon-modal-body">
        <div class="upload-area" id="uploadArea">
          <div class="upload-icon">📸</div>
          <h3>Share Your Product Experience</h3>
          <p>Upload a photo of your NutriVeda product</p>
          <input type="file" id="imageInput" accept="image/*" capture="camera" style="display: none;">
          <div class="upload-buttons">
            <button class="btn-upload" onclick="document.getElementById('imageInput').click()">
              📁 Choose from Gallery
            </button>
            <button class="btn-camera" onclick="openCamera()">
              📷 Take Photo
            </button>
          </div>
        </div>
        <div class="upload-preview" id="uploadPreview" style="display: none;">
          <img id="previewImage" src="" alt="Preview">
          <div class="preview-actions">
            <button class="btn-primary" onclick="submitImage()">Submit Image</button>
            <button class="btn-secondary" onclick="resetUpload()">Choose Another</button>
          </div>
        </div>
        <div class="recent-uploads" id="recentUploads">
          <h4>Recent Community Photos</h4>
          <div class="uploads-grid" id="uploadsGrid">
            <!-- Recent uploads will appear here -->
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Setup file input handler
  const fileInput = modal.querySelector('#imageInput');
  fileInput.addEventListener('change', handleImageSelect);
  
  // Load recent uploads
  loadRecentUploads();
  
  setTimeout(() => modal.classList.add('active'), 10);
}

function handleImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('previewImage').src = e.target.result;
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('uploadPreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function openCamera() {
  // Trigger file input with camera capture
  const input = document.getElementById('imageInput');
  input.setAttribute('capture', 'camera');
  input.click();
}

function resetUpload() {
  document.getElementById('uploadArea').style.display = 'block';
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('imageInput').value = '';
}

function submitImage() {
  // In production, this would upload to server
  showToast('📸 Thank you! Your image has been submitted for review.', 'success');
  
  // Save to recent uploads (localStorage for demo)
  const imageData = document.getElementById('previewImage').src;
  saveRecentUpload(imageData);
  
  closeIconModal();
}

function saveRecentUpload(imageData) {
  let uploads = JSON.parse(localStorage.getItem('nv_user_uploads') || '[]');
  uploads.unshift({
    image: imageData,
    date: new Date().toISOString()
  });
  // Keep only last 6 uploads
  uploads = uploads.slice(0, 6);
  localStorage.setItem('nv_user_uploads', JSON.stringify(uploads));
}

function loadRecentUploads() {
  const uploads = JSON.parse(localStorage.getItem('nv_user_uploads') || '[]');
  const grid = document.getElementById('uploadsGrid');
  
  if (uploads.length === 0) {
    grid.innerHTML = '<p class="no-uploads">No recent uploads yet. Be the first to share!</p>';
    return;
  }
  
  grid.innerHTML = uploads.map((upload, index) => `
    <div class="upload-thumb">
      <img src="${upload.image}" alt="Upload ${index + 1}">
    </div>
  `).join('');
}

// ===================================================================
// 3. SOCIAL MEDIA SHARING
// ===================================================================

function openSocialShare(productId = null) {
  let shareUrl = window.location.href;
  let shareTitle = 'Check out NutriVeda Products!';
  let shareText = 'Discover premium quality natural nutrition products at NutriVeda';
  
  if (productId) {
    const product = (window.PRODUCTS || []).find(p => p.id === productId);
    if (product) {
      shareTitle = product.name;
      shareText = `Check out ${product.name} - ${product.category} at NutriVeda for only ₹${product.price}`;
    }
  }
  
  const modal = document.createElement('div');
  modal.className = 'icon-modal social-share-modal';
  modal.innerHTML = `
    <div class="icon-modal-content">
      <div class="icon-modal-header">
        <h2>🐦 Share on Social Media</h2>
        <button class="icon-modal-close" onclick="closeIconModal()">&times;</button>
      </div>
      <div class="icon-modal-body">
        <div class="share-preview">
          <h3>${shareTitle}</h3>
          <p>${shareText}</p>
          <p class="share-url">${shareUrl}</p>
        </div>
        <div class="share-buttons-grid">
          <button class="share-btn facebook" onclick="shareOnFacebook('${shareUrl}', '${encodeURIComponent(shareTitle)}')">
            <svg class="share-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>
          <button class="share-btn twitter" onclick="shareOnTwitter('${shareUrl}', '${encodeURIComponent(shareText)}')">
            <svg class="share-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span>Twitter</span>
          </button>
          <button class="share-btn whatsapp" onclick="shareOnWhatsApp('${shareUrl}', '${encodeURIComponent(shareText)}')">
            <svg class="share-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </button>
          <button class="share-btn instagram" onclick="shareOnInstagram()">
            <svg class="share-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
            <span>Instagram</span>
          </button>
          <button class="share-btn copy" onclick="copyShareLink('${shareUrl}')">
            <svg class="share-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span>Copy Link</span>
          </button>
        </div>
        <div class="native-share">
          <button class="btn-native-share" onclick="nativeShare('${shareUrl}', '${shareTitle}', '${shareText}')">
            📤 More Sharing Options
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
}

// Social sharing functions
function shareOnFacebook(url, title) {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnTwitter(url, text) {
  const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp(url, text) {
  const shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  window.open(shareUrl, '_blank');
}

function shareOnInstagram() {
  showToast('📷 Please open Instagram app and share manually. Link copied!', 'info');
  copyToClipboard(window.location.href);
}

function shareOnLinkedIn(url, title) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnTelegram(url, text) {
  const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
  window.open(shareUrl, '_blank');
}

function shareViaEmail(url, title, text) {
  const mailtoUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
  window.location.href = mailtoUrl;
}

function copyShareLink(url) {
  copyToClipboard(url);
  showToast('🔗 Link copied to clipboard!', 'success');
}

function nativeShare(url, title, text) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(err => console.log('Share cancelled'));
  } else {
    copyShareLink(url);
  }
}

// ===================================================================
// 4. CUSTOMER SUPPORT CHAT
// ===================================================================

function openSupportChat() {
  const modal = document.createElement('div');
  modal.className = 'icon-modal chat-modal';
  modal.innerHTML = `
    <div class="icon-modal-content chat-content">
      <div class="icon-modal-header chat-header">
        <div class="chat-header-info">
          <h2>💬 Customer Support</h2>
          <span class="chat-status">● Online</span>
        </div>
        <button class="icon-modal-close" onclick="closeIconModal()">&times;</button>
      </div>
      <div class="icon-modal-body chat-body">
        <div class="chat-messages" id="chatMessages">
          <div class="chat-message bot">
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">
              <p>Hello! Welcome to NutriVeda Customer Support. How can I help you today?</p>
              <span class="chat-time">${getCurrentTime()}</span>
            </div>
          </div>
        </div>
        <div class="chat-quick-replies" id="quickReplies">
          <button class="quick-reply" onclick="sendQuickReply('Product Information')">
            📦 Product Info
          </button>
          <button class="quick-reply" onclick="sendQuickReply('Order Status')">
            🚚 Order Status
          </button>
          <button class="quick-reply" onclick="sendQuickReply('Returns & Refunds')">
            🔄 Returns
          </button>
          <button class="quick-reply" onclick="sendQuickReply('Talk to Agent')">
            👤 Talk to Agent
          </button>
        </div>
        <div class="chat-input-container">
          <input type="text" id="chatInput" placeholder="Type your message..." onkeypress="if(event.key==='Enter') sendChatMessage()">
          <button class="chat-send-btn" onclick="sendChatMessage()">
            📤
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
  
  // Focus on input
  setTimeout(() => document.getElementById('chatInput').focus(), 300);
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addChatMessage(message, 'user');
  input.value = '';
  
  // Simulate bot response
  setTimeout(() => {
    const response = getBotResponse(message);
    addChatMessage(response, 'bot');
  }, 1000);
}

function sendQuickReply(topic) {
  addChatMessage(topic, 'user');
  
  setTimeout(() => {
    let response = '';
    switch(topic) {
      case 'Product Information':
        response = "I'd be happy to help you with product information! Which product are you interested in learning about?";
        break;
      case 'Order Status':
        response = "To check your order status, please provide your order ID or phone number used during purchase.";
        break;
      case 'Returns & Refunds':
        response = "Our return policy allows returns within 7 days of delivery. Would you like to initiate a return?";
        break;
      case 'Talk to Agent':
        response = "Connecting you to a customer support agent. Please hold...";
        setTimeout(() => {
          addChatMessage("Hi! I'm Priya from NutriVeda support. How can I assist you today?", 'agent');
        }, 2000);
        return;
    }
    addChatMessage(response, 'bot');
  }, 1000);
}

function addChatMessage(message, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  
  let avatar = sender === 'user' ? '👤' : sender === 'agent' ? '👩‍💼' : '🤖';
  
  messageDiv.innerHTML = `
    <div class="chat-avatar">${avatar}</div>
    <div class="chat-bubble">
      <p>${message}</p>
      <span class="chat-time">${getCurrentTime()}</span>
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to NutriVeda Customer Support. I'm here to help you with product information, nutrition advice, orders, and more. How can I assist you today?";
  }
  
  // Product Queries - Protein
  if (msg.includes('protein') || msg.includes('whey')) {
    return "We offer premium quality protein products including Whey Protein, Plant-based Protein, and Casein Protein. Our VedaProtein Elite is very popular! Each serving provides 24g of protein. Would you like to know about specific protein products or their benefits?";
  }
  
  // Product Queries - Kids
  if (msg.includes('kid') || msg.includes('child') || msg.includes('baby')) {
    return "Our Kids Nutrition range is specially formulated for growing children! We have GrowStrong NutriMix with essential vitamins, minerals, and natural ingredients. It's tasty, easy to digest, and loved by kids. Safe for ages 2-12 years. Would you like more details?";
  }
  
  // Product Queries - Weight Loss
  if (msg.includes('weight') || msg.includes('slim') || msg.includes('fat') || msg.includes('lose')) {
    return "Our Weight Management products are designed to support healthy weight loss naturally. We recommend VedaSlim Tea blend, High-protein low-calorie snacks, and our Metabolism Booster supplements. Combined with exercise and balanced diet, they work great! Need a personalized recommendation?";
  }
  
  // Product Queries - Immunity
  if (msg.includes('immun') || msg.includes('defense') || msg.includes('sick')) {
    return "Boost your immunity with our natural immunity products! AyurDefense Immunity Blend contains Giloy, Tulsi, Ashwagandha, and Amla. Perfect for daily immunity support. We also have Chyawanprash and Giloy capsules. All are 100% natural and FSSAI certified.";
  }
  
  // Product Queries - Herbal/Ayurvedic
  if (msg.includes('herb') || msg.includes('ayur') || msg.includes('ashwa') || msg.includes('tulsi')) {
    return "Our Ayurvedic range includes AshwaBalance (Ashwagandha blend for stress relief), Tulsi Tea (immunity), Turmeric capsules (anti-inflammatory), and more. All sourced from organic farms with authentic Ayurvedic formulations. Which herbal product interests you?";
  }
  
  // Product Queries - Healthy Snacks
  if (msg.includes('snack') || msg.includes('makhana')) {
    return "Our Healthy Snacks range includes flavored Makhana (Fox Nuts), protein bars, dry fruits mix, and roasted seeds. Perfect for guilt-free snacking! High in protein, low in calories, and absolutely delicious. Want to know about specific flavors?";
  }
  
  // Benefits & Uses
  if (msg.includes('benefit') || msg.includes('good for') || msg.includes('help with')) {
    return "Our products offer various benefits: Protein for muscle building, Vitamins for overall health, Herbal blends for stress relief & immunity, Kids products for healthy growth, and Weight management for healthy metabolism. What specific health goal are you working towards?";
  }
  
  // Ingredients & Quality
  if (msg.includes('ingredient') || msg.includes('natural') || msg.includes('organic')) {
    return "All NutriVeda products use 100% natural ingredients sourced from certified organic farms. We're FSSAI certified, GMP compliant, and third-party lab tested for purity and potency. No artificial preservatives, colors, or harmful additives. Quality is our top priority!";
  }
  
  // Safety & Side Effects
  if (msg.includes('safe') || msg.includes('side effect') || msg.includes('allerg')) {
    return "Our products are safe and made from natural ingredients. However, if you have specific allergies, medical conditions, or are pregnant/nursing, please consult your doctor before use. Check product labels for allergen information. Need details about a specific product?";
  }
  
  // Dosage & Usage
  if (msg.includes('how to use') || msg.includes('dosage') || msg.includes('how much') || msg.includes('serving')) {
    return "Dosage varies by product. Generally: Protein powders - 1 scoop daily, Capsules - 1-2 per day, Herbal teas - 2 cups daily, Kids products - as per age recommendations on pack. Detailed instructions are on each product label. Which product do you need usage info for?";
  }
  
  // Price Queries
  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
    return "Our products range from ₹199 to ₹899. We offer great value for premium quality! Protein powders start at ₹699, Herbal supplements from ₹399, Kids nutrition from ₹549, and Healthy snacks from ₹199. Would you like to know the price of a specific product?";
  }
  
  // Delivery & Shipping
  if (msg.includes('deliver') || msg.includes('shipping') || msg.includes('ship')) {
    return "We offer FREE delivery on orders above ₹500! Standard delivery takes 3-5 business days across India. We're based in Hyderabad, so Telangana & AP orders arrive even faster (2-3 days). We ship via reliable courier partners with tracking.";
  }
  
  // Order Tracking
  if (msg.includes('track') || msg.includes('order status') || msg.includes('where is my order')) {
    return "To track your order, please provide your Order ID or the phone number used during purchase. You should have received a tracking link via SMS and email. If not, I can help you check the status right away!";
  }
  
  // Payment Methods
  if (msg.includes('payment') || msg.includes('pay') || msg.includes('cod')) {
    return "We accept multiple payment methods: UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD). All online payments are 100% secure with encryption. Choose what's convenient for you!";
  }
  
  // Discounts & Offers
  if (msg.includes('discount') || msg.includes('offer') || msg.includes('coupon') || msg.includes('sale')) {
    return "We regularly run special offers! Currently: Free shipping above ₹500, Bulk order discounts (buy 3 get 10% off), First-time customer offers, and Festival special deals. Add products to cart to see applicable discounts automatically!";
  }
  
  // Returns & Refunds
  if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
    return "We have a 7-day return policy. If you're not satisfied or received a damaged product, contact us within 7 days of delivery. Refunds are processed within 5-7 business days after we receive the returned item. We want you to be 100% happy!";
  }
  
  // Certificate & Authenticity
  if (msg.includes('certif') || msg.includes('fssai') || msg.includes('authentic') || msg.includes('genuine')) {
    return "All NutriVeda products are FSSAI certified (License No. on product labels), GMP certified facility, and third-party lab tested. Every product has authenticity seals and batch codes. We're a trusted brand committed to quality and transparency!";
  }
  
  // Prescription Needed
  if (msg.includes('prescription') || msg.includes('doctor')) {
    return "Our products are nutritional supplements and don't require a prescription. However, if you have any medical conditions, are on medication, pregnant, or nursing, we recommend consulting your healthcare provider before starting any new supplement.";
  }
  
  // Store Location
  if (msg.includes('store') || msg.includes('shop') || msg.includes('visit') || msg.includes('address')) {
    return "We're located in Hyderabad: H.No: 12, Tiwari Nagar, Near Miyapur Police Station, Chandanagar, Hyderabad — 500049. You can also order online for convenient home delivery. Our business hours are Mon-Sat: 9 AM - 7 PM. Would you like directions?";
  }
  
  // Customer Reviews
  if (msg.includes('review') || msg.includes('rating') || msg.includes('feedback')) {
    return "We're proud to have 500+ happy customers with an average 4.8★ rating! Customers love our product quality, natural ingredients, and effective results. Check our website for detailed reviews on each product page. Real people, real results!";
  }
  
  // Bulk Orders
  if (msg.includes('bulk') || msg.includes('wholesale') || msg.includes('quantity')) {
    return "We offer special bulk order discounts! For orders of 5+ items or corporate/gym bulk purchases, contact us directly for customized pricing and deals. Perfect for gyms, health clubs, or group orders. Let's discuss your requirements!";
  }
  
  // Subscription
  if (msg.includes('subscription') || msg.includes('monthly') || msg.includes('regular')) {
    return "We're launching a subscription service soon! You'll be able to get your favorite products delivered monthly with additional discounts. Want to be notified when subscriptions are available? I can add you to our waitlist!";
  }
  
  // Comparisons
  if (msg.includes('compare') || msg.includes('difference') || msg.includes('better') || msg.includes('vs')) {
    return "I'd be happy to help you compare products! Each product is designed for specific needs. Protein powders for muscle building, Herbal blends for wellness, Kids products for growth. Tell me which products you want to compare and I'll explain the differences!";
  }
  
  // Recommendations
  if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('which one') || msg.includes('best for')) {
    return "I can give you personalized recommendations! Tell me about your health goals: Building muscle? Weight loss? Better immunity? Stress relief? Kids nutrition? Energy boost? Let me know and I'll suggest the perfect products for you!";
  }
  
  // Company Information
  if (msg.includes('about') || msg.includes('company') || msg.includes('nutriveda')) {
    return "NutriVeda is your trusted partner in natural nutrition! We're based in Hyderabad, committed to providing premium quality, 100% natural products. FSSAI certified, GMP compliant, and loved by 500+ customers. Our mission: Pure nutrition for powerful lives!";
  }
  
  // Thank You
  if (msg.includes('thank')) {
    return "You're very welcome! I'm here to help anytime. Is there anything else you'd like to know about our products or services?";
  }
  
  // Complaints or Issues
  if (msg.includes('complain') || msg.includes('problem') || msg.includes('issue') || msg.includes('not working')) {
    return "I'm sorry to hear you're facing an issue. Your satisfaction is our priority! Please share more details about the problem, and I'll ensure it's resolved quickly. You can also reach our support team directly for immediate assistance.";
  }
  
  // Contact Information Request
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call') || msg.includes('whatsapp')) {
    return "📞 For direct assistance, you can reach us at:\n\nPhone/WhatsApp: +91 78936 39037\nEmail: customercare@nutriveda.com\n\nBusiness Hours: Mon-Sat, 9:00 AM - 7:00 PM\n\nOur team will be happy to help you with any questions or concerns!";
  }
  
  // Default Response - Professional Escalation
  return "I want to make sure you get the best assistance. While I can help with general product information, orders, and common questions, for detailed information specific to your needs, please feel free to:\n\n📞 Call/WhatsApp: +91 78936 39037\n📧 Email: customercare@nutriveda.com\n\nOur expert team is available Mon-Sat, 9 AM - 7 PM to provide personalized guidance. Is there anything else I can help you with right now?";
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

function closeIconModal() {
  const modals = document.querySelectorAll('.icon-modal');
  modals.forEach(modal => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeIconModal();
  }
});

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('icon-modal')) {
    closeIconModal();
  }
});
