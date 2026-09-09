import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header({ onCartClick, onProfileClick, onOrderHistoryClick, onSearch, onLogoClick }) {
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const [query, setQuery] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  function handleSearchChange(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.length >= 3) {
      onSearch(val.trim());
      setShowHint(false);
    } else if (val.length > 0 && val.length < 3) {
      setShowHint(true);
      onSearch('');
    } else {
      setShowHint(false);
      onSearch('');
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Escape') {
      setQuery('');
      setShowHint(false);
      onSearch('');
      inputRef.current?.blur();
    }
  }

  function handleClear() {
    setQuery('');
    setShowHint(false);
    onSearch('');
    inputRef.current?.focus();
  }

  // Close hint when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!inputRef.current?.contains(e.target)) setShowHint(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <header>
      <nav className="header-nav">
        <h2 className="header-logo" onClick={onLogoClick}>Shoppy</h2>

        <ul className="header-nav-links">
          <li><a href="#home" onClick={onLogoClick}>Home</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="header-search-wrapper" ref={inputRef}>
          <input
            className="header-search-input"
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => { if (query.length > 0 && query.length < 3) setShowHint(true); }}
            aria-label="Search products"
          />
          {query.length > 0
            ? <button className="header-search-clear" onClick={handleClear} aria-label="Clear search">✕</button>
            : <span className="header-search-icon">🔍</span>
          }
          {showHint && (
            <div className="header-search-hint" role="status">
              Type at least 3 characters to search
            </div>
          )}
        </div>

        <div className="header-actions">
          <button className="header-icon-btn" onClick={onOrderHistoryClick} aria-label="Order history">
            📦 <span>Orders</span>
          </button>

          <button className="header-icon-btn" onClick={onProfileClick} aria-label="User profile">
            {currentUser
              ? <><span className="header-avatar">{currentUser.name.charAt(0).toUpperCase()}</span><span>{currentUser.name.split(' ')[0]}</span></>
              : <>👤 <span>Sign In</span></>
            }
          </button>

          <button className="header-icon-btn header-cart-btn" onClick={onCartClick} aria-label="Open cart">
            🛒 <span>Cart</span>
            {cartCount > 0 && <span className="header-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
