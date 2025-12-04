import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  appName: string
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  const location = useLocation()
  const hideAuthButtons =
    location.pathname === '/register' || location.pathname === '/login'

  return (
    <nav className="bg-white shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src="/assets/img/logo.png"
            alt={`${appName} Logo`}
            className="h-10"
            id="navbar-logo"
          />
        </Link>
        {!hideAuthButtons && (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-primary hover:text-secondary font-semibold transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
