import React from 'react';
import { FileText, Calendar, User, Pill, Activity, Eye } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const RecordCard = ({ record, onView }) => {
  const { t } = useLanguage();

  const getRecordIcon = (type) => {
    switch (type) {
      case 'prescription':
        return <Pill className="w-5 h-5" />;
      case 'lab-report':
        return <Activity className="w-5 h-5" />;
      case 'consultation':
        return <User className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordColor = (type) => {
    switch (type) {
      case 'prescription':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'lab-report':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'consultation':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getRecordTypeLabel = (type) => {
    switch (type) {
      case 'prescription':
        return t?.prescription || 'Prescription';
      case 'lab-report':
        return t?.labReport || 'Lab Report';
      case 'consultation':
        return t?.consultation || 'Consultation';
      default:
        return t?.record || 'Record';
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 border border-gray-200">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${getRecordColor(record.type)}`}>
            {getRecordIcon(record.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">
              {record.title || getRecordTypeLabel(record.type)}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(record.date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Information */}
      {record.doctor && (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{record.doctor}</span>
        </div>
      )}

      {/* Description/Notes Preview */}
      {record.notes && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {record.notes}
        </p>
      )}

      {/* Diagnosis/Summary */}
      {record.diagnosis && (
        <div className="bg-gray-50 rounded-md p-2 mb-3">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">{t?.diagnosis || 'Diagnosis'}:</span> {record.diagnosis}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() => onView(record)}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
      >
        <Eye className="w-4 h-4" />
        {t?.viewDetails || 'View Details'}
      </button>
    </div>
  );
};

export default RecordCard;