import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const signup = async (data) => {
  try {
    const response = await api.post('/customer/signup/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signin = async (data) => {
  try {
    const response = await api.post('/customer/signin/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
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

export const addToCart = async (productId) => {
  try {
    const response = await api.post(`/cart/${productId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    throw error;
  }
};


