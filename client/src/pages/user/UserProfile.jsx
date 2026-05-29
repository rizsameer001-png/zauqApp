import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { User, Mail, Camera, Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

//import { updateUser } from '../../store/slices/authSlice'
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

  const updateProfileMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: (response) => {
      dispatch(updateUser(response.data))
      queryClient.invalidateQueries(['user-profile'])
      toast.success('Profile updated successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: (formData) => userAPI.uploadAvatar(formData),
    onSuccess: (response) => {
      dispatch(updateUser({ avatar: response.data.avatar }))
      toast.success('Avatar updated!')
    },
    onError: () => {
      toast.error('Failed to upload avatar')
    }
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfileMutation.mutate(formData)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
      const formData = new FormData()
      formData.append('avatar', file)
      uploadAvatarMutation.mutate(formData)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-8">Profile Settings</h1>

          <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 p-8">
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img
                  src={avatarPreview || '/default-avatar.jpg'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-dark-800"
                />
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-900 dark:text-white">{user?.name}</h2>
                <p className="text-secondary-500">{user?.email}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-secondary-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-secondary-500 mt-1">Email cannot be changed</p>
              </div>

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
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                />
                <p className="text-xs text-secondary-500 mt-1 text-right">{formData.bio.length}/500</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="btn-primary flex items-center gap-2"
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile
