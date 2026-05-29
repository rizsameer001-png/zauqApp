import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Play, ArrowRight, Clock, Eye } from 'lucide-react'

const videos = [
  {
    id: 1,
    title: 'Jashn-e-Rekhta 2024 Highlights',
    category: 'Mushaira',
    duration: '45:20',
    views: 125000,
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600',
  },
  {
    id: 2,
    title: 'Ghazal Recitation by Gulzar',
    category: 'Podcast',
    duration: '12:35',
    views: 87000,
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600',
  },
  {
    id: 3,
    title: 'Understanding Mirza Ghalib',
    category: 'Documentary',
    duration: '28:15',
    views: 65000,
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
  },
]

const VideoHighlights = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Play className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="section-title mb-0">{t('home.videoHighlights')}</h2>
              <p className="text-gray-500 text-sm">Mushaira, podcasts, and documentaries</p>
            </div>
          </div>
          <Link
            to="/videos"
            className="hidden sm:flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/videos/${video.id}`} className="card block overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-primary-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span>{(video.views / 1000).toFixed(1)}K views</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoHighlights