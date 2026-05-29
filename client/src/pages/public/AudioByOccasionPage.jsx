// client/src/pages/public/AudioByOccasionPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Headphones, Play, Clock, Eye, Loader2, ChevronLeft } from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import { OCCASION_CATEGORIES } from '../../utils/constants';

const AudioByOccasionPage = () => {
  const { occasion } = useParams();
  const [audioItems, setAudioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const occasionData = OCCASION_CATEGORIES?.find(occ => occ.id === occasion);

  useEffect(() => {
    const fetchAudio = async () => {
      setLoading(true);
      try {
        const response = await audioAPI.getAudioByOccasion(occasion, { limit: 50 });
        const data = response?.data?.data || response?.data || response || [];
        setAudioItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching audio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [occasion]);

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/audio" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Audio
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{occasionData?.icon || '🕌'}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{occasionData?.label || occasion} Audio</h1>
              <p className="text-gray-500 mt-1">{occasionData?.description || `Audio content for ${occasion}`}</p>
            </div>
          </div>
        </div>

        {audioItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <Headphones className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No audio found for this occasion.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioItems.map((audio, index) => (
              <motion.div
                key={audio._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/audio/${audio.slug}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-primary-200">
                      {audio.thumbnail || audio.coverImage ? (
                        <img src={audio.thumbnail || audio.coverImage} alt={audio.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">🎵</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110">
                          <Play className="h-6 w-6 text-primary-600 ml-0.5" />
                        </div>
                      </div>
                      {audio.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDuration(audio.duration)}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-1">
                        {audio.title}
                      </h3>
                      {audio.author && (
                        <p className="text-sm text-gray-500 mt-1">
                          {typeof audio.author === 'object' ? audio.author.name : audio.author}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Play className="h-3 w-3" />
                          {audio.stats?.plays?.toLocaleString() || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {audio.stats?.views?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioByOccasionPage;