// // client/src/pages/admin/SubscribersListPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import {
//   Users, Search, Filter, Download, Calendar, CheckCircle,
//   XCircle, Clock, Eye, MoreVertical, Mail, Phone,
//   Loader2, CreditCard, DollarSign, UserCheck, UserX
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';

// const SubscribersListPage = () => {
//   const { token } = useSelector((state) => state.auth);
  
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [planFilter, setPlanFilter] = useState('all');
//   const [selectedSubscriber, setSelectedSubscriber] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     active: 0,
//     expired: 0,
//     cancelled: 0
//   });

//   useEffect(() => {
//     fetchSubscribers();
//   }, []);

//   const fetchSubscribers = async () => {
//     setLoading(true);
//     try {
//       // You'll need to add this endpoint to your backend
//       const response = await subscriptionAPI.getAllSubscribers();
//       const subscribersData = response.data || response;
//       setSubscribers(subscribersData);
      
//       // Calculate stats
//       const total = subscribersData.length;
//       const active = subscribersData.filter(s => s.status === 'active').length;
//       const expired = subscribersData.filter(s => s.status === 'expired').length;
//       const cancelled = subscribersData.filter(s => s.status === 'cancelled').length;
      
//       setStats({ total, active, expired, cancelled });
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       toast.error(error.response?.data?.message || 'Error fetching subscribers');
//       // Mock data for demonstration
//       setSubscribers(mockSubscribers);
//       setStats({
//         total: mockSubscribers.length,
//         active: mockSubscribers.filter(s => s.status === 'active').length,
//         expired: mockSubscribers.filter(s => s.status === 'expired').length,
//         cancelled: mockSubscribers.filter(s => s.status === 'cancelled').length
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredSubscribers = subscribers.filter(subscriber => {
//     const matchesSearch = subscriber.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          subscriber.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
//     const matchesPlan = planFilter === 'all' || subscriber.plan === planFilter;
//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
//       expired: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Expired' },
//       cancelled: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Cancelled' },
//       pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' }
//     };
//     const badge = badges[status] || badges.pending;
//     const Icon = badge.icon;
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
//         <Icon className="h-3 w-3" />
//         {badge.text}
//       </span>
//     );
//   };

//   const exportToCSV = () => {
//     const headers = ['Name', 'Email', 'Plan', 'Status', 'Start Date', 'Expiry Date', 'Amount', 'Billing Cycle'];
//     const csvData = filteredSubscribers.map(sub => [
//       sub.user?.name || 'N/A',
//       sub.user?.email || 'N/A',
//       sub.plan,
//       sub.status,
//       formatDate(sub.startDate),
//       formatDate(sub.expiresAt),
//       `${sub.price?.currency || 'INR'} ${sub.price?.amount || 0}`,
//       sub.billingCycle
//     ]);
    
//     const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success('Export started');
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
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscribers Management</h1>
//           <p className="text-gray-500">View and manage all subscription users</p>
//         </div>
//         <button
//           onClick={exportToCSV}
//           className="btn-secondary inline-flex items-center space-x-2"
//         >
//           <Download className="h-5 w-5" />
//           <span>Export CSV</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <Users className="h-5 w-5 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
//           </div>
//           <p className="text-sm text-gray-500">Total Subscribers</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <UserCheck className="h-5 w-5 text-green-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.active}</span>
//           </div>
//           <p className="text-sm text-gray-500">Active Subscriptions</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <UserX className="h-5 w-5 text-red-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.expired}</span>
//           </div>
//           <p className="text-sm text-gray-500">Expired</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <XCircle className="h-5 w-5 text-gray-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.cancelled}</span>
//           </div>
//           <p className="text-sm text-gray-500">Cancelled</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="card p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="input-field pl-10"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="input-field w-full md:w-48"
//           >
//             <option value="all">All Status</option>
//             <option value="active">Active</option>
//             <option value="expired">Expired</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="pending">Pending</option>
//           </select>
//           <select
//             value={planFilter}
//             onChange={(e) => setPlanFilter(e.target.value)}
//             className="input-field w-full md:w-48"
//           >
//             <option value="all">All Plans</option>
//             <option value="free">Free</option>
//             <option value="basic">Basic</option>
//             <option value="premium">Premium</option>
//             <option value="pro">Pro</option>
//           </select>
//         </div>
//       </div>

//       {/* Subscribers Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredSubscribers.map((subscriber) => (
//                 <motion.tr
//                   key={subscriber._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="flex-shrink-0">
//                         <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                           <span className="text-primary-600 font-medium">
//                             {subscriber.user?.name?.charAt(0) || 'U'}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{subscriber.user?.name || 'N/A'}</p>
//                         <p className="text-sm text-gray-500">{subscriber.user?.email || 'N/A'}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 capitalize">
//                       {subscriber.plan}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getStatusBadge(subscriber.status)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {formatDate(subscriber.startDate || subscriber.createdAt)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {subscriber.expiresAt ? formatDate(subscriber.expiresAt) : 'Never'}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     {subscriber.price?.currency} {subscriber.price?.amount}
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => {
//                         setSelectedSubscriber(subscriber);
//                         setShowDetailsModal(true);
//                       }}
//                       className="p-1.5 rounded-lg hover:bg-gray-100 text-primary-600"
//                       title="View Details"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredSubscribers.length === 0 && (
//           <div className="text-center py-12">
//             <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500">No subscribers found</p>
//           </div>
//         )}
//       </div>

//       {/* Subscriber Details Modal */}
//       {showDetailsModal && selectedSubscriber && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//           >
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">Subscriber Details</h2>
//               <button
//                 onClick={() => setShowDetailsModal(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <XCircle className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               {/* User Info */}
//               <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
//                 <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
//                   <span className="text-primary-600 text-xl font-medium">
//                     {selectedSubscriber.user?.name?.charAt(0) || 'U'}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{selectedSubscriber.user?.name || 'N/A'}</h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                     <Mail className="h-4 w-4" />
//                     <span>{selectedSubscriber.user?.email || 'N/A'}</span>
//                   </div>
//                   {selectedSubscriber.user?.phone && (
//                     <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                       <Phone className="h-4 w-4" />
//                       <span>{selectedSubscriber.user.phone}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Subscription Details */}
//               <div className="space-y-3">
//                 <h4 className="font-medium text-gray-900">Subscription Information</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Plan</p>
//                     <p className="text-sm font-medium text-gray-900 capitalize">{selectedSubscriber.plan}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Status</p>
//                     {getStatusBadge(selectedSubscriber.status)}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Billing Cycle</p>
//                     <p className="text-sm font-medium text-gray-900 capitalize">{selectedSubscriber.billingCycle}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Amount</p>
//                     <p className="text-sm font-medium text-gray-900">{selectedSubscriber.price?.currency} {selectedSubscriber.price?.amount}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Start Date</p>
//                     <p className="text-sm text-gray-900">{formatDate(selectedSubscriber.startDate || selectedSubscriber.createdAt)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Expiry Date</p>
//                     <p className="text-sm text-gray-900">{selectedSubscriber.expiresAt ? formatDate(selectedSubscriber.expiresAt) : 'Never'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               {selectedSubscriber.features && selectedSubscriber.features.length > 0 && (
//                 <div className="space-y-2">
//                   <h4 className="font-medium text-gray-900">Accessible Features</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSubscriber.features.map((feature, index) => (
//                       <span key={index} className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Mock data for demonstration
// const mockSubscribers = [
//   {
//     _id: '1',
//     user: { name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210' },
//     plan: 'premium',
//     status: 'active',
//     startDate: '2024-01-01',
//     expiresAt: '2024-12-31',
//     price: { amount: 199, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: ['All Basic features', 'Unlimited downloads', 'HD audio streaming']
//   },
//   {
//     _id: '2',
//     user: { name: 'Jane Smith', email: 'jane@example.com' },
//     plan: 'basic',
//     status: 'active',
//     startDate: '2024-02-15',
//     expiresAt: '2024-05-15',
//     price: { amount: 99, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: ['All free features', 'Unlimited poem reading', 'Download 5 ebooks/month']
//   },
//   {
//     _id: '3',
//     user: { name: 'Mike Johnson', email: 'mike@example.com' },
//     plan: 'pro',
//     status: 'expired',
//     startDate: '2023-06-01',
//     expiresAt: '2024-06-01',
//     price: { amount: 499, currency: 'INR' },
//     billingCycle: 'yearly',
//     features: ['All Premium features', 'Creator tools', 'Priority support']
//   }
// ];

// export default SubscribersListPage;



















// client/src/pages/admin/SubscribersListPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Users, Search, Filter, Download, Calendar, CheckCircle,
  XCircle, Clock, Eye, MoreVertical, Mail, Phone,
  Loader2, CreditCard, DollarSign, UserCheck, UserX
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const SubscribersListPage = () => {
  const { token } = useSelector((state) => state.auth);
  
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.getAllSubscribers();
      
      // Handle different response structures
      let subscribersData = [];
      if (response && response.subscribers) {
        subscribersData = response.subscribers;
      } else if (response && response.data) {
        subscribersData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        subscribersData = response;
      } else if (response && typeof response === 'object') {
        subscribersData = response.subscribers || response.data || [];
      }
      
      // Ensure subscribersData is an array
      const subscribersArray = Array.isArray(subscribersData) ? subscribersData : [];
      setSubscribers(subscribersArray);
      
      // Calculate stats
      const total = subscribersArray.length;
      const active = subscribersArray.filter(s => s.status === 'active').length;
      const expired = subscribersArray.filter(s => s.status === 'expired').length;
      const cancelled = subscribersArray.filter(s => s.status === 'cancelled').length;
      
      setStats({ total, active, expired, cancelled });
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error(error.response?.data?.message || 'Error fetching subscribers');
      setSubscribers([]);
      setStats({ total: 0, active: 0, expired: 0, cancelled: 0 });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    const matchesPlan = planFilter === 'all' || subscriber.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
      expired: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Expired' },
      cancelled: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Cancelled' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.text}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Plan', 'Status', 'Start Date', 'Expiry Date', 'Amount', 'Billing Cycle'];
    const csvData = filteredSubscribers.map(sub => [
      sub.user?.name || 'N/A',
      sub.user?.email || 'N/A',
      sub.plan,
      sub.status,
      formatDate(sub.startDate || sub.createdAt),
      formatDate(sub.expiresAt),
      `${sub.price?.currency || 'INR'} ${sub.price?.amount || 0}`,
      sub.billingCycle
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Export started');
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscribers Management</h1>
          <p className="text-gray-500">View and manage all subscription users</p>
        </div>
        <button
          onClick={exportToCSV}
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <p className="text-sm text-gray-500">Total Subscribers</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.active}</span>
          </div>
          <p className="text-sm text-gray-500">Active Subscriptions</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <UserX className="h-5 w-5 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.expired}</span>
          </div>
          <p className="text-sm text-gray-500">Expired</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="h-5 w-5 text-gray-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.cancelled}</span>
          </div>
          <p className="text-sm text-gray-500">Cancelled</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-full md:w-48"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="input-field w-full md:w-48"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="pro">Pro</option>
          </select>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <motion.tr
                  key={subscriber._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {subscriber.user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{subscriber.user?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{subscriber.user?.email || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 capitalize">
                      {subscriber.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(subscriber.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(subscriber.startDate || subscriber.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {subscriber.expiresAt ? formatDate(subscriber.expiresAt) : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {subscriber.price?.currency || 'INR'} {subscriber.price?.amount || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedSubscriber(subscriber);
                        setShowDetailsModal(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-primary-600"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSubscribers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No subscribers found</p>
          </div>
        )}
      </div>

      {/* Subscriber Details Modal */}
      {showDetailsModal && selectedSubscriber && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Subscriber Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 text-xl font-medium">
                    {selectedSubscriber.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedSubscriber.user?.name || 'N/A'}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Mail className="h-4 w-4" />
                    <span>{selectedSubscriber.user?.email || 'N/A'}</span>
                  </div>
                  {selectedSubscriber.user?.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Phone className="h-4 w-4" />
                      <span>{selectedSubscriber.user.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Subscription Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedSubscriber.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    {getStatusBadge(selectedSubscriber.status)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Billing Cycle</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedSubscriber.billingCycle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSubscriber.price?.currency || 'INR'} {selectedSubscriber.price?.amount || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-sm text-gray-900">{formatDate(selectedSubscriber.startDate || selectedSubscriber.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="text-sm text-gray-900">{selectedSubscriber.expiresAt ? formatDate(selectedSubscriber.expiresAt) : 'Never'}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {selectedSubscriber.features && selectedSubscriber.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Accessible Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubscriber.features.map((feature, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubscribersListPage;