import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrderHistory } from '../../context/OrderHistoryContext';
import './Payment.css';

export default function Payment({ shippingInfo, onBack, onBackToCheckout, onPlaceOrder }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  function handlePlaceOrder() {
    const order = addOrder({ cartItems, cartTotal, shippingInfo, paymentMethod });
    clearCart();
    onPlaceOrder({ paymentMethod, shippingInfo, orderId: order.id });
  }

  return (
    <div className="pay-page">
      <div className="pay-breadcrumb">
        <button onClick={onBack} className="pay-bc-link">Home</button>
        <span className="pay-bc-sep">/</span>
        <button className="pay-bc-link pay-bc-disabled" disabled>Cart</button>
        <span className="pay-bc-sep">/</span>
        <button onClick={onBackToCheckout} className="pay-bc-link">Checkout</button>
        <span className="pay-bc-sep">/</span>
        <span className="pay-bc-current">Payment</span>
      </div>

      <h2 className="pay-page-title">Payment</h2>

      <div className="pay-layout">
        <div className="pay-left">
          <section className="pay-section">
            <h3 className="pay-section-title">Payment Method</h3>
            <label className="pay-radio-label">
              <input
                type="radio" name="paymentMethod" value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="pay-radio-input"
              />
              <div className="pay-radio-content">
                <span className="pay-radio-title">Cash on Delivery (COD)</span>
                <span className="pay-radio-desc">Pay with cash when your order arrives.</span>
              </div>
            </label>
          </section>

          {shippingInfo && (
            <section className="pay-section">
              <h3 className="pay-section-title">Shipping To</h3>
              <p className="pay-addr">{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p className="pay-addr">{shippingInfo.address}</p>
              <p className="pay-addr">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
              <p className="pay-addr">{shippingInfo.country}</p>
              <p className="pay-addr">{shippingInfo.email}</p>
            </section>
          )}

          <button onClick={handlePlaceOrder} className="pay-place-btn">Place Order →</button>
        </div>

        <aside className="pay-summary">
          <h3 className="pay-summary-title">Order Summary</h3>
          <div className="pay-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="pay-summary-item">
                <div className="pay-thumb-wrap">
                  <img src={item.thumbnail} alt={item.title} className="pay-thumb" />
                  <span className="pay-badge">{item.quantity}</span>
                </div>
                <span className="pay-item-name">{item.title}</span>
                <span className="pay-item-sub">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pay-divider" />
          <div className="pay-summary-row"><span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="pay-summary-row"><span>Shipping</span><span className="pay-free">Free</span></div>
          <div className="pay-divider" />
          <div className="pay-summary-row pay-total-row"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  );
}
