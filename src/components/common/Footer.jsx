import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { translate } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:py-8">
          
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Left side - Copyright and project info */}
            <div className="flex flex-col items-center md:items-start space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏥</span>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {translate('footer.copyright', 'TEAM HACKVEDA')}
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center md:text-left">
                {translate('footer.subtitle', 'Built for Rural Healthcare in Nabha')}
              </p>
            </div>

            {/* Right side - Additional info */}
            <div className="flex flex-col items-center md:items-end space-y-2">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <span>🌐</span>
                  <span>Multi-lingual Support</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>📱</span>
                  <span>Mobile Optimized</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🔒</span>
                  <span>Secure & Private</span>
                </span>
              </div>
              
              {/* Status indicators */}
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-500">System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-400">v1.0.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section - Additional links or info */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <a href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="/support" className="hover:text-blue-600 transition-colors">
                  Support
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>for rural healthcare</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;