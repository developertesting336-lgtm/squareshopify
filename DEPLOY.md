# Deployment Guide

**Step-by-step instructions to deploy your payment app.**

---

## 📋 Before Deployment

You need:
- [ ] Node.js v16+ installed locally
- [ ] Shopify store access
- [ ] Square developer account
- [ ] All credentials ready
- [ ] `.env` file created and filled

---

## 🔑 Get Your Credentials

### Shopify Credentials

1. Go to: `https://admin.shopify.com/`
2. Settings → Apps and integrations
3. Click "Develop apps"
4. Create app: "Square Payments"
5. Go to Configuration tab
6. Copy **Client ID** and **Client Secret**

### Square Credentials

1. Go to: `https://developer.squareup.com/`
2. Login
3. Applications → Your App
4. Credentials tab
5. Copy:
   - **Access Token**
   - **Application ID**
   - **Application Secret**

---

## 🧪 Test Locally First

```bash
# 1. Install
npm install

# 2. Create .env
cp .env.example .env

# 3. Edit .env with your credentials

# 4. Test
npm run dev

# 5. In another terminal, test endpoint
curl http://localhost:8080/health
```

If `/health` returns JSON, everything works locally! ✅

---

## 🚀 Deploy (Pick ONE)

### OPTION A: Vercel (Easiest - Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. When prompted:
# - Link to existing project? No (first time)
# - Set project name? your-project-name
# - Framework? Other
# - Build command? Blank
# - Output directory? Blank
```

**Add Environment Variables:**

After deployment, go to:
1. Vercel dashboard
2. Your project → Settings → Environment Variables
3. Add each variable from your `.env`:
   - SHOPIFY_CLIENT_ID
   - SHOPIFY_CLIENT_SECRET
   - SHOPIFY_STORE_URL
   - SQUARE_ACCESS_TOKEN
   - SQUARE_APPLICATION_ID
   - SQUARE_APPLICATION_SECRET
   - SQUARE_ENVIRONMENT
   - NODE_ENV
   - PORT
4. Redeploy from Deployments tab

**Your URL:** `https://your-project-name.vercel.app`

---

### OPTION B: Heroku

```bash
# 1. Install Heroku CLI
# Mac: brew install heroku
# Windows: Download from heroku.com/download

# 2. Login
heroku login

# 3. Create app
heroku create your-unique-app-name

# 4. Add environment variables
heroku config:set SHOPIFY_CLIENT_ID=your_value
heroku config:set SHOPIFY_CLIENT_SECRET=your_value
heroku config:set SHOPIFY_STORE_URL=your_value
heroku config:set SQUARE_ACCESS_TOKEN=your_value
heroku config:set SQUARE_APPLICATION_ID=your_value
heroku config:set SQUARE_APPLICATION_SECRET=your_value
heroku config:set SQUARE_ENVIRONMENT=production
heroku config:set NODE_ENV=production

# 5. Deploy
git push heroku main
```

**Your URL:** `https://your-unique-app-name.herokuapp.com`

---

### OPTION C: AWS EC2 (Advanced)

```bash
# 1. Create EC2 Instance
# - AWS Console → EC2 → Instances → Launch
# - Ubuntu 20.04 LTS
# - t2.micro (free tier)
# - Security group: Allow ports 22, 80, 443

# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Clone code
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 5. Install dependencies
npm install

# 6. Create .env
nano .env
# Paste your environment variables
# Ctrl+X, Y, Enter to save

# 7. Install PM2 (process manager)
sudo npm install -g pm2

# 8. Start app
pm2 start index.js --name "shopify-square-payments"
pm2 startup
pm2 save

# 9. (Optional) Install Nginx as reverse proxy
sudo apt-get install -y nginx
# Configure /etc/nginx/sites-available/default to proxy to localhost:8080
```

**Your URL:** `http://your-instance-ip` (or custom domain)

---

## ✅ After Deployment

### 1. Test Deployed App
```bash
curl https://your-deployed-url/health
```

Should return JSON with "status": "healthy" ✅

### 2. Update Shopify Custom App

In Shopify Admin:
1. Settings → Apps and integrations → Develop apps → Your App
2. Configuration tab
3. Set **App URL**: `https://your-deployed-url`
4. Set **Redirect URL**: `https://your-deployed-url/api/payments/callback`
5. Save

### 3. Remove CartDNA

In Shopify Admin:
1. Apps and integrations
2. Find CartDNA
3. Click Remove/Uninstall
4. Confirm

### 4. Test Payment

1. Go to your Shopify store
2. Add product to cart
3. Checkout
4. Look for "Pay with Card" option
5. Make test payment

### 5. Verify in Square

1. Open Square Dashboard
2. Transactions tab
3. Look for your payment
4. Status should be **Completed**
5. Money in account ✅

---

## 🧪 Test Payment Endpoints

### Create Payment
```bash
curl -X POST https://your-deployed-url/api/payments/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "sourceId": "cnon_YOUR_SOURCE_ID",
    "orderId": "test_order",
    "description": "Test payment"
  }'
```

### Get Payment Status
```bash
curl https://your-deployed-url/api/payments/PAYMENT_ID
```

### Refund Payment
```bash
curl -X POST https://your-deployed-url/api/payments/PAYMENT_ID/refund \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "reason": "Test refund"
  }'
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` before deploying |
| "Port in use locally" | Change PORT in `.env` |
| "Credentials invalid" | Check values match your Shopify/Square accounts |
| "Deployment fails" | Check all env vars are set on hosting platform |
| "Payment endpoint 404" | Check your deployed URL is correct |
| "Payment fails in Square" | Verify Square environment is "production" |

---

## 📋 Deployment Checklist

Before going live:
- [ ] App deployed successfully
- [ ] Health endpoint responds: `/health`
- [ ] Environment variables set on hosting platform
- [ ] Shopify app URL updated
- [ ] CartDNA removed from Shopify
- [ ] Test payment successful
- [ ] Payment appears in Square dashboard
- [ ] Money visible in Square account

---

## 🎉 You're Live!

Once all checks pass:
1. ✅ Your Shopify store accepts Square payments
2. ✅ Customers can pay with cards
3. ✅ No CartDNA license needed
4. ✅ No recurring fees
5. ✅ Production ready!

---

## 📞 Need Help?

1. Check error messages in console/logs
2. Verify environment variables
3. Test locally first: `npm run dev`
4. Check hosting platform's deployment logs
5. Review code comments in `index.js`

---

**Deployment Time: 30 min - 2 hours**  
**Difficulty: Easy to Medium**  
**Success: Very High!** ✅
