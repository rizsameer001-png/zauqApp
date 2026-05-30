// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
// import { ChevronRight, BookOpen, Play, PenTool } from 'lucide-react'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/effect-fade'

// const slides = [
//   {
//     id: 1,
//     title: 'Discover the Beauty of Words',
//     subtitle: 'Explore Urdu poetry, Hindi literature, and English classics in one place',
//     image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
//     cta: { primary: 'Explore Poetry', secondary: 'Watch Videos', primaryPath: '/poetry', secondaryPath: '/videos' },
//   },
//   {
//     id: 2,
//     title: 'Classical Ghazals & Modern Poetry',
//     subtitle: 'From Mir and Ghalib to contemporary voices',
//     image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
//     cta: { primary: 'Read Ghazals', secondary: 'Discover Authors', primaryPath: '/poetry?genre=ghazal', secondaryPath: '/authors' },
//   },
//   {
//     id: 3,
//     title: 'Rare Books & Literary Journals',
//     subtitle: 'Access centuries of literary heritage',
//     image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920',
//     cta: { primary: 'Browse Books', secondary: 'Start Reading', primaryPath: '/books', secondaryPath: '/books' },
//   },
// ]

// const HeroSection = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="relative h-[600px] md:h-[700px] overflow-hidden">
//       <Swiper
//         modules={[Autoplay, Pagination, EffectFade]}
//         effect="fade"
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop
//         className="h-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full">
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${slide.image})` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="relative h-full flex items-center">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="max-w-2xl"
//                   >
//                     <div className="flex items-center space-x-2 mb-4">
//                       <span className="px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full">
//                         AI Powered
//                       </span>
//                       <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
//                         Literary Ecosystem
//                       </span>
//                     </div>
//                     <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
//                       {slide.title}
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-200 mb-8">
//                       {slide.subtitle}
//                     </p>
//                     <div className="flex flex-wrap gap-4">
//                       <Link
//                         to={slide.cta.primaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
//                       >
//                         <BookOpen className="h-5 w-5" />
//                         <span>{slide.cta.primary}</span>
//                         <ChevronRight className="h-5 w-5" />
//                       </Link>
//                       <Link
//                         to={slide.cta.secondaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
//                       >
//                         <Play className="h-5 w-5" />
//                         <span>{slide.cta.secondary}</span>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Stats Bar */}
//       <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             {[
//               { icon: PenTool, value: '50,000+', label: 'Poems' },
//               { icon: BookOpen, value: '2,000+', label: 'Authors' },
//               { icon: Play, value: '10,000+', label: 'Videos' },
//               { icon: BookOpen, value: '5,000+', label: 'Books' },
//             ].map((stat, index) => (
//               <div key={index} className="flex items-center justify-center space-x-2">
//                 <stat.icon className="h-5 w-5 text-primary-400" />
//                 <div className="text-left">
//                   <p className="text-white font-bold">{stat.value}</p>
//                   <p className="text-gray-400 text-xs">{stat.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default HeroSection










// // client/src/components/home/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// import { ChevronRight, BookOpen, Play, PenTool, Loader2 } from 'lucide-react';
// import homepageAPI from '../../api/homepageAPI';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// const HeroSection = () => {
//   const { t } = useTranslation();
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState([
//     { icon: PenTool, value: '50,000+', label: 'Poems' },
//     { icon: BookOpen, value: '2,000+', label: 'Authors' },
//     { icon: Play, value: '10,000+', label: 'Videos' },
//     { icon: BookOpen, value: '5,000+', label: 'Books' },
//   ]);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     setLoading(true);
//     try {
//       const response = await homepageAPI.getConfig();
      
//       // Extract banners from hero section
//       let bannersData = [];
      
//       if (response?.data?.data) {
//         const heroSection = response.data.data.find(section => section.section === 'hero');
//         if (heroSection && heroSection.banners) {
//           bannersData = heroSection.banners;
//         }
//       } else if (response?.data) {
//         const heroSection = response.data.find(section => section.section === 'hero');
//         if (heroSection && heroSection.banners) {
//           bannersData = heroSection.banners;
//         }
//       } else if (Array.isArray(response)) {
//         const heroSection = response.find(section => section.section === 'hero');
//         if (heroSection && heroSection.banners) {
//           bannersData = heroSection.banners;
//         }
//       }
      
//       // Transform banners to slide format
//       const slidesData = bannersData
//         .filter(banner => banner.isActive !== false)
//         .map((banner, index) => ({
//           id: banner.id || index,
//           title: banner.title || 'Welcome to Our Platform',
//           subtitle: banner.subtitle || 'Discover literary treasures from around the world',
//           image: banner.image || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
//           cta: {
//             primary: banner.ctaText || 'Explore Now',
//             secondary: 'Watch Videos',
//             primaryPath: banner.ctaUrl || '/explore',
//             secondaryPath: '/videos'
//           }
//         }));
      
//       // If no banners from CMS, use default slides
//       if (slidesData.length === 0) {
//         setSlides(defaultSlides);
//       } else {
//         setSlides(slidesData);
//       }
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       // Use default slides on error
//       setSlides(defaultSlides);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Default slides as fallback
//   const defaultSlides = [
//     {
//       id: 1,
//       title: 'Discover the Beauty of Words',
//       subtitle: 'Explore Urdu poetry, Hindi literature, and English classics in one place',
//       image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
//       cta: { primary: 'Explore Poetry', secondary: 'Watch Videos', primaryPath: '/poetry', secondaryPath: '/videos' },
//     },
//     {
//       id: 2,
//       title: 'Classical Ghazals & Modern Poetry',
//       subtitle: 'From Mir and Ghalib to contemporary voices',
//       image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
//       cta: { primary: 'Read Ghazals', secondary: 'Discover Authors', primaryPath: '/poetry?genre=ghazal', secondaryPath: '/authors' },
//     },
//     {
//       id: 3,
//       title: 'Rare Books & Literary Journals',
//       subtitle: 'Access centuries of literary heritage',
//       image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920',
//       cta: { primary: 'Browse Books', secondary: 'Start Reading', primaryPath: '/books', secondaryPath: '/books' },
//     },
//   ];

//   if (loading) {
//     return (
//       <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
//           <p className="text-white/70">Loading banners...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative h-[600px] md:h-[700px] overflow-hidden">
//       <Swiper
//         modules={[Autoplay, Pagination, EffectFade]}
//         effect="fade"
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={slides.length > 1}
//         className="h-full"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full">
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${slide.image})` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="relative h-full flex items-center">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.2 }}
//                     className="max-w-2xl"
//                   >
//                     <div className="flex items-center space-x-2 mb-4">
//                       <span className="px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full">
//                         AI Powered
//                       </span>
//                       <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
//                         Literary Ecosystem
//                       </span>
//                     </div>
//                     <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
//                       {slide.title}
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-200 mb-8">
//                       {slide.subtitle}
//                     </p>
//                     <div className="flex flex-wrap gap-4">
//                       <Link
//                         to={slide.cta.primaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
//                       >
//                         <BookOpen className="h-5 w-5" />
//                         <span>{slide.cta.primary}</span>
//                         <ChevronRight className="h-5 w-5" />
//                       </Link>
//                       <Link
//                         to={slide.cta.secondaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
//                       >
//                         <Play className="h-5 w-5" />
//                         <span>{slide.cta.secondary}</span>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Stats Bar */}
//       <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             {stats.map((stat, index) => (
//               <div key={index} className="flex items-center justify-center space-x-2">
//                 <stat.icon className="h-5 w-5 text-primary-400" />
//                 <div className="text-left">
//                   <p className="text-white font-bold">{stat.value}</p>
//                   <p className="text-gray-400 text-xs">{stat.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;














// // client/src/components/home/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// import { ChevronRight, BookOpen, Play, PenTool, Loader2 } from 'lucide-react';
// import homepageAPI from '../../api/homepageAPI';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// const HeroSection = () => {
//   const { t } = useTranslation();
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState([
//     { icon: PenTool, value: '50,000+', label: 'Poems' },
//     { icon: BookOpen, value: '2,000+', label: 'Authors' },
//     { icon: Play, value: '10,000+', label: 'Videos' },
//     { icon: BookOpen, value: '5,000+', label: 'Books' },
//   ]);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     setLoading(true);
//     try {
//       // Try to get banners from multiple possible endpoints
//       let bannersData = [];
      
//       // Method 1: Try getBanners endpoint first
//       try {
//         const bannersResponse = await homepageAPI.getBanners();
//         if (bannersResponse && bannersResponse.data && Array.isArray(bannersResponse.data)) {
//           bannersData = bannersResponse.data;
//         } else if (bannersResponse && Array.isArray(bannersResponse)) {
//           bannersData = bannersResponse;
//         } else if (bannersResponse?.banners && Array.isArray(bannersResponse.banners)) {
//           bannersData = bannersResponse.banners;
//         }
//       } catch (bannerError) {
//         console.log('getBanners endpoint not available, trying config endpoint');
//       }
      
//       // Method 2: If no banners from getBanners, try getConfig
//       if (bannersData.length === 0) {
//         try {
//           const configResponse = await homepageAPI.getConfig();
          
//           // Extract banners from hero section in config
//           let configData = configResponse?.data || configResponse || {};
          
//           // Handle different response structures
//           if (configData.data && Array.isArray(configData.data)) {
//             const heroSection = configData.data.find(section => section.section === 'hero');
//             if (heroSection && heroSection.banners) {
//               bannersData = heroSection.banners;
//             }
//           } else if (Array.isArray(configData)) {
//             const heroSection = configData.find(section => section.section === 'hero');
//             if (heroSection && heroSection.banners) {
//               bannersData = heroSection.banners;
//             }
//           } else if (configData.hero && configData.hero.banners) {
//             bannersData = configData.hero.banners;
//           } else if (configData.banners) {
//             bannersData = configData.banners;
//           }
//         } catch (configError) {
//           console.log('getConfig endpoint not available');
//         }
//       }
      
//       // Method 3: Try getHomepageData as fallback
//       if (bannersData.length === 0) {
//         try {
//           const homepageResponse = await homepageAPI.getHomepageData();
//           let homepageData = homepageResponse?.data || homepageResponse || {};
          
//           if (homepageData.hero && homepageData.hero.banners) {
//             bannersData = homepageData.hero.banners;
//           } else if (homepageData.banners) {
//             bannersData = homepageData.banners;
//           }
//         } catch (homepageError) {
//           console.log('getHomepageData endpoint not available');
//         }
//       }
      
//       // Transform banners to slide format
//       const slidesData = bannersData
//         .filter(banner => banner.isActive !== false)
//         .map((banner, index) => ({
//           id: banner.id || banner._id || index,
//           title: banner.title || 'Welcome to Our Platform',
//           subtitle: banner.subtitle || banner.description || 'Discover literary treasures from around the world',
//           image: banner.image || banner.imageUrl || banner.url || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
//           cta: {
//             primary: banner.ctaText || banner.buttonText || 'Explore Now',
//             secondary: 'Watch Videos',
//             primaryPath: banner.ctaUrl || banner.link || '/explore',
//             secondaryPath: '/videos'
//           }
//         }));
      
//       // If no banners from CMS, use default slides
//       if (slidesData.length === 0) {
//         setSlides(defaultSlides);
//       } else {
//         setSlides(slidesData);
//       }
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       // Use default slides on error
//       setSlides(defaultSlides);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Default slides as fallback
//   const defaultSlides = [
//     {
//       id: 1,
//       title: 'Discover the Beauty of Words',
//       subtitle: 'Explore Urdu poetry, Hindi literature, and English classics in one place',
//       image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
//       cta: { primary: 'Explore Poetry', secondary: 'Watch Videos', primaryPath: '/poetry', secondaryPath: '/videos' },
//     },
//     {
//       id: 2,
//       title: 'Classical Ghazals & Modern Poetry',
//       subtitle: 'From Mir and Ghalib to contemporary voices',
//       image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
//       cta: { primary: 'Read Ghazals', secondary: 'Discover Authors', primaryPath: '/poetry?genre=ghazal', secondaryPath: '/authors' },
//     },
//     {
//       id: 3,
//       title: 'Rare Books & Literary Journals',
//       subtitle: 'Access centuries of literary heritage',
//       image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920',
//       cta: { primary: 'Browse Books', secondary: 'Start Reading', primaryPath: '/books', secondaryPath: '/books' },
//     },
//   ];

//   if (loading) {
//     return (
//       <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
//           <p className="text-white/70">Loading banners...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative h-[600px] md:h-[700px] overflow-hidden">
//       <Swiper
//         modules={[Autoplay, Pagination, EffectFade]}
//         effect="fade"
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={slides.length > 1}
//         className="h-full"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full">
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${slide.image})` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="relative h-full flex items-center">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.2 }}
//                     className="max-w-2xl"
//                   >
//                     <div className="flex items-center space-x-2 mb-4">
//                       <span className="px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full">
//                         AI Powered
//                       </span>
//                       <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
//                         Literary Ecosystem
//                       </span>
//                     </div>
//                     <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
//                       {slide.title}
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-200 mb-8">
//                       {slide.subtitle}
//                     </p>
//                     <div className="flex flex-wrap gap-4">
//                       <Link
//                         to={slide.cta.primaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
//                       >
//                         <BookOpen className="h-5 w-5" />
//                         <span>{slide.cta.primary}</span>
//                         <ChevronRight className="h-5 w-5" />
//                       </Link>
//                       <Link
//                         to={slide.cta.secondaryPath}
//                         className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
//                       >
//                         <Play className="h-5 w-5" />
//                         <span>{slide.cta.secondary}</span>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Stats Bar */}
//       <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             {stats.map((stat, index) => (
//               <div key={index} className="flex items-center justify-center space-x-2">
//                 <stat.icon className="h-5 w-5 text-primary-400" />
//                 <div className="text-left">
//                   <p className="text-white font-bold">{stat.value}</p>
//                   <p className="text-gray-400 text-xs">{stat.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;













// client/src/components/home/HeroSection.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ChevronRight, BookOpen, Play, PenTool, Loader2 } from 'lucide-react';
import homepageAPI from '../../api/homepageAPI';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Default slides with unique IDs
const DEFAULT_SLIDES = [
  {
    id: 'default-slide-1',
    title: 'Discover the Beauty of Words',
    subtitle: 'Explore Urdu poetry, Hindi literature, and English classics in one place',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
    cta: { 
      primary: 'Explore Poetry', 
      secondary: 'Watch Videos', 
      primaryPath: '/poetry', 
      secondaryPath: '/videos' 
    },
  },
  {
    id: 'default-slide-2',
    title: 'Classical Ghazals & Modern Poetry',
    subtitle: 'From Mir and Ghalib to contemporary voices',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
    cta: { 
      primary: 'Read Ghazals', 
      secondary: 'Discover Authors', 
      primaryPath: '/poetry?genre=ghazal', 
      secondaryPath: '/authors' 
    },
  },
  {
    id: 'default-slide-3',
    title: 'Rare Books & Literary Journals',
    subtitle: 'Access centuries of literary heritage',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920',
    cta: { 
      primary: 'Browse Books', 
      secondary: 'Start Reading', 
      primaryPath: '/books', 
      secondaryPath: '/books' 
    },
  },
];

// Stats with unique IDs
const STATS = [
  { id: 'stat-1', icon: PenTool, value: '50,000+', label: 'Poems' },
  { id: 'stat-2', icon: BookOpen, value: '2,000+', label: 'Authors' },
  { id: 'stat-3', icon: Play, value: '10,000+', label: 'Videos' },
  { id: 'stat-4', icon: BookOpen, value: '5,000+', label: 'Books' },
];

const HeroSection = () => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      let bannersData = [];
      
      // Method 1: Try getPublicBanners endpoint first (preferred)
      try {
        const response = await homepageAPI.getPublicBanners();
        if (response?.data && Array.isArray(response.data)) {
          bannersData = response.data;
        } else if (Array.isArray(response)) {
          bannersData = response;
        } else if (response?.banners && Array.isArray(response.banners)) {
          bannersData = response.banners;
        }
      } catch (error) {
        console.log('getPublicBanners not available, trying getBanners...');
        
        // Method 2: Try getBanners endpoint
        try {
          const response = await homepageAPI.getBanners();
          if (response?.data && Array.isArray(response.data)) {
            bannersData = response.data;
          } else if (Array.isArray(response)) {
            bannersData = response;
          } else if (response?.banners && Array.isArray(response.banners)) {
            bannersData = response.banners;
          }
        } catch (bannerError) {
          console.log('getBanners not available, trying getConfig...');
          
          // Method 3: Try getConfig endpoint
          try {
            const response = await homepageAPI.getConfig();
            let configData = response?.data || response || {};
            
            if (Array.isArray(configData)) {
              const heroSection = configData.find(section => section.section === 'hero');
              if (heroSection?.banners) {
                bannersData = heroSection.banners;
              }
            } else if (configData.hero?.banners) {
              bannersData = configData.hero.banners;
            } else if (configData.banners) {
              bannersData = configData.banners;
            }
          } catch (configError) {
            console.log('getConfig not available, using default slides');
          }
        }
      }
      
      // Transform banners to slide format with unique IDs
      let slidesData = [];
      if (bannersData.length > 0) {
        slidesData = bannersData
          .filter(banner => banner.isActive !== false)
          .map((banner, index) => ({
            id: banner.id || banner._id || `banner-${Date.now()}-${index}`,
            title: banner.title || 'Welcome to Our Platform',
            subtitle: banner.subtitle || banner.description || 'Discover literary treasures',
            image: banner.image || banner.imageUrl || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920',
            cta: {
              primary: banner.ctaText || banner.buttonText || 'Explore Now',
              secondary: 'Watch Videos',
              primaryPath: banner.ctaUrl || banner.link || '/explore',
              secondaryPath: '/videos'
            }
          }));
      }
      
      // Use default slides if no banners from API
      setSlides(slidesData.length > 0 ? slidesData : DEFAULT_SLIDES);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setSlides(DEFAULT_SLIDES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Memoize slides to prevent unnecessary re-renders
  const memoizedSlides = useMemo(() => slides, [slides]);

  if (loading) {
    return (
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-white/70">Loading banners...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={memoizedSlides.length > 1}
        className="h-full"
        key={`hero-swiper-${memoizedSlides.length}`}
      >
        {memoizedSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="max-w-2xl"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-primary-600/90 text-white text-xs font-medium rounded-full">
                        AI Powered
                      </span>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        Literary Ecosystem
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={slide.cta.primaryPath}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <BookOpen className="h-5 w-5" />
                        <span>{slide.cta.primary}</span>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link
                        to={slide.cta.secondaryPath}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                      >
                        <Play className="h-5 w-5" />
                        <span>{slide.cta.secondary}</span>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex items-center justify-center space-x-2">
                <stat.icon className="h-5 w-5 text-primary-400" />
                <div className="text-left">
                  <p className="text-white font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;