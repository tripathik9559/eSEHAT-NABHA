// Location: src/components/admin/InventoryManagement.jsx

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  X,
  Check,
  RefreshCw
} from 'lucide-react';

/**
 * InventoryManagement Component
 * Admin interface for managing medicine inventory
 * Stock tracking, alerts, and inventory operations
 */
const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: '',
    manufacturer: '',
    batchNumber: '',
    quantity: '',
    minStockLevel: '',
    maxStockLevel: '',
    unitPrice: '',
    sellingPrice: '',
    expiryDate: '',
    location: '',
    description: ''
  });

  const categories = ['Tablet', 'Syrup', 'Injection', 'Capsule', 'Ointment', 'Drops', 'Other'];

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [inventory, searchQuery, categoryFilter, stockFilter]);

  const loadInventory = () => {
    // Mock inventory data
    const mockInventory = [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        genericName: 'Acetaminophen',
        category: 'Tablet',
        manufacturer: 'Cipla Ltd',
        batchNumber: 'PAR2024001',
        quantity: 150,
        minStockLevel: 100,
        maxStockLevel: 500,
        unitPrice: 2,
        sellingPrice: 3,
        expiryDate: '2026-12-31',
        location: 'Shelf A-12',
        description: 'Pain reliever and fever reducer',
        lastRestocked: '2025-09-15',
        status: 'in-stock'
      },
      {
        id: 2,
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        category: 'Capsule',
        manufacturer: 'Sun Pharma',
        batchNumber: 'AMX2024045',
        quantity: 45,
        minStockLevel: 50,
        maxStockLevel: 300,
        unitPrice: 8,
        sellingPrice: 12,
        expiryDate: '2026-06-30',
        location: 'Shelf B-05',
        description: 'Antibiotic for bacterial infections',
        lastRestocked: '2025-09-10',
        status: 'low-stock'
      },
      {
        id: 3,
        name: 'Cetirizine 10mg',
        genericName: 'Cetirizine HCl',
        category: 'Tablet',
        manufacturer: 'Dr. Reddy\'s',
        batchNumber: 'CET2024078',
        quantity: 280,
        minStockLevel: 80,
        maxStockLevel: 400,
        unitPrice: 1.5,
        sellingPrice: 2.5,
        expiryDate: '2027-03-31',
        location: 'Shelf A-18',
        description: 'Antihistamine for allergies',
        lastRestocked: '2025-09-20',
        status: 'in-stock'
      },
      {
        id: 4,
        name: 'Insulin Glargine',
        genericName: 'Insulin Glargine',
        category: 'Injection',
        manufacturer: 'Biocon',
        batchNumber: 'INS2024012',
        quantity: 8,
        minStockLevel: 10,
        maxStockLevel: 50,
        unitPrice: 450,
        sellingPrice: 600,
        expiryDate: '2025-11-30',
        location: 'Refrigerator-01',
        description: 'Long-acting insulin',
        lastRestocked: '2025-08-25',
        status: 'critical'
      },
      {
        id: 5,
        name: 'Azithromycin 500mg',
        genericName: 'Azithromycin',
        category: 'Tablet',
        manufacturer: 'Lupin',
        batchNumber: 'AZI2024089',
        quantity: 0,
        minStockLevel: 60,
        maxStockLevel: 250,
        unitPrice: 15,
        sellingPrice: 22,
        expiryDate: '2026-08-31',
        location: 'Shelf B-12',
        description: 'Antibiotic for respiratory infections',
        lastRestocked: '2025-07-15',
        status: 'out-of-stock'
      },
      {
        id: 6,
        name: 'Omeprazole 20mg',
        genericName: 'Omeprazole',
        category: 'Capsule',
        manufacturer: 'Cipla Ltd',
        batchNumber: 'OME2024056',
        quantity: 320,
        minStockLevel: 100,
        maxStockLevel: 400,
        unitPrice: 3,
        sellingPrice: 5,
        expiryDate: '2026-10-31',
        location: 'Shelf A-25',
        description: 'Proton pump inhibitor for acid reflux',
        lastRestocked: '2025-09-18',
        status: 'in-stock'
      },
      {
        id: 7,
        name: 'Cough Syrup',
        genericName: 'Dextromethorphan',
        category: 'Syrup',
        manufacturer: 'Dabur',
        batchNumber: 'CSY2024023',
        quantity: 35,
        minStockLevel: 40,
        maxStockLevel: 150,
        unitPrice: 65,
        sellingPrice: 95,
        expiryDate: '2026-04-30',
        location: 'Shelf C-08',
        description: 'Relief from cough and cold',
        lastRestocked: '2025-09-05',
        status: 'low-stock'
      },
      {
        id: 8,
        name: 'Betadine Ointment',
        genericName: 'Povidone-Iodine',
        category: 'Ointment',
        manufacturer: 'Win-Medicare',
        batchNumber: 'BET2024034',
        quantity: 125,
        minStockLevel: 50,
        maxStockLevel: 200,
        unitPrice: 45,
        sellingPrice: 70,
        expiryDate: '2027-01-31',
        location: 'Shelf D-03',
        description: 'Antiseptic for wounds',
        lastRestocked: '2025-09-12',
        status: 'in-stock'
      }
    ];

    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      setInventory(mockInventory);
      localStorage.setItem('inventory', JSON.stringify(mockInventory));
    }
  };

  const filterInventory = () => {
    let filtered = [...inventory];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Filter by stock status
    if (stockFilter !== 'all') {
      filtered = filtered.filter(item => item.status === stockFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInventory(filtered);
  };

  const getStockStatus = (item) => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.minStockLevel * 0.5) return 'critical';
    if (item.quantity <= item.minStockLevel) return 'low-stock';
    return 'in-stock';
  };

  const getStatusBadge = (status) => {
    const styles = {
      'in-stock': 'bg-green-100 text-green-700',
      'low-stock': 'bg-yellow-100 text-yellow-700',
      'critical': 'bg-orange-100 text-orange-700',
      'out-of-stock': 'bg-red-100 text-red-700'
    };
    const labels = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock',
      'critical': 'Critical',
      'out-of-stock': 'Out of Stock'
    };
    return { style: styles[status], label: labels[status] };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...formData,
      quantity: parseInt(formData.quantity),
      minStockLevel: parseInt(formData.minStockLevel),
      maxStockLevel: parseInt(formData.maxStockLevel),
      unitPrice: parseFloat(formData.unitPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      lastRestocked: new Date().toISOString().split('T')[0],
      status: getStockStatus({
        quantity: parseInt(formData.quantity),
        minStockLevel: parseInt(formData.minStockLevel)
      })
    };

    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    resetForm();
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedInventory = inventory.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            ...formData,
            quantity: parseInt(formData.quantity),
            minStockLevel: parseInt(formData.minStockLevel),
            maxStockLevel: parseInt(formData.maxStockLevel),
            unitPrice: parseFloat(formData.unitPrice),
            sellingPrice: parseFloat(formData.sellingPrice),
            status: getStockStatus({
              quantity: parseInt(formData.quantity),
              minStockLevel: parseInt(formData.minStockLevel)
            })
          }
        : item
    );

    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    resetForm();
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedInventory = inventory.filter(item => item.id !== id);
      setInventory(updatedInventory);
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    }
  };

  const handleRestock = (id, additionalQuantity) => {
    const quantity = parseInt(prompt('Enter quantity to add:', additionalQuantity || 50));
    if (quantity && quantity > 0) {
      const updatedInventory = inventory.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              lastRestocked: new Date().toISOString().split('T')[0],
              status: getStockStatus({
                quantity: item.quantity + quantity,
                minStockLevel: item.minStockLevel
              })
            }
          : item
      );
      setInventory(updatedInventory);
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      genericName: item.genericName,
      category: item.category,
      manufacturer: item.manufacturer,
      batchNumber: item.batchNumber,
      quantity: item.quantity.toString(),
      minStockLevel: item.minStockLevel.toString(),
      maxStockLevel: item.maxStockLevel.toString(),
      unitPrice: item.unitPrice.toString(),
      sellingPrice: item.sellingPrice.toString(),
      expiryDate: item.expiryDate,
      location: item.location,
      description: item.description
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      genericName: '',
      category: '',
      manufacturer: '',
      batchNumber: '',
      quantity: '',
      minStockLevel: '',
      maxStockLevel: '',
      unitPrice: '',
      sellingPrice: '',
      expiryDate: '',
      location: '',
      description: ''
    });
    setShowAddModal(false);
    setEditingItem(null);
  };

  const exportInventory = () => {
    const csvContent = [
      ['Name', 'Generic Name', 'Category', 'Manufacturer', 'Batch', 'Quantity', 'Min Stock', 'Max Stock', 'Unit Price', 'Selling Price', 'Expiry', 'Location', 'Status'],
      ...inventory.map(item => [
        item.name,
        item.genericName,
        item.category,
        item.manufacturer,
        item.batchNumber,
        item.quantity,
        item.minStockLevel,
        item.maxStockLevel,
        item.unitPrice,
        item.sellingPrice,
        item.expiryDate,
        item.location,
        item.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const calculateInventoryStats = () => {
    return {
      total: inventory.length,
      inStock: inventory.filter(i => i.status === 'in-stock').length,
      lowStock: inventory.filter(i => i.status === 'low-stock').length,
      critical: inventory.filter(i => i.status === 'critical').length,
      outOfStock: inventory.filter(i => i.status === 'out-of-stock').length,
      totalValue: inventory.reduce((sum, item) => sum + (item.quantity * item.sellingPrice), 0)
    };
  };

  const stats = calculateInventoryStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Track and manage medicine stock</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportInventory}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">In Stock</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">Critical</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.critical}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <X className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-600">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Total Value</span>
          </div>
          <p className="text-lg font-bold text-purple-600">₹{(stats.totalValue / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, generic name, or manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Stock Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="critical">Critical</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No items found</p>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const statusBadge = getStatusBadge(item.status);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.genericName}</p>
                          <p className="text-xs text-gray-400">{item.manufacturer}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{item.quantity}</p>
                          <p className="text-xs text-gray-500">
                            Min: {item.minStockLevel} | Max: {item.maxStockLevel}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-800">₹{item.sellingPrice}</p>
                          <p className="text-xs text-gray-500">Cost: ₹{item.unitPrice}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800">{new Date(item.expiryDate).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRestock(item.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Restock"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generic Name *
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    value={formData.genericName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer *
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number *
                  </label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Stock Level *
                  </label>
                  <input
                    type="number"
                    name="minStockLevel"
                    value={formData.minStockLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Stock Level *
                  </label>
                  <input
                    type="number"
                    name="maxStockLevel"
                    value={formData.maxStockLevel}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Shelf A-12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the medicine..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Low Stock Alert Section */}
      {inventory.filter(i => i.status === 'low-stock' || i.status === 'critical' || i.status === 'out-of-stock').length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Stock Alerts</h3>
              <div className="space-y-2">
                {inventory
                  .filter(i => i.status === 'out-of-stock' || i.status === 'critical' || i.status === 'low-stock')
                  .slice(0, 5)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-yellow-200 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Current: {item.quantity} | Min: {item.minStockLevel}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRestock(item.id, item.minStockLevel - item.quantity + 50)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Restock
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;