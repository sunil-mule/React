import { useCart } from '../context/CartContext';

export default function Cart({ onBack, onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
        <button onClick={onBack} style={styles.continueBtn}>← Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>← Continue Shopping</button>
      <h2 style={styles.heading}>Shopping Cart</h2>

      <div style={styles.layout}>
        <div style={styles.itemsList}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.itemRow}>
              <img src={item.thumbnail} alt={item.title} style={styles.thumbnail} />
              <div style={styles.itemInfo}>
                <h4 style={styles.itemTitle}>{item.title}</h4>
                <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
              </div>
              <div style={styles.qtyControls}>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span style={styles.qtyValue}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p style={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</p>
              <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          <div style={styles.summaryRow}>
            <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: '#28a745' }}>Free</span>
          </div>
          <div style={styles.divider} />
          <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '1.1rem' }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn} onClick={onCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '2rem auto', padding: '1rem 2rem' },
  emptyContainer: { maxWidth: '500px', margin: '5rem auto', textAlign: 'center', padding: '2rem' },
  emptyTitle: { fontSize: '1.8rem', color: '#333', marginBottom: '0.5rem' },
  emptyText: { color: '#777', marginBottom: '2rem' },
  continueBtn: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' },
  backButton: { backgroundColor: 'transparent', border: '1px solid #ccc', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '1.5rem' },
  heading: { fontSize: '1.8rem', color: '#222', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  itemRow: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' },
  thumbnail: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 },
  itemInfo: { flex: 1 },
  itemTitle: { margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: '#333' },
  itemPrice: { margin: 0, fontSize: '0.9rem', color: '#777' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  qtyBtn: { width: '28px', height: '28px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f5f5f5', fontSize: '1rem', lineHeight: 1 },
  qtyValue: { minWidth: '24px', textAlign: 'center', fontWeight: '600' },
  subtotal: { minWidth: '70px', textAlign: 'right', fontWeight: '600', color: '#222', margin: 0 },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '1rem', padding: '0.25rem' },
  summary: { border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  summaryTitle: { margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#222' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: '#555' },
  divider: { borderTop: '1px solid #e0e0e0', margin: '0.5rem 0' },
  checkoutBtn: { marginTop: '0.5rem', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }
};
