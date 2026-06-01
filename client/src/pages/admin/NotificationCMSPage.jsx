// // //client/src/pages/admin/NotificationCMSPage.jsx

// //coming soon

// // client/src/pages/admin/NotificationCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Bell, Send, Users, Eye, Trash2, Loader2, 
//   CheckCircle, XCircle, AlertCircle, Calendar, 
//   MessageSquare, Megaphone, Clock, Filter,
//   Mail, Globe, Target, Sparkles, TrendingUp
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import notificationAPI from '../../api/notificationAPI';
// import userAPI from '../../api/userAPI';

// const NotificationCMSPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [selectedType, setSelectedType] = useState('system');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     sentToday: 0,
//     unreadCount: 0
//   });
  
//   const [formData, setFormData] = useState({
//     title: '',
//     message: '',
//     type: 'system',
//     sendTo: 'all',
//     scheduleDate: '',
//     priority: 'normal'
//   });

//   // Preview notification for homepage
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewNotice, setPreviewNotice] = useState(null);

//   useEffect(() => {
//     fetchNotifications();
//     fetchStats();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const response = await notificationAPI.getNotifications();
//       setNotifications(response.data || []);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       toast.error('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const [users, unread] = await Promise.all([
//         userAPI.getAllUsers?.() || Promise.resolve({ data: { total: 0 } }),
//         notificationAPI.getUnreadCount()
//       ]);
//       setStats({
//         totalUsers: users?.data?.total || 0,
//         sentToday: notifications.filter(n => 
//           new Date(n.createdAt).toDateString() === new Date().toDateString()
//         ).length,
//         unreadCount: unread?.data?.count || 0
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSendNotification = async () => {
//     if (!formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.message.trim()) {
//       toast.error('Please enter a message');
//       return;
//     }

//     setSending(true);
//     try {
//       const response = await notificationAPI.sendToAll({
//         title: formData.title,
//         message: formData.message,
//         type: formData.type,
//         sendTo: formData.sendTo,
//         scheduleDate: formData.scheduleDate || null,
//         priority: formData.priority
//       });

//       if (response.success) {
//         toast.success(`Notification sent to ${stats.totalUsers} users!`);
        
//         // Set preview for homepage
//         setPreviewNotice({
//           title: formData.title,
//           message: formData.message,
//           type: formData.type,
//           createdAt: new Date().toISOString()
//         });
        
//         // Store in localStorage for homepage to show
//         localStorage.setItem('global_notice', JSON.stringify({
//           title: formData.title,
//           message: formData.message,
//           type: formData.type,
//           createdAt: new Date().toISOString()
//         }));
        
//         setFormData({
//           title: '',
//           message: '',
//           type: 'system',
//           sendTo: 'all',
//           scheduleDate: '',
//           priority: 'normal'
//         });
//         fetchNotifications();
//       }
//     } catch (error) {
//       console.error('Error sending notification:', error);
//       toast.error(error.response?.data?.message || 'Failed to send notification');
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleDeleteNotification = async (id) => {
//     if (!window.confirm('Delete this notification?')) return;
    
//     try {
//       await notificationAPI.deleteNotification(id);
//       toast.success('Notification deleted');
//       fetchNotifications();
//     } catch (error) {
//       toast.error('Failed to delete');
//     }
//   };

//   const getTypeIcon = (type) => {
//     const icons = {
//       system: <Bell className="h-4 w-4" />,
//       follow: <Users className="h-4 w-4" />,
//       like: <Heart className="h-4 w-4" />,
//       comment: <MessageSquare className="h-4 w-4" />,
//       subscription: <Sparkles className="h-4 w-4" />,
//       announcement: <Megaphone className="h-4 w-4" />
//     };
//     return icons[type] || <Bell className="h-4 w-4" />;
//   };

//   const getTypeColor = (type) => {
//     const colors = {
//       system: 'bg-blue-100 text-blue-700',
//       follow: 'bg-green-100 text-green-700',
//       like: 'bg-red-100 text-red-700',
//       comment: 'bg-purple-100 text-purple-700',
//       subscription: 'bg-amber-100 text-amber-700',
//       announcement: 'bg-pink-100 text-pink-700'
//     };
//     return colors[type] || 'bg-gray-100 text-gray-700';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Notification Center</h1>
//         <p className="text-gray-500">Send announcements and manage notifications</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Users</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
//             </div>
//             <Users className="h-8 w-8 text-primary-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Sent Today</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.sentToday}</p>
//             </div>
//             <Mail className="h-8 w-8 text-green-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Unread</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.unreadCount}</p>
//             </div>
//             <Eye className="h-8 w-8 text-amber-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Delivery Rate</p>
//               <p className="text-2xl font-bold text-gray-900">98%</p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-purple-400" />
//           </div>
//         </div>
//       </div>

//       {/* Send Notification Form */}
//       <div className="card p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Megaphone className="h-5 w-5 text-primary-600" />
//           Send Announcement
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="input-field"
//               placeholder="e.g., New Books Available!"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notification Type
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="system">System</option>
//               <option value="announcement">Announcement</option>
//               <option value="subscription">Subscription</option>
//               <option value="follow">Follow</option>
//             </select>
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Message <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleInputChange}
//             rows={4}
//             className="input-field"
//             placeholder="Enter your announcement message here..."
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Send To
//             </label>
//             <select
//               name="sendTo"
//               value={formData.sendTo}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="all">All Users ({stats.totalUsers})</option>
//               <option value="active">Active Users Only</option>
//               <option value="premium">Premium Users</option>
//               <option value="free">Free Users</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Schedule (Optional)
//             </label>
//             <input
//               type="datetime-local"
//               name="scheduleDate"
//               value={formData.scheduleDate}
//               onChange={handleInputChange}
//               className="input-field"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Priority
//             </label>
//             <select
//               name="priority"
//               value={formData.priority}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="low">Low</option>
//               <option value="normal">Normal</option>
//               <option value="high">High</option>
//               <option value="urgent">Urgent</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex items-center justify-end gap-3 mt-6">
//           <button
//             onClick={() => setShowPreview(true)}
//             className="btn-secondary"
//           >
//             Preview
//           </button>
//           <button
//             onClick={handleSendNotification}
//             disabled={sending}
//             className="btn-primary flex items-center gap-2"
//           >
//             {sending ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//             Send to All Users
//           </button>
//         </div>
//       </div>

//       {/* Recent Notifications */}
//       <div className="card overflow-hidden">
//         <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3 flex items-center gap-2">
//           <Bell className="h-5 w-5 text-primary-600" />
//           Recent Notifications
//         </h2>
        
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {notifications.slice(0, 10).map((notif) => (
//                 <tr key={notif._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getTypeColor(notif.type)}`}>
//                       {getTypeIcon(notif.type)}
//                       {notif.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{notif.title}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{notif.message}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {new Date(notif.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1 text-xs ${notif.isRead ? 'text-green-600' : 'text-amber-600'}`}>
//                       {notif.isRead ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                       {notif.isRead ? 'Read' : 'Sent'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => handleDeleteNotification(notif._id)}
//                       className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {notifications.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                     No notifications sent yet
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Preview Modal */}
//       <AnimatePresence>
//         {showPreview && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Preview Notification</h2>
//                 <button onClick={() => setShowPreview(false)} className="p-1 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className={`p-4 rounded-lg ${getTypeColor(formData.type)}`}>
//                   <div className="flex items-center gap-2 mb-2">
//                     {getTypeIcon(formData.type)}
//                     <span className="font-semibold">{formData.title || 'Title Preview'}</span>
//                   </div>
//                   <p className="text-sm">{formData.message || 'Message preview will appear here...'}</p>
//                 </div>
//               </div>
//               <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
//                 <button onClick={() => setShowPreview(false)} className="btn-primary">
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default NotificationCMSPage;










// // client/src/pages/admin/NotificationCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Bell, Send, Users, Eye, Trash2, Loader2, 
//   CheckCircle, XCircle, AlertCircle, Calendar, 
//   MessageSquare, Megaphone, Clock, Filter,
//   Mail, Globe, Target, Sparkles, TrendingUp,
//   Heart, BookOpen, Headphones, Video, Crown, Zap,
//   X, Plus, Edit, Copy, RefreshCw, FileText, Download
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import notificationAPI from '../../api/notificationAPI';
// import userAPI from '../../api/userAPI';

// const NotificationCMSPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [selectedType, setSelectedType] = useState('system');
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     sentToday: 0,
//     unreadCount: 0
//   });
  
//   const [formData, setFormData] = useState({
//     title: '',
//     message: '',
//     type: 'system',
//     sendTo: 'all',
//     scheduleDate: '',
//     priority: 'normal',
//     imageUrl: '',
//     actionUrl: ''
//   });

//   // Preview notification for homepage
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewNotice, setPreviewNotice] = useState(null);

//   useEffect(() => {
//     fetchNotifications();
//     fetchStats();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const response = await notificationAPI.getNotifications();
//       setNotifications(response.data?.data || response.data || []);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       toast.error('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const [users, unread] = await Promise.all([
//         userAPI.getAllUsers?.() || Promise.resolve({ data: { total: 0 } }),
//         notificationAPI.getUnreadCount()
//       ]);
//       setStats({
//         totalUsers: users?.data?.total || 0,
//         sentToday: notifications.filter(n => 
//           new Date(n.createdAt).toDateString() === new Date().toDateString()
//         ).length,
//         unreadCount: unread?.data?.count || 0
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSendNotification = async () => {
//     if (!formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.message.trim()) {
//       toast.error('Please enter a message');
//       return;
//     }

//     setSending(true);
//     try {
//       const response = await notificationAPI.adminSendNotification({
//         title: formData.title,
//         message: formData.message,
//         type: formData.type,
//         sendTo: formData.sendTo,
//         scheduleDate: formData.scheduleDate || null,
//         priority: formData.priority,
//         imageUrl: formData.imageUrl,
//         actionUrl: formData.actionUrl
//       });

//       if (response.success) {
//         toast.success(`Notification sent to ${stats.totalUsers} users!`);
        
//         // Set preview for homepage
//         setPreviewNotice({
//           title: formData.title,
//           message: formData.message,
//           type: formData.type,
//           createdAt: new Date().toISOString()
//         });
        
//         // Store in localStorage for homepage to show
//         localStorage.setItem('global_notice', JSON.stringify({
//           title: formData.title,
//           message: formData.message,
//           type: formData.type,
//           createdAt: new Date().toISOString()
//         }));
        
//         setFormData({
//           title: '',
//           message: '',
//           type: 'system',
//           sendTo: 'all',
//           scheduleDate: '',
//           priority: 'normal',
//           imageUrl: '',
//           actionUrl: ''
//         });
//         fetchNotifications();
//       }
//     } catch (error) {
//       console.error('Error sending notification:', error);
//       toast.error(error.response?.data?.message || 'Failed to send notification');
//     } finally {
//       setSending(false);
//     }
//   };

//   const handleDeleteNotification = async (id) => {
//     if (!window.confirm('Delete this notification?')) return;
    
//     try {
//       await notificationAPI.adminDeleteNotification(id);
//       toast.success('Notification deleted');
//       fetchNotifications();
//     } catch (error) {
//       toast.error('Failed to delete');
//     }
//   };

//   const getTypeIcon = (type) => {
//     const icons = {
//       system: <Bell className="h-4 w-4" />,
//       follow: <Users className="h-4 w-4" />,
//       like: <Heart className="h-4 w-4" />,
//       comment: <MessageSquare className="h-4 w-4" />,
//       subscription: <Crown className="h-4 w-4" />,
//       announcement: <Megaphone className="h-4 w-4" />,
//       book: <BookOpen className="h-4 w-4" />,
//       audio: <Headphones className="h-4 w-4" />,
//       video: <Video className="h-4 w-4" />
//     };
//     return icons[type] || <Bell className="h-4 w-4" />;
//   };

//   const getTypeColor = (type) => {
//     const colors = {
//       system: 'bg-blue-100 text-blue-700',
//       follow: 'bg-green-100 text-green-700',
//       like: 'bg-red-100 text-red-700',
//       comment: 'bg-purple-100 text-purple-700',
//       subscription: 'bg-amber-100 text-amber-700',
//       announcement: 'bg-pink-100 text-pink-700',
//       book: 'bg-indigo-100 text-indigo-700',
//       audio: 'bg-orange-100 text-orange-700',
//       video: 'bg-cyan-100 text-cyan-700'
//     };
//     return colors[type] || 'bg-gray-100 text-gray-700';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//           <Bell className="h-6 w-6 text-primary-600" />
//           Notification Center
//         </h1>
//         <p className="text-gray-500">Send announcements and manage notifications</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Users</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
//             </div>
//             <Users className="h-8 w-8 text-primary-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Sent Today</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.sentToday}</p>
//             </div>
//             <Mail className="h-8 w-8 text-green-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Unread</p>
//               <p className="text-2xl font-bold text-gray-900">{stats.unreadCount}</p>
//             </div>
//             <Eye className="h-8 w-8 text-amber-400" />
//           </div>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Delivery Rate</p>
//               <p className="text-2xl font-bold text-gray-900">98%</p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-purple-400" />
//           </div>
//         </div>
//       </div>

//       {/* Send Notification Form */}
//       <div className="card p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Megaphone className="h-5 w-5 text-primary-600" />
//           Send Announcement
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="input-field"
//               placeholder="e.g., New Books Available!"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notification Type
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="system">System</option>
//               <option value="announcement">Announcement</option>
//               <option value="subscription">Subscription</option>
//               <option value="follow">Follow</option>
//               <option value="like">Like</option>
//               <option value="comment">Comment</option>
//             </select>
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Message <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleInputChange}
//             rows={4}
//             className="input-field"
//             placeholder="Enter your announcement message here..."
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Send To
//             </label>
//             <select
//               name="sendTo"
//               value={formData.sendTo}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="all">All Users ({stats.totalUsers})</option>
//               <option value="active">Active Users Only</option>
//               <option value="premium">Premium Users</option>
//               <option value="free">Free Users</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Schedule (Optional)
//             </label>
//             <input
//               type="datetime-local"
//               name="scheduleDate"
//               value={formData.scheduleDate}
//               onChange={handleInputChange}
//               className="input-field"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Priority
//             </label>
//             <select
//               name="priority"
//               value={formData.priority}
//               onChange={handleInputChange}
//               className="input-field"
//             >
//               <option value="low">Low</option>
//               <option value="normal">Normal</option>
//               <option value="high">High</option>
//               <option value="urgent">Urgent</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image URL (Optional)
//             </label>
//             <input
//               type="url"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleInputChange}
//               className="input-field"
//               placeholder="https://example.com/image.jpg"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Action URL (Optional)
//             </label>
//             <input
//               type="url"
//               name="actionUrl"
//               value={formData.actionUrl}
//               onChange={handleInputChange}
//               className="input-field"
//               placeholder="/explore or https://example.com"
//             />
//           </div>
//         </div>

//         <div className="flex items-center justify-end gap-3 mt-6">
//           <button
//             onClick={() => setShowPreview(true)}
//             className="btn-secondary"
//           >
//             Preview
//           </button>
//           <button
//             onClick={handleSendNotification}
//             disabled={sending}
//             className="btn-primary flex items-center gap-2"
//           >
//             {sending ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//             Send to All Users
//           </button>
//         </div>
//       </div>

//       {/* Recent Notifications */}
//       <div className="card overflow-hidden">
//         <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3 flex items-center gap-2">
//           <Bell className="h-5 w-5 text-primary-600" />
//           Recent Notifications
//         </h2>
        
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {notifications.slice(0, 10).map((notif) => (
//                 <tr key={notif._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getTypeColor(notif.type)}`}>
//                       {getTypeIcon(notif.type)}
//                       {notif.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{notif.title}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{notif.message}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {new Date(notif.createdAt).toLocaleString()}
//                    </td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center gap-1 text-xs ${notif.isRead ? 'text-green-600' : 'text-amber-600'}`}>
//                       {notif.isRead ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
//                       {notif.isRead ? 'Read' : 'Sent'}
//                     </span>
//                    </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => handleDeleteNotification(notif._id)}
//                       className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                    </td>
//                  </tr>
//               ))}
//               {notifications.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                     No notifications sent yet
//                    </td>
//                  </tr>
//               )}
//             </tbody>
//            </table>
//         </div>
//       </div>

//       {/* Preview Modal */}
//       <AnimatePresence>
//         {showPreview && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Preview Notification</h2>
//                 <button onClick={() => setShowPreview(false)} className="p-1 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className={`p-4 rounded-lg ${getTypeColor(formData.type)}`}>
//                   <div className="flex items-center gap-2 mb-2">
//                     {getTypeIcon(formData.type)}
//                     <span className="font-semibold">{formData.title || 'Title Preview'}</span>
//                   </div>
//                   <p className="text-sm">{formData.message || 'Message preview will appear here...'}</p>
//                 </div>
//               </div>
//               <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
//                 <button onClick={() => setShowPreview(false)} className="btn-primary">
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default NotificationCMSPage;

















// client/src/pages/admin/NotificationCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Send, Users, Eye, Trash2, Loader2, 
  CheckCircle, XCircle, AlertCircle, Calendar, 
  MessageSquare, Megaphone, Clock, Filter,
  Mail, Globe, Target, Sparkles, TrendingUp,
  Heart, BookOpen, Headphones, Video, Crown, Zap,
  X, Plus, Edit, Copy, RefreshCw, FileText, Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import notificationAPI from '../../api/notificationAPI';
import userAPI from '../../api/userAPI';

const NotificationCMSPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    sentToday: 0,
    unreadCount: 0
  });
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement',
    sendTo: 'all',
    scheduleDate: '',
    priority: 'normal',
    imageUrl: '',
    actionUrl: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationAPI.getNotifications();
      setNotifications(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [users, unread] = await Promise.all([
        userAPI.getAllUsers?.() || Promise.resolve({ data: { total: 0 } }),
        notificationAPI.getUnreadCount()
      ]);
      setStats({
        totalUsers: users?.data?.total || 0,
        sentToday: notifications.filter(n => 
          new Date(n.createdAt).toDateString() === new Date().toDateString()
        ).length,
        unreadCount: unread?.data?.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSending(true);
    try {
      const response = await notificationAPI.adminCreateNotification({
        title: formData.title,
        message: formData.message,
        type: formData.type,
        sendTo: formData.sendTo,
        scheduleDate: formData.scheduleDate || null,
        priority: formData.priority,
        imageUrl: formData.imageUrl,
        actionUrl: formData.actionUrl
      });

      if (response.success) {
        toast.success(`Notification sent to users!`);
        
        setFormData({
          title: '',
          message: '',
          type: 'announcement',
          sendTo: 'all',
          scheduleDate: '',
          priority: 'normal',
          imageUrl: '',
          actionUrl: ''
        });
        fetchNotifications();
      } else {
        toast.error(response.message || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error(error.response?.data?.message || 'Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    
    try {
      await notificationAPI.adminDeleteNotification(id);
      toast.success('Notification deleted');
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      system: <Bell className="h-4 w-4" />,
      follow: <Users className="h-4 w-4" />,
      like: <Heart className="h-4 w-4" />,
      comment: <MessageSquare className="h-4 w-4" />,
      subscription: <Crown className="h-4 w-4" />,
      announcement: <Megaphone className="h-4 w-4" />,
      book: <BookOpen className="h-4 w-4" />,
      audio: <Headphones className="h-4 w-4" />,
      video: <Video className="h-4 w-4" />
    };
    return icons[type] || <Bell className="h-4 w-4" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      system: 'bg-blue-100 text-blue-700',
      follow: 'bg-green-100 text-green-700',
      like: 'bg-red-100 text-red-700',
      comment: 'bg-purple-100 text-purple-700',
      subscription: 'bg-amber-100 text-amber-700',
      announcement: 'bg-pink-100 text-pink-700',
      book: 'bg-indigo-100 text-indigo-700',
      audio: 'bg-orange-100 text-orange-700',
      video: 'bg-cyan-100 text-cyan-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary-600" />
          Notification Center
        </h1>
        <p className="text-gray-500">Send announcements and manage notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-primary-400" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sent Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sentToday}</p>
            </div>
            <Mail className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unreadCount}</p>
            </div>
            <Eye className="h-8 w-8 text-amber-400" />
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivery Rate</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Send Notification Form */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary-600" />
          Send Announcement
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., New Books Available!"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="announcement">Announcement</option>
              <option value="system">System</option>
              <option value="subscription">Subscription</option>
              <option value="follow">Follow</option>
              <option value="like">Like</option>
              <option value="comment">Comment</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="input-field"
            placeholder="Enter your announcement message here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send To
            </label>
            <select
              name="sendTo"
              value={formData.sendTo}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="all">All Users ({stats.totalUsers})</option>
              <option value="active">Active Users Only</option>
              <option value="premium">Premium Users</option>
              <option value="free">Free Users</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule (Optional)
            </label>
            <input
              type="datetime-local"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => setShowPreview(true)}
            className="btn-secondary"
          >
            Preview
          </button>
          <button
            onClick={handleSendNotification}
            disabled={sending}
            className="btn-primary flex items-center gap-2"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send to All Users
          </button>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary-600" />
          Recent Notifications
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.slice(0, 10).map((notif) => (
                <tr key={notif._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getTypeColor(notif.type)}`}>
                      {getTypeIcon(notif.type)}
                      {notif.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{notif.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{notif.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(notif.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs ${notif.isRead ? 'text-green-600' : 'text-amber-600'}`}>
                      {notif.isRead ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {notif.isRead ? 'Read' : 'Sent'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteNotification(notif._id)}
                      className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No notifications sent yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full"
            >
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Preview Notification</h2>
                <button onClick={() => setShowPreview(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className={`p-4 rounded-lg ${getTypeColor(formData.type)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(formData.type)}
                    <span className="font-semibold">{formData.title || 'Title Preview'}</span>
                  </div>
                  <p className="text-sm">{formData.message || 'Message preview will appear here...'}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                <button onClick={() => setShowPreview(false)} className="btn-primary">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCMSPage;