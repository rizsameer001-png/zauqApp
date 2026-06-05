// client/src/pages/admin/AudioAnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Heart, Eye, TrendingUp, Calendar, Download, Loader2 } from 'lucide-react';
import audioAPI from '../../api/audioAPI';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

const AudioAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await audioAPI.getAudioAnalytics({ period });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audio Analytics</h1>
          <p className="text-gray-500 mt-1">Track audio performance and engagement metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field w-32"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn-outline inline-flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Audio</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.totalAudio || 0}</p>
              <p className="text-xs text-gray-400 mt-1">{analytics?.publishedAudio || 0} published</p>
            </div>
            <Headphones className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Plays</p>
              <p className="text-2xl font-bold text-gray-900">
                {(analytics?.totalPlays?.[0]?.total || 0).toLocaleString()}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {(analytics?.totalViews?.[0]?.total || 0).toLocaleString()}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900">
                {(analytics?.totalLikes?.[0]?.total || 0).toLocaleString()}
              </p>
            </div>
            <Heart className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audio by Type */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Audio Distribution by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.audioByType || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
              >
                {(analytics?.audioByType || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Audio */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Performing Audio</h3>
          <div className="space-y-3">
            {(analytics?.topPerforming || []).slice(0, 5).map((audio, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-400">#{idx + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{audio.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{audio.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {audio.stats?.plays?.toLocaleString() || 0}
                  </p>
                  <p className="text-xs text-gray-500">plays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Performance by Type</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Count</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total Plays</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Avg Plays/Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(analytics?.audioByType || []).map((type) => (
                <tr key={type._id}>
                  <td className="px-4 py-2 text-sm text-gray-900 capitalize">{type._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 text-right">{type.count}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 text-right">{type.totalPlays?.toLocaleString() || 0}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 text-right">
                    {Math.round((type.totalPlays || 0) / type.count).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AudioAnalyticsPage;