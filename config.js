// Production Configuration
const CONFIG = {
  // API Configuration - Update these with your backend URLs
  API_BASE_URL: 'https://your-api-gateway-url.execute-api.ap-south-1.amazonaws.com',
  
  // Feature Flags
  ENABLE_SMS_OTP: false, // Set to true when backend is ready
  DEMO_MODE: false, // Set to false for production

  // Razorpay Payment Configuration
  // PAYMENT_API_BASE_URL: base URL of the deployed Vercel functions (no trailing slash)
  // e.g. 'https://nutriveda-payment-api.vercel.app'
  PAYMENT_API_BASE_URL: 'https://your-payment-api.vercel.app',
  RAZORPAY_KEY_ID: 'rzp_test_TJjdoZbGQUSLfO', // Public Key ID — safe to expose in frontend
  
  // Contact Information
  CONTACT: {
    phone: '+917893639037',
    whatsapp: '917893639037',
    email: 'customercare.nutriveda@gmail.com',
    address: 'H.No: 12, Tiwari Nagar, Near Miyapur Police Station, Chandanagar, Hyderabad — 500049'
  },
  
  // Web3Forms Configuration
  WEB3FORMS_ACCESS_KEY: '24de3265-5fbc-4746-9d9a-c0bb2064ecc5',
  
  // Business Hours
  BUSINESS_HOURS: 'Mon – Sat: 9:00 AM – 7:00 PM',
  
  // Razorpay Configuration
  RAZORPAY: {
    KEY_ID: 'rzp_test_TJjdoZbGQUSLfO',
    // API base URL for payment backend (Vercel deployment)
    API_URL: 'https://nutriveda-pay.vercel.app'
  },

  // Cache Version (increment when updating assets)
  VERSION: '6'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
