// // client/src/pages/admin/AudioCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, Headphones, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Music, Mic, Clock, Heart
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const AudioCMSPage = () => {
//   const [audioItems, setAudioItems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingAudio, setEditingAudio] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [uploadType, setUploadType] = useState('file'); // 'file' or 'youtube'
//   const [uploadingAudio, setUploadingAudio] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     description: '',
//     type: 'podcast',
//     language: 'urdu',
//     author: '',
//     category: '',
//     audioUrl: '',
//     thumbnail: '',
//     coverImage: '',
//     duration: '',
//     tags: [],
//     transcript: '',
//     isPremium: false,
//     isPublished: false,
//     isFeatured: false
//   });

//   // Generate slug from title
//   const generateSlugFromTitle = (title) => {
//     return title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-|-$/g, '');
//   };

//   // Check slug availability
//   const checkSlugAvailability = async (slug, excludeId = null) => {
//     if (!slug || slug.length < 2) {
//       setSlugAvailable(true);
//       return true;
//     }

//     setCheckingSlug(true);
//     try {
//       const response = await audioAPI.getAudioItems({ limit: 1000 });
//       let audioList = [];
//       if (response?.data?.data) {
//         audioList = response.data.data;
//       } else if (response?.data) {
//         audioList = response.data;
//       } else if (Array.isArray(response)) {
//         audioList = response;
//       } else {
//         audioList = [];
//       }

//       const exists = audioList.some(audio => 
//         audio.slug === slug && audio._id !== excludeId
//       );
      
//       setSlugAvailable(!exists);
//       return !exists;
//     } catch (error) {
//       console.error('Error checking slug:', error);
//       setSlugAvailable(true);
//       return true;
//     } finally {
//       setCheckingSlug(false);
//     }
//   };

//   // Handle title change
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingAudio?._id);
//     }
//   };

//   // Handle slug change
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingAudio?._id);
//   };

//   // Regenerate slug
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingAudio?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload audio file
//   const handleAudioUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('audio/')) {
//       toast.error('Please upload an audio file');
//       return;
//     }

//     const maxSize = 100 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error('File too large. Max size is 100MB');
//       return;
//     }

//     setUploadingAudio(true);
//     setUploadProgress(0);
    
//     const interval = setInterval(() => {
//       setUploadProgress(prev => Math.min(prev + 10, 90));
//     }, 500);

//     try {
//       const response = await uploadAPI.uploadAudio(file);
//       clearInterval(interval);
//       setUploadProgress(100);
      
//       if (response.data?.url) {
//         setFormData(prev => ({ ...prev, audioUrl: response.data.url }));
//         toast.success('Audio uploaded successfully');
//       }
//     } catch (error) {
//       clearInterval(interval);
//       console.error('Upload error:', error);
//       toast.error('Failed to upload audio');
//     } finally {
//       setUploadingAudio(false);
//       setTimeout(() => setUploadProgress(0), 1000);
//     }
//   };

//   // Fetch authors
//   const fetchAuthors = useCallback(async () => {
//     setAuthorsLoading(true);
//     try {
//       const response = await authorAPI.getAuthors({ limit: 100 });
//       let authorsList = [];
//       if (response?.data?.data) {
//         authorsList = response.data.data;
//       } else if (response?.data) {
//         authorsList = response.data;
//       } else if (Array.isArray(response)) {
//         authorsList = response;
//       } else {
//         authorsList = [];
//       }
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch categories
//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await categoryAPI.getCategories();
//       let categoriesList = [];
//       if (response?.data?.data) {
//         categoriesList = response.data.data;
//       } else if (response?.data) {
//         categoriesList = response.data;
//       } else if (Array.isArray(response)) {
//         categoriesList = response;
//       } else {
//         categoriesList = [];
//       }
//       setCategories(Array.isArray(categoriesList) ? categoriesList : []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([]);
//     }
//   }, []);

//   // Fetch audio items
//   const fetchAudioItems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterType !== 'all' && { type: filterType }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await audioAPI.getAudioItems(params);
      
//       let audioData = [];
//       if (response?.data?.data) {
//         audioData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         audioData = response.data;
//       } else if (Array.isArray(response)) {
//         audioData = response;
//       } else {
//         audioData = [];
//       }
      
//       setAudioItems(Array.isArray(audioData) ? audioData : []);
//     } catch (error) {
//       console.error('Error fetching audio:', error);
//       toast.error('Failed to load audio');
//       setAudioItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterType, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchAudioItems();
//   }, [fetchAuthors, fetchCategories, fetchAudioItems]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
//     setFormData(prev => ({ ...prev, tags }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter an audio title');
//       return;
//     }

//     if (!formData.audioUrl) {
//       toast.error('Please provide an audio URL or upload an audio file');
//       return;
//     }

//     if (!formData.slug) {
//       toast.error('Please enter a slug');
//       return;
//     }

//     if (!slugAvailable) {
//       toast.error('Slug already exists. Please choose a different slug.');
//       return;
//     }

//     const audioData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       description: formData.description?.trim() || '',
//       type: formData.type,
//       language: formData.language,
//       author: formData.author || null,
//       category: formData.category || null,
//       audioUrl: formData.audioUrl,
//       thumbnail: formData.thumbnail || '',
//       coverImage: formData.coverImage || '',
//       duration: formData.duration ? parseInt(formData.duration) : null,
//       tags: formData.tags,
//       transcript: formData.transcript || '',
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingAudio) {
//         await audioAPI.updateAudio(editingAudio._id, audioData);
//         toast.success('Audio updated successfully');
//       } else {
//         await audioAPI.createAudio(audioData);
//         toast.success('Audio created successfully');
//       }
//       resetModal();
//       fetchAudioItems();
//     } catch (error) {
//       console.error('Error saving audio:', error);
//       const message = error.response?.data?.message || 'Failed to save audio';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await audioAPI.deleteAudio(id);
//       toast.success('Audio deleted successfully');
//       fetchAudioItems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete audio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (audio) => {
//     setLoading(true);
//     try {
//       await audioAPI.updateAudio(audio._id, {
//         ...audio,
//         isPublished: !audio.isPublished
//       });
//       toast.success(`Audio ${!audio.isPublished ? 'published' : 'unpublished'}`);
//       fetchAudioItems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (audio) => {
//     setEditingAudio(audio);
//     setFormData({
//       title: audio.title || '',
//       slug: audio.slug || '',
//       description: audio.description || '',
//       type: audio.type || 'podcast',
//       language: audio.language || 'urdu',
//       author: typeof audio.author === 'object' ? audio.author?._id : audio.author || '',
//       category: audio.category?._id || audio.category || '',
//       audioUrl: audio.audioUrl || '',
//       thumbnail: audio.thumbnail || '',
//       coverImage: audio.coverImage || '',
//       duration: audio.duration || '',
//       tags: audio.tags || [],
//       transcript: audio.transcript || '',
//       isPremium: audio.isPremium || false,
//       isPublished: audio.isPublished || false,
//       isFeatured: audio.isFeatured || false
//     });
//     setUploadType(audio.audioUrl?.includes('youtube.com') || audio.audioUrl?.includes('youtu.be') ? 'youtube' : 'file');
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/audio/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingAudio(null);
//     setFormData({
//       title: '',
//       slug: '',
//       description: '',
//       type: 'podcast',
//       language: 'urdu',
//       author: '',
//       category: '',
//       audioUrl: '',
//       thumbnail: '',
//       coverImage: '',
//       duration: '',
//       tags: [],
//       transcript: '',
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setUploadType('file');
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterType('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   const getCategoryName = (categoryId) => {
//     if (typeof categoryId === 'object' && categoryId?.name) return categoryId.name;
//     const category = categories.find(c => c._id === categoryId);
//     return category?.name || 'Uncategorized';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio CMS</h1>
//           <p className="text-gray-500">Manage audio, podcasts, recitations, and more</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="btn-primary inline-flex items-center space-x-2"
//         >
//           <Upload className="h-5 w-5" />
//           <span>Add Audio</span>
//         </button>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Audio</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {audioItems.filter(a => a.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {audioItems.filter(a => !a.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {audioItems.filter(a => a.isFeatured).length}
//           </p>
//           <p className="text-sm text-gray-500">Featured</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-blue-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search audio by title..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Types</option>
//           <option value="podcast">Podcast</option>
//           <option value="mushaira">Mushaira</option>
//           <option value="poem_recitation">Poem Recitation</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="audiobook">Audiobook</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Audio Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audio & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && audioItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading audio...</p>
//                   </td>
//                 </tr>
//               ) : audioItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No audio found.</p>
//                     {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all audio
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 audioItems.map((audio) => (
//                   <motion.tr
//                     key={audio._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="h-12 w-12 bg-green-100 rounded flex items-center justify-center">
//                           <Headphones className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{audio.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {audio.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(audio.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === audio.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                           {audio.duration && (
//                             <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(audio.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {audio.type?.replace('_', ' ')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(audio)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           audio.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {audio.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {audio.stats?.plays?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(audio.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/audio/${audio.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Audio"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(audio)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Audio"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(audio._id, audio.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Audio"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//             <p className="text-sm text-gray-500">
//               Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//             </p>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                 disabled={pagination.page === 1 || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <span className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">
//                 {pagination.page} / {pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Audio Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingAudio ? 'Edit Audio' : 'Add New Audio'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title and Slug */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleTitleChange}
//                       className="input-field"
//                       placeholder="Enter audio title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/audio/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="audio-slug"
//                       />
//                       <button
//                         type="button"
//                         onClick={regenerateSlug}
//                         className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                         title="Regenerate slug from title"
//                       >
//                         <RefreshCw className="h-4 w-4" />
//                       </button>
//                     </div>
//                     {!slugAvailable && (
//                       <p className="text-xs text-red-500 mt-1">Slug already taken. Please choose a different one.</p>
//                     )}
//                     {slugAvailable && formData.slug && !checkingSlug && (
//                       <p className="text-xs text-green-500 mt-1">✓ Slug is available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Upload Type Toggle */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Audio Source</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         value="file"
//                         checked={uploadType === 'file'}
//                         onChange={() => setUploadType('file')}
//                         className="h-4 w-4 text-primary-600"
//                       />
//                       <span className="text-sm">Upload File</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Audio File Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Audio File <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-3">
//                     <input
//                       type="url"
//                       name="audioUrl"
//                       value={formData.audioUrl}
//                       onChange={handleInputChange}
//                       className="input-field flex-1"
//                       placeholder="https://... or upload audio"
//                     />
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="audio/*"
//                         onChange={handleAudioUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingAudio}
//                       />
//                       <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingAudio}>
//                         {uploadingAudio ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadingAudio && (
//                     <div className="mt-2">
//                       <div className="flex items-center gap-2">
//                         <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
//                         <span className="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                         <div 
//                           className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//                           style={{ width: `${uploadProgress}%` }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">Upload MP3, WAV, OGG, or M4A (max 100MB)</p>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter audio description..."
//                   />
//                 </div>

//                 {/* Author, Category, Type */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="">Select author</option>
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="">Select category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Audio Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="podcast">Podcast</option>
//                       <option value="mushaira">Mushaira</option>
//                       <option value="poem_recitation">Poem Recitation</option>
//                       <option value="ghazal">Ghazal</option>
//                       <option value="audiobook">Audiobook</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Language and Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//                     <select
//                       name="language"
//                       value={formData.language}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="urdu">Urdu</option>
//                       <option value="hindi">Hindi</option>
//                       <option value="english">English</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
//                     <input
//                       type="number"
//                       name="duration"
//                       value={formData.duration}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 3600 for 1 hour"
//                     />
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
//                   <input
//                     type="text"
//                     name="tags"
//                     value={formData.tags.join(', ')}
//                     onChange={handleTagsChange}
//                     className="input-field"
//                     placeholder="poetry, ghazal, recitation"
//                   />
//                 </div>

//                 {/* Thumbnail/Cover Image */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
//                     <input
//                       type="url"
//                       name="thumbnail"
//                       value={formData.thumbnail}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
//                     <input
//                       type="url"
//                       name="coverImage"
//                       value={formData.coverImage}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                 </div>

//                 {/* Transcript */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Transcript (Optional)</label>
//                   <textarea
//                     name="transcript"
//                     value={formData.transcript}
//                     onChange={handleInputChange}
//                     className="input-field h-32"
//                     placeholder="Enter transcript text for the audio..."
//                   />
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPremium"
//                       checked={formData.isPremium}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Premium (Paid)</span>
//                   </label>
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFeatured"
//                       checked={formData.isFeatured}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Featured Audio</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingAudio ? 'Update Audio' : 'Add Audio')}
//                   </button>
//                   <button type="button" onClick={resetModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AudioCMSPage;





















// // client/src/pages/admin/AudioCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, Headphones, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Music, Mic, Clock, Heart
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import audioAPI from '../../api/audioAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import uploadAPI from '../../api/uploadAPI';
// import { AUDIO_TYPES, LANGUAGES } from '../../utils/constants';
// import toast from 'react-hot-toast';

// const AudioCMSPage = () => {
//   const [audioItems, setAudioItems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingAudio, setEditingAudio] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [uploadType, setUploadType] = useState('file');
//   const [uploadingAudio, setUploadingAudio] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     description: '',
//     type: 'nauha',
//     language: 'urdu',
//     author: '',
//     category: '',
//     audioUrl: '',
//     thumbnail: '',
//     coverImage: '',
//     duration: '',
//     tags: [],
//     transcript: '',
//     occasion: 'general',
//     isPremium: false,
//     isPublished: false,
//     isFeatured: false
//   });

//   // Generate slug from title
//   const generateSlugFromTitle = (title) => {
//     return title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-|-$/g, '');
//   };

//   // Check slug availability
//   const checkSlugAvailability = async (slug, excludeId = null) => {
//     if (!slug || slug.length < 2) {
//       setSlugAvailable(true);
//       return true;
//     }

//     setCheckingSlug(true);
//     try {
//       const response = await audioAPI.getAudioItems({ limit: 1000 });
//       let audioList = [];
//       if (response?.data?.data) {
//         audioList = response.data.data;
//       } else if (response?.data) {
//         audioList = response.data;
//       } else if (Array.isArray(response)) {
//         audioList = response;
//       } else {
//         audioList = [];
//       }

//       const exists = audioList.some(audio => 
//         audio.slug === slug && audio._id !== excludeId
//       );
      
//       setSlugAvailable(!exists);
//       return !exists;
//     } catch (error) {
//       console.error('Error checking slug:', error);
//       setSlugAvailable(true);
//       return true;
//     } finally {
//       setCheckingSlug(false);
//     }
//   };

//   // Handle title change
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingAudio?._id);
//     }
//   };

//   // Handle slug change
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingAudio?._id);
//   };

//   // Regenerate slug
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingAudio?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload audio file
//   const handleAudioUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('audio/')) {
//       toast.error('Please upload an audio file');
//       return;
//     }

//     const maxSize = 100 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error('File too large. Max size is 100MB');
//       return;
//     }

//     setUploadingAudio(true);
//     setUploadProgress(0);
    
//     const interval = setInterval(() => {
//       setUploadProgress(prev => Math.min(prev + 10, 90));
//     }, 500);

//     try {
//       const response = await uploadAPI.uploadAudio(file);
//       clearInterval(interval);
//       setUploadProgress(100);
      
//       if (response.data?.url) {
//         setFormData(prev => ({ ...prev, audioUrl: response.data.url }));
//         toast.success('Audio uploaded successfully');
//       }
//     } catch (error) {
//       clearInterval(interval);
//       console.error('Upload error:', error);
//       toast.error('Failed to upload audio');
//     } finally {
//       setUploadingAudio(false);
//       setTimeout(() => setUploadProgress(0), 1000);
//     }
//   };

//   // Fetch authors
//   const fetchAuthors = useCallback(async () => {
//     setAuthorsLoading(true);
//     try {
//       const response = await authorAPI.getAuthors({ limit: 100 });
//       let authorsList = [];
//       if (response?.data?.data) {
//         authorsList = response.data.data;
//       } else if (response?.data) {
//         authorsList = response.data;
//       } else if (Array.isArray(response)) {
//         authorsList = response;
//       } else {
//         authorsList = [];
//       }
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch categories
//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await categoryAPI.getCategories();
//       let categoriesList = [];
//       if (response?.data?.data) {
//         categoriesList = response.data.data;
//       } else if (response?.data) {
//         categoriesList = response.data;
//       } else if (Array.isArray(response)) {
//         categoriesList = response;
//       } else {
//         categoriesList = [];
//       }
//       setCategories(Array.isArray(categoriesList) ? categoriesList : []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([]);
//     }
//   }, []);

//   // Fetch audio items
//   const fetchAudioItems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterType !== 'all' && { type: filterType }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await audioAPI.getAudioItems(params);
      
//       let audioData = [];
//       if (response?.data?.data) {
//         audioData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         audioData = response.data;
//       } else if (Array.isArray(response)) {
//         audioData = response;
//       } else {
//         audioData = [];
//       }
      
//       setAudioItems(Array.isArray(audioData) ? audioData : []);
//     } catch (error) {
//       console.error('Error fetching audio:', error);
//       toast.error('Failed to load audio');
//       setAudioItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterType, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchAudioItems();
//   }, [fetchAuthors, fetchCategories, fetchAudioItems]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
//     setFormData(prev => ({ ...prev, tags }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter an audio title');
//       return;
//     }

//     if (!formData.audioUrl) {
//       toast.error('Please provide an audio URL or upload an audio file');
//       return;
//     }

//     if (!formData.slug) {
//       toast.error('Please enter a slug');
//       return;
//     }

//     if (!slugAvailable) {
//       toast.error('Slug already exists. Please choose a different slug.');
//       return;
//     }

//     const audioData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       description: formData.description?.trim() || '',
//       type: formData.type,
//       language: formData.language,
//       author: formData.author || null,
//       category: formData.category || null,
//       audioUrl: formData.audioUrl,
//       thumbnail: formData.thumbnail || '',
//       coverImage: formData.coverImage || '',
//       duration: formData.duration ? parseInt(formData.duration) : null,
//       tags: formData.tags,
//       transcript: formData.transcript || '',
//       occasion: formData.occasion,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingAudio) {
//         await audioAPI.updateAudio(editingAudio._id, audioData);
//         toast.success('Audio updated successfully');
//       } else {
//         await audioAPI.createAudio(audioData);
//         toast.success('Audio created successfully');
//       }
//       resetModal();
//       fetchAudioItems();
//     } catch (error) {
//       console.error('Error saving audio:', error);
//       const message = error.response?.data?.message || 'Failed to save audio';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await audioAPI.deleteAudio(id);
//       toast.success('Audio deleted successfully');
//       fetchAudioItems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete audio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (audio) => {
//     setLoading(true);
//     try {
//       await audioAPI.updateAudio(audio._id, {
//         ...audio,
//         isPublished: !audio.isPublished
//       });
//       toast.success(`Audio ${!audio.isPublished ? 'published' : 'unpublished'}`);
//       fetchAudioItems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (audio) => {
//     setEditingAudio(audio);
//     setFormData({
//       title: audio.title || '',
//       slug: audio.slug || '',
//       description: audio.description || '',
//       type: audio.type || 'nauha',
//       language: audio.language || 'urdu',
//       author: typeof audio.author === 'object' ? audio.author?._id : audio.author || '',
//       category: audio.category?._id || audio.category || '',
//       audioUrl: audio.audioUrl || '',
//       thumbnail: audio.thumbnail || '',
//       coverImage: audio.coverImage || '',
//       duration: audio.duration || '',
//       tags: audio.tags || [],
//       transcript: audio.transcript || '',
//       occasion: audio.occasion || 'general',
//       isPremium: audio.isPremium || false,
//       isPublished: audio.isPublished || false,
//       isFeatured: audio.isFeatured || false
//     });
//     setUploadType(audio.audioUrl?.includes('youtube.com') || audio.audioUrl?.includes('youtu.be') ? 'youtube' : 'file');
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/audio/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingAudio(null);
//     setFormData({
//       title: '',
//       slug: '',
//       description: '',
//       type: 'nauha',
//       language: 'urdu',
//       author: '',
//       category: '',
//       audioUrl: '',
//       thumbnail: '',
//       coverImage: '',
//       duration: '',
//       tags: [],
//       transcript: '',
//       occasion: 'general',
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setUploadType('file');
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterType('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   const getCategoryName = (categoryId) => {
//     if (typeof categoryId === 'object' && categoryId?.name) return categoryId.name;
//     const category = categories.find(c => c._id === categoryId);
//     return category?.name || 'Uncategorized';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return 'N/A';
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Group audio types by occasion for display in filter
//   const getUniqueTypesForFilter = () => {
//     const types = [...new Set(AUDIO_TYPES.map(type => type.id))];
//     return types;
//   };

//   // Loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio CMS</h1>
//           <p className="text-gray-500">Manage audio, podcasts, recitations, and more</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="btn-primary inline-flex items-center space-x-2"
//         >
//           <Upload className="h-5 w-5" />
//           <span>Add Audio</span>
//         </button>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Audio</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {audioItems.filter(a => a.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {audioItems.filter(a => !a.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {audioItems.filter(a => a.isFeatured).length}
//           </p>
//           <p className="text-sm text-gray-500">Featured</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-blue-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search audio by title..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-48"
//         >
//           <option value="all">All Types</option>
//           {getUniqueTypesForFilter().map((type) => {
//             const typeInfo = AUDIO_TYPES.find(t => t.id === type);
//             return (
//               <option key={type} value={type}>
//                 {typeInfo?.label || type}
//               </option>
//             );
//           })}
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Audio Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audio & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && audioItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading audio...</p>
//                   </td>
//                 </tr>
//               ) : audioItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No audio found.</p>
//                     {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all audio
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 audioItems.map((audio) => (
//                   <motion.tr
//                     key={audio._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="h-12 w-12 bg-green-100 rounded flex items-center justify-center">
//                           <Headphones className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{audio.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {audio.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(audio.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === audio.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                           {audio.duration && (
//                             <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
//                               <Clock className="h-3 w-3" />
//                               {formatDuration(audio.duration)}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(audio.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {AUDIO_TYPES.find(t => t.id === audio.type)?.label || audio.type?.replace('_', ' ')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(audio)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           audio.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {audio.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {audio.stats?.plays?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(audio.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/audio/${audio.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Audio"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(audio)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Audio"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(audio._id, audio.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Audio"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//             <p className="text-sm text-gray-500">
//               Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//             </p>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                 disabled={pagination.page === 1 || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <span className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">
//                 {pagination.page} / {pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Audio Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingAudio ? 'Edit Audio' : 'Add New Audio'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title and Slug */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleTitleChange}
//                       className="input-field"
//                       placeholder="Enter audio title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/audio/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="audio-slug"
//                       />
//                       <button
//                         type="button"
//                         onClick={regenerateSlug}
//                         className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                         title="Regenerate slug from title"
//                       >
//                         <RefreshCw className="h-4 w-4" />
//                       </button>
//                     </div>
//                     {!slugAvailable && (
//                       <p className="text-xs text-red-500 mt-1">Slug already taken. Please choose a different one.</p>
//                     )}
//                     {slugAvailable && formData.slug && !checkingSlug && (
//                       <p className="text-xs text-green-500 mt-1">✓ Slug is available</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Upload Type Toggle */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Audio Source</label>
//                   <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         value="file"
//                         checked={uploadType === 'file'}
//                         onChange={() => setUploadType('file')}
//                         className="h-4 w-4 text-primary-600"
//                       />
//                       <span className="text-sm">Upload File</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         value="url"
//                         checked={uploadType === 'url'}
//                         onChange={() => setUploadType('url')}
//                         className="h-4 w-4 text-primary-600"
//                       />
//                       <span className="text-sm">External URL</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Audio File Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Audio {uploadType === 'file' ? 'File' : 'URL'} <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-3">
//                     <input
//                       type={uploadType === 'url' ? 'url' : 'text'}
//                       name="audioUrl"
//                       value={formData.audioUrl}
//                       onChange={handleInputChange}
//                       className="input-field flex-1"
//                       placeholder={uploadType === 'url' ? "https://..." : "Audio URL will appear here after upload"}
//                       readOnly={uploadType === 'file'}
//                     />
//                     {uploadType === 'file' && (
//                       <div className="relative">
//                         <input
//                           type="file"
//                           accept="audio/*"
//                           onChange={handleAudioUpload}
//                           className="absolute inset-0 opacity-0 cursor-pointer"
//                           disabled={uploadingAudio}
//                         />
//                         <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingAudio}>
//                           {uploadingAudio ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                           <span>Upload</span>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   {uploadingAudio && (
//                     <div className="mt-2">
//                       <div className="flex items-center gap-2">
//                         <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
//                         <span className="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                         <div 
//                           className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//                           style={{ width: `${uploadProgress}%` }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">Upload MP3, WAV, OGG, or M4A (max 100MB) or provide external URL</p>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter audio description..."
//                   />
//                 </div>

//                 {/* Author, Category, Type, Occasion */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="">Select author</option>
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="">Select category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Audio Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       {AUDIO_TYPES.map((type) => (
//                         <option key={type.id} value={type.id}>
//                           {type.icon} {type.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
//                     <select
//                       name="occasion"
//                       value={formData.occasion}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="muharram">🖤 Muharram</option>
//                       <option value="ramadan">🌙 Ramadan</option>
//                       <option value="eid">🎉 Eid</option>
//                       <option value="milad">⭐ Milad</option>
//                       <option value="general">📀 General</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Language and Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//                     <select
//                       name="language"
//                       value={formData.language}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       {LANGUAGES.map((lang) => (
//                         <option key={lang.code} value={lang.code}>
//                           {lang.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
//                     <input
//                       type="number"
//                       name="duration"
//                       value={formData.duration}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 3600 for 1 hour"
//                     />
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
//                   <input
//                     type="text"
//                     name="tags"
//                     value={formData.tags.join(', ')}
//                     onChange={handleTagsChange}
//                     className="input-field"
//                     placeholder="poetry, ghazal, recitation"
//                   />
//                 </div>

//                 {/* Thumbnail/Cover Image */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
//                     <input
//                       type="url"
//                       name="thumbnail"
//                       value={formData.thumbnail}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
//                     <input
//                       type="url"
//                       name="coverImage"
//                       value={formData.coverImage}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                 </div>

//                 {/* Transcript */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Transcript (Optional)</label>
//                   <textarea
//                     name="transcript"
//                     value={formData.transcript}
//                     onChange={handleInputChange}
//                     className="input-field h-32"
//                     placeholder="Enter transcript text for the audio..."
//                   />
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPremium"
//                       checked={formData.isPremium}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Premium (Paid)</span>
//                   </label>
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFeatured"
//                       checked={formData.isFeatured}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Featured Audio</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingAudio ? 'Update Audio' : 'Add Audio')}
//                   </button>
//                   <button type="button" onClick={resetModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AudioCMSPage;



















// client/src/pages/admin/AudioCMSPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Edit, Trash2, Eye, Upload, FileText,
  Download, Headphones, ChevronLeft, ChevronRight, X, Loader2,
  AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
  Music, Mic, Clock, Heart, Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import audioAPI from '../../api/audioAPI';
import authorAPI from '../../api/authorAPI';
import categoryAPI from '../../api/categoryAPI';
import uploadAPI from '../../api/uploadAPI';
import { AUDIO_TYPES, LANGUAGES } from '../../utils/constants';
import toast from 'react-hot-toast';

const AudioCMSPage = () => {
  const [audioItems, setAudioItems] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAudio, setEditingAudio] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [uploadType, setUploadType] = useState('file');
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
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
    type: 'nauha',
    language: 'urdu',
    author: '',
    category: '',
    audioUrl: '',
    thumbnail: '',
    coverImage: '',
    duration: '',
    tags: [],
    transcript: '',
    occasion: 'general',
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
      const response = await audioAPI.getAudioItems({ limit: 1000 });
      let audioList = [];
      if (response?.data?.data) {
        audioList = response.data.data;
      } else if (response?.data) {
        audioList = response.data;
      } else if (Array.isArray(response)) {
        audioList = response;
      } else {
        audioList = [];
      }

      const exists = audioList.some(audio => 
        audio.slug === slug && audio._id !== excludeId
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

  // Handle title change
  const handleTitleChange = async (e) => {
    const title = e.target.value;
    const newSlug = generateSlugFromTitle(title);
    setFormData(prev => ({
      ...prev,
      title: title,
      slug: newSlug
    }));
    if (newSlug) {
      await checkSlugAvailability(newSlug, editingAudio?._id);
    }
  };

  // Handle slug change
  const handleSlugChange = async (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({ ...prev, slug }));
    await checkSlugAvailability(slug, editingAudio?._id);
  };

  // Regenerate slug
  const regenerateSlug = async () => {
    const newSlug = generateSlugFromTitle(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
    await checkSlugAvailability(newSlug, editingAudio?._id);
    toast.success('Slug regenerated from title');
  };

  // Upload audio file
  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      toast.error('Please upload an audio file');
      return;
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large. Max size is 100MB');
      return;
    }

    setUploadingAudio(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const response = await uploadAPI.uploadAudio(file);
      clearInterval(interval);
      setUploadProgress(100);
      
      if (response.data?.url) {
        setFormData(prev => ({ ...prev, audioUrl: response.data.url }));
        toast.success('Audio uploaded successfully');
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Upload error:', error);
      toast.error('Failed to upload audio');
    } finally {
      setUploadingAudio(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Upload Thumbnail Image
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image too large. Max size is 5MB');
      return;
    }

    setUploadingThumbnail(true);
    
    try {
      const response = await uploadAPI.uploadImage(file);
      
      if (response.data?.url) {
        setFormData(prev => ({ ...prev, thumbnail: response.data.url }));
        toast.success('Thumbnail uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Upload Cover Image
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image too large. Max size is 10MB');
      return;
    }

    setUploadingCover(true);
    
    try {
      const response = await uploadAPI.uploadImage(file);
      
      if (response.data?.url) {
        setFormData(prev => ({ ...prev, coverImage: response.data.url }));
        toast.success('Cover image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
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

  // Fetch audio items
  const fetchAudioItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filterType !== 'all' && { type: filterType }),
        ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
      };

      const response = await audioAPI.getAudioItems(params);
      
      let audioData = [];
      if (response?.data?.data) {
        audioData = response.data.data;
        if (response.data.pagination) setPagination(response.data.pagination);
      } else if (response?.data) {
        audioData = response.data;
      } else if (Array.isArray(response)) {
        audioData = response;
      } else {
        audioData = [];
      }
      
      setAudioItems(Array.isArray(audioData) ? audioData : []);
    } catch (error) {
      console.error('Error fetching audio:', error);
      toast.error('Failed to load audio');
      setAudioItems([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchQuery, filterType, filterStatus]);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchAudioItems();
  }, [fetchAuthors, fetchCategories, fetchAudioItems]);

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
      toast.error('Please enter an audio title');
      return;
    }

    if (!formData.audioUrl) {
      toast.error('Please provide an audio URL or upload an audio file');
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

    const audioData = {
      title: formData.title.trim(),
      slug: formData.slug,
      description: formData.description?.trim() || '',
      type: formData.type,
      language: formData.language,
      author: formData.author || null,
      category: formData.category || null,
      audioUrl: formData.audioUrl,
      thumbnail: formData.thumbnail || '',
      coverImage: formData.coverImage || '',
      duration: formData.duration ? parseInt(formData.duration) : null,
      tags: formData.tags,
      transcript: formData.transcript || '',
      occasion: formData.occasion,
      isPremium: formData.isPremium,
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured
    };

    setLoading(true);
    try {
      if (editingAudio) {
        await audioAPI.updateAudio(editingAudio._id, audioData);
        toast.success('Audio updated successfully');
      } else {
        await audioAPI.createAudio(audioData);
        toast.success('Audio created successfully');
      }
      resetModal();
      fetchAudioItems();
    } catch (error) {
      console.error('Error saving audio:', error);
      const message = error.response?.data?.message || 'Failed to save audio';
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
      await audioAPI.deleteAudio(id);
      toast.success('Audio deleted successfully');
      fetchAudioItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete audio');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (audio) => {
    setLoading(true);
    try {
      await audioAPI.updateAudio(audio._id, {
        ...audio,
        isPublished: !audio.isPublished
      });
      toast.success(`Audio ${!audio.isPublished ? 'published' : 'unpublished'}`);
      fetchAudioItems();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (audio) => {
    setEditingAudio(audio);
    setFormData({
      title: audio.title || '',
      slug: audio.slug || '',
      description: audio.description || '',
      type: audio.type || 'nauha',
      language: audio.language || 'urdu',
      author: typeof audio.author === 'object' ? audio.author?._id : audio.author || '',
      category: audio.category?._id || audio.category || '',
      audioUrl: audio.audioUrl || '',
      thumbnail: audio.thumbnail || '',
      coverImage: audio.coverImage || '',
      duration: audio.duration || '',
      tags: audio.tags || [],
      transcript: audio.transcript || '',
      occasion: audio.occasion || 'general',
      isPremium: audio.isPremium || false,
      isPublished: audio.isPublished || false,
      isFeatured: audio.isFeatured || false
    });
    setUploadType(audio.audioUrl?.includes('youtube.com') || audio.audioUrl?.includes('youtu.be') ? 'youtube' : 'file');
    setSlugAvailable(true);
    setShowAddModal(true);
  };

  const handleCopySlug = async (slug) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/audio/${slug}`);
      setCopiedSlug(slug);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingAudio(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      type: 'nauha',
      language: 'urdu',
      author: '',
      category: '',
      audioUrl: '',
      thumbnail: '',
      coverImage: '',
      duration: '',
      tags: [],
      transcript: '',
      occasion: 'general',
      isPremium: false,
      isPublished: false,
      isFeatured: false
    });
    setUploadType('file');
    setSlugAvailable(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Group audio types by occasion for display in filter
  const getUniqueTypesForFilter = () => {
    const types = [...new Set(AUDIO_TYPES.map(type => type.id))];
    return types;
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio CMS</h1>
          <p className="text-gray-500">Manage audio, podcasts, recitations, and more</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Add Audio</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Audio</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {audioItems.filter(a => a.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {audioItems.filter(a => !a.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Draft</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {audioItems.filter(a => a.isFeatured).length}
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
            placeholder="Search audio by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input-field w-full md:w-48"
        >
          <option value="all">All Types</option>
          {getUniqueTypesForFilter().map((type) => {
            const typeInfo = AUDIO_TYPES.find(t => t.id === type);
            return (
              <option key={type} value={type}>
                {typeInfo?.label || type}
              </option>
            );
          })}
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
        {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Audio Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audio & Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && audioItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading audio...</p>
                  </td>
                </tr>
              ) : audioItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <p>No audio found.</p>
                    {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
                      <button onClick={clearFilters} className="text-primary-600 mt-2">
                        Clear filters to see all audio
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                audioItems.map((audio) => (
                  <motion.tr
                    key={audio._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-green-100 rounded flex items-center justify-center">
                          <Headphones className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{audio.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              slug: {audio.slug}
                            </code>
                            <button
                              onClick={() => handleCopySlug(audio.slug)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                              title="Copy link to clipboard"
                            >
                              {copiedSlug === audio.slug ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <Copy className="h-3 w-3 text-gray-400" />
                              )}
                            </button>
                          </div>
                          {audio.duration && (
                            <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {formatDuration(audio.duration)}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getAuthorName(audio.author)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
                        {AUDIO_TYPES.find(t => t.id === audio.type)?.label || audio.type?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(audio)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                          audio.isPublished 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {audio.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {audio.stats?.plays?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(audio.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/audio/${audio.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                          title="View Audio"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(audio)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                          title="Edit Audio"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(audio._id, audio.title)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                          title="Delete Audio"
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

      {/* Add/Edit Audio Modal */}
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
                  {editingAudio ? 'Edit Audio' : 'Add New Audio'}
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
                      placeholder="Enter audio title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/audio/</span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleSlugChange}
                        className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="audio-slug"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audio Source</label>
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
                        value="url"
                        checked={uploadType === 'url'}
                        onChange={() => setUploadType('url')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span className="text-sm">External URL</span>
                    </label>
                  </div>
                </div>

                {/* Audio File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio {uploadType === 'file' ? 'File' : 'URL'} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type={uploadType === 'url' ? 'url' : 'text'}
                      name="audioUrl"
                      value={formData.audioUrl}
                      onChange={handleInputChange}
                      className="input-field flex-1"
                      placeholder={uploadType === 'url' ? "https://..." : "Audio URL will appear here after upload"}
                      readOnly={uploadType === 'file'}
                    />
                    {uploadType === 'file' && (
                      <div className="relative">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleAudioUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingAudio}
                        />
                        <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingAudio}>
                          {uploadingAudio ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          <span>Upload</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {uploadingAudio && (
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
                  <p className="text-xs text-gray-500 mt-1">Upload MP3, WAV, OGG, or M4A (max 100MB) or provide external URL</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Enter audio description..."
                  />
                </div>

                {/* Author, Category, Type, Occasion */}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Audio Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {AUDIO_TYPES.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="muharram">🖤 Muharram</option>
                      <option value="ramadan">🌙 Ramadan</option>
                      <option value="eid">🎉 Eid</option>
                      <option value="milad">⭐ Milad</option>
                      <option value="general">📀 General</option>
                    </select>
                  </div>
                </div>

                {/* Language and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags.join(', ')}
                    onChange={handleTagsChange}
                    className="input-field"
                    placeholder="poetry, ghazal, recitation"
                  />
                </div>

                {/* Thumbnail with Cloudinary Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      className="input-field flex-1"
                      placeholder="https://... or upload image"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingThumbnail}
                      />
                      <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingThumbnail}>
                        {uploadingThumbnail ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                  {formData.thumbnail && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={formData.thumbnail} alt="Thumbnail preview" className="h-12 w-12 object-cover rounded" />
                      <span className="text-xs text-gray-500 truncate flex-1">{formData.thumbnail}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG, or WebP (max 5MB). Recommended size: 300x300px</p>
                </div>

                {/* Cover Image with Cloudinary Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      className="input-field flex-1"
                      placeholder="https://... or upload image"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingCover}
                      />
                      <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingCover}>
                        {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={formData.coverImage} alt="Cover preview" className="h-12 w-12 object-cover rounded" />
                      <span className="text-xs text-gray-500 truncate flex-1">{formData.coverImage}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG, or WebP (max 10MB). Recommended size: 1200x1200px</p>
                </div>

                {/* Transcript */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transcript (Optional)</label>
                  <textarea
                    name="transcript"
                    value={formData.transcript}
                    onChange={handleInputChange}
                    className="input-field h-32"
                    placeholder="Enter transcript text for the audio..."
                  />
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
                    <span className="text-sm text-gray-700">Featured Audio</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading || !slugAvailable}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingAudio ? 'Update Audio' : 'Add Audio')}
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

export default AudioCMSPage;