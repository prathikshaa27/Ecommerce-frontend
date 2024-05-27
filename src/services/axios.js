import axios from 'axios';

const getCsrfToken = () => {
  const cookieValue = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
  return cookieValue ? cookieValue[2] : null;
};

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCsrfToken(),
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;