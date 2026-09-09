import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

export default function ProductDetails({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err => { console.error('Error fetching product:', err); setLoading(false); });
  }, [productId]);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) return <p className="pd-status">Loading product details…</p>;
  if (!product) return <p className="pd-status">Product not found.</p>;

  return (
    <div className="pd-container">
      <button onClick={onBack} className="pd-back-btn">← Back to Products</button>

      <div className="pd-layout">
        <div className="pd-image-wrap">
          <img src={product.thumbnail} alt={product.title} className="pd-image" />
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.title}</h1>
          <p className="pd-price">${product.price.toFixed(2)}</p>
          <p className="pd-stock">
            Availability: <strong>{product.availabilityStatus}</strong> ({product.stock} left)
          </p>
          <p className="pd-desc">{product.description}</p>

          <div className="pd-meta">
            <p><strong>Brand:</strong> {product.brand || 'Generic'}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          </div>

          <button
            className={`pd-cart-btn ${added ? 'pd-cart-btn--added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
