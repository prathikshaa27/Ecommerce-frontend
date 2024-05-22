// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api';

// const getCookie = (name) => {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : '';
// };

// const getCsrfToken = () => {
//   const cookieValue = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
//   return cookieValue ? cookieValue[2] : null;
// };

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     'X-CSRFToken': getCsrfToken(),
//   },
// });

// export const signup = async (data) => {
//   try {
//     const requestData = {
//       ...data,
//       profile: {
//         mobile: data.mobile,
//         address: data.address,
//         pincode: data.pincode,
//       },
//     };

//     const response = await api.post('/customer/signup/', requestData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signin = async (data) => {
//   try {
//     const response = await api.post('/customer/signin/', data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logoutUser = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/logout/`, {}, {
//       withCredentials: true,
//       headers: {
//         'X-CSRFToken': getCookie('csrftoken'),
//         'X-Requested-With': 'XMLHttpRequest',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchUserProfile = async () => {
//   try {
//     const response = await api.get(`${BASE_URL}/profile/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateProfile = async (formData) => {
//   try {
//     const csrftoken = getCookie('csrftoken');
//     const response = await axios.put(`${BASE_URL}/profile/`, formData, {
//       withCredentials: true,
//       headers: {
//         'X-CSRFToken': csrftoken,
//         'X-Requested-With': 'XMLHttpRequest',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
