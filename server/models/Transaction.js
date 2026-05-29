// server/models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  type: {
    type: String,
    enum: ['subscription', 'renewal', 'refund', 'upgrade', 'downgrade'],
    default: 'subscription'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'stripe', 'card', 'bank', 'free'],
    default: 'razorpay'
  },
  paymentDetails: {
    paymentId: String,
    orderId: String,
    signature: String,
    gatewayResponse: mongoose.Schema.Types.Mixed
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'pro']
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for better query performance
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ status: 1, createdAt: -1 });
transactionSchema.index({ type: 1, createdAt: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;