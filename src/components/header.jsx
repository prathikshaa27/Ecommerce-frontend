import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '@services/api';

import './header.css'; 



const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      navigate('/signinform');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand"><strong className="text-lg">Shopify</strong></Link>
        <nav className="ml-auto">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            <li className="nav-item mr-3">
              <Link to="/profile" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                <span className="nav-link-text">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">My Orders</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
