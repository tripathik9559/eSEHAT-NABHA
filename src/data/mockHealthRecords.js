// src/data/mockHealthRecords.js

export const mockHealthRecords = [
  {
    id: "HR001",
    patientId: "P12345",
    patientName: "Rajesh Kumar",
    date: "2024-09-25",
    dateTime: "2024-09-25T14:30:00",
    doctor: "Dr. Priya Singh",
    doctorId: "D001",
    type: "General Checkup",
    category: "routine",
    symptoms: ["Fever", "Headache", "Body ache"],
    diagnosis: "Viral fever",
    vitals: {
      temperature: "101°F",
      bloodPressure: "120/80",
      pulse: "78 bpm",
      weight: "70 kg",
      height: "175 cm"
    },
    medicines: [
      {
        name: "Paracetamol 500mg",
        dosage: "1 tablet",
        frequency: "3 times daily",
        duration: "5 days",
        instructions: "Take after meals"
      },
      {
        name: "Multivitamin",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "7 days",
        instructions: "Take with breakfast"
      }
    ],
    tests: [],
    notes: "Patient advised to rest and maintain hydration. Follow-up if symptoms persist beyond 3 days.",
    followUp: "2024-09-28",
    status: "completed",
    qrCode: "HR001-2024-09-25-P12345"
  },
  {
    id: "HR002",
    patientId: "P12345",
    patientName: "Rajesh Kumar",
    date: "2024-09-15",
    dateTime: "2024-09-15T10:00:00",
    doctor: "Dr. Amit Sharma",
    doctorId: "D002",
    type: "Follow-up",
    category: "follow-up",
    symptoms: ["Cough", "Cold", "Sore throat"],
    diagnosis: "Upper respiratory tract infection",
    vitals: {
      temperature: "98.6°F",
      bloodPressure: "118/78",
      pulse: "72 bpm",
      weight: "70 kg",
      height: "175 cm"
    },
    medicines: [
      {
        name: "Azithromycin 500mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "3 days",
        instructions: "Take on empty stomach"
      },
      {
        name: "Cough Syrup",
        dosage: "10ml",
        frequency: "3 times daily",
        duration: "5 days",
        instructions: "Shake well before use"
      }
    ],
    tests: [
      {
        name: "Complete Blood Count",
        result: "Normal",
        date: "2024-09-14"
      }
    ],
    notes: "Patient responding well to treatment. Complete the antibiotic course.",
    followUp: null,
    status: "completed",
    qrCode: "HR002-2024-09-15-P12345"
  },
  {
    id: "HR003",
    patientId: "P12345",
    patientName: "Rajesh Kumar",
    date: "2024-08-30",
    dateTime: "2024-08-30T16:45:00",
    doctor: "Dr. Gurdeep Kaur",
    doctorId: "D003",
    type: "Emergency Visit",
    category: "emergency",
    symptoms: ["Chest pain", "Shortness of breath"],
    diagnosis: "Suspected cardiac issue - referred to specialist",
    vitals: {
      temperature: "98.4°F",
      bloodPressure: "140/95",
      pulse: "92 bpm",
      weight: "70 kg",
      height: "175 cm"
    },
    medicines: [
      {
        name: "Aspirin 75mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "Ongoing",
        instructions: "Take after dinner"
      }
    ],
    tests: [
      {
        name: "ECG",
        result: "Pending cardiologist review",
        date: "2024-08-30"
      },
      {
        name: "Cardiac Enzymes",
        result: "Within normal limits",
        date: "2024-08-30"
      }
    ],
    notes: "Patient referred to cardiologist. Advised immediate specialist consultation. Prescribed aspirin as preventive measure.",
    followUp: "2024-09-05",
    status: "pending",
    priority: "high",
    qrCode: "HR003-2024-08-30-P12345"
  },
  {
    id: "HR004",
    patientId: "P67890",
    patientName: "Priya Sharma",
    date: "2024-09-20",
    dateTime: "2024-09-20T11:30:00",
    doctor: "Dr. Rajesh Kumar",
    doctorId: "D004",
    type: "Vaccination",
    category: "preventive",
    symptoms: [],
    diagnosis: "Annual flu vaccination",
    vitals: {
      temperature: "98.2°F",
      bloodPressure: "115/75",
      pulse: "68 bpm",
      weight: "58 kg",
      height: "162 cm"
    },
    medicines: [
      {
        name: "Influenza Vaccine",
        dosage: "0.5ml IM",
        frequency: "Single dose",
        duration: "Completed",
        instructions: "Annual vaccination"
      }
    ],
    tests: [],
    notes: "Patient vaccinated against seasonal flu. No adverse reactions observed. Advised to monitor for 24 hours.",
    followUp: null,
    status: "completed",
    qrCode: "HR004-2024-09-20-P67890"
  },
  {
    id: "HR005",
    patientId: "P12345",
    patientName: "Rajesh Kumar",
    date: "2024-07-10",
    dateTime: "2024-07-10T09:15:00",
    doctor: "Dr. Priya Singh",
    doctorId: "D001",
    type: "Chronic Disease Management",
    category: "chronic",
    symptoms: ["High blood sugar", "Frequent urination", "Fatigue"],
    diagnosis: "Type 2 Diabetes - Under control",
    vitals: {
      temperature: "98.6°F",
      bloodPressure: "130/85",
      pulse: "75 bpm",
      weight: "72 kg",
      height: "175 cm",
      bloodSugar: "140 mg/dL (fasting)"
    },
    medicines: [
      {
        name: "Metformin 500mg",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "Ongoing",
        instructions: "Take with meals"
      },
      {
        name: "Glimepiride 2mg",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "Ongoing",
        instructions: "Take before breakfast"
      }
    ],
    tests: [
      {
        name: "HbA1c",
        result: "7.2%",
        date: "2024-07-08"
      },
      {
        name: "Fasting Blood Sugar",
        result: "140 mg/dL",
        date: "2024-07-10"
      },
      {
        name: "Lipid Profile",
        result: "Within normal limits",
        date: "2024-07-08"
      }
    ],
    notes: "Diabetes under control. Continue current medication. Advised diet modification and regular exercise. Monitor blood sugar levels daily.",
    followUp: "2024-10-10",
    status: "active",
    qrCode: "HR005-2024-07-10-P12345"
  }
];

// Helper function to get records by patient ID
export const getRecordsByPatientId = (patientId) => {
  return mockHealthRecords.filter(record => record.patientId === patientId);
};

// Helper function to get record by ID
export const getRecordById = (recordId) => {
  return mockHealthRecords.find(record => record.id === recordId);
};

// Helper function to get recent records (last n records)
export const getRecentRecords = (count = 5) => {
  return mockHealthRecords
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, count);
};

// Helper function to filter by category
export const getRecordsByCategory = (category) => {
  return mockHealthRecords.filter(record => record.category === category);
};