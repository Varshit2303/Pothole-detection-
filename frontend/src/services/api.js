import axios from 'axios';

const api = axios.create({
  // Proxy handles /api in dev, relative path in prod
  baseURL: '/api'
});

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/predict/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
