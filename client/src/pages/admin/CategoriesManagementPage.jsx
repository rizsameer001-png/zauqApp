// client/src/pages/admin/CategoriesManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, X, Loader2, Search, Filter,
  FolderTree, Music, Mic, Heart, Star, Tag, Calendar,
  ChevronLeft, ChevronRight, Save, AlertTriangle, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import categoryAPI from '../../api/categoryAPI';
import audioAPI from '../../api/audioAPI';
import toast from 'react-hot-toast';

const CategoriesManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [audioCounts, setAudioCounts] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '🎵',
    color: '#6366f1',
    parentCategory: '',
    isActive: true,
    isFeatured: false,
    order: 0,
    seoTitle: '',
    seoDescription: '',
    metaKeywords: ''
  });

  // Common icons for categories
  const iconOptions = [
    { value: '🎵', label: 'Music Note' },
    { value: '🎤', label: 'Microphone' },
    { value: '📖', label: 'Book' },
    { value: '🕌', label: 'Mosque' },
    { value: '💔', label: 'Heartbreak' },
    { value: '🔥', label: 'Fire' },
    { value: '🕊️', label: 'Peace' },
    { value: '⭐', label: 'Star' },
    { value: '🌙', label: 'Moon' },
    { value: '📜', label: 'Scroll' },
    { value: '🎙️', label: 'Podcast' },
    { value: '🎧', label: 'Headphones' },
    { value: '📚', label: 'Library' },
    { value: '✨', label: 'Sparkle' },
    { value: '🤲', label: 'Prayer' },
    { value: '⚔️', label: 'Sword' },
    { value: '🕯️', label: 'Candle' },
    { value: '🌸', label: 'Flower' }
  ];

  // Color options for categories
  const colorOptions = [
    { value: '#6366f1', label: 'Indigo' },
    { value: '#ef4444', label: 'Red' },
    { value: '#10b981', label: 'Green' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#f97316', label: 'Orange' },
    { value: '#14b8a6', label: 'Teal' },
    { value: '#a855f7', label: 'Violet' }
  ];

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Handle name change
  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: name,
      slug: generateSlug(name)
    }));
  };

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoryAPI.getCategories({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined
      });
      
      let categoriesList = [];
      let total = 0;
      
      if (response?.data?.data) {
        categoriesList = response.data.data;
        total = response.data.pagination?.total || response.data.total || categoriesList.length;
      } else if (response?.data) {
        categoriesList = response.data;
        total = categoriesList.length;
      } else if (Array.isArray(response)) {
        categoriesList = response;
        total = categoriesList.length;
      } else {
        categoriesList = [];
        total = 0;
      }
      
      setCategories(Array.isArray(categoriesList) ? categoriesList : []);
      setPagination(prev => ({
        ...prev,
        total: total,
        totalPages: Math.ceil(total / prev.limit)
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchQuery]);

  // Fetch audio counts for categories
  const fetchAudioCounts = useCallback(async () => {
    try {
      const response = await audioAPI.getAudioStats();
      const stats = response?.data || response || {};
      setAudioCounts(stats);
    } catch (error) {
      console.error('Error fetching audio counts:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchAudioCounts();
  }, [fetchCategories, fetchAudioCounts]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle slug change
  const handleSlugChange = (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({ ...prev, slug }));
  };

  // Check if slug is unique
  const isSlugUnique = (slug, excludeId = null) => {
    return !categories.some(cat => 
      cat.slug === slug && cat._id !== excludeId
    );
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (!formData.slug) {
      toast.error('Slug is required');
      return;
    }

    if (!isSlugUnique(formData.slug, editingCategory?._id)) {
      toast.error('Slug already exists. Please use a different slug.');
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      slug: formData.slug,
      description: formData.description?.trim() || '',
      icon: formData.icon,
      color: formData.color,
      parentCategory: formData.parentCategory || null,
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      order: parseInt(formData.order) || 0,
      seoTitle: formData.seoTitle || formData.name,
      seoDescription: formData.seoDescription || formData.description,
      metaKeywords: formData.metaKeywords || formData.name.toLowerCase()
    };

    setLoading(true);
    try {
      if (editingCategory) {
        await categoryAPI.updateCategory(editingCategory._id, categoryData);
        toast.success('Category updated successfully');
      } else {
        await categoryAPI.createCategory(categoryData);
        toast.success('Category created successfully');
      }
      resetModal();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      const message = error.response?.data?.message || 'Failed to save category';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (category) => {
    const audioCount = audioCounts[category.slug]?.count || 0;
    const message = audioCount > 0 
      ? `Category "${category.name}" has ${audioCount} audio items. Deleting it will remove the category from these items. Are you sure?`
      : `Are you sure you want to delete category "${category.name}"?`;

    if (!window.confirm(message)) {
      return;
    }

    setLoading(true);
    try {
      await categoryAPI.deleteCategory(category._id);
      toast.success('Category deleted successfully');
      fetchCategories();
      fetchAudioCounts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      icon: category.icon || '🎵',
      color: category.color || '#6366f1',
      parentCategory: category.parentCategory?._id || category.parentCategory || '',
      isActive: category.isActive !== false,
      isFeatured: category.isFeatured || false,
      order: category.order || 0,
      seoTitle: category.seoTitle || '',
      seoDescription: category.seoDescription || '',
      metaKeywords: category.metaKeywords || ''
    });
    setShowAddModal(true);
  };

  // Reset modal
  const resetModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '🎵',
      color: '#6366f1',
      parentCategory: '',
      isActive: true,
      isFeatured: false,
      order: 0,
      seoTitle: '',
      seoDescription: '',
      metaKeywords: ''
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Get audio count for category
  const getAudioCount = (category) => {
    return audioCounts[category.slug]?.count || 0;
  };

  // Get total plays for category
  const getTotalPlays = (category) => {
    return audioCounts[category.slug]?.totalPlays || 0;
  };

  // Get parent category name
  const getParentName = (parentId) => {
    const parent = categories.find(c => c._id === parentId);
    return parent?.name || 'None';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Management</h1>
          <p className="text-gray-500">Manage audio categories, organize content, and improve discoverability</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <FolderTree className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Categories</p>
        </div>
        <div className="card p-4 text-center">
          <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">
            {categories.filter(c => c.isFeatured).length}
          </p>
          <p className="text-sm text-gray-500">Featured Categories</p>
        </div>
        <div className="card p-4 text-center">
          <Music className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">
            {Object.values(audioCounts).reduce((sum, stat) => sum + (stat?.count || 0), 0)}
          </p>
          <p className="text-sm text-gray-500">Total Audio Items</p>
        </div>
        <div className="card p-4 text-center">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">
            {Object.values(audioCounts).reduce((sum, stat) => sum + (stat?.totalPlays || 0), 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Plays</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        {(searchQuery) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && categories.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderTree className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No categories found.</p>
            {searchQuery && (
              <button onClick={clearFilters} className="text-primary-600 mt-2">
                Clear search to see all categories
              </button>
            )}
          </div>
        ) : (
          categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card group hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon || '🎵'}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Music className="h-3.5 w-3.5" />
                    <span>{getAudioCount(category)} audio</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="h-3.5 w-3.5" />
                    <span>{getTotalPlays(category).toLocaleString()} plays</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                  {category.parentCategory && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      <FolderTree className="h-3 w-3" />
                      Parent: {getParentName(category.parentCategory)}
                    </span>
                  )}
                  {!category.isActive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Slug */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <code className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    /audio/category/{category.slug}
                  </code>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} categories
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1 || loading}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages || loading}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name and Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleNameChange}
                      className="input-field"
                      placeholder="e.g., Naat, Hamd, Manqabat"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/audio/category/</span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleSlugChange}
                        className="input-field flex-1 rounded-l-none"
                        placeholder="category-slug"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Describe what this category is about..."
                  />
                </div>

                {/* Icon and Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
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
                </div>

                {/* Parent Category and Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Category
                    </label>
                    <select
                      name="parentCategory"
                      value={formData.parentCategory}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">None (Top Level)</option>
                      {categories
                        .filter(cat => cat._id !== editingCategory?._id)
                        .map(cat => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Active (Visible to users)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-700">Featured Category (Show on homepage)</span>
                  </label>
                </div>

                {/* SEO Section */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <h3 className="font-medium text-gray-900 mb-3">SEO Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="SEO title (leave empty to use category name)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="seoDescription"
                        value={formData.seoDescription}
                        onChange={handleInputChange}
                        className="input-field h-20"
                        placeholder="SEO description for search engines"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Preview</h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
                    >
                      {formData.icon || '🎵'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{formData.name || 'Category Name'}</p>
                      <p className="text-xs text-gray-500">/{formData.slug || 'category-slug'}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      editingCategory ? 'Update Category' : 'Create Category'
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetModal} 
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
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

export default CategoriesManagementPage;