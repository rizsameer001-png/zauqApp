// client/src/components/PoemCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Heart } from 'lucide-react'

const PoemCard = ({ poem }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="cursor-pointer"
    >
      <Link
        to={`/poem/${poem.slug}`}
        className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
      >
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {poem.title}
          </h4>
          {poem.contentUrdu && (
            <p className="urdu-text text-sm text-gray-500 line-clamp-1 mt-1" dir="rtl">
              {poem.contentUrdu.substring(0, 50)}...
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
              {poem.genre}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {poem.stats?.views?.toLocaleString() || 0}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {poem.stats?.likes?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PoemCard