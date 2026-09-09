import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', mobile: '',
  address: '', city: '', state: '', zip: '', country: '',
};

function validate(form) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = 'First name is required';
  if (!form.lastName.trim())  e.lastName  = 'Last name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required';
  if (!/^\+?[\d\s\-()]{7,15}$/.test(form.mobile)) e.mobile = 'A valid mobile number is required';
  if (!form.address.trim()) e.address = 'Address is required';
  if (!form.city.trim())    e.city    = 'City is required';
  if (!form.state.trim())   e.state   = 'State is required';
  if (!form.zip.trim())     e.zip     = 'ZIP / Postal code is required';
  if (!form.country.trim()) e.country = 'Country is required';
  return e;
}

export default function Checkout({ onBack, onBackToCart, onPayment }) {
  const { cartItems, cartTotal } = useCart();
  const [form, setForm]     = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onPayment(form);
  }

  return (
    <div className="co-page">
      <div className="co-breadcrumb">
        <button onClick={onBack} className="co-bc-link">Home</button>
        <span className="co-bc-sep">/</span>
        <button onClick={onBackToCart} className="co-bc-link">Cart</button>
        <span className="co-bc-sep">/</span>
        <span className="co-bc-current">Checkout</span>
      </div>

      <h2 className="co-page-title">Checkout</h2>

      <div className="co-layout">
        <form onSubmit={handleSubmit} noValidate className="co-form">
          <section className="co-section">
            <h3 className="co-section-title">Contact Information</h3>
            <div className="co-row">
              <Field label="First Name"  name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
              <Field label="Last Name"   name="lastName"  value={form.lastName}  onChange={handleChange} error={errors.lastName}  required />
            </div>
            <Field label="Email Address" name="email"  type="email" value={form.email}  onChange={handleChange} error={errors.email}  required />
            <Field label="Mobile Number" name="mobile" type="tel"   value={form.mobile} onChange={handleChange} error={errors.mobile} required placeholder="+1 555 000 0000" />
          </section>

          <section className="co-section">
            <h3 className="co-section-title">Shipping Address</h3>
            <Field label="Street Address"    name="address" value={form.address} onChange={handleChange} error={errors.address} required />
            <div className="co-row">
              <Field label="City"           name="city"  value={form.city}  onChange={handleChange} error={errors.city}  required />
              <Field label="State/Province" name="state" value={form.state} onChange={handleChange} error={errors.state} required />
            </div>
            <div className="co-row">
              <Field label="ZIP / Postal Code" name="zip"     value={form.zip}     onChange={handleChange} error={errors.zip}     required />
              <Field label="Country"           name="country" value={form.country} onChange={handleChange} error={errors.country} required />
            </div>
          </section>

          <button type="submit" className="co-submit-btn">Proceed to Payment →</button>
        </form>

        <aside className="co-summary">
          <h3 className="co-summary-title">Order Summary</h3>
          <div className="co-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="co-summary-item">
                <div className="co-thumb-wrap">
                  <img src={item.thumbnail} alt={item.title} className="co-thumb" />
                  <span className="co-badge">{item.quantity}</span>
                </div>
                <span className="co-item-name">{item.title}</span>
                <span className="co-item-sub">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="co-divider" />
          <div className="co-summary-row"><span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="co-summary-row"><span>Shipping</span><span className="co-free">Free</span></div>
          <div className="co-divider" />
          <div className="co-summary-row co-total-row"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder, value, onChange, error, required }) {
  return (
    <div className="co-field">
      <label className="co-label">{label}{required && <span className="co-asterisk"> *</span>}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder || ''} autoComplete="on"
        className={`co-input${error ? ' co-input--error' : ''}`}
      />
      {error && <span className="co-error-msg">{error}</span>}
    </div>
  );
}
