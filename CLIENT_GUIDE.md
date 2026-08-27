# Client Guide - How to Use Shopify-Square Payment Integration

**A guide for your client (the Shopify store owner) on how to use this payment system.**

---

## 👥 Who is This For?

This guide is for your **store owner/client** who wants to:
- Accept credit card payments on their Shopify store
- Process payments through Square
- Stop using CartDNA (expensive license)
- No recurring monthly fees

---

## 🎯 Overview: What Your Client Gets

### Before (With CartDNA)
❌ CartDNA license required (costly)  
❌ Monthly subscription fees  
❌ Limited customization  
❌ Dependency on third-party app  

### After (With This Integration)
✅ Direct Square payment processing  
✅ No license fees  
✅ No recurring charges  
✅ Full control  
✅ Custom solution  

---

## 🚀 Setup Process (For Your Client)

### Phase 1: What You (Developer) Need

1. **Shopify Store Access**
   - Admin access to your Shopify store
   - Settings access

2. **Square Account**
   - Business account with Square
   - Developer access to generate credentials

3. **Your Deployed App URL**
   - After you deploy it, you'll give them a URL
   - Example: `https://your-app.vercel.app`

### Phase 2: Client Setup (What You Tell Them)

**Step 1: Create Shopify Custom App**

Tell your client:
```
1. Go to Shopify Admin
2. Settings → Apps and integrations
3. Click "Develop apps"
4. Create new app: "Square Payments"
5. Go to Configuration tab
6. Copy Client ID and Client Secret
7. Give these to you (the developer)
```

**Step 2: Provide Square Credentials**

Tell your client:
```
1. Go to developer.squareup.com
2. Login to their Square account
3. Go to Applications → Their App
4. Copy Credentials:
   - Access Token
   - Application ID
   - Application Secret
5. Give these to you (the developer)
```

**Step 3: You Deploy**

You (the developer):
```
1. Take their credentials
2. Deploy the app
3. Set up environment variables
4. Test the payment system
```

**Step 4: Remove CartDNA**

Tell your client:
```
1. Go to Shopify Admin
2. Apps and integrations
3. Find CartDNA
4. Click Remove/Uninstall
5. Confirm
```

---

## 👥 Customer Experience (How Customers Pay)

### Before Checkout
Customer adds products to cart → Clicks "Checkout"

### During Checkout
```
Shopify Checkout Page
    ↓
Customer sees payment options:
    • Square (your new payment method)
    • Other payment methods
    ↓
Customer clicks "Square"
    ↓
Your App Processes Payment
    ↓
Money goes to your Square account
    ↓
Order complete!
```

### What Customers See

1. **Add to Cart**
   - Customer adds products normally

2. **Checkout Page**
   - Standard Shopify checkout
   - "Square" payment option appears

3. **Payment Form**
   - Enter credit card details
   - Express payment options
   - Apple Pay / Google Pay (if configured)

4. **Confirmation**
   - Payment confirmed
   - Order receipt
   - Email confirmation

---

## 💰 How Payments Flow

```
Customer Payment
    ↓
Your App (verifies payment details)
    ↓
Square API (processes payment)
    ↓
Payment Confirmed
    ↓
Money → Client's Square Account
    ↓
Money → Client's Bank Account
    ↓ (per Square settlement schedule)
```

---

## 🔍 Tracking Payments

### Option 1: Square Dashboard

Your client can:
1. Go to `developer.squareup.com` (or `squareup.com`)
2. Login to their account
3. View all transactions
4. See payment status
5. Process refunds
6. Track money received

### Option 2: Your App Dashboard

Your client can:
1. Go to your deployed app
2. Check `/health` endpoint
3. See payment logs
4. (Optional: You can add a dashboard later)

### Option 3: Shopify Admin

Your client can:
1. Go to Shopify Admin
2. Orders section
3. See all orders with payments
4. Process refunds from Shopify if needed

---

## 💵 Money & Payments

### How Money Moves

```
Day 1: Customer pays → Square receives money
Day 2: Square holds money (fraud check)
Day 3-5: Money appears in client's bank account
```

**Settlement Time**: Typically 1-3 business days  
**Fees**: Standard Square processing fees apply (2.9% + $0.30 typical)

### What Client Pays

1. **Square Processing Fees**
   - Automatic deduction per transaction
   - Standard credit card processing rates

2. **Your Development Fee**
   - One-time: $250 (as agreed)

3. **Hosting Cost** (Optional)
   - Free tier: $0/month (Vercel free)
   - Paid tier: $0-50/month if needed

---

## 🧪 Testing Before Going Live

### Test Payment Process

1. **Create Test Order**
   - Add product to cart
   - Go to checkout
   - Click "Square" payment

2. **Use Test Card**
   - Card: `4532 0151 5928 8453`
   - Expiry: Any future date
   - CVC: Any 3 digits

3. **Check Square Dashboard**
   - Payment should appear
   - Status: "Completed" or "Pending"

4. **Verify in Shopify**
   - Order appears in orders list
   - Status shows payment received

---

## ✅ Checklist for Your Client

### Before Go-Live

- [ ] Shopify custom app created and credentials shared
- [ ] Square credentials shared with developer
- [ ] App deployed and tested
- [ ] CartDNA completely removed
- [ ] Test payment successful
- [ ] Payment appears in Square dashboard
- [ ] Refund tested (optional)
- [ ] Documentation reviewed

### After Go-Live

- [ ] Monitor first few payments
- [ ] Check Square dashboard daily
- [ ] Respond to customer payment issues
- [ ] Process refunds as needed
- [ ] Track money in bank account

---

## 🚨 What Can Go Wrong (And How to Fix)

### Problem: "Payment Option Doesn't Appear"

**Causes:**
- App not deployed
- Shopify app URL not configured
- CartDNA still active (interfering)
- Browser cache

**Solution:**
- Verify app URL in Shopify settings
- Remove CartDNA completely
- Clear browser cache (Ctrl+Shift+Del)
- Test with different browser

### Problem: "Payment Failed"

**Causes:**
- Incorrect credentials
- Square environment set to sandbox
- Square account not fully activated
- Network issue

**Solution:**
- Verify all credentials are correct
- Check Square environment is "production"
- Contact Square support if account issue
- Try payment again

### Problem: "Money Not Appearing"

**Causes:**
- Normal settlement delay (1-3 days)
- Fraud review by Square
- Insufficient funds in account
- Payment failed (but shows completed)

**Solution:**
- Wait 1-3 business days
- Check Square dashboard for holds
- Verify card processing limit
- Contact Square support

---

## 📞 How Client Reaches You

**What to Tell Your Client:**

```
"I've set up your Shopify-Square payment integration.

Here's what you need to know:

✓ Payments process through Square
✓ Money goes to your Square account
✓ No CartDNA license needed
✓ No recurring fees
✓ Customers can pay with cards

Payment Flow:
1. Customer adds items
2. Clicks checkout
3. Selects "Square" payment
4. Enters card details
5. Payment processed
6. Money in your account in 1-3 days

Questions or Issues?
- Check your Square dashboard first
- Contact me if problems persist
- I can help troubleshoot

You're all set to start accepting payments!
"
```

---

## 🎓 Training Your Client

### Quick Training (5 minutes)

Show your client:
1. **Shopify Admin** - Where to see orders
2. **Square Dashboard** - Where to see payments
3. **How to Process Refunds**
4. **Who to Contact if Issues**

### Full Training (15 minutes)

Also cover:
1. **Payment Settings** - How they work
2. **Settlement** - When money arrives
3. **Troubleshooting** - Common issues
4. **Support** - How to get help

---

## 📚 Documentation to Share

Give your client these files:
- `README.md` - Overview
- `CLIENT_GUIDE.md` - This file
- Support contact info

---

## 🎉 Expected Results

After everything is set up:

✓ Customers can pay with cards  
✓ Payments process immediately  
✓ Money in Square account in 1-3 days  
✓ No CartDNA fees  
✓ No recurring charges  
✓ Full control  
✓ Easy to use  

---

## 💡 Optional Enhancements (Later)

Your client can request:
- Payment dashboard
- Email notifications
- Advanced analytics
- Subscription payments
- Multiple payment methods

(You can add these later if needed)

---

## 📞 Support

**For Questions:**
- Direct your client to their Square account support
- Refer to Square documentation
- Contact you (the developer) for app-specific issues

**Your Contact Info:**
```
Email: [your-email]
Phone: [your-phone]
Hours: [your-hours]
```

---

## ✅ Final Checklist

Client has:
- [ ] Understanding of how it works
- [ ] Square account access
- [ ] Shopify store access
- [ ] Your contact information
- [ ] Documentation
- [ ] Payment system tested

---

**Your client is now ready to accept payments!** 🎉

No CartDNA. No fees. Just Square payments on their Shopify store.
