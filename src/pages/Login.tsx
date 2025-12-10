import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAuthStore from '../store/authStore';
import { login } from '../api/authApi';

const MySwal = withReactContent(Swal);

const getRoleFromId = (roleId: number): string => {
  switch (roleId) {
    case 1: return 'citizen';
    case 2: return 'admin';
    case 3: return 'technician';
    default: return 'unknown';
  }
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);
  const { isLoggedIn } = useAuthStore(); // Get isLoggedIn state

  useEffect(() => {
    loadCaptchaEnginge(6); // 6 is the number of characters in the captcha
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const doSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCaptcha(captchaInput) === false) {
      toast.error('Captcha salah, silakan coba lagi!')
      return
    }

    setIsCaptchaValid(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        MySwal.fire({
          icon: 'success',
          title: 'Login Success!',
          text: response.message,
          timer: 2000,
          showConfirmButton: false
        });
        const { token, email: userEmail, roleId } = response.data;
        const role = getRoleFromId(roleId);
        loginUser({ email: userEmail, name: userEmail, roleId, role, token });
        navigate('/dashboard');
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'Access denied') {
        toast.error('Access denied: Invalid credentials');
      } else {
        toast.error('An error occurred during login.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={doSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  {showPassword ? (
                    // Eye-slash icon
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.268 5.727M12 12h.01"
                      ></path>
                    </svg>
                  ) : (
                    // Eye icon
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CAPTCHA */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verifikasi Captcha
            </label>

            {/* gambar captcha */}
            <LoadCanvasTemplate reloadText="Reload" />

            <input
              type="text"
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan captcha di atas"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon-s-lock */}
                <svg
                  className="h-5 w-5 text-primary-light group-hover:text-primary-lighter"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-secondary"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login