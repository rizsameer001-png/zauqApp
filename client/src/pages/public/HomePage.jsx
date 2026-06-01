// //client/src/pages/public/HomePage.jsx

// import React from 'react'
// import HeroSection from '../../components/home/HeroSection.jsx'
// import TrendingSection from '../../components/home/TrendingSection.jsx'
// import FeaturedAuthors from '../../components/home/FeaturedAuthors.jsx'
// import PopularBooks from '../../components/home/PopularBooks.jsx'
// import VideoHighlights from '../../components/home/VideoHighlights.jsx'
// import DailyQuote from '../../components/home/DailyQuote.jsx'
// import PremiumCTA from '../../components/home/PremiumCTA.jsx'

// const HomePage = () => {
//   return (
//     <div className="animate-fade-in">
//       <HeroSection />
//       <TrendingSection />
//       <FeaturedAuthors />
//       <PopularBooks />
//       <VideoHighlights />
//       <DailyQuote />
//       <PremiumCTA />
//     </div>
//   )
// }

// export default HomePage












// // client/src/pages/public/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import HeroSection from '../../components/home/HeroSection.jsx';
// import TrendingSection from '../../components/home/TrendingSection.jsx';
// import FeaturedAuthors from '../../components/home/FeaturedAuthors.jsx';
// import PopularBooks from '../../components/home/PopularBooks.jsx';
// import VideoHighlights from '../../components/home/VideoHighlights.jsx';
// import DailyQuote from '../../components/home/DailyQuote.jsx';
// import PremiumCTA from '../../components/home/PremiumCTA.jsx';
// import SubscriptionPlans from '../../components/home/SubscriptionPlans.jsx';
// import AudioPlayer from '../../components/home/AudioPlayer.jsx';
// import { motion } from 'framer-motion';
// import { Music, Headphones, Sparkles, Crown } from 'lucide-react';

// const HomePage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [playlist, setPlaylist] = useState([]);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [showAudioPlayer, setShowAudioPlayer] = useState(false);

//   useEffect(() => {
//     // Check URL params for subscription modal
//     const params = new URLSearchParams(window.location.search);
//     if (params.get('subscribe') === 'true') {
//       setShowSubscriptionModal(true);
//     }
//   }, []);

//   const handlePlayTrack = (track, tracksList) => {
//     setPlaylist(tracksList || [track]);
//     setCurrentTrack(track);
//     setCurrentTrackIndex(tracksList ? tracksList.findIndex(t => t.id === track.id) : 0);
//     setShowAudioPlayer(true);
//   };

//   const handleTrackChange = (newIndex) => {
//     setCurrentTrackIndex(newIndex);
//     setCurrentTrack(playlist[newIndex]);
//   };

//   return (
//     <div className="animate-fade-in">
//       {/* Hero Section */}
//       <HeroSection onSubscribe={() => setShowSubscriptionModal(true)} />
      
//       {/* Trending Section */}
//       <TrendingSection onPlayTrack={handlePlayTrack} />
      
//       {/* Featured Authors */}
//       <FeaturedAuthors />
      
//       {/* Popular Books with Audio Preview */}
//       <PopularBooks onPlayTrack={handlePlayTrack} />
      
//       {/* Video Highlights */}
//       <VideoHighlights />
      
//       {/* Daily Quote */}
//       <DailyQuote />
      
//       {/* Premium CTA */}
//       <PremiumCTA onSubscribe={() => setShowSubscriptionModal(true)} />

//       {/* Floating Music Player Button (Mobile) */}
//       {!showAudioPlayer && (
//         <motion.button
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           whileHover={{ scale: 1.1 }}
//           onClick={() => {
//             if (playlist.length > 0) {
//               setShowAudioPlayer(true);
//             } else {
//               // Load default playlist
//               setPlaylist(defaultPlaylist);
//               setCurrentTrack(defaultPlaylist[0]);
//               setShowAudioPlayer(true);
//             }
//           }}
//           className="fixed bottom-6 right-6 md:hidden bg-primary-600 text-white p-4 rounded-full shadow-lg z-40"
//         >
//           <Headphones className="h-6 w-6" />
//         </motion.button>
//       )}

//       {/* Subscription Plans Modal */}
//       {showSubscriptionModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
//           >
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
//                 <p className="text-gray-500 mt-1">Get unlimited access to premium content</p>
//               </div>
//               <button
//                 onClick={() => setShowSubscriptionModal(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
            
//             <SubscriptionPlans 
//               onPlanSelect={(plan, billingCycle, response) => {
//                 if (plan.id === 'free') {
//                   setShowSubscriptionModal(false);
//                 } else {
//                   // Redirect to payment or show payment modal
//                   window.location.href = '/checkout';
//                 }
//               }}
//               showCurrentPlan={true}
//             />
//           </motion.div>
//         </div>
//       )}

//       {/* Audio Player */}
//       {showAudioPlayer && currentTrack && (
//         <AudioPlayer
//           tracks={playlist}
//           currentTrackIndex={currentTrackIndex}
//           onTrackChange={handleTrackChange}
//           onClose={() => setShowAudioPlayer(false)}
//         />
//       )}
//     </div>
//   );
// };

// const defaultPlaylist = [
//   {
//     id: 1,
//     title: "The Road Not Taken",
//     artist: "Robert Frost",
//     audioUrl: "/audio/road-not-taken.mp3",
//     coverArt: "/images/poetry.jpg",
//     isPremium: false
//   },
//   {
//     id: 2,
//     title: "If You Forget Me",
//     artist: "Pablo Neruda",
//     audioUrl: "/audio/if-you-forget-me.mp3",
//     coverArt: "/images/poetry2.jpg",
//     isPremium: true
//   },
//   {
//     id: 3,
//     title: "Still I Rise",
//     artist: "Maya Angelou",
//     audioUrl: "/audio/still-i-rise.mp3",
//     coverArt: "/images/poetry3.jpg",
//     isPremium: true
//   }
// ];

// export default HomePage;









// // client/src/pages/public/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Check, Crown, Star, Sparkles, BookOpen, Headphones, Zap, Shield, ArrowRight, Download, X } from 'lucide-react';
// import HeroSection from '../../components/home/HeroSection.jsx';
// import TrendingSection from '../../components/home/TrendingSection.jsx';
// import FeaturedAuthors from '../../components/home/FeaturedAuthors.jsx';
// import PopularBooks from '../../components/home/PopularBooks.jsx';
// import VideoHighlights from '../../components/home/VideoHighlights.jsx';
// import DailyQuote from '../../components/home/DailyQuote.jsx';
// import AudioPlayer from '../../components/home/AudioPlayer.jsx';

// const HomePage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [playlist, setPlaylist] = useState([]);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [showAudioPlayer, setShowAudioPlayer] = useState(false);

//   // Subscription Plans Data
//   const plans = [
//     {
//       id: 'free',
//       name: 'Free',
//       price: 0,
//       icon: Sparkles,
//       color: 'from-gray-400 to-gray-500',
//       bgColor: 'bg-gray-50',
//       buttonColor: 'bg-gray-600 hover:bg-gray-700',
//       features: [
//         'Access to free poems and books',
//         'Basic search functionality',
//         'Read public domain content',
//         'Limited daily reads (50 poems/day)'
//       ]
//     },
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 99,
//       originalPrice: 199,
//       icon: BookOpen,
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'bg-blue-50',
//       buttonColor: 'bg-blue-600 hover:bg-blue-700',
//       badge: 'Popular',
//       features: [
//         'Everything in Free',
//         'Download up to 5 ebooks/month',
//         'Basic audio streaming',
//         'Remove ads',
//         'Priority email support'
//       ]
//     },
//     {
//       id: 'premium',
//       name: 'Premium',
//       price: 199,
//       originalPrice: 399,
//       icon: Crown,
//       color: 'from-amber-500 to-orange-500',
//       bgColor: 'bg-amber-50',
//       buttonColor: 'bg-amber-600 hover:bg-amber-700',
//       badge: 'Best Value',
//       recommended: true,
//       features: [
//         'Everything in Basic',
//         'Unlimited downloads',
//         'HD audio streaming',
//         'AI-powered explanations',
//         'Early access to new content',
//         'Priority support'
//       ]
//     },
//     {
//       id: 'pro',
//       name: 'Pro',
//       price: 499,
//       originalPrice: 999,
//       icon: Zap,
//       color: 'from-purple-500 to-pink-500',
//       bgColor: 'bg-purple-50',
//       buttonColor: 'bg-purple-600 hover:bg-purple-700',
//       badge: 'Creator',
//       features: [
//         'Everything in Premium',
//         'Creator tools & analytics',
//         'Upload your own content',
//         'Monetization options',
//         'Dedicated account manager',
//         'API access'
//       ]
//     }
//   ];

//   const handlePlayTrack = (track, tracksList) => {
//     setPlaylist(tracksList || [track]);
//     setCurrentTrack(track);
//     setCurrentTrackIndex(tracksList ? tracksList.findIndex(t => t.id === track.id) : 0);
//     setShowAudioPlayer(true);
//   };

//   const handleTrackChange = (newIndex) => {
//     setCurrentTrackIndex(newIndex);
//     setCurrentTrack(playlist[newIndex]);
//   };

//   return (
//     <div className="animate-fade-in">
//       {/* Hero Section */}
//       <HeroSection />
      
//       {/* Trending Section */}
//       <TrendingSection onPlayTrack={handlePlayTrack} />
      
//       {/* Featured Authors */}
//       <FeaturedAuthors />
      
//       {/* Popular Books with Audio Preview */}
//       <PopularBooks onPlayTrack={handlePlayTrack} />
      
//       {/* Video Highlights */}
//       <VideoHighlights />
      
//       {/* Daily Quote */}
//       <DailyQuote />
      
//       {/* Subscription Plans Section - Simplified & Beautiful */}
//       <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
//               <Crown className="h-4 w-4 text-primary-600" />
//               <span className="text-sm font-medium text-primary-600">Membership Plans</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Choose Your Perfect Plan
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Unlock unlimited access to premium poems, books, and audio content
//             </p>
            
//             {/* Current Plan Badge */}
//             {user && user.subscription?.plan !== 'free' && (
//               <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
//                 <Shield className="h-4 w-4 text-green-600" />
//                 <span className="text-sm text-green-700">
//                   Current: {user.subscription?.plan?.charAt(0).toUpperCase() + user.subscription?.plan?.slice(1)} Plan
//                 </span>
//               </div>
//             )}
//           </motion.div>

//           {/* Plans Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {plans.map((plan, index) => {
//               const Icon = plan.icon;
//               const isFree = plan.price === 0;
              
//               return (
//                 <motion.div
//                   key={plan.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 ${
//                     plan.recommended 
//                       ? 'shadow-2xl ring-2 ring-amber-400 scale-105 md:scale-105' 
//                       : 'shadow-xl hover:shadow-2xl'
//                   }`}
//                 >
//                   {/* Badge */}
//                   {plan.badge && (
//                     <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white ${
//                       plan.recommended ? 'bg-amber-500' : 'bg-primary-500'
//                     }`}>
//                       {plan.badge}
//                     </div>
//                   )}

//                   {/* Card Content */}
//                   <div className={`${plan.bgColor} p-6`}>
//                     {/* Icon */}
//                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
//                       <Icon className="h-8 w-8 text-white" />
//                     </div>

//                     {/* Plan Name */}
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    
//                     {/* Price */}
//                     <div className="mb-4">
//                       <div className="flex items-baseline">
//                         <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
//                         <span className="text-gray-500 ml-2">/month</span>
//                       </div>
//                       {plan.originalPrice > plan.price && (
//                         <p className="text-sm text-green-600 mt-1">
//                           <span className="line-through text-gray-400">₹{plan.originalPrice}</span>
//                           {' '}Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
//                         </p>
//                       )}
//                     </div>

//                     {/* Description */}
//                     <p className="text-gray-600 text-sm mb-6">
//                       {plan.id === 'free' && 'Perfect for getting started'}
//                       {plan.id === 'basic' && 'Great for regular readers'}
//                       {plan.id === 'premium' && 'For serious literature enthusiasts'}
//                       {plan.id === 'pro' && 'For creators and power users'}
//                     </p>

//                     {/* Features */}
//                     <ul className="space-y-3 mb-8">
//                       {plan.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-start text-sm">
//                           <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                           <span className="text-gray-700">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Action Button */}
//                     {isFree ? (
//                       <Link
//                         to="/explore"
//                         className={`w-full py-3 rounded-xl font-semibold text-white text-center block transition-all ${plan.buttonColor}`}
//                       >
//                         Get Started
//                       </Link>
//                     ) : (
//                       <Link
//                         to={user ? '/checkout' : '/login'}
//                         state={{ from: '/', plan: plan.id }}
//                         className={`w-full py-3 rounded-xl font-semibold text-white text-center block transition-all ${plan.buttonColor}`}
//                       >
//                         {user ? `Subscribe to ${plan.name}` : 'Get Started'}
//                       </Link>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Features Highlight */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
//           >
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold text-gray-900">What You Get With Premium</h3>
//               <p className="text-gray-600 mt-2">Everything you need to enjoy literature at its best</p>
//             </div>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <BookOpen className="h-6 w-6 text-primary-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Unlimited Reading</h4>
//                 <p className="text-sm text-gray-600">Access thousands of books and poems without limits</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Headphones className="h-6 w-6 text-primary-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Audio Content</h4>
//                 <p className="text-sm text-gray-600">Listen to premium audio poems and books</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Download className="h-6 w-6 text-primary-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Download & Offline</h4>
//                 <p className="text-sm text-gray-600">Download content and read offline anytime</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* FAQ Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-16 text-center"
//           >
//             <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
//             <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
//               <div className="text-left">
//                 <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
//                 <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time with no questions asked!</p>
//               </div>
//               <div className="text-left">
//                 <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
//                 <p className="text-gray-600 text-sm">We offer a 7-day free trial on all paid plans. Cancel anytime during trial.</p>
//               </div>
//               <div className="text-left">
//                 <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
//                 <p className="text-gray-600 text-sm">We accept credit cards, UPI, net banking, and digital wallets.</p>
//               </div>
//               <div className="text-left">
//                 <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan later?</h4>
//                 <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade anytime from your account settings.</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Trust Badges */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="mt-12 flex flex-wrap justify-center gap-6"
//           >
//             <div className="flex items-center gap-2 text-gray-500">
//               <Shield className="h-5 w-5" />
//               <span className="text-sm">Secure Payments</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-500">
//               <Headphones className="h-5 w-5" />
//               <span className="text-sm">24/7 Support</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-500">
//               <Download className="h-5 w-5" />
//               <span className="text-sm">Cancel Anytime</span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Audio Player */}
//       {showAudioPlayer && currentTrack && (
//         <AudioPlayer
//           tracks={playlist}
//           currentTrackIndex={currentTrackIndex}
//           onTrackChange={handleTrackChange}
//           onClose={() => setShowAudioPlayer(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default HomePage;







// client/src/pages/public/HomePage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, Crown, Sparkles, BookOpen,
  Headphones, Zap, Shield, Download
} from 'lucide-react';

import HeroSection from '../../components/home/HeroSection.jsx';
import TrendingSection from '../../components/home/TrendingSection.jsx';
import FeaturedAuthors from '../../components/home/FeaturedAuthors.jsx';
import PopularBooks from '../../components/home/PopularBooks.jsx';
import VideoHighlights from '../../components/home/VideoHighlights.jsx';
import DailyQuote from '../../components/home/DailyQuote.jsx';
import AudioPlayer from '../../components/home/AudioPlayer.jsx';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      icon: Sparkles,
      gradient: 'from-gray-400 to-gray-600',
      features: ['Free poems & books', 'Basic search', 'Public content', '50 reads/day']
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      originalPrice: 199,
      icon: BookOpen,
      gradient: 'from-blue-500 to-indigo-600',
      badge: 'Popular',
      features: ['Everything in Free', '5 downloads/month', 'Audio access', 'No ads']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      originalPrice: 399,
      icon: Crown,
      gradient: 'from-amber-400 to-orange-500',
      badge: 'Best Value',
      recommended: true,
      features: ['Unlimited downloads', 'HD audio', 'AI explanations', 'Early access']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 499,
      originalPrice: 999,
      icon: Zap,
      gradient: 'from-purple-500 to-pink-600',
      badge: 'Creator',
      features: ['Creator tools', 'Upload content', 'Monetization', 'API access']
    }
  ];

  const handlePlayTrack = (track, tracksList) => {
    setPlaylist(tracksList || [track]);
    setCurrentTrack(track);
    setCurrentTrackIndex(tracksList ? tracksList.findIndex(t => t.id === track.id) : 0);
    setShowAudioPlayer(true);
  };

  const handleTrackChange = (i) => {
    setCurrentTrackIndex(i);
    setCurrentTrack(playlist[i]);
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">

      <HeroSection />
      <TrendingSection onPlayTrack={handlePlayTrack} />
      <FeaturedAuthors />
      <PopularBooks onPlayTrack={handlePlayTrack} />
      <VideoHighlights />
      <DailyQuote />

      {/* ================= PREMIUM PRICING ================= */}
      <section className="py-24 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 opacity-70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-blue-300 opacity-20 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-md border">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Membership Plans</span>
            </div>

            <h2 className="text-5xl font-bold mt-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Upgrade Your Experience
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Premium access to books, poetry, and audio — beautifully designed for you.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

            {plans.map((plan, i) => {
              const Icon = plan.icon;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative group rounded-3xl p-[1px] bg-gradient-to-r ${plan.gradient}`}
                >
                  <div className={`
                    h-full rounded-3xl p-8 backdrop-blur-xl
                    bg-white/80 border border-white/40
                    shadow-xl transition-all duration-500
                    group-hover:shadow-2xl group-hover:-translate-y-2
                    ${plan.recommended && 'scale-105 shadow-2xl'}
                  `}>

                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-black text-white">
                        {plan.badge}
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${plan.gradient} shadow-lg mb-6`}>
                      <Icon className="text-white w-7 h-7" />
                    </div>

                    <h3 className="text-2xl font-semibold">{plan.name}</h3>

                    {/* Price */}
                    <div className="mt-4">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-gray-500 ml-1">/mo</span>
                    </div>

                    {plan.originalPrice && (
                      <p className="text-sm text-green-500 mt-1">
                        <span className="line-through text-gray-400">
                          ₹{plan.originalPrice}
                        </span>{' '}
                        Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                      </p>
                    )}

                    {/* Features */}
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <Link
                      to={plan.price === 0 ? '/explore' : (user ? '/checkout' : '/login')}
                      state={{ from: '/', plan: plan.id }}
                      className={`
                        mt-8 block text-center py-3 rounded-xl font-semibold
                        bg-gradient-to-r ${plan.gradient} text-white
                        shadow-md hover:shadow-xl transition-all
                      `}
                    >
                      {plan.price === 0
                        ? 'Start Free'
                        : user
                          ? `Get ${plan.name}`
                          : 'Get Started'}
                    </Link>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Trust Section */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={18} /> Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <Headphones size={18} /> 24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <Download size={18} /> Cancel Anytime
            </div>
          </div>

        </div>
      </section>

      {/* Audio Player */}
      {showAudioPlayer && currentTrack && (
        <AudioPlayer
          tracks={playlist}
          currentTrackIndex={currentTrackIndex}
          onTrackChange={handleTrackChange}
          onClose={() => setShowAudioPlayer(false)}
        />
      )}
    </div>
  );
};

export default HomePage;