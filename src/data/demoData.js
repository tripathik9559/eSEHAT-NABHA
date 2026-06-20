// eSEHAT Nabha - Comprehensive Demo Data
// All data is fictional for demonstration purposes only

export const DEMO_DOCTORS = [
  {
    id: 1, name: "Dr. Rajesh Kumar", nameHi: "डॉ. राजेश कुमार", namePa: "ਡਾ. ਰਾਜੇਸ਼ ਕੁਮਾਰ",
    specialty: "General Medicine", specialtyHi: "सामान्य चिकित्सा", specialtyPa: "ਆਮ ਦਵਾਈ",
    department: "General Medicine", languages: ["Hindi", "English", "Punjabi"],
    rating: 4.8, experience: "12 years", available: true, nextSlot: "Today 2:30 PM",
    consultationFee: 200, patients: 2500, location: "Nabha Primary Hospital",
    phone: "+91 98765 43210", email: "dr.rajesh@nabhahealth.in",
    qualifications: ["MBBS - Govt Medical College", "MD General Medicine - AIIMS", "Fellowship Advanced Medicine"],
    bio: "Dr. Rajesh Kumar is a highly experienced general physician with 12 years of rural healthcare practice.",
    consultationsToday: 8, avgTime: "12 min", status: "available", workload: 72
  },
  {
    id: 2, name: "Dr. Priya Singh", nameHi: "डॉ. प्रिया सिंह", namePa: "ਡਾ. ਪ੍ਰਿਯਾ ਸਿੰਘ",
    specialty: "Pediatrics", specialtyHi: "बाल रोग", specialtyPa: "ਬੱਚਿਆਂ ਦੀ ਬਿਮਾਰੀ",
    department: "Pediatrics", languages: ["Hindi", "English"],
    rating: 4.9, experience: "8 years", available: true, nextSlot: "Today 4:00 PM",
    consultationFee: 250, patients: 1800, location: "Nabha Children's Clinic",
    phone: "+91 98765 43211", email: "dr.priya@nabhahealth.in",
    qualifications: ["MBBS - Medical College", "MD Pediatrics - PGI", "Certified Child Health Specialist"],
    bio: "Dr. Priya Singh is a dedicated pediatrician providing compassionate care for children across 173 villages.",
    consultationsToday: 6, avgTime: "15 min", status: "in-consultation", workload: 88
  },
  {
    id: 3, name: "Dr. Gurdeep Kaur", nameHi: "डॉ. गुरदीप कौर", namePa: "ਡਾ. ਗੁਰਦੀਪ ਕੌਰ",
    specialty: "Cardiology", specialtyHi: "हृदय रोग", specialtyPa: "ਦਿਲ ਦੀ ਬਿਮਾਰੀ",
    department: "Cardiology", languages: ["Punjabi", "Hindi", "English"],
    rating: 4.7, experience: "15 years", available: false, nextSlot: "Tomorrow 10:00 AM",
    consultationFee: 500, patients: 3200, location: "Nabha Heart Care Center",
    phone: "+91 98765 43212", email: "dr.gurdeep@nabhahealth.in",
    qualifications: ["MBBS - Govt Medical College", "MD Cardiology - AIIMS", "Fellowship Interventional Cardiology"],
    bio: "Dr. Gurdeep Kaur is a renowned cardiologist with 15 years serving rural Punjab's heart patients.",
    consultationsToday: 4, avgTime: "20 min", status: "offline", workload: 45
  },
  {
    id: 4, name: "Dr. Amit Sharma", nameHi: "डॉ. अमित शर्मा", namePa: "ਡਾ. ਅਮਿਤ ਸ਼ਰਮਾ",
    specialty: "Orthopedics", specialtyHi: "हड्डी रोग", specialtyPa: "ਹੱਡੀਆਂ ਦਾ ਇਲਾਜ",
    department: "Orthopedics", languages: ["Hindi", "English"],
    rating: 4.6, experience: "10 years", available: true, nextSlot: "Today 5:00 PM",
    consultationFee: 300, patients: 2100, location: "Nabha Orthopedic Center",
    phone: "+91 98765 43213", email: "dr.amit@nabhahealth.in",
    qualifications: ["MBBS - Medical College", "MS Orthopedics - PGIMER", "Fellowship Joint Replacement"],
    bio: "Dr. Amit Sharma specializes in orthopedic surgery and has helped over 2100 patients recover mobility.",
    consultationsToday: 5, avgTime: "16 min", status: "available", workload: 60
  },
  {
    id: 5, name: "Dr. Kavita Verma", nameHi: "डॉ. कविता वर्मा", namePa: "ਡਾ. ਕਵਿਤਾ ਵਰਮਾ",
    specialty: "Gynecology", specialtyHi: "स्त्री रोग", specialtyPa: "ਔਰਤਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ",
    department: "Gynecology", languages: ["Hindi", "English", "Punjabi"],
    rating: 4.9, experience: "11 years", available: true, nextSlot: "Today 3:30 PM",
    consultationFee: 350, patients: 2800, location: "Nabha Women's Health Center",
    phone: "+91 98765 43214", email: "dr.kavita@nabhahealth.in",
    qualifications: ["MBBS - Govt Medical College", "MS Gynecology - AIIMS", "Maternal Health Specialist"],
    bio: "Dr. Kavita Verma is committed to improving maternal and women's health across rural Punjab.",
    consultationsToday: 9, avgTime: "18 min", status: "available", workload: 95
  },
  {
    id: 6, name: "Dr. Sukhwinder Gill", nameHi: "डॉ. सुखविंदर गिल", namePa: "ਡਾ. ਸੁਖਵਿੰਦਰ ਗਿੱਲ",
    specialty: "Dermatology", specialtyHi: "त्वचा रोग", specialtyPa: "ਚਮੜੀ ਦੀਆਂ ਬਿਮਾਰੀਆਂ",
    department: "Dermatology", languages: ["Punjabi", "Hindi"],
    rating: 4.5, experience: "7 years", available: false, nextSlot: "Tomorrow 11:00 AM",
    consultationFee: 280, patients: 1500, location: "Nabha Skin Clinic",
    phone: "+91 98765 43215", email: "dr.sukhwinder@nabhahealth.in",
    qualifications: ["MBBS - Medical College", "MD Dermatology - PGI"],
    bio: "Dr. Sukhwinder Gill provides expert dermatological care focusing on rural skin conditions.",
    consultationsToday: 3, avgTime: "14 min", status: "offline", workload: 35
  }
];

export const DEMO_PATIENTS = [
  { id: "PT001", name: "Harjit Singh", age: 45, gender: "Male", village: "Nabha", phone: "+91 98765 11001", bloodGroup: "B+", language: "pa", riskLevel: "high", lastVisit: "2024-11-20", qrId: "QR-PT001-2024" },
  { id: "PT002", name: "Sunita Devi", age: 32, gender: "Female", village: "Khanna", phone: "+91 98765 11002", bloodGroup: "O+", language: "hi", riskLevel: "moderate", lastVisit: "2024-11-18", qrId: "QR-PT002-2024" },
  { id: "PT003", name: "Gurpreet Kaur", age: 28, gender: "Female", village: "Samrala", phone: "+91 98765 11003", bloodGroup: "A+", language: "pa", riskLevel: "mild", lastVisit: "2024-11-22", qrId: "QR-PT003-2024" },
  { id: "PT004", name: "Balwinder Kumar", age: 58, gender: "Male", village: "Bhadson", phone: "+91 98765 11004", bloodGroup: "AB+", language: "pa", riskLevel: "high", lastVisit: "2024-11-15", qrId: "QR-PT004-2024" },
  { id: "PT005", name: "Manjeet Rani", age: 41, gender: "Female", village: "Patran", phone: "+91 98765 11005", bloodGroup: "B-", language: "hi", riskLevel: "moderate", lastVisit: "2024-11-21", qrId: "QR-PT005-2024" },
];

export const DEMO_APPOINTMENTS = [
  { id: "APT001", patientId: "PT001", patientName: "Harjit Singh", doctorId: 1, doctorName: "Dr. Rajesh Kumar", specialty: "General Medicine", date: "2024-11-25", time: "09:00 AM", mode: "video", status: "scheduled", priority: "high", riskLevel: "high", village: "Nabha", symptoms: "Severe chest pain, shortness of breath", createdAt: "2024-11-24" },
  { id: "APT002", patientId: "PT002", patientName: "Sunita Devi", doctorId: 2, doctorName: "Dr. Priya Singh", specialty: "Pediatrics", date: "2024-11-25", time: "09:30 AM", mode: "audio", status: "scheduled", priority: "moderate", riskLevel: "moderate", village: "Khanna", symptoms: "Child fever, cough for 3 days", createdAt: "2024-11-24" },
  { id: "APT003", patientId: "PT003", patientName: "Gurpreet Kaur", doctorId: 5, doctorName: "Dr. Kavita Verma", specialty: "Gynecology", date: "2024-11-25", time: "10:00 AM", mode: "video", status: "scheduled", priority: "standard", riskLevel: "mild", village: "Samrala", symptoms: "Routine checkup", createdAt: "2024-11-23" },
  { id: "APT004", patientId: "PT004", patientName: "Balwinder Kumar", doctorId: 3, doctorName: "Dr. Gurdeep Kaur", specialty: "Cardiology", date: "2024-11-25", time: "08:30 AM", mode: "video", status: "in-progress", priority: "high", riskLevel: "high", village: "Bhadson", symptoms: "Irregular heartbeat, dizziness", createdAt: "2024-11-24" },
  { id: "APT005", patientId: "PT005", patientName: "Manjeet Rani", doctorId: 1, doctorName: "Dr. Rajesh Kumar", specialty: "General Medicine", date: "2024-11-25", time: "11:00 AM", mode: "audio", status: "scheduled", priority: "moderate", riskLevel: "moderate", village: "Patran", symptoms: "Persistent headache, fatigue", createdAt: "2024-11-24" },
  { id: "APT006", patientId: "PT001", patientName: "Harjit Singh", doctorId: 4, doctorName: "Dr. Amit Sharma", specialty: "Orthopedics", date: "2024-11-26", time: "10:30 AM", mode: "video", status: "scheduled", priority: "standard", riskLevel: "mild", village: "Nabha", symptoms: "Knee pain during walking", createdAt: "2024-11-23" },
];

export const DEMO_PHARMACIES = [
  {
    id: 1, name: "Nabha Primary Pharmacy", namePa: "ਨਾਭਾ ਪ੍ਰਾਇਮਰੀ ਫਾਰਮੇਸੀ",
    address: "Civil Hospital Compound, Nabha", phone: "+91 98765 55001",
    lat: 30.3705, lng: 76.1407, rating: 4.5, open: true,
    hours: "8:00 AM - 8:00 PM", distance: "0.3 km",
    totalMedicines: 450, inStock: 380, lowStock: 45, outOfStock: 25
  },
  {
    id: 2, name: "Khanna Rural Medical Store", namePa: "ਖੰਨਾ ਰੂਰਲ ਮੈਡੀਕਲ ਸਟੋਰ",
    address: "Main Market, Khanna", phone: "+91 98765 55002",
    lat: 30.7050, lng: 76.2200, rating: 4.2, open: true,
    hours: "9:00 AM - 7:00 PM", distance: "12.4 km",
    totalMedicines: 320, inStock: 280, lowStock: 28, outOfStock: 12
  },
  {
    id: 3, name: "Samrala Community Pharmacy", namePa: "ਸਮਰਾਲਾ ਕਮਿਊਨਿਟੀ ਫਾਰਮੇਸੀ",
    address: "Health Center Road, Samrala", phone: "+91 98765 55003",
    lat: 30.8350, lng: 76.1900, rating: 4.3, open: false,
    hours: "8:00 AM - 6:00 PM", distance: "18.7 km",
    totalMedicines: 280, inStock: 245, lowStock: 20, outOfStock: 15
  }
];

export const DEMO_MEDICINES = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", pharmacyId: 1, stock: 150, minStock: 50, status: "adequate", unitPrice: 2.50, expiryDate: "2026-03-31", lastRestocked: "2024-11-10" },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotics", pharmacyId: 1, stock: 23, minStock: 30, status: "low", unitPrice: 8.75, expiryDate: "2025-08-15", lastRestocked: "2024-11-01" },
  { id: 3, name: "Metformin 500mg", category: "Diabetes", pharmacyId: 1, stock: 89, minStock: 40, status: "adequate", unitPrice: 4.50, expiryDate: "2025-12-31", lastRestocked: "2024-11-05" },
  { id: 4, name: "Insulin (100IU/ml)", category: "Diabetes", pharmacyId: 1, stock: 8, minStock: 20, status: "critical", unitPrice: 125.00, expiryDate: "2025-03-15", lastRestocked: "2024-10-20" },
  { id: 5, name: "Atorvastatin 10mg", category: "Cardiac", pharmacyId: 1, stock: 67, minStock: 30, status: "adequate", unitPrice: 6.00, expiryDate: "2026-01-31", lastRestocked: "2024-11-12" },
  { id: 6, name: "ORS Sachet", category: "Hydration", pharmacyId: 2, stock: 200, minStock: 100, status: "adequate", unitPrice: 1.00, expiryDate: "2026-06-30", lastRestocked: "2024-11-15" },
  { id: 7, name: "Azithromycin 500mg", category: "Antibiotics", pharmacyId: 2, stock: 15, minStock: 25, status: "low", unitPrice: 12.50, expiryDate: "2025-09-30", lastRestocked: "2024-10-28" },
  { id: 8, name: "Amlodipine 5mg", category: "Cardiac", pharmacyId: 2, stock: 0, minStock: 30, status: "out", unitPrice: 3.50, expiryDate: "2026-02-28", lastRestocked: "2024-10-01" },
  { id: 9, name: "Cetirizine 10mg", category: "Allergy", pharmacyId: 3, stock: 120, minStock: 50, status: "adequate", unitPrice: 2.00, expiryDate: "2025-11-30", lastRestocked: "2024-11-08" },
  { id: 10, name: "Cough Syrup 100ml", category: "Cold & Flu", pharmacyId: 3, stock: 45, minStock: 30, status: "adequate", unitPrice: 15.00, expiryDate: "2025-07-31", lastRestocked: "2024-11-03" },
];

export const DEMO_HEALTH_RECORDS = [
  { id: "HR001", patientId: "PT001", date: "2024-11-20", doctor: "Dr. Rajesh Kumar", type: "Emergency Visit", symptoms: "Severe chest pain, shortness of breath", diagnosis: "Hypertensive crisis", medicines: ["Amlodipine 5mg", "Metoprolol 25mg", "Aspirin 75mg"], notes: "Monitor BP daily. Return immediately if symptoms worsen.", riskLevel: "high" },
  { id: "HR002", patientId: "PT001", date: "2024-10-15", doctor: "Dr. Rajesh Kumar", type: "Follow-up", symptoms: "High blood pressure, mild headache", diagnosis: "Hypertension Stage 2", medicines: ["Amlodipine 5mg", "Losartan 50mg"], notes: "Continue medication. Low-salt diet strictly.", riskLevel: "moderate" },
  { id: "HR003", patientId: "PT002", date: "2024-11-18", doctor: "Dr. Priya Singh", type: "Pediatric Consultation", symptoms: "Fever 102°F, persistent cough, running nose", diagnosis: "Viral upper respiratory infection", medicines: ["Paracetamol syrup", "Cetirizine syrup", "Saline nasal drops"], notes: "Monitor fever. Plenty of fluids and rest.", riskLevel: "mild" },
];

export const DEMO_SYMPTOMS = [
  { id: 1, name: "Fever", nameHi: "बुखार", namePa: "ਬੁਖਾਰ", category: "common", weight: 2, icon: "🌡️" },
  { id: 2, name: "Headache", nameHi: "सिरदर्द", namePa: "ਸਿਰਦਰਦ", category: "common", weight: 1, icon: "🤕" },
  { id: 3, name: "Chest Pain", nameHi: "सीने में दर्द", namePa: "ਛਾਤੀ ਵਿੱਚ ਦਰਦ", category: "cardiac", weight: 5, icon: "💔" },
  { id: 4, name: "Shortness of Breath", nameHi: "सांस लेने में तकलीफ", namePa: "ਸਾਹ ਲੈਣ ਵਿੱਚ ਤਕਲੀਫ", category: "respiratory", weight: 5, icon: "😮‍💨" },
  { id: 5, name: "Cough", nameHi: "खांसी", namePa: "ਖੰਘ", category: "respiratory", weight: 2, icon: "😷" },
  { id: 6, name: "Sore Throat", nameHi: "गले में खराश", namePa: "ਗਲੇ ਵਿੱਚ ਖਰਾਸ਼", category: "respiratory", weight: 1, icon: "🤒" },
  { id: 7, name: "Nausea", nameHi: "मतली", namePa: "ਮਤਲੀ", category: "digestive", weight: 2, icon: "🤢" },
  { id: 8, name: "Vomiting", nameHi: "उल्टी", namePa: "ਉਲਟੀ", category: "digestive", weight: 3, icon: "🤮" },
  { id: 9, name: "Diarrhea", nameHi: "दस्त", namePa: "ਦਸਤ", category: "digestive", weight: 3, icon: "🏃" },
  { id: 10, name: "Body Ache", nameHi: "शरीर दर्द", namePa: "ਸਰੀਰ ਦਰਦ", category: "common", weight: 2, icon: "🦴" },
  { id: 11, name: "Dizziness", nameHi: "चक्कर", namePa: "ਚੱਕਰ", category: "neurological", weight: 3, icon: "😵" },
  { id: 12, name: "High Blood Pressure", nameHi: "उच्च रक्तचाप", namePa: "ਉੱਚ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ", category: "cardiac", weight: 4, icon: "📈" },
  { id: 13, name: "Swelling", nameHi: "सूजन", namePa: "ਸੋਜ", category: "general", weight: 3, icon: "🫧" },
  { id: 14, name: "Rash/Skin Issues", nameHi: "त्वचा की समस्या", namePa: "ਚਮੜੀ ਦੀ ਸਮੱਸਿਆ", category: "dermatology", weight: 2, icon: "🔴" },
  { id: 15, name: "Joint Pain", nameHi: "जोड़ों का दर्द", namePa: "ਜੋੜਾਂ ਦਾ ਦਰਦ", category: "orthopedic", weight: 2, icon: "🦵" },
];

export const DEMO_VILLAGES = [
  { name: "Nabha", patients: 245, status: "active", doctors: 3, emergencyLevel: "low", distance: "0 km" },
  { name: "Khanna", patients: 189, status: "active", doctors: 2, emergencyLevel: "medium", distance: "12 km" },
  { name: "Samrala", patients: 167, status: "active", doctors: 2, emergencyLevel: "low", distance: "19 km" },
  { name: "Ghagga", patients: 134, status: "maintenance", doctors: 0, emergencyLevel: "low", distance: "8 km" },
  { name: "Bhadson", patients: 112, status: "active", doctors: 1, emergencyLevel: "low", distance: "24 km" },
  { name: "Patran", patients: 98, status: "active", doctors: 1, emergencyLevel: "low", distance: "31 km" },
  { name: "Rajpura", patients: 156, status: "offline", doctors: 0, emergencyLevel: "high", distance: "45 km" },
  { name: "Banur", patients: 87, status: "active", doctors: 1, emergencyLevel: "low", distance: "38 km" },
  { name: "Morinda", patients: 143, status: "active", doctors: 2, emergencyLevel: "medium", distance: "56 km" },
];

export const DEMO_ASHA_WORKERS = [
  { id: "ASHA001", name: "Sukhmani Kaur", village: "Nabha", phone: "+91 98765 77001", patientsRegistered: 87, campsOrganized: 12, pendingSync: 3 },
  { id: "ASHA002", name: "Rajni Devi", village: "Khanna", phone: "+91 98765 77002", patientsRegistered: 63, campsOrganized: 8, pendingSync: 0 },
  { id: "ASHA003", name: "Paramjit Kaur", village: "Samrala", phone: "+91 98765 77003", patientsRegistered: 54, campsOrganized: 10, pendingSync: 7 },
];

export const DEMO_HEALTH_CAMPS = [
  { id: "HC001", village: "Ghagga", date: "2024-12-05", status: "scheduled", expectedParticipants: 120, ashaWorker: "ASHA001", specialties: ["General Medicine", "Pediatrics"] },
  { id: "HC002", village: "Patran", date: "2024-11-30", status: "scheduled", expectedParticipants: 80, ashaWorker: "ASHA002", specialties: ["Gynecology", "General Medicine"] },
  { id: "HC003", village: "Bhadson", date: "2024-11-20", status: "completed", expectedParticipants: 95, actualParticipants: 88, ashaWorker: "ASHA003", specialties: ["Orthopedics", "General Medicine"] },
];

export const ANALYTICS_DATA = {
  consultationsByMonth: [
    { month: "Jun", video: 312, audio: 198, chat: 87 },
    { month: "Jul", video: 345, audio: 234, chat: 102 },
    { month: "Aug", video: 389, audio: 267, chat: 118 },
    { month: "Sep", video: 412, audio: 298, chat: 134 },
    { month: "Oct", video: 445, audio: 312, chat: 156 },
    { month: "Nov", video: 478, audio: 334, chat: 167 },
  ],
  riskDistribution: [
    { level: "Mild", count: 1456, color: "#22C55E" },
    { level: "Moderate", count: 893, color: "#F59E0B" },
    { level: "High", count: 234, color: "#EF4444" },
  ],
  commonConditions: [
    { condition: "Hypertension", cases: 456, trend: "stable" },
    { condition: "Diabetes", cases: 234, trend: "increasing" },
    { condition: "Respiratory", cases: 189, trend: "seasonal" },
    { condition: "Heart Disease", cases: 156, trend: "stable" },
    { condition: "Joint Pain", cases: 134, trend: "stable" },
  ],
  villageWiseConsultations: [
    { village: "Nabha", count: 245, risk: "low" },
    { village: "Khanna", count: 189, risk: "medium" },
    { village: "Samrala", count: 167, risk: "low" },
    { village: "Rajpura", count: 156, risk: "high" },
    { village: "Ghagga", count: 134, risk: "low" },
  ],
  dashboardStats: {
    totalConsultations: 2847,
    consultationsToday: 24,
    doctorsAvailable: 11,
    doctorsTotal: 23,
    villagesServed: 173,
    patientsRegistered: 8453,
    medicinesTracked: 500,
    medicinesInStock: 380,
    emergenciesToday: 3,
    avgResponseTime: "9.2 min",
    satisfactionRate: 4.6,
    offlineCapableVillages: 165,
  }
};

export const TRANSLATIONS = {
  en: {
    appName: "eSEHAT Nabha", tagline: "Rural Healthcare Platform",
    login: "Login", phone: "Phone Number", otp: "Enter OTP", verify: "Verify OTP",
    sendOtp: "Send OTP", resend: "Resend OTP", continueAs: "Continue as",
    patient: "Patient", doctor: "Doctor", asha: "ASHA Worker", admin: "Admin", pharmacy: "Pharmacy",
    home: "Home", doctors: "Doctors", records: "Health Records",
    symptoms: "Symptom Checker", medicines: "Medicines", appointments: "Appointments",
    analytics: "Analytics", workload: "Workload", camps: "Health Camps",
    online: "Online", offline: "Offline Mode",
    available: "Available", busy: "In Consultation", unavailable: "Offline",
    mild: "Mild Risk", moderate: "Moderate Risk", high: "High Risk",
    bookNow: "Book Now", viewProfile: "View Profile", consultNow: "Consult Now",
    generateQR: "Generate QR", downloadPDF: "Download PDF",
    darkMode: "Dark Mode", lightMode: "Light Mode",
    language: "Language", settings: "Settings", logout: "Logout",
    priorityQueue: "Priority Queue", riskLevel: "Risk Level",
    aiAnalysis: "AI Analysis", checkSymptoms: "Check Symptoms",
    village: "Village", status: "Status", patients: "Patients",
    totalConsultations: "Total Consultations", today: "Today",
    quickActions: "Quick Actions", recentActivity: "Recent Activity",
    loading: "Loading...", error: "Error occurred",
    back: "Back", next: "Next", confirm: "Confirm", cancel: "Cancel", save: "Save",
    search: "Search", filter: "Filter", all: "All",
    stockStatus: "Stock Status", inStock: "In Stock", lowStock: "Low Stock", outOfStock: "Out of Stock",
    prescriptionPad: "Prescription Pad", patientHistory: "Patient History",
    syncPending: "Sync Pending", syncNow: "Sync Now", lastSync: "Last Sync",
    registerPatient: "Register Patient", schedulecamp: "Schedule Camp",
    doctorAvailability: "Doctor Availability", workloadDashboard: "Workload Dashboard",
  },
  hi: {
    appName: "eSEHAT नाभा", tagline: "ग्रामीण स्वास्थ्य प्लेटफॉर्म",
    login: "लॉगिन", phone: "फोन नंबर", otp: "OTP दर्ज करें", verify: "OTP सत्यापित करें",
    sendOtp: "OTP भेजें", resend: "OTP पुनः भेजें", continueAs: "इस रूप में जारी रखें",
    patient: "मरीज़", doctor: "डॉक्टर", asha: "ASHA कार्यकर्ता", admin: "प्रशासक", pharmacy: "फार्मेसी",
    home: "होम", doctors: "डॉक्टर", records: "स्वास्थ्य रिकॉर्ड",
    symptoms: "लक्षण जांच", medicines: "दवाएं", appointments: "अपॉइंटमेंट",
    analytics: "विश्लेषण", workload: "कार्यभार", camps: "स्वास्थ्य शिविर",
    online: "ऑनलाइन", offline: "ऑफलाइन मोड",
    available: "उपलब्ध", busy: "परामर्श में", unavailable: "ऑफलाइन",
    mild: "सामान्य", moderate: "मध्यम जोखिम", high: "उच्च जोखिम",
    bookNow: "अभी बुक करें", viewProfile: "प्रोफ़ाइल देखें", consultNow: "अभी परामर्श करें",
    generateQR: "QR उत्पन्न करें", downloadPDF: "PDF डाउनलोड करें",
    darkMode: "डार्क मोड", lightMode: "लाइट मोड",
    language: "भाषा", settings: "सेटिंग्स", logout: "लॉगआउट",
    priorityQueue: "प्राथमिकता क्यू", riskLevel: "जोखिम स्तर",
    aiAnalysis: "AI विश्लेषण", checkSymptoms: "लक्षण जांचें",
    village: "गाँव", status: "स्थिति", patients: "मरीज़",
    totalConsultations: "कुल परामर्श", today: "आज",
    quickActions: "त्वरित कार्रवाई", recentActivity: "हालिया गतिविधि",
    loading: "लोड हो रहा है...", error: "त्रुटि हुई",
    back: "वापस", next: "अगला", confirm: "पुष्टि करें", cancel: "रद्द करें", save: "सहेजें",
    search: "खोज", filter: "फ़िल्टर", all: "सभी",
    stockStatus: "स्टॉक स्थिति", inStock: "स्टॉक में", lowStock: "कम स्टॉक", outOfStock: "स्टॉक खत्म",
    prescriptionPad: "प्रिस्क्रिप्शन", patientHistory: "मरीज़ इतिहास",
    syncPending: "सिंक बाकी", syncNow: "अभी सिंक करें", lastSync: "अंतिम सिंक",
    registerPatient: "मरीज़ पंजीकरण", schedulecamp: "शिविर शेड्यूल",
    doctorAvailability: "डॉक्टर उपलब्धता", workloadDashboard: "कार्यभार डैशबोर्ड",
  },
  pa: {
    appName: "eSEHAT ਨਾਭਾ", tagline: "ਪੇਂਡੂ ਸਿਹਤ ਪਲੇਟਫਾਰਮ",
    login: "ਲੌਗਇਨ", phone: "ਫੋਨ ਨੰਬਰ", otp: "OTP ਦਰਜ ਕਰੋ", verify: "OTP ਤਸਦੀਕ ਕਰੋ",
    sendOtp: "OTP ਭੇਜੋ", resend: "OTP ਮੁੜ ਭੇਜੋ", continueAs: "ਇਸ ਤਰ੍ਹਾਂ ਜਾਰੀ ਰੱਖੋ",
    patient: "ਮਰੀਜ਼", doctor: "ਡਾਕਟਰ", asha: "ASHA ਕਾਰਕੁਨ", admin: "ਪ੍ਰਸ਼ਾਸਕ", pharmacy: "ਫਾਰਮੇਸੀ",
    home: "ਘਰ", doctors: "ਡਾਕਟਰ", records: "ਸਿਹਤ ਰਿਕਾਰਡ",
    symptoms: "ਲੱਛਣ ਜਾਂਚ", medicines: "ਦਵਾਈਆਂ", appointments: "ਅਪੌਇੰਟਮੈਂਟ",
    analytics: "ਵਿਸ਼ਲੇਸ਼ਣ", workload: "ਕੰਮ ਦਾ ਬੋਝ", camps: "ਸਿਹਤ ਕੈਂਪ",
    online: "ਆਨਲਾਈਨ", offline: "ਆਫਲਾਈਨ ਮੋਡ",
    available: "ਉਪਲਬਧ", busy: "ਸਲਾਹ ਵਿੱਚ", unavailable: "ਆਫਲਾਈਨ",
    mild: "ਹਲਕਾ ਖਤਰਾ", moderate: "ਦਰਮਿਆਨਾ ਖਤਰਾ", high: "ਉੱਚ ਖਤਰਾ",
    bookNow: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ", viewProfile: "ਪ੍ਰੋਫਾਈਲ ਦੇਖੋ", consultNow: "ਹੁਣੇ ਸਲਾਹ ਕਰੋ",
    generateQR: "QR ਬਣਾਓ", downloadPDF: "PDF ਡਾਊਨਲੋਡ",
    darkMode: "ਡਾਰਕ ਮੋਡ", lightMode: "ਲਾਈਟ ਮੋਡ",
    language: "ਭਾਸ਼ਾ", settings: "ਸੈਟਿੰਗਾਂ", logout: "ਲੌਗਆਊਟ",
    priorityQueue: "ਤਰਜੀਹੀ ਕਤਾਰ", riskLevel: "ਖਤਰੇ ਦਾ ਪੱਧਰ",
    aiAnalysis: "AI ਵਿਸ਼ਲੇਸ਼ਣ", checkSymptoms: "ਲੱਛਣ ਜਾਂਚੋ",
    village: "ਪਿੰਡ", status: "ਸਥਿਤੀ", patients: "ਮਰੀਜ਼",
    totalConsultations: "ਕੁੱਲ ਸਲਾਹ", today: "ਅੱਜ",
    quickActions: "ਤੇਜ਼ ਕਾਰਵਾਈਆਂ", recentActivity: "ਤਾਜ਼ਾ ਗਤੀਵਿਧੀ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", error: "ਗਲਤੀ ਹੋਈ",
    back: "ਵਾਪਸ", next: "ਅਗਲਾ", confirm: "ਪੁਸ਼ਟੀ ਕਰੋ", cancel: "ਰੱਦ ਕਰੋ", save: "ਸੁਰੱਖਿਅਤ ਕਰੋ",
    search: "ਖੋਜ", filter: "ਫਿਲਟਰ", all: "ਸਭ",
    stockStatus: "ਸਟਾਕ ਸਥਿਤੀ", inStock: "ਸਟਾਕ ਵਿੱਚ", lowStock: "ਘੱਟ ਸਟਾਕ", outOfStock: "ਸਟਾਕ ਖਤਮ",
    prescriptionPad: "ਨੁਸਖ਼ਾ", patientHistory: "ਮਰੀਜ਼ ਇਤਿਹਾਸ",
    syncPending: "ਸਿੰਕ ਬਾਕੀ", syncNow: "ਹੁਣੇ ਸਿੰਕ ਕਰੋ", lastSync: "ਆਖਰੀ ਸਿੰਕ",
    registerPatient: "ਮਰੀਜ਼ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", schedulecamp: "ਕੈਂਪ ਸ਼ਡਿਊਲ",
    doctorAvailability: "ਡਾਕਟਰ ਉਪਲਬਧਤਾ", workloadDashboard: "ਕੰਮ ਦਾ ਡੈਸ਼ਬੋਰਡ",
  }
};

export const RISK_ENGINE = {
  classify: (selectedSymptomIds, symptoms) => {
    const selected = symptoms.filter(s => selectedSymptomIds.includes(s.id));
    const totalWeight = selected.reduce((sum, s) => sum + s.weight, 0);
    const hasCardiac = selected.some(s => s.category === 'cardiac');
    const hasCritical = selected.some(s => s.weight >= 5);

    let level = 'mild';
    let color = 'green';
    let priority = 'standard';
    let recommendation = '';
    let action = '';

    if (hasCritical || totalWeight >= 8 || hasCardiac) {
      level = 'high'; color = 'red'; priority = 'immediate';
      recommendation = 'Immediate medical attention required. Please seek emergency care or book a high-priority consultation now.';
      action = 'Book Emergency Slot';
    } else if (totalWeight >= 4) {
      level = 'moderate'; color = 'amber'; priority = 'medium';
      recommendation = 'Moderate risk detected. Consult a doctor within 24-48 hours. Monitor symptoms closely.';
      action = 'Book Priority Slot';
    } else {
      level = 'mild'; color = 'green'; priority = 'standard';
      recommendation = 'Mild symptoms. Rest, hydration, and OTC medicines may help. Consult if symptoms persist over 3 days.';
      action = 'Schedule Appointment';
    }

    const possibleConditions = getPossibleConditions(selected);
    return { level, color, priority, recommendation, action, totalWeight, possibleConditions };
  }
};

function getPossibleConditions(symptoms) {
  const cats = symptoms.map(s => s.category);
  const conditions = [];
  if (cats.includes('cardiac')) conditions.push({ name: 'Cardiac Condition', probability: 'High', urgent: true });
  if (cats.includes('respiratory') && cats.includes('common')) conditions.push({ name: 'Viral/Flu Infection', probability: 'High', urgent: false });
  if (cats.includes('digestive')) conditions.push({ name: 'Gastrointestinal Issue', probability: 'Medium', urgent: false });
  if (cats.includes('neurological')) conditions.push({ name: 'Neurological Concern', probability: 'Medium', urgent: true });
  if (cats.includes('common')) conditions.push({ name: 'Common Cold/Fever', probability: 'High', urgent: false });
  if (conditions.length === 0) conditions.push({ name: 'General Illness', probability: 'Low', urgent: false });
  return conditions;
}

// Named exports above; default for convenience:
// Named export alias
const demoData = { DEMO_DOCTORS, DEMO_PATIENTS, DEMO_APPOINTMENTS, DEMO_PHARMACIES, DEMO_MEDICINES, DEMO_HEALTH_RECORDS, DEMO_SYMPTOMS, DEMO_VILLAGES, DEMO_ASHA_WORKERS, DEMO_HEALTH_CAMPS, ANALYTICS_DATA, TRANSLATIONS, RISK_ENGINE };
export default demoData;
