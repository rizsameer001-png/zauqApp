// client/src/components/ads/AdBanner.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import adAPI from '../../api/adAPI';

const AdBanner = ({ position, page = 'poem-detail', className = '', onClose = null, autoHeight = true }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const impressionTracked = useRef(new Set());

  useEffect(() => {
    fetchAds();
  }, [position, page]);

  const fetchAds = async () => {
    try {
      const response = await adAPI.getAdsByPosition(position, page);
      if (response.success && response.data) {
        setAds(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackImpression = (adId) => {
    if (!impressionTracked.current.has(adId)) {
      impressionTracked.current.add(adId);
      adAPI.trackImpression(adId).catch(console.error);
    }
  };

  const trackClick = async (adId, linkUrl) => {
    await adAPI.trackClick(adId);
    if (linkUrl && linkUrl !== '#') {
      window.open(linkUrl, '_blank');
    }
  };

  const renderAdContent = (ad) => {
    trackImpression(ad._id);
    
    switch (ad.codeType) {
      case 'google_adsense':
        return (
          <div className="google-adsense-container">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={ad.googleAdClient}
              data-ad-slot={ad.googleAdSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
              }}
            />
          </div>
        );
      case 'html':
        return <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />;
      default:
        return (
          <div 
            className="relative cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => trackClick(ad._id, ad.linkUrl)}
          >
            <img
              src={ad.imageUrl}
              alt={ad.altText || ad.name}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              style={{ maxWidth: ad.dimensions.width, maxHeight: ad.dimensions.height }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          </div>
        );
    }
  };

  if (loading || !isVisible || ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  // Auto-rotate ads every 10 seconds if multiple
  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  const getPositionClasses = () => {
    const baseClasses = 'relative z-10';
    switch (position) {
      case 'sidebar-top':
        return `${baseClasses} mb-6`;
      case 'sidebar-bottom':
        return `${baseClasses} mt-6`;
      case 'right':
        return `${baseClasses} ${autoHeight ? '' : 'sticky top-24'}`;
      default:
        return baseClasses;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`ad-container ${getPositionClasses()} ${className}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Ad Label */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Sponsored</span>
          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
        </div>
        
        {/* Ad Content */}
        <div className="p-3 flex justify-center items-center">
          {renderAdContent(currentAd)}
        </div>
        
        {/* Ad Navigation Dots (if multiple ads) */}
        {ads.length > 1 && (
          <div className="flex justify-center gap-1 pb-2">
            {ads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentAdIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentAdIndex
                    ? 'w-4 bg-primary-500'
                    : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdBanner;