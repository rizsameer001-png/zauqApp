//client\src\pages\creator\CreatorContentPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Filter, Edit, Trash2, Eye, FileText, BookOpen,
  Play, Headphones, ChevronLeft, ChevronRight
} from 'lucide-react'

const contentItems = [
  { id: 1, title: 'New Ghazal Collection', type: 'poetry', status: 'published', views: '2.5K', date: '2024-02-15' },
  { id: 2, title: 'Literary Analysis Video', type: 'video', status: 'published', views: '1.8K', date: '2024-02-10' },
  { id: 3, title: 'Audio Recitation', type: 'audio', status: 'draft', views: '0', date: '2024-02-05' },
  { id: 4, title: 'Rare Book Scan', type: 'ebook', status: 'published', views: '850', date: '2024-01-28' },
  { id: 5, title: 'Mushaira Recording', type: 'video', status: 'published', views: '3.2K', date: '2024-01-20' },
]

const CreatorContentPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredContent = contentItems.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filterType !== 'all' && item.type !== filterType) return false
    if (filterStatus !== 'all' && item.status !== filterStatus) return false
    return true
  })

  const getIcon = (type) => {
    switch (type) {
      case 'poetry': return FileText
      case 'ebook': return BookOpen
      case 'video': return Play
      case 'audio': return Headphones
      default: return FileText
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Content</h1>
        <p className="text-gray-500">Manage all your uploaded content</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Types</option>
          <option value="poetry">Poetry</option>
          <option value="ebook">Ebook</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Content Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContent.map((item) => {
                const Icon = getIcon(item.type)
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          item.type === 'poetry' ? 'bg-primary-100' :
                          item.type === 'ebook' ? 'bg-blue-100' :
                          item.type === 'video' ? 'bg-red-100' :
                          'bg-purple-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            item.type === 'poetry' ? 'text-primary-600' :
                            item.type === 'ebook' ? 'text-blue-600' :
                            item.type === 'video' ? 'text-red-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'published' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreatorContentPage