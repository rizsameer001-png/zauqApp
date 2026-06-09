// // client/src/components/ads/AdBanner.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { X } from 'lucide-react';
// import adAPI from '../../api/adAPI';

// // Dummy ads for fallback when no ads from API
// const DUMMY_ADS = {
//   'sidebar-top': {
//     name: 'Featured Book',
//     imageUrl: 'https://placehold.co/300x250/8B5CF6/white?text=Buy+Poetry+Books',
//     linkUrl: '#',
//     altText: 'Buy poetry books',
//     codeType: 'image'
//   },
//   'sidebar-middle': {
//     name: 'Poetry Workshop',
//     imageUrl: 'https://placehold.co/300x250/F59E0B/white?text=Join+Poetry+Workshop',
//     linkUrl: '#',
//     altText: 'Learn poetry',
//     codeType: 'image'
//   },
//   'sidebar-bottom': {
//     name: 'Competition',
//     imageUrl: 'https://placehold.co/300x250/10B981/white?text=Poetry+Competition',
//     linkUrl: '#',
//     altText: 'Submit poem',
//     codeType: 'image'
//   }
// };

// const AdBanner = ({ position, page = 'poem-detail', className = '', onClose = null, autoHeight = true }) => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [useDummy, setUseDummy] = useState(false);
//   const impressionTracked = useRef(new Set());

//   useEffect(() => {
//     fetchAds();
//   }, [position, page]);

//   const fetchAds = async () => {
//     try {
//       const response = await adAPI.getAdsByPosition(position, page);
//       if (response.success && response.data && response.data.length > 0) {
//         setAds(response.data);
//         setUseDummy(false);
//       } else {
//         // Use dummy ads if no ads from API
//         const dummyAd = DUMMY_ADS[position];
//         if (dummyAd) {
//           setAds([dummyAd]);
//           setUseDummy(true);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch ads:', error);
//       // Use dummy ads on error
//       const dummyAd = DUMMY_ADS[position];
//       if (dummyAd) {
//         setAds([dummyAd]);
//         setUseDummy(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const trackImpression = (adId) => {
//     if (!impressionTracked.current.has(adId) && !useDummy) {
//       impressionTracked.current.add(adId);
//       adAPI.trackImpression(adId).catch(console.error);
//     }
//   };

//   const trackClick = async (adId, linkUrl) => {
//     if (!useDummy) {
//       await adAPI.trackClick(adId);
//     }
//     if (linkUrl && linkUrl !== '#') {
//       window.open(linkUrl, '_blank');
//     }
//   };

//   const renderAdContent = (ad) => {
//     trackImpression(ad._id || ad.name);
    
//     if (ad.codeType === 'html' && ad.htmlCode) {
//       return <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />;
//     }
    
//     return (
//       <div 
//         className="relative cursor-pointer group overflow-hidden rounded-lg"
//         onClick={() => trackClick(ad._id || ad.name, ad.linkUrl)}
//       >
//         <img
//           src={ad.imageUrl}
//           alt={ad.altText || ad.name}
//           className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
//       </div>
//     );
//   };

//   if (loading || !isVisible || ads.length === 0) return null;

//   const currentAd = ads[currentAdIndex];

//   // Auto-rotate ads every 10 seconds if multiple
//   useEffect(() => {
//     if (ads.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentAdIndex((prev) => (prev + 1) % ads.length);
//       }, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [ads.length]);

//   const getPositionClasses = () => {
//     const baseClasses = 'relative z-10';
//     switch (position) {
//       case 'sidebar-top':
//         return `${baseClasses} mb-6`;
//       case 'sidebar-bottom':
//         return `${baseClasses} mt-6`;
//       case 'right':
//         return `${baseClasses} ${autoHeight ? '' : 'sticky top-24'}`;
//       default:
//         return baseClasses;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className={`ad-container ${getPositionClasses()} ${className}`}
//     >
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         {/* Ad Label */}
//         <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
//           <span className="text-[10px] text-gray-400 uppercase tracking-wider">
//             {useDummy ? 'Advertisement' : 'Sponsored'}
//           </span>
//           {onClose && (
//             <button
//               onClick={() => {
//                 setIsVisible(false);
//                 onClose?.();
//               }}
//               className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//             >
//               <X className="h-3 w-3 text-gray-400" />
//             </button>
//           )}
//         </div>
        
//         {/* Ad Content */}
//         <div className="p-3 flex justify-center items-center">
//           {renderAdContent(currentAd)}
//         </div>
        
//         {/* Ad Navigation Dots (if multiple ads) */}
//         {ads.length > 1 && (
//           <div className="flex justify-center gap-1 pb-2">
//             {ads.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentAdIndex(idx)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   idx === currentAdIndex
//                     ? 'w-4 bg-primary-500'
//                     : 'w-1.5 bg-gray-300 dark:bg-gray-600'
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdBanner;














// // client/src/components/ads/AdBanner.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { X } from 'lucide-react';
// import adAPI from '../../api/adAPI';

// // Dummy ads for fallback when no ads from API
// const DUMMY_ADS = {
//   'sidebar-top': [
//     {
//       name: 'Featured Poetry Book',
//       imageUrl: 'https://placehold.co/300x250/8B5CF6/white?text=Buy+Poetry+Books',
//       linkUrl: '#',
//       altText: 'Buy poetry books',
//       codeType: 'image'
//     },
//     {
//       name: 'Book Sale',
//       imageUrl: 'https://placehold.co/300x250/EF4444/white?text=50%25+OFF',
//       linkUrl: '#',
//       altText: 'Poetry book sale',
//       codeType: 'image'
//     }
//   ],
//   'sidebar-bottom': [
//     {
//       name: 'Poetry Workshop',
//       imageUrl: 'https://placehold.co/300x250/F59E0B/white?text=Join+Poetry+Workshop',
//       linkUrl: '#',
//       altText: 'Learn poetry',
//       codeType: 'image'
//     },
//     {
//       name: 'Poetry Competition',
//       imageUrl: 'https://placehold.co/300x250/10B981/white?text=Poetry+Competition',
//       linkUrl: '#',
//       altText: 'Submit poem',
//       codeType: 'image'
//     },
//     {
//       name: 'Amazon Ad',
//       imageUrl: 'https://placehold.co/300x250/3B82F6/white?text=Shop+on+Amazon',
//       linkUrl: '#',
//       altText: 'Shop now',
//       codeType: 'image'
//     }
//   ]
// };

// const AdBanner = ({ position, page = 'poem-detail', className = '', onClose = null, autoHeight = true }) => {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [useDummy, setUseDummy] = useState(false);
//   const impressionTracked = useRef(new Set());

//   useEffect(() => {
//     fetchAds();
//   }, [position, page]);

//   const fetchAds = async () => {
//     try {
//       const response = await adAPI.getAdsByPosition(position, page);
//       if (response.success && response.data && response.data.length > 0) {
//         setAds(response.data);
//         setUseDummy(false);
//       } else {
//         // Use dummy ads if no ads from API
//         const dummyAdList = DUMMY_ADS[position];
//         if (dummyAdList && dummyAdList.length > 0) {
//           setAds(dummyAdList);
//           setUseDummy(true);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch ads:', error);
//       // Use dummy ads on error
//       const dummyAdList = DUMMY_ADS[position];
//       if (dummyAdList && dummyAdList.length > 0) {
//         setAds(dummyAdList);
//         setUseDummy(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const trackImpression = (adId) => {
//     if (!impressionTracked.current.has(adId) && !useDummy && adId) {
//       impressionTracked.current.add(adId);
//       adAPI.trackImpression(adId).catch(console.error);
//     }
//   };

//   const trackClick = async (adId, linkUrl) => {
//     if (!useDummy && adId) {
//       await adAPI.trackClick(adId);
//     }
//     if (linkUrl && linkUrl !== '#') {
//       window.open(linkUrl, '_blank');
//     }
//   };

//   const renderAdContent = (ad) => {
//     trackImpression(ad._id || ad.name);
    
//     if (ad.codeType === 'html' && ad.htmlCode) {
//       return <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />;
//     }
    
//     return (
//       <div 
//         className="relative cursor-pointer group overflow-hidden rounded-lg"
//         onClick={() => trackClick(ad._id || ad.name, ad.linkUrl)}
//       >
//         <img
//           src={ad.imageUrl}
//           alt={ad.altText || ad.name}
//           className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
//       </div>
//     );
//   };

//   if (loading || !isVisible || ads.length === 0) return null;

//   const currentAd = ads[currentAdIndex];

//   // Auto-rotate ads every 8 seconds if multiple
//   useEffect(() => {
//     if (ads.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentAdIndex((prev) => (prev + 1) % ads.length);
//       }, 8000);
//       return () => clearInterval(interval);
//     }
//   }, [ads.length]);

//   const getPositionClasses = () => {
//     const baseClasses = 'relative z-10';
//     switch (position) {
//       case 'sidebar-top':
//         return `${baseClasses} mb-6`;
//       case 'sidebar-bottom':
//         return `${baseClasses} mt-6`;
//       case 'right':
//         return `${baseClasses} ${autoHeight ? '' : 'sticky top-24'}`;
//       default:
//         return baseClasses;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className={`ad-container ${getPositionClasses()} ${className}`}
//     >
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         {/* Ad Label */}
//         <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
//           <span className="text-[10px] text-gray-400 uppercase tracking-wider">
//             {useDummy ? 'Advertisement' : 'Sponsored'}
//           </span>
//           {onClose && (
//             <button
//               onClick={() => {
//                 setIsVisible(false);
//                 onClose?.();
//               }}
//               className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//             >
//               <X className="h-3 w-3 text-gray-400" />
//             </button>
//           )}
//         </div>
        
//         {/* Ad Content */}
//         <div className="p-3 flex justify-center items-center min-h-[200px]">
//           {renderAdContent(currentAd)}
//         </div>
        
//         {/* Ad Navigation Dots (if multiple ads) */}
//         {ads.length > 1 && (
//           <div className="flex justify-center gap-1 pb-3">
//             {ads.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentAdIndex(idx)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   idx === currentAdIndex
//                     ? 'w-4 bg-primary-500'
//                     : 'w-1.5 bg-gray-300 dark:bg-gray-600'
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdBanner;
















// client/src/components/ads/AdBanner.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import adAPI from '../../api/adAPI';

// Dummy ads for fallback when no ads from API
const DUMMY_ADS = {
  'sidebar-top': {
    name: 'Featured Poetry Book',
    imageUrl: 'https://placehold.co/300x250/8B5CF6/white?text=Buy+Poetry+Books',
    linkUrl: '#',
    altText: 'Buy poetry books',
    codeType: 'image'
  },
  'sidebar-bottom': {
    name: 'Poetry Workshop',
    imageUrl: 'https://placehold.co/300x250/F59E0B/white?text=Join+Poetry+Workshop',
    linkUrl: '#',
    altText: 'Learn poetry',
    codeType: 'image'
  }
};

const AdBanner = ({ position, page = 'poem-detail', className = '', onClose = null, autoHeight = true }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [useDummy, setUseDummy] = useState(false);
  const impressionTracked = useRef(new Set());

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        // Check if adAPI exists and has the method
        if (!adAPI || typeof adAPI.getAdsByPosition !== 'function') {
          console.warn('adAPI not available, using dummy ads');
          const dummyAd = DUMMY_ADS[position];
          if (dummyAd) {
            setAds([dummyAd]);
            setUseDummy(true);
          }
          setLoading(false);
          return;
        }

        const response = await adAPI.getAdsByPosition(position, page);
        if (response && response.success && response.data && response.data.length > 0) {
          setAds(response.data);
          setUseDummy(false);
        } else {
          const dummyAd = DUMMY_ADS[position];
          if (dummyAd) {
            setAds([dummyAd]);
            setUseDummy(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch ads:', error);
        const dummyAd = DUMMY_ADS[position];
        if (dummyAd) {
          setAds([dummyAd]);
          setUseDummy(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [position, page]);

  // Auto-rotate ads every 8 seconds if multiple
  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  const trackImpression = (adId) => {
    if (!impressionTracked.current.has(adId) && !useDummy && adId && adAPI && typeof adAPI.trackImpression === 'function') {
      impressionTracked.current.add(adId);
      adAPI.trackImpression(adId).catch(console.error);
    }
  };

  const trackClick = async (adId, linkUrl) => {
    if (!useDummy && adId && adAPI && typeof adAPI.trackClick === 'function') {
      await adAPI.trackClick(adId);
    }
    if (linkUrl && linkUrl !== '#') {
      window.open(linkUrl, '_blank');
    }
  };

  const renderAdContent = (ad) => {
    trackImpression(ad._id || ad.name);
    
    if (ad.codeType === 'html' && ad.htmlCode) {
      return <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />;
    }
    
    return (
      <div 
        className="relative cursor-pointer group overflow-hidden rounded-lg"
        onClick={() => trackClick(ad._id || ad.name, ad.linkUrl)}
      >
        <img
          src={ad.imageUrl}
          alt={ad.altText || ad.name}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
      </div>
    );
  };

  // Early return after all hooks are declared
  if (loading || !isVisible) return null;
  if (ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`ad-container mb-6 ${className}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Ad Label */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            {useDummy ? 'Advertisement' : 'Sponsored'}
          </span>
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
        <div className="p-3 flex justify-center items-center min-h-[200px]">
          {renderAdContent(currentAd)}
        </div>
        
        {/* Ad Navigation Dots (if multiple ads) */}
        {ads.length > 1 && (
          <div className="flex justify-center gap-1 pb-3">
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