// client/src/pages/user/UserBillingPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CreditCard, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const UserBillingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const history = await subscriptionAPI.getBillingHistory();
      setInvoices(history.data || history);
    } catch (error) {
      console.error('Error fetching invoices:', error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-gray-500">View your payment history and download invoices</p>
      </div>

      {/* Payment Methods */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">No payment method saved</p>
              <p className="text-sm text-gray-500">Add a payment method for faster checkout</p>
            </div>
          </div>
          <button className="btn-secondary">Add Payment Method</button>
        </div>
      </div>

      {/* Billing History */}
      {invoices.length > 0 && (
        <div className="card overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 p-6 pb-0">Billing History</h2>
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
                      <span className="text-xs text-gray-500 ml-2">({invoice.billingCycle})</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invoice.price?.currency} {invoice.price?.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBillingPage;