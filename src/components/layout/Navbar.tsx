import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';
import { decodeJWT } from '../../api/authApi';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [apiUserName, setApiUserName] = useState<string>('');
  const [apiUserRole, setApiUserRole] = useState<string>('');

  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn && user) {
      setApiUserName(user.name);
      setApiUserRole(user.role);
    }
  }, [isLoggedIn, user]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getRoleFromToken = () => {
    if (user?.token) {
      try {
        const decoded = decodeJWT(user.token);
        return decoded.role.toLowerCase();
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        return user?.role || 'unknown';
      }
    }
    return user?.role || 'unknown';
  };

  const getRoleDisplayText = (role: string) => {
    switch (role.toLowerCase()) {
      case 'citizen':
        return 'Warga';
      case 'technical':
        return 'Teknisi';
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
          <img src="/assets/img/logo.png" alt="LaporinYuk Logo" className="h-8 mr-2" />
          <span className="text-xl font-semibold text-gray-800"></span>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4 ml-4 relative">
          <div className="flex flex-col items-end">
            <span className="text-gray-700 font-bold name">
              {getRoleFromToken() === 'citizen' ? (user?.email?.split("@")[0] || '') : apiUserName}
            </span>
            <span className="text-gray-700 role">{getRoleDisplayText(apiUserRole)}</span>
          </div>
          <div className="relative">
            <button onClick={handleDropdownToggle} className="focus:outline-none">
              <img src="/assets/img/author.png" alt="User Avatar" className="h-8 w-8 rounded-full cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
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
