// // //client\src\pages\creator\UploadVideoPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { 
//   Video, Upload, Save, Send, Clock, Subtitles, Image, 
//   X, Loader, AlertCircle, CheckCircle, Tag, Eye, Lock, Globe
// } from 'lucide-react'
// import api from '../../services/api'
// import toast from 'react-hot-toast'
// import authService from '../../services/authService'

// const UploadVideoPage = () => {
//   const navigate = useNavigate()
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     duration: '',
//     authorId: '',
//     tags: [],
//     isPublic: true,
//     hasSubtitles: false
//   })
//   const [tagInput, setTagInput] = useState('')
//   const [videoFile, setVideoFile] = useState(null)
//   const [videoPreview, setVideoPreview] = useState(null)
//   const [thumbnail, setThumbnail] = useState(null)
//   const [thumbnailPreview, setThumbnailPreview] = useState(null)
//   const [subtitleFile, setSubtitleFile] = useState(null)
//   const [authors, setAuthors] = useState([])
//   const [categories, setCategories] = useState([])

//   // Fetch user and data on mount
//   useEffect(() => {
//     fetchUser()
//     fetchAuthors()
//     fetchCategories()
//   }, [])

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile()
//       setUser(response.data)
//     } catch (error) {
//       console.error('Failed to fetch user:', error)
//     }
//   }

//   const fetchAuthors = async () => {
//     try {
//       const response = await api.get('/authors?limit=100')
//       setAuthors(response.data.data || [])
//     } catch (error) {
//       console.error('Failed to fetch authors:', error)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/categories/video')
//       setCategories(response.data.data || [])
//     } catch (error) {
//       console.error('Failed to fetch categories:', error)
//       // Fallback categories
//       setCategories([
//         { id: 'mushaira', name: 'Mushaira', value: 'mushaira' },
//         { id: 'podcast', name: 'Podcast', value: 'podcast' },
//         { id: 'documentary', name: 'Documentary', value: 'documentary' },
//         { id: 'interview', name: 'Interview', value: 'interview' },
//         { id: 'lecture', name: 'Lecture', value: 'lecture' },
//         { id: 'performance', name: 'Performance', value: 'performance' }
//       ])
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }))
//       setTagInput('')
//     }
//   }

//   const handleRemoveTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(t => t !== tag)
//     }))
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       handleAddTag()
//     }
//   }

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
//       if (!validTypes.includes(file.type)) {
//         toast.error('Please upload a valid video file (MP4, MOV, AVI, WEBM)')
//         return
//       }
//       if (file.size > 500 * 1024 * 1024) {
//         toast.error('Video size should be less than 500MB')
//         return
//       }
//       setVideoFile(file)
//       const url = URL.createObjectURL(file)
//       setVideoPreview(url)
      
//       // Auto-extract duration if possible
//       const video = document.createElement('video')
//       video.preload = 'metadata'
//       video.onloadedmetadata = () => {
//         const minutes = Math.floor(video.duration / 60)
//         const seconds = Math.floor(video.duration % 60)
//         setFormData(prev => ({
//           ...prev,
//           duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
//         }))
//       }
//       video.src = url
//     }
//   }

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file for thumbnail')
//         return
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Thumbnail size should be less than 5MB')
//         return
//       }
//       setThumbnail(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setThumbnailPreview(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubtitleChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const validTypes = ['text/srt', 'text/vtt', 'application/x-subrip']
//       if (!file.name.endsWith('.srt') && !file.name.endsWith('.vtt')) {
//         toast.error('Please upload a valid subtitle file (SRT or VTT)')
//         return
//       }
//       setSubtitleFile(file)
//       setFormData(prev => ({ ...prev, hasSubtitles: true }))
//       toast.success('Subtitle file uploaded successfully')
//     }
//   }

//   const handleSubmit = async (e, status = 'published') => {
//     e.preventDefault()
    
//     if (!formData.title.trim()) {
//       toast.error('Please enter a title')
//       return
//     }
//     if (!videoFile) {
//       toast.error('Please select a video file')
//       return
//     }
//     if (!formData.category) {
//       toast.error('Please select a category')
//       return
//     }

//     try {
//       setLoading(true)
//       setUploadProgress(0)
      
//       const submitData = new FormData()
//       submitData.append('title', formData.title)
//       submitData.append('description', formData.description)
//       submitData.append('category', formData.category)
//       submitData.append('duration', formData.duration)
//       submitData.append('authorId', formData.authorId)
//       submitData.append('tags', JSON.stringify(formData.tags))
//       submitData.append('status', status)
//       submitData.append('isPublic', formData.isPublic)
//       submitData.append('hasSubtitles', formData.hasSubtitles)
//       submitData.append('video', videoFile)
      
//       if (thumbnail) {
//         submitData.append('thumbnail', thumbnail)
//       }
//       if (subtitleFile) {
//         submitData.append('subtitles', subtitleFile)
//       }

//       const response = await api.post('/videos', submitData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           setUploadProgress(percentCompleted)
//         }
//       })

//       toast.success(status === 'published' ? 'Video published successfully!' : 'Video saved as draft')
//       navigate('/creator/content')
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload video')
//     } finally {
//       setLoading(false)
//       setUploadProgress(0)
//     }
//   }

//   const removeVideo = () => {
//     setVideoFile(null)
//     if (videoPreview) {
//       URL.revokeObjectURL(videoPreview)
//       setVideoPreview(null)
//     }
//     setFormData(prev => ({ ...prev, duration: '' }))
//   }

//   const removeThumbnail = () => {
//     setThumbnail(null)
//     setThumbnailPreview(null)
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h1>
//         <p className="text-gray-500">Share videos, mushaira recordings, and documentaries</p>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <form className="space-y-6">
//           {/* Video Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Video File <span className="text-red-500">*</span>
//             </label>
//             {videoPreview ? (
//               <div className="relative">
//                 <video 
//                   src={videoPreview} 
//                   controls 
//                   className="w-full rounded-lg max-h-96 object-contain bg-black"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeVideo}
//                   className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
//                 <Video className="h-12 w-12 text-gray-400 mb-3" />
//                 <p className="text-gray-600 font-medium">Click to browse or drag and drop</p>
//                 <p className="text-sm text-gray-400 mt-1">MP4, MOV, AVI, WEBM (Max 500MB)</p>
//                 <input
//                   type="file"
//                   accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
//                   onChange={handleVideoChange}
//                   className="hidden"
//                   required={!videoFile}
//                 />
//               </label>
//             )}
//           </div>

//           {/* Upload Progress */}
//           {loading && uploadProgress > 0 && (
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Uploading...</span>
//                 <span className="text-gray-600">{uploadProgress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-primary-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 />
//               </div>
//             </div>
//           )}

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="input-field"
//                 placeholder="Enter video title"
//                 required
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="input-field"
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(cat => (
//                   <option key={cat.id || cat.value} value={cat.value || cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Duration */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Duration
//               </label>
//               <div className="relative">
//                 <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="input-field pl-10"
//                   placeholder="e.g., 45:20"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Auto-detected from video file</p>
//             </div>

//             {/* Related Author */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Related Author (Optional)
//               </label>
//               <select
//                 name="authorId"
//                 value={formData.authorId}
//                 onChange={handleChange}
//                 className="input-field"
//               >
//                 <option value="">Select author</option>
//                 {authors.map(author => (
//                   <option key={author._id} value={author._id}>
//                     {author.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="input-field h-24"
//               placeholder="Brief description of the video content..."
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
//                 placeholder="Add tags (e.g., classic, modern, ghazal)"
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

//           {/* Thumbnail */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Thumbnail Image
//             </label>
//             {thumbnailPreview ? (
//               <div className="relative inline-block">
//                 <img 
//                   src={thumbnailPreview} 
//                   alt="Thumbnail preview" 
//                   className="w-48 h-32 object-cover rounded-lg border border-gray-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeThumbnail}
//                   className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
//                 <Image className="h-8 w-8 text-gray-400 mb-2" />
//                 <p className="text-sm text-gray-500">Upload thumbnail (JPG, PNG)</p>
//                 <p className="text-xs text-gray-400">Recommended: 1280x720px</p>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleThumbnailChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* Subtitles */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Subtitles (Optional)
//             </label>
//             {subtitleFile ? (
//               <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-green-700">{subtitleFile.name}</p>
//                   <p className="text-xs text-green-600">Subtitle file uploaded</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSubtitleFile(null)
//                     setFormData(prev => ({ ...prev, hasSubtitles: false }))
//                   }}
//                   className="text-red-600 hover:text-red-700"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
//                 <Subtitles className="h-8 w-8 text-gray-400 mb-2" />
//                 <p className="text-sm text-gray-500">Upload subtitle file (SRT, VTT)</p>
//                 <p className="text-xs text-gray-400">Optional - for better accessibility</p>
//                 <input
//                   type="file"
//                   accept=".srt,.vtt"
//                   onChange={handleSubtitleChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* Privacy Settings */}
//           <div className="border-t border-gray-200 pt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Privacy Settings
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublic"
//                   checked={formData.isPublic === true}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Globe className="h-4 w-4 text-green-600" />
//                     <span className="font-medium text-gray-700">Public</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Visible to everyone on the platform</p>
//                 </div>
//               </label>
//               <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <input
//                   type="radio"
//                   name="isPublic"
//                   checked={formData.isPublic === false}
//                   onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
//                   className="w-4 h-4 text-primary-600"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <Lock className="h-4 w-4 text-orange-600" />
//                     <span className="font-medium text-gray-700">Private (Draft)</span>
//                   </div>
//                   <p className="text-sm text-gray-500">Only you can see this video until you publish it</p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => navigate('/creator/content')}
//               className="btn-secondary"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={(e) => handleSubmit(e, 'draft')}
//               disabled={loading}
//               className="btn-outline inline-flex items-center space-x-2"
//             >
//               {loading ? (
//                 <Loader className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Save className="h-4 w-4" />
//               )}
//               <span>Save as Draft</span>
//             </button>
//             <button
//               type="submit"
//               onClick={(e) => handleSubmit(e, 'published')}
//               disabled={loading}
//               className="btn-primary inline-flex items-center space-x-2"
//             >
//               {loading ? (
//                 <Loader className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Send className="h-4 w-4" />
//               )}
//               <span>Publish Video</span>
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

// export default UploadVideoPage


















// client/src/pages/creator/UploadVideoPage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Video, Upload, Save, Send, Clock, Subtitles, Image, 
  X, Loader, AlertCircle, CheckCircle, Tag, Eye, Lock, Globe,
  Play, FileVideo, Trash2, Info
} from 'lucide-react'
import api from '../../services/api'
import toast from 'react-hot-toast'
import authService from '../../services/authService'
import videoAPI from '../../api/videoAPI'

const UploadVideoPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    language: 'urdu',
    duration: '',
    tags: [],
    visibility: 'public',
    isPremium: false,
    allowComments: true,
    allowDownloads: false
  })
  const [tagInput, setTagInput] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [presets, setPresets] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Fetch user and presets on mount
  useEffect(() => {
    fetchUser()
    fetchPresets()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authService.getProfile()
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const fetchPresets = async () => {
    try {
      const response = await api.get('/videos/creator/presets')
      setPresets(response.data.data)
    } catch (error) {
      console.error('Failed to fetch presets:', error)
      // Fallback presets
      setPresets({
        types: ['mushaira', 'interview', 'documentary', 'lecture', 'performance', 'other'],
        languages: ['urdu', 'hindi', 'english'],
        visibility: ['public', 'private', 'unlisted'],
        maxFileSize: 500 * 1024 * 1024,
        allowedFormats: ['mp4', 'webm', 'mov', 'avi', 'mkv']
      })
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/matroska']
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid video file (MP4, MOV, AVI, WEBM, MKV)')
        return
      }
      if (file.size > 500 * 1024 * 1024) {
        toast.error('Video size should be less than 500MB')
        return
      }
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
      
      // Auto-extract duration if possible
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60)
        const seconds = Math.floor(video.duration % 60)
        setFormData(prev => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
        }))
      }
      video.src = url
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file for thumbnail')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Thumbnail size should be less than 5MB')
        return
      }
      setThumbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e, status = 'draft') => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (!videoFile) {
      toast.error('Please select a video file')
      return
    }
    if (!formData.type) {
      toast.error('Please select a video type')
      return
    }

    try {
      setUploading(true)
      setLoading(true)
      setUploadProgress(0)
      
      const submitData = new FormData()
      submitData.append('title', formData.title.trim())
      submitData.append('description', formData.description || '')
      submitData.append('type', formData.type)
      submitData.append('language', formData.language)
      submitData.append('duration', formData.duration || '0')
      submitData.append('tags', formData.tags.join(','))
      submitData.append('visibility', formData.visibility)
      submitData.append('isPremium', formData.isPremium)
      submitData.append('allowComments', formData.allowComments)
      submitData.append('allowDownloads', formData.allowDownloads)
      
      // Append video file
      submitData.append('video', videoFile)
      
      // Append thumbnail if provided
      if (thumbnail) {
        submitData.append('thumbnail', thumbnail)
      }

      // Send to creator video upload endpoint
      const response = await api.post('/videos/creator/upload', submitData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
        }
      })

      // If video was uploaded successfully and we want to publish it
      if (status === 'published' && response.data.data) {
        try {
          await api.patch(`/videos/creator/${response.data.data._id}/publish`)
          toast.success('Video published successfully!')
        } catch (publishError) {
          toast.warning('Video uploaded but failed to publish. You can publish it from your dashboard.')
        }
      } else {
        toast.success(status === 'published' ? 'Video published successfully!' : 'Video saved as draft')
      }
      
      navigate('/creator/content')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload video')
    } finally {
      setLoading(false)
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const removeVideo = () => {
    setVideoFile(null)
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
    }
    setFormData(prev => ({ ...prev, duration: '' }))
  }

  const removeThumbnail = () => {
    setThumbnail(null)
    setThumbnailPreview(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h1>
        <p className="text-gray-500">Share videos, mushaira recordings, and documentaries</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File <span className="text-red-500">*</span>
            </label>
            {videoPreview ? (
              <div className="relative rounded-lg overflow-hidden bg-black">
                <video 
                  src={videoPreview} 
                  controls 
                  className="w-full max-h-96 object-contain"
                />
                <button
                  type="button"
                  onClick={removeVideo}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {formData.duration || 'Loading duration...'}
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all group">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <Video className="h-10 w-10 text-primary-600" />
                  </div>
                  <p className="mt-3 text-gray-600 font-medium">Click to browse or drag and drop</p>
                  <p className="text-sm text-gray-400 mt-1">MP4, MOV, AVI, WEBM, MKV (Max 500MB)</p>
                </div>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/matroska"
                  onChange={handleVideoChange}
                  className="hidden"
                  required={!videoFile}
                />
              </label>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="space-y-2 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">Uploading video...</span>
                <span className="text-primary-700 font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">Please wait while your video is being uploaded</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
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
                className="input-field"
                placeholder="Enter video title"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a type</option>
                {presets?.types?.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Language */}
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
                {presets?.languages?.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g., 45:20"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Auto-detected from video file</p>
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
              onChange={handleChange}
              className="input-field h-24 resize-y"
              placeholder="Brief description of the video content..."
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
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
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
                placeholder="Add tags (e.g., classic, modern, ghazal)"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn-secondary whitespace-nowrap"
              >
                <Tag className="h-4 w-4 inline mr-1" />
                Add Tag
              </button>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image
            </label>
            {thumbnailPreview ? (
              <div className="relative inline-block">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="w-48 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-50 transition-all">
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload thumbnail (JPG, PNG, WEBP)</p>
                <p className="text-xs text-gray-400">Recommended: 1280x720px (Max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Visibility & Privacy Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Visibility & Privacy</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Visibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="input-field"
                >
                  {presets?.visibility?.map(vis => (
                    <option key={vis} value={vis}>
                      {vis.charAt(0).toUpperCase() + vis.slice(1)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.visibility === 'public' && 'Visible to everyone'}
                  {formData.visibility === 'private' && 'Only visible to you'}
                  {formData.visibility === 'unlisted' && 'Visible only with a direct link'}
                </p>
              </div>

              {/* Premium */}
              <div className="flex items-center space-x-3 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Premium Content</span>
                </label>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowComments"
                      checked={formData.allowComments}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">Allow Comments</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowDownloads"
                      checked={formData.allowDownloads}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">Allow Downloads</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
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
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading || !videoFile}
              className="btn-outline inline-flex items-center space-x-2"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save as Draft</span>
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={loading || !videoFile}
              className="btn-primary inline-flex items-center space-x-2"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>Publish Video</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default UploadVideoPage