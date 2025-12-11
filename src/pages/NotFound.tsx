import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();
  const requestedPath = location.pathname;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <img src="https://i.ibb.co.com/MD4mq3G3/404.png" alt="404 Not Found" className="max-w-md mb-8" />
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-2">
        The page <code className="font-mono bg-gray-200 p-1 rounded">{requestedPath}</code> you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <p className="text-lg text-gray-600 mb-8">
        Please check the URL or go back to the homepage.
      </p>
      <Link to="/" className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
