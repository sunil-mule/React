export default function Congrats({ shippingInfo, onContinueShopping }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkCircle}>✓</div>
        <h1 style={styles.heading}>Congratulations!</h1>
        <p style={styles.subheading}>Your order has been placed successfully.</p>

        {shippingInfo && (
          <p style={styles.details}>
            Thank you, <strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong>!<br />
            A confirmation will be sent to <strong>{shippingInfo.email}</strong>.
          </p>
        )}

        <div style={styles.badge}>
          <span style={styles.badgeIcon}>🚚</span>
          <span style={styles.badgeText}>Cash on Delivery — pay when your order arrives.</span>
        </div>

        <button onClick={onContinueShopping} style={styles.btn}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '2rem' },
  card: { textAlign: 'center', maxWidth: '500px', width: '100%', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '3.5rem 2.5rem', backgroundColor: '#fff' },
  checkCircle: { width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#28a745', color: '#fff', fontSize: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.75rem', fontWeight: '700' },
  heading: { fontSize: '2rem', color: '#222', marginBottom: '0.5rem' },
  subheading: { fontSize: '1.05rem', color: '#555', marginBottom: '1.25rem' },
  details: { fontSize: '0.95rem', color: '#444', lineHeight: 1.7, marginBottom: '1.5rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f0fff4', border: '1px solid #b2dfcc', borderRadius: '6px', padding: '0.6rem 1rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#1a6b39' },
  badgeIcon: { fontSize: '1.1rem' },
  badgeText: { fontWeight: '600' },
  btn: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
};
