// client/src/components/AudioCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'

const AudioCard = ({ audio, isPlaying, onPlay }) => {
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
    >
      <div
        onClick={onPlay}
        className={`block rounded-xl p-4 shadow-sm border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
          isPlaying 
            ? 'bg-primary-50 border-primary-200 shadow-md' 
            : 'bg-white border-gray-100 hover:shadow-lg'
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isPlaying
              ? 'bg-primary-600'
              : 'bg-gradient-to-br from-primary-100 to-amber-100'
          }`}
        >
          {isPlaying ? (
            <div className="flex gap-0.5">
              <div className="w-1 h-4 bg-white animate-pulse" />
              <div className="w-1 h-4 bg-white animate-pulse delay-75" />
              <div className="w-1 h-4 bg-white animate-pulse delay-150" />
            </div>
          ) : (
            <Play className="h-6 w-6 text-primary-600" />
          )}
        </motion.div>
        <div className="flex-1">
          <h4 className={`font-medium line-clamp-1 ${
            isPlaying ? 'text-primary-700' : 'text-gray-900'
          }`}>
            {audio.title}
          </h4>
          <p className="text-sm text-gray-500 capitalize">{audio.type}</p>
        </div>
        <div className="text-sm text-gray-400">
          {formatDuration(audio.duration)}
        </div>
        <Link
          to={`/audio/${audio.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
          title="View Details"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

export default AudioCard