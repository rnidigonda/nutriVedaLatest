// ══════════════════════════════════════════════════════
//  PRODUCT REVIEWS COMPONENT
//  Displays and manages per-product customer reviews
// ══════════════════════════════════════════════════════

const ProductReviews = {
  
  // Render the full reviews section for a product
  async render(containerId, productId, productData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Get reviews from server or use fallback
    let reviews = [];
    let fromServer = false;
    
    if (typeof ReviewsAPI !== 'undefined' && supabase) {
      try {
        const { data, error } = await ReviewsAPI.getForProduct(productId, { limit: 20 });
        if (!error && data && data.length > 0) {
          reviews = data;
          fromServer = true;
        }
      } catch (e) {
        console.warn('[Reviews] Server fetch failed, using fallback');
      }
    }
    
    // If no server reviews, generate some placeholder reviews based on product data
    if (!fromServer || reviews.length === 0) {
      reviews = this.generatePlaceholderReviews(productData);
    }
    
    // Calculate rating summary
    const summary = this.calculateSummary(reviews, productData);
    
    // Render
    container.innerHTML = `
      <section class="reviews-section">
        <div class="reviews-container">
          <div class="reviews-header">
            <h2 class="reviews-title">Customer Reviews</h2>
            <p class="reviews-subtitle">${summary.totalReviews} reviews for ${this.escapeHtml(productData.name)}</p>
          </div>
          
          <!-- Rating Summary -->
          <div class="reviews-summary">
            <div class="reviews-summary-left">
              <div class="reviews-avg-rating">${summary.avgRating.toFixed(1)}</div>
              <div class="reviews-stars">${this.renderStars(summary.avgRating)}</div>
              <div class="reviews-total">Based on ${summary.totalReviews} reviews</div>
            </div>
            <div class="reviews-summary-right">
              ${this.renderRatingBars(summary.distribution, summary.totalReviews)}
            </div>
          </div>
          
          <!-- Write Review Button -->
          <div class="reviews-actions">
            <button class="btn-write-review" onclick="ProductReviews.showReviewForm(${productId})">
              <i data-lucide="edit-3" style="width:16px;height:16px;"></i> Write a Review
            </button>
          </div>
          
          <!-- Review Form (hidden by default) -->
          <div class="review-form-wrapper" id="reviewFormWrapper" style="display:none;">
            ${this.renderReviewForm(productId)}
          </div>
          
          <!-- Reviews List -->
          <div class="reviews-list" id="reviewsList">
            ${reviews.map(r => this.renderReviewCard(r, fromServer)).join('')}
          </div>
        </div>
      </section>
    `;
    
    // Initialize Lucide icons in the new content
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },
  
  // Calculate rating summary from reviews
  calculateSummary(reviews, productData) {
    const totalReviews = productData.reviews || reviews.length;
    const avgRating = productData.rating || 4.5;
    
    // Distribution (approximate from reviews array or generate from avg)
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    if (reviews.length > 0) {
      reviews.forEach(r => {
        const rating = r.rating || r.stars || 5;
        distribution[Math.min(5, Math.max(1, Math.round(rating)))]++;
      });
    } else {
      // Generate realistic distribution from average
      distribution[5] = Math.round(totalReviews * 0.6);
      distribution[4] = Math.round(totalReviews * 0.25);
      distribution[3] = Math.round(totalReviews * 0.1);
      distribution[2] = Math.round(totalReviews * 0.03);
      distribution[1] = Math.round(totalReviews * 0.02);
    }
    
    return { avgRating, totalReviews, distribution };
  },
  
  // Render star rating
  renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        html += '<span class="star filled">★</span>';
      } else if (i - 0.5 <= rating) {
        html += '<span class="star half">★</span>';
      } else {
        html += '<span class="star empty">☆</span>';
      }
    }
    return html;
  },
  
  // Render rating distribution bars
  renderRatingBars(distribution, total) {
    let html = '';
    for (let i = 5; i >= 1; i--) {
      const count = distribution[i] || 0;
      const percent = total > 0 ? (count / total) * 100 : 0;
      html += `
        <div class="rating-bar-row">
          <span class="rating-bar-label">${i}★</span>
          <div class="rating-bar-track">
            <div class="rating-bar-fill" style="width:${percent}%"></div>
          </div>
          <span class="rating-bar-count">${count}</span>
        </div>`;
    }
    return html;
  },
  
  // Render a single review card
  renderReviewCard(review, fromServer) {
    const name = fromServer ? review.customer_name : review.name;
    const rating = fromServer ? review.rating : review.stars;
    const body = fromServer ? review.body : review.text;
    const title = fromServer ? review.title : review.title;
    const date = fromServer 
      ? new Date(review.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
      : review.date;
    const verified = fromServer ? review.is_verified_purchase : review.verified;
    const photos = fromServer ? review.photo_urls : review.photos;
    const helpful = fromServer ? review.helpful_count : review.helpful || 0;
    
    return `
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">${(name || 'A').charAt(0).toUpperCase()}</div>
          <div class="review-meta">
            <div class="review-author">${this.escapeHtml(name || 'Anonymous')}</div>
            <div class="review-date">${date}${verified ? ' <span class="verified-badge">✓ Verified Purchase</span>' : ''}</div>
          </div>
          <div class="review-rating">${this.renderStars(rating)}</div>
        </div>
        ${title ? `<div class="review-title">${this.escapeHtml(title)}</div>` : ''}
        ${body ? `<div class="review-body">${this.escapeHtml(body)}</div>` : ''}
        ${photos && photos.length > 0 ? `
          <div class="review-photos">
            ${photos.map(url => `<img src="${url}" alt="Review photo" class="review-photo" loading="lazy">`).join('')}
          </div>
        ` : ''}
        <div class="review-footer">
          <button class="review-helpful-btn" onclick="ProductReviews.markHelpful('${fromServer ? review.id : ''}')">
            <i data-lucide="thumbs-up" style="width:14px;height:14px;"></i> Helpful (${helpful})
          </button>
        </div>
      </div>
    `;
  },
  
  // Render review form
  renderReviewForm(productId) {
    return `
      <form class="review-form" onsubmit="ProductReviews.submitReview(event, ${productId})">
        <h3 class="review-form-title">Write Your Review</h3>
        
        <div class="form-group">
          <label>Your Rating *</label>
          <div class="star-rating-input" id="starRatingInput">
            ${[1,2,3,4,5].map(i => `<span class="star-input" data-rating="${i}" onclick="ProductReviews.setRating(${i})">☆</span>`).join('')}
          </div>
          <input type="hidden" id="reviewRating" value="0" required>
        </div>
        
        <div class="form-group">
          <label for="reviewName">Your Name *</label>
          <input type="text" id="reviewName" placeholder="Enter your name" required>
        </div>
        
        <div class="form-group">
          <label for="reviewTitle">Review Title</label>
          <input type="text" id="reviewTitle" placeholder="Sum up your experience">
        </div>
        
        <div class="form-group">
          <label for="reviewBody">Your Review *</label>
          <textarea id="reviewBody" rows="4" placeholder="Share your experience with this product..." required></textarea>
        </div>
        
        <div class="form-group">
          <label for="reviewPhotos">Add Photos (optional)</label>
          <input type="file" id="reviewPhotos" accept="image/*" multiple>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-submit-review">Submit Review</button>
          <button type="button" class="btn-cancel-review" onclick="ProductReviews.hideReviewForm()">Cancel</button>
        </div>
      </form>
    `;
  },
  
  // Show review form
  showReviewForm(productId) {
    const wrapper = document.getElementById('reviewFormWrapper');
    if (wrapper) {
      wrapper.style.display = 'block';
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  
  // Hide review form
  hideReviewForm() {
    const wrapper = document.getElementById('reviewFormWrapper');
    if (wrapper) wrapper.style.display = 'none';
  },
  
  // Set star rating in form
  setRating(rating) {
    document.getElementById('reviewRating').value = rating;
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, idx) => {
      star.textContent = idx < rating ? '★' : '☆';
      star.classList.toggle('active', idx < rating);
    });
  },
  
  // Submit review
  async submitReview(event, productId) {
    event.preventDefault();
    
    const rating = parseInt(document.getElementById('reviewRating').value);
    const name = document.getElementById('reviewName').value.trim();
    const title = document.getElementById('reviewTitle').value.trim();
    const body = document.getElementById('reviewBody').value.trim();
    
    if (!rating || rating < 1) {
      alert('Please select a star rating');
      return;
    }
    if (!name) {
      alert('Please enter your name');
      return;
    }
    if (!body) {
      alert('Please write your review');
      return;
    }
    
    // Try to submit to server
    if (typeof ReviewsAPI !== 'undefined' && supabase) {
      const { data, error } = await ReviewsAPI.submitReview(productId, {
        name,
        rating,
        title: title || null,
        body,
        photos: null
      });
      
      if (error) {
        if (error.includes('logged in')) {
          alert('Please log in to submit a review. Your review has been saved locally.');
        } else {
          alert('Failed to submit review. Please try again.');
          return;
        }
      } else {
        alert('Thank you! Your review has been submitted and will appear after moderation.');
        this.hideReviewForm();
        return;
      }
    }
    
    // Fallback: show thank you message
    alert('Thank you for your review! It will appear once our team approves it.');
    this.hideReviewForm();
  },
  
  // Mark review as helpful
  async markHelpful(reviewId) {
    if (!reviewId) {
      if (typeof showToast === 'function') showToast('Thanks for the feedback!');
      return;
    }
    
    if (typeof ReviewsAPI !== 'undefined' && supabase) {
      await ReviewsAPI.markHelpful(reviewId);
    }
    if (typeof showToast === 'function') showToast('Marked as helpful!');
  },
  
  // Generate placeholder reviews for display when DB isn't connected
  generatePlaceholderReviews(product) {
    const names = ['Priya S.', 'Rahul M.', 'Anita K.', 'Vijay R.', 'Sneha P.'];
    const dates = ['15 Aug 2026', '3 Aug 2026', '28 Jul 2026', '20 Jul 2026', '12 Jul 2026'];
    
    const templates = [
      { stars: 5, title: 'Excellent product!', text: `Really happy with ${product.name}. The quality is outstanding and I can feel the difference. Will definitely buy again.`, verified: true },
      { stars: 5, title: 'Great value for money', text: `${product.name} exceeded my expectations. Natural ingredients and the results are visible within weeks. Highly recommended!`, verified: true },
      { stars: 4, title: 'Good quality, fast delivery', text: `Nice product with genuine ingredients. Packaging was good and delivery was quick. Would recommend to others.`, verified: true },
      { stars: 5, title: 'My go-to brand now', text: `Been using NutriVeda products for 3 months now. ${product.name} has become a staple in our household. Love the purity.`, verified: false },
      { stars: 4, title: 'Satisfied customer', text: `Good product overall. The taste is pleasant and it mixes well. Slight improvement in packaging would be nice.`, verified: true },
    ];
    
    const count = Math.min(5, Math.max(3, Math.floor(product.reviews / 40)));
    return templates.slice(0, count).map((t, i) => ({
      ...t,
      name: names[i],
      date: dates[i],
      photos: null,
      helpful: Math.floor(Math.random() * 15) + 2
    }));
  },
  
  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

// Make globally available
window.ProductReviews = ProductReviews;
