// // Enhanced Mock Data for Telemedicine Access Dashboard
// // At the end of the file
// export const mockData = {
//   doctors: mockDoctors,
//   // ... other exports
// };
export const dashboardStats = {
  doctorsAvailable: {
    current: 11,
    total: 23,
    percentage: Math.round((11 / 23) * 100),
    specialties: {
      'General Medicine': { available: 4, total: 8 },
      'Pediatrics': { available: 2, total: 4 },
      'Cardiology': { available: 1, total: 3 },
      'Gynecology': { available: 2, total: 3 },
      'Orthopedics': { available: 1, total: 2 },
      'Dermatology': { available: 1, total: 2 },
      'Psychiatry': { available: 0, total: 1 }
    }
  },
  villagesServed: {
    total: 173,
    active: 165,
    maintenance: 5,
    offline: 3,
    newThisMonth: 12,
    growthRate: 8.5
  },
  medicineStock: {
    percentage: 68,
    inStock: 340,
    total: 500,
    lowStock: 45,
    outOfStock: 15,
    categories: {
      'Pain Relief': { stock: 85, total: 100 },
      'Antibiotics': { stock: 23, total: 50 },
      'Cold & Flu': { stock: 67, total: 80 },
      'Diabetes': { stock: 42, total: 60 },
      'Heart Medicine': { stock: 28, total: 40 },
      'Vitamins': { stock: 95, total: 120 }
    }
  },
  patientsServed: {
    total: 2847,
    thisMonth: 445,
    today: 24,
    weeklyGrowth: 12.3
  },
  consultationsToday: 24,
  emergencyCases: {
    today: 3,
    thisWeek: 18,
    thisMonth: 67
  },
  systemHealth: {
    uptime: 99.7,
    responseTime: 145,
    activeConnections: 89,
    dataSync: 'up-to-date'
  }
};

export const quickActionsData = [
  {
    id: 'book-consultation',
    title: 'Book Consultation',
    description: 'Connect with available doctors instantly',
    icon: '👩‍⚕️',
    route: '/doctors',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    category: 'consultation',
    popularity: 95,
    isPopular: true,
    estimatedTime: '5-10 min wait',
    features: ['Video Call', 'Audio Call', 'Chat Support']
  },
  {
    id: 'symptom-checker',
    title: 'AI Symptom Checker',
    description: 'Get instant AI-powered health assessment',
    icon: '🔍',
    route: '/symptom-checker',
    bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
    category: 'diagnosis',
    popularity: 87,
    isPopular: true,
    estimatedTime: '2-3 min',
    features: ['AI Analysis', 'Recommendations', 'Doctor Referral']
  },
  {
    id: 'medicine-tracker',
    title: 'Medicine Inventory',
    description: 'Check medicine availability across locations',
    icon: '💊',
    route: '/medicine-tracker',
    bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    category: 'pharmacy',
    popularity: 76,
    features: ['Stock Levels', 'Location Finder', 'Refill Alerts']
  },
  {
    id: 'health-records',
    title: 'Health Records',
    description: 'Access and manage patient medical history',
    icon: '📋',
    route: '/health-records',
    bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700',
    category: 'records',
    popularity: 82,
    features: ['Digital Records', 'QR Access', 'Share Records']
  },
  {
    id: 'emergency-services',
    title: 'Emergency Services',
    description: 'Quick access to emergency medical help',
    icon: '🚨',
    route: '/emergency',
    bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700',
    category: 'emergency',
    popularity: 45,
    features: ['Immediate Response', '24/7 Available', 'GPS Location']
  },
  {
    id: 'appointment-booking',
    title: 'Schedule Appointment',
    description: 'Book future consultations with specialists',
    icon: '📅',
    route: '/appointments',
    bgColor: 'bg-gradient-to-r from-teal-500 to-teal-600',
    hoverColor: 'hover:from-teal-600 hover:to-teal-700',
    category: 'scheduling',
    popularity: 69,
    features: ['Flexible Timing', 'Specialist Booking', 'Reminders']
  }
];

export const recentActivities = [
  {
    id: 1,
    type: 'consultation',
    message: 'Dr. Rajesh Kumar completed consultation with Patient #2847',
    time: '2 minutes ago',
    priority: 'normal',
    location: 'Nabha Primary Health Center',
    status: 'completed'
  },
  {
    id: 2,
    type: 'emergency',
    message: 'Emergency case reported in Village Khanna - Chest pain',
    time: '15 minutes ago',
    priority: 'high',
    location: 'Khanna Rural Clinic',
    status: 'in-progress'
  },
  {
    id: 3,
    type: 'medicine',
    message: 'Medicine stock alert: Paracetamol running low (12 units left)',
    time: '1 hour ago',
    priority: 'medium',
    location: 'Nabha Community Center',
    status: 'pending'
  },
  {
    id: 4,
    type: 'appointment',
    message: '3 new appointments scheduled for tomorrow',
    time: '2 hours ago',
    priority: 'normal',
    location: 'Multiple locations',
    status: 'scheduled'
  },
  {
    id: 5,
    type: 'system',
    message: 'System backup completed successfully',
    time: '4 hours ago',
    priority: 'normal',
    location: 'System',
    status: 'completed'
  },
  {
    id: 6,
    type: 'doctor',
    message: 'Dr. Priya Singh came online - Pediatrics available',
    time: '6 hours ago',
    priority: 'normal',
    location: 'Samrala Health Center',
    status: 'online'
  }
];

export const villageData = [
  { 
    name: 'Nabha', 
    patients: 245, 
    status: 'active',
    lastUpdate: '2 min ago',
    internetSpeed: '25 Mbps',
    activeDoctors: 3,
    emergencyLevel: 'low'
  },
  { 
    name: 'Khanna', 
    patients: 189, 
    status: 'active',
    lastUpdate: '5 min ago',
    internetSpeed: '18 Mbps',
    activeDoctors: 2,
    emergencyLevel: 'medium'
  },
  { 
    name: 'Samrala', 
    patients: 167, 
    status: 'active',
    lastUpdate: '3 min ago',
    internetSpeed: '22 Mbps',
    activeDoctors: 2,
    emergencyLevel: 'low'
  },
  { 
    name: 'Ghagga', 
    patients: 134, 
    status: 'maintenance',
    lastUpdate: '2 hours ago',
    internetSpeed: 'Offline',
    activeDoctors: 0,
    emergencyLevel: 'low'
  },
  { 
    name: 'Bhadson', 
    patients: 112, 
    status: 'active',
    lastUpdate: '1 min ago',
    internetSpeed: '15 Mbps',
    activeDoctors: 1,
    emergencyLevel: 'low'
  },
  { 
    name: 'Patran', 
    patients: 98, 
    status: 'active',
    lastUpdate: '4 min ago',
    internetSpeed: '20 Mbps',
    activeDoctors: 1,
    emergencyLevel: 'low'
  },
  { 
    name: 'Rajpura', 
    patients: 156, 
    status: 'offline',
    lastUpdate: '1 day ago',
    internetSpeed: 'No connection',
    activeDoctors: 0,
    emergencyLevel: 'high'
  }
];

export const systemMetrics = {
  performance: {
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkLatency: 145,
    activeConnections: 89,
    requestsPerMinute: 342
  },
  availability: {
    uptime: 99.7,
    lastDowntime: '2 days ago',
    scheduledMaintenance: 'Sunday 2:00 AM',
    backupStatus: 'Success',
    lastBackup: '6 hours ago'
  },
  security: {
    activeThreats: 0,
    blockedAttempts: 23,
    lastSecurityScan: '1 hour ago',
    certificateExpiry: '89 days',
    encryptionStatus: 'Active'
  }
};

export const doctorSchedule = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialty: 'General Medicine',
    currentStatus: 'available',
    nextAppointment: '2:30 PM',
    location: 'Nabha Primary',
    consultationsToday: 8,
    avgConsultationTime: '12 min',
    rating: 4.8,
    languages: ['Hindi', 'English', 'Punjabi']
  },
  {
    id: 2,
    name: 'Dr. Priya Singh',
    specialty: 'Pediatrics',
    currentStatus: 'in-consultation',
    nextAppointment: '4:00 PM',
    location: 'Samrala Clinic',
    consultationsToday: 6,
    avgConsultationTime: '15 min',
    rating: 4.9,
    languages: ['Hindi', 'English']
  },
  {
    id: 3,
    name: 'Dr. Gurdeep Kaur',
    specialty: 'Cardiology',
    currentStatus: 'offline',
    nextAppointment: 'Tomorrow 10:00 AM',
    location: 'Khanna Heart Center',
    consultationsToday: 4,
    avgConsultationTime: '18 min',
    rating: 4.7,
    languages: ['Punjabi', 'Hindi', 'English']
  }
];

export const medicineInventory = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    stock: 150,
    minStock: 50,
    location: 'Nabha Primary Hospital',
    supplier: 'MediSupply Co.',
    lastRestocked: '2024-09-20',
    expiryDate: '2025-12-31',
    unitPrice: 2.50,
    status: 'adequate'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    stock: 23,
    minStock: 30,
    location: 'Nabha Community Center',
    supplier: 'PharmaCorp Ltd.',
    lastRestocked: '2024-09-15',
    expiryDate: '2025-08-15',
    unitPrice: 8.75,
    status: 'low'
  },
  {
    id: 3,
    name: 'Cough Syrup',
    category: 'Cold & Flu',
    stock: 89,
    minStock: 25,
    location: 'Rural Health Center',
    supplier: 'HealthMeds Inc.',
    lastRestocked: '2024-09-18',
    expiryDate: '2025-06-30',
    unitPrice: 15.00,
    status: 'adequate'
  },
  {
    id: 4,
    name: 'Insulin (100IU/ml)',
    category: 'Diabetes',
    stock: 12,
    minStock: 20,
    location: 'Khanna Diabetes Clinic',
    supplier: 'DiabeteCare Ltd.',
    lastRestocked: '2024-09-10',
    expiryDate: '2025-03-15',
    unitPrice: 125.00,
    status: 'critical'
  }
];

export const patientDemographics = {
  ageGroups: [
    { range: '0-18', count: 567, percentage: 19.9 },
    { range: '19-35', count: 823, percentage: 28.9 },
    { range: '36-55', count: 945, percentage: 33.2 },
    { range: '56-70', count: 412, percentage: 14.5 },
    { range: '70+', count: 100, percentage: 3.5 }
  ],
  gender: [
    { type: 'Female', count: 1534, percentage: 53.9 },
    { type: 'Male', count: 1313, percentage: 46.1 }
  ],
  commonConditions: [
    { condition: 'Hypertension', cases: 456, trend: 'stable' },
    { condition: 'Diabetes', cases: 234, trend: 'increasing' },
    { condition: 'Respiratory Issues', cases: 189, trend: 'seasonal' },
    { condition: 'Heart Disease', cases: 156, trend: 'stable' },
    { condition: 'Mental Health', cases: 89, trend: 'increasing' }
  ]
};

export const consultationStats = {
  byType: [
    { type: 'Video Consultation', count: 1456, percentage: 51.2 },
    { type: 'Audio Consultation', count: 893, percentage: 31.4 },
    { type: 'Chat Consultation', count: 498, percentage: 17.4 }
  ],
  bySpecialty: [
    { specialty: 'General Medicine', consultations: 1203, avgDuration: '12 min' },
    { specialty: 'Pediatrics', consultations: 567, avgDuration: '15 min' },
    { specialty: 'Cardiology', consultations: 234, avgDuration: '20 min' },
    { specialty: 'Gynecology', consultations: 189, avgDuration: '18 min' },
    { specialty: 'Orthopedics', consultations: 156, avgDuration: '16 min' }
  ],
  satisfactionRatings: [
    { rating: 5, count: 1678, percentage: 58.9 },
    { rating: 4, count: 856, percentage: 30.1 },
    { rating: 3, count: 234, percentage: 8.2 },
    { rating: 2, count: 56, percentage: 2.0 },
    { rating: 1, count: 23, percentage: 0.8 }
  ]
};

export const emergencyData = {
  recentEmergencies: [
    {
      id: 'EM001',
      type: 'Cardiac Emergency',
      location: 'Khanna Village',
      timestamp: '2024-09-28 14:30',
      status: 'resolved',
      responseTime: '8 minutes',
      severity: 'high'
    },
    {
      id: 'EM002',
      type: 'Accident',
      location: 'Nabha Highway',
      timestamp: '2024-09-28 10:15',
      status: 'in-progress',
      responseTime: '12 minutes',
      severity: 'medium'
    },
    {
      id: 'EM003',
      type: 'Allergic Reaction',
      location: 'Samrala Clinic',
      timestamp: '2024-09-27 16:45',
      status: 'resolved',
      responseTime: '5 minutes',
      severity: 'medium'
    }
  ],
  responseMetrics: {
    averageResponseTime: '9.2 minutes',
    successRate: 96.5,
    totalEmergenciesThisMonth: 67,
    criticalCases: 12,
    resolvedCases: 63
  }
};

export const networkStatus = {
  villages: villageData.map(village => ({
    ...village,
    bandwidth: village.internetSpeed !== 'Offline' ? 
      parseInt(village.internetSpeed) : 0,
    latency: village.status === 'active' ? 
      Math.floor(Math.random() * 100) + 50 : null,
    packetLoss: village.status === 'active' ? 
      Math.random() * 2 : null
  })),
  totalBandwidth: '450 Mbps',
  redundancy: 'Active',
  lastOutage: '3 days ago',
  uptimeTarget: 99.9
};

export const trainingData = {
  upcomingTrainings: [
    {
      id: 'TR001',
      title: 'Telemedicine Best Practices',
      date: '2024-10-15',
      participants: 45,
      type: 'online',
      duration: '2 hours'
    },
    {
      id: 'TR002',
      title: 'Emergency Response Protocol',
      date: '2024-10-22',
      participants: 23,
      type: 'hybrid',
      duration: '4 hours'
    },
    {
      id: 'TR003',
      title: 'Digital Health Records Management',
      date: '2024-10-30',
      participants: 67,
      type: 'online',
      duration: '3 hours'
    }
  ],
  completedTrainings: {
    thisMonth: 12,
    totalParticipants: 234,
    averageRating: 4.7,
    completionRate: 89.3
  }
};

export const financialData = {
  monthlyBudget: {
    allocated: 850000,
    spent: 623000,
    remaining: 227000,
    percentage: 73.2
  },
  expenses: [
    { category: 'Doctor Fees', amount: 345000, percentage: 55.4 },
    { category: 'Technology', amount: 156000, percentage: 25.0 },
    { category: 'Medicine', amount: 87000, percentage: 14.0 },
    { category: 'Infrastructure', amount: 35000, percentage: 5.6 }
  ],
  revenue: {
    consultationFees: 567000,
    governmentFunding: 890000,
    donations: 123000,
    total: 1580000
  }
};

export const qualityMetrics = {
  patientSatisfaction: {
    overall: 4.6,
    byCategory: {
      'Doctor Competence': 4.8,
      'Technology Experience': 4.4,
      'Wait Time': 4.2,
      'Follow-up Care': 4.7,
      'Accessibility': 4.5
    }
  },
  clinicalOutcomes: {
    treatmentSuccess: 94.2,
    referralRate: 12.8,
    readmissionRate: 3.4,
    preventableCases: 87.6
  },
  serviceQuality: {
    responseTime: 'Excellent',
    technicalReliability: 96.8,
    dataAccuracy: 99.2,
    userExperience: 4.5
  }
};

// Export everything as default
export default {
  dashboardStats,
  quickActionsData,
  recentActivities,
  villageData,
  systemMetrics,
  doctorSchedule,
  medicineInventory,
  patientDemographics,
  consultationStats,
  emergencyData,
  networkStatus,
  trainingData,
  financialData,
  qualityMetrics
};