import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://phb.onrender.com";

// Request interceptor to add access token and refresh token to the request body
axios.interceptors.request.use(
  (config) => {
    if (config.url === "/add" || config.url === "/getall") {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      // Modify the request data to include the tokens
      if (
        config.method === "post" ||
        config.method === "put" ||
        config.method === "delete"
      ) {
        config.data = config.data || {};
        config.data.accessToken = accessToken;
        config.data.refreshToken = refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default axios;
