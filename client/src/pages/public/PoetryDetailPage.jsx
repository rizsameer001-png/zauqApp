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









// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
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
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')

//   // Fetch poem data using slug
//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   // FIX: Extract poem from the response structure - API returns { success, data: { data: poem } }
//   // The poem data is at response?.data?.data or response?.data
//   const poem = response?.data?.data || response?.data || response

//   // Debug log to see what we're getting
//   console.log('API Response:', response)
//   console.log('Extracted Poem:', poem)

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
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
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

//   // Helper function to get content lines - FIX: Use contentUrdu or content
//   const getContentLines = () => {
//     const content = poem?.contentUrdu || poem?.content || ''
//     if (!content) return []
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

//   // Get content lines
//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   // Tabs configuration - Only show tabs that have content
//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: transliterationLines.length > 0 },
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
          
//           {/* FIX: Show actual title, not "Untitled" */}
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || poem.contentUrdu?.split('\n')[0] || 'Untitled'}
//           </h1>
          
//           {/* Show Urdu title if available */}
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
//Key AI Enhancements Added
// 1. AI Analysis Tab (Line 320-420)
// Fetches AI analysis when tab is clicked

// Displays themes, tone, sentiment, emotions, meaning, literary devices

// Includes copy to clipboard functionality

// Expandable/collapsible view

// 2. Sentiment Analysis (Line 99-130)
// Automatic sentiment detection on page load

// Shows mood badge in header (Joyful/Melancholic/Contemplative)

// Displays confidence percentage

// 3. Theme Analysis (Line 133-145)
// Extracts and displays poem themes

// Shows theme tags with visual indicators

// 4. Enhanced UI Elements
// Sentiment badge in header

// AI analysis tab with loading states

// Copy analysis to clipboard

// Visual indicators for emotions and literary devices

// 5. Multi-AI Provider Support
// Fallback between AI providers

// Shows which AI provider generated the analysis

// Caching to prevent duplicate API calls
// import React, { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'
// import aiAPI from '../../api/aiAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [sentiment, setSentiment] = useState(null)
//   const [themes, setThemes] = useState(null)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch AI analysis when on AI tab
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis) return
    
//     setAiLoading(true)
//     try {
//       const result = await aiAPI.analyzePoem({ 
//         poemText: poem?.contentUrdu || poem?.content, 
//         language: poem?.language || 'urdu' 
//       })
      
//       if (result.success) {
//         setAiAnalysis(result.data.analysis)
//         toast.success(`Analysis by ${result.data.provider}`)
//       }
//     } catch (error) {
//       console.error('AI analysis error:', error)
//       toast.error('Failed to load AI analysis')
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Fetch sentiment analysis
//   const fetchSentiment = async () => {
//     if (sentiment) return
    
//     try {
//       const result = await aiAPI.getSentiment(slug)
//       if (result.success) {
//         setSentiment(result.data)
//       }
//     } catch (error) {
//       console.error('Sentiment analysis error:', error)
//     }
//   }

//   // Fetch theme analysis
//   const fetchThemes = async () => {
//     if (themes) return
    
//     try {
//       const result = await aiAPI.getThemes(slug)
//       if (result.success) {
//         setThemes(result.data)
//       }
//     } catch (error) {
//       console.error('Theme analysis error:', error)
//     }
//   }

//   // Load AI features when poem loads
//   useEffect(() => {
//     if (poem?._id) {
//       fetchSentiment()
//       fetchThemes()
//     }
//   }, [poem?._id])

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
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     const content = poem?.contentUrdu || poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const transliteration = poem?.transliteration || ''
//     if (!transliteration) return []
//     return transliteration.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
    
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title}

// 🎭 Sentiment: ${sentiment?.sentiment || 'N/A'}
// 💭 Mood: ${sentiment?.dominantEmotion || 'N/A'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by AI
//     `.trim()
    
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied to clipboard!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: transliterationLines.length > 0 },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

//   // Get sentiment icon and color
//   const getSentimentDisplay = () => {
//     if (!sentiment) return null
    
//     const config = {
//       positive: { icon: Smile, color: 'text-green-600', bg: 'bg-green-100', label: 'Joyful' },
//       negative: { icon: Frown, color: 'text-red-600', bg: 'bg-red-100', label: 'Melancholic' },
//       neutral: { icon: Meh, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Contemplative' }
//     }
    
//     const type = sentiment.sentiment || 'neutral'
//     const Icon = config[type].icon
    
//     return (
//       <div className={`flex items-center gap-2 px-3 py-1.5 ${config[type].bg} rounded-full`}>
//         <Icon className={`h-4 w-4 ${config[type].color}`} />
//         <span className={`text-sm font-medium ${config[type].color}`}>
//           {config[type].label}
//         </span>
//         {sentiment.confidence && (
//           <span className="text-xs text-gray-500 ml-1">
//             ({Math.round(sentiment.confidence)}%)
//           </span>
//         )}
//       </div>
//     )
//   }

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
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {getGenre()}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {getLanguage()}
//               </span>
//               {poem.era && (
//                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                   {poem.era}
//                 </span>
//               )}
//             </div>
//             {getSentimentDisplay()}
//           </div>
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || poem.contentUrdu?.split('\n')[0] || 'Untitled'}
//           </h1>
          
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

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.filter(tab => tab.show).map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => {
//                   setActiveTab(tab.id)
//                   if (tab.id === 'ai') fetchAIAnalysis()
//                 }}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 {tab.id === 'ai' && aiAnalysis && (
//                   <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
//                     Ready
//                   </span>
//                 )}
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

//           {/* AI Analysis Tab - Enhanced */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center">
//                   <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
//                   <p className="text-gray-600">AI is analyzing this poem...</p>
//                   <p className="text-xs text-gray-400 mt-1">Using multi-AI system for best results</p>
//                 </div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   {/* Header */}
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white">
//                         <Brain className="h-5 w-5" />
//                         <h3 className="font-semibold">AI Literary Analysis</h3>
//                         <Sparkles className="h-4 w-4 text-yellow-300" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={copyAnalysisToClipboard}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                           title="Copy analysis"
//                         >
//                           {copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                         <button
//                           onClick={() => setAiExpanded(!aiExpanded)}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                         >
//                           {aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {/* Themes */}
//                       {aiAnalysis.themes?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4 text-purple-500" />
//                             Themes
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.themes.map((theme, i) => (
//                               <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                                 {theme}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Tone & Sentiment */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
//                           <p className="text-gray-800 capitalize">{aiAnalysis.tone || 'Unknown'}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
//                           <div className="flex items-center gap-2">
//                             <span className={`px-2 py-0.5 rounded-full text-xs ${
//                               aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
//                               aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
//                               'bg-gray-100 text-gray-700'
//                             }`}>
//                               {aiAnalysis.sentiment || 'Neutral'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Emotions */}
//                       {aiAnalysis.emotions?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <HeartIcon className="h-4 w-4 text-pink-500" />
//                             Emotions Detected
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.emotions.map((emotion, i) => (
//                               <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
//                                 {emotion}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Meaning */}
//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
//                         <p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p>
//                       </div>
                      
//                       {/* Literary Devices */}
//                       {aiAnalysis.literaryDevices?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.literaryDevices.map((device, i) => (
//                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
//                                 {device}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Rhyme Scheme & Difficulty */}
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
//                         {aiAnalysis.rhymeScheme && (
//                           <div>
//                             <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
//                             <p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p>
//                           </div>
//                         )}
//                         {aiAnalysis.difficulty && (
//                           <div>
//                             <h4 className="text-xs text-gray-500">Difficulty</h4>
//                             <p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Cultural Context */}
//                       {aiAnalysis.culturalContext && (
//                         <div className="bg-amber-50 rounded-lg p-3">
//                           <h4 className="text-xs font-semibold text-amber-700 mb-1">Cultural Context</h4>
//                           <p className="text-sm text-amber-800">{aiAnalysis.culturalContext}</p>
//                         </div>
//                       )}
                      
//                       {/* Footer */}
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
//                         Powered by Multi-AI System • {new Date().toLocaleDateString()}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">AI analysis not available</p>
//                   <button
//                     onClick={fetchAIAnalysis}
//                     className="mt-3 text-sm text-purple-600 hover:text-purple-700"
//                   >
//                     Try again →
//                   </button>
//                 </div>
//               )}
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













// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [sentiment, setSentiment] = useState(null)
//   const [themes, setThemes] = useState(null)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch sentiment analysis
//   const fetchSentiment = async () => {
//     if (!poem?._id) return
//     try {
//       const result = await poemAPI.getPoemSentiment(slug)
//       if (result?.success && result?.data) {
//         setSentiment(result.data)
//       } else if (result?.data) {
//         setSentiment(result.data)
//       }
//     } catch (error) {
//       console.error('Sentiment analysis error:', error)
//     }
//   }

//   // Fetch theme analysis
//   const fetchThemes = async () => {
//     if (!poem?._id) return
//     try {
//       const result = await poemAPI.getPoemThemes(slug)
//       if (result?.success && result?.data) {
//         setThemes(result.data)
//       } else if (result?.data) {
//         setThemes(result.data)
//       }
//     } catch (error) {
//       console.error('Theme analysis error:', error)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
    
//     setAiLoading(true)
//     try {
//       const result = await poemAPI.getAIAnalysis(slug)
//       if (result?.success && result?.data) {
//         setAiAnalysis(result.data)
//       } else if (result?.data) {
//         setAiAnalysis(result.data)
//       }
//       toast.success('AI analysis loaded!')
//     } catch (error) {
//       console.error('AI analysis error:', error)
//       toast.error('Failed to load AI analysis')
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Load analyses when poem loads
//   useEffect(() => {
//     if (poem?._id) {
//       fetchSentiment()
//       fetchThemes()
//     }
//   }, [poem?._id])

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     const content = poem?.contentUrdu || poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const transliteration = poem?.transliteration || ''
//     if (!transliteration) return []
//     return transliteration.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const copyAnalysisToClipboard = () => {
//     const analysis = aiAnalysis || {}
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Sentiment: ${sentiment?.sentiment || analysis.sentiment || 'N/A'}
// 💭 Mood: ${sentiment?.dominantEmotion || analysis.tone || 'N/A'}

// 📚 Themes:
// ${analysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Theme analysis available'}

// 📖 Meaning:
// ${analysis.meaning || 'A reflective poem with deep emotional resonance'}

// ✨ Literary Devices:
// ${analysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Imagery, Metaphor, Rhythm'}

// 🎵 Rhyme Scheme: ${analysis.rhymeScheme || 'Rhythmic pattern'}

// ⭐ Difficulty: ${analysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ZauqApp AI
//     `.trim()
    
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied to clipboard!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: transliterationLines.length > 0 },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

//   // Get sentiment display
//   const getSentimentDisplay = () => {
//     const sentimentData = sentiment || {}
//     const sentimentType = sentimentData.sentiment || 'neutral'
    
//     const config = {
//       positive: { icon: Smile, color: 'text-green-600', bg: 'bg-green-100', label: 'Joyful' },
//       negative: { icon: Frown, color: 'text-red-600', bg: 'bg-red-100', label: 'Melancholic' },
//       neutral: { icon: Meh, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Contemplative' }
//     }
    
//     const type = sentimentType === 'positive' ? 'positive' : sentimentType === 'negative' ? 'negative' : 'neutral'
//     const Icon = config[type].icon
    
//     return (
//       <div className={`flex items-center gap-2 px-3 py-1.5 ${config[type].bg} rounded-full`}>
//         <Icon className={`h-4 w-4 ${config[type].color}`} />
//         <span className={`text-sm font-medium ${config[type].color}`}>
//           {config[type].label}
//         </span>
//         {sentimentData.confidence && (
//           <span className="text-xs text-gray-500 ml-1">
//             ({Math.round(sentimentData.confidence)}%)
//           </span>
//         )}
//       </div>
//     )
//   }

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
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                 {getGenre()}
//               </span>
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 {getLanguage()}
//               </span>
//               {poem.era && (
//                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                   {poem.era}
//                 </span>
//               )}
//             </div>
//             {getSentimentDisplay()}
//           </div>
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || poem.contentUrdu?.split('\n')[0] || 'Untitled'}
//           </h1>
          
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

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.filter(tab => tab.show).map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => {
//                   setActiveTab(tab.id)
//                   if (tab.id === 'ai' && !aiAnalysis && !aiLoading) {
//                     fetchAIAnalysis()
//                   }
//                 }}
//                 className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? 'border-primary-600 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//                 {tab.id === 'ai' && aiAnalysis && (
//                   <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
//                     Ready
//                   </span>
//                 )}
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

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center">
//                   <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
//                   <p className="text-gray-600">AI is analyzing this poem...</p>
//                   <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
//                 </div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   {/* Header */}
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white">
//                         <Brain className="h-5 w-5" />
//                         <h3 className="font-semibold">AI Literary Analysis</h3>
//                         <Sparkles className="h-4 w-4 text-yellow-300" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={copyAnalysisToClipboard}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                           title="Copy analysis"
//                         >
//                           {copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                         <button
//                           onClick={() => setAiExpanded(!aiExpanded)}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                         >
//                           {aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {/* Themes */}
//                       {aiAnalysis.themes?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4 text-purple-500" />
//                             Themes
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.themes.map((theme, i) => (
//                               <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                                 {theme}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Tone & Sentiment */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
//                           <p className="text-gray-800 capitalize">{aiAnalysis.tone || 'Unknown'}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
//                           <div className="flex items-center gap-2">
//                             <span className={`px-2 py-0.5 rounded-full text-xs ${
//                               aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
//                               aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
//                               'bg-gray-100 text-gray-700'
//                             }`}>
//                               {aiAnalysis.sentiment || 'Neutral'}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Emotions */}
//                       {aiAnalysis.emotions?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <HeartIcon className="h-4 w-4 text-pink-500" />
//                             Emotions Detected
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.emotions.map((emotion, i) => (
//                               <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
//                                 {emotion}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Meaning */}
//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
//                         <p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p>
//                       </div>
                      
//                       {/* Literary Devices */}
//                       {aiAnalysis.literaryDevices?.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.literaryDevices.map((device, i) => (
//                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
//                                 {device}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Rhyme Scheme & Difficulty */}
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
//                         {aiAnalysis.rhymeScheme && (
//                           <div>
//                             <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
//                             <p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p>
//                           </div>
//                         )}
//                         {aiAnalysis.difficulty && (
//                           <div>
//                             <h4 className="text-xs text-gray-500">Difficulty</h4>
//                             <p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Footer */}
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
//                         Powered by ZauqApp AI • {new Date(aiAnalysis.analyzedAt || Date.now()).toLocaleDateString()}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">AI analysis not yet generated</p>
//                   <button
//                     onClick={fetchAIAnalysis}
//                     className="mt-3 text-sm text-purple-600 hover:text-purple-700"
//                   >
//                     Generate Analysis →
//                   </button>
//                 </div>
//               )}
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










// // // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
    
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       console.log('🔍 Fetching AI analysis for slug:', slug)
//       const result = await poemAPI.getAIAnalysis(slug)
//       console.log('📦 Full API Response:', result)
      
//       // Check if API call was successful
//       if (!result) {
//         throw new Error('No response from API')
//       }
      
//       // Extract analysis from different response structures
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) {
//         analysisData = result.data.analysis
//         console.log('✅ Found analysis in result.data.analysis')
//       } else if (result?.success && result?.data) {
//         analysisData = result.data
//         console.log('✅ Found analysis in result.data')
//       } else if (result?.analysis) {
//         analysisData = result.analysis
//         console.log('✅ Found analysis in result.analysis')
//       } else if (result?.themes) {
//         analysisData = result
//         console.log('✅ Found analysis directly in response')
//       }
      
//       if (analysisData && analysisData.themes) {
//         console.log('📊 Setting AI analysis:', analysisData)
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery and heartfelt words.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         console.warn('⚠️ No valid analysis data found')
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       console.error('❌ AI analysis error:', error)
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed: ${error.message}`)
      
//       // Don't set fallback - show error state
//       setAiAnalysis(null)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch AI analysis when tab is opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) {
//       fetchAIAnalysis()
//     }
//   }, [activeTab])

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     const content = poem?.contentUrdu || poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const transliteration = poem?.transliteration || ''
//     if (!transliteration) return []
//     return transliteration.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
    
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
    
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied to clipboard!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: transliterationLines.length > 0 },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

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
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || poem.contentUrdu?.split('\n')[0] || 'Untitled'}
//           </h1>
          
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

//         {/* Tabs */}
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
//                 {tab.id === 'ai' && aiAnalysis && (
//                   <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
//                     Ready
//                   </span>
//                 )}
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

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center">
//                   <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
//                   <p className="text-gray-600">AI is analyzing this poem...</p>
//                   <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
//                 </div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   {/* Header */}
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white">
//                         <Brain className="h-5 w-5" />
//                         <h3 className="font-semibold">AI Literary Analysis</h3>
//                         <Sparkles className="h-4 w-4 text-yellow-300" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={copyAnalysisToClipboard}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                           title="Copy analysis"
//                         >
//                           {copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                         <button
//                           onClick={() => setAiExpanded(!aiExpanded)}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                         >
//                           {aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {/* Themes */}
//                       {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4 text-purple-500" />
//                             Themes
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.themes.map((theme, i) => (
//                               <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                                 {theme}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Tone & Sentiment */}
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
//                           <p className="text-gray-800 capitalize">{aiAnalysis.tone}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
//                           <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
//                             aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
//                             aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' :
//                             aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
//                             'bg-gray-100 text-gray-700'
//                           }`}>
//                             {aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : 
//                              aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' :
//                              aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}
//                           </span>
//                         </div>
//                       </div>
                      
//                       {/* Emotions */}
//                       {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <HeartIcon className="h-4 w-4 text-pink-500" />
//                             Emotions Detected
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.emotions.map((emotion, i) => (
//                               <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs capitalize">
//                                 {emotion}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Meaning */}
//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
//                         <p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p>
//                       </div>
                      
//                       {/* Literary Devices */}
//                       {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.literaryDevices.map((device, i) => (
//                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
//                                 {device}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Rhyme Scheme & Difficulty */}
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
//                         <div>
//                           <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
//                           <p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-xs text-gray-500">Difficulty Level</h4>
//                           <p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p>
//                         </div>
//                       </div>
                      
//                       {/* Footer */}
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
//                         Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : analysisError ? (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" />
//                   <p className="text-red-600 mb-2">Failed to load AI analysis</p>
//                   <p className="text-gray-500 text-sm mb-4">{analysisError}</p>
//                   <button
//                     onClick={() => {
//                       setAnalysisError(null)
//                       fetchAIAnalysis()
//                     }}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">AI analysis not yet generated</p>
//                   <button
//                     onClick={fetchAIAnalysis}
//                     className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Generate AI Analysis →
//                   </button>
//                 </div>
//               )}
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
//               <h3 className="font-semibold text-gray-900 mb-2">Audio Narration</h3>
//               <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//               <audio controls className="w-full max-w-md mx-auto">
//                 <source src={poem.audioUrl} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </motion.div>
//           )}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">Related Poems</h3>
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















// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect, useCallback } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon,
//   RefreshCw
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)
  
//   // Transliteration states
//   const [transliteration, setTransliteration] = useState(null)
//   const [transliterationLoading, setTransliterationLoading] = useState(false)
//   const [transliterationError, setTransliterationError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch transliteration on demand
//   const fetchTransliteration = useCallback(async (forceRefresh = false) => {
//     // If already have transliteration from database and not forcing refresh
//     if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
//       setTransliteration(poem.transliteration)
//       return
//     }
    
//     // If already loading, skip
//     if (transliterationLoading) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       console.log('🔤 Fetching transliteration for slug:', slug)
//       const result = await poemAPI.getTransliteration(slug)
      
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         // Update the poem object for future use
//         if (poem) poem.transliteration = result.data
//       } else {
//         throw new Error(result.error || 'Failed to fetch transliteration')
//       }
//     } catch (error) {
//       console.error('❌ Transliteration error:', error)
//       setTransliterationError(error.message)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }, [slug, poem, transliterationLoading])

//   // Generate transliteration manually
//   const generateTransliteration = async () => {
//     if (!poem?._id) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       console.log('🔤 Generating transliteration for poem:', poem._id)
//       const result = await poemAPI.generateTransliteration(poem._id)
      
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         // Update the poem object
//         if (poem) poem.transliteration = result.data
//         toast.success(`Transliteration generated successfully!`)
//       } else {
//         throw new Error(result.error || 'Failed to generate transliteration')
//       }
//     } catch (error) {
//       console.error('❌ Generate transliteration error:', error)
//       setTransliterationError(error.message)
//       toast.error(`Failed to generate transliteration: ${error.message}`)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
    
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       console.log('🔍 Fetching AI analysis for slug:', slug)
//       const result = await poemAPI.getAIAnalysis(slug)
//       console.log('📦 Full API Response:', result)
      
//       if (!result) {
//         throw new Error('No response from API')
//       }
      
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) {
//         analysisData = result.data.analysis
//       } else if (result?.success && result?.data) {
//         analysisData = result.data
//       } else if (result?.analysis) {
//         analysisData = result.analysis
//       } else if (result?.themes) {
//         analysisData = result
//       }
      
//       if (analysisData && analysisData.themes) {
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery and heartfelt words.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       console.error('❌ AI analysis error:', error)
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed: ${error.message}`)
//       setAiAnalysis(null)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch AI analysis when tab is opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) {
//       fetchAIAnalysis()
//     }
//   }, [activeTab])

//   // Auto-fetch transliteration when transliteration tab is opened
//   useEffect(() => {
//     if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
//       fetchTransliteration()
//     }
//   }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     // Get content based on language
//     let content = ''
//     if (poem?.language === 'hindi') {
//       content = poem?.contentHindi || poem?.content || ''
//     } else {
//       content = poem?.contentUrdu || poem?.content || ''
//     }
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const translitText = transliteration || poem?.transliteration || ''
//     if (!translitText) return []
//     return translitText.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
    
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
    
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied to clipboard!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   // Determine if transliteration tab should show (always show if poem has content)
//   const hasTransliteration = poem?.language === 'urdu' || poem?.language === 'hindi'

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: hasTransliteration },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

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
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || 'Untitled'}
//           </h1>
          
//           {poem.language === 'urdu' && poem.contentUrdu && (
//             <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">
//               {poem.contentUrdu.split('\n')[0]}
//             </p>
//           )}
          
//           {poem.language === 'hindi' && poem.contentHindi && (
//             <p className="text-xl text-gray-600 mb-3">
//               {poem.contentHindi.split('\n')[0]}
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

//         {/* Tabs */}
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
//                 {tab.id === 'ai' && aiAnalysis && (
//                   <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
//                     Ready
//                   </span>
//                 )}
//                 {tab.id === 'transliteration' && transliterationLoading && (
//                   <Loader2 className="ml-1 h-3 w-3 animate-spin" />
//                 )}
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
//               <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//                 <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
//                   {contentLines.length > 0 ? (
//                     contentLines.map((line, index) => (
//                       <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 leading-loose`}>
//                         {line}
//                       </p>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 italic">No content available</p>
//                   )}
//                 </div>
//               </div>
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

//           {/* Transliteration Tab - Auto-generated */}
//           {activeTab === 'transliteration' && (
//             <motion.div
//               key="transliteration"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <Mic className="h-5 w-5 text-primary-600" />
//                   <span>Roman Transliteration</span>
//                 </h3>
//                 {!transliterationLoading && !transliteration && (
//                   <button
//                     onClick={generateTransliteration}
//                     className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//                   >
//                     <RefreshCw className="h-3 w-3" />
//                     Generate
//                   </button>
//                 )}
//               </div>
              
//               {transliterationLoading ? (
//                 <div className="text-center py-8">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" />
//                   <p className="text-gray-500">Generating transliteration...</p>
//                   <p className="text-xs text-gray-400 mt-1">Converting {getLanguage()} script to Roman</p>
//                 </div>
//               ) : transliterationError ? (
//                 <div className="text-center py-8">
//                   <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
//                   <p className="text-gray-600 mb-2">Unable to generate transliteration</p>
//                   <p className="text-sm text-gray-400">{transliterationError}</p>
//                   <button
//                     onClick={generateTransliteration}
//                     className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : transliterationLines.length > 0 ? (
//                 <div className="space-y-2">
//                   {transliterationLines.map((line, index) => (
//                     <p key={index} className="text-gray-700 leading-relaxed">
//                       {line}
//                     </p>
//                   ))}
//                   <p className="text-xs text-gray-400 mt-4 pt-2 border-t border-gray-100">
//                     ⓘ Transliteration automatically generated to help with pronunciation
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No transliteration available</p>
//                   <button
//                     onClick={generateTransliteration}
//                     className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
//                   >
//                     Generate Transliteration
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center">
//                   <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
//                   <p className="text-gray-600">AI is analyzing this poem...</p>
//                   <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
//                 </div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white">
//                         <Brain className="h-5 w-5" />
//                         <h3 className="font-semibold">AI Literary Analysis</h3>
//                         <Sparkles className="h-4 w-4 text-yellow-300" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={copyAnalysisToClipboard}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                           title="Copy analysis"
//                         >
//                           {copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                         <button
//                           onClick={() => setAiExpanded(!aiExpanded)}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                         >
//                           {aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4 text-purple-500" />
//                             Themes
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.themes.map((theme, i) => (
//                               <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                                 {theme}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
//                           <p className="text-gray-800 capitalize">{aiAnalysis.tone}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
//                           <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
//                             aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
//                             aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' :
//                             aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
//                             'bg-gray-100 text-gray-700'
//                           }`}>
//                             {aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : 
//                              aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' :
//                              aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}
//                           </span>
//                         </div>
//                       </div>
                      
//                       {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <HeartIcon className="h-4 w-4 text-pink-500" />
//                             Emotions Detected
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.emotions.map((emotion, i) => (
//                               <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs capitalize">
//                                 {emotion}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
//                         <p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p>
//                       </div>
                      
//                       {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.literaryDevices.map((device, i) => (
//                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
//                                 {device}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
//                         <div>
//                           <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
//                           <p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-xs text-gray-500">Difficulty Level</h4>
//                           <p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p>
//                         </div>
//                       </div>
                      
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
//                         Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : analysisError ? (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" />
//                   <p className="text-red-600 mb-2">Failed to load AI analysis</p>
//                   <p className="text-gray-500 text-sm mb-4">{analysisError}</p>
//                   <button
//                     onClick={() => {
//                       setAnalysisError(null)
//                       fetchAIAnalysis()
//                     }}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">AI analysis not yet generated</p>
//                   <button
//                     onClick={fetchAIAnalysis}
//                     className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Generate AI Analysis →
//                   </button>
//                 </div>
//               )}
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
//               <h3 className="font-semibold text-gray-900 mb-2">Audio Narration</h3>
//               <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//               <audio controls className="w-full max-w-md mx-auto">
//                 <source src={poem.audioUrl} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </motion.div>
//           )}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">Related Poems</h3>
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
















// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect, useCallback } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon,
//   RefreshCw
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)
  
//   // Transliteration states
//   const [transliteration, setTransliteration] = useState(null)
//   const [transliterationLoading, setTransliterationLoading] = useState(false)
//   const [transliterationError, setTransliterationError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch transliteration on demand
//   const fetchTransliteration = useCallback(async (forceRefresh = false) => {
//     // If already have transliteration from database and not forcing refresh
//     if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
//       setTransliteration(poem.transliteration)
//       return
//     }
    
//     // If already loading, skip
//     if (transliterationLoading) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       console.log('🔤 Fetching transliteration for slug:', slug)
//       const result = await poemAPI.getTransliteration(slug)
      
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         // Update the poem object for future use
//         if (poem) poem.transliteration = result.data
//         console.log('✅ Transliteration loaded:', result.method)
//       } else {
//         throw new Error(result.error || 'Failed to fetch transliteration')
//       }
//     } catch (error) {
//       console.error('❌ Transliteration error:', error)
//       setTransliterationError(error.message)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }, [slug, poem, transliterationLoading])

//   // Generate transliteration manually
//   const generateTransliteration = async () => {
//     if (!poem?._id) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       console.log('🔤 Generating transliteration for poem:', poem._id)
//       const result = await poemAPI.generateTransliteration(poem._id)
      
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//         toast.success(`Transliteration generated successfully!`)
//         console.log('✅ Transliteration generated:', result.method)
//       } else {
//         throw new Error(result.error || 'Failed to generate transliteration')
//       }
//     } catch (error) {
//       console.error('❌ Generate transliteration error:', error)
//       setTransliterationError(error.message)
//       toast.error(`Failed to generate transliteration: ${error.message}`)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
    
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       console.log('🔍 Fetching AI analysis for slug:', slug)
//       const result = await poemAPI.getAIAnalysis(slug)
      
//       if (!result) {
//         throw new Error('No response from API')
//       }
      
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) {
//         analysisData = result.data.analysis
//       } else if (result?.success && result?.data) {
//         analysisData = result.data
//       } else if (result?.analysis) {
//         analysisData = result.analysis
//       } else if (result?.themes) {
//         analysisData = result
//       }
      
//       if (analysisData && analysisData.themes) {
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery and heartfelt words.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       console.error('❌ AI analysis error:', error)
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed: ${error.message}`)
//       setAiAnalysis(null)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch when tabs are opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) {
//       fetchAIAnalysis()
//     }
//   }, [activeTab])

//   useEffect(() => {
//     if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
//       fetchTransliteration()
//     }
//   }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

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

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     if (lang === 'urdu') return 'Urdu'
//     if (lang === 'hindi') return 'Hindi'
//     if (lang === 'english') return 'English'
//     return lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     let content = ''
//     if (poem?.language === 'hindi') {
//       content = poem?.contentHindi || poem?.content || ''
//     } else if (poem?.language === 'urdu') {
//       content = poem?.contentUrdu || poem?.content || ''
//     } else {
//       content = poem?.content || ''
//     }
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const translitText = transliteration || poem?.transliteration || ''
//     if (!translitText) return []
//     return translitText.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like poems')
//       return
//     }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark poems')
//       return
//     }
//     bookmarkMutation.mutate()
//   }

//   const handleShare = async () => {
//     const url = window.location.href
//     try {
//       await navigator.clipboard.writeText(url)
//       toast.success('Link copied to clipboard!')
//     } catch (err) {
//       toast.error('Failed to copy link')
//     }
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
    
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
    
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied to clipboard!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: true },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

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
          
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             {poem.title || 'Untitled'}
//           </h1>
          
//           {poem.language === 'urdu' && poem.contentUrdu && (
//             <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">
//               {poem.contentUrdu.split('\n')[0]}
//             </p>
//           )}
          
//           {poem.language === 'hindi' && poem.contentHindi && (
//             <p className="text-xl text-gray-600 mb-3">
//               {poem.contentHindi.split('\n')[0]}
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

//         {/* Tabs */}
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
//                 {tab.id === 'ai' && aiAnalysis && (
//                   <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
//                     Ready
//                   </span>
//                 )}
//                 {tab.id === 'transliteration' && transliterationLoading && (
//                   <Loader2 className="ml-1 h-3 w-3 animate-spin" />
//                 )}
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
//               <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//                 <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
//                   {contentLines.length > 0 ? (
//                     contentLines.map((line, index) => (
//                       <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 leading-loose`}>
//                         {line}
//                       </p>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 italic">No content available</p>
//                   )}
//                 </div>
//               </div>
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
//           {activeTab === 'transliteration' && (
//             <motion.div
//               key="transliteration"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                   <Mic className="h-5 w-5 text-primary-600" />
//                   <span>Roman Transliteration</span>
//                 </h3>
//                 {!transliterationLoading && (
//                   <button
//                     onClick={generateTransliteration}
//                     className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//                     disabled={transliterationLoading}
//                   >
//                     <RefreshCw className={`h-3 w-3 ${transliterationLoading ? 'animate-spin' : ''}`} />
//                     {transliteration ? 'Regenerate' : 'Generate'}
//                   </button>
//                 )}
//               </div>
              
//               {transliterationLoading ? (
//                 <div className="text-center py-8">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" />
//                   <p className="text-gray-500">Generating transliteration...</p>
//                   <p className="text-xs text-gray-400 mt-1">Converting {getLanguage()} script to Roman</p>
//                 </div>
//               ) : transliterationError ? (
//                 <div className="text-center py-8">
//                   <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
//                   <p className="text-gray-600 mb-2">Unable to generate transliteration</p>
//                   <p className="text-sm text-gray-400">{transliterationError}</p>
//                   <button
//                     onClick={generateTransliteration}
//                     className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : transliterationLines.length > 0 ? (
//                 <div className="space-y-3">
//                   {transliterationLines.map((line, index) => (
//                     <p key={index} className="text-gray-700 leading-relaxed">
//                       {line}
//                     </p>
//                   ))}
//                   <div className="mt-4 pt-3 border-t border-gray-100">
//                     <p className="text-xs text-gray-400 flex items-center gap-1">
//                       <Sparkles className="h-3 w-3" />
//                       Transliteration automatically generated to help with pronunciation
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <Mic className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">No transliteration available</p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Click the Generate button above to create Roman script transliteration
//                   </p>
//                   <button
//                     onClick={generateTransliteration}
//                     className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
//                   >
//                     Generate Transliteration
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div
//               key="ai"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center">
//                   <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
//                   <p className="text-gray-600">AI is analyzing this poem...</p>
//                   <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
//                 </div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white">
//                         <Brain className="h-5 w-5" />
//                         <h3 className="font-semibold">AI Literary Analysis</h3>
//                         <Sparkles className="h-4 w-4 text-yellow-300" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={copyAnalysisToClipboard}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                           title="Copy analysis"
//                         >
//                           {copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                         </button>
//                         <button
//                           onClick={() => setAiExpanded(!aiExpanded)}
//                           className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
//                         >
//                           {aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <TrendingUp className="h-4 w-4 text-purple-500" />
//                             Themes
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.themes.map((theme, i) => (
//                               <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
//                                 {theme}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4>
//                           <p className="text-gray-800 capitalize">{aiAnalysis.tone}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4>
//                           <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
//                             aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
//                             aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' :
//                             aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
//                             'bg-gray-100 text-gray-700'
//                           }`}>
//                             {aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : 
//                              aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' :
//                              aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}
//                           </span>
//                         </div>
//                       </div>
                      
//                       {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                             <HeartIcon className="h-4 w-4 text-pink-500" />
//                             Emotions Detected
//                           </h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.emotions.map((emotion, i) => (
//                               <span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs capitalize">
//                                 {emotion}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4>
//                         <p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p>
//                       </div>
                      
//                       {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {aiAnalysis.literaryDevices.map((device, i) => (
//                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
//                                 {device}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
//                         <div>
//                           <h4 className="text-xs text-gray-500">Rhyme Scheme</h4>
//                           <p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-xs text-gray-500">Difficulty Level</h4>
//                           <p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p>
//                         </div>
//                       </div>
                      
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
//                         Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : analysisError ? (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" />
//                   <p className="text-red-600 mb-2">Failed to load AI analysis</p>
//                   <p className="text-gray-500 text-sm mb-4">{analysisError}</p>
//                   <button
//                     onClick={() => {
//                       setAnalysisError(null)
//                       fetchAIAnalysis()
//                     }}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
//                   <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                   <p className="text-gray-500">AI analysis not yet generated</p>
//                   <button
//                     onClick={fetchAIAnalysis}
//                     className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                   >
//                     Generate AI Analysis →
//                   </button>
//                 </div>
//               )}
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
//               <h3 className="font-semibold text-gray-900 mb-2">Audio Narration</h3>
//               <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//               <audio controls className="w-full max-w-md mx-auto">
//                 <source src={poem.audioUrl} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </motion.div>
//           )}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">Related Poems</h3>
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
























// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Smile, Frown, Meh, Heart as HeartIcon,
//   RefreshCw, Facebook, Twitter, Linkedin, Send, Flag,
//   MoreVertical, X, Trash2, Edit2, Youtube, Instagram
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'
// import commentAPI from '../../api/commentAPI'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)
//   const [commentText, setCommentText] = useState('')
//   const [editingComment, setEditingComment] = useState(null)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [reportReason, setReportReason] = useState('')
//   const [showMoreMenu, setShowMoreMenu] = useState(null)
  
//   // Transliteration states
//   const [transliteration, setTransliteration] = useState(null)
//   const [transliterationLoading, setTransliterationLoading] = useState(false)
//   const [transliterationError, setTransliterationError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch comments
//   const { data: commentsResponse, refetch: refetchComments } = useQuery({
//     queryKey: ['comments', poem?._id],
//     queryFn: () => commentAPI.getComments(poem?._id),
//     enabled: !!poem?._id,
//   })
  
//   const comments = commentsResponse?.data?.data || commentsResponse?.data || commentsResponse || []

//   // Add comment mutation
//   const addCommentMutation = useMutation({
//     mutationFn: (text) => commentAPI.addComment(poem?._id, text),
//     onSuccess: () => {
//       toast.success('Comment added successfully!')
//       setCommentText('')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to add comment')
//   })

//   // Update comment mutation
//   const updateCommentMutation = useMutation({
//     mutationFn: ({ commentId, text }) => commentAPI.updateComment(poem?._id, commentId, text),
//     onSuccess: () => {
//       toast.success('Comment updated!')
//       setEditingComment(null)
//       refetchComments()
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to update comment')
//   })

//   // Delete comment mutation
//   const deleteCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.deleteComment(poem?._id, commentId),
//     onSuccess: () => {
//       toast.success('Comment deleted')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete comment')
//   })

//   // Like comment mutation
//   const likeCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.likeComment(poem?._id, commentId),
//     onSuccess: () => refetchComments(),
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to like comment')
//   })

//   // Report comment mutation
//   const reportCommentMutation = useMutation({
//     mutationFn: ({ commentId, reason }) => commentAPI.reportComment(poem?._id, commentId, reason),
//     onSuccess: () => {
//       toast.success('Comment reported for review')
//       setShowReportModal(false)
//       setReportReason('')
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to report comment')
//   })

//   // Fetch transliteration
//   const fetchTransliteration = useCallback(async (forceRefresh = false) => {
//     if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
//       setTransliteration(poem.transliteration)
//       return
//     }
//     if (transliterationLoading) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.getTransliteration(slug)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//       } else {
//         throw new Error(result.error || 'Failed to fetch transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }, [slug, poem, transliterationLoading])

//   // Generate transliteration
//   const generateTransliteration = async () => {
//     if (!poem?._id) return
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.generateTransliteration(poem._id)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//         toast.success(`Transliteration generated!`)
//       } else {
//         throw new Error(result.error || 'Failed to generate transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//       toast.error(`Failed: ${error.message}`)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       const result = await poemAPI.getAIAnalysis(slug)
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) analysisData = result.data.analysis
//       else if (result?.success && result?.data) analysisData = result.data
//       else if (result?.analysis) analysisData = result.analysis
//       else if (result?.themes) analysisData = result
      
//       if (analysisData && analysisData.themes) {
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed`)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch when tabs are opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) fetchAIAnalysis()
//   }, [activeTab])

//   useEffect(() => {
//     if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
//       fetchTransliteration()
//     }
//   }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

//   // Share handlers
//   const shareHandlers = {
//     facebook: () => {
//       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     twitter: () => {
//       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this beautiful poem: ${poem?.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     linkedin: () => {
//       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     whatsapp: () => {
//       window.open(`https://wa.me/?text=${encodeURIComponent(`${poem?.title}\n${window.location.href}`)}`, '_blank')
//     },
//     copy: async () => {
//       await navigator.clipboard.writeText(window.location.href)
//       toast.success('Link copied to clipboard!')
//       setShowShareModal(false)
//     }
//   }

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date unknown'
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) return 'Date unknown'
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//     } catch (e) {
//       return 'Date unknown'
//     }
//   }

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffMs = now - date
//     const diffMins = Math.floor(diffMs / 60000)
//     const diffHours = Math.floor(diffMs / 3600000)
//     const diffDays = Math.floor(diffMs / 86400000)
    
//     if (diffMins < 1) return 'Just now'
//     if (diffMins < 60) return `${diffMins} min ago`
//     if (diffHours < 24) return `${diffHours} hour ago`
//     return `${diffDays} day ago`
//   }

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     const langs = { urdu: 'Urdu', hindi: 'Hindi', english: 'English' }
//     return langs[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     let content = ''
//     if (poem?.language === 'hindi') content = poem?.contentHindi || poem?.content || ''
//     else if (poem?.language === 'urdu') content = poem?.contentUrdu || poem?.content || ''
//     else content = poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const translitText = transliteration || poem?.transliteration || ''
//     if (!translitText) return []
//     return translitText.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) { toast.error('Please login to like poems'); return }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) { toast.error('Please login to bookmark poems'); return }
//     bookmarkMutation.mutate()
//   }

//   const handleAddComment = () => {
//     if (!user) { toast.error('Please login to comment'); return }
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     addCommentMutation.mutate(commentText.trim())
//   }

//   const handleUpdateComment = () => {
//     if (!editingComment) return
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     updateCommentMutation.mutate({ commentId: editingComment._id, text: commentText.trim() })
//   }

//   const handleEditComment = (comment) => {
//     setEditingComment(comment)
//     setCommentText(comment.text)
//   }

//   const handleCancelEdit = () => {
//     setEditingComment(null)
//     setCommentText('')
//   }

//   const handleDeleteComment = (commentId) => {
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       deleteCommentMutation.mutate(commentId)
//     }
//   }

//   const handleReportComment = (commentId, reason) => {
//     reportCommentMutation.mutate({ commentId, reason })
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: true },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

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

//   if (error || !poem) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Poem Not Found</h1>
//           <p className="text-gray-500 mb-6">The poem you are looking for does not exist or has been removed.</p>
//           <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Poetry</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50">
//       {/* Ad Banner - Top */}
//       <div className="max-w-7xl mx-auto px-4 mb-6">
//         <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-200">
//           <p className="text-xs text-gray-400 mb-1">Advertisement</p>
//           <div className="h-20 flex items-center justify-center">
//             <span className="text-gray-500">Your Ad Here</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center justify-between mb-6">
//           <Link to="/poetry" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Back to Poetry</span>
//           </Link>
//           <div className="flex items-center space-x-2 text-sm text-gray-400">
//             <Eye className="h-3 w-3" />
//             <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
//           </div>
//         </div>

//         {/* Header */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
          
//           {poem.language === 'urdu' && poem.contentUrdu && (
//             <p className="urdu-text text-xl text-gray-600 mb-3" dir="rtl">{poem.contentUrdu.split('\n')[0]}</p>
//           )}
//           {poem.language === 'hindi' && poem.contentHindi && (
//             <p className="text-xl text-gray-600 mb-3">{poem.contentHindi.split('\n')[0]}</p>
//           )}
          
//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//             <Link to={`/author/${getAuthorSlug()}`} className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
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
//             <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'}`}>
//               <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
//             </button>
            
//             <button onClick={handleBookmark} disabled={bookmarkMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100 text-gray-600'}`}>
//               <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//               <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//             </button>
            
//             <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//               <MessageCircle className="h-5 w-5" />
//               <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
//             </button>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button onClick={() => setShowShareModal(true)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
//               <Share2 className="h-5 w-5" />
//             </button>
//             {poem.audioUrl && (
//               <button onClick={() => setActiveTab('audio')} className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                 <Play className="h-4 w-4" />
//                 <span className="text-sm">Listen</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Share Modal */}
//         <AnimatePresence>
//           {showShareModal && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
//               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900">Share this poem</h3>
//                   <button onClick={() => setShowShareModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
//                 </div>
//                 <div className="p-4">
//                   <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                     <p className="text-sm text-gray-600 font-medium mb-1">{poem?.title}</p>
//                     <p className="text-xs text-gray-400">by {getAuthorName()}</p>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button onClick={shareHandlers.facebook} className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition"><Facebook className="h-5 w-5" /><span>Facebook</span></button>
//                     <button onClick={shareHandlers.twitter} className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition"><Twitter className="h-5 w-5" /><span>Twitter</span></button>
//                     <button onClick={shareHandlers.linkedin} className="flex items-center justify-center gap-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition"><Linkedin className="h-5 w-5" /><span>LinkedIn</span></button>
//                     <button onClick={shareHandlers.whatsapp} className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition"><Send className="h-5 w-5" /><span>WhatsApp</span></button>
//                   </div>
//                   <div className="mt-3 flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
//                     <input type="text" value={window.location.href} readOnly className="flex-1 text-sm bg-transparent outline-none" />
//                     <button onClick={shareHandlers.copy} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">Copy</button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200">
//           {tabs.filter(tab => tab.show).map((tab) => {
//             const Icon = tab.icon
//             return (
//               <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
//                 <Icon className="h-4 w-4" />
//                 <span>{tab.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Main Content - Same as before, keeping original content display */}
//         <div className="mb-8">
//           {activeTab === 'poem' && (
//             <motion.div key="poem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//               <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//                 <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
//                   {contentLines.length > 0 ? contentLines.map((line, index) => (
//                     <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 leading-loose`}>{line}</p>
//                   )) : <p className="text-gray-500 italic">No content available</p>}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Translation Tab */}
//           {activeTab === 'translation' && translationLines.length > 0 && (
//             <motion.div key="translation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//               <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2"><BookOpen className="h-5 w-5 text-primary-600" /><span>English Translation</span></h3>
//               <div className="space-y-3">{translationLines.map((line, index) => (<p key={index} className="text-gray-700 leading-relaxed">{line}</p>))}</div>
//             </motion.div>
//           )}

//           {/* Transliteration Tab */}
//           {activeTab === 'transliteration' && (
//             <motion.div key="transliteration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Mic className="h-5 w-5 text-primary-600" /><span>Roman Transliteration</span></h3>
//                 {!transliterationLoading && (<button onClick={generateTransliteration} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"><RefreshCw className="h-3 w-3" />{transliteration ? 'Regenerate' : 'Generate'}</button>)}
//               </div>
//               {transliterationLoading ? (
//                 <div className="text-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" /><p className="text-gray-500">Generating transliteration...</p></div>
//               ) : transliterationError ? (
//                 <div className="text-center py-8"><AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" /><p className="text-gray-600 mb-2">Unable to generate transliteration</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Try Again</button></div>
//               ) : transliterationLines.length > 0 ? (
//                 <div className="space-y-3">{transliterationLines.map((line, index) => (<p key={index} className="text-gray-700 leading-relaxed">{line}</p>))}</div>
//               ) : (
//                 <div className="text-center py-8"><Mic className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No transliteration available</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Generate Transliteration</button></div>
//               )}
//             </motion.div>
//           )}

//           {/* AI Analysis Tab */}
//           {activeTab === 'ai' && (
//             <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//               {aiLoading ? (
//                 <div className="bg-white rounded-xl p-12 text-center"><Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" /><p className="text-gray-600">AI is analyzing this poem...</p></div>
//               ) : aiAnalysis ? (
//                 <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
//                   <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-white"><Brain className="h-5 w-5" /><h3 className="font-semibold">AI Literary Analysis</h3><Sparkles className="h-4 w-4 text-yellow-300" /></div>
//                       <div className="flex items-center gap-2">
//                         <button onClick={copyAnalysisToClipboard} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
//                         <button onClick={() => setAiExpanded(!aiExpanded)} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</button>
//                       </div>
//                     </div>
//                   </div>
//                   {aiExpanded && (
//                     <div className="p-6 space-y-5">
//                       {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-purple-500" />Themes</h4><div className="flex flex-wrap gap-2">{aiAnalysis.themes.map((theme, i) => (<span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{theme}</span>))}</div></div>)}
//                       <div className="grid grid-cols-2 gap-4"><div><h4 className="text-sm font-semibold text-gray-700 mb-1">Tone</h4><p className="text-gray-800 capitalize">{aiAnalysis.tone}</p></div><div><h4 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h4><span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' : aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' : aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' : aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}</span></div></div>
//                       {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><HeartIcon className="h-4 w-4 text-pink-500" />Emotions Detected</h4><div className="flex flex-wrap gap-2">{aiAnalysis.emotions.map((emotion, i) => (<span key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs capitalize">{emotion}</span>))}</div></div>)}
//                       <div><h4 className="text-sm font-semibold text-gray-700 mb-2">Meaning & Interpretation</h4><p className="text-gray-600 leading-relaxed">{aiAnalysis.meaning}</p></div>
//                       {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 mb-2">Literary Devices</h4><div className="flex flex-wrap gap-2">{aiAnalysis.literaryDevices.map((device, i) => (<span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">{device}</span>))}</div></div>)}
//                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100"><div><h4 className="text-xs text-gray-500">Rhyme Scheme</h4><p className="text-sm text-gray-700">{aiAnalysis.rhymeScheme}</p></div><div><h4 className="text-xs text-gray-500">Difficulty Level</h4><p className="text-sm text-gray-700 capitalize">{aiAnalysis.difficulty}</p></div></div>
//                       <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}</div>
//                     </div>
//                   )}
//                 </div>
//               ) : analysisError ? (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200"><AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" /><p className="text-red-600 mb-2">Failed to load AI analysis</p><button onClick={() => { setAnalysisError(null); fetchAIAnalysis() }} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Try Again</button></div>
//               ) : (
//                 <div className="bg-white rounded-xl p-8 text-center border border-gray-200"><Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">AI analysis not yet generated</p><button onClick={fetchAIAnalysis} className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg">Generate AI Analysis →</button></div>
//               )}
//             </motion.div>
//           )}

//           {/* Audio Tab */}
//           {activeTab === 'audio' && poem.audioUrl && (
//             <motion.div key="audio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
//               <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4"><Volume2 className="h-12 w-12 text-primary-600" /></div>
//               <h3 className="font-semibold text-gray-900 mb-2">Audio Narration</h3>
//               <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//               <audio controls className="w-full max-w-md mx-auto"><source src={poem.audioUrl} type="audio/mpeg" />Your browser does not support the audio element.</audio>
//             </motion.div>
//           )}
//         </div>

//         {/* Related Poems */}
//         {relatedPoems.length > 0 && (
//           <div className="mb-8">
//             <h3 className="font-semibold text-gray-900 mb-4">Related Poems</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {relatedPoems.slice(0, 4).map((related) => (
//                 <Link key={related._id} to={`/poem/${related.slug}`} className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
//                   <h4 className="font-medium text-gray-900">{related.title}</h4>
//                   <p className="text-sm text-gray-500">{typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400"><Eye className="h-3 w-3" /><span>{related.stats?.views?.toLocaleString() || 0}</span><Heart className="h-3 w-3" /><span>{related.stats?.likes?.toLocaleString() || 0}</span></div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Comments Section */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary-600" />Comments ({poem.stats?.comments || comments.length})</h3>
          
//           {user ? (
//             <div className="mb-6">
//               <div className="flex items-start gap-3">
//                 <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
//                 <div className="flex-1">
//                   <textarea placeholder={editingComment ? "Edit your comment..." : "Write a comment..."} value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none" rows="3" />
//                   <div className="flex justify-end gap-2 mt-2">
//                     {editingComment && (<button onClick={handleCancelEdit} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>)}
//                     <button onClick={editingComment ? handleUpdateComment : handleAddComment} disabled={addCommentMutation.isPending || updateCommentMutation.isPending} className="btn-primary text-sm py-1.5 px-4">{editingComment ? 'Update Comment' : 'Post Comment'}</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
//               <p className="text-gray-500 mb-3">Please login to leave a comment</p>
//               <Link to="/login" className="btn-primary text-sm">Login</Link>
//             </div>
//           )}
          
//           <div className="space-y-4">
//             {comments.length === 0 ? (
//               <p className="text-center text-gray-400 text-sm py-4">No comments yet. Be the first to comment!</p>
//             ) : (
//               comments.map((comment) => (
//                 <div key={comment._id} className="p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <img src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.name}&background=6366f1&color=fff`} alt={comment.user?.name} className="w-8 h-8 rounded-full object-cover" />
//                       <div>
//                         <p className="font-medium text-gray-900 text-sm">{comment.user?.name || 'Anonymous'}</p>
//                         <p className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</p>
//                       </div>
//                     </div>
//                     <div className="relative">
//                       <button onClick={() => setShowMoreMenu(showMoreMenu === comment._id ? null : comment._id)} className="p-1 rounded-lg hover:bg-gray-200 transition"><MoreVertical className="h-4 w-4 text-gray-500" /></button>
//                       {showMoreMenu === comment._id && (
//                         <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                           <button onClick={() => likeCommentMutation.mutate(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Heart className="h-3 w-3" />Like</button>
//                           {user && (user._id === comment.user?._id || user.role === 'admin') && (<><button onClick={() => handleEditComment(comment)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Edit2 className="h-3 w-3" />Edit</button><button onClick={() => handleDeleteComment(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2"><Trash2 className="h-3 w-3" />Delete</button></>)}
//                           <button onClick={() => { setShowReportModal(true); setShowMoreMenu(null); setReportReason(''); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><Flag className="h-3 w-3" />Report</button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-gray-700 text-sm mt-2 ml-11">{comment.text}</p>
//                   <div className="flex items-center gap-4 mt-2 ml-11">
//                     <button onClick={() => likeCommentMutation.mutate(comment._id)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition"><Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} /><span>{comment.likes || 0}</span></button>
//                     <button onClick={() => handleEditComment(comment)} className="text-xs text-gray-400 hover:text-primary-600 transition">Reply</button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Ad Banner - Bottom */}
//         <div className="mt-8 bg-gray-100 rounded-lg p-4 text-center border border-gray-200">
//           <p className="text-xs text-gray-400 mb-1">Advertisement</p>
//           <div className="h-20 flex items-center justify-center"><span className="text-gray-500">Your Ad Here</span></div>
//         </div>
//       </div>

//       {/* Report Modal */}
//       <AnimatePresence>
//         {showReportModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReportModal(false)}>
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//               <div className="flex items-center justify-between p-4 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Report Comment</h3><button onClick={() => setShowReportModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button></div>
//               <div className="p-4">
//                 <textarea placeholder="Please describe why you're reporting this comment..." value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" rows="4" />
//                 <div className="flex justify-end gap-2 mt-4"><button onClick={() => setShowReportModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button><button onClick={() => { if (reportReason.trim()) reportCommentMutation.mutate(reportReason) }} disabled={!reportReason.trim()} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Submit Report</button></div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default PoetryDetailPage





















// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Heart as HeartIcon, RefreshCw, Facebook, Twitter,
//   Linkedin, Send, Flag, X, Edit2, Trash2, MoreVertical
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'
// import commentAPI from '../../api/commentAPI'
// import AdBanner from '../../components/ads/AdBanner'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t, i18n } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const isRTL = i18n.dir() === 'rtl'
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)
//   const [commentText, setCommentText] = useState('')
//   const [editingComment, setEditingComment] = useState(null)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [reportReason, setReportReason] = useState('')
//   const [showMoreMenu, setShowMoreMenu] = useState(null)
//   const [replyToComment, setReplyToComment] = useState(null)
//   const [replyText, setReplyText] = useState('')
  
//   // Transliteration states
//   const [transliteration, setTransliteration] = useState(null)
//   const [transliterationLoading, setTransliterationLoading] = useState(false)
//   const [transliterationError, setTransliterationError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch comments
//   const { data: commentsResponse, refetch: refetchComments } = useQuery({
//     queryKey: ['comments', poem?._id],
//     queryFn: () => commentAPI.getComments(poem?._id),
//     enabled: !!poem?._id,
//   })
  
//   const comments = commentsResponse?.data?.data || commentsResponse?.data || commentsResponse || []

//   // Add comment mutation
//   const addCommentMutation = useMutation({
//     mutationFn: (text) => commentAPI.addComment(poem?._id, text),
//     onSuccess: () => {
//       toast.success('Comment added successfully!')
//       setCommentText('')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to add comment')
//   })

//   // Update comment mutation
//   const updateCommentMutation = useMutation({
//     mutationFn: ({ commentId, text }) => commentAPI.updateComment(poem?._id, commentId, text),
//     onSuccess: () => {
//       toast.success('Comment updated!')
//       setEditingComment(null)
//       refetchComments()
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to update comment')
//   })

//   // Delete comment mutation
//   const deleteCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.deleteComment(poem?._id, commentId),
//     onSuccess: () => {
//       toast.success('Comment deleted')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete comment')
//   })

//   // Like comment mutation
//   const likeCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.likeComment(poem?._id, commentId),
//     onSuccess: () => refetchComments(),
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to like comment')
//   })

//   // Add reply mutation
//   const addReplyMutation = useMutation({
//     mutationFn: ({ commentId, text }) => commentAPI.addReply(poem?._id, commentId, text),
//     onSuccess: () => {
//       toast.success('Reply added!')
//       setReplyText('')
//       setReplyToComment(null)
//       refetchComments()
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to add reply')
//   })

//   // Report comment mutation
//   const reportCommentMutation = useMutation({
//     mutationFn: ({ commentId, reason }) => commentAPI.reportComment(poem?._id, commentId, reason),
//     onSuccess: () => {
//       toast.success('Comment reported for review')
//       setShowReportModal(false)
//       setReportReason('')
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to report comment')
//   })

//   // Fetch transliteration
//   const fetchTransliteration = useCallback(async (forceRefresh = false) => {
//     if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
//       setTransliteration(poem.transliteration)
//       return
//     }
//     if (transliterationLoading) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.getTransliteration(slug)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//       } else {
//         throw new Error(result.error || 'Failed to fetch transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }, [slug, poem, transliterationLoading])

//   // Generate transliteration
//   const generateTransliteration = async () => {
//     if (!poem?._id) return
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.generateTransliteration(poem._id)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//         toast.success(`Transliteration generated!`)
//       } else {
//         throw new Error(result.error || 'Failed to generate transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//       toast.error(`Failed: ${error.message}`)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       const result = await poemAPI.getAIAnalysis(slug)
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) analysisData = result.data.analysis
//       else if (result?.success && result?.data) analysisData = result.data
//       else if (result?.analysis) analysisData = result.analysis
//       else if (result?.themes) analysisData = result
      
//       if (analysisData && analysisData.themes) {
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed`)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch when tabs are opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) fetchAIAnalysis()
//   }, [activeTab])

//   useEffect(() => {
//     if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
//       fetchTransliteration()
//     }
//   }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

//   // Share handlers
//   const shareHandlers = {
//     facebook: () => {
//       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     twitter: () => {
//       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this beautiful poem: ${poem?.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     linkedin: () => {
//       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     whatsapp: () => {
//       window.open(`https://wa.me/?text=${encodeURIComponent(`${poem?.title}\n${window.location.href}`)}`, '_blank')
//     },
//     copy: async () => {
//       await navigator.clipboard.writeText(window.location.href)
//       toast.success('Link copied to clipboard!')
//       setShowShareModal(false)
//     }
//   }

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date unknown'
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) return 'Date unknown'
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//     } catch (e) {
//       return 'Date unknown'
//     }
//   }

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffMs = now - date
//     const diffMins = Math.floor(diffMs / 60000)
//     const diffHours = Math.floor(diffMs / 3600000)
//     const diffDays = Math.floor(diffMs / 86400000)
    
//     if (diffMins < 1) return 'Just now'
//     if (diffMins < 60) return `${diffMins} min ago`
//     if (diffHours < 24) return `${diffHours} hour ago`
//     return `${diffDays} day ago`
//   }

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     const langs = { urdu: 'Urdu', hindi: 'Hindi', english: 'English' }
//     return langs[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     let content = ''
//     if (poem?.language === 'hindi') content = poem?.contentHindi || poem?.content || ''
//     else if (poem?.language === 'urdu') content = poem?.contentUrdu || poem?.content || ''
//     else content = poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const translitText = transliteration || poem?.transliteration || ''
//     if (!translitText) return []
//     return translitText.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) { toast.error('Please login to like poems'); return }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) { toast.error('Please login to bookmark poems'); return }
//     bookmarkMutation.mutate()
//   }

//   const handleAddComment = () => {
//     if (!user) { toast.error('Please login to comment'); return }
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     addCommentMutation.mutate(commentText.trim())
//   }

//   const handleUpdateComment = () => {
//     if (!editingComment) return
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     updateCommentMutation.mutate({ commentId: editingComment._id, text: commentText.trim() })
//   }

//   const handleEditComment = (comment) => {
//     setEditingComment(comment)
//     setCommentText(comment.text)
//   }

//   const handleCancelEdit = () => {
//     setEditingComment(null)
//     setCommentText('')
//   }

//   const handleDeleteComment = (commentId) => {
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       deleteCommentMutation.mutate(commentId)
//     }
//   }

//   const handleAddReply = (commentId) => {
//     if (!user) { toast.error('Please login to reply'); return }
//     if (!replyText.trim()) { toast.error('Please enter a reply'); return }
//     addReplyMutation.mutate({ commentId, text: replyText.trim() })
//   }

//   const handleReportComment = (commentId, reason) => {
//     reportCommentMutation.mutate({ commentId, reason })
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: true },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500 dark:text-gray-400">Loading poem...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !poem) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Poem Not Found</h1>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">The poem you are looking for does not exist or has been removed.</p>
//           <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Poetry</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Two column layout - Main content + Right Sidebar */}
//         <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
//           {/* Main Content - Left side (or Right side in RTL) */}
//           <div className="flex-1 min-w-0">
//             {/* Breadcrumb */}
//             <div className="flex items-center justify-between mb-6">
//               <Link to="/poetry" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//                 <ChevronLeft className="h-4 w-4" />
//                 <span>Back to Poetry</span>
//               </Link>
//               <div className="flex items-center space-x-2 text-sm text-gray-400">
//                 <Eye className="h-3 w-3" />
//                 <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
//               </div>
//             </div>

//             {/* Header */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                   {getGenre()}
//                 </span>
//                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                   {getLanguage()}
//                 </span>
//                 {poem.era && (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                     {poem.era}
//                   </span>
//                 )}
//               </div>
              
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{poem.title || 'Untitled'}</h1>
              
//               {poem.language === 'urdu' && poem.contentUrdu && (
//                 <p className="urdu-text text-xl text-gray-600 dark:text-gray-400 mb-3" dir="rtl">{poem.contentUrdu.split('\n')[0]}</p>
//               )}
//               {poem.language === 'hindi' && poem.contentHindi && (
//                 <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">{poem.contentHindi.split('\n')[0]}</p>
//               )}
              
//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                 <Link to={`/author/${getAuthorSlug()}`} className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
//                   <User className="h-4 w-4" />
//                   <span>{getAuthorName()}</span>
//                 </Link>
//                 <span className="flex items-center space-x-1">
//                   <Calendar className="h-4 w-4" />
//                   <span>{formatDate(poem.createdAt)}</span>
//                 </span>
//               </div>
//             </motion.div>

//             {/* Actions Bar */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center gap-2">
//                 <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
//                   <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                   <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                 </button>
                
//                 <button onClick={handleBookmark} disabled={bookmarkMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
//                   <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                   <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                 </button>
                
//                 <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
//                 </button>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setShowShareModal(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
//                   <Share2 className="h-5 w-5" />
//                 </button>
//                 {poem.audioUrl && (
//                   <button onClick={() => setActiveTab('audio')} className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                     <Play className="h-4 w-4" />
//                     <span className="text-sm">Listen</span>
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Share Modal */}
//             <AnimatePresence>
//               {showShareModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
//                   <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//                     <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this poem</h3>
//                       <button onClick={() => setShowShareModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button>
//                     </div>
//                     <div className="p-4">
//                       <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
//                         <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">{poem?.title}</p>
//                         <p className="text-xs text-gray-400">by {getAuthorName()}</p>
//                       </div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <button onClick={shareHandlers.facebook} className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition"><Facebook className="h-5 w-5" /><span>Facebook</span></button>
//                         <button onClick={shareHandlers.twitter} className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition"><Twitter className="h-5 w-5" /><span>Twitter</span></button>
//                         <button onClick={shareHandlers.linkedin} className="flex items-center justify-center gap-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition"><Linkedin className="h-5 w-5" /><span>LinkedIn</span></button>
//                         <button onClick={shareHandlers.whatsapp} className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition"><Send className="h-5 w-5" /><span>WhatsApp</span></button>
//                       </div>
//                       <div className="mt-3 flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
//                         <input type="text" value={window.location.href} readOnly className="flex-1 text-sm bg-transparent outline-none text-gray-600 dark:text-gray-400" />
//                         <button onClick={shareHandlers.copy} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">Copy</button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </AnimatePresence>

//             {/* Tabs */}
//             <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
//               {tabs.filter(tab => tab.show).map((tab) => {
//                 const Icon = tab.icon
//                 return (
//                   <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
//                     <Icon className="h-4 w-4" />
//                     <span>{tab.label}</span>
//                     {tab.id === 'ai' && aiAnalysis && <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Ready</span>}
//                     {tab.id === 'transliteration' && transliterationLoading && <Loader2 className="ml-1 h-3 w-3 animate-spin" />}
//                   </button>
//                 )
//               })}
//             </div>

//             {/* Main Content - Poem Tab */}
//             <div className="mb-8">
//               {activeTab === 'poem' && (
//                 <motion.div key="poem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                     <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
//                       {contentLines.length > 0 ? contentLines.map((line, index) => (
//                         <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 dark:text-gray-200 leading-loose`}>{line}</p>
//                       )) : <p className="text-gray-500 italic">No content available</p>}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Translation Tab */}
//               {activeTab === 'translation' && translationLines.length > 0 && (
//                 <motion.div key="translation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2"><BookOpen className="h-5 w-5 text-primary-600" /><span>English Translation</span></h3>
//                   <div className="space-y-3">{translationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
//                 </motion.div>
//               )}

//               {/* Transliteration Tab */}
//               {activeTab === 'transliteration' && (
//                 <motion.div key="transliteration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Mic className="h-5 w-5 text-primary-600" /><span>Roman Transliteration</span></h3>
//                     {!transliterationLoading && (<button onClick={generateTransliteration} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"><RefreshCw className="h-3 w-3" />{transliteration ? 'Regenerate' : 'Generate'}</button>)}
//                   </div>
//                   {transliterationLoading ? (
//                     <div className="text-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" /><p className="text-gray-500">Generating transliteration...</p></div>
//                   ) : transliterationError ? (
//                     <div className="text-center py-8"><AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" /><p className="text-gray-600 mb-2">Unable to generate transliteration</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Try Again</button></div>
//                   ) : transliterationLines.length > 0 ? (
//                     <div className="space-y-3">{transliterationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
//                   ) : (
//                     <div className="text-center py-8"><Mic className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No transliteration available</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Generate Transliteration</button></div>
//                   )}
//                 </motion.div>
//               )}

//               {/* AI Analysis Tab */}
//               {activeTab === 'ai' && (
//                 <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                   {aiLoading ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center"><Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" /><p className="text-gray-600">AI is analyzing this poem...</p></div>
//                   ) : aiAnalysis ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
//                       <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2 text-white"><Brain className="h-5 w-5" /><h3 className="font-semibold">AI Literary Analysis</h3><Sparkles className="h-4 w-4 text-yellow-300" /></div>
//                           <div className="flex items-center gap-2">
//                             <button onClick={copyAnalysisToClipboard} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
//                             <button onClick={() => setAiExpanded(!aiExpanded)} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</button>
//                           </div>
//                         </div>
//                       </div>
//                       {aiExpanded && (
//                         <div className="p-6 space-y-5">
//                           {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-purple-500" />Themes</h4><div className="flex flex-wrap gap-2">{aiAnalysis.themes.map((theme, i) => (<span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 rounded-full text-sm">{theme}</span>))}</div></div>)}
//                           <div className="grid grid-cols-2 gap-4"><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tone</h4><p className="text-gray-800 dark:text-gray-200 capitalize">{aiAnalysis.tone}</p></div><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sentiment</h4><span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' : aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' : aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' : aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}</span></div></div>
//                           {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><HeartIcon className="h-4 w-4 text-pink-500" />Emotions Detected</h4><div className="flex flex-wrap gap-2">{aiAnalysis.emotions.map((emotion, i) => (<span key={i} className="px-2 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 rounded-full text-xs capitalize">{emotion}</span>))}</div></div>)}
//                           <div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Meaning & Interpretation</h4><p className="text-gray-600 dark:text-gray-400 leading-relaxed">{aiAnalysis.meaning}</p></div>
//                           {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Literary Devices</h4><div className="flex flex-wrap gap-2">{aiAnalysis.literaryDevices.map((device, i) => (<span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">{device}</span>))}</div></div>)}
//                           <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700"><div><h4 className="text-xs text-gray-500">Rhyme Scheme</h4><p className="text-sm text-gray-700 dark:text-gray-300">{aiAnalysis.rhymeScheme}</p></div><div><h4 className="text-xs text-gray-500">Difficulty Level</h4><p className="text-sm text-gray-700 dark:text-gray-300 capitalize">{aiAnalysis.difficulty}</p></div></div>
//                           <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}</div>
//                         </div>
//                       )}
//                     </div>
//                   ) : analysisError ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" /><p className="text-red-600 mb-2">Failed to load AI analysis</p><button onClick={() => { setAnalysisError(null); fetchAIAnalysis() }} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Try Again</button></div>
//                   ) : (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">AI analysis not yet generated</p><button onClick={fetchAIAnalysis} className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg">Generate AI Analysis →</button></div>
//                   )}
//                 </motion.div>
//               )}

//               {/* Audio Tab */}
//               {activeTab === 'audio' && poem.audioUrl && (
//                 <motion.div key="audio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
//                   <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4"><Volume2 className="h-12 w-12 text-primary-600" /></div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Audio Narration</h3>
//                   <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//                   <audio controls className="w-full max-w-md mx-auto"><source src={poem.audioUrl} type="audio/mpeg" />Your browser does not support the audio element.</audio>
//                 </motion.div>
//               )}
//             </div>

//             {/* Related Poems */}
//             {relatedPoems.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Poems</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {relatedPoems.slice(0, 4).map((related) => (
//                     <Link key={related._id} to={`/poem/${related.slug}`} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-0.5">
//                       <h4 className="font-medium text-gray-900 dark:text-white">{related.title}</h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}</p>
//                       <div className="flex items-center gap-3 mt-2 text-xs text-gray-400"><Eye className="h-3 w-3" /><span>{related.stats?.views?.toLocaleString() || 0}</span><Heart className="h-3 w-3" /><span>{related.stats?.likes?.toLocaleString() || 0}</span></div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Comments Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//               <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary-600" />Comments ({poem.stats?.comments || comments.length})</h3>
              
//               {user ? (
//                 <div className="mb-6">
//                   <div className="flex items-start gap-3">
//                     <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
//                     <div className="flex-1">
//                       <textarea placeholder={editingComment ? "Edit your comment..." : "Write a comment..."} value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" rows="3" />
//                       <div className="flex justify-end gap-2 mt-2">
//                         {editingComment && (<button onClick={handleCancelEdit} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>)}
//                         <button onClick={editingComment ? handleUpdateComment : handleAddComment} disabled={addCommentMutation.isPending || updateCommentMutation.isPending} className="btn-primary text-sm py-1.5 px-4">{editingComment ? 'Update Comment' : 'Post Comment'}</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-6">
//                   <p className="text-gray-500 mb-3">Please login to leave a comment</p>
//                   <Link to="/login" className="btn-primary text-sm">Login</Link>
//                 </div>
//               )}
              
//               <div className="space-y-4">
//                 {comments.length === 0 ? (
//                   <p className="text-center text-gray-400 text-sm py-4">No comments yet. Be the first to comment!</p>
//                 ) : (
//                   comments.map((comment) => (
//                     <div key={comment._id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                           <img src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.name}&background=6366f1&color=fff`} alt={comment.user?.name} className="w-8 h-8 rounded-full object-cover" />
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white text-sm">{comment.user?.name || 'Anonymous'}</p>
//                             <p className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</p>
//                           </div>
//                         </div>
//                         <div className="relative">
//                           <button onClick={() => setShowMoreMenu(showMoreMenu === comment._id ? null : comment._id)} className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"><MoreVertical className="h-4 w-4 text-gray-500" /></button>
//                           {showMoreMenu === comment._id && (
//                             <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10`}>
//                               <button onClick={() => likeCommentMutation.mutate(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Heart className="h-3 w-3" />Like</button>
//                               <button onClick={() => setReplyToComment(comment)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><MessageCircle className="h-3 w-3" />Reply</button>
//                               {user && (user._id === comment.user?._id || user.role === 'admin') && (<><button onClick={() => handleEditComment(comment)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Edit2 className="h-3 w-3" />Edit</button><button onClick={() => handleDeleteComment(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"><Trash2 className="h-3 w-3" />Delete</button></>)}
//                               <button onClick={() => { setShowReportModal(true); setShowMoreMenu(null); setReportReason(''); setEditingComment(null); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Flag className="h-3 w-3" />Report</button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-11">{comment.text}</p>
//                       <div className="flex items-center gap-4 mt-2 ml-11">
//                         <button onClick={() => likeCommentMutation.mutate(comment._id)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition"><Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} /><span>{comment.likes || 0}</span></button>
//                         <button onClick={() => setReplyToComment(comment)} className="text-xs text-gray-400 hover:text-primary-600 transition">Reply</button>
//                       </div>
                      
//                       {/* Reply Input */}
//                       {replyToComment?._id === comment._id && (
//                         <div className="mt-3 ml-11">
//                           <div className="flex gap-2">
//                             <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900" />
//                             <button onClick={() => handleAddReply(comment._id)} disabled={addReplyMutation.isPending} className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm">Reply</button>
//                             <button onClick={() => { setReplyToComment(null); setReplyText(''); }} className="px-3 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Display Replies */}
//                       {comment.replies && comment.replies.length > 0 && (
//                         <div className="ml-11 mt-3 space-y-3">
//                           {comment.replies.map((reply) => (
//                             <div key={reply._id} className="pl-3 border-l-2 border-gray-200 dark:border-gray-700">
//                               <div className="flex items-center gap-2">
//                                 <img src={reply.user?.avatar || `https://ui-avatars.com/api/?name=${reply.user?.name}`} className="w-6 h-6 rounded-full" />
//                                 <span className="font-medium text-sm text-gray-900 dark:text-white">{reply.user?.name}</span>
//                                 <span className="text-xs text-gray-400">{formatTimeAgo(reply.createdAt)}</span>
//                               </div>
//                               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{reply.text}</p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Ads (appears on right in LTR, left in RTL) */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="sticky top-24 space-y-6">
//               {/* Sidebar Top Ad */}
//               <AdBanner 
//                 position="sidebar-top" 
//                 page="poem-detail"
//                 autoHeight={false}
//               />
              
//               {/* Sidebar Middle Ad */}
//               <AdBanner 
//                 position="sidebar-middle" 
//                 page="poem-detail"
//                 autoHeight={false}
//               />
              
//               {/* Sidebar Bottom Ad */}
//               <AdBanner 
//                 position="sidebar-bottom" 
//                 page="poem-detail"
//                 autoHeight={false}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Report Modal */}
//       <AnimatePresence>
//         {showReportModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReportModal(false)}>
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//               <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Comment</h3><button onClick={() => setShowReportModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button></div>
//               <div className="p-4">
//                 <textarea placeholder="Please describe why you're reporting this comment..." value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900" rows="4" />
//                 <div className="flex justify-end gap-2 mt-4"><button onClick={() => setShowReportModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button><button onClick={() => { if (reportReason.trim()) reportCommentMutation.mutate(reportReason) }} disabled={!reportReason.trim()} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Submit Report</button></div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default PoetryDetailPage





















// // client/src/pages/public/PoetryDetailPage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import {
//   Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
//   Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
//   AlertCircle, Headphones, Eye, Calendar, FileText,
//   Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
//   TrendingUp, Heart as HeartIcon, RefreshCw, Facebook, Twitter,
//   Linkedin, Send, Flag, X, Edit2, Trash2, MoreVertical
// } from 'lucide-react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import toast from 'react-hot-toast'
// import poemAPI from '../../api/poemAPI'
// import commentAPI from '../../api/commentAPI'
// import AdBanner from '../../components/ads/AdBanner'

// const PoetryDetailPage = () => {
//   const { slug } = useParams()
//   const { t, i18n } = useTranslation()
//   const queryClient = useQueryClient()
//   const { user } = useSelector(state => state.auth)
//   const isRTL = i18n.dir() === 'rtl'
  
//   const [activeTab, setActiveTab] = useState('poem')
//   const [aiAnalysis, setAiAnalysis] = useState(null)
//   const [aiLoading, setAiLoading] = useState(false)
//   const [aiExpanded, setAiExpanded] = useState(true)
//   const [copiedAnalysis, setCopiedAnalysis] = useState(false)
//   const [analysisError, setAnalysisError] = useState(null)
//   const [commentText, setCommentText] = useState('')
//   const [editingComment, setEditingComment] = useState(null)
//   const [showShareModal, setShowShareModal] = useState(false)
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [reportReason, setReportReason] = useState('')
//   const [showMoreMenu, setShowMoreMenu] = useState(null)
//   const [replyToComment, setReplyToComment] = useState(null)
//   const [replyText, setReplyText] = useState('')
  
//   // Transliteration states
//   const [transliteration, setTransliteration] = useState(null)
//   const [transliterationLoading, setTransliterationLoading] = useState(false)
//   const [transliterationError, setTransliterationError] = useState(null)

//   // Fetch poem data using slug
//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['poem', slug],
//     queryFn: () => poemAPI.getPoem(slug),
//     enabled: !!slug,
//     retry: 1
//   })

//   const poem = response?.data?.data || response?.data || response

//   // Fetch comments
//   const { data: commentsResponse, refetch: refetchComments } = useQuery({
//     queryKey: ['comments', poem?._id],
//     queryFn: () => commentAPI.getComments(poem?._id),
//     enabled: !!poem?._id,
//   })
  
//   const comments = commentsResponse?.data?.data || commentsResponse?.data || commentsResponse || []

//   // Add comment mutation
//   const addCommentMutation = useMutation({
//     mutationFn: (text) => commentAPI.addComment(poem?._id, text),
//     onSuccess: () => {
//       toast.success('Comment added successfully!')
//       setCommentText('')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to add comment')
//   })

//   // Update comment mutation
//   const updateCommentMutation = useMutation({
//     mutationFn: ({ commentId, text }) => commentAPI.updateComment(poem?._id, commentId, text),
//     onSuccess: () => {
//       toast.success('Comment updated!')
//       setEditingComment(null)
//       refetchComments()
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to update comment')
//   })

//   // Delete comment mutation
//   const deleteCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.deleteComment(poem?._id, commentId),
//     onSuccess: () => {
//       toast.success('Comment deleted')
//       refetchComments()
//       queryClient.invalidateQueries(['poem', slug])
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete comment')
//   })

//   // Like comment mutation
//   const likeCommentMutation = useMutation({
//     mutationFn: (commentId) => commentAPI.likeComment(poem?._id, commentId),
//     onSuccess: () => refetchComments(),
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to like comment')
//   })

//   // Add reply mutation
//   const addReplyMutation = useMutation({
//     mutationFn: ({ commentId, text }) => commentAPI.addReply(poem?._id, commentId, text),
//     onSuccess: () => {
//       toast.success('Reply added!')
//       setReplyText('')
//       setReplyToComment(null)
//       refetchComments()
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to add reply')
//   })

//   // Report comment mutation
//   const reportCommentMutation = useMutation({
//     mutationFn: ({ commentId, reason }) => commentAPI.reportComment(poem?._id, commentId, reason),
//     onSuccess: () => {
//       toast.success('Comment reported for review')
//       setShowReportModal(false)
//       setReportReason('')
//     },
//     onError: (error) => toast.error(error.response?.data?.message || 'Failed to report comment')
//   })

//   // Fetch transliteration
//   const fetchTransliteration = useCallback(async (forceRefresh = false) => {
//     if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
//       setTransliteration(poem.transliteration)
//       return
//     }
//     if (transliterationLoading) return
    
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.getTransliteration(slug)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//       } else {
//         throw new Error(result.error || 'Failed to fetch transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }, [slug, poem, transliterationLoading])

//   // Generate transliteration
//   const generateTransliteration = async () => {
//     if (!poem?._id) return
//     setTransliterationLoading(true)
//     setTransliterationError(null)
    
//     try {
//       const result = await poemAPI.generateTransliteration(poem._id)
//       if (result.success && result.data) {
//         setTransliteration(result.data)
//         if (poem) poem.transliteration = result.data
//         toast.success(`Transliteration generated!`)
//       } else {
//         throw new Error(result.error || 'Failed to generate transliteration')
//       }
//     } catch (error) {
//       setTransliterationError(error.message)
//       toast.error(`Failed: ${error.message}`)
//     } finally {
//       setTransliterationLoading(false)
//     }
//   }

//   // Fetch AI analysis
//   const fetchAIAnalysis = async () => {
//     if (aiAnalysis || aiLoading) return
//     setAiLoading(true)
//     setAnalysisError(null)
    
//     try {
//       const result = await poemAPI.getAIAnalysis(slug)
//       let analysisData = null
      
//       if (result?.success && result?.data?.analysis) analysisData = result.data.analysis
//       else if (result?.success && result?.data) analysisData = result.data
//       else if (result?.analysis) analysisData = result.analysis
//       else if (result?.themes) analysisData = result
      
//       if (analysisData && analysisData.themes) {
//         setAiAnalysis({
//           themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
//           tone: analysisData.tone || 'Expressive',
//           sentiment: analysisData.sentiment || 'neutral',
//           emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
//           meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery.',
//           literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
//           rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
//           difficulty: analysisData.difficulty || 'intermediate',
//           provider: analysisData.provider || 'Gemini AI',
//           analyzedAt: analysisData.analyzedAt || new Date().toISOString()
//         })
//         toast.success('AI analysis loaded!')
//       } else {
//         throw new Error('Invalid analysis data format')
//       }
//     } catch (error) {
//       setAnalysisError(error.message)
//       toast.error(`AI analysis failed`)
//     } finally {
//       setAiLoading(false)
//     }
//   }

//   // Auto-fetch when tabs are opened
//   useEffect(() => {
//     if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) fetchAIAnalysis()
//   }, [activeTab])

//   useEffect(() => {
//     if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
//       fetchTransliteration()
//     }
//   }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

//   // Share handlers
//   const shareHandlers = {
//     facebook: () => {
//       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     twitter: () => {
//       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this beautiful poem: ${poem?.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     linkedin: () => {
//       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
//     },
//     whatsapp: () => {
//       window.open(`https://wa.me/?text=${encodeURIComponent(`${poem?.title}\n${window.location.href}`)}`, '_blank')
//     },
//     copy: async () => {
//       await navigator.clipboard.writeText(window.location.href)
//       toast.success('Link copied to clipboard!')
//       setShowShareModal(false)
//     }
//   }

//   // Like mutation
//   const likeMutation = useMutation({
//     mutationFn: () => poemAPI.likePoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update like')
//   })

//   // Bookmark mutation
//   const bookmarkMutation = useMutation({
//     mutationFn: () => poemAPI.bookmarkPoem(slug),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['poem', slug])
//       toast.success('Updated')
//     },
//     onError: () => toast.error('Failed to update bookmark')
//   })

//   // Fetch related poems
//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-poems', poem?._id],
//     queryFn: () => poemAPI.getRelatedPoems(slug),
//     enabled: !!slug && !!poem?._id
//   })

//   const relatedPoems = relatedResponse?.data?.data || relatedResponse?.data || relatedResponse || []

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date unknown'
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) return 'Date unknown'
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//     } catch (e) {
//       return 'Date unknown'
//     }
//   }

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffMs = now - date
//     const diffMins = Math.floor(diffMs / 60000)
//     const diffHours = Math.floor(diffMs / 3600000)
//     const diffDays = Math.floor(diffMs / 86400000)
    
//     if (diffMins < 1) return 'Just now'
//     if (diffMins < 60) return `${diffMins} min ago`
//     if (diffHours < 24) return `${diffHours} hour ago`
//     return `${diffDays} day ago`
//   }

//   const getAuthorName = () => {
//     if (!poem?.author) return 'Unknown Author'
//     if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
//     if (typeof poem.author === 'string') return poem.author
//     return 'Unknown Author'
//   }

//   const getAuthorSlug = () => {
//     if (!poem?.author) return '#'
//     if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
//     return '#'
//   }

//   const getGenre = () => {
//     if (!poem?.genre) return 'Poem'
//     return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
//   }

//   const getLanguage = () => {
//     const lang = poem?.language
//     if (!lang) return 'Urdu'
//     const langs = { urdu: 'Urdu', hindi: 'Hindi', english: 'English' }
//     return langs[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
//   }

//   const getContentLines = () => {
//     let content = ''
//     if (poem?.language === 'hindi') content = poem?.contentHindi || poem?.content || ''
//     else if (poem?.language === 'urdu') content = poem?.contentUrdu || poem?.content || ''
//     else content = poem?.content || ''
//     if (!content) return []
//     return content.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTranslationLines = () => {
//     const translation = poem?.translation?.english || ''
//     if (!translation) return []
//     return translation.split('\n').filter(line => line.trim() !== '')
//   }

//   const getTransliterationLines = () => {
//     const translitText = transliteration || poem?.transliteration || ''
//     if (!translitText) return []
//     return translitText.split('\n').filter(line => line.trim() !== '')
//   }

//   const isLiked = poem?.userInteraction?.isLiked || false
//   const isBookmarked = poem?.userInteraction?.isBookmarked || false

//   const handleLike = () => {
//     if (!user) { toast.error('Please login to like poems'); return }
//     likeMutation.mutate()
//   }

//   const handleBookmark = () => {
//     if (!user) { toast.error('Please login to bookmark poems'); return }
//     bookmarkMutation.mutate()
//   }

//   const handleAddComment = () => {
//     if (!user) { toast.error('Please login to comment'); return }
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     addCommentMutation.mutate(commentText.trim())
//   }

//   const handleUpdateComment = () => {
//     if (!editingComment) return
//     if (!commentText.trim()) { toast.error('Please enter a comment'); return }
//     updateCommentMutation.mutate({ commentId: editingComment._id, text: commentText.trim() })
//   }

//   const handleEditComment = (comment) => {
//     setEditingComment(comment)
//     setCommentText(comment.text)
//   }

//   const handleCancelEdit = () => {
//     setEditingComment(null)
//     setCommentText('')
//   }

//   const handleDeleteComment = (commentId) => {
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       deleteCommentMutation.mutate(commentId)
//     }
//   }

//   const handleAddReply = (commentId) => {
//     if (!user) { toast.error('Please login to reply'); return }
//     if (!replyText.trim()) { toast.error('Please enter a reply'); return }
//     addReplyMutation.mutate({ commentId, text: replyText.trim() })
//   }

//   const handleReportComment = (commentId, reason) => {
//     reportCommentMutation.mutate({ commentId, reason })
//   }

//   const copyAnalysisToClipboard = () => {
//     if (!aiAnalysis) return
//     const analysisText = `
// 📜 Poem Analysis: ${poem?.title || 'Poem'}

// 🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
// 💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

// 📚 Themes:
// ${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

// 💖 Emotions:
// ${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

// 📖 Meaning:
// ${aiAnalysis.meaning || 'Not available'}

// ✨ Literary Devices:
// ${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

// 🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

// ⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

// 🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
//     `.trim()
//     navigator.clipboard.writeText(analysisText)
//     setCopiedAnalysis(true)
//     toast.success('Analysis copied!')
//     setTimeout(() => setCopiedAnalysis(false), 2000)
//   }

//   const contentLines = getContentLines()
//   const translationLines = getTranslationLines()
//   const transliterationLines = getTransliterationLines()

//   const tabs = [
//     { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
//     { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
//     { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: true },
//     { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
//     { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
//   ]

//   if (isLoading) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500 dark:text-gray-400">Loading poem...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !poem) {
//     return (
//       <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Poem Not Found</h1>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">The poem you are looking for does not exist or has been removed.</p>
//           <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
//             <ChevronLeft className="h-4 w-4" />
//             <span>Browse All Poetry</span>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Two column layout - Main content + Sidebar */}
//         <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
//           {/* Main Content */}
//           <div className="flex-1 min-w-0">
//             {/* Breadcrumb */}
//             <div className="flex items-center justify-between mb-6">
//               <Link to="/poetry" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
//                 <ChevronLeft className="h-4 w-4" />
//                 <span>Back to Poetry</span>
//               </Link>
//               <div className="flex items-center space-x-2 text-sm text-gray-400">
//                 <Eye className="h-3 w-3" />
//                 <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
//               </div>
//             </div>

//             {/* Header */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full capitalize">
//                   {getGenre()}
//                 </span>
//                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                   {getLanguage()}
//                 </span>
//                 {poem.era && (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
//                     {poem.era}
//                   </span>
//                 )}
//               </div>
              
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{poem.title || 'Untitled'}</h1>
              
//               {poem.language === 'urdu' && poem.contentUrdu && (
//                 <p className="urdu-text text-xl text-gray-600 dark:text-gray-400 mb-3" dir="rtl">{poem.contentUrdu.split('\n')[0]}</p>
//               )}
//               {poem.language === 'hindi' && poem.contentHindi && (
//                 <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">{poem.contentHindi.split('\n')[0]}</p>
//               )}
              
//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                 <Link to={`/author/${getAuthorSlug()}`} className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
//                   <User className="h-4 w-4" />
//                   <span>{getAuthorName()}</span>
//                 </Link>
//                 <span className="flex items-center space-x-1">
//                   <Calendar className="h-4 w-4" />
//                   <span>{formatDate(poem.createdAt)}</span>
//                 </span>
//               </div>
//             </motion.div>

//             {/* Actions Bar */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center gap-2">
//                 <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
//                   <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
//                   <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
//                 </button>
                
//                 <button onClick={handleBookmark} disabled={bookmarkMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
//                   <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
//                   <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
//                 </button>
                
//                 <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
//                 </button>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setShowShareModal(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
//                   <Share2 className="h-5 w-5" />
//                 </button>
//                 {poem.audioUrl && (
//                   <button onClick={() => setActiveTab('audio')} className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                     <Play className="h-4 w-4" />
//                     <span className="text-sm">Listen</span>
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Share Modal */}
//             <AnimatePresence>
//               {showShareModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
//                   <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//                     <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this poem</h3>
//                       <button onClick={() => setShowShareModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button>
//                     </div>
//                     <div className="p-4">
//                       <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
//                         <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">{poem?.title}</p>
//                         <p className="text-xs text-gray-400">by {getAuthorName()}</p>
//                       </div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <button onClick={shareHandlers.facebook} className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition"><Facebook className="h-5 w-5" /><span>Facebook</span></button>
//                         <button onClick={shareHandlers.twitter} className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition"><Twitter className="h-5 w-5" /><span>Twitter</span></button>
//                         <button onClick={shareHandlers.linkedin} className="flex items-center justify-center gap-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition"><Linkedin className="h-5 w-5" /><span>LinkedIn</span></button>
//                         <button onClick={shareHandlers.whatsapp} className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition"><Send className="h-5 w-5" /><span>WhatsApp</span></button>
//                       </div>
//                       <div className="mt-3 flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
//                         <input type="text" value={window.location.href} readOnly className="flex-1 text-sm bg-transparent outline-none text-gray-600 dark:text-gray-400" />
//                         <button onClick={shareHandlers.copy} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">Copy</button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </AnimatePresence>

//             {/* Tabs */}
//             <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
//               {tabs.filter(tab => tab.show).map((tab) => {
//                 const Icon = tab.icon
//                 return (
//                   <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
//                     <Icon className="h-4 w-4" />
//                     <span>{tab.label}</span>
//                     {tab.id === 'ai' && aiAnalysis && <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Ready</span>}
//                     {tab.id === 'transliteration' && transliterationLoading && <Loader2 className="ml-1 h-3 w-3 animate-spin" />}
//                   </button>
//                 )
//               })}
//             </div>

//             {/* Main Content - Poem Tab */}
//             <div className="mb-8">
//               {activeTab === 'poem' && (
//                 <motion.div key="poem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                     <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
//                       {contentLines.length > 0 ? contentLines.map((line, index) => (
//                         <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 dark:text-gray-200 leading-loose`}>{line}</p>
//                       )) : <p className="text-gray-500 italic">No content available</p>}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Translation Tab */}
//               {activeTab === 'translation' && translationLines.length > 0 && (
//                 <motion.div key="translation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2"><BookOpen className="h-5 w-5 text-primary-600" /><span>English Translation</span></h3>
//                   <div className="space-y-3">{translationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
//                 </motion.div>
//               )}

//               {/* Transliteration Tab */}
//               {activeTab === 'transliteration' && (
//                 <motion.div key="transliteration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Mic className="h-5 w-5 text-primary-600" /><span>Roman Transliteration</span></h3>
//                     {!transliterationLoading && (<button onClick={generateTransliteration} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"><RefreshCw className="h-3 w-3" />{transliteration ? 'Regenerate' : 'Generate'}</button>)}
//                   </div>
//                   {transliterationLoading ? (
//                     <div className="text-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" /><p className="text-gray-500">Generating transliteration...</p></div>
//                   ) : transliterationError ? (
//                     <div className="text-center py-8"><AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" /><p className="text-gray-600 mb-2">Unable to generate transliteration</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Try Again</button></div>
//                   ) : transliterationLines.length > 0 ? (
//                     <div className="space-y-3">{transliterationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
//                   ) : (
//                     <div className="text-center py-8"><Mic className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No transliteration available</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Generate Transliteration</button></div>
//                   )}
//                 </motion.div>
//               )}

//               {/* AI Analysis Tab */}
//               {activeTab === 'ai' && (
//                 <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                   {aiLoading ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center"><Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" /><p className="text-gray-600">AI is analyzing this poem...</p></div>
//                   ) : aiAnalysis ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
//                       <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2 text-white"><Brain className="h-5 w-5" /><h3 className="font-semibold">AI Literary Analysis</h3><Sparkles className="h-4 w-4 text-yellow-300" /></div>
//                           <div className="flex items-center gap-2">
//                             <button onClick={copyAnalysisToClipboard} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
//                             <button onClick={() => setAiExpanded(!aiExpanded)} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</button>
//                           </div>
//                         </div>
//                       </div>
//                       {aiExpanded && (
//                         <div className="p-6 space-y-5">
//                           {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-purple-500" />Themes</h4><div className="flex flex-wrap gap-2">{aiAnalysis.themes.map((theme, i) => (<span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 rounded-full text-sm">{theme}</span>))}</div></div>)}
//                           <div className="grid grid-cols-2 gap-4"><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tone</h4><p className="text-gray-800 dark:text-gray-200 capitalize">{aiAnalysis.tone}</p></div><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sentiment</h4><span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' : aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' : aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' : aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}</span></div></div>
//                           {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><HeartIcon className="h-4 w-4 text-pink-500" />Emotions Detected</h4><div className="flex flex-wrap gap-2">{aiAnalysis.emotions.map((emotion, i) => (<span key={i} className="px-2 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 rounded-full text-xs capitalize">{emotion}</span>))}</div></div>)}
//                           <div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Meaning & Interpretation</h4><p className="text-gray-600 dark:text-gray-400 leading-relaxed">{aiAnalysis.meaning}</p></div>
//                           {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Literary Devices</h4><div className="flex flex-wrap gap-2">{aiAnalysis.literaryDevices.map((device, i) => (<span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">{device}</span>))}</div></div>)}
//                           <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700"><div><h4 className="text-xs text-gray-500">Rhyme Scheme</h4><p className="text-sm text-gray-700 dark:text-gray-300">{aiAnalysis.rhymeScheme}</p></div><div><h4 className="text-xs text-gray-500">Difficulty Level</h4><p className="text-sm text-gray-700 dark:text-gray-300 capitalize">{aiAnalysis.difficulty}</p></div></div>
//                           <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}</div>
//                         </div>
//                       )}
//                     </div>
//                   ) : analysisError ? (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" /><p className="text-red-600 mb-2">Failed to load AI analysis</p><button onClick={() => { setAnalysisError(null); fetchAIAnalysis() }} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Try Again</button></div>
//                   ) : (
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">AI analysis not yet generated</p><button onClick={fetchAIAnalysis} className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg">Generate AI Analysis →</button></div>
//                   )}
//                 </motion.div>
//               )}

//               {/* Audio Tab */}
//               {activeTab === 'audio' && poem.audioUrl && (
//                 <motion.div key="audio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
//                   <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4"><Volume2 className="h-12 w-12 text-primary-600" /></div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Audio Narration</h3>
//                   <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
//                   <audio controls className="w-full max-w-md mx-auto"><source src={poem.audioUrl} type="audio/mpeg" />Your browser does not support the audio element.</audio>
//                 </motion.div>
//               )}
//             </div>

//             {/* Related Poems */}
//             {relatedPoems.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Poems</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {relatedPoems.slice(0, 4).map((related) => (
//                     <Link key={related._id} to={`/poem/${related.slug}`} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-0.5">
//                       <h4 className="font-medium text-gray-900 dark:text-white">{related.title}</h4>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}</p>
//                       <div className="flex items-center gap-3 mt-2 text-xs text-gray-400"><Eye className="h-3 w-3" /><span>{related.stats?.views?.toLocaleString() || 0}</span><Heart className="h-3 w-3" /><span>{related.stats?.likes?.toLocaleString() || 0}</span></div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Comments Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//               <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary-600" />Comments ({poem.stats?.comments || comments.length})</h3>
              
//               {user ? (
//                 <div className="mb-6">
//                   <div className="flex items-start gap-3">
//                     <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
//                     <div className="flex-1">
//                       <textarea placeholder={editingComment ? "Edit your comment..." : "Write a comment..."} value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" rows="3" />
//                       <div className="flex justify-end gap-2 mt-2">
//                         {editingComment && (<button onClick={handleCancelEdit} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">Cancel</button>)}
//                         <button onClick={editingComment ? handleUpdateComment : handleAddComment} disabled={addCommentMutation.isPending || updateCommentMutation.isPending} className="btn-primary text-sm py-1.5 px-4">{editingComment ? 'Update Comment' : 'Post Comment'}</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-6">
//                   <p className="text-gray-500 mb-3">Please login to leave a comment</p>
//                   <Link to="/login" className="btn-primary text-sm">Login</Link>
//                 </div>
//               )}
              
//               <div className="space-y-4">
//                 {comments.length === 0 ? (
//                   <p className="text-center text-gray-400 text-sm py-4">No comments yet. Be the first to comment!</p>
//                 ) : (
//                   comments.map((comment) => (
//                     <div key={comment._id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                           <img src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.name}&background=6366f1&color=fff`} alt={comment.user?.name} className="w-8 h-8 rounded-full object-cover" />
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white text-sm">{comment.user?.name || 'Anonymous'}</p>
//                             <p className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</p>
//                           </div>
//                         </div>
//                         <div className="relative">
//                           <button onClick={() => setShowMoreMenu(showMoreMenu === comment._id ? null : comment._id)} className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"><MoreVertical className="h-4 w-4 text-gray-500" /></button>
//                           {showMoreMenu === comment._id && (
//                             <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10`}>
//                               <button onClick={() => likeCommentMutation.mutate(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Heart className="h-3 w-3" />Like</button>
//                               <button onClick={() => setReplyToComment(comment)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><MessageCircle className="h-3 w-3" />Reply</button>
//                               {user && (user._id === comment.user?._id || user.role === 'admin') && (<><button onClick={() => handleEditComment(comment)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Edit2 className="h-3 w-3" />Edit</button><button onClick={() => handleDeleteComment(comment._id)} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"><Trash2 className="h-3 w-3" />Delete</button></>)}
//                               <button onClick={() => { setShowReportModal(true); setShowMoreMenu(null); setReportReason(''); setEditingComment(null); }} className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Flag className="h-3 w-3" />Report</button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-11">{comment.text}</p>
//                       <div className="flex items-center gap-4 mt-2 ml-11">
//                         <button onClick={() => likeCommentMutation.mutate(comment._id)} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition"><Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} /><span>{comment.likes || 0}</span></button>
//                         <button onClick={() => setReplyToComment(comment)} className="text-xs text-gray-400 hover:text-primary-600 transition">Reply</button>
//                       </div>
                      
//                       {/* Reply Input */}
//                       {replyToComment?._id === comment._id && (
//                         <div className="mt-3 ml-11">
//                           <div className="flex gap-2">
//                             <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900" />
//                             <button onClick={() => handleAddReply(comment._id)} disabled={addReplyMutation.isPending} className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm">Reply</button>
//                             <button onClick={() => { setReplyToComment(null); setReplyText(''); }} className="px-3 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Display Replies */}
//                       {comment.replies && comment.replies.length > 0 && (
//                         <div className="ml-11 mt-3 space-y-3">
//                           {comment.replies.map((reply) => (
//                             <div key={reply._id} className="pl-3 border-l-2 border-gray-200 dark:border-gray-700">
//                               <div className="flex items-center gap-2">
//                                 <img src={reply.user?.avatar || `https://ui-avatars.com/api/?name=${reply.user?.name}`} className="w-6 h-6 rounded-full" />
//                                 <span className="font-medium text-sm text-gray-900 dark:text-white">{reply.user?.name}</span>
//                                 <span className="text-xs text-gray-400">{formatTimeAgo(reply.createdAt)}</span>
//                               </div>
//                               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{reply.text}</p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Ads (only using existing positions: sidebar-top and sidebar-bottom) */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="sticky top-24 space-y-6">
//               {/* Sidebar Top Ad */}
//               <AdBanner 
//                 position="sidebar-top" 
//                 page="poem-detail"
//                 autoHeight={false}
//               />
              
//               {/* Sidebar Bottom Ad */}
//               <AdBanner 
//                 position="sidebar-bottom" 
//                 page="poem-detail"
//                 autoHeight={false}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Report Modal */}
//       <AnimatePresence>
//         {showReportModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReportModal(false)}>
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
//               <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Comment</h3><button onClick={() => setShowReportModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button></div>
//               <div className="p-4">
//                 <textarea placeholder="Please describe why you're reporting this comment..." value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900" rows="4" />
//                 <div className="flex justify-end gap-2 mt-4"><button onClick={() => setShowReportModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button><button onClick={() => { if (reportReason.trim()) reportCommentMutation.mutate(reportReason) }} disabled={!reportReason.trim()} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Submit Report</button></div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default PoetryDetailPage

























// client/src/pages/public/PoetryDetailPage.jsx
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import {
  Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
  Sparkles, ChevronLeft, BookOpen, User, Clock, Loader2,
  AlertCircle, Headphones, Eye, Calendar, FileText,
  Brain, Mic, Wand2, Copy, Check, ChevronDown, ChevronUp,
  TrendingUp, Heart as HeartIcon, RefreshCw, Facebook, Twitter,
  Linkedin, Send, Flag, X, Edit2, Trash2, MoreVertical
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import poemAPI from '../../api/poemAPI'
import commentAPI from '../../api/commentAPI'
import AdBanner from '../../components/ads/AdBanner'

const PoetryDetailPage = () => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useSelector(state => state.auth)
  const isRTL = i18n.dir() === 'rtl'
  
  const [activeTab, setActiveTab] = useState('poem')
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiExpanded, setAiExpanded] = useState(true)
  const [copiedAnalysis, setCopiedAnalysis] = useState(false)
  const [analysisError, setAnalysisError] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [editingComment, setEditingComment] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [showMoreMenu, setShowMoreMenu] = useState(null)
  const [replyToComment, setReplyToComment] = useState(null)
  const [replyText, setReplyText] = useState('')
  
  // Transliteration states
  const [transliteration, setTransliteration] = useState(null)
  const [transliterationLoading, setTransliterationLoading] = useState(false)
  const [transliterationError, setTransliterationError] = useState(null)

  // Fetch poem data using slug
  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['poem', slug],
    queryFn: () => poemAPI.getPoem(slug),
    enabled: !!slug,
    retry: 1
  })

  const poem = response?.data?.data || response?.data || response

  // Fetch comments - FIXED: Always return array
  const { data: commentsResponse, refetch: refetchComments } = useQuery({
    queryKey: ['comments', poem?._id],
    queryFn: async () => {
      try {
        const response = await commentAPI.getComments(poem?._id);
        return response;
      } catch (error) {
        console.error('Error fetching comments:', error);
        return { data: [] };
      }
    },
    enabled: !!poem?._id,
  })
  
  // FIXED: Ensure comments is always an array
  const comments = useMemo(() => {
    const commentsData = commentsResponse?.data?.data || commentsResponse?.data || commentsResponse || [];
    return Array.isArray(commentsData) ? commentsData : [];
  }, [commentsResponse]);

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (text) => commentAPI.addComment(poem?._id, text),
    onSuccess: () => {
      toast.success('Comment added successfully!')
      setCommentText('')
      refetchComments()
      queryClient.invalidateQueries(['poem', slug])
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to add comment')
  })

  // Update comment mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, text }) => commentAPI.updateComment(poem?._id, commentId, text),
    onSuccess: () => {
      toast.success('Comment updated!')
      setEditingComment(null)
      refetchComments()
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update comment')
  })

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => commentAPI.deleteComment(poem?._id, commentId),
    onSuccess: () => {
      toast.success('Comment deleted')
      refetchComments()
      queryClient.invalidateQueries(['poem', slug])
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to delete comment')
  })

  // Like comment mutation
  const likeCommentMutation = useMutation({
    mutationFn: (commentId) => commentAPI.likeComment(poem?._id, commentId),
    onSuccess: () => refetchComments(),
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to like comment')
  })

  // Add reply mutation
  const addReplyMutation = useMutation({
    mutationFn: ({ commentId, text }) => commentAPI.addReply(poem?._id, commentId, text),
    onSuccess: () => {
      toast.success('Reply added!')
      setReplyText('')
      setReplyToComment(null)
      refetchComments()
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to add reply')
  })

  // Report comment mutation
  const reportCommentMutation = useMutation({
    mutationFn: ({ commentId, reason }) => commentAPI.reportComment(poem?._id, commentId, reason),
    onSuccess: () => {
      toast.success('Comment reported for review')
      setShowReportModal(false)
      setReportReason('')
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to report comment')
  })

  // Fetch transliteration
  const fetchTransliteration = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && poem?.transliteration && poem.transliteration.length > 0) {
      setTransliteration(poem.transliteration)
      return
    }
    if (transliterationLoading) return
    
    setTransliterationLoading(true)
    setTransliterationError(null)
    
    try {
      const result = await poemAPI.getTransliteration(slug)
      if (result.success && result.data) {
        setTransliteration(result.data)
        if (poem) poem.transliteration = result.data
      } else {
        throw new Error(result.error || 'Failed to fetch transliteration')
      }
    } catch (error) {
      setTransliterationError(error.message)
    } finally {
      setTransliterationLoading(false)
    }
  }, [slug, poem, transliterationLoading])

  // Generate transliteration
  const generateTransliteration = async () => {
    if (!poem?._id) return
    setTransliterationLoading(true)
    setTransliterationError(null)
    
    try {
      const result = await poemAPI.generateTransliteration(poem._id)
      if (result.success && result.data) {
        setTransliteration(result.data)
        if (poem) poem.transliteration = result.data
        toast.success(`Transliteration generated!`)
      } else {
        throw new Error(result.error || 'Failed to generate transliteration')
      }
    } catch (error) {
      setTransliterationError(error.message)
      toast.error(`Failed: ${error.message}`)
    } finally {
      setTransliterationLoading(false)
    }
  }

  // Fetch AI analysis
  const fetchAIAnalysis = async () => {
    if (aiAnalysis || aiLoading) return
    setAiLoading(true)
    setAnalysisError(null)
    
    try {
      const result = await poemAPI.getAIAnalysis(slug)
      let analysisData = null
      
      if (result?.success && result?.data?.analysis) analysisData = result.data.analysis
      else if (result?.success && result?.data) analysisData = result.data
      else if (result?.analysis) analysisData = result.analysis
      else if (result?.themes) analysisData = result
      
      if (analysisData && analysisData.themes) {
        setAiAnalysis({
          themes: analysisData.themes || ['Poetry', 'Emotion', 'Expression'],
          tone: analysisData.tone || 'Expressive',
          sentiment: analysisData.sentiment || 'neutral',
          emotions: analysisData.emotions || ['Thoughtful', 'Reflective'],
          meaning: analysisData.meaning || 'This poem expresses deep emotions through beautiful imagery.',
          literaryDevices: analysisData.literaryDevices || ['Imagery', 'Metaphor', 'Rhyme'],
          rhymeScheme: analysisData.rhymeScheme || 'Rhythmic pattern',
          difficulty: analysisData.difficulty || 'intermediate',
          provider: analysisData.provider || 'Gemini AI',
          analyzedAt: analysisData.analyzedAt || new Date().toISOString()
        })
        toast.success('AI analysis loaded!')
      } else {
        throw new Error('Invalid analysis data format')
      }
    } catch (error) {
      setAnalysisError(error.message)
      toast.error(`AI analysis failed`)
    } finally {
      setAiLoading(false)
    }
  }

  // Auto-fetch when tabs are opened
  useEffect(() => {
    if (activeTab === 'ai' && !aiAnalysis && !aiLoading && !analysisError) fetchAIAnalysis()
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'transliteration' && !transliteration && !transliterationLoading && !transliterationError && poem) {
      fetchTransliteration()
    }
  }, [activeTab, transliteration, transliterationLoading, transliterationError, poem, fetchTransliteration])

  // Share handlers
  const shareHandlers = {
    facebook: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
    },
    twitter: () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this beautiful poem: ${poem?.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
    },
    linkedin: () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400')
    },
    whatsapp: () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${poem?.title}\n${window.location.href}`)}`, '_blank')
    },
    copy: async () => {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
      setShowShareModal(false)
    }
  }

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: () => poemAPI.likePoem(slug),
    onSuccess: () => {
      queryClient.invalidateQueries(['poem', slug])
      toast.success('Updated')
    },
    onError: () => toast.error('Failed to update like')
  })

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => poemAPI.bookmarkPoem(slug),
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Date unknown'
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch (e) {
      return 'Date unknown'
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour ago`
    return `${diffDays} day ago`
  }

  const getAuthorName = () => {
    if (!poem?.author) return 'Unknown Author'
    if (typeof poem.author === 'object' && poem.author.name) return poem.author.name
    if (typeof poem.author === 'string') return poem.author
    return 'Unknown Author'
  }

  const getAuthorSlug = () => {
    if (!poem?.author) return '#'
    if (typeof poem.author === 'object' && poem.author.slug) return poem.author.slug
    return '#'
  }

  const getGenre = () => {
    if (!poem?.genre) return 'Poem'
    return poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)
  }

  const getLanguage = () => {
    const lang = poem?.language
    if (!lang) return 'Urdu'
    const langs = { urdu: 'Urdu', hindi: 'Hindi', english: 'English' }
    return langs[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
  }

  const getContentLines = () => {
    let content = ''
    if (poem?.language === 'hindi') content = poem?.contentHindi || poem?.content || ''
    else if (poem?.language === 'urdu') content = poem?.contentUrdu || poem?.content || ''
    else content = poem?.content || ''
    if (!content) return []
    return content.split('\n').filter(line => line.trim() !== '')
  }

  const getTranslationLines = () => {
    const translation = poem?.translation?.english || ''
    if (!translation) return []
    return translation.split('\n').filter(line => line.trim() !== '')
  }

  const getTransliterationLines = () => {
    const translitText = transliteration || poem?.transliteration || ''
    if (!translitText) return []
    return translitText.split('\n').filter(line => line.trim() !== '')
  }

  const isLiked = poem?.userInteraction?.isLiked || false
  const isBookmarked = poem?.userInteraction?.isBookmarked || false

  const handleLike = () => {
    if (!user) { toast.error('Please login to like poems'); return }
    likeMutation.mutate()
  }

  const handleBookmark = () => {
    if (!user) { toast.error('Please login to bookmark poems'); return }
    bookmarkMutation.mutate()
  }

  const handleAddComment = () => {
    if (!user) { toast.error('Please login to comment'); return }
    if (!commentText.trim()) { toast.error('Please enter a comment'); return }
    addCommentMutation.mutate(commentText.trim())
  }

  const handleUpdateComment = () => {
    if (!editingComment) return
    if (!commentText.trim()) { toast.error('Please enter a comment'); return }
    updateCommentMutation.mutate({ commentId: editingComment._id, text: commentText.trim() })
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment)
    setCommentText(comment.text)
  }

  const handleCancelEdit = () => {
    setEditingComment(null)
    setCommentText('')
  }

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId)
    }
  }

  const handleAddReply = (commentId) => {
    if (!user) { toast.error('Please login to reply'); return }
    if (!replyText.trim()) { toast.error('Please enter a reply'); return }
    addReplyMutation.mutate({ commentId, text: replyText.trim() })
  }

  const handleReportComment = (commentId, reason) => {
    reportCommentMutation.mutate({ commentId, reason })
  }

  const copyAnalysisToClipboard = () => {
    if (!aiAnalysis) return
    const analysisText = `
📜 Poem Analysis: ${poem?.title || 'Poem'}

🎭 Tone: ${aiAnalysis.tone || 'Expressive'}
💭 Sentiment: ${aiAnalysis.sentiment || 'Neutral'}

📚 Themes:
${aiAnalysis.themes?.map(t => `  • ${t}`).join('\n') || '  • Not available'}

💖 Emotions:
${aiAnalysis.emotions?.map(e => `  • ${e}`).join('\n') || '  • Not available'}

📖 Meaning:
${aiAnalysis.meaning || 'Not available'}

✨ Literary Devices:
${aiAnalysis.literaryDevices?.map(d => `  • ${d}`).join('\n') || '  • Not available'}

🎵 Rhyme Scheme: ${aiAnalysis.rhymeScheme || 'Not detected'}

⭐ Difficulty: ${aiAnalysis.difficulty || 'Intermediate'}

🤖 Analysis by ${aiAnalysis.provider || 'ZauqApp AI'}
    `.trim()
    navigator.clipboard.writeText(analysisText)
    setCopiedAnalysis(true)
    toast.success('Analysis copied!')
    setTimeout(() => setCopiedAnalysis(false), 2000)
  }

  const contentLines = getContentLines()
  const translationLines = getTranslationLines()
  const transliterationLines = getTransliterationLines()

  const tabs = [
    { id: 'poem', label: 'Poem', icon: BookOpen, show: true },
    { id: 'translation', label: 'Translation', icon: FileText, show: translationLines.length > 0 },
    { id: 'transliteration', label: 'Transliteration', icon: BookOpen, show: true },
    { id: 'ai', label: 'AI Analysis', icon: Brain, show: true },
    { id: 'audio', label: 'Audio', icon: Headphones, show: !!poem?.audioUrl }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading poem...</p>
        </div>
      </div>
    )
  }

  if (error || !poem) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Poem Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The poem you are looking for does not exist or has been removed.</p>
          <Link to="/poetry" className="btn-primary inline-flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Browse All Poetry</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two column layout - Main content + Sidebar */}
        <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/poetry" className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Poetry</span>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Eye className="h-3 w-3" />
                <span>{poem.stats?.views?.toLocaleString() || 0} views</span>
              </div>
            </div>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{poem.title || 'Untitled'}</h1>
              
              {poem.language === 'urdu' && poem.contentUrdu && (
                <p className="urdu-text text-xl text-gray-600 dark:text-gray-400 mb-3" dir="rtl">{poem.contentUrdu.split('\n')[0]}</p>
              )}
              {poem.language === 'hindi' && poem.contentHindi && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">{poem.contentHindi.split('\n')[0]}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <Link to={`/author/${getAuthorSlug()}`} className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  <span className="text-sm font-medium">{poem.stats?.likes?.toLocaleString() || 0}</span>
                </button>
                
                <button onClick={handleBookmark} disabled={bookmarkMutation.isPending} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
                  <span className="text-sm font-medium">{poem.stats?.bookmarks?.toLocaleString() || 0}</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{poem.stats?.comments?.toLocaleString() || 0}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => setShowShareModal(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                {poem.audioUrl && (
                  <button onClick={() => setActiveTab('audio')} className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Play className="h-4 w-4" />
                    <span className="text-sm">Listen</span>
                  </button>
                )}
              </div>
            </div>

            {/* Share Modal */}
            <AnimatePresence>
              {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this poem</h3>
                      <button onClick={() => setShowShareModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="p-4">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">{poem?.title}</p>
                        <p className="text-xs text-gray-400">by {getAuthorName()}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={shareHandlers.facebook} className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition"><Facebook className="h-5 w-5" /><span>Facebook</span></button>
                        <button onClick={shareHandlers.twitter} className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition"><Twitter className="h-5 w-5" /><span>Twitter</span></button>
                        <button onClick={shareHandlers.linkedin} className="flex items-center justify-center gap-2 p-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition"><Linkedin className="h-5 w-5" /><span>LinkedIn</span></button>
                        <button onClick={shareHandlers.whatsapp} className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition"><Send className="h-5 w-5" /><span>WhatsApp</span></button>
                      </div>
                      <div className="mt-3 flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <input type="text" value={window.location.href} readOnly className="flex-1 text-sm bg-transparent outline-none text-gray-600 dark:text-gray-400" />
                        <button onClick={shareHandlers.copy} className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">Copy</button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
              {tabs.filter(tab => tab.show).map((tab) => {
                const Icon = tab.icon
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {tab.id === 'ai' && aiAnalysis && <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Ready</span>}
                    {tab.id === 'transliteration' && transliterationLoading && <Loader2 className="ml-1 h-3 w-3 animate-spin" />}
                  </button>
                )
              })}
            </div>

            {/* Main Content - Poem Tab */}
            <div className="mb-8">
              {activeTab === 'poem' && (
                <motion.div key="poem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="text-center space-y-3" dir={poem?.language === 'urdu' ? 'rtl' : 'ltr'}>
                      {contentLines.length > 0 ? contentLines.map((line, index) => (
                        <p key={index} className={`${poem?.language === 'urdu' ? 'urdu-text text-xl md:text-2xl' : 'text-lg'} text-gray-800 dark:text-gray-200 leading-loose`}>{line}</p>
                      )) : <p className="text-gray-500 italic">No content available</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Translation Tab */}
              {activeTab === 'translation' && translationLines.length > 0 && (
                <motion.div key="translation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2"><BookOpen className="h-5 w-5 text-primary-600" /><span>English Translation</span></h3>
                  <div className="space-y-3">{translationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
                </motion.div>
              )}

              {/* Transliteration Tab */}
              {activeTab === 'transliteration' && (
                <motion.div key="transliteration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Mic className="h-5 w-5 text-primary-600" /><span>Roman Transliteration</span></h3>
                    {!transliterationLoading && (<button onClick={generateTransliteration} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"><RefreshCw className="h-3 w-3" />{transliteration ? 'Regenerate' : 'Generate'}</button>)}
                  </div>
                  {transliterationLoading ? (
                    <div className="text-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-3" /><p className="text-gray-500">Generating transliteration...</p></div>
                  ) : transliterationError ? (
                    <div className="text-center py-8"><AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" /><p className="text-gray-600 mb-2">Unable to generate transliteration</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Try Again</button></div>
                  ) : transliterationLines.length > 0 ? (
                    <div className="space-y-3">{transliterationLines.map((line, index) => (<p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>))}</div>
                  ) : (
                    <div className="text-center py-8"><Mic className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No transliteration available</p><button onClick={generateTransliteration} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">Generate Transliteration</button></div>
                  )}
                </motion.div>
              )}

              {/* AI Analysis Tab */}
              {activeTab === 'ai' && (
                <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {aiLoading ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center"><Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" /><p className="text-gray-600">AI is analyzing this poem...</p></div>
                  ) : aiAnalysis ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white"><Brain className="h-5 w-5" /><h3 className="font-semibold">AI Literary Analysis</h3><Sparkles className="h-4 w-4 text-yellow-300" /></div>
                          <div className="flex items-center gap-2">
                            <button onClick={copyAnalysisToClipboard} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{copiedAnalysis ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
                            <button onClick={() => setAiExpanded(!aiExpanded)} className="p-1.5 rounded-lg hover:bg-white/20 text-white transition">{aiExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</button>
                          </div>
                        </div>
                      </div>
                      {aiExpanded && (
                        <div className="p-6 space-y-5">
                          {aiAnalysis.themes && aiAnalysis.themes.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><TrendingUp className="h-4 w-4 text-purple-500" />Themes</h4><div className="flex flex-wrap gap-2">{aiAnalysis.themes.map((theme, i) => (<span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 rounded-full text-sm">{theme}</span>))}</div></div>)}
                          <div className="grid grid-cols-2 gap-4"><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tone</h4><p className="text-gray-800 dark:text-gray-200 capitalize">{aiAnalysis.tone}</p></div><div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sentiment</h4><span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${aiAnalysis.sentiment === 'positive' ? 'bg-green-100 text-green-700' : aiAnalysis.sentiment === 'sorrowful' ? 'bg-blue-100 text-blue-700' : aiAnalysis.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{aiAnalysis.sentiment === 'positive' ? 'Positive / Uplifting' : aiAnalysis.sentiment === 'sorrowful' ? 'Sorrowful / Melancholic' : aiAnalysis.sentiment === 'negative' ? 'Negative / Sad' : 'Neutral'}</span></div></div>
                          {aiAnalysis.emotions && aiAnalysis.emotions.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><HeartIcon className="h-4 w-4 text-pink-500" />Emotions Detected</h4><div className="flex flex-wrap gap-2">{aiAnalysis.emotions.map((emotion, i) => (<span key={i} className="px-2 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 rounded-full text-xs capitalize">{emotion}</span>))}</div></div>)}
                          <div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Meaning & Interpretation</h4><p className="text-gray-600 dark:text-gray-400 leading-relaxed">{aiAnalysis.meaning}</p></div>
                          {aiAnalysis.literaryDevices && aiAnalysis.literaryDevices.length > 0 && (<div><h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Literary Devices</h4><div className="flex flex-wrap gap-2">{aiAnalysis.literaryDevices.map((device, i) => (<span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">{device}</span>))}</div></div>)}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-700"><div><h4 className="text-xs text-gray-500">Rhyme Scheme</h4><p className="text-sm text-gray-700 dark:text-gray-300">{aiAnalysis.rhymeScheme}</p></div><div><h4 className="text-xs text-gray-500">Difficulty Level</h4><p className="text-sm text-gray-700 dark:text-gray-300 capitalize">{aiAnalysis.difficulty}</p></div></div>
                          <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">Analysis by {aiAnalysis.provider} • {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}</div>
                        </div>
                      )}
                    </div>
                  ) : analysisError ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><AlertCircle className="h-12 w-12 text-red-300 mx-auto mb-3" /><p className="text-red-600 mb-2">Failed to load AI analysis</p><button onClick={() => { setAnalysisError(null); fetchAIAnalysis() }} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Try Again</button></div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200"><Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">AI analysis not yet generated</p><button onClick={fetchAIAnalysis} className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg">Generate AI Analysis →</button></div>
                  )}
                </motion.div>
              )}

              {/* Audio Tab */}
              {activeTab === 'audio' && poem.audioUrl && (
                <motion.div key="audio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4"><Volume2 className="h-12 w-12 text-primary-600" /></div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Audio Narration</h3>
                  <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
                  <audio controls className="w-full max-w-md mx-auto"><source src={poem.audioUrl} type="audio/mpeg" />Your browser does not support the audio element.</audio>
                </motion.div>
              )}
            </div>

            {/* Related Poems */}
            {relatedPoems.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Poems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPoems.slice(0, 4).map((related) => (
                    <Link key={related._id} to={`/poem/${related.slug}`} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-0.5">
                      <h4 className="font-medium text-gray-900 dark:text-white">{related.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{typeof related.author === 'object' ? related.author?.name : related.author || 'Unknown'}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400"><Eye className="h-3 w-3" /><span>{related.stats?.views?.toLocaleString() || 0}</span><Heart className="h-3 w-3" /><span>{related.stats?.likes?.toLocaleString() || 0}</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section - FIXED with proper array handling */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary-600" />
                Comments ({poem.stats?.comments || (Array.isArray(comments) ? comments.length : 0)})
              </h3>
              
              {user ? (
                <div className="mb-6">
                  <div className="flex items-start gap-3">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=6366f1&color=fff`} 
                      alt={user.name || 'User'} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div className="flex-1">
                      <textarea 
                        placeholder={editingComment ? "Edit your comment..." : "Write a comment..."} 
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)} 
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" 
                        rows="3" 
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        {editingComment && (
                          <button onClick={handleCancelEdit} className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800">
                            Cancel
                          </button>
                        )}
                        <button 
                          onClick={editingComment ? handleUpdateComment : handleAddComment} 
                          disabled={addCommentMutation.isPending || updateCommentMutation.isPending} 
                          className="btn-primary text-sm py-1.5 px-4"
                        >
                          {editingComment ? 'Update Comment' : 'Post Comment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-6">
                  <p className="text-gray-500 mb-3">Please login to leave a comment</p>
                  <Link to="/login" className="btn-primary text-sm">Login</Link>
                </div>
              )}
              
              <div className="space-y-4">
                {!Array.isArray(comments) || comments.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-4">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user?.name || 'Anonymous')}&background=6366f1&color=fff`} 
                            alt={comment.user?.name || 'Anonymous'} 
                            className="w-8 h-8 rounded-full object-cover" 
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">{comment.user?.name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</p>
                          </div>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={() => setShowMoreMenu(showMoreMenu === comment._id ? null : comment._id)} 
                            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </button>
                          {showMoreMenu === comment._id && (
                            <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10`}>
                              <button 
                                onClick={() => likeCommentMutation.mutate(comment._id)} 
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <Heart className="h-3 w-3" />Like
                              </button>
                              <button 
                                onClick={() => setReplyToComment(comment)} 
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <MessageCircle className="h-3 w-3" />Reply
                              </button>
                              {user && (user._id === comment.user?._id || user.role === 'admin') && (
                                <>
                                  <button 
                                    onClick={() => handleEditComment(comment)} 
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                  >
                                    <Edit2 className="h-3 w-3" />Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteComment(comment._id)} 
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"
                                  >
                                    <Trash2 className="h-3 w-3" />Delete
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => { setShowReportModal(true); setShowMoreMenu(null); setReportReason(''); }} 
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <Flag className="h-3 w-3" />Report
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 ml-11">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2 ml-11">
                        <button 
                          onClick={() => likeCommentMutation.mutate(comment._id)} 
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition"
                        >
                          <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{comment.likesCount || comment.likes || 0}</span>
                        </button>
                        <button 
                          onClick={() => setReplyToComment(comment)} 
                          className="text-xs text-gray-400 hover:text-primary-600 transition"
                        >
                          Reply
                        </button>
                      </div>
                      
                      {/* Reply Input */}
                      {replyToComment?._id === comment._id && (
                        <div className="mt-3 ml-11">
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={replyText} 
                              onChange={(e) => setReplyText(e.target.value)} 
                              placeholder="Write a reply..." 
                              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900" 
                            />
                            <button 
                              onClick={() => handleAddReply(comment._id)} 
                              disabled={addReplyMutation.isPending} 
                              className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm"
                            >
                              Reply
                            </button>
                            <button 
                              onClick={() => { setReplyToComment(null); setReplyText(''); }} 
                              className="px-3 py-2 text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Display Replies */}
                      {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (
                        <div className="ml-11 mt-3 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="pl-3 border-l-2 border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={reply.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.user?.name || 'Anonymous')}&background=6366f1&color=fff`} 
                                  className="w-6 h-6 rounded-full" 
                                />
                                <span className="font-medium text-sm text-gray-900 dark:text-white">{reply.user?.name || 'Anonymous'}</span>
                                <span className="text-xs text-gray-400">{formatTimeAgo(reply.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Ads */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdBanner position="sidebar-top" page="poem-detail" autoHeight={false} />
              <AdBanner position="sidebar-bottom" page="poem-detail" autoHeight={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReportModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Comment</h3>
                <button onClick={() => setShowReportModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-4">
                <textarea 
                  placeholder="Please describe why you're reporting this comment..." 
                  value={reportReason} 
                  onChange={(e) => setReportReason(e.target.value)} 
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-900" 
                  rows="4" 
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowReportModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                  <button 
                    onClick={() => { if (reportReason.trim()) reportCommentMutation.mutate(reportReason) }} 
                    disabled={!reportReason.trim()} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PoetryDetailPage