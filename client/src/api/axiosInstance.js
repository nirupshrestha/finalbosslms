import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Fix 1: Proper token retrieval
    let accessToken;
    try {
      const tokenItem = sessionStorage.getItem("accessToken");
      // Handle both cases: token stored as JSON string or direct string
      accessToken = tokenItem ? (tokenItem.startsWith('"') ? JSON.parse(tokenItem) : tokenItem) : "";
    } catch (e) {
      accessToken = "";
      console.error("Error parsing token from sessionStorage:", e);
    }
    
    // Fix 2: Ensure proper Bearer format with space after "Bearer"
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;