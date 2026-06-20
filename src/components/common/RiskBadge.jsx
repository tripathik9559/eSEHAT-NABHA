import React from 'react';

const CONFIG = {
  high:     { label: '🔴 High Risk',     bg: 'bg-red-100 dark:bg-red-900/40',     text: 'text-red-700 dark:text-red-400',     border: 'border-red-300 dark:border-red-700',     dot: 'bg-red-500' },
  moderate: { label: '🟡 Moderate',      bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-700', dot: 'bg-amber-500' },
  mild:     { label: '🟢 Mild',          bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700', dot: 'bg-emerald-500' },
  immediate:{ label: '🚨 Immediate',     bg: 'bg-red-100 dark:bg-red-900/40',     text: 'text-red-700 dark:text-red-400',     border: 'border-red-300 dark:border-red-700',     dot: 'bg-red-600' },
};

export default function RiskBadge({ level, size = 'sm', showDot = true }) {
  const c = CONFIG[level?.toLowerCase()] || CONFIG.mild;
  const sizeClass = size === 'lg' ? 'px-4 py-2 text-sm font-semibold rounded-xl' : size === 'md' ? 'px-3 py-1.5 text-xs font-semibold rounded-lg' : 'px-2.5 py-1 text-xs font-medium rounded-lg';
  return (
    <span className={`inline-flex items-center gap-1.5 border ${c.bg} ${c.text} ${c.border} ${sizeClass}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${level === 'high' || level === 'immediate' ? 'animate-pulse' : ''}`}></span>}
      {c.label}
    </span>
  );
}
