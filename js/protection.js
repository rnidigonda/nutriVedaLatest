// ========================================
// NutriVeda Code Protection Script
// Protects against casual copying and code theft
// ========================================

(function() {
  'use strict';
  
  // ========================================
  // 1. DISABLE RIGHT-CLICK
  // ========================================
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showProtectionMessage('Right-click is disabled');
    return false;
  });
  
  // ========================================
  // 2. DISABLE TEXT SELECTION
  // ========================================
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // ========================================
  // 3. DISABLE KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener('keydown', function(e) {
    // F12 - Developer Tools
    if (e.keyCode === 123) {
      e.preventDefault();
      showProtectionMessage('Developer tools are disabled');
      return false;
    }
    
    // Ctrl+Shift+I - Inspect Element
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      showProtectionMessage('Inspect element is disabled');
      return false;
    }
    
    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      showProtectionMessage('Console is disabled');
      return false;
    }
    
    // Ctrl+Shift+C - Inspect Element (alternate)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      showProtectionMessage('Inspect element is disabled');
      return false;
    }
    
    // Ctrl+U - View Source
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      showProtectionMessage('View source is disabled');
      return false;
    }
    
    // Ctrl+S - Save Page
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      showProtectionMessage('Saving page is disabled');
      return false;
    }
    
    // Ctrl+A - Select All (except in input fields)
    if (e.ctrlKey && e.keyCode === 65) {
      if (e.target.tagName !== 'INPUT' && 
          e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        showProtectionMessage('Select all is disabled');
        return false;
      }
    }
    
    // Ctrl+C - Copy (except in input fields)
    if (e.ctrlKey && e.keyCode === 67) {
      if (e.target.tagName !== 'INPUT' && 
          e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        showProtectionMessage('Copying is disabled');
        return false;
      }
    }
  });
  
  // ========================================
  // 4. DETECT DEVELOPER TOOLS
  // ========================================
  let devtoolsOpen = false;
  const threshold = 160;
  
  setInterval(function() {
    // Check if devtools is open by comparing window size
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        handleDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);
  
  function handleDevToolsOpen() {
    // Redirect to blank page or show warning
    if (confirm('Developer tools detected. This site is protected. Click OK to continue browsing, or Cancel to leave.')) {
      // User clicked OK, allow them to continue
      console.clear();
    } else {
      // User clicked Cancel, redirect away
      window.location.href = 'about:blank';
    }
  }
  
  // ========================================
  // 5. DISABLE DRAG AND DROP
  // ========================================
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
  
  // ========================================
  // 6. CLEAR CONSOLE PERIODICALLY
  // ========================================
  setInterval(function() {
    console.clear();
  }, 5000);
  
  // ========================================
  // 7. PROTECT IMAGES
  // ========================================
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });
      images[i].setAttribute('draggable', 'false');
    }
  });
  
  // ========================================
  // 8. DETECT AUTOMATION TOOLS
  // ========================================
  if (navigator.webdriver) {
    console.log('Automation detected');
    // Optional: redirect or show warning
  }
  
  // ========================================
  // 9. SHOW PROTECTION MESSAGE
  // ========================================
  function showProtectionMessage(message) {
    // Show a subtle message
    const existingMsg = document.getElementById('protection-message');
    if (existingMsg) {
      existingMsg.remove();
    }
    
    const msg = document.createElement('div');
    msg.id = 'protection-message';
    msg.textContent = message;
    msg.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2d5a3d;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(msg);
    
    setTimeout(function() {
      msg.style.animation = 'slideOut 0.3s ease';
      setTimeout(function() {
        msg.remove();
      }, 300);
    }, 2000);
  }
  
  // ========================================
  // 10. ADD CSS ANIMATIONS
  // ========================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    
    /* Disable text selection via CSS */
    * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    /* Allow selection in input fields */
    input, textarea {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
    
    /* Disable image dragging */
    img {
      -webkit-user-drag: none;
      -moz-user-drag: none;
      -ms-user-drag: none;
      user-drag: none;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
  
  // ========================================
  // 11. CONSOLE WARNING
  // ========================================
  console.log('%c⚠️ WARNING', 'color: red; font-size: 40px; font-weight: bold;');
  console.log('%cThis is a browser feature intended for developers.', 'font-size: 16px;');
  console.log('%cIf someone told you to copy-paste something here, it is a scam.', 'font-size: 16px; color: red;');
  console.log('%cPasting code here can compromise your account security.', 'font-size: 16px; color: red;');
  console.log('%c\nNutriVeda © 2025 - All Rights Reserved', 'font-size: 14px; color: #2d5a3d; font-weight: bold;');
  
})();
