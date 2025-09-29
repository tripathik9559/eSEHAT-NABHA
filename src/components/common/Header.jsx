import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { translate } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'nav.dashboard', href: '/dashboard', icon: '📊' },
    { key: 'nav.doctors', href: '/doctors', icon: '👨‍⚕️' },
    { key: 'nav.records', href: '/records', icon: '📋' },
    { key: 'nav.symptom-checker', href: '/symptom-checker', icon: '🔍' },
    { key: 'nav.medicine-tracker', href: '/medicine-tracker', icon: '💊' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">🏥</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white text-lg md:text-xl font-bold">
                {translate('app.title', 'Telemedicine - Nabha')}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden lg:block">{translate(item.key)}</span>
              </a>
            ))}
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">{translate('common.menu', 'Menu')}</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-500 py-3">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500 transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{translate(item.key)}</span>
                </a>
              ))}
              
              {/* Language switcher for mobile */}
              <div className="px-3 py-2 border-t border-blue-500 mt-2 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;