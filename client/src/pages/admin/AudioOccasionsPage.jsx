// client/src/pages/admin/AudioOccasionsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, X, Loader2, Search, Save,
  Calendar, Tag, Eye, Heart, Star, Music, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import audioAPI from '../../api/audioAPI';
import { OCCASION_CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const AudioOccasionsPage = () => {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState(null);
  const [stats, setStats] = useState({});

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    icon: '',
    description: '',
    color: '#8b5cf6',
    isActive: true,
    order: 0
  });

  // Icon options
  const iconOptions = [
    { value: '🖤', label: 'Black Heart' },
    { value: '🌙', label: 'Moon' },
    { value: '🎉', label: 'Celebration' },
    { value: '⭐', label: 'Star' },
    { value: '📀', label: 'General' },
    { value: '🕌', label: 'Mosque' },
    { value: '🌹', label: 'Rose' },
    { value: '💧', label: 'Tear' },
    { value: '🤲', label: 'Praying Hands' },
    { value: '📿', label: 'Prayer Beads' }
  ];

  // Color options
  const colorOptions = [
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#10b981', label: 'Green' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#6366f1', label: 'Indigo' }
  ];

  useEffect(() => {
    fetchOccasions();
    fetchStats();
  }, []);

  const fetchOccasions = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // For now, use constants
      setOccasions(OCCASION_CATEGORIES);
    } catch (error) {
      console.error('Error fetching occasions:', error);
      toast.error('Failed to load occasions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await audioAPI.getAudioStats();
      setStats(response?.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.label || !formData.label.trim()) {
      toast.error('Occasion name is required');
      return;
    }

    const occasionData = {
      id: formData.id || formData.label.toLowerCase().replace(/\s+/g, '_'),
      label: formData.label.trim(),
      icon: formData.icon,
      description: formData.description,
      color: formData.color,
      isActive: formData.isActive,
      order: formData.order
    };

    setLoading(true);
    try {
      if (editingOccasion) {
        // Update occasion
        const updatedOccasions = occasions.map(occ => 
          occ.id === editingOccasion.id ? occasionData : occ
        );
        setOccasions(updatedOccasions);
        toast.success('Occasion updated successfully');
      } else {
        // Create new occasion
        setOccasions([...occasions, occasionData]);
        toast.success('Occasion created successfully');
      }
      resetModal();
    } catch (error) {
      console.error('Error saving occasion:', error);
      toast.error('Failed to save occasion');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (occasion) => {
    const audioCount = Object.values(stats).reduce((sum, stat) => {
      if (stat.occasion === occasion.id) return sum + stat.count;
      return sum;
    }, 0);

    const message = audioCount > 0 
      ? `Occasion "${occasion.label}" has ${audioCount} audio items. Deleting will remove this occasion from those items. Are you sure?`
      : `Are you sure you want to delete occasion "${occasion.label}"?`;

    if (!window.confirm(message)) {
      return;
    }

    setLoading(true);
    try {
      setOccasions(occasions.filter(occ => occ.id !== occasion.id));
      toast.success('Occasion deleted successfully');
    } catch (error) {
      toast.error('Failed to delete occasion');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (occasion) => {
    setEditingOccasion(occasion);
    setFormData({
      id: occasion.id,
      label: occasion.label,
      icon: occasion.icon || '📀',
      description: occasion.description || '',
      color: occasion.color || '#8b5cf6',
      isActive: occasion.isActive !== false,
      order: occasion.order || 0
    });
    setShowAddModal(true);
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingOccasion(null);
    setFormData({
      id: '',
      label: '',
      icon: '📀',
      description: '',
      color: '#8b5cf6',
      isActive: true,
      order: 0
    });
  };

  const getAudioCountForOccasion = (occasionId) => {
    return Object.values(stats).reduce((sum, stat) => {
      if (stat.occasion === occasionId) return sum + stat.count;
      return sum;
    }, 0);
  };

  const getTotalPlaysForOccasion = (occasionId) => {
    return Object.values(stats).reduce((sum, stat) => {
      if (stat.occasion === occasionId) return sum + stat.totalPlays;
      return sum;
    }, 0);
  };

  const filteredOccasions = occasions.filter(occasion =>
    occasion.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    occasion.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Occasions</h1>
          <p className="text-gray-500">Manage religious occasions and events for audio content</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Occasion</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{occasions.length}</p>
          <p className="text-sm text-gray-500">Total Occasions</p>
        </div>
        <div className="card p-4 text-center">
          <Music className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">
            {occasions.reduce((sum, occ) => sum + getAudioCountForOccasion(occ.id), 0)}
          </p>
          <p className="text-sm text-gray-500">Total Audio</p>
        </div>
        <div className="card p-4 text-center">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">
            {occasions.reduce((sum, occ) => sum + getTotalPlaysForOccasion(occ.id), 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Plays</p>
        </div>
        <div className="card p-4 text-center">
          <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">
            {occasions.filter(occ => occ.isFeatured).length}
          </p>
          <p className="text-sm text-gray-500">Featured</p>
        </div>
        <div className="card p-4 text-center">
          <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">
            {occasions.filter(occ => occ.isActive !== false).length}
          </p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search occasions by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Occasions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && occasions.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : filteredOccasions.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No occasions found.</p>
          </div>
        ) : (
          filteredOccasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card group hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${occasion.color || '#8b5cf6'}20` }}
                  >
                    <span style={{ color: occasion.color || '#8b5cf6' }}>{occasion.icon || '📀'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(occasion)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit Occasion"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(occasion)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Delete Occasion"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 text-lg mb-1">{occasion.label}</h3>
                {occasion.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{occasion.description}</p>
                )}

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Music className="h-3.5 w-3.5" />
                    <span>{getAudioCountForOccasion(occasion.id)} audio</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="h-3.5 w-3.5" />
                    <span>{getTotalPlaysForOccasion(occasion.id).toLocaleString()} plays</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {occasion.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  <code className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    occasion: {occasion.id}
                  </code>
                </div>

                <Link 
                  to={`/audio/occasion/${occasion.id}`}
                  target="_blank"
                  className="mt-3 pt-3 border-t border-gray-100 text-primary-600 text-sm hover:underline flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  View Public Page
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Occasion Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingOccasion ? 'Edit Occasion' : 'Add New Occasion'}
                </h2>
                <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Muharram, Ramadan, Eid"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion ID (slug)
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="muharram"
                    disabled={!!editingOccasion}
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier for URL (auto-generated from name)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon.value} value={icon.value}>
                        {icon.value} - {icon.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                    />
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="input-field flex-1"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Describe this occasion..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Active (Visible to users)</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingOccasion ? 'Update Occasion' : 'Create Occasion')}
                  </button>
                  <button type="button" onClick={resetModal} className="btn-outline flex-1">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioOccasionsPage;