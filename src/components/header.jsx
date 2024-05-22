import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '@services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@product/search';

import './header.css';

const Header = ({ handleSearch }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('authToken');
    setAuthenticated(isAuthenticated);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setAuthenticated(false);
      navigate('/home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="brand-logo">Shopify</Link>
        <div className="search-bar">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="nav-links">
          {authenticated && (
            <>
              <Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link>
              <Link to="/orders">My Orders</Link>
              <div onClick={handleCartClick}><FontAwesomeIcon icon={faShoppingCart} /> Cart</div>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
