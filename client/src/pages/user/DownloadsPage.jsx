// // client/src/pages/user/DownloadPage.jsx
// //changed to DownloadsPage
// import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { 
//   Download, BookOpen, Headphones, Video, Trash2, 
//   FileText, FolderDown, AlertCircle, CheckCircle,
//   Eye, Clock, Calendar, HardDrive
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All Downloads', icon: Download },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
//   { id: 'book', label: 'Books', icon: FileText },
// ]

// const DownloadPage = () => {
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedItems, setSelectedItems] = useState([])
//   const [selectMode, setSelectMode] = useState(false)
//   const queryClient = useQueryClient()

//   // Fetch downloads
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['user-downloads', activeTab],
//     queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
//     retry: 1
//   })

//   // Delete download mutation
//   const deleteDownloadMutation = useMutation({
//     mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('Download removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove download')
//     }
//   })

//   // Bulk delete mutation
//   const bulkDeleteMutation = useMutation({
//     mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       setSelectedItems([])
//       setSelectMode(false)
//       toast.success('Downloads removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove downloads')
//     }
//   })

//   // Clear all downloads mutation
//   const clearAllMutation = useMutation({
//     mutationFn: () => userAPI.clearDownloads(),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('All downloads cleared successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to clear downloads')
//     }
//   })

//   const downloads = data?.data || []
  
//   // Filter downloads based on active tab
//   const filteredDownloads = activeTab === 'all' 
//     ? downloads 
//     : downloads.filter(item => item.contentType === activeTab)

//   // Get icon for content type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return FileText
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Download
//     }
//   }

//   // Get file size display
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size'
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download file
//   const handleDownloadFile = async (item) => {
//     try {
//       if (item.downloadUrl) {
//         // Create a temporary anchor element to trigger download
//         const link = document.createElement('a')
//         link.href = item.downloadUrl
//         link.download = item.title || 'download'
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         toast.success(`Downloading: ${item.title}`)
//       } else {
//         // If no download URL, try to fetch the file
//         const response = await userAPI.downloadFile(item.contentType, item.contentId)
//         const url = window.URL.createObjectURL(new Blob([response.data]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
//         document.body.appendChild(link)
//         link.click()
//         link.remove()
//         window.URL.revokeObjectURL(url)
//         toast.success(`Downloading: ${item.title}`)
//       }
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error('Failed to download file')
//     }
//   }

//   // Handle single delete
//   const handleDelete = (downloadId) => {
//     if (window.confirm('Are you sure you want to remove this download?')) {
//       deleteDownloadMutation.mutate(downloadId)
//     }
//   }

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
//       clearAllMutation.mutate()
//     }
//   }

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     if (selectedItems.length === 0) return
//     if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
//       bulkDeleteMutation.mutate(selectedItems)
//     }
//   }

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedItems.length === filteredDownloads.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(filteredDownloads.map(item => item._id))
//     }
//   }

//   // Handle item selection
//   const handleSelectItem = (itemId) => {
//     setSelectedItems(prev => 
//       prev.includes(itemId) 
//         ? prev.filter(id => id !== itemId)
//         : [...prev, itemId]
//     )
//   }

//   // Calculate total size
//   const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
//   const totalItems = filteredDownloads.length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load downloads
//             </h3>
//             <p className="text-red-600 dark:text-red-300">
//               {error.response?.data?.message || 'Please try again later'}
//             </p>
//             <button 
//               onClick={() => queryClient.invalidateQueries(['user-downloads'])}
//               className="mt-4 btn-primary"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 Manage and access your downloaded content
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
//                   <p className="text-xs text-secondary-500">Items</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
//                   <p className="text-xs text-secondary-500">Total Size</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2">
//             {tabs.map(tab => {
//               const Icon = tab.icon
//               const count = tab.id === 'all' 
//                 ? downloads.length 
//                 : downloads.filter(item => item.contentType === tab.id).length
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                   {count > 0 && (
//                     <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                       activeTab === tab.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-100 dark:bg-dark-800'
//                     }`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {/* Action Buttons */}
//           {filteredDownloads.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectMode && (
//                 <>
//                   <button
//                     onClick={handleSelectAll}
//                     className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
//                   >
//                     {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
//                   </button>
//                   {selectedItems.length > 0 && (
//                     <button
//                       onClick={handleBulkDelete}
//                       className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete ({selectedItems.length})
//                     </button>
//                   )}
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectMode(!selectMode)}
//                 className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
//               >
//                 {selectMode ? 'Cancel' : 'Select'}
//               </button>
//               {filteredDownloads.length > 0 && !selectMode && (
//                 <button
//                   onClick={handleClearAll}
//                   className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {isLoading ? (
//           <div className="flex items-center justify-center py-20">
//             <LoadingSpinner size="lg" />
//           </div>
//         ) : filteredDownloads.length === 0 ? (
//           <EmptyState
//             icon="download"
//             title="No downloads yet"
//             description="Download poems, audio, videos, or books to access them offline."
//             action={{
//               label: "Explore Content",
//               to: "/explore"
//             }}
//           />
//         ) : (
//           <div className="space-y-3">
//             {filteredDownloads.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               const isSelected = selectedItems.includes(item._id)
              
//               return (
//                 <motion.div
//                   key={item._id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
//                     isSelected 
//                       ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
//                       : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 p-4">
//                     {/* Select Checkbox */}
//                     {selectMode && (
//                       <div className="flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectItem(item._id)}
//                           className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                       </div>
//                     )}
                    
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-6 h-6 text-primary-600" />
//                     </div>
                    
//                     {/* Content Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-medium text-dark-900 dark:text-white truncate">
//                           {item.title || 'Untitled'}
//                         </h3>
//                         <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
//                           {item.contentType}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
//                         {item.fileSize && (
//                           <span className="flex items-center gap-1">
//                             <HardDrive className="w-3 h-3" />
//                             {formatFileSize(item.fileSize)}
//                           </span>
//                         )}
//                         {item.downloadedAt && (
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                         {item.format && (
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {item.format.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       <Link
//                         to={`/${item.contentType}/${item.slug || item.contentId}`}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDownloadFile(item)}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="Download Again"
//                       >
//                         <Download className="w-4 h-4" />
//                       </button>
//                       {!selectMode && (
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Progress bar for download status (if applicable) */}
//                   {item.downloadStatus === 'downloading' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
//                       <div 
//                         className="h-full bg-primary-500 transition-all duration-300"
//                         style={{ width: `${item.downloadProgress || 0}%` }}
//                       />
//                     </div>
//                   )}
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}

//         {/* Storage Info */}
//         {filteredDownloads.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
//           >
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2 text-secondary-600">
//                 <HardDrive className="w-4 h-4" />
//                 <span>Storage Used</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-dark-900 dark:text-white font-medium">
//                   {formatFileSize(totalSize)}
//                 </span>
//                 <button
//                   onClick={handleClearAll}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//             {/* Storage Progress Bar */}
//             <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
//               <div 
//                 className="bg-primary-600 h-2 rounded-full transition-all"
//                 style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
//               />
//             </div>
//             <p className="text-xs text-secondary-500 mt-2">
//               {formatFileSize(totalSize)} of 100 MB used
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DownloadsPage
















// // client/src/pages/user/DownloadsPage.jsx
// import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { 
//   Download, BookOpen, Headphones, Video, Trash2, 
//   FileText, FolderDown, AlertCircle, CheckCircle,
//   Eye, Clock, Calendar, HardDrive
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All Downloads', icon: Download },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
//   { id: 'book', label: 'Books', icon: FileText },
// ]

// const DownloadsPage = () => {
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedItems, setSelectedItems] = useState([])
//   const [selectMode, setSelectMode] = useState(false)
//   const queryClient = useQueryClient()

//   // Fetch downloads
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['user-downloads', activeTab],
//     queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
//     retry: 1
//   })

//   // Delete download mutation
//   const deleteDownloadMutation = useMutation({
//     mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('Download removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove download')
//     }
//   })

//   // Bulk delete mutation
//   const bulkDeleteMutation = useMutation({
//     mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       setSelectedItems([])
//       setSelectMode(false)
//       toast.success('Downloads removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove downloads')
//     }
//   })

//   // Clear all downloads mutation
//   const clearAllMutation = useMutation({
//     mutationFn: () => userAPI.clearDownloads(),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('All downloads cleared successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to clear downloads')
//     }
//   })

//   const downloads = data?.data || []
  
//   // Filter downloads based on active tab
//   const filteredDownloads = activeTab === 'all' 
//     ? downloads 
//     : downloads.filter(item => item.contentType === activeTab)

//   // Get icon for content type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return FileText
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Download
//     }
//   }

//   // Get file size display
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size'
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download file
//   const handleDownloadFile = async (item) => {
//     try {
//       if (item.downloadUrl) {
//         const link = document.createElement('a')
//         link.href = item.downloadUrl
//         link.download = item.title || 'download'
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         toast.success(`Downloading: ${item.title}`)
//       } else {
//         const response = await userAPI.downloadFile(item.contentType, item.contentId)
//         const url = window.URL.createObjectURL(new Blob([response]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
//         document.body.appendChild(link)
//         link.click()
//         link.remove()
//         window.URL.revokeObjectURL(url)
//         toast.success(`Downloading: ${item.title}`)
//       }
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error('Failed to download file')
//     }
//   }

//   // Handle single delete
//   const handleDelete = (downloadId) => {
//     if (window.confirm('Are you sure you want to remove this download?')) {
//       deleteDownloadMutation.mutate(downloadId)
//     }
//   }

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
//       clearAllMutation.mutate()
//     }
//   }

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     if (selectedItems.length === 0) return
//     if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
//       bulkDeleteMutation.mutate(selectedItems)
//     }
//   }

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedItems.length === filteredDownloads.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(filteredDownloads.map(item => item._id))
//     }
//   }

//   // Handle item selection
//   const handleSelectItem = (itemId) => {
//     setSelectedItems(prev => 
//       prev.includes(itemId) 
//         ? prev.filter(id => id !== itemId)
//         : [...prev, itemId]
//     )
//   }

//   // Calculate total size
//   const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
//   const totalItems = filteredDownloads.length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load downloads
//             </h3>
//             <p className="text-red-600 dark:text-red-300">
//               {error.response?.data?.message || 'Please try again later'}
//             </p>
//             <button 
//               onClick={() => queryClient.invalidateQueries(['user-downloads'])}
//               className="mt-4 btn-primary"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 Manage and access your downloaded content
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
//                   <p className="text-xs text-secondary-500">Items</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
//                   <p className="text-xs text-secondary-500">Total Size</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2">
//             {tabs.map(tab => {
//               const Icon = tab.icon
//               const count = tab.id === 'all' 
//                 ? downloads.length 
//                 : downloads.filter(item => item.contentType === tab.id).length
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                   {count > 0 && (
//                     <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                       activeTab === tab.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-100 dark:bg-dark-800'
//                     }`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {/* Action Buttons */}
//           {filteredDownloads.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectMode && (
//                 <>
//                   <button
//                     onClick={handleSelectAll}
//                     className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
//                   >
//                     {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
//                   </button>
//                   {selectedItems.length > 0 && (
//                     <button
//                       onClick={handleBulkDelete}
//                       className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete ({selectedItems.length})
//                     </button>
//                   )}
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectMode(!selectMode)}
//                 className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
//               >
//                 {selectMode ? 'Cancel' : 'Select'}
//               </button>
//               {filteredDownloads.length > 0 && !selectMode && (
//                 <button
//                   onClick={handleClearAll}
//                   className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {filteredDownloads.length === 0 ? (
//           <EmptyState
//             icon="download"
//             title="No downloads yet"
//             description="Download poems, audio, videos, or books to access them offline."
//             action={{ label: "Explore Content", to: "/explore" }}
//           />
//         ) : (
//           <div className="space-y-3">
//             {filteredDownloads.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               const isSelected = selectedItems.includes(item._id)
              
//               return (
//                 <motion.div
//                   key={item._id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
//                     isSelected 
//                       ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
//                       : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 p-4">
//                     {/* Select Checkbox */}
//                     {selectMode && (
//                       <div className="flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectItem(item._id)}
//                           className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                       </div>
//                     )}
                    
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-6 h-6 text-primary-600" />
//                     </div>
                    
//                     {/* Content Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-medium text-dark-900 dark:text-white truncate">
//                           {item.title || 'Untitled'}
//                         </h3>
//                         <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
//                           {item.contentType}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
//                         {item.fileSize && (
//                           <span className="flex items-center gap-1">
//                             <HardDrive className="w-3 h-3" />
//                             {formatFileSize(item.fileSize)}
//                           </span>
//                         )}
//                         {item.downloadedAt && (
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                         {item.format && (
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {item.format.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       <Link
//                         to={`/${item.contentType}/${item.slug || item.contentId}`}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDownloadFile(item)}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="Download Again"
//                       >
//                         <Download className="w-4 h-4" />
//                       </button>
//                       {!selectMode && (
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Progress bar for download status */}
//                   {item.downloadStatus === 'downloading' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
//                       <div 
//                         className="h-full bg-primary-500 transition-all duration-300"
//                         style={{ width: `${item.downloadProgress || 0}%` }}
//                       />
//                     </div>
//                   )}
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}

//         {/* Storage Info */}
//         {filteredDownloads.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
//           >
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2 text-secondary-600">
//                 <HardDrive className="w-4 h-4" />
//                 <span>Storage Used</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-dark-900 dark:text-white font-medium">
//                   {formatFileSize(totalSize)}
//                 </span>
//                 <button
//                   onClick={handleClearAll}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//             {/* Storage Progress Bar */}
//             <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
//               <div 
//                 className="bg-primary-600 h-2 rounded-full transition-all"
//                 style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
//               />
//             </div>
//             <p className="text-xs text-secondary-500 mt-2">
//               {formatFileSize(totalSize)} of 100 MB used
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DownloadsPage
















// // client/src/pages/user/DownloadsPage.jsx
// import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { 
//   Download, BookOpen, Headphones, Video, Trash2, 
//   FileText, FolderDown, AlertCircle, CheckCircle,
//   Eye, Clock, Calendar, HardDrive
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All Downloads', icon: Download },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
//   { id: 'book', label: 'Books', icon: FileText },
// ]

// const DownloadsPage = () => {
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedItems, setSelectedItems] = useState([])
//   const [selectMode, setSelectMode] = useState(false)
//   const queryClient = useQueryClient()

//   // Fetch downloads
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['user-downloads', activeTab],
//     queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
//     retry: 1
//   })

//   // Delete download mutation
//   const deleteDownloadMutation = useMutation({
//     mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('Download removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove download')
//     }
//   })

//   // Bulk delete mutation
//   const bulkDeleteMutation = useMutation({
//     mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       setSelectedItems([])
//       setSelectMode(false)
//       toast.success('Downloads removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove downloads')
//     }
//   })

//   // Clear all downloads mutation
//   const clearAllMutation = useMutation({
//     mutationFn: () => userAPI.clearDownloads(),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('All downloads cleared successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to clear downloads')
//     }
//   })

//   const downloads = data?.data || []
  
//   // Filter downloads based on active tab
//   const filteredDownloads = activeTab === 'all' 
//     ? downloads 
//     : downloads.filter(item => item.contentType === activeTab)

//   // Get icon for content type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return FileText
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Download
//     }
//   }

//   // Get file size display
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size'
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download file
//   const handleDownloadFile = async (item) => {
//     try {
//       if (item.downloadUrl) {
//         const link = document.createElement('a')
//         link.href = item.downloadUrl
//         link.download = item.title || 'download'
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         toast.success(`Downloading: ${item.title}`)
//       } else {
//         const response = await userAPI.downloadFile(item.contentType, item.contentId)
//         const url = window.URL.createObjectURL(new Blob([response]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
//         document.body.appendChild(link)
//         link.click()
//         link.remove()
//         window.URL.revokeObjectURL(url)
//         toast.success(`Downloading: ${item.title}`)
//       }
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error('Failed to download file')
//     }
//   }

//   // Handle single delete
//   const handleDelete = (downloadId) => {
//     if (window.confirm('Are you sure you want to remove this download?')) {
//       deleteDownloadMutation.mutate(downloadId)
//     }
//   }

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
//       clearAllMutation.mutate()
//     }
//   }

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     if (selectedItems.length === 0) return
//     if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
//       bulkDeleteMutation.mutate(selectedItems)
//     }
//   }

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedItems.length === filteredDownloads.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(filteredDownloads.map(item => item._id))
//     }
//   }

//   // Handle item selection
//   const handleSelectItem = (itemId) => {
//     setSelectedItems(prev => 
//       prev.includes(itemId) 
//         ? prev.filter(id => id !== itemId)
//         : [...prev, itemId]
//     )
//   }

//   // Calculate total size
//   const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
//   const totalItems = filteredDownloads.length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load downloads
//             </h3>
//             <p className="text-red-600 dark:text-red-300">
//               {error.response?.data?.message || 'Please try again later'}
//             </p>
//             <button 
//               onClick={() => queryClient.invalidateQueries(['user-downloads'])}
//               className="mt-4 btn-primary"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 Manage and access your downloaded content
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
//                   <p className="text-xs text-secondary-500">Items</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200 dark:bg-dark-700" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
//                   <p className="text-xs text-secondary-500">Total Size</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2">
//             {tabs.map(tab => {
//               const Icon = tab.icon
//               const count = tab.id === 'all' 
//                 ? downloads.length 
//                 : downloads.filter(item => item.contentType === tab.id).length
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                   {count > 0 && (
//                     <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                       activeTab === tab.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-100 dark:bg-dark-800'
//                     }`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {/* Action Buttons */}
//           {filteredDownloads.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectMode && (
//                 <>
//                   <button
//                     onClick={handleSelectAll}
//                     className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
//                   >
//                     {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
//                   </button>
//                   {selectedItems.length > 0 && (
//                     <button
//                       onClick={handleBulkDelete}
//                       className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete ({selectedItems.length})
//                     </button>
//                   )}
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectMode(!selectMode)}
//                 className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
//               >
//                 {selectMode ? 'Cancel' : 'Select'}
//               </button>
//               {filteredDownloads.length > 0 && !selectMode && (
//                 <button
//                   onClick={handleClearAll}
//                   className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {filteredDownloads.length === 0 ? (
//           <EmptyState
//             icon="default"
//             title="No downloads yet"
//             description="Download poems, audio, videos, or books to access them offline."
//             action={
//               <Link to="/explore" className="btn-primary">
//                 Explore Content
//               </Link>
//             }
//           />
//         ) : (
//           <div className="space-y-3">
//             {filteredDownloads.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               const isSelected = selectedItems.includes(item._id)
              
//               return (
//                 <motion.div
//                   key={item._id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
//                     isSelected 
//                       ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
//                       : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 p-4">
//                     {/* Select Checkbox */}
//                     {selectMode && (
//                       <div className="flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectItem(item._id)}
//                           className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                       </div>
//                     )}
                    
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-6 h-6 text-primary-600" />
//                     </div>
                    
//                     {/* Content Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-medium text-dark-900 dark:text-white truncate">
//                           {item.title || 'Untitled'}
//                         </h3>
//                         <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
//                           {item.contentType}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
//                         {item.fileSize && (
//                           <span className="flex items-center gap-1">
//                             <HardDrive className="w-3 h-3" />
//                             {formatFileSize(item.fileSize)}
//                           </span>
//                         )}
//                         {item.downloadedAt && (
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                         {item.format && (
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {item.format.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       <Link
//                         to={`/${item.contentType}/${item.slug || item.contentId}`}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDownloadFile(item)}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="Download Again"
//                       >
//                         <Download className="w-4 h-4" />
//                       </button>
//                       {!selectMode && (
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Progress bar for download status */}
//                   {item.downloadStatus === 'downloading' && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
//                       <div 
//                         className="h-full bg-primary-500 transition-all duration-300"
//                         style={{ width: `${item.downloadProgress || 0}%` }}
//                       />
//                     </div>
//                   )}
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}

//         {/* Storage Info */}
//         {filteredDownloads.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
//           >
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2 text-secondary-600">
//                 <HardDrive className="w-4 h-4" />
//                 <span>Storage Used</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-dark-900 dark:text-white font-medium">
//                   {formatFileSize(totalSize)}
//                 </span>
//                 <button
//                   onClick={handleClearAll}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//             {/* Storage Progress Bar */}
//             <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
//               <div 
//                 className="bg-primary-600 h-2 rounded-full transition-all"
//                 style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
//               />
//             </div>
//             <p className="text-xs text-secondary-500 mt-2">
//               {formatFileSize(totalSize)} of 100 MB used
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DownloadsPage












// // client/src/pages/user/DownloadsPage.jsx
// import { useState, useEffect } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { 
//   Download, BookOpen, Headphones, Video, Trash2, 
//   FileText, FolderDown, AlertCircle, CheckCircle,
//   Eye, Clock, Calendar, HardDrive
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'
// import bookAPI from '../../api/bookAPI'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All Downloads', icon: Download },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
//   { id: 'book', label: 'Books', icon: FileText },
// ]

// const DownloadsPage = () => {
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedItems, setSelectedItems] = useState([])
//   const [selectMode, setSelectMode] = useState(false)
//   const [enrichedDownloads, setEnrichedDownloads] = useState([])
//   const queryClient = useQueryClient()

//   // Fetch downloads
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['user-downloads', activeTab],
//     queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
//     retry: 1
//   })

//   // Fetch slugs for book downloads (to fix 404 errors)
//   useEffect(() => {
//     const enrichDownloads = async () => {
//       const downloads = data?.data || []
//       if (downloads.length === 0) {
//         setEnrichedDownloads([])
//         return
//       }

//       const enriched = await Promise.all(
//         downloads.map(async (item) => {
//           // If it's a book and we don't have a slug, fetch it
//           if (item.contentType === 'book' && !item.slug) {
//             try {
//               // Try to get book details using contentId
//               // Note: This assumes you have a way to get book by ID
//               // You might need to add this endpoint or store slug in downloads
//               const bookData = await bookAPI.getBookBySlug?.(item.contentId)
//               return {
//                 ...item,
//                 slug: bookData?.data?.slug || item.contentId,
//                 title: bookData?.data?.title || item.title,
//                 coverImage: bookData?.data?.coverImage
//               }
//             } catch (error) {
//               console.error(`Failed to fetch book ${item.contentId}:`, error)
//               return { ...item, slug: item.contentId }
//             }
//           }
//           return item
//         })
//       )
//       setEnrichedDownloads(enriched)
//     }

//     enrichDownloads()
//   }, [data])

//   // Delete download mutation
//   const deleteDownloadMutation = useMutation({
//     mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('Download removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove download')
//     }
//   })

//   // Bulk delete mutation
//   const bulkDeleteMutation = useMutation({
//     mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       setSelectedItems([])
//       setSelectMode(false)
//       toast.success('Downloads removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove downloads')
//     }
//   })

//   // Clear all downloads mutation
//   const clearAllMutation = useMutation({
//     mutationFn: () => userAPI.clearDownloads(),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('All downloads cleared successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to clear downloads')
//     }
//   })

//   const downloads = enrichedDownloads.length > 0 ? enrichedDownloads : (data?.data || [])
  
//   // Filter downloads based on active tab
//   const filteredDownloads = activeTab === 'all' 
//     ? downloads 
//     : downloads.filter(item => item.contentType === activeTab)

//   // Get icon for content type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return FileText
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Download
//     }
//   }

//   // Get file size display
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size'
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download file
//   const handleDownloadFile = async (item) => {
//     try {
//       if (item.downloadUrl) {
//         const link = document.createElement('a')
//         link.href = item.downloadUrl
//         link.download = item.title || 'download'
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         toast.success(`Downloading: ${item.title}`)
//       } else {
//         // FIX: Use the correct method from bookAPI for books
//         if (item.contentType === 'book') {
//           // For books, we need slug, not ID
//           const bookSlug = item.slug || item.contentId
//           const result = await bookAPI.downloadBook(bookSlug)
//           if (result.data?.downloadUrl) {
//             window.open(result.data.downloadUrl, '_blank')
//             toast.success(`Download started: ${item.title}`)
//           }
//         } else {
//           const response = await userAPI.downloadFile(item.contentType, item.contentId)
//           const url = window.URL.createObjectURL(new Blob([response]))
//           const link = document.createElement('a')
//           link.href = url
//           link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
//           document.body.appendChild(link)
//           link.click()
//           link.remove()
//           window.URL.revokeObjectURL(url)
//           toast.success(`Downloading: ${item.title}`)
//         }
//       }
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error(error.response?.data?.message || 'Failed to download file')
//     }
//   }

//   // Handle single delete
//   const handleDelete = (downloadId) => {
//     if (window.confirm('Are you sure you want to remove this download?')) {
//       deleteDownloadMutation.mutate(downloadId)
//     }
//   }

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
//       clearAllMutation.mutate()
//     }
//   }

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     if (selectedItems.length === 0) return
//     if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
//       bulkDeleteMutation.mutate(selectedItems)
//     }
//   }

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedItems.length === filteredDownloads.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(filteredDownloads.map(item => item._id))
//     }
//   }

//   // Handle item selection
//   const handleSelectItem = (itemId) => {
//     setSelectedItems(prev => 
//       prev.includes(itemId) 
//         ? prev.filter(id => id !== itemId)
//         : [...prev, itemId]
//     )
//   }

//   // Calculate total size
//   const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
//   const totalItems = filteredDownloads.length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load downloads
//             </h3>
//             <p className="text-red-600 dark:text-red-300">
//               {error.response?.data?.message || 'Please try again later'}
//             </p>
//             <button 
//               onClick={() => refetch()}
//               className="mt-4 btn-primary"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 Manage and access your downloaded content
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
//                   <p className="text-xs text-secondary-500">Items</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200 dark:border-dark-700" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
//                   <p className="text-xs text-secondary-500">Total Size</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2">
//             {tabs.map(tab => {
//               const Icon = tab.icon
//               const count = tab.id === 'all' 
//                 ? downloads.length 
//                 : downloads.filter(item => item.contentType === tab.id).length
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                   {count > 0 && (
//                     <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                       activeTab === tab.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-100 dark:bg-dark-800'
//                     }`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {/* Action Buttons */}
//           {filteredDownloads.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectMode && (
//                 <>
//                   <button
//                     onClick={handleSelectAll}
//                     className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
//                   >
//                     {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
//                   </button>
//                   {selectedItems.length > 0 && (
//                     <button
//                       onClick={handleBulkDelete}
//                       className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete ({selectedItems.length})
//                     </button>
//                   )}
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectMode(!selectMode)}
//                 className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
//               >
//                 {selectMode ? 'Cancel' : 'Select'}
//               </button>
//               {filteredDownloads.length > 0 && !selectMode && (
//                 <button
//                   onClick={handleClearAll}
//                   className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {filteredDownloads.length === 0 ? (
//           <EmptyState
//             icon="default"
//             title="No downloads yet"
//             description="Download poems, audio, videos, or books to access them offline."
//             action={
//               <Link to="/explore" className="btn-primary">
//                 Explore Content
//               </Link>
//             }
//           />
//         ) : (
//           <div className="space-y-3">
//             {filteredDownloads.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               const isSelected = selectedItems.includes(item._id)
              
//               // FIX: Generate the correct URL using slug for books, ID for others
//               const viewUrl = item.contentType === 'book'
//                 ? `/books/${item.slug || item.contentId}`
//                 : `/${item.contentType}/${item.contentId}`
              
//               return (
//                 <motion.div
//                   key={item._id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
//                     isSelected 
//                       ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
//                       : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 p-4">
//                     {/* Select Checkbox */}
//                     {selectMode && (
//                       <div className="flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectItem(item._id)}
//                           className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                       </div>
//                     )}
                    
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-6 h-6 text-primary-600" />
//                     </div>
                    
//                     {/* Content Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-medium text-dark-900 dark:text-white truncate">
//                           {item.title || 'Untitled'}
//                         </h3>
//                         <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
//                           {item.contentType}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
//                         {item.fileSize && (
//                           <span className="flex items-center gap-1">
//                             <HardDrive className="w-3 h-3" />
//                             {formatFileSize(item.fileSize)}
//                           </span>
//                         )}
//                         {item.downloadedAt && (
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                         {item.format && (
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {item.format.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       {/* FIX: Updated Link to use correct slug for books */}
//                       <Link
//                         to={viewUrl}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDownloadFile(item)}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="Download Again"
//                       >
//                         <Download className="w-4 h-4" />
//                       </button>
//                       {!selectMode && (
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}

//         {/* Storage Info */}
//         {filteredDownloads.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
//           >
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2 text-secondary-600">
//                 <HardDrive className="w-4 h-4" />
//                 <span>Storage Used</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-dark-900 dark:text-white font-medium">
//                   {formatFileSize(totalSize)}
//                 </span>
//                 <button
//                   onClick={handleClearAll}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//             {/* Storage Progress Bar */}
//             <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
//               <div 
//                 className="bg-primary-600 h-2 rounded-full transition-all"
//                 style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
//               />
//             </div>
//             <p className="text-xs text-secondary-500 mt-2">
//               {formatFileSize(totalSize)} of 100 MB used
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DownloadsPage














// // client/src/pages/user/DownloadsPage.jsx
// import { useState, useEffect } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { motion } from 'framer-motion'
// import { 
//   Download, BookOpen, Headphones, Video, Trash2, 
//   FileText, FolderDown, AlertCircle, CheckCircle,
//   Eye, Clock, Calendar, HardDrive
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// import LoadingSpinner from '../../components/common/LoadingSpinner'
// import EmptyState from '../../components/common/EmptyState'
// import userAPI from '../../api/userAPI'
// import bookAPI from '../../api/bookAPI'
// import { Link } from 'react-router-dom'

// const tabs = [
//   { id: 'all', label: 'All Downloads', icon: Download },
//   { id: 'poem', label: 'Poems', icon: BookOpen },
//   { id: 'audio', label: 'Audio', icon: Headphones },
//   { id: 'video', label: 'Videos', icon: Video },
//   { id: 'book', label: 'Books', icon: FileText },
// ]

// const DownloadsPage = () => {
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedItems, setSelectedItems] = useState([])
//   const [selectMode, setSelectMode] = useState(false)
//   const [enrichedDownloads, setEnrichedDownloads] = useState([])
//   const queryClient = useQueryClient()

//   // Fetch downloads
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ['user-downloads', activeTab],
//     queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
//     retry: 1
//   })

//   // Fetch slugs for book downloads (to fix 404 errors)
//   useEffect(() => {
//     const enrichDownloads = async () => {
//       const downloads = data?.data || []
//       if (downloads.length === 0) {
//         setEnrichedDownloads([])
//         return
//       }

//       const enriched = await Promise.all(
//         downloads.map(async (item) => {
//           // If it's a book and we don't have a slug, fetch it
//           if (item.contentType === 'book' && !item.slug) {
//             try {
//               const bookData = await bookAPI.getBook(item.contentId)
//               return {
//                 ...item,
//                 slug: bookData?.data?.slug || bookData?.slug || item.contentId,
//                 title: bookData?.data?.title || bookData?.title || item.title,
//                 coverImage: bookData?.data?.coverImage || bookData?.coverImage,
//                 isFree: bookData?.data?.isFree || bookData?.isFree,
//                 isPremium: bookData?.data?.isPremium || bookData?.isPremium
//               }
//             } catch (error) {
//               console.error(`Failed to fetch book ${item.contentId}:`, error)
//               return { ...item, slug: item.contentId }
//             }
//           }
//           return item
//         })
//       )
//       setEnrichedDownloads(enriched)
//     }

//     enrichDownloads()
//   }, [data])

//   // Delete download mutation
//   const deleteDownloadMutation = useMutation({
//     mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('Download removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove download')
//     }
//   })

//   // Bulk delete mutation
//   const bulkDeleteMutation = useMutation({
//     mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       setSelectedItems([])
//       setSelectMode(false)
//       toast.success('Downloads removed successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove downloads')
//     }
//   })

//   // Clear all downloads mutation
//   const clearAllMutation = useMutation({
//     mutationFn: () => userAPI.clearDownloads(),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['user-downloads'])
//       toast.success('All downloads cleared successfully')
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to clear downloads')
//     }
//   })

//   const downloads = enrichedDownloads.length > 0 ? enrichedDownloads : (data?.data || [])
  
//   // Filter downloads based on active tab
//   const filteredDownloads = activeTab === 'all' 
//     ? downloads 
//     : downloads.filter(item => item.contentType === activeTab)

//   // Get icon for content type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'poem': return BookOpen
//       case 'book': return FileText
//       case 'audio': return Headphones
//       case 'video': return Video
//       default: return Download
//     }
//   }

//   // Get file size display
//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size'
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   // Handle download file - Free books download PDF, Premium redirect to details
//   const handleDownloadFile = async (item) => {
//     try {
//       if (item.contentType === 'book') {
//         // For books, check if free or premium
//         if (item.isFree) {
//           // Free book - download PDF directly
//           const bookSlug = item.slug || item.contentId
//           const result = await bookAPI.downloadBook(bookSlug)
//           if (result.data?.downloadUrl || result?.downloadUrl) {
//             const downloadUrl = result.data?.downloadUrl || result?.downloadUrl
//             window.open(downloadUrl, '_blank')
//             toast.success(`Downloading: ${item.title}`)
//           } else {
//             toast.error('No download URL available')
//           }
//         } else {
//           // Premium or paid book - redirect to details page to read online
//           toast.info('Redirecting to book details page...')
//           const bookSlug = item.slug || item.contentId
//           window.location.href = `/book/${bookSlug}`
//         }
//       } else if (item.downloadUrl) {
//         // Other content types with direct URL
//         const link = document.createElement('a')
//         link.href = item.downloadUrl
//         link.download = item.title || 'download'
//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//         toast.success(`Downloading: ${item.title}`)
//       } else {
//         // Other content types without direct URL
//         const response = await userAPI.downloadFile(item.contentType, item.contentId)
//         const url = window.URL.createObjectURL(new Blob([response]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
//         document.body.appendChild(link)
//         link.click()
//         link.remove()
//         window.URL.revokeObjectURL(url)
//         toast.success(`Downloading: ${item.title}`)
//       }
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error(error.response?.data?.message || 'Failed to download file')
//     }
//   }

//   // Handle single delete
//   const handleDelete = (downloadId) => {
//     if (window.confirm('Are you sure you want to remove this download?')) {
//       deleteDownloadMutation.mutate(downloadId)
//     }
//   }

//   // Handle clear all
//   const handleClearAll = () => {
//     if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
//       clearAllMutation.mutate()
//     }
//   }

//   // Handle bulk delete
//   const handleBulkDelete = () => {
//     if (selectedItems.length === 0) return
//     if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
//       bulkDeleteMutation.mutate(selectedItems)
//     }
//   }

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectedItems.length === filteredDownloads.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(filteredDownloads.map(item => item._id))
//     }
//   }

//   // Handle item selection
//   const handleSelectItem = (itemId) => {
//     setSelectedItems(prev => 
//       prev.includes(itemId) 
//         ? prev.filter(id => id !== itemId)
//         : [...prev, itemId]
//     )
//   }

//   // Calculate total size
//   const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
//   const totalItems = filteredDownloads.length

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
//             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
//               Failed to load downloads
//             </h3>
//             <p className="text-red-600 dark:text-red-300">
//               {error.response?.data?.message || 'Please try again later'}
//             </p>
//             <button 
//               onClick={() => refetch()}
//               className="mt-4 btn-primary"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
//                 <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
//               </h1>
//               <p className="text-secondary-500 dark:text-secondary-400">
//                 Manage and access your downloaded content
//               </p>
//             </div>
            
//             {/* Stats Card */}
//             <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
//                   <p className="text-xs text-secondary-500">Items</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-200 dark:border-dark-700" />
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
//                   <p className="text-xs text-secondary-500">Total Size</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//           <div className="flex items-center gap-2 overflow-x-auto pb-2">
//             {tabs.map(tab => {
//               const Icon = tab.icon
//               const count = tab.id === 'all' 
//                 ? downloads.length 
//                 : downloads.filter(item => item.contentType === tab.id).length
              
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                   {count > 0 && (
//                     <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
//                       activeTab === tab.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-100 dark:bg-dark-800'
//                     }`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {/* Action Buttons */}
//           {filteredDownloads.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectMode && (
//                 <>
//                   <button
//                     onClick={handleSelectAll}
//                     className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
//                   >
//                     {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
//                   </button>
//                   {selectedItems.length > 0 && (
//                     <button
//                       onClick={handleBulkDelete}
//                       className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete ({selectedItems.length})
//                     </button>
//                   )}
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectMode(!selectMode)}
//                 className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
//               >
//                 {selectMode ? 'Cancel' : 'Select'}
//               </button>
//               {filteredDownloads.length > 0 && !selectMode && (
//                 <button
//                   onClick={handleClearAll}
//                   className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {filteredDownloads.length === 0 ? (
//           <EmptyState
//             icon="default"
//             title="No downloads yet"
//             description="Download poems, audio, videos, or books to access them offline."
//             action={
//               <Link to="/explore" className="btn-primary">
//                 Explore Content
//               </Link>
//             }
//           />
//         ) : (
//           <div className="space-y-3">
//             {filteredDownloads.map((item, index) => {
//               const Icon = getIcon(item.contentType)
//               const isSelected = selectedItems.includes(item._id)
              
//               // FIX: Generate the correct URL using slug for books, ID for others
//               const viewUrl = item.contentType === 'book'
//                 ? `/book/${item.slug || item.contentId}`
//                 : `/${item.contentType}/${item.contentId}`
              
//               return (
//                 <motion.div
//                   key={item._id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
//                     isSelected 
//                       ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
//                       : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 p-4">
//                     {/* Select Checkbox */}
//                     {selectMode && (
//                       <div className="flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelectItem(item._id)}
//                           className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                         />
//                       </div>
//                     )}
                    
//                     {/* Icon */}
//                     <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-6 h-6 text-primary-600" />
//                     </div>
                    
//                     {/* Content Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h3 className="font-medium text-dark-900 dark:text-white truncate">
//                           {item.title || 'Untitled'}
//                         </h3>
//                         <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
//                           {item.contentType}
//                         </span>
//                         {item.contentType === 'book' && item.isFree && (
//                           <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
//                             Free
//                           </span>
//                         )}
//                         {item.contentType === 'book' && item.isPremium && (
//                           <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
//                             Premium
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
//                         {item.fileSize && (
//                           <span className="flex items-center gap-1">
//                             <HardDrive className="w-3 h-3" />
//                             {formatFileSize(item.fileSize)}
//                           </span>
//                         )}
//                         {item.downloadedAt && (
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                         {item.format && (
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {item.format.toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Actions */}
//                     <div className="flex items-center gap-2">
//                       <Link
//                         to={viewUrl}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title="View"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                       <button
//                         onClick={() => handleDownloadFile(item)}
//                         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
//                         title={item.contentType === 'book' && !item.isFree ? 'Read Online' : 'Download'}
//                       >
//                         {item.contentType === 'book' && !item.isFree ? (
//                           <BookOpen className="w-4 h-4" />
//                         ) : (
//                           <Download className="w-4 h-4" />
//                         )}
//                       </button>
//                       {!selectMode && (
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
//                           title="Remove"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         )}

//         {/* Storage Info */}
//         {filteredDownloads.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
//           >
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center gap-2 text-secondary-600">
//                 <HardDrive className="w-4 h-4" />
//                 <span>Storage Used</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className="text-dark-900 dark:text-white font-medium">
//                   {formatFileSize(totalSize)}
//                 </span>
//                 <button
//                   onClick={handleClearAll}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </div>
//             {/* Storage Progress Bar */}
//             <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
//               <div 
//                 className="bg-primary-600 h-2 rounded-full transition-all"
//                 style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
//               />
//             </div>
//             <p className="text-xs text-secondary-500 mt-2">
//               {formatFileSize(totalSize)} of 100 MB used
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DownloadsPage












// client/src/pages/user/DownloadsPage.jsx
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Download, BookOpen, Headphones, Video, Trash2, 
  FileText, FolderDown, AlertCircle, CheckCircle,
  Eye, Clock, Calendar, HardDrive
} from 'lucide-react'
import toast from 'react-hot-toast'

import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import userAPI from '../../api/userAPI'
import bookAPI from '../../api/bookAPI'
import { Link } from 'react-router-dom'

const tabs = [
  { id: 'all', label: 'All Downloads', icon: Download },
  { id: 'poem', label: 'Poems', icon: BookOpen },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'book', label: 'Books', icon: FileText },
]

const DownloadsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [enrichedDownloads, setEnrichedDownloads] = useState([])
  const [isEnriching, setIsEnriching] = useState(false)
  const queryClient = useQueryClient()

  // Fetch downloads
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-downloads', activeTab],
    queryFn: () => userAPI.getDownloads(activeTab !== 'all' ? activeTab : undefined),
    retry: 1
  })

  // Fetch slugs for book downloads (to fix 404 errors)
  useEffect(() => {
    const enrichDownloads = async () => {
      const downloads = data?.data || []
      if (downloads.length === 0) {
        setEnrichedDownloads([])
        return
      }

      setIsEnriching(true)
      const enriched = await Promise.all(
        downloads.map(async (item) => {
          // If it's a book and we have a slug already, use it
          if (item.contentType === 'book' && item.slug) {
            return item
          }
          
          // If it's a book and we don't have a slug, try to fetch it
          if (item.contentType === 'book' && !item.slug) {
            try {
              // First try to fetch by slug if contentId looks like a slug
              // Check if contentId is a MongoDB ObjectId (24 hex chars)
              const isObjectId = /^[0-9a-fA-F]{24}$/.test(item.contentId)
              
              let bookData
              if (!isObjectId) {
                // Try to fetch by slug
                bookData = await bookAPI.getBook(item.contentId)
              }
              
              // If that fails, try to get by ID (if you have that endpoint)
              if (!bookData && isObjectId) {
                // You might need to add a getBookById endpoint
                // For now, return as is
                return { 
                  ...item, 
                  slug: item.contentId,
                  isFree: false,
                  isPremium: false
                }
              }
              
              const book = bookData?.data || bookData
              
              return {
                ...item,
                slug: book?.slug || item.contentId,
                title: book?.title || item.title,
                coverImage: book?.coverImage,
                isFree: book?.isFree || false,
                isPremium: book?.isPremium || false,
                totalPages: book?.totalPages
              }
            } catch (error) {
              console.error(`Failed to fetch book ${item.contentId}:`, error)
              return { 
                ...item, 
                slug: item.contentId,
                isFree: false,
                isPremium: false
              }
            }
          }
          return item
        })
      )
      setEnrichedDownloads(enriched)
      setIsEnriching(false)
    }

    enrichDownloads()
  }, [data])

  // Delete download mutation
  const deleteDownloadMutation = useMutation({
    mutationFn: (downloadId) => userAPI.removeDownload(downloadId),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-downloads'])
      toast.success('Download removed successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove download')
    }
  })

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids) => userAPI.bulkRemoveDownloads(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-downloads'])
      setSelectedItems([])
      setSelectMode(false)
      toast.success('Downloads removed successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove downloads')
    }
  })

  // Clear all downloads mutation
  const clearAllMutation = useMutation({
    mutationFn: () => userAPI.clearDownloads(),
    onSuccess: () => {
      queryClient.invalidateQueries(['user-downloads'])
      toast.success('All downloads cleared successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to clear downloads')
    }
  })

  const downloads = enrichedDownloads.length > 0 ? enrichedDownloads : (data?.data || [])
  
  // Filter downloads based on active tab
  const filteredDownloads = activeTab === 'all' 
    ? downloads 
    : downloads.filter(item => item.contentType === activeTab)

  // Get icon for content type
  const getIcon = (type) => {
    switch (type) {
      case 'poem': return BookOpen
      case 'book': return FileText
      case 'audio': return Headphones
      case 'video': return Video
      default: return Download
    }
  }

  // Get file size display
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handle download file - Free books download PDF, Premium redirect to details
  const handleDownloadFile = async (item) => {
    try {
      if (item.contentType === 'book') {
        // For books, check if free or premium
        if (item.isFree) {
          // Free book - download PDF directly using slug
          const bookSlug = item.slug || item.contentId
          const result = await bookAPI.downloadBook(bookSlug)
          if (result.data?.downloadUrl || result?.downloadUrl) {
            const downloadUrl = result.data?.downloadUrl || result?.downloadUrl
            // Open in new tab for download
            window.open(downloadUrl, '_blank')
            toast.success(`Downloading: ${item.title}`)
          } else {
            toast.error('No download URL available')
          }
        } else {
          // Premium or paid book - redirect to details page to read online
          toast.loading('Redirecting to book details...', { id: 'redirect' })
          const bookSlug = item.slug || item.contentId
          setTimeout(() => {
            toast.dismiss('redirect')
            window.location.href = `/book/${bookSlug}`
          }, 1000)
        }
      } else if (item.downloadUrl) {
        // Other content types with direct URL
        const link = document.createElement('a')
        link.href = item.downloadUrl
        link.download = item.title || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success(`Downloading: ${item.title}`)
      } else {
        // Other content types without direct URL
        const response = await userAPI.downloadFile(item.contentType, item.contentId)
        const url = window.URL.createObjectURL(new Blob([response]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${item.title}.${item.format || 'file'}`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
        toast.success(`Downloading: ${item.title}`)
      }
    } catch (error) {
      console.error('Download error:', error)
      const errorMsg = error.response?.data?.message || 'Failed to download file'
      toast.error(errorMsg)
    }
  }

  // Handle single delete
  const handleDelete = (downloadId) => {
    if (window.confirm('Are you sure you want to remove this download?')) {
      deleteDownloadMutation.mutate(downloadId)
    }
  }

  // Handle clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all downloads? This action cannot be undone.')) {
      clearAllMutation.mutate()
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return
    if (window.confirm(`Are you sure you want to remove ${selectedItems.length} download(s)?`)) {
      bulkDeleteMutation.mutate(selectedItems)
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredDownloads.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredDownloads.map(item => item._id))
    }
  }

  // Handle item selection
  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  // Calculate total size
  const totalSize = filteredDownloads.reduce((sum, item) => sum + (item.fileSize || 0), 0)
  const totalItems = filteredDownloads.length

  // Show loading state while enriching book data
  if (isLoading || isEnriching) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Failed to load downloads
            </h3>
            <p className="text-red-600 dark:text-red-300">
              {error.response?.data?.message || 'Please try again later'}
            </p>
            <button 
              onClick={() => refetch()}
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 flex items-center gap-3">
                <FolderDown className="w-8 h-8 text-primary-600" /> My Downloads
              </h1>
              <p className="text-secondary-500 dark:text-secondary-400">
                Manage and access your downloaded content
              </p>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white dark:bg-dark-900 rounded-xl px-4 py-2 border border-gray-200 dark:border-dark-800">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
                  <p className="text-xs text-secondary-500">Items</p>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:border-dark-700" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{formatFileSize(totalSize)}</p>
                  <p className="text-xs text-secondary-500">Total Size</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              const count = tab.id === 'all' 
                ? downloads.length 
                : downloads.filter(item => item.contentType === tab.id).length
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-dark-900 text-secondary-600 dark:text-secondary-400 border border-gray-200 dark:border-dark-800 hover:border-primary-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {count > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 dark:bg-dark-800'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Action Buttons */}
          {filteredDownloads.length > 0 && (
            <div className="flex items-center gap-2">
              {selectMode && (
                <>
                  <button
                    onClick={handleSelectAll}
                    className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    {selectedItems.length === filteredDownloads.length ? 'Deselect All' : 'Select All'}
                  </button>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete ({selectedItems.length})
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => setSelectMode(!selectMode)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
              >
                {selectMode ? 'Cancel' : 'Select'}
              </button>
              {filteredDownloads.length > 0 && !selectMode && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {filteredDownloads.length === 0 ? (
          <EmptyState
            icon="default"
            title="No downloads yet"
            description="Download poems, audio, videos, or books to access them offline."
            action={
              <Link to="/explore" className="btn-primary">
                Explore Content
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredDownloads.map((item, index) => {
              const Icon = getIcon(item.contentType)
              const isSelected = selectedItems.includes(item._id)
              
              // Generate the correct URL using slug for books, ID for others
              const viewUrl = item.contentType === 'book'
                ? `/book/${item.slug || item.contentId}`
                : `/${item.contentType}/${item.contentId}`
              
              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative bg-white dark:bg-dark-900 rounded-xl border transition-all ${
                    isSelected 
                      ? 'border-primary-400 bg-primary-50/10 dark:bg-primary-900/10'
                      : 'border-gray-100 dark:border-dark-800 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Select Checkbox */}
                    {selectMode && (
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectItem(item._id)}
                          className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    )}
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    
                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-dark-900 dark:text-white truncate">
                          {item.title || 'Untitled'}
                        </h3>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-800 text-secondary-600 rounded-full capitalize">
                          {item.contentType}
                        </span>
                        {item.contentType === 'book' && item.isFree && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                            Free
                          </span>
                        )}
                        {item.contentType === 'book' && item.isPremium && (
                          <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-secondary-500">
                        {item.fileSize && (
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3 h-3" />
                            {formatFileSize(item.fileSize)}
                          </span>
                        )}
                        {item.downloadedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Downloaded: {new Date(item.downloadedAt).toLocaleDateString()}
                          </span>
                        )}
                        {item.format && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {item.format.toUpperCase()}
                          </span>
                        )}
                        {item.contentType === 'book' && item.totalPages && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {item.totalPages} pages
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={viewUrl}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDownloadFile(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-secondary-500 hover:text-primary-600 transition-colors"
                        title={item.contentType === 'book' && !item.isFree ? 'Read Online' : 'Download'}
                      >
                        {item.contentType === 'book' && !item.isFree ? (
                          <BookOpen className="w-4 h-4" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                      {!selectMode && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-secondary-400 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Storage Info */}
        {filteredDownloads.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-dark-800"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-secondary-600">
                <HardDrive className="w-4 h-4" />
                <span>Storage Used</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dark-900 dark:text-white font-medium">
                  {formatFileSize(totalSize)}
                </span>
                <button
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
            {/* Storage Progress Bar */}
            <div className="mt-2 w-full bg-gray-200 dark:bg-dark-800 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((totalSize / (1024 * 1024 * 100)) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-secondary-500 mt-2">
              {formatFileSize(totalSize)} of 100 MB used
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DownloadsPage