
// //client/src/pages/admin/VideoCMSPage.jsx

// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, Video, Play,
//   Clock, ChevronLeft, ChevronRight
// } from 'lucide-react'

// const videos = [
//   { id: 1, title: 'Jashn-e-Rekhta 2024', category: 'Mushaira', duration: '45:20', status: 'published', views: 125000, createdAt: '2024-01-15' },
//   { id: 2, title: 'Ghazal Recitation by Gulzar', category: 'Podcast', duration: '12:35', status: 'published', views: 87000, createdAt: '2024-01-20' },
//   { id: 3, title: 'Understanding Mirza Ghalib', category: 'Documentary', duration: '28:15', status: 'draft', views: 0, createdAt: '2024-02-01' },
//   { id: 4, title: 'Mushaira Night - Delhi 2024', category: 'Mushaira', duration: '1:20:00', status: 'published', views: 210000, createdAt: '2024-02-10' },
// ]

// const VideoCMSPage = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [filterCategory, setFilterCategory] = useState('all')
//   const [showUploadModal, setShowUploadModal] = useState(false)

//   const filteredVideos = videos.filter(video => {
//     if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     if (filterCategory !== 'all' && video.category !== filterCategory) return false
//     return true
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Video CMS</h1>
//           <p className="text-gray-500">Manage videos, subtitles, and thumbnails</p>
//         </div>
//         <button
//           onClick={() => setShowUploadModal(true)}
//           className="btn-primary inline-flex items-center space-x-2"
//         >
//           <Upload className="h-5 w-5" />
//           <span>Upload Video</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search videos..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           <option value="Mushaira">Mushaira</option>
//           <option value="Podcast">Podcast</option>
//           <option value="Documentary">Documentary</option>
//         </select>
//       </div>

//       {/* Videos Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredVideos.map((video) => (
//                 <motion.tr
//                   key={video.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="h-12 w-16 bg-red-100 rounded flex items-center justify-center">
//                         <Play className="h-5 w-5 text-red-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{video.title}</p>
//                         <p className="text-xs text-gray-500">{video.createdAt}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700">
//                       {video.category}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     <span className="flex items-center space-x-1">
//                       <Clock className="h-4 w-4" />
//                       <span>{video.duration}</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                       video.status === 'published' ? 'bg-green-100 text-green-700' :
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {video.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {(video.views / 1000).toFixed(1)}K
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <div className="flex items-center justify-end space-x-2">
//                       <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600">
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VideoCMSPage














// client/src/pages/admin/VideoCMSPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Edit, Trash2, Eye, Upload, Video, Play,
  Clock, ChevronLeft, ChevronRight, X, Loader2,
  AlertTriangle, Copy, Check, RefreshCw, Youtube, Link as LinkIcon,
  Heart, Calendar, User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import videoAPI from '../../api/videoAPI';
import authorAPI from '../../api/authorAPI';
import categoryAPI from '../../api/categoryAPI';
import uploadAPI from '../../api/uploadAPI';
import toast from 'react-hot-toast';

const VideoCMSPage = () => {
  const [videos, setVideos] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'youtube'
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'mushaira',
    language: 'urdu',
    author: '',
    category: '',
    videoUrl: '',
    thumbnail: '',
    duration: '',
    tags: [],
    isPremium: false,
    isPublished: false,
    isFeatured: false
  });

  // Generate slug from title
  const generateSlugFromTitle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Check slug availability
  const checkSlugAvailability = async (slug, excludeId = null) => {
    if (!slug || slug.length < 2) {
      setSlugAvailable(true);
      return true;
    }

    setCheckingSlug(true);
    try {
      const response = await videoAPI.getVideos({ limit: 1000 });
      let videosList = [];
      if (response?.data?.data) {
        videosList = response.data.data;
      } else if (response?.data) {
        videosList = response.data;
      } else if (Array.isArray(response)) {
        videosList = response;
      } else {
        videosList = [];
      }

      const exists = videosList.some(video => 
        video.slug === slug && video._id !== excludeId
      );
      
      setSlugAvailable(!exists);
      return !exists;
    } catch (error) {
      console.error('Error checking slug:', error);
      setSlugAvailable(true);
      return true;
    } finally {
      setCheckingSlug(false);
    }
  };

  // Handle title change to auto-generate slug
  const handleTitleChange = async (e) => {
    const title = e.target.value;
    const newSlug = generateSlugFromTitle(title);
    setFormData(prev => ({
      ...prev,
      title: title,
      slug: newSlug
    }));
    if (newSlug) {
      await checkSlugAvailability(newSlug, editingVideo?._id);
    }
  };

  // Handle slug manual edit
  const handleSlugChange = async (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({ ...prev, slug }));
    await checkSlugAvailability(slug, editingVideo?._id);
  };

  // Regenerate slug from title
  const regenerateSlug = async () => {
    const newSlug = generateSlugFromTitle(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
    await checkSlugAvailability(newSlug, editingVideo?._id);
    toast.success('Slug regenerated from title');
  };

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Validate YouTube URL
  const isValidYouTubeUrl = (url) => {
    return extractYouTubeId(url) !== null;
  };

  // Handle video URL change
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, videoUrl: url }));
    
    // If it's a YouTube URL, extract thumbnail
    if (uploadType === 'youtube' && isValidYouTubeUrl(url)) {
      const videoId = extractYouTubeId(url);
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setFormData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
    }
  };

  // Upload video file to Cloudinary
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      toast.error('File too large. Max size is 500MB');
      return;
    }

    setUploadingVideo(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const response = await uploadAPI.uploadVideo(file);
      clearInterval(interval);
      setUploadProgress(100);
      
      if (response.data?.url) {
        setFormData(prev => ({ ...prev, videoUrl: response.data.url }));
        toast.success('Video uploaded successfully');
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploadingVideo(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Fetch authors
  const fetchAuthors = useCallback(async () => {
    setAuthorsLoading(true);
    try {
      const response = await authorAPI.getAuthors({ limit: 100 });
      let authorsList = [];
      if (response?.data?.data) {
        authorsList = response.data.data;
      } else if (response?.data) {
        authorsList = response.data;
      } else if (Array.isArray(response)) {
        authorsList = response;
      } else {
        authorsList = [];
      }
      setAuthors(Array.isArray(authorsList) ? authorsList : []);
    } catch (error) {
      console.error('Error fetching authors:', error);
      toast.error('Failed to load authors');
      setAuthors([]);
    } finally {
      setAuthorsLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryAPI.getCategories();
      let categoriesList = [];
      if (response?.data?.data) {
        categoriesList = response.data.data;
      } else if (response?.data) {
        categoriesList = response.data;
      } else if (Array.isArray(response)) {
        categoriesList = response;
      } else {
        categoriesList = [];
      }
      setCategories(Array.isArray(categoriesList) ? categoriesList : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  }, []);

  // Fetch videos
  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filterCategory !== 'all' && { category: filterCategory }),
        ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
        ...(filterType !== 'all' && { type: filterType })
      };

      const response = await videoAPI.getVideos(params);
      
      let videosData = [];
      if (response?.data?.data) {
        videosData = response.data.data;
        if (response.data.pagination) setPagination(response.data.pagination);
      } else if (response?.data) {
        videosData = response.data;
      } else if (Array.isArray(response)) {
        videosData = response;
      } else {
        videosData = [];
      }
      
      setVideos(Array.isArray(videosData) ? videosData : []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error('Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchVideos();
  }, [fetchAuthors, fetchCategories, fetchVideos]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.title.trim()) {
      toast.error('Please enter a video title');
      return;
    }

    if (!formData.videoUrl) {
      toast.error('Please provide a video URL or upload a video file');
      return;
    }

    if (!formData.slug) {
      toast.error('Please enter a slug');
      return;
    }

    if (!slugAvailable) {
      toast.error('Slug already exists. Please choose a different slug.');
      return;
    }

    // Validate YouTube URL if applicable
    if (uploadType === 'youtube' && !isValidYouTubeUrl(formData.videoUrl)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    const videoData = {
      title: formData.title.trim(),
      slug: formData.slug,
      description: formData.description?.trim() || '',
      type: formData.type,
      language: formData.language,
      author: formData.author || null,
      category: formData.category || null,
      videoUrl: formData.videoUrl,
      thumbnail: formData.thumbnail || '',
      duration: formData.duration || null,
      tags: formData.tags,
      isPremium: formData.isPremium,
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured
    };

    setLoading(true);
    try {
      if (editingVideo) {
        await videoAPI.updateVideo(editingVideo._id, videoData);
        toast.success('Video updated successfully');
      } else {
        await videoAPI.createVideo(videoData);
        toast.success('Video created successfully');
      }
      resetModal();
      fetchVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      const message = error.response?.data?.message || 'Failed to save video';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await videoAPI.deleteVideo(id);
      toast.success('Video deleted successfully');
      fetchVideos();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete video');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (video) => {
    setLoading(true);
    try {
      await videoAPI.updateVideo(video._id, {
        ...video,
        isPublished: !video.isPublished
      });
      toast.success(`Video ${!video.isPublished ? 'published' : 'unpublished'}`);
      fetchVideos();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title || '',
      slug: video.slug || '',
      description: video.description || '',
      type: video.type || 'mushaira',
      language: video.language || 'urdu',
      author: typeof video.author === 'object' ? video.author?._id : video.author || '',
      category: video.category?._id || video.category || '',
      videoUrl: video.videoUrl || '',
      thumbnail: video.thumbnail || '',
      duration: video.duration || '',
      tags: video.tags || [],
      isPremium: video.isPremium || false,
      isPublished: video.isPublished || false,
      isFeatured: video.isFeatured || false
    });
    setUploadType(video.videoUrl?.includes('youtube.com') || video.videoUrl?.includes('youtu.be') ? 'youtube' : 'file');
    setSlugAvailable(true);
    setShowAddModal(true);
  };

  const handleCopySlug = async (slug) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/video/${slug}`);
      setCopiedSlug(slug);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingVideo(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      type: 'mushaira',
      language: 'urdu',
      author: '',
      category: '',
      videoUrl: '',
      thumbnail: '',
      duration: '',
      tags: [],
      isPremium: false,
      isPublished: false,
      isFeatured: false
    });
    setUploadType('file');
    setSlugAvailable(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterType('all');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const getAuthorName = (authorId) => {
    if (typeof authorId === 'object' && authorId?.name) return authorId.name;
    const author = authors.find(a => a._id === authorId);
    return author?.name || 'Unknown';
  };

  const getCategoryName = (categoryId) => {
    if (typeof categoryId === 'object' && categoryId?.name) return categoryId.name;
    const category = categories.find(c => c._id === categoryId);
    return category?.name || 'Uncategorized';
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (authorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Video CMS</h1>
          <p className="text-gray-500">Manage videos, subtitles, and thumbnails</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Add Video</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Videos</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {videos.filter(v => v.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {videos.filter(v => !v.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Draft</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {videos.filter(v => v.isFeatured).length}
          </p>
          <p className="text-sm text-gray-500">Featured</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{authors.length}</p>
          <p className="text-sm text-gray-500">Authors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input-field w-full md:w-36"
        >
          <option value="all">All Types</option>
          <option value="mushaira">Mushaira</option>
          <option value="interview">Interview</option>
          <option value="documentary">Documentary</option>
          <option value="lecture">Lecture</option>
          <option value="performance">Performance</option>
          <option value="other">Other</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full md:w-36"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Videos Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video & Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && videos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading videos...</p>
                  </td>
                </tr>
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <p>No videos found.</p>
                    {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
                      <button onClick={clearFilters} className="text-primary-600 mt-2">
                        Clear filters to see all videos
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                videos.map((video) => (
                  <motion.tr
                    key={video._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} className="h-12 w-20 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-20 bg-red-100 rounded flex items-center justify-center">
                            <Play className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{video.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              slug: {video.slug}
                            </code>
                            <button
                              onClick={() => handleCopySlug(video.slug)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                              title="Copy link to clipboard"
                            >
                              {copiedSlug === video.slug ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getAuthorName(video.author)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
                        {video.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(video)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                          video.isPublished 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {video.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {video.stats?.views?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/video/${video.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                          title="View Video"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(video)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                          title="Edit Video"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(video._id, video.title)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                          title="Delete Video"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1 || loading}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages || loading}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Video Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingVideo ? 'Edit Video' : 'Add New Video'}
                </h2>
                <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title and Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="input-field"
                      placeholder="Enter video title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/video/</span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleSlugChange}
                        className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="video-slug"
                      />
                      <button
                        type="button"
                        onClick={regenerateSlug}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Regenerate slug from title"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    {!slugAvailable && (
                      <p className="text-xs text-red-500 mt-1">Slug already taken. Please choose a different one.</p>
                    )}
                    {slugAvailable && formData.slug && !checkingSlug && (
                      <p className="text-xs text-green-500 mt-1">✓ Slug is available</p>
                    )}
                  </div>
                </div>

                {/* Upload Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="file"
                        checked={uploadType === 'file'}
                        onChange={() => setUploadType('file')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="text-sm">Upload File</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="youtube"
                        checked={uploadType === 'youtube'}
                        onChange={() => setUploadType('youtube')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="text-sm">YouTube Link</span>
                    </label>
                  </div>
                </div>

                {/* Video URL / Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {uploadType === 'file' ? 'Video File' : 'YouTube URL'} <span className="text-red-500">*</span>
                  </label>
                  {uploadType === 'file' ? (
                    <div>
                      <div className="flex gap-3">
                        <input
                          type="url"
                          name="videoUrl"
                          value={formData.videoUrl}
                          onChange={handleVideoUrlChange}
                          className="input-field flex-1"
                          placeholder="https://... or upload video"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            disabled={uploadingVideo}
                          />
                          <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingVideo}>
                            {uploadingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            <span>Upload</span>
                          </button>
                        </div>
                      </div>
                      {uploadingVideo && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                            <span className="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleVideoUrlChange}
                      className="input-field"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadType === 'file' ? 'Upload MP4, WebM, or MOV (max 500MB)' : 'Enter a valid YouTube URL'}
                  </p>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://..."
                  />
                  {formData.thumbnail && (
                    <div className="mt-2">
                      <img src={formData.thumbnail} alt="Thumbnail preview" className="h-24 w-auto rounded border" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Enter video description..."
                  />
                </div>

                {/* Author and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <select
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select author</option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type and Language */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="mushaira">Mushaira</option>
                      <option value="interview">Interview</option>
                      <option value="documentary">Documentary</option>
                      <option value="lecture">Lecture</option>
                      <option value="performance">Performance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="urdu">Urdu</option>
                      <option value="hindi">Hindi</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>

                {/* Duration and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="e.g., 3600 for 1 hour"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={handleTagsChange}
                      className="input-field"
                      placeholder="poetry, ghazal, mushaira"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPremium"
                      checked={formData.isPremium}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Premium (Paid)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Publish immediately</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Featured Video</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading || !slugAvailable}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingVideo ? 'Update Video' : 'Add Video')}
                  </button>
                  <button type="button" onClick={resetModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
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

export default VideoCMSPage;