// //client\src\pages\creator\CreatorDashboardPage.jsx



// const CreatorDashboardPage = () => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Creator Dashboard</h1>
//       <p>This page is under development 🚧</p>
//     </div>
//   );
// };

// export default CreatorDashboardPage;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   TrendingUp, Eye, ThumbsUp, Upload, BookOpen, 
//   Music, Video, FileText, Users, DollarSign,
//   Activity, Clock, CheckCircle, AlertCircle 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../services/api';
// import { Link } from 'react-router-dom';

// const CreatorDashboardPage = () => {
//   const { user } = useAuth();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/creator/dashboard');
//       setDashboardData(response.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-600">{error}</p>
//         <button onClick={fetchDashboardData} className="btn-primary mt-4">
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   const { stats, recentUploads } = dashboardData || { stats: {}, recentUploads: [] };

//   const statCards = [
//     { label: 'Total Uploads', value: stats.totalUploads || 0, icon: Upload, color: 'bg-blue-500' },
//     { label: 'Total Views', value: (stats.totalViews || 0).toLocaleString(), icon: Eye, color: 'bg-green-500' },
//     { label: 'Total Likes', value: (stats.totalLikes || 0).toLocaleString(), icon: ThumbsUp, color: 'bg-red-500' },
//     { label: 'Poems', value: stats.poems || 0, icon: FileText, color: 'bg-purple-500' },
//     { label: 'Books', value: stats.books || 0, icon: BookOpen, color: 'bg-yellow-500' },
//     { label: 'Audio', value: stats.audio || 0, icon: Music, color: 'bg-indigo-500' },
//     { label: 'Videos', value: stats.videos || 0, icon: Video, color: 'bg-pink-500' },
//   ];

//   const getContentIcon = (type) => {
//     switch (type) {
//       case 'Poem': return FileText;
//       case 'Book': return BookOpen;
//       case 'Audio': return Music;
//       case 'Video': return Video;
//       default: return FileText;
//     }
//   };

//   const getContentTypeColor = (type) => {
//     switch (type) {
//       case 'Poem': return 'bg-purple-100 text-purple-600';
//       case 'Book': return 'bg-yellow-100 text-yellow-600';
//       case 'Audio': return 'bg-indigo-100 text-indigo-600';
//       case 'Video': return 'bg-pink-100 text-pink-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {user?.name || 'Creator'}! 👋
//         </h1>
//         <p className="text-primary-100">
//           Here's what's happening with your content today.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//         {statCards.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               className="card p-4 text-center"
//             >
//               <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2`}>
//                 <Icon className="h-5 w-5 text-white" />
//               </div>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-xs text-gray-500">{stat.label}</p>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Recent Uploads */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
//             <Link to="/creator/content" className="text-sm text-primary-600 hover:text-primary-700">
//               View All →
//             </Link>
//           </div>
//           <div className="space-y-3">
//             {recentUploads.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No uploads yet</p>
//             ) : (
//               recentUploads.map((item, index) => {
//                 const Icon = getContentIcon(item.constructor?.modelName || 'Poem');
//                 const colorClass = getContentTypeColor(item.constructor?.modelName || 'Poem');
//                 return (
//                   <motion.div
//                     key={item._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}>
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">{item.title}</p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(item.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <p className="text-sm text-gray-600">{item.stats?.views || 0} views</p>
//                         <p className="text-xs text-gray-500">{item.stats?.likes || 0} likes</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Quick Stats & Tips */}
//         <div className="space-y-6">
//           <div className="card">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Average Views per Content</span>
//                 <span className="font-semibold">
//                   {stats.totalUploads ? Math.round(stats.totalViews / stats.totalUploads).toLocaleString() : 0}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Engagement Rate</span>
//                 <span className="font-semibold">
//                   {stats.totalViews ? ((stats.totalLikes / stats.totalViews) * 100).toFixed(1) : 0}%
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Content Diversity</span>
//                 <span className="font-semibold">
//                   {Object.values({
//                     poems: stats.poems,
//                     books: stats.books,
//                     audio: stats.audio,
//                     videos: stats.videos
//                   }).filter(v => v > 0).length} types
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
//             <h2 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h2>
//             <p className="text-gray-600 text-sm">
//               Content with images and descriptions gets 3x more engagement. 
//               Add detailed descriptions to your uploads for better visibility!
//             </p>
//             <Link to="/creator/upload" className="inline-block mt-3 text-primary-600 text-sm font-medium">
//               Upload New Content →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorDashboardPage;














// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Eye, ThumbsUp, Upload, BookOpen, 
//   Music, Video, FileText, TrendingUp, Users
// } from 'lucide-react';
// import creatorAPI from '../../api/creatorAPI';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import authService from '../../services/authService';

// const CreatorDashboardPage = () => {
//   const [user, setUser] = useState(null);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetchUser();
//     fetchDashboardData();
//     fetchStats();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const response = await authService.getProfile();
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       const response = await creatorAPI.getDashboard();
//       setDashboardData(response.data);
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
//       console.error(error);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await creatorAPI.getStats();
//       setStats(response.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   const dashboardStats = dashboardData?.stats || {};
//   const recentUploads = dashboardData?.recentUploads || [];

//   const statCards = [
//     { label: 'Total Uploads', value: dashboardStats.totalUploads || 0, icon: Upload, color: 'bg-blue-500' },
//     { label: 'Total Views', value: (dashboardStats.totalViews || 0).toLocaleString(), icon: Eye, color: 'bg-green-500' },
//     { label: 'Total Likes', value: (dashboardStats.totalLikes || 0).toLocaleString(), icon: ThumbsUp, color: 'bg-red-500' },
//     { label: 'Total Content', value: stats?.totalContent || 0, icon: TrendingUp, color: 'bg-purple-500' },
//     { label: 'Followers', value: user?.followersCount || 0, icon: Users, color: 'bg-indigo-500' },
//   ];

//   const contentTypeCards = [
//     { label: 'Poems', value: dashboardStats.poems || 0, icon: FileText, color: 'bg-purple-100 text-purple-600' },
//     { label: 'Books', value: dashboardStats.books || 0, icon: BookOpen, color: 'bg-yellow-100 text-yellow-600' },
//     { label: 'Audio', value: dashboardStats.audio || 0, icon: Music, color: 'bg-indigo-100 text-indigo-600' },
//     { label: 'Videos', value: dashboardStats.videos || 0, icon: Video, color: 'bg-pink-100 text-pink-600' },
//   ];

//   const getContentIcon = (type) => {
//     const modelName = type?.constructor?.modelName || '';
//     if (modelName === 'Poem') return FileText;
//     if (modelName === 'Book') return BookOpen;
//     if (modelName === 'Audio') return Music;
//     if (modelName === 'Video') return Video;
//     return FileText;
//   };

//   const getContentTypeColor = (type) => {
//     const modelName = type?.constructor?.modelName || '';
//     if (modelName === 'Poem') return 'bg-purple-100 text-purple-600';
//     if (modelName === 'Book') return 'bg-yellow-100 text-yellow-600';
//     if (modelName === 'Audio') return 'bg-indigo-100 text-indigo-600';
//     if (modelName === 'Video') return 'bg-pink-100 text-pink-600';
//     return 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
//         <h1 className="text-2xl font-bold mb-2">
//           Welcome back, {user?.name || 'Creator'}! 👋
//         </h1>
//         <p className="text-primary-100">
//           Here's what's happening with your content today.
//         </p>
//       </div>

//       {/* Main Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         {statCards.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               className="card p-4"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
//                   <Icon className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Content Type Breakdown */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {contentTypeCards.map((item, index) => {
//           const Icon = item.icon;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.05 }}
//               className="card p-4 text-center hover:shadow-md transition-shadow"
//             >
//               <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
//                 <Icon className="h-6 w-6" />
//               </div>
//               <p className="text-2xl font-bold text-gray-900">{item.value}</p>
//               <p className="text-sm text-gray-500">{item.label}</p>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Recent Uploads and Quick Actions */}
//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Recent Uploads */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
//             <Link to="/creator/content" className="text-sm text-primary-600 hover:text-primary-700">
//               View All →
//             </Link>
//           </div>
//           <div className="space-y-3">
//             {recentUploads.length === 0 ? (
//               <div className="text-center py-8">
//                 <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500">No uploads yet</p>
//                 <Link to="/creator/upload" className="btn-primary mt-3 inline-block">
//                   Upload Your First Content
//                 </Link>
//               </div>
//             ) : (
//               recentUploads.map((item, index) => {
//                 const Icon = getContentIcon(item);
//                 const colorClass = getContentTypeColor(item);
//                 return (
//                   <motion.div
//                     key={item._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}>
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <Link to={`/content/${item._id}`} className="font-medium text-gray-900 hover:text-primary-600">
//                           {item.title}
//                         </Link>
//                         <p className="text-xs text-gray-500">
//                           {new Date(item.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <p className="text-sm text-gray-600">{item.stats?.views || 0} views</p>
//                         <p className="text-xs text-gray-500">{item.stats?.likes || 0} likes</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Quick Stats & Insights */}
//         <div className="space-y-6">
//           <div className="card">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h2>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>Avg. Views per Content</span>
//                   <span className="font-semibold">
//                     {dashboardStats.totalUploads 
//                       ? Math.round(dashboardStats.totalViews / dashboardStats.totalUploads).toLocaleString() 
//                       : 0}
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-primary-600 h-2 rounded-full" 
//                     style={{ width: `${Math.min(100, (dashboardStats.totalViews / (dashboardStats.totalUploads * 1000)) * 100)}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>Engagement Rate</span>
//                   <span className="font-semibold">
//                     {dashboardStats.totalViews 
//                       ? ((dashboardStats.totalLikes / dashboardStats.totalViews) * 100).toFixed(1) 
//                       : 0}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-green-500 h-2 rounded-full" 
//                     style={{ width: `${Math.min(100, (dashboardStats.totalLikes / dashboardStats.totalViews) * 100)}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="pt-3 border-t border-gray-100">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Total Comments</span>
//                   <span className="font-semibold">{stats?.totalComments || 0}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mt-2">
//                   <span className="text-gray-600">Total Bookmarks</span>
//                   <span className="font-semibold">{stats?.totalBookmarks || 0}</span>
//                 </div>
//                 <div className="flex justify-between text-sm mt-2">
//                   <span className="text-gray-600">Total Downloads</span>
//                   <span className="font-semibold">{stats?.totalDownloads || 0}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
//             <h2 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h2>
//             <p className="text-gray-600 text-sm">
//               Content with images and descriptions gets 3x more engagement. 
//               Add detailed descriptions to your uploads for better visibility!
//             </p>
//             <Link to="/creator/upload" className="inline-block mt-3 text-primary-600 text-sm font-medium hover:text-primary-700">
//               Upload New Content →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatorDashboardPage;













import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, ThumbsUp, Upload, BookOpen, 
  Music, Video, FileText, TrendingUp, Users, AlertCircle
} from 'lucide-react';
import creatorAPI from '../../api/creatorAPI';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../../services/authService';

const CreatorDashboardPage = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      // First check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to access creator dashboard');
        setLoading(false);
        return;
      }

      await fetchUser();
      await fetchDashboardData();
      await fetchStats();
    } catch (error) {
      console.error('Auth check error:', error);
      if (error.response?.status === 403) {
        setError('You do not have creator permissions. Please contact admin.');
      } else if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setError('Failed to load dashboard. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data);
      
      // Check if user has creator role
      const userRole = response.data?.role;
      if (userRole !== 'creator' && userRole !== 'admin') {
        setError(`Your role (${userRole}) does not have creator permissions.`);
        return;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await creatorAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      throw error;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await creatorAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center card p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary inline-block">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const dashboardStats = dashboardData?.stats || {};
  const recentUploads = dashboardData?.recentUploads || [];

  const statCards = [
    { label: 'Total Uploads', value: dashboardStats.totalUploads || 0, icon: Upload, color: 'bg-blue-500' },
    { label: 'Total Views', value: (dashboardStats.totalViews || 0).toLocaleString(), icon: Eye, color: 'bg-green-500' },
    { label: 'Total Likes', value: (dashboardStats.totalLikes || 0).toLocaleString(), icon: ThumbsUp, color: 'bg-red-500' },
    { label: 'Total Content', value: stats?.totalContent || 0, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Followers', value: user?.followersCount || 0, icon: Users, color: 'bg-indigo-500' },
  ];

  const contentTypeCards = [
    { label: 'Poems', value: dashboardStats.poems || 0, icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { label: 'Books', value: dashboardStats.books || 0, icon: BookOpen, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Audio', value: dashboardStats.audio || 0, icon: Music, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Videos', value: dashboardStats.videos || 0, icon: Video, color: 'bg-pink-100 text-pink-600' },
  ];

  const getContentIcon = (type) => {
    const modelName = type?.constructor?.modelName || '';
    if (modelName === 'Poem') return FileText;
    if (modelName === 'Book') return BookOpen;
    if (modelName === 'Audio') return Music;
    if (modelName === 'Video') return Video;
    return FileText;
  };

  const getContentTypeColor = (type) => {
    const modelName = type?.constructor?.modelName || '';
    if (modelName === 'Poem') return 'bg-purple-100 text-purple-600';
    if (modelName === 'Book') return 'bg-yellow-100 text-yellow-600';
    if (modelName === 'Audio') return 'bg-indigo-100 text-indigo-600';
    if (modelName === 'Video') return 'bg-pink-100 text-pink-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'Creator'}! 👋
        </h1>
        <p className="text-primary-100">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Content Type Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contentTypeCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="card p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Uploads and Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
            <Link to="/creator/content" className="text-sm text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentUploads.length === 0 ? (
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No uploads yet</p>
                <Link to="/creator/upload" className="btn-primary mt-3 inline-block">
                  Upload Your First Content
                </Link>
              </div>
            ) : (
              recentUploads.map((item, index) => {
                const Icon = getContentIcon(item);
                const colorClass = getContentTypeColor(item);
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Link to={`/content/${item._id}`} className="font-medium text-gray-900 hover:text-primary-600">
                          {item.title}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{item.stats?.views || 0} views</p>
                        <p className="text-xs text-gray-500">{item.stats?.likes || 0} likes</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Stats & Insights */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Avg. Views per Content</span>
                  <span className="font-semibold">
                    {dashboardStats.totalUploads 
                      ? Math.round(dashboardStats.totalViews / dashboardStats.totalUploads).toLocaleString() 
                      : 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (dashboardStats.totalViews / (dashboardStats.totalUploads * 1000)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-semibold">
                    {dashboardStats.totalViews 
                      ? ((dashboardStats.totalLikes / dashboardStats.totalViews) * 100).toFixed(1) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (dashboardStats.totalLikes / dashboardStats.totalViews) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Comments</span>
                  <span className="font-semibold">{stats?.totalComments || 0}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Total Bookmarks</span>
                  <span className="font-semibold">{stats?.totalBookmarks || 0}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Total Downloads</span>
                  <span className="font-semibold">{stats?.totalDownloads || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h2>
            <p className="text-gray-600 text-sm">
              Content with images and descriptions gets 3x more engagement. 
              Add detailed descriptions to your uploads for better visibility!
            </p>
            <Link to="/creator/upload" className="inline-block mt-3 text-primary-600 text-sm font-medium hover:text-primary-700">
              Upload New Content →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardPage;