import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  fullScreen = false, 
  text = null,
  className = '' 
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color configurations
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  // Text size based on spinner size
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.blue;
  const textSize = textSizeClasses[size] || textSizeClasses.md;

  // Full screen loading overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className={`${spinnerSize} ${spinnerColor} animate-spin`} />
          {text && (
            <p className={`${textSize} font-medium text-gray-700 animate-pulse`}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Inline loading spinner
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${spinnerSize} ${spinnerColor} animate-spin`} />
      {text && (
        <p className={`${textSize} font-medium text-gray-700`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Alternative spinner styles
export const DotSpinner = ({ size = 'md', color = 'blue' }) => {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600'
  };

  const dotSize = dotSizes[size] || dotSizes.md;
  const dotColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="flex items-center justify-center gap-1">
      <div className={`${dotSize} ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
      <div className={`${dotSize} ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`${dotSize} ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};

// Pulse spinner
export const PulseSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="flex items-center justify-center">
      <div className={`${spinnerSize} ${spinnerColor} border-4 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

// Skeleton loader for content
export const SkeletonLoader = ({ 
  type = 'text', 
  lines = 3, 
  className = '' 
}) => {
  if (type === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-200 rounded loading-skeleton"
            style={{ width: index === lines - 1 ? '70%' : '100%' }}
          ></div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded loading-skeleton"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded loading-skeleton w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded loading-skeleton w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className={`w-12 h-12 bg-gray-200 rounded-full loading-skeleton ${className}`}></div>
    );
  }

  return null;
};

// Loading overlay for sections
export const LoadingOverlay = ({ text = 'Loading...' }) => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;