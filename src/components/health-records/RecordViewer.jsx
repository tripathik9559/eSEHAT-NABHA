import React from 'react';
import { X, Calendar, User, Pill, Activity, FileText, Download, Share2, Printer } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const RecordViewer = ({ record, onClose }) => {
  const { t } = useLanguage();

  if (!record) return null;

  const getRecordIcon = (type) => {
    switch (type) {
      case 'prescription':
        return <Pill className="w-6 h-6" />;
      case 'lab-report':
        return <Activity className="w-6 h-6" />;
      case 'consultation':
        return <User className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownload = () => {
    alert(t?.downloadStarted || 'Download started...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: record.title || 'Health Record',
        text: `${record.title || 'Health Record'} - ${formatDate(record.date)}`,
        url: window.location.href
      }).catch(() => {
        alert(t?.shareNotSupported || 'Share feature not supported on this device');
      });
    } else {
      alert(t?.shareNotSupported || 'Share feature not supported on this device');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${getRecordColor(record.type)}`}>
              {getRecordIcon(record.type)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {record.title || t?.healthRecord || 'Health Record'}
              </h2>
              <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Doctor Information */}
          {record.doctor && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t?.doctorInfo || 'Doctor Information'}
              </h3>
              <p className="text-gray-800 font-medium">{record.doctor}</p>
              {record.specialty && (
                <p className="text-sm text-gray-600">{record.specialty}</p>
              )}
              {record.hospital && (
                <p className="text-sm text-gray-600 mt-1">{record.hospital}</p>
              )}
            </div>
          )}

          {/* Diagnosis */}
          {record.diagnosis && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t?.diagnosis || 'Diagnosis'}
              </h3>
              <p className="text-gray-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                {record.diagnosis}
              </p>
            </div>
          )}

          {/* Symptoms */}
          {record.symptoms && record.symptoms.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t?.symptoms || 'Symptoms'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {record.symptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm border border-red-200"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prescriptions/Medicines */}
          {record.medicines && record.medicines.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4" />
                {t?.prescriptions || 'Prescriptions'}
              </h3>
              <div className="space-y-3">
                {record.medicines.map((medicine, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="font-semibold text-gray-800">{medicine.name}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{t?.dosage || 'Dosage'}:</span> {medicine.dosage}
                      </div>
                      <div>
                        <span className="font-medium">{t?.frequency || 'Frequency'}:</span> {medicine.frequency}
                      </div>
                      <div>
                        <span className="font-medium">{t?.duration || 'Duration'}:</span> {medicine.duration}
                      </div>
                      <div>
                        <span className="font-medium">{t?.timing || 'Timing'}:</span> {medicine.timing}
                      </div>
                    </div>
                    {medicine.instructions && (
                      <p className="text-xs text-gray-600 mt-2 italic">
                        {medicine.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Results */}
          {record.labResults && record.labResults.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {t?.labResults || 'Lab Results'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                        {t?.test || 'Test'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                        {t?.result || 'Result'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                        {t?.normalRange || 'Normal Range'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.labResults.map((result, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{result.test}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
                          {result.value}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {result.normalRange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Doctor Notes */}
          {record.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {t?.doctorNotes || 'Doctor Notes'}
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 whitespace-pre-wrap">{record.notes}</p>
              </div>
            </div>
          )}

          {/* Follow-up */}
          {record.followUp && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-orange-800 mb-2">
                {t?.followUp || 'Follow-up'}
              </h3>
              <p className="text-gray-800">{record.followUp}</p>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {t?.download || 'Download'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            {t?.share || 'Share'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Printer className="w-4 h-4" />
            {t?.print || 'Print'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordViewer;