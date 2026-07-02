// // client/src/pages/creator/UploadAudioPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { 
//   Upload, 
//   Music, 
//   Mic, 
//   Tag, 
//   Globe, 
//   Lock, 
//   Eye, 
//   Calendar,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   AlertCircle
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';

// const UploadAudioPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const isEditMode = Boolean(id);

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(isEditMode);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [audioFile, setAudioFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'Recitation',
//     occasion: '',
//     language: 'urdu',
//     tags: '',
//     isPremium: false,
//     visibility: 'public',
//     status: 'draft',
//     duration: 0,
//     artist: '',
//     album: ''
//   });

//   const [presets, setPresets] = useState({
//     types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
//     occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other'],
//     languages: ['urdu', 'hindi', 'english'],
//     visibility: ['public', 'private', 'unlisted']
//   });

//   // Fetch audio data if editing
//   useEffect(() => {
//     if (isEditMode) {
//       fetchAudioData();
//     }
//     fetchPresets();
//   }, [id]);

//   const fetchAudioData = async () => {
//     try {
//       setFetching(true);
//       const response = await audioAPI.getCreatorAudio(id);
//       const audio = response.data;
//       setFormData({
//         title: audio.title || '',
//         description: audio.description || '',
//         type: audio.type || 'Recitation',
//         occasion: audio.occasion || '',
//         language: audio.language || 'urdu',
//         tags: audio.tags?.join(', ') || '',
//         isPremium: audio.isPremium || false,
//         visibility: audio.visibility || 'public',
//         status: audio.isPublished ? 'published' : 'draft',
//         duration: audio.duration || 0,
//         artist: audio.artist || '',
//         album: audio.album || ''
//       });
//       if (audio.coverImage) {
//         setCoverPreview(audio.coverImage);
//       }
//     } catch (error) {
//       toast.error('Failed to load audio data');
//       navigate('/creator/audio');
//     } finally {
//       setFetching(false);
//     }
//   };

//   const fetchPresets = async () => {
//     try {
//       const response = await audioAPI.getCreatorPresets();
//       if (response.data) {
//         setPresets({
//           types: response.data.types || presets.types,
//           occasions: response.data.occasions || presets.occasions,
//           languages: response.data.languages || presets.languages,
//           visibility: response.data.visibility || presets.visibility
//         });
//       }
//     } catch (error) {
//       console.error('Failed to fetch presets:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Invalid audio format. Please upload MP3, WAV, OGG, M4A, or AAC.');
//         e.target.value = '';
//         return;
//       }

//       // Validate file size (50MB max)
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('File size exceeds 50MB limit.');
//         e.target.value = '';
//         return;
//       }

//       setAudioFile(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
      
//       // Extract duration if possible
//       const audio = new Audio(url);
//       audio.addEventListener('loadedmetadata', () => {
//         setFormData(prev => ({
//           ...prev,
//           duration: Math.round(audio.duration)
//         }));
//       });
//     }
//   };

//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Invalid image format. Please upload JPG, PNG, or WEBP.');
//         e.target.value = '';
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size exceeds 5MB limit.');
//         e.target.value = '';
//         return;
//       }

//       setCoverImage(file);
//       const url = URL.createObjectURL(file);
//       setCoverPreview(url);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }

//     if (!isEditMode && !audioFile) {
//       toast.error('Please select an audio file');
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = new FormData();
      
//       // Append form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'tags' && formData.tags) {
//           const tagsArray = formData.tags.split(',').map(tag => tag.trim());
//           formDataToSend.append('tags', JSON.stringify(tagsArray));
//         } else if (key !== 'duration') {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Append files
//       if (audioFile) {
//         formDataToSend.append('audio', audioFile);
//       }
//       if (coverImage) {
//         formDataToSend.append('coverImage', coverImage);
//       }

//       let response;
//       if (isEditMode) {
//         response = await audioAPI.updateCreatorAudio(id, formDataToSend);
//         toast.success('Audio updated successfully!');
//       } else {
//         response = await audioAPI.uploadCreatorAudio(formDataToSend, (progress) => {
//           setUploadProgress(progress);
//         });
//         toast.success('Audio uploaded successfully!');
//       }

//       // Navigate to content page
//       setTimeout(() => {
//         navigate('/creator/content');
//       }, 1500);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to save audio');
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {isEditMode ? 'Edit Audio' : 'Upload Audio'}
//         </h1>
//         <p className="text-gray-500 mt-1">
//           {isEditMode ? 'Update your audio details' : 'Share your audio with the community'}
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Audio File Upload */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Audio File</h2>
//           {!isEditMode && (
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
//               {previewUrl ? (
//                 <div>
//                   <audio controls className="w-full mb-4">
//                     <source src={previewUrl} />
//                   </audio>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAudioFile(null);
//                       setPreviewUrl(null);
//                     }}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Remove file
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
//                   <p className="text-sm text-gray-400">MP3, WAV, OGG, M4A, AAC (max 50MB)</p>
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     onChange={handleFileChange}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                   />
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Cover Image */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
//           <div className="flex items-center gap-6">
//             {coverPreview ? (
//               <div className="relative w-32 h-32">
//                 <img
//                   src={coverPreview}
//                   alt="Cover"
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCoverImage(null);
//                     setCoverPreview(null);
//                   }}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                 >
//                   <XCircle className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <Upload className="w-8 h-8 text-gray-400" />
//               </div>
//             )}
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleCoverChange}
//                 className="hidden"
//                 id="cover-upload"
//               />
//               <label
//                 htmlFor="cover-upload"
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer inline-block"
//               >
//                 Choose Image
//               </label>
//               <p className="text-sm text-gray-400 mt-2">JPG, PNG, WEBP (max 5MB)</p>
//             </div>
//           </div>
//         </div>

//         {/* Audio Details */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Audio Details</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter audio title"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Artist
//               </label>
//               <input
//                 type="text"
//                 name="artist"
//                 value={formData.artist}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter artist name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Album
//               </label>
//               <input
//                 type="text"
//                 name="album"
//                 value={formData.album}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter album name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Type
//               </label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.types.map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Occasion
//               </label>
//               <select
//                 name="occasion"
//                 value={formData.occasion}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="">Select occasion</option>
//                 {presets.occasions.map((occasion) => (
//                   <option key={occasion} value={occasion}>{occasion}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Language
//               </label>
//               <select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.languages.map((lang) => (
//                   <option key={lang} value={lang}>{lang.toUpperCase()}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Describe your audio"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Tags
//               </label>
//               <input
//                 type="text"
//                 name="tags"
//                 value={formData.tags}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter tags separated by commas (e.g., nasheed, islamic, poetry)"
//               />
//               <p className="text-sm text-gray-400 mt-1">Separate tags with commas</p>
//             </div>
//           </div>
//         </div>

//         {/* Settings */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Settings</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Visibility
//               </label>
//               <select
//                 name="visibility"
//                 value={formData.visibility}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.visibility.map((vis) => (
//                   <option key={vis} value={vis}>
//                     {vis.charAt(0).toUpperCase() + vis.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="draft">Draft</option>
//                 <option value="published">Published</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="isPremium"
//                   checked={formData.isPremium}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-primary focus:ring-primary"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Premium Content</span>
//                 <span className="text-xs text-gray-400">(Requires subscription to access)</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => navigate('/creator/content')}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
//                 {isEditMode ? 'Saving...' : 'Uploading...'} {uploadProgress > 0 && `(${uploadProgress}%)`}
//               </>
//             ) : (
//               isEditMode ? 'Update Audio' : 'Upload Audio'
//             )}
//           </button>
//         </div>

//         {/* Upload Progress */}
//         {uploadProgress > 0 && uploadProgress < 100 && (
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-primary h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UploadAudioPage;




















// // client/src/pages/creator/UploadAudioPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';
// import { 
//   Upload, 
//   Music, 
//   Mic, 
//   Tag, 
//   Globe, 
//   Lock, 
//   Eye, 
//   Calendar,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Save,
//   Trash2,
//   ArrowLeft,
//   Play,
//   Pause,
//   Clock,
//   User,
//   Album,
//   List,
//   EyeOff,
//   Shield,
//   DollarSign
// } from 'lucide-react';
// import audioAPI from '../../api/audioAPI';

// const UploadAudioPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const isEditMode = Boolean(id);

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(isEditMode);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [audioFile, setAudioFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioDuration, setAudioDuration] = useState(0);
//   const audioRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'Recitation',
//     occasion: '',
//     language: 'urdu',
//     tags: '',
//     isPremium: false,
//     visibility: 'public',
//     status: 'draft',
//     duration: 0,
//     artist: '',
//     album: '',
//     isFeatured: false,
//     allowComments: true,
//     allowDownloads: true
//   });

//   const [presets, setPresets] = useState({
//     types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
//     occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other'],
//     languages: ['urdu', 'hindi', 'english'],
//     visibility: ['public', 'private', 'unlisted']
//   });

//   const [validationErrors, setValidationErrors] = useState({});

//   // Fetch audio data if editing
//   useEffect(() => {
//     if (isEditMode) {
//       fetchAudioData();
//     }
//     fetchPresets();
//   }, [id]);

//   // Cleanup object URLs
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//       if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
//     };
//   }, [previewUrl, coverPreview]);

//   const fetchAudioData = async () => {
//     try {
//       setFetching(true);
//       const response = await audioAPI.getCreatorAudioById(id);
//       const audio = response.data;
//       setFormData({
//         title: audio.title || '',
//         description: audio.description || '',
//         type: audio.type || 'Recitation',
//         occasion: audio.occasion || '',
//         language: audio.language || 'urdu',
//         tags: audio.tags?.join(', ') || '',
//         isPremium: audio.isPremium || false,
//         visibility: audio.visibility || 'public',
//         status: audio.isPublished ? 'published' : 'draft',
//         duration: audio.duration || 0,
//         artist: audio.artist || '',
//         album: audio.album || '',
//         isFeatured: audio.isFeatured || false,
//         allowComments: audio.allowComments !== false,
//         allowDownloads: audio.allowDownloads || false
//       });
//       setAudioDuration(audio.duration || 0);
//       if (audio.coverImage) {
//         setCoverPreview(audio.coverImage);
//       }
//       if (audio.audioUrl) {
//         setPreviewUrl(audio.audioUrl);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to load audio data');
//       navigate('/creator/audio');
//     } finally {
//       setFetching(false);
//     }
//   };

//   const fetchPresets = async () => {
//     try {
//       const response = await audioAPI.getCreatorPresets();
//       if (response.data) {
//         setPresets(prev => ({
//           types: response.data.types || prev.types,
//           occasions: response.data.occasions || prev.occasions,
//           languages: response.data.languages || prev.languages,
//           visibility: response.data.visibility || prev.visibility
//         }));
//       }
//     } catch (error) {
//       console.error('Failed to fetch presets:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear validation error for this field
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: false }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Invalid audio format. Please upload MP3, WAV, OGG, M4A, or AAC.');
//         e.target.value = '';
//         return;
//       }

//       // Validate file size (50MB max)
//       if (file.size > 50 * 1024 * 1024) {
//         toast.error('File size exceeds 50MB limit.');
//         e.target.value = '';
//         return;
//       }

//       setAudioFile(file);
//       const url = URL.createObjectURL(file);
//       if (previewUrl && !isEditMode) URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(url);
      
//       // Extract duration
//       const audio = new Audio(url);
//       audio.addEventListener('loadedmetadata', () => {
//         const duration = Math.round(audio.duration);
//         setAudioDuration(duration);
//         setFormData(prev => ({
//           ...prev,
//           duration: duration
//         }));
//       });
//     }
//   };

//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Invalid image format. Please upload JPG, PNG, WEBP, or GIF.');
//         e.target.value = '';
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size exceeds 5MB limit.');
//         e.target.value = '';
//         return;
//       }

//       setCoverImage(file);
//       if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
//       const url = URL.createObjectURL(file);
//       setCoverPreview(url);
//     }
//   };

//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.title.trim()) {
//       errors.title = 'Title is required';
//     }
//     if (!isEditMode && !audioFile) {
//       errors.audioFile = 'Audio file is required';
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

//     setLoading(true);

//     try {
//       const formDataToSend = new FormData();
      
//       // Append form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'tags' && formData.tags) {
//           const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
//           formDataToSend.append('tags', JSON.stringify(tagsArray));
//         } else {
//           formDataToSend.append(key, String(formData[key]));
//         }
//       });

//       // Append files
//       if (audioFile) {
//         formDataToSend.append('audio', audioFile);
//       }
//       if (coverImage) {
//         formDataToSend.append('coverImage', coverImage);
//       }

//       let response;
//       if (isEditMode) {
//         response = await audioAPI.updateCreatorAudio(id, formDataToSend);
//         toast.success('Audio updated successfully!');
//       } else {
//         response = await audioAPI.uploadCreatorAudio(formDataToSend, (progress) => {
//           setUploadProgress(progress);
//         });
//         toast.success('Audio uploaded successfully!');
//       }

//       // Navigate to content page after a delay
//       setTimeout(() => {
//         navigate('/creator/content');
//       }, 1500);
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to save audio';
//       toast.error(message);
//       if (error.response?.data?.errors) {
//         setValidationErrors(error.response.data.errors);
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this audio? This action cannot be undone.')) return;

//     try {
//       setLoading(true);
//       await audioAPI.deleteCreatorAudio(id);
//       toast.success('Audio deleted successfully');
//       navigate('/creator/content');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete audio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePublish = async () => {
//     try {
//       setLoading(true);
//       const response = await audioAPI.publishCreatorAudio(id);
//       setFormData(prev => ({ ...prev, status: 'published' }));
//       toast.success('Audio published successfully');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to publish audio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnpublish = async () => {
//     try {
//       setLoading(true);
//       const response = await audioAPI.unpublishCreatorAudio(id);
//       setFormData(prev => ({ ...prev, status: 'draft' }));
//       toast.success('Audio unpublished successfully');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to unpublish audio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (fetching) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <button
//             onClick={() => navigate('/creator/content')}
//             className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Content
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEditMode ? 'Edit Audio' : 'Upload Audio'}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             {isEditMode ? 'Update your audio details' : 'Share your audio with the community'}
//           </p>
//         </div>
//         {isEditMode && (
//           <div className="flex gap-2">
//             {formData.status === 'draft' ? (
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 Publish
//               </button>
//             ) : (
//               <button
//                 onClick={handleUnpublish}
//                 disabled={loading}
//                 className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
//               >
//                 <EyeOff className="w-4 h-4" />
//                 Unpublish
//               </button>
//             )}
//             <button
//               onClick={handleDelete}
//               disabled={loading}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Audio Player Preview */}
//         {previewUrl && (
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-4">Audio Preview</h2>
//             <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
//               <button
//                 type="button"
//                 onClick={togglePlay}
//                 className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
//               >
//                 {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
//               </button>
//               <div className="flex-1">
//                 <audio
//                   ref={audioRef}
//                   src={previewUrl}
//                   onEnded={() => setIsPlaying(false)}
//                   onTimeUpdate={(e) => {
//                     // Update progress if needed
//                   }}
//                   className="hidden"
//                 />
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-500">{formatDuration(audioDuration)}</span>
//                   <div className="flex-1 h-1 bg-gray-200 rounded-full">
//                     <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
//                   </div>
//                   <span className="text-sm text-gray-500">{formatDuration(audioDuration)}</span>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-500">
//                 {formData.artist || 'Unknown Artist'} - {formData.title || 'Untitled'}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Audio File Upload */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Music className="w-5 h-5 text-primary" />
//             Audio File
//             {validationErrors.audioFile && (
//               <span className="text-sm text-red-500 ml-2">* {validationErrors.audioFile}</span>
//             )}
//           </h2>
//           {!isEditMode && (
//             <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//               validationErrors.audioFile ? 'border-red-500' : 'border-gray-300 hover:border-primary'
//             }`}>
//               {previewUrl && !isEditMode ? (
//                 <div>
//                   <audio controls className="w-full mb-4">
//                     <source src={previewUrl} />
//                   </audio>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAudioFile(null);
//                       if (previewUrl) URL.revokeObjectURL(previewUrl);
//                       setPreviewUrl(null);
//                       setAudioDuration(0);
//                     }}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Remove file
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
//                   <p className="text-sm text-gray-400">MP3, WAV, OGG, M4A, AAC (max 50MB)</p>
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     onChange={handleFileChange}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//                   />
//                 </>
//               )}
//             </div>
//           )}
//           {isEditMode && previewUrl && (
//             <div className="text-sm text-gray-500">
//               <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
//               Audio file already uploaded. Upload a new file to replace it.
//               <button
//                 type="button"
//                 onClick={() => {
//                   document.getElementById('audio-upload').click();
//                 }}
//                 className="ml-4 text-primary hover:underline"
//               >
//                 Change file
//               </button>
//               <input
//                 id="audio-upload"
//                 type="file"
//                 accept="audio/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>
//           )}
//         </div>

//         {/* Cover Image */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Upload className="w-5 h-5 text-primary" />
//             Cover Image
//           </h2>
//           <div className="flex items-center gap-6">
//             {coverPreview ? (
//               <div className="relative w-32 h-32 group">
//                 <img
//                   src={coverPreview}
//                   alt="Cover"
//                   className="w-full h-full object-cover rounded-lg shadow-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCoverImage(null);
//                     if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
//                     setCoverPreview(null);
//                   }}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
//                 >
//                   <XCircle className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
//                 <Music className="w-8 h-8 text-gray-400" />
//               </div>
//             )}
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleCoverChange}
//                 className="hidden"
//                 id="cover-upload"
//               />
//               <label
//                 htmlFor="cover-upload"
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer inline-block transition-colors"
//               >
//                 {coverPreview ? 'Change Image' : 'Choose Image'}
//               </label>
//               <p className="text-sm text-gray-400 mt-2">JPG, PNG, WEBP, GIF (max 5MB)</p>
//             </div>
//           </div>
//         </div>

//         {/* Audio Details */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Mic className="w-5 h-5 text-primary" />
//             Audio Details
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title *
//                 {validationErrors.title && (
//                   <span className="text-red-500 ml-2">{validationErrors.title}</span>
//                 )}
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
//                   validationErrors.title ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter audio title"
//                 required
//                 maxLength="100"
//               />
//               <p className="text-xs text-gray-400 mt-1">{formData.title.length}/100 characters</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <User className="w-4 h-4 inline mr-1" />
//                 Artist
//               </label>
//               <input
//                 type="text"
//                 name="artist"
//                 value={formData.artist}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter artist name"
//                 maxLength="50"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Album className="w-4 h-4 inline mr-1" />
//                 Album
//               </label>
//               <input
//                 type="text"
//                 name="album"
//                 value={formData.album}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter album name"
//                 maxLength="50"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <List className="w-4 h-4 inline mr-1" />
//                 Type
//               </label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.types.map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Calendar className="w-4 h-4 inline mr-1" />
//                 Occasion
//               </label>
//               <select
//                 name="occasion"
//                 value={formData.occasion}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="">Select occasion</option>
//                 {presets.occasions.map((occasion) => (
//                   <option key={occasion} value={occasion}>{occasion}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Globe className="w-4 h-4 inline mr-1" />
//                 Language
//               </label>
//               <select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.languages.map((lang) => (
//                   <option key={lang} value={lang}>{lang.toUpperCase()}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Describe your audio"
//                 maxLength="500"
//               />
//               <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 characters</p>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Tag className="w-4 h-4 inline mr-1" />
//                 Tags
//               </label>
//               <input
//                 type="text"
//                 name="tags"
//                 value={formData.tags}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 placeholder="Enter tags separated by commas (e.g., nasheed, islamic, poetry)"
//               />
//               <p className="text-sm text-gray-400 mt-1">Separate tags with commas</p>
//             </div>
//           </div>
//         </div>

//         {/* Settings */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <Shield className="w-5 h-5 text-primary" />
//             Settings
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Eye className="w-4 h-4 inline mr-1" />
//                 Visibility
//               </label>
//               <select
//                 name="visibility"
//                 value={formData.visibility}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 {presets.visibility.map((vis) => (
//                   <option key={vis} value={vis}>
//                     {vis.charAt(0).toUpperCase() + vis.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 <Clock className="w-4 h-4 inline mr-1" />
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               >
//                 <option value="draft">Draft</option>
//                 <option value="published">Published</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <div className="flex flex-wrap gap-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isPremium"
//                     checked={formData.isPremium}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 text-primary focus:ring-primary"
//                   />
//                   <span className="text-sm font-medium text-gray-700">
//                     <DollarSign className="w-4 h-4 inline mr-1" />
//                     Premium Content
//                   </span>
//                   <span className="text-xs text-gray-400">(Requires subscription to access)</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isFeatured"
//                     checked={formData.isFeatured}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 text-primary focus:ring-primary"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Featured</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="allowComments"
//                     checked={formData.allowComments}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 text-primary focus:ring-primary"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Allow Comments</span>
//                 </label>

//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="allowDownloads"
//                     checked={formData.allowDownloads}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 text-primary focus:ring-primary"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Allow Downloads</span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => navigate('/creator/content')}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 {isEditMode ? 'Saving...' : 'Uploading...'} {uploadProgress > 0 && `(${uploadProgress}%)`}
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 {isEditMode ? 'Update Audio' : 'Upload Audio'}
//               </>
//             )}
//           </button>
//         </div>

//         {/* Upload Progress */}
//         {uploadProgress > 0 && uploadProgress < 100 && (
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm text-gray-500">
//               <span>Uploading...</span>
//               <span>{uploadProgress}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${uploadProgress}%` }}
//               />
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UploadAudioPage;















// client/src/pages/creator/UploadAudioPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
  Upload, 
  Music, 
  Mic, 
  Tag, 
  Globe, 
  Lock, 
  Eye, 
  Calendar,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  Trash2,
  ArrowLeft,
  Play,
  Pause,
  Clock,
  User,
  Album,
  List,
  EyeOff,
  Shield,
  DollarSign,
  Download,
  MessageCircle,
  Image,
  Youtube,
  Link2,
  FileAudio,
  Cloud,
  CloudUpload
} from 'lucide-react';
import audioAPI, { formatDuration, getAudioTypeLabel } from '../../api/audioAPI';

const UploadAudioPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  // Check if we're in edit mode
  const isEditMode = Boolean(id);
  const audioId = id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [uploadSource, setUploadSource] = useState('file');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isYoutubeValid, setIsYoutubeValid] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [useCloudinary, setUseCloudinary] = useState(true);
  const audioRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'nauha',
    occasion: '',
    language: 'urdu',
    tags: '',
    isPremium: false,
    visibility: 'public',
    status: 'draft',
    duration: 0,
    artist: '',
    album: '',
    isFeatured: false,
    allowComments: true,
    allowDownloads: false,
    sourceType: 'upload',
    isPublished: false,
    youtubeUrl: '',
    youtubeVideoId: ''
  });

  // Default presets - no API call needed
  const [presets] = useState({
    types: ['nauha', 'marsiya', 'soz', 'salam', 'majlis', 'mushaira', 'podcast', 'poem_recitation', 'ghazal', 'nazm', 'naat', 'hamd', 'manqabat', 'munajat', 'audiobook', 'lecture', 'interview', 'other'],
    occasions: ['muharram', 'ramadan', 'eid', 'milad', 'general'],
    languages: ['urdu', 'hindi', 'english', 'arabic', 'persian'],
    visibility: ['public', 'private', 'unlisted']
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Fetch audio data if editing
  useEffect(() => {
    if (isEditMode && audioId) {
      fetchAudioData();
    }
    // Don't call fetchPresets - use default values
  }, [audioId]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
      if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    };
  }, [previewUrl, coverPreview]);

  const fetchAudioData = async () => {
    try {
      setFetching(true);
      console.log('Fetching audio with ID:', audioId);
      
      const response = await audioAPI.getAudio(audioId);
      const audio = response.data || response;
      
      if (!audio || !audio._id) {
        toast.error('Audio not found');
        navigate('/creator/content');
        return;
      }
      
      const isYoutubeSource = audio.sourceType === 'youtube' || audio.youtubeUrl;
      
      setFormData({
        title: audio.title || '',
        description: audio.description || '',
        type: audio.type || 'nauha',
        occasion: audio.occasion || '',
        language: audio.language || 'urdu',
        tags: audio.tags?.join(', ') || '',
        isPremium: audio.isPremium || false,
        visibility: audio.visibility || 'public',
        status: audio.isPublished ? 'published' : 'draft',
        duration: audio.duration || 0,
        artist: audio.artist || '',
        album: audio.album || '',
        isFeatured: audio.isFeatured || false,
        allowComments: audio.allowComments !== false,
        allowDownloads: audio.allowDownloads || false,
        sourceType: audio.sourceType || 'upload',
        isPublished: audio.isPublished || false,
        youtubeUrl: audio.youtubeUrl || '',
        youtubeVideoId: audio.youtubeVideoId || ''
      });
      
      setAudioDuration(audio.duration || 0);
      
      if (audio.coverImage) {
        setCoverPreview(audio.coverImage);
      }
      
      if (isYoutubeSource) {
        setUploadSource('youtube');
        setYoutubeUrl(audio.youtubeUrl || '');
        setYoutubeVideoId(audio.youtubeVideoId || '');
        setIsYoutubeValid(true);
      } else if (audio.audioUrl) {
        setUploadSource('file');
        setPreviewUrl(audio.audioUrl);
      }
    } catch (error) {
      console.error('Error fetching audio:', error);
      toast.error(error.response?.data?.message || 'Failed to load audio data');
      navigate('/creator/content');
    } finally {
      setFetching(false);
    }
  };

  const validateYoutubeUrl = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]+)/,
      /(?:youtu\.be\/)([\w-]+)/,
      /(?:youtube\.com\/embed\/)([\w-]+)/,
      /(?:youtube\.com\/v\/)([\w-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const handleYoutubeUrlChange = (e) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    const videoId = validateYoutubeUrl(url);
    if (videoId) {
      setIsYoutubeValid(true);
      setYoutubeVideoId(videoId);
      fetchYoutubeMetadata(videoId);
    } else {
      setIsYoutubeValid(false);
      setYoutubeVideoId('');
    }
  };

  const fetchYoutubeMetadata = async (videoId) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        const data = await response.json();
        if (!formData.title) {
          setFormData(prev => ({ ...prev, title: data.title || '' }));
        }
        if (data.thumbnail_url && !coverPreview) {
          setCoverPreview(data.thumbnail_url);
        }
        if (data.author_name && !formData.artist) {
          setFormData(prev => ({ ...prev, artist: data.author_name || '' }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch YouTube metadata:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid audio format. Please upload MP3, WAV, OGG, M4A, or AAC.');
        e.target.value = '';
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size exceeds 50MB limit.');
        e.target.value = '';
        return;
      }

      setAudioFile(file);
      const url = URL.createObjectURL(file);
      if (previewUrl && !isEditMode) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);
      
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        const duration = Math.round(audio.duration);
        setAudioDuration(duration);
        setFormData(prev => ({
          ...prev,
          duration: duration
        }));
      });
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid image format. Please upload JPG, PNG, WEBP, or GIF.');
        e.target.value = '';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size exceeds 5MB limit.');
        e.target.value = '';
        return;
      }

      setCoverImage(file);
      if (coverPreview && coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (uploadSource === 'file' && !isEditMode && !audioFile && !previewUrl) {
      errors.audioFile = 'Audio file is required';
    }
    if (uploadSource === 'youtube' && !youtubeUrl) {
      errors.youtubeUrl = 'YouTube URL is required';
    }
    if (uploadSource === 'youtube' && !isYoutubeValid) {
      errors.youtubeUrl = 'Invalid YouTube URL';
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

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        if (key === 'tags' && formData.tags) {
          const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
          formDataToSend.append('tags', JSON.stringify(tagsArray));
        } else if (key === 'isPublished') {
          formDataToSend.append('isPublished', formData.status === 'published');
        } else if (key !== 'status' && key !== 'duration' && key !== 'youtubeUrl' && key !== 'youtubeVideoId') {
          formDataToSend.append(key, String(formData[key]));
        }
      });

      // Handle YouTube or File upload
      if (uploadSource === 'youtube') {
        formDataToSend.append('sourceType', 'youtube');
        formDataToSend.append('youtubeUrl', youtubeUrl);
        formDataToSend.append('youtubeVideoId', youtubeVideoId);
        formDataToSend.append('duration', audioDuration || 0);
      } else {
        formDataToSend.append('sourceType', 'upload');
        if (audioFile) {
          formDataToSend.append('audio', audioFile);
        }
        formDataToSend.append('duration', audioDuration || 0);
      }

      // Append cover image
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      // Add cloudinary flag
      formDataToSend.append('useCloudinary', String(useCloudinary));

      let response;
      if (isEditMode && audioId) {
        response = await audioAPI.updateAudio(audioId, formDataToSend);
        toast.success('Audio updated successfully!');
      } else {
        response = await audioAPI.createAudio(formDataToSend);
        toast.success('Audio uploaded successfully!');
      }

      setTimeout(() => {
        navigate('/creator/content');
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save audio';
      toast.error(message);
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this audio? This action cannot be undone.')) return;

    try {
      setLoading(true);
      await audioAPI.deleteAudio(audioId);
      toast.success('Audio deleted successfully');
      navigate('/creator/content');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete audio');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('isPublished', true);
      formDataToSend.append('publishedAt', new Date().toISOString());
      
      await audioAPI.updateAudio(audioId, formDataToSend);
      setFormData(prev => ({ ...prev, status: 'published', isPublished: true }));
      toast.success('Audio published successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to publish audio');
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('isPublished', false);
      
      await audioAPI.updateAudio(audioId, formDataToSend);
      setFormData(prev => ({ ...prev, status: 'draft', isPublished: false }));
      toast.success('Audio unpublished successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to unpublish audio');
    } finally {
      setLoading(false);
    }
  };

  const renderYoutubePreview = () => {
    if (!isYoutubeValid || !youtubeVideoId) return null;
    
    return (
      <div className="mt-4">
        <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="YouTube video preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          YouTube video loaded successfully
          {audioDuration > 0 && (
            <span>• Duration: {formatDuration(audioDuration)}</span>
          )}
        </div>
      </div>
    );
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate('/creator/content')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Content
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Audio' : 'Upload Audio'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditMode ? 'Update your audio details' : 'Share your audio with the community'}
          </p>
          {isEditMode && (
            <div className="mt-2 flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                formData.isPublished 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {formData.isPublished ? 'Published' : 'Draft'}
              </span>
              <span className="text-xs text-gray-400">ID: {audioId}</span>
            </div>
          )}
        </div>
        {isEditMode && audioId && (
          <div className="flex gap-2">
            {!formData.isPublished ? (
              <button
                onClick={handlePublish}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Publish
              </button>
            ) : (
              <button
                onClick={handleUnpublish}
                disabled={loading}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
              >
                <EyeOff className="w-4 h-4" />
                Unpublish
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cloudinary Option */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            Storage Option
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={useCloudinary}
                onChange={() => setUseCloudinary(true)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                <CloudUpload className="w-4 h-4 inline mr-1" />
                Cloudinary (Recommended)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!useCloudinary}
                onChange={() => setUseCloudinary(false)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                <FileAudio className="w-4 h-4 inline mr-1" />
                Local Storage
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {useCloudinary 
              ? 'Files will be uploaded to Cloudinary CDN for faster delivery' 
              : 'Files will be stored on the local server'}
          </p>
        </div>

        {/* Upload Source Selection - Only show for new uploads */}
        {!isEditMode && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              Upload Source
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUploadSource('file')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  uploadSource === 'file'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FileAudio className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">File Upload</div>
                <div className="text-sm text-gray-500">Upload MP3, WAV, etc.</div>
              </button>
              <button
                type="button"
                onClick={() => setUploadSource('youtube')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  uploadSource === 'youtube'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Youtube className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">YouTube Link</div>
                <div className="text-sm text-gray-500">Paste YouTube URL</div>
              </button>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        {uploadSource === 'file' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Audio File
              {validationErrors.audioFile && (
                <span className="text-sm text-red-500 ml-2">* {validationErrors.audioFile}</span>
              )}
            </h2>
            {!isEditMode ? (
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors relative ${
                validationErrors.audioFile ? 'border-red-500' : 'border-gray-300 hover:border-primary'
              }`}>
                {previewUrl ? (
                  <div>
                    <audio controls className="w-full mb-4">
                      <source src={previewUrl} />
                    </audio>
                    <button
                      type="button"
                      onClick={() => {
                        setAudioFile(null);
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                        setAudioDuration(0);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">MP3, WAV, OGG, M4A, AAC (max 50MB)</p>
                    <p className="text-xs text-blue-500 mt-2">
                      {useCloudinary ? '📁 Will be uploaded to Cloudinary' : '📁 Will be stored locally'}
                    </p>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                Audio file already uploaded. Upload a new file to replace it.
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('audio-upload').click();
                  }}
                  className="ml-4 text-primary hover:underline"
                >
                  Change file
                </button>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        )}

        {/* YouTube Section */}
        {uploadSource === 'youtube' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-600" />
              YouTube Link
              {validationErrors.youtubeUrl && (
                <span className="text-sm text-red-500 ml-2">* {validationErrors.youtubeUrl}</span>
              )}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={handleYoutubeUrlChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      validationErrors.youtubeUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {isYoutubeValid && (
                    <div className="flex items-center px-3 bg-green-50 text-green-600 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Paste a YouTube video URL (supports youtube.com/watch, youtu.be, etc.)
                </p>
              </div>

              {renderYoutubePreview()}
            </div>
          </div>
        )}

        {/* Audio Player Preview */}
        {uploadSource === 'file' && previewUrl && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              Audio Preview
            </h2>
            <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <button
                type="button"
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              <div className="flex-1">
                <audio
                  ref={audioRef}
                  src={previewUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{formatDuration(audioDuration)}</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                  </div>
                  <span className="text-sm text-gray-500">{formatDuration(audioDuration)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {formData.artist || 'Unknown Artist'} - {formData.title || 'Untitled'}
              </div>
            </div>
          </div>
        )}

        {/* Cover Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            Cover Image
          </h2>
          <div className="flex items-center gap-6">
            {coverPreview ? (
              <div className="relative w-32 h-32 group">
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage(null);
                    if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
                    setCoverPreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
                id="cover-upload"
              />
              <label
                htmlFor="cover-upload"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer inline-block transition-colors"
              >
                {coverPreview ? 'Change Image' : 'Choose Image'}
              </label>
              <p className="text-sm text-gray-400 mt-2">JPG, PNG, WEBP, GIF (max 5MB)</p>
              {uploadSource === 'youtube' && (
                <p className="text-xs text-blue-500 mt-1">
                  <Link2 className="w-3 h-3 inline mr-1" />
                  YouTube thumbnail will be used if no image is uploaded
                </p>
              )}
              <p className="text-xs text-blue-500 mt-1">
                {useCloudinary ? '📁 Will be uploaded to Cloudinary' : '📁 Will be stored locally'}
              </p>
            </div>
          </div>
        </div>

        {/* Audio Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            Audio Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
                {validationErrors.title && (
                  <span className="text-red-500 ml-2">{validationErrors.title}</span>
                )}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  validationErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter audio title"
                required
                maxLength="100"
              />
              <p className="text-xs text-gray-400 mt-1">{formData.title.length}/100 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" />
                Artist
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter artist name"
                maxLength="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Album className="w-4 h-4 inline mr-1" />
                Album
              </label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter album name"
                maxLength="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <List className="w-4 h-4 inline mr-1" />
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {presets.types.map((type) => (
                  <option key={type} value={type}>
                    {getAudioTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Occasion
              </label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select occasion</option>
                {presets.occasions.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4 inline mr-1" />
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {presets.languages.map((lang) => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your audio"
                maxLength="500"
              />
              <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., nasheed, islamic, poetry)"
              />
              <p className="text-sm text-gray-400 mt-1">Separate tags with commas</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Eye className="w-4 h-4 inline mr-1" />
                Visibility
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {presets.visibility.map((vis) => (
                  <option key={vis} value={vis}>
                    {vis.charAt(0).toUpperCase() + vis.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Premium Content
                  </span>
                  <span className="text-xs text-gray-400">(Requires subscription to access)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowComments"
                    checked={formData.allowComments}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    Allow Comments
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowDownloads"
                    checked={formData.allowDownloads}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    <Download className="w-4 h-4 inline mr-1" />
                    Allow Downloads
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons - ALWAYS VISIBLE with prominent styling */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/creator/content')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isEditMode ? 'Saving...' : 'Uploading...'} {uploadProgress > 0 && `(${uploadProgress}%)`}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditMode ? 'Update Audio' : 'Upload Audio'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Uploading to {useCloudinary ? 'Cloudinary...' : 'Server...'}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadAudioPage;