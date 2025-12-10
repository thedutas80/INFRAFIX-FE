import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { verifyEmail } from '../api/authApi';

const MySwal = withReactContent(Swal);

const VerifyEmail: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messsage, setMessage] = useState('');
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false && token) {
      const verify = async () => {
        try {
          const response = await verifyEmail(token);
          if (response.success) {
            setMessage(response.data || 'Email verified successfully');
            MySwal.fire({
              icon: 'success',
              title: 'Verify Email Success',
              text: response.data || 'Email already verified',
              timer: 3000,
              showConfirmButton: false
            });
          } else {
             setError(true);
             setMessage(response.message || 'Verification failed');
          }
        } catch (err: any) {
          setError(true);
          setMessage(err.message || 'Verification failed');
        } finally {
          setLoading(false);
        }
      };
      verify();
      effectRan.current = true; // prevent double firing in StrictMode
    } else if (!token) {
       setLoading(false);
       setError(true);
       setMessage('No token provided');
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Verifying...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className="h-20 w-auto"
          />
        </div>
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {error ? 'Verification Failed' : 'Registration Successful'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error ? 'There was an error verifying your email.' : 'Your email has been successfully verified.'}
          </p>
        </div>
        <div className="mt-4">
           <div className={`p-4 rounded-md text-sm mb-6 ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {messsage}
           </div>

           <Link
             to="/login"
             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
           >
             Go to Login
           </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
