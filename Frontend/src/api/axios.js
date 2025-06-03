import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// General GET request handler
const getRequest = (endpoint) => {
  const token = localStorage.getItem('token');
  console.log("token ===", token);

  return api.get(endpoint, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};

// Specific API functions
export const fetchProfile = () => getRequest('/auth/profile');
export const fetchAllUsers = () => getRequest('/auth/userList');
export const loginUser = (data) => api.post("/auth/login", data);



export default api;
