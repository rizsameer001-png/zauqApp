// client/src/components/BookCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Download, Crown } from 'lucide-react'

const BookCard = ({ book }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link
        to={`/book/${book.slug}`}
        className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
      >
        {book.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={book.coverImage} 
              alt={book.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {book.isPremium && (
              <div className="absolute top-2 right-2">
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium rounded-full">
                  <Crown className="h-3 w-3" />
                  Premium
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{book.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{book.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="capitalize">{book.type || 'Ebook'}</span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {book.stats?.views?.toLocaleString() || 0}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {book.stats?.downloads?.toLocaleString() || 0}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BookCard