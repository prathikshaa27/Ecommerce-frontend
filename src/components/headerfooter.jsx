// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
// import './headerfooter.css'; 

// const HeaderFooter = ({ children }) => {
//   return (
//     <>
//       <header className="navbar navbar-dark bg-dark fixed-top">
//         <div className="container">
//           <Link to="/" className="navbar-brand"><strong className="text-lg">Shopify</strong></Link>
//           <nav className="ml-auto">
//             <ul className="navbar-nav d-flex flex-row align-items-center">
//               <li className="nav-item mr-3">
//                 <Link to="/profile" className="nav-link">
//                   <FontAwesomeIcon icon={faUser} />
//                   <span className="nav-link-text">User Profile</span>
//                 </Link>
//               </li>
//               <li className="nav-item mr-3">
//                 <Link to="/cart" className="nav-link">
//                   <FontAwesomeIcon icon={faShoppingCart} />
//                   <span className="nav-link-text">Cart</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/orders" className="nav-link">My Orders</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//       <main className="main-content">{children}</main>
//       <footer className="footer fixed-bottom bg-dark text-white py-2"> 
//         <div className="container text-center">
//           <p>&copy; 2024 Shopify. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default HeaderFooter;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import './headerfooter.css'; 
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';

const HeaderFooter = ({ children }) => {
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
    <>
      <header className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand"><strong className="text-lg">Shopify</strong></Link>
          <nav className="ml-auto">
            <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item mr-3">
                <Link to="/profile" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav-link-text">User Profile</span>
                </Link>
              </li>
              <li className="nav-item mr-3">
                <Link to="/cart" className="nav-link">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="nav-link-text">Cart</span>
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
      <main className="main-content">{children}</main>
      <footer className="footer fixed-bottom bg-dark text-white py-2"> 
        <div className="container text-center">
          <p>&copy; 2024 Shopify. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HeaderFooter;
