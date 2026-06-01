// // client/src/pages/user/UserBillingPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { CreditCard, Download, Loader2 } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';

// const UserBillingPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const fetchInvoices = async () => {
//     setLoading(true);
//     try {
//       const history = await subscriptionAPI.getBillingHistory();
//       setInvoices(history.data || history);
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//       toast.error('Failed to load billing data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
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
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
//         <p className="text-gray-500">View your payment history and download invoices</p>
//       </div>

//       {/* Payment Methods */}
//       <div className="card p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
//         <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//           <div className="flex items-center gap-3">
//             <CreditCard className="h-6 w-6 text-gray-400" />
//             <div>
//               <p className="font-medium text-gray-900">No payment method saved</p>
//               <p className="text-sm text-gray-500">Add a payment method for faster checkout</p>
//             </div>
//           </div>
//           <button className="btn-secondary">Add Payment Method</button>
//         </div>
//       </div>

//       {/* Billing History */}
//       {invoices.length > 0 && (
//         <div className="card overflow-hidden">
//           <h2 className="text-lg font-semibold text-gray-900 p-6 pb-0">Billing History</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {invoices.map((invoice) => (
//                   <tr key={invoice._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.createdAt)}</td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-gray-900 capitalize">{invoice.plan} Plan</span>
//                       <span className="text-xs text-gray-500 ml-2">({invoice.billingCycle})</span>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       {invoice.price?.currency} {invoice.price?.amount}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
//                         Paid
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
//                         <Download className="h-4 w-4" />
//                         <span className="text-sm">PDF</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserBillingPage;












// // client/src/pages/user/UserBillingPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   CreditCard, Download, Loader2, Plus, Trash2, Star, 
//   Calendar, DollarSign, CheckCircle, AlertCircle, 
//   FileText, ExternalLink, X, Wallet, Lock
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../../api/subscriptionAPI';

// const UserBillingPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [invoices, setInvoices] = useState([]);
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
//   const [newPaymentMethod, setNewPaymentMethod] = useState({
//     cardNumber: '',
//     cardHolder: '',
//     expiryMonth: '',
//     expiryYear: '',
//     cvv: ''
//   });
//   const [isAddingPayment, setIsAddingPayment] = useState(false);
//   const [downloadingInvoice, setDownloadingInvoice] = useState(null);

//   useEffect(() => {
//     fetchBillingData();
//   }, []);

//   const fetchBillingData = async () => {
//     setLoading(true);
//     try {
//       const [history, methods] = await Promise.all([
//         subscriptionAPI.getBillingHistory(),
//         subscriptionAPI.getPaymentMethods().catch(() => [])
//       ]);
//       setInvoices(history.data || history || []);
//       setPaymentMethods(methods.data || methods || []);
//     } catch (error) {
//       console.error('Error fetching billing data:', error);
//       toast.error('Failed to load billing data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Handle invoice download
//   const handleDownloadInvoice = async (invoiceId) => {
//     setDownloadingInvoice(invoiceId);
//     try {
//       const blob = await subscriptionAPI.downloadInvoice(invoiceId);
      
//       // Create download link
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice_${invoiceId}.pdf`);
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

//   // Handle add payment method
//   const handleAddPaymentMethod = async () => {
//     // Validate form
//     if (!newPaymentMethod.cardNumber || newPaymentMethod.cardNumber.replace(/\s/g, '').length < 16) {
//       toast.error('Please enter a valid card number');
//       return;
//     }
//     if (!newPaymentMethod.cardHolder) {
//       toast.error('Please enter card holder name');
//       return;
//     }
//     if (!newPaymentMethod.expiryMonth || !newPaymentMethod.expiryYear) {
//       toast.error('Please enter expiry date');
//       return;
//     }
//     if (!newPaymentMethod.cvv || newPaymentMethod.cvv.length < 3) {
//       toast.error('Please enter a valid CVV');
//       return;
//     }

//     setIsAddingPayment(true);
//     try {
//       // Format expiry date
//       const expiryDate = `${newPaymentMethod.expiryMonth}/${newPaymentMethod.expiryYear}`;
      
//       const response = await subscriptionAPI.addPaymentMethod({
//         cardNumber: newPaymentMethod.cardNumber.replace(/\s/g, ''),
//         cardHolder: newPaymentMethod.cardHolder,
//         expiryDate: expiryDate,
//         cvv: newPaymentMethod.cvv
//       });
      
//       toast.success('Payment method added successfully');
//       setShowAddPaymentModal(false);
//       setNewPaymentMethod({
//         cardNumber: '',
//         cardHolder: '',
//         expiryMonth: '',
//         expiryYear: '',
//         cvv: ''
//       });
      
//       // Refresh payment methods
//       const methods = await subscriptionAPI.getPaymentMethods();
//       setPaymentMethods(methods.data || methods || []);
//     } catch (error) {
//       console.error('Error adding payment method:', error);
//       toast.error(error.response?.data?.message || 'Failed to add payment method');
//     } finally {
//       setIsAddingPayment(false);
//     }
//   };

//   // Handle remove payment method
//   const handleRemovePaymentMethod = async (methodId) => {
//     if (!window.confirm('Are you sure you want to remove this payment method?')) {
//       return;
//     }
    
//     try {
//       await subscriptionAPI.removePaymentMethod(methodId);
//       toast.success('Payment method removed successfully');
//       setPaymentMethods(paymentMethods.filter(m => m._id !== methodId));
//     } catch (error) {
//       console.error('Error removing payment method:', error);
//       toast.error(error.response?.data?.message || 'Failed to remove payment method');
//     }
//   };

//   // Handle set default payment method
//   const handleSetDefault = async (methodId) => {
//     try {
//       await subscriptionAPI.setDefaultPaymentMethod(methodId);
//       toast.success('Default payment method updated');
//       setPaymentMethods(paymentMethods.map(m => ({
//         ...m,
//         isDefault: m._id === methodId
//       })));
//     } catch (error) {
//       console.error('Error setting default payment method:', error);
//       toast.error(error.response?.data?.message || 'Failed to update default method');
//     }
//   };

//   // Format card number for display
//   const formatCardNumber = (cardNumber) => {
//     const last4 = cardNumber.slice(-4);
//     return `•••• •••• •••• ${last4}`;
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
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
//         <p className="text-gray-500">Manage your payment methods and view billing history</p>
//       </motion.div>

//       {/* Current Subscription Summary */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200"
//       >
//         <div className="flex items-start justify-between flex-wrap gap-4">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Star className="h-5 w-5 text-primary-600 fill-primary-600" />
//               <span className="text-sm font-medium text-primary-700 uppercase">Active Plan</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 capitalize">
//               {user?.subscription?.plan || 'Free'} Plan
//             </h2>
//             {user?.subscription?.expiresAt && (
//               <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
//                 <Calendar className="h-4 w-4" />
//                 Renews on {formatDate(user.subscription.expiresAt)}
//               </p>
//             )}
//           </div>
//           <button className="btn-primary">
//             Manage Subscription
//           </button>
//         </div>
//       </motion.div>

//       {/* Payment Methods Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="card p-6"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
//           <button
//             onClick={() => setShowAddPaymentModal(true)}
//             className="btn-secondary flex items-center gap-2"
//           >
//             <Plus className="h-4 w-4" />
//             Add Payment Method
//           </button>
//         </div>

//         {paymentMethods.length === 0 ? (
//           <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//             <div className="flex items-center gap-3">
//               <CreditCard className="h-6 w-6 text-gray-400" />
//               <div>
//                 <p className="font-medium text-gray-900">No payment method saved</p>
//                 <p className="text-sm text-gray-500">Add a payment method for faster checkout</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {paymentMethods.map((method) => (
//               <div
//                 key={method._id}
//                 className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
//                   method.isDefault ? 'border-primary-300 bg-primary-50/30' : 'border-gray-200'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
//                     <CreditCard className="h-4 w-4 text-white" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="font-medium text-gray-900">
//                         {formatCardNumber(method.cardNumber)}
//                       </p>
//                       {method.isDefault && (
//                         <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       Expires {method.expiryMonth}/{method.expiryYear} • {method.cardHolder}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {!method.isDefault && (
//                     <button
//                       onClick={() => handleSetDefault(method._id)}
//                       className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
//                     >
//                       Set as Default
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleRemovePaymentMethod(method._id)}
//                     className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       {/* Billing History Section */}
//       {invoices.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="card overflow-hidden"
//         >
//           <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3">Billing History</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {invoices.map((invoice) => (
//                   <tr key={invoice._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.createdAt)}</td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-gray-900 capitalize">{invoice.plan} Plan</span>
//                       <span className="text-xs text-gray-500 ml-2">({invoice.billingCycle || 'Monthly'})</span>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       {formatCurrency(invoice.price?.amount || invoice.amount, invoice.price?.currency || 'INR')}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                         invoice.status === 'paid' || invoice.status === 'Paid'
//                           ? 'bg-green-100 text-green-700'
//                           : invoice.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-red-100 text-red-700'
//                       }`}>
//                         {invoice.status || 'Paid'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleDownloadInvoice(invoice._id)}
//                         disabled={downloadingInvoice === invoice._id}
//                         className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 disabled:opacity-50"
//                       >
//                         {downloadingInvoice === invoice._id ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Download className="h-4 w-4" />
//                         )}
//                         <span className="text-sm">PDF</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* Add Payment Method Modal */}
//       <AnimatePresence>
//         {showAddPaymentModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full"
//             >
//               <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
//                 <button
//                   onClick={() => setShowAddPaymentModal(false)}
//                   className="p-2 rounded-lg hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 {/* Card Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Card Number <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="1234 5678 9012 3456"
//                       value={newPaymentMethod.cardNumber}
//                       onChange={(e) => {
//                         let value = e.target.value.replace(/\s/g, '');
//                         if (value.length > 16) value = value.slice(0, 16);
//                         value = value.replace(/(\d{4})/g, '$1 ').trim();
//                         setNewPaymentMethod(prev => ({ ...prev, cardNumber: value }));
//                       }}
//                       className="input-field pl-10"
//                       maxLength={19}
//                     />
//                   </div>
//                 </div>

//                 {/* Card Holder Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Card Holder Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="JOHN DOE"
//                     value={newPaymentMethod.cardHolder}
//                     onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cardHolder: e.target.value.toUpperCase() }))}
//                     className="input-field"
//                   />
//                 </div>

//                 {/* Expiry Date and CVV */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Expiry Date <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="MM"
//                         value={newPaymentMethod.expiryMonth}
//                         onChange={(e) => {
//                           let value = e.target.value.replace(/\D/g, '');
//                           if (value > 12) value = '12';
//                           if (value.length > 2) value = value.slice(0, 2);
//                           setNewPaymentMethod(prev => ({ ...prev, expiryMonth: value }));
//                         }}
//                         className="input-field w-20 text-center"
//                         maxLength={2}
//                       />
//                       <span className="text-gray-400 text-lg">/</span>
//                       <input
//                         type="text"
//                         placeholder="YY"
//                         value={newPaymentMethod.expiryYear}
//                         onChange={(e) => {
//                           let value = e.target.value.replace(/\D/g, '');
//                           if (value.length > 2) value = value.slice(0, 2);
//                           setNewPaymentMethod(prev => ({ ...prev, expiryYear: value }));
//                         }}
//                         className="input-field w-20 text-center"
//                         maxLength={2}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       CVV <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="123"
//                       value={newPaymentMethod.cvv}
//                       onChange={(e) => {
//                         let value = e.target.value.replace(/\D/g, '');
//                         if (value.length > 4) value = value.slice(0, 4);
//                         setNewPaymentMethod(prev => ({ ...prev, cvv: value }));
//                       }}
//                       className="input-field"
//                       maxLength={4}
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 flex items-start gap-2">
//                   <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
//                   <p>Your payment information is encrypted and secure. We never store full card details.</p>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
//                 <button
//                   onClick={() => setShowAddPaymentModal(false)}
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddPaymentMethod}
//                   disabled={isAddingPayment}
//                   className="btn-primary flex items-center gap-2"
//                 >
//                   {isAddingPayment ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Plus className="h-4 w-4" />
//                   )}
//                   Add Card
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserBillingPage;
















// client/src/pages/user/UserBillingPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Download, Loader2, Plus, Trash2, Star, 
  Calendar, DollarSign, CheckCircle, AlertCircle, 
  FileText, ExternalLink, X, Wallet, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const UserBillingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);
  const [manageSubscriptionLoading, setManageSubscriptionLoading] = useState(false);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    setLoading(true);
    try {
      const [history, methods] = await Promise.all([
        subscriptionAPI.getBillingHistory(),
        subscriptionAPI.getPaymentMethods().catch(() => ({ data: [] }))
      ]);
      setInvoices(history.data || history || []);
      setPaymentMethods(methods.data || methods || []);
    } catch (error) {
      console.error('Error fetching billing data:', error);
      toast.error('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle invoice download
  const handleDownloadInvoice = async (invoiceId) => {
    setDownloadingInvoice(invoiceId);
    try {
      const blob = await subscriptionAPI.downloadInvoice(invoiceId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${invoiceId}.pdf`);
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

  // Handle manage subscription
  const handleManageSubscription = async () => {
    setManageSubscriptionLoading(true);
    try {
      // Navigate to subscription page or open modal
      window.location.href = '/subscription';
    } catch (error) {
      console.error('Error managing subscription:', error);
      toast.error('Failed to load subscription management');
    } finally {
      setManageSubscriptionLoading(false);
    }
  };

  // Handle add payment method - FIXED FORMAT
  const handleAddPaymentMethod = async () => {
    // Validate form
    const cleanCardNumber = newPaymentMethod.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      toast.error('Please enter a valid card number (13-19 digits)');
      return;
    }
    if (!newPaymentMethod.cardHolder) {
      toast.error('Please enter card holder name');
      return;
    }
    if (!newPaymentMethod.expiryMonth || !newPaymentMethod.expiryYear) {
      toast.error('Please enter expiry date');
      return;
    }
    const expiryMonthNum = parseInt(newPaymentMethod.expiryMonth);
    const expiryYearNum = parseInt(newPaymentMethod.expiryYear);
    if (expiryMonthNum < 1 || expiryMonthNum > 12) {
      toast.error('Invalid expiry month');
      return;
    }
    const currentYear = new Date().getFullYear() % 100;
    if (expiryYearNum < currentYear || expiryYearNum > currentYear + 20) {
      toast.error('Invalid expiry year');
      return;
    }
    if (!newPaymentMethod.cvv || newPaymentMethod.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    setIsAddingPayment(true);
    try {
      // Format data as expected by backend
      const paymentData = {
        cardNumber: cleanCardNumber,
        cardHolder: newPaymentMethod.cardHolder.toUpperCase(),
        expiryMonth: newPaymentMethod.expiryMonth.padStart(2, '0'),
        expiryYear: newPaymentMethod.expiryYear,
        cvv: newPaymentMethod.cvv
      };
      
      const response = await subscriptionAPI.addPaymentMethod(paymentData);
      
      if (response.success) {
        toast.success('Payment method added successfully');
        setShowAddPaymentModal(false);
        setNewPaymentMethod({
          cardNumber: '',
          cardHolder: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: ''
        });
        
        // Refresh payment methods
        const methods = await subscriptionAPI.getPaymentMethods();
        setPaymentMethods(methods.data || methods || []);
      } else {
        toast.error(response.message || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add payment method');
    } finally {
      setIsAddingPayment(false);
    }
  };

  // Handle remove payment method
  const handleRemovePaymentMethod = async (methodId) => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) {
      return;
    }
    
    try {
      await subscriptionAPI.removePaymentMethod(methodId);
      toast.success('Payment method removed successfully');
      setPaymentMethods(paymentMethods.filter(m => m._id !== methodId));
    } catch (error) {
      console.error('Error removing payment method:', error);
      toast.error(error.response?.data?.message || 'Failed to remove payment method');
    }
  };

  // Handle set default payment method
  const handleSetDefault = async (methodId) => {
    try {
      await subscriptionAPI.setDefaultPaymentMethod(methodId);
      toast.success('Default payment method updated');
      setPaymentMethods(paymentMethods.map(m => ({
        ...m,
        isDefault: m._id === methodId
      })));
    } catch (error) {
      console.error('Error setting default payment method:', error);
      toast.error(error.response?.data?.message || 'Failed to update default method');
    }
  };

  // Format card number for display
  const formatCardNumber = (cardNumber) => {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-gray-500">Manage your payment methods and view billing history</p>
      </motion.div>

      {/* Current Subscription Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-primary-600 fill-primary-600" />
              <span className="text-sm font-medium text-primary-700 uppercase">Active Plan</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {user?.subscription?.plan || 'Free'} Plan
            </h2>
            {user?.subscription?.expiresAt && (
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Renews on {formatDate(user.subscription.expiresAt)}
              </p>
            )}
          </div>
          <button 
            onClick={handleManageSubscription}
            disabled={manageSubscriptionLoading}
            className="btn-primary flex items-center gap-2"
          >
            {manageSubscriptionLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Star className="h-4 w-4" />
            )}
            Manage Subscription
          </button>
        </div>
      </motion.div>

      {/* Payment Methods Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <button
            onClick={() => setShowAddPaymentModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </button>
        </div>

        {paymentMethods.length === 0 ? (
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">No payment method saved</p>
                <p className="text-sm text-gray-500">Add a payment method for faster checkout</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method._id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                  method.isDefault ? 'border-primary-300 bg-primary-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {formatCardNumber(method.cardNumber)}
                      </p>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear} • {method.cardHolder}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method._id)}
                      className="px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleRemovePaymentMethod(method._id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Billing History Section */}
      {invoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card overflow-hidden"
        >
          <h2 className="text-lg font-semibold text-gray-900 p-6 pb-3">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 capitalize">{invoice.plan} Plan</span>
                      <span className="text-xs text-gray-500 ml-2">({invoice.billingCycle || 'Monthly'})</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.price?.amount || invoice.amount, invoice.price?.currency || 'INR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        invoice.status === 'paid' || invoice.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {invoice.status || 'Paid'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDownloadInvoice(invoice._id)}
                        disabled={downloadingInvoice === invoice._id}
                        className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 disabled:opacity-50"
                      >
                        {downloadingInvoice === invoice._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span className="text-sm">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full"
            >
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={newPaymentMethod.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, '');
                        if (value.length > 16) value = value.slice(0, 16);
                        value = value.replace(/(\d{4})/g, '$1 ').trim();
                        setNewPaymentMethod(prev => ({ ...prev, cardNumber: value }));
                      }}
                      className="input-field pl-10"
                      maxLength={19}
                    />
                  </div>
                </div>

                {/* Card Holder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="JOHN DOE"
                    value={newPaymentMethod.cardHolder}
                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cardHolder: e.target.value.toUpperCase() }))}
                    className="input-field"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="MM"
                        value={newPaymentMethod.expiryMonth}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value > 12) value = '12';
                          if (value.length > 2) value = value.slice(0, 2);
                          setNewPaymentMethod(prev => ({ ...prev, expiryMonth: value }));
                        }}
                        className="input-field w-20 text-center"
                        maxLength={2}
                      />
                      <span className="text-gray-400 text-lg">/</span>
                      <input
                        type="text"
                        placeholder="YY"
                        value={newPaymentMethod.expiryYear}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 2) value = value.slice(0, 2);
                          setNewPaymentMethod(prev => ({ ...prev, expiryYear: value }));
                        }}
                        className="input-field w-20 text-center"
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      value={newPaymentMethod.cvv}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 4) value = value.slice(0, 4);
                        setNewPaymentMethod(prev => ({ ...prev, cvv: value }));
                      }}
                      className="input-field"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 flex items-start gap-2">
                  <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>Your payment information is encrypted and secure. We never store full card details.</p>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPaymentMethod}
                  disabled={isAddingPayment}
                  className="btn-primary flex items-center gap-2"
                >
                  {isAddingPayment ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Add Card
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserBillingPage;