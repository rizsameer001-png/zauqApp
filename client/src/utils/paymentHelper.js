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
















// // client/src/utils/paymentHelper.js
// import subscriptionAPI from '../api/subscriptionAPI';

// // Check if script is already loaded
// let razorpayScriptLoaded = false;
// let stripeScriptLoaded = false;
// let razorpayPromise = null;
// let stripePromise = null;

// // Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Razorpay && razorpayScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (razorpayPromise) {
//       razorpayPromise.then(resolve);
//       return;
//     }
    
//     razorpayPromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         razorpayScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Razorpay script');
//         razorpayScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     razorpayPromise.then(resolve);
//   });
// };

// // Load Stripe script dynamically
// export const loadStripeScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Stripe && stripeScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (stripePromise) {
//       stripePromise.then(resolve);
//       return;
//     }
    
//     stripePromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://js.stripe.com/v3/';
//       script.async = true;
//       script.onload = () => {
//         stripeScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Stripe script');
//         stripeScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     stripePromise.then(resolve);
//   });
// };

// // Get Razorpay key from environment or API
// const getRazorpayKey = async () => {
//   // Try to get from environment first
//   if (process.env.REACT_APP_RAZORPAY_KEY_ID) {
//     return process.env.REACT_APP_RAZORPAY_KEY_ID;
//   }
  
//   // Fallback to API
//   try {
//     const response = await subscriptionAPI.getRazorpayKey();
//     return response.key;
//   } catch (error) {
//     console.error('Failed to get Razorpay key:', error);
//     return 'rzp_test_YourKeyHere'; // Fallback test key
//   }
// };

// // Get Stripe publishable key from environment or API
// const getStripeKey = async () => {
//   // Try to get from environment first
//   if (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
//     return process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
//   }
  
//   // Fallback to API
//   try {
//     const response = await subscriptionAPI.getStripeKey();
//     return response.key;
//   } catch (error) {
//     console.error('Failed to get Stripe key:', error);
//     return 'pk_test_YourKeyHere'; // Fallback test key
//   }
// };

// // Initialize Razorpay payment with full options
// export const initRazorpayPayment = async (plan, billingCycle, onSuccess, onError, userDetails = {}) => {
//   try {
//     // Load Razorpay script
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
//     }

//     // Create order on backend
//     const response = await subscriptionAPI.createRazorpayOrder(plan, billingCycle);
    
//     // Extract data from response
//     const orderData = response.data || response;
//     const { 
//       orderId, 
//       amount, 
//       currency, 
//       subscriptionId, 
//       key: razorpayKey 
//     } = orderData;
    
//     if (!orderId) {
//       throw new Error('Failed to create payment order');
//     }

//     // Get Razorpay key
//     const key = razorpayKey || await getRazorpayKey();

//     // Prepare user details for prefill
//     const prefill = {
//       name: userDetails.name || '',
//       email: userDetails.email || '',
//       contact: userDetails.phone || ''
//     };

//     const options = {
//       key: key,
//       amount: amount,
//       currency: currency || 'INR',
//       name: 'Zauq App',
//       description: `Subscription to ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan (${billingCycle})`,
//       order_id: orderId,
//       image: '/logo192.png', // Optional: add your logo
//       handler: async (paymentResponse) => {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
//         try {
//           const verifyResponse = await subscriptionAPI.verifyRazorpayPayment(
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             subscriptionId
//           );
          
//           if (verifyResponse.success !== false) {
//             onSuccess(verifyResponse);
//           } else {
//             onError(verifyResponse.message || 'Payment verification failed. Please contact support.');
//           }
//         } catch (error) {
//           console.error('Verification error:', error);
//           onError(error.message || 'Payment verification failed. Please contact support.');
//         }
//       },
//       prefill: prefill,
//       theme: {
//         color: '#7C3AED',
//         hide_topbar: false
//       },
//       modal: {
//         ondismiss: () => {
//           onError('Payment cancelled by user');
//         },
//         escape: false,
//         backdropclose: false
//       },
//       notes: {
//         plan: plan,
//         billingCycle: billingCycle,
//         userId: userDetails.id || ''
//       },
//       timeout: 1800 // Timeout in seconds (30 minutes)
//     };

//     const razorpay = new window.Razorpay(options);
    
//     // Handle payment failure
//     razorpay.on('payment.failed', (response) => {
//       console.error('Payment failed:', response.error);
//       onError(response.error.description || 'Payment failed. Please try again.');
//     });
    
//     razorpay.open();
//   } catch (error) {
//     console.error('Razorpay initialization error:', error);
//     onError(error.message || 'Failed to initialize payment. Please try again.');
//   }
// };

// // Create Stripe Elements for better card input
// export const createStripeCardElement = (stripe, elements) => {
//   const style = {
//     base: {
//       fontSize: '16px',
//       color: '#32325d',
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: 'antialiased',
//       '::placeholder': {
//         color: '#aab7c4'
//       }
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a'
//     }
//   };
  
//   return elements.create('card', { style });
// };

// // Initialize Stripe payment with full integration
// export const initStripePayment = async (plan, billingCycle, onSuccess, onError, userDetails = {}, cardElement = null) => {
//   try {
//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK. Please check your internet connection.');
//     }

//     // Get Stripe key
//     const stripeKey = await getStripeKey();
    
//     // Initialize Stripe
//     const stripe = window.Stripe(stripeKey);
    
//     // Create payment intent on backend
//     const response = await subscriptionAPI.createStripePaymentIntent(plan, billingCycle);
//     const paymentData = response.data || response;
//     const { clientSecret, subscriptionId, amount, currency } = paymentData;
    
//     if (!clientSecret) {
//       throw new Error('Failed to create payment intent');
//     }
    
//     let confirmationResult;
    
//     // If card element is provided, use it
//     if (cardElement) {
//       confirmationResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: userDetails.name || '',
//             email: userDetails.email || '',
//             phone: userDetails.phone || ''
//           }
//         }
//       });
//     } else {
//       // Fallback to automatic payment methods
//       confirmationResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             // This would come from a card element in production
//           },
//           billing_details: {
//             name: userDetails.name || '',
//             email: userDetails.email || ''
//           }
//         }
//       });
//     }
    
//     if (confirmationResult.error) {
//       onError(confirmationResult.error.message);
//       return;
//     }
    
//     if (confirmationResult.paymentIntent.status === 'succeeded') {
//       const verifyResponse = await subscriptionAPI.verifyStripePayment(
//         confirmationResult.paymentIntent.id,
//         subscriptionId
//       );
      
//       if (verifyResponse.success !== false) {
//         onSuccess(verifyResponse);
//       } else {
//         onError(verifyResponse.message || 'Payment verification failed');
//       }
//     } else if (confirmationResult.paymentIntent.status === 'requires_action') {
//       // Handle 3D Secure if needed
//       const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
//       if (confirmError) {
//         onError(confirmError.message);
//       } else {
//         const verifyResponse = await subscriptionAPI.verifyStripePayment(
//           confirmationResult.paymentIntent.id,
//           subscriptionId
//         );
//         if (verifyResponse.success !== false) {
//           onSuccess(verifyResponse);
//         } else {
//           onError(verifyResponse.message || 'Payment verification failed');
//         }
//       }
//     } else {
//       onError('Payment status: ' + confirmationResult.paymentIntent.status);
//     }
//   } catch (error) {
//     console.error('Stripe initialization error:', error);
//     onError(error.message || 'Failed to initialize payment. Please try again.');
//   }
// };

// // Show Stripe payment modal with card element
// export const showStripePaymentModal = async (plan, billingCycle, onSuccess, onError, userDetails = {}) => {
//   try {
//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK');
//     }
    
//     // This would open a modal with Stripe Elements
//     // For simplicity, we'll use the regular method
//     await initStripePayment(plan, billingCycle, onSuccess, onError, userDetails);
//   } catch (error) {
//     onError(error.message);
//   }
// };

// // Payment method selector with enhanced options
// export const processPayment = async (plan, billingCycle, paymentMethod, onSuccess, onError, userDetails = {}, cardElement = null) => {
//   if (!plan) {
//     onError('No plan selected');
//     return;
//   }
  
//   try {
//     switch (paymentMethod) {
//       case 'razorpay':
//         await initRazorpayPayment(plan, billingCycle, onSuccess, onError, userDetails);
//         break;
//       case 'stripe':
//         await initStripePayment(plan, billingCycle, onSuccess, onError, userDetails, cardElement);
//         break;
//       default:
//         // Use the regular subscribe method
//         const response = await subscriptionAPI.subscribe(plan, billingCycle, paymentMethod);
//         if (response.success !== false) {
//           onSuccess(response);
//         } else {
//           onError(response.message || 'Subscription failed');
//         }
//     }
//   } catch (error) {
//     console.error('Payment processing error:', error);
//     onError(error.message || 'Payment processing failed. Please try again.');
//   }
// };

// // Validate payment method
// export const isValidPaymentMethod = (method) => {
//   return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
// };

// // Get payment method display name
// export const getPaymentMethodDisplayName = (method) => {
//   const names = {
//     razorpay: 'Razorpay',
//     stripe: 'Stripe',
//     card: 'Credit/Debit Card',
//     upi: 'UPI',
//     netbanking: 'Net Banking'
//   };
//   return names[method] || method;
// };

// // Format amount for display
// export const formatAmount = (amount, currency = 'INR') => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// // Calculate savings percentage
// export const calculateSavings = (monthlyPrice, yearlyPrice) => {
//   const yearlyMonthlyEquivalent = yearlyPrice / 12;
//   const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
//   return Math.round(savings);
// };


















// // client/src/utils/paymentHelper.js
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Check if script is already loaded
// let razorpayScriptLoaded = false;
// let stripeScriptLoaded = false;
// let razorpayPromise = null;
// let stripePromise = null;

// // Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Razorpay && razorpayScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (razorpayPromise) {
//       razorpayPromise.then(resolve);
//       return;
//     }
    
//     razorpayPromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         razorpayScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Razorpay script');
//         razorpayScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     razorpayPromise.then(resolve);
//   });
// };

// // Load Stripe script dynamically
// export const loadStripeScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Stripe && stripeScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (stripePromise) {
//       stripePromise.then(resolve);
//       return;
//     }
    
//     stripePromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://js.stripe.com/v3/';
//       script.async = true;
//       script.onload = () => {
//         stripeScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Stripe script');
//         stripeScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     stripePromise.then(resolve);
//   });
// };

// // Initialize Razorpay payment
// export const initRazorpayPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   userPhone,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Load Razorpay script
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
//     }

//     // Show loading toast
//     const loadingToast = toast.loading('Creating payment order...');

//     // Create order on backend
//     const response = await axios.post('/api/subscriptions/razorpay/create-order', {
//       planId,
//       planName,
//       amount,
//       currency
//     });

//     toast.dismiss(loadingToast);

//     if (!response.data.success || !response.data.orderId) {
//       throw new Error(response.data.error || 'Failed to create payment order');
//     }

//     const { orderId, keyId, amount: orderAmount } = response.data;

//     // Prepare user details for prefill
//     const prefill = {
//       name: userName || '',
//       email: userEmail || '',
//       contact: userPhone || ''
//     };

//     const options = {
//       key: keyId,
//       amount: orderAmount,
//       currency: currency,
//       name: 'Zauq App',
//       description: `Subscription to ${planName} Plan`,
//       order_id: orderId,
//       image: '/logo192.png',
//       handler: async (paymentResponse) => {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
//         const verifyToast = toast.loading('Verifying payment...');
        
//         try {
//           const verifyResponse = await axios.post('/api/subscriptions/razorpay/verify-payment', {
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             signature: razorpay_signature,
//             planId
//           });
          
//           toast.dismiss(verifyToast);
          
//           if (verifyResponse.data.success) {
//             toast.success('Payment successful! Subscription activated.');
//             if (onSuccess) onSuccess(verifyResponse.data);
//           } else {
//             throw new Error(verifyResponse.data.error || 'Payment verification failed');
//           }
//         } catch (error) {
//           toast.dismiss(verifyToast);
//           console.error('Verification error:', error);
//           const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//           toast.error(errorMsg);
//           if (onError) onError(new Error(errorMsg));
//         }
//       },
//       prefill: prefill,
//       theme: {
//         color: '#7C3AED',
//         hide_topbar: false
//       },
//       modal: {
//         ondismiss: () => {
//           if (onError) onError(new Error('Payment cancelled by user'));
//         }
//       },
//       notes: {
//         planId: planId,
//         planName: planName
//       }
//     };

//     const razorpay = new window.Razorpay(options);
    
//     // Handle payment failure
//     razorpay.on('payment.failed', (response) => {
//       console.error('Payment failed:', response.error);
//       const errorMsg = response.error?.description || 'Payment failed. Please try again.';
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//     });
    
//     razorpay.open();
//     return { success: true };
    
//   } catch (error) {
//     console.error('Razorpay initialization error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to initialize payment';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Initialize Stripe payment (for direct card input)
// export const initStripePayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK. Please check your internet connection.');
//     }

//     const loadingToast = toast.loading('Preparing payment...');

//     // Create payment intent on backend
//     const response = await axios.post('/api/subscriptions/stripe/create-payment-intent', {
//       planId,
//       planName,
//       amount,
//       currency
//     });

//     toast.dismiss(loadingToast);

//     if (!response.data.success || !response.data.clientSecret) {
//       throw new Error(response.data.error || 'Failed to create payment intent');
//     }

//     const { clientSecret, subscriptionId } = response.data;
//     const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_default';
//     const stripe = window.Stripe(stripeKey);

//     // Create card element
//     const elements = stripe.elements();
//     const cardElement = elements.create('card', {
//       style: {
//         base: {
//           fontSize: '16px',
//           color: '#32325d',
//           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//           '::placeholder': {
//             color: '#aab7c4'
//           }
//         },
//         invalid: {
//           color: '#fa755a',
//           iconColor: '#fa755a'
//         }
//       }
//     });

//     // Mount card element (you'll need to provide a DOM element ID)
//     // For now, we'll use a simple confirm
//     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: userName || '',
//           email: userEmail || ''
//         }
//       }
//     });

//     if (confirmError) {
//       throw new Error(confirmError.message);
//     }

//     if (paymentIntent.status === 'succeeded') {
//       const verifyToast = toast.loading('Verifying payment...');
      
//       const verifyResponse = await axios.post('/api/subscriptions/stripe/verify-payment', {
//         paymentIntentId: paymentIntent.id,
//         subscriptionId
//       });
      
//       toast.dismiss(verifyToast);
      
//       if (verifyResponse.data.success) {
//         toast.success('Payment successful! Subscription activated.');
//         if (onSuccess) onSuccess(verifyResponse.data);
//       } else {
//         throw new Error(verifyResponse.data.error || 'Payment verification failed');
//       }
//     }
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe payment error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to process payment';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Create Stripe checkout session
// export const createStripeCheckoutSession = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   onSuccess,
//   onError
// }) => {
//   try {
//     const loadingToast = toast.loading('Preparing checkout...');
    
//     const response = await axios.post('/api/subscriptions/stripe/create-checkout-session', {
//       planId,
//       planName,
//       amount,
//       currency,
//       successUrl: `${window.location.origin}/dashboard/subscriptions?session_id={CHECKOUT_SESSION_ID}`,
//       cancelUrl: `${window.location.origin}/dashboard/subscriptions?canceled=true`
//     });
    
//     toast.dismiss(loadingToast);
    
//     if (!response.data.success || !response.data.sessionUrl) {
//       throw new Error(response.data.error || 'Failed to create checkout session');
//     }
    
//     // Redirect to Stripe checkout
//     window.location.href = response.data.sessionUrl;
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe checkout error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to create checkout session';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Verify Stripe payment
// export const verifyStripePayment = async (sessionId, planId) => {
//   try {
//     const response = await axios.post('/api/subscriptions/stripe/verify-payment', {
//       sessionId,
//       planId
//     });
    
//     if (response.data.success) {
//       toast.success('Payment successful! Subscription activated.');
//       return { success: true, data: response.data };
//     } else {
//       throw new Error(response.data.error || 'Payment verification failed');
//     }
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//     toast.error(errorMsg);
//     return { success: false, error: errorMsg };
//   }
// };

// // Check URL for Stripe session return
// export const checkStripeSessionReturn = async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const sessionId = urlParams.get('session_id');
//   const canceled = urlParams.get('canceled');
  
//   if (canceled === 'true') {
//     toast.error('Payment was cancelled');
//     return { success: false, canceled: true };
//   }
  
//   if (sessionId) {
//     // Clean URL
//     window.history.replaceState({}, document.title, window.location.pathname);
//     return { success: true, sessionId };
//   }
  
//   return null;
// };

// // Show Stripe payment modal
// export const showStripePaymentModal = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   // This is a wrapper for initStripePayment
//   return await initStripePayment({
//     planId,
//     planName,
//     amount,
//     currency,
//     userEmail,
//     userName,
//     onSuccess,
//     onError
//   });
// };

// // Unified payment method
// export const processPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   paymentMethod = 'razorpay',
//   userDetails = {},
//   onSuccess,
//   onError
// }) => {
//   if (!planId || !amount) {
//     const errorMsg = 'Invalid plan or amount';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
  
//   try {
//     if (paymentMethod === 'razorpay') {
//       return await initRazorpayPayment({
//         planId,
//         planName,
//         amount,
//         currency,
//         userEmail: userDetails.email,
//         userName: userDetails.name,
//         userPhone: userDetails.phone,
//         onSuccess,
//         onError
//       });
//     } else if (paymentMethod === 'stripe') {
//       return await createStripeCheckoutSession({
//         planId,
//         planName,
//         amount,
//         currency,
//         onSuccess,
//         onError
//       });
//     } else {
//       const errorMsg = `Unsupported payment method: ${paymentMethod}`;
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//       return { success: false, error: errorMsg };
//     }
//   } catch (error) {
//     console.error('Payment processing error:', error);
//     const errorMsg = error.message || 'Payment processing failed';
//     toast.error(errorMsg);
//     if (onError) onError(error);
//     return { success: false, error: errorMsg };
//   }
// };

// // Format amount for display
// export const formatAmount = (amount, currency = 'INR') => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// // Calculate savings percentage
// export const calculateSavings = (monthlyPrice, yearlyPrice) => {
//   if (!monthlyPrice || !yearlyPrice) return 0;
//   const yearlyMonthlyEquivalent = yearlyPrice / 12;
//   const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
//   return Math.round(savings);
// };

// // Get payment method display name
// export const getPaymentMethodDisplayName = (method) => {
//   const names = {
//     razorpay: 'Razorpay',
//     stripe: 'Stripe',
//     card: 'Credit/Debit Card',
//     upi: 'UPI',
//     netbanking: 'Net Banking'
//   };
//   return names[method] || method;
// };

// // Validate payment method
// export const isValidPaymentMethod = (method) => {
//   return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
// };

// // Default export for convenience
// const paymentHelper = {
//   loadRazorpayScript,
//   loadStripeScript,
//   initRazorpayPayment,
//   initStripePayment,
//   createStripeCheckoutSession,
//   verifyStripePayment,
//   checkStripeSessionReturn,
//   showStripePaymentModal,
//   processPayment,
//   formatAmount,
//   calculateSavings,
//   getPaymentMethodDisplayName,
//   isValidPaymentMethod
// };

// export default paymentHelper;



















// // client/src/utils/paymentHelper.js
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../api/subscriptionAPI';

// // Check if script is already loaded
// let razorpayScriptLoaded = false;
// let stripeScriptLoaded = false;
// let razorpayPromise = null;
// let stripePromise = null;

// // Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Razorpay && razorpayScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (razorpayPromise) {
//       razorpayPromise.then(resolve);
//       return;
//     }
    
//     razorpayPromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         razorpayScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Razorpay script');
//         razorpayScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     razorpayPromise.then(resolve);
//   });
// };

// // Load Stripe script dynamically
// export const loadStripeScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Stripe && stripeScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (stripePromise) {
//       stripePromise.then(resolve);
//       return;
//     }
    
//     stripePromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://js.stripe.com/v3/';
//       script.async = true;
//       script.onload = () => {
//         stripeScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Stripe script');
//         stripeScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     stripePromise.then(resolve);
//   });
// };

// // Initialize Razorpay payment - UPDATED to use subscriptionAPI
// export const initRazorpayPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   userPhone,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication first
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     // Load Razorpay script
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
//     }

//     // Show loading toast
//     const loadingToast = toast.loading('Creating payment order...');

//     // ✅ USE subscriptionAPI instead of direct axios
//     const response = await subscriptionAPI.createRazorpayOrder(planId, planName, amount, currency);

//     toast.dismiss(loadingToast);

//     if (!response.success || !response.orderId) {
//       throw new Error(response.error || 'Failed to create payment order');
//     }

//     const { orderId, keyId, amount: orderAmount } = response;

//     // Prepare user details for prefill
//     const prefill = {
//       name: userName || '',
//       email: userEmail || '',
//       contact: userPhone || ''
//     };

//     const options = {
//       key: keyId,
//       amount: orderAmount,
//       currency: currency,
//       name: 'Zauq App',
//       description: `Subscription to ${planName} Plan`,
//       order_id: orderId,
//       image: '/logo192.png',
//       handler: async (paymentResponse) => {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
//         const verifyToast = toast.loading('Verifying payment...');
        
//         try {
//           // ✅ USE subscriptionAPI for verification
//           const verifyResponse = await subscriptionAPI.verifyRazorpayPayment({
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             signature: razorpay_signature,
//             planId
//           });
          
//           toast.dismiss(verifyToast);
          
//           if (verifyResponse.success) {
//             toast.success('Payment successful! Subscription activated.');
//             if (onSuccess) onSuccess(verifyResponse);
//           } else {
//             throw new Error(verifyResponse.error || 'Payment verification failed');
//           }
//         } catch (error) {
//           toast.dismiss(verifyToast);
//           console.error('Verification error:', error);
//           const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//           toast.error(errorMsg);
//           if (onError) onError(new Error(errorMsg));
//         }
//       },
//       prefill: prefill,
//       theme: {
//         color: '#7C3AED',
//         hide_topbar: false
//       },
//       modal: {
//         ondismiss: () => {
//           if (onError) onError(new Error('Payment cancelled by user'));
//         }
//       },
//       notes: {
//         planId: planId,
//         planName: planName
//       }
//     };

//     const razorpay = new window.Razorpay(options);
    
//     // Handle payment failure
//     razorpay.on('payment.failed', (response) => {
//       console.error('Payment failed:', response.error);
//       const errorMsg = response.error?.description || 'Payment failed. Please try again.';
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//     });
    
//     razorpay.open();
//     return { success: true };
    
//   } catch (error) {
//     console.error('Razorpay initialization error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to initialize payment';
    
//     // Handle 401 specifically
//     if (error.response?.status === 401 || error.message === 'Please login to continue') {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Initialize Stripe payment (for direct card input) - UPDATED
// export const initStripePayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK. Please check your internet connection.');
//     }

//     const loadingToast = toast.loading('Preparing payment...');

//     // ✅ USE subscriptionAPI for payment intent
//     const response = await subscriptionAPI.createStripePaymentIntent(planId, planName, amount, currency);

//     toast.dismiss(loadingToast);

//     if (!response.success || !response.clientSecret) {
//       throw new Error(response.error || 'Failed to create payment intent');
//     }

//     const { clientSecret, subscriptionId } = response;
//     const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_default';
//     const stripe = window.Stripe(stripeKey);

//     // Create card element
//     const elements = stripe.elements();
//     const cardElement = elements.create('card', {
//       style: {
//         base: {
//           fontSize: '16px',
//           color: '#32325d',
//           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//           '::placeholder': {
//             color: '#aab7c4'
//           }
//         },
//         invalid: {
//           color: '#fa755a',
//           iconColor: '#fa755a'
//         }
//       }
//     });

//     // You would mount the card element to a DOM element here
//     // For now, we'll use a simple confirm
//     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: userName || '',
//           email: userEmail || ''
//         }
//       }
//     });

//     if (confirmError) {
//       throw new Error(confirmError.message);
//     }

//     if (paymentIntent.status === 'succeeded') {
//       const verifyToast = toast.loading('Verifying payment...');
      
//       // ✅ USE subscriptionAPI for verification
//       const verifyResponse = await subscriptionAPI.verifyStripePayment({
//         paymentIntentId: paymentIntent.id,
//         subscriptionId
//       });
      
//       toast.dismiss(verifyToast);
      
//       if (verifyResponse.success) {
//         toast.success('Payment successful! Subscription activated.');
//         if (onSuccess) onSuccess(verifyResponse);
//       } else {
//         throw new Error(verifyResponse.error || 'Payment verification failed');
//       }
//     }
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe payment error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to process payment';
    
//     if (error.response?.status === 401) {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => window.location.href = '/login', 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Create Stripe checkout session - UPDATED
// export const createStripeCheckoutSession = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     const loadingToast = toast.loading('Preparing checkout...');
    
//     // ✅ USE subscriptionAPI for checkout session
//     const response = await subscriptionAPI.createStripeCheckoutSession(planId, planName, amount, currency);
    
//     toast.dismiss(loadingToast);
    
//     if (!response.success || !response.sessionUrl) {
//       throw new Error(response.error || 'Failed to create checkout session');
//     }
    
//     // Redirect to Stripe checkout
//     window.location.href = response.sessionUrl;
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe checkout error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to create checkout session';
    
//     if (error.response?.status === 401) {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => window.location.href = '/login', 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Verify Stripe payment - UPDATED
// export const verifyStripePayment = async (sessionId, planId) => {
//   try {
//     // ✅ USE subscriptionAPI for verification
//     const response = await subscriptionAPI.verifyStripePayment({ sessionId, planId });
    
//     if (response.success) {
//       toast.success('Payment successful! Subscription activated.');
//       return { success: true, data: response };
//     } else {
//       throw new Error(response.error || 'Payment verification failed');
//     }
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//     toast.error(errorMsg);
//     return { success: false, error: errorMsg };
//   }
// };

// // Check URL for Stripe session return
// export const checkStripeSessionReturn = async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const sessionId = urlParams.get('session_id');
//   const canceled = urlParams.get('canceled');
  
//   if (canceled === 'true') {
//     toast.error('Payment was cancelled');
//     return { success: false, canceled: true };
//   }
  
//   if (sessionId) {
//     // Clean URL
//     window.history.replaceState({}, document.title, window.location.pathname);
//     return { success: true, sessionId };
//   }
  
//   return null;
// };

// // Show Stripe payment modal
// export const showStripePaymentModal = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   return await initStripePayment({
//     planId,
//     planName,
//     amount,
//     currency,
//     userEmail,
//     userName,
//     onSuccess,
//     onError
//   });
// };

// // Unified payment method - UPDATED
// export const processPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   paymentMethod = 'razorpay',
//   userDetails = {},
//   onSuccess,
//   onError
// }) => {
//   if (!planId || !amount) {
//     const errorMsg = 'Invalid plan or amount';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
  
//   // Check authentication
//   const token = localStorage.getItem('token');
//   if (!token) {
//     const errorMsg = 'Please login to continue';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     setTimeout(() => window.location.href = '/login', 2000);
//     return { success: false, error: errorMsg };
//   }
  
//   try {
//     if (paymentMethod === 'razorpay') {
//       return await initRazorpayPayment({
//         planId,
//         planName,
//         amount,
//         currency,
//         userEmail: userDetails.email,
//         userName: userDetails.name,
//         userPhone: userDetails.phone,
//         onSuccess,
//         onError
//       });
//     } else if (paymentMethod === 'stripe') {
//       return await createStripeCheckoutSession({
//         planId,
//         planName,
//         amount,
//         currency,
//         onSuccess,
//         onError
//       });
//     } else {
//       const errorMsg = `Unsupported payment method: ${paymentMethod}`;
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//       return { success: false, error: errorMsg };
//     }
//   } catch (error) {
//     console.error('Payment processing error:', error);
//     const errorMsg = error.message || 'Payment processing failed';
//     toast.error(errorMsg);
//     if (onError) onError(error);
//     return { success: false, error: errorMsg };
//   }
// };

// // Format amount for display
// export const formatAmount = (amount, currency = 'INR') => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// // Calculate savings percentage
// export const calculateSavings = (monthlyPrice, yearlyPrice) => {
//   if (!monthlyPrice || !yearlyPrice) return 0;
//   const yearlyMonthlyEquivalent = yearlyPrice / 12;
//   const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
//   return Math.round(savings);
// };

// // Get payment method display name
// export const getPaymentMethodDisplayName = (method) => {
//   const names = {
//     razorpay: 'Razorpay',
//     stripe: 'Stripe',
//     card: 'Credit/Debit Card',
//     upi: 'UPI',
//     netbanking: 'Net Banking'
//   };
//   return names[method] || method;
// };

// // Validate payment method
// export const isValidPaymentMethod = (method) => {
//   return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
// };

// // Default export for convenience
// const paymentHelper = {
//   loadRazorpayScript,
//   loadStripeScript,
//   initRazorpayPayment,
//   initStripePayment,
//   createStripeCheckoutSession,
//   verifyStripePayment,
//   checkStripeSessionReturn,
//   showStripePaymentModal,
//   processPayment,
//   formatAmount,
//   calculateSavings,
//   getPaymentMethodDisplayName,
//   isValidPaymentMethod
// };

// export default paymentHelper;





















// // client/src/utils/paymentHelper.js
// import toast from 'react-hot-toast';
// import subscriptionAPI from '../api/subscriptionAPI';

// // Check if script is already loaded
// let razorpayScriptLoaded = false;
// let stripeScriptLoaded = false;
// let razorpayPromise = null;
// let stripePromise = null;

// // Load Razorpay script dynamically
// export const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Razorpay && razorpayScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (razorpayPromise) {
//       razorpayPromise.then(resolve);
//       return;
//     }
    
//     razorpayPromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         razorpayScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Razorpay script');
//         razorpayScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     razorpayPromise.then(resolve);
//   });
// };

// // Load Stripe script dynamically
// export const loadStripeScript = () => {
//   return new Promise((resolve) => {
//     // If already loaded, resolve immediately
//     if (window.Stripe && stripeScriptLoaded) {
//       resolve(true);
//       return;
//     }
    
//     // If already loading, wait for it
//     if (stripePromise) {
//       stripePromise.then(resolve);
//       return;
//     }
    
//     stripePromise = new Promise((resolveScript) => {
//       const script = document.createElement('script');
//       script.src = 'https://js.stripe.com/v3/';
//       script.async = true;
//       script.onload = () => {
//         stripeScriptLoaded = true;
//         resolveScript(true);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Stripe script');
//         stripeScriptLoaded = false;
//         resolveScript(false);
//       };
//       document.body.appendChild(script);
//     });
    
//     stripePromise.then(resolve);
//   });
// };

// // Initialize Razorpay payment - UPDATED with proper validation
// export const initRazorpayPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   userPhone,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication first
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     // Load Razorpay script
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
//     }

//     // Show loading toast
//     const loadingToast = toast.loading('Creating payment order...');

//     // Create order using subscriptionAPI
//     const response = await subscriptionAPI.createRazorpayOrder(planId, planName, amount, currency);

//     toast.dismiss(loadingToast);

//     if (!response.success || !response.orderId) {
//       throw new Error(response.error || 'Failed to create payment order');
//     }

//     const { orderId, keyId, amount: orderAmount } = response;

//     // Prepare user details for prefill
//     const prefill = {
//       name: userName || '',
//       email: userEmail || '',
//       contact: userPhone || ''
//     };

//     const options = {
//       key: keyId,
//       amount: orderAmount,
//       currency: currency,
//       name: 'Zauq App',
//       description: `Subscription to ${planName} Plan`,
//       order_id: orderId,
//       // REMOVED image to avoid CORS issues
//       handler: async (paymentResponse) => {
//         console.log('💰 Payment Response received:', paymentResponse);
        
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
//         // ✅ Validate all required fields are present
//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//           const errorMsg = 'Missing payment verification details. Please contact support.';
//           console.error('❌ Missing fields:', { 
//             orderId: razorpay_order_id, 
//             paymentId: razorpay_payment_id, 
//             signature: razorpay_signature 
//           });
//           toast.error(errorMsg);
//           if (onError) onError(new Error(errorMsg));
//           return;
//         }
        
//         const verifyToast = toast.loading('Verifying payment...');
        
//         try {
//           // ✅ Send complete verification data
//           const verifyResponse = await subscriptionAPI.verifyRazorpayPayment({
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             signature: razorpay_signature,
//             planId: planId
//           });
          
//           toast.dismiss(verifyToast);
          
//           if (verifyResponse.success) {
//             toast.success('Payment successful! Subscription activated.');
//             if (onSuccess) onSuccess(verifyResponse);
//           } else {
//             throw new Error(verifyResponse.error || 'Payment verification failed');
//           }
//         } catch (error) {
//           toast.dismiss(verifyToast);
//           console.error('❌ Verification error:', error);
//           const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//           toast.error(errorMsg);
//           if (onError) onError(new Error(errorMsg));
//         }
//       },
//       prefill: prefill,
//       theme: {
//         color: '#7C3AED',
//         hide_topbar: false
//       },
//       modal: {
//         ondismiss: () => {
//           console.log('Modal closed by user');
//           if (onError) onError(new Error('Payment cancelled by user'));
//         }
//       },
//       notes: {
//         planId: planId,
//         planName: planName,
//         userEmail: userEmail,
//         timestamp: new Date().toISOString()
//       }
//     };

//     const razorpay = new window.Razorpay(options);
    
//     // Handle payment failure
//     razorpay.on('payment.failed', (response) => {
//       console.error('❌ Payment failed:', response.error);
//       const errorMsg = response.error?.description || 'Payment failed. Please try again.';
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//     });
    
//     razorpay.open();
//     return { success: true };
    
//   } catch (error) {
//     console.error('❌ Razorpay initialization error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to initialize payment';
    
//     // Handle 401 specifically
//     if (error.response?.status === 401 || error.message === 'Please login to continue') {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Initialize Stripe payment (for direct card input)
// export const initStripePayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     // Load Stripe script
//     const isScriptLoaded = await loadStripeScript();
//     if (!isScriptLoaded) {
//       throw new Error('Failed to load Stripe SDK. Please check your internet connection.');
//     }

//     const loadingToast = toast.loading('Preparing payment...');

//     // Create payment intent on backend
//     const response = await subscriptionAPI.createStripePaymentIntent(planId, planName, amount, currency);

//     toast.dismiss(loadingToast);

//     if (!response.success || !response.clientSecret) {
//       throw new Error(response.error || 'Failed to create payment intent');
//     }

//     const { clientSecret, subscriptionId } = response;
//     const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_default';
//     const stripe = window.Stripe(stripeKey);

//     // Create card element
//     const elements = stripe.elements();
//     const cardElement = elements.create('card', {
//       style: {
//         base: {
//           fontSize: '16px',
//           color: '#32325d',
//           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//           '::placeholder': {
//             color: '#aab7c4'
//           }
//         },
//         invalid: {
//           color: '#fa755a',
//           iconColor: '#fa755a'
//         }
//       }
//     });

//     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: userName || '',
//           email: userEmail || ''
//         }
//       }
//     });

//     if (confirmError) {
//       throw new Error(confirmError.message);
//     }

//     if (paymentIntent.status === 'succeeded') {
//       const verifyToast = toast.loading('Verifying payment...');
      
//       const verifyResponse = await subscriptionAPI.verifyStripePayment({
//         paymentIntentId: paymentIntent.id,
//         subscriptionId
//       });
      
//       toast.dismiss(verifyToast);
      
//       if (verifyResponse.success) {
//         toast.success('Payment successful! Subscription activated.');
//         if (onSuccess) onSuccess(verifyResponse);
//       } else {
//         throw new Error(verifyResponse.error || 'Payment verification failed');
//       }
//     }
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe payment error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to process payment';
    
//     if (error.response?.status === 401) {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => window.location.href = '/login', 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Create Stripe checkout session
// export const createStripeCheckoutSession = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   onSuccess,
//   onError
// }) => {
//   try {
//     // Check authentication
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Please login to continue');
//     }

//     const loadingToast = toast.loading('Preparing checkout...');
    
//     const response = await subscriptionAPI.createStripeCheckoutSession(planId, planName, amount, currency);
    
//     toast.dismiss(loadingToast);
    
//     if (!response.success || !response.sessionUrl) {
//       throw new Error(response.error || 'Failed to create checkout session');
//     }
    
//     // Redirect to Stripe checkout
//     window.location.href = response.sessionUrl;
    
//     return { success: true };
    
//   } catch (error) {
//     console.error('Stripe checkout error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Failed to create checkout session';
    
//     if (error.response?.status === 401) {
//       toast.error('Session expired. Please login again.');
//       setTimeout(() => window.location.href = '/login', 2000);
//     } else {
//       toast.error(errorMsg);
//     }
    
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
// };

// // Verify Stripe payment
// export const verifyStripePayment = async (sessionId, planId) => {
//   try {
//     const response = await subscriptionAPI.verifyStripePayment({ sessionId, planId });
    
//     if (response.success) {
//       toast.success('Payment successful! Subscription activated.');
//       return { success: true, data: response };
//     } else {
//       throw new Error(response.error || 'Payment verification failed');
//     }
//   } catch (error) {
//     console.error('Stripe verification error:', error);
//     const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
//     toast.error(errorMsg);
//     return { success: false, error: errorMsg };
//   }
// };

// // Check URL for Stripe session return
// export const checkStripeSessionReturn = async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const sessionId = urlParams.get('session_id');
//   const canceled = urlParams.get('canceled');
  
//   if (canceled === 'true') {
//     toast.error('Payment was cancelled');
//     return { success: false, canceled: true };
//   }
  
//   if (sessionId) {
//     // Clean URL
//     window.history.replaceState({}, document.title, window.location.pathname);
//     return { success: true, sessionId };
//   }
  
//   return null;
// };

// // Show Stripe payment modal
// export const showStripePaymentModal = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   userEmail,
//   userName,
//   onSuccess,
//   onError
// }) => {
//   return await initStripePayment({
//     planId,
//     planName,
//     amount,
//     currency,
//     userEmail,
//     userName,
//     onSuccess,
//     onError
//   });
// };

// // Unified payment method
// export const processPayment = async ({
//   planId,
//   planName,
//   amount,
//   currency = 'INR',
//   paymentMethod = 'razorpay',
//   userDetails = {},
//   onSuccess,
//   onError
// }) => {
//   if (!planId || !amount) {
//     const errorMsg = 'Invalid plan or amount';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     return { success: false, error: errorMsg };
//   }
  
//   // Check authentication
//   const token = localStorage.getItem('token');
//   if (!token) {
//     const errorMsg = 'Please login to continue';
//     toast.error(errorMsg);
//     if (onError) onError(new Error(errorMsg));
//     setTimeout(() => window.location.href = '/login', 2000);
//     return { success: false, error: errorMsg };
//   }
  
//   try {
//     if (paymentMethod === 'razorpay') {
//       return await initRazorpayPayment({
//         planId,
//         planName,
//         amount,
//         currency,
//         userEmail: userDetails.email,
//         userName: userDetails.name,
//         userPhone: userDetails.phone,
//         onSuccess,
//         onError
//       });
//     } else if (paymentMethod === 'stripe') {
//       return await createStripeCheckoutSession({
//         planId,
//         planName,
//         amount,
//         currency,
//         onSuccess,
//         onError
//       });
//     } else {
//       const errorMsg = `Unsupported payment method: ${paymentMethod}`;
//       toast.error(errorMsg);
//       if (onError) onError(new Error(errorMsg));
//       return { success: false, error: errorMsg };
//     }
//   } catch (error) {
//     console.error('Payment processing error:', error);
//     const errorMsg = error.message || 'Payment processing failed';
//     toast.error(errorMsg);
//     if (onError) onError(error);
//     return { success: false, error: errorMsg };
//   }
// };

// // Format amount for display
// export const formatAmount = (amount, currency = 'INR') => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// // Calculate savings percentage
// export const calculateSavings = (monthlyPrice, yearlyPrice) => {
//   if (!monthlyPrice || !yearlyPrice) return 0;
//   const yearlyMonthlyEquivalent = yearlyPrice / 12;
//   const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
//   return Math.round(savings);
// };

// // Get payment method display name
// export const getPaymentMethodDisplayName = (method) => {
//   const names = {
//     razorpay: 'Razorpay',
//     stripe: 'Stripe',
//     card: 'Credit/Debit Card',
//     upi: 'UPI',
//     netbanking: 'Net Banking'
//   };
//   return names[method] || method;
// };

// // Validate payment method
// export const isValidPaymentMethod = (method) => {
//   return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
// };

// // Default export for convenience
// const paymentHelper = {
//   loadRazorpayScript,
//   loadStripeScript,
//   initRazorpayPayment,
//   initStripePayment,
//   createStripeCheckoutSession,
//   verifyStripePayment,
//   checkStripeSessionReturn,
//   showStripePaymentModal,
//   processPayment,
//   formatAmount,
//   calculateSavings,
//   getPaymentMethodDisplayName,
//   isValidPaymentMethod
// };

// export default paymentHelper;
























// client/src/utils/paymentHelper.js
import toast from 'react-hot-toast';
import subscriptionAPI from '../api/subscriptionAPI';

// Check if script is already loaded
let razorpayScriptLoaded = false;
let stripeScriptLoaded = false;
let razorpayPromise = null;
let stripePromise = null;

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay && razorpayScriptLoaded) {
      resolve(true);
      return;
    }
    
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
    if (window.Stripe && stripeScriptLoaded) {
      resolve(true);
      return;
    }
    
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

// Initialize Razorpay payment
export const initRazorpayPayment = async ({
  planId,
  planName,
  amount,
  currency = 'INR',
  userEmail,
  userName,
  userPhone,
  onSuccess,
  onError
}) => {
  try {
    // Check authentication first
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to continue');
    }

    // Load Razorpay script
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
    }

    // Show loading toast
    const loadingToast = toast.loading('Creating payment order...');

    // Create order using subscriptionAPI
    const response = await subscriptionAPI.createRazorpayOrder(planId, planName, amount, currency);

    toast.dismiss(loadingToast);

    if (!response.success || !response.orderId) {
      throw new Error(response.error || 'Failed to create payment order');
    }

    const { orderId, keyId, amount: orderAmount } = response;

    // Prepare user details for prefill
    const prefill = {
      name: userName || '',
      email: userEmail || '',
      contact: userPhone || ''
    };

    const options = {
      key: keyId,
      amount: orderAmount,
      currency: currency,
      name: 'Zauq App',
      description: `Subscription to ${planName} Plan`,
      order_id: orderId,
      handler: async (paymentResponse) => {
        console.log('💰 Payment Response received:', paymentResponse);
        
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
        
        // Validate all required fields are present
        if (!razorpay_order_id) {
          const errorMsg = 'Missing orderId from payment response';
          console.error('❌', errorMsg);
          toast.error(errorMsg);
          if (onError) onError(new Error(errorMsg));
          return;
        }
        
        if (!razorpay_payment_id) {
          const errorMsg = 'Missing paymentId from payment response';
          console.error('❌', errorMsg);
          toast.error(errorMsg);
          if (onError) onError(new Error(errorMsg));
          return;
        }
        
        if (!razorpay_signature) {
          const errorMsg = 'Missing signature from payment response';
          console.error('❌', errorMsg);
          toast.error(errorMsg);
          if (onError) onError(new Error(errorMsg));
          return;
        }
        
        const verifyToast = toast.loading('Verifying payment...');
        
        try {
          // ✅ Call verifyRazorpayPayment with the correct object parameter
          const verifyResponse = await subscriptionAPI.verifyRazorpayPayment({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            planId: planId
          });
          
          toast.dismiss(verifyToast);
          
          if (verifyResponse.success) {
            toast.success('Payment successful! Subscription activated.');
            if (onSuccess) onSuccess(verifyResponse);
          } else {
            throw new Error(verifyResponse.error || 'Payment verification failed');
          }
        } catch (error) {
          toast.dismiss(verifyToast);
          console.error('❌ Verification error:', error);
          const errorMsg = error.response?.data?.error || error.message || 'Payment verification failed';
          toast.error(errorMsg);
          if (onError) onError(new Error(errorMsg));
        }
      },
      prefill: prefill,
      theme: {
        color: '#7C3AED',
        hide_topbar: false
      },
      modal: {
        ondismiss: () => {
          console.log('Modal closed by user');
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      notes: {
        planId: planId,
        planName: planName,
        userEmail: userEmail,
        timestamp: new Date().toISOString()
      }
    };

    const razorpay = new window.Razorpay(options);
    
    // Handle payment failure
    razorpay.on('payment.failed', (response) => {
      console.error('❌ Payment failed:', response.error);
      const errorMsg = response.error?.description || 'Payment failed. Please try again.';
      toast.error(errorMsg);
      if (onError) onError(new Error(errorMsg));
    });
    
    razorpay.open();
    return { success: true };
    
  } catch (error) {
    console.error('❌ Razorpay initialization error:', error);
    const errorMsg = error.response?.data?.error || error.message || 'Failed to initialize payment';
    
    if (error.response?.status === 401 || error.message === 'Please login to continue') {
      toast.error('Session expired. Please login again.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      toast.error(errorMsg);
    }
    
    if (onError) onError(new Error(errorMsg));
    return { success: false, error: errorMsg };
  }
};

// Initialize Stripe payment
export const initStripePayment = async ({
  planId,
  planName,
  amount,
  currency = 'INR',
  userEmail,
  userName,
  onSuccess,
  onError
}) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to continue');
    }

    const isScriptLoaded = await loadStripeScript();
    if (!isScriptLoaded) {
      throw new Error('Failed to load Stripe SDK.');
    }

    const loadingToast = toast.loading('Preparing payment...');
    const response = await subscriptionAPI.createStripePaymentIntent(planId, planName, amount, currency);
    toast.dismiss(loadingToast);

    if (!response.success || !response.clientSecret) {
      throw new Error(response.error || 'Failed to create payment intent');
    }

    const { clientSecret, subscriptionId } = response;
    const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_default';
    const stripe = window.Stripe(stripeKey);
    const elements = stripe.elements();
    const cardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          '::placeholder': { color: '#aab7c4' }
        },
        invalid: { color: '#fa755a', iconColor: '#fa755a' }
      }
    });

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: userName || '',
          email: userEmail || ''
        }
      }
    });

    if (confirmError) throw new Error(confirmError.message);

    if (paymentIntent.status === 'succeeded') {
      const verifyToast = toast.loading('Verifying payment...');
      const verifyResponse = await subscriptionAPI.verifyStripePayment({
        paymentIntentId: paymentIntent.id,
        subscriptionId
      });
      toast.dismiss(verifyToast);
      
      if (verifyResponse.success) {
        toast.success('Payment successful! Subscription activated.');
        if (onSuccess) onSuccess(verifyResponse);
      } else {
        throw new Error(verifyResponse.error || 'Payment verification failed');
      }
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Stripe payment error:', error);
    const errorMsg = error.message || 'Failed to process payment';
    toast.error(errorMsg);
    if (onError) onError(new Error(errorMsg));
    return { success: false, error: errorMsg };
  }
};

// Create Stripe checkout session
export const createStripeCheckoutSession = async ({
  planId,
  planName,
  amount,
  currency = 'INR',
  onSuccess,
  onError
}) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to continue');
    }

    const loadingToast = toast.loading('Preparing checkout...');
    const response = await subscriptionAPI.createStripeCheckoutSession(planId, planName, amount, currency);
    toast.dismiss(loadingToast);
    
    if (!response.success || !response.sessionUrl) {
      throw new Error(response.error || 'Failed to create checkout session');
    }
    
    window.location.href = response.sessionUrl;
    return { success: true };
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const errorMsg = error.message || 'Failed to create checkout session';
    toast.error(errorMsg);
    if (onError) onError(new Error(errorMsg));
    return { success: false, error: errorMsg };
  }
};

// Verify Stripe payment
export const verifyStripePayment = async (sessionId, planId) => {
  try {
    const response = await subscriptionAPI.verifyStripePayment({ sessionId, planId });
    if (response.success) {
      toast.success('Payment successful! Subscription activated.');
      return { success: true, data: response };
    }
    throw new Error(response.error || 'Payment verification failed');
  } catch (error) {
    console.error('Stripe verification error:', error);
    const errorMsg = error.message || 'Payment verification failed';
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

// Check URL for Stripe session return
export const checkStripeSessionReturn = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  const canceled = urlParams.get('canceled');
  
  if (canceled === 'true') {
    toast.error('Payment was cancelled');
    return { success: false, canceled: true };
  }
  
  if (sessionId) {
    window.history.replaceState({}, document.title, window.location.pathname);
    return { success: true, sessionId };
  }
  
  return null;
};

// Show Stripe payment modal
export const showStripePaymentModal = async (params) => {
  return await initStripePayment(params);
};

// Unified payment method
export const processPayment = async ({
  planId,
  planName,
  amount,
  currency = 'INR',
  paymentMethod = 'razorpay',
  userDetails = {},
  onSuccess,
  onError
}) => {
  if (!planId || !amount) {
    const errorMsg = 'Invalid plan or amount';
    toast.error(errorMsg);
    if (onError) onError(new Error(errorMsg));
    return { success: false, error: errorMsg };
  }
  
  const token = localStorage.getItem('token');
  if (!token) {
    const errorMsg = 'Please login to continue';
    toast.error(errorMsg);
    if (onError) onError(new Error(errorMsg));
    setTimeout(() => window.location.href = '/login', 2000);
    return { success: false, error: errorMsg };
  }
  
  try {
    if (paymentMethod === 'razorpay') {
      return await initRazorpayPayment({
        planId,
        planName,
        amount,
        currency,
        userEmail: userDetails.email,
        userName: userDetails.name,
        userPhone: userDetails.phone,
        onSuccess,
        onError
      });
    } else if (paymentMethod === 'stripe') {
      return await createStripeCheckoutSession({
        planId,
        planName,
        amount,
        currency,
        onSuccess,
        onError
      });
    } else {
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    const errorMsg = error.message || 'Payment processing failed';
    toast.error(errorMsg);
    if (onError) onError(error);
    return { success: false, error: errorMsg };
  }
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
  if (!monthlyPrice || !yearlyPrice) return 0;
  const yearlyMonthlyEquivalent = yearlyPrice / 12;
  const savings = ((monthlyPrice - yearlyMonthlyEquivalent) / monthlyPrice) * 100;
  return Math.round(savings);
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

// Validate payment method
export const isValidPaymentMethod = (method) => {
  return ['razorpay', 'stripe', 'card', 'upi', 'netbanking'].includes(method);
};

// Default export
const paymentHelper = {
  loadRazorpayScript,
  loadStripeScript,
  initRazorpayPayment,
  initStripePayment,
  createStripeCheckoutSession,
  verifyStripePayment,
  checkStripeSessionReturn,
  showStripePaymentModal,
  processPayment,
  formatAmount,
  calculateSavings,
  getPaymentMethodDisplayName,
  isValidPaymentMethod
};

export default paymentHelper;