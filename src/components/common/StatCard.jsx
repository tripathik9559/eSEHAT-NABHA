import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function StatCard({ icon, label, value, sub, trend, color = 'blue', onClick, className = '' }) {
  const { isDark } = useTheme();
  const colorMap = {
    blue: { icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', trend: 'text-blue-600 dark:text-blue-400' },
    green: { icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', trend: 'text-emerald-600 dark:text-emerald-400' },
    orange: { icon: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800', trend: 'text-orange-600 dark:text-orange-400' },
    red: { icon: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800', trend: 'text-red-600 dark:text-red-400' },
    purple: { icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800', trend: 'text-purple-600 dark:text-purple-400' },
    teal: { icon: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800', trend: 'text-teal-600 dark:text-teal-400' },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div onClick={onClick} className={`rounded-2xl border p-5 transition-all duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : ''} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${c.icon}`}>{icon}</div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className={`text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</div>
      {sub && <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  );
}
