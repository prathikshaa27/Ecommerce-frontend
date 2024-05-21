import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '@services/api';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = ({ handleSearch, fetchAllProductsData }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('authToken');
    setAuthenticated(isAuthenticated);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      fetchAllProductsData();
    }
    setSearchQuery('');
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== '') {
        handleSearch(query);
      } else {
        fetchAllProductsData();
      }
    }, 500),
    [handleSearch, fetchAllProductsData]
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

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
    <header className="navbar navbar-dark bg-dark fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <strong className="text-lg">Shopify</strong>
        </Link>
        <form onSubmit={handleSubmit} className="form-inline">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-success" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>

        <nav className="ml-auto">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            {authenticated && (
              <>
                <li className="nav-item mr-3">
                  <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="nav-link-text">Profile</span>
                  </Link>
                </li>
                <li className="nav-item mr-3">
                  <Link to="/orders" className="nav-link">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item mr-3">
                  <div className="nav-link" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="nav-link-text">Cart</span>
                  </div>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

