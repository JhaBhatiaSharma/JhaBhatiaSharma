import axios from "axios";


const isProduction = process.env.NODE_ENV === "production";


const API_BASE_URL = isProduction
  ? "https://jhabhatiasharma.onrender.com/api" // Use deployed backend
  : "http://localhost:5001/api"; // Use local backend when in development

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const fetchRecommendedInternships = () =>
  API.get("/internships/recommended");

export const fetchUserCV = () => API.get("/cv/latest"); 

export const createCV = (cvData) => API.post("/cv", cvData); 

export default API;
