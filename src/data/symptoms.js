// Location: src/data/symptoms.js

/**
 * Symptoms Data
 * Comprehensive database of common symptoms and their associations
 * Used for symptom checker and AI recommendation features
 */

export const symptomCategories = [
  'General',
  'Respiratory',
  'Digestive',
  'Neurological',
  'Cardiovascular',
  'Musculoskeletal',
  'Skin',
  'Psychological',
  'Urinary',
  'Other'
];

export const commonSymptoms = [
  // General Symptoms
  {
    id: 1,
    name: 'Fever',
    category: 'General',
    severity: ['Mild (99-100°F)', 'Moderate (100-102°F)', 'High (102-104°F)', 'Very High (>104°F)'],
    commonCauses: ['Viral infection', 'Bacterial infection', 'Flu', 'COVID-19', 'Malaria', 'Dengue'],
    relatedSymptoms: ['Chills', 'Headache', 'Body ache', 'Fatigue', 'Sweating'],
    urgency: 'moderate',
    selfCare: ['Rest', 'Stay hydrated', 'Take paracetamol', 'Monitor temperature'],
    seekDoctorIf: ['Fever above 103°F', 'Fever lasting more than 3 days', 'Difficulty breathing', 'Severe headache']
  },
  {
    id: 2,
    name: 'Fatigue',
    category: 'General',
    severity: ['Mild', 'Moderate', 'Severe', 'Extreme'],
    commonCauses: ['Lack of sleep', 'Anemia', 'Thyroid disorder', 'Diabetes', 'Depression', 'Chronic fatigue syndrome'],
    relatedSymptoms: ['Weakness', 'Drowsiness', 'Lack of energy', 'Difficulty concentrating'],
    urgency: 'low',
    selfCare: ['Adequate sleep', 'Regular exercise', 'Healthy diet', 'Manage stress'],
    seekDoctorIf: ['Persistent fatigue for weeks', 'Unexplained weight loss', 'Depression', 'Chest pain']
  },
  {
    id: 3,
    name: 'Headache',
    category: 'Neurological',
    severity: ['Mild', 'Moderate', 'Severe', 'Migraine'],
    commonCauses: ['Tension', 'Migraine', 'Dehydration', 'Sinusitis', 'High blood pressure', 'Eye strain'],
    relatedSymptoms: ['Nausea', 'Sensitivity to light', 'Dizziness', 'Neck pain'],
    urgency: 'low',
    selfCare: ['Rest in dark room', 'Stay hydrated', 'Pain relievers', 'Cold compress'],
    seekDoctorIf: ['Sudden severe headache', 'Headache with fever and stiff neck', 'Vision changes', 'Frequent headaches']
  },
  {
    id: 4,
    name: 'Dizziness',
    category: 'Neurological',
    severity: ['Mild', 'Moderate', 'Severe with balance loss'],
    commonCauses: ['Low blood pressure', 'Dehydration', 'Inner ear problem', 'Anemia', 'Medication side effect'],
    relatedSymptoms: ['Nausea', 'Blurred vision', 'Weakness', 'Fainting'],
    urgency: 'moderate',
    selfCare: ['Sit or lie down', 'Drink water', 'Avoid sudden movements', 'Rest'],
    seekDoctorIf: ['Frequent episodes', 'With chest pain', 'Severe vertigo', 'Hearing loss']
  },

  // Respiratory Symptoms
  {
    id: 5,
    name: 'Cough',
    category: 'Respiratory',
    severity: ['Mild dry cough', 'Moderate productive cough', 'Severe persistent cough', 'Cough with blood'],
    commonCauses: ['Common cold', 'Flu', 'Bronchitis', 'Asthma', 'Allergies', 'COVID-19', 'Tuberculosis'],
    relatedSymptoms: ['Sore throat', 'Runny nose', 'Chest pain', 'Shortness of breath', 'Fever'],
    urgency: 'low',
    selfCare: ['Stay hydrated', 'Honey and warm water', 'Humidifier', 'Avoid irritants'],
    seekDoctorIf: ['Cough lasting more than 3 weeks', 'Blood in sputum', 'Difficulty breathing', 'High fever']
  },
  {
    id: 6,
    name: 'Shortness of Breath',
    category: 'Respiratory',
    severity: ['Mild with exertion', 'Moderate at rest', 'Severe', 'Unable to speak'],
    commonCauses: ['Asthma', 'COPD', 'Pneumonia', 'Heart disease', 'Anxiety', 'COVID-19'],
    relatedSymptoms: ['Chest tightness', 'Wheezing', 'Cough', 'Rapid breathing', 'Blue lips'],
    urgency: 'high',
    selfCare: ['Sit upright', 'Practice breathing exercises', 'Stay calm', 'Use inhaler if prescribed'],
    seekDoctorIf: ['Sudden onset', 'With chest pain', 'Severe difficulty', 'Blue lips or fingertips']
  },
  {
    id: 7,
    name: 'Sore Throat',
    category: 'Respiratory',
    severity: ['Mild irritation', 'Moderate pain', 'Severe pain with difficulty swallowing'],
    commonCauses: ['Viral infection', 'Strep throat', 'Tonsillitis', 'Allergies', 'Dry air'],
    relatedSymptoms: ['Difficulty swallowing', 'Swollen glands', 'Fever', 'Hoarse voice'],
    urgency: 'low',
    selfCare: ['Gargle with salt water', 'Stay hydrated', 'Throat lozenges', 'Rest voice'],
    seekDoctorIf: ['Severe pain', 'Difficulty breathing', 'High fever', 'Lasting more than a week']
  },
  {
    id: 8,
    name: 'Runny Nose',
    category: 'Respiratory',
    severity: ['Mild', 'Moderate', 'Severe with congestion'],
    commonCauses: ['Common cold', 'Allergies', 'Sinusitis', 'Flu', 'Weather changes'],
    relatedSymptoms: ['Sneezing', 'Nasal congestion', 'Headache', 'Cough'],
    urgency: 'low',
    selfCare: ['Stay hydrated', 'Saline nasal spray', 'Steam inhalation', 'Rest'],
    seekDoctorIf: ['Lasting more than 10 days', 'With high fever', 'Severe facial pain', 'Green/yellow discharge']
  },

  // Digestive Symptoms
  {
    id: 9,
    name: 'Nausea',
    category: 'Digestive',
    severity: ['Mild', 'Moderate', 'Severe with vomiting'],
    commonCauses: ['Food poisoning', 'Indigestion', 'Pregnancy', 'Migraine', 'Motion sickness', 'Gastritis'],
    relatedSymptoms: ['Vomiting', 'Dizziness', 'Stomach pain', 'Loss of appetite'],
    urgency: 'low',
    selfCare: ['Sip water', 'Eat bland foods', 'Ginger tea', 'Rest', 'Avoid strong smells'],
    seekDoctorIf: ['Severe dehydration', 'Blood in vomit', 'Lasting more than 2 days', 'Severe abdominal pain']
  },
  {
    id: 10,
    name: 'Stomach Pain',
    category: 'Digestive',
    severity: ['Mild', 'Moderate cramping', 'Severe', 'Acute sharp pain'],
    commonCauses: ['Indigestion', 'Gastritis', 'Food poisoning', 'Appendicitis', 'Ulcer', 'IBS'],
    relatedSymptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Bloating', 'Gas'],
    urgency: 'moderate',
    selfCare: ['Light meals', 'Stay hydrated', 'Heat pad', 'Avoid spicy foods'],
    seekDoctorIf: ['Severe sharp pain', 'With fever', 'Blood in stool', 'Pain in lower right abdomen']
  },
  {
    id: 11,
    name: 'Diarrhea',
    category: 'Digestive',
    severity: ['Mild (3-4 times/day)', 'Moderate (5-7 times/day)', 'Severe (>8 times/day)', 'With blood'],
    commonCauses: ['Food poisoning', 'Viral infection', 'Bacterial infection', 'IBS', 'Food intolerance'],
    relatedSymptoms: ['Stomach cramps', 'Nausea', 'Fever', 'Dehydration', 'Urgency'],
    urgency: 'moderate',
    selfCare: ['ORS solution', 'Stay hydrated', 'BRAT diet', 'Rest', 'Avoid dairy'],
    seekDoctorIf: ['Lasting more than 2 days', 'Blood in stool', 'Severe dehydration', 'High fever']
  },
  {
    id: 12,
    name: 'Constipation',
    category: 'Digestive',
    severity: ['Mild occasional', 'Moderate regular', 'Severe chronic'],
    commonCauses: ['Low fiber diet', 'Dehydration', 'Lack of exercise', 'Medication side effect', 'IBS'],
    relatedSymptoms: ['Bloating', 'Abdominal pain', 'Hard stools', 'Feeling of incomplete evacuation'],
    urgency: 'low',
    selfCare: ['Increase fiber', 'Drink water', 'Exercise', 'Establish routine'],
    seekDoctorIf: ['Lasting more than 2 weeks', 'Severe pain', 'Blood in stool', 'Unexplained weight loss']
  },

  // Cardiovascular Symptoms
  {
    id: 13,
    name: 'Chest Pain',
    category: 'Cardiovascular',
    severity: ['Mild discomfort', 'Moderate pain', 'Severe crushing pain', 'Radiating pain'],
    commonCauses: ['Heart attack', 'Angina', 'Anxiety', 'Heartburn', 'Muscle strain', 'Costochondritis'],
    relatedSymptoms: ['Shortness of breath', 'Sweating', 'Nausea', 'Arm pain', 'Jaw pain'],
    urgency: 'emergency',
    selfCare: ['Stop activity', 'Sit down', 'Loosen tight clothing'],
    seekDoctorIf: ['Any chest pain - seek immediate medical attention', 'Pain radiating to arm/jaw', 'With sweating and nausea']
  },
  {
    id: 14,
    name: 'Palpitations',
    category: 'Cardiovascular',
    severity: ['Mild occasional', 'Moderate frequent', 'Severe with dizziness'],
    commonCauses: ['Anxiety', 'Caffeine', 'Arrhythmia', 'Thyroid disorder', 'Anemia', 'Dehydration'],
    relatedSymptoms: ['Dizziness', 'Shortness of breath', 'Chest discomfort', 'Anxiety'],
    urgency: 'moderate',
    selfCare: ['Reduce caffeine', 'Manage stress', 'Stay hydrated', 'Deep breathing'],
    seekDoctorIf: ['Frequent episodes', 'With chest pain', 'With fainting', 'Rapid heart rate']
  },

  // Musculoskeletal Symptoms
  {
    id: 15,
    name: 'Body Ache',
    category: 'Musculoskeletal',
    severity: ['Mild', 'Moderate', 'Severe', 'Unable to move'],
    commonCauses: ['Flu', 'Overexertion', 'Fibromyalgia', 'Arthritis', 'Viral infection', 'Stress'],
    relatedSymptoms: ['Fatigue', 'Fever', 'Headache', 'Joint pain'],
    urgency: 'low',
    selfCare: ['Rest', 'Pain relievers', 'Warm bath', 'Gentle stretching', 'Massage'],
    seekDoctorIf: ['Persistent pain', 'With high fever', 'Severe weakness', 'Joint swelling']
  },
  {
    id: 16,
    name: 'Joint Pain',
    category: 'Musculoskeletal',
    severity: ['Mild stiffness', 'Moderate pain', 'Severe with swelling', 'Unable to move joint'],
    commonCauses: ['Arthritis', 'Injury', 'Gout', 'Bursitis', 'Lupus', 'Overuse'],
    relatedSymptoms: ['Swelling', 'Redness', 'Stiffness', 'Reduced range of motion'],
    urgency: 'moderate',
    selfCare: ['Rest joint', 'Ice/heat therapy', 'Pain relievers', 'Gentle exercise'],
    seekDoctorIf: ['Sudden severe pain', 'Significant swelling', 'Fever', 'Unable to use joint']
  },
  {
    id: 17,
    name: 'Back Pain',
    category: 'Musculoskeletal',
    severity: ['Mild discomfort', 'Moderate pain', 'Severe pain', 'Pain with numbness'],
    commonCauses: ['Muscle strain', 'Poor posture', 'Herniated disc', 'Arthritis', 'Kidney stones'],
    relatedSymptoms: ['Stiffness', 'Muscle spasms', 'Leg pain', 'Numbness', 'Tingling'],
    urgency: 'low',
    selfCare: ['Rest', 'Heat/ice therapy', 'Pain relievers', 'Gentle stretching', 'Posture correction'],
    seekDoctorIf: ['Severe pain', 'With numbness/tingling', 'Loss of bladder control', 'Fever']
  },

  // Skin Symptoms
  {
    id: 18,
    name: 'Rash',
    category: 'Skin',
    severity: ['Mild localized', 'Moderate spreading', 'Severe with blisters', 'Whole body rash'],
    commonCauses: ['Allergic reaction', 'Eczema', 'Psoriasis', 'Viral infection', 'Contact dermatitis', 'Fungal infection'],
    relatedSymptoms: ['Itching', 'Redness', 'Swelling', 'Burning', 'Blisters'],
    urgency: 'low',
    selfCare: ['Avoid irritants', 'Moisturize', 'Cool compress', 'Antihistamine'],
    seekDoctorIf: ['Severe spreading', 'With fever', 'Difficulty breathing', 'Painful blisters']
  },
  {
    id: 19,
    name: 'Itching',
    category: 'Skin',
    severity: ['Mild occasional', 'Moderate persistent', 'Severe unbearable'],
    commonCauses: ['Dry skin', 'Allergies', 'Eczema', 'Insect bites', 'Liver disease', 'Kidney disease'],
    relatedSymptoms: ['Rash', 'Redness', 'Bumps', 'Dry skin', 'Flaking'],
    urgency: 'low',
    selfCare: ['Moisturize', 'Avoid scratching', 'Cool compress', 'Antihistamine', 'Oatmeal bath'],
    seekDoctorIf: ['Severe persistent itching', 'With jaundice', 'All over body', 'Interfering with sleep']
  },

  // Psychological Symptoms
  {
    id: 20,
    name: 'Anxiety',
    category: 'Psychological',
    severity: ['Mild worry', 'Moderate anxiety', 'Severe panic attacks', 'Debilitating'],
    commonCauses: ['Stress', 'Anxiety disorder', 'Depression', 'PTSD', 'Medical conditions', 'Medication'],
    relatedSymptoms: ['Rapid heartbeat', 'Sweating', 'Trembling', 'Shortness of breath', 'Insomnia'],
    urgency: 'moderate',
    selfCare: ['Deep breathing', 'Exercise', 'Meditation', 'Reduce caffeine', 'Talk to someone'],
    seekDoctorIf: ['Persistent anxiety', 'Panic attacks', 'Affecting daily life', 'Suicidal thoughts']
  }
];

// Symptom combinations and possible conditions
export const symptomCombinations = {
  'Fever + Cough + Body Ache': ['Flu', 'COVID-19', 'Viral infection'],
  'Fever + Headache + Stiff Neck': ['Meningitis', 'Serious infection'],
  'Chest Pain + Shortness of Breath': ['Heart attack', 'Angina', 'Pulmonary embolism'],
  'Stomach Pain + Diarrhea + Vomiting': ['Food poisoning', 'Gastroenteritis', 'Viral infection'],
  'Fever + Rash + Joint Pain': ['Dengue', 'Chikungunya', 'Viral fever'],
  'Headache + Fever + Cough': ['Flu', 'Sinusitis', 'Respiratory infection'],
  'Dizziness + Palpitations + Shortness of Breath': ['Anxiety', 'Heart condition', 'Anemia']
};

// Red flag symptoms requiring immediate attention
export const redFlagSymptoms = [
  {
    symptom: 'Chest Pain',
    warning: 'Could indicate heart attack',
    action: 'Seek emergency medical help immediately'
  },
  {
    symptom: 'Sudden Severe Headache',
    warning: 'Could indicate stroke or aneurysm',
    action: 'Seek emergency medical help immediately'
  },
  {
    symptom: 'Difficulty Breathing',
    warning: 'Could indicate serious respiratory or cardiac issue',
    action: 'Seek emergency medical help immediately'
  },
  {
    symptom: 'Blood in Stool',
    warning: 'Could indicate serious digestive issue',
    action: 'Consult doctor urgently'
  },
  {
    symptom: 'Blood in Urine',
    warning: 'Could indicate kidney or bladder issue',
    action: 'Consult doctor urgently'
  },
  {
    symptom: 'High Fever with Stiff Neck',
    warning: 'Could indicate meningitis',
    action: 'Seek emergency medical help immediately'
  },
  {
    symptom: 'Sudden Vision Loss',
    warning: 'Could indicate stroke or retinal detachment',
    action: 'Seek emergency medical help immediately'
  },
  {
    symptom: 'Severe Abdominal Pain',
    warning: 'Could indicate appendicitis or other serious condition',
    action: 'Seek emergency medical help'
  }
];

// Common symptom durations and when to see a doctor
export const symptomDurations = {
  'Fever': { normal: '3 days', seeDoctor: 'More than 3 days or above 103°F' },
  'Cough': { normal: '1-2 weeks', seeDoctor: 'More than 3 weeks or with blood' },
  'Diarrhea': { normal: '2-3 days', seeDoctor: 'More than 2 days or with blood' },
  'Headache': { normal: 'Few hours to 1 day', seeDoctor: 'Severe or frequent' },
  'Sore Throat': { normal: '5-7 days', seeDoctor: 'More than a week or severe' }
};

// Search symptoms by name or category
export const searchSymptoms = (query) => {
  if (!query || query.trim() === '') return commonSymptoms;
  
  const searchTerm = query.toLowerCase();
  return commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm) ||
    symptom.category.toLowerCase().includes(searchTerm) ||
    symptom.commonCauses.some(cause => cause.toLowerCase().includes(searchTerm))
  );
};

// Get symptoms by category
export const getSymptomsByCategory = (category) => {
  if (category === 'all') return commonSymptoms;
  return commonSymptoms.filter(symptom => symptom.category === category);
};

// Get symptom by ID
export const getSymptomById = (id) => {
  return commonSymptoms.find(symptom => symptom.id === id);
};

// Get related symptoms
export const getRelatedSymptoms = (symptomId) => {
  const symptom = getSymptomById(symptomId);
  if (!symptom) return [];
  
  return commonSymptoms.filter(s =>
    s.id !== symptomId &&
    (s.category === symptom.category ||
     s.relatedSymptoms.some(rs => symptom.name.includes(rs)) ||
     symptom.relatedSymptoms.some(rs => s.name.includes(rs)))
  ).slice(0, 5);
};

// Check if symptoms require urgent care
export const checkUrgency = (symptomIds) => {
  const symptoms = symptomIds.map(id => getSymptomById(id)).filter(Boolean);
  
  const hasEmergency = symptoms.some(s => s.urgency === 'emergency');
  const hasHigh = symptoms.some(s => s.urgency === 'high');
  const hasModerate = symptoms.some(s => s.urgency === 'moderate');
  
  if (hasEmergency) return { level: 'emergency', message: 'Seek immediate medical attention' };
  if (hasHigh) return { level: 'high', message: 'Consult a doctor as soon as possible' };
  if (hasModerate) return { level: 'moderate', message: 'Consider consulting a doctor if symptoms persist' };
  return { level: 'low', message: 'Monitor symptoms and practice self-care' };
};

// Get possible conditions based on symptoms
export const getPossibleConditions = (symptomNames) => {
  const combinations = Object.keys(symptomCombinations);
  const matches = [];
  
  combinations.forEach(combo => {
    const comboSymptoms = combo.split(' + ');
    const matchCount = comboSymptoms.filter(cs => 
      symptomNames.some(sn => sn.toLowerCase().includes(cs.toLowerCase()))
    ).length;
    
    if (matchCount >= 2) {
      matches.push({
        combination: combo,
        conditions: symptomCombinations[combo],
        matchCount
      });
    }
  });
  
  return matches.sort((a, b) => b.matchCount - a.matchCount);
};

// Check for red flag symptoms
export const checkRedFlags = (symptomNames) => {
  return redFlagSymptoms.filter(rfs =>
    symptomNames.some(sn => sn.toLowerCase().includes(rfs.symptom.toLowerCase()))
  );
};

export default {
  symptomCategories,
  commonSymptoms,
  symptomCombinations,
  redFlagSymptoms,
  symptomDurations,
  searchSymptoms,
  getSymptomsByCategory,
  getSymptomById,
  getRelatedSymptoms,
  checkUrgency,
  getPossibleConditions,
  checkRedFlags
};
// At the end
export const symptoms = commonSymptoms;