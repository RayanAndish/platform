import { useState, useCallback, useEffect } from 'react';
import { web3Service } from '../services/web3.service';
import { tokenService } from '../services/token.service';

interface AuthState {
  isAuthenticated: boolean;
  address: string | null;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    address: null,
    token: null,
    loading: true,
  });

  const checkAuth = useCallback(async () => {
    try {
      const token = tokenService.getToken();
      const address = await web3Service.getAddress();
      
      setState({
        isAuthenticated: Boolean(token && address),
        address,
        token,
        loading: false,
      });
    } catch (error) {
      setState({
        isAuthenticated: false,
        address: null,
        token: null,
        loading: false,
      });
    }
  }, []);

  const login = useCallback(async () => {
    try {
      await web3Service.connect();
      const address = await web3Service.getAddress();
      const token = await tokenService.generateToken(address);
      
      setState({
        isAuthenticated: true,
        address,
        token,
        loading: false,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await web3Service.disconnect();
      tokenService.removeToken();
      
      setState({
        isAuthenticated: false,
        address: null,
        token: null,
        loading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
};