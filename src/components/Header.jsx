import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-png-low-resolution.png';

/**
 * Header Component
 * Sticky navigation bar with Exide branding
 * Includes logo, navigation links, and mobile hamburger menu
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links configuration
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/insurance-form', label: 'Submit Claim' },
    { path: '/claim-upload', label: 'Upload Claim' },
    { path: '/claim-status', label: 'Check Status' },
  ];

  /**
   * Check if current path matches link
   * @param {string} path - Link path
   * @returns {boolean}
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu when link is clicked
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            onClick={closeMobileMenu}
          >
            <img 
              src={logo} 
              alt="Exide Logo" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-exide-blue">
                Insurance Portal
              </h1>
              <p className="text-xs text-gray-500">Exide Industries Limited</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 
                  ${isActive(link.path) 
                    ? 'text-exide-red border-b-2 border-exide-red' 
                    : 'text-gray-600 hover:text-exide-red'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
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
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 
          ${isMobileMenuOpen ? 'animate-slide-down' : 'hidden'}
        `}
      >
        <nav className="px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200
                ${isActive(link.path) 
                  ? 'bg-gradient-to-r from-exide-red to-exide-blue text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

// Add slide-down animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
`;
document.head.appendChild(style);

export default Header;

