import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
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
      <div className="flex items-center space-x-4 ml-4">
        <div className="flex flex-col items-end">
          <span className="text-gray-700 font-bold">LAMINE YAMAL</span>
          <span className="text-sm text-gray-500">Admin</span>
        </div>
        <img src="/assets/img/author.png" alt="User Avatar" className="h-8 w-8 rounded-full" />
        <Link to="/settings">
          <img src="/assets/img/setting.png" alt="Settings" className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
