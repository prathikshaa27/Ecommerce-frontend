import api from './axios';

const BASE_URL = 'http://localhost:8000/api';

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/search/?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/categories/products/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFilteredProducts = async (category, minPrice, maxPrice) => {
  try {
    const csrftoken = getCookie('csrftoken'); 
    const response = await api.get(`/category-price-filter/`, {
      params: {
        category,
        min_price: minPrice,
        max_price: maxPrice
      },
      headers: {
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error;
  }
};

export const addToCart = async (productId) => {
  try {
    const csrftoken = getCookie('csrftoken');
    const response = await api.post(`/cart/${productId}/`, {}, {
      headers: {
        'X-CSRFToken': csrftoken  
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};