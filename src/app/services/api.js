import axios from 'axios';
import {
  mockCandidates,
  mockAssessments,
  mockResults,
  mockQuestions,
  mockPrompts,
  mockRoles,
} from '../utils/mockData';

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock API delay for realistic simulation
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Auth API
export const authAPI = {
  login: async (credentials) => {
    await mockDelay();
    return { data: { id: '1', name: 'Admin User', email: credentials.email } };
  },
  logout: async () => {
    await mockDelay();
    localStorage.removeItem('authToken');
  },
};

// Candidate API
export const candidateAPI = {
  getAll: async () => {
    const { data } = await api.get('/candidates/get_candidates');
    return data;
  },
  getById: async (id) => {
    await mockDelay();
    const candidate = mockCandidates.find(c => c.id === id);
    return { data: candidate };
  },
  update: async (id, data) => {
    await mockDelay();
    return { data: { id, ...data } };
  },
  delete: async (id) => {
    await mockDelay();
    return { data: { success: true } };
  },
};


// Result API
export const resultAPI = {
  getAll: async (filters) => {
    await mockDelay();
    return { data: mockResults };
  },
  export: async (format) => {
    await mockDelay();
    return { data: { url: 'mock-export-url', format } };
  },
};

// Question API
export const questionAPI = {
  getAll: async () => {
    await mockDelay();
    return { data: mockQuestions };
  },
  create: async (data) => {
    await mockDelay();
    return { data: { id: Date.now().toString(), ...data } };
  },
  update: async (id, data) => {
    await mockDelay();
    return { data: { id, ...data } };
  },
  delete: async (id) => {
    await mockDelay();
    return { data: { success: true } };
  },
  bulkUpload: async (file) => {
    await mockDelay();
    return { data: { success: true, count: 10 } };
  },
};

// Prompt API
export const promptAPI = {
  getAll: async () => {
    await mockDelay();
    return { data: mockPrompts };
  },
  update: async (id, data) => {
    await mockDelay();
    return { data: { id, ...data } };
  },
  generateQuestions: async (promptId) => {
    await mockDelay();
    return { data: { success: true, questionsGenerated: 5 } };
  },
};

// Role API
export const roleAPI = {
  getAll: async () => {
    const response = await api.get('/roles/get_roles'); // your backend route
    return response.data.roles;
  },
  create: async (data) => {
    const response = await api.post('/roles/create_role', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/roles/update_role`, data, { params: { id } });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/roles/delete_role`, { params: { id } });
    return response.data;
  },
};

export default api;
