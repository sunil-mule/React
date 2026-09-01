import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={styles.card} onClick={() => onSelect(product.id)}>
      <img src={product.thumbnail} alt={product.title} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
        <button
          style={{ ...styles.button, backgroundColor: added ? '#218838' : '#28a745' }}
          onClick={handleAddToCart}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: { border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', textAlign: 'left', cursor: 'pointer', transition: 'transform 0.2s' },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  info: { padding: '1rem' },
  title: { fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#333' },
  price: { fontSize: '1rem', color: '#007bff', fontWeight: 'bold', marginBottom: '1rem' },
  button: { width: '100%', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }
};
