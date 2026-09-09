import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import Payment from '../components/Payment/Payment';
import Congrats from '../components/Congrats/Congrats';
import UserProfile from '../components/UserProfile/UserProfile';
import OrderHistory from '../components/OrderHistory/OrderHistory';
import './Home.css';

export default function Home() {
  const [products, setProducts]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [view, setView]                     = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [shippingInfo, setShippingInfo]     = useState(null);
  const [orderId, setOrderId]               = useState(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [showProfile, setShowProfile]       = useState(false);
  const [showOrders, setShowOrders]         = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => { setProducts(data.products); setLoading(false); })
      .catch(err => { console.error('Error fetching products:', err); setLoading(false); });
  }, []);

  const filteredProducts = searchQuery.length >= 3
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  function handleSelectProduct(id) { setSelectedProductId(id); setView('detail'); }
  function handleBack()            { setView('home'); setSelectedProductId(null); }
  function handleOpenCart()        { setView('cart'); }
  function handleOpenCheckout()    { setView('checkout'); }
  function handlePayment(formData) { setShippingInfo(formData); setView('payment'); }

  function handlePlaceOrder({ paymentMethod, shippingInfo: si, orderId: oid }) {
    setShippingInfo(si);
    setOrderId(oid);
    setView('congrats');
  }

  return (
    <div>
      <Header
        onCartClick={handleOpenCart}
        onProfileClick={() => setShowProfile(true)}
        onOrderHistoryClick={() => setShowOrders(true)}
        onSearch={setSearchQuery}
        onLogoClick={handleBack}
      />

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}

      {showOrders && (
        <OrderHistory
          onClose={() => setShowOrders(false)}
          onLoginRequired={() => { setShowOrders(false); setShowProfile(true); }}
        />
      )}

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
          orderId={orderId}
          onContinueShopping={handleBack}
        />
      )}

      {view === 'detail' && selectedProductId && (
        <ProductDetails productId={selectedProductId} onBack={handleBack} />
      )}

      {view === 'home' && (
        <>
          {!searchQuery && (
            <Banner
              imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80"
              title="Mega Sale Event"
              subtitle="Explore top-rated products with incredible discounts."
            />
          )}
          <main className="home-container">
            {loading ? (
              <p className="home-loading">Loading products…</p>
            ) : (
              <>
                <h2 className="home-section-title">
                  {searchQuery ? 'Search Results' : 'Featured Products'}
                </h2>

                {searchQuery && (
                  <p className="home-search-label">
                    Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for <span>{searchQuery}</span>
                  </p>
                )}

                {filteredProducts.length === 0 ? (
                  <p className="home-no-results">No products match your search.</p>
                ) : (
                  <div className={searchQuery ? 'home-grid--compact' : 'home-grid'}>
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleSelectProduct}
                        compact={!!searchQuery}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
