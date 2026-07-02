// client/src/pages/creator/AudioAnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Music,
  Headphones,
  Download,
  Heart,
  Clock,
  Calendar,
  Loader2,
  Filter
} from 'lucide-react';
import audioAPI from '../../api/audioAPI';

const AudioAnalyticsPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [period, setPeriod] = useState('30d');
  const [selectedAudio, setSelectedAudio] = useState(null);

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  useEffect(() => {
    if (id) {
      fetchAudioAnalytics(id);
    } else {
      fetchOverallAnalytics();
    }
  }, [id, period]);

  const fetchOverallAnalytics = async () => {
    try {
      setLoading(true);
      const response = await audioAPI.getCreatorAnalytics({ period });
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchAudioAnalytics = async (audioId) => {
    try {
      setLoading(true);
      const response = await audioAPI.getAudioAnalyticsById(audioId);
      setAnalytics(response.data);
      setSelectedAudio(response.data.audio);
    } catch (error) {
      toast.error('Failed to load audio analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No audio data found</h3>
        <p className="text-gray-500 mt-1">Upload some audio to see analytics</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? `Audio Analytics: ${selectedAudio?.title || 'Loading...'}` : 'Audio Analytics'}
          </h1>
          <p className="text-gray-500 mt-1">Track your audio performance and engagement</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="365d">Last Year</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Audio</p>
              <p className="text-2xl font-bold">{analytics.summary?.totalAudio || 0}</p>
            </div>
            <Music className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Plays</p>
              <p className="text-2xl font-bold">{analytics.summary?.totalPlays || 0}</p>
            </div>
            <Headphones className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Likes</p>
              <p className="text-2xl font-bold">{analytics.summary?.totalLikes || 0}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Downloads</p>
              <p className="text-2xl font-bold">{analytics.summary?.totalDownloads || 0}</p>
            </div>
            <Download className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Plays Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Plays</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.dailyPlays ? Object.entries(analytics.dailyPlays).map(([date, plays]) => ({
                date,
                plays
              })) : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="plays" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Audio */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Audio</h3>
          <div className="space-y-3">
            {analytics.topAudio?.slice(0, 5).map((audio, index) => (
              <div key={audio.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{audio.title}</p>
                    <p className="text-sm text-gray-500">{audio.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{audio.plays} plays</span>
                  <span className="text-sm text-gray-500">{audio.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Like Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {analytics.engagement?.likeRate || 0}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Download Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              {analytics.engagement?.downloadRate || 0}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Avg. Plays per Audio</p>
            <p className="text-2xl font-bold text-purple-600">
              {analytics.summary?.averagePlaysPerAudio || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioAnalyticsPage;