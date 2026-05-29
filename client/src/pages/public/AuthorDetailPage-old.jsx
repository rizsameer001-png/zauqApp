//client/src/pages/public/AuthorDetailPage.jsx

import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Heart, Share2, BookOpen, Calendar, MapPin, Users,
  ChevronLeft, Clock, Play, Grid, List
} from 'lucide-react'

const AuthorDetailPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('works')
  const [isFollowing, setIsFollowing] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const author = {
    id: 1,
    name: 'Mirza Ghalib',
    nameUr: 'مرزا غالب',
    era: 'Classical',
    birthDate: '1797',
    deathDate: '1869',
    birthplace: 'Agra, India',
    followers: 45000,
    poems: 234,
    books: 12,
    videos: 45,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200',
    bio: 'Mirza Asadullah Khan Ghalib was a prominent Urdu and Persian poet during the Mughal era. He is considered one of the most popular and influential poets of the Urdu language. His ghazals have been sung and interpreted by numerous singers and are known for their depth of meaning and emotional intensity.',
    timeline: [
      { year: '1797', event: 'Born in Agra, India' },
      { year: '1810', event: 'Moved to Delhi' },
      { year: '1828', event: 'Published first collection of Urdu poetry' },
      { year: '1850', event: 'Appointed poet laureate of Mughal court' },
      { year: '1869', event: 'Passed away in Delhi' },
    ],
    popularWorks: [
      { id: 1, title: 'Hazaaron Khwahishein Aisi', type: 'Ghazal', likes: 12500 },
      { id: 2, title: 'Dil-e-Nadaan', type: 'Ghazal', likes: 9800 },
      { id: 3, title: 'Aah Ko Chahiye', type: 'Ghazal', likes: 8700 },
      { id: 4, title: 'Ishq Par Zor Nahi', type: 'Sher', likes: 7600 },
      { id: 5, title: 'Na Tha Kuchh To Khuda Tha', type: 'Ghazal', likes: 11200 },
      { id: 6, title: 'Yeh Na Thi Hamari Qismat', type: 'Ghazal', likes: 6500 },
    ],
    quotes: [
      'Hazaaron khwahishein aisi ke har khwahish pe dam nikle...',
      'Dil-e-nadaan tujhe hua kya hai...',
      'Ishq par zor nahi, hai ye wo aatish Ghalib...',
    ],
    relatedAuthors: [
      { id: 2, name: 'Faiz Ahmed Faiz', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
      { id: 3, name: 'Allama Iqbal', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    ],
  }

  const tabs = [
    { id: 'works', label: 'Popular Works' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'videos', label: 'Videos' },
  ]

  return (
    <div className="page-container max-w-5xl">
      {/* Back Link */}
      <div className="mb-6">
        <Link to="/authors" className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Authors</span>
        </Link>
      </div>

      {/* Cover & Profile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative mb-8"
      >
        <div className="h-48 md:h-64 rounded-xl overflow-hidden">
          <img src={author.coverImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative -mt-16 md:-mt-20 px-6 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={author.image}
            alt={author.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{author.name}</h1>
                <p className="urdu-text text-lg text-gray-600">{author.nameUr}</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: 'Poems', value: author.poems },
          { icon: BookOpen, label: 'Books', value: author.books },
          { icon: Play, label: 'Videos', value: author.videos },
          { icon: Users, label: 'Followers', value: `${(author.followers / 1000).toFixed(1)}K` },
        ].map((stat, index) => (
          <div key={index} className="card p-4 text-center">
            <stat.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bio & Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Biography</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{author.birthDate} - {author.deathDate}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{author.birthplace}</span>
              </span>
              <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs">
                {author.era} Era
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Related Authors</h3>
            <div className="space-y-3">
              {author.relatedAuthors.map((related) => (
                <Link
                  key={related.id}
                  to={`/authors/${related.id}`}
                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <img src={related.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm font-medium text-gray-700">{related.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'works' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Popular Works</h3>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {author.popularWorks.map((work) => (
                <Link
                  key={work.id}
                  to={`/poetry/${work.id}`}
                  className="card p-4 hover:shadow-md transition-shadow flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{work.title}</h4>
                    <span className="text-sm text-gray-500">{work.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span>{(work.likes / 1000).toFixed(1)}K</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
            <div className="space-y-6">
              {author.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-bold text-primary-600">{event.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full mt-1.5" />
                  <div className="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-1.5">
                    <p className="text-gray-700">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'quotes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {author.quotes.map((quote, index) => (
              <div key={index} className="card p-6 border-l-4 border-primary-500">
                <p className="text-lg text-gray-700 italic">"{quote}"</p>
                <p className="text-sm text-gray-500 mt-2">— {author.name}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'videos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((video) => (
                <div key={video} className="card overflow-hidden">
                  <div className="h-40 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900">Video Title {video}</h4>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>12:34</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AuthorDetailPage