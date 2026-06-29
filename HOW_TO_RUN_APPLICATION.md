# 🚀 How to Run NutriVeda Application

## Complete Step-by-Step Guide

---

## 📋 **Prerequisites**

Before running the application, ensure you have:
- ✅ Node.js installed (we have v24.15.0)
- ✅ Terminal/Command Prompt access
- ✅ Modern web browser (Chrome, Firefox, Edge, Safari)

---

## 🚀 **Method 1: Using http-server (Recommended)**

### **Step 1: Open Terminal/Command Prompt**
- Press `Windows + R`
- Type `cmd` and press Enter
- Or use VS Code integrated terminal

### **Step 2: Navigate to Project Directory**
```bash
cd c:\vs_workSpace\nutriveda-website
```

### **Step 3: Start the Server**
```bash
npx http-server nutriveda -p 8080 -o
```

**What this does:**
- `npx` - Runs the package without installing globally
- `http-server` - Simple HTTP server
- `nutriveda` - Folder to serve
- `-p 8080` - Port number 8080
- `-o` - Automatically opens browser

### **Step 4: Server Started!**

You should see:
```
Starting up http-server, serving nutriveda
http-server version: 14.1.1

Available on:
  http://192.168.0.6:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```

✅ **Browser opens automatically!**  
✅ **Application is now running!**

### **Step 5: Access the Application**

The browser should open automatically to:
- **http://localhost:8080**
- **http://127.0.0.1:8080**

If browser doesn't open, manually go to: **http://localhost:8080**

---

## 🌐 **Method 2: Using Live Server (VS Code Extension)**

### **Step 1: Install Live Server Extension**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Live Server"
4. Click "Install" on "Live Server" by Ritwick Dey

### **Step 2: Open Project**
1. Open the `nutriveda` folder in VS Code
2. Find `index.html` in the file explorer

### **Step 3: Start Live Server**
- **Option A:** Right-click on `index.html` → "Open with Live Server"
- **Option B:** Click "Go Live" button in bottom-right corner of VS Code
- **Option C:** Press `Alt+L` then `Alt+O`

### **Step 4: Application Opens!**
- Usually opens at: **http://127.0.0.1:5500**
- Browser opens automatically
- Auto-reloads when you save files

---

## 🐍 **Method 3: Using Python (If Available)**

### **If you have Python 3:**
```bash
cd c:\vs_workSpace\nutriveda-website\nutriveda
python -m http.server 8080
```

### **If you have Python 2:**
```bash
cd c:\vs_workSpace\nutriveda-website\nutriveda
python -m SimpleHTTPServer 8080
```

Then open browser to: **http://localhost:8080**

---

## 🎯 **Recommended: Method 1 (http-server)**

**Why?**
- ✅ Easy to use
- ✅ Works without installation (npx)
- ✅ Opens browser automatically
- ✅ Fast and reliable
- ✅ No configuration needed

---

## 📂 **Project Structure**

```
nutriveda/
├── index.html              ← Homepage (Start here)
├── pages/
│   ├── products.html       ← All products page
│   ├── cart.html          ← Shopping cart
│   ├── login.html         ← Login/Register
│   └── ...
├── css/
│   ├── styles.css         ← Main styles
│   ├── advanced-features.css
│   └── icon-features.css
├── js/
│   ├── data.js            ← Product data (66+ products)
│   ├── common.js          ← Shared functions
│   ├── advanced-features.js
│   └── icon-features.js   ← Catalog, chat, etc.
└── assets/
    └── images/
```

---

## 🧪 **Testing the Application**

### **After Starting Server:**

1. **Homepage Should Load**
   - URL: http://localhost:8080
   - Shows NutriVeda homepage
   - "Fuel Your Body with Pure Nature"

2. **Test Navigation**
   - Click "PRODUCTS" in navbar
   - Click "ABOUT"
   - Click "REVIEWS"
   - Click "CONTACT"

3. **Test Floating Icons (Right Side)**
   - 📘 **Blue icon** → Product Catalog opens
   - 📷 **Gray icon** → Upload Image opens
   - 🐦 **Pink icon** → Social Share opens
   - 💬 **White icon** → Customer Support opens

4. **Test Product Catalog**
   - Click 📘 icon
   - Should show products with 3 view options
   - Try view switcher buttons (⊞ ☰ 📖)
   - Try filter buttons (All, Protein, Kids, etc.)
   - Try search box
   - Try clicking products

5. **Test Other Features**
   - Login/Register
   - Add to Cart
   - Wishlist
   - Search products
   - Browse categories

---

## 🛑 **Stopping the Server**

### **Method 1 (http-server):**
- Press `Ctrl + C` in terminal
- Type `Y` if asked "Terminate batch job?"

### **Method 2 (Live Server):**
- Click "Port: 5500" in VS Code status bar
- Or press `Alt+L` then `Alt+C`

### **Method 3 (Python):**
- Press `Ctrl + C` in terminal

---

## ⚡ **Quick Start Commands**

### **Full Command (One Line):**
```bash
cd c:\vs_workSpace\nutriveda-website && npx http-server nutriveda -p 8080 -o
```

### **Or Create a Batch File:**

1. Create `start-server.bat` in `nutriveda-website` folder:
```batch
@echo off
echo Starting NutriVeda Application...
npx http-server nutriveda -p 8080 -o
```

2. Double-click `start-server.bat` to start!

---

## 🔧 **Troubleshooting**

### **Problem: Port 8080 is already in use**

**Solution 1:** Use different port
```bash
npx http-server nutriveda -p 8081 -o
```

**Solution 2:** Kill existing process
```bash
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

### **Problem: npx not found**

**Solution:** Install Node.js
- Download from: https://nodejs.org
- Install LTS version
- Restart terminal
- Try again

### **Problem: Browser doesn't open automatically**

**Solution:** Manually open browser
- Go to: http://localhost:8080
- Or: http://127.0.0.1:8080

### **Problem: Page shows 404 Not Found**

**Solution:** Check you're in correct directory
```bash
# Should see index.html when you list files
cd c:\vs_workSpace\nutriveda-website\nutriveda
dir
```

### **Problem: Icons not working after starting**

**Solution:** Hard refresh browser
- Windows: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### **Problem: CSS/JS not loading (old version showing)**

**Solution:** Clear browser cache
1. Press `F12` (DevTools)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

---

## 📱 **Accessing from Mobile Device**

### **Step 1: Find Your Computer's IP**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.0.6)

### **Step 2: Start Server**
```bash
npx http-server nutriveda -p 8080
```

### **Step 3: On Mobile**
- Connect to same WiFi network
- Open browser
- Go to: `http://YOUR_IP:8080`
- Example: `http://192.168.0.6:8080`

---

## 🎯 **Recommended Workflow**

### **For Development:**
```bash
# Terminal 1: Start server
npx http-server nutriveda -p 8080

# Edit files in VS Code
# Browser at: http://localhost:8080
# Refresh browser to see changes (Ctrl+R)
```

### **For Testing:**
```bash
# Start server with auto-open
npx http-server nutriveda -p 8080 -o

# Test all features
# Test on different browsers
# Test on mobile (optional)
```

---

## 📊 **Server Options**

### **Basic:**
```bash
npx http-server nutriveda -p 8080
```

### **With Auto-Open:**
```bash
npx http-server nutriveda -p 8080 -o
```

### **With CORS Enabled:**
```bash
npx http-server nutriveda -p 8080 --cors
```

### **With Caching Disabled:**
```bash
npx http-server nutriveda -p 8080 -c-1
```

### **Silent Mode:**
```bash
npx http-server nutriveda -p 8080 -s
```

---

## 🌟 **Features to Test**

### **Core Features:**
- [x] Homepage loads
- [x] Navigation works
- [x] Floating icons work
- [x] Product catalog opens
- [x] 3 view modes (Grid, List, Magazine)
- [x] Category filters work
- [x] Search products works
- [x] Upload image modal works
- [x] Social share modal works
- [x] Customer support chat works

### **Advanced Features:**
- [x] Login/Register
- [x] Add to cart
- [x] Wishlist functionality
- [x] Sticky cart bar
- [x] Quick view products
- [x] Live search
- [x] Product recommendations
- [x] Chatbot responses

---

## 📝 **Environment Information**

Your current setup:
- **OS:** Windows
- **Platform:** win32
- **Shell:** cmd
- **Node.js:** v24.15.0
- **Project Path:** `c:\vs_workSpace\nutriveda-website\nutriveda`

---

## 🎉 **Success Checklist**

After starting the server, you should see:

- [x] Terminal shows "Available on: http://127.0.0.1:8080"
- [x] Browser opens automatically (or open manually)
- [x] Homepage displays correctly
- [x] NutriVeda logo visible
- [x] Navigation menu works
- [x] 4 floating icons visible on right side
- [x] No console errors (F12 → Console tab)
- [x] All CSS loaded (no unstyled content)
- [x] All JavaScript loaded (icons clickable)

---

## 🔗 **Important URLs**

### **Local Development:**
- Homepage: http://localhost:8080
- Products: http://localhost:8080/pages/products.html
- Cart: http://localhost:8080/pages/cart.html
- Login: http://localhost:8080/pages/login.html

### **Alternative Localhost:**
- http://127.0.0.1:8080
- http://127.0.0.1:8080/pages/products.html

### **Network Access:**
- http://[YOUR_IP]:8080
- Example: http://192.168.0.6:8080

---

## 🚀 **Quick Start Summary**

### **Fastest Way to Run:**

```bash
# 1. Open terminal
# 2. Run this command:
cd c:\vs_workSpace\nutriveda-website && npx http-server nutriveda -p 8080 -o
```

**Done!** Application opens in browser automatically! 🎉

---

## 💡 **Pro Tips**

1. **Keep Terminal Open**
   - Server runs as long as terminal is open
   - Don't close terminal while using app

2. **Multiple Terminals**
   - Open new terminal for other commands
   - Keep server running in first terminal

3. **Auto-Refresh**
   - Use Live Server extension for auto-refresh
   - Or press Ctrl+R to refresh manually

4. **DevTools**
   - Press F12 to open DevTools
   - Check Console for errors
   - Check Network tab for file loading

5. **Hard Refresh**
   - Use `Ctrl+Shift+R` after code changes
   - Ensures latest files are loaded

---

## 📖 **Next Steps**

After running the application:

1. **Explore Features**
   - Test product catalog
   - Try all 3 view modes
   - Test chatbot
   - Browse products

2. **Test Responsiveness**
   - Resize browser window
   - Test on mobile (optional)
   - Check all breakpoints

3. **Review Documentation**
   - Read feature guides in project folder
   - Check COMPLETE_FEATURES_SUMMARY.md
   - Review DEPLOYMENT guides

4. **Prepare for Production**
   - Review PRODUCTION_DEPLOYMENT_GUIDE.md
   - Test all features thoroughly
   - Prepare files for upload

---

## ✅ **You're All Set!**

**To start the application right now:**

```bash
cd c:\vs_workSpace\nutriveda-website
npx http-server nutriveda -p 8080 -o
```

**Then:**
- Browser opens automatically to http://localhost:8080
- Test all features
- Enjoy your NutriVeda application!

---

**Last Updated:** June 25, 2026  
**Status:** ✅ READY TO RUN  
**Server:** http-server (npx)  
**Port:** 8080  
**Auto-Open:** YES  

🎉 **Happy Testing!** 🎉
