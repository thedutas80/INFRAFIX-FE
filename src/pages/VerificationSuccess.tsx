import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

interface DecodedToken {
  sub: string; // email
  role: string | number;
  roleId?: number;
  name?: string;
  isEmailVerified?: boolean;
  iat: number;
  exp: number;
}

const VerificationSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      try {
        // Decode the token to get user info
        const decoded = jwtDecode<DecodedToken>(accessToken);
        
        // Prepare user object for store
        // Note: Adjust mapping based on your actual JWT structure
        const userData = {
          email: decoded.sub,
          name: decoded.name || decoded.sub.split('@')[0], // Fallback if name not in token
          roleId: typeof decoded.role === 'number' ? decoded.role : (decoded.roleId || 1), // Default to 1 (citizen) if unknown
          role: typeof decoded.role === 'string' ? decoded.role : 'citizen',
          token: accessToken,
          isEmailVerified: decoded.isEmailVerified
        };

        // Save to store (localStorage handled by store)
        loginUser(userData);

        toast.success('Email verified successfully! You are now logged in.');
        navigate('/dashboard');
        
      } catch (error) {
        console.error('Token decoding failed', error);
        toast.error('Invalid token received.');
        navigate('/login');
      }
    } else {
      // If hit without token, maybe show error or redirect
      toast.error('No access token found.');
      navigate('/login');
    }
  }, [searchParams, navigate, loginUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verifying...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
