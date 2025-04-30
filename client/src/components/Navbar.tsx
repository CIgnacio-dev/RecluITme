import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            Reclu<span className="text-gray-800">IT</span>me
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition">Inicio</Link>
            <Link to="/profiles" className="hover:text-blue-600 transition">Perfiles</Link>
            <Link to="/register" className="hover:text-blue-600 transition">Registro</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          </div>

          {/* Desktop login button */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link to="/" className="block px-2 py-1 hover:text-blue-600">Inicio</Link>
            <Link to="/profiles" className="block px-2 py-1 hover:text-blue-600">Perfiles</Link>
            <Link to="/register" className="block px-2 py-1 hover:text-blue-600">Registro</Link>
            <Link to="/dashboard" className="block px-2 py-1 hover:text-blue-600">Dashboard</Link>
            <Link
              to="/login"
              className="block px-2 py-1 text-blue-600 font-semibold"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
