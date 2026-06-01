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












// client/src/pages/public/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeroSection from '../../components/home/HeroSection.jsx';
import TrendingSection from '../../components/home/TrendingSection.jsx';
import FeaturedAuthors from '../../components/home/FeaturedAuthors.jsx';
import PopularBooks from '../../components/home/PopularBooks.jsx';
import VideoHighlights from '../../components/home/VideoHighlights.jsx';
import DailyQuote from '../../components/home/DailyQuote.jsx';
import PremiumCTA from '../../components/home/PremiumCTA.jsx';
import SubscriptionPlans from '../../components/home/SubscriptionPlans.jsx';
import AudioPlayer from '../../components/home/AudioPlayer.jsx';
import { motion } from 'framer-motion';
import { Music, Headphones, Sparkles, Crown } from 'lucide-react';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  useEffect(() => {
    // Check URL params for subscription modal
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribe') === 'true') {
      setShowSubscriptionModal(true);
    }
  }, []);

  const handlePlayTrack = (track, tracksList) => {
    setPlaylist(tracksList || [track]);
    setCurrentTrack(track);
    setCurrentTrackIndex(tracksList ? tracksList.findIndex(t => t.id === track.id) : 0);
    setShowAudioPlayer(true);
  };

  const handleTrackChange = (newIndex) => {
    setCurrentTrackIndex(newIndex);
    setCurrentTrack(playlist[newIndex]);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <HeroSection onSubscribe={() => setShowSubscriptionModal(true)} />
      
      {/* Trending Section */}
      <TrendingSection onPlayTrack={handlePlayTrack} />
      
      {/* Featured Authors */}
      <FeaturedAuthors />
      
      {/* Popular Books with Audio Preview */}
      <PopularBooks onPlayTrack={handlePlayTrack} />
      
      {/* Video Highlights */}
      <VideoHighlights />
      
      {/* Daily Quote */}
      <DailyQuote />
      
      {/* Premium CTA */}
      <PremiumCTA onSubscribe={() => setShowSubscriptionModal(true)} />

      {/* Floating Music Player Button (Mobile) */}
      {!showAudioPlayer && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            if (playlist.length > 0) {
              setShowAudioPlayer(true);
            } else {
              // Load default playlist
              setPlaylist(defaultPlaylist);
              setCurrentTrack(defaultPlaylist[0]);
              setShowAudioPlayer(true);
            }
          }}
          className="fixed bottom-6 right-6 md:hidden bg-primary-600 text-white p-4 rounded-full shadow-lg z-40"
        >
          <Headphones className="h-6 w-6" />
        </motion.button>
      )}

      {/* Subscription Plans Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                <p className="text-gray-500 mt-1">Get unlimited access to premium content</p>
              </div>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <SubscriptionPlans 
              onPlanSelect={(plan, billingCycle, response) => {
                if (plan.id === 'free') {
                  setShowSubscriptionModal(false);
                } else {
                  // Redirect to payment or show payment modal
                  window.location.href = '/checkout';
                }
              }}
              showCurrentPlan={true}
            />
          </motion.div>
        </div>
      )}

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

const defaultPlaylist = [
  {
    id: 1,
    title: "The Road Not Taken",
    artist: "Robert Frost",
    audioUrl: "/audio/road-not-taken.mp3",
    coverArt: "/images/poetry.jpg",
    isPremium: false
  },
  {
    id: 2,
    title: "If You Forget Me",
    artist: "Pablo Neruda",
    audioUrl: "/audio/if-you-forget-me.mp3",
    coverArt: "/images/poetry2.jpg",
    isPremium: true
  },
  {
    id: 3,
    title: "Still I Rise",
    artist: "Maya Angelou",
    audioUrl: "/audio/still-i-rise.mp3",
    coverArt: "/images/poetry3.jpg",
    isPremium: true
  }
];

export default HomePage;