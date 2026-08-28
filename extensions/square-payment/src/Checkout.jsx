import '@shopify/ui-extensions/preact';
import {render} from "preact";

// Export the extension using Square payment
export default async () => {
  render(<SquarePaymentExtension />, document.body)
};

function SquarePaymentExtension() {
  const handleSquarePayment = async () => {
    try {
      const response = await fetch(
        'https://squareshopify.vercel.app/api/payments/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 1000,
            sourceId: 'cnon_card_4532015159288453',
            orderId: 'order_' + Date.now(),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert('✅ Payment Successful! ID: ' + data.paymentId);
      } else {
        alert('❌ Payment Failed: ' + data.error);
      }
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <s-box>
      <s-banner heading="💳 Square Payment" tone="success">
        <s-stack gap="base">
          <s-text>Secure payment processing</s-text>
          <s-button onClick={handleSquarePayment}>
            Complete Payment with Square
          </s-button>
        </s-stack>
      </s-banner>
    </s-box>
  );
}
