// Location: src/components/medicine-tracker/RefillReminders.jsx

import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Calendar, Pill, Clock, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

/**
 * RefillReminders Component
 * Manages medication refill reminders for patients
 * Stores reminders in localStorage and provides notifications
 */
const RefillReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    refillDate: '',
    frequency: 'daily',
    pillsRemaining: '',
    pharmacyName: '',
    notes: ''
  });

  // Load reminders from localStorage on mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('medicineReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Initialize with mock data
      const mockReminders = [
        {
          id: 1,
          medicineName: 'Metformin',
          dosage: '500mg',
          refillDate: '2025-10-05',
          frequency: 'daily',
          pillsRemaining: 15,
          pharmacyName: 'Nabha Medical Store',
          notes: 'Take with meals',
          isActive: true,
          createdAt: '2025-09-20'
        },
        {
          id: 2,
          medicineName: 'Atorvastatin',
          dosage: '10mg',
          refillDate: '2025-10-10',
          frequency: 'daily',
          pillsRemaining: 20,
          pharmacyName: 'Jan Aushadhi Kendra',
          notes: 'Take at bedtime',
          isActive: true,
          createdAt: '2025-09-22'
        }
      ];
      setReminders(mockReminders);
      localStorage.setItem('medicineReminders', JSON.stringify(mockReminders));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  // Calculate days until refill
  const getDaysUntilRefill = (refillDate) => {
    const today = new Date();
    const refill = new Date(refillDate);
    const diffTime = refill - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color based on days remaining
  const getStatusColor = (days) => {
    if (days < 0) return 'text-red-600 bg-red-50';
    if (days <= 3) return 'text-orange-600 bg-orange-50';
    if (days <= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  // Get status text
  const getStatusText = (days) => {
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Refill Today';
    if (days === 1) return 'Refill Tomorrow';
    return `${days} days left`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    const newReminder = {
      id: Date.now(),
      ...formData,
      pillsRemaining: parseInt(formData.pillsRemaining),
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReminders(prev => [...prev, newReminder]);
    resetForm();
  };

  // Update existing reminder
  const handleUpdateReminder = (e) => {
    e.preventDefault();
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === editingId
          ? { ...reminder, ...formData, pillsRemaining: parseInt(formData.pillsRemaining) }
          : reminder
      )
    );
    resetForm();
  };

  // Start editing a reminder
  const startEdit = (reminder) => {
    setEditingId(reminder.id);
    setFormData({
      medicineName: reminder.medicineName,
      dosage: reminder.dosage,
      refillDate: reminder.refillDate,
      frequency: reminder.frequency,
      pillsRemaining: reminder.pillsRemaining.toString(),
      pharmacyName: reminder.pharmacyName,
      notes: reminder.notes
    });
    setShowAddForm(true);
  };

  // Delete reminder
  const handleDeleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    }
  };

  // Toggle reminder active status
  const toggleReminderStatus = (id) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder
      )
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      medicineName: '',
      dosage: '',
      refillDate: '',
      frequency: 'daily',
      pillsRemaining: '',
      pharmacyName: '',
      notes: ''
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  // Sort reminders by refill date
  const sortedReminders = [...reminders].sort((a, b) => 
    new Date(a.refillDate) - new Date(b.refillDate)
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Refill Reminders</h2>
        <p className="text-gray-600">Track your medicine refills and never run out</p>
      </div>

      {/* Add Reminder Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full md:w-auto mb-6 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Reminder</span>
        </button>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Reminder' : 'Add New Reminder'}
          </h3>
          <form onSubmit={editingId ? handleUpdateReminder : handleAddReminder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Medicine Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Paracetamol"
                />
              </div>

              {/* Dosage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage *
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 500mg"
                />
              </div>

              {/* Refill Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Refill Date *
                </label>
                <input
                  type="date"
                  name="refillDate"
                  value={formData.refillDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Pills Remaining */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pills Remaining *
                </label>
                <input
                  type="number"
                  name="pillsRemaining"
                  value={formData.pillsRemaining}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>

              {/* Pharmacy Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Nabha Medical Store"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Add'} Reminder</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {sortedReminders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No refill reminders set</p>
            <p className="text-sm text-gray-500 mt-1">Add your first reminder to get started</p>
          </div>
        ) : (
          sortedReminders.map((reminder) => {
            const daysLeft = getDaysUntilRefill(reminder.refillDate);
            const statusColor = getStatusColor(daysLeft);
            const statusText = getStatusText(daysLeft);

            return (
              <div
                key={reminder.id}
                className={`bg-white rounded-lg shadow-sm p-4 transition-all ${
                  !reminder.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  {/* Reminder Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {reminder.medicineName}
                        </h3>
                        <p className="text-sm text-gray-600">{reminder.dosage} • {reminder.frequency}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Refill: {new Date(reminder.refillDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-gray-400" />
                        <span>{reminder.pillsRemaining} pills remaining</span>
                      </div>
                      {reminder.pharmacyName && (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Pharmacy: {reminder.pharmacyName}</span>
                        </div>
                      )}
                      {reminder.notes && (
                        <div className="md:col-span-2">
                          <p className="text-gray-500 italic">{reminder.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => toggleReminderStatus(reminder.id)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        reminder.isActive
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={reminder.isActive ? 'Disable reminder' : 'Enable reminder'}
                    >
                      {reminder.isActive ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => startEdit(reminder)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit reminder"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Help Text */}
      {reminders.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Set reminders 3-5 days before you run out of medicine to ensure you have time to refill at your pharmacy.
          </p>
        </div>
      )}
    </div>
  );
};

export default RefillReminders;