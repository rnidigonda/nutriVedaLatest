// Production Configuration
const CONFIG = {
  // API Configuration - Update these with your backend URLs
  API_BASE_URL: 'https://your-api-gateway-url.execute-api.ap-south-1.amazonaws.com',
  
  // Feature Flags
  ENABLE_SMS_OTP: false, // Set to true when backend is ready
  DEMO_MODE: false, // Set to false for production
  
  // Contact Information
  CONTACT: {
    phone: '+917893639037',
    whatsapp: '917893639037',
    email: 'customercare@nutriveda.com',
    address: 'H.No: 12, Tiwari Nagar, Near Miyapur Police Station, Chandanagar, Hyderabad — 500049'
  },
  
  // Web3Forms Configuration
  WEB3FORMS_ACCESS_KEY: '24de3265-5fbc-4746-9d9a-c0bb2064ecc5',
  
  // Business Hours
  BUSINESS_HOURS: 'Mon – Sat: 9:00 AM – 7:00 PM',
  
  // Cache Version (increment when updating assets)
  VERSION: '5'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
