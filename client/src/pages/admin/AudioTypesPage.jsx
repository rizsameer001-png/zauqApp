import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Eye, Edit, Trash2, Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import audioAPI from '../../api/audioAPI';
import { AUDIO_TYPES, OCCASIONS } from '../../utils/constants';
import toast from 'react-hot-toast';

const AudioTypesPage = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [audioItems, setAudioItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    label: '',
    icon: '',
    description: ''
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await audioAPI.getAudioStats();
      setStats(response?.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAudioByType = async (type) => {
    try {
      const response = await audioAPI.getAudioByType(type, { limit: 10 });
      setAudioItems(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error('Error fetching audio by type:', error);
    }
  };

  const handleTypeClick = async (type) => {
    setSelectedType(type);
    await fetchAudioByType(type.id);
    setShowModal(true);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const typeCategories = [
    { id: 'nauha', label: 'Nauha', icon: '📿', description: 'Elegies commemorating the martyrs of Karbala' },
    { id: 'marsiya', label: 'Marsiya', icon: '📜', description: 'Poems of mourning and lamentation' },
    { id: 'soz', label: 'Soz', icon: '🔥', description: 'Poems expressing grief and sorrow' },
    { id: 'salam', label: 'Salam', icon: '🕊️', description: 'Salutations to the Ahl al-Bayt' },
    { id: 'majlis', label: 'Majlis', icon: '🎙️', description: 'Religious gatherings and sermons' },
    { id: 'naat', label: 'Naat', icon: '🌟', description: 'Poems in praise of Prophet Muhammad (PBUH)' },
    { id: 'hamd', label: 'Hamd', icon: '🕌', description: 'Songs praising Allah' },
    { id: 'manqabat', label: 'Manqabat', icon: '⚔️', description: 'Poems praising Imam Ali (AS)' },
    { id: 'munajat', label: 'Munajat', icon: '🤲', description: 'Supplications and whispered prayers' },
    { id: 'ghazal', label: 'Ghazal', icon: '💕', description: 'Poetic expression of love and mysticism' },
    { id: 'nazm', label: 'Nazm', icon: '📝', description: 'Modern Urdu poems' },
    { id: 'podcast', label: 'Podcast', icon: '🎧', description: 'Talk shows and discussions' },
    { id: 'audiobook', label: 'Audiobook', icon: '📚', description: 'Audio versions of books' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audio Types</h1>
          <p className="text-gray-500 mt-1">Manage audio categories and their content</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {typeCategories.map((type) => (
          <div key={type.id} className="card p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleTypeClick(type)}>
            <span className="text-3xl mb-2 block">{type.icon}</span>
            <p className="font-semibold text-gray-900 text-sm">{type.label}</p>
            <p className="text-2xl font-bold text-primary-600 mt-1">
              {stats[type.id]?.count || 0}
            </p>
            <p className="text-xs text-gray-500">{stats[type.id]?.totalPlays || 0} plays</p>
          </div>
        ))}
      </div>

      {/* Modal for showing audio by type */}
      {showModal && selectedType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedType.icon}</span>
                <h2 className="text-xl font-bold text-gray-900">{selectedType.label} Audio</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {audioItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No audio found in this category</p>
              ) : (
                <div className="space-y-3">
                  {audioItems.map((audio) => (
                    <div key={audio._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{audio.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              {audio.stats?.plays?.toLocaleString() || 0} plays
                            </span>
                            {audio.duration && (
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDuration(audio.duration)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/audio/${audio.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-gray-100">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Link>
                        <Link to={`/admin/audio/edit/${audio._id}`} className="p-2 rounded-lg hover:bg-gray-100">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AudioTypesPage;