import { api } from './config';
import * as jwtDecode from 'jwt-decode';

export interface LoginResponse {
  data: {
    roleId: number;
    email: string;
    token: string;
  };
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
}

export interface JWTPayload {
  role: string;
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Access denied');
    }
    throw error;
  }
};

export const decodeJWT = (token: string): JWTPayload => {
  try {
    const decoded = jwtDecode.jwtDecode(token) as JWTPayload;
    return {
      role: decoded.role,
      userId: decoded.userId,
      sub: decoded.sub,
      iat: decoded.iat,
      exp: decoded.exp
    };
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
};

export interface UsersResponse {
  data: {
    total_data: number;
    column_name: string;
    size_per_page: number;
    total_pages: number;
    sort_by: string;
    sort: string;
    value: string;
    content: UserData[];
    current_page: number;
  };
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  postCode: string;
  createdDate: string | null;
  createdBy: string | null;
}

export const getUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export interface UserByIdResponse {
  data: UserData;
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
}

export const getUserById = async (id: number): Promise<UserByIdResponse> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export interface CreateUserRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  postCode: string;
  role: string;
  status: number;
}

export interface CreateUserResponse {
  data: UserData;
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
}

export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  postCode: string;
  roleId: number;
}

export interface RegisterResponse {
  data: any; // Adjust based on actual response
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/users', data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
