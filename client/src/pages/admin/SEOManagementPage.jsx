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




import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, FileText, Globe, Network, Tag, Edit, Save,
  RefreshCw, CheckCircle, AlertCircle
} from 'lucide-react'

const seoPages = [
  { id: 1, path: '/', title: 'ZauqApp - AI Powered Urdu Literary Ecosystem', description: 'Discover Urdu poetry, Hindi literature, and English classics...', keywords: 'urdu poetry, hindi literature, ghazals', status: 'optimized' },
  { id: 2, path: '/poetry', title: 'Poetry Collection - ZauqApp', description: 'Explore ghazals, nazms, sher, and more...', keywords: 'ghazals, nazms, urdu poetry', status: 'optimized' },
  { id: 3, path: '/authors', title: 'Authors & Poets - ZauqApp', description: 'Discover legendary poets and literary figures...', keywords: 'poets, authors, mirza ghalib', status: 'needs_update' },
  { id: 4, path: '/books', title: 'Ebooks & Rare Books - ZauqApp', description: 'Access rare books, journals, and magazines...', keywords: 'ebooks, rare books, journals', status: 'optimized' },
]

const SEOManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPage, setSelectedPage] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const filteredPages = seoPages.filter(page =>
    !searchQuery || page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO Management</h1>
          <p className="text-gray-500">Manage meta tags, sitemaps, and SEO optimization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Network className="h-5 w-5" />
            <span>Generate Sitemap</span>
          </button>
          <button className="btn-primary inline-flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Run SEO Audit</span>
          </button>
        </div>
      </div>

      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pages Optimized', value: '24/30', icon: CheckCircle, color: 'green' },
          { label: 'Pages Need Update', value: '6', icon: AlertCircle, color: 'yellow' },
          { label: 'Avg. Meta Title Length', value: '58 chars', icon: FileText, color: 'blue' },
          { label: 'Sitemap Status', value: 'Updated', icon: Network, color: 'purple' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <stat.icon className={`h-8 w-8 text-${stat.color}-600 mb-3`} />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Pages Table */}
      <div className="card overflow-hidden">
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
              {filteredPages.map((page) => (
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
                    <p className="text-sm text-gray-900">{page.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{page.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {page.keywords.split(', ').map((keyword, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                      page.status === 'optimized'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {page.status === 'optimized' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      <span>{page.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => { setSelectedPage(page); setShowEditModal(true) }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
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
            className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Edit SEO - {selectedPage.path}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  defaultValue={selectedPage.title}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  defaultValue={selectedPage.description}
                  className="input-field h-24"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  defaultValue={selectedPage.keywords}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  defaultValue={selectedPage.path}
                  className="input-field"
                />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <button className="btn-primary inline-flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SEOManagementPage