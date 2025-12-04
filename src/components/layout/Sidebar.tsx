import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTasks, FaThLarge, FaClipboardList, FaBell, FaChartLine, FaStar, FaFileAlt } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: FaHome, path: '/dashboard-home' },
    { name: 'Assignments', icon: FaTasks, path: '/dashboard/assignments' },
    { name: 'Categories', icon: FaThLarge, path: '/dashboard/categories' },
    { name: 'Audit', icon: FaClipboardList, path: '/dashboard/audit' },
    { name: 'Notifications', icon: FaBell, path: '/dashboard/notifications' },
    { name: 'Progress', icon: FaChartLine, path: '/dashboard/progress' },
    { name: 'Ratings', icon: FaStar, path: '/dashboard/ratings' },
    { name: 'Report', icon: FaFileAlt, path: '/dashboard/report' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-teal-700 text-white p-4 z-40 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <nav className="pt-16">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-md ${
                  location.pathname === item.path ? 'bg-teal-600' : 'hover:bg-yellow-500 hover:text-black'
                }`}
                onClick={toggleSidebar} // Close sidebar on navigation for mobile
              >
                <item.icon className="mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
