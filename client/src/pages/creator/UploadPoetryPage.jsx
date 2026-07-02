// //client\src\pages\creator\UploadPoetryPage.jsx
// const UploadPoetryPage = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Upload Poetry Page</h1>
//       <p>This page is under development 🚧</p>
//     </div>
//   );
// };

// export default UploadPoetryPage;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, Tag, BookOpen, 
//   Loader, Globe, Lock
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadPoetryPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     genre: '',
//     tags: [],
//     isPublic: true
//   });
//   const [tagInput, setTagInput] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);

//   // Fetch user on mount
//   React.useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await authService.getProfile();
//         setUser(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const genres = [
//     'Ghazal', 'Nazm', 'Sher', 'Rubai', 'Qita', 
//     'Marsiya', 'Qawwali', 'Hamd', 'Naat', 'Manqabat',
//     'Doha', 'Geet', 'Song', 'Other'
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
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

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   const handleImageChange = (e) => {
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.content.trim()) {
//       toast.error('Please enter the poetry content');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const submitData = new FormData();
//       submitData.append('title', formData.title);
//       submitData.append('description', formData.description);
//       submitData.append('content', formData.content);
//       submitData.append('genre', formData.genre);
//       submitData.append('tags', JSON.stringify(formData.tags));
//       submitData.append('isPublic', formData.isPublic);
//       if (coverImage) {
//         submitData.append('coverImage', coverImage);
//       }

//       await api.post('/poems', submitData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       toast.success('Poetry uploaded successfully!');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload poetry');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Poetry</h1>
//         <p className="text-gray-500">Share your poetic creations with the world</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter the title of your poetry"
//             className="input-field"
//             required
//           />
//         </div>

//         {/* Cover Image */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Cover Image
//           </label>
//           <div className="flex items-start space-x-4">
//             {coverPreview ? (
//               <div className="relative">
//                 <img 
//                   src={coverPreview} 
//                   alt="Cover preview" 
//                   className="w-32 h-32 object-cover rounded-lg border border-gray-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCoverImage(null);
//                     setCoverPreview(null);
//                   }}
//                   className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
//                 <Upload className="h-8 w-8 text-gray-400" />
//                 <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//             <div className="flex-1">
//               <p className="text-sm text-gray-600">Recommended: 1200x630px for best display</p>
//               <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
//             </div>
//           </div>
//         </div>

//         {/* Genre */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Genre
//           </label>
//           <select
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             className="input-field"
//           >
//             <option value="">Select a genre</option>
//             {genres.map(genre => (
//               <option key={genre} value={genre}>{genre}</option>
//             ))}
//           </select>
//         </div>

//         {/* Poetry Content */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Poetry Content <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows={14}
//             placeholder="Write your poetry here...
// You can use line breaks and stanzas...

// Example:
// Yeh dil hai ya koi sheesh mahal,
// Toota to bikhar jaayega.

// Har ek zakham se ek naya sabak mila,
// Zindagi ne mujhe likhna sikha diya."
//             className="input-field font-mono"
//             required
//           />
//           <p className="text-xs text-gray-500 mt-2">
//             Line breaks and formatting will be preserved
//           </p>
//         </div>

//         {/* Description */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Write a brief description about your poetry..."
//             className="input-field"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             A good description helps readers understand your work better
//           </p>
//         </div>

//         {/* Tags */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Tags
//           </label>
//           <div className="flex flex-wrap gap-2 mb-3">
//             {formData.tags.map(tag => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
//               >
//                 <span>#{tag}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveTag(tag)}
//                   className="hover:text-primary-900 ml-1"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </span>
//             ))}
//             {formData.tags.length === 0 && (
//               <span className="text-sm text-gray-400">No tags added yet</span>
//             )}
//           </div>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Add tags (e.g., love, nature, philosophy)"
//               className="input-field flex-1"
//             />
//             <button
//               type="button"
//               onClick={handleAddTag}
//               className="btn-secondary"
//             >
//               Add Tag
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 mt-2">
//             Tags help users discover your content (Press Enter to add)
//           </p>
//         </div>

//         {/* Privacy Settings */}
//         <div className="card">
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Privacy Settings
//           </label>
//           <div className="space-y-3">
//             <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//               <input
//                 type="radio"
//                 name="isPublic"
//                 checked={formData.isPublic === true}
//                 onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
//                 className="w-4 h-4 text-primary-600"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2">
//                   <Globe className="h-4 w-4 text-green-600" />
//                   <span className="font-medium text-gray-700">Public</span>
//                 </div>
//                 <p className="text-sm text-gray-500">Visible to everyone on the platform</p>
//               </div>
//             </label>
//             <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//               <input
//                 type="radio"
//                 name="isPublic"
//                 checked={formData.isPublic === false}
//                 onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
//                 className="w-4 h-4 text-primary-600"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2">
//                   <Lock className="h-4 w-4 text-orange-600" />
//                   <span className="font-medium text-gray-700">Private (Draft)</span>
//                 </div>
//                 <p className="text-sm text-gray-500">Only you can see this content until you publish it</p>
//               </div>
//             </label>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex items-center justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/creator/content')}
//             className="btn-secondary"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex items-center space-x-2 min-w-[140px] justify-center"
//           >
//             {loading ? (
//               <>
//                 <Loader className="h-4 w-4 animate-spin" />
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <Upload className="h-4 w-4" />
//                 <span>Upload Poetry</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UploadPoetryPage;















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, Tag, BookOpen, 
//   Loader, Globe, Lock, AlertCircle
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadPoetryPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     contentUrdu: '',
//     contentHindi: '',
//     transliteration: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     era: 'modern',
//     author: '',
//     tags: [],
//     mood: '',
//     isPublished: true,
//     isFeatured: false
//   });
//   const [tagInput, setTagInput] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch user and authors on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
//   }, []);

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

//   const genres = [
//     { value: 'ghazal', label: 'Ghazal' },
//     { value: 'nazm', label: 'Nazm' },
//     { value: 'sher', label: 'Sher' },
//     { value: 'rubai', label: 'Rubai' },
//     { value: 'rekhti', label: 'Rekhti' },
//     { value: 'qasida', label: 'Qasida' },
//     { value: 'marsiya', label: 'Marsiya' },
//     { value: 'other', label: 'Other' }
//   ];

//   const languages = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const eras = [
//     { value: 'classical', label: 'Classical' },
//     { value: 'modern', label: 'Modern' },
//     { value: 'contemporary', label: 'Contemporary' }
//   ];

//   const moods = [
//     { value: 'romantic', label: 'Romantic' },
//     { value: 'sad', label: 'Sad' },
//     { value: 'philosophical', label: 'Philosophical' },
//     { value: 'patriotic', label: 'Patriotic' },
//     { value: 'humorous', label: 'Humorous' },
//     { value: 'spiritual', label: 'Spiritual' },
//     { value: 'mystic', label: 'Mystic' },
//     { value: 'other', label: 'Other' }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear validation error for this field
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

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   const handleImageChange = (e) => {
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

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     // Validate content based on language
//     if (formData.language === 'urdu') {
//       if (!formData.contentUrdu.trim() && !formData.content.trim()) {
//         errors.content = 'Urdu content is required';
//       }
//     } else if (formData.language === 'hindi') {
//       if (!formData.contentHindi.trim()) {
//         errors.content = 'Hindi content is required';
//       }
//     } else {
//       if (!formData.content.trim()) {
//         errors.content = 'Content is required';
//       }
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
      
//       // Prepare data according to the backend schema
//       const submitData = {
//         title: formData.title.trim(),
//         author: formData.author,
//         genre: formData.genre,
//         language: formData.language,
//         era: formData.era,
//         tags: formData.tags,
//         mood: formData.mood || undefined,
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         transliteration: formData.transliteration || '',
//         translation: {
//           english: '',
//           hindi: ''
//         }
//       };
      
//       // Set content based on language
//       if (formData.language === 'urdu') {
//         submitData.contentUrdu = formData.contentUrdu || formData.content;
//         submitData.content = submitData.contentUrdu;
//       } else if (formData.language === 'hindi') {
//         submitData.contentHindi = formData.contentHindi;
//         submitData.content = submitData.contentHindi;
//       } else {
//         submitData.content = formData.content;
//       }
      
//       // Add description if provided
//       if (formData.description) {
//         submitData.metaDescription = formData.description;
//       }
      
//       console.log('📤 Submitting poem data:', submitData);
      
//       const response = await api.post('/poems', submitData);
      
//       toast.success(formData.isPublished ? 'Poetry published successfully!' : 'Poetry saved as draft');
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Upload error:', error.response?.data || error.message);
      
//       if (error.response?.data?.errors) {
//         const serverErrors = error.response.data.errors;
//         serverErrors.forEach(err => {
//           toast.error(err.msg || err.message);
//         });
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to upload poetry');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get content placeholder based on language
//   const getContentPlaceholder = () => {
//     switch (formData.language) {
//       case 'urdu':
//         return `دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں
// روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں`;
//       case 'hindi':
//         return `ये दिल है या कोई शीश महल, टूटा तो बिखर जाएगा
// हर एक ज़ख्म से एक नया सबक मिला, ज़िंदगी ने मुझे लिखना सिखा दिया`;
//       default:
//         return `Write your poetry here...
// Line breaks and formatting will be preserved`;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Poetry</h1>
//         <p className="text-gray-500">Share your poetic creations with the world</p>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter the title of your poetry"
//               className={`input-field ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
//             />
//             {validationErrors.title && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//             )}
//           </div>

//           {/* Author Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Author <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//               disabled={loadingAuthors}
//             >
//               <option value="">Select an author</option>
//               {authors.map(author => (
//                 <option key={author._id} value={author._id}>
//                   {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.author && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//             )}
//             {authors.length === 0 && !loadingAuthors && (
//               <p className="text-yellow-600 text-xs mt-1">
//                 No authors found. Please add authors in admin panel first.
//               </p>
//             )}
//           </div>

//           {/* Language, Genre, Era Row */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Language
//               </label>
//               <select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {languages.map(lang => (
//                   <option key={lang.value} value={lang.value}>{lang.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Genre <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="genre"
//                 value={formData.genre}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {genres.map(g => (
//                   <option key={g.value} value={g.value}>{g.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Era
//               </label>
//               <select
//                 name="era"
//                 value={formData.era}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {eras.map(e => (
//                   <option key={e.value} value={e.value}>{e.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Poetry Content */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Poetry Content <span className="text-red-500">*</span>
//               {formData.language === 'urdu' && <span className="text-xs text-gray-500 ml-2">(Urdu script)</span>}
//               {formData.language === 'hindi' && <span className="text-xs text-gray-500 ml-2">(Devanagari script)</span>}
//             </label>
            
//             {formData.language === 'urdu' ? (
//               <textarea
//                 name="contentUrdu"
//                 value={formData.contentUrdu}
//                 onChange={handleChange}
//                 rows={12}
//                 dir="rtl"
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-urdu text-right ${validationErrors.content ? 'border-red-500' : ''}`}
//                 style={{ fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif" }}
//               />
//             ) : formData.language === 'hindi' ? (
//               <textarea
//                 name="contentHindi"
//                 value={formData.contentHindi}
//                 onChange={handleChange}
//                 rows={12}
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-hindi ${validationErrors.content ? 'border-red-500' : ''}`}
//                 style={{ fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif" }}
//               />
//             ) : (
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 rows={12}
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-mono ${validationErrors.content ? 'border-red-500' : ''}`}
//               />
//             )}
//             {validationErrors.content && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.content}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-2">
//               Line breaks and formatting will be preserved
//             </p>
//           </div>

//           {/* Transliteration (Optional) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Transliteration (Optional)
//             </label>
//             <textarea
//               name="transliteration"
//               value={formData.transliteration}
//               onChange={handleChange}
//               rows={3}
//               placeholder="Roman/English transliteration of the poem..."
//               className="input-field"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               If left empty, auto-transliteration will be generated
//             </p>
//           </div>

//           {/* Description / Meta Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description / Meta Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               placeholder="Brief description about this poem (used for SEO)..."
//               className="input-field"
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2 mb-3">
//               {formData.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
//                 >
//                   <span>#{tag}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="hover:text-primary-900 ml-1"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </span>
//               ))}
//               {formData.tags.length === 0 && (
//                 <span className="text-sm text-gray-400">No tags added yet</span>
//               )}
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Add tags (e.g., love, nature, philosophy)"
//                 className="input-field flex-1"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="btn-secondary"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>

//           {/* Mood */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mood / Emotion (Optional)
//             </label>
//             <select
//               name="mood"
//               value={formData.mood}
//               onChange={handleChange}
//               className="input-field"
//             >
//               <option value="">Select mood</option>
//               {moods.map(m => (
//                 <option key={m.value} value={m.value}>{m.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Cover Image (Optional - for future implementation) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Cover Image (Optional)
//             </label>
//             {coverPreview ? (
//               <div className="relative inline-block">
//                 <img 
//                   src={coverPreview} 
//                   alt="Cover preview" 
//                   className="w-32 h-32 object-cover rounded-lg border border-gray-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCoverImage(null);
//                     setCoverPreview(null);
//                   }}
//                   className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
//                 <Upload className="h-8 w-8 text-gray-400" />
//                 <span className="text-xs text-gray-500 mt-1">Upload</span>
//                 <p className="text-xs text-gray-400">Coming soon</p>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   disabled
//                 />
//               </label>
//             )}
//             <p className="text-xs text-gray-500 mt-2">
//               Image upload feature coming soon
//             </p>
//           </div>

//           {/* Privacy Settings */}
//           <div className="border-t border-gray-200 pt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Publication Settings
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === true}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === false}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
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
//                   <span>{formData.isPublished ? 'Publishing...' : 'Saving...'}</span>
//                 </>
//               ) : (
//                 <>
//                   <Upload className="h-4 w-4" />
//                   <span>{formData.isPublished ? 'Publish Poetry' : 'Save as Draft'}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadPoetryPage;
















// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   Upload, X, FileText, Tag, BookOpen, 
//   Loader, Globe, Lock, AlertCircle, Trash2
// } from 'lucide-react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const UploadPoetryPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // For edit mode
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchingPoem, setFetchingPoem] = useState(false);
//   const [authors, setAuthors] = useState([]);
//   const [loadingAuthors, setLoadingAuthors] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     contentUrdu: '',
//     contentHindi: '',
//     transliteration: '',
//     genre: 'ghazal',
//     language: 'urdu',
//     era: 'modern',
//     author: '',
//     tags: [],
//     mood: '',
//     slug: '', // Optional custom slug
//     isPublished: true,
//     isFeatured: false
//   });
  
//   const [tagInput, setTagInput] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch user and authors on mount
//   useEffect(() => {
//     fetchUser();
//     fetchAuthors();
    
//     // Check if we're in edit mode
//     if (id) {
//       setIsEditMode(true);
//       fetchPoemForEdit(id);
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

//   const fetchPoemForEdit = async (poemId) => {
//     try {
//       setFetchingPoem(true);
//       // Try to fetch by ID first, then by slug
//       let response;
//       try {
//         response = await api.get(`/poems/${poemId}`);
//       } catch (err) {
//         // If ID fails, try as slug
//         response = await api.get(`/poems/${poemId}`);
//       }
      
//       const poem = response.data.data || response.data;
      
//       setFormData({
//         title: poem.title || '',
//         description: poem.metaDescription || poem.description || '',
//         content: poem.content || '',
//         contentUrdu: poem.contentUrdu || '',
//         contentHindi: poem.contentHindi || '',
//         transliteration: poem.transliteration || '',
//         genre: poem.genre || 'ghazal',
//         language: poem.language || 'urdu',
//         era: poem.era || 'modern',
//         author: poem.author?._id || poem.author || '',
//         tags: poem.tags || [],
//         mood: poem.mood || '',
//         slug: poem.slug || '',
//         isPublished: poem.isPublished || false,
//         isFeatured: poem.isFeatured || false
//       });
      
//       toast.success('Poem loaded for editing');
//     } catch (error) {
//       console.error('Failed to fetch poem:', error);
//       toast.error('Could not load poem for editing');
//       navigate('/creator/content');
//     } finally {
//       setFetchingPoem(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await api.delete(`/poems/${id}`);
//       toast.success('Poem deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error(error.response?.data?.message || 'Failed to delete poem');
//     } finally {
//       setLoading(false);
//       setShowDeleteConfirm(false);
//     }
//   };

//   const genres = [
//     { value: 'ghazal', label: 'Ghazal' },
//     { value: 'nazm', label: 'Nazm' },
//     { value: 'sher', label: 'Sher' },
//     { value: 'rubai', label: 'Rubai' },
//     { value: 'rekhti', label: 'Rekhti' },
//     { value: 'qasida', label: 'Qasida' },
//     { value: 'marsiya', label: 'Marsiya' },
//     { value: 'other', label: 'Other' }
//   ];

//   const languages = [
//     { value: 'urdu', label: 'Urdu' },
//     { value: 'hindi', label: 'Hindi' },
//     { value: 'english', label: 'English' },
//     { value: 'persian', label: 'Persian' },
//     { value: 'arabic', label: 'Arabic' }
//   ];

//   const eras = [
//     { value: 'classical', label: 'Classical' },
//     { value: 'modern', label: 'Modern' },
//     { value: 'contemporary', label: 'Contemporary' }
//   ];

//   const moods = [
//     { value: 'romantic', label: 'Romantic' },
//     { value: 'sad', label: 'Sad' },
//     { value: 'philosophical', label: 'Philosophical' },
//     { value: 'patriotic', label: 'Patriotic' },
//     { value: 'humorous', label: 'Humorous' },
//     { value: 'spiritual', label: 'Spiritual' },
//     { value: 'mystic', label: 'Mystic' },
//     { value: 'other', label: 'Other' }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear validation error for this field
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

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   const handleImageChange = (e) => {
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

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
    
//     if (!formData.author) {
//       errors.author = 'Please select an author';
//     }
    
//     // Validate content based on language
//     if (formData.language === 'urdu') {
//       if (!formData.contentUrdu.trim() && !formData.content.trim()) {
//         errors.content = 'Urdu content is required';
//       }
//     } else if (formData.language === 'hindi') {
//       if (!formData.contentHindi.trim()) {
//         errors.content = 'Hindi content is required';
//       }
//     } else {
//       if (!formData.content.trim()) {
//         errors.content = 'Content is required';
//       }
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
      
//       // Prepare data according to the backend schema
//       const submitData = {
//         title: formData.title.trim(),
//         author: formData.author,
//         genre: formData.genre,
//         language: formData.language,
//         era: formData.era,
//         tags: formData.tags,
//         mood: formData.mood || undefined,
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         transliteration: formData.transliteration || '',
//         translation: {
//           english: '',
//           hindi: ''
//         }
//       };
      
//       // Add custom slug if provided
//       if (formData.slug && formData.slug.trim()) {
//         submitData.slug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       }
      
//       // Set content based on language
//       if (formData.language === 'urdu') {
//         submitData.contentUrdu = formData.contentUrdu || formData.content;
//         submitData.content = submitData.contentUrdu;
//       } else if (formData.language === 'hindi') {
//         submitData.contentHindi = formData.contentHindi;
//         submitData.content = submitData.contentHindi;
//       } else {
//         submitData.content = formData.content;
//       }
      
//       // Add description if provided
//       if (formData.description) {
//         submitData.metaDescription = formData.description;
//       }
      
//       let response;
//       if (isEditMode && id) {
//         // Update existing poem
//         response = await api.put(`/poems/${id}`, submitData);
//         toast.success('Poem updated successfully!');
//       } else {
//         // Create new poem
//         response = await api.post('/poems', submitData);
//         toast.success(formData.isPublished ? 'Poetry published successfully!' : 'Poetry saved as draft');
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
//         toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} poetry`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get content placeholder based on language
//   const getContentPlaceholder = () => {
//     switch (formData.language) {
//       case 'urdu':
//         return `دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں
// روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں`;
//       case 'hindi':
//         return `ये दिल है या कोई शीश महल, टूटा तो बिखर जाएगा
// हर एक ज़ख्म से एक नया सबक मिला, ज़िंदगी ने मुझे लिखना सिखा दिया`;
//       default:
//         return `Write your poetry here...
// Line breaks and formatting will be preserved`;
//     }
//   };

//   if (fetchingPoem) {
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
//             {isEditMode ? 'Edit Poetry' : 'Upload Poetry'}
//           </h1>
//           <p className="text-gray-500">
//             {isEditMode ? 'Update your poetic creation' : 'Share your poetic creations with the world'}
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

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md mx-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Poem</h3>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete "{formData.title}"? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="btn-secondary"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={loading}
//                 className="btn-danger"
//               >
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
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter the title of your poetry"
//               className={`input-field ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
//             />
//             {validationErrors.title && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
//             )}
//           </div>

//           {/* Slug (Optional) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Custom Slug (Optional)
//             </label>
//             <input
//               type="text"
//               name="slug"
//               value={formData.slug}
//               onChange={handleChange}
//               placeholder="custom-url-slug (auto-generated from title if empty)"
//               className="input-field"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Leave empty to auto-generate from title. Use only lowercase letters, numbers, and hyphens.
//             </p>
//           </div>

//           {/* Author Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Author <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
//               disabled={loadingAuthors}
//             >
//               <option value="">Select an author</option>
//               {authors.map(author => (
//                 <option key={author._id} value={author._id}>
//                   {author.name} {author.nameUrdu ? `(${author.nameUrdu})` : ''}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.author && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
//             )}
//             {authors.length === 0 && !loadingAuthors && (
//               <p className="text-yellow-600 text-xs mt-1">
//                 No authors found. Please add authors in admin panel first.
//               </p>
//             )}
//           </div>

//           {/* Language, Genre, Era Row */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Language
//               </label>
//               <select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {languages.map(lang => (
//                   <option key={lang.value} value={lang.value}>{lang.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Genre <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="genre"
//                 value={formData.genre}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {genres.map(g => (
//                   <option key={g.value} value={g.value}>{g.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Era
//               </label>
//               <select
//                 name="era"
//                 value={formData.era}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 {eras.map(e => (
//                   <option key={e.value} value={e.value}>{e.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Poetry Content */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Poetry Content <span className="text-red-500">*</span>
//               {formData.language === 'urdu' && <span className="text-xs text-gray-500 ml-2">(Urdu script)</span>}
//               {formData.language === 'hindi' && <span className="text-xs text-gray-500 ml-2">(Devanagari script)</span>}
//             </label>
            
//             {formData.language === 'urdu' ? (
//               <textarea
//                 name="contentUrdu"
//                 value={formData.contentUrdu}
//                 onChange={handleChange}
//                 rows={12}
//                 dir="rtl"
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-urdu text-right ${validationErrors.content ? 'border-red-500' : ''}`}
//                 style={{ fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif" }}
//               />
//             ) : formData.language === 'hindi' ? (
//               <textarea
//                 name="contentHindi"
//                 value={formData.contentHindi}
//                 onChange={handleChange}
//                 rows={12}
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-hindi ${validationErrors.content ? 'border-red-500' : ''}`}
//                 style={{ fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif" }}
//               />
//             ) : (
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 rows={12}
//                 placeholder={getContentPlaceholder()}
//                 className={`input-field font-mono ${validationErrors.content ? 'border-red-500' : ''}`}
//               />
//             )}
//             {validationErrors.content && (
//               <p className="text-red-500 text-xs mt-1">{validationErrors.content}</p>
//             )}
//             <p className="text-xs text-gray-500 mt-2">
//               Line breaks and formatting will be preserved. Slug will be auto-generated from title.
//             </p>
//           </div>

//           {/* Transliteration (Optional) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Transliteration (Optional)
//             </label>
//             <textarea
//               name="transliteration"
//               value={formData.transliteration}
//               onChange={handleChange}
//               rows={3}
//               placeholder="Roman/English transliteration of the poem..."
//               className="input-field"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               If left empty, auto-transliteration will be generated
//             </p>
//           </div>

//           {/* Description / Meta Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description / Meta Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               placeholder="Brief description about this poem (used for SEO)..."
//               className="input-field"
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2 mb-3">
//               {formData.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
//                 >
//                   <span>#{tag}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="hover:text-primary-900 ml-1"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </span>
//               ))}
//               {formData.tags.length === 0 && (
//                 <span className="text-sm text-gray-400">No tags added yet</span>
//               )}
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Add tags (e.g., love, nature, philosophy)"
//                 className="input-field flex-1"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="btn-secondary"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>

//           {/* Mood */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mood / Emotion (Optional)
//             </label>
//             <select
//               name="mood"
//               value={formData.mood}
//               onChange={handleChange}
//               className="input-field"
//             >
//               <option value="">Select mood</option>
//               {moods.map(m => (
//                 <option key={m.value} value={m.value}>{m.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Publication Settings */}
//           <div className="border-t border-gray-200 pt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Publication Settings
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === true}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Publish Now</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone immediately</p>
//                 </div>
//               </label>
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublished"
//                   checked={formData.isPublished === false}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Save as Draft</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this until published</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
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
//                   <span>{isEditMode ? 'Update Poetry' : (formData.isPublished ? 'Publish Poetry' : 'Save as Draft')}</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadPoetryPage;
















import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, X, FileText, Tag, BookOpen, 
  Loader, Globe, Lock, AlertCircle, Trash2
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import authService from '../../services/authService';

const UploadPoetryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This could be ID or slug
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingPoem, setFetchingPoem] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [poemSlug, setPoemSlug] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    contentUrdu: '',
    contentHindi: '',
    transliteration: '',
    genre: 'ghazal',
    language: 'urdu',
    era: 'modern',
    author: '',
    tags: [],
    mood: '',
    slug: '',
    isPublished: true,
    isFeatured: false
  });
  
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch user and authors on mount
  useEffect(() => {
    fetchUser();
    fetchAuthors();
    
    // Check if we're in edit mode
    if (id) {
      setIsEditMode(true);
      fetchPoemForEdit(id);
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
      setAuthors(response.data.data || response.data.authors || []);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
      toast.error('Could not load authors list');
    } finally {
      setLoadingAuthors(false);
    }
  };

  const fetchPoemForEdit = async (poemIdOrSlug) => {
    try {
      setFetchingPoem(true);
      
      // Since the API only supports slug-based fetching, we need to:
      // 1. First try to get creator content to find the poem by ID
      // 2. Or assume the param is actually a slug
      
      let poem = null;
      
      // Method 1: Try to get from creator content (if we have the ID)
      try {
        const creatorContent = await api.get('/creator/content');
        const allPoems = creatorContent.data.data?.poems || [];
        poem = allPoems.find(p => p._id === poemIdOrSlug);
        
        if (poem) {
          console.log('Found poem by ID in creator content:', poem);
        }
      } catch (err) {
        console.log('Could not fetch from creator content');
      }
      
      // Method 2: If not found by ID, try as slug
      if (!poem) {
        try {
          const response = await api.get(`/poems/${poemIdOrSlug}`);
          poem = response.data.data || response.data;
          console.log('Found poem by slug:', poem);
        } catch (err) {
          console.log('Could not fetch by slug');
        }
      }
      
      if (!poem) {
        toast.error('Poem not found');
        navigate('/creator/content');
        return;
      }
      
      // Store the slug for delete/update operations
      setPoemSlug(poem.slug);
      
      setFormData({
        title: poem.title || '',
        description: poem.metaDescription || poem.description || '',
        content: poem.content || '',
        contentUrdu: poem.contentUrdu || '',
        contentHindi: poem.contentHindi || '',
        transliteration: poem.transliteration || '',
        genre: poem.genre || 'ghazal',
        language: poem.language || 'urdu',
        era: poem.era || 'modern',
        author: poem.author?._id || poem.author || '',
        tags: poem.tags || [],
        mood: poem.mood || '',
        slug: poem.slug || '',
        isPublished: poem.isPublished || false,
        isFeatured: poem.isFeatured || false
      });
      
      toast.success('Poem loaded for editing');
    } catch (error) {
      console.error('Failed to fetch poem:', error);
      toast.error('Could not load poem for editing');
      navigate('/creator/content');
    } finally {
      setFetchingPoem(false);
    }
  };

  const handleDelete = async () => {
    if (!poemSlug && !id) {
      toast.error('Cannot delete: Poem identifier missing');
      return;
    }
    
    try {
      setLoading(true);
      // Use slug for deletion since that's what the route expects
      const deleteIdentifier = poemSlug || id;
      await api.delete(`/poems/${deleteIdentifier}`);
      toast.success('Poem deleted successfully');
      navigate('/creator/content');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete poem');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const genres = [
    { value: 'ghazal', label: 'Ghazal' },
    { value: 'nazm', label: 'Nazm' },
    { value: 'sher', label: 'Sher' },
    { value: 'rubai', label: 'Rubai' },
    { value: 'rekhti', label: 'Rekhti' },
    { value: 'qasida', label: 'Qasida' },
    { value: 'marsiya', label: 'Marsiya' },
    { value: 'other', label: 'Other' }
  ];

  const languages = [
    { value: 'urdu', label: 'Urdu' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'persian', label: 'Persian' },
    { value: 'arabic', label: 'Arabic' }
  ];

  const eras = [
    { value: 'classical', label: 'Classical' },
    { value: 'modern', label: 'Modern' },
    { value: 'contemporary', label: 'Contemporary' }
  ];

  const moods = [
    { value: 'romantic', label: 'Romantic' },
    { value: 'sad', label: 'Sad' },
    { value: 'philosophical', label: 'Philosophical' },
    { value: 'patriotic', label: 'Patriotic' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'mystic', label: 'Mystic' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.author) {
      errors.author = 'Please select an author';
    }
    
    if (formData.language === 'urdu') {
      if (!formData.contentUrdu.trim() && !formData.content.trim()) {
        errors.content = 'Urdu content is required';
      }
    } else if (formData.language === 'hindi') {
      if (!formData.contentHindi.trim()) {
        errors.content = 'Hindi content is required';
      }
    } else {
      if (!formData.content.trim()) {
        errors.content = 'Content is required';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = {
        title: formData.title.trim(),
        author: formData.author,
        genre: formData.genre,
        language: formData.language,
        era: formData.era,
        tags: formData.tags,
        mood: formData.mood || undefined,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        transliteration: formData.transliteration || '',
        translation: {
          english: '',
          hindi: ''
        }
      };
      
      if (formData.slug && formData.slug.trim()) {
        submitData.slug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
      }
      
      if (formData.language === 'urdu') {
        submitData.contentUrdu = formData.contentUrdu || formData.content;
        submitData.content = submitData.contentUrdu;
      } else if (formData.language === 'hindi') {
        submitData.contentHindi = formData.contentHindi;
        submitData.content = submitData.contentHindi;
      } else {
        submitData.content = formData.content;
      }
      
      if (formData.description) {
        submitData.metaDescription = formData.description;
      }
      
      let response;
      if (isEditMode && (poemSlug || id)) {
        const updateIdentifier = poemSlug || id;
        response = await api.put(`/poems/${updateIdentifier}`, submitData);
        toast.success('Poem updated successfully!');
      } else {
        response = await api.post('/poems', submitData);
        toast.success(formData.isPublished ? 'Poetry published successfully!' : 'Poetry saved as draft');
      }
      
      navigate('/creator/content');
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach(err => {
          toast.error(err.msg || err.message);
        });
      } else {
        toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'upload'} poetry`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getContentPlaceholder = () => {
    switch (formData.language) {
      case 'urdu':
        return `دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں
روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں`;
      case 'hindi':
        return `ये दिल है या कोई शीश महल, टूटा तो बिखर जाएगा
हर एक ज़ख्म से एक नया सबक मिला, ज़िंदगी ने मुझे लिखना सिखा दिया`;
      default:
        return `Write your poetry here...
Line breaks and formatting will be preserved`;
    }
  };

  if (fetchingPoem) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Poetry' : 'Upload Poetry'}
          </h1>
          <p className="text-gray-500">
            {isEditMode ? 'Update your poetic creation' : 'Share your poetic creations with the world'}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Poem</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{formData.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn-danger"
              >
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title of your poetry"
              className={`input-field ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
            )}
          </div>

          {/* Slug (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Slug (Optional)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="custom-url-slug (auto-generated from title if empty)"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to auto-generate from title. Use only lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Author Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <select
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`input-field ${validationErrors.author ? 'border-red-500' : ''}`}
              disabled={loadingAuthors}
            >
              <option value="">Select an author</option>
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

          {/* Language, Genre, Era Row */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="input-field"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre <span className="text-red-500">*</span>
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="input-field"
              >
                {genres.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Era
              </label>
              <select
                name="era"
                value={formData.era}
                onChange={handleChange}
                className="input-field"
              >
                {eras.map(e => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Poetry Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poetry Content <span className="text-red-500">*</span>
            </label>
            
            {formData.language === 'urdu' ? (
              <textarea
                name="contentUrdu"
                value={formData.contentUrdu}
                onChange={handleChange}
                rows={12}
                dir="rtl"
                placeholder={getContentPlaceholder()}
                className={`input-field font-urdu text-right ${validationErrors.content ? 'border-red-500' : ''}`}
                style={{ fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif" }}
              />
            ) : formData.language === 'hindi' ? (
              <textarea
                name="contentHindi"
                value={formData.contentHindi}
                onChange={handleChange}
                rows={12}
                placeholder={getContentPlaceholder()}
                className={`input-field font-hindi ${validationErrors.content ? 'border-red-500' : ''}`}
                style={{ fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif" }}
              />
            ) : (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                placeholder={getContentPlaceholder()}
                className={`input-field font-mono ${validationErrors.content ? 'border-red-500' : ''}`}
              />
            )}
            {validationErrors.content && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.content}</p>
            )}
          </div>

          {/* Transliteration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transliteration (Optional)
            </label>
            <textarea
              name="transliteration"
              value={formData.transliteration}
              onChange={handleChange}
              rows={3}
              placeholder="Roman/English transliteration of the poem..."
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description / Meta Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description about this poem (used for SEO)..."
              className="input-field"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary-900 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {formData.tags.length === 0 && (
                <span className="text-sm text-gray-400">No tags added yet</span>
              )}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add tags (e.g., love, nature, philosophy)"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn-secondary"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood / Emotion (Optional)
            </label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select mood</option>
              {moods.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Publication Settings */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Publication Settings
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="isPublished"
                  checked={formData.isPublished === true}
                  onChange={() => setFormData(prev => ({ ...prev, isPublished: true }))}
                  className="w-4 h-4 text-primary-600"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-700">Publish Now</span>
                  </div>
                  <p className="text-sm text-gray-500">Visible to everyone immediately</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="isPublished"
                  checked={formData.isPublished === false}
                  onChange={() => setFormData(prev => ({ ...prev, isPublished: false }))}
                  className="w-4 h-4 text-primary-600"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-gray-700">Save as Draft</span>
                  </div>
                  <p className="text-sm text-gray-500">Only you can see this until published</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/creator/content')}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>{isEditMode ? 'Updating...' : (formData.isPublished ? 'Publishing...' : 'Saving...')}</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>{isEditMode ? 'Update Poetry' : (formData.isPublished ? 'Publish Poetry' : 'Save as Draft')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadPoetryPage;