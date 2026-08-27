import React, { useState } from 'react';
import {
  reactExtension,
  Checkbox,
  Button,
  TextBlock,
  InlineLayout,
  BlockStack,
  PaymentMethodResumeContainer,
} from '@shopify/checkout-ui-extensions-react';

const checkoutExtension = reactExtension(
  'purchase.checkout.payment-method.render-after',
  () => <SquarePayment />,
);

function SquarePayment() {
  const [isSelected, setIsSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSquarePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Call your backend payment creation API
      const response = await fetch(
        'https://squareshopify.vercel.app/api/payments/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 1000, // amount in cents (will be replaced with actual cart total)
            currency: 'USD',
            sourceId: 'cnon:cbcc_sg7c6bcf93c3c4d02b5f8a3e8f8f8f8f', // test source
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      console.log('Payment successful:', data);

      // Show success message
      setError(null);
      alert('Payment processed successfully!');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentMethodResumeContainer>
      <BlockStack spacing="tight">
        <InlineLayout
          spacing="base"
          blockAlignment="center"
        >
          <Checkbox
            onChange={() => setIsSelected(!isSelected)}
            checked={isSelected}
          />
          <TextBlock>Square Payment</TextBlock>
        </InlineLayout>

        {isSelected && (
          <BlockStack spacing="base" padding="base">
            <TextBlock>
              Pay securely with Square. Your payment is encrypted and safe.
            </TextBlock>

            {error && (
              <TextBlock appearance="error">
                {error}
              </TextBlock>
            )}

            <Button
              onClick={handleSquarePayment}
              disabled={isProcessing}
              loading={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay with Square'}
            </Button>
          </BlockStack>
        )}
      </BlockStack>
    </PaymentMethodResumeContainer>
  );
}

export default checkoutExtension;
