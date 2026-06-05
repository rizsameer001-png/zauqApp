// client/src/pages/admin/AudioPlaylistsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, Eye, Music, Loader2, X, Check,
  Search, ChevronLeft, ChevronRight, Play, Clock, Users,
  Heart, Share2, Copy, AlertCircle, Calendar, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import audioAPI from '../../api/audioAPI';
import toast from 'react-hot-toast';

const AudioPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [allAudio, setAllAudio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudioIds, setSelectedAudioIds] = useState([]);
  const [audioSearch, setAudioSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    coverImage: '',
    isPublic: true
  });

  // Fetch playlists
  const fetchPlaylists = useCallback(async () => {
    setLoading(true);
    try {
      const response = await audioAPI.getUserPlaylists();
      let playlistsData = [];
      
      if (response?.data?.data) {
        playlistsData = response.data.data;
      } else if (response?.data) {
        playlistsData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        playlistsData = response;
      }
      
      setPlaylists(playlistsData);
      setPagination(prev => ({ ...prev, total: playlistsData.length, totalPages: Math.ceil(playlistsData.length / prev.limit) }));
    } catch (error) {
      console.error('Error fetching playlists:', error);
      toast.error('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all audio for adding to playlist
  const fetchAllAudio = useCallback(async () => {
    try {
      const response = await audioAPI.getAudioItems({ limit: 1000 });
      let audioData = [];
      
      if (response?.data?.data) {
        audioData = response.data.data;
      } else if (response?.data) {
        audioData = response.data;
      } else if (Array.isArray(response)) {
        audioData = response;
      }
      
      setAllAudio(audioData);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
    fetchAllAudio();
  }, [fetchPlaylists, fetchAllAudio]);

  // Filtered audio based on search
  const filteredAudio = allAudio.filter(audio => 
    audio.title?.toLowerCase().includes(audioSearch.toLowerCase()) ||
    audio.type?.toLowerCase().includes(audioSearch.toLowerCase())
  );

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'name') {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    setLoading(true);
    try {
      const playlistData = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        coverImage: formData.coverImage,
        isPublic: formData.isPublic,
        audios: selectedAudioIds
      };

      if (editingPlaylist) {
        await audioAPI.updatePlaylist(editingPlaylist._id, playlistData);
        toast.success('Playlist updated successfully');
      } else {
        await audioAPI.createPlaylist(playlistData);
        toast.success('Playlist created successfully');
      }
      
      resetModal();
      fetchPlaylists();
    } catch (error) {
      console.error('Error saving playlist:', error);
      toast.error(error.response?.data?.message || 'Failed to save playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (playlist) => {
    if (!window.confirm(`Are you sure you want to delete "${playlist.name}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await audioAPI.deletePlaylist(playlist._id);
      toast.success('Playlist deleted successfully');
      fetchPlaylists();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      name: playlist.name || '',
      slug: playlist.slug || '',
      description: playlist.description || '',
      coverImage: playlist.coverImage || '',
      isPublic: playlist.isPublic !== false
    });
    setSelectedAudioIds(playlist.audios?.map(audio => audio._id || audio) || []);
    setShowModal(true);
  };

  const handleRemoveAudio = async (playlistId, audioId) => {
    if (!window.confirm('Remove this audio from the playlist?')) return;
    
    try {
      await audioAPI.removeFromPlaylist(audioId, playlistId);
      toast.success('Audio removed from playlist');
      fetchPlaylists();
    } catch (error) {
      toast.error('Failed to remove audio');
    }
  };

  const toggleAudioSelection = (audioId) => {
    setSelectedAudioIds(prev => 
      prev.includes(audioId) 
        ? prev.filter(id => id !== audioId)
        : [...prev, audioId]
    );
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingPlaylist(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      coverImage: '',
      isPublic: true
    });
    setSelectedAudioIds([]);
    setAudioSearch('');
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAudioById = (id) => {
    return allAudio.find(audio => audio._id === id);
  };

  // Pagination
  const paginatedPlaylists = playlists.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  if (loading && playlists.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audio Playlists</h1>
          <p className="text-gray-500">Create and manage audio collections</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Playlist</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Playlists</p>
              <p className="text-2xl font-bold text-gray-900">{playlists.length}</p>
            </div>
            <Music className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tracks</p>
              <p className="text-2xl font-bold text-gray-900">
                {playlists.reduce((sum, p) => sum + (p.audios?.length || 0), 0)}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Public Playlists</p>
              <p className="text-2xl font-bold text-gray-900">
                {playlists.filter(p => p.isPublic).length}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {playlists.reduce((sum, p) => sum + (p.stats?.views || 0), 0).toLocaleString()}
              </p>
            </div>
            <Eye className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Playlists Grid */}
      {playlists.length === 0 ? (
        <div className="card p-12 text-center">
          <Music className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No playlists yet</h3>
          <p className="text-gray-500 mb-4">Create your first playlist to organize audio content</p>
          <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span>Create Playlist</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedPlaylists.map((playlist, index) => (
              <motion.div
                key={playlist._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Cover Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-primary-400 to-primary-600">
                    {playlist.coverImage ? (
                      <img 
                        src={playlist.coverImage} 
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="h-16 w-16 text-white/50" />
                      </div>
                    )}
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/playlist/${playlist.slug}`}
                        target="_blank"
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Play className="h-5 w-5 text-gray-900 ml-0.5" />
                      </Link>
                      <button
                        onClick={() => handleEdit(playlist)}
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Edit className="h-5 w-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(playlist)}
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {!playlist.isPublic && (
                        <span className="px-2 py-1 bg-gray-900/80 text-white text-xs rounded-md">
                          Private
                        </span>
                      )}
                    </div>
                    
                    {/* Track count */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md flex items-center gap-1">
                      <Music className="h-3 w-3" />
                      {playlist.audios?.length || 0} tracks
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {playlist.name}
                    </h3>
                    {playlist.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {playlist.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(playlist.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {playlist.stats?.views || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} playlists
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Playlist Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}
                </h2>
                <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Playlist Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Playlist Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g., Best of Nauha"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-2 rounded-l">/playlist/</span>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          className="input-field flex-1 rounded-l-none"
                          placeholder="playlist-slug"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to auto-generate from name
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="input-field h-24"
                        placeholder="Describe what this playlist is about..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="https://..."
                      />
                      {formData.coverImage && (
                        <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border">
                          <img src={formData.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600"
                      />
                      <label htmlFor="isPublic" className="text-sm text-gray-700">
                        Make playlist public (visible to all users)
                      </label>
                    </div>
                  </div>

                  {/* Right Column - Add Audio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Audio Tracks ({selectedAudioIds.length} selected)
                    </label>
                    
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search audio by title or type..."
                        value={audioSearch}
                        onChange={(e) => setAudioSearch(e.target.value)}
                        className="input-field pl-9"
                      />
                    </div>

                    <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                      {filteredAudio.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Music className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p>No audio found</p>
                        </div>
                      ) : (
                        filteredAudio.map((audio) => (
                          <div
                            key={audio._id}
                            className={`flex items-center gap-3 p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedAudioIds.includes(audio._id) ? 'bg-primary-50' : ''
                            }`}
                            onClick={() => toggleAudioSelection(audio._id)}
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <Music className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{audio.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-500 capitalize">{audio.type}</span>
                                {audio.duration && (
                                  <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDuration(audio.duration)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedAudioIds.includes(audio._id)
                                ? 'bg-primary-600 border-primary-600'
                                : 'border-gray-300'
                            }`}>
                              {selectedAudioIds.includes(audio._id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Selected Audio Summary */}
                {selectedAudioIds.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Selected Tracks ({selectedAudioIds.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAudioIds.slice(0, 5).map(id => {
                        const audio = getAudioById(id);
                        return audio ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md text-xs text-gray-600 border">
                            {audio.title}
                          </span>
                        ) : null;
                      })}
                      {selectedAudioIds.length > 5 && (
                        <span className="inline-flex items-center px-2 py-1 bg-white rounded-md text-xs text-gray-600 border">
                          +{selectedAudioIds.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      editingPlaylist ? 'Update Playlist' : 'Create Playlist'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioPlaylistsPage;