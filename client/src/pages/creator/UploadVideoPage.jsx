//client\src\pages\creator\UploadVideoPage.jsx

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Upload, Save, Send, Play, Clock, Subtitles, Image } from 'lucide-react'

const UploadVideoPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Video</h1>
        <p className="text-gray-500">Add videos, mushaira recordings, or documentaries</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <form className="space-y-6">
          {/* Video Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Drag and drop video file here</p>
            <p className="text-sm text-gray-400 mt-1">or click to browse (MP4, MOV, AVI)</p>
            <p className="text-xs text-gray-400 mt-2">Max file size: 500MB</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input type="text" className="input-field" placeholder="Enter video title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="input-field">
                <option value="mushaira">Mushaira</option>
                <option value="podcast">Podcast</option>
                <option value="documentary">Documentary</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" className="input-field pl-10" placeholder="e.g., 45:20" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Related Author</label>
              <select className="input-field">
                <option>Select author (optional)</option>
                <option>Mirza Ghalib</option>
                <option>Faiz Ahmed Faiz</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="input-field h-24"
              placeholder="Brief description of the video"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload thumbnail (JPG, PNG)</p>
            </div>
          </div>

          {/* Subtitles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitles (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <Subtitles className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload subtitle file (SRT, VTT)</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <button type="button" className="btn-outline inline-flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save as Draft</span>
            </button>
            <button type="submit" className="btn-primary inline-flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Publish</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default UploadVideoPage