import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchCategories, fetchAllProducts, fetchProductsByCategory, searchProducts, getFilteredProducts } from '@services/api';
import Header from '@components/header';
import Footer from '@components/footer';
import CarouselComponent from './carousal';
import Product from '@product/productdesign';
import './dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      toast.error('Failed to fetch categories. Please try again later.');
    }
  };

  const fetchAllProductsData = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products. Please try again later.');
    }
  };

  const handleSearch = async (query) => {
    try {
      const productsData = await searchProducts(query);
      setProducts(productsData);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Failed to search products. Please try again later.');
    }
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const category = categories.find(cat => cat.id === categoryId);
      setSelectedCategory(category);
      const productsData = await fetchProductsByCategory(categoryId);
      setProducts(productsData);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      toast.error('Failed to fetch products for selected category. Please try again later.');
    }
  };

  const handleFilter = async () => {
    if (minPrice.trim() !== '' && maxPrice.trim() !== '') {
      try {
        const category = selectedCategory ? selectedCategory.name : '';
        const productsData = await getFilteredProducts(category, minPrice, maxPrice);
        setProducts(productsData);
      } catch (error) {
        console.error('Error filtering products:', error);
        toast.error('Failed to filter products. Please try again later.');
      }
    } else {
      toast.error('Please enter both minimum and maximum price.');
    }
  };

  return (
    <>
      <Header handleSearch={handleSearch} fetchAllProductsData={fetchAllProductsData} />
      <div className="container mt-4">
        <CarouselComponent />
        <div className="categories-container">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-button ${selectedCategory && selectedCategory.id === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-image">
                {category.image_url && <img src={category.image_url} alt={category.name} />}
              </div>
              <div className="category-name">{category.name}</div>
            </button>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button className="apply-filter-button" type="button" onClick={handleFilter}>Apply Filter</button>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

