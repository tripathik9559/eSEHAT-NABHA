import React, { useState } from 'react';
import { Activity, AlertCircle, ChevronRight, History, Info } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SymptomSelector from './SymptomSelector';
import AIRecommendations from './AIRecommendations';
import SymptomHistory from './SymptomHistory';

const SymptomChecker = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, select, results, history
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState({
    duration: '',
    severity: 'moderate',
    age: '',
    gender: ''
  });
  const [checkResults, setCheckResults] = useState(null);
  const [symptomHistory, setSymptomHistory] = useLocalStorage('symptomHistory', []);

  const handleStartCheck = () => {
    setCurrentStep('select');
    setSelectedSymptoms([]);
    setAdditionalInfo({
      duration: '',
      severity: 'moderate',
      age: '',
      gender: ''
    });
    setCheckResults(null);
  };

  const handleSymptomsSelected = (symptoms) => {
    setSelectedSymptoms(symptoms);
  };

  const handleAdditionalInfoChange = (field, value) => {
    setAdditionalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnalyze = () => {
    // Generate mock AI recommendations based on selected symptoms
    const results = {
      id: `CHECK_${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptoms: selectedSymptoms,
      additionalInfo: additionalInfo,
      possibleConditions: generateMockConditions(selectedSymptoms),
      urgencyLevel: calculateUrgency(selectedSymptoms, additionalInfo.severity),
      recommendations: generateMockRecommendations(selectedSymptoms, additionalInfo.severity)
    };

    setCheckResults(results);
    setCurrentStep('results');

    // Save to history
    const newHistory = [results, ...symptomHistory].slice(0, 10); // Keep last 10
    setSymptomHistory(newHistory);
  };

  const handleViewHistory = () => {
    setCurrentStep('history');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
  };

  const handleViewHistoryItem = (item) => {
    setCheckResults(item);
    setCurrentStep('results');
  };

  // Mock AI logic functions
  const generateMockConditions = (symptoms) => {
    const conditions = [];
    
    if (symptoms.some(s => s.toLowerCase().includes('fever') || s.toLowerCase().includes('cough'))) {
      conditions.push({
        name: 'Common Cold',
        probability: 75,
        description: 'Viral infection of the upper respiratory tract'
      });
      conditions.push({
        name: 'Influenza',
        probability: 45,
        description: 'Viral infection that attacks respiratory system'
      });
    }
    
    if (symptoms.some(s => s.toLowerCase().includes('headache') || s.toLowerCase().includes('fatigue'))) {
      conditions.push({
        name: 'Tension Headache',
        probability: 60,
        description: 'Most common type of headache caused by muscle tension'
      });
    }
    
    if (symptoms.some(s => s.toLowerCase().includes('stomach') || s.toLowerCase().includes('nausea'))) {
      conditions.push({
        name: 'Gastroenteritis',
        probability: 65,
        description: 'Inflammation of the digestive tract'
      });
    }

    if (conditions.length === 0) {
      conditions.push({
        name: 'General Malaise',
        probability: 50,
        description: 'General feeling of discomfort or unease'
      });
    }

    return conditions;
  };

  const calculateUrgency = (symptoms, severity) => {
    const urgentSymptoms = ['chest pain', 'breathing difficulty', 'severe bleeding', 'unconscious'];
    const hasUrgentSymptom = symptoms.some(s => 
      urgentSymptoms.some(us => s.toLowerCase().includes(us))
    );

    if (hasUrgentSymptom || severity === 'severe') {
      return 'high';
    } else if (severity === 'moderate' && symptoms.length >= 3) {
      return 'medium';
    }
    return 'low';
  };

  const generateMockRecommendations = (symptoms, severity) => {
    const recommendations = [];

    if (severity === 'severe') {
      recommendations.push({
        type: 'immediate',
        title: 'Seek Immediate Medical Attention',
        description: 'Visit the nearest emergency room or call emergency services',
        icon: 'alert'
      });
    }

    recommendations.push({
      type: 'consultation',
      title: 'Consult a Doctor',
      description: 'Schedule an appointment with a general physician for proper diagnosis',
      icon: 'doctor'
    });

    recommendations.push({
      type: 'selfcare',
      title: 'Self-Care Measures',
      description: 'Rest adequately, stay hydrated, and monitor your symptoms',
      icon: 'heart'
    });

    recommendations.push({
      type: 'monitoring',
      title: 'Monitor Symptoms',
      description: 'Keep track of symptom changes and seek help if they worsen',
      icon: 'activity'
    });

    return recommendations;
  };

  // Render different steps
  const renderWelcome = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t?.symptomChecker || 'Symptom Checker'}
          </h1>
          <p className="text-gray-600">
            {t?.symptomCheckerSubtitle || 'Get AI-powered health insights based on your symptoms'}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">
                {t?.importantNotice || 'Important Notice'}
              </h3>
              <p className="text-sm text-yellow-700">
                {t?.symptomCheckerDisclaimer || 'This tool provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.'}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {t?.aiPowered || 'AI-Powered'}
            </h3>
            <p className="text-sm text-gray-600">
              {t?.aiPoweredDesc || 'Advanced algorithms analyze your symptoms'}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Info className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {t?.detailedInsights || 'Detailed Insights'}
            </h3>
            <p className="text-sm text-gray-600">
              {t?.detailedInsightsDesc || 'Get comprehensive health recommendations'}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
              <History className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {t?.trackHistory || 'Track History'}
            </h3>
            <p className="text-sm text-gray-600">
              {t?.trackHistoryDesc || 'Review your previous symptom checks'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleStartCheck}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            {t?.startSymptomCheck || 'Start Symptom Check'}
            <ChevronRight className="w-5 h-5" />
          </button>
          {symptomHistory.length > 0 && (
            <button
              onClick={handleViewHistory}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <History className="w-5 h-5" />
              {t?.viewHistory || 'View History'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {currentStep === 'welcome' && renderWelcome()}
      {currentStep === 'select' && (
        <SymptomSelector
          selectedSymptoms={selectedSymptoms}
          onSymptomsChange={handleSymptomsSelected}
          additionalInfo={additionalInfo}
          onAdditionalInfoChange={handleAdditionalInfoChange}
          onAnalyze={handleAnalyze}
          onBack={handleBackToWelcome}
        />
      )}
      {currentStep === 'results' && (
        <AIRecommendations
          results={checkResults}
          onBack={handleBackToWelcome}
          onNewCheck={handleStartCheck}
        />
      )}
      {currentStep === 'history' && (
        <SymptomHistory
          history={symptomHistory}
          onViewItem={handleViewHistoryItem}
          onBack={handleBackToWelcome}
          onClearHistory={() => setSymptomHistory([])}
        />
      )}
    </div>
  );
};

export default SymptomChecker;