import { api } from './config';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const decodeJWT = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token);
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
  const token = localStorage.getItem('token');
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

export const updateProfile = async (id: number | string, data: any) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.put(`/users/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
