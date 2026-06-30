# Contact Form EmailJS Template Setup

## Overview
The contact form now uses **EmailJS** (same as login OTP) to send enquiry emails directly to `customercare.nutriveda@gmail.com`.

✅ **Benefits:**
- Full control over recipient email
- No need for Web3Forms dashboard
- Consistent with login OTP system
- Professional email templates

---

## Step-by-Step Setup

### 1. Login to EmailJS Dashboard
- Go to: https://dashboard.emailjs.com/
- Login with your existing account

### 2. Create New Email Template

1. **Click**: "Email Templates" in left sidebar
2. **Click**: "Create New Template" button
3. **Template Name**: `Contact Form Enquiry`
4. **Template ID**: `template_contact_form` (MUST BE EXACTLY THIS)

### 3. Configure Template Content

Copy and paste this template content:

---

**Subject Line:**
```
New Enquiry from {{from_name}} - NutriVeda Website
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #2d5a3d, #3d7a52);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      padding: 15px;
      background: white;
      border-left: 4px solid #2d5a3d;
      border-radius: 4px;
    }
    .field-label {
      font-weight: bold;
      color: #2d5a3d;
      margin-bottom: 5px;
      display: block;
    }
    .field-value {
      color: #333;
      font-size: 15px;
    }
    .message-box {
      background: white;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Customer Enquiry</h1>
      <p style="margin: 5px 0 0 0; font-size: 14px;">NutriVeda Website Contact Form</p>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="field-label">👤 Customer Name:</span>
        <span class="field-value">{{from_name}}</span>
      </div>
      
      <div class="field">
        <span class="field-label">📧 Email Address:</span>
        <span class="field-value">{{from_email}}</span>
      </div>
      
      <div class="field">
        <span class="field-label">📞 Phone Number:</span>
        <span class="field-value">+91 {{phone}}</span>
      </div>
      
      <div class="field">
        <span class="field-label">🏷️ Product Interest:</span>
        <span class="field-value">{{product_interest}}</span>
      </div>
      
      <div class="message-box">
        <span class="field-label">💬 Message:</span>
        <p class="field-value" style="margin: 10px 0 0 0; white-space: pre-wrap;">{{message}}</p>
      </div>
      
      <div class="footer">
        <p><strong>Action Required:</strong> Please respond to this enquiry within 24 hours.</p>
        <p style="margin: 10px 0 0 0;">Reply directly to: <strong>{{from_email}}</strong></p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

### 4. Configure Template Settings

**Important Settings:**

1. **To Email**: `{{to_email}}`
   - This allows dynamic recipient (will be customercare.nutriveda@gmail.com)

2. **From Name**: `NutriVeda Website`

3. **Reply To**: `{{reply_to}}`
   - This will be the customer's email, so you can reply directly

4. **Subject**: `New Enquiry from {{from_name}} - NutriVeda Website`

### 5. Template Variables Used

The code sends these variables:
- `{{to_email}}` - Always: customercare.nutriveda@gmail.com
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone number
- `{{product_interest}}` - Selected product category
- `{{message}}` - Customer's message
- `{{reply_to}}` - Customer's email (for reply-to)

### 6. Save Template

1. **Click "Save"** button
2. **Verify Template ID**: Must be exactly `template_contact_form`
3. **Test**: Send a test email to verify it works

---

## Testing the Contact Form

After creating the template:

1. **Wait 2-3 minutes** for GitHub Pages to rebuild
2. **Go to**: https://nutriveda.shop/index.html#contact
3. **Fill out the form** with test data
4. **Click "Send Enquiry"**
5. **Check**: customercare.nutriveda@gmail.com inbox

---

## Sample Email Preview

When a customer fills the form, you'll receive an email like this:

```
Subject: New Enquiry from Ravindar - NutriVeda Website

📧 New Customer Enquiry
NutriVeda Website Contact Form

👤 Customer Name: Ravindar
📧 Email Address: nidigondaravindar@gmail.com
📞 Phone Number: +91 7893639037
🏷️ Product Interest: Healthy Snacks

💬 Message:
Please share details about your new protein powder range. 
I'm looking for plant-based options.

Action Required: Please respond to this enquiry within 24 hours.
Reply directly to: nidigondaravindar@gmail.com
```

---

## Troubleshooting

### Error: "Template not found"
- Verify Template ID is exactly: `template_contact_form`
- Check template is saved and active
- Refresh EmailJS dashboard

### Emails not arriving
- Check spam folder in customercare.nutriveda@gmail.com
- Verify EmailJS service is connected and active
- Check EmailJS dashboard for error logs

### Form submission fails
- Open browser console (F12) to see error
- Verify EmailJS config in `emailjs-config.js`
- Check internet connection

---

## What Changed?

### Before (Web3Forms):
- ❌ Emails went to nidigondaravindar@gmail.com
- ❌ Recipient controlled by Web3Forms dashboard
- ❌ Required separate service

### After (EmailJS):
- ✅ Emails go to customercare.nutriveda@gmail.com
- ✅ Full control over templates and design
- ✅ Same system as login OTP (consistent)
- ✅ Professional HTML email templates

---

## Important Notes

1. **Template ID MUST be**: `template_contact_form` (exact match)
2. **Service ID**: `service_i7o0wsp` (already configured)
3. **Public Key**: `q9iLRAFk-h5pK4c-Y` (already configured)
4. All enquiries will go to: **customercare.nutriveda@gmail.com**
5. Reply-to will be set to customer's email for easy responses

---

## Support

If you need help:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. View error logs in browser console (F12)
3. Contact me with the error message

---

**Last Updated**: 2026-06-30
**Status**: ✅ Code deployed, awaiting template creation
