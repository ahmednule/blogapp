// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // Adjust the baseURL if necessary
});

// Axios interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => response, // Pass successful responses through
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Token expired or invalid. Redirecting to login...');
      localStorage.removeItem('token'); // Clear the expired token
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
