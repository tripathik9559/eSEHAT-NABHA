import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, AlertCircle, X } from 'lucide-react';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';
import { useLanguage } from '../../hooks/useLanguage';

const OfflineIndicator = ({ position = 'bottom' }) => {
  const isOffline = useOfflineStatus();
  const { t } = useLanguage();
  const [showIndicator, setShowIndicator] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShowIndicator(true);
      setWasOffline(true);
      setIsDismissed(false);
    } else if (wasOffline && !isOffline) {
      // Show reconnected message briefly
      setShowIndicator(true);
      setTimeout(() => {
        setShowIndicator(false);
        setWasOffline(false);
      }, 3000);
    }
  }, [isOffline, wasOffline]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowIndicator(false);
  };

  if (!showIndicator || isDismissed) return null;

  // Position classes
  const positionClasses = {
    top: 'top-20 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-20 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-20 left-4',
    'bottom-left': 'bottom-4 left-4'
  };

  const positionClass = positionClasses[position] || positionClasses.bottom;

  return (
    <>
      {/* Main Offline Indicator */}
      {isOffline ? (
        <div
          className={`fixed ${positionClass} z-50 animate-slide-in-right`}
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] max-w-md">
            <WifiOff className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {t?.offlineTitle || 'No Internet Connection'}
              </p>
              <p className="text-xs opacity-90">
                {t?.offlineMessage || 'You are currently offline. Some features may be limited.'}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-red-700 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Reconnected Indicator */
        <div
          className={`fixed ${positionClass} z-50 animate-slide-in-right`}
          role="alert"
          aria-live="polite"
        >
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] max-w-md">
            <Wifi className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {t?.reconnectedTitle || 'Back Online'}
              </p>
              <p className="text-xs opacity-90">
                {t?.reconnectedMessage || 'Your connection has been restored.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Top Banner (Optional) */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-gray-900 px-4 py-2 z-40 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>
              {t?.offlineBanner || 'You are offline. Data will sync when connection is restored.'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

// Mini offline badge for header/navbar
export const OfflineBadge = () => {
  const isOffline = useOfflineStatus();
  const { t } = useLanguage();

  if (!isOffline) return null;

  return (
    <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-200">
      <WifiOff className="w-3.5 h-3.5 animate-pulse" />
      <span>{t?.offline || 'Offline'}</span>
    </div>
  );
};

// Connection status icon
export const ConnectionStatus = ({ showLabel = false, size = 'sm' }) => {
  const isOffline = useOfflineStatus();
  const { t } = useLanguage();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className="flex items-center gap-2">
      {isOffline ? (
        <>
          <WifiOff className={`${iconSize} text-red-600 animate-pulse`} />
          {showLabel && (
            <span className="text-sm text-red-600 font-medium">
              {t?.offline || 'Offline'}
            </span>
          )}
        </>
      ) : (
        <>
          <Wifi className={`${iconSize} text-green-600`} />
          {showLabel && (
            <span className="text-sm text-green-600 font-medium">
              {t?.online || 'Online'}
            </span>
          )}
        </>
      )}
    </div>
  );
};

// Inline offline warning for forms/actions
export const OfflineWarning = ({ className = '' }) => {
  const isOffline = useOfflineStatus();
  const { t } = useLanguage();

  if (!isOffline) return null;

  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-3 ${className}`}>
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-800">
            {t?.offlineWarningTitle || 'Limited Functionality'}
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            {t?.offlineWarningMessage || 'Some features are unavailable while offline. Your changes will be saved locally and synced when you reconnect.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;