import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // This points to your Express backend
});

export default api;