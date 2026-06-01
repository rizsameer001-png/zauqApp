// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import { Users, ArrowRight, BookOpen, Heart } from 'lucide-react'

// const authors = [
//   {
//     id: 1,
//     name: 'Mirza Ghalib',
//     nameUr: 'مرزا غالب',
//     era: 'Classical',
//     poems: 234,
//     followers: 45000,
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//     bio: 'The most renowned Urdu and Persian poet of the Mughal era.',
//   },
//   {
//     id: 2,
//     name: 'Faiz Ahmed Faiz',
//     nameUr: 'فیض احمد فیض',
//     era: 'Modern',
//     poems: 186,
//     followers: 38000,
//     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
//     bio: 'Revolutionary poet known for his progressive and humanistic poetry.',
//   },
//   {
//     id: 3,
//     name: 'Allama Iqbal',
//     nameUr: 'علامہ اقبال',
//     era: 'Modern',
//     poems: 312,
//     followers: 52000,
//     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
//     bio: 'Philosopher, poet, and politician who inspired the Pakistan Movement.',
//   },
//   {
//     id: 4,
//     name: 'Mir Taqi Mir',
//     nameUr: 'میر تقی میر',
//     era: 'Classical',
//     poems: 278,
//     followers: 29000,
//     image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
//     bio: 'One of the pioneers of Urdu poetry and the chief poet of his time.',
//   },
// ]

// const FeaturedAuthors = () => {
//   const { t } = useTranslation()

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-secondary-100 rounded-lg">
//               <Users className="h-6 w-6 text-secondary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//               <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//             </div>
//           </div>
//           <Link
//             to="/authors"
//             className="hidden sm:flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {authors.map((author, index) => (
//             <motion.div
//               key={author.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="card p-6 text-center group hover:shadow-lg transition-shadow">
//                 <div className="relative mb-4">
//                   <img
//                     src={author.image}
//                     alt={author.name}
//                     className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
//                   />
//                   <span className="absolute bottom-0 right-1/3 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
//                     {author.era}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">{author.name}</h3>
//                 <p className="urdu-text text-gray-600 text-sm mb-2">{author.nameUr}</p>
//                 <p className="text-gray-500 text-sm mb-4 line-clamp-2">{author.bio}</p>
//                 <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
//                   <span className="flex items-center space-x-1">
//                     <BookOpen className="h-4 w-4" />
//                     <span>{author.poems} Poems</span>
//                   </span>
//                   <span className="flex items-center space-x-1">
//                     <Heart className="h-4 w-4 text-red-500" />
//                     <span>{(author.followers / 1000).toFixed(1)}K</span>
//                   </span>
//                 </div>
//                 <Link
//                   to={`/authors/${author.id}`}
//                   className="btn-outline w-full text-sm py-2"
//                 >
//                   View Profile
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default FeaturedAuthors











// // client/src/components/home/FeaturedAuthors.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { Users, ArrowRight, BookOpen, Heart, Loader2 } from 'lucide-react';
// import authorAPI from '../../api/authorAPI';

// const FeaturedAuthors = () => {
//   const { t } = useTranslation();
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFeaturedAuthors();
//   }, []);

//   const fetchFeaturedAuthors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Try to get featured authors first
//       let response;
//       try {
//         response = await authorAPI.getFeaturedAuthors();
//       } catch (err) {
//         // If getFeaturedAuthors doesn't exist, get regular authors
//         response = await authorAPI.getAuthors({ limit: 8 });
//       }
      
//       let authorsData = [];
//       if (response?.data?.data) {
//         authorsData = response.data.data;
//       } else if (response?.data) {
//         authorsData = Array.isArray(response.data) ? response.data : [];
//       } else if (Array.isArray(response)) {
//         authorsData = response;
//       } else {
//         authorsData = [];
//       }
      
//       // Format authors for display
//       const formattedAuthors = authorsData.map(author => ({
//         id: author._id || author.id,
//         name: author.name,
//         nameUr: author.nameUr || author.name,
//         era: author.era || determineEra(author.birthYear),
//         poems: author.poemsCount || author.poetryCount || Math.floor(Math.random() * 200) + 50,
//         followers: author.followersCount || author.followerCount || Math.floor(Math.random() * 50000) + 1000,
//         image: author.avatar || author.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//         bio: author.bio || author.biography || 'A renowned poet and literary figure.',
//         slug: author.slug
//       }));
      
//       setAuthors(formattedAuthors.slice(0, 4)); // Show only top 4
//     } catch (err) {
//       console.error('Error fetching featured authors:', err);
//       setError(err.message);
//       // Set fallback data
//       setAuthors(getFallbackAuthors());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const determineEra = (birthYear) => {
//     if (!birthYear) return 'Classical';
//     const year = parseInt(birthYear);
//     if (year < 1800) return 'Classical';
//     if (year < 1900) return 'Medieval';
//     return 'Modern';
//   };

//   const getFallbackAuthors = () => {
//     return [
//       {
//         id: 1,
//         name: 'Mirza Ghalib',
//         nameUr: 'مرزا غالب',
//         era: 'Classical',
//         poems: 234,
//         followers: 45000,
//         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//         bio: 'The most renowned Urdu and Persian poet of the Mughal era.',
//         slug: 'mirza-ghalib'
//       },
//       {
//         id: 2,
//         name: 'Faiz Ahmed Faiz',
//         nameUr: 'فیض احمد فیض',
//         era: 'Modern',
//         poems: 186,
//         followers: 38000,
//         image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
//         bio: 'Revolutionary poet known for his progressive and humanistic poetry.',
//         slug: 'faiz-ahmed-faiz'
//       },
//       {
//         id: 3,
//         name: 'Allama Iqbal',
//         nameUr: 'علامہ اقبال',
//         era: 'Modern',
//         poems: 312,
//         followers: 52000,
//         image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
//         bio: 'Philosopher, poet, and politician who inspired the Pakistan Movement.',
//         slug: 'allama-iqbal'
//       },
//       {
//         id: 4,
//         name: 'Mir Taqi Mir',
//         nameUr: 'میر تقی میر',
//         era: 'Classical',
//         poems: 278,
//         followers: 29000,
//         image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
//         bio: 'One of the pioneers of Urdu poetry and the chief poet of his time.',
//         slug: 'mir-taqi-mir'
//       },
//     ];
//   };

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-secondary-100 rounded-lg">
//                 <Users className="h-6 w-6 text-secondary-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//                 <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-secondary-100 rounded-lg">
//                 <Users className="h-6 w-6 text-secondary-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//                 <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//               </div>
//             </div>
//           </div>
//           <div className="text-center py-12">
//             <p className="text-red-500">Failed to load authors. Please try again later.</p>
//             <button 
//               onClick={fetchFeaturedAuthors}
//               className="mt-4 btn-primary text-sm"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-secondary-100 rounded-lg">
//               <Users className="h-6 w-6 text-secondary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//               <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//             </div>
//           </div>
//           <Link
//             to="/authors"
//             className="hidden sm:flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium transition-colors"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {authors.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No authors found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {authors.map((author, index) => (
//               <motion.div
//                 key={author.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="card p-6 text-center group hover:shadow-lg transition-all duration-300">
//                   <div className="relative mb-4">
//                     <img
//                       src={author.image}
//                       alt={author.name}
//                       className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400';
//                       }}
//                     />
//                     <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full whitespace-nowrap">
//                       {author.era}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-1">{author.name}</h3>
//                   {author.nameUr && (
//                     <p className="urdu-text text-gray-600 text-sm mb-2">{author.nameUr}</p>
//                   )}
//                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">{author.bio}</p>
//                   <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
//                     <span className="flex items-center space-x-1">
//                       <BookOpen className="h-4 w-4" />
//                       <span>{author.poems} Poems</span>
//                     </span>
//                     <span className="flex items-center space-x-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       <span>{(author.followers / 1000).toFixed(1)}K</span>
//                     </span>
//                   </div>
//                   <Link
//                     to={`/author/${author.slug || author.id}`}
//                     className="btn-outline w-full text-sm py-2 transition-colors"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Mobile View All Button */}
//         <div className="text-center mt-8 sm:hidden">
//           <Link
//             to="/authors"
//             className="inline-flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium"
//           >
//             <span>{t('common.viewAll')}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedAuthors;





















// // client/src/components/home/FeaturedAuthors.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { Users, ArrowRight, BookOpen, Heart, Loader2, RefreshCw } from 'lucide-react';
// import authorAPI, { getAuthorFollowerDisplay, getAuthorEraColor } from '../../api/authorAPI';

// const FeaturedAuthors = () => {
//   const { t } = useTranslation();
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFeaturedAuthors();
//   }, []);

//   const fetchFeaturedAuthors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Try multiple methods to get authors
//       let authorsData = [];
      
//       // First try: Get featured authors
//       try {
//         const response = await authorAPI.getFeaturedAuthors();
//         if (response?.data?.data) {
//           authorsData = response.data.data;
//         } else if (response?.data) {
//           authorsData = Array.isArray(response.data) ? response.data : [];
//         } else if (Array.isArray(response)) {
//           authorsData = response;
//         }
//       } catch (featuredErr) {
//         console.log('Featured authors fetch failed, trying trending...', featuredErr);
        
//         // Second try: Get trending authors
//         try {
//           const response = await authorAPI.getTrendingAuthors();
//           if (response?.data?.data) {
//             authorsData = response.data.data;
//           } else if (response?.data) {
//             authorsData = Array.isArray(response.data) ? response.data : [];
//           } else if (Array.isArray(response)) {
//             authorsData = response;
//           }
//         } catch (trendingErr) {
//           console.log('Trending authors fetch failed, trying regular...', trendingErr);
          
//           // Third try: Get regular authors
//           const response = await authorAPI.getAuthors({ limit: 8, sort: '-createdAt' });
//           if (response?.data?.data) {
//             authorsData = response.data.data;
//           } else if (response?.data) {
//             authorsData = Array.isArray(response.data) ? response.data : [];
//           } else if (Array.isArray(response)) {
//             authorsData = response;
//           }
//         }
//       }
      
//       // If still no data, use fallback
//       if (!authorsData || authorsData.length === 0) {
//         console.log('No authors from API, using fallback data');
//         setAuthors(getFallbackAuthors());
//       } else {
//         // Format authors for display
//         const formattedAuthors = authorsData.slice(0, 4).map(author => ({
//           id: author._id || author.id,
//           name: author.name,
//           nameUr: author.nameUrdu || author.nameUr || author.name,
//           era: author.era || determineEra(author.birthDate),
//           poems: author.poemsCount || author.poetryCount || author.stats?.poems || Math.floor(Math.random() * 200) + 50,
//           followers: author.followersCount || author.followerCount || author.stats?.followers || Math.floor(Math.random() * 50000) + 1000,
//           image: author.avatar || author.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//           bio: author.bio || author.biography || 'A renowned poet and literary figure.',
//           slug: author.slug,
//           birthDate: author.birthDate,
//           deathDate: author.deathDate
//         }));
        
//         setAuthors(formattedAuthors);
//       }
//     } catch (err) {
//       console.error('Error fetching featured authors:', err);
//       setError(err.message);
//       setAuthors(getFallbackAuthors());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const determineEra = (birthDate) => {
//     if (!birthDate) return 'Classical';
//     try {
//       const year = new Date(birthDate).getFullYear();
//       if (isNaN(year)) return 'Classical';
//       if (year < 1800) return 'Classical';
//       if (year < 1900) return 'Modern';
//       if (year < 2000) return 'Contemporary';
//       return 'Modern';
//     } catch {
//       return 'Classical';
//     }
//   };

//   const getFallbackAuthors = () => {
//     return [
//       {
//         id: 1,
//         name: 'Mirza Ghalib',
//         nameUr: 'مرزا غالب',
//         era: 'Classical',
//         poems: 234,
//         followers: 45000,
//         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//         bio: 'The most renowned Urdu and Persian poet of the Mughal era.',
//         slug: 'mirza-ghalib'
//       },
//       {
//         id: 2,
//         name: 'Faiz Ahmed Faiz',
//         nameUr: 'فیض احمد فیض',
//         era: 'Modern',
//         poems: 186,
//         followers: 38000,
//         image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
//         bio: 'Revolutionary poet known for his progressive and humanistic poetry.',
//         slug: 'faiz-ahmed-faiz'
//       },
//       {
//         id: 3,
//         name: 'Allama Iqbal',
//         nameUr: 'علامہ اقبال',
//         era: 'Modern',
//         poems: 312,
//         followers: 52000,
//         image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
//         bio: 'Philosopher, poet, and politician who inspired the Pakistan Movement.',
//         slug: 'allama-iqbal'
//       },
//       {
//         id: 4,
//         name: 'Mir Taqi Mir',
//         nameUr: 'میر تقی میر',
//         era: 'Classical',
//         poems: 278,
//         followers: 29000,
//         image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
//         bio: 'One of the pioneers of Urdu poetry and the chief poet of his time.',
//         slug: 'mir-taqi-mir'
//       },
//     ];
//   };

//   const formatFollowerCount = (count) => {
//     if (!count) return '0';
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
//     return count.toString();
//   };

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-secondary-100 rounded-lg">
//                 <Users className="h-6 w-6 text-secondary-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//                 <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-secondary-100 rounded-lg">
//                 <Users className="h-6 w-6 text-secondary-600" />
//               </div>
//               <div>
//                 <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
//                 <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//               </div>
//             </div>
//           </div>
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//             <p className="text-red-500 mb-2">Failed to load authors</p>
//             <p className="text-gray-400 text-sm mb-4">{error}</p>
//             <button 
//               onClick={fetchFeaturedAuthors}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//             >
//               <RefreshCw className="h-4 w-4" />
//               <span>Retry</span>
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-secondary-100 rounded-lg">
//               <Users className="h-6 w-6 text-secondary-600" />
//             </div>
//             <div>
//               <h2 className="section-title mb-0">{t('home.trendingAuthors') || 'Trending Authors'}</h2>
//               <p className="text-gray-500 text-sm">Legendary voices of literature</p>
//             </div>
//           </div>
//           <Link
//             to="/authors"
//             className="hidden sm:flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium transition-colors group"
//           >
//             <span>{t('common.viewAll') || 'View All'}</span>
//             <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>

//         {authors.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm">
//             <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500">No authors found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {authors.map((author, index) => (
//               <motion.div
//                 key={author.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//               >
//                 <div className="card p-6 text-center group hover:shadow-xl transition-all duration-300 bg-white">
//                   <div className="relative mb-4">
//                     <img
//                       src={author.image}
//                       alt={author.name}
//                       className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400';
//                       }}
//                     />
//                     <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${getAuthorEraColor(author.era)}`}>
//                       {author.era}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-1 text-lg">{author.name}</h3>
//                   {author.nameUr && (
//                     <p className="urdu-text text-gray-600 text-sm mb-2 font-arabic">{author.nameUr}</p>
//                   )}
//                   <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{author.bio}</p>
//                   <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
//                     <span className="flex items-center space-x-1">
//                       <BookOpen className="h-4 w-4" />
//                       <span>{author.poems} Poems</span>
//                     </span>
//                     <span className="flex items-center space-x-1">
//                       <Heart className="h-4 w-4 text-red-500" />
//                       <span>{formatFollowerCount(author.followers)}</span>
//                     </span>
//                   </div>
//                   <Link
//                     to={`/author/${author.slug || author.id}`}
//                     className="btn-outline w-full text-sm py-2 transition-colors hover:bg-primary-50 hover:border-primary-300"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Mobile View All Button */}
//         <div className="text-center mt-8 sm:hidden">
//           <Link
//             to="/authors"
//             className="inline-flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium"
//           >
//             <span>{t('common.viewAll') || 'View All'}</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedAuthors;












// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { Users, ArrowRight, BookOpen, Heart, Loader2, RefreshCw } from 'lucide-react';
// import authorAPI, { getAuthorFollowerDisplay, getAuthorEraColor } from '../../api/authorAPI';

// const FeaturedAuthors = () => {
//   const { t } = useTranslation();
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFeaturedAuthors();
//   }, []);

//   const fetchFeaturedAuthors = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       let authorsData = [];
//       try {
//         const response = await authorAPI.getFeaturedAuthors();
//         authorsData = response?.data?.data || response?.data || response || [];
//       } catch {
//         try {
//           const response = await authorAPI.getTrendingAuthors();
//           authorsData = response?.data?.data || response?.data || response || [];
//         } catch {
//           const response = await authorAPI.getAuthors({ limit: 8, sort: '-createdAt' });
//           authorsData = response?.data?.data || response?.data || response || [];
//         }
//       }

//       if (!authorsData || authorsData.length === 0) {
//         setAuthors(getFallbackAuthors());
//       } else {
//         const formattedAuthors = authorsData.slice(0, 4).map(author => ({
//           id: author._id || author.id,
//           name: author.name,
//           nameUr: author.nameUrdu || author.nameUr || author.name,
//           era: author.era || determineEra(author.birthDate),
//           poems: author.poemsCount || author.poetryCount || author.stats?.poems || 100,
//           followers: author.followersCount || author.followerCount || author.stats?.followers || 1000,
//           image: author.avatar || author.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//           bio: author.bio || 'A renowned poet and literary figure.',
//           slug: author.slug,
//         }));
//         setAuthors(formattedAuthors);
//       }
//     } catch (err) {
//       setError(err.message);
//       setAuthors(getFallbackAuthors());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const determineEra = (birthDate) => {
//     if (!birthDate) return 'Classical';
//     const year = new Date(birthDate).getFullYear();
//     if (year < 1800) return 'Classical';
//     if (year < 1900) return 'Modern';
//     return 'Contemporary';
//   };

//   const getFallbackAuthors = () => [
//     {
//       id: 1,
//       name: 'Mirza Ghalib',
//       nameUr: 'مرزا غالب',
//       era: 'Classical',
//       poems: 234,
//       followers: 45000,
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
//       bio: 'The most renowned Urdu and Persian poet.',
//       slug: 'mirza-ghalib'
//     },
//     {
//       id: 2,
//       name: 'Faiz Ahmed Faiz',
//       nameUr: 'فیض احمد فیض',
//       era: 'Modern',
//       poems: 186,
//       followers: 38000,
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
//       bio: 'Revolutionary progressive poet.',
//       slug: 'faiz-ahmed-faiz'
//     },
//     {
//       id: 3,
//       name: 'Allama Iqbal',
//       nameUr: 'علامہ اقبال',
//       era: 'Modern',
//       poems: 312,
//       followers: 52000,
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
//       bio: 'Philosopher and poet.',
//       slug: 'allama-iqbal'
//     },
//     {
//       id: 4,
//       name: 'Mir Taqi Mir',
//       nameUr: 'میر تقی میر',
//       era: 'Classical',
//       poems: 278,
//       followers: 29000,
//       image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
//       bio: 'Pioneer of Urdu poetry.',
//       slug: 'mir-taqi-mir'
//     }
//   ];

//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 text-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-20 text-center">
//         <p className="text-red-500 mb-3">{error}</p>
//         <button onClick={fetchFeaturedAuthors} className="px-4 py-2 bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-full">
//           Retry
//         </button>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 relative overflow-hidden">

//       {/* 🌈 BACKGROUND */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50" />
//       <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full" />

//       <div className="relative max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-12">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl shadow-lg">
//               <Users className="text-white h-6 w-6" />
//             </div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
//               {t('home.trendingAuthors')}
//             </h2>
//           </div>

//           <Link to="/authors" className="hidden sm:flex items-center gap-2">
//             {t('common.viewAll')}
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* MAGAZINE CARDS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {authors.map((author, i) => (
//             <motion.div key={author.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              
//               <Link to={`/author/${author.slug || author.id}`} className="group block relative rounded-3xl overflow-hidden">

//                 {/* Gradient Hover Border */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition" />

//                 <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl group-hover:-translate-y-2 transition duration-500">

//                   {/* IMAGE */}
//                   <div className="relative h-64 overflow-hidden">
//                     <img src={author.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />

//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-pink-500/20 to-transparent" />

//                     {/* TEXT OVER IMAGE */}
//                     <div className="absolute bottom-4 left-4 right-4 text-white">
//                       <h3 className="font-semibold text-lg">{author.name}</h3>
//                       <p className="text-sm opacity-80">{author.nameUr}</p>
//                     </div>
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-5">

//                     <p className="text-gray-600 text-sm line-clamp-2 mb-4">
//                       {author.bio}
//                     </p>

//                     {/* STATS */}
//                     <div className="flex justify-between text-sm">
//                       <span className="flex items-center gap-1 text-purple-600">
//                         <BookOpen className="h-4 w-4" />
//                         {author.poems}
//                       </span>

//                       <span className="flex items-center gap-1 text-pink-500">
//                         <Heart className="h-4 w-4" />
//                         {author.followers}
//                       </span>
//                     </div>

//                   </div>

//                 </div>
//               </Link>

//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default FeaturedAuthors;










// client/src/components/home/FeaturedAuthors.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, ArrowRight, BookOpen, Heart, Loader2, RefreshCw } from 'lucide-react';
import authorAPI, { getAuthorFollowerDisplay, getAuthorEraColor } from '../../api/authorAPI';

const FeaturedAuthors = () => {
  const { t } = useTranslation();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedAuthors();
  }, []);

  const fetchFeaturedAuthors = async () => {
    setLoading(true);
    setError(null);
    try {
      let authorsData = [];

      try {
        const response = await authorAPI.getFeaturedAuthors();
        authorsData = response?.data?.data || response?.data || response || [];
      } catch {
        try {
          const response = await authorAPI.getTrendingAuthors();
          authorsData = response?.data?.data || response?.data || response || [];
        } catch {
          const response = await authorAPI.getAuthors({ limit: 8, sort: '-createdAt' });
          authorsData = response?.data?.data || response?.data || response || [];
        }
      }

      if (!authorsData || authorsData.length === 0) {
        setAuthors(getFallbackAuthors());
      } else {
        const formattedAuthors = authorsData.slice(0, 4).map(author => ({
          id: author._id || author.id,
          name: author.name,
          nameUr: author.nameUrdu || author.nameUr || author.name,
          era: author.era || determineEra(author.birthDate),
          poems: author.poemsCount || author.poetryCount || author.stats?.poems || 100,
          followers: author.followersCount || author.followerCount || author.stats?.followers || 1000,
          image: author.avatar || author.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          bio: author.bio || 'A renowned poet and literary figure.',
          slug: author.slug,
        }));

        setAuthors(formattedAuthors);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setAuthors(getFallbackAuthors());
    } finally {
      setLoading(false);
    }
  };

  const determineEra = (birthDate) => {
    if (!birthDate) return 'Classical';
    const year = new Date(birthDate).getFullYear();
    if (year < 1800) return 'Classical';
    if (year < 1900) return 'Modern';
    return 'Contemporary';
  };

  const getFallbackAuthors = () => [
    {
      id: 1,
      name: 'Mirza Ghalib',
      nameUr: 'مرزا غالب',
      era: 'Classical',
      poems: 234,
      followers: 45000,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'The most renowned Urdu and Persian poet.',
      slug: 'mirza-ghalib'
    },
    {
      id: 2,
      name: 'Faiz Ahmed Faiz',
      nameUr: 'فیض احمد فیض',
      era: 'Modern',
      poems: 186,
      followers: 38000,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Revolutionary progressive poet.',
      slug: 'faiz-ahmed-faiz'
    },
    {
      id: 3,
      name: 'Allama Iqbal',
      nameUr: 'علامہ اقبال',
      era: 'Modern',
      poems: 312,
      followers: 52000,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Philosopher and poet.',
      slug: 'allama-iqbal'
    },
    {
      id: 4,
      name: 'Mir Taqi Mir',
      nameUr: 'میر تقی میر',
      era: 'Classical',
      poems: 278,
      followers: 29000,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'Pioneer of Urdu poetry.',
      slug: 'mir-taqi-mir'
    }
  ];

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500 mx-auto" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button
          onClick={fetchFeaturedAuthors}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-primary-500 to-pink-500 text-white"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="py-28 relative overflow-hidden">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50" />
      <div className="absolute -top-32 left-0 w-96 h-96 bg-pink-300 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-14">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {t('home.trendingAuthors') || 'Trending Authors'}
              </h2>
              <p className="text-gray-500 text-sm">
                Legendary voices of literature
              </p>
            </div>
          </div>

          <Link
            to="/authors"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition"
          >
            {t('common.viewAll') || 'View All'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/author/${author.slug || author.id}`}
                className="group block relative rounded-3xl overflow-hidden"
              >

                {/* ✨ Gradient Glow Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:-translate-y-3 transition duration-500
                                bg-gradient-to-br from-white via-pink-50 to-purple-50 border border-pink-200 ring-1 ring-pink-100">

                  {/* IMAGE */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* 🌸 Light overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-pink-400/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg leading-tight">{author.name}</h3>
                      <p className="text-sm opacity-90">{author.nameUr}</p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 bg-gradient-to-br from-white via-pink-50 to-purple-100 border-t border-white/70">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-5">
                      {author.bio}
                    </p>

                    {/* STATS */}
                    <div className="flex justify-between text-sm font-medium">

                      <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        <BookOpen className="h-4 w-4" />
                        {author.poems}
                      </span>

                      <span className="flex items-center gap-1 text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                        <Heart className="h-4 w-4" />
                        {author.followers}
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            to="/authors"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg"
          >
            {t('common.viewAll') || 'View All'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedAuthors;