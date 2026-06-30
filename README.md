# Nutri Veda - E-Commerce Website

**Pure Nutrition, Powerful Life**

---

## 🚀 Live Site
**Production:** https://rnidigonda.github.io/nutriVedaLatest/

---

## ✅ Current Status: EMAIL OTP DEPLOYED & READY

### What's Working Now ✅
- ✅ Email-based login system (deployed)
- ✅ Demo mode working perfectly (localhost)
- ✅ Production code ready (live on GitHub Pages)
- ✅ All code committed and pushed
- ✅ Beautiful email template ready

### ⏳ Action Required: EmailJS Configuration

To enable **real email sending** on your live site:

#### 📋 Quick Setup (10 minutes)

1. **Create EmailJS Account** → https://www.emailjs.com/
   - Sign up (FREE - 200 emails/month)
   - Verify your email

2. **Connect Gmail Service**
   - Dashboard → Email Services → Add New Service → Gmail
   - Authorize your Gmail account
   - Copy your **Service ID**

3. **Create Email Template**
   - Dashboard → Email Templates → Create New
   - **Template ID:** `template_otp_login` (exact)
   - **Subject:** `Your Nutri Veda Login OTP - {{otp}}`
   - **Content:** Copy HTML from `EMAILJS_QUICK_START.md` (in this repo)

4. **Get API Keys**
   - Dashboard → Account → General
   - Copy your **Public Key**

5. **Update Configuration**
   - Open: `emailjs-config.js`
   - Replace:
     ```javascript
     PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',  // ← Your key here
     SERVICE_ID: 'service_nutriveda',         // ← Your Service ID
     IS_CONFIGURED: false  // ← Change to true
     ```

6. **Deploy**
   ```bash
   git add emailjs-config.js
   git commit -m "Configure EmailJS"
   git push origin main
   ```

7. **Test**
   - Wait 2 minutes for GitHub Pages rebuild
   - Go to: https://rnidigonda.github.io/nutriVedaLatest/pages/login.html
   - Enter your email
   - Check inbox for OTP! 📧

---

## 📧 Email Template HTML

Copy this into your EmailJS template:

```html
<!DOCTYPE html>
<html>
<head><style>body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0}.container{max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)}.header{background:linear-gradient(135deg,#2d5a3d,#3d7a52);color:#fff;padding:40px 30px;text-align:center}.logo{font-size:36px;font-weight:700;margin-bottom:10px}.logo-veda{color:#f5d87a}.tagline{font-size:14px;opacity:.9}.content{padding:40px 30px}.greeting{font-size:20px;color:#2d5a3d;margin-bottom:20px}.message{font-size:16px;color:#666;line-height:1.6;margin-bottom:30px}.otp-box{background:linear-gradient(135deg,#f5f5f5,#e8e8e8);border:3px solid #2d5a3d;border-radius:12px;padding:30px;text-align:center;margin:30px 0}.otp-label{font-size:14px;color:#666;margin-bottom:15px;font-weight:600;text-transform:uppercase;letter-spacing:1px}.otp{font-size:42px;font-weight:900;letter-spacing:10px;color:#2d5a3d;font-family:'Courier New',monospace;text-shadow:2px 2px 4px rgba(0,0,0,.1)}.otp-note{font-size:13px;color:#999;margin-top:15px}.warning{background:#fff3cd;border-left:4px solid #ffc107;padding:15px;border-radius:8px;margin:20px 0;font-size:14px;color:#856404}.footer{text-align:center;color:#999;font-size:13px;padding:30px;background:#f8f8f8;border-top:1px solid #e5e5e5}.footer a{color:#2d5a3d;text-decoration:none}.contact-info{margin:15px 0;line-height:1.8}</style></head>
<body><div class="container"><div class="header"><div class="logo">Nutri<span class="logo-veda">Veda</span></div><div class="tagline">Pure Nutrition, Powerful Life</div></div><div class="content"><div class="greeting">Hello {{firstName}}! 👋</div><div class="message">Thank you for choosing Nutri Veda! To complete your login, please use the verification code below:</div><div class="otp-box"><div class="otp-label">Your Login OTP</div><div class="otp">{{otp}}</div><div class="otp-note">Valid for 5 minutes</div></div><div class="warning"><strong>⚠️ Security Notice:</strong><br>If you didn't request this code, please ignore this email. Never share your OTP with anyone.</div><div class="message">Welcome to the Nutri Veda family! We're excited to help you on your wellness journey.</div></div><div class="footer"><div class="contact-info"><strong>Nutri Veda</strong><br>Chandanagar, Hyderabad 500049<br>📧 <a href="mailto:customercare.nutriveda@gmail.com">customercare.nutriveda@gmail.com</a><br>📱 <a href="tel:+917893639037">+91 78936 39037</a></div><div style="margin-top:20px">© 2025 Nutri Veda. All rights reserved.<br>Owned by Ravindar Nidigonda</div></div></div></body>
</html>
```

---

## 🧪 Testing

### Local Testing (Demo Mode)
1. Open `pages/login.html` in browser
2. Enter any email address
3. Fill in details
4. OTP will appear on screen (green box)
5. Enter OTP and login

### Production Testing (After EmailJS Setup)
1. Go to live site: https://rnidigonda.github.io/nutriVedaLatest/pages/login.html
2. Enter real email address
3. Check email inbox for OTP
4. Enter OTP and login

---

## 📁 Key Files

- `pages/login.html` - Email OTP login page
- `emailjs-config.js` - **YOU NEED TO UPDATE THIS**
- `js/common.js` - User session management
- `index.html` - Home page
- `cart.html` - Shopping cart
- `checkout.html` - Checkout page

---

## 🔒 How Email OTP Works

### Demo Mode (localhost/file://)
- Detects local environment automatically
- Shows OTP on screen (no email sent)
- Perfect for testing

### Production Mode (GitHub Pages/Live Site)
- Detects production environment
- Sends real email via EmailJS
- OTP valid for 5 minutes
- Max 5 verification attempts
- Professional branded email

---

## 💡 Features

✅ Email-based authentication  
✅ OTP verification (6-digit)  
✅ Phone number optional  
✅ Beautiful email templates  
✅ Shopping cart  
✅ Wishlist  
✅ Product catalog  
✅ Checkout system  
✅ Image search (camera icon)  
✅ Social sharing  
✅ WhatsApp integration  
✅ Mobile responsive  

---

## 🎯 What Users See

1. **Login Page:** Enter email → Fill details → Get OTP email → Verify → Login
2. **Home Page:** Browse products → Add to cart → Wishlist
3. **Cart:** View items → Update quantities → Checkout
4. **Checkout:** Enter shipping → Place order → Confirmation

---

## 📞 Support

**Website:** https://nutriveda.shop  
**Email:** customercare@nutriveda.com  
**Phone:** +91 78936 39037  
**Location:** Chandanagar, Hyderabad 500049

---

## 📊 EmailJS Free Plan

- **200 emails/month** (FREE)
- Perfect for small e-commerce
- ~6-7 logins per day
- Upgrade available if needed

---

## 🆘 Troubleshooting

### "Email service not configured"
→ Check `emailjs-config.js`, set `IS_CONFIGURED: true`

### Didn't receive OTP email
→ Check spam folder, verify EmailJS dashboard

### Still showing demo mode
→ Clear cache, try incognito, check URL is github.io

---

## ✅ Deployment Status

- **Repository:** https://github.com/rnidigonda/nutriVedaLatest
- **Branch:** main
- **Last Commit:** a94b3eb (Email OTP with EmailJS)
- **Git Status:** Clean ✅
- **GitHub Pages:** Active ✅

---

## 🎊 Ready to Go!

All code is deployed! Just configure EmailJS and you're live.

**Start here:** https://www.emailjs.com/

**Total time:** 10 minutes ⚡

Good luck! 🍀
