// // client/src/pages/public/BlogListPage.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Calendar, User, Eye, Clock, Tag, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import blogAPI from '../../api/blogAPI';
// import toast from 'react-hot-toast';

// const BlogListPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const itemsPerPage = 9;

//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ['blogs', currentPage, selectedCategory],
//     queryFn: () => blogAPI.getBlogs({ page: currentPage, limit: itemsPerPage, category: selectedCategory !== 'all' ? selectedCategory : undefined })
//   });

//   const blogs = response?.data?.data || response?.data || response || [];
//   const pagination = response?.data?.pagination || { total: 0, totalPages: 1 };

//   const categories = [
//     'all', 'poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials'
//   ];

//   const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary-600" /></div>;

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Blog & Articles</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">Insights, stories, and literary discussions</p>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-2 justify-center mb-8">
//           {categories.map(cat => (
//             <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
//               {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Blog Grid */}
//         {blogs.length === 0 ? (
//           <div className="text-center py-12"><p className="text-gray-500">No blogs found</p></div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog, index) => (
//               <motion.div key={blog._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//                 <Link to={`/blog/${blog.slug}`} className="group">
//                   <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800">
//                     <div className="relative h-48 overflow-hidden">
//                       <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
//                       {blog.isFeatured && <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">Featured</div>}
//                     </div>
//                     <div className="p-5">
//                       <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
//                         <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(blog.publishedAt || blog.createdAt)}</span>
//                         <span className="flex items-center gap-1"><User className="h-3 w-3" />{blog.author?.name || 'Admin'}</span>
//                         <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{blog.views || 0}</span>
//                       </div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition">{blog.title}</h2>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex flex-wrap gap-1">
//                           {blog.tags?.slice(0, 2).map(tag => <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-full">#{tag}</span>)}
//                         </div>
//                         <span className="text-primary-600 text-sm font-medium group-hover:underline">Read More →</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-12">
//             <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50"><ChevronLeft className="h-5 w-5" /></button>
//             <span className="px-4 py-2 bg-primary-600 text-white rounded-lg">{currentPage} / {pagination.totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))} disabled={currentPage === pagination.totalPages} className="p-2 border rounded-lg disabled:opacity-50"><ChevronRight className="h-5 w-5" /></button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogListPage;











// // client/src/pages/public/BlogListPage.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery } from '@tanstack/react-query';
// import { Calendar, User, Eye, Clock, Tag, ChevronLeft, ChevronRight, Loader2, Newspaper } from 'lucide-react';
// import blogAPI from '../../api/blogAPI';
// import toast from 'react-hot-toast';

// const BlogListPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const itemsPerPage = 9;

//   const { data: response, isLoading, error, refetch } = useQuery({
//     queryKey: ['public-blogs', currentPage, selectedCategory],
//     queryFn: () => blogAPI.getBlogs({ 
//       page: currentPage, 
//       limit: itemsPerPage, 
//       category: selectedCategory !== 'all' ? selectedCategory : undefined,
//       isPublished: true 
//     }),
//     retry: 1
//   });

//   // Handle different response structures
//   const blogs = response?.data?.data || response?.data || response || [];
//   const pagination = response?.data?.pagination || { total: 0, totalPages: 1, page: currentPage };

//   const categories = [
//     'all', 'poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials'
//   ];

//   const formatDate = (date) => {
//     if (!date) return 'Recent';
//     return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
//         <Newspaper className="h-16 w-16 text-gray-300 mb-4" />
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load blogs</h2>
//         <p className="text-gray-500 mb-4">Please check your connection and try again</p>
//         <button onClick={() => refetch()} className="btn-primary">Try Again</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
//             Blog & Articles
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">Insights, stories, and literary discussions</p>
//         </div>

//         {/* Categories */}
//         <div className="flex flex-wrap gap-2 justify-center mb-8">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                 selectedCategory === cat 
//                   ? 'bg-primary-600 text-white shadow-md' 
//                   : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
//               }`}
//             >
//               {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Blog Grid */}
//         {!blogs || blogs.length === 0 ? (
//           <div className="text-center py-12">
//             <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
//             <p className="text-gray-500">Check back later for new articles and updates.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog, index) => (
//               <motion.div
//                 key={blog._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link to={`/blog/${blog.slug}`} className="group">
//                   <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800">
//                     {/* Featured Image */}
//                     <div className="relative h-48 overflow-hidden">
//                       <img 
//                         src={blog.featuredImage || 'https://via.placeholder.com/400x300?text=Blog'} 
//                         alt={blog.title} 
//                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                       />
//                       {blog.isFeatured && (
//                         <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium">
//                           Featured
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="p-5">
//                       {/* Meta Info */}
//                       <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
//                         <span className="flex items-center gap-1">
//                           <Calendar className="h-3 w-3" />
//                           {formatDate(blog.publishedAt || blog.createdAt)}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <User className="h-3 w-3" />
//                           {blog.author?.name || 'Admin'}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Eye className="h-3 w-3" />
//                           {blog.views || 0}
//                         </span>
//                       </div>
                      
//                       {/* Title */}
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition">
//                         {blog.title}
//                       </h2>
                      
//                       {/* Excerpt */}
//                       <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
//                         {blog.excerpt}
//                       </p>
                      
//                       {/* Tags */}
//                       {blog.tags && blog.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mb-3">
//                           {blog.tags.slice(0, 2).map(tag => (
//                             <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
//                               #{tag}
//                             </span>
//                           ))}
//                           {blog.tags.length > 2 && (
//                             <span className="text-xs text-gray-400">+{blog.tags.length - 2}</span>
//                           )}
//                         </div>
//                       )}
                      
//                       {/* Read More */}
//                       <div className="flex items-center justify-between">
//                         <span className="flex items-center gap-1 text-sm text-gray-500">
//                           <Clock className="h-3 w-3" />
//                           {blog.readTime || Math.ceil((blog.content?.length || 0) / 1000)} min read
//                         </span>
//                         <span className="text-primary-600 text-sm font-medium group-hover:underline">
//                           Read More →
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-12">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <span className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
//               {currentPage} / {pagination.totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
//               disabled={currentPage === pagination.totalPages}
//               className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogListPage;


















// client/src/pages/public/BlogListPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User, Eye, Clock, Tag, ChevronLeft, ChevronRight, Loader2, Newspaper, Grid3x3, List } from 'lucide-react';
import blogAPI from '../../api/blogAPI';

const BlogListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const itemsPerPage = 9;

  const { data: response, isLoading, error, refetch } = useQuery({
    queryKey: ['public-blogs', currentPage, selectedCategory],
    queryFn: () => blogAPI.getBlogs({ 
      page: currentPage, 
      limit: itemsPerPage, 
      category: selectedCategory !== 'all' ? selectedCategory : undefined
    }),
    retry: 1
  });

  const blogs = response?.data?.data || response?.data || response || [];
  const pagination = response?.data?.pagination || { total: 0, totalPages: 1, page: currentPage };

  const categories = [
    'all', 'poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials'
  ];

  const formatDate = (date) => {
    if (!date) return 'Recent';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <Newspaper className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load blogs</h2>
        <p className="text-gray-500 mb-4">Please check your connection and try again</p>
        <button onClick={() => refetch()} className="btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Blog & Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Insights, stories, and literary discussions</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Blog Grid/List View */}
        {!blogs || blogs.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-500">Check back later for new articles and updates.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/blog/${blog.slug}`} className="group block">
                  <div className={viewMode === 'grid' 
                    ? "bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
                    : "bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 flex"
                  }>
                    {/* Image */}
                    <div className={viewMode === 'grid' ? "relative h-48 overflow-hidden" : "relative w-48 h-32 flex-shrink-0 overflow-hidden"}>
                      <img 
                        src={blog.featuredImage || 'https://via.placeholder.com/400x300?text=Blog'} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {blog.isFeatured && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author?.name || 'Admin'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {blog.views || 0}
                        </span>
                      </div>
                      
                      <h2 className={`font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition ${viewMode === 'grid' ? 'text-xl' : 'text-lg'}`}>
                        {blog.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {blog.tags && blog.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-primary-600 text-sm font-medium group-hover:underline">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
              {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={currentPage === pagination.totalPages}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;