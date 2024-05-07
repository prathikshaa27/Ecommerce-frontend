import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const HeaderFooter = ({ children }) => {
  return (
    <>
      <header className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand"><strong className="text-lg">Shopify</strong></Link>
          <nav className="ml-auto">
            <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item mr-5">
                <Link to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                  &nbsp; User Profile
                </Link>
              </li>
              <li className="nav-item mr-5">
                <Link to="/cart" className="nav-link">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  &nbsp; Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">My Orders</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="mt-5 pt-4">{children}</main>
      <footer className="footer fixed-bottom bg-dark text-white py-3">
        <div className="container text-center">
          <p>&copy; 2024 Shopify. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HeaderFooter;


