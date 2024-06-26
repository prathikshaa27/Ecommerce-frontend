import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories, fetchAllProducts, fetchProductsByCategory, searchProducts } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategoriesData();
    fetchAllProductsData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAllProductsData = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const productsData = await fetchProductsByCategory(categoryId);
      setProducts(productsData);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const productsData = await searchProducts(searchQuery);
        setProducts(productsData);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      fetchAllProductsData();
    }
  };

  console.log('Products:', products);

  return (
      <div>
        <header className="bg-dark text-white py-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="logo">Shopify</h1>
              <nav>
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      <FontAwesomeIcon icon={faUser} />
                      &nbsp; User Profile
                    </Link>
                  </li>
                  <li className="nav-item">
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
          </div>
        </header>
    
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Categories</h5>
                  <ul className="list-group">
                    {categories.map(category => (
                      <li className="list-group-item" key={category.id}>
                        <button className="btn btn-link" onClick={() => handleCategoryClick(category.id)}>
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
              </div>
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {products.map(product => (
                  <div className="col" key={product.id}>
                    <div className="card h-100">
                      <Link to={`/products/${product.id}`} className="card-link"> 
                        <img src={product.image_url} className="card-img-top" alt={product.product_name} style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                          <h5 className="card-title">{product.product_name}</h5>
                          <p className="card-text">Price: ${product.amount}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-dark text-white text-center py-3 mt-4">
          <div className="container">
            <p>&copy; 2024 Shopify. All rights reserved.</p>
            <div className="social-icons">
            </div>
          </div>
        </footer>
      </div>
    );
  };
    
export default Dashboard;

