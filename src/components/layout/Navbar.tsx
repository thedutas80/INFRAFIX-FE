import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';
import { jwtDecode } from 'jwt-decode';

interface NavbarProps {
  toggleSidebar: () => void;
}

interface DecodedToken {
  role: string;
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuthStore();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserData = () => {
    if (user?.token) {
      try {
        const decoded = jwtDecode<DecodedToken>(user.token);
        const name = decoded.sub ? decoded.sub.split('@')[0] : 'User';
        const role = decoded.role || 'user';
        return { name, role };
      } catch (error) {
        console.error('Failed to decode JWT:', error);
      }
    }
    return { name: user?.name || '', role: user?.role || '' };
  };

  const { name: displayName, role: displayRole } = getUserData();

  const getRoleDisplayText = (role: string) => {
    switch (role.toLowerCase()) {
      case 'citizen':
        return 'Citizen';
      case 'technical':
        return 'Technical';
      case 'admin':
        return 'Admin';
      case 'unknown':
        return 'User';
      default:
        return role;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between z-50">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-800 mr-4 lg:hidden cursor-pointer">
          <FaBars size={24} />
        </button>
        <Link to="/dashboard" className="flex items-center">
          <img src="https://i.ibb.co.com/sJyHjYTQ/logo.png" alt="LaporinYuk Logo" className="h-8 mr-2" />
          <span className="text-xl font-semibold text-gray-800"></span>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4 ml-4 relative">
          <div className="flex flex-col items-end">
            <span className="text-gray-700 font-bold name">
              {displayName}
            </span>
            <span className="text-gray-700 role">{getRoleDisplayText(displayRole)}</span>
          </div>
          <div className="relative">
            <button onClick={handleDropdownToggle} className="focus:outline-none">
              <img src="https://i.ibb.co.com/Q3ZsY7Dy/author.png" alt="User Avatar" className="h-8 w-8 rounded-full cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">

                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link to="/login" className="text-gray-700 hover:text-primary font-medium">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
