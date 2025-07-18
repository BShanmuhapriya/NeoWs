import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This points to your Express backend
});

export default api;