import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Payment({ shippingInfo, onBack, onBackToCheckout, onPlaceOrder }) {
  const { cartItems, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  function handlePlaceOrder() {
    onPlaceOrder({ paymentMethod, shippingInfo });
  }

  return (
    <div style={styles.page}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <button onClick={onBack} style={styles.breadcrumbLink}>Home</button>
        <span style={styles.breadcrumbSep}>/</span>
        <button onClick={() => {}} style={{ ...styles.breadcrumbLink, color: '#aaa', cursor: 'default' }}>Cart</button>
        <span style={styles.breadcrumbSep}>/</span>
        <button onClick={onBackToCheckout} style={styles.breadcrumbLink}>Checkout</button>
        <span style={styles.breadcrumbSep}>/</span>
        <span style={styles.breadcrumbCurrent}>Payment</span>
      </div>

      <h2 style={styles.pageTitle}>Payment</h2>

      <div style={styles.layout}>
        {/* ── Left: Payment options ── */}
        <div style={styles.left}>
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>

            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                style={styles.radioInput}
              />
              <div style={styles.radioContent}>
                <span style={styles.radioTitle}>Cash on Delivery (COD)</span>
                <span style={styles.radioDesc}>Pay with cash when your order is delivered to your doorstep.</span>
              </div>
            </label>
          </section>

          {/* Shipping summary */}
          {shippingInfo && (
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Shipping To</h3>
              <p style={styles.addressLine}>
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              <p style={styles.addressLine}>{shippingInfo.address}</p>
              <p style={styles.addressLine}>
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
              </p>
              <p style={styles.addressLine}>{shippingInfo.country}</p>
              <p style={styles.addressLine}>{shippingInfo.email}</p>
            </section>
          )}

          <button onClick={handlePlaceOrder} style={styles.placeOrderBtn}>
            Place Order →
          </button>
        </div>

        {/* ── Right: Order summary ── */}
        <aside style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>

          <div style={styles.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <div style={styles.thumbWrapper}>
                  <img src={item.thumbnail} alt={item.title} style={styles.thumb} />
                  <span style={styles.badge}>{item.quantity}</span>
                </div>
                <span style={styles.itemName}>{item.title}</span>
                <span style={styles.itemSubtotal}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryRow}>
            <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: '#28a745', fontWeight: '600' }}>Free</span>
          </div>

          <div style={styles.divider} />

          <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '1.1rem', color: '#111' }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '2rem auto', padding: '0 2rem 4rem' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontSize: '0.9rem' },
  breadcrumbLink: { background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', padding: 0, fontSize: '0.9rem' },
  breadcrumbSep: { color: '#aaa' },
  breadcrumbCurrent: { color: '#555' },
  pageTitle: { fontSize: '1.8rem', color: '#222', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' },
  left: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },

  section: { border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionTitle: { margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#222', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' },

  radioLabel: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.85rem 1rem', border: '2px solid #007bff', borderRadius: '7px', backgroundColor: '#f0f7ff' },
  radioInput: { marginTop: '3px', accentColor: '#007bff', width: '16px', height: '16px', flexShrink: 0 },
  radioContent: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  radioTitle: { fontWeight: '700', fontSize: '0.97rem', color: '#222' },
  radioDesc: { fontSize: '0.85rem', color: '#555' },

  addressLine: { margin: '0', fontSize: '0.9rem', color: '#444', lineHeight: 1.6 },

  placeOrderBtn: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0.9rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },

  summary: { border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'sticky', top: '1.5rem' },
  summaryTitle: { margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#222', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  summaryItem: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  thumbWrapper: { position: 'relative', flexShrink: 0 },
  thumb: { width: '52px', height: '52px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' },
  badge: { position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#555', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  itemName: { flex: 1, fontSize: '0.88rem', color: '#333', lineHeight: 1.4 },
  itemSubtotal: { fontSize: '0.9rem', fontWeight: '600', color: '#111', whiteSpace: 'nowrap' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#555' },
  divider: { borderTop: '1px solid #e0e0e0' },
};
