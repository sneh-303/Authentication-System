import axios from 'axios';

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  baseURL: `https://authentication-system-3-y5zg.onrender.com/api`,
  withCredentials: true, 
  // baseURL: `https://authentication-system-3-y5zg.onrender.com/api`,
});

// General GET request handler
const getRequest = (endpoint) => {
  const token = localStorage.getItem('token');
  console.log("token ===", token);

  return api.get(endpoint, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    },
    withCredentials: true, 
  });
};

// Specific API functions
export const fetchProfile = () => getRequest('/auth/profile');
export const fetchAllUsers = () => getRequest('/auth/userList');
export const loginUser = (data) => api.post("/auth/login", data);



export default api;
