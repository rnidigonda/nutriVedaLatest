// ══════════════════════════════════════════════════════
//  PERFORMANCE UTILITIES - NutriVeda
//  Lazy loading, image optimization, skeleton states
// ══════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── SKELETON LOADING ──────────────────────────────────
  // Shows skeleton cards while products are loading
  
  window.SkeletonLoader = {
    // Render skeleton cards into a grid container
    show(containerId, count = 8) {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      let html = '';
      for (let i = 0; i < count; i++) {
        html += `
          <div class="skeleton-card" aria-hidden="true">
            <div class="skeleton-img skeleton-pulse"></div>
            <div class="skeleton-body">
              <div class="skeleton-line skeleton-line-sm skeleton-pulse"></div>
              <div class="skeleton-line skeleton-line-lg skeleton-pulse"></div>
              <div class="skeleton-line skeleton-line-md skeleton-pulse"></div>
              <div class="skeleton-line skeleton-line-md skeleton-pulse" style="width:60%"></div>
              <div class="skeleton-footer">
                <div class="skeleton-price skeleton-pulse"></div>
                <div class="skeleton-btn skeleton-pulse"></div>
              </div>
            </div>
          </div>`;
      }
      container.innerHTML = html;
    },
    
    // Remove skeleton (called after real content loads)
    hide(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const skeletons = container.querySelectorAll('.skeleton-card');
      skeletons.forEach(s => s.remove());
    }
  };

  // ── LAZY LOADING IMAGES ───────────────────────────────
  // Uses native loading="lazy" with IntersectionObserver fallback
  
  window.LazyImages = {
    observer: null,
    
    init() {
      // Use native lazy loading where supported
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported - just set attribute
        this.upgradeAllImages();
        return;
      }
      
      // Fallback: IntersectionObserver for older browsers
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              this.loadImage(img);
              this.observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '200px 0px', // Load 200px before entering viewport
          threshold: 0.01
        });
        
        this.observeAll();
      } else {
        // No IntersectionObserver - load all immediately
        this.loadAll();
      }
    },
    
    // Add loading="lazy" to all product images
    upgradeAllImages() {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      });
    },
    
    // Observe all lazy images
    observeAll() {
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.observer.observe(img);
      });
    },
    
    // Load a single image
    loadImage(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        img.removeAttribute('data-srcset');
      }
      img.classList.add('loaded');
    },
    
    // Load all images immediately (fallback)
    loadAll() {
      document.querySelectorAll('img[data-src]').forEach(img => this.loadImage(img));
    }
  };

  // ── WEBP DETECTION & PICTURE ELEMENT HELPER ───────────
  // Detects WebP support and provides helpers for responsive images
  
  window.ImageOptimizer = {
    supportsWebP: null,
    
    async detectWebP() {
      if (this.supportsWebP !== null) return this.supportsWebP;
      
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => { this.supportsWebP = true; resolve(true); };
        img.onerror = () => { this.supportsWebP = false; resolve(false); };
        img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
      });
    },
    
    // Generate a picture element with WebP and fallback
    createPictureElement(src, alt, options = {}) {
      const { width, height, className, loading = 'lazy' } = options;
      
      // Derive WebP URL from original (assumes .webp version exists alongside)
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      let html = '<picture>';
      html += `<source srcset="${webpSrc}" type="image/webp">`;
      html += `<img src="${src}" alt="${alt}"`;
      if (width) html += ` width="${width}"`;
      if (height) html += ` height="${height}"`;
      if (className) html += ` class="${className}"`;
      html += ` loading="${loading}"`;
      html += ` decoding="async"`;
      html += '>';
      html += '</picture>';
      
      return html;
    },
    
    // For product images: generate responsive image markup
    productImage(productId, alt, options = {}) {
      const basePath = '/assets/products';
      const src = `${basePath}/product-${productId}.jpg`;
      
      return this.createPictureElement(src, alt, {
        ...options,
        loading: options.aboveFold ? 'eager' : 'lazy'
      });
    }
  };

  // ── CONTENT VISIBILITY FOR BELOW-FOLD SECTIONS ────────
  // Uses content-visibility: auto for sections below the fold
  
  window.ContentVisibility = {
    init() {
      // Add content-visibility to sections that are likely below fold
      const belowFoldSections = document.querySelectorAll(
        '.products-page, .why-us, .testimonials, #relatedSection, .reviews-section, footer'
      );
      
      belowFoldSections.forEach(section => {
        section.style.contentVisibility = 'auto';
        section.style.containIntrinsicSize = '0 500px';
      });
    }
  };

  // ── INITIALIZATION ────────────────────────────────────
  
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    LazyImages.init();
    
    // Initialize content visibility optimization
    ContentVisibility.init();
    
    // Detect WebP support
    ImageOptimizer.detectWebP();
  });

})();
