# Shopify-Square Payment Integration

**Process Square payments directly from your Shopify checkout!**

---

## 🎯 Overview

This is a complete, production-ready Node.js application that enables Square payments on your Shopify store.

- ✅ **Customers** can pay with credit/debit cards at Shopify checkout
- ✅ **Payments** process through Square
- ✅ **Money** goes directly to your Square account
- ✅ **No CartDNA** license needed
- ✅ **No recurring fees**
- ✅ **Production ready**

---

## 📋 Requirements

- Node.js v16+
- npm or yarn
- Shopify store access
- Square developer account

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Configuration
```bash
cp .env.example .env
```

### 3. Add Your Credentials
Edit `.env` with your Shopify and Square credentials.

### 4. Test Locally
```bash
npm run dev
```

Test endpoint:
```bash
curl http://localhost:8080/health
```

---

## 📊 API Endpoints

### 1. Health Check
```
GET /health
```
Returns: Server status and uptime

### 2. Create Payment
```
POST /api/payments/create

Body:
{
  "amount": 2999,              // Amount in cents (29.99 = 2999)
  "sourceId": "cnon_xxxxx",    // Square payment source token
  "orderId": "order_123",      // Your order ID (optional)
  "description": "Purchase"    // Payment description (optional)
}

Response:
{
  "success": true,
  "paymentId": "PAYMENT_ID",
  "status": "COMPLETED",
  "amount": 2999,
  "currency": "USD"
}
```

### 3. Get Payment Status
```
GET /api/payments/:paymentId

Response:
{
  "paymentId": "PAYMENT_ID",
  "status": "COMPLETED",
  "amount": 2999,
  "currency": "USD",
  "created": "2024-01-15T..."
}
```

### 4. Refund Payment
```
POST /api/payments/:paymentId/refund

Body:
{
  "amount": 2999,
  "reason": "Customer requested refund"
}

Response:
{
  "success": true,
  "refundId": "REFUND_ID",
  "status": "COMPLETED",
  "amount": 2999
}
```

---

## 🔑 Environment Variables

```env
# Shopify (get from Shopify Admin)
SHOPIFY_CLIENT_ID=your_value
SHOPIFY_CLIENT_SECRET=your_value
SHOPIFY_STORE_URL=your-store.myshopify.com

# Square (get from developer.squareup.com)
SQUARE_ACCESS_TOKEN=your_value
SQUARE_APPLICATION_ID=your_value
SQUARE_APPLICATION_SECRET=your_value

# Configuration
SQUARE_ENVIRONMENT=production  # or "sandbox" for testing
NODE_ENV=production
PORT=8080
```

---

## 💻 Development

### Start Development Server
```bash
npm run dev
```
Automatically restarts on file changes (using nodemon).

### Production Server
```bash
npm start
```

---

## 🚀 Deployment

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Heroku
```bash
heroku create your-app-name
heroku config:set SHOPIFY_CLIENT_ID=value
heroku config:set SHOPIFY_CLIENT_SECRET=value
heroku config:set SHOPIFY_STORE_URL=value
heroku config:set SQUARE_ACCESS_TOKEN=value
heroku config:set SQUARE_APPLICATION_ID=value
heroku config:set SQUARE_APPLICATION_SECRET=value
heroku config:set SQUARE_ENVIRONMENT=production
git push heroku main
```

### Option 3: Your Own Server
1. Install Node.js
2. Clone this repository
3. Run `npm install`
4. Create `.env` file with credentials
5. Run `npm start`

---

## 🧪 Testing

### Test Payment Creation
```bash
curl -X POST http://localhost:8080/api/payments/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "sourceId": "cnon_YOUR_SOURCE_ID",
    "orderId": "test_order",
    "description": "Test payment"
  }'
```

### Test Payment Status
```bash
curl http://localhost:8080/api/payments/PAYMENT_ID
```

### Test Refund
```bash
curl -X POST http://localhost:8080/api/payments/PAYMENT_ID/refund \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "reason": "Test refund"
  }'
```

---

## 🔒 Security

- ✅ No hardcoded secrets
- ✅ All credentials in `.env` (never commit!)
- ✅ HTTPS ready for production
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive data
- ✅ Proper logging without exposing secrets

---

## 📁 Project Structure

```
newproject/
├── index.js           ← Main application (all-in-one)
├── package.json       ← Dependencies
├── .env.example       ← Configuration template
├── .gitignore         ← Git rules
└── README.md          ← This file
```

**Everything is in one file!** Easy to understand and deploy.

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "Port 8080 in use" | Change PORT in `.env` |
| "Missing env vars" | Check all required variables in `.env` |
| "Square auth failed" | Verify credentials are correct from developer.squareup.com |
| "Payment fails" | Check amount is in cents (e.g., 29.99 = 2999) |

---

## 📈 Features

✅ **Create Payments** - Process payments via Square API  
✅ **Refund Payments** - Issue refunds to customers  
✅ **Check Status** - Get payment status  
✅ **Error Handling** - Comprehensive error handling  
✅ **Logging** - All actions logged  
✅ **Production Ready** - Deploy immediately  

---

## 📞 Support

For issues:
1. Check the troubleshooting section above
2. Review code comments in `index.js`
3. Check console output for error messages
4. Verify all environment variables are set correctly

---

## 📄 License

MIT

---

## 🎉 Ready to Deploy!

1. Configure with your credentials
2. Test locally: `npm run dev`
3. Deploy using your preferred platform
4. Start processing payments!

**Questions?** Check the code comments in `index.js` - everything is documented!
