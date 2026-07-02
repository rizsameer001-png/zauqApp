// client/src/pages/creator/CreatorFollowersPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  Users,
  UserPlus,
  UserMinus,
  Mail,
  MessageCircle,
  Loader2,
  Search,
  Filter,
  Calendar,
  Award
} from 'lucide-react';
import userAPI from '../../api/userAPI';

const CreatorFollowersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    newThisMonth: 0,
    activeFollowers: 0
  });

  useEffect(() => {
    fetchFollowers();
    fetchStats();
  }, []);

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getFollowers();
      setFollowers(response.data.followers || []);
    } catch (error) {
      toast.error('Failed to load followers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userAPI.getFollowerStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleUnfollow = async (followerId) => {
    if (!confirm('Are you sure you want to remove this follower?')) return;
    
    try {
      await userAPI.removeFollower(followerId);
      setFollowers(prev => prev.filter(f => f._id !== followerId));
      setStats(prev => ({ ...prev, total: prev.total - 1 }));
      toast.success('Follower removed successfully');
    } catch (error) {
      toast.error('Failed to remove follower');
    }
  };

  const filteredFollowers = followers.filter(follower => {
    const matchesSearch = 
      follower.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'active') {
      return matchesSearch && (follower.isActive !== false);
    }
    if (filter === 'inactive') {
      return matchesSearch && follower.isActive === false;
    }
    return matchesSearch;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Followers</h1>
          <p className="text-gray-500 mt-1">
            {stats.total} follower{stats.total !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg shadow px-4 py-2 text-center">
            <p className="text-sm text-gray-500">New This Month</p>
            <p className="text-lg font-bold text-primary">{stats.newThisMonth}</p>
          </div>
          <div className="bg-white rounded-lg shadow px-4 py-2 text-center">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-lg font-bold text-green-600">{stats.activeFollowers}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search followers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Followers</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Followers List */}
      {filteredFollowers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No followers found</h3>
          <p className="text-gray-500 mt-1">
            {searchTerm ? 'Try adjusting your search' : 'Start creating content to gain followers'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFollowers.map((follower) => (
            <div
              key={follower._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {follower.avatar ? (
                    <img
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {follower.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {follower.name || 'Anonymous'}
                  </h4>
                  {follower.username && (
                    <p className="text-sm text-gray-500 truncate">
                      @{follower.username}
                    </p>
                  )}
                  {follower.bio && (
                    <p className="text-sm text-gray-400 truncate mt-0.5">
                      {follower.bio}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {new Date(follower.createdAt).toLocaleDateString()}
                    </span>
                    {follower.isActive !== false && (
                      <span className="flex items-center gap-1 text-green-500">
                        <Award className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {follower.email && (
                  <a
                    href={`mailto:${follower.email}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </a>
                )}
                <button
                  onClick={() => handleUnfollow(follower._id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  <UserMinus className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorFollowersPage;