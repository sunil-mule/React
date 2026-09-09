import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product, onSelect, compact = false }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={`pc-card${compact ? ' pc-card--compact' : ''}`} onClick={() => onSelect(product.id)}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={`pc-image${compact ? ' pc-image--compact' : ''}`}
      />
      <div className="pc-info">
        <h3 className="pc-title">{product.title}</h3>
        <p className="pc-price">${product.price.toFixed(2)}</p>
        <button
          className={`pc-btn ${added ? 'pc-btn--added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
