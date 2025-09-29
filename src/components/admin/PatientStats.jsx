// Location: src/components/admin/PatientStats.jsx

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar,
  MapPin,
  Activity,
  Clock,
  UserPlus,
  Heart,
  Stethoscope,
  Filter,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';

/**
 * PatientStats Component
 * Analytics and statistics dashboard for patient data
 * Demographics, consultation patterns, and health trends
 */
const PatientStats = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [statsData, setStatsData] = useState({});

  useEffect(() => {
    loadPatientStats();
  }, [timeRange]);

  const loadPatientStats = () => {
    // Mock comprehensive patient statistics
    const stats = {
      overview: {
        totalPatients: 1247,
        activePatients: 856,
        newPatientsThisMonth: 124,
        growthRate: 12.5,
        averageAge: 42,
        malePatients: 612,
        femalePatients: 635,
        consultationsTotal: 3842,
        consultationsThisMonth: 342,
        averageConsultationsPerPatient: 3.08
      },
      demographics: {
        ageGroups: [
          { range: '0-18', count: 187, percentage: 15 },
          { range: '19-35', count: 374, percentage: 30 },
          { range: '36-50', count: 436, percentage: 35 },
          { range: '51-65', count: 187, percentage: 15 },
          { range: '65+', count: 63, percentage: 5 }
        ],
        genderDistribution: [
          { gender: 'Male', count: 612, percentage: 49 },
          { gender: 'Female', count: 635, percentage: 51 }
        ],
        locationDistribution: [
          { location: 'Nabha', count: 498, percentage: 40 },
          { location: 'Patiala', count: 312, percentage: 25 },
          { location: 'Sangrur', count: 187, percentage: 15 },
          { location: 'Ludhiana', count: 125, percentage: 10 },
          { location: 'Other', count: 125, percentage: 10 }
        ]
      },
      healthConditions: [
        { condition: 'Hypertension', count: 312, percentage: 25, trend: 'up' },
        { condition: 'Diabetes', count: 249, percentage: 20, trend: 'stable' },
        { condition: 'Respiratory Issues', count: 187, percentage: 15, trend: 'down' },
        { condition: 'Cardiac Issues', count: 125, percentage: 10, trend: 'up' },
        { condition: 'Digestive Issues', count: 112, percentage: 9, trend: 'stable' },
        { condition: 'Other', count: 262, percentage: 21, trend: 'stable' }
      ],
      consultationPatterns: {
        bySpecialization: [
          { specialty: 'General Physician', count: 1248, percentage: 32.5 },
          { specialty: 'Pediatrician', count: 845, percentage: 22 },
          { specialty: 'Cardiologist', count: 576, percentage: 15 },
          { specialty: 'Gynecologist', count: 461, percentage: 12 },
          { specialty: 'Orthopedic', count: 384, percentage: 10 },
          { specialty: 'Other', count: 328, percentage: 8.5 }
        ],
        byTimeOfDay: [
          { time: 'Morning (6-12)', count: 1536, percentage: 40 },
          { time: 'Afternoon (12-18)', count: 1459, percentage: 38 },
          { time: 'Evening (18-24)', count: 768, percentage: 20 },
          { time: 'Night (24-6)', count: 79, percentage: 2 }
        ],
        byMonth: [
          { month: 'Apr', consultations: 285 },
          { month: 'May', consultations: 312 },
          { month: 'Jun', consultations: 298 },
          { month: 'Jul', consultations: 334 },
          { month: 'Aug', consultations: 356 },
          { month: 'Sep', consultations: 342 }
        ]
      },
      topSymptoms: [
        { symptom: 'Fever', count: 456, percentage: 12 },
        { symptom: 'Cough', count: 398, percentage: 10.4 },
        { symptom: 'Headache', count: 367, percentage: 9.6 },
        { symptom: 'Body Pain', count: 334, percentage: 8.7 },
        { symptom: 'Fatigue', count: 312, percentage: 8.1 },
        { symptom: 'Nausea', count: 289, percentage: 7.5 },
        { symptom: 'Dizziness', count: 267, percentage: 6.9 },
        { symptom: 'Chest Pain', count: 245, percentage: 6.4 }
      ],
      satisfactionMetrics: {
        overallSatisfaction: 4.6,
        responseTime: 4.5,
        doctorBehavior: 4.8,
        platformUsability: 4.4,
        totalReviews: 2847,
        fiveStarReviews: 2134,
        fourStarReviews: 568,
        threeStarReviews: 114,
        twoStarReviews: 23,
        oneStarReviews: 8
      }
    };

    setStatsData(stats);
  };

  const exportStats = () => {
    const csvContent = [
      ['Patient Statistics Report', `Generated on ${new Date().toLocaleDateString()}`],
      [''],
      ['Overview Metrics'],
      ['Total Patients', statsData.overview?.totalPatients],
      ['Active Patients', statsData.overview?.activePatients],
      ['New Patients This Month', statsData.overview?.newPatientsThisMonth],
      ['Growth Rate (%)', statsData.overview?.growthRate],
      ['Total Consultations', statsData.overview?.consultationsTotal],
      [''],
      ['Demographics - Age Groups'],
      ['Age Range', 'Count', 'Percentage'],
      ...(statsData.demographics?.ageGroups.map(ag => [ag.range, ag.count, ag.percentage + '%']) || [])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-stats-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  const ProgressBar = ({ label, value, total, color }) => {
    const percentage = (value / total) * 100;
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">{value} ({percentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={statsData.overview?.totalPatients?.toLocaleString()}
          subtitle={`${statsData.overview?.activePatients} active`}
          trend={statsData.overview?.growthRate}
          color="bg-blue-600"
        />
        <StatCard
          icon={UserPlus}
          title="New This Month"
          value={statsData.overview?.newPatientsThisMonth}
          subtitle="12.5% growth rate"
          color="bg-green-600"
        />
        <StatCard
          icon={Stethoscope}
          title="Total Consultations"
          value={statsData.overview?.consultationsTotal?.toLocaleString()}
          subtitle={`${statsData.overview?.consultationsThisMonth} this month`}
          color="bg-purple-600"
        />
        <StatCard
          icon={Activity}
          title="Avg. Age"
          value={statsData.overview?.averageAge}
          subtitle={`${statsData.overview?.averageConsultationsPerPatient?.toFixed(1)} consults/patient`}
          color="bg-orange-600"
        />
      </div>

      {/* Gender Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Gender Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-lg">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Male</p>
                  <p className="text-sm text-gray-500">
                    {statsData.overview?.malePatients} patients
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-700">49%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-700 font-bold text-lg">F</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Female</p>
                  <p className="text-sm text-gray-500">
                    {statsData.overview?.femalePatients} patients
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-pink-700">51%</span>
            </div>
          </div>
        </div>

        {/* Satisfaction Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Patient Satisfaction
          </h3>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-yellow-500 mb-2">
              {statsData.satisfactionMetrics?.overallSatisfaction}★
            </div>
            <p className="text-gray-600">
              Based on {statsData.satisfactionMetrics?.totalReviews?.toLocaleString()} reviews
            </p>
          </div>
          <div className="space-y-3">
            <ProgressBar
              label="Response Time"
              value={statsData.satisfactionMetrics?.responseTime}
              total={5}
              color="bg-blue-600"
            />
            <ProgressBar
              label="Doctor Behavior"
              value={statsData.satisfactionMetrics?.doctorBehavior}
              total={5}
              color="bg-green-600"
            />
            <ProgressBar
              label="Platform Usability"
              value={statsData.satisfactionMetrics?.platformUsability}
              total={5}
              color="bg-purple-600"
            />
          </div>
        </div>
      </div>

      {/* Monthly Consultation Trend */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Monthly Consultation Trends
        </h3>
        <div className="flex items-end justify-between gap-2 h-64">
          {statsData.consultationPatterns?.byMonth.map((data, idx) => {
            const maxValue = Math.max(...statsData.consultationPatterns.byMonth.map(d => d.consultations));
            const height = (data.consultations / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-sm font-semibold text-gray-700">{data.consultations}</div>
                <div 
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${data.month}: ${data.consultations} consultations`}
                />
                <div className="text-xs text-gray-600">{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderDemographics = () => (
    <div className="space-y-6">
      {/* Age Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Age Group Distribution
        </h3>
        <div className="space-y-4">
          {statsData.demographics?.ageGroups.map((group, idx) => (
            <ProgressBar
              key={idx}
              label={group.range}
              value={group.count}
              total={statsData.overview?.totalPatients}
              color="bg-gradient-to-r from-blue-500 to-purple-500"
            />
          ))}
        </div>
      </div>

      {/* Location Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Patient Distribution by Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statsData.demographics?.locationDistribution.map((location, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{location.location}</span>
                <span className="text-2xl font-bold text-blue-600">{location.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{location.count} patients</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation by Time */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Consultation Pattern by Time of Day
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.consultationPatterns?.byTimeOfDay.map((timeSlot, idx) => (
            <div key={idx} className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{timeSlot.time}</p>
              <p className="text-3xl font-bold text-purple-700 mb-1">{timeSlot.count}</p>
              <p className="text-xs text-gray-500">{timeSlot.percentage}% of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHealthTrends = () => (
    <div className="space-y-6">
      {/* Common Health Conditions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-600" />
          Common Health Conditions
        </h3>
        <div className="space-y-4">
          {statsData.healthConditions?.map((condition, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800">{condition.condition}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    condition.trend === 'up' ? 'bg-red-100 text-red-700' :
                    condition.trend === 'down' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {condition.trend === 'up' ? '↑ Increasing' :
                     condition.trend === 'down' ? '↓ Decreasing' :
                     '→ Stable'}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-700">{condition.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    condition.trend === 'up' ? 'bg-red-500' :
                    condition.trend === 'down' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${condition.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{condition.count} patients</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Symptoms */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          Most Common Symptoms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statsData.topSymptoms?.map((symptom, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-700 font-bold">{idx + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{symptom.symptom}</p>
                  <p className="text-sm text-gray-600">{symptom.count} reports</p>
                </div>
              </div>
              <span className="text-lg font-bold text-pink-600">{symptom.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          Consultations by Specialization
        </h3>
        <div className="space-y-4">
          {statsData.consultationPatterns?.bySpecialization.map((spec, idx) => (
            <ProgressBar
              key={idx}
              label={spec.specialty}
              value={spec.count}
              total={statsData.overview?.consultationsTotal}
              color="bg-gradient-to-r from-blue-500 to-indigo-500"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive insights and statistics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={exportStats}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMetric('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedMetric === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedMetric('demographics')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedMetric === 'demographics'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Demographics
          </button>
          <button
            onClick={() => setSelectedMetric('health')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedMetric === 'health'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Health Trends
          </button>
        </div>
      </div>

      {/* Content */}
      {selectedMetric === 'overview' && renderOverview()}
      {selectedMetric === 'demographics' && renderDemographics()}
      {selectedMetric === 'health' && renderHealthTrends()}
    </div>
  );
};

export default PatientStats;