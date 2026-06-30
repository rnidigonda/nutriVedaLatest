/**
 * EmailJS Configuration for Production Email OTP
 * 
 * Setup Instructions:
 * 1. Create account at https://www.emailjs.com/
 * 2. Add email service (Gmail recommended)
 * 3. Create email template (see PRODUCTION_EMAIL_OTP_SETUP.md)
 * 4. Replace the values below with your actual keys
 */

const EMAILJS_CONFIG = {
  // Get from EmailJS Dashboard > Account > API Keys
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',  // Replace with your public key
  
  // Get from EmailJS Dashboard > Email Services
  SERVICE_ID: 'service_nutriveda',  // Replace with your service ID
  
  // Get from EmailJS Dashboard > Email Templates
  TEMPLATE_ID: 'template_otp_login',  // Replace with your template ID
  
  // Configuration status
  IS_CONFIGURED: false  // Set to true after adding real keys above
};

// Validate configuration
if (typeof window !== 'undefined' && !EMAILJS_CONFIG.IS_CONFIGURED) {
  console.warn('%c⚠️ EmailJS Not Configured', 'background: #f39c12; color: white; padding: 8px; font-size: 14px; border-radius: 5px;');
  console.log('To enable production email OTP:');
  console.log('1. Sign up at https://www.emailjs.com/');
  console.log('2. Get your API keys');
  console.log('3. Update emailjs-config.js with your keys');
  console.log('4. Read PRODUCTION_EMAIL_OTP_SETUP.md for detailed instructions');
}
