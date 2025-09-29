import React from 'react';
import { 
  ChevronLeft, 
  AlertTriangle, 
  Activity, 
  Heart, 
  Clock, 
  User, 
  Calendar,
  AlertCircle,
  CheckCircle,
  PhoneCall,
  FileText,
  Home,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const AIRecommendations = ({ results, onBack, onNewCheck }) => {
  const { t } = useLanguage();

  if (!results) return null;

  const getUrgencyConfig = (level) => {
    switch (level) {
      case 'high':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          icon: AlertTriangle,
          label: t?.highUrgency || 'High Urgency',
          message: t?.highUrgencyMessage || 'Seek immediate medical attention'
        };
      case 'medium':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          icon: AlertCircle,
          label: t?.mediumUrgency || 'Medium Urgency',
          message: t?.mediumUrgencyMessage || 'Consult a doctor within 24-48 hours'
        };
      default:
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          icon: CheckCircle,
          label: t?.lowUrgency || 'Low Urgency',
          message: t?.lowUrgencyMessage || 'Monitor symptoms and seek care if worsens'
        };
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'immediate':
        return PhoneCall;
      case 'consultation':
        return User;
      case 'selfcare':
        return Heart;
      case 'monitoring':
        return Activity;
      default:
        return FileText;
    }
  };

  const urgencyConfig = getUrgencyConfig(results.urgencyLevel);
  const UrgencyIcon = urgencyConfig.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {t?.analysisResults || 'Analysis Results'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatDate(results.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Urgency Level */}
          <div className={`${urgencyConfig.bgColor} border ${urgencyConfig.borderColor} rounded-lg p-4`}>
            <div className="flex items-start gap-3">
              <UrgencyIcon className={`w-6 h-6 ${urgencyConfig.textColor} flex-shrink-0 mt-1`} />
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${urgencyConfig.textColor} mb-1`}>
                  {urgencyConfig.label}
                </h3>
                <p className={`text-sm ${urgencyConfig.textColor}`}>
                  {urgencyConfig.message}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Symptoms Summary */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              {t?.reportedSymptoms || 'Reported Symptoms'} ({results.symptoms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {results.symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm border border-blue-200"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          {(results.additionalInfo.duration || results.additionalInfo.age) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t?.additionalInfo || 'Additional Information'}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {results.additionalInfo.duration && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{t?.duration || 'Duration'}:</span>
                    <span className="font-medium text-gray-800">{results.additionalInfo.duration}</span>
                  </div>
                )}
                {results.additionalInfo.severity && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{t?.severity || 'Severity'}:</span>
                    <span className="font-medium text-gray-800 capitalize">{results.additionalInfo.severity}</span>
                  </div>
                )}
                {results.additionalInfo.age && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{t?.age || 'Age'}:</span>
                    <span className="font-medium text-gray-800">{results.additionalInfo.age} years</span>
                  </div>
                )}
                {results.additionalInfo.gender && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{t?.gender || 'Gender'}:</span>
                    <span className="font-medium text-gray-800 capitalize">{results.additionalInfo.gender}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Possible Conditions */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              {t?.possibleConditions || 'Possible Conditions'}
            </h3>
            <div className="space-y-3">
              {results.possibleConditions.map((condition, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{condition.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${condition.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-purple-600">{condition.probability}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{condition.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <span className="font-semibold">{t?.note || 'Note'}:</span>{' '}
                {t?.conditionsDisclaimer || 'These are AI-generated possibilities based on reported symptoms. A proper medical diagnosis requires professional evaluation.'}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              {t?.recommendations || 'Recommendations'}
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((recommendation, index) => {
                const IconComponent = getRecommendationIcon(recommendation.type);
                return (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg h-fit">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600">{recommendation.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* General Advice */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" />
              {t?.generalAdvice || 'General Advice'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t?.stayHydrated || 'Stay well hydrated by drinking plenty of water'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t?.getRest || 'Get adequate rest to help your body recover'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t?.monitorSymptoms || 'Monitor your symptoms and note any changes'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t?.avoidSelfMedication || 'Avoid self-medication without consulting a healthcare provider'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{t?.seekHelpIfWorsens || 'Seek immediate medical help if symptoms worsen or become severe'}</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  {t?.importantDisclaimer || 'Important Disclaimer'}
                </h3>
                <p className="text-sm text-red-700">
                  {t?.aiDisclaimerFull || 'This AI-powered symptom checker is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read here.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNewCheck}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Activity className="w-5 h-5" />
              {t?.newSymptomCheck || 'New Symptom Check'}
            </button>
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              {t?.backToHome || 'Back to Home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;