// //client\src\pages\creator\CreatorContentPage.jsx
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import {
//   Search, Filter, Edit, Trash2, Eye, FileText, BookOpen,
//   Play, Headphones, ChevronLeft, ChevronRight
// } from 'lucide-react'

// const contentItems = [
//   { id: 1, title: 'New Ghazal Collection', type: 'poetry', status: 'published', views: '2.5K', date: '2024-02-15' },
//   { id: 2, title: 'Literary Analysis Video', type: 'video', status: 'published', views: '1.8K', date: '2024-02-10' },
//   { id: 3, title: 'Audio Recitation', type: 'audio', status: 'draft', views: '0', date: '2024-02-05' },
//   { id: 4, title: 'Rare Book Scan', type: 'ebook', status: 'published', views: '850', date: '2024-01-28' },
//   { id: 5, title: 'Mushaira Recording', type: 'video', status: 'published', views: '3.2K', date: '2024-01-20' },
// ]

// const CreatorContentPage = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [filterType, setFilterType] = useState('all')
//   const [filterStatus, setFilterStatus] = useState('all')

//   const filteredContent = contentItems.filter(item => {
//     if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
//     if (filterType !== 'all' && item.type !== filterType) return false
//     if (filterStatus !== 'all' && item.status !== filterStatus) return false
//     return true
//   })

//   const getIcon = (type) => {
//     switch (type) {
//       case 'poetry': return FileText
//       case 'ebook': return BookOpen
//       case 'video': return Play
//       case 'audio': return Headphones
//       default: return FileText
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
//         <p className="text-gray-500">Manage all your uploaded content</p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search content..."
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
//           <option value="poetry">Poetry</option>
//           <option value="ebook">Ebook</option>
//           <option value="video">Video</option>
//           <option value="audio">Audio</option>
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//           <option value="archived">Archived</option>
//         </select>
//       </div>

//       {/* Content Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredContent.map((item) => {
//                 const Icon = getIcon(item.type)
//                 return (
//                   <motion.tr
//                     key={item.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
//                           item.type === 'poetry' ? 'bg-primary-100' :
//                           item.type === 'ebook' ? 'bg-blue-100' :
//                           item.type === 'video' ? 'bg-red-100' :
//                           'bg-purple-100'
//                         }`}>
//                           <Icon className={`h-5 w-5 ${
//                             item.type === 'poetry' ? 'text-primary-600' :
//                             item.type === 'ebook' ? 'text-blue-600' :
//                             item.type === 'video' ? 'text-red-600' :
//                             'text-purple-600'
//                           }`} />
//                         </div>
//                         <span className="text-sm font-medium text-gray-900">{item.title}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">
//                         {item.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                         item.status === 'published' ? 'bg-green-100 text-green-700' :
//                         'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{item.views}</td>
//                     <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
//                           <Eye className="h-4 w-4" />
//                         </button>
//                         <button className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600">
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600">
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreatorContentPage















// // //client\src\pages\creator\CreatorContentPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Edit, Trash2, Eye, FileText, BookOpen,
//   Play, Headphones, Loader, Plus, RefreshCw, AlertCircle, ThumbsUp
// } from 'lucide-react';
// import creatorAPI from '../../api/creatorAPI';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// const CreatorContentPage = () => {
//   const [content, setContent] = useState({ poems: [], books: [], audio: [], videos: [] });
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [deletingId, setDeletingId] = useState(null);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       setLoading(true);
//       const response = await creatorAPI.getContent();
//       setContent(response.data);
//     } catch (error) {
//       toast.error('Failed to load content');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, type) => {
//     if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    
//     try {
//       setDeletingId(id);
//       await api.delete(`/${type}/${id}`);
//       toast.success('Content deleted successfully');
//       fetchContent();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const getAllContent = () => {
//     const all = [
//       ...content.poems.map(item => ({ ...item, contentType: 'poems', contentTypeLabel: 'Poetry' })),
//       ...content.books.map(item => ({ ...item, contentType: 'books', contentTypeLabel: 'Book' })),
//       ...content.audio.map(item => ({ ...item, contentType: 'audio', contentTypeLabel: 'Audio' })),
//       ...content.videos.map(item => ({ ...item, contentType: 'videos', contentTypeLabel: 'Video' }))
//     ];

//     let filtered = all;
    
//     if (searchQuery) {
//       filtered = filtered.filter(item => 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     if (filterType !== 'all') {
//       filtered = filtered.filter(item => item.contentType === filterType);
//     }
    
//     return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'poems': return FileText;
//       case 'books': return BookOpen;
//       case 'videos': return Play;
//       case 'audio': return Headphones;
//       default: return FileText;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'poems': return 'bg-purple-100 text-purple-700';
//       case 'books': return 'bg-yellow-100 text-yellow-700';
//       case 'videos': return 'bg-pink-100 text-pink-700';
//       case 'audio': return 'bg-indigo-100 text-indigo-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const filteredContent = getAllContent();
//   const totalCount = content.poems.length + content.books.length + content.audio.length + content.videos.length;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
//           <p className="text-gray-500">Manage all your uploaded content ({totalCount} total)</p>
//         </div>
//         <Link to="/creator/upload" className="btn-primary flex items-center space-x-2">
//           <Plus className="h-4 w-4" />
//           <span>Upload New</span>
//         </Link>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('poems')}>
//           <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.poems.length}</p>
//           <p className="text-sm text-gray-500">Poems</p>
//         </div>
//         <div className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('books')}>
//           <BookOpen className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.books.length}</p>
//           <p className="text-sm text-gray-500">Books</p>
//         </div>
//         <div className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('audio')}>
//           <Headphones className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.audio.length}</p>
//           <p className="text-sm text-gray-500">Audio</p>
//         </div>
//         <div className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterType('videos')}>
//           <Play className="h-6 w-6 text-pink-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.videos.length}</p>
//           <p className="text-sm text-gray-500">Videos</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by title..."
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
//           <option value="poems">Poetry</option>
//           <option value="books">Books</option>
//           <option value="audio">Audio</option>
//           <option value="videos">Videos</option>
//         </select>
//         <button onClick={fetchContent} className="btn-secondary flex items-center space-x-2">
//           <RefreshCw className="h-4 w-4" />
//           <span>Refresh</span>
//         </button>
//       </div>

//       {/* Content Grid */}
//       {filteredContent.length === 0 ? (
//         <div className="card text-center py-12">
//           {searchQuery || filterType !== 'all' ? (
//             <>
//               <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No matching content</h3>
//               <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
//               <button 
//                 onClick={() => { setSearchQuery(''); setFilterType('all'); }}
//                 className="btn-secondary"
//               >
//                 Clear Filters
//               </button>
//             </>
//           ) : (
//             <>
//               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
//               <p className="text-gray-500 mb-4">Start sharing your creativity with the world</p>
//               <Link to="/creator/upload" className="btn-primary inline-flex items-center space-x-2">
//                 <Plus className="h-4 w-4" />
//                 <span>Upload Your First Content</span>
//               </Link>
//             </>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence>
//             {filteredContent.map((item, index) => {
//               const Icon = getIcon(item.contentType);
//               const typeColor = getTypeColor(item.contentType);
              
//               return (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="card hover:shadow-lg transition-all duration-300"
//                 >
//                   {/* Content Type Badge */}
//                   <div className="flex items-center justify-between mb-3">
//                     <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
//                       <Icon className="h-3 w-3" />
//                       <span>{item.contentTypeLabel}</span>
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <Link to={`/content/${item._id}`}>
//                     <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
//                       {item.title}
//                     </h3>
//                   </Link>

//                   {/* Description */}
//                   {item.description && (
//                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                       {item.description}
//                     </p>
//                   )}

//                   {/* Author Info */}
//                   {item.author && (
//                     <p className="text-xs text-gray-400 mb-3">
//                       By {item.author.name}
//                     </p>
//                   )}

//                   {/* Stats */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-3 border-b border-gray-100">
//                     <div className="flex items-center space-x-3">
//                       <span className="flex items-center space-x-1">
//                         <Eye className="h-3 w-3" />
//                         <span>{item.stats?.views?.toLocaleString() || 0}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <ThumbsUp className="h-3 w-3" />
//                         <span>{item.stats?.likes?.toLocaleString() || 0}</span>
//                       </span>
//                     </div>
//                     {item.stats?.comments > 0 && (
//                       <span className="text-xs">💬 {item.stats.comments}</span>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center justify-end space-x-2">
//                     <Link
//                       to={`/content/${item._id}`}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//                       title="View"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Link>
//                     <Link
//                       to={`/creator/edit/${item.contentType}/${item._id}`}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(item._id, item.contentType.slice(0, -1))}
//                       disabled={deletingId === item._id}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition-colors disabled:opacity-50"
//                       title="Delete"
//                     >
//                       {deletingId === item._id ? (
//                         <Loader className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Trash2 className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatorContentPage;


























// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Edit, Trash2, Eye, FileText, BookOpen,
//   Play, Headphones, Loader, Plus, RefreshCw, AlertCircle, ThumbsUp
// } from 'lucide-react';
// import creatorAPI from '../../api/creatorAPI';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// const CreatorContentPage = () => {
//   const [content, setContent] = useState({ poems: [], books: [], audio: [], videos: [] });
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [deletingId, setDeletingId] = useState(null);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       setLoading(true);
//       const response = await creatorAPI.getContent();
//       setContent(response.data);
//     } catch (error) {
//       toast.error('Failed to load content');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, type) => {
//     if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    
//     try {
//       setDeletingId(id);
//       await api.delete(`/${type}/${id}`);
//       toast.success('Content deleted successfully');
//       fetchContent();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // Get edit URL based on content type
//   const getEditUrl = (item) => {
//     const contentType = item.contentType;
//     const id = item._id;
    
//     switch (contentType) {
//       case 'poems':
//         return `/creator/edit/poem/${id}`;
//       case 'books':
//         return `/creator/edit/book/${id}`;
//       case 'audio':
//         return `/creator/edit/audio/${id}`;
//       case 'videos':
//         return `/creator/edit/video/${id}`;
//       default:
//         return `/creator/edit/${contentType}/${id}`;
//     }
//   };

//   // Get view URL based on content type (using slug for SEO)
//   const getViewUrl = (item) => {
//     const contentType = item.contentType;
//     const slug = item.slug || item._id;
    
//     switch (contentType) {
//       case 'poems':
//         return `/poem/${slug}`;
//       case 'books':
//         return `/book/${slug}`;
//       case 'audio':
//         return `/audio/${slug}`;
//       case 'videos':
//         return `/video/${slug}`;
//       default:
//         return `/content/${slug}`;
//     }
//   };

//   const getAllContent = () => {
//     const all = [
//       ...content.poems.map(item => ({ ...item, contentType: 'poems', contentTypeLabel: 'Poetry' })),
//       ...content.books.map(item => ({ ...item, contentType: 'books', contentTypeLabel: 'Book' })),
//       ...content.audio.map(item => ({ ...item, contentType: 'audio', contentTypeLabel: 'Audio' })),
//       ...content.videos.map(item => ({ ...item, contentType: 'videos', contentTypeLabel: 'Video' }))
//     ];

//     let filtered = all;
    
//     if (searchQuery) {
//       filtered = filtered.filter(item => 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     if (filterType !== 'all') {
//       filtered = filtered.filter(item => item.contentType === filterType);
//     }
    
//     return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'poems': return FileText;
//       case 'books': return BookOpen;
//       case 'videos': return Play;
//       case 'audio': return Headphones;
//       default: return FileText;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'poems': return 'bg-purple-100 text-purple-700';
//       case 'books': return 'bg-yellow-100 text-yellow-700';
//       case 'videos': return 'bg-pink-100 text-pink-700';
//       case 'audio': return 'bg-indigo-100 text-indigo-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStatusBadge = (item) => {
//     const isPublished = item.isPublished;
//     const status = item.status;
    
//     if (isPublished === false || status === 'draft') {
//       return { text: 'Draft', color: 'bg-yellow-100 text-yellow-700' };
//     }
//     if (status === 'archived') {
//       return { text: 'Archived', color: 'bg-gray-100 text-gray-700' };
//     }
//     return { text: 'Published', color: 'bg-green-100 text-green-700' };
//   };

//   const filteredContent = getAllContent();
//   const totalCount = content.poems.length + content.books.length + content.audio.length + content.videos.length;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
//           <p className="text-gray-500">Manage all your uploaded content ({totalCount} total)</p>
//         </div>
//         <div className="flex gap-3">
//           <Link to="/creator/upload" className="btn-primary flex items-center space-x-2">
//             <Plus className="h-4 w-4" />
//             <span>Upload Poetry</span>
//           </Link>
//           <Link to="/creator/upload-video" className="btn-outline flex items-center space-x-2">
//             <Play className="h-4 w-4" />
//             <span>Upload Video</span>
//           </Link>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('poems')}
//         >
//           <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.poems.length}</p>
//           <p className="text-sm text-gray-500">Poems</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('books')}
//         >
//           <BookOpen className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.books.length}</p>
//           <p className="text-sm text-gray-500">Books</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('audio')}
//         >
//           <Headphones className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.audio.length}</p>
//           <p className="text-sm text-gray-500">Audio</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('videos')}
//         >
//           <Play className="h-6 w-6 text-pink-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.videos.length}</p>
//           <p className="text-sm text-gray-500">Videos</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by title..."
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
//           <option value="poems">Poetry</option>
//           <option value="books">Books</option>
//           <option value="audio">Audio</option>
//           <option value="videos">Videos</option>
//         </select>
//         <button onClick={fetchContent} className="btn-secondary flex items-center space-x-2">
//           <RefreshCw className="h-4 w-4" />
//           <span>Refresh</span>
//         </button>
//       </div>

//       {/* Content Grid */}
//       {filteredContent.length === 0 ? (
//         <div className="card text-center py-12">
//           {searchQuery || filterType !== 'all' ? (
//             <>
//               <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No matching content</h3>
//               <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
//               <button 
//                 onClick={() => { setSearchQuery(''); setFilterType('all'); }}
//                 className="btn-secondary"
//               >
//                 Clear Filters
//               </button>
//             </>
//           ) : (
//             <>
//               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
//               <p className="text-gray-500 mb-4">Start sharing your creativity with the world</p>
//               <div className="flex justify-center gap-4">
//                 <Link to="/creator/upload" className="btn-primary inline-flex items-center space-x-2">
//                   <FileText className="h-4 w-4" />
//                   <span>Upload Poetry</span>
//                 </Link>
//                 <Link to="/creator/upload-video" className="btn-outline inline-flex items-center space-x-2">
//                   <Play className="h-4 w-4" />
//                   <span>Upload Video</span>
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence>
//             {filteredContent.map((item, index) => {
//               const Icon = getIcon(item.contentType);
//               const typeColor = getTypeColor(item.contentType);
//               const statusBadge = getStatusBadge(item);
              
//               return (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="card hover:shadow-lg transition-all duration-300"
//                 >
//                   {/* Content Type Badge and Status */}
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center space-x-2">
//                       <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
//                         <Icon className="h-3 w-3" />
//                         <span>{item.contentTypeLabel}</span>
//                       </span>
//                       <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
//                         {statusBadge.text}
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-400">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <Link to={getViewUrl(item)}>
//                     <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
//                       {item.title}
//                     </h3>
//                   </Link>

//                   {/* Slug display (for debugging/info) */}
//                   {item.slug && (
//                     <p className="text-xs text-gray-400 mb-2 font-mono">
//                       slug: {item.slug}
//                     </p>
//                   )}

//                   {/* Description */}
//                   {item.description && (
//                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                       {item.description}
//                     </p>
//                   )}

//                   {/* Author Info */}
//                   {item.author && (
//                     <p className="text-xs text-gray-400 mb-3">
//                       By {typeof item.author === 'object' ? item.author.name : 'Author'}
//                     </p>
//                   )}

//                   {/* Stats */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-3 border-b border-gray-100">
//                     <div className="flex items-center space-x-3">
//                       <span className="flex items-center space-x-1">
//                         <Eye className="h-3 w-3" />
//                         <span>{item.stats?.views?.toLocaleString() || 0}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <ThumbsUp className="h-3 w-3" />
//                         <span>{item.stats?.likes?.toLocaleString() || 0}</span>
//                       </span>
//                     </div>
//                     {item.stats?.comments > 0 && (
//                       <span className="text-xs">💬 {item.stats.comments}</span>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center justify-end space-x-2">
//                     <Link
//                       to={getViewUrl(item)}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//                       title="View"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Link>
//                     <Link
//                       to={getEditUrl(item)}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Link>
//                     <button
//                       onClick={() => {
//                         const type = item.contentType === 'poems' ? 'poems' :
//                                    item.contentType === 'books' ? 'books' :
//                                    item.contentType === 'audio' ? 'audio' : 'videos';
//                         handleDelete(item._id, type);
//                       }}
//                       disabled={deletingId === item._id}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition-colors disabled:opacity-50"
//                       title="Delete"
//                     >
//                       {deletingId === item._id ? (
//                         <Loader className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Trash2 className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatorContentPage;

























// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Edit, Trash2, Eye, FileText, BookOpen,
//   Play, Headphones, Loader, Plus, RefreshCw, AlertCircle, ThumbsUp
// } from 'lucide-react';
// import creatorAPI from '../../api/creatorAPI';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// const CreatorContentPage = () => {
//   const [content, setContent] = useState({ poems: [], books: [], audio: [], videos: [] });
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [deletingId, setDeletingId] = useState(null);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       setLoading(true);
//       const response = await creatorAPI.getContent();
//       setContent(response.data);
//     } catch (error) {
//       toast.error('Failed to load content');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (identifier, type, isSlug = false) => {
//     if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    
//     try {
//       setDeletingId(identifier);
//       // For poems, use slug; for others use ID
//       const deleteIdentifier = isSlug ? identifier : identifier;
//       await api.delete(`/${type}/${deleteIdentifier}`);
//       toast.success('Content deleted successfully');
//       fetchContent();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // Get edit URL based on content type
//   // IMPORTANT: For poems, use SLUG; for others use ID
//   const getEditUrl = (item) => {
//     const contentType = item.contentType;
    
//     switch (contentType) {
//       case 'poems':
//         // Use SLUG for poems (backend uses slug for routes)
//         return `/creator/edit/poem/${item.slug || item._id}`;
//       case 'books':
//         // Use ID for books (or slug if your backend supports)
//         return `/creator/edit/book/${item._id}`;
//       case 'audio':
//         // Use ID for audio (or slug if your backend supports)
//         return `/creator/edit/audio/${item._id}`;
//       case 'videos':
//         // Use ID for videos (or slug if your backend supports)
//         return `/creator/edit/video/${item._id}`;
//       default:
//         return `/creator/edit/${contentType}/${item._id}`;
//     }
//   };

//   // Get view URL based on content type (using slug for SEO)
//   const getViewUrl = (item) => {
//     const contentType = item.contentType;
//     const slug = item.slug || item._id;
    
//     switch (contentType) {
//       case 'poems':
//         return `/poem/${slug}`;
//       case 'books':
//         return `/book/${slug}`;
//       case 'audio':
//         return `/audio/${slug}`;
//       case 'videos':
//         return `/video/${slug}`;
//       default:
//         return `/content/${slug}`;
//     }
//   };

//   // Get delete identifier based on content type
//   const getDeleteIdentifier = (item) => {
//     switch (item.contentType) {
//       case 'poems':
//         return { identifier: item.slug, type: 'poems', isSlug: true };
//       case 'books':
//         return { identifier: item._id, type: 'books', isSlug: false };
//       case 'audio':
//         return { identifier: item._id, type: 'audio', isSlug: false };
//       case 'videos':
//         return { identifier: item._id, type: 'videos', isSlug: false };
//       default:
//         return { identifier: item._id, type: item.contentType, isSlug: false };
//     }
//   };

//   const getAllContent = () => {
//     const all = [
//       ...content.poems.map(item => ({ ...item, contentType: 'poems', contentTypeLabel: 'Poetry' })),
//       ...content.books.map(item => ({ ...item, contentType: 'books', contentTypeLabel: 'Book' })),
//       ...content.audio.map(item => ({ ...item, contentType: 'audio', contentTypeLabel: 'Audio' })),
//       ...content.videos.map(item => ({ ...item, contentType: 'videos', contentTypeLabel: 'Video' }))
//     ];

//     let filtered = all;
    
//     if (searchQuery) {
//       filtered = filtered.filter(item => 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     if (filterType !== 'all') {
//       filtered = filtered.filter(item => item.contentType === filterType);
//     }
    
//     return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'poems': return FileText;
//       case 'books': return BookOpen;
//       case 'videos': return Play;
//       case 'audio': return Headphones;
//       default: return FileText;
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'poems': return 'bg-purple-100 text-purple-700';
//       case 'books': return 'bg-yellow-100 text-yellow-700';
//       case 'videos': return 'bg-pink-100 text-pink-700';
//       case 'audio': return 'bg-indigo-100 text-indigo-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStatusBadge = (item) => {
//     const isPublished = item.isPublished;
//     const status = item.status;
    
//     if (isPublished === false || status === 'draft') {
//       return { text: 'Draft', color: 'bg-yellow-100 text-yellow-700' };
//     }
//     if (status === 'archived') {
//       return { text: 'Archived', color: 'bg-gray-100 text-gray-700' };
//     }
//     return { text: 'Published', color: 'bg-green-100 text-green-700' };
//   };

//   const filteredContent = getAllContent();
//   const totalCount = content.poems.length + content.books.length + content.audio.length + content.videos.length;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
//           <p className="text-gray-500">Manage all your uploaded content ({totalCount} total)</p>
//         </div>
//         <div className="flex gap-3">
//           <Link to="/creator/upload" className="btn-primary flex items-center space-x-2">
//             <Plus className="h-4 w-4" />
//             <span>Upload Poetry</span>
//           </Link>
//           <Link to="/creator/upload-video" className="btn-outline flex items-center space-x-2">
//             <Play className="h-4 w-4" />
//             <span>Upload Video</span>
//           </Link>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('poems')}
//         >
//           <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.poems.length}</p>
//           <p className="text-sm text-gray-500">Poems</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('books')}
//         >
//           <BookOpen className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.books.length}</p>
//           <p className="text-sm text-gray-500">Books</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('audio')}
//         >
//           <Headphones className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.audio.length}</p>
//           <p className="text-sm text-gray-500">Audio</p>
//         </div>
//         <div 
//           className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
//           onClick={() => setFilterType('videos')}
//         >
//           <Play className="h-6 w-6 text-pink-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold">{content.videos.length}</p>
//           <p className="text-sm text-gray-500">Videos</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by title..."
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
//           <option value="poems">Poetry</option>
//           <option value="books">Books</option>
//           <option value="audio">Audio</option>
//           <option value="videos">Videos</option>
//         </select>
//         <button onClick={fetchContent} className="btn-secondary flex items-center space-x-2">
//           <RefreshCw className="h-4 w-4" />
//           <span>Refresh</span>
//         </button>
//       </div>

//       {/* Content Grid */}
//       {filteredContent.length === 0 ? (
//         <div className="card text-center py-12">
//           {searchQuery || filterType !== 'all' ? (
//             <>
//               <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No matching content</h3>
//               <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
//               <button 
//                 onClick={() => { setSearchQuery(''); setFilterType('all'); }}
//                 className="btn-secondary"
//               >
//                 Clear Filters
//               </button>
//             </>
//           ) : (
//             <>
//               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
//               <p className="text-gray-500 mb-4">Start sharing your creativity with the world</p>
//               <div className="flex justify-center gap-4">
//                 <Link to="/creator/upload" className="btn-primary inline-flex items-center space-x-2">
//                   <FileText className="h-4 w-4" />
//                   <span>Upload Poetry</span>
//                 </Link>
//                 <Link to="/creator/upload-video" className="btn-outline inline-flex items-center space-x-2">
//                   <Play className="h-4 w-4" />
//                   <span>Upload Video</span>
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence>
//             {filteredContent.map((item, index) => {
//               const Icon = getIcon(item.contentType);
//               const typeColor = getTypeColor(item.contentType);
//               const statusBadge = getStatusBadge(item);
//               const deleteInfo = getDeleteIdentifier(item);
              
//               return (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="card hover:shadow-lg transition-all duration-300"
//                 >
//                   {/* Content Type Badge and Status */}
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center space-x-2">
//                       <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
//                         <Icon className="h-3 w-3" />
//                         <span>{item.contentTypeLabel}</span>
//                       </span>
//                       <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
//                         {statusBadge.text}
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-400">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <Link to={getViewUrl(item)}>
//                     <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
//                       {item.title}
//                     </h3>
//                   </Link>

//                   {/* Slug display - helpful for debugging */}
//                   {item.slug && item.contentType === 'poems' && (
//                     <p className="text-xs text-gray-400 mb-2 font-mono">
//                       slug: {item.slug}
//                     </p>
//                   )}

//                   {/* Description */}
//                   {item.description && (
//                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                       {item.description}
//                     </p>
//                   )}

//                   {/* Author Info */}
//                   {item.author && (
//                     <p className="text-xs text-gray-400 mb-3">
//                       By {typeof item.author === 'object' ? item.author.name : 'Author'}
//                     </p>
//                   )}

//                   {/* Stats */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-3 border-b border-gray-100">
//                     <div className="flex items-center space-x-3">
//                       <span className="flex items-center space-x-1">
//                         <Eye className="h-3 w-3" />
//                         <span>{item.stats?.views?.toLocaleString() || 0}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <ThumbsUp className="h-3 w-3" />
//                         <span>{item.stats?.likes?.toLocaleString() || 0}</span>
//                       </span>
//                     </div>
//                     {item.stats?.comments > 0 && (
//                       <span className="text-xs">💬 {item.stats.comments}</span>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center justify-end space-x-2">
//                     <Link
//                       to={getViewUrl(item)}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//                       title="View"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Link>
//                     <Link
//                       to={getEditUrl(item)}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(deleteInfo.identifier, deleteInfo.type, deleteInfo.isSlug)}
//                       disabled={deletingId === deleteInfo.identifier}
//                       className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition-colors disabled:opacity-50"
//                       title="Delete"
//                     >
//                       {deletingId === deleteInfo.identifier ? (
//                         <Loader className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Trash2 className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatorContentPage;



















import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Edit, Trash2, Eye, FileText, BookOpen,
  Play, Headphones, Loader, Plus, RefreshCw, AlertCircle, ThumbsUp
} from 'lucide-react';
import creatorAPI from '../../api/creatorAPI';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CreatorContentPage = () => {
  const [content, setContent] = useState({ poems: [], books: [], audio: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await creatorAPI.getContent();
      setContent(response.data);
    } catch (error) {
      toast.error('Failed to load content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (identifier, type, isSlug = false) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    
    try {
      setDeletingId(identifier);
      // For poems, use slug; for others use ID
      const deleteIdentifier = isSlug ? identifier : identifier;
      await api.delete(`/${type}/${deleteIdentifier}`);
      toast.success('Content deleted successfully');
      fetchContent();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  // Get edit URL based on content type
  const getEditUrl = (item) => {
    const contentType = item.contentType;
    
    switch (contentType) {
      case 'poems':
        // Use SLUG for poems (backend uses slug for routes)
        return `/creator/edit/poem/${item.slug || item._id}`;
      case 'books':
        // Use ID for books
        return `/creator/edit/book/${item._id}`;
      case 'audio':
        // Use ID for audio
        return `/creator/edit/audio/${item._id}`;
      case 'videos':
        // Use ID for videos
        return `/creator/edit/video/${item._id}`;
      default:
        return `/creator/edit/${contentType}/${item._id}`;
    }
  };

  // Get view URL based on content type (using slug for SEO)
  const getViewUrl = (item) => {
    const contentType = item.contentType;
    const slug = item.slug || item._id;
    
    switch (contentType) {
      case 'poems':
        return `/poem/${slug}`;
      case 'books':
        return `/book/${slug}`;
      case 'audio':
        return `/audio/${slug}`;
      case 'videos':
        return `/video/${slug}`;
      default:
        return `/content/${slug}`;
    }
  };

  // Get delete identifier based on content type
  const getDeleteIdentifier = (item) => {
    switch (item.contentType) {
      case 'poems':
        return { identifier: item.slug, type: 'poems', isSlug: true };
      case 'books':
        return { identifier: item._id, type: 'books', isSlug: false };
      case 'audio':
        return { identifier: item._id, type: 'audio', isSlug: false };
      case 'videos':
        return { identifier: item._id, type: 'videos', isSlug: false };
      default:
        return { identifier: item._id, type: item.contentType, isSlug: false };
    }
  };

  // Get additional info for books (like page count, format)
  const getAdditionalInfo = (item) => {
    if (item.contentType === 'books') {
      const info = [];
      if (item.totalPages) info.push(`${item.totalPages} pages`);
      if (item.format) info.push(item.format.toUpperCase());
      if (item.isFree) info.push('Free');
      else if (item.price?.amount) info.push(`₹${item.price.amount}`);
      return info.join(' • ');
    }
    return null;
  };

  const getAllContent = () => {
    const all = [
      ...content.poems.map(item => ({ ...item, contentType: 'poems', contentTypeLabel: 'Poetry' })),
      ...content.books.map(item => ({ ...item, contentType: 'books', contentTypeLabel: 'Book' })),
      ...content.audio.map(item => ({ ...item, contentType: 'audio', contentTypeLabel: 'Audio' })),
      ...content.videos.map(item => ({ ...item, contentType: 'videos', contentTypeLabel: 'Video' }))
    ];

    let filtered = all;
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.contentType === filterType);
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'poems': return FileText;
      case 'books': return BookOpen;
      case 'videos': return Play;
      case 'audio': return Headphones;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'poems': return 'bg-purple-100 text-purple-700';
      case 'books': return 'bg-yellow-100 text-yellow-700';
      case 'videos': return 'bg-pink-100 text-pink-700';
      case 'audio': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (item) => {
    const isPublished = item.isPublished;
    const status = item.status;
    
    if (isPublished === false || status === 'draft') {
      return { text: 'Draft', color: 'bg-yellow-100 text-yellow-700' };
    }
    if (status === 'archived') {
      return { text: 'Archived', color: 'bg-gray-100 text-gray-700' };
    }
    return { text: 'Published', color: 'bg-green-100 text-green-700' };
  };

  const filteredContent = getAllContent();
  const totalCount = content.poems.length + content.books.length + content.audio.length + content.videos.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
          <p className="text-gray-500">Manage all your uploaded content ({totalCount} total)</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/creator/upload" className="btn-primary flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Upload Poetry</span>
          </Link>
          <Link to="/creator/upload-ebook" className="btn-primary flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Upload Ebook</span>
          </Link>
          <Link to="/creator/upload-video" className="btn-outline flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Upload Video</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setFilterType('poems')}
        >
          <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">{content.poems.length}</p>
          <p className="text-sm text-gray-500">Poems</p>
        </div>
        <div 
          className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setFilterType('books')}
        >
          <BookOpen className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">{content.books.length}</p>
          <p className="text-sm text-gray-500">Books</p>
        </div>
        <div 
          className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setFilterType('audio')}
        >
          <Headphones className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">{content.audio.length}</p>
          <p className="text-sm text-gray-500">Audio</p>
        </div>
        <div 
          className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setFilterType('videos')}
        >
          <Play className="h-6 w-6 text-pink-600 mx-auto mb-2" />
          <p className="text-2xl font-bold">{content.videos.length}</p>
          <p className="text-sm text-gray-500">Videos</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
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
          <option value="poems">Poetry</option>
          <option value="books">Books</option>
          <option value="audio">Audio</option>
          <option value="videos">Videos</option>
        </select>
        <button onClick={fetchContent} className="btn-secondary flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="card text-center py-12">
          {searchQuery || filterType !== 'all' ? (
            <>
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matching content</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilterType('all'); }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </>
          ) : (
            <>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
              <p className="text-gray-500 mb-4">Start sharing your creativity with the world</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/creator/upload" className="btn-primary inline-flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Upload Poetry</span>
                </Link>
                <Link to="/creator/upload-ebook" className="btn-primary inline-flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Upload Ebook</span>
                </Link>
                <Link to="/creator/upload-video" className="btn-outline inline-flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Upload Video</span>
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredContent.map((item, index) => {
              const Icon = getIcon(item.contentType);
              const typeColor = getTypeColor(item.contentType);
              const statusBadge = getStatusBadge(item);
              const deleteInfo = getDeleteIdentifier(item);
              const additionalInfo = getAdditionalInfo(item);
              
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="card hover:shadow-lg transition-all duration-300"
                >
                  {/* Content Type Badge and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
                        <Icon className="h-3 w-3" />
                        <span>{item.contentTypeLabel}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={getViewUrl(item)}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  {/* Additional Info for Books */}
                  {additionalInfo && (
                    <p className="text-xs text-gray-500 mb-2">
                      {additionalInfo}
                    </p>
                  )}

                  {/* Slug display - helpful for debugging (only for poems) */}
                  {item.slug && item.contentType === 'poems' && (
                    <p className="text-xs text-gray-400 mb-2 font-mono">
                      slug: {item.slug}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Author Info */}
                  {item.author && (
                    <p className="text-xs text-gray-400 mb-3">
                      By {typeof item.author === 'object' ? item.author.name : 'Author'}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.stats?.views?.toLocaleString() || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{item.stats?.likes?.toLocaleString() || 0}</span>
                      </span>
                    </div>
                    {item.contentType === 'books' && item.stats?.downloads > 0 && (
                      <span className="text-xs">📥 {item.stats.downloads}</span>
                    )}
                    {item.stats?.comments > 0 && (
                      <span className="text-xs">💬 {item.stats.comments}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={getViewUrl(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={getEditUrl(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(deleteInfo.identifier, deleteInfo.type, deleteInfo.isSlug)}
                      disabled={deletingId === deleteInfo.identifier}
                      className="p-2 rounded-lg hover:bg-gray-100 text-red-600 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === deleteInfo.identifier ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CreatorContentPage;