# Square Payment Checkout Extension Setup

## What This Does

Adds a **"Square Payment"** button to the Shopify checkout that customers can click to pay with Square.

---

## Installation Steps

### Step 1: Install Shopify CLI (if not already installed)

```bash
npm install -g @shopify/cli
```

### Step 2: Navigate to Your Project

```bash
cd D:\SahilThakur\shopifyproject\newproject
```

### Step 3: Initialize the Extension

The extension files are already created in:
```
extensions/square-payment/
```

### Step 4: Deploy the Extension

```bash
shopify app deploy
```

This will:
- Build the extension
- Upload to Shopify
- Make it active on your app

---

## How It Works

1. **At Checkout**: Customer sees "Square Payment" option
2. **Click Button**: Opens payment processing modal
3. **Process Payment**: Calls your backend API at `/api/payments/create`
4. **Confirm**: Shows success/error message

---

## File Structure

```
extensions/square-payment/
├── shopify.extension.toml     # Extension configuration
├── package.json               # Dependencies
└── src/
    └── Checkout.jsx          # Payment component
```

---

## Configuration

The extension currently has:
- ✅ Square Payment button
- ✅ Payment selection checkbox
- ✅ Backend API integration
- ✅ Error handling
- ✅ Loading state

---

## Next Steps

1. **Deploy the extension**:
   ```bash
   shopify app deploy
   ```

2. **Test at checkout**:
   - Go to your store
   - Add product to cart
   - Go to checkout
   - Look for "Square Payment" option
   - Click and test

3. **Troubleshoot if needed**:
   - Check Shopify app logs
   - Verify backend API is running
   - Check browser console for errors

---

## Testing the Extension

Test with Shopify's test card:
- Card: `4532 0151 5928 8453`
- Expiry: `12/25`
- CVC: `123`

---

## Troubleshooting

**"Extension not showing"**
- Make sure you ran `shopify app deploy`
- Check app is installed on your store
- Clear browser cache

**"Payment fails"**
- Check Vercel app is running
- Verify credentials in environment variables
- Check browser console for error messages

---

For more info: https://shopify.dev/docs/api/checkout-ui-extensions
