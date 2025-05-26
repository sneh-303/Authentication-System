import axios from 'axios';
import { useState } from 'react';
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Export a function to fetch profile
export const fetchProfile = () => { 
  const token = localStorage.getItem('token');
  console.log("token ===", token);

 
  return api.get('/auth/profile', {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};

export default api;
