// // client/src/pages/admin/SEOManagementPage.jsx
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Search, FileText, Globe, Sitemap, Tag, Edit, Save,
//   RefreshCw, CheckCircle, AlertCircle
// } from 'lucide-react'

// const seoPages = [
//   { id: 1, path: '/', title: 'ZauqApp - AI Powered Urdu Literary Ecosystem', description: 'Discover Urdu poetry, Hindi literature, and English classics...', keywords: 'urdu poetry, hindi literature, ghazals', status: 'optimized' },
//   { id: 2, path: '/poetry', title: 'Poetry Collection - ZauqApp', description: 'Explore ghazals, nazms, sher, and more...', keywords: 'ghazals, nazms, urdu poetry', status: 'optimized' },
//   { id: 3, path: '/authors', title: 'Authors & Poets - ZauqApp', description: 'Discover legendary poets and literary figures...', keywords: 'poets, authors, mirza ghalib', status: 'needs_update' },
//   { id: 4, path: '/books', title: 'Ebooks & Rare Books - ZauqApp', description: 'Access rare books, journals, and magazines...', keywords: 'ebooks, rare books, journals', status: 'optimized' },
// ]

// const SEOManagementPage = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedPage, setSelectedPage] = useState(null)
//   const [showEditModal, setShowEditModal] = useState(false)

//   const filteredPages = seoPages.filter(page =>
//     !searchQuery || page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     page.title.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Management</h1>
//           <p className="text-gray-500">Manage meta tags, sitemaps, and SEO optimization</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Sitemap className="h-5 w-5" />
//             <span>Generate Sitemap</span>
//           </button>
//           <button className="btn-primary inline-flex items-center space-x-2">
//             <RefreshCw className="h-5 w-5" />
//             <span>Run SEO Audit</span>
//           </button>
//         </div>
//       </div>

//       {/* SEO Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: 'Pages Optimized', value: '24/30', icon: CheckCircle, color: 'green' },
//           { label: 'Pages Need Update', value: '6', icon: AlertCircle, color: 'yellow' },
//           { label: 'Avg. Meta Title Length', value: '58 chars', icon: FileText, color: 'blue' },
//           { label: 'Sitemap Status', value: 'Updated', icon: Sitemap, color: 'purple' },
//         ].map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="card p-6"
//           >
//             <stat.icon className={`h-8 w-8 text-${stat.color}-600 mb-3`} />
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-sm text-gray-500">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search pages..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="input-field pl-10"
//         />
//       </div>

//       {/* Pages Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredPages.map((page) => (
//                 <motion.tr
//                   key={page.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <Globe className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm font-medium text-gray-900">{page.path}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-sm text-gray-900">{page.title}</p>
//                     <p className="text-xs text-gray-500 line-clamp-1">{page.description}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex flex-wrap gap-1">
//                       {page.keywords.split(', ').map((keyword, i) => (
//                         <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
//                       page.status === 'optimized'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {page.status === 'optimized' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
//                       <span>{page.status}</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => { setSelectedPage(page); setShowEditModal(true) }}
//                       className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && selectedPage && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <h2 className="text-xl font-bold text-gray-900 mb-6">Edit SEO - {selectedPage.path}</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.title}
//                   className="input-field"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//                 <textarea
//                   defaultValue={selectedPage.description}
//                   className="input-field h-24"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.keywords}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.path}
//                   className="input-field"
//                 />
//               </div>
//               <div className="flex items-center space-x-4 pt-4">
//                 <button className="btn-primary inline-flex items-center space-x-2">
//                   <Save className="h-4 w-4" />
//                   <span>Save Changes</span>
//                 </button>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SEOManagementPage



// // // client/src/pages/admin/SEOManagementPage.jsx
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Search, FileText, Globe, Network, Tag, Edit, Save,
//   RefreshCw, CheckCircle, AlertCircle
// } from 'lucide-react'

// const seoPages = [
//   { id: 1, path: '/', title: 'ZauqApp - AI Powered Urdu Literary Ecosystem', description: 'Discover Urdu poetry, Hindi literature, and English classics...', keywords: 'urdu poetry, hindi literature, ghazals', status: 'optimized' },
//   { id: 2, path: '/poetry', title: 'Poetry Collection - ZauqApp', description: 'Explore ghazals, nazms, sher, and more...', keywords: 'ghazals, nazms, urdu poetry', status: 'optimized' },
//   { id: 3, path: '/authors', title: 'Authors & Poets - ZauqApp', description: 'Discover legendary poets and literary figures...', keywords: 'poets, authors, mirza ghalib', status: 'needs_update' },
//   { id: 4, path: '/books', title: 'Ebooks & Rare Books - ZauqApp', description: 'Access rare books, journals, and magazines...', keywords: 'ebooks, rare books, journals', status: 'optimized' },
// ]

// const SEOManagementPage = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedPage, setSelectedPage] = useState(null)
//   const [showEditModal, setShowEditModal] = useState(false)

//   const filteredPages = seoPages.filter(page =>
//     !searchQuery || page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     page.title.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Management</h1>
//           <p className="text-gray-500">Manage meta tags, sitemaps, and SEO optimization</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Network className="h-5 w-5" />
//             <span>Generate Sitemap</span>
//           </button>
//           <button className="btn-primary inline-flex items-center space-x-2">
//             <RefreshCw className="h-5 w-5" />
//             <span>Run SEO Audit</span>
//           </button>
//         </div>
//       </div>

//       {/* SEO Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: 'Pages Optimized', value: '24/30', icon: CheckCircle, color: 'green' },
//           { label: 'Pages Need Update', value: '6', icon: AlertCircle, color: 'yellow' },
//           { label: 'Avg. Meta Title Length', value: '58 chars', icon: FileText, color: 'blue' },
//           { label: 'Sitemap Status', value: 'Updated', icon: Network, color: 'purple' },
//         ].map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="card p-6"
//           >
//             <stat.icon className={`h-8 w-8 text-${stat.color}-600 mb-3`} />
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-sm text-gray-500">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search pages..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="input-field pl-10"
//         />
//       </div>

//       {/* Pages Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredPages.map((page) => (
//                 <motion.tr
//                   key={page.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <Globe className="h-4 w-4 text-gray-400" />
//                       <span className="text-sm font-medium text-gray-900">{page.path}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-sm text-gray-900">{page.title}</p>
//                     <p className="text-xs text-gray-500 line-clamp-1">{page.description}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex flex-wrap gap-1">
//                       {page.keywords.split(', ').map((keyword, i) => (
//                         <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
//                       page.status === 'optimized'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {page.status === 'optimized' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
//                       <span>{page.status}</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => { setSelectedPage(page); setShowEditModal(true) }}
//                       className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && selectedPage && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
//           >
//             <h2 className="text-xl font-bold text-gray-900 mb-6">Edit SEO - {selectedPage.path}</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.title}
//                   className="input-field"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
//                 <textarea
//                   defaultValue={selectedPage.description}
//                   className="input-field h-24"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.keywords}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
//                 <input
//                   type="text"
//                   defaultValue={selectedPage.path}
//                   className="input-field"
//                 />
//               </div>
//               <div className="flex items-center space-x-4 pt-4">
//                 <button className="btn-primary inline-flex items-center space-x-2">
//                   <Save className="h-4 w-4" />
//                   <span>Save Changes</span>
//                 </button>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SEOManagementPage















// // client/src/pages/admin/SEOManagementPage.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion } from 'framer-motion'
// import api from '../../api/apiConfig' // Import your configured axios instance
// import {
//   Search, FileText, Globe, Network, Tag, Edit, Save,
//   RefreshCw, CheckCircle, AlertCircle, X, Loader2,
//   Eye, Code, Twitter, Facebook
// } from 'lucide-react'

// const SEOManagementPage = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedPage, setSelectedPage] = useState(null)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [activeTab, setActiveTab] = useState('meta')
//   const [loading, setLoading] = useState(false)
//   const [dashboardData, setDashboardData] = useState(null)
//   const [seoPages, setSeoPages] = useState([])
//   const [sitemapStatus, setSitemapStatus] = useState(null)
//   const [auditRunning, setAuditRunning] = useState(false)
//   const [auditResults, setAuditResults] = useState(null)
  
//   // Refs for form inputs
//   const metaTitleRef = useRef(null)
//   const metaDescriptionRef = useRef(null)
//   const keywordsRef = useRef(null)
//   const canonicalUrlRef = useRef(null)
//   const ogTitleRef = useRef(null)
//   const ogDescriptionRef = useRef(null)
//   const ogImageRef = useRef(null)
//   const structuredDataRef = useRef(null)

//   // Fetch SEO dashboard data
//   const fetchDashboard = async () => {
//     setLoading(true)
//     try {
//       // Use api instance instead of axios directly
//       const response = await api.get('/seo/dashboard')
//       console.log('Dashboard response:', response.data)
      
//       // Handle response properly - extract data from wrapper
//       const data = response.data?.data || response.data
//       setDashboardData(data)
      
//       // Transform pages for table display
//       const pages = (data?.pages || []).map(page => ({
//         id: page._id,
//         page: page.page,
//         path: page.page === 'home' ? '/' : `/${page.page}`,
//         title: page.metaTitle || '',
//         description: page.metaDescription || '',
//         keywords: Array.isArray(page.metaKeywords) ? page.metaKeywords.join(', ') : (page.metaKeywords || ''),
//         status: page.isActive ? 'optimized' : 'needs_update',
//         structuredData: page.structuredData || {},
//         ogTitle: page.ogTitle || '',
//         ogDescription: page.ogDescription || '',
//         ogImage: page.ogImage || '',
//         canonicalUrl: page.canonicalUrl || '',
//         twitterCard: page.twitterCard || 'summary_large_image',
//         isActive: page.isActive,
//         updatedAt: page.updatedAt,
//         createdAt: page.createdAt
//       }))
//       setSeoPages(pages)
//     } catch (error) {
//       console.error('Failed to fetch SEO dashboard:', error)
//       if (error.response?.status === 401) {
//         alert('Authentication required. Please log in again.')
//       } else {
//         alert('Failed to load SEO data. Please check your connection and try again.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Generate sitemap - fetch and display
//   const generateSitemap = async () => {
//     setSitemapStatus('generating')
//     try {
//       // Sitemap doesn't require auth, but using api instance is fine
//       const response = await api.get('/seo/sitemap.xml', {
//         responseType: 'text'
//       })
      
//       // Create a blob and download the sitemap
//       const blob = new Blob([response.data], { type: 'application/xml' })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = 'sitemap.xml'
//       document.body.appendChild(a)
//       a.click()
//       document.body.removeChild(a)
//       URL.revokeObjectURL(url)
      
//       setSitemapStatus('success')
//       setTimeout(() => setSitemapStatus(null), 3000)
//     } catch (error) {
//       console.error('Failed to generate sitemap:', error)
//       setSitemapStatus('error')
//       setTimeout(() => setSitemapStatus(null), 3000)
//     }
//   }

//   // Run SEO audit
//   const runSeoAudit = async () => {
//     setAuditRunning(true)
//     setAuditResults(null)
    
//     // Simulate audit processing
//     await new Promise(resolve => setTimeout(resolve, 1500))
    
//     const audit = {
//       totalPages: seoPages.length,
//       issues: [],
//       warnings: [],
//       passed: []
//     }
    
//     seoPages.forEach(page => {
//       // Check if meta title exists
//       if (!page.title || page.title.trim() === '') {
//         audit.issues.push({ 
//           page: page.path, 
//           issue: 'Missing meta title', 
//           severity: 'high',
//           recommendation: 'Add a unique meta title for this page'
//         })
//       } 
//       // Check meta title length
//       else if (page.title.length < 30) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Meta title too short', 
//           current: `${page.title.length} chars`,
//           recommendation: 'Should be 50-60 characters'
//         })
//       } else if (page.title.length > 60) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Meta title too long', 
//           current: `${page.title.length} chars`,
//           recommendation: 'Should be 50-60 characters'
//         })
//       } else {
//         audit.passed.push({ page: page.path, check: 'Meta title length OK' })
//       }
      
//       // Check meta description
//       if (!page.description || page.description.trim() === '') {
//         audit.issues.push({ 
//           page: page.path, 
//           issue: 'Missing meta description', 
//           severity: 'high',
//           recommendation: 'Add a compelling meta description'
//         })
//       } else if (page.description.length < 120) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Meta description too short', 
//           current: `${page.description.length} chars`,
//           recommendation: 'Should be 150-160 characters'
//         })
//       } else if (page.description.length > 160) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Meta description too long', 
//           current: `${page.description.length} chars`,
//           recommendation: 'Should be 150-160 characters'
//         })
//       } else {
//         audit.passed.push({ page: page.path, check: 'Meta description length OK' })
//       }
      
//       // Check OG tags for social sharing
//       if (!page.ogTitle && !page.title) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Missing OG title - social sharing will use page title',
//           recommendation: 'Add custom OG title for better social media sharing'
//         })
//       }
      
//       if (!page.ogDescription && !page.description) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'Missing OG description',
//           recommendation: 'Add custom OG description for better social sharing'
//         })
//       }
      
//       // Check if page is active
//       if (!page.isActive) {
//         audit.warnings.push({ 
//           page: page.path, 
//           issue: 'SEO meta is inactive',
//           recommendation: 'Activate SEO meta to make it live'
//         })
//       }
//     })
    
//     setAuditResults(audit)
//     setAuditRunning(false)
//   }

//   // Update SEO meta
//   const updateSEOMeta = async (pageData) => {
//     setLoading(true)
//     try {
//       const pageName = pageData.page === 'home' ? 'home' : pageData.path.slice(1)
      
//       const updatePayload = {
//         metaTitle: pageData.title,
//         metaDescription: pageData.description,
//         metaKeywords: pageData.keywords ? pageData.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
//         ogTitle: pageData.ogTitle,
//         ogDescription: pageData.ogDescription,
//         ogImage: pageData.ogImage,
//         canonicalUrl: pageData.canonicalUrl,
//         twitterCard: pageData.twitterCard || 'summary_large_image',
//         isActive: true
//       }
      
//       // Use api instance
//       const response = await api.put(`/seo/meta/${pageName}`, updatePayload)
//       const updatedData = response.data?.data || response.data
      
//       // Update local state with the response data
//       setSeoPages(prev => prev.map(p => 
//         p.id === pageData.id 
//           ? { 
//               ...p, 
//               title: updatedData.metaTitle || pageData.title,
//               description: updatedData.metaDescription || pageData.description,
//               keywords: Array.isArray(updatedData.metaKeywords) ? updatedData.metaKeywords.join(', ') : pageData.keywords,
//               ogTitle: updatedData.ogTitle || pageData.ogTitle,
//               ogDescription: updatedData.ogDescription || pageData.ogDescription,
//               ogImage: updatedData.ogImage || pageData.ogImage,
//               canonicalUrl: updatedData.canonicalUrl || pageData.canonicalUrl,
//               status: 'optimized',
//               isActive: true
//             } 
//           : p
//       ))
      
//       setShowEditModal(false)
      
//       // Refresh dashboard to get updated counts
//       await fetchDashboard()
      
//       alert('SEO meta updated successfully!')
//     } catch (error) {
//       console.error('Failed to update SEO:', error)
//       if (error.response?.status === 401) {
//         alert('Authentication required. Please log in again.')
//       } else {
//         alert('Failed to update SEO meta. Please try again.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Update structured data
//   const updateStructuredData = async (pageId, pageData, structuredDataJson) => {
//     try {
//       const pageName = pageData.page === 'home' ? 'home' : pageData.path.slice(1)
//       const structuredData = JSON.parse(structuredDataJson)
      
//       // Use api instance
//       const response = await api.put(`/seo/structured-data/${pageName}`, structuredData)
//       const updatedData = response.data?.data || response.data
      
//       // Update local state
//       setSeoPages(prev => prev.map(p => 
//         p.id === pageId 
//           ? { ...p, structuredData: updatedData.structuredData || structuredData }
//           : p
//       ))
      
//       alert('Structured data updated successfully!')
//     } catch (error) {
//       console.error('Failed to update structured data:', error)
//       if (error instanceof SyntaxError) {
//         alert('Invalid JSON format. Please check your structured data.')
//       } else if (error.response?.status === 401) {
//         alert('Authentication required. Please log in again.')
//       } else {
//         alert('Failed to update structured data. Please try again.')
//       }
//     }
//   }

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const stats = [
//     { 
//       label: 'Pages Optimized', 
//       value: dashboardData ? `${dashboardData.activePages || 0}/${dashboardData.totalPages || 0}` : '0/0', 
//       icon: CheckCircle, 
//       color: 'green' 
//     },
//     { 
//       label: 'Pages Need Update', 
//       value: dashboardData?.inactivePages?.toString() || '0', 
//       icon: AlertCircle, 
//       color: 'yellow' 
//     },
//     { 
//       label: 'Avg. Meta Title Length', 
//       value: seoPages.length ? `${Math.round(seoPages.reduce((acc, p) => acc + (p.title?.length || 0), 0) / seoPages.length)} chars` : '0 chars',
//       icon: FileText, 
//       color: 'blue' 
//     },
//     { 
//       label: 'Total Pages', 
//       value: dashboardData?.totalPages?.toString() || seoPages.length.toString(),
//       icon: Globe, 
//       color: 'purple' 
//     },
//   ]

//   const filteredPages = seoPages.filter(page =>
//     !searchQuery || 
//     page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     page.page?.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   // Preview component for meta tags
//   const GooglePreview = ({ title, description, url }) => (
//     <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
//       <div className="text-lg text-blue-800 hover:underline cursor-pointer line-clamp-1">
//         {title || 'No title set'}
//       </div>
//       <div className="text-sm text-green-700">
//         {url || 'https://zauqapp.com'}
//       </div>
//       <div className="text-sm text-gray-600 line-clamp-2">
//         {description || 'No description set'}
//       </div>
//     </div>
//   )

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Management</h1>
//           <p className="text-gray-500">Manage meta tags, sitemaps, and SEO optimization</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button 
//             onClick={generateSitemap}
//             className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             disabled={sitemapStatus === 'generating'}
//           >
//             {sitemapStatus === 'generating' ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <Network className="h-5 w-5" />
//             )}
//             <span>Download Sitemap</span>
//           </button>
//           <button 
//             onClick={runSeoAudit}
//             className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
//             disabled={auditRunning}
//           >
//             {auditRunning ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <RefreshCw className="h-5 w-5" />
//             )}
//             <span>Run SEO Audit</span>
//           </button>
//         </div>
//       </div>

//       {/* SEO Overview Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
//           >
//             <stat.icon className={`h-8 w-8 text-${stat.color}-600 mb-3`} />
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-sm text-gray-500">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Audit Results */}
//       {auditResults && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
//         >
//           <h3 className="font-semibold text-gray-900 mb-4">Audit Results</h3>
//           <div className="space-y-4">
//             {auditResults.issues.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
//                   <AlertCircle className="h-4 w-4 mr-1" />
//                   Issues ({auditResults.issues.length})
//                 </h4>
//                 <div className="space-y-2">
//                   {auditResults.issues.map((issue, i) => (
//                     <div key={i} className="text-sm text-gray-600 p-2 bg-red-50 rounded-lg">
//                       <div className="font-medium">{issue.page}</div>
//                       <div>{issue.issue}</div>
//                       {issue.recommendation && (
//                         <div className="text-xs text-gray-500 mt-1">💡 {issue.recommendation}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {auditResults.warnings.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-yellow-600 mb-2 flex items-center">
//                   <AlertCircle className="h-4 w-4 mr-1" />
//                   Warnings ({auditResults.warnings.length})
//                 </h4>
//                 <div className="space-y-2">
//                   {auditResults.warnings.map((warning, i) => (
//                     <div key={i} className="text-sm text-gray-600 p-2 bg-yellow-50 rounded-lg">
//                       <div className="font-medium">{warning.page}</div>
//                       <div>{warning.issue}</div>
//                       {warning.current && <div className="text-xs">Current: {warning.current}</div>}
//                       {warning.recommendation && (
//                         <div className="text-xs text-gray-500 mt-1">💡 {warning.recommendation}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {auditResults.passed.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-1" />
//                   Passed ({auditResults.passed.length})
//                 </h4>
//                 <div className="space-y-1">
//                   {auditResults.passed.slice(0, 5).map((pass, i) => (
//                     <div key={i} className="text-sm text-gray-600 flex items-start space-x-2">
//                       <span className="text-green-500">✓</span>
//                       <span><strong>{pass.page}</strong>: {pass.check}</span>
//                     </div>
//                   ))}
//                   {auditResults.passed.length > 5 && (
//                     <div className="text-sm text-gray-400">+{auditResults.passed.length - 5} more</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}

//       {/* Search */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search pages by path or title..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       {/* Pages Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center">
//                     <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
//                     <p className="text-sm text-gray-500 mt-2">Loading SEO data...</p>
//                    </td>
//                  </tr>
//               ) : filteredPages.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                     {searchQuery ? 'No pages match your search' : 'No SEO pages found'}
//                    </td>
//                  </tr>
//               ) : (
//                 filteredPages.map((page) => (
//                   <motion.tr
//                     key={page.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center space-x-2">
//                         <Globe className="h-4 w-4 text-gray-400" />
//                         <span className="text-sm font-medium text-gray-900">{page.path}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="text-sm text-gray-900 line-clamp-1">{page.title || 'Not set'}</p>
//                       <p className="text-xs text-gray-500 line-clamp-1">{page.description || 'Not set'}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-wrap gap-1">
//                         {page.keywords ? page.keywords.split(',').slice(0, 3).map((keyword, i) => (
//                           <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
//                             {keyword.trim()}
//                           </span>
//                         )) : <span className="text-xs text-gray-400">No keywords</span>}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
//                         page.status === 'optimized'
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {page.status === 'optimized' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
//                         <span>{page.status === 'optimized' ? 'Optimized' : 'Needs Update'}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button
//                         onClick={() => { setSelectedPage(page); setShowEditModal(true); setActiveTab('meta') }}
//                         className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal - Keep the same modal code */}
//       {showEditModal && selectedPage && (
//         // ... (keep the same modal JSX from previous version)
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           {/* Modal content - same as before */}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SEOManagementPage


















// client/src/pages/admin/SEOManagementPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import api from '../../api/apiConfig'
import {
  Search, FileText, Globe, Network, Tag, Edit, Save,
  RefreshCw, CheckCircle, AlertCircle, X, Loader2,
  Eye, Code, Twitter, Facebook, Link as LinkIcon
} from 'lucide-react'

const SEOManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPage, setSelectedPage] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeTab, setActiveTab] = useState('meta')
  const [loading, setLoading] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [seoPages, setSeoPages] = useState([])
  const [sitemapStatus, setSitemapStatus] = useState(null)
  const [auditRunning, setAuditRunning] = useState(false)
  const [auditResults, setAuditResults] = useState(null)
  
  // Refs for form inputs
  const metaTitleRef = useRef(null)
  const metaDescriptionRef = useRef(null)
  const keywordsRef = useRef(null)
  const canonicalUrlRef = useRef(null)
  const ogTitleRef = useRef(null)
  const ogDescriptionRef = useRef(null)
  const ogImageRef = useRef(null)
  const structuredDataRef = useRef(null)

  // Fetch SEO dashboard data
  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/seo/dashboard')
      console.log('Dashboard API Response:', response.data)
      
      // Extract data from response wrapper
      const data = response.data?.data || response.data
      setDashboardData(data)
      
      // Transform pages for table display
      const pages = (data?.pages || []).map(page => ({
        id: page._id,
        page: page.page,
        path: page.page === 'home' ? '/' : `/${page.page}`,
        title: page.metaTitle || '',
        description: page.metaDescription || '',
        keywords: Array.isArray(page.metaKeywords) ? page.metaKeywords.join(', ') : (page.metaKeywords || ''),
        status: page.isActive ? 'optimized' : 'needs_update',
        structuredData: page.structuredData || {},
        ogTitle: page.ogTitle || '',
        ogDescription: page.ogDescription || '',
        ogImage: page.ogImage || '',
        canonicalUrl: page.canonicalUrl || '',
        twitterCard: page.twitterCard || 'summary_large_image',
        isActive: page.isActive,
        updatedAt: page.updatedAt,
        createdAt: page.createdAt
      }))
      
      setSeoPages(pages)
      console.log('Loaded SEO Pages:', pages.length)
    } catch (error) {
      console.error('Failed to fetch SEO dashboard:', error)
      if (error.response?.status === 401) {
        alert('Authentication required. Please log in again.')
      } else {
        alert('Failed to load SEO data. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Generate sitemap
  const generateSitemap = async () => {
    setSitemapStatus('generating')
    try {
      const response = await api.get('/seo/sitemap.xml', {
        responseType: 'text'
      })
      
      // Create a blob and download the sitemap
      const blob = new Blob([response.data], { type: 'application/xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'sitemap.xml'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setSitemapStatus('success')
      setTimeout(() => setSitemapStatus(null), 3000)
    } catch (error) {
      console.error('Failed to generate sitemap:', error)
      setSitemapStatus('error')
      setTimeout(() => setSitemapStatus(null), 3000)
    }
  }

  // Run SEO audit
  const runSeoAudit = async () => {
    setAuditRunning(true)
    setAuditResults(null)
    
    // Simulate audit processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const audit = {
      totalPages: seoPages.length,
      issues: [],
      warnings: [],
      passed: []
    }
    
    seoPages.forEach(page => {
      // Check if meta title exists
      if (!page.title || page.title.trim() === '') {
        audit.issues.push({ 
          page: page.path, 
          issue: 'Missing meta title', 
          severity: 'high',
          recommendation: 'Add a unique meta title for this page'
        })
      } 
      // Check meta title length
      else if (page.title.length < 30) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Meta title too short', 
          current: `${page.title.length} chars`,
          recommendation: 'Should be 50-60 characters'
        })
      } else if (page.title.length > 60) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Meta title too long', 
          current: `${page.title.length} chars`,
          recommendation: 'Should be 50-60 characters'
        })
      } else {
        audit.passed.push({ page: page.path, check: 'Meta title length OK' })
      }
      
      // Check meta description
      if (!page.description || page.description.trim() === '') {
        audit.issues.push({ 
          page: page.path, 
          issue: 'Missing meta description', 
          severity: 'high',
          recommendation: 'Add a compelling meta description'
        })
      } else if (page.description.length < 120) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Meta description too short', 
          current: `${page.description.length} chars`,
          recommendation: 'Should be 150-160 characters'
        })
      } else if (page.description.length > 160) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Meta description too long', 
          current: `${page.description.length} chars`,
          recommendation: 'Should be 150-160 characters'
        })
      } else {
        audit.passed.push({ page: page.path, check: 'Meta description length OK' })
      }
      
      // Check OG tags
      if (!page.ogTitle && !page.title) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Missing OG title',
          recommendation: 'Add custom OG title for better social sharing'
        })
      }
      
      if (!page.ogDescription && !page.description) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'Missing OG description',
          recommendation: 'Add custom OG description for better social sharing'
        })
      }
      
      // Check if page is active
      if (!page.isActive) {
        audit.warnings.push({ 
          page: page.path, 
          issue: 'SEO meta is inactive',
          recommendation: 'Activate SEO meta to make it live'
        })
      }
    })
    
    setAuditResults(audit)
    setAuditRunning(false)
  }

  // Update SEO meta
  const updateSEOMeta = async (pageData) => {
    setLoading(true)
    try {
      const pageName = pageData.page === 'home' ? 'home' : pageData.path.slice(1)
      
      const updatePayload = {
        metaTitle: pageData.title,
        metaDescription: pageData.description,
        metaKeywords: pageData.keywords ? pageData.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
        ogTitle: pageData.ogTitle,
        ogDescription: pageData.ogDescription,
        ogImage: pageData.ogImage,
        canonicalUrl: pageData.canonicalUrl,
        twitterCard: pageData.twitterCard || 'summary_large_image',
        isActive: true
      }
      
      const response = await api.put(`/seo/meta/${pageName}`, updatePayload)
      const updatedData = response.data?.data || response.data
      
      // Update local state
      setSeoPages(prev => prev.map(p => 
        p.id === pageData.id 
          ? { 
              ...p, 
              title: updatedData.metaTitle || pageData.title,
              description: updatedData.metaDescription || pageData.description,
              keywords: Array.isArray(updatedData.metaKeywords) ? updatedData.metaKeywords.join(', ') : pageData.keywords,
              ogTitle: updatedData.ogTitle || pageData.ogTitle,
              ogDescription: updatedData.ogDescription || pageData.ogDescription,
              ogImage: updatedData.ogImage || pageData.ogImage,
              canonicalUrl: updatedData.canonicalUrl || pageData.canonicalUrl,
              status: 'optimized',
              isActive: true
            } 
          : p
      ))
      
      setShowEditModal(false)
      
      // Refresh dashboard for updated counts
      await fetchDashboard()
      
      alert('SEO meta updated successfully!')
    } catch (error) {
      console.error('Failed to update SEO:', error)
      alert('Failed to update SEO meta. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Update structured data
  const updateStructuredData = async (pageId, pageData, structuredDataJson) => {
    try {
      const pageName = pageData.page === 'home' ? 'home' : pageData.path.slice(1)
      const structuredData = JSON.parse(structuredDataJson)
      
      const response = await api.put(`/seo/structured-data/${pageName}`, structuredData)
      const updatedData = response.data?.data || response.data
      
      setSeoPages(prev => prev.map(p => 
        p.id === pageId 
          ? { ...p, structuredData: updatedData.structuredData || structuredData }
          : p
      ))
      
      alert('Structured data updated successfully!')
    } catch (error) {
      console.error('Failed to update structured data:', error)
      if (error instanceof SyntaxError) {
        alert('Invalid JSON format. Please check your structured data.')
      } else {
        alert('Failed to update structured data. Please try again.')
      }
    }
  }

  // Handle edit button click
  const handleEditClick = (page) => {
    console.log('Editing page:', page)
    setSelectedPage(page)
    setShowEditModal(true)
    setActiveTab('meta')
  }

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const stats = [
    { 
      label: 'Pages Optimized', 
      value: dashboardData ? `${dashboardData.activePages || 0}/${dashboardData.totalPages || 0}` : '0/0', 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      label: 'Pages Need Update', 
      value: dashboardData?.inactivePages?.toString() || '0', 
      icon: AlertCircle, 
      color: 'yellow' 
    },
    { 
      label: 'Avg. Meta Title Length', 
      value: seoPages.length ? `${Math.round(seoPages.reduce((acc, p) => acc + (p.title?.length || 0), 0) / seoPages.length)} chars` : '0 chars',
      icon: FileText, 
      color: 'blue' 
    },
    { 
      label: 'Total Pages', 
      value: dashboardData?.totalPages?.toString() || seoPages.length.toString(),
      icon: Globe, 
      color: 'purple' 
    },
  ]

  const filteredPages = seoPages.filter(page =>
    !searchQuery || 
    page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.page?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Preview component
  const GooglePreview = ({ title, description, url }) => (
    <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
      <div className="text-lg text-blue-800 hover:underline cursor-pointer line-clamp-1">
        {title || 'No title set'}
      </div>
      <div className="text-sm text-green-700">
        {url || 'https://zauqapp.com'}
      </div>
      <div className="text-sm text-gray-600 line-clamp-2">
        {description || 'No description set'}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Management</h1>
          <p className="text-gray-500">Manage meta tags, sitemaps, and SEO optimization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={generateSitemap}
            className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={sitemapStatus === 'generating'}
          >
            {sitemapStatus === 'generating' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Network className="h-5 w-5" />
            )}
            <span>Download Sitemap</span>
          </button>
          <button 
            onClick={runSeoAudit}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            disabled={auditRunning}
          >
            {auditRunning ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}
            <span>Run SEO Audit</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <stat.icon className={`h-8 w-8 text-${stat.color}-600 mb-3`} />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Audit Results */}
      {auditResults && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Audit Results</h3>
          <div className="space-y-4">
            {auditResults.issues.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-red-600 mb-2">Issues ({auditResults.issues.length})</h4>
                {auditResults.issues.map((issue, i) => (
                  <div key={i} className="text-sm text-gray-600 p-2 bg-red-50 rounded-lg mb-2">
                    <div className="font-medium">{issue.page}</div>
                    <div>{issue.issue}</div>
                    {issue.recommendation && (
                      <div className="text-xs text-gray-500 mt-1">💡 {issue.recommendation}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {auditResults.warnings.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-yellow-600 mb-2">Warnings ({auditResults.warnings.length})</h4>
                {auditResults.warnings.map((warning, i) => (
                  <div key={i} className="text-sm text-gray-600 p-2 bg-yellow-50 rounded-lg mb-2">
                    <div className="font-medium">{warning.page}</div>
                    <div>{warning.issue}</div>
                    {warning.current && <div className="text-xs">Current: {warning.current}</div>}
                    {warning.recommendation && (
                      <div className="text-xs text-gray-500 mt-1">💡 {warning.recommendation}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search pages by path or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Loading SEO data...</p>
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? 'No pages match your search' : 'No SEO pages found. Please create SEO entries first.'}
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <motion.tr
                    key={page.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{page.path}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 line-clamp-1">{page.title || 'Not set'}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{page.description || 'Not set'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {page.keywords ? page.keywords.split(',').slice(0, 3).map((keyword, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {keyword.trim()}
                          </span>
                        )) : <span className="text-xs text-gray-400">No keywords</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                        page.status === 'optimized'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {page.status === 'optimized' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        <span>{page.status === 'optimized' ? 'Optimized' : 'Needs Update'}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditClick(page)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors"
                        title="Edit SEO"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit SEO - {selectedPage.path}</h2>
                <p className="text-sm text-gray-500 mt-1">Optimize your page for search engines</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              {[
                { id: 'meta', label: 'Meta Tags', icon: Tag },
                { id: 'social', label: 'Social Media', icon: Facebook },
                { id: 'structured', label: 'Structured Data', icon: Code },
                { id: 'preview', label: 'Preview', icon: Eye }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'meta' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={metaTitleRef}
                      type="text"
                      defaultValue={selectedPage.title || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter meta title (50-60 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters for better CTR</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      ref={metaDescriptionRef}
                      defaultValue={selectedPage.description || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                      placeholder="Enter meta description (150-160 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters. Include primary keyword.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                      ref={keywordsRef}
                      type="text"
                      defaultValue={selectedPage.keywords || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="urdu poetry, ghazals, shayari"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                    <input
                      ref={canonicalUrlRef}
                      type="text"
                      defaultValue={selectedPage.canonicalUrl || `https://zauqapp.com${selectedPage.path}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Title (Open Graph)</label>
                    <input
                      ref={ogTitleRef}
                      type="text"
                      defaultValue={selectedPage.ogTitle || selectedPage.title || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
                    <textarea
                      ref={ogDescriptionRef}
                      defaultValue={selectedPage.ogDescription || selectedPage.description || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                    <input
                      ref={ogImageRef}
                      type="text"
                      defaultValue={selectedPage.ogImage || 'https://zauqapp.com/og-image.jpg'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'structured' && (
                <div className="space-y-5">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      Structured data helps search engines understand your content better.
                      Use JSON-LD format for best results.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">JSON-LD Structured Data</label>
                    <textarea
                      ref={structuredDataRef}
                      defaultValue={JSON.stringify(selectedPage.structuredData || {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": selectedPage.title,
                        "description": selectedPage.description,
                        "url": `https://zauqapp.com${selectedPage.path}`
                      }, null, 2)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm h-64"
                    />
                  </div>
                  <button
                    onClick={() => updateStructuredData(selectedPage.id, selectedPage, structuredDataRef.current?.value)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    disabled={loading}
                  >
                    Update Structured Data
                  </button>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Google Search Preview</h3>
                    <GooglePreview 
                      title={metaTitleRef.current?.value || selectedPage.title}
                      description={metaDescriptionRef.current?.value || selectedPage.description}
                      url={`https://zauqapp.com${selectedPage.path}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Social Media Preview</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-100 bg-cover bg-center" 
                           style={{ backgroundImage: `url(${ogImageRef?.current?.value || selectedPage.ogImage})` }} />
                      <div className="p-3">
                        <div className="text-xs text-gray-500">zauqapp.com</div>
                        <div className="font-semibold text-gray-900 line-clamp-1">
                          {ogTitleRef?.current?.value || selectedPage.ogTitle || selectedPage.title}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {ogDescriptionRef?.current?.value || selectedPage.ogDescription || selectedPage.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedData = {
                    ...selectedPage,
                    title: metaTitleRef.current?.value || selectedPage.title,
                    description: metaDescriptionRef.current?.value || selectedPage.description,
                    keywords: keywordsRef.current?.value || selectedPage.keywords,
                    canonicalUrl: canonicalUrlRef.current?.value,
                    ogTitle: ogTitleRef.current?.value,
                    ogDescription: ogDescriptionRef.current?.value,
                    ogImage: ogImageRef.current?.value,
                  }
                  updateSEOMeta(updatedData)
                }}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SEOManagementPage