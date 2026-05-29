import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Star, Download } from 'lucide-react'

const books = [
  {
    id: 1,
    title: 'Diwan-e-Ghalib',
    titleUr: 'دیوانِ غالب',
    author: 'Mirza Ghalib',
    category: 'Rare Books',
    rating: 4.9,
    downloads: 12500,
    pages: 450,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    id: 2,
    title: 'Bang-e-Dara',
    titleUr: 'بانگِ درا',
    author: 'Allama Iqbal',
    category: 'Rare Books',
    rating: 4.8,
    downloads: 9800,
    pages: 320,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
  },
  {
    id: 3,
    title: 'Nuskha-e-Haideri',
    titleUr: 'نسخہِ حیدری',
    author: 'Mir Taqi Mir',
    category: 'Journals',
    rating: 4.7,
    downloads: 7600,
    pages: 280,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
  },
  {
    id: 4,
    title: 'Kulliyat-e-Faiz',
    titleUr: 'کلیاتِ فیض',
    author: 'Faiz Ahmed Faiz',
    category: 'Rare Books',
    rating: 4.9,
    downloads: 11200,
    pages: 520,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
  },
]

const PopularBooks = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="section-title mb-0">{t('home.popularBooks')}</h2>
              <p className="text-gray-500 text-sm">Rare collections and literary journals</p>
            </div>
          </div>
          <Link
            to="/books"
            className="hidden sm:flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/books/${book.id}`} className="card block overflow-hidden group">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                      {book.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="urdu-text text-gray-600 text-sm mb-2">{book.titleUr}</p>
                  <p className="text-gray-500 text-sm mb-3">{book.author}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{book.pages} pages</span>
                    <span className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{(book.downloads / 1000).toFixed(1)}K</span>
                    </span>
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

export default PopularBooks