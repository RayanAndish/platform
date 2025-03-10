import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Auth
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => 
    api.post('/auth/register', data),
  
  // Projects
  getProjects: () => 
    api.get('/projects'),
  getProjectById: (id: string) => 
    api.get(`/projects/${id}`),
  createProject: (data: any) => 
    api.post('/projects', data),
  
  // Staking
  stake: (amount: string) => 
    api.post('/staking/stake', { amount }),
  unstake: (amount: string) => 
    api.post('/staking/unstake', { amount }),
  getStakingInfo: () => 
    api.get('/staking/info'),
  
  // Voting
  getProposals: () => 
    api.get('/voting/proposals'),
  getProposalById: (id: string) => 
    api.get(`/voting/proposals/${id}`),
  createProposal: (data: any) => 
    api.post('/voting/proposals', data),
  vote: (proposalId: string, vote: boolean) => 
    api.post(`/voting/vote/${proposalId}`, { vote }),
  
  // DAO
  getDAOInfo: () => 
    api.get('/dao/info'),
  getDAOMembers: () => 
    api.get('/dao/members'),
  
  // User
  getUserProfile: () => 
    api.get('/users/profile'),
  updateUserProfile: (data: any) => 
    api.put('/users/profile', data),
};

export default apiService; 