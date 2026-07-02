// client/src/pages/creator/CreatorAudioPlaylistsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  Music,
  Plus,
  Edit2,
  Trash2,
  Play,
  Pause,
  Globe,
  Lock,
  EyeOff,
  Loader2,
  Calendar,
  Users,
  Heart,
  MoreVertical,
  ListMusic
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';

const CreatorAudioPlaylistsPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'public',
    coverImage: null
  });
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await audioAPI.getCreatorPlaylists();
      setPlaylists(response.data.playlists || []);
    } catch (error) {
      toast.error('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('visibility', formData.visibility);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await audioAPI.createPlaylist(formDataToSend);
      setPlaylists(prev => [response.data, ...prev]);
      setIsModalOpen(false);
      resetForm();
      toast.success('Playlist created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create playlist');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return;

    try {
      await audioAPI.deletePlaylist(id);
      setPlaylists(prev => prev.filter(p => p._id !== id));
      toast.success('Playlist deleted successfully');
    } catch (error) {
      toast.error('Failed to delete playlist');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      visibility: 'public',
      coverImage: null
    });
    setCoverPreview(null);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return <Globe className="w-4 h-4 text-green-500" />;
      case 'private':
        return <Lock className="w-4 h-4 text-red-500" />;
      case 'unlisted':
        return <EyeOff className="w-4 h-4 text-yellow-500" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audio Playlists</h1>
          <p className="text-gray-500 mt-1">
            {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Playlist
        </button>
      </div>

      {/* Playlists Grid */}
      {playlists.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ListMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No playlists yet</h3>
          <p className="text-gray-500 mt-1">Create your first audio playlist</p>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20">
                {playlist.coverImage ? (
                  <img
                    src={playlist.coverImage}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Music className="w-16 h-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {playlist.items?.length || 0} tracks
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getVisibilityIcon(playlist.visibility)}
                  <span className="text-sm text-gray-500 capitalize">
                    {playlist.visibility}
                  </span>
                </div>

                {playlist.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {playlist.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(playlist.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/creator/audio/playlists/${playlist._id}`)}
                    className="flex-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(playlist._id)}
                    className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Create Audio Playlist</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="My awesome playlist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your playlist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    {coverPreview ? (
                      <div className="relative w-20 h-20">
                        <img
                          src={coverPreview}
                          alt="Cover"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCoverPreview(null);
                            setFormData(prev => ({ ...prev, coverImage: null }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Music className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visibility
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorAudioPlaylistsPage;