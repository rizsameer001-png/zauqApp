// //client/src/pages/admin/PoetryCMSPage.jsx

// //working revert if required
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import toast from 'react-hot-toast';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false
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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//   }, [fetchAuthors, fetchPoems]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     if (!formData.content || !formData.content.trim()) {
//       toast.error('Please enter poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.content.trim(),
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: 'urdu',
//       isPublished: formData.isPublished
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         // FIXED: Update by SLUG instead of ID
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIXED: Delete by SLUG instead of ID
//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FIXED: Toggle publish by SLUG instead of ID
//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: 'urdu',
//       isPublished: poem.isPublished || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false
//     });
//     setSlugAvailable(true);
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="btn-primary inline-flex items-center space-x-2"
//           disabled={authors.length === 0}
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add Poem</span>
//         </button>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                    </td>
//                   </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal with Slug Field */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Content */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Content (Urdu Script) <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="content"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     className="input-field h-40 font-urdu"
//                     dir="rtl"
//                     placeholder="Enter poem in Urdu script..."
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Example: دلِ ناداں تجھے ہوا کیا ہے</p>
//                 </div>

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Example: Dil-e-nadaan tujhe hua kya hai"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Roman/English script for readers who can't read Urdu</p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;












// // client/src/pages/admin/PoetryCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import aiAPI from '../../api/aiAPI';
// import toast from 'react-hot-toast';
// import AIGenerator from '../../components/ai/AIGenerator';
// import VoiceInput from '../../components/ai/VoiceInput';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [showAIGenerator, setShowAIGenerator] = useState(false);
//   const [remainingAILimit, setRemainingAILimit] = useState(null);
//   const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false
//   });

//   // Fetch AI usage stats
//   const fetchAIUsage = useCallback(async () => {
//     try {
//       const response = await aiAPI.getUsageStats();
//       if (response.success) {
//         setRemainingAILimit(response.data.remainingToday);
//       }
//     } catch (error) {
//       console.error('Failed to fetch AI usage:', error);
//     }
//   }, []);

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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//     fetchAIUsage();
//   }, [fetchAuthors, fetchPoems, fetchAIUsage]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     if (!formData.content || !formData.content.trim()) {
//       toast.error('Please enter poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.content.trim(),
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: 'urdu',
//       isPublished: formData.isPublished
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//       fetchAIUsage();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: 'urdu',
//       isPublished: poem.isPublished || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const handleAIAnalysis = async (poem) => {
//     setAnalyzingPoemId(poem._id);
//     try {
//       const response = await aiAPI.analyzePoemBySlug(poem.slug);
//       if (response.success) {
//         toast.success(`Analysis complete! Provider: ${response.data.provider}`);
//         // Store analysis in poem object or show modal
//         poem.aiAnalysis = response.data.analysis;
//         setPoems([...poems]);
//       }
//     } catch (error) {
//       toast.error('Failed to analyze poem');
//     } finally {
//       setAnalyzingPoemId(null);
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* AI Generator Modal */}
//       <AnimatePresence>
//         {showAIGenerator && (
//           <AIGenerator
//             onGenerated={(generated) => {
//               if (generated && setFormData) {
//                 setFormData(prev => ({
//                   ...prev,
//                   content: generated.content,
//                   transliteration: generated.transliteration || '',
//                   translation: generated.translation?.english || ''
//                 }));
//                 setShowAIGenerator(false);
//                 toast.success('AI generated content added to form!');
//               }
//             }}
//             onClose={() => setShowAIGenerator(false)}
//             existingFormData={formData}
//             setFormData={setFormData}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <div className="flex gap-3">
//           {remainingAILimit !== null && (
//             <div className="flex items-center">
//               <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                 remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
//                 remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 🤖 AI: {remainingAILimit} left today
//               </span>
//             </div>
//           )}
//           <button
//             onClick={() => setShowAIGenerator(true)}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Sparkles className="h-5 w-5" />
//             <span>AI Generate</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//             disabled={authors.length === 0}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Poem</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters with Voice Search */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <VoiceInput 
//           onResult={(text) => setSearchQuery(text)} 
//           language="ur-PK"
//         />
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                    </td>
//                   </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {/* AI Analysis Button */}
//                         <button
//                           onClick={() => handleAIAnalysis(poem)}
//                           disabled={analyzingPoemId === poem._id}
//                           className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
//                           title="AI Analysis"
//                         >
//                           {analyzingPoemId === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Brain className="h-4 w-4" />
//                           )}
//                         </button>
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Content */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Content (Urdu Script) <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="content"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     className="input-field h-40 font-urdu"
//                     dir="rtl"
//                     placeholder="Enter poem in Urdu script..."
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Example: دلِ ناداں تجھے ہوا کیا ہے</p>
//                 </div>

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Example: Dil-e-nadaan tujhe hua kya hai"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Roman/English script for readers who can't read Urdu</p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;






















// // client/src/pages/admin/PoetryCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import aiAPI from '../../api/aiAPI';
// import toast from 'react-hot-toast';
// import AIGenerator from '../../components/ai/AIGenerator';
// import VoiceInput from '../../components/ai/VoiceInput';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [showAIGenerator, setShowAIGenerator] = useState(false);
//   const [remainingAILimit, setRemainingAILimit] = useState(null);
//   const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
//   const [generatingTransliteration, setGeneratingTransliteration] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false
//   });

//   // Fetch AI usage stats
//   const fetchAIUsage = useCallback(async () => {
//     try {
//       const response = await aiAPI.getUsageStats();
//       if (response.success) {
//         setRemainingAILimit(response.data.remainingToday);
//       }
//     } catch (error) {
//       console.error('Failed to fetch AI usage:', error);
//     }
//   }, []);

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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//     fetchAIUsage();
//   }, [fetchAuthors, fetchPoems, fetchAIUsage]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     if (!formData.content || !formData.content.trim()) {
//       toast.error('Please enter poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.content.trim(),
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: 'urdu',
//       isPublished: formData.isPublished
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//       fetchAIUsage();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: 'urdu',
//       isPublished: poem.isPublished || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const handleAIAnalysis = async (poem) => {
//     setAnalyzingPoemId(poem._id);
//     try {
//       const response = await aiAPI.analyzePoemBySlug(poem.slug);
//       if (response.success) {
//         toast.success(`Analysis complete! Provider: ${response.data.provider}`);
//         // Store analysis in poem object or show modal
//         poem.aiAnalysis = response.data.analysis;
//         setPoems([...poems]);
//       }
//     } catch (error) {
//       toast.error('Failed to analyze poem');
//     } finally {
//       setAnalyzingPoemId(null);
//     }
//   };

//   // ============================================
//   // NEW: Generate Transliteration for a single poem
//   // ============================================
//   const generateTransliteration = async (poem) => {
//     if (!poem || generatingTransliteration === poem._id) return;
    
//     setGeneratingTransliteration(poem._id);
//     try {
//       const response = await fetch(`/api/transliteration/poem/${poem._id}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         // Update the poem in the list
//         const updatedPoems = poems.map(p => 
//           p._id === poem._id ? { ...p, transliteration: result.data } : p
//         );
//         setPoems(updatedPoems);
//         toast.success(`Transliteration generated successfully!`);
//       } else {
//         toast.error(result.error || 'Failed to generate transliteration');
//       }
//     } catch (error) {
//       console.error('Transliteration error:', error);
//       toast.error('Failed to generate transliteration');
//     } finally {
//       setGeneratingTransliteration(null);
//     }
//   };

//   // ============================================
//   // NEW: Batch generate transliterations for all poems
//   // ============================================
//   const batchGenerateTransliterations = async () => {
//     if (!window.confirm('Generate transliterations for all poems missing it? This may take a few minutes.')) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch('/api/transliteration/batch', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ limit: 100 })
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success(`Generated ${result.generated} transliterations out of ${result.total} poems`);
//         fetchPoems(); // Refresh the list
//       } else {
//         toast.error(result.error || 'Failed to batch generate');
//       }
//     } catch (error) {
//       console.error('Batch error:', error);
//       toast.error('Failed to batch generate transliterations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* AI Generator Modal */}
//       <AnimatePresence>
//         {showAIGenerator && (
//           <AIGenerator
//             onGenerated={(generated) => {
//               if (generated && setFormData) {
//                 setFormData(prev => ({
//                   ...prev,
//                   content: generated.content,
//                   transliteration: generated.transliteration || '',
//                   translation: generated.translation?.english || ''
//                 }));
//                 setShowAIGenerator(false);
//                 toast.success('AI generated content added to form!');
//               }
//             }}
//             onClose={() => setShowAIGenerator(false)}
//             existingFormData={formData}
//             setFormData={setFormData}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <div className="flex flex-wrap gap-3">
//           {remainingAILimit !== null && (
//             <div className="flex items-center">
//               <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                 remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
//                 remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 🤖 AI: {remainingAILimit} left today
//               </span>
//             </div>
//           )}
          
//           {/* NEW: Batch Transliteration Button */}
//           <button
//             onClick={batchGenerateTransliterations}
//             className="btn-secondary inline-flex items-center gap-2"
//             disabled={loading}
//           >
//             <Mic className="h-5 w-5" />
//             <span>Generate All Transliterations</span>
//           </button>
          
//           <button
//             onClick={() => setShowAIGenerator(true)}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Sparkles className="h-5 w-5" />
//             <span>AI Generate</span>
//           </button>
          
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//             disabled={authors.length === 0}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Poem</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters with Voice Search */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <VoiceInput 
//           onResult={(text) => setSearchQuery(text)} 
//           language="ur-PK"
//         />
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                    </td>
//                   </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {/* NEW: Transliteration Button */}
//                         <button
//                           onClick={() => generateTransliteration(poem)}
//                           disabled={generatingTransliteration === poem._id}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             poem.transliteration && poem.transliteration.length > 0
//                               ? 'text-green-600 hover:bg-green-100'
//                               : 'text-blue-600 hover:bg-blue-100'
//                           }`}
//                           title={poem.transliteration && poem.transliteration.length > 0 ? 'Transliteration exists' : 'Generate Transliteration'}
//                         >
//                           {generatingTransliteration === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Mic className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         {/* AI Analysis Button */}
//                         <button
//                           onClick={() => handleAIAnalysis(poem)}
//                           disabled={analyzingPoemId === poem._id}
//                           className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
//                           title="AI Analysis"
//                         >
//                           {analyzingPoemId === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Brain className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Content */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Content (Urdu Script) <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="content"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     className="input-field h-40 font-urdu"
//                     dir="rtl"
//                     placeholder="Enter poem in Urdu script..."
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Example: دلِ ناداں تجھے ہوا کیا ہے</p>
//                 </div>

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Example: Dil-e-nadaan tujhe hua kya hai"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Roman/English script for readers who can't read Urdu</p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;

//================can delete=================================












// // client/src/pages/admin/PoetryCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import aiAPI from '../../api/aiAPI';
// import toast from 'react-hot-toast';
// import AIGenerator from '../../components/ai/AIGenerator';
// import VoiceInput from '../../components/ai/VoiceInput';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterLanguage, setFilterLanguage] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [showAIGenerator, setShowAIGenerator] = useState(false);
//   const [remainingAILimit, setRemainingAILimit] = useState(null);
//   const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
//   const [generatingTransliteration, setGeneratingTransliteration] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     contentHindi: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false
//   });

//   // Fetch AI usage stats
//   const fetchAIUsage = useCallback(async () => {
//     try {
//       const response = await aiAPI.getUsageStats();
//       if (response.success) {
//         setRemainingAILimit(response.data.remainingToday);
//       }
//     } catch (error) {
//       console.error('Failed to fetch AI usage:', error);
//     }
//   }, []);

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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Handle language change
//   const handleLanguageChange = (e) => {
//     const language = e.target.value;
//     setFormData(prev => ({ ...prev, language }));
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterLanguage !== 'all' && { language: filterLanguage }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterLanguage, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//     fetchAIUsage();
//   }, [fetchAuthors, fetchPoems, fetchAIUsage]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     // Validate content based on language
//     if (formData.language === 'urdu' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter Urdu poem content');
//       return;
//     }
    
//     if (formData.language === 'hindi' && (!formData.contentHindi || !formData.contentHindi.trim())) {
//       toast.error('Please enter Hindi poem content');
//       return;
//     }
    
//     if (formData.language === 'english' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter English poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.language === 'urdu' ? formData.content.trim() : '',
//       contentHindi: formData.language === 'hindi' ? formData.contentHindi.trim() : '',
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: formData.language,
//       isPublished: formData.isPublished
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//       fetchAIUsage();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       contentHindi: poem.contentHindi || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: poem.language || 'urdu',
//       isPublished: poem.isPublished || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const handleAIAnalysis = async (poem) => {
//     setAnalyzingPoemId(poem._id);
//     try {
//       const response = await aiAPI.analyzePoemBySlug(poem.slug);
//       if (response.success) {
//         toast.success(`Analysis complete! Provider: ${response.data.provider}`);
//         poem.aiAnalysis = response.data.analysis;
//         setPoems([...poems]);
//       }
//     } catch (error) {
//       toast.error('Failed to analyze poem');
//     } finally {
//       setAnalyzingPoemId(null);
//     }
//   };

//   // Generate Transliteration for a single poem
//   const generateTransliteration = async (poem) => {
//     if (!poem || generatingTransliteration === poem._id) return;
    
//     setGeneratingTransliteration(poem._id);
//     try {
//       const response = await fetch(`/api/transliteration/poem/${poem._id}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         const updatedPoems = poems.map(p => 
//           p._id === poem._id ? { ...p, transliteration: result.data } : p
//         );
//         setPoems(updatedPoems);
//         toast.success(`Transliteration generated successfully!`);
//       } else {
//         toast.error(result.error || 'Failed to generate transliteration');
//       }
//     } catch (error) {
//       console.error('Transliteration error:', error);
//       toast.error('Failed to generate transliteration');
//     } finally {
//       setGeneratingTransliteration(null);
//     }
//   };

//   // Batch generate transliterations for all poems
//   const batchGenerateTransliterations = async () => {
//     if (!window.confirm('Generate transliterations for all poems missing it? This may take a few minutes.')) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch('/api/transliteration/batch', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ limit: 100 })
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success(`Generated ${result.generated} transliterations out of ${result.total} poems`);
//         fetchPoems();
//       } else {
//         toast.error(result.error || 'Failed to batch generate');
//       }
//     } catch (error) {
//       console.error('Batch error:', error);
//       toast.error('Failed to batch generate transliterations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       contentHindi: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterLanguage('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Get language display name
//   const getLanguageDisplay = (lang) => {
//     const languages = {
//       urdu: '🇵🇰 Urdu',
//       hindi: '🇮🇳 Hindi',
//       english: '🇬🇧 English'
//     };
//     return languages[lang] || lang;
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* AI Generator Modal */}
//       <AnimatePresence>
//         {showAIGenerator && (
//           <AIGenerator
//             onGenerated={(generated) => {
//               if (generated && setFormData) {
//                 setFormData(prev => ({
//                   ...prev,
//                   content: generated.content,
//                   transliteration: generated.transliteration || '',
//                   translation: generated.translation?.english || ''
//                 }));
//                 setShowAIGenerator(false);
//                 toast.success('AI generated content added to form!');
//               }
//             }}
//             onClose={() => setShowAIGenerator(false)}
//             existingFormData={formData}
//             setFormData={setFormData}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <div className="flex flex-wrap gap-3">
//           {remainingAILimit !== null && (
//             <div className="flex items-center">
//               <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                 remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
//                 remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 🤖 AI: {remainingAILimit} left today
//               </span>
//             </div>
//           )}
          
//           <button
//             onClick={batchGenerateTransliterations}
//             className="btn-secondary inline-flex items-center gap-2"
//             disabled={loading}
//           >
//             <Mic className="h-5 w-5" />
//             <span>Generate All Transliterations</span>
//           </button>
          
//           <button
//             onClick={() => setShowAIGenerator(true)}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Sparkles className="h-5 w-5" />
//             <span>AI Generate</span>
//           </button>
          
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//             disabled={authors.length === 0}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Poem</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters with Voice Search */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <VoiceInput 
//           onResult={(text) => setSearchQuery(text)} 
//           language="ur-PK"
//         />
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterLanguage}
//           onChange={(e) => setFilterLanguage(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Languages</option>
//           <option value="urdu">Urdu (اردو)</option>
//           <option value="hindi">Hindi (हिन्दी)</option>
//           <option value="english">English</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                    </td>
//                   </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && poem.language === 'urdu' && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                         {poem.contentHindi && poem.language === 'hindi' && (
//                           <p className="text-xs text-gray-400 mt-1 line-clamp-1">
//                             {poem.contentHindi.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
//                         {getLanguageDisplay(poem.language)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {/* Transliteration Button */}
//                         <button
//                           onClick={() => generateTransliteration(poem)}
//                           disabled={generatingTransliteration === poem._id}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             poem.transliteration && poem.transliteration.length > 0
//                               ? 'text-green-600 hover:bg-green-100'
//                               : 'text-blue-600 hover:bg-blue-100'
//                           }`}
//                           title={poem.transliteration && poem.transliteration.length > 0 ? 'Transliteration exists' : 'Generate Transliteration'}
//                         >
//                           {generatingTransliteration === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Mic className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         {/* AI Analysis Button */}
//                         <button
//                           onClick={() => handleAIAnalysis(poem)}
//                           disabled={analyzingPoemId === poem._id}
//                           className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
//                           title="AI Analysis"
//                         >
//                           {analyzingPoemId === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Brain className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Language Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Language <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="language"
//                     value={formData.language}
//                     onChange={handleLanguageChange}
//                     className="input-field"
//                   >
//                     <option value="urdu">Urdu (اردو)</option>
//                     <option value="hindi">Hindi (हिन्दी)</option>
//                     <option value="english">English</option>
//                   </select>
//                 </div>

//                 {/* Content - Urdu Script */}
//                 {formData.language === 'urdu' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content (Urdu Script) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="content"
//                       value={formData.content}
//                       onChange={handleInputChange}
//                       className="input-field h-40 font-urdu"
//                       dir="rtl"
//                       placeholder="دل کی باتیں کہاں کہی جائیں..."
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Example: دلِ ناداں تجھے ہوا کیا ہے</p>
//                   </div>
//                 )}

//                 {/* Content - Hindi/Devanagari Script */}
//                 {formData.language === 'hindi' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content (Devanagari Script) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="contentHindi"
//                       value={formData.contentHindi}
//                       onChange={handleInputChange}
//                       className="input-field h-40 font-hindi"
//                       dir="ltr"
//                       placeholder="दिल की बातें कहाँ कही जाएँ..."
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Example: दिल की बातें कहाँ कही जाएँ</p>
//                   </div>
//                 )}

//                 {/* Content - English */}
//                 {formData.language === 'english' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content (English) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="content"
//                       value={formData.content}
//                       onChange={handleInputChange}
//                       className="input-field h-40"
//                       dir="ltr"
//                       placeholder="Enter English poem..."
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Example: The moon shines bright in the dark night sky</p>
//                   </div>
//                 )}

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Roman Script - Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Roman/English script for readers who can't read the original script..."
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Can be auto-generated later using the transliteration button
//                   </p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;























// // client/src/pages/admin/PoetryCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import aiAPI from '../../api/aiAPI';
// import toast from 'react-hot-toast';
// import AIGenerator from '../../components/ai/AIGenerator';
// import VoiceInput from '../../components/ai/VoiceInput';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterLanguage, setFilterLanguage] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [showAIGenerator, setShowAIGenerator] = useState(false);
//   const [remainingAILimit, setRemainingAILimit] = useState(null);
//   const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
//   const [generatingTransliteration, setGeneratingTransliteration] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     contentHindi: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false
//   });

//   // Fetch AI usage stats
//   const fetchAIUsage = useCallback(async () => {
//     try {
//       const response = await aiAPI.getUsageStats();
//       if (response.success) {
//         setRemainingAILimit(response.data.remainingToday);
//       }
//     } catch (error) {
//       console.error('Failed to fetch AI usage:', error);
//     }
//   }, []);

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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Handle language change - CRITICAL FIX: Reset content fields when language changes
//   const handleLanguageChange = (e) => {
//     const language = e.target.value;
//     setFormData(prev => ({ 
//       ...prev, 
//       language,
//       // Clear content fields when switching languages
//       content: language === 'urdu' ? prev.content : '',
//       contentHindi: language === 'hindi' ? prev.contentHindi : ''
//     }));
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterLanguage !== 'all' && { language: filterLanguage }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterLanguage, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//     fetchAIUsage();
//   }, [fetchAuthors, fetchPoems, fetchAIUsage]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     // Validate content based on language
//     if (formData.language === 'urdu' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter Urdu poem content');
//       return;
//     }
    
//     if (formData.language === 'hindi' && (!formData.contentHindi || !formData.contentHindi.trim())) {
//       toast.error('Please enter Hindi poem content');
//       return;
//     }
    
//     if (formData.language === 'english' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter English poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.language === 'urdu' ? formData.content.trim() : (formData.contentUrdu || ''),
//       contentHindi: formData.language === 'hindi' ? formData.contentHindi.trim() : (formData.contentHindi || ''),
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: formData.language,
//       isPublished: formData.isPublished
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//       fetchAIUsage();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       contentHindi: poem.contentHindi || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: poem.language || 'urdu',
//       isPublished: poem.isPublished || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const handleAIAnalysis = async (poem) => {
//     setAnalyzingPoemId(poem._id);
//     try {
//       const response = await aiAPI.analyzePoemBySlug(poem.slug);
//       if (response.success) {
//         toast.success(`Analysis complete! Provider: ${response.data.provider}`);
//         poem.aiAnalysis = response.data.analysis;
//         setPoems([...poems]);
//       }
//     } catch (error) {
//       toast.error('Failed to analyze poem');
//     } finally {
//       setAnalyzingPoemId(null);
//     }
//   };

//   // Generate Transliteration for a single poem
//   const generateTransliteration = async (poem) => {
//     if (!poem || generatingTransliteration === poem._id) return;
    
//     setGeneratingTransliteration(poem._id);
//     try {
//       const result = await poemAPI.generateTransliteration(poem._id);
      
//       if (result.success) {
//         const updatedPoems = poems.map(p => 
//           p._id === poem._id ? { ...p, transliteration: result.data } : p
//         );
//         setPoems(updatedPoems);
//         toast.success(`Transliteration generated successfully!`);
//       } else {
//         toast.error(result.error || 'Failed to generate transliteration');
//       }
//     } catch (error) {
//       console.error('Transliteration error:', error);
//       toast.error('Failed to generate transliteration');
//     } finally {
//       setGeneratingTransliteration(null);
//     }
//   };

//   // Batch generate transliterations for all poems
//   const batchGenerateTransliterations = async () => {
//     if (!window.confirm('Generate transliterations for all poems missing it? This may take a few minutes.')) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const result = await poemAPI.batchGenerateTransliterations(100);
      
//       if (result.success) {
//         toast.success(`Generated ${result.generated} transliterations out of ${result.total} poems`);
//         fetchPoems();
//       } else {
//         toast.error(result.error || 'Failed to batch generate');
//       }
//     } catch (error) {
//       console.error('Batch error:', error);
//       toast.error('Failed to batch generate transliterations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       contentHindi: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterLanguage('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Get language display name
//   const getLanguageDisplay = (lang) => {
//     const languages = {
//       urdu: '🇵🇰 Urdu',
//       hindi: '🇮🇳 Hindi',
//       english: '🇬🇧 English'
//     };
//     return languages[lang] || lang;
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* AI Generator Modal */}
//       <AnimatePresence>
//         {showAIGenerator && (
//           <AIGenerator
//             onGenerated={(generated) => {
//               if (generated && setFormData) {
//                 setFormData(prev => ({
//                   ...prev,
//                   content: generated.content,
//                   contentHindi: generated.contentHindi || '',
//                   transliteration: generated.transliteration || '',
//                   translation: generated.translation?.english || ''
//                 }));
//                 setShowAIGenerator(false);
//                 toast.success('AI generated content added to form!');
//               }
//             }}
//             onClose={() => setShowAIGenerator(false)}
//             existingFormData={formData}
//             setFormData={setFormData}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <div className="flex flex-wrap gap-3">
//           {remainingAILimit !== null && (
//             <div className="flex items-center">
//               <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                 remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
//                 remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 🤖 AI: {remainingAILimit} left today
//               </span>
//             </div>
//           )}
          
//           <button
//             onClick={batchGenerateTransliterations}
//             className="btn-secondary inline-flex items-center gap-2"
//             disabled={loading}
//           >
//             <Mic className="h-5 w-5" />
//             <span>Generate All Transliterations</span>
//           </button>
          
//           <button
//             onClick={() => setShowAIGenerator(true)}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Sparkles className="h-5 w-5" />
//             <span>AI Generate</span>
//           </button>
          
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//             disabled={authors.length === 0}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Poem</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <VoiceInput 
//           onResult={(text) => setSearchQuery(text)} 
//           language="ur-PK"
//         />
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterLanguage}
//           onChange={(e) => setFilterLanguage(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Languages</option>
//           <option value="urdu">Urdu (اردو)</option>
//           <option value="hindi">Hindi (हिन्दी)</option>
//           <option value="english">English</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                    </td>
//                   </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && poem.language === 'urdu' && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                         {poem.contentHindi && poem.language === 'hindi' && (
//                           <p className="text-xs text-gray-400 mt-1 line-clamp-1">
//                             {poem.contentHindi.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
//                         {getLanguageDisplay(poem.language)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {/* Transliteration Button */}
//                         <button
//                           onClick={() => generateTransliteration(poem)}
//                           disabled={generatingTransliteration === poem._id}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             poem.transliteration && poem.transliteration.length > 0
//                               ? 'text-green-600 hover:bg-green-100'
//                               : 'text-blue-600 hover:bg-blue-100'
//                           }`}
//                           title={poem.transliteration && poem.transliteration.length > 0 ? 'Transliteration exists' : 'Generate Transliteration'}
//                         >
//                           {generatingTransliteration === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Mic className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         {/* AI Analysis Button */}
//                         <button
//                           onClick={() => handleAIAnalysis(poem)}
//                           disabled={analyzingPoemId === poem._id}
//                           className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
//                           title="AI Analysis"
//                         >
//                           {analyzingPoemId === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Brain className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Language Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Language <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="language"
//                     value={formData.language}
//                     onChange={handleLanguageChange}
//                     className="input-field"
//                   >
//                     <option value="urdu">Urdu (اردو)</option>
//                     <option value="hindi">Hindi (हिन्दी)</option>
//                     <option value="english">English</option>
//                   </select>
//                 </div>

//                 {/* Content - Urdu Script */}
//                 {(formData.language === 'urdu' || formData.language === 'english') && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content {formData.language === 'urdu' ? '(Urdu Script)' : '(English)'} <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="content"
//                       value={formData.content}
//                       onChange={handleInputChange}
//                       className={`input-field h-40 ${formData.language === 'urdu' ? 'font-urdu' : ''}`}
//                       dir={formData.language === 'urdu' ? 'rtl' : 'ltr'}
//                       placeholder={formData.language === 'urdu' ? 'دل کی باتیں کہاں کہی جائیں...' : 'Enter poem content...'}
//                       required={formData.language === 'urdu' || formData.language === 'english'}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       {formData.language === 'urdu' ? 'Example: دلِ ناداں تجھے ہوا کیا ہے' : 'Example: The moon shines bright in the dark night sky'}
//                     </p>
//                   </div>
//                 )}

//                 {/* Content - Hindi/Devanagari Script */}
//                 {formData.language === 'hindi' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content (Devanagari Script) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="contentHindi"
//                       value={formData.contentHindi}
//                       onChange={handleInputChange}
//                       className="input-field h-40 font-hindi"
//                       dir="ltr"
//                       placeholder="दिल की बातें कहाँ कही जाएँ..."
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Example: दिल की बातें कहाँ कही जाएँ</p>
//                   </div>
//                 )}

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Roman Script - Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Roman/English script for readers who can't read the original script..."
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Can be auto-generated later using the transliteration button
//                   </p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;





















// // client/src/pages/admin/PoetryCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
//   Loader2, AlertTriangle, Copy, Check, RefreshCw,
//   Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic,
//   Settings
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import aiAPI from '../../api/aiAPI';
// import toast from 'react-hot-toast';
// import AIGenerator from '../../components/ai/AIGenerator';
// import VoiceInput from '../../components/ai/VoiceInput';

// const PoetryCMSPage = () => {
//   const [poems, setPoems] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterGenre, setFilterGenre] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterLanguage, setFilterLanguage] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPoem, setEditingPoem] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [showAIGenerator, setShowAIGenerator] = useState(false);
//   const [remainingAILimit, setRemainingAILimit] = useState(null);
//   const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
//   const [generatingTransliteration, setGeneratingTransliteration] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     content: '',
//     contentHindi: '',
//     transliteration: '',
//     translation: '',
//     author: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     isPublished: false,
//     autoTransliterate: true  // NEW: Auto-transliteration toggle
//   });

//   // Fetch AI usage stats
//   const fetchAIUsage = useCallback(async () => {
//     try {
//       const response = await aiAPI.getUsageStats();
//       if (response.success) {
//         setRemainingAILimit(response.data.remainingToday);
//       }
//     } catch (error) {
//       console.error('Failed to fetch AI usage:', error);
//     }
//   }, []);

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
//       const response = await poemAPI.getPoems({ limit: 1000 });
//       let poemsList = [];
//       if (response?.data?.data) {
//         poemsList = response.data.data;
//       } else if (response?.data) {
//         poemsList = response.data;
//       } else if (Array.isArray(response)) {
//         poemsList = response;
//       } else {
//         poemsList = [];
//       }

//       const exists = poemsList.some(poem => 
//         poem.slug === slug && poem._id !== excludeId
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

//   // Handle title change to auto-generate slug
//   const handleTitleChange = async (e) => {
//     const title = e.target.value;
//     const newSlug = generateSlugFromTitle(title);
//     setFormData(prev => ({
//       ...prev,
//       title: title,
//       slug: newSlug
//     }));
//     if (newSlug) {
//       await checkSlugAvailability(newSlug, editingPoem?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingPoem?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingPoem?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Handle language change
//   const handleLanguageChange = (e) => {
//     const language = e.target.value;
//     setFormData(prev => ({ 
//       ...prev, 
//       language,
//       content: language === 'urdu' ? prev.content : '',
//       contentHindi: language === 'hindi' ? prev.contentHindi : ''
//     }));
//   };

//   // Fetch authors from API
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
//       } else if (response?.authors) {
//         authorsList = response.authors;
//       } else {
//         authorsList = [];
//       }
      
//       setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
//       if (authorsList.length === 0) {
//         toast.error('No authors found. Please create authors first.');
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//       toast.error('Failed to load authors');
//       setAuthors([]);
//     } finally {
//       setAuthorsLoading(false);
//     }
//   }, []);

//   // Fetch poems with filters
//   const fetchPoems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterGenre !== 'all' && { genre: filterGenre }),
//         ...(filterLanguage !== 'all' && { language: filterLanguage }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };

//       const response = await poemAPI.getPoems(params);
      
//       let poemsData = [];
//       if (response?.data?.data) {
//         poemsData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         poemsData = response.data;
//       } else if (Array.isArray(response)) {
//         poemsData = response;
//       } else if (response?.poems) {
//         poemsData = response.poems;
//       } else {
//         poemsData = [];
//       }
      
//       setPoems(Array.isArray(poemsData) ? poemsData : []);
//     } catch (error) {
//       console.error('Error fetching poems:', error);
//       toast.error('Failed to load poems');
//       setPoems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterLanguage, filterStatus]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchPoems();
//     fetchAIUsage();
//   }, [fetchAuthors, fetchPoems, fetchAIUsage]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a poem title');
//       return;
//     }

//     // Validate content based on language
//     if (formData.language === 'urdu' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter Urdu poem content');
//       return;
//     }
    
//     if (formData.language === 'hindi' && (!formData.contentHindi || !formData.contentHindi.trim())) {
//       toast.error('Please enter Hindi poem content');
//       return;
//     }
    
//     if (formData.language === 'english' && (!formData.content || !formData.content.trim())) {
//       toast.error('Please enter English poem content');
//       return;
//     }

//     if (!formData.author) {
//       toast.error('Please select an author');
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

//     const poemData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       content: formData.content.trim(),
//       contentUrdu: formData.language === 'urdu' ? formData.content.trim() : (formData.contentUrdu || ''),
//       contentHindi: formData.language === 'hindi' ? formData.contentHindi.trim() : (formData.contentHindi || ''),
//       transliteration: formData.transliteration?.trim() || '',
//       translation: {
//         english: formData.translation?.trim() || ''
//       },
//       author: formData.author,
//       genre: formData.genre,
//       language: formData.language,
//       isPublished: formData.isPublished,
//       autoTransliterate: formData.autoTransliterate  // Include auto-transliteration setting
//     };

//     setLoading(true);
//     try {
//       if (editingPoem) {
//         await poemAPI.updatePoem(editingPoem.slug, poemData);
//         toast.success('Poem updated successfully');
//       } else {
//         await poemAPI.createPoem(poemData);
//         toast.success('Poem created successfully');
//       }
//       resetModal();
//       fetchPoems();
//       fetchAIUsage();
//     } catch (error) {
//       console.error('Error saving poem:', error);
//       const message = error.response?.data?.message || 'Failed to save poem';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await poemAPI.deletePoem(slug);
//       toast.success('Poem deleted successfully');
//       fetchPoems();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (poem) => {
//     setLoading(true);
//     try {
//       await poemAPI.updatePoem(poem.slug, {
//         ...poem,
//         isPublished: !poem.isPublished
//       });
//       toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
//       fetchPoems();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (poem) => {
//     setEditingPoem(poem);
//     setFormData({
//       title: poem.title || '',
//       slug: poem.slug || '',
//       content: poem.content || '',
//       contentHindi: poem.contentHindi || '',
//       transliteration: poem.transliteration || '',
//       translation: poem.translation?.english || '',
//       author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
//       genre: poem.genre || 'ghazal',
//       language: poem.language || 'urdu',
//       isPublished: poem.isPublished || false,
//       autoTransliterate: poem.autoTransliterate !== false  // Default to true if not set
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const handleAIAnalysis = async (poem) => {
//     setAnalyzingPoemId(poem._id);
//     try {
//       const response = await aiAPI.analyzePoemBySlug(poem.slug);
//       if (response.success) {
//         toast.success(`Analysis complete! Provider: ${response.data.provider}`);
//         poem.aiAnalysis = response.data.analysis;
//         setPoems([...poems]);
//       }
//     } catch (error) {
//       toast.error('Failed to analyze poem');
//     } finally {
//       setAnalyzingPoemId(null);
//     }
//   };

//   // Generate Transliteration for a single poem
//   const generateTransliteration = async (poem) => {
//     if (!poem || generatingTransliteration === poem._id) return;
    
//     setGeneratingTransliteration(poem._id);
//     try {
//       const result = await poemAPI.generateTransliteration(poem._id);
      
//       if (result.success) {
//         const updatedPoems = poems.map(p => 
//           p._id === poem._id ? { ...p, transliteration: result.data } : p
//         );
//         setPoems(updatedPoems);
//         toast.success(`Transliteration generated successfully!`);
//       } else {
//         toast.error(result.error || 'Failed to generate transliteration');
//       }
//     } catch (error) {
//       console.error('Transliteration error:', error);
//       toast.error('Failed to generate transliteration');
//     } finally {
//       setGeneratingTransliteration(null);
//     }
//   };

//   // Toggle auto-transliteration for a poem
//   const toggleAutoTransliterate = async (poem) => {
//     try {
//       const newState = !poem.autoTransliterate;
//       const result = await poemAPI.toggleAutoTransliterate(poem._id, newState);
      
//       if (result.success) {
//         const updatedPoems = poems.map(p => 
//           p._id === poem._id ? { ...p, autoTransliterate: result.autoTransliterate } : p
//         );
//         setPoems(updatedPoems);
//         toast.success(`Auto-transliteration ${result.autoTransliterate ? 'enabled' : 'disabled'}`);
//       } else {
//         toast.error(result.error || 'Failed to toggle auto-transliteration');
//       }
//     } catch (error) {
//       console.error('Toggle auto-transliteration error:', error);
//       toast.error('Failed to toggle auto-transliteration');
//     }
//   };

//   // Batch generate transliterations for all poems
//   const batchGenerateTransliterations = async () => {
//     if (!window.confirm('Generate transliterations for all poems missing it? This may take a few minutes.')) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const result = await poemAPI.batchGenerateTransliterations(100);
      
//       if (result.success) {
//         toast.success(`Generated ${result.generated} transliterations out of ${result.total} poems`);
//         fetchPoems();
//       } else {
//         toast.error(result.error || 'Failed to batch generate');
//       }
//     } catch (error) {
//       console.error('Batch error:', error);
//       toast.error('Failed to batch generate transliterations');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingPoem(null);
//     setFormData({
//       title: '',
//       slug: '',
//       content: '',
//       contentHindi: '',
//       transliteration: '',
//       translation: '',
//       author: '',
//       genre: 'ghazal',
//       language: 'urdu',
//       isPublished: false,
//       autoTransliterate: true
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterGenre('all');
//     setFilterLanguage('all');
//     setFilterStatus('all');
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const getAuthorName = (authorId) => {
//     if (typeof authorId === 'object' && authorId?.name) return authorId.name;
//     const author = authors.find(a => a._id === authorId);
//     return author?.name || 'Unknown';
//   };

//   // Get language display name
//   const getLanguageDisplay = (lang) => {
//     const languages = {
//       urdu: '🇵🇰 Urdu',
//       hindi: '🇮🇳 Hindi',
//       english: '🇬🇧 English'
//     };
//     return languages[lang] || lang;
//   };

//   // Show loading state
//   if (authorsLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   // Show warning if no authors exist
//   if (authors.length === 0 && !authorsLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//             <p className="text-gray-500">Manage poems, translations, and metadata</p>
//           </div>
//         </div>
//         <div className="card p-12 text-center">
//           <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
//           <p className="text-gray-500 mb-6">
//             You need to create authors before you can add poems.
//           </p>
//           <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Go to Authors CMS
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* AI Generator Modal */}
//       <AnimatePresence>
//         {showAIGenerator && (
//           <AIGenerator
//             onGenerated={(generated) => {
//               if (generated && setFormData) {
//                 setFormData(prev => ({
//                   ...prev,
//                   content: generated.content,
//                   contentHindi: generated.contentHindi || '',
//                   transliteration: generated.transliteration || '',
//                   translation: generated.translation?.english || ''
//                 }));
//                 setShowAIGenerator(false);
//                 toast.success('AI generated content added to form!');
//               }
//             }}
//             onClose={() => setShowAIGenerator(false)}
//             existingFormData={formData}
//             setFormData={setFormData}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
//           <p className="text-gray-500">Manage poems, translations, and metadata</p>
//         </div>
//         <div className="flex flex-wrap gap-3">
//           {remainingAILimit !== null && (
//             <div className="flex items-center">
//               <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                 remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
//                 remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 🤖 AI: {remainingAILimit} left today
//               </span>
//             </div>
//           )}
          
//           <button
//             onClick={batchGenerateTransliterations}
//             className="btn-secondary inline-flex items-center gap-2"
//             disabled={loading}
//           >
//             <Mic className="h-5 w-5" />
//             <span>Generate All Transliterations</span>
//           </button>
          
//           <button
//             onClick={() => setShowAIGenerator(true)}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Sparkles className="h-5 w-5" />
//             <span>AI Generate</span>
//           </button>
          
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//             disabled={authors.length === 0}
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Poem</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Poems</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {poems.filter(p => p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {poems.filter(p => !p.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
//           <p className="text-sm text-gray-500">Authors</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search poems by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <VoiceInput 
//           onResult={(text) => setSearchQuery(text)} 
//           language="ur-PK"
//         />
//         <select
//           value={filterGenre}
//           onChange={(e) => setFilterGenre(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Genres</option>
//           <option value="ghazal">Ghazal</option>
//           <option value="nazm">Nazm</option>
//           <option value="sher">Sher</option>
//           <option value="rubai">Rubai</option>
//           <option value="rekhti">Rekhti</option>
//           <option value="qasida">Qasida</option>
//           <option value="marsiya">Marsiya</option>
//           <option value="other">Other</option>
//         </select>
//         <select
//           value={filterLanguage}
//           onChange={(e) => setFilterLanguage(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Languages</option>
//           <option value="urdu">Urdu (اردو)</option>
//           <option value="hindi">Hindi (हिन्दी)</option>
//           <option value="english">English</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Poems Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading poems...</p>
//                     </td>
//                 </tr>
//               ) : poems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
//                     <p>No poems found.</p>
//                     {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all poems
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 poems.map((poem) => (
//                   <motion.tr
//                     key={poem._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{poem.title}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                             slug: {poem.slug}
//                           </code>
//                           <button
//                             onClick={() => handleCopySlug(poem.slug)}
//                             className="p-1 rounded hover:bg-gray-200 transition-colors"
//                             title="Copy link to clipboard"
//                           >
//                             {copiedSlug === poem.slug ? (
//                               <Check className="h-3 w-3 text-green-600" />
//                             ) : (
//                               <Copy className="h-3 w-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                         {poem.contentUrdu && poem.language === 'urdu' && (
//                           <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
//                             {poem.contentUrdu.substring(0, 50)}...
//                           </p>
//                         )}
//                         {poem.contentHindi && poem.language === 'hindi' && (
//                           <p className="text-xs text-gray-400 mt-1 line-clamp-1">
//                             {poem.contentHindi.substring(0, 50)}...
//                           </p>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(poem.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
//                         {poem.genre}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
//                         {getLanguageDisplay(poem.language)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(poem)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           poem.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {poem.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1 text-xs text-gray-500">
//                         <div className="flex items-center gap-2">
//                           <Eye className="h-3 w-3" />
//                           <span>{poem.stats?.views?.toLocaleString() || 0}</span>
//                           <Heart className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Bookmark className="h-3 w-3" />
//                           <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                           <MessageCircle className="h-3 w-3 ml-2" />
//                           <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(poem.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         {/* Auto-Transliteration Toggle Button */}
//                         <button
//                           onClick={() => toggleAutoTransliterate(poem)}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             poem.autoTransliterate !== false
//                               ? 'text-green-600 hover:bg-green-100'
//                               : 'text-gray-400 hover:bg-gray-100'
//                           }`}
//                           title={poem.autoTransliterate !== false ? 'Auto-transliteration ON' : 'Auto-transliteration OFF'}
//                         >
//                           <Settings className="h-4 w-4" />
//                         </button>
                        
//                         {/* Transliteration Button */}
//                         <button
//                           onClick={() => generateTransliteration(poem)}
//                           disabled={generatingTransliteration === poem._id}
//                           className={`p-1.5 rounded-lg transition-colors ${
//                             poem.transliteration && poem.transliteration.length > 0
//                               ? 'text-green-600 hover:bg-green-100'
//                               : 'text-blue-600 hover:bg-blue-100'
//                           }`}
//                           title={poem.transliteration && poem.transliteration.length > 0 ? 'Transliteration exists' : 'Generate Transliteration'}
//                         >
//                           {generatingTransliteration === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Mic className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         {/* AI Analysis Button */}
//                         <button
//                           onClick={() => handleAIAnalysis(poem)}
//                           disabled={analyzingPoemId === poem._id}
//                           className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
//                           title="AI Analysis"
//                         >
//                           {analyzingPoemId === poem._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Brain className="h-4 w-4" />
//                           )}
//                         </button>
                        
//                         <Link
//                           to={`/poem/${poem.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Poem"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(poem)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Poem"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(poem.slug, poem.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Poem"
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
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.page >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.page - 2 + i;
//                   }
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
//                       className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                         pagination.page === pageNum
//                           ? 'bg-primary-600 text-white'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages || loading}
//                 className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Poem Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPoem ? 'Edit Poem' : 'Add New Poem'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleTitleChange}
//                     className="input-field"
//                     placeholder="Enter poem title"
//                     required
//                   />
//                 </div>

//                 {/* Slug with auto-generation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Slug (URL)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleSlugChange}
//                       className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                       placeholder="poem-slug"
//                     />
//                     <button
//                       type="button"
//                       onClick={regenerateSlug}
//                       className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Regenerate slug from title"
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </button>
//                   </div>
//                   {!slugAvailable && (
//                     <p className="text-xs text-red-500 mt-1">
//                       This slug is already taken. Please choose a different one.
//                     </p>
//                   )}
//                   {checkingSlug && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Checking availability...
//                     </p>
//                   )}
//                   {slugAvailable && formData.slug && !checkingSlug && (
//                     <p className="text-xs text-green-500 mt-1">
//                       ✓ Slug is available
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
//                   </p>
//                 </div>

//                 {/* Author */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Author <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     required
//                   >
//                     <option value="">Select author</option>
//                     {authors.map((author) => (
//                       <option key={author._id} value={author._id}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Genre */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//                   <select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleInputChange}
//                     className="input-field"
//                   >
//                     <option value="ghazal">Ghazal</option>
//                     <option value="nazm">Nazm</option>
//                     <option value="sher">Sher</option>
//                     <option value="rubai">Rubai</option>
//                     <option value="rekhti">Rekhti</option>
//                     <option value="qasida">Qasida</option>
//                     <option value="marsiya">Marsiya</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Language Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Language <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="language"
//                     value={formData.language}
//                     onChange={handleLanguageChange}
//                     className="input-field"
//                   >
//                     <option value="urdu">Urdu (اردو)</option>
//                     <option value="hindi">Hindi (हिन्दी)</option>
//                     <option value="english">English</option>
//                   </select>
//                 </div>

//                 {/* Content - Urdu Script */}
//                 {(formData.language === 'urdu' || formData.language === 'english') && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content {formData.language === 'urdu' ? '(Urdu Script)' : '(English)'} <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="content"
//                       value={formData.content}
//                       onChange={handleInputChange}
//                       className={`input-field h-40 ${formData.language === 'urdu' ? 'font-urdu' : ''}`}
//                       dir={formData.language === 'urdu' ? 'rtl' : 'ltr'}
//                       placeholder={formData.language === 'urdu' ? 'دل کی باتیں کہاں کہی جائیں...' : 'Enter poem content...'}
//                       required={formData.language === 'urdu' || formData.language === 'english'}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       {formData.language === 'urdu' ? 'Example: دلِ ناداں تجھے ہوا کیا ہے' : 'Example: The moon shines bright in the dark night sky'}
//                     </p>
//                   </div>
//                 )}

//                 {/* Content - Hindi/Devanagari Script */}
//                 {formData.language === 'hindi' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Content (Devanagari Script) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="contentHindi"
//                       value={formData.contentHindi}
//                       onChange={handleInputChange}
//                       className="input-field h-40 font-hindi"
//                       dir="ltr"
//                       placeholder="दिल की बातें कहाँ कही जाएँ..."
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Example: दिल की बातें कहाँ कही जाएँ</p>
//                   </div>
//                 )}

//                 {/* Transliteration */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transliteration (Roman Script - Optional)
//                   </label>
//                   <textarea
//                     name="transliteration"
//                     value={formData.transliteration}
//                     onChange={handleInputChange}
//                     className="input-field h-20"
//                     placeholder="Roman/English script for readers who can't read the original script..."
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Can be auto-generated later using the transliteration button
//                   </p>
//                 </div>

//                 {/* Translation */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     English Translation (Optional)
//                   </label>
//                   <textarea
//                     name="translation"
//                     value={formData.translation}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter English translation..."
//                   />
//                 </div>

//                 {/* Auto-Transliteration Toggle */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="autoTransliterate"
//                       checked={formData.autoTransliterate}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">
//                       Auto-generate transliteration (Urdu/Hindi → Roman)
//                     </span>
//                   </label>
//                 </div>

//                 {/* Publish */}
//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isPublished"
//                       checked={formData.isPublished}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                     />
//                     <span className="text-sm text-gray-700">Publish immediately</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable || checkingSlug}
//                     className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? (
//                       <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//                     ) : (
//                       editingPoem ? 'Update Poem' : 'Create Poem'
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={resetModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
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

// export default PoetryCMSPage;
















// client/src/pages/admin/PoetryCMSPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, 
  Loader2, AlertTriangle, Copy, Check, RefreshCw,
  Heart, Bookmark, MessageCircle, Sparkles, Brain, Mic,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import poemAPI from '../../api/poemAPI';
import authorAPI from '../../api/authorAPI';
import aiAPI from '../../api/aiAPI';
import toast from 'react-hot-toast';
import AIGenerator from '../../components/ai/AIGenerator';
import VoiceInput from '../../components/ai/VoiceInput';

const PoetryCMSPage = () => {
  const [poems, setPoems] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPoem, setEditingPoem] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [remainingAILimit, setRemainingAILimit] = useState(null);
  const [analyzingPoemId, setAnalyzingPoemId] = useState(null);
  const [generatingTransliteration, setGeneratingTransliteration] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    contentHindi: '',
    transliteration: '',
    translation: '',
    author: '',
    genre: 'ghazal',
    language: 'urdu',
    isPublished: false,
    autoTransliterate: true
  });

  // Fetch AI usage stats
  const fetchAIUsage = useCallback(async () => {
    try {
      const response = await aiAPI.getUsageStats();
      if (response.success) {
        setRemainingAILimit(response.data.remainingToday);
      }
    } catch (error) {
      console.error('Failed to fetch AI usage:', error);
    }
  }, []);

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
      const response = await poemAPI.getPoems({ limit: 1000 });
      let poemsList = [];
      if (response?.data?.data) {
        poemsList = response.data.data;
      } else if (response?.data) {
        poemsList = response.data;
      } else if (Array.isArray(response)) {
        poemsList = response;
      } else {
        poemsList = [];
      }

      const exists = poemsList.some(poem => 
        poem.slug === slug && poem._id !== excludeId
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
      await checkSlugAvailability(newSlug, editingPoem?._id);
    }
  };

  // Handle slug manual edit
  const handleSlugChange = async (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({ ...prev, slug }));
    await checkSlugAvailability(slug, editingPoem?._id);
  };

  // Regenerate slug from title
  const regenerateSlug = async () => {
    const newSlug = generateSlugFromTitle(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
    await checkSlugAvailability(newSlug, editingPoem?._id);
    toast.success('Slug regenerated from title');
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      language,
      content: language === 'urdu' ? prev.content : '',
      contentHindi: language === 'hindi' ? prev.contentHindi : ''
    }));
  };

  // Fetch authors from API
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
      } else if (response?.authors) {
        authorsList = response.authors;
      } else {
        authorsList = [];
      }
      
      setAuthors(Array.isArray(authorsList) ? authorsList : []);
      
      if (authorsList.length === 0) {
        toast.error('No authors found. Please create authors first.');
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
      toast.error('Failed to load authors');
      setAuthors([]);
    } finally {
      setAuthorsLoading(false);
    }
  }, []);

  // Fetch poems with filters
  const fetchPoems = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filterGenre !== 'all' && { genre: filterGenre }),
        ...(filterLanguage !== 'all' && { language: filterLanguage }),
        ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
      };

      const response = await poemAPI.getPoems(params);
      
      let poemsData = [];
      if (response?.data?.data) {
        poemsData = response.data.data;
        if (response.data.pagination) setPagination(response.data.pagination);
      } else if (response?.data) {
        poemsData = response.data;
      } else if (Array.isArray(response)) {
        poemsData = response;
      } else if (response?.poems) {
        poemsData = response.poems;
      } else {
        poemsData = [];
      }
      
      setPoems(Array.isArray(poemsData) ? poemsData : []);
    } catch (error) {
      console.error('Error fetching poems:', error);
      toast.error('Failed to load poems');
      setPoems([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchQuery, filterGenre, filterLanguage, filterStatus]);

  useEffect(() => {
    fetchAuthors();
    fetchPoems();
    fetchAIUsage();
  }, [fetchAuthors, fetchPoems, fetchAIUsage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ============================================
  // UPDATED: handleSubmit with auto-transliteration
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.title.trim()) {
      toast.error('Please enter a poem title');
      return;
    }

    // Validate content based on language
    if (formData.language === 'urdu' && (!formData.content || !formData.content.trim())) {
      toast.error('Please enter Urdu poem content');
      return;
    }
    
    if (formData.language === 'hindi' && (!formData.contentHindi || !formData.contentHindi.trim())) {
      toast.error('Please enter Hindi poem content');
      return;
    }
    
    if (formData.language === 'english' && (!formData.content || !formData.content.trim())) {
      toast.error('Please enter English poem content');
      return;
    }

    if (!formData.author) {
      toast.error('Please select an author');
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

    const poemData = {
      title: formData.title.trim(),
      slug: formData.slug,
      content: formData.content.trim(),
      contentUrdu: formData.language === 'urdu' ? formData.content.trim() : (formData.contentUrdu || ''),
      contentHindi: formData.language === 'hindi' ? formData.contentHindi.trim() : (formData.contentHindi || ''),
      transliteration: formData.transliteration?.trim() || '',
      translation: {
        english: formData.translation?.trim() || ''
      },
      author: formData.author,
      genre: formData.genre,
      language: formData.language,
      isPublished: formData.isPublished,
      autoTransliterate: formData.autoTransliterate
    };

    setLoading(true);
    try {
      let savedPoemId = null;
      
      if (editingPoem) {
        await poemAPI.updatePoem(editingPoem.slug, poemData);
        savedPoemId = editingPoem._id;
        toast.success('Poem updated successfully');
      } else {
        const response = await poemAPI.createPoem(poemData);
        savedPoemId = response.data?.data?._id || response.data?._id;
        toast.success('Poem created successfully');
      }
      
      // Auto-generate transliteration if enabled and language is Urdu/Hindi
      if (formData.autoTransliterate && savedPoemId && (formData.language === 'urdu' || formData.language === 'hindi')) {
        console.log('🔄 Auto-generating transliteration for poem ID:', savedPoemId);
        const translitResult = await poemAPI.autoTransliteratePoem(savedPoemId, true);
        if (translitResult.success) {
          console.log('✅ Auto-transliteration generated using:', translitResult.method);
          toast.success('Transliteration auto-generated!');
        } else if (!translitResult.skipped) {
          console.log('⚠️ Auto-transliteration failed:', translitResult.error);
        }
      }
      
      resetModal();
      fetchPoems();
      fetchAIUsage();
    } catch (error) {
      console.error('Error saving poem:', error);
      const message = error.response?.data?.message || 'Failed to save poem';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await poemAPI.deletePoem(slug);
      toast.success('Poem deleted successfully');
      fetchPoems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete poem');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (poem) => {
    setLoading(true);
    try {
      await poemAPI.updatePoem(poem.slug, {
        ...poem,
        isPublished: !poem.isPublished
      });
      toast.success(`Poem ${!poem.isPublished ? 'published' : 'unpublished'}`);
      fetchPoems();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (poem) => {
    setEditingPoem(poem);
    setFormData({
      title: poem.title || '',
      slug: poem.slug || '',
      content: poem.content || '',
      contentHindi: poem.contentHindi || '',
      transliteration: poem.transliteration || '',
      translation: poem.translation?.english || '',
      author: typeof poem.author === 'object' ? poem.author?._id : poem.author || '',
      genre: poem.genre || 'ghazal',
      language: poem.language || 'urdu',
      isPublished: poem.isPublished || false,
      autoTransliterate: poem.autoTransliterate !== false
    });
    setSlugAvailable(true);
    setShowAddModal(true);
  };

  const handleCopySlug = async (slug) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/poem/${slug}`);
      setCopiedSlug(slug);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleAIAnalysis = async (poem) => {
    setAnalyzingPoemId(poem._id);
    try {
      const response = await aiAPI.analyzePoemBySlug(poem.slug);
      if (response.success) {
        toast.success(`Analysis complete! Provider: ${response.data.provider}`);
        poem.aiAnalysis = response.data.analysis;
        setPoems([...poems]);
      }
    } catch (error) {
      toast.error('Failed to analyze poem');
    } finally {
      setAnalyzingPoemId(null);
    }
  };

  // Generate Transliteration for a single poem
  const generateTransliteration = async (poem) => {
    if (!poem || generatingTransliteration === poem._id) return;
    
    setGeneratingTransliteration(poem._id);
    try {
      const result = await poemAPI.generateTransliteration(poem._id);
      
      if (result.success) {
        const updatedPoems = poems.map(p => 
          p._id === poem._id ? { ...p, transliteration: result.data } : p
        );
        setPoems(updatedPoems);
        toast.success(`Transliteration generated successfully!`);
      } else {
        toast.error(result.error || 'Failed to generate transliteration');
      }
    } catch (error) {
      console.error('Transliteration error:', error);
      toast.error('Failed to generate transliteration');
    } finally {
      setGeneratingTransliteration(null);
    }
  };

  // Toggle auto-transliteration for a poem
  const toggleAutoTransliterate = async (poem) => {
    try {
      const newState = !poem.autoTransliterate;
      const result = await poemAPI.toggleAutoTransliterate(poem._id, newState);
      
      if (result.success) {
        const updatedPoems = poems.map(p => 
          p._id === poem._id ? { ...p, autoTransliterate: result.autoTransliterate } : p
        );
        setPoems(updatedPoems);
        toast.success(`Auto-transliteration ${result.autoTransliterate ? 'enabled' : 'disabled'}`);
      } else {
        toast.error(result.error || 'Failed to toggle auto-transliteration');
      }
    } catch (error) {
      console.error('Toggle auto-transliteration error:', error);
      toast.error('Failed to toggle auto-transliteration');
    }
  };

  // Batch generate transliterations for all poems
  const batchGenerateTransliterations = async () => {
    if (!window.confirm('Generate transliterations for all poems missing it? This may take a few minutes.')) {
      return;
    }
    
    setLoading(true);
    try {
      const result = await poemAPI.batchAutoTransliterate(100);
      
      if (result.success) {
        toast.success(`Auto-transliterated ${result.generated} poems out of ${result.total}`);
        fetchPoems();
      } else {
        toast.error(result.error || 'Failed to batch generate');
      }
    } catch (error) {
      console.error('Batch error:', error);
      toast.error('Failed to batch generate transliterations');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingPoem(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      contentHindi: '',
      transliteration: '',
      translation: '',
      author: '',
      genre: 'ghazal',
      language: 'urdu',
      isPublished: false,
      autoTransliterate: true
    });
    setSlugAvailable(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterGenre('all');
    setFilterLanguage('all');
    setFilterStatus('all');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const getAuthorName = (authorId) => {
    if (typeof authorId === 'object' && authorId?.name) return authorId.name;
    const author = authors.find(a => a._id === authorId);
    return author?.name || 'Unknown';
  };

  // Get language display name
  const getLanguageDisplay = (lang) => {
    const languages = {
      urdu: '🇵🇰 Urdu',
      hindi: '🇮🇳 Hindi',
      english: '🇬🇧 English'
    };
    return languages[lang] || lang;
  };

  // Show loading state
  if (authorsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Show warning if no authors exist
  if (authors.length === 0 && !authorsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
            <p className="text-gray-500">Manage poems, translations, and metadata</p>
          </div>
        </div>
        <div className="card p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Found</h2>
          <p className="text-gray-500 mb-6">
            You need to create authors before you can add poems.
          </p>
          <Link to="/admin/authors" className="btn-primary inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Go to Authors CMS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Generator Modal */}
      <AnimatePresence>
        {showAIGenerator && (
          <AIGenerator
            onGenerated={(generated) => {
              if (generated && setFormData) {
                setFormData(prev => ({
                  ...prev,
                  content: generated.content,
                  contentHindi: generated.contentHindi || '',
                  transliteration: generated.transliteration || '',
                  translation: generated.translation?.english || ''
                }));
                setShowAIGenerator(false);
                toast.success('AI generated content added to form!');
              }
            }}
            onClose={() => setShowAIGenerator(false)}
            existingFormData={formData}
            setFormData={setFormData}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Poetry CMS</h1>
          <p className="text-gray-500">Manage poems, translations, and metadata</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {remainingAILimit !== null && (
            <div className="flex items-center">
              <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
                remainingAILimit > 5 ? 'bg-green-100 text-green-700' :
                remainingAILimit > 0 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                🤖 AI: {remainingAILimit} left today
              </span>
            </div>
          )}
          
          <button
            onClick={batchGenerateTransliterations}
            className="btn-secondary inline-flex items-center gap-2"
            disabled={loading}
          >
            <Mic className="h-5 w-5" />
            <span>Auto-Generate All</span>
          </button>
          
          <button
            onClick={() => setShowAIGenerator(true)}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>AI Generate</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary inline-flex items-center space-x-2"
            disabled={authors.length === 0}
          >
            <Plus className="h-5 w-5" />
            <span>Add Poem</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Poems</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {poems.filter(p => p.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {poems.filter(p => !p.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Draft</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{authors.length}</p>
          <p className="text-sm text-gray-500">Authors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search poems by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <VoiceInput 
          onResult={(text) => setSearchQuery(text)} 
          language="ur-PK"
        />
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Genres</option>
          <option value="ghazal">Ghazal</option>
          <option value="nazm">Nazm</option>
          <option value="sher">Sher</option>
          <option value="rubai">Rubai</option>
          <option value="rekhti">Rekhti</option>
          <option value="qasida">Qasida</option>
          <option value="marsiya">Marsiya</option>
          <option value="other">Other</option>
        </select>
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Languages</option>
          <option value="urdu">Urdu (اردو)</option>
          <option value="hindi">Hindi (हिन्दी)</option>
          <option value="english">English</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
          <button
            onClick={clearFilters}
            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Poems Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poem & Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && poems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading poems...</p>
                   </td>
                  </tr>
              ) : poems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <p>No poems found.</p>
                    {(searchQuery || filterGenre !== 'all' || filterLanguage !== 'all' || filterStatus !== 'all') && (
                      <button onClick={clearFilters} className="text-primary-600 mt-2">
                        Clear filters to see all poems
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                poems.map((poem) => (
                  <motion.tr
                    key={poem._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{poem.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            slug: {poem.slug}
                          </code>
                          <button
                            onClick={() => handleCopySlug(poem.slug)}
                            className="p-1 rounded hover:bg-gray-200 transition-colors"
                            title="Copy link to clipboard"
                          >
                            {copiedSlug === poem.slug ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {poem.contentUrdu && poem.language === 'urdu' && (
                          <p className="urdu-text text-xs text-gray-400 mt-1 line-clamp-1" dir="rtl">
                            {poem.contentUrdu.substring(0, 50)}...
                          </p>
                        )}
                        {poem.contentHindi && poem.language === 'hindi' && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {poem.contentHindi.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getAuthorName(poem.author)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700 capitalize">
                        {poem.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        {getLanguageDisplay(poem.language)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(poem)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                          poem.isPublished 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {poem.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Eye className="h-3 w-3" />
                          <span>{poem.stats?.views?.toLocaleString() || 0}</span>
                          <Heart className="h-3 w-3 ml-2" />
                          <span>{poem.stats?.likes?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="h-3 w-3" />
                          <span>{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
                          <MessageCircle className="h-3 w-3 ml-2" />
                          <span>{poem.stats?.comments?.toLocaleString() || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(poem.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Auto-Transliteration Toggle Button */}
                        <button
                          onClick={() => toggleAutoTransliterate(poem)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            poem.autoTransliterate !== false
                              ? 'text-green-600 hover:bg-green-100'
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                          title={poem.autoTransliterate !== false ? 'Auto-transliteration ON' : 'Auto-transliteration OFF'}
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        
                        {/* Transliteration Button */}
                        <button
                          onClick={() => generateTransliteration(poem)}
                          disabled={generatingTransliteration === poem._id}
                          className={`p-1.5 rounded-lg transition-colors ${
                            poem.transliteration && poem.transliteration.length > 0
                              ? 'text-green-600 hover:bg-green-100'
                              : 'text-blue-600 hover:bg-blue-100'
                          }`}
                          title={poem.transliteration && poem.transliteration.length > 0 ? 'Transliteration exists' : 'Generate Transliteration'}
                        >
                          {generatingTransliteration === poem._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </button>
                        
                        {/* AI Analysis Button */}
                        <button
                          onClick={() => handleAIAnalysis(poem)}
                          disabled={analyzingPoemId === poem._id}
                          className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
                          title="AI Analysis"
                        >
                          {analyzingPoemId === poem._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Brain className="h-4 w-4" />
                          )}
                        </button>
                        
                        <Link
                          to={`/poem/${poem.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                          title="View Poem"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(poem)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                          title="Edit Poem"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
          onClick={() => handleDelete(poem.slug, poem.title)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                          title="Delete Poem"
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
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        pagination.page === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
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
      </div>

      {/* Add/Edit Poem Modal */}
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
                  {editingPoem ? 'Edit Poem' : 'Add New Poem'}
                </h2>
                <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Title */}
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
                    placeholder="Enter poem title"
                    required
                  />
                </div>

                {/* Slug with auto-generation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/poem/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="poem-slug"
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
                    <p className="text-xs text-red-500 mt-1">
                      This slug is already taken. Please choose a different one.
                    </p>
                  )}
                  {checkingSlug && (
                    <p className="text-xs text-gray-500 mt-1">
                      Checking availability...
                    </p>
                  )}
                  {slugAvailable && formData.slug && !checkingSlug && (
                    <p className="text-xs text-green-500 mt-1">
                      ✓ Slug is available
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly version (e.g., my-poem). Only lowercase letters, numbers, and hyphens.
                  </p>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select author</option>
                    {authors.map((author) => (
                      <option key={author._id} value={author._id}>
                        {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="ghazal">Ghazal</option>
                    <option value="nazm">Nazm</option>
                    <option value="sher">Sher</option>
                    <option value="rubai">Rubai</option>
                    <option value="rekhti">Rekhti</option>
                    <option value="qasida">Qasida</option>
                    <option value="marsiya">Marsiya</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleLanguageChange}
                    className="input-field"
                  >
                    <option value="urdu">Urdu (اردو)</option>
                    <option value="hindi">Hindi (हिन्दी)</option>
                    <option value="english">English</option>
                  </select>
                </div>

                {/* Content - Urdu Script */}
                {(formData.language === 'urdu' || formData.language === 'english') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content {formData.language === 'urdu' ? '(Urdu Script)' : '(English)'} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className={`input-field h-40 ${formData.language === 'urdu' ? 'font-urdu' : ''}`}
                      dir={formData.language === 'urdu' ? 'rtl' : 'ltr'}
                      placeholder={formData.language === 'urdu' ? 'دل کی باتیں کہاں کہی جائیں...' : 'Enter poem content...'}
                      required={formData.language === 'urdu' || formData.language === 'english'}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.language === 'urdu' ? 'Example: دلِ ناداں تجھے ہوا کیا ہے' : 'Example: The moon shines bright in the dark night sky'}
                    </p>
                  </div>
                )}

                {/* Content - Hindi/Devanagari Script */}
                {formData.language === 'hindi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content (Devanagari Script) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="contentHindi"
                      value={formData.contentHindi}
                      onChange={handleInputChange}
                      className="input-field h-40 font-hindi"
                      dir="ltr"
                      placeholder="दिल की बातें कहाँ कही जाएँ..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Example: दिल की बातें कहाँ कही जाएँ</p>
                  </div>
                )}

                {/* Transliteration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transliteration (Roman Script - Optional)
                  </label>
                  <textarea
                    name="transliteration"
                    value={formData.transliteration}
                    onChange={handleInputChange}
                    className="input-field h-20"
                    placeholder="Roman/English script for readers who can't read the original script..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Can be auto-generated later using the transliteration button
                  </p>
                </div>

                {/* Translation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    English Translation (Optional)
                  </label>
                  <textarea
                    name="translation"
                    value={formData.translation}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Enter English translation..."
                  />
                </div>

                {/* Auto-Transliteration Toggle */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="autoTransliterate"
                      checked={formData.autoTransliterate}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      Auto-generate transliteration (Urdu/Hindi → Roman)
                    </span>
                  </label>
                </div>

                {/* Publish */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading || !slugAvailable || checkingSlug}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      editingPoem ? 'Update Poem' : 'Create Poem'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
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

export default PoetryCMSPage;