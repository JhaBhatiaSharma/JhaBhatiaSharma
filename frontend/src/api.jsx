import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api/auth', // Update with your backend's base URL
});

// Attach token for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
