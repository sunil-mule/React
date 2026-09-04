import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import Payment from '../components/Payment';
import Congrats from '../components/Congrats';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // 'home' | 'detail' | 'cart' | 'checkout' | 'payment' | 'congrats'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

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

  function handleOpenCheckout() {
    setView('checkout');
  }

  function handlePayment(formData) {
    setShippingInfo(formData);
    setView('payment');
  }

  function handlePlaceOrder() {
    setView('congrats');
  }

  return (
    <div>
      <Header onCartClick={handleOpenCart} />

      {view === 'cart' && (
        <Cart onBack={handleBack} onCheckout={handleOpenCheckout} />
      )}

      {view === 'checkout' && (
        <Checkout
          onBack={handleBack}
          onBackToCart={() => setView('cart')}
          onPayment={handlePayment}
        />
      )}

      {view === 'payment' && (
        <Payment
          shippingInfo={shippingInfo}
          onBack={handleBack}
          onBackToCheckout={() => setView('checkout')}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {view === 'congrats' && (
        <Congrats
          shippingInfo={shippingInfo}
          onContinueShopping={handleBack}
        />
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
