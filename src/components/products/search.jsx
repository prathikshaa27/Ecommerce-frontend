// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import debounce from 'lodash/debounce';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';

// import './search.css'

// import { searchProducts } from '../../services/products';

// const SearchBar = ({ handleSearch }) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== '') {
//       handleSearchAndRedirect(searchQuery);
//     }
//     setSearchQuery('');
//   };

//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       if (query.trim() !== '') {
//         handleSearchAndRedirect(query);
//       }
//     }, 500),
//     []
//   );

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     debouncedSearch(e.target.value);
//   };

//   const handleSearchAndRedirect = async (query) => {
//     try {
//       const productsData = await searchProducts(query);
//       if (productsData.length > 0) {
//         const { id: productId } = productsData[0]; 
//         navigate(`/products/${productId}`);
//       } else {
//         toast.error('No products found matching your search.');
//       }
//     } catch (error) {
//       console.error('Error searching and redirecting:', error);
//       toast.error('Failed to search and redirect. Please try again later.');
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="form-inline search-bar">
//       <div className="search-bar">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search for products"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <div className="input-group-append">
//           <button className="btn btn-outline-success" type="submit">
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;

// components/search/SearchBar.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import './search.css';

import { searchProducts } from '../../services/products';

const SearchBar = ({ handleSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      handleSearchAndRedirect(searchQuery);
    }
    setSearchQuery('');
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== '') {
        handleSearchAndRedirect(query);
      }
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearchAndRedirect = async (query) => {
    try {
      console.log('Searching for:', query); 
      const productsData = await searchProducts(query);
      console.log('Search results:', productsData); 
      if (productsData.results.length > 0) {
        const { id: productId } = productsData.results[0];
        navigate(`/products/${productId}`);
      } else {
        toast.error('No products found matching your search.');
      }
    } catch (error) {
      console.error('Error searching and redirecting:', error);
      toast.error('Failed to search and redirect. Please try again later.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="form-inline search-bar">
      <div className="search-bar">
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
  );
};

export default SearchBar;
