import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // 'home' | 'detail' | 'cart'
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  function handleSelectProduct(id) {
    setSelectedProductId(id);
    setView('detail');
  }

  function handleBack() {
    setView('home');
    setSelectedProductId(null);
  }

  function handleOpenCart() {
    setView('cart');
  }

  return (
    <div>
      <Header onCartClick={handleOpenCart} />

      {view === 'cart' && (
        <Cart onBack={handleBack} />
      )}

      {view === 'detail' && selectedProductId && (
        <ProductDetails
          productId={selectedProductId}
          onBack={handleBack}
        />
      )}

      {view === 'home' && (
        <>
          <Banner />
          <main style={styles.container}>
            {loading ? (
              <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : (
              <>
                <h2 style={styles.sectionTitle}>Featured Products</h2>
                <div style={styles.grid}>
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={handleSelectProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  sectionTitle: { textAlign: 'center', margin: '2rem 0 1rem', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }
};
