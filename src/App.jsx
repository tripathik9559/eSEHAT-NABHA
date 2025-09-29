import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Users, Calendar, MessageCircle, FileText, Pill, BarChart3,
  Phone, Video, Clock, MapPin, Star, Search, CheckCircle, AlertCircle,
  Wifi, WifiOff, Globe, Stethoscope, UserCircle, Download, QrCode,
  Shield, RefreshCw, Menu, X, ChevronRight, Activity, Building,
  Plus, Filter, ChevronLeft, Award, BookOpen, Mail, CreditCard,
  User, Check, PhoneCall, Send, Paperclip, Image, Mic, MicOff,
  MoreVertical, Smile, Camera
} from 'lucide-react';

// Import completed component modules
// Health Records Components
import HealthRecords from './components/health-records/HealthRecords';
import RecordCard from './components/health-records/RecordCard';
import RecordViewer from './components/health-records/RecordViewer';
import QRGenerator from './components/health-records/QRGenerator';

// Symptom Checker Components
import SymptomChecker from './components/symptom-checker/SymptomChecker';
import SymptomSelector from './components/symptom-checker/SymptomSelector';
import AIRecommendations from './components/symptom-checker/AIRecommendations';
import SymptomHistory from './components/symptom-checker/SymptomHistory';

// Medicine Tracker Components
import MedicineTracker from './components/medicine-tracker/MedicineTracker';
import MedicineCard from './components/medicine-tracker/MedicineCard';
import PharmacyLocator from './components/medicine-tracker/PharmacyLocator';
import RefillReminders from './components/medicine-tracker/RefillReminders';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import DoctorManagement from './components/admin/DoctorManagement';
import InventoryManagement from './components/admin/InventoryManagement';
import PatientStats from './components/admin/PatientStats';

// Dashboard Components
import DashboardHome from './components/dashboard/DashboardHome';
import QuickActions from './components/dashboard/QuickActions';
import StatsCard from './components/dashboard/StatsCard';

// Doctor Components
import DoctorCard from './components/doctors/DoctorCard';
import DoctorList from './components/doctors/DoctorList';
import DoctorProfile from './components/doctors/DoctorProfile';
import ConsultationBooking from './components/doctors/ConsultationBooking';

// Consultation Components
import VideoCall from './components/consultation/VideoCall';
import AudioCall from './components/consultation/AudioCall';
import ChatInterface from './components/consultation/ChatInterface';
import ConsultationHistory from './components/consultation/ConsultationHistory';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LanguageSwitcher from './components/common/LanguageSwitcher';
import LoadingSpinner from './components/common/LoadingSpinner';
import OfflineIndicator from './components/common/OfflineIndicator';

// Mock Data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    nameHi: "डॉ. राजेश कुमार",
    namePa: "ਡਾ. ਰਾਜੇਸ਼ ਕੁਮਾਰ",
    specialty: "General Medicine",
    specialtyHi: "सामान्य चिकित्सा",
    specialtyPa: "ਆਮ ਦਵਾਈ",
    specialization: "General Medicine",
    languages: ["Hindi", "English", "Punjabi"],
    rating: 4.8,
    experience: "12 years",
    available: true,
    nextSlot: "Today 2:30 PM",
    image: "👨‍⚕️",
    consultationFee: "₹200",
    fee: "200",
    patients: "2500",
    location: "Nabha",
    phone: "+91 98765 43210",
    email: "dr.rajesh@nabhahealth.in",
    address: "Nabha Primary Hospital, Main Road",
    bio: "Dr. Rajesh Kumar is a highly experienced general physician with over 12 years of practice.",
    qualifications: [
      "MBBS - Government Medical College",
      "MD General Medicine - AIIMS",
      "Fellowship in Advanced Medicine"
    ]
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    nameHi: "डॉ. प्रिया सिंह",
    namePa: "ਡਾ. ਪ੍ਰਿਯਾ ਸਿੰਘ",
    specialty: "Pediatrics",
    specialtyHi: "बाल रोग",
    specialtyPa: "ਬੱਚਿਆਂ ਦੀ ਬਿਮਾਰੀ",
    specialization: "Pediatrics",
    languages: ["Hindi", "English"],
    rating: 4.9,
    experience: "8 years",
    available: true,
    nextSlot: "Today 4:00 PM",
    image: "👩‍⚕️",
    consultationFee: "₹250",
    fee: "250",
    patients: "1800",
    location: "Nabha",
    phone: "+91 98765 43211",
    email: "dr.priya@nabhahealth.in",
    address: "Nabha Children's Clinic",
    bio: "Dr. Priya Singh specializes in pediatric care with 8 years of experience.",
    qualifications: [
      "MBBS - Medical College",
      "MD Pediatrics - PGI",
      "Certified Child Health Specialist"
    ]
  },
  {
    id: 3,
    name: "Dr. Gurdeep Kaur",
    nameHi: "डॉ. गुरदीप कौर",
    namePa: "ਡਾ. ਗੁਰਦੀਪ ਕੌਰ",
    specialty: "Cardiology",
    specialtyHi: "हृदय रोग",
    specialtyPa: "ਦਿਲ ਦੀ ਬਿਮਾਰੀ",
    specialization: "Cardiology",
    languages: ["Punjabi", "Hindi", "English"],
    rating: 4.7,
    experience: "15 years",
    available: false,
    nextSlot: "Tomorrow 10:00 AM",
    image: "👩‍⚕️",
    consultationFee: "₹500",
    fee: "500",
    patients: "3200",
    location: "Nabha",
    phone: "+91 98765 43212",
    email: "dr.gurdeep@nabhahealth.in",
    address: "Nabha Heart Care Center",
    bio: "Dr. Gurdeep Kaur is a renowned cardiologist with 15 years of experience.",
    qualifications: [
      "MBBS - Government Medical College",
      "MD Cardiology - AIIMS",
      "Fellowship in Interventional Cardiology"
    ]
  },
  {
    id: 4,
    name: "Dr. Amit Sharma",
    nameHi: "डॉ. अमित शर्मा",
    namePa: "ਡਾ. ਅਮਿਤ ਸ਼ਰਮਾ",
    specialty: "Orthopedics",
    specialtyHi: "हड्डी रोग",
    specialtyPa: "ਹੱਡੀਆਂ ਦਾ ਇਲਾਜ",
    specialization: "Orthopedics",
    languages: ["Hindi", "English"],
    rating: 4.6,
    experience: "10 years",
    available: true,
    nextSlot: "Today 5:00 PM",
    image: "👨‍⚕️",
    consultationFee: "₹300",
    fee: "300",
    patients: "2100",
    location: "Nabha",
    phone: "+91 98765 43213",
    email: "dr.amit@nabhahealth.in",
    address: "Nabha Orthopedic Center",
    bio: "Dr. Amit Sharma specializes in orthopedic surgery with 10 years of experience.",
    qualifications: [
      "MBBS - Medical College",
      "MS Orthopedics - PGIMER",
      "Fellowship in Joint Replacement"
    ]
  }
];

const mockHealthRecords = [
  {
    id: "HR001",
    date: "2024-09-25",
    doctor: "Dr. Rajesh Kumar",
    type: "General Checkup",
    symptoms: "Fever, headache",
    diagnosis: "Viral fever",
    medicines: ["Paracetamol 500mg", "Rest"],
    notes: "Take medicine after meals",
    qrCode: "HR001-2024-09-25"
  },
  {
    id: "HR002", 
    date: "2024-09-15",
    doctor: "Dr. Priya Singh",
    type: "Follow-up",
    symptoms: "Cough, cold",
    diagnosis: "Upper respiratory infection",
    medicines: ["Cough syrup", "Steam inhalation"],
    notes: "Complete the course",
    qrCode: "HR002-2024-09-15"
  }
];

const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    stock: 150,
    location: "Nabha Primary Hospital",
    refillAlert: false,
    category: "Pain Relief"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg", 
    stock: 23,
    location: "Nabha Community Center",
    refillAlert: true,
    category: "Antibiotic"
  },
  {
    id: 3,
    name: "Cough Syrup",
    stock: 89,
    location: "Rural Health Center",
    refillAlert: false,
    category: "Cold & Flu"
  }
];

const symptoms = [
  { id: 1, name: "Fever", category: "common" },
  { id: 2, name: "Headache", category: "common" },
  { id: 3, name: "Cough", category: "respiratory" },
  { id: 4, name: "Sore Throat", category: "respiratory" },
  { id: 5, name: "Body Ache", category: "common" },
  { id: 6, name: "Nausea", category: "digestive" },
  { id: 7, name: "Chest Pain", category: "cardiac" },
  { id: 8, name: "Shortness of Breath", category: "respiratory" }
];
// Translation object
const translations = {
  en: {
    appName: "Nabha Health",
    home: "Home",
    doctors: "Doctors",
    records: "Health Records",
    symptoms: "Symptom Checker",
    medicines: "Medicines",
    admin: "Dashboard",
    welcome: "Welcome to Rural Healthcare",
    availableDoctors: "Available Doctors",
    bookConsultation: "Book Consultation",
    viewRecords: "View Health Records",
    checkSymptoms: "Check Symptoms",
    trackMedicine: "Track Medicines",
    online: "Online",
    offline: "Offline",
    consultNow: "Consult Now",
    bookAppointment: "Book Appointment",
    viewProfile: "View Profile",
    experience: "Experience",
    rating: "Rating",
    languages: "Languages",
    available: "Available",
    notAvailable: "Not Available",
    nextSlot: "Next Slot",
    back: "Back",
    doctorNotFound: "Doctor Not Found",
    backToDoctors: "Back to Doctors",
    today: "Today",
    tomorrow: "Tomorrow",
    dayAfter: "Day After Tomorrow",
    about: "About",
    qualifications: "Qualifications",
    contactInformation: "Contact Information",
    quickConsultation: "Quick Consultation",
    videoCall: "Video Call",
    audioCall: "Audio Call",
    chatConsultation: "Chat",
    availability: "Availability",
    consultationFee: "Consultation Fee",
    perConsultation: "per consultation",
    selectDoctor: "Select Doctor",
    patientDetails: "Patient Details",
    confirmation: "Confirmation",
    selectDoctorAndType: "Select Doctor & Consultation Type",
    consultationType: "Consultation Type",
    videoConsultation: "Video Consultation",
    audioConsultation: "Audio Consultation",
    selectDate: "Select Date",
    selectTime: "Select Time",
    next: "Next",
    previous: "Previous",
    patientName: "Patient Name",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    phone: "Phone",
    email: "Email",
    describeSymptomsPlaceholder: "Describe your symptoms in detail...",
    confirmBooking: "Confirm Booking",
    bookingSummary: "Booking Summary",
    doctor: "Doctor",
    specialization: "Specialization",
    date: "Date",
    time: "Time",
    patient: "Patient",
    totalFee: "Total Fee",
    paymentMethod: "Payment Method",
    onlinePayment: "Online Payment",
    payNow: "Pay Now",
    payAtConsultation: "Pay at Consultation",
    payLater: "Pay Later",
    importantNote: "Important Note",
    arriveOnTime: "Please arrive on time for your consultation",
    cancellationPolicy: "Cancellation charges may apply within 2 hours",
    technicalRequirements: "Ensure stable internet for video calls",
    booking: "Booking",
    confirmAndBook: "Confirm & Book",
    typeMessage: "Type a message...",
    lastSeenRecently: "Last seen recently",
    moreOptions: "More Options",
    photo: "Photo",
    document: "Document",
    camera: "Camera",
    recording: "Recording...",
    book: "Book",
    fileSent: "File sent successfully",
    recordingStarted: "Recording started",
    voiceMessageSent: "Voice message sent",
    recordingStopped: "Recording stopped"
  },
  hi: {
    appName: "नाभा स्वास्थ्य",
    home: "होम",
    doctors: "डॉक्टर",
    records: "स्वास्थ्य रिकॉर्ड",
    symptoms: "लक्षण जांच",
    medicines: "दवाएं",
    admin: "डैशबोर्ड",
    welcome: "ग्रामीण स्वास्थ्य सेवा में आपका स्वागत है",
    availableDoctors: "उपलब्ध डॉक्टर",
    bookConsultation: "परामर्श बुक करें",
    viewRecords: "स्वास्थ्य रिकॉर्ड देखें",
    checkSymptoms: "लक्षणों की जांच करें",
    trackMedicine: "दवा ट्रैक करें",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
  },
  pa: {
    appName: "ਨਾਭਾ ਸਿਹਤ",
    home: "ਘਰ",
    doctors: "ਡਾਕਟਰ",
  }
};

function NabhaTelemedicine() {
  // State Management
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationMode, setConsultationMode] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // Booking form state
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    consultationType: 'video',
    date: '',
    time: '',
    patientName: '',
    patientAge: '',
    patientGender: 'male',
    phone: '',
    email: '',
    symptoms: '',
    paymentMethod: 'online'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chat state
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Smith',
      message: 'Hello! How can I help you today?',
      time: '10:00 AM',
      isDoctor: true,
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      sender: 'Dr. Sarah Smith',
      message: 'Please feel free to describe your symptoms or concerns.',
      time: '10:01 AM',
      isDoctor: true,
      type: 'text',
      status: 'read'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const t = translations[currentLanguage];

  // Navigation function
  const navigateTo = (page, doctorId = null) => {
    setCurrentPage(page);
    if (doctorId) setSelectedDoctorId(doctorId);
    setMobileMenuOpen(false);
  };

  // Effects
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Notification system
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
// Header Component (Preserved from original)
  const Header = () => (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
              <p className="text-sm text-gray-600 flex items-center">
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500 mr-1" />
                    {t.online}
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500 mr-1" />
                    {t.offline}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            {[
              { id: 'home', icon: Users, label: t.home },
              { id: 'doctors', icon: Stethoscope, label: t.doctors },
              { id: 'records', icon: FileText, label: t.records },
              { id: 'symptoms', icon: Activity, label: t.symptoms },
              { id: 'medicines', icon: Pill, label: t.medicines },
              { id: 'admin', icon: BarChart3, label: t.admin }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === id 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          notification.type === 'warning' ? 'bg-yellow-500' :
          'bg-blue-500'
        } text-white animate-slide-in`}>
          {notification.message}
        </div>
      )}
    </header>
  );
// Home Dashboard (Preserved from original)
  const HomePage = () => (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.welcome}</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with qualified doctors, manage your health records, and access healthcare services from anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Available Doctors</p>
              <p className="text-3xl font-bold">{mockDoctors.filter(d => d.available).length}</p>
            </div>
            <Stethoscope className="w-12 h-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Health Records</p>
              <p className="text-3xl font-bold">{mockHealthRecords.length}</p>
            </div>
            <FileText className="w-12 h-12 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Medicines Tracked</p>
              <p className="text-3xl font-bold">{mockMedicines.length}</p>
            </div>
            <Pill className="w-12 h-12 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Status</p>
              <p className="text-lg font-bold">{isOnline ? t.online : t.offline}</p>
            </div>
            {isOnline ? <Wifi className="w-12 h-12 text-orange-200" /> : <WifiOff className="w-12 h-12 text-orange-200" />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: t.bookConsultation, 
            desc: "Connect with available doctors", 
            icon: Video, 
            color: "blue", 
            action: () => navigateTo('doctors') 
          },
          { 
            title: t.viewRecords, 
            desc: "Access your health history", 
            icon: FileText, 
            color: "green", 
            action: () => navigateTo('records') 
          },
          { 
            title: t.checkSymptoms, 
            desc: "AI-powered health assessment", 
            icon: Activity, 
            color: "purple", 
            action: () => navigateTo('symptoms') 
          },
          { 
            title: t.trackMedicine, 
            desc: "Monitor medicine availability", 
            icon: Pill, 
            color: "orange", 
            action: () => navigateTo('medicines') 
          }
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <action.icon className="w-6 h-6 text-blue-500 group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-4" />
          </button>
        ))}
      </div>
    </div>
  );
  // Doctors Page (Preserved from original)
  const DoctorsCard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">{t.availableDoctors}</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  {doctor.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentLanguage === 'hi' ? doctor.nameHi : 
                     currentLanguage === 'pa' ? doctor.namePa : doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {currentLanguage === 'hi' ? doctor.specialtyHi :
                     currentLanguage === 'pa' ? doctor.specialtyPa : doctor.specialty}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.languages}:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={`text-sm font-medium ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                      {doctor.available ? t.available : t.notAvailable}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{doctor.consultationFee}</span>
                </div>

                {doctor.available && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {t.nextSlot}: {doctor.nextSlot}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => navigateTo('doctor-profile', doctor.id)}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{t.viewProfile}</span>
                </button>
                <button
                  onClick={() => {
                    setBookingData({ ...bookingData, doctorId: doctor.id.toString() });
                    navigateTo('booking');
                  }}
                  disabled={!doctor.available}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                    doctor.available
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.book}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // Doctors Page (Preserved from original)
  const DoctorsPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">{t.availableDoctors}</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  {doctor.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentLanguage === 'hi' ? doctor.nameHi : 
                     currentLanguage === 'pa' ? doctor.namePa : doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {currentLanguage === 'hi' ? doctor.specialtyHi :
                     currentLanguage === 'pa' ? doctor.specialtyPa : doctor.specialty}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.languages}:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={`text-sm font-medium ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                      {doctor.available ? t.available : t.notAvailable}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{doctor.consultationFee}</span>
                </div>

                {doctor.available && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {t.nextSlot}: {doctor.nextSlot}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => navigateTo('doctor-profile', doctor.id)}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{t.viewProfile}</span>
                </button>
                <button
                  onClick={() => {
                    setBookingData({ ...bookingData, doctorId: doctor.id.toString() });
                    navigateTo('booking');
                  }}
                  disabled={!doctor.available}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                    doctor.available
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.book}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // Doctor Profile Page (Preserved from original)
  const DoctorProfilePage = () => {
    const doctor = mockDoctors.find(doc => doc.id === selectedDoctorId);
    const [selectedDay, setSelectedDay] = useState('today');

    if (!doctor) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.doctorNotFound}</h2>
            <button 
              onClick={() => navigateTo('doctors')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t.backToDoctors}
            </button>
          </div>
        </div>
      );
    }

    const availabilityDays = [
      { key: 'today', label: t.today, slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'] },
      { key: 'tomorrow', label: t.tomorrow, slots: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'] },
      { key: 'dayAfter', label: t.dayAfter, slots: ['10:00 AM', '01:00 PM', '03:30 PM'] }
    ];

    const handleConsultationBook = (type, time = null) => {
      const message = time 
        ? `${type} consultation scheduled with ${doctor.name} at ${time}`
        : `${type} consultation initiated with ${doctor.name}`;
      
      showNotification(message, 'success');
      
      if (type === 'chat') {
        setTimeout(() => navigateTo('chat'), 1500);
      } else {
        setTimeout(() => navigateTo('doctors'), 2000);
      }
    };

    const renderRating = (rating) => {
      return (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({rating}.0)</span>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <button 
          onClick={() => navigateTo('doctors')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t.back}
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              {doctor.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {doctor.name}
              </h1>
              <p className="text-lg text-blue-600 font-medium mb-2">
                {doctor.specialization}
              </p>
              <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {doctor.experience} {t.experience}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {doctor.patients}+ patients
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {doctor.location}
                </div>
              </div>
              {renderRating(doctor.rating)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                {t.about}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {doctor.bio || `Dr. ${doctor.name} is a highly experienced ${doctor.specialization.toLowerCase()} with over ${doctor.experience} of practice.`}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                {t.qualifications}
              </h2>
              <div className="space-y-2">
                {(doctor.qualifications || [
                  'MBBS - Government Medical College',
                  `MD ${doctor.specialization} - AIIMS`,
                  'Fellowship in Advanced Medicine'
                ]).map((qual, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {qual}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t.contactInformation}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{doctor.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {t.quickConsultation}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleConsultationBook('video')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Video className="w-5 h-5 mr-2" />
                  {t.videoCall}
                </button>
                <button
                  onClick={() => handleConsultationBook('audio')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  {t.audioCall}
                </button>
                <button
                  onClick={() => handleConsultationBook('chat')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.chatConsultation}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {t.availability}
              </h2>
              
              <div className="flex space-x-2 mb-4">
                {availabilityDays.map((day) => (
                  <button
                    key={day.key}
                    onClick={() => setSelectedDay(day.key)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedDay === day.key
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {availabilityDays
                  .find(day => day.key === selectedDay)
                  ?.slots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleConsultationBook('scheduled', time)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-700">
                          {time}
                        </span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        {t.available}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t.consultationFee}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ₹{doctor.fee}
              </div>
              <p className="text-sm text-gray-600">
                {t.perConsultation}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // Consultation Booking Page (Preserved from original)
  const ConsultationBookingPage = () => {
    const consultationTypes = [
      { id: 'video', name: t.videoConsultation, icon: Video, price: 500, color: 'blue' },
      { id: 'audio', name: t.audioConsultation, icon: PhoneCall, price: 350, color: 'green' },
      { id: 'chat', name: t.chatConsultation, icon: MessageCircle, price: 200, color: 'purple' }
    ];

    const timeSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
      '05:00 PM', '05:30 PM'
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const selectedDoctor = mockDoctors.find(doc => doc.id === parseInt(bookingData.doctorId));
        
        showNotification(
          `Consultation booked with ${selectedDoctor?.name || 'Doctor'} on ${bookingData.date} at ${bookingData.time}`,
          'success'
        );

        setTimeout(() => {
          navigateTo('doctors');
          setBookingStep(1);
          setBookingData({
            doctorId: '',
            consultationType: 'video',
            date: '',
            time: '',
            patientName: '',
            patientAge: '',
            patientGender: 'male',
            phone: '',
            email: '',
            symptoms: '',
            paymentMethod: 'online'
          });
        }, 2000);
        
      } catch (error) {
        showNotification('Booking failed. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    const nextStep = () => {
      if (bookingStep < 3) setBookingStep(bookingStep + 1);
    };

    const prevStep = () => {
      if (bookingStep > 1) setBookingStep(bookingStep - 1);
    };

    const selectedConsultationType = consultationTypes.find(type => type.id === bookingData.consultationType);
    const selectedDoctor = mockDoctors.find(doc => doc.id === parseInt(bookingData.doctorId));

    return (
      <div className="space-y-6">
        <div>
          <button 
            onClick={() => navigateTo('doctors')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            {t.back}
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">
            {t.bookConsultation}
          </h1>
          
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      bookingStep >= stepNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {bookingStep > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-full h-1 mx-4 ${
                        bookingStep > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{t.selectDoctor}</span>
              <span>{t.patientDetails}</span>
              <span>{t.confirmation}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {bookingStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t.selectDoctorAndType}
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.selectDoctor}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockDoctors.slice(0, 4).map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        bookingData.doctorId === doctor.id.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setBookingData(prev => ({ ...prev, doctorId: doctor.id.toString() }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {doctor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <p className="text-sm text-gray-500">{doctor.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.consultationType}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {consultationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          bookingData.consultationType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setBookingData(prev => ({ ...prev, consultationType: type.id }))}
                      >
                        <div className="text-center">
                          <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <h3 className="font-medium text-gray-800">{type.name}</h3>
                          <p className="text-sm text-gray-600">₹{type.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.selectDate}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.selectTime}
                  </label>
                  <select
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t.selectTime}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!bookingData.doctorId || !bookingData.date || !bookingData.time}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}
          {bookingStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t.patientDetails}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.patientName}
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={bookingData.patientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.age}
                  </label>
                  <input
                    type="number"
                    name="patientAge"
                    value={bookingData.patientAge}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.gender}
                  </label>
                  <select
                    name="patientGender"
                    value={bookingData.patientGender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <textarea
                  name="symptoms"
                  value={bookingData.symptoms}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={t.describeSymptomsPlaceholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t.previous}
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!bookingData.patientName || !bookingData.patientAge || !bookingData.phone || !bookingData.email}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {t.confirmBooking}
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-4">{t.bookingSummary}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.doctor}</span>
                    <span className="font-medium">{selectedDoctor?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.specialization}</span>
                    <span className="font-medium">{selectedDoctor?.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.consultationType}</span>
                    <span className="font-medium">{selectedConsultationType?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.date}</span>
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.time}</span>
                    <span className="font-medium">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.patient}</span>
                    <span className="font-medium">{bookingData.patientName}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>{t.totalFee}</span>
                    <span className="text-blue-600">₹{selectedConsultationType?.price}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.paymentMethod}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      bookingData.paymentMethod === 'online'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: 'online' }))}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{t.onlinePayment}</h3>
                        <p className="text-sm text-gray-600">{t.payNow}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      bookingData.paymentMethod === 'cash'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">{t.payAtConsultation}</h3>
                        <p className="text-sm text-gray-600">{t.payLater}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">{t.importantNote}</p>
                    <ul className="space-y-1 text-xs">
                      <li>• {t.arriveOnTime}</li>
                      <li>• {t.cancellationPolicy}</li>
                      <li>• {t.technicalRequirements}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t.previous}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t.booking}...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t.confirmAndBook}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  };
  // Chat Interface Page (Preserved from original)
  const ChatInterfacePage = () => {
    const doctorInfo = {
      name: selectedDoctor?.name || 'Dr. Sarah Smith',
      specialization: selectedDoctor?.specialization || 'General Physician',
      status: 'online'
    };

    const handleSendMessage = () => {
      if (chatMessage.trim()) {
        const newMessage = {
          id: chatMessages.length + 1,
          sender: 'You',
          message: chatMessage.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: false,
          type: 'text',
          status: 'sent'
        };

        setChatMessages(prev => [...prev, newMessage]);
        setChatMessage('');
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          const doctorResponses = [
            'Thank you for sharing that information. Can you tell me more about when this started?',
            'I understand. How long have you been experiencing these symptoms?',
            'That sounds concerning. Have you tried any treatments so far?',
            'Based on what you\'ve described, I\'d recommend a few things. Let me explain...',
            'I see. Are there any other symptoms you\'ve noticed?'
          ];

          const doctorResponse = {
            id: chatMessages.length + 2,
            sender: doctorInfo.name,
            message: doctorResponses[Math.floor(Math.random() * doctorResponses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isDoctor: true,
            type: 'text',
            status: 'read'
          };

          setChatMessages(prev => [...prev, doctorResponse]);
        }, 2000 + Math.random() * 3000);
      }
    };

    const handleFileUpload = (type) => {
      setShowAttachmentMenu(false);
      
      const fileMessage = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: type === 'image' ? 'Photo sent' : type === 'document' ? 'Document sent' : 'File sent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false,
        type: type,
        status: 'sent',
        fileName: type === 'image' ? 'symptoms_photo.jpg' : type === 'document' ? 'medical_report.pdf' : 'file.txt'
      };

      setChatMessages(prev => [...prev, fileMessage]);
      showNotification(t.fileSent, 'success');

      setTimeout(() => {
        const doctorResponse = {
          id: chatMessages.length + 2,
          sender: doctorInfo.name,
          message: type === 'image' ? 'Thank you for the photo. I can see the area you\'re concerned about.' : 'I\'ve received your document. Let me review it.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: true,
          type: 'text',
          status: 'read'
        };
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 3000);
    };

    const handleVoiceRecord = () => {
      setIsRecording(!isRecording);
      
      if (!isRecording) {
        showNotification(t.recordingStarted, 'info');
        
        setTimeout(() => {
          setIsRecording(false);
          const voiceMessage = {
            id: chatMessages.length + 1,
            sender: 'You',
            message: 'Voice message',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isDoctor: false,
            type: 'voice',
            status: 'sent',
            duration: '0:03'
          };
          setChatMessages(prev => [...prev, voiceMessage]);
          showNotification(t.voiceMessageSent, 'success');
        }, 3000);
      } else {
        showNotification(t.recordingStopped, 'info');
      }
    };

    const getMessageStatusIcon = (status) => {
      switch (status) {
        case 'sent':
          return <CheckCircle className="w-3 h-3 text-gray-400" />;
        case 'delivered':
          return <CheckCircle className="w-3 h-3 text-gray-600" />;
        case 'read':
          return <CheckCircle className="w-3 h-3 text-blue-500" />;
        default:
          return null;
      }
    };

    const renderMessage = (msg) => {
      const isOwnMessage = !msg.isDoctor;
      
      return (
        <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
            isOwnMessage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}>
            {msg.type === 'text' && (
              <p className="text-sm">{msg.message}</p>
            )}
            
            {msg .type === 'image' && (
              <div>
                <div className="w-48 h-32 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-xs">{msg.fileName}</p>
              </div>
            )}
            
            {msg.type === 'document' && (
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6" />
                <div>
                  <p className="text-sm font-medium">{msg.fileName}</p>
                  <p className="text-xs opacity-75">PDF • 2.1 MB</p>
                </div>
              </div>
            )}
            
            {msg.type === 'voice' && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1 bg-white bg-opacity-60 rounded-full animate-pulse" style={{height: `${Math.random() * 16 + 8}px`}}></div>
                    ))}
                  </div>
                  <p className="text-xs opacity-75 mt-1">{msg.duration}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </span>
              {isOwnMessage && getMessageStatusIcon(msg.status)}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigateTo('doctors')}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {doctorInfo.name.charAt(0)}
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{doctorInfo.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>{t.online}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => showNotification('Audio call feature coming soon', 'info')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title={t.audioCall}
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => showNotification('Video call feature coming soon', 'info')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title={t.videoCall}
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title={t.moreOptions}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-center mb-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {t.today}
            </span>
          </div>

          {chatMessages.map(renderMessage)}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-end space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {showAttachmentMenu && (
                <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-48 z-10">
                  <button
                    onClick={() => handleFileUpload('image')}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Image className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{t.photo}</span>
                  </button>
                  <button
                    onClick={() => handleFileUpload('document')}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm">{t.document}</span>
                  </button>
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAttachmentMenu(false);
                    }}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Camera className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">{t.camera}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1">
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={t.typeMessage}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="1"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>

            {chatMessage.trim() ? (
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleVoiceRecord}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
          </div>

          {isRecording && (
            <div className="flex items-center justify-center mt-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">{t.recording}</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,application/pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              const file = e.target.files[0];
              const isImage = file.type.startsWith('image/');
              handleFileUpload(isImage ? 'image' : 'document');
            }
          }}
        />
      </div>
    );
  };
  // Health Records Page - UPDATED to use imported component
  const RecordsPage = () => {
    // Check if HealthRecords component exists, fallback to inline implementation
    if (typeof HealthRecords === 'function') {
      return (
        <HealthRecords 
          records={mockHealthRecords}
          isOnline={isOnline}
          language={currentLanguage}
          translations={t}
          onNavigate={navigateTo}
          showNotification={showNotification}
        />
      );
    }

    // Fallback to original inline implementation
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">{t.records}</h2>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              <QrCode className="w-4 h-4" />
              <span>Generate QR</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {mockHealthRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                    <p className="text-gray-600">{record.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-500">{record.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Doctor</h4>
                    <p className="text-gray-600 mb-4">{record.doctor}</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                    <p className="text-gray-600 mb-4">{record.symptoms}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                    <p className="text-gray-600 mb-4">{record.diagnosis}</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Medicines</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {record.medicines.map((medicine, index) => (
                        <li key={index}>{medicine}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {record.notes && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Notes</h4>
                    <p className="text-blue-800 text-sm">{record.notes}</p>
                  </div>
                )}

                <div className="mt-4 flex justify-end space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Share Record
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Records</span>
                  <span className="font-semibold">{mockHealthRecords.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="font-semibold">Sep 25, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sync Status</span>
                  <span className={`font-semibold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {isOnline ? 'Synced' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Access</h3>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Emergency QR Code for quick access to your medical history
                </p>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                  Generate Emergency QR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Symptom Checker Page - UPDATED to use imported component
  const SymptomsPage = () => {
    // Check if SymptomChecker component exists, fallback to inline implementation
    if (typeof SymptomChecker === 'function') {
      return (
        <SymptomChecker 
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
          language={currentLanguage}
          translations={t}
          onNavigate={navigateTo}
          showNotification={showNotification}
        />
      );
    }

    // Fallback to original inline implementation
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.symptoms}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your symptoms and get AI-powered health recommendations. This is not a substitute for professional medical advice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Your Symptoms</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => {
                    if (selectedSymptoms.includes(symptom.id)) {
                      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptom.id));
                    } else {
                      setSelectedSymptoms([...selectedSymptoms, symptom.id]);
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Activity className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">{symptom.name}</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Selected Symptoms ({selectedSymptoms.length})</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSymptoms.map(id => {
                      const symptom = symptoms.find(s => s.id === id);
                      return (
                        <span key={id} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                          {symptom.name}
                        </span>
                      );
                    })}
                  </div>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium">
                    Get AI Recommendations
                  </button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    AI Analysis Results
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Possible Conditions</h5>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Common cold or viral infection (High probability)</li>
                        <li>• Seasonal flu (Medium probability)</li>
                        <li>• Stress or fatigue (Low probability)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Recommendations</h5>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Get adequate rest and hydration</li>
                        <li>• Take over-the-counter pain relievers if needed</li>
                        <li>• Monitor symptoms for 2-3 days</li>
                        <li>• Consult a doctor if symptoms worsen</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4">
                      <p className="text-yellow-800 text-sm">
                        <AlertCircle className="w-4 h-4 inline mr-2" />
                        This AI analysis is for informational purposes only. Please consult with a healthcare professional for proper medical advice.
                      </p>
                    </div>

                    <button 
                      onClick={() => navigateTo('doctors')}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-medium"
                    >
                      Book Consultation with Doctor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // Medicine Tracker Page - UPDATED to use imported component
  const MedicinesPage = () => {
    // Check if MedicineTracker component exists, fallback to inline implementation
    if (typeof MedicineTracker === 'function') {
      return (
        <MedicineTracker 
          medicines={mockMedicines}
          isOnline={isOnline}
          language={currentLanguage}
          translations={t}
          onNavigate={navigateTo}
          showNotification={showNotification}
        />
      );
    }

    // Fallback to original inline implementation
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">{t.medicines}</h2>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Stock</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              <Plus className="w-4 h-4" />
              <span>Add Medicine</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {mockMedicines.map((medicine) => (
              <div key={medicine.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">{medicine.category}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Stock Level</p>
                        <div className="flex items-center space-x-2">
                          <div className={`w-full bg-gray-200 rounded-full h-2 ${
                            medicine.stock < 50 ? 'bg-red-200' : 'bg-green-200'
                          }`}>
                            <div 
                              className={`h-2 rounded-full ${
                                medicine.stock < 50 ? 'bg-red-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(medicine.stock, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            medicine.stock < 50 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {medicine.stock}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{medicine.location}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="flex items-center space-x-2">
                          {medicine.refillAlert ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-600 font-medium">Low Stock</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600 font-medium">In Stock</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {medicine.refillAlert && (
                      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-orange-800 text-sm">
                          <AlertCircle className="w-4 h-4 inline mr-2" />
                          Refill alert: Stock is running low. Consider restocking soon.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Request Refill
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Medicines</span>
                  <span className="font-semibold">{mockMedicines.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Low Stock</span>
                  <span className="font-semibold text-orange-600">
                    {mockMedicines.filter(m => m.refillAlert).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available</span>
                  <span className="font-semibold text-green-600">
                    {mockMedicines.filter(m => !m.refillAlert).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Refill Reminders</h3>
              <div className="space-y-3">
                {mockMedicines.filter(m => m.refillAlert).map(medicine => (
                  <div key={medicine.id} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-orange-800">{medicine.name}</p>
                    <p className="text-xs text-orange-600">{medicine.location}</p>
                    <button className="mt-2 text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600">
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Pharmacies</h3>
              <div className="space-y-3">
                {['Nabha Medical Store', 'City Pharmacy', 'Health Plus'].map((pharmacy, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <Building className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{pharmacy}</p>
                      <p className="text-xs text-gray-500">2.{index + 1} km away</p>
                    </div>
                    <button className="text-blue-600 text-xs">
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin Dashboard Page - UPDATED to use imported component
  const AdminPage = () => {
    // Check if AdminDashboard component exists, fallback to inline implementation
    if (typeof AdminDashboard === 'function') {
      return (
        <AdminDashboard 
          doctors={mockDoctors}
          healthRecords={mockHealthRecords}
          medicines={mockMedicines}
          isOnline={isOnline}
          language={currentLanguage}
          translations={t}
          onNavigate={navigateTo}
          showNotification={showNotification}
        />
      );
    }

    // Fallback to original inline implementation
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin {t.admin}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active Doctors</p>
                <p className="text-3xl font-bold">{mockDoctors.filter(d => d.available).length}</p>
                <p className="text-blue-200 text-xs">of {mockDoctors.length} total</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Patient Records</p>
                <p className="text-3xl font-bold">{mockHealthRecords.length}</p>
                <p className="text-green-200 text-xs">+5 this week</p>
              </div>
              <FileText className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Medicine Stock</p>
                <p className="text-3xl font-bold">{mockMedicines.reduce((sum, med) => sum + med.stock, 0)}</p>
                <p className="text-purple-200 text-xs">Total units</p>
              </div>
              <Pill className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">System Status</p>
                <p className="text-lg font-bold">{isOnline ? 'Online' : 'Offline'}</p>
                <p className="text-orange-200 text-xs">All systems operational</p>
              </div>
              <Shield className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Doctor Availability</h3>
            <div className="space-y-4">
              {mockDoctors.map(doctor => (
                <div key={doctor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                      {doctor.image}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        doctor.available ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      {doctor.available ? 'Available' : 'Busy'}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{doctor.nextSlot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Medicine Inventory Status</h3>
            <div className="space-y-4">
              {mockMedicines.map(medicine => (
                <div key={medicine.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Pill className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-600">{medicine.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{medicine.stock} units</p>
                    <div className={`text-xs font-medium ${
                      medicine.refillAlert ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {medicine.refillAlert ? 'Low Stock' : 'In Stock'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'consultation', message: 'Dr. Rajesh Kumar completed consultation with Patient #123', time: '2 hours ago', icon: Video, color: 'blue' },
              { type: 'record', message: 'New health record added for Patient #124', time: '4 hours ago', icon: FileText, color: 'green' },
              { type: 'medicine', message: 'Low stock alert: Amoxicillin 250mg', time: '6 hours ago', icon: AlertCircle, color: 'orange' },
              { type: 'doctor', message: 'Dr. Priya Singh came online', time: '8 hours ago', icon: CheckCircle, color: 'green' },
              { type: 'system', message: 'System backup completed successfully', time: '12 hours ago', icon: Shield, color: 'purple' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  // Main Render Function - Route Handler
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'doctors':
        return <DoctorsPage />;
      case 'doctor-profile':
        return <DoctorProfilePage />;
      case 'booking':
        return <ConsultationBookingPage />;
      case 'chat':
        return <ChatInterfacePage />;
      case 'records':
        return <RecordsPage />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'medicines':
        return <MedicinesPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  // Main App Return
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">Loading...</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t.appName}</h3>
              <p className="text-gray-600 text-sm">
                Rural healthcare made accessible through technology. Connecting patients with quality medical care.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('doctors')} className="text-gray-600 hover:text-blue-600">Find Doctors</button></li>
                <li><button onClick={() => navigateTo('records')} className="text-gray-600 hover:text-blue-600">Health Records</button></li>
                <li><button onClick={() => navigateTo('symptoms')} className="text-gray-600 hover:text-blue-600">Symptom Checker</button></li>
                <li><button onClick={() => navigateTo('medicines')} className="text-gray-600 hover:text-blue-600">Medicine Tracker</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">Emergency: 108</p>
                <p className="text-gray-600">Help: +91-1234567890</p>
                <p className="text-gray-600">Email: help@nabhahealth.in</p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-gray-600">{isOnline ? 'System Online' : 'Offline Mode'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
               eSEHATNABHA by Team HACKVEDA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NabhaTelemedicine;

                
