// client/src/components/home/TrendingSection.jsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'

// const trendingPoems = [
//   {
//     id: 1,
//     title: 'Hazaaron Khwahishein Aisi',
//     titleUr: 'ہزاروں خواہشیں ایسی',
//     author: 'Mirza Ghalib',
//     excerpt: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle...',
//     likes: 12500,
//     views: 45000,
//     image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
//   },
//   {
//     id: 2,
//     title: 'Gulon Mein Rang Bhare',
//     titleUr: 'گلوں میں رنگ بھرے',
//     author: 'Faiz Ahmed Faiz',
//     excerpt: 'Gulon mein rang bhare baad-e-naubahaar chale...',
//     likes: 9800,
//     views: 32000,
//     image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44d55e?w=400',
//   },
//   {
//     id: 3,
//     title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
//     titleUr: 'دلِ ناداں تجھے ہوا کیا ہے',
//     author: 'Mirza Ghalib',
//     excerpt: 'Dil-e-nadaan tujhe hua kya hai...',
//     likes: 8700,
//     views: 28000,
//     image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400',
//   },
//   {
//     id: 4,
//     title: 'Aaj Bazar Mein',
//     titleUr: 'آج بازار میں',
//     author: 'Faiz Ahmed Faiz',
//     excerpt: 'Aaj bazar mein pa-bajolaan chalo...',
//     likes: 7600,
//     views: 24000,
//     image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400',
//   },
// ]

// const TrendingSection = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-primary-100 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-primary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
//               <p className="text-gray-500 text-sm">Most loved by our community</p>
//             </div>
//           </div>
//           <Link
//             to="/poetry"
//             className="hidden sm:flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trendingPoems.map((poem, index) => (
//             <motion.div
//               key={poem.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Link to={`/poetry/${poem.id}`} className="card block overflow-hidden group">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={poem.image}
//                     alt={poem.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                   <div className="absolute bottom-3 left-3 right-3">
//                     <p className="text-white font-medium text-sm">{poem.author}</p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
//                     {poem.title}
//                   </h3>
//                   <p className="urdu-text text-gray-600 text-sm mb-3">{poem.titleUr}</p>
//                   <p className="text-gray-500 text-sm line-clamp-2 mb-3">{poem.excerpt}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="flex items-center space-x-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       <span>{poem.likes.toLocaleString()}</span>
//                     </span>
//                     <span className="flex items-center space-x-1">
//                       <Eye className="h-4 w-4" />
//                       <span>{poem.views.toLocaleString()}</span>
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-6 text-center sm:hidden">
//           <Link to="/poetry" className="btn-outline inline-flex items-center space-x-2">
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TrendingSection









import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, Heart, Eye } from 'lucide-react'
import poemAPI from '../../api/poemAPI'

const TrendingSection = () => {
  const { t } = useTranslation()
  const [trendingPoems, setTrendingPoems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTrendingPoems()
  }, [])

  const fetchTrendingPoems = async () => {
    try {
      setLoading(true)
      const response = await poemAPI.getTrendingPoems()
      // Handle both direct array response and response with data property
      const poems = response.data?.data || response.data || response
      setTrendingPoems(Array.isArray(poems) ? poems : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching trending poems:', err)
      setError(t('common.errorLoading'))
    } finally {
      setLoading(false)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
                <p className="text-gray-500 text-sm">Most loved by our community</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchTrendingPoems}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No data state
  if (!trendingPoems.length) {
    return null
  }

  // Main render with all trending poems
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="section-title mb-0">{t('home.trendingPoems')}</h2>
              <p className="text-gray-500 text-sm">Most loved by our community</p>
            </div>
          </div>
          <Link
            to="/poetry"
            className="hidden sm:flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Poems Grid - Shows ALL poems from API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPoems.slice(0,4).map((poem, index) => (    ///To limit to 4 poems (if needed):
            <motion.div
              key={poem.id || poem._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/poetry/${poem.slug || poem.id}`} 
                className="card block overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={poem.image || poem.coverImage || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'}
                    alt={poem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-medium text-sm">
                      {poem.author?.name || poem.author}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {poem.title}
                  </h3>
                  <p className="urdu-text text-gray-600 text-sm mb-3 line-clamp-1">
                    {poem.titleUr || poem.titleTranslation?.ur || ''}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {poem.excerpt || (poem.content?.substring(0, 100) + '...') || ''}
                  </p>

                  {/* Stats Section */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{(poem.likes || poem.likeCount || 0).toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{(poem.views || poem.viewCount || 0).toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link 
            to="/poetry" 
            className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Optional: Show count of poems */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {trendingPoems.length} trending {trendingPoems.length === 1 ? 'poem' : 'poems'}
        </div>
      </div>
    </section>
  )
}

export default TrendingSection