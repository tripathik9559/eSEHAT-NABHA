import React, { useState } from 'react';
import {
  Pill,
  Clock,
  Calendar,
  User,
  CheckCircle,
  Circle,
  AlertCircle,
  Info,
  TrendingUp,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const MedicineCard = ({ medicine, onMarkTaken, isTaken, adherence }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Calculate stock percentage
  const stockPercentage = (medicine.stockLeft / medicine.totalStock) * 100;
  
  // Get stock status
  const getStockStatus = () => {
    if (stockPercentage <= 20) {
      return {
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: t?.criticalStock || 'Critical'
      };
    } else if (stockPercentage <= 40) {
      return {
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        label: t?.lowStock || 'Low Stock'
      };
    }
    return {
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: t?.goodStock || 'Good'
    };
  };

  const stockStatus = getStockStatus();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate days left
  const getDaysLeft = () => {
    const end = new Date(medicine.endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4">
          {/* Medicine Icon */}
          <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
            <Pill className="w-6 h-6 text-blue-600" />
          </div>

          {/* Medicine Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              {medicine.name}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded">{medicine.dosage}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{medicine.frequency}</span>
            </div>
            {medicine.prescribedBy && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-3.5 h-3.5" />
                <span>{medicine.prescribedBy}</span>
              </div>
            )}
          </div>

          {/* Adherence Badge */}
          <div className="text-center flex-shrink-0">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              adherence >= 80 ? 'bg-green-100' :
              adherence >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-lg font-bold ${
                adherence >= 80 ? 'text-green-600' :
                adherence >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {adherence}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t?.adherence || 'Adherence'}</p>
          </div>
        </div>

        {/* Timing Schedule */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              {t?.todaySchedule || "Today's Schedule"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {medicine.timing.map((timing, index) => {
              const taken = isTaken(medicine, timing);
              return (
                <button
                  key={index}
                  onClick={() => !taken && onMarkTaken(medicine.id, timing)}
                  disabled={taken}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                    taken
                      ? 'bg-green-50 border-green-200 cursor-default'
                      : 'bg-white border-gray-200 hover:border-blue-400 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {taken ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <div className="text-left">
                      <p className={`text-sm font-medium ${
                        taken ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {timing}
                      </p>
                      <p className="text-xs text-gray-500">{medicine.times[index]}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stock and Duration Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Stock */}
          <div className={`${stockStatus.bg} ${stockStatus.border} border rounded-lg p-3`}>
            <div className="flex items-center gap-2 mb-2">
              <Package className={`w-4 h-4 ${stockStatus.color}`} />
              <span className={`text-xs font-semibold ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800">
              {medicine.stockLeft} / {medicine.totalStock}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full ${
                  stockPercentage <= 20 ? 'bg-red-600' :
                  stockPercentage <= 40 ? 'bg-orange-600' : 'bg-green-600'
                }`}
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600">
                {t?.daysLeft || 'Days Left'}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-800">
              {daysLeft > 0 ? `${daysLeft} ${t?.days || 'days'}` : t?.completed || 'Completed'}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {t?.until || 'Until'} {formatDate(medicine.endDate)}
            </p>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 transition-colors"
        >
          {expanded ? (
            <>
              <span>{t?.showLess || 'Show Less'}</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>{t?.showMore || 'Show More'}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
          {/* Instructions */}
          {medicine.instructions && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {t?.instructions || 'Instructions'}
                </span>
              </div>
              <p className="text-sm text-gray-600 bg-white rounded p-2 border border-gray-200">
                {medicine.instructions}
              </p>
            </div>
          )}

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">{t?.startDate || 'Start Date'}</p>
              <p className="text-sm font-medium text-gray-800">{formatDate(medicine.startDate)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{t?.endDate || 'End Date'}</p>
              <p className="text-sm font-medium text-gray-800">{formatDate(medicine.endDate)}</p>
            </div>
          </div>

          {/* Recent Adherence */}
          {medicine.adherence && medicine.adherence.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {t?.recentAdherence || 'Recent Adherence'}
                </span>
              </div>
              <div className="space-y-1">
                {medicine.adherence.slice(-3).reverse().map((day, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded p-2 border border-gray-200">
                    <span className="text-sm text-gray-600">{formatDate(day.date)}</span>
                    <div className="flex gap-1">
                      {Object.keys(day).filter(k => k !== 'date').map((timing, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            day[timing] ? 'bg-green-100' : 'bg-red-100'
                          }`}
                        >
                          {day[timing] ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Stock Warning */}
          {stockPercentage <= 30 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-orange-800">
                    {t?.refillReminder || 'Refill Reminder'}
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    {t?.refillMessage || 'Your medicine stock is running low. Consider ordering a refill soon.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineCard;