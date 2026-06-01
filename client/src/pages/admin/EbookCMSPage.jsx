// //client/src/pages/admin/AEbookCMSPage.jsx


// //working revert if not client/src/pages/admin/EbookCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import bookAPI from '../../api/bookAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import toast from 'react-hot-toast';

// const EbookCMSPage = () => {
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkUploading, setBulkUploading] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     titleUrdu: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     type: 'ebook',
//     language: 'urdu',
//     coverImage: '',
//     pdfUrl: '',
//     epubUrl: '',
//     totalPages: '',
//     publisher: '',
//     publishYear: '',
//     isbn: '',
//     isFree: true,
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
//       const response = await bookAPI.getBooks({ limit: 1000 });
//       let booksList = [];
//       if (response?.data?.data) {
//         booksList = response.data.data;
//       } else if (response?.data) {
//         booksList = response.data;
//       } else if (Array.isArray(response)) {
//         booksList = response;
//       } else {
//         booksList = [];
//       }

//       const exists = booksList.some(book => 
//         book.slug === slug && book._id !== excludeId
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
//       await checkSlugAvailability(newSlug, editingBook?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingBook?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingBook?._id);
//     toast.success('Slug regenerated from title');
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

//   // Fetch books
//   const fetchBooks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
//         ...(filterType !== 'all' && { type: filterType })
//       };

//       const response = await bookAPI.getBooks(params);
      
//       let booksData = [];
//       if (response?.data?.data) {
//         booksData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         booksData = response.data;
//       } else if (Array.isArray(response)) {
//         booksData = response;
//       } else {
//         booksData = [];
//       }
      
//       setBooks(Array.isArray(booksData) ? booksData : []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       toast.error('Failed to load books');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchBooks();
//   }, [fetchAuthors, fetchCategories, fetchBooks]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCoAuthorsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a book title');
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

//     const bookData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       subtitle: formData.titleUrdu?.trim() || '',
//       description: formData.description?.trim() || '',
//       author: formData.author,
//       coAuthors: formData.coAuthors,
//       category: formData.category || null,
//       type: formData.type,
//       language: formData.language,
//       coverImage: formData.coverImage || '',
//       pdfUrl: formData.pdfUrl || '',
//       epubUrl: formData.epubUrl || '',
//       totalPages: formData.totalPages ? parseInt(formData.totalPages) : null,
//       publisher: formData.publisher || '',
//       publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
//       isbn: formData.isbn || '',
//       isFree: formData.isFree,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingBook) {
//         await bookAPI.updateBook(editingBook._id, bookData);
//         toast.success('Book updated successfully');
//       } else {
//         await bookAPI.createBook(bookData);
//         toast.success('Book created successfully');
//       }
//       resetModal();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error saving book:', error);
//       const message = error.response?.data?.message || 'Failed to save book';
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
//       await bookAPI.deleteBook(id);
//       toast.success('Book deleted successfully');
//       fetchBooks();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (book) => {
//     setLoading(true);
//     try {
//       await bookAPI.updateBook(book._id, {
//         ...book,
//         isPublished: !book.isPublished
//       });
//       toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
//       fetchBooks();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title || '',
//       slug: book.slug || '',
//       titleUrdu: book.subtitle || '',
//       description: book.description || '',
//       author: typeof book.author === 'object' ? book.author?._id : book.author || '',
//       coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
//       category: book.category?._id || book.category || '',
//       type: book.type || 'ebook',
//       language: book.language || 'urdu',
//       coverImage: book.coverImage || '',
//       pdfUrl: book.pdfUrl || '',
//       epubUrl: book.epubUrl || '',
//       totalPages: book.totalPages || '',
//       publisher: book.publisher || '',
//       publishYear: book.publishYear || '',
//       isbn: book.isbn || '',
//       isFree: book.isFree || false,
//       isPremium: book.isPremium || false,
//       isPublished: book.isPublished || false,
//       isFeatured: book.isFeatured || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Handle bulk file upload
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
//       setBulkFile(file);
//     } else {
//       toast.error('Please upload a valid JSON file');
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error('Please select a JSON file');
//       return;
//     }

//     setBulkUploading(true);
//     const reader = new FileReader();
    
//     reader.onload = async (event) => {
//       try {
//         const booksData = JSON.parse(event.target.result);
        
//         if (!Array.isArray(booksData)) {
//           toast.error('JSON file should contain an array of books');
//           return;
//         }

//         let successCount = 0;
//         let errorCount = 0;

//         for (const book of booksData) {
//           try {
//             // Generate slug if not provided
//             if (!book.slug && book.title) {
//               book.slug = generateSlugFromTitle(book.title);
//             }
            
//             await bookAPI.createBook(book);
//             successCount++;
//           } catch (err) {
//             console.error(`Failed to upload book: ${book.title}`, err);
//             errorCount++;
//           }
//         }

//         toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed`);
//         fetchBooks();
//         setShowBulkModal(false);
//         setBulkFile(null);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         toast.error('Invalid JSON format');
//       } finally {
//         setBulkUploading(false);
//       }
//     };

//     reader.readAsText(bulkFile);
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingBook(null);
//     setFormData({
//       title: '',
//       slug: '',
//       titleUrdu: '',
//       description: '',
//       author: '',
//       coAuthors: [],
//       category: '',
//       type: 'ebook',
//       language: 'urdu',
//       coverImage: '',
//       pdfUrl: '',
//       epubUrl: '',
//       totalPages: '',
//       publisher: '',
//       publishYear: '',
//       isbn: '',
//       isFree: true,
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterCategory('all');
//     setFilterStatus('all');
//     setFilterType('all');
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
//           <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowBulkModal(true)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <FileText className="h-5 w-5" />
//             <span>Bulk Upload</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             <Upload className="h-5 w-5" />
//             <span>Upload Ebook</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Books</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {books.filter(b => b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {books.filter(b => !b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {books.filter(b => b.isFeatured).length}
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
//             placeholder="Search books by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Types</option>
//           <option value="ebook">Ebook</option>
//           <option value="journal">Journal</option>
//           <option value="magazine">Magazine</option>
//           <option value="rare">Rare</option>
//           <option value="manuscript">Manuscript</option>
//         </select>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
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
//         {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Books Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading books...</p>
//                   </td>
//                 </tr>
//               ) : books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No books found.</p>
//                     {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all books
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 books.map((book) => (
//                   <motion.tr
//                     key={book._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
//                           <BookOpen className="h-5 w-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{book.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {book.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(book.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === book.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(book.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {book.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(book)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           book.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {book.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <Download className="h-4 w-4" />
//                         <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/book/${book.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Book"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Book"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id, book.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Book"
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

//       {/* Add/Edit Book Modal */}
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
//                   {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
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
//                       placeholder="Enter book title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="book-slug"
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

//                 {/* Title Urdu */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu)</label>
//                   <input
//                     type="text"
//                     name="titleUrdu"
//                     value={formData.titleUrdu}
//                     onChange={handleInputChange}
//                     className="input-field urdu-text"
//                     dir="rtl"
//                     placeholder="کتاب کا عنوان اردو میں"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter book description..."
//                   />
//                 </div>

//                 {/* Author and Co-authors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Author <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       required
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
//                     <select
//                       multiple
//                       name="coAuthors"
//                       value={formData.coAuthors}
//                       onChange={handleCoAuthorsChange}
//                       className="input-field h-24"
//                     >
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>

//                 {/* Category, Type, Language */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="ebook">Ebook</option>
//                       <option value="journal">Journal</option>
//                       <option value="magazine">Magazine</option>
//                       <option value="rare">Rare Book</option>
//                       <option value="manuscript">Manuscript</option>
//                     </select>
//                   </div>
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
//                       <option value="persian">Persian</option>
//                       <option value="arabic">Arabic</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Files */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">PDF URL</label>
//                     <input
//                       type="url"
//                       name="pdfUrl"
//                       value={formData.pdfUrl}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">EPUB URL</label>
//                     <input
//                       type="url"
//                       name="epubUrl"
//                       value={formData.epubUrl}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                 </div>

//                 {/* Publication Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                     <input
//                       type="number"
//                       name="totalPages"
//                       value={formData.totalPages}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 450"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                     <input
//                       type="text"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Publisher name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
//                     <input
//                       type="number"
//                       name="publishYear"
//                       value={formData.publishYear}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 2024"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
//                     <input
//                       type="text"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="ISBN number"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFree"
//                       checked={formData.isFree}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Free Book</span>
//                   </label>
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
//                     <span className="text-sm text-gray-700">Featured Book</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

//       {/* Bulk Upload Modal */}
//       <AnimatePresence>
//         {showBulkModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
//                 <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
//                   {/*<p className="text-sm text-gray-400">Format: [{"title", "author", "slug", ...}]</p>*/}
//                   <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
//                   <input
//                     type="file"
//                     accept=".json"
//                     onChange={handleBulkFileChange}
//                     className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
//                   <pre className="text-xs text-blue-600 overflow-x-auto">
// {`[
//   {
//     "title": "Book Title",
//     "slug": "book-title",
//     "description": "Book description",
//     "author": "author_id",
//     "type": "ebook",
//     "language": "urdu",
//     "pdfUrl": "https://...",
//     "isPublished": true
//   }
// ]`}
//                   </pre>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4">
//                   <button
//                     onClick={handleBulkUpload}
//                     disabled={!bulkFile || bulkUploading}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
//                   </button>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EbookCMSPage;








// // client/src/pages/admin/EbookCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Image as ImageIcon, File as FileIcon
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import bookAPI from '../../api/bookAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import toast from 'react-hot-toast';

// const EbookCMSPage = () => {
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkUploading, setBulkUploading] = useState(false);
//   const [uploadingCover, setUploadingCover] = useState(false);
//   const [uploadingPages, setUploadingPages] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     titleUrdu: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     type: 'ebook',
//     language: 'urdu',
//     coverImage: '',
//     pageImages: [],
//     pdfUrl: '',
//     epubUrl: '',
//     totalPages: '',
//     publisher: '',
//     publishYear: '',
//     isbn: '',
//     isFree: true,
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
//       const response = await bookAPI.getBooks({ limit: 1000 });
//       let booksList = [];
//       if (response?.data?.data) {
//         booksList = response.data.data;
//       } else if (response?.data) {
//         booksList = response.data;
//       } else if (Array.isArray(response)) {
//         booksList = response;
//       } else {
//         booksList = [];
//       }

//       const exists = booksList.some(book => 
//         book.slug === slug && book._id !== excludeId
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
//       await checkSlugAvailability(newSlug, editingBook?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingBook?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingBook?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload cover image to Cloudinary
//   const handleCoverUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     setUploadingCover(true);
//     const uploadData = new FormData();
//     uploadData.append('file', file);
//     uploadData.append('upload_preset', 'zauqapp_books');
//     uploadData.append('folder', 'zauqapp/books/covers');

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
//         method: 'POST',
//         body: uploadData
//       });
//       const data = await response.json();
      
//       if (data.secure_url) {
//         setFormData(prev => ({ ...prev, coverImage: data.secure_url }));
//         toast.success('Cover image uploaded successfully');
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload cover image');
//     } finally {
//       setUploadingCover(false);
//     }
//   };

//   // Upload page images to Cloudinary
//   const handlePageImagesUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setUploadingPages(true);
//     const uploadedUrls = [];

//     for (const file of files) {
//       if (!file.type.startsWith('image/')) {
//         toast.error(`Skipping ${file.name}: not an image`);
//         continue;
//       }

//       const uploadData = new FormData();
//       uploadData.append('file', file);
//       uploadData.append('upload_preset', 'zauqapp_books');
//       uploadData.append('folder', 'zauqapp/books/pages');

//       try {
//         const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
//           method: 'POST',
//           body: uploadData
//         });
//         const data = await response.json();
        
//         if (data.secure_url) {
//           uploadedUrls.push(data.secure_url);
//           toast.success(`Uploaded: ${file.name}`);
//         }
//       } catch (error) {
//         console.error('Upload error:', error);
//         toast.error(`Failed to upload: ${file.name}`);
//       }
//     }

//     setFormData(prev => ({
//       ...prev,
//       pageImages: [...(prev.pageImages || []), ...uploadedUrls],
//       totalPages: (prev.pageImages?.length || 0) + uploadedUrls.length
//     }));
//     setUploadingPages(false);
//     toast.success(`${uploadedUrls.length} page images uploaded`);
//   };

//   // Remove page image
//   const removePageImage = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       pageImages: prev.pageImages.filter((_, index) => index !== indexToRemove),
//       totalPages: (prev.pageImages?.length || 0) - 1
//     }));
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

//   // Fetch books
//   const fetchBooks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
//         ...(filterType !== 'all' && { type: filterType })
//       };

//       const response = await bookAPI.getBooks(params);
      
//       let booksData = [];
//       if (response?.data?.data) {
//         booksData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         booksData = response.data;
//       } else if (Array.isArray(response)) {
//         booksData = response;
//       } else {
//         booksData = [];
//       }
      
//       setBooks(Array.isArray(booksData) ? booksData : []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       toast.error('Failed to load books');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchBooks();
//   }, [fetchAuthors, fetchCategories, fetchBooks]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCoAuthorsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a book title');
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

//     const bookData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       subtitle: formData.titleUrdu?.trim() || '',
//       description: formData.description?.trim() || '',
//       author: formData.author,
//       coAuthors: formData.coAuthors,
//       category: formData.category || null,
//       type: formData.type,
//       language: formData.language,
//       coverImage: formData.coverImage || '',
//       pageImages: formData.pageImages || [],
//       pdfUrl: formData.pdfUrl || '',
//       epubUrl: formData.epubUrl || '',
//       totalPages: formData.totalPages ? parseInt(formData.totalPages) : (formData.pageImages?.length || null),
//       publisher: formData.publisher || '',
//       publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
//       isbn: formData.isbn || '',
//       isFree: formData.isFree,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingBook) {
//         await bookAPI.updateBook(editingBook._id, bookData);
//         toast.success('Book updated successfully');
//       } else {
//         await bookAPI.createBook(bookData);
//         toast.success('Book created successfully');
//       }
//       resetModal();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error saving book:', error);
//       const message = error.response?.data?.message || 'Failed to save book';
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
//       await bookAPI.deleteBook(id);
//       toast.success('Book deleted successfully');
//       fetchBooks();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (book) => {
//     setLoading(true);
//     try {
//       await bookAPI.updateBook(book._id, {
//         ...book,
//         isPublished: !book.isPublished
//       });
//       toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
//       fetchBooks();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title || '',
//       slug: book.slug || '',
//       titleUrdu: book.subtitle || '',
//       description: book.description || '',
//       author: typeof book.author === 'object' ? book.author?._id : book.author || '',
//       coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
//       category: book.category?._id || book.category || '',
//       type: book.type || 'ebook',
//       language: book.language || 'urdu',
//       coverImage: book.coverImage || '',
//       pageImages: book.pageImages || [],
//       pdfUrl: book.pdfUrl || '',
//       epubUrl: book.epubUrl || '',
//       totalPages: book.totalPages || '',
//       publisher: book.publisher || '',
//       publishYear: book.publishYear || '',
//       isbn: book.isbn || '',
//       isFree: book.isFree || false,
//       isPremium: book.isPremium || false,
//       isPublished: book.isPublished || false,
//       isFeatured: book.isFeatured || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Handle bulk file upload
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
//       setBulkFile(file);
//     } else {
//       toast.error('Please upload a valid JSON file');
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error('Please select a JSON file');
//       return;
//     }

//     setBulkUploading(true);
//     const reader = new FileReader();
    
//     reader.onload = async (event) => {
//       try {
//         const booksData = JSON.parse(event.target.result);
        
//         if (!Array.isArray(booksData)) {
//           toast.error('JSON file should contain an array of books');
//           return;
//         }

//         let successCount = 0;
//         let errorCount = 0;

//         for (const book of booksData) {
//           try {
//             if (!book.slug && book.title) {
//               book.slug = generateSlugFromTitle(book.title);
//             }
            
//             await bookAPI.createBook(book);
//             successCount++;
//           } catch (err) {
//             console.error(`Failed to upload book: ${book.title}`, err);
//             errorCount++;
//           }
//         }

//         toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed`);
//         fetchBooks();
//         setShowBulkModal(false);
//         setBulkFile(null);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         toast.error('Invalid JSON format');
//       } finally {
//         setBulkUploading(false);
//       }
//     };

//     reader.readAsText(bulkFile);
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingBook(null);
//     setFormData({
//       title: '',
//       slug: '',
//       titleUrdu: '',
//       description: '',
//       author: '',
//       coAuthors: [],
//       category: '',
//       type: 'ebook',
//       language: 'urdu',
//       coverImage: '',
//       pageImages: [],
//       pdfUrl: '',
//       epubUrl: '',
//       totalPages: '',
//       publisher: '',
//       publishYear: '',
//       isbn: '',
//       isFree: true,
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setSlugAvailable(true);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterCategory('all');
//     setFilterStatus('all');
//     setFilterType('all');
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
//           <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowBulkModal(true)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <FileText className="h-5 w-5" />
//             <span>Bulk Upload</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             <Upload className="h-5 w-5" />
//             <span>Upload Ebook</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Books</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {books.filter(b => b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {books.filter(b => !b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {books.filter(b => b.isFeatured).length}
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
//             placeholder="Search books by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Types</option>
//           <option value="ebook">Ebook</option>
//           <option value="journal">Journal</option>
//           <option value="magazine">Magazine</option>
//           <option value="rare">Rare</option>
//           <option value="manuscript">Manuscript</option>
//         </select>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
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
//         {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Books Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading books...</p>
//                   </td>
//                 </tr>
//               ) : books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No books found.</p>
//                     {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all books
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 books.map((book) => (
//                   <motion.tr
//                     key={book._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         {book.coverImage ? (
//                           <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover rounded" />
//                         ) : (
//                           <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
//                             <BookOpen className="h-5 w-5 text-blue-600" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{book.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {book.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(book.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === book.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(book.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {book.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(book)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           book.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {book.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <Download className="h-4 w-4" />
//                         <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/book/${book.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Book"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Book"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id, book.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Book"
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

//       {/* Add/Edit Book Modal with Cloudinary Upload */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
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
//                       placeholder="Enter book title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="book-slug"
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

//                 {/* Title Urdu */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu)</label>
//                   <input
//                     type="text"
//                     name="titleUrdu"
//                     value={formData.titleUrdu}
//                     onChange={handleInputChange}
//                     className="input-field urdu-text"
//                     dir="rtl"
//                     placeholder="کتاب کا عنوان اردو میں"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter book description..."
//                   />
//                 </div>

//                 {/* Author and Co-authors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Author <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       required
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
//                     <select
//                       multiple
//                       name="coAuthors"
//                       value={formData.coAuthors}
//                       onChange={handleCoAuthorsChange}
//                       className="input-field h-24"
//                     >
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>

//                 {/* Category, Type, Language */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="ebook">Ebook</option>
//                       <option value="journal">Journal</option>
//                       <option value="magazine">Magazine</option>
//                       <option value="rare">Rare Book</option>
//                       <option value="manuscript">Manuscript</option>
//                     </select>
//                   </div>
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
//                       <option value="persian">Persian</option>
//                       <option value="arabic">Arabic</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Cover Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="coverImage"
//                         value={formData.coverImage}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload below"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleCoverUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingCover}
//                       />
//                       <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingCover}>
//                         {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {formData.coverImage && (
//                     <div className="mt-3">
//                       <img src={formData.coverImage} alt="Cover preview" className="h-32 w-auto rounded-lg border shadow-sm object-cover" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Page Images Upload for Book Reader */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Page Images (for book reader)
//                     <span className="text-xs text-gray-500 ml-2">Upload images for page-by-page reading</span>
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//                     <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">Upload page images (JPG, PNG, WebP)</p>
//                     <p className="text-xs text-gray-400 mt-1">Multiple files allowed. Images will be used for page-by-page reading experience.</p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handlePageImagesUpload}
//                       className="mt-3 text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                       disabled={uploadingPages}
//                     />
//                   </div>
                  
//                   {uploadingPages && (
//                     <div className="mt-2 flex items-center gap-2 text-primary-600">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       <span className="text-sm">Uploading images...</span>
//                     </div>
//                   )}
                  
//                   {formData.pageImages && formData.pageImages.length > 0 && (
//                     <div className="mt-3">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-medium text-gray-700">
//                           {formData.pageImages.length} page{formData.pageImages.length !== 1 ? 's' : ''} uploaded
//                         </p>
//                         <p className="text-xs text-gray-500">Total pages will be set automatically</p>
//                       </div>
//                       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
//                         {formData.pageImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img 
//                               src={img} 
//                               alt={`Page ${idx + 1}`} 
//                               className="w-full h-20 object-cover rounded border border-gray-200 shadow-sm"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removePageImage(idx)}
//                               className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                             <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
//                               {idx + 1}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* File URLs */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">PDF URL</label>
//                     <div className="flex gap-2">
//                       <input
//                         type="url"
//                         name="pdfUrl"
//                         value={formData.pdfUrl}
//                         onChange={handleInputChange}
//                         className="input-field flex-1"
//                         placeholder="https://..."
//                       />
//                       <FileIcon className="h-5 w-5 text-gray-400 self-center" />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">EPUB URL</label>
//                     <input
//                       type="url"
//                       name="epubUrl"
//                       value={formData.epubUrl}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                 </div>

//                 {/* Publication Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                     <input
//                       type="number"
//                       name="totalPages"
//                       value={formData.totalPages}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 450"
//                       readOnly={formData.pageImages?.length > 0}
//                     />
//                     {formData.pageImages?.length > 0 && (
//                       <p className="text-xs text-gray-500 mt-1">Auto-set from uploaded images: {formData.pageImages.length}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                     <input
//                       type="text"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Publisher name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
//                     <input
//                       type="number"
//                       name="publishYear"
//                       value={formData.publishYear}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 2024"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
//                     <input
//                       type="text"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="ISBN number"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFree"
//                       checked={formData.isFree}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Free Book</span>
//                   </label>
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
//                     <span className="text-sm text-gray-700">Featured Book</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

//       {/* Bulk Upload Modal */}
//       <AnimatePresence>
//         {showBulkModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
//                 <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
//                   <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
//                   <input
//                     type="file"
//                     accept=".json"
//                     onChange={handleBulkFileChange}
//                     className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
//                   <pre className="text-xs text-blue-600 overflow-x-auto">
// {`[
//   {
//     "title": "Book Title",
//     "slug": "book-title",
//     "description": "Book description",
//     "author": "author_id",
//     "type": "ebook",
//     "language": "urdu",
//     "pdfUrl": "https://...",
//     "isPublished": true
//   }
// ]`}
//                   </pre>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4">
//                   <button
//                     onClick={handleBulkUpload}
//                     disabled={!bulkFile || bulkUploading}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
//                   </button>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EbookCMSPage;














// // client/src/pages/admin/EbookCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Image as ImageIcon, File as FileIcon, Link as LinkIcon,
//   AlertCircle, CheckCircle, WifiOff
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import bookAPI from '../../api/bookAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const EbookCMSPage = () => {
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkUploading, setBulkUploading] = useState(false);
  
//   // Upload states with progress
//   const [uploadingCover, setUploadingCover] = useState(false);
//   const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  
//   const [uploadingPages, setUploadingPages] = useState(false);
//   const [pagesUploadProgress, setPagesUploadProgress] = useState(0);
//   const [pagesUploadedCount, setPagesUploadedCount] = useState(0);
  
//   const [uploadingPdf, setUploadingPdf] = useState(false);
//   const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  
//   const [uploadingEpub, setUploadingEpub] = useState(false);
//   const [epubUploadProgress, setEpubUploadProgress] = useState(0);
  
//   const [uploadError, setUploadError] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
  
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     titleUrdu: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     type: 'ebook',
//     language: 'urdu',
//     coverImage: '',
//     pageImages: [],
//     pdfUrl: '',
//     epubUrl: '',
//     totalPages: '',
//     publisher: '',
//     publishYear: '',
//     isbn: '',
//     isFree: true,
//     isPremium: false,
//     isPublished: false,
//     isFeatured: false
//   });

//   // Monitor online status
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
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
//       const response = await bookAPI.getBooks({ limit: 1000 });
//       let booksList = [];
//       if (response?.data?.data) {
//         booksList = response.data.data;
//       } else if (response?.data) {
//         booksList = response.data;
//       } else if (Array.isArray(response)) {
//         booksList = response;
//       } else {
//         booksList = [];
//       }

//       const exists = booksList.some(book => 
//         book.slug === slug && book._id !== excludeId
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
//       await checkSlugAvailability(newSlug, editingBook?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingBook?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingBook?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload cover image with progress
//   const handleCoverUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     const maxSize = 5 * 1024 * 1024; // 5MB
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 5MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingCover(true);
//     setCoverUploadProgress(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadCover(file, (progress) => {
//         setCoverUploadProgress(progress);
//       });
      
//       if (response?.data?.url || response?.url) {
//         const imageUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, coverImage: imageUrl }));
//         toast.success('Cover image uploaded successfully!');
//         setCoverUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload cover image';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingCover(false);
//       setTimeout(() => setCoverUploadProgress(0), 1000);
//     }
//   };

//   // Upload page images with progress
//   const handlePageImagesUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     // Validate each file
//     const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
//     if (invalidFiles.length > 0) {
//       toast.error(`${invalidFiles.length} file(s) are not images. Only JPG, PNG, WebP allowed.`);
//       return;
//     }

//     const maxSizePerFile = 2 * 1024 * 1024; // 2MB
//     const oversizedFiles = files.filter(file => file.size > maxSizePerFile);
//     if (oversizedFiles.length > 0) {
//       toast.error(`${oversizedFiles.length} file(s) exceed 2MB limit. Please compress them.`);
//       return;
//     }

//     setUploadingPages(true);
//     setPagesUploadProgress(0);
//     setPagesUploadedCount(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadPages(files, (progress) => {
//         setPagesUploadProgress(progress);
//         const uploaded = Math.floor((progress / 100) * files.length);
//         setPagesUploadedCount(uploaded);
//       });
      
//       if (response?.data && Array.isArray(response.data)) {
//         const uploadedUrls = response.data.map(item => item.url);
//         setFormData(prev => ({
//           ...prev,
//           pageImages: [...(prev.pageImages || []), ...uploadedUrls],
//           totalPages: (prev.pageImages?.length || 0) + uploadedUrls.length
//         }));
//         toast.success(`${uploadedUrls.length} page images uploaded successfully!`);
//         setPagesUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload page images';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingPages(false);
//       setTimeout(() => {
//         setPagesUploadProgress(0);
//         setPagesUploadedCount(0);
//       }, 1000);
//     }
//   };

//   // Upload PDF file with progress
//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== 'application/pdf') {
//       toast.error('Please upload a PDF file');
//       return;
//     }

//     const maxSize = 100 * 1024 * 1024; // 100MB
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 100MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingPdf(true);
//     setPdfUploadProgress(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadEbook(file, (progress) => {
//         setPdfUploadProgress(progress);
//       });
      
//       if (response?.data?.url || response?.url) {
//         const pdfUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, pdfUrl: pdfUrl }));
//         toast.success('PDF uploaded successfully!');
//         setPdfUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload PDF';
      
//       // Handle specific error types
//       if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller file or better connection.');
//       } else if (error.message.includes('413')) {
//         toast.error('File too large for server. Please compress or split the file.');
//       } else {
//         toast.error(errorMessage);
//       }
      
//       setUploadError(errorMessage);
//     } finally {
//       setUploadingPdf(false);
//       setTimeout(() => setPdfUploadProgress(0), 1000);
//     }
//   };

//   // Upload EPUB file with progress
//   const handleEpubUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.name.endsWith('.epub')) {
//       toast.error('Please upload an EPUB file');
//       return;
//     }

//     const maxSize = 50 * 1024 * 1024; // 50MB
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 50MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingEpub(true);
//     setEpubUploadProgress(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadEbook(file, (progress) => {
//         setEpubUploadProgress(progress);
//       });
      
//       if (response?.data?.url || response?.url) {
//         const epubUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, epubUrl: epubUrl }));
//         toast.success('EPUB uploaded successfully!');
//         setEpubUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload EPUB';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingEpub(false);
//       setTimeout(() => setEpubUploadProgress(0), 1000);
//     }
//   };

//   // Remove page image
//   const removePageImage = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       pageImages: prev.pageImages.filter((_, index) => index !== indexToRemove),
//       totalPages: (prev.pageImages?.length || 0) - 1
//     }));
//     toast.success('Page image removed');
//   };

//   // Clear upload error
//   const clearUploadError = () => {
//     setUploadError(null);
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

//   // Fetch books
//   const fetchBooks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
//         ...(filterType !== 'all' && { type: filterType })
//       };

//       const response = await bookAPI.getBooks(params);
      
//       let booksData = [];
//       if (response?.data?.data) {
//         booksData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         booksData = response.data;
//       } else if (Array.isArray(response)) {
//         booksData = response;
//       } else {
//         booksData = [];
//       }
      
//       setBooks(Array.isArray(booksData) ? booksData : []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       toast.error('Failed to load books');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchBooks();
//   }, [fetchAuthors, fetchCategories, fetchBooks]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCoAuthorsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a book title');
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

//     const bookData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       subtitle: formData.titleUrdu?.trim() || '',
//       description: formData.description?.trim() || '',
//       author: formData.author,
//       coAuthors: formData.coAuthors,
//       category: formData.category || null,
//       type: formData.type,
//       language: formData.language,
//       coverImage: formData.coverImage || '',
//       pageImages: formData.pageImages || [],
//       pdfUrl: formData.pdfUrl || '',
//       epubUrl: formData.epubUrl || '',
//       totalPages: formData.totalPages ? parseInt(formData.totalPages) : (formData.pageImages?.length || null),
//       publisher: formData.publisher || '',
//       publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
//       isbn: formData.isbn || '',
//       isFree: formData.isFree,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingBook) {
//         await bookAPI.updateBook(editingBook._id, bookData);
//         toast.success('Book updated successfully');
//       } else {
//         await bookAPI.createBook(bookData);
//         toast.success('Book created successfully');
//       }
//       resetModal();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error saving book:', error);
//       const message = error.response?.data?.message || 'Failed to save book';
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
//       await bookAPI.deleteBook(id);
//       toast.success('Book deleted successfully');
//       fetchBooks();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (book) => {
//     setLoading(true);
//     try {
//       await bookAPI.updateBook(book._id, {
//         ...book,
//         isPublished: !book.isPublished
//       });
//       toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
//       fetchBooks();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title || '',
//       slug: book.slug || '',
//       titleUrdu: book.subtitle || '',
//       description: book.description || '',
//       author: typeof book.author === 'object' ? book.author?._id : book.author || '',
//       coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
//       category: book.category?._id || book.category || '',
//       type: book.type || 'ebook',
//       language: book.language || 'urdu',
//       coverImage: book.coverImage || '',
//       pageImages: book.pageImages || [],
//       pdfUrl: book.pdfUrl || '',
//       epubUrl: book.epubUrl || '',
//       totalPages: book.totalPages || '',
//       publisher: book.publisher || '',
//       publishYear: book.publishYear || '',
//       isbn: book.isbn || '',
//       isFree: book.isFree || false,
//       isPremium: book.isPremium || false,
//       isPublished: book.isPublished || false,
//       isFeatured: book.isFeatured || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Handle bulk file upload
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
//       setBulkFile(file);
//       toast.success(`File "${file.name}" selected`);
//     } else {
//       toast.error('Please upload a valid JSON file');
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error('Please select a JSON file');
//       return;
//     }

//     setBulkUploading(true);
//     const reader = new FileReader();
    
//     reader.onload = async (event) => {
//       try {
//         const booksData = JSON.parse(event.target.result);
        
//         if (!Array.isArray(booksData)) {
//           toast.error('JSON file should contain an array of books');
//           return;
//         }

//         let successCount = 0;
//         let errorCount = 0;
//         const errors = [];

//         for (const book of booksData) {
//           try {
//             if (!book.slug && book.title) {
//               book.slug = generateSlugFromTitle(book.title);
//             }
            
//             await bookAPI.createBook(book);
//             successCount++;
//           } catch (err) {
//             console.error(`Failed to upload book: ${book.title}`, err);
//             errorCount++;
//             errors.push({ title: book.title, error: err.response?.data?.message || err.message });
//           }
//         }

//         if (errorCount > 0) {
//           console.warn('Bulk upload errors:', errors);
//           toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed. Check console for details.`);
//         } else {
//           toast.success(`Successfully uploaded ${successCount} books!`);
//         }
        
//         fetchBooks();
//         setShowBulkModal(false);
//         setBulkFile(null);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         toast.error('Invalid JSON format. Please check your file structure.');
//       } finally {
//         setBulkUploading(false);
//       }
//     };

//     reader.onerror = () => {
//       toast.error('Failed to read file');
//       setBulkUploading(false);
//     };

//     reader.readAsText(bulkFile);
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingBook(null);
//     setFormData({
//       title: '',
//       slug: '',
//       titleUrdu: '',
//       description: '',
//       author: '',
//       coAuthors: [],
//       category: '',
//       type: 'ebook',
//       language: 'urdu',
//       coverImage: '',
//       pageImages: [],
//       pdfUrl: '',
//       epubUrl: '',
//       totalPages: '',
//       publisher: '',
//       publishYear: '',
//       isbn: '',
//       isFree: true,
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setSlugAvailable(true);
//     setUploadError(null);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterCategory('all');
//     setFilterStatus('all');
//     setFilterType('all');
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

//   // Progress indicator component
//   const ProgressIndicator = ({ progress, label, isUploading }) => {
//     if (!isUploading && progress === 0) return null;
//     return (
//       <div className="mt-2">
//         <div className="flex items-center justify-between text-sm mb-1">
//           <span className="text-gray-600">{label}</span>
//           <span className="text-gray-500">{Math.round(progress)}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div 
//             className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     );
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
//           <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
//         </div>
//         <div className="flex gap-3">
//           {/* Online Status Indicator */}
//           {!isOnline && (
//             <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
//               <WifiOff className="h-4 w-4" />
//               <span className="text-sm">Offline</span>
//             </div>
//           )}
//           <button
//             onClick={() => setShowBulkModal(true)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <FileText className="h-5 w-5" />
//             <span>Bulk Upload</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             <Upload className="h-5 w-5" />
//             <span>Upload Ebook</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Books</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {books.filter(b => b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {books.filter(b => !b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {books.filter(b => b.isFeatured).length}
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
//             placeholder="Search books by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Types</option>
//           <option value="ebook">Ebook</option>
//           <option value="journal">Journal</option>
//           <option value="magazine">Magazine</option>
//           <option value="rare">Rare</option>
//           <option value="manuscript">Manuscript</option>
//         </select>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
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
//         {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Books Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading books...</p>
//                   </td>
//                 </tr>
//               ) : books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No books found.</p>
//                     {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all books
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 books.map((book) => (
//                   <motion.tr
//                     key={book._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         {book.coverImage ? (
//                           <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover rounded" />
//                         ) : (
//                           <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
//                             <BookOpen className="h-5 w-5 text-blue-600" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{book.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {book.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(book.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === book.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(book.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {book.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(book)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           book.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {book.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <Download className="h-4 w-4" />
//                         <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/book/${book.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Book"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Book"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id, book.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Book"
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

//       {/* Add/Edit Book Modal with Enhanced Upload Handlers */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title and Slug - Same as before */}
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
//                       placeholder="Enter book title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="book-slug"
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

//                 {/* Title Urdu */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu)</label>
//                   <input
//                     type="text"
//                     name="titleUrdu"
//                     value={formData.titleUrdu}
//                     onChange={handleInputChange}
//                     className="input-field urdu-text"
//                     dir="rtl"
//                     placeholder="کتاب کا عنوان اردو میں"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter book description..."
//                   />
//                 </div>

//                 {/* Author and Co-authors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Author <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       required
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
//                     <select
//                       multiple
//                       name="coAuthors"
//                       value={formData.coAuthors}
//                       onChange={handleCoAuthorsChange}
//                       className="input-field h-24"
//                     >
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>

//                 {/* Category, Type, Language */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="ebook">Ebook</option>
//                       <option value="journal">Journal</option>
//                       <option value="magazine">Magazine</option>
//                       <option value="rare">Rare Book</option>
//                       <option value="manuscript">Manuscript</option>
//                     </select>
//                   </div>
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
//                       <option value="persian">Persian</option>
//                       <option value="arabic">Arabic</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Cover Image Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="coverImage"
//                         value={formData.coverImage}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload below"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleCoverUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingCover}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingCover || !isOnline}
//                       >
//                         {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingCover ? 'Uploading...' : 'Upload'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={coverUploadProgress} 
//                     label="Uploading cover..." 
//                     isUploading={uploadingCover} 
//                   />
//                   {formData.coverImage && (
//                     <div className="mt-3">
//                       <img src={formData.coverImage} alt="Cover preview" className="h-32 w-auto rounded-lg border shadow-sm object-cover" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Page Images Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Page Images (for book reader)
//                     <span className="text-xs text-gray-500 ml-2">Upload images for page-by-page reading</span>
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//                     <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">Upload page images (JPG, PNG, WebP)</p>
//                     <p className="text-xs text-gray-400 mt-1">Multiple files allowed. Max 2MB per image.</p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handlePageImagesUpload}
//                       className="mt-3 text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                       disabled={uploadingPages || !isOnline}
//                     />
//                   </div>
                  
//                   <ProgressIndicator 
//                     progress={pagesUploadProgress} 
//                     label={`Uploading pages (${pagesUploadedCount} uploaded)...`} 
//                     isUploading={uploadingPages} 
//                   />
                  
//                   {formData.pageImages && formData.pageImages.length > 0 && (
//                     <div className="mt-3">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-medium text-gray-700">
//                           {formData.pageImages.length} page{formData.pageImages.length !== 1 ? 's' : ''} uploaded
//                         </p>
//                         <p className="text-xs text-gray-500">Total pages will be set automatically</p>
//                       </div>
//                       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
//                         {formData.pageImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img 
//                               src={img} 
//                               alt={`Page ${idx + 1}`} 
//                               className="w-full h-20 object-cover rounded border border-gray-200 shadow-sm"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removePageImage(idx)}
//                               className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                             <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
//                               {idx + 1}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* PDF Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     PDF File <span className="text-red-500">*</span>
//                     <span className="text-xs text-gray-500 ml-2">Upload PDF for download and reading (Max 100MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="pdfUrl"
//                         value={formData.pdfUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload PDF"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".pdf"
//                         onChange={handlePdfUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingPdf || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingPdf || !isOnline}
//                       >
//                         {uploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingPdf ? 'Uploading...' : 'Upload PDF'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={pdfUploadProgress} 
//                     label="Uploading PDF..." 
//                     isUploading={uploadingPdf} 
//                   />
//                   {formData.pdfUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.pdfUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* EPUB Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     EPUB File (Optional)
//                     <span className="text-xs text-gray-500 ml-2">Upload EPUB for alternative format (Max 50MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="epubUrl"
//                         value={formData.epubUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload EPUB"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".epub"
//                         onChange={handleEpubUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingEpub || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingEpub || !isOnline}
//                       >
//                         {uploadingEpub ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingEpub ? 'Uploading...' : 'Upload EPUB'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={epubUploadProgress} 
//                     label="Uploading EPUB..." 
//                     isUploading={uploadingEpub} 
//                   />
//                   {formData.epubUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.epubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.epubUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, epubUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Error Display */}
//                 {uploadError && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-red-700">
//                       <AlertCircle className="h-4 w-4" />
//                       <span className="text-sm">{uploadError}</span>
//                     </div>
//                     <button onClick={clearUploadError} className="text-red-500 hover:text-red-700">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}

//                 {/* Publication Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                     <input
//                       type="number"
//                       name="totalPages"
//                       value={formData.totalPages}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 450"
//                       readOnly={formData.pageImages?.length > 0}
//                     />
//                     {formData.pageImages?.length > 0 && (
//                       <p className="text-xs text-gray-500 mt-1">Auto-set from uploaded images: {formData.pageImages.length}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                     <input
//                       type="text"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Publisher name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
//                     <input
//                       type="number"
//                       name="publishYear"
//                       value={formData.publishYear}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 2024"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
//                     <input
//                       type="text"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="ISBN number"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFree"
//                       checked={formData.isFree}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Free Book</span>
//                   </label>
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
//                     <span className="text-sm text-gray-700">Featured Book</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

//       {/* Bulk Upload Modal */}
//       <AnimatePresence>
//         {showBulkModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
//                 <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
//                   <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
//                   <input
//                     type="file"
//                     accept=".json"
//                     onChange={handleBulkFileChange}
//                     className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
//                   <pre className="text-xs text-blue-600 overflow-x-auto">
// {`[
//   {
//     "title": "Book Title",
//     "slug": "book-title",
//     "description": "Book description",
//     "author": "author_id",
//     "type": "ebook",
//     "language": "urdu",
//     "pdfUrl": "https://...",
//     "isPublished": true
//   }
// ]`}
//                   </pre>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4">
//                   <button
//                     onClick={handleBulkUpload}
//                     disabled={!bulkFile || bulkUploading}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
//                   </button>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EbookCMSPage;












// // client/src/pages/admin/EbookCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Image as ImageIcon, File as FileIcon, Link as LinkIcon,
//   AlertCircle, CheckCircle, WifiOff
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import bookAPI from '../../api/bookAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const EbookCMSPage = () => {
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkUploading, setBulkUploading] = useState(false);
  
//   // Upload states with progress
//   const [uploadingCover, setUploadingCover] = useState(false);
//   const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  
//   const [uploadingPages, setUploadingPages] = useState(false);
//   const [pagesUploadProgress, setPagesUploadProgress] = useState(0);
//   const [pagesUploadedCount, setPagesUploadedCount] = useState(0);
  
//   const [uploadingPdf, setUploadingPdf] = useState(false);
//   const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  
//   const [uploadingEpub, setUploadingEpub] = useState(false);
//   const [epubUploadProgress, setEpubUploadProgress] = useState(0);
  
//   const [uploadError, setUploadError] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
  
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     titleUrdu: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     type: 'ebook',
//     language: 'urdu',
//     coverImage: '',
//     pageImages: [],
//     pdfUrl: '',
//     epubUrl: '',
//     totalPages: '',
//     publisher: '',
//     publishYear: '',
//     isbn: '',
//     isFree: true,
//     isPremium: false,
//     isPublished: false,
//     isFeatured: false
//   });

//   // Monitor online status
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
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
//       const response = await bookAPI.getBooks({ limit: 1000 });
//       let booksList = [];
//       if (response?.data?.data) {
//         booksList = response.data.data;
//       } else if (response?.data) {
//         booksList = response.data;
//       } else if (Array.isArray(response)) {
//         booksList = response;
//       } else {
//         booksList = [];
//       }

//       const exists = booksList.some(book => 
//         book.slug === slug && book._id !== excludeId
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
//       await checkSlugAvailability(newSlug, editingBook?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingBook?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingBook?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload cover image with progress
//   const handleCoverUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 5MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingCover(true);
//     setCoverUploadProgress(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadCover(file, (progress) => {
//         setCoverUploadProgress(progress);
//       });
      
//       if (response?.data?.url || response?.url) {
//         const imageUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, coverImage: imageUrl }));
//         toast.success('Cover image uploaded successfully!');
//         setCoverUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload cover image';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingCover(false);
//       setTimeout(() => setCoverUploadProgress(0), 1000);
//     }
//   };

//   // Upload page images with progress
//   const handlePageImagesUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
//     if (invalidFiles.length > 0) {
//       toast.error(`${invalidFiles.length} file(s) are not images. Only JPG, PNG, WebP allowed.`);
//       return;
//     }

//     const maxSizePerFile = 2 * 1024 * 1024;
//     const oversizedFiles = files.filter(file => file.size > maxSizePerFile);
//     if (oversizedFiles.length > 0) {
//       toast.error(`${oversizedFiles.length} file(s) exceed 2MB limit. Please compress them.`);
//       return;
//     }

//     setUploadingPages(true);
//     setPagesUploadProgress(0);
//     setPagesUploadedCount(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadPages(files, (progress) => {
//         setPagesUploadProgress(progress);
//         const uploaded = Math.floor((progress / 100) * files.length);
//         setPagesUploadedCount(uploaded);
//       });
      
//       if (response?.data && Array.isArray(response.data)) {
//         const uploadedUrls = response.data.map(item => item.url);
//         setFormData(prev => ({
//           ...prev,
//           pageImages: [...(prev.pageImages || []), ...uploadedUrls],
//           totalPages: (prev.pageImages?.length || 0) + uploadedUrls.length
//         }));
//         toast.success(`${uploadedUrls.length} page images uploaded successfully!`);
//         setPagesUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload page images';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingPages(false);
//       setTimeout(() => {
//         setPagesUploadProgress(0);
//         setPagesUploadedCount(0);
//       }, 1000);
//     }
//   };

//   // ============================================
//   // FIXED: PDF Upload Handler with better error handling
//   // ============================================
//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
//       toast.error('Please upload a valid PDF file');
//       e.target.value = '';
//       return;
//     }

//     const maxSize = 100 * 1024 * 1024; // 100MB
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 100MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       e.target.value = '';
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingPdf(true);
//     setPdfUploadProgress(0);
//     setUploadError(null);

//     try {
//       console.log('📄 Starting PDF upload:', file.name, file.size, 'bytes');
      
//       const response = await uploadAPI.uploadPDF(file, (progress) => {
//         setPdfUploadProgress(progress);
//         console.log(`PDF upload progress: ${Math.round(progress)}%`);
//       });
      
//       console.log('PDF upload response:', response);
      
//       if (response?.data?.url || response?.url) {
//         const pdfUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, pdfUrl: pdfUrl }));
//         toast.success('PDF uploaded successfully!');
//         setPdfUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server - no URL returned');
//       }
//     } catch (error) {
//       console.error('PDF upload error:', error);
      
//       let errorMessage = 'Failed to upload PDF';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller file or better connection.');
//       } else if (error.message?.includes('413')) {
//         toast.error('File too large for server. Please compress the file.');
//       } else {
//         toast.error(errorMessage);
//       }
      
//       setUploadError(errorMessage);
//     } finally {
//       setUploadingPdf(false);
//       e.target.value = ''; // Reset input
//       setTimeout(() => setPdfUploadProgress(0), 1000);
//     }
//   };

//   // ============================================
//   // FIXED: EPUB Upload Handler with better error handling
//   // ============================================
//   const handleEpubUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type - check both MIME type and extension
//     const isValidEpub = file.type === 'application/epub+zip' || 
//                         file.name.toLowerCase().endsWith('.epub');
    
//     if (!isValidEpub) {
//       toast.error('Please upload a valid EPUB file (.epub)');
//       e.target.value = '';
//       return;
//     }

//     const maxSize = 50 * 1024 * 1024; // 50MB
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 50MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       e.target.value = '';
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingEpub(true);
//     setEpubUploadProgress(0);
//     setUploadError(null);

//     try {
//       console.log('📖 Starting EPUB upload:', file.name, file.size, 'bytes');
//       console.log('  - File type:', file.type);
//       console.log('  - File extension:', file.name.split('.').pop());
      
//       const response = await uploadAPI.uploadEPUB(file, (progress) => {
//         setEpubUploadProgress(progress);
//         console.log(`EPUB upload progress: ${Math.round(progress)}%`);
//       });
      
//       console.log('EPUB upload response:', response);
      
//       if (response?.data?.url || response?.url) {
//         const epubUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, epubUrl: epubUrl }));
//         toast.success('EPUB uploaded successfully!');
//         setEpubUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server - no URL returned');
//       }
//     } catch (error) {
//       console.error('EPUB upload error:', error);
      
//       let errorMessage = 'Failed to upload EPUB';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       // Provide more specific error messages
//       if (error.message?.includes('Only EPUB files are allowed')) {
//         toast.error('Invalid file type. Please upload a valid .epub file.');
//       } else if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller file.');
//       } else {
//         toast.error(errorMessage);
//       }
      
//       setUploadError(errorMessage);
//     } finally {
//       setUploadingEpub(false);
//       e.target.value = ''; // Reset input
//       setTimeout(() => setEpubUploadProgress(0), 1000);
//     }
//   };

//   // Remove page image
//   const removePageImage = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       pageImages: prev.pageImages.filter((_, index) => index !== indexToRemove),
//       totalPages: (prev.pageImages?.length || 0) - 1
//     }));
//     toast.success('Page image removed');
//   };

//   // Clear upload error
//   const clearUploadError = () => {
//     setUploadError(null);
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

//   // Fetch books
//   const fetchBooks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
//         ...(filterType !== 'all' && { type: filterType })
//       };

//       const response = await bookAPI.getBooks(params);
      
//       let booksData = [];
//       if (response?.data?.data) {
//         booksData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         booksData = response.data;
//       } else if (Array.isArray(response)) {
//         booksData = response;
//       } else {
//         booksData = [];
//       }
      
//       setBooks(Array.isArray(booksData) ? booksData : []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       toast.error('Failed to load books');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchBooks();
//   }, [fetchAuthors, fetchCategories, fetchBooks]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCoAuthorsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a book title');
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

//     const bookData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       subtitle: formData.titleUrdu?.trim() || '',
//       description: formData.description?.trim() || '',
//       author: formData.author,
//       coAuthors: formData.coAuthors,
//       category: formData.category || null,
//       type: formData.type,
//       language: formData.language,
//       coverImage: formData.coverImage || '',
//       pageImages: formData.pageImages || [],
//       pdfUrl: formData.pdfUrl || '',
//       epubUrl: formData.epubUrl || '',
//       totalPages: formData.totalPages ? parseInt(formData.totalPages) : (formData.pageImages?.length || null),
//       publisher: formData.publisher || '',
//       publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
//       isbn: formData.isbn || '',
//       isFree: formData.isFree,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingBook) {
//         await bookAPI.updateBook(editingBook._id, bookData);
//         toast.success('Book updated successfully');
//       } else {
//         await bookAPI.createBook(bookData);
//         toast.success('Book created successfully');
//       }
//       resetModal();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error saving book:', error);
//       const message = error.response?.data?.message || 'Failed to save book';
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
//       await bookAPI.deleteBook(id);
//       toast.success('Book deleted successfully');
//       fetchBooks();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (book) => {
//     setLoading(true);
//     try {
//       await bookAPI.updateBook(book._id, {
//         ...book,
//         isPublished: !book.isPublished
//       });
//       toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
//       fetchBooks();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title || '',
//       slug: book.slug || '',
//       titleUrdu: book.subtitle || '',
//       description: book.description || '',
//       author: typeof book.author === 'object' ? book.author?._id : book.author || '',
//       coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
//       category: book.category?._id || book.category || '',
//       type: book.type || 'ebook',
//       language: book.language || 'urdu',
//       coverImage: book.coverImage || '',
//       pageImages: book.pageImages || [],
//       pdfUrl: book.pdfUrl || '',
//       epubUrl: book.epubUrl || '',
//       totalPages: book.totalPages || '',
//       publisher: book.publisher || '',
//       publishYear: book.publishYear || '',
//       isbn: book.isbn || '',
//       isFree: book.isFree || false,
//       isPremium: book.isPremium || false,
//       isPublished: book.isPublished || false,
//       isFeatured: book.isFeatured || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Handle bulk file upload
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
//       setBulkFile(file);
//       toast.success(`File "${file.name}" selected`);
//     } else {
//       toast.error('Please upload a valid JSON file');
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error('Please select a JSON file');
//       return;
//     }

//     setBulkUploading(true);
//     const reader = new FileReader();
    
//     reader.onload = async (event) => {
//       try {
//         const booksData = JSON.parse(event.target.result);
        
//         if (!Array.isArray(booksData)) {
//           toast.error('JSON file should contain an array of books');
//           return;
//         }

//         let successCount = 0;
//         let errorCount = 0;
//         const errors = [];

//         for (const book of booksData) {
//           try {
//             if (!book.slug && book.title) {
//               book.slug = generateSlugFromTitle(book.title);
//             }
            
//             await bookAPI.createBook(book);
//             successCount++;
//           } catch (err) {
//             console.error(`Failed to upload book: ${book.title}`, err);
//             errorCount++;
//             errors.push({ title: book.title, error: err.response?.data?.message || err.message });
//           }
//         }

//         if (errorCount > 0) {
//           console.warn('Bulk upload errors:', errors);
//           toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed. Check console for details.`);
//         } else {
//           toast.success(`Successfully uploaded ${successCount} books!`);
//         }
        
//         fetchBooks();
//         setShowBulkModal(false);
//         setBulkFile(null);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         toast.error('Invalid JSON format. Please check your file structure.');
//       } finally {
//         setBulkUploading(false);
//       }
//     };

//     reader.onerror = () => {
//       toast.error('Failed to read file');
//       setBulkUploading(false);
//     };

//     reader.readAsText(bulkFile);
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingBook(null);
//     setFormData({
//       title: '',
//       slug: '',
//       titleUrdu: '',
//       description: '',
//       author: '',
//       coAuthors: [],
//       category: '',
//       type: 'ebook',
//       language: 'urdu',
//       coverImage: '',
//       pageImages: [],
//       pdfUrl: '',
//       epubUrl: '',
//       totalPages: '',
//       publisher: '',
//       publishYear: '',
//       isbn: '',
//       isFree: true,
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setSlugAvailable(true);
//     setUploadError(null);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterCategory('all');
//     setFilterStatus('all');
//     setFilterType('all');
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

//   // Progress indicator component
//   const ProgressIndicator = ({ progress, label, isUploading }) => {
//     if (!isUploading && progress === 0) return null;
//     return (
//       <div className="mt-2">
//         <div className="flex items-center justify-between text-sm mb-1">
//           <span className="text-gray-600">{label}</span>
//           <span className="text-gray-500">{Math.round(progress)}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div 
//             className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     );
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
//           <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
//         </div>
//         <div className="flex gap-3">
//           {/* Online Status Indicator */}
//           {!isOnline && (
//             <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
//               <WifiOff className="h-4 w-4" />
//               <span className="text-sm">Offline</span>
//             </div>
//           )}
//           <button
//             onClick={() => setShowBulkModal(true)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <FileText className="h-5 w-5" />
//             <span>Bulk Upload</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             <Upload className="h-5 w-5" />
//             <span>Upload Ebook</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Books</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {books.filter(b => b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {books.filter(b => !b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {books.filter(b => b.isFeatured).length}
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
//             placeholder="Search books by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Types</option>
//           <option value="ebook">Ebook</option>
//           <option value="journal">Journal</option>
//           <option value="magazine">Magazine</option>
//           <option value="rare">Rare</option>
//           <option value="manuscript">Manuscript</option>
//         </select>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
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
//         {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Books Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading books...</p>
//                   </td>
//                 </tr>
//               ) : books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No books found.</p>
//                     {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all books
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ) : (
//                 books.map((book) => (
//                   <motion.tr
//                     key={book._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         {book.coverImage ? (
//                           <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover rounded" />
//                         ) : (
//                           <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
//                             <BookOpen className="h-5 w-5 text-blue-600" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{book.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {book.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(book.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === book.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(book.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {book.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(book)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           book.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {book.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <Download className="h-4 w-4" />
//                         <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/book/${book.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Book"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Book"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id, book.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Book"
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

//       {/* Add/Edit Book Modal with Enhanced Upload Handlers */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
//                 </h2>
//                 <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 {/* Title and Slug - Same as before */}
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
//                       placeholder="Enter book title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="book-slug"
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

//                 {/* Title Urdu */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu)</label>
//                   <input
//                     type="text"
//                     name="titleUrdu"
//                     value={formData.titleUrdu}
//                     onChange={handleInputChange}
//                     className="input-field urdu-text"
//                     dir="rtl"
//                     placeholder="کتاب کا عنوان اردو میں"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter book description..."
//                   />
//                 </div>

//                 {/* Author and Co-authors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Author <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       required
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
//                     <select
//                       multiple
//                       name="coAuthors"
//                       value={formData.coAuthors}
//                       onChange={handleCoAuthorsChange}
//                       className="input-field h-24"
//                     >
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>

//                 {/* Category, Type, Language */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="ebook">Ebook</option>
//                       <option value="journal">Journal</option>
//                       <option value="magazine">Magazine</option>
//                       <option value="rare">Rare Book</option>
//                       <option value="manuscript">Manuscript</option>
//                     </select>
//                   </div>
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
//                       <option value="persian">Persian</option>
//                       <option value="arabic">Arabic</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Cover Image Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="coverImage"
//                         value={formData.coverImage}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload below"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleCoverUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingCover}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingCover || !isOnline}
//                       >
//                         {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingCover ? 'Uploading...' : 'Upload'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={coverUploadProgress} 
//                     label="Uploading cover..." 
//                     isUploading={uploadingCover} 
//                   />
//                   {formData.coverImage && (
//                     <div className="mt-3">
//                       <img src={formData.coverImage} alt="Cover preview" className="h-32 w-auto rounded-lg border shadow-sm object-cover" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Page Images Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Page Images (for book reader)
//                     <span className="text-xs text-gray-500 ml-2">Upload images for page-by-page reading</span>
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//                     <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">Upload page images (JPG, PNG, WebP)</p>
//                     <p className="text-xs text-gray-400 mt-1">Multiple files allowed. Max 2MB per image.</p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handlePageImagesUpload}
//                       className="mt-3 text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                       disabled={uploadingPages || !isOnline}
//                     />
//                   </div>
                  
//                   <ProgressIndicator 
//                     progress={pagesUploadProgress} 
//                     label={`Uploading pages (${pagesUploadedCount} uploaded)...`} 
//                     isUploading={uploadingPages} 
//                   />
                  
//                   {formData.pageImages && formData.pageImages.length > 0 && (
//                     <div className="mt-3">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-medium text-gray-700">
//                           {formData.pageImages.length} page{formData.pageImages.length !== 1 ? 's' : ''} uploaded
//                         </p>
//                         <p className="text-xs text-gray-500">Total pages will be set automatically</p>
//                       </div>
//                       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
//                         {formData.pageImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img 
//                               src={img} 
//                               alt={`Page ${idx + 1}`} 
//                               className="w-full h-20 object-cover rounded border border-gray-200 shadow-sm"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removePageImage(idx)}
//                               className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                             <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
//                               {idx + 1}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* PDF Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     PDF File <span className="text-red-500">*</span>
//                     <span className="text-xs text-gray-500 ml-2">Upload PDF for download and reading (Max 100MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="pdfUrl"
//                         value={formData.pdfUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload PDF"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".pdf"
//                         onChange={handlePdfUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingPdf || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingPdf || !isOnline}
//                       >
//                         {uploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingPdf ? 'Uploading...' : 'Upload PDF'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={pdfUploadProgress} 
//                     label="Uploading PDF..." 
//                     isUploading={uploadingPdf} 
//                   />
//                   {formData.pdfUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.pdfUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* EPUB Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     EPUB File (Optional)
//                     <span className="text-xs text-gray-500 ml-2">Upload EPUB for alternative format (Max 50MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="epubUrl"
//                         value={formData.epubUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload EPUB"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".epub"
//                         onChange={handleEpubUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingEpub || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingEpub || !isOnline}
//                       >
//                         {uploadingEpub ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingEpub ? 'Uploading...' : 'Upload EPUB'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={epubUploadProgress} 
//                     label="Uploading EPUB..." 
//                     isUploading={uploadingEpub} 
//                   />
//                   {formData.epubUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.epubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.epubUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, epubUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Error Display */}
//                 {uploadError && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-red-700">
//                       <AlertCircle className="h-4 w-4" />
//                       <span className="text-sm">{uploadError}</span>
//                     </div>
//                     <button onClick={clearUploadError} className="text-red-500 hover:text-red-700">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}

//                 {/* Publication Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                     <input
//                       type="number"
//                       name="totalPages"
//                       value={formData.totalPages}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 450"
//                       readOnly={formData.pageImages?.length > 0}
//                     />
//                     {formData.pageImages?.length > 0 && (
//                       <p className="text-xs text-gray-500 mt-1">Auto-set from uploaded images: {formData.pageImages.length}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                     <input
//                       type="text"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Publisher name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
//                     <input
//                       type="number"
//                       name="publishYear"
//                       value={formData.publishYear}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 2024"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
//                     <input
//                       type="text"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="ISBN number"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFree"
//                       checked={formData.isFree}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Free Book</span>
//                   </label>
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
//                     <span className="text-sm text-gray-700">Featured Book</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

//       {/* Bulk Upload Modal */}
//       <AnimatePresence>
//         {showBulkModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
//                 <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
//                   <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
//                   <input
//                     type="file"
//                     accept=".json"
//                     onChange={handleBulkFileChange}
//                     className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
//                   <pre className="text-xs text-blue-600 overflow-x-auto">
// {`[
//   {
//     "title": "Book Title",
//     "slug": "book-title",
//     "description": "Book description",
//     "author": "author_id",
//     "type": "ebook",
//     "language": "urdu",
//     "pdfUrl": "https://...",
//     "isPublished": true
//   }
// ]`}
//                   </pre>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4">
//                   <button
//                     onClick={handleBulkUpload}
//                     disabled={!bulkFile || bulkUploading}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
//                   </button>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EbookCMSPage;






















// // client/src/pages/admin/EbookCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search, Plus, Edit, Trash2, Eye, Upload, FileText,
//   Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
//   AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
//   Image as ImageIcon, File as FileIcon, Link as LinkIcon,
//   AlertCircle, CheckCircle, WifiOff
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import bookAPI from '../../api/bookAPI';
// import authorAPI from '../../api/authorAPI';
// import categoryAPI from '../../api/categoryAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const EbookCMSPage = () => {
//   const [books, setBooks] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [authorsLoading, setAuthorsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterType, setFilterType] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [copiedSlug, setCopiedSlug] = useState(null);
//   const [slugAvailable, setSlugAvailable] = useState(true);
//   const [checkingSlug, setCheckingSlug] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkUploading, setBulkUploading] = useState(false);
  
//   // Upload states with progress
//   const [uploadingCover, setUploadingCover] = useState(false);
//   const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  
//   const [uploadingPages, setUploadingPages] = useState(false);
//   const [pagesUploadProgress, setPagesUploadProgress] = useState(0);
//   const [pagesUploadedCount, setPagesUploadedCount] = useState(0);
  
//   const [uploadingPdf, setUploadingPdf] = useState(false);
//   const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  
//   const [uploadingEpub, setUploadingEpub] = useState(false);
//   const [epubUploadProgress, setEpubUploadProgress] = useState(0);
  
//   const [uploadError, setUploadError] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
  
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     titleUrdu: '',      // Maps to subtitle in backend
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     type: 'ebook',
//     language: 'urdu',
//     coverImage: '',
//     pageImages: [],
//     pdfUrl: '',
//     epubUrl: '',
//     totalPages: '',
//     publisher: '',
//     publishYear: '',
//     isbn: '',
//     isFree: true,
//     isPremium: false,
//     isPublished: false,
//     isFeatured: false
//   });

//   // Monitor online status
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
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
//       const response = await bookAPI.getBooks({ limit: 1000 });
//       let booksList = [];
//       if (response?.data?.data) {
//         booksList = response.data.data;
//       } else if (response?.data) {
//         booksList = response.data;
//       } else if (Array.isArray(response)) {
//         booksList = response;
//       } else {
//         booksList = [];
//       }

//       const exists = booksList.some(book => 
//         book.slug === slug && book._id !== excludeId
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
//       await checkSlugAvailability(newSlug, editingBook?._id);
//     }
//   };

//   // Handle slug manual edit
//   const handleSlugChange = async (e) => {
//     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     setFormData(prev => ({ ...prev, slug }));
//     await checkSlugAvailability(slug, editingBook?._id);
//   };

//   // Regenerate slug from title
//   const regenerateSlug = async () => {
//     const newSlug = generateSlugFromTitle(formData.title);
//     setFormData(prev => ({ ...prev, slug: newSlug }));
//     await checkSlugAvailability(newSlug, editingBook?._id);
//     toast.success('Slug regenerated from title');
//   };

//   // Upload cover image with progress
//   const handleCoverUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     const maxSize = 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 5MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingCover(true);
//     setCoverUploadProgress(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadCover(file, (progress) => {
//         setCoverUploadProgress(progress);
//       });
      
//       if (response?.data?.url || response?.url) {
//         const imageUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, coverImage: imageUrl }));
//         toast.success('Cover image uploaded successfully!');
//         setCoverUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload cover image';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingCover(false);
//       setTimeout(() => setCoverUploadProgress(0), 1000);
//     }
//   };

//   // Upload page images with progress
//   const handlePageImagesUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
//     if (invalidFiles.length > 0) {
//       toast.error(`${invalidFiles.length} file(s) are not images. Only JPG, PNG, WebP allowed.`);
//       return;
//     }

//     const maxSizePerFile = 2 * 1024 * 1024;
//     const oversizedFiles = files.filter(file => file.size > maxSizePerFile);
//     if (oversizedFiles.length > 0) {
//       toast.error(`${oversizedFiles.length} file(s) exceed 2MB limit. Please compress them.`);
//       return;
//     }

//     setUploadingPages(true);
//     setPagesUploadProgress(0);
//     setPagesUploadedCount(0);
//     setUploadError(null);

//     try {
//       const response = await uploadAPI.uploadPages(files, (progress) => {
//         setPagesUploadProgress(progress);
//         const uploaded = Math.floor((progress / 100) * files.length);
//         setPagesUploadedCount(uploaded);
//       });
      
//       if (response?.data && Array.isArray(response.data)) {
//         const uploadedUrls = response.data.map(item => item.url);
//         setFormData(prev => ({
//           ...prev,
//           pageImages: [...(prev.pageImages || []), ...uploadedUrls],
//           totalPages: (prev.pageImages?.length || 0) + uploadedUrls.length
//         }));
//         toast.success(`${uploadedUrls.length} page images uploaded successfully!`);
//         setPagesUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to upload page images';
//       setUploadError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setUploadingPages(false);
//       setTimeout(() => {
//         setPagesUploadProgress(0);
//         setPagesUploadedCount(0);
//       }, 1000);
//     }
//   };

//   // PDF Upload Handler
//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
//       toast.error('Please upload a valid PDF file');
//       e.target.value = '';
//       return;
//     }

//     const maxSize = 100 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 100MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       e.target.value = '';
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingPdf(true);
//     setPdfUploadProgress(0);
//     setUploadError(null);

//     try {
//       console.log('📄 Starting PDF upload:', file.name, file.size, 'bytes');
      
//       const response = await uploadAPI.uploadPDF(file, (progress) => {
//         setPdfUploadProgress(progress);
//         console.log(`PDF upload progress: ${Math.round(progress)}%`);
//       });
      
//       console.log('PDF upload response:', response);
      
//       if (response?.data?.url || response?.url) {
//         const pdfUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, pdfUrl: pdfUrl }));
//         toast.success('PDF uploaded successfully!');
//         setPdfUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server - no URL returned');
//       }
//     } catch (error) {
//       console.error('PDF upload error:', error);
      
//       let errorMessage = 'Failed to upload PDF';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller file or better connection.');
//       } else if (error.message?.includes('413')) {
//         toast.error('File too large for server. Please compress the file.');
//       } else {
//         toast.error(errorMessage);
//       }
      
//       setUploadError(errorMessage);
//     } finally {
//       setUploadingPdf(false);
//       e.target.value = '';
//       setTimeout(() => setPdfUploadProgress(0), 1000);
//     }
//   };

//   // EPUB Upload Handler
//   const handleEpubUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const isValidEpub = file.type === 'application/epub+zip' || 
//                         file.name.toLowerCase().endsWith('.epub');
    
//     if (!isValidEpub) {
//       toast.error('Please upload a valid EPUB file (.epub)');
//       e.target.value = '';
//       return;
//     }

//     const maxSize = 50 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast.error(`File too large. Max size is 50MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
//       e.target.value = '';
//       return;
//     }

//     if (!isOnline) {
//       toast.error('No internet connection. Please check your network.');
//       return;
//     }

//     setUploadingEpub(true);
//     setEpubUploadProgress(0);
//     setUploadError(null);

//     try {
//       console.log('📖 Starting EPUB upload:', file.name, file.size, 'bytes');
      
//       const response = await uploadAPI.uploadEPUB(file, (progress) => {
//         setEpubUploadProgress(progress);
//         console.log(`EPUB upload progress: ${Math.round(progress)}%`);
//       });
      
//       console.log('EPUB upload response:', response);
      
//       if (response?.data?.url || response?.url) {
//         const epubUrl = response.data?.url || response.url;
//         setFormData(prev => ({ ...prev, epubUrl: epubUrl }));
//         toast.success('EPUB uploaded successfully!');
//         setEpubUploadProgress(100);
//       } else {
//         throw new Error('Invalid response from server - no URL returned');
//       }
//     } catch (error) {
//       console.error('EPUB upload error:', error);
      
//       let errorMessage = 'Failed to upload EPUB';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       if (error.message?.includes('Only EPUB files are allowed')) {
//         toast.error('Invalid file type. Please upload a valid .epub file.');
//       } else if (error.code === 'ECONNABORTED') {
//         toast.error('Upload timeout. Please try again with a smaller file.');
//       } else {
//         toast.error(errorMessage);
//       }
      
//       setUploadError(errorMessage);
//     } finally {
//       setUploadingEpub(false);
//       e.target.value = '';
//       setTimeout(() => setEpubUploadProgress(0), 1000);
//     }
//   };

//   // Remove page image
//   const removePageImage = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       pageImages: prev.pageImages.filter((_, index) => index !== indexToRemove),
//       totalPages: (prev.pageImages?.length || 0) - 1
//     }));
//     toast.success('Page image removed');
//   };

//   // Clear upload error
//   const clearUploadError = () => {
//     setUploadError(null);
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

//   // Fetch books
//   const fetchBooks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' }),
//         ...(filterType !== 'all' && { type: filterType })
//       };

//       const response = await bookAPI.getBooks(params);
      
//       let booksData = [];
//       if (response?.data?.data) {
//         booksData = response.data.data;
//         if (response.data.pagination) setPagination(response.data.pagination);
//       } else if (response?.data) {
//         booksData = response.data;
//       } else if (Array.isArray(response)) {
//         booksData = response;
//       } else {
//         booksData = [];
//       }
      
//       setBooks(Array.isArray(booksData) ? booksData : []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       toast.error('Failed to load books');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchCategories();
//     fetchBooks();
//   }, [fetchAuthors, fetchCategories, fetchBooks]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCoAuthorsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
//   };

//   // ============================================
//   // FIXED: handleSubmit - Maps titleUrdu to subtitle
//   // ============================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a book title');
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

//     // Validate PDF URL for published books
//     if (formData.isPublished && !formData.pdfUrl && (!formData.pageImages || formData.pageImages.length === 0)) {
//       toast.error('Please upload either a PDF file or page images before publishing');
//       return;
//     }

//     // Prepare book data matching backend schema
//     const bookData = {
//       title: formData.title.trim(),
//       slug: formData.slug,
//       subtitle: formData.titleUrdu?.trim() || '',  // Map titleUrdu to subtitle
//       description: formData.description?.trim() || '',
//       author: formData.author,
//       coAuthors: formData.coAuthors || [],
//       category: formData.category || null,
//       type: formData.type,
//       language: formData.language,
//       coverImage: formData.coverImage || '',
//       pageImages: formData.pageImages || [],
//       pdfUrl: formData.pdfUrl || '',
//       epubUrl: formData.epubUrl || '',
//       totalPages: formData.pageImages?.length || (formData.totalPages ? parseInt(formData.totalPages) : null),
//       publisher: formData.publisher || '',
//       publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
//       isbn: formData.isbn || '',
//       isFree: formData.isFree,
//       isPremium: formData.isPremium,
//       isPublished: formData.isPublished,
//       isFeatured: formData.isFeatured
//     };

//     setLoading(true);
//     try {
//       if (editingBook) {
//         await bookAPI.updateBook(editingBook._id, bookData);
//         toast.success('Book updated successfully');
//       } else {
//         await bookAPI.createBook(bookData);
//         toast.success('Book created successfully');
//       }
//       resetModal();
//       fetchBooks();
//     } catch (error) {
//       console.error('Error saving book:', error);
//       const message = error.response?.data?.message || 'Failed to save book';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // FIXED: handleEdit - Maps subtitle to titleUrdu
//   // ============================================
//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title || '',
//       slug: book.slug || '',
//       titleUrdu: book.subtitle || '',  // Map subtitle to titleUrdu
//       description: book.description || '',
//       author: typeof book.author === 'object' ? book.author?._id : book.author || '',
//       coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
//       category: book.category?._id || book.category || '',
//       type: book.type || 'ebook',
//       language: book.language || 'urdu',
//       coverImage: book.coverImage || '',
//       pageImages: book.pageImages || [],
//       pdfUrl: book.pdfUrl || '',
//       epubUrl: book.epubUrl || '',
//       totalPages: book.totalPages || '',
//       publisher: book.publisher || '',
//       publishYear: book.publishYear || '',
//       isbn: book.isbn || '',
//       isFree: book.isFree || false,
//       isPremium: book.isPremium || false,
//       isPublished: book.isPublished || false,
//       isFeatured: book.isFeatured || false
//     });
//     setSlugAvailable(true);
//     setShowAddModal(true);
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//       return;
//     }

//     setLoading(true);
//     try {
//       await bookAPI.deleteBook(id);
//       toast.success('Book deleted successfully');
//       fetchBooks();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePublish = async (book) => {
//     setLoading(true);
//     try {
//       await bookAPI.updateBook(book._id, {
//         ...book,
//         isPublished: !book.isPublished
//       });
//       toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
//       fetchBooks();
//     } catch (error) {
//       toast.error('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopySlug = async (slug) => {
//     try {
//       await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
//       setCopiedSlug(slug);
//       toast.success('Link copied to clipboard!');
//       setTimeout(() => setCopiedSlug(null), 2000);
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   // Handle bulk file upload
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
//       setBulkFile(file);
//       toast.success(`File "${file.name}" selected`);
//     } else {
//       toast.error('Please upload a valid JSON file');
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error('Please select a JSON file');
//       return;
//     }

//     setBulkUploading(true);
//     const reader = new FileReader();
    
//     reader.onload = async (event) => {
//       try {
//         const booksData = JSON.parse(event.target.result);
        
//         if (!Array.isArray(booksData)) {
//           toast.error('JSON file should contain an array of books');
//           return;
//         }

//         let successCount = 0;
//         let errorCount = 0;
//         const errors = [];

//         for (const book of booksData) {
//           try {
//             if (!book.slug && book.title) {
//               book.slug = generateSlugFromTitle(book.title);
//             }
//             await bookAPI.createBook(book);
//             successCount++;
//           } catch (err) {
//             console.error(`Failed to upload book: ${book.title}`, err);
//             errorCount++;
//             errors.push({ title: book.title, error: err.response?.data?.message || err.message });
//           }
//         }

//         if (errorCount > 0) {
//           console.warn('Bulk upload errors:', errors);
//           toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed. Check console for details.`);
//         } else {
//           toast.success(`Successfully uploaded ${successCount} books!`);
//         }
        
//         fetchBooks();
//         setShowBulkModal(false);
//         setBulkFile(null);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         toast.error('Invalid JSON format. Please check your file structure.');
//       } finally {
//         setBulkUploading(false);
//       }
//     };

//     reader.onerror = () => {
//       toast.error('Failed to read file');
//       setBulkUploading(false);
//     };

//     reader.readAsText(bulkFile);
//   };

//   const resetModal = () => {
//     setShowAddModal(false);
//     setEditingBook(null);
//     setFormData({
//       title: '',
//       slug: '',
//       titleUrdu: '',
//       description: '',
//       author: '',
//       coAuthors: [],
//       category: '',
//       type: 'ebook',
//       language: 'urdu',
//       coverImage: '',
//       pageImages: [],
//       pdfUrl: '',
//       epubUrl: '',
//       totalPages: '',
//       publisher: '',
//       publishYear: '',
//       isbn: '',
//       isFree: true,
//       isPremium: false,
//       isPublished: false,
//       isFeatured: false
//     });
//     setSlugAvailable(true);
//     setUploadError(null);
//   };

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterCategory('all');
//     setFilterStatus('all');
//     setFilterType('all');
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

//   // Progress indicator component
//   const ProgressIndicator = ({ progress, label, isUploading }) => {
//     if (!isUploading && progress === 0) return null;
//     return (
//       <div className="mt-2">
//         <div className="flex items-center justify-between text-sm mb-1">
//           <span className="text-gray-600">{label}</span>
//           <span className="text-gray-500">{Math.round(progress)}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div 
//             className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     );
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
//           <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
//         </div>
//         <div className="flex gap-3">
//           {/* Online Status Indicator */}
//           {!isOnline && (
//             <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
//               <WifiOff className="h-4 w-4" />
//               <span className="text-sm">Offline</span>
//             </div>
//           )}
//           <button
//             onClick={() => setShowBulkModal(true)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <FileText className="h-5 w-5" />
//             <span>Bulk Upload</span>
//           </button>
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             <Upload className="h-5 w-5" />
//             <span>Upload Ebook</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Books</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {books.filter(b => b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {books.filter(b => !b.isPublished).length}
//           </p>
//           <p className="text-sm text-gray-500">Draft</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">
//             {books.filter(b => b.isFeatured).length}
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
//             placeholder="Search books by title or slug..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-10"
//           />
//         </div>
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="input-field w-full md:w-36"
//         >
//           <option value="all">All Types</option>
//           <option value="ebook">Ebook</option>
//           <option value="journal">Journal</option>
//           <option value="magazine">Magazine</option>
//           <option value="rare">Rare</option>
//           <option value="manuscript">Manuscript</option>
//         </select>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-full md:w-40"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
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
//         {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all') && (
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Books Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading && books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center">
//                     <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
//                     <p className="text-gray-500 mt-2">Loading books...</p>
//                    </td>
//                  </tr>
//               ) : books.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     <p>No books found.</p>
//                     {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
//                       <button onClick={clearFilters} className="text-primary-600 mt-2">
//                         Clear filters to see all books
//                       </button>
//                     )}
//                    </td>
//                  </tr>
//               ) : (
//                 books.map((book) => (
//                   <motion.tr
//                     key={book._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-3">
//                         {book.coverImage ? (
//                           <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover rounded" />
//                         ) : (
//                           <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
//                             <BookOpen className="h-5 w-5 text-blue-600" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{book.title}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                               slug: {book.slug}
//                             </code>
//                             <button
//                               onClick={() => handleCopySlug(book.slug)}
//                               className="p-1 rounded hover:bg-gray-200 transition-colors"
//                               title="Copy link to clipboard"
//                             >
//                               {copiedSlug === book.slug ? (
//                                 <Check className="h-3 w-3 text-green-600" />
//                               ) : (
//                                 <Copy className="h-3 w-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {getAuthorName(book.author)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
//                         {book.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(book)}
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                           book.isPublished 
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                             : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
//                         }`}
//                       >
//                         {book.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <span className="flex items-center space-x-1">
//                         <Download className="h-4 w-4" />
//                         <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Link
//                           to={`/book/${book.slug}`}
//                           target="_blank"
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                           title="View Book"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                           title="Edit Book"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id, book.title)}
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                           title="Delete Book"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//            </table>
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

//       {/* Add/Edit Book Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
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
//                       placeholder="Enter book title"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Slug (URL)
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
//                       <input
//                         type="text"
//                         name="slug"
//                         value={formData.slug}
//                         onChange={handleSlugChange}
//                         className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
//                         placeholder="book-slug"
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

//                 {/* Title Urdu - Maps to subtitle */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu / Subtitle)</label>
//                   <input
//                     type="text"
//                     name="titleUrdu"
//                     value={formData.titleUrdu}
//                     onChange={handleInputChange}
//                     className="input-field urdu-text"
//                     dir="rtl"
//                     placeholder="کتاب کا عنوان اردو میں"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">This will be stored as the book's subtitle</p>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Enter book description..."
//                   />
//                 </div>

//                 {/* Author and Co-authors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Author <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="author"
//                       value={formData.author}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       required
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
//                     <select
//                       multiple
//                       name="coAuthors"
//                       value={formData.coAuthors}
//                       onChange={handleCoAuthorsChange}
//                       className="input-field h-24"
//                     >
//                       {authors.map((author) => (
//                         <option key={author._id} value={author._id}>
//                           {author.name}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
//                   </div>
//                 </div>

//                 {/* Category, Type, Language */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="ebook">Ebook</option>
//                       <option value="journal">Journal</option>
//                       <option value="magazine">Magazine</option>
//                       <option value="rare">Rare Book</option>
//                       <option value="manuscript">Manuscript</option>
//                     </select>
//                   </div>
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
//                       <option value="persian">Persian</option>
//                       <option value="arabic">Arabic</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Cover Image Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="coverImage"
//                         value={formData.coverImage}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload below"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleCoverUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingCover}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingCover || !isOnline}
//                       >
//                         {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingCover ? 'Uploading...' : 'Upload'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={coverUploadProgress} 
//                     label="Uploading cover..." 
//                     isUploading={uploadingCover} 
//                   />
//                   {formData.coverImage && (
//                     <div className="mt-3">
//                       <img src={formData.coverImage} alt="Cover preview" className="h-32 w-auto rounded-lg border shadow-sm object-cover" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Page Images Upload with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Page Images (for book reader)
//                     <span className="text-xs text-gray-500 ml-2">Upload images for page-by-page reading</span>
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//                     <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">Upload page images (JPG, PNG, WebP)</p>
//                     <p className="text-xs text-gray-400 mt-1">Multiple files allowed. Max 2MB per image.</p>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handlePageImagesUpload}
//                       className="mt-3 text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                       disabled={uploadingPages || !isOnline}
//                     />
//                   </div>
                  
//                   <ProgressIndicator 
//                     progress={pagesUploadProgress} 
//                     label={`Uploading pages (${pagesUploadedCount} uploaded)...`} 
//                     isUploading={uploadingPages} 
//                   />
                  
//                   {formData.pageImages && formData.pageImages.length > 0 && (
//                     <div className="mt-3">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-medium text-gray-700">
//                           {formData.pageImages.length} page{formData.pageImages.length !== 1 ? 's' : ''} uploaded
//                         </p>
//                         <p className="text-xs text-gray-500">Total pages will be set automatically</p>
//                       </div>
//                       <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
//                         {formData.pageImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img 
//                               src={img} 
//                               alt={`Page ${idx + 1}`} 
//                               className="w-full h-20 object-cover rounded border border-gray-200 shadow-sm"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removePageImage(idx)}
//                               className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                             <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
//                               {idx + 1}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* PDF Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     PDF File
//                     <span className="text-xs text-gray-500 ml-2">Upload PDF for download and reading (Max 100MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="pdfUrl"
//                         value={formData.pdfUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload PDF"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".pdf"
//                         onChange={handlePdfUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingPdf || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingPdf || !isOnline}
//                       >
//                         {uploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingPdf ? 'Uploading...' : 'Upload PDF'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={pdfUploadProgress} 
//                     label="Uploading PDF..." 
//                     isUploading={uploadingPdf} 
//                   />
//                   {formData.pdfUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.pdfUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* EPUB Upload Section with Progress */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     EPUB File (Optional)
//                     <span className="text-xs text-gray-500 ml-2">Upload EPUB for alternative format (Max 50MB)</span>
//                   </label>
//                   <div className="flex gap-4 items-start">
//                     <div className="flex-1">
//                       <input
//                         type="url"
//                         name="epubUrl"
//                         value={formData.epubUrl}
//                         onChange={handleInputChange}
//                         className="input-field"
//                         placeholder="https://... or upload EPUB"
//                       />
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept=".epub"
//                         onChange={handleEpubUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingEpub || !isOnline}
//                       />
//                       <button 
//                         type="button" 
//                         className="btn-outline flex items-center gap-2" 
//                         disabled={uploadingEpub || !isOnline}
//                       >
//                         {uploadingEpub ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>{uploadingEpub ? 'Uploading...' : 'Upload EPUB'}</span>
//                       </button>
//                     </div>
//                   </div>
//                   <ProgressIndicator 
//                     progress={epubUploadProgress} 
//                     label="Uploading EPUB..." 
//                     isUploading={uploadingEpub} 
//                   />
//                   {formData.epubUrl && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <FileText className="h-4 w-4 text-green-600" />
//                       <a href={formData.epubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
//                         {formData.epubUrl.substring(0, 50)}...
//                       </a>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, epubUrl: '' }))}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Error Display */}
//                 {uploadError && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-red-700">
//                       <AlertCircle className="h-4 w-4" />
//                       <span className="text-sm">{uploadError}</span>
//                     </div>
//                     <button onClick={clearUploadError} className="text-red-500 hover:text-red-700">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}

//                 {/* Publication Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                     <input
//                       type="number"
//                       name="totalPages"
//                       value={formData.totalPages}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 450"
//                       readOnly={formData.pageImages?.length > 0}
//                     />
//                     {formData.pageImages?.length > 0 && (
//                       <p className="text-xs text-gray-500 mt-1">Auto-set from uploaded images: {formData.pageImages.length}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                     <input
//                       type="text"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Publisher name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
//                     <input
//                       type="number"
//                       name="publishYear"
//                       value={formData.publishYear}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="e.g., 2024"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
//                     <input
//                       type="text"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="ISBN number"
//                     />
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex flex-wrap gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="isFree"
//                       checked={formData.isFree}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Free Book</span>
//                   </label>
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
//                     <span className="text-sm text-gray-700">Featured Book</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading || !slugAvailable}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

//       {/* Bulk Upload Modal */}
//       <AnimatePresence>
//         {showBulkModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
//                 <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
//                   <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
//                   <input
//                     type="file"
//                     accept=".json"
//                     onChange={handleBulkFileChange}
//                     className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
//                   <pre className="text-xs text-blue-600 overflow-x-auto">
// {`[
//   {
//     "title": "Book Title",
//     "slug": "book-title",
//     "subtitle": "کتاب کا عنوان",
//     "description": "Book description",
//     "author": "author_id",
//     "type": "ebook",
//     "language": "urdu",
//     "pdfUrl": "https://...",
//     "isPublished": true
//   }
// ]`}
//                   </pre>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4">
//                   <button
//                     onClick={handleBulkUpload}
//                     disabled={!bulkFile || bulkUploading}
//                     className="btn-primary flex-1 disabled:opacity-50"
//                   >
//                     {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
//                   </button>
//                   <button
//                     onClick={() => setShowBulkModal(false)}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EbookCMSPage;















// client/src/pages/admin/EbookCMSPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Edit, Trash2, Eye, Upload, FileText,
  Download, BookOpen, ChevronLeft, ChevronRight, X, Loader2,
  AlertTriangle, Copy, Check, RefreshCw, Filter, Calendar, User,
  Image as ImageIcon, File as FileIcon, Link as LinkIcon,
  AlertCircle, CheckCircle, WifiOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import bookAPI from '../../api/bookAPI';
import authorAPI from '../../api/authorAPI';
import categoryAPI from '../../api/categoryAPI';
import uploadAPI from '../../api/uploadAPI';
import toast from 'react-hot-toast';

const EbookCMSPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  
  // Upload states with progress
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUploadProgress, setCoverUploadProgress] = useState(0);
  
  const [uploadingPages, setUploadingPages] = useState(false);
  const [pagesUploadProgress, setPagesUploadProgress] = useState(0);
  const [pagesUploadedCount, setPagesUploadedCount] = useState(0);
  
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [extractingPages, setExtractingPages] = useState(false);
  
  const [uploadingEpub, setUploadingEpub] = useState(false);
  const [epubUploadProgress, setEpubUploadProgress] = useState(0);
  
  const [uploadError, setUploadError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    titleUrdu: '',      // Maps to subtitle in backend
    description: '',
    author: '',
    coAuthors: [],
    category: '',
    type: 'ebook',
    language: 'urdu',
    coverImage: '',
    pageImages: [],
    pdfUrl: '',
    epubUrl: '',
    totalPages: '',
    publisher: '',
    publishYear: '',
    isbn: '',
    isFree: true,
    isPremium: false,
    isPublished: false,
    isFeatured: false
  });

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ============================================
  // FIX 1: Function to extract PDF page count using pdf.js
  // ============================================
  const extractPdfPageCount = async (pdfUrl) => {
    try {
      // Dynamically import pdf.js
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      
      // Use a reliable CDN for the worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        withCredentials: false,
        disableRange: true,
        disableStream: true
      });
      const pdf = await loadingTask.promise;
      return pdf.numPages;
    } catch (error) {
      console.error('Error extracting PDF page count:', error);
      return null;
    }
  };

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
      const response = await bookAPI.getBooks({ limit: 1000 });
      let booksList = [];
      if (response?.data?.data) {
        booksList = response.data.data;
      } else if (response?.data) {
        booksList = response.data;
      } else if (Array.isArray(response)) {
        booksList = response;
      } else {
        booksList = [];
      }

      const exists = booksList.some(book => 
        book.slug === slug && book._id !== excludeId
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
      await checkSlugAvailability(newSlug, editingBook?._id);
    }
  };

  // Handle slug manual edit
  const handleSlugChange = async (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setFormData(prev => ({ ...prev, slug }));
    await checkSlugAvailability(slug, editingBook?._id);
  };

  // Regenerate slug from title
  const regenerateSlug = async () => {
    const newSlug = generateSlugFromTitle(formData.title);
    setFormData(prev => ({ ...prev, slug: newSlug }));
    await checkSlugAvailability(newSlug, editingBook?._id);
    toast.success('Slug regenerated from title');
  };

  // Upload cover image with progress
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File too large. Max size is 5MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    if (!isOnline) {
      toast.error('No internet connection. Please check your network.');
      return;
    }

    setUploadingCover(true);
    setCoverUploadProgress(0);
    setUploadError(null);

    try {
      const response = await uploadAPI.uploadCover(file, (progress) => {
        setCoverUploadProgress(progress);
      });
      
      if (response?.data?.url || response?.url) {
        const imageUrl = response.data?.url || response.url;
        setFormData(prev => ({ ...prev, coverImage: imageUrl }));
        toast.success('Cover image uploaded successfully!');
        setCoverUploadProgress(100);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload cover image';
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploadingCover(false);
      setTimeout(() => setCoverUploadProgress(0), 1000);
    }
  };

  // Upload page images with progress
  const handlePageImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (!isOnline) {
      toast.error('No internet connection. Please check your network.');
      return;
    }

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error(`${invalidFiles.length} file(s) are not images. Only JPG, PNG, WebP allowed.`);
      return;
    }

    const maxSizePerFile = 2 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSizePerFile);
    if (oversizedFiles.length > 0) {
      toast.error(`${oversizedFiles.length} file(s) exceed 2MB limit. Please compress them.`);
      return;
    }

    setUploadingPages(true);
    setPagesUploadProgress(0);
    setPagesUploadedCount(0);
    setUploadError(null);

    try {
      const response = await uploadAPI.uploadPages(files, (progress) => {
        setPagesUploadProgress(progress);
        const uploaded = Math.floor((progress / 100) * files.length);
        setPagesUploadedCount(uploaded);
      });
      
      if (response?.data && Array.isArray(response.data)) {
        const uploadedUrls = response.data.map(item => item.url);
        setFormData(prev => ({
          ...prev,
          pageImages: [...(prev.pageImages || []), ...uploadedUrls],
          totalPages: (prev.pageImages?.length || 0) + uploadedUrls.length
        }));
        toast.success(`${uploadedUrls.length} page images uploaded successfully!`);
        setPagesUploadProgress(100);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload page images';
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploadingPages(false);
      setTimeout(() => {
        setPagesUploadProgress(0);
        setPagesUploadedCount(0);
      }, 1000);
    }
  };

  // ============================================
  // FIX 1: PDF Upload Handler with auto page count extraction
  // ============================================
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please upload a valid PDF file');
      e.target.value = '';
      return;
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error(`File too large. Max size is 100MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      e.target.value = '';
      return;
    }

    if (!isOnline) {
      toast.error('No internet connection. Please check your network.');
      return;
    }

    setUploadingPdf(true);
    setPdfUploadProgress(0);
    setUploadError(null);

    try {
      console.log('📄 Starting PDF upload:', file.name, file.size, 'bytes');
      
      const response = await uploadAPI.uploadPDF(file, (progress) => {
        setPdfUploadProgress(progress);
        console.log(`PDF upload progress: ${Math.round(progress)}%`);
      });
      
      console.log('PDF upload response:', response);
      
      if (response?.data?.url || response?.url) {
        const pdfUrl = response.data?.url || response.url;
        
        // Extract page count from the uploaded PDF
        setExtractingPages(true);
        const extractingToast = toast.loading('Extracting page count from PDF...');
        
        const pageCount = await extractPdfPageCount(pdfUrl);
        
        toast.dismiss(extractingToast);
        setExtractingPages(false);
        
        if (pageCount && pageCount > 0) {
          setFormData(prev => ({ 
            ...prev, 
            pdfUrl: pdfUrl,
            totalPages: pageCount  // Auto-set total pages
          }));
          toast.success(`PDF uploaded successfully! Total pages: ${pageCount}`);
          setPdfUploadProgress(100);
        } else {
          setFormData(prev => ({ ...prev, pdfUrl: pdfUrl }));
          toast.success('PDF uploaded successfully! (Could not auto-detect page count. Please enter manually.)');
          setPdfUploadProgress(100);
        }
      } else {
        throw new Error('Invalid response from server - no URL returned');
      }
    } catch (error) {
      console.error('PDF upload error:', error);
      
      let errorMessage = 'Failed to upload PDF';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Upload timeout. Please try again with a smaller file or better connection.');
      } else if (error.message?.includes('413')) {
        toast.error('File too large for server. Please compress the file.');
      } else {
        toast.error(errorMessage);
      }
      
      setUploadError(errorMessage);
    } finally {
      setUploadingPdf(false);
      e.target.value = ''; // Reset input
      setTimeout(() => setPdfUploadProgress(0), 1000);
    }
  };

  // EPUB Upload Handler
  const handleEpubUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidEpub = file.type === 'application/epub+zip' || 
                        file.name.toLowerCase().endsWith('.epub');
    
    if (!isValidEpub) {
      toast.error('Please upload a valid EPUB file (.epub)');
      e.target.value = '';
      return;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast.error(`File too large. Max size is 50MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      e.target.value = '';
      return;
    }

    if (!isOnline) {
      toast.error('No internet connection. Please check your network.');
      return;
    }

    setUploadingEpub(true);
    setEpubUploadProgress(0);
    setUploadError(null);

    try {
      console.log('📖 Starting EPUB upload:', file.name, file.size, 'bytes');
      
      const response = await uploadAPI.uploadEPUB(file, (progress) => {
        setEpubUploadProgress(progress);
        console.log(`EPUB upload progress: ${Math.round(progress)}%`);
      });
      
      console.log('EPUB upload response:', response);
      
      if (response?.data?.url || response?.url) {
        const epubUrl = response.data?.url || response.url;
        setFormData(prev => ({ ...prev, epubUrl: epubUrl }));
        toast.success('EPUB uploaded successfully!');
        setEpubUploadProgress(100);
      } else {
        throw new Error('Invalid response from server - no URL returned');
      }
    } catch (error) {
      console.error('EPUB upload error:', error);
      
      let errorMessage = 'Failed to upload EPUB';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (error.message?.includes('Only EPUB files are allowed')) {
        toast.error('Invalid file type. Please upload a valid .epub file.');
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Upload timeout. Please try again with a smaller file.');
      } else {
        toast.error(errorMessage);
      }
      
      setUploadError(errorMessage);
    } finally {
      setUploadingEpub(false);
      e.target.value = '';
      setTimeout(() => setEpubUploadProgress(0), 1000);
    }
  };

  // Remove page image
  const removePageImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      pageImages: prev.pageImages.filter((_, index) => index !== indexToRemove),
      totalPages: (prev.pageImages?.length || 0) - 1
    }));
    toast.success('Page image removed');
  };

  // Clear upload error
  const clearUploadError = () => {
    setUploadError(null);
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

  // Fetch books
  const fetchBooks = useCallback(async () => {
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

      const response = await bookAPI.getBooks(params);
      
      let booksData = [];
      if (response?.data?.data) {
        booksData = response.data.data;
        if (response.data.pagination) setPagination(response.data.pagination);
      } else if (response?.data) {
        booksData = response.data;
      } else if (Array.isArray(response)) {
        booksData = response;
      } else {
        booksData = [];
      }
      
      setBooks(Array.isArray(booksData) ? booksData : []);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchQuery, filterCategory, filterStatus, filterType]);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchBooks();
  }, [fetchAuthors, fetchCategories, fetchBooks]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCoAuthorsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, coAuthors: selectedOptions }));
  };

  // handleSubmit - Maps titleUrdu to subtitle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.title.trim()) {
      toast.error('Please enter a book title');
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

    // Validate PDF URL for published books
    if (formData.isPublished && !formData.pdfUrl && (!formData.pageImages || formData.pageImages.length === 0)) {
      toast.error('Please upload either a PDF file or page images before publishing');
      return;
    }

    // Prepare book data matching backend schema
    const bookData = {
      title: formData.title.trim(),
      slug: formData.slug,
      subtitle: formData.titleUrdu?.trim() || '',  // Map titleUrdu to subtitle
      description: formData.description?.trim() || '',
      author: formData.author,
      coAuthors: formData.coAuthors || [],
      category: formData.category || null,
      type: formData.type,
      language: formData.language,
      coverImage: formData.coverImage || '',
      pageImages: formData.pageImages || [],
      pdfUrl: formData.pdfUrl || '',
      epubUrl: formData.epubUrl || '',
      totalPages: formData.pageImages?.length || (formData.totalPages ? parseInt(formData.totalPages) : null),
      publisher: formData.publisher || '',
      publishYear: formData.publishYear ? parseInt(formData.publishYear) : null,
      isbn: formData.isbn || '',
      isFree: formData.isFree,
      isPremium: formData.isPremium,
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured
    };

    setLoading(true);
    try {
      if (editingBook) {
        await bookAPI.updateBook(editingBook._id, bookData);
        toast.success('Book updated successfully');
      } else {
        await bookAPI.createBook(bookData);
        toast.success('Book created successfully');
      }
      resetModal();
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      const message = error.response?.data?.message || 'Failed to save book';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // handleEdit - Maps subtitle to titleUrdu
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      slug: book.slug || '',
      titleUrdu: book.subtitle || '',  // Map subtitle to titleUrdu
      description: book.description || '',
      author: typeof book.author === 'object' ? book.author?._id : book.author || '',
      coAuthors: book.coAuthors?.map(ca => typeof ca === 'object' ? ca._id : ca) || [],
      category: book.category?._id || book.category || '',
      type: book.type || 'ebook',
      language: book.language || 'urdu',
      coverImage: book.coverImage || '',
      pageImages: book.pageImages || [],
      pdfUrl: book.pdfUrl || '',
      epubUrl: book.epubUrl || '',
      totalPages: book.totalPages || '',
      publisher: book.publisher || '',
      publishYear: book.publishYear || '',
      isbn: book.isbn || '',
      isFree: book.isFree || false,
      isPremium: book.isPremium || false,
      isPublished: book.isPublished || false,
      isFeatured: book.isFeatured || false
    });
    setSlugAvailable(true);
    setShowAddModal(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await bookAPI.deleteBook(id);
      toast.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (book) => {
    setLoading(true);
    try {
      await bookAPI.updateBook(book._id, {
        ...book,
        isPublished: !book.isPublished
      });
      toast.success(`Book ${!book.isPublished ? 'published' : 'unpublished'}`);
      fetchBooks();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySlug = async (slug) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
      setCopiedSlug(slug);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // Handle bulk file upload
  const handleBulkFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
      setBulkFile(file);
      toast.success(`File "${file.name}" selected`);
    } else {
      toast.error('Please upload a valid JSON file');
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) {
      toast.error('Please select a JSON file');
      return;
    }

    setBulkUploading(true);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const booksData = JSON.parse(event.target.result);
        
        if (!Array.isArray(booksData)) {
          toast.error('JSON file should contain an array of books');
          return;
        }

        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        for (const book of booksData) {
          try {
            if (!book.slug && book.title) {
              book.slug = generateSlugFromTitle(book.title);
            }
            await bookAPI.createBook(book);
            successCount++;
          } catch (err) {
            console.error(`Failed to upload book: ${book.title}`, err);
            errorCount++;
            errors.push({ title: book.title, error: err.response?.data?.message || err.message });
          }
        }

        if (errorCount > 0) {
          console.warn('Bulk upload errors:', errors);
          toast.success(`Bulk upload complete: ${successCount} uploaded, ${errorCount} failed. Check console for details.`);
        } else {
          toast.success(`Successfully uploaded ${successCount} books!`);
        }
        
        fetchBooks();
        setShowBulkModal(false);
        setBulkFile(null);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error('Invalid JSON format. Please check your file structure.');
      } finally {
        setBulkUploading(false);
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read file');
      setBulkUploading(false);
    };

    reader.readAsText(bulkFile);
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingBook(null);
    setFormData({
      title: '',
      slug: '',
      titleUrdu: '',
      description: '',
      author: '',
      coAuthors: [],
      category: '',
      type: 'ebook',
      language: 'urdu',
      coverImage: '',
      pageImages: [],
      pdfUrl: '',
      epubUrl: '',
      totalPages: '',
      publisher: '',
      publishYear: '',
      isbn: '',
      isFree: true,
      isPremium: false,
      isPublished: false,
      isFeatured: false
    });
    setSlugAvailable(true);
    setUploadError(null);
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

  // Progress indicator component
  const ProgressIndicator = ({ progress, label, isUploading }) => {
    if (!isUploading && progress === 0) return null;
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ebook CMS</h1>
          <p className="text-gray-500">Manage ebooks, PDFs, and digital collections</p>
        </div>
        <div className="flex gap-3">
          {/* Online Status Indicator */}
          {!isOnline && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">Offline</span>
            </div>
          )}
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FileText className="h-5 w-5" />
            <span>Bulk Upload</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Ebook</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Books</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {books.filter(b => b.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {books.filter(b => !b.isPublished).length}
          </p>
          <p className="text-sm text-gray-500">Draft</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {books.filter(b => b.isFeatured).length}
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
            placeholder="Search books by title or slug..."
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
          <option value="ebook">Ebook</option>
          <option value="journal">Journal</option>
          <option value="magazine">Magazine</option>
          <option value="rare">Rare</option>
          <option value="manuscript">Manuscript</option>
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

      {/* Books Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book & Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && books.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading books...</p>
                   </td>
                 </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <p>No books found.</p>
                    {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all') && (
                      <button onClick={clearFilters} className="text-primary-600 mt-2">
                        Clear filters to see all books
                      </button>
                    )}
                   </td>
                 </tr>
              ) : (
                books.map((book) => (
                  <motion.tr
                    key={book._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {book.coverImage ? (
                          <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-9 bg-blue-100 rounded flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{book.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              slug: {book.slug}
                            </code>
                            <button
                              onClick={() => handleCopySlug(book.slug)}
                              className="p-1 rounded hover:bg-gray-200 transition-colors"
                              title="Copy link to clipboard"
                            >
                              {copiedSlug === book.slug ? (
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
                      {getAuthorName(book.author)}
                     </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 capitalize">
                        {book.type}
                      </span>
                     </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(book)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                          book.isPublished 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {book.isPublished ? 'Published' : 'Draft'}
                      </button>
                     </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{book.stats?.downloads?.toLocaleString() || 0}</span>
                      </span>
                     </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(book.createdAt).toLocaleDateString()}
                     </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/book/${book.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                          title="View Book"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                          title="Edit Book"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book._id, book.title)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                          title="Delete Book"
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

      {/* Add/Edit Book Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBook ? 'Edit Ebook' : 'Upload New Ebook'}
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
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/book/</span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleSlugChange}
                        className={`input-field flex-1 rounded-l-none ${!slugAvailable ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="book-slug"
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

                {/* Title Urdu - Maps to subtitle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (Urdu / Subtitle)</label>
                  <input
                    type="text"
                    name="titleUrdu"
                    value={formData.titleUrdu}
                    onChange={handleInputChange}
                    className="input-field urdu-text"
                    dir="rtl"
                    placeholder="کتاب کا عنوان اردو میں"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be stored as the book's subtitle</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Enter book description..."
                  />
                </div>

                {/* Author and Co-authors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Co-authors</label>
                    <select
                      multiple
                      name="coAuthors"
                      value={formData.coAuthors}
                      onChange={handleCoAuthorsChange}
                      className="input-field h-24"
                    >
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                </div>

                {/* Category, Type, Language */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="ebook">Ebook</option>
                      <option value="journal">Journal</option>
                      <option value="magazine">Magazine</option>
                      <option value="rare">Rare Book</option>
                      <option value="manuscript">Manuscript</option>
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
                      <option value="persian">Persian</option>
                      <option value="arabic">Arabic</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image Upload with Progress */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="https://... or upload below"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingCover}
                      />
                      <button 
                        type="button" 
                        className="btn-outline flex items-center gap-2" 
                        disabled={uploadingCover || !isOnline}
                      >
                        {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        <span>{uploadingCover ? 'Uploading...' : 'Upload'}</span>
                      </button>
                    </div>
                  </div>
                  <ProgressIndicator 
                    progress={coverUploadProgress} 
                    label="Uploading cover..." 
                    isUploading={uploadingCover} 
                  />
                  {formData.coverImage && (
                    <div className="mt-3">
                      <img src={formData.coverImage} alt="Cover preview" className="h-32 w-auto rounded-lg border shadow-sm object-cover" />
                    </div>
                  )}
                </div>

                {/* Page Images Upload with Progress */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Images (for book reader)
                    <span className="text-xs text-gray-500 ml-2">Upload images for page-by-page reading</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload page images (JPG, PNG, WebP)</p>
                    <p className="text-xs text-gray-400 mt-1">Multiple files allowed. Max 2MB per image.</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePageImagesUpload}
                      className="mt-3 text-sm text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      disabled={uploadingPages || !isOnline}
                    />
                  </div>
                  
                  <ProgressIndicator 
                    progress={pagesUploadProgress} 
                    label={`Uploading pages (${pagesUploadedCount} uploaded)...`} 
                    isUploading={uploadingPages} 
                  />
                  
                  {formData.pageImages && formData.pageImages.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">
                          {formData.pageImages.length} page{formData.pageImages.length !== 1 ? 's' : ''} uploaded
                        </p>
                        <p className="text-xs text-gray-500">Total pages will be set automatically</p>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                        {formData.pageImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={img} 
                              alt={`Page ${idx + 1}`} 
                              className="w-full h-20 object-cover rounded border border-gray-200 shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removePageImage(idx)}
                              className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                              {idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* PDF Upload Section with Progress and Auto Page Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF File
                    <span className="text-xs text-gray-500 ml-2">Upload PDF for download and reading (Max 100MB)</span>
                  </label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="url"
                        name="pdfUrl"
                        value={formData.pdfUrl}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="https://... or upload PDF"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingPdf || extractingPages || !isOnline}
                      />
                      <button 
                        type="button" 
                        className="btn-outline flex items-center gap-2" 
                        disabled={uploadingPdf || extractingPages || !isOnline}
                      >
                        {(uploadingPdf || extractingPages) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <span>
                          {uploadingPdf ? 'Uploading...' : extractingPages ? 'Extracting pages...' : 'Upload PDF'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <ProgressIndicator 
                    progress={pdfUploadProgress} 
                    label="Uploading PDF..." 
                    isUploading={uploadingPdf} 
                  />
                  {extractingPages && (
                    <div className="mt-2 flex items-center gap-2 text-blue-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Extracting page count from PDF...</span>
                    </div>
                  )}
                  {formData.pdfUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <a href={formData.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
                        {formData.pdfUrl.substring(0, 50)}...
                      </a>
                      {formData.totalPages && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {formData.totalPages} pages
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '', totalPages: '' }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* EPUB Upload Section with Progress */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EPUB File (Optional)
                    <span className="text-xs text-gray-500 ml-2">Upload EPUB for alternative format (Max 50MB)</span>
                  </label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="url"
                        name="epubUrl"
                        value={formData.epubUrl}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="https://... or upload EPUB"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".epub"
                        onChange={handleEpubUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingEpub || !isOnline}
                      />
                      <button 
                        type="button" 
                        className="btn-outline flex items-center gap-2" 
                        disabled={uploadingEpub || !isOnline}
                      >
                        {uploadingEpub ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        <span>{uploadingEpub ? 'Uploading...' : 'Upload EPUB'}</span>
                      </button>
                    </div>
                  </div>
                  <ProgressIndicator 
                    progress={epubUploadProgress} 
                    label="Uploading EPUB..." 
                    isUploading={uploadingEpub} 
                  />
                  {formData.epubUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <a href={formData.epubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline truncate">
                        {formData.epubUrl.substring(0, 50)}...
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, epubUrl: '' }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Error Display */}
                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{uploadError}</span>
                    </div>
                    <button onClick={clearUploadError} className="text-red-500 hover:text-red-700">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Publication Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
                    <input
                      type="number"
                      name="totalPages"
                      value={formData.totalPages}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="e.g., 450"
                      readOnly={formData.pageImages?.length > 0}
                    />
                    {formData.pageImages?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">Auto-set from uploaded images: {formData.pageImages.length}</p>
                    )}
                    {formData.pdfUrl && !formData.totalPages && (
                      <p className="text-xs text-yellow-500 mt-1">⚠️ Page count not detected. Please enter manually.</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Publisher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Year</label>
                    <input
                      type="number"
                      name="publishYear"
                      value={formData.publishYear}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="ISBN number"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Free Book</span>
                  </label>
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
                    <span className="text-sm text-gray-700">Featured Book</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading || !slugAvailable}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBook ? 'Update Book' : 'Upload Book')}
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

      {/* Bulk Upload Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-lg w-full"
            >
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Bulk Upload Ebooks</h2>
                <button onClick={() => setShowBulkModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload JSON file with book data</p>
                  <p className="text-sm text-gray-400">Format: {`[{"title": "value", "author": "value", ...}]`}</p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleBulkFileChange}
                    className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">JSON Template:</h4>
                  <pre className="text-xs text-blue-600 overflow-x-auto">
{`[
  {
    "title": "Book Title",
    "slug": "book-title",
    "subtitle": "کتاب کا عنوان",
    "description": "Book description",
    "author": "author_id",
    "type": "ebook",
    "language": "urdu",
    "pdfUrl": "https://...",
    "totalPages": 450,
    "isPublished": true
  }
]`}
                  </pre>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    onClick={handleBulkUpload}
                    disabled={!bulkFile || bulkUploading}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {bulkUploading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Upload All'}
                  </button>
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EbookCMSPage;