import { useState } from 'react';
import { useCart } from '../context/CartContext';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

const FIELD_ERRORS = {
  firstName: 'First name is required',
  lastName: 'Last name is required',
  email: 'A valid email is required',
  mobile: 'A valid mobile number is required',
  address: 'Address is required',
  city: 'City is required',
  state: 'State is required',
  zip: 'ZIP / Postal code is required',
  country: 'Country is required',
};

function validateForm(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = FIELD_ERRORS.firstName;
  if (!form.lastName.trim()) errors.lastName = FIELD_ERRORS.lastName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = FIELD_ERRORS.email;
  if (!/^\+?[\d\s\-()]{7,15}$/.test(form.mobile)) errors.mobile = FIELD_ERRORS.mobile;
  if (!form.address.trim()) errors.address = FIELD_ERRORS.address;
  if (!form.city.trim()) errors.city = FIELD_ERRORS.city;
  if (!form.state.trim()) errors.state = FIELD_ERRORS.state;
  if (!form.zip.trim()) errors.zip = FIELD_ERRORS.zip;
  if (!form.country.trim()) errors.country = FIELD_ERRORS.country;
  return errors;
}

export default function Checkout({ onBack, onBackToCart }) {
  const { cartItems, cartTotal } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successBox}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Order Placed!</h2>
          <p style={styles.successText}>
            Thank you, <strong>{form.firstName}</strong>! Your order has been received.<br />
            A confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <button onClick={onBack} style={styles.primaryBtn}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <button onClick={onBack} style={styles.breadcrumbLink}>Home</button>
        <span style={styles.breadcrumbSep}>/</span>
        <button onClick={onBackToCart} style={styles.breadcrumbLink}>Cart</button>
        <span style={styles.breadcrumbSep}>/</span>
        <span style={styles.breadcrumbCurrent}>Checkout</span>
      </div>

      <h2 style={styles.pageTitle}>Checkout</h2>

      <div style={styles.layout}>
        {/* ── Left: Form ── */}
        <form onSubmit={handleSubmit} noValidate style={styles.form}>

          {/* Contact Information */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.row}>
              <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
              <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} required />
            </div>
            <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
            <Field label="Mobile Number" name="mobile" type="tel" placeholder="+1 555 000 0000" value={form.mobile} onChange={handleChange} error={errors.mobile} required />
          </section>

          {/* Shipping Address */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Shipping Address</h3>
            <Field label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} required />
            <div style={styles.row}>
              <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} required />
              <Field label="State / Province" name="state" value={form.state} onChange={handleChange} error={errors.state} required />
            </div>
            <div style={styles.row}>
              <Field label="ZIP / Postal Code" name="zip" value={form.zip} onChange={handleChange} error={errors.zip} required />
              <Field label="Country" name="country" value={form.country} onChange={handleChange} error={errors.country} required />
            </div>
          </section>

          <button type="submit" style={styles.submitBtn}>
            Proceed to Payment →
          </button>
        </form>

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

/* ── Reusable field component ── */
function Field({ label, name, type = 'text', placeholder, value, onChange, error, required }) {
  return (
    <div style={fieldStyles.group}>
      <label style={fieldStyles.label}>
        {label}{required && <span style={fieldStyles.asterisk}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        style={{ ...fieldStyles.input, ...(error ? fieldStyles.inputError : {}) }}
        autoComplete="on"
      />
      {error && <span style={fieldStyles.errorMsg}>{error}</span>}
    </div>
  );
}

/* ── Styles ── */
const styles = {
  page: { maxWidth: '1100px', margin: '2rem auto', padding: '0 2rem 4rem' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontSize: '0.9rem' },
  breadcrumbLink: { background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', padding: 0, fontSize: '0.9rem' },
  breadcrumbSep: { color: '#aaa' },
  breadcrumbCurrent: { color: '#555' },
  pageTitle: { fontSize: '1.8rem', color: '#222', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' },

  /* form */
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  section: { border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionTitle: { margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#222', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.75rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  submitBtn: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.9rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', alignSelf: 'stretch' },

  /* summary */
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

  /* success */
  successContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2rem' },
  successBox: { textAlign: 'center', maxWidth: '480px', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '3rem 2rem', backgroundColor: '#fff' },
  successIcon: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#28a745', color: '#fff', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' },
  successTitle: { fontSize: '1.8rem', color: '#222', marginBottom: '0.75rem' },
  successText: { color: '#555', lineHeight: 1.7, marginBottom: '2rem' },
  primaryBtn: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.75rem 1.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem' },
};

const fieldStyles = {
  group: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.88rem', fontWeight: '600', color: '#444' },
  asterisk: { color: '#e00' },
  input: { padding: '0.6rem 0.75rem', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.15s', width: '100%', boxSizing: 'border-box' },
  inputError: { borderColor: '#e00' },
  errorMsg: { fontSize: '0.8rem', color: '#e00' },
};
