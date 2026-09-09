import './Congrats.css';

export default function Congrats({ shippingInfo, orderId, onContinueShopping }) {
  return (
    <div className="cg-container">
      <div className="cg-card">
        <div className="cg-check-circle">✓</div>
        <h1 className="cg-heading">Order Confirmed!</h1>
        <p className="cg-subheading">Your order has been placed successfully.</p>

        {orderId && <p className="cg-order-id">Order ID: <strong>{orderId}</strong></p>}

        {shippingInfo && (
          <p className="cg-details">
            Thank you, <strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong>!<br />
            A confirmation will be sent to <strong>{shippingInfo.email}</strong>.
          </p>
        )}

        <div className="cg-badge">
          <span>🚚</span>
          <span>Cash on Delivery — pay when your order arrives.</span>
        </div>

        <button onClick={onContinueShopping} className="cg-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
