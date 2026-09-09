import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart({ onBack, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-text">Looks like you haven't added anything yet.</p>
        <button onClick={onBack} className="cart-continue-btn">← Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <button onClick={onBack} className="cart-back-btn">← Continue Shopping</button>
      <h2 className="cart-heading">Shopping Cart</h2>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.thumbnail} alt={item.title} className="cart-thumbnail" />
              <div className="cart-item-info">
                <h4 className="cart-item-title">{item.title}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="cart-qty-controls">
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <div className="cart-summary-row">
            <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span className="cart-free">Free</span>
          </div>
          <div className="cart-divider" />
          <div className="cart-summary-row cart-total-row">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="cart-checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
