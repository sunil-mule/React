import { useCart } from '../context/CartContext';

export default function Header({ onCartClick }) {
  const { cartCount } = useCart();

  return (
    <div>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Shoppy</h2>

        <ul style={styles.navLinks}>
          <li>
            <a href="#home" style={styles.link}>Home</a>
          </li>
          <li>
            <a href="#products" style={styles.link}>Shop</a>
          </li>
          <li>
            <a href="#contact" style={styles.link}>Contact</a>
          </li>
        </ul>

        <button style={styles.cartBtn} onClick={onCartClick} aria-label="Open cart">
          <span style={styles.cartIcon}>🛒</span>
          <span style={styles.cartLabel}>Cart</span>
          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </button>
      </nav>
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff'
  },
  logo: {
    margin: 0,
    color: '#333'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    margin: 0,
    padding: 0
  },
  link: {
    textDecoration: 'none',
    color: '#555',
    fontWeight: '500'
  },
  cartBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'none',
    border: '1px solid #ddd',
    padding: '0.45rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    color: '#333'
  },
  cartIcon: { fontSize: '1.1rem' },
  cartLabel: {},
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e53935',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
};
