import { create } from 'zustand';
import { api } from '../api/config';

interface User {
  name: string;
  email: string;
  roleId: number;
  role: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  let storedUser = localStorage.getItem('user');
  let storedToken = localStorage.getItem('token');
  let initialIsLoggedIn = false;

  if (storedUser && storedToken) {
    initialIsLoggedIn = true;
    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
  }

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    isLoggedIn: initialIsLoggedIn,
    login: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      set({ user, isLoggedIn: true });
    },
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      set({ user: null, isLoggedIn: false });
    },
  };
});

export default useAuthStore;
