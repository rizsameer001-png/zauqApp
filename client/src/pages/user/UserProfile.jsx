// //// client/src/pages/user/UserProfile.jsx
// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { User, Mail, Camera, Save, Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'

// //import { updateUser } from '../../store/slices/authSlice'
// import { updateUser } from '../../store/slices/authSlice.js'
// import userAPI from '../../api/userAPI'

// const UserProfile = () => {
//   const { user } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
//   const queryClient = useQueryClient()

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     email: user?.email || '',
//   })
//   const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')

//   const updateProfileMutation = useMutation({
//     mutationFn: (data) => userAPI.updateProfile(data),
//     onSuccess: (response) => {
//       dispatch(updateUser(response.data))
//       queryClient.invalidateQueries(['user-profile'])
//       toast.success('Profile updated successfully!')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to update profile')
//     }
//   })

//   const uploadAvatarMutation = useMutation({
//     mutationFn: (formData) => userAPI.uploadAvatar(formData),
//     onSuccess: (response) => {
//       dispatch(updateUser({ avatar: response.data.avatar }))
//       toast.success('Avatar updated!')
//     },
//     onError: () => {
//       toast.error('Failed to upload avatar')
//     }
//   })

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     updateProfileMutation.mutate(formData)
//   }

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setAvatarPreview(URL.createObjectURL(file))
//       const formData = new FormData()
//       formData.append('avatar', file)
//       uploadAvatarMutation.mutate(formData)
//     }
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-8">Profile Settings</h1>

//           <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 p-8">
//             {/* Avatar */}
//             <div className="flex items-center gap-6 mb-8">
//               <div className="relative">
//                 <img
//                   src={avatarPreview || '/default-avatar.jpg'}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-dark-800"
//                 />
//                 <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
//                   <Camera className="w-4 h-4 text-white" />
//                   <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
//                 </label>
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-dark-900 dark:text-white">{user?.name}</h2>
//                 <p className="text-secondary-500">{user?.email}</p>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     disabled
//                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-secondary-500 cursor-not-allowed"
//                   />
//                 </div>
//                 <p className="text-xs text-secondary-500 mt-1">Email cannot be changed</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleChange}
//                   rows={4}
//                   maxLength={500}
//                   placeholder="Tell us about yourself..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
//                 />
//                 <p className="text-xs text-secondary-500 mt-1 text-right">{formData.bio.length}/500</p>
//               </div>

//               <div className="flex items-center gap-4">
//                 <button
//                   type="submit"
//                   disabled={updateProfileMutation.isPending}
//                   className="btn-primary flex items-center gap-2"
//                 >
//                   {updateProfileMutation.isPending ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <Save className="w-5 h-5" />
//                   )}
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile








// // client/src/pages/user/UserProfile.jsx
// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { User, Mail, Camera, Save, Loader2, X, Image as ImageIcon } from 'lucide-react'
// import toast from 'react-hot-toast'

// import { updateUser } from '../../store/slices/authSlice.js'
// import userAPI from '../../api/userAPI'

// const UserProfile = () => {
//   const { user } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
//   const queryClient = useQueryClient()

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     email: user?.email || '',
//   })
//   const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
//   const [uploadingAvatar, setUploadingAvatar] = useState(false)

//   const updateProfileMutation = useMutation({
//     mutationFn: (data) => userAPI.updateProfile(data),
//     onSuccess: (response) => {
//       dispatch(updateUser(response.data))
//       queryClient.invalidateQueries(['user-profile'])
//       toast.success('Profile updated successfully!')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to update profile')
//     }
//   })

//   const uploadAvatarMutation = useMutation({
//     mutationFn: (formData) => userAPI.uploadAvatar(formData),
//     onSuccess: (response) => {
//       const avatarUrl = response.data?.avatar || response.data?.url || response.data
//       dispatch(updateUser({ avatar: avatarUrl }))
//       setAvatarPreview(avatarUrl)
//       toast.success('Avatar updated successfully!')
//     },
//     onError: (error) => {
//       console.error('Avatar upload error:', error)
//       toast.error(error.response?.data?.message || 'Failed to upload avatar')
//     }
//   })

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     updateProfileMutation.mutate(formData)
//   }

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Please upload a valid image file (JPEG, PNG, WEBP, or GIF)')
//       return
//     }

//     // Validate file size (max 2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Image size must be less than 2MB')
//       return
//     }

//     // Create preview
//     const previewUrl = URL.createObjectURL(file)
//     setAvatarPreview(previewUrl)
//     setUploadingAvatar(true)

//     // Prepare form data
//     const formData = new FormData()
//     formData.append('avatar', file)
//     // Also try 'image' as field name if 'avatar' doesn't work
//     formData.append('image', file)

//     try {
//       await uploadAvatarMutation.mutateAsync(formData)
//     } catch (error) {
//       // Revert preview on error
//       setAvatarPreview(user?.avatar || '')
//     } finally {
//       setUploadingAvatar(false)
//       // Clean up preview URL
//       setTimeout(() => URL.revokeObjectURL(previewUrl), 100)
//     }
//   }

//   const removeAvatar = () => {
//     setAvatarPreview('')
//     // You might want to call an API to remove avatar
//     toast.success('Avatar removed')
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-8">Profile Settings</h1>

//           <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 p-8">
//             {/* Avatar */}
//             <div className="flex items-center gap-6 mb-8">
//               <div className="relative group">
//                 <img
//                   src={avatarPreview || '/default-avatar.jpg'}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-dark-800 group-hover:opacity-75 transition-opacity"
//                   onError={(e) => {
//                     e.target.src = '/default-avatar.jpg'
//                   }}
//                 />
//                 {avatarPreview && (
//                   <button
//                     onClick={removeAvatar}
//                     className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 )}
//                 <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                   <Camera className="w-6 h-6 text-white" />
//                   <input 
//                     type="file" 
//                     accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
//                     className="hidden" 
//                     onChange={handleAvatarChange}
//                     disabled={uploadingAvatar}
//                   />
//                 </label>
//                 {uploadingAvatar && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
//                     <Loader2 className="w-6 h-6 text-white animate-spin" />
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-dark-900 dark:text-white">{user?.name}</h2>
//                 <p className="text-secondary-500">{user?.email}</p>
//                 <p className="text-xs text-secondary-400 mt-1">Click on avatar to change</p>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     disabled
//                     className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-secondary-500 cursor-not-allowed"
//                   />
//                 </div>
//                 <p className="text-xs text-secondary-500 mt-1">Email cannot be changed</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleChange}
//                   rows={4}
//                   maxLength={500}
//                   placeholder="Tell us about yourself..."
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
//                 />
//                 <div className="flex justify-between items-center mt-1">
//                   <p className="text-xs text-secondary-500">Share your literary interests</p>
//                   <p className="text-xs text-secondary-500">{formData.bio.length}/500</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-dark-800">
//                 <button
//                   type="submit"
//                   disabled={updateProfileMutation.isPending}
//                   className="btn-primary flex items-center gap-2 min-w-[140px] justify-center"
//                 >
//                   {updateProfileMutation.isPending ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-5 h-5" />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setFormData({
//                       name: user?.name || '',
//                       bio: user?.bio || '',
//                       email: user?.email || '',
//                     })
//                     setAvatarPreview(user?.avatar || '')
//                   }}
//                   className="px-4 py-2 text-secondary-600 hover:text-secondary-700 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile
















// client/src/pages/user/UserProfile.jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { User, Mail, Camera, Save, Loader2, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

import { updateUser } from '../../store/slices/authSlice.js'
import userAPI from '../../api/userAPI'

const UserProfile = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    email: user?.email || '',
  })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: (response) => {
      // Handle different response structures
      const userData = response?.data || response
      dispatch(updateUser(userData))
      queryClient.invalidateQueries(['user-profile'])
      toast.success('Profile updated successfully!')
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile'
      toast.error(errorMessage)
    }
  })

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (formData) => userAPI.uploadAvatar(formData),
    onSuccess: (response) => {
      // Handle different response structures
      const avatarUrl = response?.data?.avatar || response?.data?.url || response?.avatar || response?.url
      
      if (avatarUrl) {
        dispatch(updateUser({ avatar: avatarUrl }))
        setAvatarPreview(avatarUrl)
        toast.success('Avatar updated successfully!')
      } else {
        toast.success('Avatar uploaded successfully!')
      }
      
      // Refetch user profile to ensure consistency
      queryClient.invalidateQueries(['user-profile'])
    },
    onError: (error) => {
      console.error('Avatar upload error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload avatar'
      toast.error(errorMessage)
      
      // Revert preview on error
      setAvatarPreview(user?.avatar || '')
    }
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.name.trim()) {
      toast.error('Name cannot be empty')
      return
    }
    
    updateProfileMutation.mutate(formData)
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, WEBP, or GIF)')
      return
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      toast.error(`Image size must be less than 2MB (Current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`)
      return
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file)
    setAvatarPreview(previewUrl)
    setUploadingAvatar(true)
    setUploadProgress(0)

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90))
    }, 100)

    // Prepare form data
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      await uploadAvatarMutation.mutateAsync(formData)
      setUploadProgress(100)
      setTimeout(() => setUploadProgress(0), 1000)
    } catch (error) {
      // Error handling is done in mutation onError
      setUploadProgress(0)
    } finally {
      clearInterval(progressInterval)
      setUploadingAvatar(false)
      // Clean up preview URL after a delay
      setTimeout(() => URL.revokeObjectURL(previewUrl), 1000)
    }
  }

  const removeAvatar = async () => {
    if (!window.confirm('Are you sure you want to remove your avatar?')) return
    
    // You can implement avatar removal API endpoint
    // For now, just reset to default
    setAvatarPreview('')
    dispatch(updateUser({ avatar: '' }))
    toast.success('Avatar removed')
    
    // Optional: Call API to remove avatar
    // await userAPI.removeAvatar()
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      email: user?.email || '',
    })
    setAvatarPreview(user?.avatar || '')
  }

  const hasChanges = () => {
    return formData.name !== user?.name || formData.bio !== (user?.bio || '')
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Profile Settings</h1>
            <p className="text-secondary-500 dark:text-secondary-400">
              Manage your personal information and preferences
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-800 overflow-hidden">
            {/* Avatar Section */}
            <div className="p-8 border-b border-gray-100 dark:border-dark-800">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={avatarPreview || '/default-avatar.jpg'}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-dark-800 shadow-lg group-hover:opacity-75 transition-all duration-300"
                      onError={(e) => {
                        e.target.src = '/default-avatar.jpg'
                      }}
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <div className="text-white text-sm font-medium">{uploadProgress}%</div>
                      </div>
                    )}
                  </div>
                  
                  {avatarPreview && avatarPreview !== user?.avatar && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                  
                  {avatarPreview && (
                    <button
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-md"
                      title="Remove avatar"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input 
                      type="file" 
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                      disabled={uploadingAvatar}
                    />
                  </label>
                  
                  {uploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white">{user?.name}</h2>
                  <p className="text-secondary-500 dark:text-secondary-400">{user?.email}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      user?.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        : user?.role === 'creator'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {user?.role || 'User'}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      user?.subscription?.plan === 'premium' || user?.subscription?.plan === 'pro'
                        ? 'bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 dark:from-primary-900/30 dark:to-accent-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {user?.subscription?.plan || 'Free'} Plan
                    </span>
                  </div>
                  <p className="text-xs text-secondary-400 mt-3">Click on avatar to change</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-secondary-500 dark:text-secondary-400 cursor-not-allowed"
                  />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 text-secondary-400" />
                  <p className="text-xs text-secondary-500">Email address cannot be changed</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about yourself, your love for poetry, literature, and what inspires you..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white resize-none transition-all"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-secondary-500">Share your literary interests</p>
                  <p className={`text-xs ${formData.bio.length >= 450 ? 'text-orange-500' : 'text-secondary-500'}`}>
                    {formData.bio.length}/500
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100 dark:border-dark-800">
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending || !hasChanges()}
                  className="btn-primary flex items-center gap-2 min-w-[160px] justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                
                {hasChanges() && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-800 p-6"
          >
            <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-secondary-500">Member since:</span>
                <span className="ml-2 text-dark-700 dark:text-dark-300">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-secondary-500">Account status:</span>
                <span className="ml-2 inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              </div>
              <div>
                <span className="text-secondary-500">User ID:</span>
                <span className="ml-2 text-dark-700 dark:text-dark-300 font-mono text-xs">
                  {user?.id || user?._id || 'N/A'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile