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


api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {

      return Promise.reject(error);
    }
  );

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
        `${BASE_URL}/view/cart/`,
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
      const response = await axios.get(`${BASE_URL}/view/orders/`, {
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
  
  
  
  