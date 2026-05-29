// // client/src/pages/admin/TransactionsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import {
//   CreditCard, Search, Filter, Download, Calendar, DollarSign,
//   CheckCircle, XCircle, Clock, Eye, TrendingUp, TrendingDown,
//   Loader2, Receipt, Wallet, Banknote, RefreshCw
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';

// const TransactionsPage = () => {
//   const { token } = useSelector((state) => state.auth);
  
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [stats, setStats] = useState({
//     totalRevenue: 0,
//     totalTransactions: 0,
//     successfulTransactions: 0,
//     failedTransactions: 0,
//     pendingTransactions: 0
//   });

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       // You'll need to add this endpoint to your backend
//       const response = await subscriptionAPI.getAllTransactions();
//       const transactionsData = response.data || response;
//       setTransactions(transactionsData);
      
//       // Calculate stats
//       const totalRevenue = transactionsData.reduce((sum, t) => 
//         t.status === 'success' ? sum + (t.amount || 0) : sum, 0
//       );
//       const successfulTransactions = transactionsData.filter(t => t.status === 'success').length;
//       const failedTransactions = transactionsData.filter(t => t.status === 'failed').length;
//       const pendingTransactions = transactionsData.filter(t => t.status === 'pending').length;
      
//       setStats({
//         totalRevenue,
//         totalTransactions: transactionsData.length,
//         successfulTransactions,
//         failedTransactions,
//         pendingTransactions
//       });
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       toast.error(error.response?.data?.message || 'Error fetching transactions');
//       // Mock data for demonstration
//       setTransactions(mockTransactions);
//       setStats({
//         totalRevenue: 12500,
//         totalTransactions: 45,
//         successfulTransactions: 38,
//         failedTransactions: 4,
//         pendingTransactions: 3
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = transaction.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          transaction.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          transaction.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
//     const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       success: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Success' },
//       failed: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Failed' },
//       pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
//       refunded: { color: 'bg-gray-100 text-gray-700', icon: RefreshCw, text: 'Refunded' }
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

//   const getTypeBadge = (type) => {
//     const types = {
//       subscription: { color: 'bg-blue-100 text-blue-700', icon: CreditCard, text: 'Subscription' },
//       renewal: { color: 'bg-purple-100 text-purple-700', icon: RefreshCw, text: 'Renewal' },
//       refund: { color: 'bg-orange-100 text-orange-700', icon: TrendingDown, text: 'Refund' }
//     };
//     const badge = types[type] || types.subscription;
//     const Icon = badge.icon;
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
//         <Icon className="h-3 w-3" />
//         {badge.text}
//       </span>
//     );
//   };

//   const exportToCSV = () => {
//     const headers = ['Transaction ID', 'User', 'Email', 'Type', 'Amount', 'Status', 'Date', 'Payment Method'];
//     const csvData = filteredTransactions.map(t => [
//       t.transactionId || t._id,
//       t.user?.name || 'N/A',
//       t.user?.email || 'N/A',
//       t.type,
//       `${t.currency || 'INR'} ${t.amount || 0}`,
//       t.status,
//       formatDate(t.createdAt),
//       t.paymentMethod || 'N/A'
//     ]);
    
//     const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success('Export started');
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0
//     }).format(amount);
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
//           <p className="text-gray-500">View and manage all payment transactions</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={exportToCSV}
//             className="btn-secondary inline-flex items-center space-x-2"
//           >
//             <Download className="h-5 w-5" />
//             <span>Export CSV</span>
//           </button>
//           <button
//             onClick={fetchTransactions}
//             className="btn-secondary inline-flex items-center space-x-2"
//           >
//             <RefreshCw className="h-5 w-5" />
//             <span>Refresh</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <DollarSign className="h-5 w-5 text-green-600" />
//             <span className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</span>
//           </div>
//           <p className="text-sm text-gray-500">Total Revenue</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <Receipt className="h-5 w-5 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</span>
//           </div>
//           <p className="text-sm text-gray-500">Total Transactions</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <TrendingUp className="h-5 w-5 text-green-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.successfulTransactions}</span>
//           </div>
//           <p className="text-sm text-gray-500">Successful</p>
//         </div>
//         <div className="card p-4">
//           <div className="flex items-center justify-between mb-2">
//             <TrendingDown className="h-5 w-5 text-red-600" />
//             <span className="text-2xl font-bold text-gray-900">{stats.failedTransactions}</span>
//           </div>
//           <p className="text-sm text-gray-500">Failed</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="card p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by transaction ID, user name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="input-field pl-10"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="input-field w-full md:w-40"
//           >
//             <option value="all">All Status</option>
//             <option value="success">Success</option>
//             <option value="pending">Pending</option>
//             <option value="failed">Failed</option>
//             <option value="refunded">Refunded</option>
//           </select>
//           <select
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//             className="input-field w-full md:w-40"
//           >
//             <option value="all">All Types</option>
//             <option value="subscription">Subscription</option>
//             <option value="renewal">Renewal</option>
//             <option value="refund">Refund</option>
//           </select>
//         </div>
//       </div>

//       {/* Transactions Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredTransactions.map((transaction) => (
//                 <motion.tr
//                   key={transaction._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <code className="text-xs font-mono text-gray-600">
//                       {transaction.transactionId?.slice(0, 12)}...
//                     </code>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{transaction.user?.name || 'N/A'}</p>
//                       <p className="text-xs text-gray-500">{transaction.user?.email || 'N/A'}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getTypeBadge(transaction.type)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-sm font-semibold text-gray-900">
//                       {formatCurrency(transaction.amount, transaction.currency)}
//                     </p>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getStatusBadge(transaction.status)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {formatDate(transaction.createdAt)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center gap-1 text-sm text-gray-600">
//                       {transaction.paymentMethod === 'razorpay' && <Wallet className="h-4 w-4" />}
//                       {transaction.paymentMethod === 'card' && <CreditCard className="h-4 w-4" />}
//                       {transaction.paymentMethod === 'bank' && <Banknote className="h-4 w-4" />}
//                       {transaction.paymentMethod || 'N/A'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => {
//                         setSelectedTransaction(transaction);
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
        
//         {filteredTransactions.length === 0 && (
//           <div className="text-center py-12">
//             <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500">No transactions found</p>
//           </div>
//         )}
//       </div>

//       {/* Transaction Details Modal */}
//       {showDetailsModal && selectedTransaction && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//           >
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
//               <button
//                 onClick={() => setShowDetailsModal(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <XCircle className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               {/* Transaction Header */}
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-sm text-gray-500">Transaction ID</p>
//                   <code className="text-sm font-mono text-gray-900">{selectedTransaction.transactionId || selectedTransaction._id}</code>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-500">Date & Time</p>
//                   <p className="text-sm font-medium text-gray-900">{formatDate(selectedTransaction.createdAt)}</p>
//                 </div>
//               </div>

//               {/* Payment Details */}
//               <div className="space-y-3">
//                 <h4 className="font-medium text-gray-900">Payment Information</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Amount</p>
//                     <p className="text-lg font-bold text-primary-600">
//                       {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Status</p>
//                     {getStatusBadge(selectedTransaction.status)}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Type</p>
//                     {getTypeBadge(selectedTransaction.type)}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Payment Method</p>
//                     <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.paymentMethod || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* User Details */}
//               <div className="space-y-3">
//                 <h4 className="font-medium text-gray-900">Customer Information</h4>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-900">{selectedTransaction.user?.name || 'N/A'}</p>
//                   <p className="text-sm text-gray-500 mt-1">{selectedTransaction.user?.email || 'N/A'}</p>
//                   {selectedTransaction.user?.phone && (
//                     <p className="text-sm text-gray-500 mt-1">{selectedTransaction.user.phone}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Additional Info */}
//               {selectedTransaction.paymentDetails && (
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-900">Payment Details</h4>
//                   <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                     {selectedTransaction.paymentDetails.paymentId && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">Payment ID:</span>
//                         <code className="text-xs font-mono text-gray-900">{selectedTransaction.paymentDetails.paymentId}</code>
//                       </div>
//                     )}
//                     {selectedTransaction.paymentDetails.orderId && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">Order ID:</span>
//                         <code className="text-xs font-mono text-gray-900">{selectedTransaction.paymentDetails.orderId}</code>
//                       </div>
//                     )}
//                     {selectedTransaction.paymentDetails.signature && (
//                       <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">Signature:</span>
//                         <code className="text-xs font-mono text-gray-900">{selectedTransaction.paymentDetails.signature.slice(0, 20)}...</code>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Subscription Details */}
//               {selectedTransaction.subscriptionId && (
//                 <div className="space-y-3">
//                   <h4 className="font-medium text-gray-900">Subscription Details</h4>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <p className="text-sm text-gray-900">Subscription ID: {selectedTransaction.subscriptionId}</p>
//                     {selectedTransaction.plan && (
//                       <p className="text-sm text-gray-600 mt-1">Plan: {selectedTransaction.plan}</p>
//                     )}
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
// const mockTransactions = [
//   {
//     _id: '1',
//     transactionId: 'TXN_1234567890',
//     user: { name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210' },
//     type: 'subscription',
//     amount: 199,
//     currency: 'INR',
//     status: 'success',
//     createdAt: '2024-01-15T10:30:00Z',
//     paymentMethod: 'razorpay',
//     paymentDetails: { paymentId: 'pay_123', orderId: 'order_123', signature: 'sig_123' },
//     plan: 'premium',
//     subscriptionId: 'sub_123'
//   },
//   {
//     _id: '2',
//     transactionId: 'TXN_0987654321',
//     user: { name: 'Jane Smith', email: 'jane@example.com' },
//     type: 'subscription',
//     amount: 99,
//     currency: 'INR',
//     status: 'success',
//     createdAt: '2024-02-20T14:45:00Z',
//     paymentMethod: 'card',
//     plan: 'basic',
//     subscriptionId: 'sub_456'
//   },
//   {
//     _id: '3',
//     transactionId: 'TXN_5678901234',
//     user: { name: 'Mike Johnson', email: 'mike@example.com' },
//     type: 'renewal',
//     amount: 499,
//     currency: 'INR',
//     status: 'pending',
//     createdAt: '2024-03-10T09:15:00Z',
//     paymentMethod: 'razorpay',
//     plan: 'pro',
//     subscriptionId: 'sub_789'
//   },
//   {
//     _id: '4',
//     transactionId: 'TXN_4321098765',
//     user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
//     type: 'subscription',
//     amount: 199,
//     currency: 'INR',
//     status: 'failed',
//     createdAt: '2024-03-12T16:20:00Z',
//     paymentMethod: 'card',
//     plan: 'premium'
//   }
// ];

// export default TransactionsPage;


















// client/src/pages/admin/TransactionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  CreditCard, Search, Filter, Download, Calendar, DollarSign,
  CheckCircle, XCircle, Clock, Eye, TrendingUp, TrendingDown,
  Loader2, Receipt, Wallet, Banknote, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const TransactionsPage = () => {
  const { token } = useSelector((state) => state.auth);
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
    pendingTransactions: 0
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.getAllTransactions();
      
      // Handle different response structures
      let transactionsData = [];
      if (response && response.transactions) {
        transactionsData = response.transactions;
      } else if (response && response.data) {
        transactionsData = Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response)) {
        transactionsData = response;
      } else if (response && typeof response === 'object') {
        transactionsData = response.transactions || response.data || [];
      }
      
      // Ensure transactionsData is an array
      const transactionsArray = Array.isArray(transactionsData) ? transactionsData : [];
      setTransactions(transactionsArray);
      
      // Calculate stats
      const totalRevenue = transactionsArray.reduce((sum, t) => {
        if (t.status === 'success' || t.status === 'active') {
          return sum + (t.amount || 0);
        }
        return sum;
      }, 0);
      
      const successfulTransactions = transactionsArray.filter(t => t.status === 'success' || t.status === 'active').length;
      const failedTransactions = transactionsArray.filter(t => t.status === 'failed' || t.status === 'cancelled' || t.status === 'expired').length;
      const pendingTransactions = transactionsArray.filter(t => t.status === 'pending').length;
      
      setStats({
        totalRevenue,
        totalTransactions: transactionsArray.length,
        successfulTransactions,
        failedTransactions,
        pendingTransactions
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error(error.response?.data?.message || 'Error fetching transactions');
      setTransactions([]);
      setStats({
        totalRevenue: 0,
        totalTransactions: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        pendingTransactions: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      success: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Success' },
      active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Success' },
      failed: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Failed' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Failed' },
      expired: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Expired' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
      refunded: { color: 'bg-gray-100 text-gray-700', icon: RefreshCw, text: 'Refunded' }
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

  const getTypeBadge = (type) => {
    const types = {
      subscription: { color: 'bg-blue-100 text-blue-700', icon: CreditCard, text: 'Subscription' },
      renewal: { color: 'bg-purple-100 text-purple-700', icon: RefreshCw, text: 'Renewal' },
      refund: { color: 'bg-orange-100 text-orange-700', icon: TrendingDown, text: 'Refund' },
      upgrade: { color: 'bg-green-100 text-green-700', icon: TrendingUp, text: 'Upgrade' },
      downgrade: { color: 'bg-yellow-100 text-yellow-700', icon: TrendingDown, text: 'Downgrade' }
    };
    const badge = types[type] || types.subscription;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.text}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'User', 'Email', 'Type', 'Amount', 'Status', 'Date', 'Payment Method'];
    const csvData = filteredTransactions.map(t => [
      t.transactionId || t._id,
      t.user?.name || 'N/A',
      t.user?.email || 'N/A',
      t.type || 'subscription',
      `${t.currency || 'INR'} ${t.amount || 0}`,
      t.status,
      formatDate(t.createdAt),
      t.paymentMethod || 'N/A'
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Export started');
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount || 0);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-500">View and manage all payment transactions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchTransactions}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</span>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="h-5 w-5 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</span>
          </div>
          <p className="text-sm text-gray-500">Total Transactions</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.successfulTransactions}</span>
          </div>
          <p className="text-sm text-gray-500">Successful</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.failedTransactions}</span>
          </div>
          <p className="text-sm text-gray-500">Failed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID, user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-full md:w-40"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field w-full md:w-40"
          >
            <option value="all">All Types</option>
            <option value="subscription">Subscription</option>
            <option value="renewal">Renewal</option>
            <option value="refund">Refund</option>
            <option value="upgrade">Upgrade</option>
            <option value="downgrade">Downgrade</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <motion.tr
                  key={transaction._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <code className="text-xs font-mono text-gray-600">
                      {transaction.transactionId?.slice(0, 12)}...
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.user?.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{transaction.user?.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getTypeBadge(transaction.type)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                      {transaction.paymentMethod === 'razorpay' && <Wallet className="h-4 w-4" />}
                      {transaction.paymentMethod === 'card' && <CreditCard className="h-4 w-4" />}
                      {transaction.paymentMethod === 'bank' && <Banknote className="h-4 w-4" />}
                      {transaction.paymentMethod || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedTransaction(transaction);
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
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Transaction Header */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <code className="text-sm font-mono text-gray-900">{selectedTransaction.transactionId || selectedTransaction._id}</code>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(selectedTransaction.createdAt)}</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    {getStatusBadge(selectedTransaction.status)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    {getTypeBadge(selectedTransaction.type)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.paymentMethod || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">{selectedTransaction.user?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedTransaction.user?.email || 'N/A'}</p>
                  {selectedTransaction.user?.phone && (
                    <p className="text-sm text-gray-500 mt-1">{selectedTransaction.user.phone}</p>
                  )}
                </div>
              </div>

              {/* Subscription Details */}
              {selectedTransaction.subscriptionId && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Subscription Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900">Subscription ID: {selectedTransaction.subscriptionId}</p>
                    {selectedTransaction.plan && (
                      <p className="text-sm text-gray-600 mt-1">Plan: {selectedTransaction.plan}</p>
                    )}
                    {selectedTransaction.billingCycle && (
                      <p className="text-sm text-gray-600 mt-1">Billing Cycle: {selectedTransaction.billingCycle}</p>
                    )}
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

export default TransactionsPage;