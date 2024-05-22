// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api';

// const getCookie = (name) => {
//     const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return cookieValue ? cookieValue.pop() : '';
//   };
  
//   const getCsrfToken = () => {
//     const cookieValue = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
//     return cookieValue ? cookieValue[2] : null;
//   };
  
//   const api = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//     headers: {
//       'X-CSRFToken': getCsrfToken(),
//     },
//   });

// export const fetchCategories = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/categories/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchAllProducts = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/categories/products/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchProductsByCategory = async (categoryId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/categories/${categoryId}/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const searchProducts = async (query) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/search/?q=${query}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getFilteredProducts = async (category, minPrice, maxPrice) => {
//   try {
//     const csrftoken = getCookie('csrftoken'); 
//     const response = await axios.get(`${BASE_URL}/category-price-filter/`, {
//       params: {
//         category,
//         min_price: minPrice,
//         max_price: maxPrice
//       },
//       withCredentials: true,
//       headers: {
//         'X-CSRFToken': csrftoken,
//         'X-Requested-With': 'XMLHttpRequest',
//       },
//     });
//     return response.data.products;
//   } catch (error) {
//     console.error('Error fetching filtered products:', error);
//     throw error;
//   }
// };

// export const removeFromCart = async (productId) => {
//     try {
//       const csrftoken = getCookie('csrftoken');
  
//       const response = await axios.delete(
//         `${BASE_URL}/cart/${productId}/`,
//         {
//           withCredentials: true,  
//           headers: {
//             'X-CSRFToken': csrftoken,  
//             'X-Requested-With': 'XMLHttpRequest' 
//           }
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
    
//   export const fetchCartProducts = async () => {
//     try {
//       const csrftoken = getCookie('csrftoken');
  
//       const response = await axios.get(
//         `${BASE_URL}/view_cart/`,
//         {
//           withCredentials: true,  
//           headers: {
//             'X-CSRFToken': csrftoken,  
//             'X-Requested-With': 'XMLHttpRequest'  
//           }
//         }
//       );
  
//       if (response && response.data) {
//         return response.data;
//       } else {
//         console.error('Invalid response format:', response);
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error('Error fetching cart products:', error);
//       throw error;
//     }
//   };
  
  