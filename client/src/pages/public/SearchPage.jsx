//client/src/pages/public/SearchPage.jsx
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, User, Play, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeFilter, setActiveFilter] = useState('all')
  const [results, setResults] = useState({
    poems: [],
    authors: [],
    books: [],
    videos: [],
  })

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'poems', label: 'Poems' },
    { id: 'authors', label: 'Authors' },
    { id: 'books', label: 'Books' },
    { id: 'videos', label: 'Videos' },
  ]

  const sampleResults = {
    poems: [
      { id: 1, title: 'Hazaaron Khwahishein Aisi', author: 'Mirza Ghalib', type: 'Ghazal' },
      { id: 2, title: 'Gulon Mein Rang Bhare', author: 'Faiz Ahmed Faiz', type: 'Nazm' },
    ],
    authors: [
      { id: 1, name: 'Mirza Ghalib', era: 'Classical', poems: 234 },
      { id: 2, name: 'Faiz Ahmed Faiz', era: 'Modern', poems: 186 },
    ],
    books: [
      { id: 1, title: 'Diwan-e-Ghalib', author: 'Mirza Ghalib', category: 'Rare Books' },
      { id: 2, title: 'Bang-e-Dara', author: 'Allama Iqbal', category: 'Rare Books' },
    ],
    videos: [
      { id: 1, title: 'Jashn-e-Rekhta 2024', category: 'Mushaira', duration: '45:20' },
      { id: 2, title: 'Ghazal Recitation', category: 'Podcast', duration: '12:35' },
    ],
  }

  useEffect(() => {
    if (query) {
      setResults(sampleResults)
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query })
    }
  }

  const getFilteredResults = () => {
    if (activeFilter === 'all') {
      return [
        ...results.poems.map(r => ({ ...r, type: 'poem' })),
        ...results.authors.map(r => ({ ...r, type: 'author' })),
        ...results.books.map(r => ({ ...r, type: 'book' })),
        ...results.videos.map(r => ({ ...r, type: 'video' })),
      ]
    }
    return results[activeFilter]?.map(r => ({ ...r, type: activeFilter.slice(0, -1) })) || []
  }

  const filteredResults = getFilteredResults()

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-8">
        <h1 className="section-title">Search</h1>
        <p className="section-subtitle">Find poems, authors, books, and videos</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poetry, authors, books, videos..."
            className="input-field pl-12 pr-12 py-3 text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSearchParams({}) }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Filters */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {query && (
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {result.type === 'poem' && (
                  <Link to={`/poetry/${result.id}`} className="card p-4 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.author} · {result.type}</p>
                    </div>
                  </Link>
                )}
                {result.type === 'author' && (
                  <Link to={`/authors/${result.id}`} className="card p-4 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-secondary-50 rounded-lg">
                      <User className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.name}</h3>
                      <p className="text-sm text-gray-500">{result.era} · {result.poems} poems</p>
                    </div>
                  </Link>
                )}
                {result.type === 'book' && (
                  <Link to={`/books/${result.id}`} className="card p-4 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.author} · {result.category}</p>
                    </div>
                  </Link>
                )}
                {result.type === 'video' && (
                  <Link to={`/videos/${result.id}`} className="card p-4 flex items-start space-x-4 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Play className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-500">{result.category} · {result.duration}</p>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Start typing to search...</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage