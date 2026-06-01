// // client/src/pages/user/NotificationsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Bell, CheckCheck, Eye, Trash2, Loader2, 
//   Mail, Sparkles, Users, Heart, MessageCircle, Crown,
//   Filter, Calendar, X, BookOpen, Headphones, Video
// } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import toast from 'react-hot-toast';
// import notificationAPI from '../../api/notificationAPI';
// import { Link } from 'react-router-dom';

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [selectedNotification, setSelectedNotification] = useState(null);

//   useEffect(() => {
//     fetchNotifications();
//     fetchUnreadCount();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const response = await notificationAPI.getNotifications();
//       console.log('Notifications response:', response);
//       setNotifications(response.data?.data || response.data || []);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       toast.error('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUnreadCount = async () => {
//     try {
//       const response = await notificationAPI.getUnreadCount();
//       setUnreadCount(response.data?.count || 0);
//     } catch (error) {
//       console.error('Error fetching unread count:', error);
//     }
//   };

//   const handleMarkAsRead = async (id) => {
//     try {
//       await notificationAPI.markAsRead(id);
//       setNotifications(prev => prev.map(n => 
//         n._id === id ? { ...n, isRead: true } : n
//       ));
//       setUnreadCount(prev => Math.max(0, prev - 1));
//       toast.success('Marked as read');
//     } catch (error) {
//       toast.error('Failed to mark as read');
//     }
//   };

//   const handleMarkAllAsRead = async () => {
//     try {
//       await notificationAPI.markAllAsRead();
//       setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
//       setUnreadCount(0);
//       toast.success('All notifications marked as read');
//     } catch (error) {
//       toast.error('Failed to mark all as read');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await notificationAPI.deleteNotification(id);
//       setNotifications(prev => prev.filter(n => n._id !== id));
//       if (selectedNotification?._id === id) {
//         setSelectedNotification(null);
//       }
//       toast.success('Notification deleted');
//     } catch (error) {
//       toast.error('Failed to delete');
//     }
//   };

//   const handleClearAll = async () => {
//     if (!window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
//       return;
//     }
    
//     try {
//       // Delete each notification
//       for (const notification of notifications) {
//         await notificationAPI.deleteNotification(notification._id);
//       }
//       setNotifications([]);
//       setUnreadCount(0);
//       toast.success('All notifications cleared');
//     } catch (error) {
//       toast.error('Failed to clear notifications');
//     }
//   };

//   const getIcon = (type) => {
//     const icons = {
//       system: <Bell className="h-5 w-5" />,
//       follow: <Users className="h-5 w-5" />,
//       like: <Heart className="h-5 w-5" />,
//       comment: <MessageCircle className="h-5 w-5" />,
//       subscription: <Crown className="h-5 w-5" />,
//       announcement: <Sparkles className="h-5 w-5" />,
//       mail: <Mail className="h-5 w-5" />,
//       book: <BookOpen className="h-5 w-5" />,
//       audio: <Headphones className="h-5 w-5" />,
//       video: <Video className="h-5 w-5" />
//     };
//     return icons[type] || <Bell className="h-5 w-5" />;
//   };

//   const getColor = (type) => {
//     const colors = {
//       system: 'bg-gray-100 text-gray-600',
//       follow: 'bg-blue-100 text-blue-600',
//       like: 'bg-red-100 text-red-600',
//       comment: 'bg-green-100 text-green-600',
//       subscription: 'bg-purple-100 text-purple-600',
//       announcement: 'bg-amber-100 text-amber-600',
//       book: 'bg-indigo-100 text-indigo-600',
//       audio: 'bg-pink-100 text-pink-600',
//       video: 'bg-orange-100 text-orange-600'
//     };
//     return colors[type] || 'bg-gray-100 text-gray-600';
//   };

//   const getActionUrl = (notification) => {
//     if (notification.data?.actionUrl) {
//       return notification.data.actionUrl;
//     }
//     if (notification.data?.contentType && notification.data?.contentId) {
//       return `/${notification.data.contentType}/${notification.data.contentId}`;
//     }
//     return null;
//   };

//   const filteredNotifications = filter === 'all' 
//     ? notifications 
//     : filter === 'unread' 
//       ? notifications.filter(n => !n.isRead)
//       : notifications;

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
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//             <Bell className="h-6 w-6 text-primary-600" />
//             Notifications
//           </h1>
//           <p className="text-gray-500">
//             {unreadCount > 0 
//               ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` 
//               : 'All caught up!'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {unreadCount > 0 && (
//             <button
//               onClick={handleMarkAllAsRead}
//               className="btn-secondary flex items-center gap-2"
//             >
//               <CheckCheck className="h-4 w-4" />
//               Mark all as read
//             </button>
//           )}
//           {notifications.length > 0 && (
//             <button
//               onClick={handleClearAll}
//               className="btn-outline flex items-center gap-2 text-red-600 hover:bg-red-50"
//             >
//               <Trash2 className="h-4 w-4" />
//               Clear all
//             </button>
//           )}
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="input-field pl-9 w-32"
//             >
//               <option value="all">All</option>
//               <option value="unread">Unread</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       {notifications.length > 0 && (
//         <div className="grid grid-cols-3 gap-4">
//           <div className="card p-3 text-center">
//             <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
//             <p className="text-xs text-gray-500">Total</p>
//           </div>
//           <div className="card p-3 text-center">
//             <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
//             <p className="text-xs text-gray-500">Unread</p>
//           </div>
//           <div className="card p-3 text-center">
//             <p className="text-2xl font-bold text-green-600">{notifications.length - unreadCount}</p>
//             <p className="text-xs text-gray-500">Read</p>
//           </div>
//         </div>
//       )}

//       {/* Notifications List */}
//       {filteredNotifications.length === 0 ? (
//         <div className="card p-12 text-center">
//           <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//           <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
//           <p className="text-gray-500">When you receive notifications, they will appear here.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           <AnimatePresence>
//             {filteredNotifications.map((notification, index) => (
//               <motion.div
//                 key={notification._id || index}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ delay: index * 0.05 }}
//                 className={`card p-4 transition-all cursor-pointer hover:shadow-md ${
//                   !notification.isRead ? 'bg-primary-50/30 border-primary-200' : ''
//                 }`}
//                 onClick={() => setSelectedNotification(
//                   selectedNotification?._id === notification._id ? null : notification
//                 )}
//               >
//                 <div className="flex items-start gap-4">
//                   {/* Icon */}
//                   <div className={`p-2 rounded-lg ${getColor(notification.type)}`}>
//                     {getIcon(notification.type)}
//                   </div>
                  
//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-2">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h4 className="font-semibold text-gray-900">{notification.title}</h4>
//                           {!notification.isRead && (
//                             <span className="inline-flex h-2 w-2 bg-blue-500 rounded-full"></span>
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                         <div className="flex items-center gap-3 mt-2">
//                           <p className="text-xs text-gray-400">
//                             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                           </p>
//                           {notification.data?.priority === 'high' && (
//                             <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
//                               High Priority
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {!notification.isRead && (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleMarkAsRead(notification._id);
//                             }}
//                             className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
//                             title="Mark as read"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </button>
//                         )}
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(notification._id);
//                           }}
//                           className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 <AnimatePresence>
//                   {selectedNotification?._id === notification._id && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="mt-4 pt-4 border-t border-gray-100"
//                     >
//                       <div className="space-y-2">
//                         {notification.data?.sender && (
//                           <div className="flex items-center gap-2 text-sm">
//                             <Users className="h-4 w-4 text-gray-400" />
//                             <span className="text-gray-600">From: {notification.data.sender}</span>
//                           </div>
//                         )}
//                         {getActionUrl(notification) && (
//                           <Link
//                             to={getActionUrl(notification)}
//                             className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             View Details →
//                           </Link>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationsPage;














// client/src/pages/user/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, CheckCheck, Eye, Trash2, Loader2, 
  Mail, Sparkles, Users, Heart, MessageCircle, Crown,
  Filter, Calendar, X, BookOpen, Headphones, Video,
  User, Image, Link as LinkIcon
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import notificationAPI from '../../api/notificationAPI';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationAPI.getNotifications();
      console.log('Notifications response:', response);
      // Handle different response structures
      let notificationsData = [];
      if (response.data?.data) {
        notificationsData = response.data.data;
      } else if (response.data) {
        notificationsData = response.data;
      } else if (Array.isArray(response)) {
        notificationsData = response;
      }
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationAPI.getUnreadCount();
      setUnreadCount(response.data?.count || 0);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(prev => prev.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      if (selectedNotification?._id === id) {
        setSelectedNotification(null);
      }
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      return;
    }
    
    try {
      for (const notification of notifications) {
        await notificationAPI.deleteNotification(notification._id);
      }
      setNotifications([]);
      setUnreadCount(0);
      toast.success('All notifications cleared');
    } catch (error) {
      toast.error('Failed to clear notifications');
    }
  };

  const getIcon = (type) => {
    const icons = {
      system: <Bell className="h-5 w-5" />,
      follow: <Users className="h-5 w-5" />,
      like: <Heart className="h-5 w-5" />,
      comment: <MessageCircle className="h-5 w-5" />,
      subscription: <Crown className="h-5 w-5" />,
      announcement: <Sparkles className="h-5 w-5" />,
      mail: <Mail className="h-5 w-5" />,
      book: <BookOpen className="h-5 w-5" />,
      audio: <Headphones className="h-5 w-5" />,
      video: <Video className="h-5 w-5" />
    };
    return icons[type] || <Bell className="h-5 w-5" />;
  };

  const getColor = (type) => {
    const colors = {
      system: 'bg-gray-100 text-gray-600',
      follow: 'bg-blue-100 text-blue-600',
      like: 'bg-red-100 text-red-600',
      comment: 'bg-green-100 text-green-600',
      subscription: 'bg-purple-100 text-purple-600',
      announcement: 'bg-amber-100 text-amber-600',
      book: 'bg-indigo-100 text-indigo-600',
      audio: 'bg-pink-100 text-pink-600',
      video: 'bg-orange-100 text-orange-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const getActionUrl = (notification) => {
    if (notification.data?.actionUrl) {
      return notification.data.actionUrl;
    }
    if (notification.data?.contentType && notification.data?.contentId) {
      return `/${notification.data.contentType}/${notification.data.contentId}`;
    }
    return null;
  };

  // Helper to get sender name safely
  const getSenderName = (sender) => {
    if (!sender) return null;
    if (typeof sender === 'string') return sender;
    if (typeof sender === 'object') return sender.name || 'Someone';
    return null;
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.isRead)
      : notifications;

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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary-600" />
            Notifications
          </h1>
          <p className="text-gray-500">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` 
              : 'All caught up!'}
          </p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="btn-secondary flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn-outline flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          )}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field pl-9 w-32"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      {notifications.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            <p className="text-xs text-gray-500">Unread</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{notifications.length - unreadCount}</p>
            <p className="text-xs text-gray-500">Read</p>
          </div>
        </div>
      )}

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="card p-12 text-center">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
          <p className="text-gray-500">When you receive notifications, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => {
              const senderName = getSenderName(notification.data?.sender);
              const actionUrl = getActionUrl(notification);
              
              return (
                <motion.div
                  key={notification._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card p-4 transition-all cursor-pointer hover:shadow-md ${
                    !notification.isRead ? 'bg-primary-50/30 border-primary-200' : ''
                  }`}
                  onClick={() => setSelectedNotification(
                    selectedNotification?._id === notification._id ? null : notification
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${getColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.isRead && (
                              <span className="inline-flex h-2 w-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <p className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </p>
                            {senderName && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                <span>{senderName}</span>
                              </div>
                            )}
                            {notification.data?.priority === 'high' && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                High Priority
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification._id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition-colors"
                              title="Mark as read"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedNotification?._id === notification._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="space-y-2">
                          {notification.data?.imageUrl && (
                            <div className="flex items-center gap-2 text-sm">
                              <Image className="h-4 w-4 text-gray-400" />
                              <img 
                                src={notification.data.imageUrl} 
                                alt="Notification"
                                className="h-20 w-auto rounded object-cover"
                              />
                            </div>
                          )}
                          {actionUrl && (
                            <Link
                              to={actionUrl}
                              className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Details →
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;