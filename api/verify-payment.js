// Vercel Serverless Function: Verify Razorpay Payment Signature
// POST /api/verify-payment
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }

const crypto = require('crypto');

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification parameters' });
    }

    // Verify signature using HMAC SHA256
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      return res.status(200).json({
        verified: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      return res.status(400).json({
        verified: false,
        error: 'Payment signature verification failed'
      });
    }

  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ error: 'Payment verification failed. Please contact support.' });
  }
};
