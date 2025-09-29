// Location: src/components/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  Activity,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import DoctorManagement from './DoctorManagement';
import InventoryManagement from './InventoryManagement';
import PatientStats from './PatientStats';

/**
 * AdminDashboard Component
 * Main dashboard for admin users to manage the telemedicine system
 * Includes overview stats, doctor management, inventory, and patient analytics
 */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock dashboard statistics
    const stats = {
      totalPatients: 1247,
      activePatients: 856,
      totalDoctors: 24,
      activeDoctors: 18,
      todayConsultations: 45,
      completedConsultations: 38,
      pendingConsultations: 7,
      totalRevenue: 125840,
      monthlyGrowth: 12.5,
      patientGrowth: 8.3,
      inventoryItems: 156,
      lowStockItems: 12,
      outOfStock: 3
    };

    const activities = [
      {
        id: 1,
        type: 'consultation',
        message: 'Dr. Sharma completed consultation with Patient #1234',
        timestamp: '2 minutes ago',
        status: 'success'
      },
      {
        id: 2,
        type: 'registration',
        message: 'New patient registration: Rajesh Kumar',
        timestamp: '15 minutes ago',
        status: 'info'
      },
      {
        id: 3,
        type: 'inventory',
        message: 'Low stock alert: Paracetamol 500mg',
        timestamp: '1 hour ago',
        status: 'warning'
      },
      {
        id: 4,
        type: 'doctor',
        message: 'Dr. Priya joined the platform',
        timestamp: '2 hours ago',
        status: 'success'
      },
      {
        id: 5,
        type: 'consultation',
        message: 'Emergency consultation requested',
        timestamp: '3 hours ago',
        status: 'error'
      }
    ];

    setDashboardStats(stats);
    setRecentActivities(activities);
  };

  const StatCard = ({ icon: Icon, title, value, change, trend, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span>{change}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'success': return 'bg-green-100 text-green-700';
        case 'warning': return 'bg-yellow-100 text-yellow-700';
        case 'error': return 'bg-red-100 text-red-700';
        default: return 'bg-blue-100 text-blue-700';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'success': return <CheckCircle className="w-4 h-4" />;
        case 'warning': return <AlertCircle className="w-4 h-4" />;
        case 'error': return <AlertCircle className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
          {getStatusIcon(activity.status)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800">{activity.message}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{activity.timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={dashboardStats.totalPatients?.toLocaleString()}
          change={dashboardStats.patientGrowth}
          trend="up"
          color="bg-blue-600"
        />
        <StatCard
          icon={UserCheck}
          title="Active Doctors"
          value={`${dashboardStats.activeDoctors}/${dashboardStats.totalDoctors}`}
          color="bg-green-600"
        />
        <StatCard
          icon={Calendar}
          title="Today's Consultations"
          value={dashboardStats.todayConsultations}
          color="bg-purple-600"
        />
        <StatCard
          icon={Package}
          title="Inventory Items"
          value={dashboardStats.inventoryItems}
          color="bg-orange-600"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Consultation Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Completed</span>
              <span className="font-semibold text-green-600">{dashboardStats.completedConsultations}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(dashboardStats.completedConsultations / dashboardStats.todayConsultations) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Pending</span>
              <span className="font-semibold text-yellow-600">{dashboardStats.pendingConsultations}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full" 
                style={{ width: `${(dashboardStats.pendingConsultations / dashboardStats.todayConsultations) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Inventory Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">Out of Stock</span>
              </div>
              <span className="font-semibold text-red-600">{dashboardStats.outOfStock}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-700">Low Stock</span>
              </div>
              <span className="font-semibold text-yellow-600">{dashboardStats.lowStockItems}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Revenue Overview</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-800">
              ₹{(dashboardStats.totalRevenue / 1000).toFixed(1)}K
            </p>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{dashboardStats.monthlyGrowth}% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="space-y-2">
          {recentActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('doctors')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Manage Doctors</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Patient Stats</span>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
            <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Appointments</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your telemedicine platform</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'doctors'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Doctor Management
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Patient Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'doctors' && <DoctorManagement />}
        {activeTab === 'inventory' && <InventoryManagement />}
        {activeTab === 'patients' && <PatientStats />}
      </div>
    </div>
  );
};

export default AdminDashboard;