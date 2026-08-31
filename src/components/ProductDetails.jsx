import { useState, useEffect } from 'react';

export default function ProductDetails({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '3rem' }}>Loading product details...</p>;
  }

  if (!product) {
    return <p style={{ textAlign: 'center', padding: '3rem' }}>Product not found.</p>;
  }

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>← Back to Products</button>
      
      <div style={styles.detailsLayout}>
        <div style={styles.imageContainer}>
          <img src={product.thumbnail} alt={product.title} style={styles.image} />
        </div>
        
        <div style={styles.infoContainer}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.stock}>Availability: <strong>{product.availabilityStatus}</strong> ({product.stock} left)</p>
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.meta}>
            <p><strong>Brand:</strong> {product.brand || 'Generic'}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          </div>

          <button style={styles.cartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '1rem' },
  backButton: { backgroundColor: 'transparent', border: '1px solid #ccc', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '1.5rem' },
  detailsLayout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' },
  imageContainer: { border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' },
  image: { width: '100%', height: '400px', objectFit: 'cover' },
  infoContainer: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  category: { textTransform: 'uppercase', fontSize: '0.85rem', color: '#888', letterSpacing: '1px' },
  title: { fontSize: '2rem', margin: 0, color: '#222' },
  price: { fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', margin: 0 },
  stock: { fontSize: '0.95rem', color: '#555', margin: 0 },
  description: { fontSize: '1rem', color: '#444', lineHeight: '1.5' },
  meta: { backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  cartButton: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};