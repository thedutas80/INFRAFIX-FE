import { api } from './config';
import { jwtDecode } from 'jwt-decode';

export const decodeJWT = (token: string) => {
  return jwtDecode(token);
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const register = async (data: any) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getUserById = async (id: number | string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
