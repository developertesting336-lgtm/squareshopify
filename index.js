/**
 * SHOPIFY-SQUARE PAYMENT INTEGRATION
 * Process Square payments from Shopify checkout
 * Production Ready - No Database Required
 */

import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// ============================================
// CONFIGURATION & VALIDATION
// ============================================

const app = express();
const PORT = process.env.PORT || 8080;

// Validate required environment variables
const requiredEnvVars = [
  'SQUARE_ACCESS_TOKEN',
  'SQUARE_ENVIRONMENT',
  'SHOPIFY_CLIENT_ID',
  'SHOPIFY_CLIENT_SECRET',
  'SHOPIFY_STORE_URL',
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Square API configuration
const SQUARE_API_URL = process.env.SQUARE_ENVIRONMENT === 'production'
  ? 'https://squareup.com/v2'
  : 'https://sandbox.squareup.com/v2';

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

console.log('Square API initialized:', {
  environment: process.env.SQUARE_ENVIRONMENT,
  url: SQUARE_API_URL
});

// Helper function to make Square API calls
async function squareApiCall(method, path, body = null) {
  const url = `${SQUARE_API_URL}${path}`;

  const options = {
    method: method,
    headers: {
      'Square-Version': '2024-01-18',
      'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, body: data };
  } catch (error) {
    throw error;
  }
}

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// 1. Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Shopify-Square Payment Integration',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 2. Root/Info Endpoint
app.get('/', (req, res) => {
  res.json({
    app: 'Shopify-Square Payment Integration',
    version: '1.0.0',
    status: 'running',
    description: 'Process Square payments from Shopify checkout',
    endpoints: {
      health: 'GET /health',
      createPayment: 'POST /api/payments/create',
      getPayment: 'GET /api/payments/:paymentId',
      refundPayment: 'POST /api/payments/:paymentId/refund',
    },
  });
});

// 3. CREATE PAYMENT
app.post('/api/payments/create', async (req, res) => {
  try {
    const { amount, sourceId, orderId, description } = req.body;

    // Validation
    if (!amount || !sourceId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, sourceId',
      });
    }

    // Prepare payment body
    const paymentBody = {
      source_id: sourceId,
      idempotency_key: uuidv4(),
      amount_money: {
        amount: parseInt(amount),
        currency: 'USD',
      },
      note: description || 'Shopify Purchase',
    };

    if (orderId) {
      paymentBody.reference_id = orderId;
    }

    console.log('Processing payment:', { amount, orderId });

    // Create payment through Square API
    const { status, body: data } = await squareApiCall('POST', '/payments', paymentBody);

    if (status !== 200) {
      const errorDetail = data.errors?.[0]?.detail || JSON.stringify(data);
      throw new Error(`Square API error (${status}): ${errorDetail}`);
    }

    const payment = data.payment;

    console.log('✓ Payment created:', payment.id);

    res.json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount_money.amount,
      currency: payment.amount_money.currency,
      receiptUrl: payment.receipt_url || null,
      timestamp: payment.created_at,
    });
  } catch (error) {
    console.error('❌ Payment creation failed:', error.message);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// 4. GET PAYMENT STATUS
app.get('/api/payments/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        error: 'Payment ID is required',
      });
    }

    console.log('Fetching payment:', paymentId);

    const response = await fetch(`${SQUARE_API_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || 'Failed to get payment');
    }

    const payment = data.payment;

    res.json({
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount_money.amount,
      currency: payment.amount_money.currency,
      created: payment.created_at,
      receiptUrl: payment.receipt_url || null,
    });
  } catch (error) {
    console.error('❌ Failed to get payment:', error.message);
    res.status(400).json({
      error: error.message,
    });
  }
});

// 5. REFUND PAYMENT
app.post('/api/payments/:paymentId/refund', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { amount, reason } = req.body;

    // Validation
    if (!paymentId || !amount) {
      return res.status(400).json({
        error: 'Payment ID and amount are required',
      });
    }

    // Prepare refund body
    const refundBody = {
      idempotency_key: uuidv4(),
      payment_id: paymentId,
      amount_money: {
        amount: parseInt(amount),
        currency: 'USD',
      },
      reason: reason || 'Customer Refund',
    };

    console.log('Processing refund:', { paymentId, amount });

    // Process refund through Square API
    const response = await fetch(`${SQUARE_API_URL}/refunds`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refundBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || 'Refund failed');
    }

    const refund = data.refund;

    console.log('✓ Refund processed:', refund.id);

    res.json({
      success: true,
      refundId: refund.id,
      status: refund.status,
      amount: refund.amount_money.amount,
    });
  } catch (error) {
    console.error('❌ Refund failed:', error.message);
    res.status(400).json({
      error: error.message,
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message,
  });
});

// ============================================
// SERVER STARTUP
// ============================================

const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║   Shopify-Square Payment Integration         ║');
  console.log('║   ✓ Server Started Successfully              ║');
  console.log(`║   ✓ Port: ${PORT.toString().padEnd(41)} ║`);
  console.log(`║   ✓ Environment: ${(process.env.NODE_ENV || 'development').padEnd(33)} ║`);
  console.log(`║   ✓ Square: ${(process.env.SQUARE_ENVIRONMENT || 'sandbox').padEnd(39)} ║`);
  console.log('║   ✓ Ready to process payments                ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');
  console.log('Available Endpoints:');
  console.log('  GET  /health');
  console.log('  POST /api/payments/create');
  console.log('  GET  /api/payments/:paymentId');
  console.log('  POST /api/payments/:paymentId/refund');
  console.log('');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
