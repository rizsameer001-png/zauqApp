// client/src/pages/creator/CreatorPlaylistsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  ListMusic,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Loader2,
  Music,
  Play,
  MoreVertical,
  Calendar,
  Users,
  Heart
} from 'lucide-react';
import playlistAPI from '../../api/playlistAPI';

const CreatorPlaylistsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'public',
    items: []
  });

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (id) {
      fetchPlaylistDetails(id);
    }
  }, [id]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await playlistAPI.getCreatorPlaylists();
      setPlaylists(response.data.playlists || []);
    } catch (error) {
      toast.error('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylistDetails = async (playlistId) => {
    try {
      const response = await playlistAPI.getPlaylist(playlistId);
      setSelectedPlaylist(response.data);
      setFormData({
        name: response.data.name || '',
        description: response.data.description || '',
        visibility: response.data.visibility || 'public',
        items: response.data.items || []
      });
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to load playlist details');
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      const response = await playlistAPI.createPlaylist(formData);
      setPlaylists(prev => [response.data, ...prev]);
      setIsModalOpen(false);
      resetForm();
      toast.success('Playlist created successfully');
    } catch (error) {
      toast.error('Failed to create playlist');
    }
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      const response = await playlistAPI.updatePlaylist(id, formData);
      setPlaylists(prev =>
        prev.map(p => p._id === id ? response.data : p)
      );
      setIsModalOpen(false);
      resetForm();
      toast.success('Playlist updated successfully');
    } catch (error) {
      toast.error('Failed to update playlist');
    }
  };

  const handleDelete = async (playlistId) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return;

    try {
      await playlistAPI.deletePlaylist(playlistId);
      setPlaylists(prev => prev.filter(p => p._id !== playlistId));
      toast.success('Playlist deleted successfully');
    } catch (error) {
      toast.error('Failed to delete playlist');
    }
  };

  const handleDuplicate = async (playlistId) => {
    try {
      const response = await playlistAPI.duplicatePlaylist(playlistId);
      setPlaylists(prev => [response.data, ...prev]);
      toast.success('Playlist duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate playlist');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      visibility: 'public',
      items: []
    });
    setSelectedPlaylist(null);
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
          <h1 className="text-2xl font-bold text-gray-900">My Playlists</h1>
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
          <p className="text-gray-500 mt-1">Create your first playlist to organize your content</p>
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
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {playlist.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getVisibilityIcon(playlist.visibility)}
                      <span className="text-sm text-gray-500 capitalize">
                        {playlist.visibility}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => navigate(`/creator/playlists/${playlist._id}`)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(playlist._id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {playlist.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {playlist.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    {playlist.items?.length || 0} items
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(playlist.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDuplicate(playlist._id)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => navigate(`/playlists/${playlist._id}`)}
                    className="flex-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {id ? 'Edit Playlist' : 'Create New Playlist'}
              </h2>

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
                  onClick={id ? handleUpdate : handleCreate}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {id ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorPlaylistsPage;