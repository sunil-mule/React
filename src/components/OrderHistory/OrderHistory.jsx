import { useOrderHistory } from '../../context/OrderHistoryContext';
import { useAuth } from '../../context/AuthContext';
import './OrderHistory.css';

export default function OrderHistory({ onClose, onLoginRequired }) {
  const { currentUser } = useAuth();
  const { orders } = useOrderHistory();

  if (!currentUser) {
    return (
      <div className="oh-overlay" onClick={onClose}>
        <div className="oh-panel" onClick={e => e.stopPropagation()}>
          <button className="oh-close" onClick={onClose} aria-label="Close">✕</button>
          <h2 className="oh-heading">Order History</h2>
          <div className="oh-empty">
            <span className="oh-empty-icon">📦</span>
            <p>Sign in to view your order history.</p>
            <button className="oh-btn-primary" onClick={onLoginRequired}>Sign In</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="oh-overlay" onClick={onClose}>
      <div className="oh-panel" onClick={e => e.stopPropagation()}>
        <button className="oh-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="oh-heading">Order History</h2>
        <p className="oh-sub">Orders for <strong>{currentUser.email}</strong></p>

        {orders.length === 0 ? (
          <div className="oh-empty">
            <span className="oh-empty-icon">🛍️</span>
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="oh-list">
            {orders.map(order => (
              <div key={order.id} className="oh-card">
                <div className="oh-card-header">
                  <div>
                    <span className="oh-order-id">{order.id}</span>
                    <span className="oh-date">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="oh-status">{order.status}</span>
                </div>

                <div className="oh-items">
                  {order.items.map(item => (
                    <div key={item.id} className="oh-item">
                      <img src={item.thumbnail} alt={item.title} className="oh-thumb" />
                      <span className="oh-item-name">{item.title}</span>
                      <span className="oh-item-qty">×{item.quantity}</span>
                      <span className="oh-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="oh-card-footer">
                  <span className="oh-ship">
                    📍 {order.shippingInfo?.city}, {order.shippingInfo?.country}
                  </span>
                  <span className="oh-total">Total: <strong>${order.total.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
