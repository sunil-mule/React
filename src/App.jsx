import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderHistoryProvider } from './context/OrderHistoryContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderHistoryProvider>
          <Home />
        </OrderHistoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
