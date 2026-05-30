// // client/src/utils/paymentHelper.js
// import subscriptionAPI from '../services/subscriptionAPI';

// // Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// // Load Stripe script dynamically
// export const loadStripeScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://js.stripe.com/v3/';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// // Initialize Razorpay payment
// export const initRazorpayPayment = async (plan, billingCycle, onSuccess, onError) => {
//   try {
//     // Load Razorpay script
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Razorpay SDK');
//     }

//     // Create order
//     const response = await subscriptionAPI.createRazorpayOrder(plan, billingCycle);
//     const { orderId, amount, currency, subscriptionId, key } = response.data || response;

//     const options = {
//       key: key || process.env.REACT_APP_RAZORPAY_KEY_ID,
//       amount: amount,
//       currency: currency,
//       name: 'Zauq App',
//       description: `Subscription to ${plan} plan`,
//       order_id: orderId,
//       handler: async (paymentResponse) => {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
//         try {
//           const verifyResponse = await subscriptionAPI.verifyRazorpayPayment(
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             subscriptionId
//           );
          
//           if (verifyResponse.success) {
//             onSuccess(verifyResponse);
//           } else {
//             onError(verifyResponse.message || 'Payment verification failed');
//           }
//         } catch (error) {
//           onError(error.message || 'Payment verification failed');
//         }
//       },
//       prefill: {
//         name: '',
//         email: '',
//         contact: ''
//       },
//       theme: {
//         color: '#7C3AED'
//       },
//       modal: {
//         ondismiss: () => {
//           onError('Payment cancelled by user');
//         }
//       }
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   } catch (error) {
//     console.error('Razorpay initialization error:', error);
//     onError(error.message || 'Failed to initialize payment');
//   }
// };

// // Initialize Stripe payment
// export const initStripePayment = async (plan, billingCycle, onSuccess, onError) => {
//   try {
//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK');
//     }

//     // Create payment intent
//     const response = await subscriptionAPI.createStripePaymentIntent(plan, billingCycle);
//     const { clientSecret, subscriptionId } = response.data || response;

//     const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: {
//           // You would get this from a card element
//         },
//         billing_details: {
//           name: '',
//           email: ''
//         }
//       }
//     });

//     if (result.error) {
//       onError(result.error.message);
//     } else if (result.paymentIntent.status === 'succeeded') {
//       const verifyResponse = await subscriptionAPI.verifyStripePayment(
//         result.paymentIntent.id,
//         subscriptionId
//       );
      
//       if (verifyResponse.success) {
//         onSuccess(verifyResponse);
//       } else {
//         onError(verifyResponse.message || 'Payment verification failed');
//       }
//     }
//   } catch (error) {
//     console.error('Stripe initialization error:', error);
//     onError(error.message || 'Failed to initialize payment');
//   }
// };

// // Payment method selector
// export const processPayment = async (plan, billingCycle, paymentMethod, onSuccess, onError) => {
//   switch (paymentMethod) {
//     case 'razorpay':
//       await initRazorpayPayment(plan, billingCycle, onSuccess, onError);
//       break;
//     case 'stripe':
//       await initStripePayment(plan, billingCycle, onSuccess, onError);
//       break;
//     default:
//       // Use the regular subscribe method
//       try {
//         const response = await subscriptionAPI.subscribe(plan, billingCycle, paymentMethod);
//         if (response.success) {
//           onSuccess(response);
//         } else {
//           onError(response.message || 'Subscription failed');
//         }
//       } catch (error) {
//         onError(error.message || 'Subscription failed');
//       }
//   }
// };
















// client/src/utils/paymentHelper.js
import subscriptionAPI from '../api/subscriptionAPI';

// Check if script is already loaded
let razorpayScriptLoaded = false;
let stripeScriptLoaded = false;
let razorpayPromise = null;
let stripePromise = null;

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (window.Razorpay && razorpayScriptLoaded) {
      resolve(true);
      return;
    }
    
    // If already loading, wait for it
    if (razorpayPromise) {
      razorpayPromise.then(resolve);
      return;
    }
    
    razorpayPromise = new Promise((resolveScript) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        razorpayScriptLoaded = true;
        resolveScript(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        razorpayScriptLoaded = false;
        resolveScript(false);
      };
      document.body.appendChild(script);
    });
    
    razorpayPromise.then(resolve);
  });
};

// Load Stripe script dynamically
export const loadStripeScript = () => {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (window.Stripe && stripeScriptLoaded) {
      resolve(true);
      return;
    }
    
    // If already loading, wait for it
    if (stripePromise) {
      stripePromise.then(resolve);
      return;
    }
    
    stripePromise = new Promise((resolveScript) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        stripeScriptLoaded = true;
        resolveScript(true);
      };
      script.onerror = () => {
        console.error('Failed to load Stripe script');
        stripeScriptLoaded = false;
        resolveScript(false);
      };
      document.body.appendChild(script);
    });
    
    stripePromise.then(resolve);
  });
};

// Get Razorpay key from environment or API
const getRazorpayKey = async () => {
  // Try to get from environment first
  if (process.env.REACT_APP_RAZORPAY_KEY_ID) {
    return process.env.REACT_APP_RAZORPAY_KEY_ID;
  }
  
  // Fallback to API
  try {
    const response = await subscriptionAPI.getRazorpayKey();
    return response.key;
  } catch (error) {
    console.error('Failed to get Razorpay key:', error);
    return 'rzp_test_YourKeyHere'; // Fallback test key
  }
};

// Get Stripe publishable key from environment or API
const getStripeKey = async () => {
  // Try to get from environment first
  if (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
    return process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  }
  
  // Fallback to API
  try {
    const response = await subscriptionAPI.getStripeKey();
    return response.key;
  } catch (error) {
    console.error('Failed to get Stripe key:', error);
    return 'pk_test_YourKeyHere'; // Fallback test key
  }
};

// Initialize Razorpay payment with full options
export const initRazorpayPayment = async (plan, billingCycle, onSuccess, onError, userDetails = {}) => {
  try {
    // Load Razorpay script
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
    }

    // Create order on backend
    const response = await subscriptionAPI.createRazorpayOrder(plan, billingCycle);
    
    // Extract data from response
    const orderData = response.data || response;
    const { 
      orderId, 
      amount, 
      currency, 
      subscriptionId, 
      key: razorpayKey 
    } = orderData;
    
    if (!orderId) {
      throw new Error('Failed to create payment order');
    }

    // Get Razorpay key
    const key = razorpayKey || await getRazorpayKey();

    // Prepare user details for prefill
    const prefill = {
      name: userDetails.name || '',
      email: userDetails.email || '',
      contact: userDetails.phone || ''
    };

    const options = {
      key: key,
      amount: amount,
      currency: currency || 'INR',
      name: 'Zauq App',
      description: `Subscription to ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan (${billingCycle})`,
      order_id: orderId,
      image: '/logo192.png', // Optional: add your logo
      handler: async (paymentResponse) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
        try {
          const verifyResponse = await subscriptionAPI.verifyRazorpayPayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            subscriptionId
          );
          
          if (verifyResponse.success !== false) {
            onSuccess(verifyResponse);
          } else {
            onError(verifyResponse.message || 'Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Verification error:', error);
          onError(error.message || 'Payment verification failed. Please contact support.');
        }
      },
      prefill: prefill,
      theme: {
        color: '#7C3AED',
        hide_topbar: false
      },
      modal: {
        ondismiss: () => {
          onError('Payment cancelled by user');
        },
        escape: false,
        backdropclose: false
      },
      notes: {
        plan: plan,
        billingCycle: billingCycle,
        userId: userDetails.id || ''
      },
      timeout: 1800 // Timeout in seconds (30 minutes)
    };

    const razorpay = new window.Razorpay(options);
    
    // Handle payment failure
    razorpay.on('payment.failed', (response) => {
      console.error('Payment failed:', response.error);
      onError(response.error.description || 'Payment failed. Please try again.');
    });
    
    razorpay.open();
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    onError(error.message || 'Failed to initialize payment. Please try again.');
  }
};

// Create Stripe Elements for better card input
export const createStripeCardElement = (stripe, elements) => {
  const style = {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };
  
  return elements.create('card', { style });
};

// Initialize Stripe payment with full integration
export const initStripePayment = async (plan, billingCycle, onSuccess, onError, userDetails = {}, cardElement = null) => {
  try {
    // Load Stripe script
    const isScriptLoaded = await loadStripeScript();
    if (!isScriptLoaded) {
      throw new Error('Failed to load Stripe SDK. Please check your internet connection.');
    }

    // Get Stripe key
    const stripeKey = await getStripeKey();
    
    // Initialize Stripe
    const stripe = window.Stripe(stripeKey);
    
    // Create payment intent on backend
    const response = await subscriptionAPI.createStripePaymentIntent(plan, billingCycle);
    const paymentData = response.data || response;
    const { clientSecret, subscriptionId, amount, currency } = paymentData;
    
    if (!clientSecret) {
      throw new Error('Failed to create payment intent');
    }
    
    let confirmationResult;
    
    // If card element is provided, use it
    if (cardElement) {
      confirmationResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userDetails.name || '',
            email: userDetails.email || '',
            phone: userDetails.phone || ''
          }
        }
      });
    } else {
      // Fallback to automatic payment methods
      confirmationResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // This would come from a card element in production
          },
          billing_details: {
            name: userDetails.name || '',
            email: userDetails.email || ''
          }
        }
      });
    }
    
    if (confirmationResult.error) {
      onError(confirmationResult.error.message);
      return;
    }
    
    if (confirmationResult.paymentIntent.status === 'succeeded') {
      const verifyResponse = await subscriptionAPI.verifyStripePayment(
        confirmationResult.paymentIntent.id,
        subscriptionId
      );
      
      if (verifyResponse.success !== false) {
        onSuccess(verifyResponse);
      } else {
        onError(verifyResponse.message || 'Payment verification failed');
      }
    } else if (confirmationResult.paymentIntent.status === 'requires_action') {
      // Handle 3D Secure if needed
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
      if (confirmError) {
        onError(confirmError.message);
      } else {
        const verifyResponse = await subscriptionAPI.verifyStripePayment(
          confirmationResult.paymentIntent.id,
          subscriptionId
        );
        if (verifyResponse.success !== false) {
          onSuccess(verifyResponse);
        } else {
          onError(verifyResponse.message || 'Payment verification failed');
        }
      }
    } else {
      onError('Payment status: ' + confirmationResult.paymentIntent.status);
    }
  } catch (error) {
    console.error('Stripe initialization error:', error);
    onError(error.message || 'Failed to initialize payment. Please try again.');
  }
};

// Show Stripe payment modal with card element
export const showStripePaymentModal = async (plan, billingCycle, onSuccess, onError, userDetails = {}) => {
  try {
    // Load Stripe script
    const isScriptLoaded = await loadStripeScript();
    if (!isScriptLoaded) {
      throw new Error('Failed to load Stripe SDK');
    }
    
    // This would open a modal with Stripe Elements
    // For simplicity, we'll use the regular method
    await initStripePayment(plan, billingCycle, onSuccess, onError, userDetails);
  } catch (error) {
    onError(error.message);
  }
};

// Payment method selector with enhanced options
export const processPayment = async (plan, billingCycle, paymentMethod, onSuccess, onError, userDetails = {}, cardElement = null) => {
  if (!plan) {
    onError('No plan selected');
    return;
  }
  
  try {
    switch (paymentMethod) {
      case 'razorpay':
        await initRazorpayPayment(plan, billingCycle, onSuccess, onError, userDetails);
        break;
      case 'stripe':
        await initStripePayment(plan, billingCycle, onSuccess, onError, userDetails, cardElement);
        break;
      default:
        // Use the regular subscribe method
        const response = await subscriptionAPI.subscribe(plan, billingCycle, paymentMethod);
        if (response.success !== false) {
          onSuccess(response);
        } else {
          onError(response.message || 'Subscription failed');
        }
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    onError(error.message || 'Payment processing failed. Please try again.');
  }
};

// Validate payment method
export const isValidPaymentMethod = (method) => {
  return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
};

// Get payment method display name
export const getPaymentMethodDisplayName = (method) => {
  const names = {
    razorpay: 'Razorpay',
    stripe: 'Stripe',
    card: 'Credit/Debit Card',
    upi: 'UPI',
    netbanking: 'Net Banking'
  };
  return names[method] || method;
};

// Format amount for display
export const formatAmount = (amount, currency = 'INR') => {
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