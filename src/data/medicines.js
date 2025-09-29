// Location: src/data/medicines.js

/**
 * Medicines Data
 * Comprehensive database of common medicines with dosage, usage, and safety information
 * Used for medicine tracker and pharmacy locator features
 */

export const medicineCategories = [
  'Pain Relief',
  'Antibiotics',
  'Antihistamines',
  'Antacids',
  'Diabetes',
  'Cardiac',
  'Respiratory',
  'Vitamins & Supplements',
  'Antiseptics',
  'Other'
];

export const commonMedicines = [
  // Pain Relief
  {
    id: 1,
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    commonBrands: ['Crocin', 'Dolo', 'Calpol'],
    dosageForms: ['Tablet 500mg', 'Tablet 650mg', 'Syrup'],
    commonDosage: '500-1000mg every 4-6 hours',
    maxDailyDose: '4000mg',
    uses: ['Fever', 'Headache', 'Body pain', 'Dental pain'],
    sideEffects: ['Nausea', 'Stomach pain', 'Liver damage (overdose)'],
    precautions: ['Avoid alcohol', 'Liver disease patients should consult doctor'],
    prescriptionRequired: false,
    averagePrice: 20,
    availability: 'Very Common'
  },
  {
    id: 2,
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    commonBrands: ['Brufen', 'Ibugesic', 'Combiflam'],
    dosageForms: ['Tablet 400mg', 'Tablet 600mg', 'Suspension'],
    commonDosage: '400mg every 4-6 hours',
    maxDailyDose: '2400mg',
    uses: ['Pain', 'Inflammation', 'Fever', 'Arthritis'],
    sideEffects: ['Stomach upset', 'Nausea', 'Heartburn', 'Dizziness'],
    precautions: ['Take with food', 'Avoid in stomach ulcers', 'Heart disease patients consult doctor'],
    prescriptionRequired: false,
    averagePrice: 35,
    availability: 'Very Common'
  },
  {
    id: 3,
    name: 'Diclofenac',
    genericName: 'Diclofenac Sodium',
    category: 'Pain Relief',
    commonBrands: ['Voveran', 'Diclogesic', 'Diclonac'],
    dosageForms: ['Tablet 50mg', 'Injection', 'Gel'],
    commonDosage: '50mg 2-3 times daily',
    maxDailyDose: '150mg',
    uses: ['Arthritis pain', 'Muscle pain', 'Joint pain', 'Inflammation'],
    sideEffects: ['Stomach pain', 'Nausea', 'Dizziness', 'Headache'],
    precautions: ['Take with food', 'Not for heart patients', 'Avoid long-term use'],
    prescriptionRequired: true,
    averagePrice: 40,
    availability: 'Common'
  },

  // Antibiotics
  {
    id: 4,
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    category: 'Antibiotics',
    commonBrands: ['Mox', 'Novamox', 'Amoxil'],
    dosageForms: ['Capsule 250mg', 'Capsule 500mg', 'Syrup'],
    commonDosage: '250-500mg every 8 hours',
    maxDailyDose: '3000mg',
    uses: ['Bacterial infections', 'Respiratory infections', 'Ear infections', 'Urinary tract infections'],
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Vomiting'],
    precautions: ['Complete full course', 'Inform doctor about allergies', 'Take with or without food'],
    prescriptionRequired: true,
    averagePrice: 80,
    availability: 'Very Common'
  },
  {
    id: 5,
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    category: 'Antibiotics',
    commonBrands: ['Azithral', 'Zithromax', 'Azee'],
    dosageForms: ['Tablet 250mg', 'Tablet 500mg', 'Suspension'],
    commonDosage: '500mg once daily for 3-5 days',
    maxDailyDose: '500mg',
    uses: ['Respiratory infections', 'Skin infections', 'Ear infections', 'Sexually transmitted infections'],
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain', 'Headache'],
    precautions: ['Take on empty stomach', 'Complete full course', 'Avoid antacids'],
    prescriptionRequired: true,
    averagePrice: 120,
    availability: 'Common'
  },
  {
    id: 6,
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    category: 'Antibiotics',
    commonBrands: ['Cifran', 'Ciplox', 'Ciprobay'],
    dosageForms: ['Tablet 250mg', 'Tablet 500mg', 'Eye drops'],
    commonDosage: '250-500mg twice daily',
    maxDailyDose: '1500mg',
    uses: ['Urinary tract infections', 'Respiratory infections', 'Skin infections', 'Bone infections'],
    sideEffects: ['Nausea', 'Diarrhea', 'Dizziness', 'Headache'],
    precautions: ['Avoid dairy products', 'Drink plenty of water', 'Not for children under 18'],
    prescriptionRequired: true,
    averagePrice: 90,
    availability: 'Common'
  },

  // Antihistamines
  {
    id: 7,
    name: 'Cetirizine',
    genericName: 'Cetirizine HCl',
    category: 'Antihistamines',
    commonBrands: ['Zyrtec', 'Alerid', 'Cetrizet'],
    dosageForms: ['Tablet 10mg', 'Syrup'],
    commonDosage: '10mg once daily',
    maxDailyDose: '10mg',
    uses: ['Allergies', 'Hay fever', 'Hives', 'Itching', 'Runny nose'],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Headache'],
    precautions: ['May cause drowsiness', 'Avoid alcohol', 'Be careful while driving'],
    prescriptionRequired: false,
    averagePrice: 25,
    availability: 'Very Common'
  },
  {
    id: 8,
    name: 'Loratadine',
    genericName: 'Loratadine',
    category: 'Antihistamines',
    commonBrands: ['Lorfast', 'Claritin', 'Alaspan'],
    dosageForms: ['Tablet 10mg', 'Syrup'],
    commonDosage: '10mg once daily',
    maxDailyDose: '10mg',
    uses: ['Seasonal allergies', 'Hay fever', 'Hives', 'Itchy eyes and nose'],
    sideEffects: ['Headache', 'Drowsiness', 'Dry mouth', 'Fatigue'],
    precautions: ['Non-drowsy for most', 'Safe for daytime use'],
    prescriptionRequired: false,
    averagePrice: 30,
    availability: 'Common'
  },

  // Antacids
  {
    id: 9,
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Antacids',
    commonBrands: ['Omez', 'Prilosec', 'Losec'],
    dosageForms: ['Capsule 20mg', 'Capsule 40mg'],
    commonDosage: '20mg once daily before breakfast',
    maxDailyDose: '40mg',
    uses: ['Acid reflux', 'GERD', 'Stomach ulcers', 'Heartburn'],
    sideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Stomach pain'],
    precautions: ['Take before meals', 'Long-term use needs monitoring', 'May reduce vitamin B12 absorption'],
    prescriptionRequired: true,
    averagePrice: 60,
    availability: 'Very Common'
  },
  {
    id: 10,
    name: 'Ranitidine',
    genericName: 'Ranitidine HCl',
    category: 'Antacids',
    commonBrands: ['Aciloc', 'Zantac', 'Rantac'],
    dosageForms: ['Tablet 150mg', 'Tablet 300mg', 'Syrup'],
    commonDosage: '150mg twice daily or 300mg at bedtime',
    maxDailyDose: '600mg',
    uses: ['Heartburn', 'Acid reflux', 'Stomach ulcers', 'GERD'],
    sideEffects: ['Headache', 'Dizziness', 'Constipation', 'Diarrhea'],
    precautions: ['Take after meals', 'Avoid alcohol'],
    prescriptionRequired: true,
    averagePrice: 45,
    availability: 'Common'
  },

  // Diabetes
  {
    id: 11,
    name: 'Metformin',
    genericName: 'Metformin HCl',
    category: 'Diabetes',
    commonBrands: ['Glycomet', 'Glucophage', 'Obimet'],
    dosageForms: ['Tablet 500mg', 'Tablet 850mg', 'Tablet 1000mg'],
    commonDosage: '500-1000mg twice daily with meals',
    maxDailyDose: '2550mg',
    uses: ['Type 2 diabetes', 'PCOS', 'Insulin resistance'],
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
    precautions: ['Take with meals', 'Monitor kidney function', 'Stay hydrated', 'Avoid alcohol'],
    prescriptionRequired: true,
    averagePrice: 50,
    availability: 'Very Common'
  },
  {
    id: 12,
    name: 'Glimepiride',
    genericName: 'Glimepiride',
    category: 'Diabetes',
    commonBrands: ['Amaryl', 'Glynase', 'Gemer'],
    dosageForms: ['Tablet 1mg', 'Tablet 2mg', 'Tablet 4mg'],
    commonDosage: '1-4mg once daily with breakfast',
    maxDailyDose: '8mg',
    uses: ['Type 2 diabetes'],
    sideEffects: ['Hypoglycemia', 'Nausea', 'Dizziness', 'Weight gain'],
    precautions: ['Risk of low blood sugar', 'Monitor blood glucose', 'Take with first meal'],
    prescriptionRequired: true,
    averagePrice: 70,
    availability: 'Common'
  },

  // Cardiac
  {
    id: 13,
    name: 'Atorvastatin',
    genericName: 'Atorvastatin',
    category: 'Cardiac',
    commonBrands: ['Lipitor', 'Atorva', 'Storvas'],
    dosageForms: ['Tablet 10mg', 'Tablet 20mg', 'Tablet 40mg'],
    commonDosage: '10-20mg once daily at night',
    maxDailyDose: '80mg',
    uses: ['High cholesterol', 'Heart disease prevention', 'Stroke prevention'],
    sideEffects: ['Muscle pain', 'Headache', 'Nausea', 'Diarrhea'],
    precautions: ['Avoid grapefruit juice', 'Monitor liver function', 'Report muscle pain'],
    prescriptionRequired: true,
    averagePrice: 100,
    availability: 'Very Common'
  },
  {
    id: 14,
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    category: 'Cardiac',
    commonBrands: ['Cozaar', 'Losacar', 'Repace'],
    dosageForms: ['Tablet 25mg', 'Tablet 50mg', 'Tablet 100mg'],
    commonDosage: '25-50mg once daily',
    maxDailyDose: '100mg',
    uses: ['High blood pressure', 'Heart failure', 'Diabetic kidney disease'],
    sideEffects: ['Dizziness', 'Fatigue', 'Low blood pressure', 'Cough'],
    precautions: ['Monitor blood pressure', 'Stay hydrated', 'Not for pregnancy'],
    prescriptionRequired: true,
    averagePrice: 85,
    availability: 'Common'
  },
  {
    id: 15,
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    category: 'Cardiac',
    commonBrands: ['Ecosprin', 'Disprin', 'Aspirin'],
    dosageForms: ['Tablet 75mg', 'Tablet 150mg', 'Tablet 325mg'],
    commonDosage: '75-150mg once daily',
    maxDailyDose: '325mg',
    uses: ['Heart attack prevention', 'Stroke prevention', 'Blood thinner', 'Pain relief'],
    sideEffects: ['Stomach upset', 'Bleeding', 'Heartburn', 'Nausea'],
    precautions: ['Take with food', 'Risk of bleeding', 'Avoid before surgery'],
    prescriptionRequired: false,
    averagePrice: 15,
    availability: 'Very Common'
  },

  // Respiratory
  {
    id: 16,
    name: 'Salbutamol',
    genericName: 'Salbutamol Sulfate',
    category: 'Respiratory',
    commonBrands: ['Asthalin', 'Ventolin', 'Albuterol'],
    dosageForms: ['Inhaler', 'Syrup', 'Nebulizer solution'],
    commonDosage: '2 puffs every 4-6 hours as needed',
    maxDailyDose: '8 puffs',
    uses: ['Asthma', 'COPD', 'Bronchospasm', 'Wheezing'],
    sideEffects: ['Tremors', 'Increased heart rate', 'Headache', 'Nervousness'],
    precautions: ['Use spacer device', 'Rinse mouth after use', 'Keep track of doses'],
    prescriptionRequired: true,
    averagePrice: 150,
    availability: 'Common'
  },
  {
    id: 17,
    name: 'Montelukast',
    genericName: 'Montelukast Sodium',
    category: 'Respiratory',
    commonBrands: ['Montair', 'Singulair', 'Montek'],
    dosageForms: ['Tablet 5mg', 'Tablet 10mg'],
    commonDosage: '10mg once daily at bedtime',
    maxDailyDose: '10mg',
    uses: ['Asthma', 'Allergic rhinitis', 'Exercise-induced bronchoconstriction'],
    sideEffects: ['Headache', 'Stomach pain', 'Diarrhea', 'Fatigue'],
    precautions: ['Take at bedtime', 'Monitor mood changes', 'Not for acute attacks'],
    prescriptionRequired: true,
    averagePrice: 80,
    availability: 'Common'
  },

  // Vitamins & Supplements
  {
    id: 18,
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    category: 'Vitamins & Supplements',
    commonBrands: ['Uprise-D3', 'Calcirol', 'D-Rise'],
    dosageForms: ['Tablet 1000IU', 'Tablet 2000IU', 'Sachet 60000IU'],
    commonDosage: '1000-2000IU daily or 60000IU weekly',
    maxDailyDose: '4000IU',
    uses: ['Vitamin D deficiency', 'Bone health', 'Immunity'],
    sideEffects: ['Nausea', 'Vomiting', 'Weakness', 'Frequent urination'],
    precautions: ['Take with meals', 'Monitor calcium levels', 'Get sun exposure'],
    prescriptionRequired: false,
    averagePrice: 50,
    availability: 'Very Common'
  },
  {
    id: 19,
    name: 'Calcium Carbonate',
    genericName: 'Calcium Carbonate',
    category: 'Vitamins & Supplements',
    commonBrands: ['Shelcal', 'Calcimax', 'Ostocalcium'],
    dosageForms: ['Tablet 500mg', 'Tablet 1000mg'],
    commonDosage: '500-1000mg daily',
    maxDailyDose: '2000mg',
    uses: ['Calcium deficiency', 'Osteoporosis', 'Bone health'],
    sideEffects: ['Constipation', 'Gas', 'Bloating'],
    precautions: ['Take with food', 'Drink plenty of water', 'Space from other medications'],
    prescriptionRequired: false,
    averagePrice: 60,
    availability: 'Very Common'
  },
  {
    id: 20,
    name: 'Iron Supplement',
    genericName: 'Ferrous Sulfate',
    category: 'Vitamins & Supplements',
    commonBrands: ['Fefol', 'Ferrous', 'Autrin'],
    dosageForms: ['Tablet 100mg', 'Syrup'],
    commonDosage: '100-200mg once daily',
    maxDailyDose: '200mg',
    uses: ['Iron deficiency anemia', 'Pregnancy', 'Heavy menstrual bleeding'],
    sideEffects: ['Constipation', 'Dark stools', 'Nausea', 'Stomach upset'],
    precautions: ['Take on empty stomach', 'Avoid tea/coffee', 'Increase fiber intake'],
    prescriptionRequired: false,
    averagePrice: 40,
    availability: 'Very Common'
  }
];

// Medicine interaction warnings
export const medicineInteractions = {
  'Aspirin': ['Warfarin', 'Ibuprofen', 'Alcohol'],
  'Metformin': ['Alcohol', 'Iodinated contrast'],
  'Warfarin': ['Aspirin', 'Antibiotics', 'Vitamin K'],
  'Ciprofloxacin': ['Antacids', 'Dairy products', 'Iron supplements']
};

// Generic to brand name mapping
export const genericToBrand = commonMedicines.reduce((acc, med) => {
  acc[med.genericName] = med.commonBrands;
  return acc;
}, {});

// Search medicines by name, generic name, or use
export const searchMedicines = (query) => {
  if (!query || query.trim() === '') return commonMedicines;
  
  const searchTerm = query.toLowerCase();
  return commonMedicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm) ||
    med.genericName.toLowerCase().includes(searchTerm) ||
    med.uses.some(use => use.toLowerCase().includes(searchTerm)) ||
    med.category.toLowerCase().includes(searchTerm)
  );
};

// Get medicines by category
export const getMedicinesByCategory = (category) => {
  if (category === 'all') return commonMedicines;
  return commonMedicines.filter(med => med.category === category);
};

// Get medicine by ID
export const getMedicineById = (id) => {
  return commonMedicines.find(med => med.id === id);
};

// Get medicine by name
export const getMedicineByName = (name) => {
  return commonMedicines.find(med => 
    med.name.toLowerCase() === name.toLowerCase() ||
    med.genericName.toLowerCase() === name.toLowerCase()
  );
};

// Check if prescription is required
export const requiresPrescription = (medicineName) => {
  const medicine = getMedicineByName(medicineName);
  return medicine ? medicine.prescriptionRequired : true;
};

// Get alternative medicines (same category and use)
export const getAlternatives = (medicineId) => {
  const medicine = getMedicineById(medicineId);
  if (!medicine) return [];
  
  return commonMedicines.filter(med =>
    med.id !== medicineId &&
    med.category === medicine.category &&
    med.uses.some(use => medicine.uses.includes(use))
  ).slice(0, 5);
};

export default {
  medicineCategories,
  commonMedicines,
  medicineInteractions,
  genericToBrand,
  searchMedicines,
  getMedicinesByCategory,
  getMedicineById,
  getMedicineByName,
  requiresPrescription,
  getAlternatives
};