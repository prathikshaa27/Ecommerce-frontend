import api from './axios';

const BASE_URL = 'http://localhost:8000/api';

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

export const removeFromCart = async (productId) => {
  try {
    const csrftoken = getCookie('csrftoken');
    const response = await api.delete(`${BASE_URL}/cart/${productId}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCartProducts = async () => {
  try {
    const csrftoken = getCookie('csrftoken');
    const response = await api.get(`${BASE_URL}/view/cart/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

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
    const response = await api.post(`${BASE_URL}/orders/`, orderData, {
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
    const response = await api.get(`${BASE_URL}/view/orders/`, {
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