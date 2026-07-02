// client/src/pages/creator/CreatorAudioPlaylistDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Music,
  Play,
  Pause,
  Trash2,
  Plus,
  Loader2,
  Calendar,
  Users,
  Heart,
  Clock,
  MoreVertical,
  Globe,
  Lock,
  EyeOff,
  Edit2,
  Save,
  X,
  Search,
  Download,
  Share2,
  ListMusic
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';

const CreatorAudioPlaylistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [isAddingTracks, setIsAddingTracks] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    visibility: 'public'
  });
  const [availableTracks, setAvailableTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPlaylistDetails();
    fetchAvailableTracks();
  }, [id]);

  const fetchPlaylistDetails = async () => {
    try {
      setLoading(true);
      const response = await audioAPI.getPlaylist(id);
      setPlaylist(response.data);
      setTracks(response.data.items || []);
      setEditForm({
        name: response.data.name || '',
        description: response.data.description || '',
        visibility: response.data.visibility || 'public'
      });
    } catch (error) {
      toast.error('Failed to load playlist details');
      navigate('/creator/audio/playlists');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTracks = async () => {
    try {
      const response = await audioAPI.getCreatorAudio({ limit: 100 });
      setAvailableTracks(response.data.audio || []);
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
    }
  };

  const handleUpdatePlaylist = async () => {
    if (!editForm.name.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    try {
      setIsSaving(true);
      const response = await audioAPI.updatePlaylist(id, editForm);
      setPlaylist(response.data);
      setIsEditing(false);
      toast.success('Playlist updated successfully');
    } catch (error) {
      toast.error('Failed to update playlist');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    if (!confirm('Remove this track from the playlist?')) return;

    try {
      await audioAPI.removeFromPlaylist(id, trackId);
      setTracks(prev => prev.filter(t => t._id !== trackId));
      toast.success('Track removed from playlist');
    } catch (error) {
      toast.error('Failed to remove track');
    }
  };

  const handleAddTracks = async () => {
    if (selectedTracks.length === 0) {
      toast.error('Please select at least one track');
      return;
    }

    try {
      setIsSaving(true);
      await audioAPI.addToPlaylist(id, selectedTracks);
      
      // Refresh playlist details
      await fetchPlaylistDetails();
      setSelectedTracks([]);
      setIsAddingTracks(false);
      toast.success(`${selectedTracks.length} track(s) added to playlist`);
    } catch (error) {
      toast.error('Failed to add tracks');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!confirm('Are you sure you want to delete this playlist? This action cannot be undone.')) return;

    try {
      await audioAPI.deletePlaylist(id);
      toast.success('Playlist deleted successfully');
      navigate('/creator/audio/playlists');
    } catch (error) {
      toast.error('Failed to delete playlist');
    }
  };

  const toggleTrackSelection = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const filteredAvailableTracks = availableTracks.filter(track => {
    const isAlreadyInPlaylist = tracks.some(t => t._id === track._id);
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist?.toLowerCase().includes(searchTerm.toLowerCase());
    return !isAlreadyInPlaylist && matchesSearch;
  });

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

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Playlist not found</h3>
        <button
          onClick={() => navigate('/creator/audio/playlists')}
          className="mt-4 text-primary hover:underline"
        >
          Back to playlists
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/creator/audio/playlists')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Playlists
      </button>

      {/* Playlist Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Cover */}
          <div className="md:w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative">
            {playlist.coverImage ? (
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-24 h-24 text-primary/40" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 p-6">
            {isEditing ? (
              // Edit Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visibility
                  </label>
                  <select
                    value={editForm.visibility}
                    onChange={(e) => setEditForm(prev => ({ ...prev, visibility: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdatePlaylist}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({
                        name: playlist.name,
                        description: playlist.description,
                        visibility: playlist.visibility
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{playlist.name}</h1>
                    {playlist.description && (
                      <p className="text-gray-500 mt-1">{playlist.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Music className="w-4 h-4" />
                        {tracks.length} tracks
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(playlist.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        {getVisibilityIcon(playlist.visibility)}
                        <span className="capitalize">{playlist.visibility}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setIsAddingTracks(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Tracks
                    </button>
                    <button
                      onClick={handleDeletePlaylist}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tracks</h2>
          <span className="text-sm text-gray-500">{tracks.length} tracks</span>
        </div>

        {tracks.length === 0 ? (
          <div className="text-center py-12">
            <ListMusic className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No tracks in this playlist yet</p>
            <button
              onClick={() => setIsAddingTracks(true)}
              className="mt-3 text-primary hover:underline inline-flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add tracks
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tracks.map((track, index) => (
              <div key={track._id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm text-gray-400 font-medium w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{track.title}</p>
                    {track.artist && (
                      <p className="text-sm text-gray-500">{track.artist}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {track.duration && (
                    <span className="text-sm text-gray-400">
                      {formatDuration(track.duration)}
                    </span>
                  )}
                  {track.plays && (
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {track.plays}
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveTrack(track._id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Tracks Modal */}
      {isAddingTracks && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Tracks to Playlist</h2>
              <button
                onClick={() => {
                  setIsAddingTracks(false);
                  setSelectedTracks([]);
                  setSearchTerm('');
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tracks..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Track List */}
              {filteredAvailableTracks.length === 0 ? (
                <div className="text-center py-8">
                  <Music className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No tracks found matching your search' : 'No available tracks to add'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailableTracks.map((track) => (
                    <div
                      key={track._id}
                      onClick={() => toggleTrackSelection(track._id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTracks.includes(track._id)
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{track.title}</p>
                        {track.artist && (
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        )}
                      </div>
                      {track.duration && (
                        <span className="text-sm text-gray-400">
                          {formatDuration(track.duration)}
                        </span>
                      )}
                      {selectedTracks.includes(track._id) && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {selectedTracks.length} track{selectedTracks.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsAddingTracks(false);
                    setSelectedTracks([]);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTracks}
                  disabled={selectedTracks.length === 0 || isSaving}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorAudioPlaylistDetailPage;