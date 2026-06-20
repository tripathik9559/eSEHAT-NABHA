import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = sessionStorage.getItem('esehat_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Session restore failed:', e);
    }
    setLoading(false);
  }, []);

  const sendOTP = async (phone) => {
    // Demo: simulate OTP send
    await new Promise(r => setTimeout(r, 1000));
    return { success: true, message: 'OTP sent (Demo: use 1234)' };
  };

  const verifyOTP = async (phone, otp, role) => {
    await new Promise(r => setTimeout(r, 800));
    
    if (otp !== '1234') {
      return { success: false, message: 'Invalid OTP. Use 1234 for demo.' };
    }

    const demoUsers = {
      patient: { id: 'PT001', name: 'Harjit Singh', phone, role: 'patient', village: 'Nabha', language: 'pa', bloodGroup: 'B+', age: 45, gender: 'Male' },
      doctor: { id: 'DR001', name: 'Dr. Rajesh Kumar', phone, role: 'doctor', specialty: 'General Medicine', department: 'General Medicine', availableStatus: true },
      asha: { id: 'ASHA001', name: 'Sukhmani Kaur', phone, role: 'asha', village: 'Nabha', patientsRegistered: 87 },
      admin: { id: 'ADMIN001', name: 'Health Dept Admin', phone, role: 'admin', department: 'Punjab Health Department' },
      pharmacy: { id: 'PH001', name: 'Nabha Primary Pharmacy', phone, role: 'pharmacy', location: 'Civil Hospital, Nabha' },
    };

    const userData = demoUsers[role] || demoUsers.patient;
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem('esehat_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('esehat_user');
  };

  const updateLanguage = (lang) => {
    if (user) {
      const updated = { ...user, preferredLanguage: lang };
      setUser(updated);
      sessionStorage.setItem('esehat_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, sendOTP, verifyOTP, logout, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
