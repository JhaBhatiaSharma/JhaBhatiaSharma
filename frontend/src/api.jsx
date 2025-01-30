// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchRecommendedInternships = () => API.get('/internships/recommended');
export const fetchUserCV = () => API.get('/cv/latest');  // This matches the new route
export const createCV = (cvData) => API.post('/cv', cvData);  // Add this function

export default API;