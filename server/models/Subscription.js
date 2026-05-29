//server/models/Subscription.js
// import mongoose from 'mongoose';

// const subscriptionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   plan: {
//     type: String,
//     enum: ['free', 'basic', 'premium', 'pro'],
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['active', 'cancelled', 'expired', 'pending'],
//     default: 'active'
//   },
//   price: {
//     amount: Number,
//     currency: { type: String, default: 'INR' }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   expiresAt: {
//     type: Date,
//     required: true
//   },
//   cancelledAt: Date,
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'upi', 'netbanking', 'wallet', 'free']
//   },
//   paymentId: String,
//   features: [String],
//   autoRenew: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// subscriptionSchema.index({ user: 1, status: 1 });
// subscriptionSchema.index({ expiresAt: 1, status: 1 });

// const Subscription = mongoose.model('Subscription', subscriptionSchema);
// export default Subscription;










// import mongoose from 'mongoose';

// const planSchema = new mongoose.Schema({
//   planId: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true,
//     enum: ['Free', 'Basic', 'Premium', 'Pro']
//   },
//   displayName: {
//     type: String,
//     required: true
//   },
//   description: String,
//   price: {
//     amount: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     currency: {
//       type: String,
//       default: 'INR'
//     }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   features: [{
//     name: String,
//     included: Boolean,
//     limit: Number
//   }],
//   limits: {
//     poemsPerDay: { type: Number, default: null },
//     ebooksPerMonth: { type: Number, default: null },
//     audiobooksPerMonth: { type: Number, default: null },
//     unlimited: { type: Boolean, default: false },
//     creator: { type: Boolean, default: false }
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   displayOrder: {
//     type: Number,
//     default: 0
//   },
//   badgeText: String,
//   recommended: {
//     type: Boolean,
//     default: false
//   },
//   metadata: {
//     type: Map,
//     of: String
//   }
// }, {
//   timestamps: true
// });

// const userSubscriptionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   plan: {
//     type: String,
//     required: true
//   },
//   planDetails: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'SubscriptionPlan'
//   },
//   status: {
//     type: String,
//     enum: ['active', 'cancelled', 'expired', 'pending'],
//     default: 'active'
//   },
//   price: {
//     amount: Number,
//     currency: { type: String, default: 'INR' }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   expiresAt: {
//     type: Date,
//     required: true
//   },
//   cancelledAt: Date,
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'upi', 'netbanking', 'wallet', 'free']
//   },
//   paymentId: String,
//   autoRenew: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// userSubscriptionSchema.index({ user: 1, status: 1 });
// userSubscriptionSchema.index({ expiresAt: 1, status: 1 });

// const SubscriptionPlan = mongoose.model('SubscriptionPlan', planSchema);
// const UserSubscription = mongoose.model('UserSubscription', userSubscriptionSchema);

// export { SubscriptionPlan, UserSubscription };












//server/models/Subscription.js


// import mongoose from 'mongoose';

// // New schema for subscription plans (for CMS management)
// const subscriptionPlanSchema = new mongoose.Schema({
//   planId: {
//     type: String,
//     unique: true,
//     required: true,
//     enum: ['free', 'basic', 'premium', 'pro']
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   displayName: {
//     type: String,
//     required: true
//   },
//   description: String,
//   price: {
//     amount: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     currency: {
//       type: String,
//       default: 'INR'
//     }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   features: [{
//     name: String,
//     included: { type: Boolean, default: true },
//     limit: Number
//   }],
//   limits: {
//     poemsPerDay: { type: Number, default: null },
//     ebooksPerMonth: { type: Number, default: null },
//     audiobooksPerMonth: { type: Number, default: null },
//     unlimited: { type: Boolean, default: false },
//     creator: { type: Boolean, default: false }
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   displayOrder: {
//     type: Number,
//     default: 0
//   },
//   badgeText: String,
//   recommended: {
//     type: Boolean,
//     default: false
//   },
//   metadata: {
//     type: Map,
//     of: String
//   }
// }, {
//   timestamps: true
// });

// // Original subscription schema (renamed for user subscriptions)
// const userSubscriptionSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   plan: {
//     type: String,
//     enum: ['free', 'basic', 'premium', 'pro'],
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['active', 'cancelled', 'expired', 'pending'],
//     default: 'active'
//   },
//   price: {
//     amount: Number,
//     currency: { type: String, default: 'INR' }
//   },
//   billingCycle: {
//     type: String,
//     enum: ['monthly', 'quarterly', 'yearly'],
//     default: 'monthly'
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   expiresAt: {
//     type: Date,
//     required: true
//   },
//   cancelledAt: Date,
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'upi', 'netbanking', 'wallet', 'free']
//   },
//   paymentId: String,
//   features: [String],
//   autoRenew: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// userSubscriptionSchema.index({ user: 1, status: 1 });
// userSubscriptionSchema.index({ expiresAt: 1, status: 1 });

// const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
// const Subscription = mongoose.model('Subscription', userSubscriptionSchema);

// export { SubscriptionPlan, Subscription };
// export default Subscription;








import mongoose from 'mongoose';

// New schema for subscription plans (for CMS management)
const subscriptionPlanSchema = new mongoose.Schema({
  planId: {
    type: String,
    unique: true,
    required: true,
    enum: ['free', 'basic', 'premium', 'pro']
  },
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: 'monthly'
  },
  features: [{
    name: {
      type: String,
      required: true
    },
    included: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: null
    }
  }],
  limits: {
    poemsPerDay: {
      type: Number,
      default: null
    },
    ebooksPerMonth: {
      type: Number,
      default: null
    },
    audiobooksPerMonth: {
      type: Number,
      default: null
    },
    unlimited: {
      type: Boolean,
      default: false
    },
    creator: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  badgeText: {
    type: String,
    default: ''
  },
  recommended: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Map,
    of: String,
    default: new Map()
  }
}, {
  timestamps: true
});

// Original subscription schema for user subscriptions
const userSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'pro'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'pending'],
    default: 'active'
  },
  price: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: 'monthly'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'free'],
    default: null
  },
  paymentId: {
    type: String,
    default: null
  },
  features: [{
    type: String
  }],
  autoRenew: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
userSubscriptionSchema.index({ user: 1, status: 1 });
userSubscriptionSchema.index({ expiresAt: 1, status: 1 });
userSubscriptionSchema.index({ plan: 1, status: 1 });
userSubscriptionSchema.index({ user: 1, createdAt: -1 });

// Virtual for checking if subscription is expired
userSubscriptionSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

// Virtual for checking remaining days
userSubscriptionSchema.virtual('daysRemaining').get(function() {
  if (!this.expiresAt) return 0;
  const diff = this.expiresAt - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Ensure virtuals are included in JSON output
userSubscriptionSchema.set('toJSON', { virtuals: true });
userSubscriptionSchema.set('toObject', { virtuals: true });

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
const Subscription = mongoose.model('Subscription', userSubscriptionSchema);

export { SubscriptionPlan, Subscription };
export default Subscription;