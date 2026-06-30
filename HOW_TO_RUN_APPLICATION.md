# 🚀 How to Run Nutri Veda Application

**Last Updated:** June 30, 2026

---

## ✅ CURRENT STATUS: DEPLOYED & READY

### 🎯 What's Done
✅ All code deployed to GitHub Pages  
✅ Email OTP system implemented  
✅ Demo mode working (localhost)  
✅ Production code ready  
✅ Git repository clean  

### ⏳ What's Pending
⏳ EmailJS configuration (10 minutes setup)

---

## 🌐 Live Application

**Production URL:** https://rnidigonda.github.io/nutriVedaLatest/

### Key Pages
- **Home:** https://rnidigonda.github.io/nutriVedaLatest/
- **Login:** https://rnidigonda.github.io/nutriVedaLatest/pages/login.html
- **Cart:** https://rnidigonda.github.io/nutriVedaLatest/cart.html
- **Wishlist:** https://rnidigonda.github.io/nutriVedaLatest/pages/wishlist.html
- **Checkout:** https://rnidigonda.github.io/nutriVedaLatest/checkout.html

---

## 🧪 Local Testing (Demo Mode)

### Method 1: Direct File Opening
1. Navigate to: `c:\vs_workSpace\nutriveda-website\nutriveda\`
2. Double-click `index.html`
3. Browser will open with demo mode active

### Method 2: Live Server (Recommended)
1. Open VS Code
2. Install "Live Server" extension if not installed
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Browser opens at `http://localhost:5500`

### What Works in Demo Mode?
✅ Browse all products  
✅ Add to cart  
✅ Wishlist  
✅ **Email OTP login** (OTP shown on screen)  
✅ Image search  
✅ Social sharing  
✅ All navigation  

**Note:** In demo mode, OTP appears on screen in a green box. No real email is sent.

---

## 📧 Email OTP Status

### Current Behavior

#### On Localhost (Demo Mode)
- User enters email address
- User fills in name and phone (optional)
- Clicks "Continue to Verify"
- **OTP appears on screen** (green box)
- Also visible in browser console (F12)
- User enters OTP and logs in

#### On Live Site (Production - After EmailJS Setup)
- User enters email address
- User fills in name and phone (optional)
- Clicks "Continue to Verify"
- **Real email sent with OTP**
- User checks inbox
- User enters OTP and logs in

---

## 🔧 Enable Production Email OTP (10 Minutes)

### Step 1: Create EmailJS Account
1. Go to: **https://www.emailjs.com/**
2. Click "Sign Up Free"
3. Use your email (e.g., rnidigonda@gmail.com)
4. Verify email and login

### Step 2: Connect Gmail Service
1. Dashboard → **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **Connect Account**
4. Authorize your Gmail
5. **Copy Service ID** (e.g., `service_abc123`)
6. Click **Create Service**

### Step 3: Create Email Template
1. Dashboard → **Email Templates** → **Create New**
2. **Template Name:** Nutri Veda OTP Login
3. **Template ID:** `template_otp_login` (exact name)
4. **Subject:** `Your Nutri Veda Login OTP - {{otp}}`
5. **Content:** Copy HTML from README.md
6. Click **Save**

### Step 4: Get API Keys
1. Dashboard → **Account** → **General**
2. Copy your **Public Key** (starts with `user_...`)
3. Note your Service ID from step 2

### Step 5: Update Configuration File
1. Open: `c:\vs_workSpace\nutriveda-website\nutriveda\emailjs-config.js`
2. Replace values:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'user_YOUR_ACTUAL_KEY',     // ← Paste your public key
  SERVICE_ID: 'service_YOUR_ACTUAL_ID',   // ← Paste your service ID
  TEMPLATE_ID: 'template_otp_login',      // ← Keep this as is
  IS_CONFIGURED: true  // ← Change from false to true ⚠️ IMPORTANT
};
```

3. **Save the file**

### Step 6: Deploy to GitHub
```bash
cd c:\vs_workSpace\nutriveda-website\nutriveda
git add emailjs-config.js
git commit -m "Configure EmailJS for production email OTP"
git push origin main
```

### Step 7: Test on Live Site
1. Wait **2-3 minutes** for GitHub Pages to rebuild
2. Open: https://rnidigonda.github.io/nutriVedaLatest/pages/login.html
3. Enter your **real email address**
4. Fill in details
5. Click "Continue to Verify"
6. **Check your email inbox** 📧
7. You'll receive OTP email within 30 seconds
8. Enter OTP and login!

---

## 🧪 Test Login System

### Local Test (Demo Mode)
1. Open `pages/login.html` locally
2. Enter email: `test@example.com`
3. Enter first name: `John`
4. Enter last name: `Doe`
5. Phone: Leave empty (optional)
6. Click "Continue to Verify"
7. **Look for green box on screen** showing OTP
8. Also check browser console (F12) for OTP
9. Copy the 6-digit OTP
10. Paste into OTP boxes
11. Click "Verify & Continue"
12. You should be redirected to home page
13. Top-right should show "Hi, John"

**Expected Demo OTP Display:**
```
🧪 DEMO MODE - TESTING ENVIRONMENT
Your Test OTP Code:
123456
📋 Copy this code to the boxes below
```

### Live Test (After EmailJS Setup)
1. Go to: https://rnidigonda.github.io/nutriVedaLatest/pages/login.html
2. Enter your **real email address**
3. Enter your real name
4. Phone: Optional
5. Click "Continue to Verify"
6. **Open your email inbox**
7. Look for email from EmailJS
8. Copy 6-digit OTP from email
9. Enter OTP on website
10. Click "Verify & Continue"
11. You should be redirected to home page
12. Top-right should show "Hi, YourName"

---

## 📁 Project Structure

```
nutriveda-website/nutriveda/
├── index.html              # Home page
├── cart.html               # Shopping cart
├── checkout.html           # Checkout page
├── confirmation.html       # Order confirmation
├── emailjs-config.js       # ⚠️ UPDATE THIS FOR PRODUCTION
├── config.js               # Global configuration
├── README.md               # Setup instructions
├── HOW_TO_RUN_APPLICATION.md  # This file
│
├── pages/
│   ├── login.html          # Email OTP login
│   ├── wishlist.html       # Wishlist page
│   ├── baby-care.html      # Category pages...
│   └── ...
│
├── js/
│   ├── common.js           # Shared utilities
│   └── icon-features.js    # Floating icons
│
├── css/
│   ├── styles.css          # Main styles
│   └── advanced-features.css
│
└── assets/
    └── images/             # Product images
```

---

## 🔍 Verify Deployment

### Check Git Status
```bash
cd c:\vs_workSpace\nutriveda-website\nutriveda
git status
```

**Expected Output:**
```
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

### Check Latest Commits
```bash
git log --oneline -5
```

**Expected Output:**
```
87d566c Update README with EmailJS setup
a94b3eb Added production email OTP with EmailJS
d1ad879 Changed login from mobile to EMAIL OTP
...
```

### Check Live Site
1. Open: https://rnidigonda.github.io/nutriVedaLatest/
2. Should see "Nutri Veda" branding
3. Top-right should have "Login" button
4. Footer should show "Owned by Ravindar Nidigonda"

---

## 🔐 Login System Details

### What Happens When User Logs In?

1. **User enters email** → Stored temporarily
2. **User enters name & phone** → Stored temporarily
3. **OTP generated** → 6 random digits
4. **Email sent** (production) or **OTP displayed** (demo)
5. **User enters OTP** → Verified (max 5 attempts)
6. **OTP expires** → After 5 minutes
7. **Login successful** → Data saved to localStorage:
   - `nv_user_email`
   - `nv_user_first_name`
   - `nv_user_last_name`
   - `nv_user_phone`
   - `nv_user_logged_in`
   - `nv_user_login_time`

### Where is User Data Used?
- **Navbar:** Shows "Hi, FirstName"
- **Account Dropdown:** Shows full name and email
- **Cart Page:** Pre-fills checkout form
- **Checkout:** Auto-fills email and phone

### Logout
- Click "Logout" in account dropdown
- Clears all localStorage
- Redirects to home page

---

## 🆘 Troubleshooting

### Issue: Demo mode not showing OTP
**Check:**
1. Open browser console (F12)
2. Look for: `🔐 DEMO MODE - Your OTP Code`
3. OTP should be in console and on screen
4. Check if running on localhost or file://

**Fix:**
- Make sure you're NOT on github.io (that's production)
- Use localhost or file:// for demo mode

### Issue: Production site not sending email
**Check:**
1. Is `emailjs-config.js` updated?
2. Is `IS_CONFIGURED: true`?
3. Are API keys correct?
4. Check browser console for errors
5. Check EmailJS dashboard for quota/errors

**Fix:**
1. Update `emailjs-config.js` with real keys
2. Set `IS_CONFIGURED: true`
3. Commit and push to GitHub
4. Wait 2-3 minutes
5. Clear browser cache
6. Try again

### Issue: "Email service not configured"
**Fix:**
- Update `emailjs-config.js`
- Set `IS_CONFIGURED: true`
- Commit and push

### Issue: Email not received
**Check:**
1. Spam folder
2. Email address correct?
3. EmailJS dashboard for logs
4. Quota (200/month on free plan)

### Issue: Invalid OTP
**Check:**
1. OTP expires after 5 minutes
2. Max 5 attempts per OTP
3. Copy OTP carefully (6 digits only)
4. In demo mode, check console for OTP

### Issue: Still shows demo mode on live site
**Fix:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private window
3. Verify URL is github.io (not file://)

---

## 📊 Browser Console Messages

### Demo Mode (Localhost) - Expected Messages
```
🧪 Running in DEMO MODE
🔐 DEMO MODE - Your OTP Code
OTP: 123456
📧 Email: user@example.com
ℹ️ In production, this will be sent via email
```

### Production Mode - Expected Messages
```
🔒 Running in PRODUCTION MODE
✅ EmailJS initialized for production
✅ Email sent successfully
```

### Not Configured - Warning Messages
```
⚠️ EmailJS Not Configured
To enable production email OTP:
1. Sign up at https://www.emailjs.com/
2. Get your API keys
3. Update emailjs-config.js with your keys
```

---

## ✅ Quick Checklist

### Before EmailJS Setup
- [x] Code deployed to GitHub
- [x] Demo mode working locally
- [x] All features tested
- [ ] EmailJS account created
- [ ] API keys obtained
- [ ] Configuration file updated
- [ ] Production email tested

### After EmailJS Setup
- [ ] EmailJS account active
- [ ] Gmail service connected
- [ ] Email template created
- [ ] API keys copied
- [ ] `emailjs-config.js` updated
- [ ] `IS_CONFIGURED: true` set
- [ ] Changes pushed to GitHub
- [ ] Live site tested
- [ ] Email OTP received
- [ ] Login successful

---

## 💡 Tips

### For Testing
1. Use Chrome DevTools (F12) to debug
2. Check console for detailed logs
3. Test demo mode first (locally)
4. Then test production (live site)

### For EmailJS
1. Free plan = 200 emails/month (plenty!)
2. Keep template ID as `template_otp_login`
3. Use Gmail for reliability
4. Check spam if email not received

### For Deployment
1. Always commit changes
2. Wait 2-3 min after push
3. Clear cache after deployment
4. Test in incognito mode

---

## 📞 Contact & Support

**Owner:** Ravindar Nidigonda  
**Location:** Chandanagar, Hyderabad 500049  
**Email:** customercare.nutriveda@gmail.com  
**Phone:** +91 78936 39037  
**Website:** https://nutriveda.shop  

**Repository:** https://github.com/rnidigonda/nutriVedaLatest  
**Live Site:** https://rnidigonda.github.io/nutriVedaLatest/  

---

## 🎉 Summary

### What Works Now
✅ Full e-commerce website  
✅ Email OTP login (demo mode)  
✅ Shopping cart & wishlist  
✅ Product catalog  
✅ Checkout system  
✅ All deployed to GitHub Pages  

### What You Need to Do
⏳ Create EmailJS account (FREE)  
⏳ Get API keys (2 minutes)  
⏳ Update `emailjs-config.js` (1 minute)  
⏳ Push to GitHub (1 minute)  
⏳ Test on live site (2 minutes)  

**Total Time:** 10 minutes ⚡

---

## 🚀 Ready to Launch!

Your application is **fully deployed and working**!

Just configure EmailJS (10 minutes) and you'll have production email OTP.

**Start here:** https://www.emailjs.com/

Good luck with your launch! 🎊
