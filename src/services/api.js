import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};


const getCsrfToken = () => {
  const cookieValue = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
  return cookieValue ? cookieValue[2] : null;
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCsrfToken(),
  },
});


export const signup = async (data) => {
  try {
    const requestData = {
      ...data,
      profile: {
        mobile: data.mobile,
        address: data.address,
        pincode: data.pincode,
      },
    };

    const response = await api.post('/customer/signup/', requestData);
    return response.data;
  } 
  catch (error)
   {
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
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout/`, {}, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
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
export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}/`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFilteredProducts = async (category, minPrice, maxPrice) => {
  try {
    const csrftoken = getCookie('csrftoken'); 
    const response = await axios.get(`${BASE_URL}/category-price-filter/`, {
      params: {
        category,
        min_price: minPrice,
        max_price: maxPrice
      },
      withCredentials: true,
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



export const fetchUserProfile = async () => {
  try {
    
    const response = await api.get('/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async (formData) => {
  try {
    
    const response = await api.put('/profile/', formData);
    return response.data;
  } catch (error) {
    throw error  ;
  }
};

export const addToCart = async (productId) => {
  try {
    const csrftoken = getCookie('csrftoken');

    const response = await axios.post(
      `${BASE_URL}/cart/${productId}/`,
      {},
      {
        withCredentials: true,  
        headers: {
          'X-CSRFToken': csrftoken  
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const csrftoken = getCookie('csrftoken');

    const response = await axios.delete(
      `${BASE_URL}/cart/${productId}/`,
      {
        withCredentials: true,  
        headers: {
          'X-CSRFToken': csrftoken,  
          'X-Requested-With': 'XMLHttpRequest' 
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

  
export const fetchCartProducts = async () => {
  try {
    const csrftoken = getCookie('csrftoken');

    const response = await axios.get(
      `${BASE_URL}/view_cart/`,
      {
        withCredentials: true,  
        headers: {
          'X-CSRFToken': csrftoken,  
          'X-Requested-With': 'XMLHttpRequest'  
        }
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching cart products:', error);
    throw error;
  }
};


export const placeOrder = async (orderData) => {
  try {
    const csrftoken = getCookie('csrftoken');
    const response = await axios.post(`${BASE_URL}/orders/`, orderData, {
      withCredentials: true,  
      headers: {
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(orderData)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    const csrftoken = getCookie('csrftoken');
    const response = await axios.get(`${BASE_URL}/view_orders/`, {
      withCredentials: true,  
      headers: {
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const checkAuthentication = async () => {
  try {
    const response = await axios.get('/api/check/session/');
    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};