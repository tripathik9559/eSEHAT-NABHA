import React, { useState } from 'react';
import { 
  ChevronLeft, 
  History, 
  Clock, 
  Activity, 
  Eye, 
  Trash2, 
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Calendar,
  Filter
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const SymptomHistory = ({ history, onViewItem, onBack, onClearHistory }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // all, high, medium, low
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getUrgencyConfig = (level) => {
    switch (level) {
      case 'high':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          icon: AlertTriangle,
          label: t?.highUrgency || 'High'
        };
      case 'medium':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          icon: AlertCircle,
          label: t?.mediumUrgency || 'Medium'
        };
      default:
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          icon: CheckCircle,
          label: t?.lowUrgency || 'Low'
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t?.justNow || 'Just now';
    if (diffMins < 60) return `${diffMins} ${t?.minutesAgo || 'min ago'}`;
    if (diffHours < 24) return `${diffHours} ${t?.hoursAgo || 'hours ago'}`;
    if (diffDays === 1) return t?.yesterday || 'Yesterday';
    if (diffDays < 7) return `${diffDays} ${t?.daysAgo || 'days ago'}`;
    return formatDate(dateString);
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.urgencyLevel === filter);

  const handleClearHistory = () => {
    if (showClearConfirm) {
      onClearHistory();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 md:p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            {t?.back || 'Back'}
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <History className="w-6 h-6 text-blue-600" />
                {t?.symptomHistory || 'Symptom History'}
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                {t?.symptomHistoryDesc || 'Review your previous symptom checks'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Filter and Actions */}
          {history.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-1" />
                  {t?.all || 'All'} ({history.length})
                </button>
                <button
                  onClick={() => setFilter('high')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'high'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t?.highUrgency || 'High'} ({history.filter(h => h.urgencyLevel === 'high').length})
                </button>
                <button
                  onClick={() => setFilter('medium')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'medium'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t?.mediumUrgency || 'Medium'} ({history.filter(h => h.urgencyLevel === 'medium').length})
                </button>
                <button
                  onClick={() => setFilter('low')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'low'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t?.lowUrgency || 'Low'} ({history.filter(h => h.urgencyLevel === 'low').length})
                </button>
              </div>

              {/* Clear History Button */}
              {!showClearConfirm ? (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  {t?.clearHistory || 'Clear History'}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleClearHistory}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t?.confirmClear || 'Confirm Clear'}
                  </button>
                  <button
                    onClick={handleCancelClear}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm font-medium"
                  >
                    {t?.cancel || 'Cancel'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* History List */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((item, index) => {
                const urgencyConfig = getUrgencyConfig(item.urgencyLevel);
                const UrgencyIcon = urgencyConfig.icon;

                return (
                  <div
                    key={item.id || index}
                    className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left Section - Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`${urgencyConfig.bgColor} ${urgencyConfig.borderColor} border p-2 rounded-lg`}>
                            <UrgencyIcon className={`w-5 h-5 ${urgencyConfig.textColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${urgencyConfig.bgColor} ${urgencyConfig.textColor}`}>
                                {urgencyConfig.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {getRelativeTime(item.timestamp)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(item.timestamp)} • {formatTime(item.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Symptoms */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-700">
                              {item.symptoms.length} {t?.symptoms || 'Symptoms'}:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.symptoms.slice(0, 3).map((symptom, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs border border-blue-200"
                              >
                                {symptom}
                              </span>
                            ))}
                            {item.symptoms.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                +{item.symptoms.length - 3} {t?.more || 'more'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top Condition */}
                        {item.possibleConditions && item.possibleConditions[0] && (
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">{t?.topCondition || 'Top match'}:</span>{' '}
                            {item.possibleConditions[0].name} ({item.possibleConditions[0].probability}%)
                          </div>
                        )}
                      </div>

                      {/* Right Section - Action */}
                      <button
                        onClick={() => onViewItem(item)}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        <Eye className="w-4 h-4" />
                        {t?.viewDetails || 'View Details'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              {filter === 'all' ? (
                <>
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {t?.noHistoryYet || 'No History Yet'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t?.noHistoryDesc || 'Your symptom check history will appear here'}
                  </p>
                  <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    <Activity className="w-5 h-5" />
                    {t?.startFirstCheck || 'Start Your First Check'}
                  </button>
                </>
              ) : (
                <>
                  <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {t?.noResultsForFilter || 'No Results for This Filter'}
                  </h3>
                  <p className="text-gray-500">
                    {t?.tryDifferentFilter || 'Try selecting a different urgency level'}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomHistory;