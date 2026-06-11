// client/src/components/VideoCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Eye, ExternalLink, Youtube, FileVideo } from 'lucide-react'

const VideoCard = ({ video, onPlay }) => {
  const isYouTubeUrl = (url) => {
    if (!url) return false
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div
        onClick={onPlay}
        className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      >
        <div className="relative h-40 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-12 w-12 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <Play className="h-5 w-5 text-primary-600 ml-0.5" />
            </motion.div>
          </div>
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
              {formatDuration(video.duration)}
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
              {isYouTubeUrl(video.videoUrl) ? 
                <Youtube className="h-3 w-3" /> : 
                <FileVideo className="h-3 w-3" />
              }
              <span>{isYouTubeUrl(video.videoUrl) ? 'YouTube' : 'Video'}</span>
            </span>
          </div>
          {video.isPremium && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
              Premium
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{video.title}</h4>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="capitalize">{video.type}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.stats?.views?.toLocaleString() || 0}
              </span>
            </div>
            <Link
              to={`/video/${video.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
            >
              Details <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCard