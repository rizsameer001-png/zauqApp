// // client/src/pages/creator/UploadEbookPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, BookOpen, Tag, 
//   Loader, Globe, Lock, AlertCircle, Trash2,
//   Image, File, Eye, DollarSign, Download, PenTool, Star
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadEbookPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBook, setFetchingBook] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     genres: [],
//     language: 'urdu',
//     type: 'ebook',
//     publisher: '',
//     publishYear: new Date().getFullYear(),
//     isbn: '',
//     totalPages: '',
//     previewPages: 10,
//     isFree: true,
//     isPremium: false,
//     price: { amount: 0, currency: 'INR' },
//     watermarkText: '',
//     isPublished: true,
//     isFeatured: false,
//     tags: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: []
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [genreInput, setGenreInput] = useState('');
//   const [coAuthorInput, setCoAuthorInput] = useState('');
  
//   // File states
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [epubFile, setEpubFile] = useState(null);
//   const [pageImages, setPageImages] = useState([]);
//   const [pagePreviews, setPagePreviews] = useState([]);
  
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//     fetchCategories();
    
//     if (id) {
//       setIsEditMode(true);
//       fetchBookForEdit(id);
//     }
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       setLoadingAuthors(true);
//       const response = await api.get('/authors?limit=100');
//       setAuthors(response.data.data || response.data.authors || []);
//     } catch (error) {
//       console.error('Failed to fetch authors:', error);
//       toast.error('Could not load authors list');
//     } finally {
//       setLoadingAuthors(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories?type=book');
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchBookForEdit = async (bookId) => {
//     try {
//       setFetchingBook(true);
      
//       // Try to get from creator content first
//       let book = null;
//       try {
//         const creatorContent = await api.get('/creator/content');
//         const allBooks = creatorContent.data.data?.books || [];
//         book = allBooks.find(b => b._id === bookId);
//       } catch (err) {
//         console.log('Could not fetch from creator content');
//       }
      
//       // If not found, try direct fetch by ID
//       if (!book) {
//         try {
//           const response = await api.get(`/books/${bookId}`);
//           book = response.data.data || response.data;
//         } catch (err) {
//           console.log('Could not fetch by ID');
//         }
//       }
      
//       if (!book) {
//         toast.error('Book not found');
//         navigate('/creator/content');
//         return;
//       }
      
//       setFormData({
//         title: book.title || '',
//         subtitle: book.subtitle || '',
//         description: book.description || '',
//         author: book.author?._id || book.author || '',
//         coAuthors: book.coAuthors?.map(a => a._id || a) || [],
//         category: book.category?._id || book.category || '',
//         genres: book.genres || [],
//         language: book.language || 'urdu',
//         type: book.type || 'ebook',
//         publisher: book.publisher || '',
//         publishYear: book.publishYear || new Date().getFullYear(),
//         isbn: book.isbn || '',
//         totalPages: book.totalPages || '',
//         previewPages: book.previewPages || 10,
//         isFree: book.isFree !== undefined ? book.isFree : true,
//         isPremium: book.isPremium || false,
//         price: book.price || { amount: 0, currency: 'INR' },
//         watermarkText: book.watermarkText || '',
//         isPublished: book.isPublished || false,
//         isFeatured: book.isFeatured || false,
//         tags: book.tags || [],
//         metaTitle: book.metaTitle || '',
//         metaDescription: book.metaDescription || '',
//         metaKeywords: book.metaKeywords || []
//       });
      
//       if (book.coverImage) {
//         setCoverPreview(book.coverImage);
//       }
      
//       toast.success('Book loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//       toast.error('Could not load book for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingBook(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/books/${id}`);
//       toast.success('Book deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim().toLowerCase()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }));
//   };

//   const handleAddGenre = () => {
//     if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         genres: [...prev.genres, genreInput.trim().toLowerCase()]
//       }));
//       setGenreInput('');
//     }
//   };

//   const handleRemoveGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.filter(g => g !== genre)
//     }));
//   };

//   const handleAddCoAuthor = () => {
//     if (coAuthorInput.trim() && !formData.coAuthors.includes(coAuthorInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         coAuthors: [...prev.coAuthors, coAuthorInput.trim()]
//       }));
//       setCoAuthorInput('');
//     }
//   };

//   const handleRemoveCoAuthor = (authorId) => {
//     setFormData(prev => ({
//       ...prev,
//       coAuthors: prev.coAuthors.filter(a => a !== authorId)
//     }));
//   };

//   const handleKeyPress = (e, handler) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handler();
//     }
//   };

//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error('PDF size should be less than 100MB');
//         return;
//       }
//       setPdfFile(file);
//       toast.success('PDF file selected');
//     }
//   };

//   const handleEpubChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.epub')) {
//         toast.error('Please upload an EPUB file');
//         return;
//       }
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('EPUB size should be less than 50MB');
//         return;
//       }
//       setEpubFile(file);
//       toast.success('EPUB file selected');
//     }
//   };

//   const handlePageImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       toast.error('Some files were not images and were skipped');
//     }
    
//     setPageImages(prev => [...prev, ...validFiles]);
    
//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removePageImage = (index) => {
//     setPageImages(prev => prev.filter((_, i) => i !== index));
//     setPagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
    
//     if (!pdfFile && !isEditMode) {
//       errors.pdf = 'PDF file is required';
//     }
    
//     if (!coverImage && !coverPreview && !isEditMode) {
//       errors.cover = 'Cover image is required';
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }

//     try {
//       setLoading(true);
//       setUploadProgress(0);
      
//       const submitData = new FormData();
      
//       // Basic info
//       submitData.append('title', formData.title.trim());
//       submitData.append('author', formData.author);
//       submitData.append('description', formData.description);
//       submitData.append('language', formData.language);
//       submitData.append('type', formData.type);
//       submitData.append('isPublished', formData.isPublished);
//       submitData.append('isFeatured', formData.isFeatured);
      
//       // Optional fields
//       if (formData.subtitle) submitData.append('subtitle', formData.subtitle);
//       if (formData.category) submitData.append('category', formData.category);
//       if (formData.publisher) submitData.append('publisher', formData.publisher);
//       if (formData.publishYear) submitData.append('publishYear', formData.publishYear);
//       if (formData.isbn) submitData.append('isbn', formData.isbn);
//       if (formData.totalPages) submitData.append('totalPages', formData.totalPages);
//       if (formData.previewPages) submitData.append('previewPages', formData.previewPages);
//       if (formData.watermarkText) submitData.append('watermarkText', formData.watermarkText);
//       if (formData.metaTitle) submitData.append('metaTitle', formData.metaTitle);
//       if (formData.metaDescription) submitData.append('metaDescription', formData.metaDescription);
      
//       // Arrays
//       submitData.append('coAuthors', JSON.stringify(formData.coAuthors));
//       submitData.append('genres', JSON.stringify(formData.genres));
//       submitData.append('tags', JSON.stringify(formData.tags));
//       submitData.append('metaKeywords', JSON.stringify(formData.metaKeywords));
      
//       // Price
//       submitData.append('price[amount]', formData.price.amount);
//       submitData.append('price[currency]', formData.price.currency);
//       submitData.append('isFree', formData.isFree);
//       submitData.append('isPremium', formData.isPremium);
      
//       // Files
//       if (coverImage) submitData.append('coverImage', coverImage);
//       if (pdfFile) submitData.append('pdf', pdfFile);
//       if (epubFile) submitData.append('epub', epubFile);
      
//       // Page images
//       pageImages.forEach((image, index) => {
//         submitData.append(`pageImages`, image);
//       });
      
//       let response;
//       if (isEditMode && id) {
//         response = await api.put(`/books/${id}`, submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           }
//         });
//         toast.success('Book updated successfully!');
//       } else {
//         response = await api.post('/books', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           }
//         });
//         toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
//       }
      
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
      
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else {
//         toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} book`);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const languageOptions = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const typeOptions = [
//     { value: 'ebook', label: 'Ebook' },
//     { value: 'journal', label: 'Journal' },
//     { value: 'magazine', label: 'Magazine' },
//     { value: 'rare', label: 'Rare Book' },
//     { value: 'manuscript', label: 'Manuscript' }
//   ];

//   if (fetchingBook) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
//           </p>
//         </div>
        
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={() => setShowDeleteConfirm(true)}
//             className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </button>
//         )}
//       </div>

//       {/* Upload Progress */}
//       {loading && uploadProgress > 0 && (
//         <div className="card p-4">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Uploading...</span>
//             <span className="text-gray-600">{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={loading} className="btn-danger">
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter book title"
//                   className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   placeholder="Enter book subtitle"
//                   className="input-field"
//                 />
//               </div>

//               {/* Author */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Main Author <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//                   disabled={loadingAuthors}
//                 >
//                   <option value="">Select author</option>
//                   {authors.map(author => (
//                     <option key={author._id} value={author._id}>
//                       {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.author && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//                 )}
//               </div>

//               {/* Co-authors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors (Optional)
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={coAuthorInput}
//                     onChange={(e) => setCoAuthorInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddCoAuthor)}
//                     placeholder="Add co-author ID"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddCoAuthor} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.coAuthors.map(authorId => {
//                     const author = authors.find(a => a._id === authorId);
//                     return (
//                       <span key={authorId} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                         <span>{author?.name || authorId}</span>
//                         <button type="button" onClick={() => handleRemoveCoAuthor(authorId)}>
//                           <X className="h-3 w-3" />
//                         </button>
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Enter detailed description of the book..."
//                 className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
//               />
//               {validationErrors.description && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
//               )}
//             </div>
//           </div>

//           {/* Book Details Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Language */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language
//                 </label>
//                 <select name="language" value={formData.language} onChange={handleChange} className="input-field">
//                   {languageOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Book Type
//                 </label>
//                 <select name="type" value={formData.type} onChange={handleChange} className="input-field">
//                   {typeOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Publisher */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Publisher
//                 </label>
//                 <input
//                   type="text"
//                   name="publisher"
//                   value={formData.publisher}
//                   onChange={handleChange}
//                   placeholder="Publisher name"
//                   className="input-field"
//                 />
//               </div>

//               {/* Publication Year */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Publication Year
//                 </label>
//                 <input
//                   type="number"
//                   name="publishYear"
//                   value={formData.publishYear}
//                   onChange={handleChange}
//                   placeholder="Year of publication"
//                   className="input-field"
//                 />
//               </div>

//               {/* ISBN */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   ISBN (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="isbn"
//                   value={formData.isbn}
//                   onChange={handleChange}
//                   placeholder="ISBN number"
//                   className="input-field"
//                 />
//               </div>

//               {/* Total Pages */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Total Pages
//                 </label>
//                 <input
//                   type="number"
//                   name="totalPages"
//                   value={formData.totalPages}
//                   onChange={handleChange}
//                   placeholder="Number of pages"
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Genres & Tags Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
//             <div className="space-y-4">
//               {/* Genres */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Genres
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={genreInput}
//                     onChange={(e) => setGenreInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
//                     placeholder="Add genre (e.g., Poetry, Fiction)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddGenre} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.genres.map(genre => (
//                     <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                       <span>{genre}</span>
//                       <button type="button" onClick={() => handleRemoveGenre(genre)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
//                     placeholder="Add tags (e.g., classic, rare, manuscript)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddTag} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map(tag => (
//                     <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
//                       <span>#{tag}</span>
//                       <button type="button" onClick={() => handleRemoveTag(tag)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Files Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>
            
//             <div className="space-y-6">
//               {/* Cover Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Cover Image <span className="text-red-500">*</span>
//                 </label>
//                 {coverPreview ? (
//                   <div className="relative inline-block">
//                     <img src={coverPreview} alt="Cover preview" className="w-40 h-52 object-cover rounded-lg border border-gray-200" />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setCoverImage(null);
//                         setCoverPreview(null);
//                       }}
//                       className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-40 h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <Image className="h-8 w-8 text-gray-400" />
//                     <span className="text-xs text-gray-500 mt-1">Upload Cover</span>
//                     <p className="text-xs text-gray-400">JPG, PNG (5MB max)</p>
//                     <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.cover && <p className="text-red-500 text-xs mt-1">{validationErrors.cover}</p>}
//               </div>

//               {/* PDF File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   PDF File <span className="text-red-500">*</span>
//                 </label>
//                 {pdfFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <File className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{pdfFile.name}</p>
//                       <p className="text-xs text-green-600">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setPdfFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <File className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload PDF</span>
//                     <p className="text-xs text-gray-400">PDF (100MB max)</p>
//                     <input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.pdf && <p className="text-red-500 text-xs mt-1">{validationErrors.pdf}</p>}
//               </div>

//               {/* EPUB File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   EPUB File (Optional)
//                 </label>
//                 {epubFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <BookOpen className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{epubFile.name}</p>
//                       <p className="text-xs text-green-600">{(epubFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setEpubFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <BookOpen className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload EPUB</span>
//                     <p className="text-xs text-gray-400">EPUB (50MB max)</p>
//                     <input type="file" accept=".epub" onChange={handleEpubChange} className="hidden" />
//                   </label>
//                 )}
//               </div>

//               {/* Page Images (For page-by-page reading) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Page Images (Optional)
//                 </label>
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                   <Image className="h-8 w-8 text-gray-400" />
//                   <span className="text-sm text-gray-500 mt-1">Upload Page Images</span>
//                   <p className="text-xs text-gray-400">JPG, PNG (Multiple files allowed)</p>
//                   <input type="file" accept="image/*" multiple onChange={handlePageImagesChange} className="hidden" />
//                 </label>
//                 {pagePreviews.length > 0 && (
//                   <div className="mt-3 grid grid-cols-4 gap-2">
//                     {pagePreviews.map((preview, idx) => (
//                       <div key={idx} className="relative">
//                         <img src={preview} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
//                         <button
//                           type="button"
//                           onClick={() => removePageImage(idx)}
//                           className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isFree"
//                   checked={formData.isFree}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-700">Free Book</span>
//                   <p className="text-sm text-gray-500">Readers can download this book for free</p>
//                 </div>
//               </label>

//               {!formData.isFree && (
//                 <div className="grid md:grid-cols-2 gap-4 pl-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
//                     <input
//                       type="number"
//                       name="price.amount"
//                       value={formData.price.amount}
//                       onChange={handleChange}
//                       min="0"
//                       step="0.01"
//                       className="input-field"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
//                       <option value="INR">INR (₹)</option>
//                       <option value="USD">USD ($)</option>
//                       <option value="EUR">EUR (€)</option>
//                       <option value="GBP">GBP (£)</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isPremium"
//                   checked={formData.isPremium}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-700">Premium Content</span>
//                   <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
//                 </div>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Preview Pages
//                 </label>
//                 <input
//                   type="number"
//                   name="previewPages"
//                   value={formData.previewPages}
//                   onChange={handleChange}
//                   min="1"
//                   max="50"
//                   className="input-field w-32"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Watermark Text (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="watermarkText"
//                   value={formData.watermarkText}
//                   onChange={handleChange}
//                   placeholder="e.g., © Publisher Name"
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Title
//                 </label>
//                 <input
//                   type="text"
//                   name="metaTitle"
//                   value={formData.metaTitle}
//                   onChange={handleChange}
//                   placeholder="SEO title (defaults to book title)"
//                   className="input-field"
//                   maxLength="60"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Description
//                 </label>
//                 <textarea
//                   name="metaDescription"
//                   value={formData.metaDescription}
//                   onChange={handleChange}
//                   rows={2}
//                   placeholder="SEO description"
//                   className="input-field"
//                   maxLength="160"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Keywords
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.metaKeywords.map(keyword => (
//                     <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                       <span>{keyword}</span>
//                       <button type="button" onClick={() => setFormData(prev => ({
//                         ...prev,
//                         metaKeywords: prev.metaKeywords.filter(k => k !== keyword)
//                       }))}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value.trim()) {
//                         e.preventDefault();
//                         setFormData(prev => ({
//                           ...prev,
//                           metaKeywords: [...prev.metaKeywords, e.target.value.trim()]
//                         }));
//                         e.target.value = '';
//                       }
//                     }}
//                     placeholder="Add keyword and press Enter"
//                     className="input-field flex-1 min-w-[150px]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === true}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === false}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={formData.isFeatured}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-yellow-600" />
//                     <span className="font-medium text-gray-700">Feature this book</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate('/creator/content')}
//               className="btn-secondary"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="h-4 w-4 animate-spin" />
//                   <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadEbookPage;
















// // client/src/pages/creator/UploadEbookPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, BookOpen, Tag, 
//   Loader, Globe, Lock, AlertCircle, Trash2,
//   Image, File, Eye, DollarSign, Download, PenTool, Star
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadEbookPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBook, setFetchingBook] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     genres: [],
//     language: 'urdu',
//     type: 'ebook',
//     publisher: '',
//     publishYear: new Date().getFullYear(),
//     isbn: '',
//     totalPages: '',
//     previewPages: 10,
//     isFree: true,
//     isPremium: false,
//     price: { amount: 0, currency: 'INR' },
//     watermarkText: '',
//     isPublished: true,
//     isFeatured: false,
//     tags: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: []
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [genreInput, setGenreInput] = useState('');
//   const [coAuthorInput, setCoAuthorInput] = useState('');
  
//   // File states
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [epubFile, setEpubFile] = useState(null);
//   const [pageImages, setPageImages] = useState([]);
//   const [pagePreviews, setPagePreviews] = useState([]);
  
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//     fetchCategories();
    
//     if (id) {
//       setIsEditMode(true);
//       fetchBookForEdit(id);
//     }
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       setLoadingAuthors(true);
//       const response = await api.get('/authors?limit=100');
//       setAuthors(response.data.data || response.data.authors || []);
//     } catch (error) {
//       console.error('Failed to fetch authors:', error);
//       toast.error('Could not load authors list');
//     } finally {
//       setLoadingAuthors(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories?type=book');
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchBookForEdit = async (bookId) => {
//     try {
//       setFetchingBook(true);
      
//       // Try to get from creator content first
//       let book = null;
//       try {
//         const creatorContent = await api.get('/creator/content');
//         const allBooks = creatorContent.data.data?.books || [];
//         book = allBooks.find(b => b._id === bookId);
//       } catch (err) {
//         console.log('Could not fetch from creator content');
//       }
      
//       // If not found, try direct fetch by ID
//       if (!book) {
//         try {
//           const response = await api.get(`/books/${bookId}`);
//           book = response.data.data || response.data;
//         } catch (err) {
//           console.log('Could not fetch by ID');
//         }
//       }
      
//       if (!book) {
//         toast.error('Book not found');
//         navigate('/creator/content');
//         return;
//       }
      
//       setFormData({
//         title: book.title || '',
//         subtitle: book.subtitle || '',
//         description: book.description || '',
//         author: book.author?._id || book.author || '',
//         coAuthors: book.coAuthors?.map(a => a._id || a) || [],
//         category: book.category?._id || book.category || '',
//         genres: book.genres || [],
//         language: book.language || 'urdu',
//         type: book.type || 'ebook',
//         publisher: book.publisher || '',
//         publishYear: book.publishYear || new Date().getFullYear(),
//         isbn: book.isbn || '',
//         totalPages: book.totalPages || '',
//         previewPages: book.previewPages || 10,
//         isFree: book.isFree !== undefined ? book.isFree : true,
//         isPremium: book.isPremium || false,
//         price: book.price || { amount: 0, currency: 'INR' },
//         watermarkText: book.watermarkText || '',
//         isPublished: book.isPublished || false,
//         isFeatured: book.isFeatured || false,
//         tags: book.tags || [],
//         metaTitle: book.metaTitle || '',
//         metaDescription: book.metaDescription || '',
//         metaKeywords: book.metaKeywords || []
//       });
      
//       if (book.coverImage) {
//         setCoverPreview(book.coverImage);
//       }
      
//       toast.success('Book loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//       toast.error('Could not load book for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingBook(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/books/${id}`);
//       toast.success('Book deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim().toLowerCase()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }));
//   };

//   const handleAddGenre = () => {
//     if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         genres: [...prev.genres, genreInput.trim().toLowerCase()]
//       }));
//       setGenreInput('');
//     }
//   };

//   const handleRemoveGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.filter(g => g !== genre)
//     }));
//   };

//   const handleAddCoAuthor = () => {
//     if (coAuthorInput.trim() && !formData.coAuthors.includes(coAuthorInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         coAuthors: [...prev.coAuthors, coAuthorInput.trim()]
//       }));
//       setCoAuthorInput('');
//     }
//   };

//   const handleRemoveCoAuthor = (authorId) => {
//     setFormData(prev => ({
//       ...prev,
//       coAuthors: prev.coAuthors.filter(a => a !== authorId)
//     }));
//   };

//   const handleKeyPress = (e, handler) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handler();
//     }
//   };

//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error('PDF size should be less than 100MB');
//         return;
//       }
//       setPdfFile(file);
//       toast.success('PDF file selected');
//     }
//   };

//   const handleEpubChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.epub')) {
//         toast.error('Please upload an EPUB file');
//         return;
//       }
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('EPUB size should be less than 50MB');
//         return;
//       }
//       setEpubFile(file);
//       toast.success('EPUB file selected');
//     }
//   };

//   const handlePageImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       toast.error('Some files were not images and were skipped');
//     }
    
//     setPageImages(prev => [...prev, ...validFiles]);
    
//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removePageImage = (index) => {
//     setPageImages(prev => prev.filter((_, i) => i !== index));
//     setPagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
    
//     if (!pdfFile && !isEditMode) {
//       errors.pdf = 'PDF file is required';
//     }
    
//     if (!coverImage && !coverPreview && !isEditMode) {
//       errors.cover = 'Cover image is required';
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }

//     try {
//       setLoading(true);
//       setUploadProgress(0);
      
//       const submitData = new FormData();
      
//       // Basic info
//       submitData.append('title', formData.title.trim());
//       submitData.append('author', formData.author);
//       submitData.append('description', formData.description);
//       submitData.append('language', formData.language);
//       submitData.append('type', formData.type);
//       submitData.append('isPublished', formData.isPublished);
//       submitData.append('isFeatured', formData.isFeatured);
      
//       // Optional fields
//       if (formData.subtitle) submitData.append('subtitle', formData.subtitle);
//       if (formData.category) submitData.append('category', formData.category);
//       if (formData.publisher) submitData.append('publisher', formData.publisher);
//       if (formData.publishYear) submitData.append('publishYear', formData.publishYear);
//       if (formData.isbn) submitData.append('isbn', formData.isbn);
//       if (formData.totalPages) submitData.append('totalPages', formData.totalPages);
//       if (formData.previewPages) submitData.append('previewPages', formData.previewPages);
//       if (formData.watermarkText) submitData.append('watermarkText', formData.watermarkText);
//       if (formData.metaTitle) submitData.append('metaTitle', formData.metaTitle);
//       if (formData.metaDescription) submitData.append('metaDescription', formData.metaDescription);
      
//       // Arrays
//       submitData.append('coAuthors', JSON.stringify(formData.coAuthors));
//       submitData.append('genres', JSON.stringify(formData.genres));
//       submitData.append('tags', JSON.stringify(formData.tags));
//       submitData.append('metaKeywords', JSON.stringify(formData.metaKeywords));
      
//       // Price
//       submitData.append('price[amount]', formData.price.amount);
//       submitData.append('price[currency]', formData.price.currency);
//       submitData.append('isFree', formData.isFree);
//       submitData.append('isPremium', formData.isPremium);
      
//       // Files
//       if (coverImage) submitData.append('coverImage', coverImage);
//       if (pdfFile) submitData.append('pdf', pdfFile);
//       if (epubFile) submitData.append('epub', epubFile);
      
//       // Page images
//       pageImages.forEach((image, index) => {
//         submitData.append(`pageImages`, image);
//       });
      
//       let response;
//       if (isEditMode && id) {
//         response = await api.put(`/books/${id}`, submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(percentCompleted);
//             }
//           }
//         });
//         toast.success('Book updated successfully!');
//       } else {
//         response = await api.post('/books', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(percentCompleted);
//             }
//           }
//         });
//         toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
//       }
      
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
      
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else {
//         toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} book`);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const languageOptions = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const typeOptions = [
//     { value: 'ebook', label: 'Ebook' },
//     { value: 'journal', label: 'Journal' },
//     { value: 'magazine', label: 'Magazine' },
//     { value: 'rare', label: 'Rare Book' },
//     { value: 'manuscript', label: 'Manuscript' }
//   ];

//   if (fetchingBook) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
//           </p>
//         </div>
        
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={() => setShowDeleteConfirm(true)}
//             className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </button>
//         )}
//       </div>

//       {/* Upload Progress */}
//       {loading && uploadProgress > 0 && (
//         <div className="card p-4">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Uploading...</span>
//             <span className="text-gray-600">{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={loading} className="btn-danger">
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter book title"
//                   className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   placeholder="Enter book subtitle"
//                   className="input-field"
//                 />
//               </div>

//               {/* Author */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Main Author <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//                   disabled={loadingAuthors}
//                 >
//                   <option value="">Select author</option>
//                   {authors.map(author => (
//                     <option key={author._id} value={author._id}>
//                       {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.author && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//                 )}
//               </div>

//               {/* Co-authors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors (Optional)
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={coAuthorInput}
//                     onChange={(e) => setCoAuthorInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddCoAuthor)}
//                     placeholder="Add co-author ID"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddCoAuthor} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.coAuthors.map(authorId => {
//                     const author = authors.find(a => a._id === authorId);
//                     return (
//                       <span key={authorId} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                         <span>{author?.name || authorId}</span>
//                         <button type="button" onClick={() => handleRemoveCoAuthor(authorId)}>
//                           <X className="h-3 w-3" />
//                         </button>
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Enter detailed description of the book..."
//                 className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
//               />
//               {validationErrors.description && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
//               )}
//             </div>
//           </div>

//           {/* Book Details Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Language */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language
//                 </label>
//                 <select name="language" value={formData.language} onChange={handleChange} className="input-field">
//                   {languageOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Book Type
//                 </label>
//                 <select name="type" value={formData.type} onChange={handleChange} className="input-field">
//                   {typeOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Publisher */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Publisher
//                 </label>
//                 <input
//                   type="text"
//                   name="publisher"
//                   value={formData.publisher}
//                   onChange={handleChange}
//                   placeholder="Publisher name"
//                   className="input-field"
//                 />
//               </div>

//               {/* Publication Year */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Publication Year
//                 </label>
//                 <input
//                   type="number"
//                   name="publishYear"
//                   value={formData.publishYear}
//                   onChange={handleChange}
//                   placeholder="Year of publication"
//                   className="input-field"
//                 />
//               </div>

//               {/* ISBN */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   ISBN (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="isbn"
//                   value={formData.isbn}
//                   onChange={handleChange}
//                   placeholder="ISBN number"
//                   className="input-field"
//                 />
//               </div>

//               {/* Total Pages */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Total Pages
//                 </label>
//                 <input
//                   type="number"
//                   name="totalPages"
//                   value={formData.totalPages}
//                   onChange={handleChange}
//                   placeholder="Number of pages"
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Genres & Tags Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
//             <div className="space-y-4">
//               {/* Genres */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Genres
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={genreInput}
//                     onChange={(e) => setGenreInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
//                     placeholder="Add genre (e.g., Poetry, Fiction)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddGenre} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.genres.map(genre => (
//                     <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                       <span>{genre}</span>
//                       <button type="button" onClick={() => handleRemoveGenre(genre)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
//                     placeholder="Add tags (e.g., classic, rare, manuscript)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddTag} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map(tag => (
//                     <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
//                       <span>#{tag}</span>
//                       <button type="button" onClick={() => handleRemoveTag(tag)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Files Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>
            
//             <div className="space-y-6">
//               {/* Cover Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Cover Image <span className="text-red-500">*</span>
//                 </label>
//                 {coverPreview ? (
//                   <div className="relative inline-block">
//                     <img src={coverPreview} alt="Cover preview" className="w-40 h-52 object-cover rounded-lg border border-gray-200" />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setCoverImage(null);
//                         setCoverPreview(null);
//                       }}
//                       className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-40 h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <Image className="h-8 w-8 text-gray-400" />
//                     <span className="text-xs text-gray-500 mt-1">Upload Cover</span>
//                     <p className="text-xs text-gray-400">JPG, PNG (5MB max)</p>
//                     <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.cover && <p className="text-red-500 text-xs mt-1">{validationErrors.cover}</p>}
//               </div>

//               {/* PDF File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   PDF File <span className="text-red-500">*</span>
//                 </label>
//                 {pdfFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <File className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{pdfFile.name}</p>
//                       <p className="text-xs text-green-600">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setPdfFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <File className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload PDF</span>
//                     <p className="text-xs text-gray-400">PDF (100MB max)</p>
//                     <input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.pdf && <p className="text-red-500 text-xs mt-1">{validationErrors.pdf}</p>}
//               </div>

//               {/* EPUB File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   EPUB File (Optional)
//                 </label>
//                 {epubFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <BookOpen className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{epubFile.name}</p>
//                       <p className="text-xs text-green-600">{(epubFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setEpubFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <BookOpen className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload EPUB</span>
//                     <p className="text-xs text-gray-400">EPUB (50MB max)</p>
//                     <input type="file" accept=".epub" onChange={handleEpubChange} className="hidden" />
//                   </label>
//                 )}
//               </div>

//               {/* Page Images */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Page Images (Optional)
//                 </label>
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                   <Image className="h-8 w-8 text-gray-400" />
//                   <span className="text-sm text-gray-500 mt-1">Upload Page Images</span>
//                   <p className="text-xs text-gray-400">JPG, PNG (Multiple files allowed)</p>
//                   <input type="file" accept="image/*" multiple onChange={handlePageImagesChange} className="hidden" />
//                 </label>
//                 {pagePreviews.length > 0 && (
//                   <div className="mt-3 grid grid-cols-4 gap-2">
//                     {pagePreviews.map((preview, idx) => (
//                       <div key={idx} className="relative">
//                         <img src={preview} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
//                         <button
//                           type="button"
//                           onClick={() => removePageImage(idx)}
//                           className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isFree"
//                   checked={formData.isFree}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-700">Free Book</span>
//                   <p className="text-sm text-gray-500">Readers can download this book for free</p>
//                 </div>
//               </label>

//               {!formData.isFree && (
//                 <div className="grid md:grid-cols-2 gap-4 pl-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
//                     <input
//                       type="number"
//                       name="price.amount"
//                       value={formData.price.amount}
//                       onChange={handleChange}
//                       min="0"
//                       step="0.01"
//                       className="input-field"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
//                       <option value="INR">INR (₹)</option>
//                       <option value="USD">USD ($)</option>
//                       <option value="EUR">EUR (€)</option>
//                       <option value="GBP">GBP (£)</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isPremium"
//                   checked={formData.isPremium}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <span className="font-medium text-gray-700">Premium Content</span>
//                   <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
//                 </div>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Preview Pages
//                 </label>
//                 <input
//                   type="number"
//                   name="previewPages"
//                   value={formData.previewPages}
//                   onChange={handleChange}
//                   min="1"
//                   max="50"
//                   className="input-field w-32"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Watermark Text (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="watermarkText"
//                   value={formData.watermarkText}
//                   onChange={handleChange}
//                   placeholder="e.g., © Publisher Name"
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Title
//                 </label>
//                 <input
//                   type="text"
//                   name="metaTitle"
//                   value={formData.metaTitle}
//                   onChange={handleChange}
//                   placeholder="SEO title (defaults to book title)"
//                   className="input-field"
//                   maxLength="60"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Description
//                 </label>
//                 <textarea
//                   name="metaDescription"
//                   value={formData.metaDescription}
//                   onChange={handleChange}
//                   rows={2}
//                   placeholder="SEO description"
//                   className="input-field"
//                   maxLength="160"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meta Keywords
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.metaKeywords.map(keyword => (
//                     <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                       <span>{keyword}</span>
//                       <button type="button" onClick={() => setFormData(prev => ({
//                         ...prev,
//                         metaKeywords: prev.metaKeywords.filter(k => k !== keyword)
//                       }))}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value.trim()) {
//                         e.preventDefault();
//                         setFormData(prev => ({
//                           ...prev,
//                           metaKeywords: [...prev.metaKeywords, e.target.value.trim()]
//                         }));
//                         e.target.value = '';
//                       }
//                     }}
//                     placeholder="Add keyword and press Enter"
//                     className="input-field flex-1 min-w-[150px]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === true}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === false}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={formData.isFeatured}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-yellow-600" />
//                     <span className="font-medium text-gray-700">Feature this book</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate('/creator/content')}
//               className="btn-secondary"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="h-4 w-4 animate-spin" />
//                   <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadEbookPage;

























// // client/src/pages/creator/UploadEbookPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, BookOpen, Tag, 
//   Loader, Globe, Lock, AlertCircle, Trash2,
//   Image, File, Eye, DollarSign, Download, PenTool, Star
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadEbookPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBook, setFetchingBook] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     author: '',
//     coAuthors: [], // Now storing author names as strings
//     category: '',
//     genres: [],
//     language: 'urdu',
//     type: 'ebook',
//     publisher: '',
//     publishYear: new Date().getFullYear(),
//     isbn: '',
//     totalPages: '',
//     previewPages: 10,
//     isFree: true,
//     isPremium: false,
//     price: { amount: 0, currency: 'INR' },
//     watermarkText: '',
//     isPublished: true,
//     isFeatured: false,
//     tags: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: []
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [genreInput, setGenreInput] = useState('');
//   const [coAuthorInput, setCoAuthorInput] = useState('');
  
//   // File states
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [epubFile, setEpubFile] = useState(null);
//   const [pageImages, setPageImages] = useState([]);
//   const [pagePreviews, setPagePreviews] = useState([]);
  
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//     fetchCategories();
    
//     if (id) {
//       setIsEditMode(true);
//       fetchBookForEdit(id);
//     }
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       setLoadingAuthors(true);
//       const response = await api.get('/authors?limit=100');
//       setAuthors(response.data.data || response.data.authors || []);
//     } catch (error) {
//       console.error('Failed to fetch authors:', error);
//       toast.error('Could not load authors list');
//     } finally {
//       setLoadingAuthors(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories?type=book');
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchBookForEdit = async (bookId) => {
//     try {
//       setFetchingBook(true);
      
//       let book = null;
//       try {
//         const creatorContent = await api.get('/creator/content');
//         const allBooks = creatorContent.data.data?.books || [];
//         book = allBooks.find(b => b._id === bookId);
//       } catch (err) {
//         console.log('Could not fetch from creator content');
//       }
      
//       if (!book) {
//         try {
//           const response = await api.get(`/books/${bookId}`);
//           book = response.data.data || response.data;
//         } catch (err) {
//           console.log('Could not fetch by ID');
//         }
//       }
      
//       if (!book) {
//         toast.error('Book not found');
//         navigate('/creator/content');
//         return;
//       }
      
//       setFormData({
//         title: book.title || '',
//         subtitle: book.subtitle || '',
//         description: book.description || '',
//         author: book.author?._id || book.author || '',
//         coAuthors: book.coAuthors?.map(a => typeof a === 'object' ? a.name : a) || [],
//         category: book.category?._id || book.category || '',
//         genres: book.genres || [],
//         language: book.language || 'urdu',
//         type: book.type || 'ebook',
//         publisher: book.publisher || '',
//         publishYear: book.publishYear || new Date().getFullYear(),
//         isbn: book.isbn || '',
//         totalPages: book.totalPages || '',
//         previewPages: book.previewPages || 10,
//         isFree: book.isFree !== undefined ? book.isFree : true,
//         isPremium: book.isPremium || false,
//         price: book.price || { amount: 0, currency: 'INR' },
//         watermarkText: book.watermarkText || '',
//         isPublished: book.isPublished || false,
//         isFeatured: book.isFeatured || false,
//         tags: book.tags || [],
//         metaTitle: book.metaTitle || '',
//         metaDescription: book.metaDescription || '',
//         metaKeywords: book.metaKeywords || []
//       });
      
//       if (book.coverImage) {
//         setCoverPreview(book.coverImage);
//       }
      
//       toast.success('Book loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//       toast.error('Could not load book for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingBook(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/books/${id}`);
//       toast.success('Book deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim().toLowerCase()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }));
//   };

//   const handleAddGenre = () => {
//     if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         genres: [...prev.genres, genreInput.trim().toLowerCase()]
//       }));
//       setGenreInput('');
//     }
//   };

//   const handleRemoveGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.filter(g => g !== genre)
//     }));
//   };

//   const handleAddCoAuthor = () => {
//     if (coAuthorInput.trim() && !formData.coAuthors.includes(coAuthorInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         coAuthors: [...prev.coAuthors, coAuthorInput.trim()]
//       }));
//       setCoAuthorInput('');
//     }
//   };

//   const handleRemoveCoAuthor = (authorName) => {
//     setFormData(prev => ({
//       ...prev,
//       coAuthors: prev.coAuthors.filter(a => a !== authorName)
//     }));
//   };

//   const handleKeyPress = (e, handler) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handler();
//     }
//   };

//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error('PDF size should be less than 100MB');
//         return;
//       }
//       setPdfFile(file);
//       toast.success('PDF file selected');
//     }
//   };

//   const handleEpubChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.epub')) {
//         toast.error('Please upload an EPUB file');
//         return;
//       }
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('EPUB size should be less than 50MB');
//         return;
//       }
//       setEpubFile(file);
//       toast.success('EPUB file selected');
//     }
//   };

//   const handlePageImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       toast.error('Some files were not images and were skipped');
//     }
    
//     setPageImages(prev => [...prev, ...validFiles]);
    
//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removePageImage = (index) => {
//     setPageImages(prev => prev.filter((_, i) => i !== index));
//     setPagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
    
//     if (!pdfFile && !isEditMode) {
//       errors.pdf = 'PDF file is required';
//     }
    
//     if (!coverImage && !coverPreview && !isEditMode) {
//       errors.cover = 'Cover image is required';
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }

//     try {
//       setLoading(true);
//       setUploadProgress(0);
      
//       const submitData = new FormData();
      
//       // Basic info
//       submitData.append('title', formData.title.trim());
//       submitData.append('author', formData.author);
//       submitData.append('description', formData.description);
//       submitData.append('language', formData.language);
//       submitData.append('type', formData.type);
//       submitData.append('isPublished', formData.isPublished);
//       submitData.append('isFeatured', formData.isFeatured);
      
//       // Optional fields
//       if (formData.subtitle) submitData.append('subtitle', formData.subtitle);
//       if (formData.category) submitData.append('category', formData.category);
//       if (formData.publisher) submitData.append('publisher', formData.publisher);
//       if (formData.publishYear) submitData.append('publishYear', formData.publishYear);
//       if (formData.isbn) submitData.append('isbn', formData.isbn);
//       if (formData.totalPages) submitData.append('totalPages', formData.totalPages);
//       if (formData.previewPages) submitData.append('previewPages', formData.previewPages);
//       if (formData.watermarkText) submitData.append('watermarkText', formData.watermarkText);
//       if (formData.metaTitle) submitData.append('metaTitle', formData.metaTitle);
//       if (formData.metaDescription) submitData.append('metaDescription', formData.metaDescription);
      
//       // Arrays - coAuthors as names (strings)
//       submitData.append('coAuthors', JSON.stringify(formData.coAuthors));
//       submitData.append('genres', JSON.stringify(formData.genres));
//       submitData.append('tags', JSON.stringify(formData.tags));
//       submitData.append('metaKeywords', JSON.stringify(formData.metaKeywords));
      
//       // Price
//       submitData.append('price[amount]', formData.price.amount);
//       submitData.append('price[currency]', formData.price.currency);
//       submitData.append('isFree', formData.isFree);
//       submitData.append('isPremium', formData.isPremium);
      
//       // Files
//       if (coverImage) submitData.append('coverImage', coverImage);
//       if (pdfFile) submitData.append('pdf', pdfFile);
//       if (epubFile) submitData.append('epub', epubFile);
      
//       // Page images
//       pageImages.forEach((image, index) => {
//         submitData.append(`pageImages`, image);
//       });
      
//       let response;
//       if (isEditMode && id) {
//         response = await api.put(`/books/${id}`, submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(percentCompleted);
//             }
//           }
//         });
//         toast.success('Book updated successfully!');
//       } else {
//         response = await api.post('/books', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(percentCompleted);
//             }
//           }
//         });
//         toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
//       }
      
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
      
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else {
//         toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} book`);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const languageOptions = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const typeOptions = [
//     { value: 'ebook', label: 'Ebook' },
//     { value: 'journal', label: 'Journal' },
//     { value: 'magazine', label: 'Magazine' },
//     { value: 'rare', label: 'Rare Book' },
//     { value: 'manuscript', label: 'Manuscript' }
//   ];

//   if (fetchingBook) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
//           </p>
//         </div>
        
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={() => setShowDeleteConfirm(true)}
//             className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </button>
//         )}
//       </div>

//       {/* Upload Progress */}
//       {loading && uploadProgress > 0 && (
//         <div className="card p-4">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Uploading...</span>
//             <span className="text-gray-600">{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={loading} className="btn-danger">
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter book title"
//                   className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   placeholder="Enter book subtitle"
//                   className="input-field"
//                 />
//               </div>

//               {/* Author */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Main Author <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//                   disabled={loadingAuthors}
//                 >
//                   <option value="">Select author</option>
//                   {authors.map(author => (
//                     <option key={author._id} value={author._id}>
//                       {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.author && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//                 )}
//               </div>

//               {/* Co-authors - Now using NAMES instead of IDs */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors (Optional)
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={coAuthorInput}
//                     onChange={(e) => setCoAuthorInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddCoAuthor)}
//                     placeholder="Enter co-author name"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddCoAuthor} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.coAuthors.map((authorName, index) => (
//                     <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       <span>{authorName}</span>
//                       <button type="button" onClick={() => handleRemoveCoAuthor(authorName)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   {formData.coAuthors.length === 0 && (
//                     <p className="text-xs text-gray-400">No co-authors added</p>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter co-author names (not IDs). Press Enter or click Add to add multiple.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Rest of the form remains the same... */}
//           {/* Description Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Enter detailed description of the book..."
//                 className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
//               />
//               {validationErrors.description && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
//               )}
//             </div>
//           </div>

//           {/* Book Details Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//                 <select name="language" value={formData.language} onChange={handleChange} className="input-field">
//                   {languageOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Book Type</label>
//                 <select name="type" value={formData.type} onChange={handleChange} className="input-field">
//                   {typeOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                 <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher name" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
//                 <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="Year of publication" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ISBN (Optional)</label>
//                 <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN number" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                 <input type="number" name="totalPages" value={formData.totalPages} onChange={handleChange} placeholder="Number of pages" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* Genres & Tags Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={genreInput}
//                     onChange={(e) => setGenreInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
//                     placeholder="Add genre (e.g., Poetry, Fiction)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddGenre} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.genres.map(genre => (
//                     <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                       <span>{genre}</span>
//                       <button type="button" onClick={() => handleRemoveGenre(genre)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
//                     placeholder="Add tags (e.g., classic, rare, manuscript)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddTag} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map(tag => (
//                     <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
//                       <span>#{tag}</span>
//                       <button type="button" onClick={() => handleRemoveTag(tag)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Files Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>
            
//             <div className="space-y-6">
//               {/* Cover Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image <span className="text-red-500">*</span></label>
//                 {coverPreview ? (
//                   <div className="relative inline-block">
//                     <img src={coverPreview} alt="Cover preview" className="w-40 h-52 object-cover rounded-lg border border-gray-200" />
//                     <button type="button" onClick={() => { setCoverImage(null); setCoverPreview(null); }} className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700">
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-40 h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <Image className="h-8 w-8 text-gray-400" />
//                     <span className="text-xs text-gray-500 mt-1">Upload Cover</span>
//                     <p className="text-xs text-gray-400">JPG, PNG (5MB max)</p>
//                     <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.cover && <p className="text-red-500 text-xs mt-1">{validationErrors.cover}</p>}
//               </div>

//               {/* PDF File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">PDF File <span className="text-red-500">*</span></label>
//                 {pdfFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <File className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{pdfFile.name}</p>
//                       <p className="text-xs text-green-600">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setPdfFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <File className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload PDF</span>
//                     <p className="text-xs text-gray-400">PDF (100MB max)</p>
//                     <input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
//                   </label>
//                 )}
//                 {validationErrors.pdf && <p className="text-red-500 text-xs mt-1">{validationErrors.pdf}</p>}
//               </div>

//               {/* EPUB File */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">EPUB File (Optional)</label>
//                 {epubFile ? (
//                   <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                     <BookOpen className="h-6 w-6 text-green-600" />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-green-700">{epubFile.name}</p>
//                       <p className="text-xs text-green-600">{(epubFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     <button type="button" onClick={() => setEpubFile(null)} className="text-red-600">
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <BookOpen className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload EPUB</span>
//                     <p className="text-xs text-gray-400">EPUB (50MB max)</p>
//                     <input type="file" accept=".epub" onChange={handleEpubChange} className="hidden" />
//                   </label>
//                 )}
//               </div>

//               {/* Page Images */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Page Images (Optional)</label>
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                   <Image className="h-8 w-8 text-gray-400" />
//                   <span className="text-sm text-gray-500 mt-1">Upload Page Images</span>
//                   <p className="text-xs text-gray-400">JPG, PNG (Multiple files allowed)</p>
//                   <input type="file" accept="image/*" multiple onChange={handlePageImagesChange} className="hidden" />
//                 </label>
//                 {pagePreviews.length > 0 && (
//                   <div className="mt-3 grid grid-cols-4 gap-2">
//                     {pagePreviews.map((preview, idx) => (
//                       <div key={idx} className="relative">
//                         <img src={preview} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
//                         <button type="button" onClick={() => removePageImage(idx)} className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full">
//                           <X className="h-3 w-3" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Free Book</span>
//                   <p className="text-sm text-gray-500">Readers can download this book for free</p>
//                 </div>
//               </label>

//               {!formData.isFree && (
//                 <div className="grid md:grid-cols-2 gap-4 pl-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
//                     <input type="number" name="price.amount" value={formData.price.amount} onChange={handleChange} min="0" step="0.01" className="input-field" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
//                       <option value="INR">INR (₹)</option>
//                       <option value="USD">USD ($)</option>
//                       <option value="EUR">EUR (€)</option>
//                       <option value="GBP">GBP (£)</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Premium Content</span>
//                   <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
//                 </div>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Preview Pages</label>
//                 <input type="number" name="previewPages" value={formData.previewPages} onChange={handleChange} min="1" max="50" className="input-field w-32" />
//                 <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text (Optional)</label>
//                 <input type="text" name="watermarkText" value={formData.watermarkText} onChange={handleChange} placeholder="e.g., © Publisher Name" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//                 <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="SEO title (defaults to book title)" className="input-field" maxLength="60" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//                 <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} placeholder="SEO description" className="input-field" maxLength="160" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.metaKeywords.map(keyword => (
//                     <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                       <span>{keyword}</span>
//                       <button type="button" onClick={() => setFormData(prev => ({ ...prev, metaKeywords: prev.metaKeywords.filter(k => k !== keyword) }))}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value.trim()) {
//                         e.preventDefault();
//                         setFormData(prev => ({ ...prev, metaKeywords: [...prev.metaKeywords, e.target.value.trim()] }));
//                         e.target.value = '';
//                       }
//                     }}
//                     placeholder="Add keyword and press Enter"
//                     className="input-field flex-1 min-w-[150px]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === true} onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === false} onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-yellow-600" />
//                     <span className="font-medium text-gray-700">Feature this book</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4">
//             <button type="button" onClick={() => navigate('/creator/content')} className="btn-secondary" disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center">
//               {loading ? (
//                 <>
//                   <Loader className="h-4 w-4 animate-spin" />
//                   <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadEbookPage;





















// // client/src/pages/creator/UploadEbookPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, BookOpen, Tag, 
//   Loader, Globe, Lock, AlertCircle, Trash2,
//   Image, File, Eye, DollarSign, Download, PenTool, Star
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadEbookPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBook, setFetchingBook] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     genres: [],
//     language: 'urdu',
//     type: 'ebook',
//     publisher: '',
//     publishYear: new Date().getFullYear(),
//     isbn: '',
//     totalPages: '',
//     previewPages: 10,
//     isFree: true,
//     isPremium: false,
//     price: { amount: 0, currency: 'INR' },
//     watermarkText: '',
//     isPublished: true,
//     isFeatured: false,
//     tags: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: []
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [genreInput, setGenreInput] = useState('');
//   const [coAuthorInput, setCoAuthorInput] = useState('');
  
//   // File states
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [epubFile, setEpubFile] = useState(null);
//   const [pageImages, setPageImages] = useState([]);
//   const [pagePreviews, setPagePreviews] = useState([]);
  
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//     fetchCategories();
    
//     if (id) {
//       setIsEditMode(true);
//       fetchBookForEdit(id);
//     }
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       setLoadingAuthors(true);
//       const response = await api.get('/authors?limit=100');
//       setAuthors(response.data.data || response.data.authors || []);
//     } catch (error) {
//       console.error('Failed to fetch authors:', error);
//       toast.error('Could not load authors list');
//     } finally {
//       setLoadingAuthors(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories?type=book');
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchBookForEdit = async (bookId) => {
//     try {
//       setFetchingBook(true);
      
//       let book = null;
//       try {
//         const creatorContent = await api.get('/creator/content');
//         const allBooks = creatorContent.data.data?.books || [];
//         book = allBooks.find(b => b._id === bookId);
//       } catch (err) {
//         console.log('Could not fetch from creator content');
//       }
      
//       if (!book) {
//         try {
//           const response = await api.get(`/books/${bookId}`);
//           book = response.data.data || response.data;
//         } catch (err) {
//           console.log('Could not fetch by ID');
//         }
//       }
      
//       if (!book) {
//         toast.error('Book not found');
//         navigate('/creator/content');
//         return;
//       }
      
//       setFormData({
//         title: book.title || '',
//         subtitle: book.subtitle || '',
//         description: book.description || '',
//         author: book.author?._id || book.author || '',
//         coAuthors: book.coAuthors?.map(a => typeof a === 'object' ? a.name : a) || [],
//         category: book.category?._id || book.category || '',
//         genres: book.genres || [],
//         language: book.language || 'urdu',
//         type: book.type || 'ebook',
//         publisher: book.publisher || '',
//         publishYear: book.publishYear || new Date().getFullYear(),
//         isbn: book.isbn || '',
//         totalPages: book.totalPages || '',
//         previewPages: book.previewPages || 10,
//         isFree: book.isFree !== undefined ? book.isFree : true,
//         isPremium: book.isPremium || false,
//         price: book.price || { amount: 0, currency: 'INR' },
//         watermarkText: book.watermarkText || '',
//         isPublished: book.isPublished || false,
//         isFeatured: book.isFeatured || false,
//         tags: book.tags || [],
//         metaTitle: book.metaTitle || '',
//         metaDescription: book.metaDescription || '',
//         metaKeywords: book.metaKeywords || []
//       });
      
//       if (book.coverImage) {
//         setCoverPreview(book.coverImage);
//       }
      
//       toast.success('Book loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//       toast.error('Could not load book for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingBook(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/books/${id}`);
//       toast.success('Book deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim().toLowerCase()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }));
//   };

//   const handleAddGenre = () => {
//     if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         genres: [...prev.genres, genreInput.trim().toLowerCase()]
//       }));
//       setGenreInput('');
//     }
//   };

//   const handleRemoveGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.filter(g => g !== genre)
//     }));
//   };

//   const handleAddCoAuthor = () => {
//     if (coAuthorInput.trim() && !formData.coAuthors.includes(coAuthorInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         coAuthors: [...prev.coAuthors, coAuthorInput.trim()]
//       }));
//       setCoAuthorInput('');
//     }
//   };

//   const handleRemoveCoAuthor = (authorName) => {
//     setFormData(prev => ({
//       ...prev,
//       coAuthors: prev.coAuthors.filter(a => a !== authorName)
//     }));
//   };

//   const handleKeyPress = (e, handler) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handler();
//     }
//   };

//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error('PDF size should be less than 100MB');
//         return;
//       }
//       setPdfFile(file);
//       toast.success('PDF file selected');
//     }
//   };

//   const handleEpubChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.epub')) {
//         toast.error('Please upload an EPUB file');
//         return;
//       }
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('EPUB size should be less than 50MB');
//         return;
//       }
//       setEpubFile(file);
//       toast.success('EPUB file selected');
//     }
//   };

//   const handlePageImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       toast.error('Some files were not images and were skipped');
//     }
    
//     setPageImages(prev => [...prev, ...validFiles]);
    
//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removePageImage = (index) => {
//     setPageImages(prev => prev.filter((_, i) => i !== index));
//     setPagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
    
//     if (!pdfFile && !isEditMode) {
//       errors.pdf = 'PDF file is required';
//     }
    
//     if (!coverImage && !coverPreview && !isEditMode) {
//       errors.cover = 'Cover image is required';
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }

//     try {
//       setLoading(true);
//       setUploadProgress(0);
      
//       // Prepare data according to backend schema
//       const submitData = {};
      
//       // Basic info - match backend field names
//       submitData.title = formData.title.trim();
//       submitData.author = formData.author;
//       submitData.description = formData.description;
//       submitData.language = formData.language;
//       submitData.type = formData.type;
//       submitData.isPublished = formData.isPublished;
//       submitData.isFeatured = formData.isFeatured;
      
//       // Optional fields
//       if (formData.subtitle) submitData.subtitle = formData.subtitle;
//       if (formData.category) submitData.category = formData.category;
//       if (formData.publisher) submitData.publisher = formData.publisher;
//       if (formData.publishYear) submitData.publishYear = formData.publishYear;
//       if (formData.isbn) submitData.isbn = formData.isbn;
//       if (formData.totalPages) submitData.totalPages = parseInt(formData.totalPages);
//       if (formData.previewPages) submitData.previewPages = parseInt(formData.previewPages);
//       if (formData.watermarkText) submitData.watermarkText = formData.watermarkText;
//       if (formData.metaTitle) submitData.metaTitle = formData.metaTitle;
//       if (formData.metaDescription) submitData.metaDescription = formData.metaDescription;
      
//       // Arrays
//       if (formData.coAuthors.length) submitData.coAuthors = formData.coAuthors;
//       if (formData.genres.length) submitData.genres = formData.genres;
//       if (formData.tags.length) submitData.tags = formData.tags;
//       if (formData.metaKeywords.length) submitData.metaKeywords = formData.metaKeywords;
      
//       // Price
//       submitData.isFree = formData.isFree;
//       submitData.isPremium = formData.isPremium;
//       submitData.price = {
//         amount: parseFloat(formData.price.amount),
//         currency: formData.price.currency
//       };
      
//       console.log('Submitting book data:', submitData);
      
//       let response;
//       if (isEditMode && id) {
//         response = await api.put(`/books/${id}`, submitData);
//         toast.success('Book updated successfully!');
//       } else {
//         response = await api.post('/books', submitData);
//         toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
//       }
      
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
      
//       // Show detailed error messages
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error(`Failed to ${isEditMode ? 'update' : 'upload'} book. Please check all required fields.`);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const languageOptions = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const typeOptions = [
//     { value: 'ebook', label: 'Ebook' },
//     { value: 'journal', label: 'Journal' },
//     { value: 'magazine', label: 'Magazine' },
//     { value: 'rare', label: 'Rare Book' },
//     { value: 'manuscript', label: 'Manuscript' }
//   ];

//   if (fetchingBook) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
//           </p>
//         </div>
        
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={() => setShowDeleteConfirm(true)}
//             className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </button>
//         )}
//       </div>

//       {/* Upload Progress - Only show for file uploads */}
//       {loading && uploadProgress > 0 && (
//         <div className="card p-4">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Uploading...</span>
//             <span className="text-gray-600">{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={loading} className="btn-danger">
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter book title"
//                   className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   placeholder="Enter book subtitle"
//                   className="input-field"
//                 />
//               </div>

//               {/* Author */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Main Author <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//                   disabled={loadingAuthors}
//                 >
//                   <option value="">Select author</option>
//                   {authors.map(author => (
//                     <option key={author._id} value={author._id}>
//                       {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.author && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//                 )}
//               </div>

//               {/* Co-authors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors (Optional)
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={coAuthorInput}
//                     onChange={(e) => setCoAuthorInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddCoAuthor)}
//                     placeholder="Enter co-author name"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddCoAuthor} className="btn-secondary">
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.coAuthors.map((authorName, index) => (
//                     <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       <span>{authorName}</span>
//                       <button type="button" onClick={() => handleRemoveCoAuthor(authorName)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   {formData.coAuthors.length === 0 && (
//                     <p className="text-xs text-gray-400">No co-authors added</p>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter co-author names (press Enter or click Add)
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Enter detailed description of the book..."
//                 className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
//               />
//               {validationErrors.description && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
//               )}
//             </div>
//           </div>

//           {/* Book Details Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//                 <select name="language" value={formData.language} onChange={handleChange} className="input-field">
//                   {languageOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Book Type</label>
//                 <select name="type" value={formData.type} onChange={handleChange} className="input-field">
//                   {typeOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                 <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher name" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
//                 <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="Year of publication" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ISBN (Optional)</label>
//                 <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN number" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                 <input type="number" name="totalPages" value={formData.totalPages} onChange={handleChange} placeholder="Number of pages" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* Genres & Tags Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={genreInput}
//                     onChange={(e) => setGenreInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
//                     placeholder="Add genre (e.g., Poetry, Fiction)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddGenre} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.genres.map(genre => (
//                     <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                       <span>{genre}</span>
//                       <button type="button" onClick={() => handleRemoveGenre(genre)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
//                     placeholder="Add tags (e.g., classic, rare, manuscript)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddTag} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map(tag => (
//                     <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
//                       <span>#{tag}</span>
//                       <button type="button" onClick={() => handleRemoveTag(tag)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Note about file uploads - temporarily disabled */}
//           <div className="border-b border-gray-200 pb-4">
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <div className="flex items-start space-x-3">
//                 <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
//                 <div>
//                   <h3 className="text-sm font-medium text-yellow-800">File Upload Notice</h3>
//                   <p className="text-sm text-yellow-700 mt-1">
//                     PDF, EPUB, Cover Image, and Page Images will be uploaded in a future update. 
//                     For now, please create the book without files, then use the admin panel to add files.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Free Book</span>
//                   <p className="text-sm text-gray-500">Readers can download this book for free</p>
//                 </div>
//               </label>

//               {!formData.isFree && (
//                 <div className="grid md:grid-cols-2 gap-4 pl-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
//                     <input type="number" name="price.amount" value={formData.price.amount} onChange={handleChange} min="0" step="0.01" className="input-field" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
//                       <option value="INR">INR (₹)</option>
//                       <option value="USD">USD ($)</option>
//                       <option value="EUR">EUR (€)</option>
//                       <option value="GBP">GBP (£)</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Premium Content</span>
//                   <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
//                 </div>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Preview Pages</label>
//                 <input type="number" name="previewPages" value={formData.previewPages} onChange={handleChange} min="1" max="50" className="input-field w-32" />
//                 <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text (Optional)</label>
//                 <input type="text" name="watermarkText" value={formData.watermarkText} onChange={handleChange} placeholder="e.g., © Publisher Name" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//                 <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="SEO title (defaults to book title)" className="input-field" maxLength="60" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//                 <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} placeholder="SEO description" className="input-field" maxLength="160" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.metaKeywords.map(keyword => (
//                     <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                       <span>{keyword}</span>
//                       <button type="button" onClick={() => setFormData(prev => ({ ...prev, metaKeywords: prev.metaKeywords.filter(k => k !== keyword) }))}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value.trim()) {
//                         e.preventDefault();
//                         setFormData(prev => ({ ...prev, metaKeywords: [...prev.metaKeywords, e.target.value.trim()] }));
//                         e.target.value = '';
//                       }
//                     }}
//                     placeholder="Add keyword and press Enter"
//                     className="input-field flex-1 min-w-[150px]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === true} onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === false} onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-yellow-600" />
//                     <span className="font-medium text-gray-700">Feature this book</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4">
//             <button type="button" onClick={() => navigate('/creator/content')} className="btn-secondary" disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center">
//               {loading ? (
//                 <>
//                   <Loader className="h-4 w-4 animate-spin" />
//                   <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadEbookPage;

















// // client/src/pages/creator/UploadEbookPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, BookOpen, Tag, 
//   Loader, Globe, Lock, AlertCircle, Trash2,
//   Image, File, Eye, DollarSign, Download, PenTool, Star
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadEbookPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBook, setFetchingBook] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [selectedCoAuthor, setSelectedCoAuthor] = useState('');
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     description: '',
//     author: '',
//     coAuthors: [],
//     category: '',
//     genres: [],
//     language: 'urdu',
//     type: 'ebook',
//     publisher: '',
//     publishYear: new Date().getFullYear(),
//     isbn: '',
//     totalPages: '',
//     previewPages: 10,
//     isFree: true,
//     isPremium: false,
//     price: { amount: 0, currency: 'INR' },
//     watermarkText: '',
//     isPublished: true,
//     isFeatured: false,
//     tags: [],
//     metaTitle: '',
//     metaDescription: '',
//     metaKeywords: []
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [genreInput, setGenreInput] = useState('');
  
//   // File states
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [epubFile, setEpubFile] = useState(null);
//   const [pageImages, setPageImages] = useState([]);
//   const [pagePreviews, setPagePreviews] = useState([]);
  
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch data on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//     fetchCategories();
    
//     if (id) {
//       setIsEditMode(true);
//       fetchBookForEdit(id);
//     }
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       setLoadingAuthors(true);
//       const response = await api.get('/authors?limit=100');
//       const authorsList = response.data.data || response.data.authors || [];
//       setAuthors(authorsList);
//     } catch (error) {
//       console.error('Failed to fetch authors:', error);
//       toast.error('Could not load authors list');
//     } finally {
//       setLoadingAuthors(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories?type=book');
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchBookForEdit = async (bookId) => {
//     try {
//       setFetchingBook(true);
      
//       let book = null;
//       try {
//         const creatorContent = await api.get('/creator/content');
//         const allBooks = creatorContent.data.data?.books || [];
//         book = allBooks.find(b => b._id === bookId);
//       } catch (err) {
//         console.log('Could not fetch from creator content');
//       }
      
//       if (!book) {
//         try {
//           const response = await api.get(`/books/${bookId}`);
//           book = response.data.data || response.data;
//         } catch (err) {
//           console.log('Could not fetch by ID');
//         }
//       }
      
//       if (!book) {
//         toast.error('Book not found');
//         navigate('/creator/content');
//         return;
//       }
      
//       setFormData({
//         title: book.title || '',
//         subtitle: book.subtitle || '',
//         description: book.description || '',
//         author: book.author?._id || book.author || '',
//         coAuthors: book.coAuthors?.map(a => typeof a === 'object' ? a.name : a) || [],
//         category: book.category?._id || book.category || '',
//         genres: book.genres || [],
//         language: book.language || 'urdu',
//         type: book.type || 'ebook',
//         publisher: book.publisher || '',
//         publishYear: book.publishYear || new Date().getFullYear(),
//         isbn: book.isbn || '',
//         totalPages: book.totalPages || '',
//         previewPages: book.previewPages || 10,
//         isFree: book.isFree !== undefined ? book.isFree : true,
//         isPremium: book.isPremium || false,
//         price: book.price || { amount: 0, currency: 'INR' },
//         watermarkText: book.watermarkText || '',
//         isPublished: book.isPublished || false,
//         isFeatured: book.isFeatured || false,
//         tags: book.tags || [],
//         metaTitle: book.metaTitle || '',
//         metaDescription: book.metaDescription || '',
//         metaKeywords: book.metaKeywords || []
//       });
      
//       if (book.coverImage) {
//         setCoverPreview(book.coverImage);
//       }
      
//       toast.success('Book loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//       toast.error('Could not load book for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingBook(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/books/${id}`);
//       toast.success('Book deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete book');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     // Clear validation error for this field
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAddCoAuthor = () => {
//     if (selectedCoAuthor && !formData.coAuthors.includes(selectedCoAuthor)) {
//       setFormData(prev => ({
//         ...prev,
//         coAuthors: [...prev.coAuthors, selectedCoAuthor]
//       }));
//       setSelectedCoAuthor('');
//     }
//   };

//   const handleRemoveCoAuthor = (authorName) => {
//     setFormData(prev => ({
//       ...prev,
//       coAuthors: prev.coAuthors.filter(a => a !== authorName)
//     }));
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim().toLowerCase()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }));
//   };

//   const handleAddGenre = () => {
//     if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
//       setFormData(prev => ({
//         ...prev,
//         genres: [...prev.genres, genreInput.trim().toLowerCase()]
//       }));
//       setGenreInput('');
//     }
//   };

//   const handleRemoveGenre = (genre) => {
//     setFormData(prev => ({
//       ...prev,
//       genres: prev.genres.filter(g => g !== genre)
//     }));
//   };

//   const handleKeyPress = (e, handler) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handler();
//     }
//   };

//   const handleCoverImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error('PDF size should be less than 100MB');
//         return;
//       }
//       setPdfFile(file);
//       toast.success('PDF file selected');
//     }
//   };

//   const handleEpubChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.name.endsWith('.epub')) {
//         toast.error('Please upload an EPUB file');
//         return;
//       }
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('EPUB size should be less than 50MB');
//         return;
//       }
//       setEpubFile(file);
//       toast.success('EPUB file selected');
//     }
//   };

//   const handlePageImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (validFiles.length !== files.length) {
//       toast.error('Some files were not images and were skipped');
//     }
    
//     setPageImages(prev => [...prev, ...validFiles]);
    
//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPagePreviews(prev => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removePageImage = (index) => {
//     setPageImages(prev => prev.filter((_, i) => i !== index));
//     setPagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
    
//     // Only require files for new books, not for edit mode
//     if (!isEditMode) {
//       if (!pdfFile) {
//         errors.pdf = 'PDF file is required';
//       }
//       if (!coverImage && !coverPreview) {
//         errors.cover = 'Cover image is required';
//       }
//     }
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Get unique authors for co-author dropdown (exclude main author)
//   const getAvailableCoAuthors = () => {
//     const mainAuthor = authors.find(a => a._id === formData.author);
//     return authors.filter(author => {
//       const authorName = author.name;
//       return authorName !== mainAuthor?.name && !formData.coAuthors.includes(authorName);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }

//     try {
//       setLoading(true);
//       setUploadProgress(0);
      
//       // Prepare data according to backend schema
//       const submitData = {};
      
//       // Basic info - match backend field names
//       submitData.title = formData.title.trim();
//       submitData.author = formData.author;
//       submitData.description = formData.description;
//       submitData.language = formData.language;
//       submitData.type = formData.type;
//       submitData.isPublished = formData.isPublished;
//       submitData.isFeatured = formData.isFeatured;
      
//       // Optional fields
//       if (formData.subtitle) submitData.subtitle = formData.subtitle;
//       if (formData.category) submitData.category = formData.category;
//       if (formData.publisher) submitData.publisher = formData.publisher;
//       if (formData.publishYear) submitData.publishYear = parseInt(formData.publishYear);
//       if (formData.isbn) submitData.isbn = formData.isbn;
//       if (formData.totalPages) submitData.totalPages = parseInt(formData.totalPages);
//       if (formData.previewPages) submitData.previewPages = parseInt(formData.previewPages);
//       if (formData.watermarkText) submitData.watermarkText = formData.watermarkText;
//       if (formData.metaTitle) submitData.metaTitle = formData.metaTitle;
//       if (formData.metaDescription) submitData.metaDescription = formData.metaDescription;
      
//       // Arrays - coAuthors as names (strings)
//       if (formData.coAuthors.length) submitData.coAuthors = formData.coAuthors;
//       if (formData.genres.length) submitData.genres = formData.genres;
//       if (formData.tags.length) submitData.tags = formData.tags;
//       if (formData.metaKeywords.length) submitData.metaKeywords = formData.metaKeywords;
      
//       // Price
//       submitData.isFree = formData.isFree;
//       submitData.isPremium = formData.isPremium;
//       submitData.price = {
//         amount: parseFloat(formData.price.amount),
//         currency: formData.price.currency
//       };
      
//       console.log('Submitting book data:', submitData);
      
//       let response;
//       if (isEditMode && id) {
//         response = await api.put(`/books/${id}`, submitData);
//         toast.success('Book updated successfully!');
//       } else {
//         response = await api.post('/books', submitData);
//         toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
//       }
      
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
      
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error(`Failed to ${isEditMode ? 'update' : 'upload'} book. Please check all required fields.`);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const languageOptions = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const typeOptions = [
//     { value: 'ebook', label: 'Ebook' },
//     { value: 'journal', label: 'Journal' },
//     { value: 'magazine', label: 'Magazine' },
//     { value: 'rare', label: 'Rare Book' },
//     { value: 'manuscript', label: 'Manuscript' }
//   ];

//   if (fetchingBook) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
//           </p>
//         </div>
        
//         {isEditMode && (
//           <button
//             type="button"
//             onClick={() => setShowDeleteConfirm(true)}
//             className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete
//           </button>
//         )}
//       </div>

//       {/* Upload Progress */}
//       {loading && uploadProgress > 0 && (
//         <div className="card p-4">
//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-gray-600">Uploading...</span>
//             <span className="text-gray-600">{uploadProgress}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleDelete} disabled={loading} className="btn-danger">
//                 {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Title */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter book title"
//                   className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
//                 />
//                 {validationErrors.title && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   placeholder="Enter book subtitle"
//                   className="input-field"
//                 />
//               </div>

//               {/* Author */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Main Author <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//                   disabled={loadingAuthors}
//                 >
//                   <option value="">Select author</option>
//                   {authors.map(author => (
//                     <option key={author._id} value={author._id}>
//                       {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.author && (
//                   <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//                 )}
//               </div>

//               {/* Co-authors - Dropdown from existing authors */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Co-authors (Optional)
//                 </label>
//                 <div className="flex space-x-2">
//                   <select
//                     value={selectedCoAuthor}
//                     onChange={(e) => setSelectedCoAuthor(e.target.value)}
//                     className="input-field flex-1"
//                   >
//                     <option value="">Select co-author</option>
//                     {getAvailableCoAuthors().map(author => (
//                       <option key={author._id} value={author.name}>
//                         {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                   <button 
//                     type="button" 
//                     onClick={handleAddCoAuthor} 
//                     className="btn-secondary"
//                     disabled={!selectedCoAuthor}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.coAuthors.map((authorName, index) => (
//                     <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                       <span>{authorName}</span>
//                       <button type="button" onClick={() => handleRemoveCoAuthor(authorName)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   {formData.coAuthors.length === 0 && (
//                     <p className="text-xs text-gray-400">No co-authors added</p>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Select co-authors from the dropdown and click Add
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Enter detailed description of the book..."
//                 className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
//               />
//               {validationErrors.description && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
//               )}
//             </div>
//           </div>

//           {/* Book Details Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
//                 <select name="language" value={formData.language} onChange={handleChange} className="input-field">
//                   {languageOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Book Type</label>
//                 <select name="type" value={formData.type} onChange={handleChange} className="input-field">
//                   {typeOptions.map(opt => (
//                     <option key={opt.value} value={opt.value}>{opt.label}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
//                 <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher name" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
//                 <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="Year of publication" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ISBN (Optional)</label>
//                 <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN number" className="input-field" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
//                 <input type="number" name="totalPages" value={formData.totalPages} onChange={handleChange} placeholder="Number of pages" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* Genres & Tags Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={genreInput}
//                     onChange={(e) => setGenreInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
//                     placeholder="Add genre (e.g., Poetry, Fiction)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddGenre} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.genres.map(genre => (
//                     <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                       <span>{genre}</span>
//                       <button type="button" onClick={() => handleRemoveGenre(genre)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
//                     placeholder="Add tags (e.g., classic, rare, manuscript)"
//                     className="input-field flex-1"
//                   />
//                   <button type="button" onClick={handleAddTag} className="btn-secondary">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map(tag => (
//                     <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
//                       <span>#{tag}</span>
//                       <button type="button" onClick={() => handleRemoveTag(tag)}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Files Section - Only show for new books */}
//           {!isEditMode && (
//             <div className="border-b border-gray-200 pb-4">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Files</h2>
              
//               <div className="space-y-6">
//                 {/* Cover Image */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Cover Image <span className="text-red-500">*</span>
//                   </label>
//                   {coverPreview ? (
//                     <div className="relative inline-block">
//                       <img src={coverPreview} alt="Cover preview" className="w-40 h-52 object-cover rounded-lg border border-gray-200" />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setCoverImage(null);
//                           setCoverPreview(null);
//                         }}
//                         className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-40 h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                       <Image className="h-8 w-8 text-gray-400" />
//                       <span className="text-xs text-gray-500 mt-1">Upload Cover</span>
//                       <p className="text-xs text-gray-400">JPG, PNG (5MB max)</p>
//                       <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
//                     </label>
//                   )}
//                   {validationErrors.cover && <p className="text-red-500 text-xs mt-1">{validationErrors.cover}</p>}
//                 </div>

//                 {/* PDF File */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     PDF File <span className="text-red-500">*</span>
//                   </label>
//                   {pdfFile ? (
//                     <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                       <File className="h-6 w-6 text-green-600" />
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-green-700">{pdfFile.name}</p>
//                         <p className="text-xs text-green-600">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                       </div>
//                       <button type="button" onClick={() => setPdfFile(null)} className="text-red-600">
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                       <File className="h-8 w-8 text-gray-400" />
//                       <span className="text-sm text-gray-500 mt-1">Upload PDF</span>
//                       <p className="text-xs text-gray-400">PDF (100MB max)</p>
//                       <input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
//                     </label>
//                   )}
//                   {validationErrors.pdf && <p className="text-red-500 text-xs mt-1">{validationErrors.pdf}</p>}
//                 </div>

//                 {/* EPUB File */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     EPUB File (Optional)
//                   </label>
//                   {epubFile ? (
//                     <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
//                       <BookOpen className="h-6 w-6 text-green-600" />
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-green-700">{epubFile.name}</p>
//                         <p className="text-xs text-green-600">{(epubFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                       </div>
//                       <button type="button" onClick={() => setEpubFile(null)} className="text-red-600">
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                       <BookOpen className="h-8 w-8 text-gray-400" />
//                       <span className="text-sm text-gray-500 mt-1">Upload EPUB</span>
//                       <p className="text-xs text-gray-400">EPUB (50MB max)</p>
//                       <input type="file" accept=".epub" onChange={handleEpubChange} className="hidden" />
//                     </label>
//                   )}
//                 </div>

//                 {/* Page Images */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Page Images (Optional)
//                   </label>
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
//                     <Image className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm text-gray-500 mt-1">Upload Page Images</span>
//                     <p className="text-xs text-gray-400">JPG, PNG (Multiple files allowed)</p>
//                     <input type="file" accept="image/*" multiple onChange={handlePageImagesChange} className="hidden" />
//                   </label>
//                   {pagePreviews.length > 0 && (
//                     <div className="mt-3 grid grid-cols-4 gap-2">
//                       {pagePreviews.map((preview, idx) => (
//                         <div key={idx} className="relative">
//                           <img src={preview} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
//                           <button
//                             type="button"
//                             onClick={() => removePageImage(idx)}
//                             className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full"
//                           >
//                             <X className="h-3 w-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Note for edit mode */}
//           {isEditMode && (
//             <div className="border-b border-gray-200 pb-4">
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-start space-x-3">
//                   <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
//                   <div>
//                     <h3 className="text-sm font-medium text-blue-800">File Management</h3>
//                     <p className="text-sm text-blue-700 mt-1">
//                       To update files (cover, PDF, EPUB), please use the admin panel. 
//                       This form only updates book metadata.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Pricing Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Free Book</span>
//                   <p className="text-sm text-gray-500">Readers can download this book for free</p>
//                 </div>
//               </label>

//               {!formData.isFree && (
//                 <div className="grid md:grid-cols-2 gap-4 pl-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
//                     <input type="number" name="price.amount" value={formData.price.amount} onChange={handleChange} min="0" step="0.01" className="input-field" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
//                       <option value="INR">INR (₹)</option>
//                       <option value="USD">USD ($)</option>
//                       <option value="EUR">EUR (€)</option>
//                       <option value="GBP">GBP (£)</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <span className="font-medium text-gray-700">Premium Content</span>
//                   <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
//                 </div>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Preview Pages</label>
//                 <input type="number" name="previewPages" value={formData.previewPages} onChange={handleChange} min="1" max="50" className="input-field w-32" />
//                 <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text (Optional)</label>
//                 <input type="text" name="watermarkText" value={formData.watermarkText} onChange={handleChange} placeholder="e.g., © Publisher Name" className="input-field" />
//               </div>
//             </div>
//           </div>

//           {/* SEO Section */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//                 <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="SEO title (defaults to book title)" className="input-field" maxLength="60" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//                 <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} placeholder="SEO description" className="input-field" maxLength="160" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.metaKeywords.map(keyword => (
//                     <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
//                       <span>{keyword}</span>
//                       <button type="button" onClick={() => setFormData(prev => ({ ...prev, metaKeywords: prev.metaKeywords.filter(k => k !== keyword) }))}>
//                         <X className="h-3 w-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value.trim()) {
//                         e.preventDefault();
//                         setFormData(prev => ({ ...prev, metaKeywords: [...prev.metaKeywords, e.target.value.trim()] }));
//                         e.target.value = '';
//                       }
//                     }}
//                     placeholder="Add keyword and press Enter"
//                     className="input-field flex-1 min-w-[150px]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-b border-gray-200 pb-4">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === true} onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="radio" name="isPublished" checked={formData.isPublished === false} onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>

//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
//                 <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-primary-600" />
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-yellow-600" />
//                     <span className="font-medium text-gray-700">Feature this book</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4">
//             <button type="button" onClick={() => navigate('/creator/content')} className="btn-secondary" disabled={loading}>
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center">
//               {loading ? (
//                 <>
//                   <Loader className="h-4 w-4 animate-spin" />
//                   <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadEbookPage;




















// client/src/pages/creator/UploadEbookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, X, FileText, BookOpen, Tag, 
  Loader, Globe, Lock, AlertCircle, Trash2,
  Image, File, Eye, DollarSign, Download, PenTool, Star,
  CheckCircle, AlertTriangle
} from 'lucide-react';
import api from '../../services/api';
import uploadAPI from '../../api/uploadAPI';
import bookAPI from '../../api/bookAPI';
import toast from 'react-hot-toast';
import authService from '../../services/authService';

const UploadEbookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingBook, setFetchingBook] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCoAuthor, setSelectedCoAuthor] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    author: '',
    coAuthors: [],
    category: '',
    genres: [],
    language: 'urdu',
    type: 'ebook',
    publisher: '',
    publishYear: new Date().getFullYear(),
    isbn: '',
    totalPages: '',
    previewPages: 10,
    isFree: true,
    isPremium: false,
    price: { amount: 0, currency: 'INR' },
    watermarkText: '',
    isPublished: true,
    isFeatured: false,
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  
  // File states with Cloudinary URLs
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  
  const [epubFile, setEpubFile] = useState(null);
  const [epubUrl, setEpubUrl] = useState('');
  
  const [pageImages, setPageImages] = useState([]);
  const [pagePreviews, setPagePreviews] = useState([]);
  const [pageUrls, setPageUrls] = useState([]);
  
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch data on mount
  useEffect(() => {
    fetchUser();
    fetchAuthors();
    fetchCategories();
    
    if (id) {
      setIsEditMode(true);
      fetchBookForEdit(id);
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      setLoadingAuthors(true);
      const response = await api.get('/authors?limit=100');
      const authorsList = response.data.data || response.data.authors || [];
      setAuthors(authorsList);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
      toast.error('Could not load authors list');
    } finally {
      setLoadingAuthors(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories?type=book');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchBookForEdit = async (bookId) => {
    try {
      setFetchingBook(true);
      
      // Try to get from creator content first
      let book = null;
      try {
        const creatorContent = await api.get('/creator/content');
        const allBooks = creatorContent.data.data?.books || [];
        book = allBooks.find(b => b._id === bookId);
      } catch (err) {
        console.log('Could not fetch from creator content');
      }
      
      // If not found, try direct fetch by ID
      if (!book) {
        try {
          const response = await api.get(`/books/${bookId}`);
          book = response.data.data || response.data;
        } catch (err) {
          console.log('Could not fetch by ID');
        }
      }
      
      if (!book) {
        toast.error('Book not found');
        navigate('/creator/content');
        return;
      }
      
      setFormData({
        title: book.title || '',
        subtitle: book.subtitle || '',
        description: book.description || '',
        author: book.author?._id || book.author || '',
        coAuthors: book.coAuthors?.map(a => typeof a === 'object' ? a.name : a) || [],
        category: book.category?._id || book.category || '',
        genres: book.genres || [],
        language: book.language || 'urdu',
        type: book.type || 'ebook',
        publisher: book.publisher || '',
        publishYear: book.publishYear || new Date().getFullYear(),
        isbn: book.isbn || '',
        totalPages: book.totalPages || '',
        previewPages: book.previewPages || 10,
        isFree: book.isFree !== undefined ? book.isFree : true,
        isPremium: book.isPremium || false,
        price: book.price || { amount: 0, currency: 'INR' },
        watermarkText: book.watermarkText || '',
        isPublished: book.isPublished || false,
        isFeatured: book.isFeatured || false,
        tags: book.tags || [],
        metaTitle: book.metaTitle || '',
        metaDescription: book.metaDescription || '',
        metaKeywords: book.metaKeywords || []
      });
      
      // Set existing file URLs
      if (book.coverImage) {
        setCoverPreview(book.coverImage);
        setCoverUrl(book.coverImage);
      }
      if (book.pdfUrl) setPdfUrl(book.pdfUrl);
      if (book.epubUrl) setEpubUrl(book.epubUrl);
      if (book.pageImages && book.pageImages.length) {
        setPageUrls(book.pageImages);
        setPagePreviews(book.pageImages);
      }
      
      toast.success('Book loaded for editing');
    } catch (error) {
      console.error('Failed to fetch book:', error);
      toast.error('Could not load book for editing');
      navigate('/creator/content');
    } finally {
      setFetchingBook(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await bookAPI.deleteBook(id);
      toast.success('Book deleted successfully');
      navigate('/creator/content');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddCoAuthor = () => {
    if (selectedCoAuthor && !formData.coAuthors.includes(selectedCoAuthor)) {
      setFormData(prev => ({
        ...prev,
        coAuthors: [...prev.coAuthors, selectedCoAuthor]
      }));
      setSelectedCoAuthor('');
    }
  };

  const handleRemoveCoAuthor = (authorName) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: prev.coAuthors.filter(a => a !== authorName)
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, genreInput.trim().toLowerCase()]
      }));
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter(g => g !== genre)
    }));
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  };

  // Upload cover image to Cloudinary
  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploadingFile(true);
      setUploadStatus(prev => ({ ...prev, cover: 'uploading' }));
      
      const result = await uploadAPI.uploadCover(file, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success || result.url) {
        const imageUrl = result.url || result.data?.url;
        setCoverPreview(imageUrl);
        setCoverUrl(imageUrl);
        setCoverImage(null); // Clear file object, use URL instead
        setUploadStatus(prev => ({ ...prev, cover: 'success' }));
        toast.success('Cover image uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Cover upload error:', error);
      setUploadStatus(prev => ({ ...prev, cover: 'error' }));
      toast.error(error.message || 'Failed to upload cover image');
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
    }
  };

  // Upload PDF to Cloudinary
  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploadingFile(true);
      setUploadStatus(prev => ({ ...prev, pdf: 'uploading' }));
      
      const result = await uploadAPI.uploadPDF(file, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success || result.url) {
        const fileUrl = result.url || result.data?.url;
        setPdfUrl(fileUrl);
        setPdfFile(null);
        setUploadStatus(prev => ({ ...prev, pdf: 'success' }));
        toast.success('PDF uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('PDF upload error:', error);
      setUploadStatus(prev => ({ ...prev, pdf: 'error' }));
      toast.error(error.message || 'Failed to upload PDF');
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
    }
  };

  // Upload EPUB to Cloudinary
  const handleEpubChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploadingFile(true);
      setUploadStatus(prev => ({ ...prev, epub: 'uploading' }));
      
      const result = await uploadAPI.uploadEPUB(file, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success || result.url) {
        const fileUrl = result.url || result.data?.url;
        setEpubUrl(fileUrl);
        setEpubFile(null);
        setUploadStatus(prev => ({ ...prev, epub: 'success' }));
        toast.success('EPUB uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('EPUB upload error:', error);
      setUploadStatus(prev => ({ ...prev, epub: 'error' }));
      toast.error(error.message || 'Failed to upload EPUB');
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
    }
  };

  // Upload multiple page images
  const handlePageImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    try {
      setUploadingFile(true);
      setUploadStatus(prev => ({ ...prev, pages: 'uploading' }));
      
      const result = await uploadAPI.uploadPages(files, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success && result.urls) {
        const urls = result.urls;
        setPageUrls(prev => [...prev, ...urls]);
        setPagePreviews(prev => [...prev, ...urls]);
        setPageImages([]);
        setUploadStatus(prev => ({ ...prev, pages: 'success' }));
        toast.success(`${urls.length} page images uploaded successfully`);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Page images upload error:', error);
      setUploadStatus(prev => ({ ...prev, pages: 'error' }));
      toast.error(error.message || 'Failed to upload page images');
    } finally {
      setUploadingFile(false);
      setUploadProgress(0);
    }
  };

  const removePageImage = (index) => {
    setPagePreviews(prev => prev.filter((_, i) => i !== index));
    setPageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.author) {
      errors.author = 'Please select an author';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    // Only require files for new books
    if (!isEditMode) {
      if (!pdfUrl && !pdfFile) {
        errors.pdf = 'PDF file is required';
      }
      if (!coverUrl && !coverPreview && !coverImage) {
        errors.cover = 'Cover image is required';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Get unique authors for co-author dropdown
  const getAvailableCoAuthors = () => {
    const mainAuthor = authors.find(a => a._id === formData.author);
    return authors.filter(author => {
      const authorName = author.name;
      return authorName !== mainAuthor?.name && !formData.coAuthors.includes(authorName);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare submit data
      const submitData = {
        title: formData.title.trim(),
        author: formData.author,
        description: formData.description,
        language: formData.language,
        type: formData.type,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        isFree: formData.isFree,
        isPremium: formData.isPremium,
        previewPages: parseInt(formData.previewPages),
        price: {
          amount: parseFloat(formData.price.amount),
          currency: formData.price.currency
        }
      };
      
      // Add optional fields
      if (formData.subtitle) submitData.subtitle = formData.subtitle;
      if (formData.category) submitData.category = formData.category;
      if (formData.publisher) submitData.publisher = formData.publisher;
      if (formData.publishYear) submitData.publishYear = parseInt(formData.publishYear);
      if (formData.isbn) submitData.isbn = formData.isbn;
      if (formData.totalPages) submitData.totalPages = parseInt(formData.totalPages);
      if (formData.watermarkText) submitData.watermarkText = formData.watermarkText;
      if (formData.metaTitle) submitData.metaTitle = formData.metaTitle;
      if (formData.metaDescription) submitData.metaDescription = formData.metaDescription;
      
      // Add arrays
      if (formData.coAuthors.length) submitData.coAuthors = formData.coAuthors;
      if (formData.genres.length) submitData.genres = formData.genres;
      if (formData.tags.length) submitData.tags = formData.tags;
      if (formData.metaKeywords.length) submitData.metaKeywords = formData.metaKeywords;
      
      // Add Cloudinary URLs
      if (coverUrl) submitData.coverImage = coverUrl;
      if (pdfUrl) submitData.pdfUrl = pdfUrl;
      if (epubUrl) submitData.epubUrl = epubUrl;
      if (pageUrls.length) submitData.pageImages = pageUrls;
      
      console.log('Submitting book data:', submitData);
      
      let response;
      if (isEditMode && id) {
        response = await bookAPI.updateBook(id, submitData);
        toast.success('Book updated successfully!');
      } else {
        response = await bookAPI.createBook(submitData);
        toast.success(formData.isPublished ? 'Book published successfully!' : 'Book saved as draft');
      }
      
      navigate('/creator/content');
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach(err => {
          toast.error(err.msg || err.message);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'upload'} book. Please check all required fields.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    { value: 'urdu', label: 'Urdu' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'persian', label: 'Persian' },
    { value: 'arabic', label: 'Arabic' }
  ];

  const typeOptions = [
    { value: 'ebook', label: 'Ebook' },
    { value: 'journal', label: 'Journal' },
    { value: 'magazine', label: 'Magazine' },
    { value: 'rare', label: 'Rare Book' },
    { value: 'manuscript', label: 'Manuscript' }
  ];

  if (fetchingBook) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Status icon component
  const StatusIcon = ({ status }) => {
    if (status === 'uploading') return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'error') return <AlertTriangle className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Ebook' : 'Upload Ebook'}
          </h1>
          <p className="text-gray-500">
            {isEditMode ? 'Update your ebook details' : 'Share your digital books with readers worldwide'}
          </p>
        </div>
        
        {isEditMode && (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-outline text-red-600 hover:bg-red-50 border-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        )}
      </div>

      {/* Upload Progress */}
      {uploadingFile && uploadProgress > 0 && (
        <div className="card p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Uploading to Cloudinary...</span>
            <span className="text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Book</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{formData.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading} className="btn-danger">
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className={`input-field ${validationErrors.title ? 'border-red-500' : ''}`}
                />
                {validationErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle (Optional)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter book subtitle"
                  className="input-field"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Author <span className="text-red-500">*</span>
                </label>
                <select
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
                  disabled={loadingAuthors}
                >
                  <option value="">Select author</option>
                  {authors.map(author => (
                    <option key={author._id} value={author._id}>
                      {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
                    </option>
                  ))}
                </select>
                {validationErrors.author && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
                )}
              </div>

              {/* Co-authors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Co-authors (Optional)
                </label>
                <div className="flex space-x-2">
                  <select
                    value={selectedCoAuthor}
                    onChange={(e) => setSelectedCoAuthor(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="">Select co-author</option>
                    {getAvailableCoAuthors().map(author => (
                      <option key={author._id} value={author.name}>
                        {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={handleAddCoAuthor} 
                    className="btn-secondary"
                    disabled={!selectedCoAuthor}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.coAuthors.map((authorName, index) => (
                    <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      <span>{authorName}</span>
                      <button type="button" onClick={() => handleRemoveCoAuthor(authorName)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {formData.coAuthors.length === 0 && (
                    <p className="text-xs text-gray-400">No co-authors added</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Enter detailed description of the book..."
                className={`input-field ${validationErrors.description ? 'border-red-500' : ''}`}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
              )}
            </div>
          </div>

          {/* Book Details Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select name="language" value={formData.language} onChange={handleChange} className="input-field">
                  {languageOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Book Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="input-field">
                  {typeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher name" className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Year</label>
                <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="Year of publication" className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ISBN (Optional)</label>
                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN number" className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
                <input type="number" name="totalPages" value={formData.totalPages} onChange={handleChange} placeholder="Number of pages" className="input-field" />
              </div>
            </div>
          </div>

          {/* Genres & Tags Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Genres & Tags</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={genreInput}
                    onChange={(e) => setGenreInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
                    placeholder="Add genre (e.g., Poetry, Fiction)"
                    className="input-field flex-1"
                  />
                  <button type="button" onClick={handleAddGenre} className="btn-secondary">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.genres.map(genre => (
                    <span key={genre} className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      <span>{genre}</span>
                      <button type="button" onClick={() => handleRemoveGenre(genre)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                    placeholder="Add tags (e.g., classic, rare, manuscript)"
                    className="input-field flex-1"
                  />
                  <button type="button" onClick={handleAddTag} className="btn-secondary">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      <span>#{tag}</span>
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Files Section with Cloudinary Upload */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Files (Upload to Cloudinary)</h2>
            
            <div className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                {coverPreview ? (
                  <div className="relative inline-block">
                    <img src={coverPreview} alt="Cover preview" className="w-40 h-52 object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverPreview(null);
                        setCoverUrl('');
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-40 h-52 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload Cover</span>
                    <p className="text-xs text-gray-400">JPG, PNG (5MB max)</p>
                    <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" disabled={uploadingFile} />
                  </label>
                )}
                {uploadStatus.cover && (
                  <div className="flex items-center space-x-2 mt-2">
                    <StatusIcon status={uploadStatus.cover} />
                    <span className="text-xs text-gray-500">
                      {uploadStatus.cover === 'uploading' && 'Uploading to Cloudinary...'}
                      {uploadStatus.cover === 'success' && 'Uploaded successfully'}
                      {uploadStatus.cover === 'error' && 'Upload failed'}
                    </span>
                  </div>
                )}
                {validationErrors.cover && <p className="text-red-500 text-xs mt-1">{validationErrors.cover}</p>}
              </div>

              {/* PDF File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File <span className="text-red-500">*</span>
                </label>
                {pdfUrl ? (
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <File className="h-6 w-6 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-700">PDF uploaded to Cloudinary</p>
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View file</a>
                    </div>
                    <button type="button" onClick={() => setPdfUrl('')} className="text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
                    <File className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-1">Upload PDF to Cloudinary</span>
                    <p className="text-xs text-gray-400">PDF (100MB max)</p>
                    <input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" disabled={uploadingFile} />
                  </label>
                )}
                {uploadStatus.pdf && (
                  <div className="flex items-center space-x-2 mt-2">
                    <StatusIcon status={uploadStatus.pdf} />
                    <span className="text-xs text-gray-500">
                      {uploadStatus.pdf === 'uploading' && 'Uploading to Cloudinary...'}
                      {uploadStatus.pdf === 'success' && 'Uploaded successfully'}
                      {uploadStatus.pdf === 'error' && 'Upload failed'}
                    </span>
                  </div>
                )}
                {validationErrors.pdf && <p className="text-red-500 text-xs mt-1">{validationErrors.pdf}</p>}
              </div>

              {/* EPUB File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EPUB File (Optional)
                </label>
                {epubUrl ? (
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-700">EPUB uploaded to Cloudinary</p>
                      <a href={epubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View file</a>
                    </div>
                    <button type="button" onClick={() => setEpubUrl('')} className="text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-1">Upload EPUB to Cloudinary</span>
                    <p className="text-xs text-gray-400">EPUB (50MB max)</p>
                    <input type="file" accept=".epub" onChange={handleEpubChange} className="hidden" disabled={uploadingFile} />
                  </label>
                )}
                {uploadStatus.epub && (
                  <div className="flex items-center space-x-2 mt-2">
                    <StatusIcon status={uploadStatus.epub} />
                    <span className="text-xs text-gray-500">
                      {uploadStatus.epub === 'uploading' && 'Uploading to Cloudinary...'}
                      {uploadStatus.epub === 'success' && 'Uploaded successfully'}
                      {uploadStatus.epub === 'error' && 'Upload failed'}
                    </span>
                  </div>
                )}
              </div>

              {/* Page Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Images (Optional)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50">
                  <Image className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">Upload Page Images to Cloudinary</span>
                  <p className="text-xs text-gray-400">JPG, PNG (Multiple files allowed, 2MB each)</p>
                  <input type="file" accept="image/*" multiple onChange={handlePageImagesChange} className="hidden" disabled={uploadingFile} />
                </label>
                {uploadStatus.pages && (
                  <div className="flex items-center space-x-2 mt-2">
                    <StatusIcon status={uploadStatus.pages} />
                    <span className="text-xs text-gray-500">
                      {uploadStatus.pages === 'uploading' && 'Uploading to Cloudinary...'}
                      {uploadStatus.pages === 'success' && 'Uploaded successfully'}
                      {uploadStatus.pages === 'error' && 'Upload failed'}
                    </span>
                  </div>
                )}
                {pagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {pagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative">
                        <img src={preview} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded border" />
                        <button
                          type="button"
                          onClick={() => removePageImage(idx)}
                          className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Access</h2>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} className="w-4 h-4 text-primary-600" />
                <div>
                  <span className="font-medium text-gray-700">Free Book</span>
                  <p className="text-sm text-gray-500">Readers can download this book for free</p>
                </div>
              </label>

              {!formData.isFree && (
                <div className="grid md:grid-cols-2 gap-4 pl-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Amount)</label>
                    <input type="number" name="price.amount" value={formData.price.amount} onChange={handleChange} min="0" step="0.01" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select name="price.currency" value={formData.price.currency} onChange={handleChange} className="input-field">
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
              )}

              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} className="w-4 h-4 text-primary-600" />
                <div>
                  <span className="font-medium text-gray-700">Premium Content</span>
                  <p className="text-sm text-gray-500">Only premium subscribers can access this book</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview Pages</label>
                <input type="number" name="previewPages" value={formData.previewPages} onChange={handleChange} min="1" max="50" className="input-field w-32" />
                <p className="text-xs text-gray-500 mt-1">Number of pages visible before download/purchase</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text (Optional)</label>
                <input type="text" name="watermarkText" value={formData.watermarkText} onChange={handleChange} placeholder="e.g., © Publisher Name" className="input-field" />
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} placeholder="SEO title (defaults to book title)" className="input-field" maxLength="60" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} placeholder="SEO description" className="input-field" maxLength="160" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                <div className="flex flex-wrap gap-2">
                  {formData.metaKeywords.map(keyword => (
                    <span key={keyword} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                      <span>{keyword}</span>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, metaKeywords: prev.metaKeywords.filter(k => k !== keyword) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        e.preventDefault();
                        setFormData(prev => ({ ...prev, metaKeywords: [...prev.metaKeywords, e.target.value.trim()] }));
                        e.target.value = '';
                      }
                    }}
                    placeholder="Add keyword and press Enter"
                    className="input-field flex-1 min-w-[150px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publication Settings */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Settings</h2>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input type="radio" name="isPublished" checked={formData.isPublished === true} onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))} className="w-4 h-4 text-primary-600" />
                <div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-700">Publish Now</span>
                  </div>
                  <p className="text-sm text-gray-500">Visible to everyone immediately</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input type="radio" name="isPublished" checked={formData.isPublished === false} onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))} className="w-4 h-4 text-primary-600" />
                <div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-gray-700">Save as Draft</span>
                  </div>
                  <p className="text-sm text-gray-500">Only you can see this until published</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-primary-600" />
                <div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-gray-700">Feature this book</span>
                  </div>
                  <p className="text-sm text-gray-500">Appears on homepage and featured sections</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button type="button" onClick={() => navigate('/creator/content')} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading || uploadingFile} className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center">
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>{isEditMode ? 'Update Book' : (formData.isPublished ? 'Publish Book' : 'Save as Draft')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadEbookPage;