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












// client/src/pages/user/UserSubscriptionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2, 
  Download, AlertCircle, ArrowRight, Star, Zap, Shield, 
  BookOpen, Headphones, Video, FileText, Crown, Sparkles,
  RefreshCw, ChevronRight, Package, Layers, Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';
import { Link } from 'react-router-dom';

const UserSubscriptionsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    setLoading(true);
    try {
      const [current, history] = await Promise.all([
        subscriptionAPI.getCurrent(),
        subscriptionAPI.getBillingHistory()
      ]);
      
      setCurrentSubscription(current.data || current);
      setSubscriptions(history.data || history || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscription data');
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
      await subscriptionAPI.cancel();
      toast.success('Subscription cancelled successfully. You will have access until the end of your billing period.');
      await fetchUserSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadInvoice = async (subscriptionId) => {
    setDownloadingInvoice(subscriptionId);
    try {
      const blob = await subscriptionAPI.downloadInvoice(subscriptionId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${subscriptionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
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

  // Helper function to safely get plan name (handles both string and object)
  const getPlanName = (plan) => {
    if (!plan) return 'free';
    if (typeof plan === 'string') return plan.toLowerCase();
    if (typeof plan === 'object') return plan.planId || plan.name || 'free';
    return 'free';
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Active' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Cancelled' },
      expired: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Expired' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
      trial: { color: 'bg-blue-100 text-blue-700', icon: Sparkles, text: 'Trial' }
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

  const daysRemaining = currentSubscription?.expiresAt ? calculateDaysRemaining(currentSubscription.expiresAt) : null;
  const planName = getPlanName(currentSubscription?.plan);

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
          <p className="text-gray-500">Manage your subscription and billing information</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Current Subscription */}
      {currentSubscription?.plan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${getPlanColor(currentSubscription.plan)} p-6 text-white`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getPlanIcon(currentSubscription.plan)}
                  <span className="text-sm font-medium opacity-90 uppercase">Current Plan</span>
                </div>
                <h2 className="text-3xl font-bold capitalize">
                  {planName}
                </h2>
                {currentSubscription.price?.amount > 0 && (
                  <p className="text-lg opacity-90 mt-1">
                    {formatCurrency(currentSubscription.price.amount, currentSubscription.price.currency)} / {currentSubscription.billingCycle || 'month'}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(currentSubscription.status || 'active')}
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
                <p className="text-gray-600">
                  {planName === 'free' 
                    ? 'Access to free content and basic features' 
                    : currentSubscription.description || 'Access to premium content and features'}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Started: {formatDate(currentSubscription.startedAt || currentSubscription.createdAt)}</span>
                  </div>
                  {currentSubscription.expiresAt && currentSubscription.status === 'active' && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Renews on: {formatDate(currentSubscription.expiresAt)}</span>
                    </div>
                  )}
                  {currentSubscription.cancelledAt && (
                    <div className="flex items-center gap-1 text-red-500">
                      <XCircle className="h-4 w-4" />
                      <span>Cancelled on: {formatDate(currentSubscription.cancelledAt)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {planName !== 'free' && currentSubscription.status === 'active' && (
                  <>
                    <Link to="/subscription" className="btn-secondary flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Upgrade
                    </Link>
                    <button 
                      onClick={handleCancelSubscription} 
                      disabled={cancelling}
                      className="btn-danger flex items-center gap-2"
                    >
                      {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                      Cancel
                    </button>
                  </>
                )}
                {planName === 'free' && (
                  <Link to="/subscription" className="btn-primary flex items-center gap-2">
                    Upgrade Now
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Features Section */}
            {currentSubscription.features && currentSubscription.features.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Included Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentSubscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{typeof feature === 'string' ? feature : feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Usage Statistics (Optional) */}
      {currentSubscription?.usage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">Books Read</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentSubscription.usage.booksRead || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <Headphones className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">Audio Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentSubscription.usage.audioHours || 0}h
                </p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <Download className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentSubscription.usage.downloads || 0}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing History */}
      {subscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 40 }}
          className="card overflow-hidden"
        >
          <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary-600" />
            Billing History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {subscriptions.map((sub, index) => (
                    <motion.tr 
                      key={sub._id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sub.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getPlanIcon(sub.plan)}
                          <span className="text-sm font-medium text-gray-900 capitalize">{getPlanName(sub.plan)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(sub.price?.amount || sub.amount, sub.price?.currency || 'INR')}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                      <td className="px-6 py-4">
                        {sub.paymentId && (
                          <button
                            onClick={() => handleDownloadInvoice(sub._id)}
                            disabled={downloadingInvoice === sub._id}
                            className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 text-sm disabled:opacity-50"
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
                </AnimatePresence>
              </tbody>
            </table>
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
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Choose a plan to unlock premium content, download books, and access exclusive features.
          </p>
          <Link to="/subscription" className="btn-primary inline-flex items-center gap-2">
            View Plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}

      {/* Upgrade Benefits Section */}
      {planName === 'free' && !currentSubscription?.plan?.planId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 60 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-start gap-4">
            <Award className="h-10 w-10 text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Upgrade to Premium</h3>
              <p className="text-sm text-gray-600 mb-3">
                Get unlimited access to all books, audio content, and exclusive features.
              </p>
              <Link to="/subscription" className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1 text-sm">
                See Plans
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserSubscriptionsPage;