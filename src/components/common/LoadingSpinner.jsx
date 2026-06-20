import React from 'react';
import { useTheme } from '../../context/ThemeContext';
export default function LoadingSpinner({ text = 'Loading...' }) {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full bg-blue-600/10 dark:bg-blue-600/20"></div>
      </div>
      <p className={`mt-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{text}</p>
    </div>
  );
}
