// Vercel Serverless Function: Create Razorpay Order
// POST /api/create-order
// Body: { cart: [{ id, qty }], cod: boolean }

const Razorpay = require('razorpay');

// Product prices (server-side source of truth — never trust client amounts)
const PRODUCT_PRICES = {1:1299,2:1099,3:699,4:549,5:549,6:449,7:649,8:449,9:1399,10:349,11:399,12:549,13:1399,14:799,15:489,16:299,17:479,18:329,19:199,20:279,21:619,22:1449,23:379,24:999,25:259,26:599,27:499,28:419,29:519,30:499,31:749,32:299,33:199,34:189,35:199,36:229,37:199,38:1111,39:179,40:299,41:279,42:199,43:199,44:999,45:349,46:149,47:199,48:119,49:249,50:119,51:249,52:149,53:99,54:219,55:299,56:299,57:149,58:299,59:199,60:199,61:199,62:259,63:229,64:249,65:249,66:189};

const ALLOWED_ORIGINS = [
  'https://nutriveda.shop',
  'https://www.nutriveda.shop',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const headers = getCorsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cart, cod } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid' });
    }

    // Calculate total from server-side prices (never trust client)
    let subtotal = 0;
    for (const item of cart) {
      const price = PRODUCT_PRICES[item.id];
      if (!price) {
        return res.status(400).json({ error: `Invalid product ID: ${item.id}` });
      }
      if (!item.qty || item.qty < 1 || item.qty > 10) {
        return res.status(400).json({ error: `Invalid quantity for product ${item.id}` });
      }
      subtotal += price * item.qty;
    }

    const shipping = subtotal >= 999 ? 0 : 79;
    const codFee = cod ? 40 : 0;
    const total = subtotal + shipping + codFee;

    // Amount in paise (Razorpay expects smallest currency unit)
    const amountInPaise = total * 100;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: 'NV' + Date.now().toString().slice(-8),
      notes: {
        item_count: cart.length.toString(),
        subtotal: subtotal.toString(),
        shipping: shipping.toString(),
        cod_fee: codFee.toString()
      }
    });

    return res.status(200).json({
      orderId: order.id,
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.receipt,
      total: total
    });

  } catch (error) {
    console.error('Create order error:', error.message || error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ 
      error: 'Failed to create order. Please try again.',
      debug: {
        hasKeyId: !!process.env.RAZORPAY_KEY_ID,
        hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
        keyIdPrefix: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.substring(0, 12) + '...' : 'NOT SET',
        errorMessage: error.error ? error.error.description : error.message
      }
    });
  }
};
