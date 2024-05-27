import api from './axios';

const BASE_URL = 'http://localhost:8000/api';

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

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

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout/', {}, {
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
    const response = await api.put('/profile/', formData, {
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