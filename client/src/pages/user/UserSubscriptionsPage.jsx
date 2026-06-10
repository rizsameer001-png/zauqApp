// // client/src/pages/user/UserSubscriptionsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';
// import { Link } from 'react-router-dom';

// const UserSubscriptionsPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserSubscriptions();
//   }, []);

//   const fetchUserSubscriptions = async () => {
//     setLoading(true);
//     try {
//       const [current, history] = await Promise.all([
//         subscriptionAPI.getCurrent(),
//         subscriptionAPI.getBillingHistory()
//       ]);
      
//       setCurrentSubscription(current.data || current);
//       setSubscriptions(history.data || history);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       toast.error('Failed to load subscription data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelSubscription = async () => {
//     if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    
//     try {
//       await subscriptionAPI.cancel();
//       toast.success('Subscription cancelled successfully');
//       fetchUserSubscriptions();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to cancel subscription');
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
//       cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Cancelled' },
//       expired: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Expired' },
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

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
//         <p className="text-gray-500">Manage your subscription and billing information</p>
//       </div>

//       {/* Current Subscription */}
//       {currentSubscription?.plan && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="card p-6"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <h3 className="text-2xl font-bold text-primary-600 capitalize">
//                   {currentSubscription.plan?.plan || currentSubscription.plan}
//                 </h3>
//                 {getStatusBadge(currentSubscription.status || 'active')}
//               </div>
//               <p className="text-gray-600 mb-2">
//                 {currentSubscription.plan?.description || 'Access to premium content and features'}
//               </p>
//               <div className="flex items-center gap-4 text-sm text-gray-500">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   <span>Started: {formatDate(currentSubscription.startedAt || currentSubscription.startDate)}</span>
//                 </div>
//                 {currentSubscription.expiresAt && (
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <span>Expires: {formatDate(currentSubscription.expiresAt)}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Link to="/subscription" className="btn-secondary">
//                 Upgrade Plan
//               </Link>
//               {currentSubscription.status === 'active' && (
//                 <button onClick={handleCancelSubscription} className="btn-danger">
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Features */}
//       {currentSubscription?.features && currentSubscription.features.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 20 }}
//           className="card p-6"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Included Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {currentSubscription.features.map((feature, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <CheckCircle className="h-4 w-4 text-green-500" />
//                 <span className="text-gray-700">{feature}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Billing History */}
//       {subscriptions.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 40 }}
//           className="card overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 p-6 pb-0">Billing History</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {subscriptions.map((sub) => (
//                   <tr key={sub._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sub.createdAt)}</td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{sub.plan}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {sub.price?.currency} {sub.price?.amount}
//                     </td>
//                     <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
//                     <td className="px-6 py-4">
//                       {sub.paymentId && (
//                         <button className="text-primary-600 hover:text-primary-700 text-sm">
//                           Download
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {!currentSubscription?.plan && subscriptions.length === 0 && (
//         <div className="text-center py-12">
//           <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
//           <p className="text-gray-500 mb-4">Choose a plan to unlock premium content and features.</p>
//           <Link to="/subscription" className="btn-primary">
//             View Plans
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSubscriptionsPage;












// // client/src/pages/user/UserSubscriptionsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2, 
//   Download, AlertCircle, ArrowRight, Star, Zap, Shield, 
//   BookOpen, Headphones, Video, FileText, Crown, Sparkles,
//   RefreshCw, ChevronRight, Package, Layers, Award
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';
// import { Link } from 'react-router-dom';

// const UserSubscriptionsPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cancelling, setCancelling] = useState(false);
//   const [downloadingInvoice, setDownloadingInvoice] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchUserSubscriptions();
//   }, []);

//   const fetchUserSubscriptions = async () => {
//     setLoading(true);
//     try {
//       const [current, history] = await Promise.all([
//         subscriptionAPI.getCurrent(),
//         subscriptionAPI.getBillingHistory()
//       ]);
      
//       setCurrentSubscription(current.data || current);
//       setSubscriptions(history.data || history || []);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       toast.error('Failed to load subscription data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await fetchUserSubscriptions();
//       toast.success('Subscription data refreshed');
//     } catch (error) {
//       toast.error('Failed to refresh data');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handleCancelSubscription = async () => {
//     if (!window.confirm('Are you sure you want to cancel your subscription?\n\nYou will lose access to premium features at the end of your billing period.')) return;
    
//     setCancelling(true);
//     try {
//       await subscriptionAPI.cancel();
//       toast.success('Subscription cancelled successfully. You will have access until the end of your billing period.');
//       await fetchUserSubscriptions();
//     } catch (error) {
//       console.error('Error cancelling subscription:', error);
//       toast.error(error.response?.data?.message || 'Failed to cancel subscription');
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const handleDownloadInvoice = async (subscriptionId) => {
//     setDownloadingInvoice(subscriptionId);
//     try {
//       const blob = await subscriptionAPI.downloadInvoice(subscriptionId);
      
//       // Create download link
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${subscriptionId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
      
//       toast.success('Invoice downloaded successfully');
//     } catch (error) {
//       console.error('Error downloading invoice:', error);
//       toast.error(error.response?.data?.message || 'Failed to download invoice');
//     } finally {
//       setDownloadingInvoice(null);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     if (!amount && amount !== 0) return 'Free';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Helper function to safely get plan name (handles both string and object)
//   const getPlanName = (plan) => {
//     if (!plan) return 'free';
//     if (typeof plan === 'string') return plan.toLowerCase();
//     if (typeof plan === 'object') return plan.planId || plan.name || 'free';
//     return 'free';
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
//       cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Cancelled' },
//       expired: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Expired' },
//       pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
//       trial: { color: 'bg-blue-100 text-blue-700', icon: Sparkles, text: 'Trial' }
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

//   const getPlanIcon = (plan) => {
//     const planName = getPlanName(plan);
//     const icons = {
//       free: <Star className="h-5 w-5 text-gray-500" />,
//       basic: <BookOpen className="h-5 w-5 text-blue-500" />,
//       premium: <Crown className="h-5 w-5 text-yellow-500" />,
//       pro: <Zap className="h-5 w-5 text-purple-500" />
//     };
//     return icons[planName] || <Package className="h-5 w-5 text-gray-500" />;
//   };

//   const getPlanColor = (plan) => {
//     const planName = getPlanName(plan);
//     const colors = {
//       free: 'from-gray-400 to-gray-500',
//       basic: 'from-blue-500 to-blue-600',
//       premium: 'from-yellow-500 to-orange-500',
//       pro: 'from-purple-500 to-pink-500'
//     };
//     return colors[planName] || 'from-gray-400 to-gray-500';
//   };

//   const calculateDaysRemaining = (expiresAt) => {
//     if (!expiresAt) return null;
//     const diff = new Date(expiresAt) - new Date();
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//     return days > 0 ? days : 0;
//   };

//   const daysRemaining = currentSubscription?.expiresAt ? calculateDaysRemaining(currentSubscription.expiresAt) : null;
//   const planName = getPlanName(currentSubscription?.plan);

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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
//           <p className="text-gray-500">Manage your subscription and billing information</p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>

//       {/* Current Subscription */}
//       {currentSubscription?.plan && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="card overflow-hidden"
//         >
//           <div className={`bg-gradient-to-r ${getPlanColor(currentSubscription.plan)} p-6 text-white`}>
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   {getPlanIcon(currentSubscription.plan)}
//                   <span className="text-sm font-medium opacity-90 uppercase">Current Plan</span>
//                 </div>
//                 <h2 className="text-3xl font-bold capitalize">
//                   {planName}
//                 </h2>
//                 {currentSubscription.price?.amount > 0 && (
//                   <p className="text-lg opacity-90 mt-1">
//                     {formatCurrency(currentSubscription.price.amount, currentSubscription.price.currency)} / {currentSubscription.billingCycle || 'month'}
//                   </p>
//                 )}
//               </div>
//               <div className="flex flex-col items-end gap-2">
//                 {getStatusBadge(currentSubscription.status || 'active')}
//                 {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
//                   <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                     {daysRemaining} days remaining
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div className="space-y-2">
//                 <p className="text-gray-600">
//                   {planName === 'free' 
//                     ? 'Access to free content and basic features' 
//                     : currentSubscription.description || 'Access to premium content and features'}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>Started: {formatDate(currentSubscription.startedAt || currentSubscription.createdAt)}</span>
//                   </div>
//                   {currentSubscription.expiresAt && currentSubscription.status === 'active' && (
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" />
//                       <span>Renews on: {formatDate(currentSubscription.expiresAt)}</span>
//                     </div>
//                   )}
//                   {currentSubscription.cancelledAt && (
//                     <div className="flex items-center gap-1 text-red-500">
//                       <XCircle className="h-4 w-4" />
//                       <span>Cancelled on: {formatDate(currentSubscription.cancelledAt)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 {planName !== 'free' && currentSubscription.status === 'active' && (
//                   <>
//                     <Link to="/subscription" className="btn-secondary flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4" />
//                       Upgrade
//                     </Link>
//                     <button 
//                       onClick={handleCancelSubscription} 
//                       disabled={cancelling}
//                       className="btn-danger flex items-center gap-2"
//                     >
//                       {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
//                       Cancel
//                     </button>
//                   </>
//                 )}
//                 {planName === 'free' && (
//                   <Link to="/subscription" className="btn-primary flex items-center gap-2">
//                     Upgrade Now
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Features Section */}
//             {currentSubscription.features && currentSubscription.features.length > 0 && (
//               <div className="border-t border-gray-200 pt-4">
//                 <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 text-green-500" />
//                   Included Features
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {currentSubscription.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                       <CheckCircle className="h-3 w-3 text-green-500" />
//                       <span>{typeof feature === 'string' ? feature : feature.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}

//       {/* Usage Statistics (Optional) */}
//       {currentSubscription?.usage && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 20 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4"
//         >
//           <div className="card p-4">
//             <div className="flex items-center gap-3">
//               <BookOpen className="h-8 w-8 text-primary-600" />
//               <div>
//                 <p className="text-sm text-gray-500">Books Read</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {currentSubscription.usage.booksRead || 0}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="card p-4">
//             <div className="flex items-center gap-3">
//               <Headphones className="h-8 w-8 text-primary-600" />
//               <div>
//                 <p className="text-sm text-gray-500">Audio Hours</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {currentSubscription.usage.audioHours || 0}h
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="card p-4">
//             <div className="flex items-center gap-3">
//               <Download className="h-8 w-8 text-primary-600" />
//               <div>
//                 <p className="text-sm text-gray-500">Downloads</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {currentSubscription.usage.downloads || 0}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Billing History */}
//       {subscriptions.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 40 }}
//           className="card overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3 flex items-center gap-2">
//             <Layers className="h-5 w-5 text-primary-600" />
//             Billing History
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {subscriptions.map((sub, index) => (
//                     <motion.tr 
//                       key={sub._id} 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sub.createdAt)}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {getPlanIcon(sub.plan)}
//                           <span className="text-sm font-medium text-gray-900 capitalize">{getPlanName(sub.plan)}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         {formatCurrency(sub.price?.amount || sub.amount, sub.price?.currency || 'INR')}
//                       </td>
//                       <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
//                       <td className="px-6 py-4">
//                         {sub.paymentId && (
//                           <button
//                             onClick={() => handleDownloadInvoice(sub._id)}
//                             disabled={downloadingInvoice === sub._id}
//                             className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 text-sm disabled:opacity-50"
//                           >
//                             {downloadingInvoice === sub._id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Download className="h-4 w-4" />
//                             )}
//                             PDF
//                           </button>
//                         )}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* No Subscription State */}
//       {!currentSubscription?.plan && subscriptions.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center py-12"
//         >
//           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CreditCard className="h-10 w-10 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
//           <p className="text-gray-500 mb-6 max-w-md mx-auto">
//             Choose a plan to unlock premium content, download books, and access exclusive features.
//           </p>
//           <Link to="/subscription" className="btn-primary inline-flex items-center gap-2">
//             View Plans
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </motion.div>
//       )}

//       {/* Upgrade Benefits Section */}
//       {planName === 'free' && !currentSubscription?.plan?.planId && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 60 }}
//           className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
//         >
//           <div className="flex items-start gap-4">
//             <Award className="h-10 w-10 text-purple-600 flex-shrink-0" />
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-1">Upgrade to Premium</h3>
//               <p className="text-sm text-gray-600 mb-3">
//                 Get unlimited access to all books, audio content, and exclusive features.
//               </p>
//               <Link to="/subscription" className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1 text-sm">
//                 See Plans
//                 <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UserSubscriptionsPage;

















// // client/src/pages/user/UserSubscriptionsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2, 
//   Download, AlertCircle, ArrowRight, Star, Zap, Shield, 
//   BookOpen, Headphones, Video, FileText, Crown, Sparkles,
//   RefreshCw, ChevronRight, Package, Layers, Award, Bell,
//   TrendingUp, Gift, Rocket, Users, MessageCircle, Heart
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';
// import { Link } from 'react-router-dom';

// const UserSubscriptionsPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cancelling, setCancelling] = useState(false);
//   const [downloadingInvoice, setDownloadingInvoice] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [showUpgradeReminder, setShowUpgradeReminder] = useState(true);

//   useEffect(() => {
//     fetchUserSubscriptions();
//   }, []);

//   const fetchUserSubscriptions = async () => {
//     setLoading(true);
//     try {
//       const [current, history] = await Promise.all([
//         subscriptionAPI.getCurrent(),
//         subscriptionAPI.getBillingHistory()
//       ]);
      
//       const currentData = current.data || current;
//       const historyData = history.data || history || [];
      
//       setCurrentSubscription(currentData);
//       setSubscriptions(historyData);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       toast.error('Failed to load subscription data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await fetchUserSubscriptions();
//       toast.success('Subscription data refreshed');
//     } catch (error) {
//       toast.error('Failed to refresh data');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handleCancelSubscription = async () => {
//     if (!window.confirm('Are you sure you want to cancel your subscription?\n\nYou will lose access to premium features at the end of your billing period.')) return;
    
//     setCancelling(true);
//     try {
//       await subscriptionAPI.cancelSubscription();
//       toast.success('Subscription cancelled successfully. You will have access until the end of your billing period.');
//       await fetchUserSubscriptions();
//     } catch (error) {
//       console.error('Error cancelling subscription:', error);
//       toast.error(error.response?.data?.message || 'Failed to cancel subscription');
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const handleDownloadInvoice = async (subscriptionId) => {
//     setDownloadingInvoice(subscriptionId);
//     try {
//       await subscriptionAPI.downloadInvoice(subscriptionId);
//       toast.success('Invoice downloaded successfully');
//     } catch (error) {
//       console.error('Error downloading invoice:', error);
//       toast.error(error.response?.data?.message || 'Failed to download invoice');
//     } finally {
//       setDownloadingInvoice(null);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     if (!amount && amount !== 0) return 'Free';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   const getPlanName = (plan) => {
//     if (!plan) return 'free';
//     if (typeof plan === 'string') return plan.toLowerCase();
//     if (typeof plan === 'object') return plan.planId || plan.name || 'free';
//     return 'free';
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle, text: 'Active' },
//       cancelled: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle, text: 'Cancelled' },
//       expired: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: Clock, text: 'Expired' },
//       pending: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock, text: 'Pending' },
//       trial: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Sparkles, text: 'Trial' }
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

//   const getPlanIcon = (plan) => {
//     const planName = getPlanName(plan);
//     const icons = {
//       free: <Star className="h-5 w-5 text-gray-500" />,
//       basic: <BookOpen className="h-5 w-5 text-blue-500" />,
//       premium: <Crown className="h-5 w-5 text-yellow-500" />,
//       pro: <Zap className="h-5 w-5 text-purple-500" />
//     };
//     return icons[planName] || <Package className="h-5 w-5 text-gray-500" />;
//   };

//   const getPlanColor = (plan) => {
//     const planName = getPlanName(plan);
//     const colors = {
//       free: 'from-gray-400 to-gray-500',
//       basic: 'from-blue-500 to-blue-600',
//       premium: 'from-yellow-500 to-orange-500',
//       pro: 'from-purple-500 to-pink-500'
//     };
//     return colors[planName] || 'from-gray-400 to-gray-500';
//   };

//   const calculateDaysRemaining = (expiresAt) => {
//     if (!expiresAt) return null;
//     const diff = new Date(expiresAt) - new Date();
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//     return days > 0 ? days : 0;
//   };

//   const isExpiringSoon = (expiresAt) => {
//     const days = calculateDaysRemaining(expiresAt);
//     return days !== null && days > 0 && days <= 7;
//   };

//   const isExpired = (expiresAt) => {
//     if (!expiresAt) return false;
//     return new Date(expiresAt) < new Date();
//   };

//   const daysRemaining = currentSubscription?.expiresAt ? calculateDaysRemaining(currentSubscription.expiresAt) : null;
//   const planName = getPlanName(currentSubscription?.plan);
//   const isActive = currentSubscription?.status === 'active';
//   const expiringSoon = isExpiringSoon(currentSubscription?.expiresAt);
//   const expired = isExpired(currentSubscription?.expiresAt);

//   // Premium features list for upgrade section
//   const premiumFeatures = [
//     { icon: BookOpen, title: 'Unlimited Books', desc: 'Access thousands of books and poems' },
//     { icon: Headphones, title: 'HD Audio', desc: 'High-quality audio streaming' },
//     { icon: Download, title: 'Offline Access', desc: 'Download content for offline reading' },
//     { icon: Video, title: 'Video Content', desc: 'Exclusive video lectures and talks' },
//     { icon: Sparkles, title: 'AI Analysis', desc: 'AI-powered literary analysis' },
//     { icon: Shield, title: 'Ad-Free', desc: 'No advertisements' },
//     { icon: TrendingUp, title: 'Analytics', desc: 'Personal reading insights' },
//     { icon: Users, title: 'Community', desc: 'Join exclusive discussions' }
//   ];

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
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Subscriptions</h1>
//           <p className="text-gray-500 dark:text-gray-400">Manage your subscription and billing information</p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//         >
//           <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>

//       {/* Expiry Warning Banner */}
//       {expiringSoon && isActive && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
//         >
//           <div className="flex items-center gap-3">
//             <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
//             <div>
//               <p className="font-medium text-yellow-800 dark:text-yellow-400">
//                 ⚠️ Your subscription expires in {daysRemaining} days!
//               </p>
//               <p className="text-sm text-yellow-700 dark:text-yellow-500">
//                 Renew now to continue enjoying premium features without interruption.
//               </p>
//             </div>
//           </div>
//           <Link to="/subscription" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium">
//             Renew Now
//           </Link>
//         </motion.div>
//       )}

//       {/* Expired Warning Banner */}
//       {expired && !isActive && planName !== 'free' && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
//         >
//           <div className="flex items-center gap-3">
//             <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
//             <div>
//               <p className="font-medium text-red-800 dark:text-red-400">
//                 ❌ Your subscription has expired!
//               </p>
//               <p className="text-sm text-red-700 dark:text-red-500">
//                 You have lost access to premium features. Upgrade now to regain access.
//               </p>
//             </div>
//           </div>
//           <Link to="/subscription" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
//             Upgrade Now
//           </Link>
//         </motion.div>
//       )}

//       {/* Current Subscription */}
//       {currentSubscription?.plan && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
//         >
//           <div className={`bg-gradient-to-r ${getPlanColor(currentSubscription.plan)} p-6 text-white`}>
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   {getPlanIcon(currentSubscription.plan)}
//                   <span className="text-sm font-medium opacity-90 uppercase">Current Plan</span>
//                 </div>
//                 <h2 className="text-3xl font-bold capitalize">
//                   {planName === 'free' ? 'Free Plan' : `${planName.charAt(0).toUpperCase() + planName.slice(1)} Plan`}
//                 </h2>
//                 {currentSubscription.price?.amount > 0 && (
//                   <p className="text-lg opacity-90 mt-1">
//                     {formatCurrency(currentSubscription.price.amount, currentSubscription.price.currency)} / {currentSubscription.billingCycle || 'month'}
//                   </p>
//                 )}
//               </div>
//               <div className="flex flex-col items-end gap-2">
//                 {getStatusBadge(currentSubscription.status || 'active')}
//                 {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
//                   <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                     {daysRemaining} days remaining
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div className="space-y-2">
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {planName === 'free' 
//                     ? 'Access to free content and basic features' 
//                     : currentSubscription.description || 'Access to premium content and features'}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>Started: {formatDate(currentSubscription.startedAt || currentSubscription.createdAt)}</span>
//                   </div>
//                   {currentSubscription.expiresAt && currentSubscription.status === 'active' && (
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" />
//                       <span>Renews on: {formatDate(currentSubscription.expiresAt)}</span>
//                     </div>
//                   )}
//                   {currentSubscription.cancelledAt && (
//                     <div className="flex items-center gap-1 text-red-500">
//                       <XCircle className="h-4 w-4" />
//                       <span>Cancelled on: {formatDate(currentSubscription.cancelledAt)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 {planName !== 'free' && isActive && (
//                   <>
//                     <Link to="/subscription" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4" />
//                       Upgrade
//                     </Link>
//                     <button 
//                       onClick={handleCancelSubscription} 
//                       disabled={cancelling}
//                       className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
//                     >
//                       {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
//                       Cancel
//                     </button>
//                   </>
//                 )}
//                 {planName === 'free' && (
//                   <Link to="/subscription" className="px-6 py-2 bg-gradient-to-r from-primary-600 to-amber-500 hover:from-primary-700 hover:to-amber-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-md">
//                     <Rocket className="h-4 w-4" />
//                     Upgrade Now
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Features Section */}
//             {currentSubscription.features && currentSubscription.features.length > 0 && (
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//                 <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 text-green-500" />
//                   Included Features
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {currentSubscription.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                       <CheckCircle className="h-3 w-3 text-green-500" />
//                       <span>{typeof feature === 'string' ? feature : feature.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}

//       {/* Billing History */}
//       {subscriptions.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-6 pb-3 flex items-center gap-2">
//             <Layers className="h-5 w-5 text-primary-600" />
//             Billing History
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Plan</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {subscriptions.map((sub, index) => (
//                   <motion.tr 
//                     key={sub._id} 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(sub.createdAt)}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {getPlanIcon(sub.plan)}
//                         <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{getPlanName(sub.plan)}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
//                       {formatCurrency(sub.price?.amount || sub.amount, sub.price?.currency || 'INR')}
//                     </td>
//                     <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
//                     <td className="px-6 py-4">
//                       {sub.paymentId && (
//                         <button
//                           onClick={() => handleDownloadInvoice(sub._id)}
//                           disabled={downloadingInvoice === sub._id}
//                           className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm disabled:opacity-50"
//                         >
//                           {downloadingInvoice === sub._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Download className="h-4 w-4" />
//                           )}
//                           PDF
//                         </button>
//                       )}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* Upgrade Benefits Section - For Free Users */}
//       {planName === 'free' && !currentSubscription?.plan?.planId && showUpgradeReminder && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden"
//         >
//           <div className="p-6">
//             <div className="flex items-start gap-4 flex-wrap">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                 <Rocket className="h-6 w-6 text-white" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upgrade to Premium</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   Get unlimited access to all books, audio content, and exclusive features. Join thousands of satisfied readers.
//                 </p>
                
//                 {/* Premium Features Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                   {premiumFeatures.slice(0, 4).map((feature, idx) => {
//                     const Icon = feature.icon;
//                     return (
//                       <div key={idx} className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
//                           <Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">{feature.title}</p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <Link 
//                   to="/subscription" 
//                   className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md"
//                 >
//                   <Crown className="h-4 w-4" />
//                   Upgrade Now
//                   <ChevronRight className="h-4 w-4" />
//                 </Link>
                
//                 <button
//                   onClick={() => setShowUpgradeReminder(false)}
//                   className="ml-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* No Subscription State */}
//       {!currentSubscription?.plan && subscriptions.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center py-12"
//         >
//           <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CreditCard className="h-10 w-10 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Subscription</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
//             Choose a plan to unlock premium content, download books, and access exclusive features.
//           </p>
//           <Link to="/subscription" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
//             View Plans
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UserSubscriptionsPage;
























// // client/src/pages/user/UserSubscriptionsPage.jsx (Updated)
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2, 
//   Download, AlertCircle, ArrowRight, Star, Zap, Shield, 
//   BookOpen, Headphones, Video, FileText, Crown, Sparkles,
//   RefreshCw, ChevronRight, Package, Layers, Award, Bell,
//   TrendingUp, Gift, Rocket, Users, MessageCircle, Heart
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';
// import { Link, useNavigate } from 'react-router-dom';

// // Fallback subscription data if API fails
// const FALLBACK_SUBSCRIPTION = {
//   plan: 'free',
//   status: 'active',
//   price: { amount: 0, currency: 'INR' },
//   billingCycle: 'monthly',
//   startedAt: new Date(),
//   expiresAt: null,
//   features: ['Browse all content', 'Read public poems', 'Basic search']
// };

// const FALLBACK_BILLING_HISTORY = [];

// const UserSubscriptionsPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cancelling, setCancelling] = useState(false);
//   const [downloadingInvoice, setDownloadingInvoice] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [showUpgradeReminder, setShowUpgradeReminder] = useState(true);
//   const [apiError, setApiError] = useState(false);

//   useEffect(() => {
//     fetchUserSubscriptions();
//   }, []);

//   const fetchUserSubscriptions = async () => {
//     setLoading(true);
//     setApiError(false);
//     try {
//       // Fetch current subscription with fallback
//       let currentData = null;
//       try {
//         const current = await subscriptionAPI.getCurrent();
//         currentData = current.data || current;
//       } catch (error) {
//         console.warn('Failed to fetch current subscription, using fallback:', error);
//         currentData = FALLBACK_SUBSCRIPTION;
//         setApiError(true);
//         toast.error('Using cached subscription data. Some features may be limited.');
//       }
      
//       // Fetch billing history with fallback
//       let historyData = [];
//       try {
//         const history = await subscriptionAPI.getBillingHistory();
//         historyData = history.data || history || [];
//       } catch (error) {
//         console.warn('Failed to fetch billing history, using fallback:', error);
//         historyData = FALLBACK_BILLING_HISTORY;
//       }
      
//       setCurrentSubscription(currentData);
//       setSubscriptions(historyData);
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       setApiError(true);
//       setCurrentSubscription(FALLBACK_SUBSCRIPTION);
//       setSubscriptions(FALLBACK_BILLING_HISTORY);
//       toast.error('Failed to load subscription data. Showing cached data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await fetchUserSubscriptions();
//       toast.success('Subscription data refreshed');
//     } catch (error) {
//       toast.error('Failed to refresh data');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handleCancelSubscription = async () => {
//     if (!window.confirm('Are you sure you want to cancel your subscription?\n\nYou will lose access to premium features at the end of your billing period.')) return;
    
//     setCancelling(true);
//     try {
//       await subscriptionAPI.cancelSubscription();
//       toast.success('Subscription cancelled successfully. You will have access until the end of your billing period.');
//       await fetchUserSubscriptions();
//     } catch (error) {
//       console.error('Error cancelling subscription:', error);
//       toast.error(error.response?.data?.message || 'Failed to cancel subscription');
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const handleUpgradeClick = () => {
//     navigate('/subscription-plans', { state: { upgrade: true, currentPlan: currentSubscription?.plan } });
//   };

//   const handleDownloadInvoice = async (subscriptionId) => {
//     setDownloadingInvoice(subscriptionId);
//     try {
//       await subscriptionAPI.downloadInvoice(subscriptionId);
//       toast.success('Invoice downloaded successfully');
//     } catch (error) {
//       console.error('Error downloading invoice:', error);
//       toast.error(error.response?.data?.message || 'Failed to download invoice');
//     } finally {
//       setDownloadingInvoice(null);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     if (!amount && amount !== 0) return 'Free';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   const getPlanName = (plan) => {
//     if (!plan) return 'free';
//     if (typeof plan === 'string') return plan.toLowerCase();
//     if (typeof plan === 'object') return plan.planId || plan.name || 'free';
//     return 'free';
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle, text: 'Active' },
//       cancelled: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle, text: 'Cancelled' },
//       expired: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: Clock, text: 'Expired' },
//       pending: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock, text: 'Pending' },
//       trial: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Sparkles, text: 'Trial' }
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

//   const getPlanIcon = (plan) => {
//     const planName = getPlanName(plan);
//     const icons = {
//       free: <Star className="h-5 w-5 text-gray-500" />,
//       basic: <BookOpen className="h-5 w-5 text-blue-500" />,
//       premium: <Crown className="h-5 w-5 text-yellow-500" />,
//       pro: <Zap className="h-5 w-5 text-purple-500" />
//     };
//     return icons[planName] || <Package className="h-5 w-5 text-gray-500" />;
//   };

//   const getPlanColor = (plan) => {
//     const planName = getPlanName(plan);
//     const colors = {
//       free: 'from-gray-400 to-gray-500',
//       basic: 'from-blue-500 to-blue-600',
//       premium: 'from-yellow-500 to-orange-500',
//       pro: 'from-purple-500 to-pink-500'
//     };
//     return colors[planName] || 'from-gray-400 to-gray-500';
//   };

//   const calculateDaysRemaining = (expiresAt) => {
//     if (!expiresAt) return null;
//     const diff = new Date(expiresAt) - new Date();
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//     return days > 0 ? days : 0;
//   };

//   const isExpiringSoon = (expiresAt) => {
//     const days = calculateDaysRemaining(expiresAt);
//     return days !== null && days > 0 && days <= 7;
//   };

//   const isExpired = (expiresAt) => {
//     if (!expiresAt) return false;
//     return new Date(expiresAt) < new Date();
//   };

//   const daysRemaining = currentSubscription?.expiresAt ? calculateDaysRemaining(currentSubscription.expiresAt) : null;
//   const planName = getPlanName(currentSubscription?.plan);
//   const isActive = currentSubscription?.status === 'active';
//   const expiringSoon = isExpiringSoon(currentSubscription?.expiresAt);
//   const expired = isExpired(currentSubscription?.expiresAt);

//   // Premium features list for upgrade section
//   const premiumFeatures = [
//     { icon: BookOpen, title: 'Unlimited Books', desc: 'Access thousands of books and poems' },
//     { icon: Headphones, title: 'HD Audio', desc: 'High-quality audio streaming' },
//     { icon: Download, title: 'Offline Access', desc: 'Download content for offline reading' },
//     { icon: Video, title: 'Video Content', desc: 'Exclusive video lectures and talks' },
//     { icon: Sparkles, title: 'AI Analysis', desc: 'AI-powered literary analysis' },
//     { icon: Shield, title: 'Ad-Free', desc: 'No advertisements' },
//     { icon: TrendingUp, title: 'Analytics', desc: 'Personal reading insights' },
//     { icon: Users, title: 'Community', desc: 'Join exclusive discussions' }
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* API Error Banner */}
//       {apiError && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
//         >
//           <div className="flex items-center gap-3">
//             <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
//             <div className="flex-1">
//               <p className="font-medium text-yellow-800 dark:text-yellow-400">
//                 Using cached subscription data
//               </p>
//               <p className="text-sm text-yellow-700 dark:text-yellow-500">
//                 We're having trouble connecting to the server. Your subscription features may still work, but some updates may be delayed.
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
//             >
//               Retry
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* Header */}
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Subscriptions</h1>
//           <p className="text-gray-500 dark:text-gray-400">Manage your subscription and billing information</p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//         >
//           <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>

//       {/* Expiry Warning Banner */}
//       {expiringSoon && isActive && planName !== 'free' && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
//         >
//           <div className="flex items-center gap-3">
//             <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
//             <div>
//               <p className="font-medium text-yellow-800 dark:text-yellow-400">
//                 ⚠️ Your subscription expires in {daysRemaining} days!
//               </p>
//               <p className="text-sm text-yellow-700 dark:text-yellow-500">
//                 Renew now to continue enjoying premium features without interruption.
//               </p>
//             </div>
//           </div>
//           <button onClick={handleUpgradeClick} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium">
//             Renew Now
//           </button>
//         </motion.div>
//       )}

//       {/* Expired Warning Banner */}
//       {expired && !isActive && planName !== 'free' && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
//         >
//           <div className="flex items-center gap-3">
//             <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
//             <div>
//               <p className="font-medium text-red-800 dark:text-red-400">
//                 ❌ Your subscription has expired!
//               </p>
//               <p className="text-sm text-red-700 dark:text-red-500">
//                 You have lost access to premium features. Upgrade now to regain access.
//               </p>
//             </div>
//           </div>
//           <button onClick={handleUpgradeClick} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
//             Upgrade Now
//           </button>
//         </motion.div>
//       )}

//       {/* Current Subscription */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
//       >
//         <div className={`bg-gradient-to-r ${getPlanColor(currentSubscription?.plan)} p-6 text-white`}>
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 {getPlanIcon(currentSubscription?.plan)}
//                 <span className="text-sm font-medium opacity-90 uppercase">Current Plan</span>
//               </div>
//               <h2 className="text-3xl font-bold capitalize">
//                 {planName === 'free' ? 'Free Plan' : `${planName.charAt(0).toUpperCase() + planName.slice(1)} Plan`}
//               </h2>
//               {currentSubscription?.price?.amount > 0 && (
//                 <p className="text-lg opacity-90 mt-1">
//                   {formatCurrency(currentSubscription.price.amount, currentSubscription.price.currency)} / {currentSubscription.billingCycle || 'month'}
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-col items-end gap-2">
//               {getStatusBadge(currentSubscription?.status || 'active')}
//               {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
//                 <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                   {daysRemaining} days remaining
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//             <div className="space-y-2">
//               <p className="text-gray-600 dark:text-gray-400">
//                 {planName === 'free' 
//                   ? 'Access to free content and basic features' 
//                   : currentSubscription?.description || 'Access to premium content and features'}
//               </p>
//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   <span>Started: {formatDate(currentSubscription?.startedAt || currentSubscription?.createdAt)}</span>
//                 </div>
//                 {currentSubscription?.expiresAt && currentSubscription?.status === 'active' && planName !== 'free' && (
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <span>Renews on: {formatDate(currentSubscription.expiresAt)}</span>
//                   </div>
//                 )}
//                 {currentSubscription?.cancelledAt && (
//                   <div className="flex items-center gap-1 text-red-500">
//                     <XCircle className="h-4 w-4" />
//                     <span>Cancelled on: {formatDate(currentSubscription.cancelledAt)}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-3">
//               {planName !== 'free' && isActive ? (
//                 <>
//                   <button 
//                     onClick={handleUpgradeClick}
//                     className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2"
//                   >
//                     <ArrowRight className="h-4 w-4" />
//                     Change Plan
//                   </button>
//                   <button 
//                     onClick={handleCancelSubscription} 
//                     disabled={cancelling}
//                     className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
//                     Cancel
//                   </button>
//                 </>
//               ) : planName === 'free' ? (
//                 <button 
//                   onClick={handleUpgradeClick}
//                   className="px-6 py-2 bg-gradient-to-r from-primary-600 to-amber-500 hover:from-primary-700 hover:to-amber-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-md"
//                 >
//                   <Rocket className="h-4 w-4" />
//                   Upgrade Now
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               ) : null}
//             </div>
//           </div>

//           {/* Features Section */}
//           {currentSubscription?.features && currentSubscription.features.length > 0 && (
//             <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//               <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                 <CheckCircle className="h-4 w-4 text-green-500" />
//                 Included Features
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {currentSubscription.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                     <CheckCircle className="h-3 w-3 text-green-500" />
//                     <span>{typeof feature === 'string' ? feature : feature.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </motion.div>

//       {/* Billing History */}
//       {subscriptions.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-6 pb-3 flex items-center gap-2">
//             <Layers className="h-5 w-5 text-primary-600" />
//             Billing History
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Plan</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {subscriptions.map((sub, index) => (
//                   <motion.tr 
//                     key={sub._id} 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(sub.createdAt)}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {getPlanIcon(sub.plan)}
//                         <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{getPlanName(sub.plan)}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
//                       {formatCurrency(sub.price?.amount || sub.amount, sub.price?.currency || 'INR')}
//                     </td>
//                     <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
//                     <td className="px-6 py-4">
//                       {sub.paymentId && (
//                         <button
//                           onClick={() => handleDownloadInvoice(sub._id)}
//                           disabled={downloadingInvoice === sub._id}
//                           className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm disabled:opacity-50"
//                         >
//                           {downloadingInvoice === sub._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Download className="h-4 w-4" />
//                           )}
//                           PDF
//                         </button>
//                       )}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* Upgrade Benefits Section - For Free Users */}
//       {planName === 'free' && showUpgradeReminder && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden"
//         >
//           <div className="p-6">
//             <div className="flex items-start gap-4 flex-wrap">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                 <Rocket className="h-6 w-6 text-white" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlock Premium Features</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   Upgrade to Premium and get unlimited access to all books, audio content, and exclusive features. Join thousands of satisfied readers.
//                 </p>
                
//                 {/* Premium Features Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                   {premiumFeatures.slice(0, 4).map((feature, idx) => {
//                     const Icon = feature.icon;
//                     return (
//                       <div key={idx} className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
//                           <Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">{feature.title}</p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <button 
//                   onClick={handleUpgradeClick}
//                   className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md"
//                 >
//                   <Crown className="h-4 w-4" />
//                   Upgrade Now
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
                
//                 <button
//                   onClick={() => setShowUpgradeReminder(false)}
//                   className="ml-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* No Subscription State */}
//       {!currentSubscription?.plan && subscriptions.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center py-12"
//         >
//           <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CreditCard className="h-10 w-10 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Subscription</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
//             Choose a plan to unlock premium content, download books, and access exclusive features.
//           </p>
//           <button onClick={handleUpgradeClick} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
//             View Plans
//             <ArrowRight className="h-4 w-4" />
//           </button>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UserSubscriptionsPage;
























// client/src/pages/user/UserSubscriptionsPage.jsx (UPDATED with in-dashboard modal)
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2, 
  Download, AlertCircle, ArrowRight, Star, Zap, Shield, 
  BookOpen, Headphones, Video, FileText, Crown, Sparkles,
  RefreshCw, ChevronRight, Package, Layers, Award, Bell,
  TrendingUp, Gift, Rocket, Users, MessageCircle, Heart, X, Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';
import { loadRazorpayScript, initRazorpayPayment } from '../../utils/paymentHelper';

// Subscription Plans for Modal
const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'INR',
    icon: Sparkles,
    gradient: 'from-gray-400 to-gray-600',
    features: [
      'Browse all content',
      'Read public poems',
      'Basic search',
      '50 poems/day'
    ],
    badgeText: '',
    recommended: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: 'INR',
    icon: BookOpen,
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      'All free features',
      'Unlimited poem reading',
      'Download 5 ebooks/month',
      'Basic audio streaming'
    ],
    badgeText: 'Popular',
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    currency: 'INR',
    icon: Crown,
    gradient: 'from-amber-400 to-orange-500',
    features: [
      'All Basic features',
      'Unlimited downloads',
      'HD audio streaming',
      'Ad-free experience',
      'AI explanations'
    ],
    badgeText: 'Best Value',
    recommended: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: 'INR',
    icon: Zap,
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'All Premium features',
      'Creator tools',
      'Priority support',
      'Analytics dashboard',
      'Early access'
    ],
    badgeText: 'Creator',
    recommended: false
  }
];

// Fallback subscription data if API fails
const FALLBACK_SUBSCRIPTION = {
  plan: 'free',
  status: 'active',
  price: { amount: 0, currency: 'INR' },
  billingCycle: 'monthly',
  startedAt: new Date(),
  expiresAt: null,
  features: ['Browse all content', 'Read public poems', 'Basic search']
};

const FALLBACK_BILLING_HISTORY = [];

// Subscription Modal Component
const SubscriptionModal = ({ isOpen, onClose, currentPlan, onSubscribeSuccess }) => {
  const { user } = useSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processingPlan, setProcessingPlan] = useState(null);

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please login to subscribe');
      onClose();
      return;
    }

    if (currentPlan === plan.id && plan.id !== 'free') {
      toast.success(`You are already on the ${plan.name} plan`);
      return;
    }

    if (plan.id === 'free') {
      try {
        setProcessingPlan(plan.id);
        await subscriptionAPI.subscribe({ plan: 'free', billingCycle: 'monthly' });
        toast.success('Free plan activated!');
        onSubscribeSuccess?.();
        onClose();
      } catch (error) {
        console.error('Error activating free plan:', error);
        toast.error(error.response?.data?.message || 'Failed to activate free plan');
      } finally {
        setProcessingPlan(null);
      }
      return;
    }

    // Load Razorpay script
    try {
      await loadRazorpayScript();
    } catch (error) {
      toast.error('Payment system unavailable. Please try again later.');
      return;
    }

    setProcessingPlan(plan.id);
    
    try {
      const result = await initRazorpayPayment({
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
        currency: plan.currency || 'INR',
        userEmail: user.email,
        userName: user.name,
        userPhone: user.phone,
        onSuccess: async (data) => {
          console.log('Payment success:', data);
          toast.success(`Successfully subscribed to ${plan.name} plan!`);
          onSubscribeSuccess?.();
          onClose();
        },
        onError: (error) => {
          console.error('Payment error:', error);
        }
      });

      if (!result.success) {
        console.error('Payment initiation failed:', result.error);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setProcessingPlan(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="px-6 pt-6 pb-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Upgrade to unlock premium features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan = currentPlan === plan.id;
                const isProcessing = processingPlan === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl overflow-hidden border transition-all ${
                      plan.recommended 
                        ? 'border-primary-500 shadow-lg ring-2 ring-primary-500/50' 
                        : 'border-gray-200 dark:border-gray-700'
                    } ${isCurrentPlan ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-white dark:bg-gray-800'}`}
                  >
                    <div className={`p-5 ${isCurrentPlan ? '' : `bg-gradient-to-r ${plan.gradient}`}`}>
                      <Icon className={`h-10 w-10 mb-3 ${isCurrentPlan ? 'text-green-600' : 'text-white'}`} />
                      <h4 className={`text-xl font-bold ${isCurrentPlan ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                        {plan.name}
                      </h4>
                      <div className="mt-2">
                        <span className={`text-3xl font-bold ${isCurrentPlan ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                          {plan.currency === 'INR' ? '₹' : '$'}{plan.price}
                        </span>
                        <span className={`text-sm ${isCurrentPlan ? 'text-gray-500' : 'text-white/80'}`}>/month</span>
                      </div>
                      {plan.badgeText && !isCurrentPlan && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                          {plan.badgeText}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <ul className="space-y-2 mb-5">
                        {plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        onClick={() => handleSubscribe(plan)}
                        disabled={isCurrentPlan || isProcessing}
                        className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
                          isCurrentPlan
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:scale-105`
                        }`}
                      >
                        {isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                        ) : isCurrentPlan ? (
                          'Current Plan'
                        ) : plan.id === 'free' ? (
                          'Get Started'
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Secure payments powered by Razorpay. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSubscriptionsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showUpgradeReminder, setShowUpgradeReminder] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    setLoading(true);
    setApiError(false);
    try {
      // Fetch current subscription with fallback
      let currentData = null;
      try {
        const current = await subscriptionAPI.getCurrent();
        currentData = current.data || current;
      } catch (error) {
        console.warn('Failed to fetch current subscription, using fallback:', error);
        currentData = FALLBACK_SUBSCRIPTION;
        setApiError(true);
        toast.error('Using cached subscription data. Some features may be limited.');
      }
      
      // Fetch billing history with fallback
      let historyData = [];
      try {
        const history = await subscriptionAPI.getBillingHistory();
        historyData = history.data || history || [];
      } catch (error) {
        console.warn('Failed to fetch billing history, using fallback:', error);
        historyData = FALLBACK_BILLING_HISTORY;
      }
      
      setCurrentSubscription(currentData);
      setSubscriptions(historyData);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setApiError(true);
      setCurrentSubscription(FALLBACK_SUBSCRIPTION);
      setSubscriptions(FALLBACK_BILLING_HISTORY);
      toast.error('Failed to load subscription data. Showing cached data.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUserSubscriptions();
      toast.success('Subscription data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?\n\nYou will lose access to premium features at the end of your billing period.')) return;
    
    setCancelling(true);
    try {
      await subscriptionAPI.cancelSubscription();
      toast.success('Subscription cancelled successfully. You will have access until the end of your billing period.');
      await fetchUserSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const handleUpgradeClick = () => {
    setShowSubscriptionModal(true); // Open modal instead of navigating
  };

  const handleSubscribeSuccess = async () => {
    await fetchUserSubscriptions(); // Refresh subscription data
    // Dispatch event for dashboard to refresh
    window.dispatchEvent(new CustomEvent('subscription-updated'));
  };

  const handleDownloadInvoice = async (subscriptionId) => {
    setDownloadingInvoice(subscriptionId);
    try {
      await subscriptionAPI.downloadInvoice(subscriptionId);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error(error.response?.data?.message || 'Failed to download invoice');
    } finally {
      setDownloadingInvoice(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    if (!amount && amount !== 0) return 'Free';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getPlanName = (plan) => {
    if (!plan) return 'free';
    if (typeof plan === 'string') return plan.toLowerCase();
    if (typeof plan === 'object') return plan.planId || plan.name || 'free';
    return 'free';
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle, text: 'Active' },
      cancelled: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle, text: 'Cancelled' },
      expired: { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: Clock, text: 'Expired' },
      pending: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock, text: 'Pending' },
      trial: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Sparkles, text: 'Trial' }
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

  const getPlanIcon = (plan) => {
    const planName = getPlanName(plan);
    const icons = {
      free: <Star className="h-5 w-5 text-gray-500" />,
      basic: <BookOpen className="h-5 w-5 text-blue-500" />,
      premium: <Crown className="h-5 w-5 text-yellow-500" />,
      pro: <Zap className="h-5 w-5 text-purple-500" />
    };
    return icons[planName] || <Package className="h-5 w-5 text-gray-500" />;
  };

  const getPlanColor = (plan) => {
    const planName = getPlanName(plan);
    const colors = {
      free: 'from-gray-400 to-gray-500',
      basic: 'from-blue-500 to-blue-600',
      premium: 'from-yellow-500 to-orange-500',
      pro: 'from-purple-500 to-pink-500'
    };
    return colors[planName] || 'from-gray-400 to-gray-500';
  };

  const calculateDaysRemaining = (expiresAt) => {
    if (!expiresAt) return null;
    const diff = new Date(expiresAt) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const isExpiringSoon = (expiresAt) => {
    const days = calculateDaysRemaining(expiresAt);
    return days !== null && days > 0 && days <= 7;
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const daysRemaining = currentSubscription?.expiresAt ? calculateDaysRemaining(currentSubscription.expiresAt) : null;
  const planName = getPlanName(currentSubscription?.plan);
  const isActive = currentSubscription?.status === 'active';
  const expiringSoon = isExpiringSoon(currentSubscription?.expiresAt);
  const expired = isExpired(currentSubscription?.expiresAt);

  // Premium features list for upgrade section
  const premiumFeatures = [
    { icon: BookOpen, title: 'Unlimited Books', desc: 'Access thousands of books and poems' },
    { icon: Headphones, title: 'HD Audio', desc: 'High-quality audio streaming' },
    { icon: Download, title: 'Offline Access', desc: 'Download content for offline reading' },
    { icon: Video, title: 'Video Content', desc: 'Exclusive video lectures and talks' },
    { icon: Sparkles, title: 'AI Analysis', desc: 'AI-powered literary analysis' },
    { icon: Shield, title: 'Ad-Free', desc: 'No advertisements' },
    { icon: TrendingUp, title: 'Analytics', desc: 'Personal reading insights' },
    { icon: Users, title: 'Community', desc: 'Join exclusive discussions' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* API Error Banner */}
      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <div className="flex-1">
              <p className="font-medium text-yellow-800 dark:text-yellow-400">
                Using cached subscription data
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-500">
                We're having trouble connecting to the server. Your subscription features may still work, but some updates may be delayed.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Subscriptions</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your subscription and billing information</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Expiry Warning Banner */}
      {expiringSoon && isActive && planName !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-400">
                ⚠️ Your subscription expires in {daysRemaining} days!
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-500">
                Renew now to continue enjoying premium features without interruption.
              </p>
            </div>
          </div>
          <button onClick={handleUpgradeClick} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm font-medium">
            Renew Now
          </button>
        </motion.div>
      )}

      {/* Expired Warning Banner */}
      {expired && !isActive && planName !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
            <div>
              <p className="font-medium text-red-800 dark:text-red-400">
                ❌ Your subscription has expired!
              </p>
              <p className="text-sm text-red-700 dark:text-red-500">
                You have lost access to premium features. Upgrade now to regain access.
              </p>
            </div>
          </div>
          <button onClick={handleUpgradeClick} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium">
            Upgrade Now
          </button>
        </motion.div>
      )}

      {/* Current Subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className={`bg-gradient-to-r ${getPlanColor(currentSubscription?.plan)} p-6 text-white`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getPlanIcon(currentSubscription?.plan)}
                <span className="text-sm font-medium opacity-90 uppercase">Current Plan</span>
              </div>
              <h2 className="text-3xl font-bold capitalize">
                {planName === 'free' ? 'Free Plan' : `${planName.charAt(0).toUpperCase() + planName.slice(1)} Plan`}
              </h2>
              {currentSubscription?.price?.amount > 0 && (
                <p className="text-lg opacity-90 mt-1">
                  {formatCurrency(currentSubscription.price.amount, currentSubscription.price.currency)} / {currentSubscription.billingCycle || 'month'}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusBadge(currentSubscription?.status || 'active')}
              {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 7 && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {daysRemaining} days remaining
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                {planName === 'free' 
                  ? 'Access to free content and basic features' 
                  : currentSubscription?.description || 'Access to premium content and features'}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Started: {formatDate(currentSubscription?.startedAt || currentSubscription?.createdAt)}</span>
                </div>
                {currentSubscription?.expiresAt && currentSubscription?.status === 'active' && planName !== 'free' && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Renews on: {formatDate(currentSubscription.expiresAt)}</span>
                  </div>
                )}
                {currentSubscription?.cancelledAt && (
                  <div className="flex items-center gap-1 text-red-500">
                    <XCircle className="h-4 w-4" />
                    <span>Cancelled on: {formatDate(currentSubscription.cancelledAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {planName !== 'free' && isActive ? (
                <>
                  <button 
                    onClick={handleUpgradeClick}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Change Plan
                  </button>
                  <button 
                    onClick={handleCancelSubscription} 
                    disabled={cancelling}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                    Cancel
                  </button>
                </>
              ) : planName === 'free' ? (
                <button 
                  onClick={handleUpgradeClick}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-amber-500 hover:from-primary-700 hover:to-amber-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-md"
                >
                  <Rocket className="h-4 w-4" />
                  Upgrade Now
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Features Section */}
          {currentSubscription?.features && currentSubscription.features.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Included Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentSubscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{typeof feature === 'string' ? feature : feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Billing History */}
      {subscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-6 pb-3 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary-600" />
            Billing History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {subscriptions.map((sub, index) => (
                  <motion.tr 
                    key={sub._id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(sub.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(sub.plan)}
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{getPlanName(sub.plan)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatCurrency(sub.price?.amount || sub.amount, sub.price?.currency || 'INR')}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4">
                      {sub.paymentId && (
                        <button
                          onClick={() => handleDownloadInvoice(sub._id)}
                          disabled={downloadingInvoice === sub._id}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm disabled:opacity-50"
                        >
                          {downloadingInvoice === sub._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                          PDF
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Upgrade Benefits Section - For Free Users */}
      {planName === 'free' && showUpgradeReminder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlock Premium Features</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upgrade to Premium and get unlimited access to all books, audio content, and exclusive features. Join thousands of satisfied readers.
                </p>
                
                {/* Premium Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {premiumFeatures.slice(0, 4).map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{feature.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  onClick={handleUpgradeClick}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md"
                >
                  <Crown className="h-4 w-4" />
                  Upgrade Now
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => setShowUpgradeReminder(false)}
                  className="ml-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Subscription State */}
      {!currentSubscription?.plan && subscriptions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Subscription</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Choose a plan to unlock premium content, download books, and access exclusive features.
          </p>
          <button onClick={handleUpgradeClick} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            View Plans
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* Subscription Modal - In-dashboard upgrade */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentPlan={planName}
        onSubscribeSuccess={handleSubscribeSuccess}
      />
    </div>
  );
};

export default UserSubscriptionsPage;