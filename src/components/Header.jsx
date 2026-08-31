export default function Header() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Shoppy</h2>
      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#products" style={styles.link}>Shop</a></li>
        <li><a href="#contact" style={styles.link}>Contact</a></li>
        
      </ul>
      <div style={styles.cart}>🛒 Cart (0)</div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' },
  logo: { margin: 0, color: '#333' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 },
  link: { textDecoration: 'none', color: '#555', fontWeight: '500' },
  cart: { cursor: 'pointer', fontWeight: '500' }
};