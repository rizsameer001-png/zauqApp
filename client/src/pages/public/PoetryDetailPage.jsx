// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'
// import authorAPI from '../../api/authorAPI'

// const PoetryDetailPage = () => {
//   // Get slug from URL params (not id)
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [showTranslation, setShowTranslation] = useState(false)
//   const [showTransliteration, setShowTransliteration] = useState(false)

//   // Fetch poem data using slug
//   const { data: poemData, isLoading, error } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract poem from response
//   const poem = poemData?.data || poemData

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(poem?._id),
//     onSuccess: (response) => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success(response.data?.message || 'Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(poem?._id),
//     onSuccess: (response) => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success(response.data?.message || 'Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedData?.data || relatedData || []

//   // Tabs configuration
//   const tabs = [
//     { id: 'poem', label: t('poetry.poem', 'Poem'), icon: BookOpen },
//     { id: 'translation', label: t('poetry.translation', 'Translation'), icon: BookOpen },
//     { id: 'transliteration', label: t('poetry.transliteration', 'Transliteration'), icon: BookOpen },
//     { id: 'audio', label: t('poetry.audio', 'Audio'), icon: Headphones },
//     { id: 'ai', label: t('poetry.aiExplanation', 'AI Analysis'), icon: Sparkles }
//   ]

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">{t('common.loading', 'Loading poem...')}</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state - poem not found
//   if (error || !poem) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {t('poetry.notFound', 'Poem Not Found')}
//           </h1>
//           <p className="text-gray-500 mb-6">
//             {t('poetry.notFoundMessage', 'The poem you are looking for does not exist or has been removed.')}
//           </p>
//           <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>{t('poetry.browseAll', 'Browse All Poetry')}</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Check if user has interacted with this poem
//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   // Handle like
//   const handleLike = () => {
//     if (!user) {
//       toast.error(t('common.loginRequired', 'Please login to like poems'))
//       return
//     }
//     likeMutation.mutate()
//   }

//   // Handle bookmark
//   const handleBookmark = () => {
//     if (!user) {
//       toast.error(t('common.loginRequired', 'Please login to bookmark poems'))
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success(t('common.linkCopied', 'Link copied to clipboard!'))
//     } catch (err) {
//       toast.error(t('common.copyFailed', 'Failed to copy link'))
//     }
//   }

//   // Render content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'poem':
//         return (
//           <motion.div
//             key="poem"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-6"
//           >
//             {/* Urdu/Persian Script */}
//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//               <div className="text-center space-y-3" dir="rtl">
//                 {(poem.contentUrdu || poem.content)?.split('\n').map((line, index) => (
//                   <p key={index} className="urdu-text text-xl md:text-2xl text-gray-800 leading-loose">
//                     {line || '\u00A0'}
//                   </p>
//                 ))}
//               </div>
//             </div>
            
//             {/* Roman/English Transliteration (if available) */}
//             {poem.transliteration && (
//               <div className="bg-gray-50 rounded-xl p-8">
//                 <div className="text-center space-y-2">
//                   {poem.transliteration.split('\n').map((line, index) => (
//                     <p key={index} className="text-lg text-gray-600 italic leading-relaxed">
//                       {line || '\u00A0'}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )

//       case 'translation':
//         return (
//           <motion.div
//             key="translation"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//           >
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//               <BookOpen className="h-5 w-5 text-primary-600" />
//               <span>{t('poetry.englishTranslation', 'English Translation')}</span>
//             </h3>
//             <div className="space-y-3">
//               {poem.translation?.english?.split('\n').map((line, index) => (
//                 <p key={index} className="text-gray-700 leading-relaxed">
//                   {line || '\u00A0'}
//                 </p>
//               ))}
//               {!poem.translation?.english && (
//                 <p className="text-gray-500 italic">
//                   {t('poetry.noTranslation', 'Translation not available yet.')}
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         )

//       case 'transliteration':
//         return (
//           <motion.div
//             key="transliteration"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//           >
//             <h3 className="font-semibold text-gray-900 mb-4">
//               {t('poetry.romanTransliteration', 'Roman Transliteration')}
//             </h3>
//             <div className="space-y-2">
//               {poem.transliteration?.split('\n').map((line, index) => (
//                 <p key={index} className="text-gray-700 leading-relaxed">
//                   {line || '\u00A0'}
//                 </p>
//               ))}
//               {!poem.transliteration && (
//                 <p className="text-gray-500 italic">
//                   {t('poetry.noTransliteration', 'Transliteration not available yet.')}
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         )

//       case 'audio':
//         return (
//           <motion.div
//             key="audio"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
//           >
//             <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Volume2 className="h-12 w-12 text-primary-600" />
//             </div>
//             <h3 className="font-semibold text-gray-900 mb-2">
//               {t('poetry.audioNarration', 'Audio Narration')}
//             </h3>
//             <p className="text-gray-500 mb-4">
//               {t('poetry.listenToPoem', 'Listen to this poem recited by professional narrators')}
//             </p>
//             {poem.audioUrl ? (
//               <audio controls className="w-full max-w-md mx-auto">
//                 <source src={poem.audioUrl} type="audio/mpeg" />
//                 {t('poetry.audioNotSupported', 'Your browser does not support the audio element.')}
//               </audio>
//             ) : (
//               <button className="btn-primary inline-flex items-center space-x-2">
//                 <Play className="h-5 w-5" />
//                 <span>{t('poetry.playAudio', 'Play Audio')}</span>
//               </button>
//             )}
//           </motion.div>
//         )

//       case 'ai':
//         return (
//           <motion.div
//             key="ai"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100"
//           >
//             <div className="flex items-center space-x-2 mb-4">
//               <Sparkles className="h-5 w-5 text-primary-600" />
//               <h3 className="font-semibold text-gray-900">
//                 {t('poetry.aiLiteraryAnalysis', 'AI Literary Analysis')}
//               </h3>
//             </div>
//             {poem.aiExplanation?.summary ? (
//               <div className="space-y-4">
//                 <p className="text-gray-700 leading-relaxed">{poem.aiExplanation.summary}</p>
//                 {poem.aiExplanation.themes?.length > 0 && (
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">
//                       {t('poetry.themes', 'Themes')}:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {poem.aiExplanation.themes.map((theme, i) => (
//                         <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
//                           {theme}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {poem.aiExplanation.literaryDevices?.length > 0 && (
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">
//                       {t('poetry.literaryDevices', 'Literary Devices')}:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {poem.aiExplanation.literaryDevices.map((device, i) => (
//                         <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
//                           {device}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <p className="text-gray-600">
//                 {t('poetry.aiExplanationComing', 'AI explanation will be available soon.')}
//               </p>
//             )}
//             <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-primary-200 text-sm text-gray-500">
//               <Sparkles className="h-4 w-4" />
//               <span>{t('poetry.poweredByAI', 'Powered by AI')}</span>
//               <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">
//                 {t('common.beta', 'Beta')}
//               </span>
//             </div>
//           </motion.div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center justify-between mb-6">
//           <Link 
//             to="/poetry" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>{t('poetry.backToPoetry', 'Back to Poetry')}</span>
//           </Link>
//           <div className="flex items-center space-x-1 text-sm text-gray-400">
//             <Eye className="h-3 w-3" />
//             <span>{poem.stats?.views?.toLocaleString() || 0} {t('common.views', 'views')}</span>
//           </div>
//         </div>

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap items-center gap-2 mb-3">
//             <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//               {poem.genre}
//             </span>
//             <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//               {poem.language === 'urdu' ? 'Urdu' : poem.language === 'hindi' ? 'Hindi' : poem.language}
//             </span>
//             {poem.era && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                 {poem.era}
//               </span>
//             )}
//           </div>
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{poem.title}</h1>
//           {poem.contentUrdu && (
//             <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">
//               {poem.contentUrdu.split('\n')[0]}
//             </p>
//           )}
          
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//             <Link 
//               to={`/author/${poem.author?.slug}`} 
//               className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
//             >
//               <User className="h-4 w-4" />
//               <span>{poem.author?.name || 'Unknown Author'}</span>
//             </Link>
//             <span className="flex items-center space-x-1">
//               <Clock className="h-4 w-4" />
//               <span>{new Date(poem.createdAt).toLocaleDateString()}</span>
//             </span>
//           </div>
//         </motion.div>

//         {/* Actions Bar */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleLike}
//               disabled={likeMutation.isPending}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isLiked 
//                   ? 'bg-red-50 text-red-600' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
//             </button>
            
//             <button
//               onClick={handleBookmark}
//               disabled={bookmarkMutation.isPending}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isBookmarked 
//                   ? 'bg-primary-50 text-primary-600' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//             </button>
            
//             <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//               <MessageCircle className="h-5 w-5" />
//               <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
//             </button>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={handleShare}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//             >
//               <Share2 className="h-5 w-5" />
//             </button>
//             {poem.audioUrl && (
//               <button className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                 <Play className="h-4 w-4" />
//                 <span className="text-sm">{t('poetry.listen', 'Listen')}</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.map((tab) => {
//             const Icon = tab.icon
//             // Only show audio tab if audio exists
//             if (tab.id === 'audio' && !poem.audioUrl) return null
//             // Only show transliteration tab if content exists
//             if (tab.id === 'transliteration' && !poem.transliteration) return null
//             // Only show translation tab if content exists
//             if (tab.id === 'translation' && !poem.translation?.english) return null
            
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Main Content */}
//         <div className="mb-8">
//           {renderContent()}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">
//               {t('poetry.relatedPoems', 'Related Poems')}
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {relatedPoems.map((related) => (
//                 <Link
//                   key={related._id}
//                   to={`/poem/${related.slug}`}
//                   className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
//                 >
//                   <h4 className="font-medium text-gray-900">{related.title}</h4>
//                   <p className="text-sm text-gray-500">{related.author?.name}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {related.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Heart className="h-3 w-3" />
//                       {related.stats?.likes?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Comments Section */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <MessageCircle className="h-5 w-5 text-primary-600" />
//             {t('poetry.comments', 'Comments')} ({poem.stats?.comments || 0})
//           </h3>
          
//           {user ? (
//             <div className="flex items-start gap-3 mb-6">
//               <img 
//                 src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div className="flex-1">
//                 <textarea
//                   placeholder={t('poetry.writeComment', 'Write a comment...')}
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//                   rows="3"
//                 />
//                 <div className="flex justify-end mt-2">
//                   <button className="btn-primary text-sm py-1.5 px-4">
//                     {t('poetry.postComment', 'Post Comment')}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-6 bg-gray-50 rounded-lg">
//               <p className="text-gray-500 mb-3">{t('poetry.loginToComment', 'Please login to leave a comment')}</p>
//               <Link to="/login" className="btn-primary text-sm">
//                 {t('auth.login', 'Login')}
//               </Link>
//             </div>
//           )}
          
//           {/* Comments list - would be fetched from API */}
//           <div className="space-y-4">
//             {/* Sample comment structure - replace with actual comments from API */}
//             <p className="text-center text-gray-400 text-sm py-4">
//               {t('poetry.noComments', 'No comments yet. Be the first to comment!')}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PoetryDetailPage









// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'

// const PoetryDetailPage = () => {
//   // Get slug from URL params
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')

//   // Fetch poem data using slug
//   const { data: poemData, isLoading, error } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // Extract poem from response
//   const poem = poemData?.data || poemData

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(poem?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(poem?._id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedData } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedData?.data || relatedData || []

//   // Helper function to safely format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date unknown'
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) return 'Date unknown'
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       })
//     } catch (e) {
//       return 'Date unknown'
//     }
//   }

//   // Helper function to safely get author name
//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   // Helper function to safely get author slug
//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   // Helper function to safely get genre
//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre
//   }

//   // Helper function to safely get language
//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   // Helper function to get content lines
//   const getContentLines = () => {
//     const content = poem?.contentUrdu || poem?.content || ''
//     if (!content) return ['No content available']
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   // Helper function to get translation lines
//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   // Helper function to get transliteration lines
//   const getTransliterationLines = () => {
//     const transliteration = poem?.transliteration || ''
//     if (!transliteration) return []
//     return transliteration.split('\n').filter(line => line.trim() !== '')
//   }

//   // Check if user has interacted with this poem
//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   // Handle like
//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   // Handle bookmark
//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   // Handle share
//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   // Tabs configuration
//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: getTranslationLines().length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: getTransliterationLines().length > 0 },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl },
//     { id: 'ai', label: 'AI Analysis', icon: Sparkles, show: true }
//   ]

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading poem...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state - poem not found
//   if (error || !poem) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poem Not Found</h1>
//           <p className="text-gray-500 mb-6">
//             The poem you are looking for does not exist or has been removed.
//           </p>
//           <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Poetry</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Get content lines
//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center justify-between mb-6">
//           <Link 
//             to="/poetry" 
//             className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Poetry</span>
//           </Link>
//           <div className="flex items-center space-x-1 text-sm text-gray-400">
//             <Eye className="h-3 w-3" />
//             <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
//           </div>
//         </div>

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap items-center gap-2 mb-3">
//             <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//               {getGenre()}
//             </span>
//             <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//               {getLanguage()}
//             </span>
//             {poem.era && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                 {poem.era}
//               </span>
//             )}
//           </div>
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{poem.title || 'Untitled'}</h1>
//           {poem.contentUrdu && (
//             <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">
//               {poem.contentUrdu.split('\n')[0]}
//             </p>
//           )}
          
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//             <Link 
//               to={`/author/${getAuthorSlug()}`} 
//               className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
//             >
//               <User className="h-4 w-4" />
//               <span>{getAuthorName()}</span>
//             </Link>
//             <span className="flex items-center space-x-1">
//               <Calendar className="h-4 w-4" />
//               <span>{formatDate(poem.createdAt)}</span>
//             </span>
//           </div>
//         </motion.div>

//         {/* Actions Bar */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleLike}
//               disabled={likeMutation.isPending}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isLiked 
//                   ? 'bg-red-50 text-red-600' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
//             </button>
            
//             <button
//               onClick={handleBookmark}
//               disabled={bookmarkMutation.isPending}
//               className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
//                 isBookmarked 
//                   ? 'bg-primary-50 text-primary-600' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//             </button>
            
//             <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//               <MessageCircle className="h-5 w-5" />
//               <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
//             </button>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={handleShare}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//             >
//               <Share2 className="h-5 w-5" />
//             </button>
//             {poem.audioUrl && (
//               <button 
//                 onClick={() => setActiveTab('audio')}
//                 className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//               >
//                 <Play className="h-4 w-4" />
//                 <span className="text-sm">Listen</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tabs - Only show tabs that have content */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.filter(tab => tab.show).map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Main Content */}
//         <div className="mb-8">
//           {/* Poem Tab */}
//           {activeTab === 'poem' && (
//             <motion.div
//               key="poem"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {/* Urdu/Persian Script */}
//               <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//                 <div className="text-center space-y-3" dir="rtl">
//                   {contentLines.length > 0 ? (
//                     contentLines.map((line, index) => (
//                       <p key={index} className="urdu-text text-xl md:text-2xl text-gray-800 leading-loose">
//                         {line}
//                       </p>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 italic">No content available</p>
//                   )}
//                 </div>
//               </div>
              
//               {/* Roman/English Transliteration */}
//               {transliterationLines.length > 0 && (
//                 <div className="bg-gray-50 rounded-xl p-8">
//                   <div className="text-center space-y-2">
//                     {transliterationLines.map((line, index) => (
//                       <p key={index} className="text-lg text-gray-600 italic leading-relaxed">
//                         {line}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* Translation Tab */}
//           {activeTab === 'translation' && translationLines.length > 0 && (
//             <motion.div
//               key="translation"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//             >
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//                 <BookOpen className="h-5 w-5 text-primary-600" />
//                 <span>English Translation</span>
//               </h3>
//               <div className="space-y-3">
//                 {translationLines.map((line, index) => (
//                   <p key={index} className="text-gray-700 leading-relaxed">
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Transliteration Tab */}
//           {activeTab === 'transliteration' && transliterationLines.length > 0 && (
//             <motion.div
//               key="transliteration"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//             >
//               <h3 className="font-semibold text-gray-900 mb-4">
//                 Roman Transliteration
//               </h3>
//               <div className="space-y-2">
//                 {transliterationLines.map((line, index) => (
//                   <p key={index} className="text-gray-700 leading-relaxed">
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Audio Tab */}
//           {activeTab === 'audio' && poem.audioUrl && (
//             <motion.div
//               key="audio"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
//             >
//               <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Volume2 className="h-12 w-12 text-primary-600" />
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Audio Narration
//               </h3>
//               <p className="text-gray-500 mb-4">
//                 Listen to this poem recited by professional narrators
//               </p>
//               <audio controls className="w-full max-w-md mx-auto">
//                 <source src={poem.audioUrl} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </motion.div>
//           )}

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100"
//             >
//               <div className="flex items-center space-x-2 mb-4">
//                 <Sparkles className="h-5 w-5 text-primary-600" />
//                 <h3 className="font-semibold text-gray-900">
//                   AI Literary Analysis
//                 </h3>
//               </div>
//               {poem.aiExplanation?.summary ? (
//                 <div className="space-y-4">
//                   <p className="text-gray-700 leading-relaxed">{poem.aiExplanation.summary}</p>
//                   {poem.aiExplanation.themes?.length > 0 && (
//                     <div>
//                       <h4 className="font-medium text-gray-800 mb-2">Themes:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {poem.aiExplanation.themes.map((theme, i) => (
//                           <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
//                             {theme}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {poem.aiExplanation.literaryDevices?.length > 0 && (
//                     <div>
//                       <h4 className="font-medium text-gray-800 mb-2">Literary Devices:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {poem.aiExplanation.literaryDevices.map((device, i) => (
//                           <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
//                             {device}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-gray-600">
//                   AI explanation will be available soon.
//                 </p>
//               )}
//               <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-primary-200 text-sm text-gray-500">
//                 <Sparkles className="h-4 w-4" />
//                 <span>Powered by AI</span>
//                 <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">Beta</span>
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">
//               Related Poems
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {relatedPoems.slice(0, 4).map((related) => (
//                 <Link
//                   key={related._id}
//                   to={`/poem/${related.slug}`}
//                   className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
//                 >
//                   <h4 className="font-medium text-gray-900">{related.title}</h4>
//                   <p className="text-sm text-gray-500">
//                     {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
//                   </p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <Eye className="h-3 w-3" />
//                       {related.stats?.views?.toLocaleString() || 0}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Heart className="h-3 w-3" />
//                       {related.stats?.likes?.toLocaleString() || 0}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Comments Section */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <MessageCircle className="h-5 w-5 text-primary-600" />
//             Comments ({poem.stats?.comments || 0})
//           </h3>
          
//           {user ? (
//             <div className="flex items-start gap-3 mb-6">
//               <img 
//                 src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div className="flex-1">
//                 <textarea
//                   placeholder="Write a comment..."
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//                   rows="3"
//                 />
//                 <div className="flex justify-end mt-2">
//                   <button className="btn-primary text-sm py-1.5 px-4">
//                     Post Comment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-6 bg-gray-50 rounded-lg">
//               <p className="text-gray-500 mb-3">Please login to leave a comment</p>
//               <Link to="/login" className="btn-primary text-sm">
//                 Login
//               </Link>
//             </div>
//           )}
          
//           <div className="space-y-4">
//             <p className="text-center text-gray-400 text-sm py-4">
//               No comments yet. Be the first to comment!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PoetryDetailPage









// client/src/pages/public/PoetryDetailPage.jsx
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
  Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
  AlertCircle, Headphones, Eye, Calendar, FileText
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import poemAPI from '../../api/poemAPI'

const PoetryDetailPage = () => {
  // Get slug from URL params
  const { slug } = useParams()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  
  const [activeTab, setActiveTab] = useState('poem')

  // Fetch poem data using slug
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['poem', slug],
    queryFn: () => poemAPI.getPoem(slug),
    enabled: !!slug,
    retry: 1
  })

  // FIX: Extract poem from the response structure - API returns { success, data: { data: poem } }
  // The poem data is at response?.data?.data or response?.data
  const poem = response?.data?.data || response?.data || response

  // Debug log to see what we're getting
  console.log('API Response:', response)
  console.log('Extracted Poem:', poem)

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: () => poemAPI.likePoem(poem?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['poem', slug])
      toast.success('Updated')
    },
    onError: () => toast.error('Failed to update like')
  })

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => poemAPI.bookmarkPoem(poem?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['poem', slug])
      toast.success('Updated')
    },
    onError: () => toast.error('Failed to update bookmark')
  })

  // Fetch related poems
  const { data: relatedResponse } = useQuery({
    queryKey: ['related-poems', poem?._id],
    queryFn: () => poemAPI.getRelatedPoems(slug),
    enabled: !!slug && !!poem?._id
  })

  const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

  // Helper function to safely format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Date unknown'
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (e) {
      return 'Date unknown'
    }
  }

  // Helper function to safely get author name
  const getAuthorName = () => {
    if (!poem?.author) return 'Unknown Author'
    if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
    if (typeof poem.author === 'string') return poem.author
    return 'Unknown Author'
  }

  // Helper function to safely get author slug
  const getAuthorSlug = () => {
    if (!poem?.author) return '#'
    if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
    return '#'
  }

  // Helper function to safely get genre
  const getGenre = () => {
    if (!poem?.genre) return 'Poem'
    return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
  }

  // Helper function to safely get language
  const getLanguage = () => {
    const lang = poem?.language
    if (!lang) return 'Urdu'
    if (lang === 'urdu') return 'Urdu'
    if (lang === 'hindi') return 'Hindi'
    if (lang === 'english') return 'English'
    return lang.charAt(0).toUpperCase() + lang.slice(1)
  }

  // Helper function to get content lines - FIX: Use contentUrdu or content
  const getContentLines = () => {
    const content = poem?.contentUrdu || poem?.content || ''
    if (!content) return []
    return content.split('\n').filter(line => line.trim() !== '')
  }

  // Helper function to get translation lines
  const getTranslationLines = () => {
    const translation = poem?.translation?.english || ''
    if (!translation) return []
    return translation.split('\n').filter(line => line.trim() !== '')
  }

  // Helper function to get transliteration lines
  const getTransliterationLines = () => {
    const transliteration = poem?.transliteration || ''
    if (!transliteration) return []
    return transliteration.split('\n').filter(line => line.trim() !== '')
  }

  // Check if user has interacted with this poem
  const isLiked = poem?.userInteraction?.isLiked || false
  const isBookmarked = poem?.userInteraction?.isBookmarked || false

  // Handle like
  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like poems')
      return
    }
    likeMutation.mutate()
  }

  // Handle bookmark
  const handleBookmark = () => {
    if (!user) {
      toast.error('Please login to bookmark poems')
      return
    }
    bookmarkMutation.mutate()
  }

  // Handle share
  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  // Get content lines
  const contentLines = getContentLines()
  const translationLines = getTranslationLines()
  const transliterationLines = getTransliterationLines()

  // Tabs configuration - Only show tabs that have content
  const tabs = [
    { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
    { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
    { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: transliterationLines.length > 0 },
    { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl },
    { id: 'ai', label: 'AI Analysis', icon: Sparkles, show: true }
  ]

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading poem...</p>
        </div>
      </div>
    )
  }

  // Error state - poem not found
  if (error || !poem) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Poem Not Found</h1>
          <p className="text-gray-500 mb-6">
            The poem you are looking for does not exist or has been removed.
          </p>
          <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Poetry</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/poetry" 
            className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Poetry</span>
          </Link>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Eye className="h-3 w-3" />
            <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
              {getGenre()}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              {getLanguage()}
            </span>
            {poem.era && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
                {poem.era}
              </span>
            )}
          </div>
          
          {/* FIX: Show actual title, not "Untitled" */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {poem.title || poem.contentUrdu?.split('\n')[0] || 'Untitled'}
          </h1>
          
          {/* Show Urdu title if available */}
          {poem.contentUrdu && (
            <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">
              {poem.contentUrdu.split('\n')[0]}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link 
              to={`/author/${getAuthorSlug()}`} 
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{getAuthorName()}</span>
            </Link>
            <span className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(poem.createdAt)}</span>
            </span>
          </div>
        </motion.div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-50 text-red-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
              <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
            </button>
            
            <button
              onClick={handleBookmark}
              disabled={bookmarkMutation.isPending}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
              <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
            </button>
            
            <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
            {poem.audioUrl && (
              <button 
                onClick={() => setActiveTab('audio')}
                className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span className="text-sm">Listen</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs - Only show tabs that have content */}
        <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
          {tabs.filter(tab => tab.show).map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {/* Poem Tab */}
          {activeTab === 'poem' && (
            <motion.div
              key="poem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Urdu/Persian Script */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-center space-y-3" dir="rtl">
                  {contentLines.length > 0 ? (
                    contentLines.map((line, index) => (
                      <p key={index} className="urdu-text text-xl md:text-2xl text-gray-800 leading-loose">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No content available</p>
                  )}
                </div>
              </div>
              
              {/* Roman/English Transliteration */}
              {transliterationLines.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="text-center space-y-2">
                    {transliterationLines.map((line, index) => (
                      <p key={index} className="text-lg text-gray-600 italic leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Translation Tab */}
          {activeTab === 'translation' && translationLines.length > 0 && (
            <motion.div
              key="translation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary-600" />
                <span>English Translation</span>
              </h3>
              <div className="space-y-3">
                {translationLines.map((line, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Transliteration Tab */}
          {activeTab === 'transliteration' && transliterationLines.length > 0 && (
            <motion.div
              key="transliteration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-4">
                Roman Transliteration
              </h3>
              <div className="space-y-2">
                {transliterationLines.map((line, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Audio Tab */}
          {activeTab === 'audio' && poem.audioUrl && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Audio Narration
              </h3>
              <p className="text-gray-500 mb-4">
                Listen to this poem recited by professional narrators
              </p>
              <audio controls className="w-full max-w-md mx-auto">
                <source src={poem.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </motion.div>
          )}

          {/* AI Analysis Tab */}
          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900">
                  AI Literary Analysis
                </h3>
              </div>
              {poem.aiExplanation?.summary ? (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{poem.aiExplanation.summary}</p>
                  {poem.aiExplanation.themes?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Themes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {poem.aiExplanation.themes.map((theme, i) => (
                          <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {poem.aiExplanation.literaryDevices?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Literary Devices:</h4>
                      <div className="flex flex-wrap gap-2">
                        {poem.aiExplanation.literaryDevices.map((device, i) => (
                          <span key={i} className="px-2 py-1 bg-white rounded-full text-sm text-primary-700">
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">
                  AI explanation will be available soon.
                </p>
              )}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-primary-200 text-sm text-gray-500">
                <Sparkles className="h-4 w-4" />
                <span>Powered by AI</span>
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">Beta</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Poems */}
        {relatedPoems.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">
              Related Poems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPoems.slice(0, 4).map((related) => (
                <Link
                  key={related._id}
                  to={`/poem/${related.slug}`}
                  className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <h4 className="font-medium text-gray-900">{related.title}</h4>
                  <p className="text-sm text-gray-500">
                    {typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {related.stats?.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {related.stats?.likes?.toLocaleString() || 0}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary-600" />
            Comments ({poem.stats?.comments || 0})
          </h3>
          
          {user ? (
            <div className="flex items-start gap-3 mb-6">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Write a comment..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button className="btn-primary text-sm py-1.5 px-4">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-3">Please login to leave a comment</p>
              <Link to="/login" className="btn-primary text-sm">
                Login
              </Link>
            </div>
          )}
          
          <div className="space-y-4">
            <p className="text-center text-gray-400 text-sm py-4">
              No comments yet. Be the first to comment!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoetryDetailPage