
//client/src/pages/public/PoetryDetailPage.jsx

import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Heart, Share2, Bookmark, MessageCircle, Play, Volume2,
  Sparkles, ChevronLeft, BookOpen, User, Clock
} from 'lucide-react'

const PoetryDetailPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('poem')
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [showTransliteration, setShowTransliteration] = useState(false)

  const poem = {
    id: 1,
    title: 'Hazaaron Khwahishein Aisi',
    titleUr: 'ہزاروں خواہشیں ایسی',
    author: 'Mirza Ghalib',
    authorId: 1,
    genre: 'Ghazal',
    language: 'ur',
    content: [
      'Hazaaron khwahishein aisi ke har khwahish pe dam nikle',
      'Bahut nikle mere armaan lekin phir bhi kam nikle',
      '',
      'Nikle na khayal se aap ke jo hum nikle',
      'Ke aap hi kuchh keh na sake jo hum nikle',
      '',
      'Dil-e-nadaan tujhe hua kya hai',
      'Aakhir is dard ki dawa kya hai',
    ],
    contentUr: [
      'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
      'بہت نکلے میرے ارمان لیکن پھر بھی کم نکلے',
      '',
      'نکلے نہ خیال سے آپ کے جو ہم نکلے',
      'کہ آپ ہی کچھ کہہ نہ سکے جو ہم نکلے',
      '',
      'دلِ ناداں تجھے ہوا کیا ہے',
      'آخر اس درد کی دوا کیا ہے',
    ],
    translation: [
      'Thousands of desires, each worth dying for...',
      'Many of my desires were fulfilled, yet they still feel insufficient.',
      '',
      'I left with thoughts of you that I could not express...',
      'You could not say anything when I left.',
      '',
      'O naive heart, what has happened to you?',
      'What is the cure for this pain, after all?',
    ],
    transliteration: [
      'Hazaaron khwahishein aisi ke har khwahish pe dam nikle',
      'Bahut nikle mere armaan lekin phir bhi kam nikle',
    ],
    likes: 12500,
    views: 45000,
    comments: 234,
    bookmarks: 3200,
    audioUrl: '#',
    aiExplanation: 'This famous ghazal by Mirza Ghalib explores the theme of unfulfilled desires and the human condition. The poet reflects on how even when desires are fulfilled, they never seem enough, highlighting the insatiable nature of human longing.',
    relatedPoems: [
      { id: 2, title: 'Dil-e-Nadaan', author: 'Mirza Ghalib' },
      { id: 3, title: 'Aah Ko Chahiye', author: 'Mirza Ghalib' },
    ],
  }

  const tabs = [
    { id: 'poem', label: 'Poem' },
    { id: 'translation', label: 'Translation' },
    { id: 'transliteration', label: 'Transliteration' },
    { id: 'audio', label: 'Audio' },
    { id: 'ai', label: 'AI Explanation' },
  ]

  return (
    <div className="page-container max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/poetry" className="hover:text-primary-600 flex items-center space-x-1">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Poetry</span>
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
            {poem.genre}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {poem.language === 'ur' ? 'Urdu' : 'Hindi'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{poem.title}</h1>
        <p className="urdu-text text-xl text-gray-600 mb-4">{poem.titleUr}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <Link to={`/authors/${poem.authorId}`} className="flex items-center space-x-1 hover:text-primary-600">
            <User className="h-4 w-4" />
            <span>{poem.author}</span>
          </Link>
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>2 min read</span>
          </span>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            <span className="text-sm font-medium">{poem.likes.toLocaleString()}</span>
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              isBookmarked ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} />
            <span className="text-sm font-medium">{poem.bookmarks.toLocaleString()}</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{poem.comments}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Play className="h-4 w-4" />
            <span className="text-sm">Listen</span>
          </button>
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

      {/* Content */}
      <div className="mb-8">
        {activeTab === 'poem' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="text-center space-y-2">
                {poem.contentUr.map((line, index) => (
                  <p key={index} className="urdu-text text-xl md:text-2xl text-gray-800 leading-loose">
                    {line || ' '}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-center space-y-2">
                {poem.content.map((line, index) => (
                  <p key={index} className="text-lg text-gray-600 italic leading-relaxed">
                    {line || ' '}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'translation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              <span>English Translation</span>
            </h3>
            <div className="space-y-2">
              {poem.translation.map((line, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {line || ' '}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'transliteration' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Roman Transliteration</h3>
            <div className="space-y-2">
              {poem.transliteration.map((line, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {line || ' '}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'audio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
          >
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Audio Narration</h3>
            <p className="text-gray-500 mb-4">Listen to this poem recited by professional narrators</p>
            <button className="btn-primary inline-flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Play Audio</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">AI Literary Analysis</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">{poem.aiExplanation}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Powered by AI</span>
              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">Beta</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Related Poems */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Related Poems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {poem.relatedPoems.map((related) => (
            <Link
              key={related.id}
              to={`/poetry/${related.id}`}
              className="card p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-gray-900">{related.title}</h4>
              <p className="text-sm text-gray-500">{related.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PoetryDetailPage