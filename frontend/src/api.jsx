import axios from "axios";

// Automatically detect environment
const isProduction = process.env.NODE_ENV === "production";

// Use the correct API base URL
const API_BASE_URL = isProduction
  ? "https://jhabhatiasharma.onrender.com/api" // ✅ Use deployed backend
  : "http://localhost:5001/api"; // ✅ Use local backend when in development

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach authorization token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Calls
export const fetchRecommendedInternships = () =>
  API.get("/internships/recommended");

export const fetchUserCV = () => API.get("/cv/latest"); // ✅ Matches backend route

export const createCV = (cvData) => API.post("/cv", cvData); // ✅ Ensures proper CV creation

export default API;
