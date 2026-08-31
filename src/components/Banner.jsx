export default function Banner() {
  return (
    <div style={styles.banner}>
      <img 
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80" 
        alt="Store Banner Placeholder" 
        style={styles.image} 
      />
      <div style={styles.overlay}>
        <h1 style={styles.title}>Mega Sale Event</h1>
        <p style={styles.subtitle}>Explore top-rated products with incredible discounts.</p>
      </div>
    </div>
  );
}

const styles = {
  banner: { position: 'relative', width: '100%', height: '350px', overflow: 'hidden', backgroundColor: '#333' },
  image: { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' },
  overlay: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '80%' },
  title: { fontSize: '2.5rem', marginBottom: '0.5rem' },
  subtitle: { fontSize: '1.2rem', margin: 0 }
};