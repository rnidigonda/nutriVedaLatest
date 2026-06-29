# 🌿 NutriVeda - Natural Nutrition E-Commerce

**Pure Nutrition, Powerful Life**

A premium certified natural health products and nutrition supplements e-commerce platform built with modern web technologies.

---

## 🌟 Features

### 🛍️ **Shopping Experience**
- **66+ Premium Products** across 15+ health categories
- **Product Catalog** with 3 beautiful view modes (Grid, List, Magazine)
- **Advanced Filtering** by category with smooth animations
- **Live Search** with autocomplete and instant results
- **Quick View** modal for fast product browsing
- **Shopping Cart** with quantity controls and price calculations
- **Save for Later** functionality in cart
- **Wishlist** system to save favorite products

### 💬 **Customer Engagement**
- **AI-Powered Chatbot** with 24 response categories
- Product recommendations and information
- Professional escalation with contact details
- Natural conversation flow with quick reply buttons

### 📱 **Interactive Features**
- **Image Upload** with camera access for product reviews
- **Social Sharing** on 8 platforms (WhatsApp, Facebook, Twitter, etc.)
- **Smart WhatsApp Integration** (mobile app or web.whatsapp.com)
- **Email Integration** with Gmail compose pre-fill
- **Floating Action Bar** for quick access to features

### 🔐 **User Authentication**
- Dual-mode OTP system (demo + production)
- SMS OTP via AWS Lambda (production ready)
- LocalStorage-based session management
- User profile display in navbar

### 📦 **Checkout & Orders**
- Complete checkout flow with order form
- Order confirmation page
- Email notifications via Web3Forms
- Order summary with itemized pricing

### 🎨 **Design & UX**
- **Fully Responsive** - Mobile-first design
- **Touch-Friendly** - 44px minimum touch targets
- **Modern UI** - Smooth animations and transitions
- **Accessibility** - WCAG compliant structure
- **Fast Loading** - Optimized assets and code

---

## 🚀 Live Demo

🌐 **[View Live Website](#)** *(Update this link after GitHub Pages deployment)*

---

## 💻 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Storage**: LocalStorage for cart, wishlist, and user sessions
- **Forms**: Web3Forms API for email notifications
- **SMS**: AWS Lambda + SNS (optional, production mode)
- **Hosting**: Static files (works on any hosting platform)
- **Design**: Responsive, mobile-first approach

---

## 🎯 Product Categories

1. **Protein Powders** - Muscle building and recovery
2. **Kids Nutrition** - Healthy growth supplements
3. **Weight Management** - Weight gain and weight loss
4. **Immunity Boosters** - Natural immunity support
5. **Bone Health** - Calcium and bone strength
6. **Hair Care** - Herbal hair growth products
7. **Health Mix & Malts** - Nutritious powder mixes
8. **Makhana** - Roasted fox nuts snacks
9. **Spices** - Organic turmeric and spices
10. **Tea Blends** - Herbal and green teas
11. **Baby Care** - Infant nutrition
12. **Instant Mix** - Quick meal solutions
13. **Cooking Oils** - Healthy cooking essentials
14. **Amla Products** - Indian gooseberry supplements
15. **Healthy Snacks** - Nutritious munchies

---

## 🛠️ Installation & Setup

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- A simple HTTP server (optional, for local testing)

### Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/nutriveda-website.git
cd nutriveda-website
```

### Run Locally

**Option 1: Using http-server (Recommended)**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
http-server -p 8080 -o

# Or with npx (no installation needed)
npx http-server -p 8080 -o
```

**Option 2: Using Python**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**Option 3: Using VS Code**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

### Access the Application
Open your browser to: `http://localhost:8080`

---

## 📂 Project Structure

```
nutriveda/
├── index.html                  # Homepage with hero section
├── config.js                   # Configuration file
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
│
├── css/                        # Stylesheets
│   ├── styles.css              # Main styles
│   ├── advanced-features.css   # Advanced e-commerce features
│   └── icon-features.css       # Floating icons & catalog
│
├── js/                         # JavaScript files
│   ├── data.js                 # Product catalog (66+ products)
│   ├── common.js               # Shared utility functions
│   ├── advanced-features.js    # Wishlist, search, recommendations
│   └── icon-features.js        # Catalog, chat, upload, share
│
├── pages/                      # All pages
│   ├── products.html           # All products page
│   ├── cart.html               # Shopping cart
│   ├── checkout.html           # Checkout & order form
│   ├── confirmation.html       # Order confirmation
│   ├── login.html              # Login/Register with OTP
│   ├── wishlist.html           # User wishlist
│   ├── product.html            # Single product details
│   │
│   └── [Category Pages]        # 15 category-specific pages
│       ├── healthy-snacks.html
│       ├── weight-management.html
│       ├── kids-nutrition.html
│       ├── immunity.html
│       ├── bone-health.html
│       ├── hair-care.html
│       ├── health-mix.html
│       ├── makhana.html
│       ├── spices.html
│       ├── tea-blends.html
│       ├── baby-care.html
│       ├── malts.html
│       ├── instant-mix.html
│       ├── cooking.html
│       └── amla.html
│
└── assets/                     # Images, icons, logos
    └── [Product images and brand assets]
```

---

## 🎨 Key Features in Detail

### 1. Product Catalog (3 View Modes)
- **Grid View**: Card-based layout perfect for browsing
- **List View**: Compact horizontal layout for quick scanning  
- **Magazine View**: Editorial style showcasing featured products
- Category filters and real-time search across all views
- Smooth transitions between view modes

### 2. Shopping Cart Enhancements
- Add/remove items with quantity controls
- **Save for Later** section for deferred purchases
- **You might also like** recommendations based on cart items
- Persistent storage using localStorage
- Real-time price calculations with subtotal and tax

### 3. Customer Support Chatbot
- AI-powered responses for 24+ query types
- Product information and recommendations
- Order tracking and shipping information
- Professional escalation to phone and email support
- Quick reply buttons for common questions
- Natural conversation flow

### 4. Smart Recommendations
- Based on browsing history
- Cart item suggestions
- Category-specific recommendations
- Real-time updates

### 5. Live Search
- Autocomplete as you type
- Instant results
- Search by product name, category, or description
- Keyboard navigation support

---

## 🔧 Configuration

Edit `config.js` to customize settings:

```javascript
const CONFIG = {
  // Site Information
  SITE_NAME: 'NutriVeda',
  SITE_URL: 'https://yourdomain.com',
  
  // Feature Toggles
  DEMO_MODE: true,              // Show OTP on screen (for testing)
  ENABLE_SMS_OTP: false,        // Enable SMS OTP (needs backend)
  
  // API Configuration
  API_BASE_URL: '',             // Your backend API URL
  WEB3FORMS_KEY: 'your-key',    // Contact form API key
  
  // Contact Information
  PHONE: '+91 78936 39037',
  EMAIL: 'customercare@nutriveda.com',
  ADDRESS: 'Hyderabad, India',
  
  // Social Media
  WHATSAPP: '+917893639037',
  // ... other settings
};
```

---

## 🚢 Deployment

### GitHub Pages (Recommended - FREE)

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name: `nutriveda-website`
   - Visibility: Public or Private
   - Don't initialize with README

2. **Push Your Code**
   ```bash
   cd c:\vs_workSpace\nutriveda-website\nutriveda
   git init
   git add .
   git commit -m "Initial commit: NutriVeda e-commerce website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nutriveda-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings**
   - Navigate to **Pages** (left sidebar)
   - Source: Select **main** branch
   - Folder: **/ (root)**
   - Click **Save**
   - Wait 2-3 minutes

4. **Access Your Live Site**
   ```
   https://YOUR_USERNAME.github.io/nutriveda-website/
   ```

### Other Hosting Options

- **Netlify**: Drag & drop deploy
- **Vercel**: Connect GitHub repo for auto-deploy
- **AWS S3**: Static website hosting
- **Firebase Hosting**: Google's hosting platform

---

## 📱 Responsive Design

- **Desktop** (>1024px): Full-featured experience with sidebar layouts
- **Tablet** (768px-1024px): Optimized two-column layouts
- **Mobile** (<768px): Single-column, touch-friendly interface
- **Small Mobile** (<480px): Compact layouts with collapsible sections

---

## 🧪 Testing

### Local Testing Checklist
- [ ] Homepage loads correctly
- [ ] Product catalog displays all items
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Add to cart functionality
- [ ] Cart persistence (refresh page)
- [ ] Wishlist functionality
- [ ] Checkout form submission
- [ ] Contact form works
- [ ] All page links work
- [ ] Mobile responsive design
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)

### Production Testing Checklist
- [ ] HTTPS enabled
- [ ] All assets loading
- [ ] No console errors
- [ ] Forms submitting correctly
- [ ] Analytics tracking (if added)
- [ ] Performance optimization
- [ ] SEO meta tags

---

## 📞 Contact & Support

**NutriVeda - Natural Nutrition**

- 📧 **Email**: customercare@nutriveda.com
- 📱 **Phone**: +91 78936 39037
- 💬 **WhatsApp**: +91 78936 39037
- 📍 **Address**: Chandanagar, Hyderabad - 500049, India

**Business Hours**: Monday - Saturday, 9:00 AM - 6:00 PM IST

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

© 2025 NutriVeda. All rights reserved.

**Owner**: Ravindar Nidigonda  
**Email**: nidigondaravindar@gmail.com

---

## 🎉 Acknowledgments

- Product images and data sourced from NutriVeda catalog
- Icons from various free icon libraries
- Inspiration from modern e-commerce platforms

---

## 📊 Statistics

- **66+ Products** across 15 categories
- **22 HTML Pages** (1 homepage + 21 pages)
- **4 CSS Files** with modular architecture
- **4 JavaScript Files** with clean separation of concerns
- **Fully Responsive** with mobile-first design
- **Zero Dependencies** - Pure vanilla JavaScript
- **Fast Performance** - Optimized static files

---

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Backend API for order management
- [ ] Admin panel for product management
- [ ] User account dashboard
- [ ] Order tracking system
- [ ] Product reviews and ratings
- [ ] Email marketing integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features

---

## 🚀 Ready to Deploy?

Follow the deployment guide in `HOW_TO_RUN_APPLICATION.md` for detailed instructions.

**Quick Start**: Push to GitHub → Enable Pages → Go Live in 10 minutes! ✨

---

**Made with ❤️ for Natural Health & Nutrition**

**Version**: 1.0.0  
**Last Updated**: January 2025
