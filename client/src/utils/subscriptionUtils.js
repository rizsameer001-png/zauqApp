// client/src/utils/subscriptionUtils.js

// Format price for display
export const formatPrice = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Calculate savings percentage
export const calculateSavings = (monthlyPrice, yearlyPrice) => {
  const yearlyMonthlyEquivalent = yearlyPrice / 12;
  const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
  return Math.round(savings);
};

// Get plan color based on plan name
export const getPlanColor = (planName) => {
  const colors = {
    free: 'from-gray-500 to-gray-600',
    basic: 'from-blue-600 to-blue-700',
    premium: 'from-primary-600 to-primary-700',
    pro: 'from-purple-600 to-purple-700'
  };
  return colors[planName?.toLowerCase()] || 'from-primary-600 to-primary-700';
};

// Get plan icon name
export const getPlanIcon = (planName) => {
  const icons = {
    free: 'Sparkles',
    basic: 'BookOpen',
    premium: 'Crown',
    pro: 'Zap'
  };
  return icons[planName?.toLowerCase()] || 'Star';
};

// Check if subscription is active
export const isSubscriptionActive = (subscription) => {
  if (!subscription) return false;
  return subscription.status === 'active' && 
         (!subscription.expiresAt || new Date(subscription.expiresAt) > new Date());
};

// Get days remaining in subscription
export const getDaysRemaining = (expiresAt) => {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Format subscription status for display
export const formatSubscriptionStatus = (status) => {
  const statusMap = {
    active: { text: 'Active', color: 'green', icon: 'CheckCircle' },
    pending: { text: 'Pending', color: 'yellow', icon: 'Clock' },
    cancelled: { text: 'Cancelled', color: 'red', icon: 'XCircle' },
    expired: { text: 'Expired', color: 'gray', icon: 'AlertCircle' }
  };
  return statusMap[status] || { text: status, color: 'gray', icon: 'AlertCircle' };
};

// Validate coupon code format
export const isValidCouponCode = (code) => {
  const couponRegex = /^[A-Z0-9]{6,12}$/i;
  return couponRegex.test(code);
};

// Calculate discounted price
export const calculateDiscountedPrice = (originalPrice, discountType, discountValue) => {
  if (discountType === 'percentage') {
    return originalPrice - (originalPrice * discountValue / 100);
  } else if (discountType === 'fixed') {
    return Math.max(0, originalPrice - discountValue);
  }
  return originalPrice;
};

// Get billing cycle display name
export const getBillingCycleDisplay = (cycle) => {
  const cycles = {
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly'
  };
  return cycles[cycle] || cycle;
};

// Get payment method display name
export const getPaymentMethodDisplay = (method) => {
  const methods = {
    razorpay: 'Razorpay',
    stripe: 'Stripe',
    card: 'Credit/Debit Card',
    upi: 'UPI',
    netbanking: 'Net Banking',
    free: 'Free'
  };
  return methods[method] || method;
};