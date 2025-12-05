import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between z-50">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-800 mr-4 lg:hidden cursor-pointer">
          <FaBars size={24} />
        </button>
        <Link to="/dashboard" className="flex items-center">
          <img src="/assets/img/logo1.png" alt="LaporinYuk Logo" className="h-8 mr-2" />
          <span className="text-xl font-semibold text-gray-800"></span>
        </Link>
      </div>
      <div className="flex items-center space-x-4 ml-4 relative"> {/* Added relative for dropdown positioning */}
        <div className="flex flex-col items-end">
          <span className="text-gray-700 font-bold">LAMINE YAMAL</span>
          <span className="text-sm text-gray-500">Admin</span>
        </div>
        <div className="relative">
          <button onClick={handleDropdownToggle} className="focus:outline-none">
            <img src="/assets/img/author.png" alt="User Avatar" className="h-8 w-8 rounded-full cursor-pointer" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
        {/* Removed the separate settings icon as it's now in the dropdown */}
      </div>
    </nav>
  );
};

export default Navbar;
