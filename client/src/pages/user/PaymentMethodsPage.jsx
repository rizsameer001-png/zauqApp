// client/src/pages/user/PaymentMethodsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Plus, Trash2, Star, Loader2, 
  X, Lock, Calendar, CheckCircle, AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.getPaymentMethods();
      setPaymentMethods(response.data || response || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (cardNumber) => {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  const handleAddPaymentMethod = async () => {
    // Validate form
    const cardNumberClean = newPaymentMethod.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length < 16) {
      toast.error('Please enter a valid card number');
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
    if (!newPaymentMethod.cvv || newPaymentMethod.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    setIsAdding(true);
    try {
      const expiryDate = `${newPaymentMethod.expiryMonth}/${newPaymentMethod.expiryYear}`;
      
      await subscriptionAPI.addPaymentMethod({
        cardNumber: cardNumberClean,
        cardHolder: newPaymentMethod.cardHolder,
        expiryDate: expiryDate,
        cvv: newPaymentMethod.cvv
      });
      
      toast.success('Payment method added successfully');
      setShowAddModal(false);
      setNewPaymentMethod({
        cardNumber: '',
        cardHolder: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      });
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error adding payment method:', error);
      toast.error(error.response?.data?.message || 'Failed to add payment method');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemovePaymentMethod = async (methodId) => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) {
      return;
    }
    
    try {
      await subscriptionAPI.removePaymentMethod(methodId);
      toast.success('Payment method removed successfully');
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error removing payment method:', error);
      toast.error(error.response?.data?.message || 'Failed to remove payment method');
    }
  };

  const handleSetDefault = async (methodId) => {
    try {
      await subscriptionAPI.setDefaultPaymentMethod(methodId);
      toast.success('Default payment method updated');
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      toast.error(error.response?.data?.message || 'Failed to update default method');
    }
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
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h1>
          <p className="text-gray-500">Manage your saved payment methods</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Payment Method
        </button>
      </motion.div>

      {/* Payment Methods List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {paymentMethods.length === 0 ? (
          <div className="card p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No payment methods</h3>
            <p className="text-gray-500 mb-4">Add a payment method to make faster purchases</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Payment Method
            </button>
          </div>
        ) : (
          paymentMethods.map((method, index) => (
            <motion.div
              key={method._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 bg-white dark:bg-dark-900 rounded-xl border transition-all ${
                method.isDefault ? 'border-primary-300 bg-primary-50/30' : 'border-gray-200 dark:border-dark-800'
              }`}
            >
              <div className="flex items-center gap-4">
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
                    Expires {method.expiryDate} • {method.cardHolder}
                  </p>
                  {method.lastUsed && (
                    <p className="text-xs text-gray-400 mt-1">
                      Last used: {new Date(method.lastUsed).toLocaleDateString()}
                    </p>
                  )}
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
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 rounded-lg p-4 flex items-start gap-3"
      >
        <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">Secure Payment Information</p>
          <p className="text-sm text-blue-600 mt-1">
            Your payment methods are encrypted and secure. We use industry-standard 
            encryption to protect your financial information.
          </p>
        </div>
      </motion.div>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-900 rounded-xl max-w-md w-full"
            >
              <div className="border-b border-gray-200 dark:border-dark-800 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Payment Method</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-start gap-2">
                  <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your payment information is encrypted and secure. We never store full card details.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-dark-800 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPaymentMethod}
                  disabled={isAdding}
                  className="btn-primary flex items-center gap-2"
                >
                  {isAdding ? (
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

export default PaymentMethodsPage;