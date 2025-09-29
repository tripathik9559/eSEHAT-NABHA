import React, { useState, useMemo } from 'react';
import { Search, X, Plus, ChevronLeft, AlertCircle, User, Calendar, Activity } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { symptoms as symptomsData } from '../../data/symptoms';

const SymptomSelector = ({
  selectedSymptoms,
  onSymptomsChange,
  additionalInfo,
  onAdditionalInfoChange,
  onAnalyze,
  onBack
}) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from symptoms data
  const categories = useMemo(() => {
    const cats = ['all'];
    symptomsData.forEach(symptom => {
      if (symptom.category && !cats.includes(symptom.category)) {
        cats.push(symptom.category);
      }
    });
    return cats;
  }, []);

  // Filter symptoms based on search and category
  const filteredSymptoms = useMemo(() => {
    return symptomsData.filter(symptom => {
      const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (symptom.description && symptom.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSymptomToggle = (symptomName) => {
    if (selectedSymptoms.includes(symptomName)) {
      onSymptomsChange(selectedSymptoms.filter(s => s !== symptomName));
    } else {
      onSymptomsChange([...selectedSymptoms, symptomName]);
    }
  };

  const handleRemoveSymptom = (symptomName) => {
    onSymptomsChange(selectedSymptoms.filter(s => s !== symptomName));
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      alert(t?.pleaseSelectSymptoms || 'Please select at least one symptom');
      return;
    }
    onAnalyze();
  };

  const getCategoryLabel = (category) => {
    const labels = {
      all: t?.allSymptoms || 'All Symptoms',
      general: t?.general || 'General',
      respiratory: t?.respiratory || 'Respiratory',
      digestive: t?.digestive || 'Digestive',
      neurological: t?.neurological || 'Neurological',
      musculoskeletal: t?.musculoskeletal || 'Musculoskeletal',
      skin: t?.skin || 'Skin',
      cardiovascular: t?.cardiovascular || 'Cardiovascular',
      other: t?.other || 'Other'
    };
    return labels[category] || category;
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
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {t?.selectSymptoms || 'Select Your Symptoms'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t?.selectSymptomsDesc || 'Choose all symptoms you are currently experiencing'}
          </p>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Selected Symptoms Display */}
          {selectedSymptoms.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  {t?.selectedSymptoms || 'Selected Symptoms'} ({selectedSymptoms.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm"
                  >
                    {symptom}
                    <button
                      onClick={() => handleRemoveSymptom(symptom)}
                      className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t?.searchSymptoms || 'Search symptoms...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Symptoms Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSymptoms.map((symptom, index) => (
              <button
                key={index}
                onClick={() => handleSymptomToggle(symptom.name)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedSymptoms.includes(symptom.name)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{symptom.name}</h4>
                    {symptom.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {symptom.description}
                      </p>
                    )}
                  </div>
                  {selectedSymptoms.includes(symptom.name) ? (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* No Results */}
          {filteredSymptoms.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">{t?.noSymptomsFound || 'No symptoms found matching your search'}</p>
            </div>
          )}

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">
              {t?.additionalInfo || 'Additional Information'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t?.duration || 'Duration'}
                </label>
                <select
                  value={additionalInfo.duration}
                  onChange={(e) => onAdditionalInfoChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t?.selectDuration || 'Select duration'}</option>
                  <option value="hours">{t?.fewHours || 'Few hours'}</option>
                  <option value="1-2days">{t?.oneToTwoDays || '1-2 days'}</option>
                  <option value="3-7days">{t?.threeToSevenDays || '3-7 days'}</option>
                  <option value="week+">{t?.moreThanWeek || 'More than a week'}</option>
                  <option value="chronic">{t?.chronic || 'Chronic (ongoing)'}</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  {t?.severity || 'Severity'}
                </label>
                <select
                  value={additionalInfo.severity}
                  onChange={(e) => onAdditionalInfoChange('severity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mild">{t?.mild || 'Mild'}</option>
                  <option value="moderate">{t?.moderate || 'Moderate'}</option>
                  <option value="severe">{t?.severe || 'Severe'}</option>
                </select>
              </div>

              {/* Age (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {t?.age || 'Age'} ({t?.optional || 'Optional'})
                </label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={additionalInfo.age}
                  onChange={(e) => onAdditionalInfoChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="120"
                />
              </div>

              {/* Gender (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {t?.gender || 'Gender'} ({t?.optional || 'Optional'})
                </label>
                <select
                  value={additionalInfo.gender}
                  onChange={(e) => onAdditionalInfoChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t?.selectGender || 'Select gender'}</option>
                  <option value="male">{t?.male || 'Male'}</option>
                  <option value="female">{t?.female || 'Female'}</option>
                  <option value="other">{t?.other || 'Other'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={handleSubmit}
              disabled={selectedSymptoms.length === 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedSymptoms.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {t?.analyzeSymptoms || 'Analyze Symptoms'} ({selectedSymptoms.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomSelector;