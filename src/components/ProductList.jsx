export default function ProductList({ products }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Product List (Images & Names)</h2>
      <div style={styles.list}>
        {products.map(product => (
          <div key={product.id} style={styles.item}>
            <img src={product.thumbnail} alt={product.title} style={styles.image} />
            <span style={styles.title}>{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { margin: '2rem 0', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' },
  heading: { marginBottom: '1rem', color: '#333', fontSize: '1.25rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  item: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', borderBottom: '1px solid #eee' },
  image: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' },
  title: { fontSize: '1rem', color: '#444', fontWeight: '500' }
};