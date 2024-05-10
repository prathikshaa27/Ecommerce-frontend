// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchCategories, fetchAllProducts, fetchProductsByCategory, searchProducts , fetchProductsByCategoryWithFilter} from '../services/api';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import HeaderFooter from './headerfooter';

// const Dashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchCategoriesData();
//     fetchAllProductsData();
//   }, []);

//   const fetchCategoriesData = async () => {
//     try {
//       const categoriesData = await fetchCategories();
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories. Please try again later.');
//     }
//   };

//   const fetchAllProductsData = async () => {
//     try {
//       const productsData = await fetchAllProducts();
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products. Please try again later.');
//     }
//   };

//   const handleCategoryClick = async (categoryId) => {
//     try {
//       const productsData = await fetchProductsByCategory(categoryId);
//       setProducts(productsData);
//     } catch (error) {
//       console.error(`Error fetching products for category ${categoryId}:`, error);
//       toast.error('Failed to fetch products for selected category. Please try again later.');
//     }
//   };

//   const handleSearch = async () => {
//     if (searchQuery.trim() !== '') {
//       try {
//         const productsData = await searchProducts(searchQuery);
//         setProducts(productsData);
//       } catch (error) {
//         console.error('Error searching products:', error);
//         toast.error('Failed to search products. Please try again later.');
//       }
//     } else {
//       fetchAllProductsData();
//     }
//   };

//   return (
//       <HeaderFooter>
//         <div className="container mt-4">
//           <div className="row">
//             <div className="col-lg-2">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">Categories</h5>
//                   <ul className="list-group">
//                     {categories.map(category => (
//                       <li className="list-group-item" key={category.id}>
//                         <button className="btn btn-link" onClick={() => handleCategoryClick(category.id)}>
//                           {category.name}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-10">
//               <div className="input-group mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search for products"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
//               </div>
//               <div className="row row-cols-1 row-cols-md-4 g-4">
//                 {products.map(product => (
//                   <div className="col" key={product.id}>
//                     <div className="card h-100">
//                       <Link to={`/products/${product.id}`} className="card-link">
//                         <img src={product.image_url} className="card-img-top" alt={product.product_name} style={{ height: '200px', objectFit: 'cover' }} />
//                         <div className="card-body">
//                           <h5 className="card-title">{product.product_name}</h5>
//                           <p className="card-text">Price: ${product.amount}</p>
//                         </div>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </HeaderFooter>
//     );

// };


// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchAllProducts, fetchProductsByCategory, searchProducts, getFilteredProducts } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderFooter from './headerfooter';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Define selectedCategory state

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

  const handleCategoryClick = async (categoryId) => {
    try {
      const productsData = await fetchProductsByCategory(categoryId);
      setProducts(productsData);
      setSelectedCategory(categoryId); // Set selectedCategory when category is clicked
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      toast.error('Failed to fetch products for selected category. Please try again later.');
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const productsData = await searchProducts(searchQuery);
        setProducts(productsData);
      } catch (error) {
        console.error('Error searching products:', error);
        toast.error('Failed to search products. Please try again later.');
      }
    } else {
      fetchAllProductsData();
    }
  };

  const handleFilter = async () => {
    if (minPrice.trim() !== '' && maxPrice.trim() !== '') {
      try {
        const productsData = await getFilteredProducts(selectedCategory, minPrice, maxPrice);
        setProducts(productsData);
      } catch (error) {
        console.error('Error filtering products:', error);
        toast.error('Failed to filter products. Please try again later.');
      }
    }
  };

  return (
    <HeaderFooter>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                <ul className="list-group">
                  {categories.map(category => (
                    <li className={`list-group-item ${selectedCategory === category.id ? 'active' : ''}`} key={category.id}>
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
              <button className="btn btn-primary" type="button" onClick={handleFilter}>Apply Filter</button>
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
    </HeaderFooter>
  );

};


export default Dashboard;
