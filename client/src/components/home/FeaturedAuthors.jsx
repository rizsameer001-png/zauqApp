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
      // Try multiple methods to get authors
      let authorsData = [];
      
      // First try: Get featured authors
      try {
        const response = await authorAPI.getFeaturedAuthors();
        if (response?.data?.data) {
          authorsData = response.data.data;
        } else if (response?.data) {
          authorsData = Array.isArray(response.data) ? response.data : [];
        } else if (Array.isArray(response)) {
          authorsData = response;
        }
      } catch (featuredErr) {
        console.log('Featured authors fetch failed, trying trending...', featuredErr);
        
        // Second try: Get trending authors
        try {
          const response = await authorAPI.getTrendingAuthors();
          if (response?.data?.data) {
            authorsData = response.data.data;
          } else if (response?.data) {
            authorsData = Array.isArray(response.data) ? response.data : [];
          } else if (Array.isArray(response)) {
            authorsData = response;
          }
        } catch (trendingErr) {
          console.log('Trending authors fetch failed, trying regular...', trendingErr);
          
          // Third try: Get regular authors
          const response = await authorAPI.getAuthors({ limit: 8, sort: '-createdAt' });
          if (response?.data?.data) {
            authorsData = response.data.data;
          } else if (response?.data) {
            authorsData = Array.isArray(response.data) ? response.data : [];
          } else if (Array.isArray(response)) {
            authorsData = response;
          }
        }
      }
      
      // If still no data, use fallback
      if (!authorsData || authorsData.length === 0) {
        console.log('No authors from API, using fallback data');
        setAuthors(getFallbackAuthors());
      } else {
        // Format authors for display
        const formattedAuthors = authorsData.slice(0, 4).map(author => ({
          id: author._id || author.id,
          name: author.name,
          nameUr: author.nameUrdu || author.nameUr || author.name,
          era: author.era || determineEra(author.birthDate),
          poems: author.poemsCount || author.poetryCount || author.stats?.poems || Math.floor(Math.random() * 200) + 50,
          followers: author.followersCount || author.followerCount || author.stats?.followers || Math.floor(Math.random() * 50000) + 1000,
          image: author.avatar || author.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          bio: author.bio || author.biography || 'A renowned poet and literary figure.',
          slug: author.slug,
          birthDate: author.birthDate,
          deathDate: author.deathDate
        }));
        
        setAuthors(formattedAuthors);
      }
    } catch (err) {
      console.error('Error fetching featured authors:', err);
      setError(err.message);
      setAuthors(getFallbackAuthors());
    } finally {
      setLoading(false);
    }
  };

  const determineEra = (birthDate) => {
    if (!birthDate) return 'Classical';
    try {
      const year = new Date(birthDate).getFullYear();
      if (isNaN(year)) return 'Classical';
      if (year < 1800) return 'Classical';
      if (year < 1900) return 'Modern';
      if (year < 2000) return 'Contemporary';
      return 'Modern';
    } catch {
      return 'Classical';
    }
  };

  const getFallbackAuthors = () => {
    return [
      {
        id: 1,
        name: 'Mirza Ghalib',
        nameUr: 'مرزا غالب',
        era: 'Classical',
        poems: 234,
        followers: 45000,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: 'The most renowned Urdu and Persian poet of the Mughal era.',
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
        bio: 'Revolutionary poet known for his progressive and humanistic poetry.',
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
        bio: 'Philosopher, poet, and politician who inspired the Pakistan Movement.',
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
        bio: 'One of the pioneers of Urdu poetry and the chief poet of his time.',
        slug: 'mir-taqi-mir'
      },
    ];
  };

  const formatFollowerCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
                <p className="text-gray-500 text-sm">Legendary voices of literature</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h2 className="section-title mb-0">{t('home.trendingAuthors')}</h2>
                <p className="text-gray-500 text-sm">Legendary voices of literature</p>
              </div>
            </div>
          </div>
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-red-500 mb-2">Failed to load authors</p>
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <button 
              onClick={fetchFeaturedAuthors}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <h2 className="section-title mb-0">{t('home.trendingAuthors') || 'Trending Authors'}</h2>
              <p className="text-gray-500 text-sm">Legendary voices of literature</p>
            </div>
          </div>
          <Link
            to="/authors"
            className="hidden sm:flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium transition-colors group"
          >
            <span>{t('common.viewAll') || 'View All'}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {authors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No authors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="card p-6 text-center group hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="relative mb-4">
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400';
                      }}
                    />
                    <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${getAuthorEraColor(author.era)}`}>
                      {author.era}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{author.name}</h3>
                  {author.nameUr && (
                    <p className="urdu-text text-gray-600 text-sm mb-2 font-arabic">{author.nameUr}</p>
                  )}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{author.bio}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{author.poems} Poems</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{formatFollowerCount(author.followers)}</span>
                    </span>
                  </div>
                  <Link
                    to={`/author/${author.slug || author.id}`}
                    className="btn-outline w-full text-sm py-2 transition-colors hover:bg-primary-50 hover:border-primary-300"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            to="/authors"
            className="inline-flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 font-medium"
          >
            <span>{t('common.viewAll') || 'View All'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuthors;