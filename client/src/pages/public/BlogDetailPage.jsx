// // client/src/pages/public/BlogDetailPage.jsx
// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, ChevronLeft, Loader2, MessageCircle, Send } from 'lucide-react';
// import ReactHtmlParser from 'react-html-parser';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';

// const BlogDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const [comment, setComment] = useState('');
//   const [isLiked, setIsLiked] = useState(false);

//   const { data: response, isLoading } = useQuery({
//     queryKey: ['blog', slug],
//     queryFn: () => blogAPI.getBlog(slug),
//     enabled: !!slug
//   });

//   const blog = response?.data || response;
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   const likeMutation = useMutation({
//     mutationFn: () => blogAPI.likeBlog(blog?._id),
//     onSuccess: () => { setIsLiked(!isLiked); queryClient.invalidateQueries(['blog', slug]); toast.success(isLiked ? 'Removed like' : 'Liked!'); }
//   });

//   const commentMutation = useMutation({
//     mutationFn: () => blogAPI.addComment(blog?._id, { content: comment }),
//     onSuccess: () => { setComment(''); queryClient.invalidateQueries(['blog', slug]); toast.success('Comment added!'); }
//   });

//   const handleLike = () => { if (!user) { toast.error('Please login'); navigate('/login'); return; } likeMutation.mutate(); };
//   const handleComment = (e) => { e.preventDefault(); if (!user) { toast.error('Please login'); navigate('/login'); return; } if (!comment.trim()) { toast.error('Write a comment'); return; } commentMutation.mutate(); };

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary-600" /></div>;
//   if (!blog) return <div className="min-h-screen pt-20 text-center"><h1 className="text-2xl font-bold">Blog not found</h1><Link to="/blog" className="text-primary-600 mt-4 inline-block">← Back to blogs</Link></div>;

//   const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"><ChevronLeft className="h-4 w-4" /> Back to Blogs</Link>

//         {/* Hero Image */}
//         <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
//           <img src={blog.featuredImage} alt={blog.title} className="w-full h-[400px] object-cover" />
//         </div>

//         {/* Category Badge */}
//         <div className="mb-4"><span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize">{blog.category}</span></div>

//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b">
//           <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(blog.publishedAt || blog.createdAt)}</span>
//           <span className="flex items-center gap-1"><User className="h-4 w-4" />{blog.author?.name || 'Admin'}</span>
//           <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{blog.readTime} min read</span>
//           <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{blog.views?.toLocaleString()} views</span>
//         </div>

//         {/* Excerpt */}
//         <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-primary-500">
//           {blog.excerpt}
//         </div>

//         {/* Content */}
//         <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
//           {ReactHtmlParser(blog.content)}
//         </div>

//         {/* Tags */}
//         {blog.tags?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b">
//             <Tag className="h-4 w-4 text-gray-400 mt-1" />
//             {blog.tags.map(tag => <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">#{tag}</span>)}
//           </div>
//         )}

//         {/* Video Section */}
//         {blog.videoUrl && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">Watch Video</h3>
//             <div className="aspect-video rounded-xl overflow-hidden">
//               <iframe src={blog.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen></iframe>
//             </div>
//           </div>
//         )}

//         {/* PDF Section */}
//         {blog.pdfUrl && (
//           <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-between">
//             <span>📄 Download PDF Version</span>
//             <a href={blog.pdfUrl} download className="btn-primary py-2">Download PDF</a>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-4 mb-8 pb-6 border-b">
//           <button onClick={handleLike} className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'}`}>
//             <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} /> {blog.likes || 0}
//           </button>
//           <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700">
//             <Share2 className="h-5 w-5" /> Share
//           </button>
//         </div>

//         {/* Comments Section */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Comments ({blog.comments?.filter(c => c.isApproved).length || 0})</h3>
          
//           {/* Comment Form */}
//           {user && (
//             <form onSubmit={handleComment} className="flex gap-3 mb-6">
//               <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="input-field flex-1" />
//               <button type="submit" disabled={commentMutation.isPending} className="btn-primary px-6">{commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</button>
//             </form>
//           )}

//           {/* Comments List */}
//           <div className="space-y-4">
//             {blog.comments?.filter(c => c.isApproved).map((c, idx) => (
//               <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-2"><User className="h-4 w-4 text-gray-400" /><span className="font-medium">{c.userName}</span><span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span></div>
//                 <p className="text-gray-700 dark:text-gray-300">{c.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetailPage;



















// // client/src/pages/public/BlogDetailPage.jsx
// import React, { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, ChevronLeft, Loader2, MessageCircle, Send } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';

// const BlogDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const [comment, setComment] = useState('');
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ['blog', slug],
//     queryFn: () => blogAPI.getBlog(slug),
//     enabled: !!slug
//   });

//   const blog = response?.data || response;

//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-blogs', blog?._id],
//     queryFn: () => blogAPI.getRelatedBlogs?.(blog?._id) || Promise.resolve({ data: [] }),
//     enabled: !!blog?._id
//   });

//   const relatedBlogs = relatedResponse?.data || relatedResponse || [];

//   const likeMutation = useMutation({
//     mutationFn: () => blogAPI.likeBlog(blog?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success(isLiked ? 'Removed like' : 'Liked!');
//     },
//     onError: () => toast.error('Failed to update like')
//   });

//   const bookmarkMutation = useMutation({
//     mutationFn: () => blogAPI.bookmarkBlog?.(blog?._id) || Promise.resolve(),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       toast.success(isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!');
//     },
//     onError: () => toast.error('Failed to bookmark')
//   });

//   const commentMutation = useMutation({
//     mutationFn: () => blogAPI.addComment(blog?._id, { content: comment }),
//     onSuccess: () => {
//       setComment('');
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success('Comment added!');
//     },
//     onError: () => toast.error('Failed to add comment')
//   });

//   const handleLike = () => {
//     if (!user) {
//       toast.error('Please login to like');
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error('Please login to bookmark');
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleComment = (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Please login to comment');
//       navigate('/login');
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error('Please write a comment');
//       return;
//     }
//     commentMutation.mutate();
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       toast.success('Link copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy link');
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'Recent';
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Helper function to parse HTML content safely
//   const renderHTML = (htmlString) => {
//     if (!htmlString) return null;
//     return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <div className="min-h-screen pt-20 text-center">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog not found</h1>
//         <Link to="/blog" className="text-primary-600 hover:underline inline-flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> Back to blogs
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
//           <ChevronLeft className="h-4 w-4" /> Back to Blogs
//         </Link>

//         {/* Hero Image */}
//         {blog.featuredImage && (
//           <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
//             <img 
//               src={blog.featuredImage} 
//               alt={blog.title} 
//               className="w-full h-[300px] md:h-[400px] object-cover"
//             />
//           </div>
//         )}

//         {/* Category Badge */}
//         <div className="mb-4">
//           <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded-full text-sm capitalize">
//             {blog.category || 'General'}
//           </span>
//           {blog.isFeatured && (
//             <span className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded-full text-sm">
//               Featured
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//           {blog.title}
//         </h1>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
//           <span className="flex items-center gap-1">
//             <Calendar className="h-4 w-4" /> {formatDate(blog.publishedAt || blog.createdAt)}
//           </span>
//           <span className="flex items-center gap-1">
//             <User className="h-4 w-4" /> {blog.author?.name || 'Admin'}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock className="h-4 w-4" /> {blog.readTime || Math.ceil((blog.content?.length || 0) / 1000)} min read
//           </span>
//           <span className="flex items-center gap-1">
//             <Eye className="h-4 w-4" /> {blog.views?.toLocaleString() || 0} views
//           </span>
//         </div>

//         {/* Excerpt */}
//         {blog.excerpt && (
//           <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-primary-500">
//             {blog.excerpt}
//           </div>
//         )}

//         {/* Content */}
//         <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
//           {renderHTML(blog.content || '')}
//         </div>

//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
//             <Tag className="h-4 w-4 text-gray-400 mt-1" />
//             {blog.tags.map((tag, idx) => (
//               <Link 
//                 key={idx} 
//                 to={`/blog?tag=${tag}`}
//                 className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Video Section */}
//         {blog.videoUrl && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">Watch Video</h3>
//             <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
//               <iframe 
//                 src={blog.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
//                 className="w-full h-full" 
//                 allowFullScreen
//                 title="Blog Video"
//               ></iframe>
//             </div>
//           </div>
//         )}

//         {/* PDF Section */}
//         {blog.pdfUrl && (
//           <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-between flex-wrap gap-4">
//             <span className="flex items-center gap-2">📄 Download PDF Version</span>
//             <a href={blog.pdfUrl} download className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
//               Download PDF
//             </a>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
//           <button 
//             onClick={handleLike} 
//             disabled={likeMutation.isPending}
//             className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//           >
//             <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} /> 
//             {blog.likes || 0}
//           </button>
          
//           <button 
//             onClick={handleBookmark}
//             disabled={bookmarkMutation.isPending}
//             className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${isBookmarked ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//           >
//             <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary-500' : ''}`} /> 
//             Save
//           </button>
          
//           <button 
//             onClick={handleShare}
//             className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           >
//             <Share2 className="h-5 w-5" /> Share
//           </button>
//         </div>

//         {/* Comments Section */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <MessageCircle className="h-5 w-5" /> 
//             Comments ({blog.comments?.filter(c => c.isApproved).length || 0})
//           </h3>
          
//           {/* Comment Form */}
//           {user ? (
//             <form onSubmit={handleComment} className="flex gap-3 mb-6">
//               <input 
//                 type="text" 
//                 value={comment} 
//                 onChange={(e) => setComment(e.target.value)} 
//                 placeholder="Write a comment..." 
//                 className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
//               />
//               <button 
//                 type="submit" 
//                 disabled={commentMutation.isPending}
//                 className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition disabled:opacity-50"
//               >
//                 {commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
//               </button>
//             </form>
//           ) : (
//             <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
//               <p className="text-gray-600 dark:text-gray-400">
//                 <Link to="/login" className="text-primary-600 hover:underline">Login</Link> to leave a comment
//               </p>
//             </div>
//           )}

//           {/* Comments List */}
//           <div className="space-y-4">
//             {blog.comments?.filter(c => c.isApproved).length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
//             ) : (
//               blog.comments?.filter(c => c.isApproved).map((commentItem, idx) => (
//                 <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                       <User className="h-4 w-4 text-gray-400" />
//                       <span className="font-medium text-gray-900 dark:text-white">{commentItem.userName}</span>
//                       <span className="text-xs text-gray-400">{formatDate(commentItem.createdAt)}</span>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 dark:text-gray-300">{commentItem.content}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Related Blogs */}
//         {relatedBlogs.length > 0 && (
//           <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
//             <h3 className="text-xl font-bold mb-6">Related Articles</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {relatedBlogs.map((related, idx) => (
//                 <Link key={idx} to={`/blog/${related.slug}`} className="group">
//                   <div className="flex gap-4">
//                     {related.featuredImage && (
//                       <img src={related.featuredImage} alt={related.title} className="w-24 h-24 rounded-lg object-cover" />
//                     )}
//                     <div>
//                       <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition line-clamp-2">
//                         {related.title}
//                       </h4>
//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">{related.excerpt}</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDetailPage;




















// client/src/pages/public/BlogDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, ChevronLeft, Loader2, MessageCircle, Send, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import blogAPI from '../../api/blogAPI';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useSelector(state => state.auth);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogAPI.getBlog(slug),
    enabled: !!slug
  });

  const blog = response?.data || response;

  const { data: relatedResponse } = useQuery({
    queryKey: ['related-blogs', blog?._id],
    queryFn: () => blogAPI.getRelatedBlogs(blog?._id),
    enabled: !!blog?._id
  });

  const { data: categoryBlogs } = useQuery({
    queryKey: ['category-blogs', blog?.category],
    queryFn: () => blogAPI.getBlogsByCategory(blog?.category, { limit: 4 }),
    enabled: !!blog?.category
  });

  const relatedBlogs = relatedResponse?.data || relatedResponse || [];
  const sameCategoryBlogs = categoryBlogs?.data?.data || categoryBlogs?.data || categoryBlogs || [];

  const likeMutation = useMutation({
    mutationFn: () => blogAPI.likeBlog(blog?._id),
    onSuccess: () => {
      setIsLiked(!isLiked);
      queryClient.invalidateQueries(['blog', slug]);
      toast.success(isLiked ? 'Removed like' : 'Liked!');
    },
    onError: () => toast.error('Failed to update like')
  });

  const commentMutation = useMutation({
    mutationFn: () => blogAPI.addComment(blog?._id, { content: comment }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries(['blog', slug]);
      toast.success('Comment added!');
    },
    onError: () => toast.error('Failed to add comment')
  });

  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like');
      navigate('/login');
      return;
    }
    likeMutation.mutate();
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    commentMutation.mutate();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Recent';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderHTML = (htmlString) => {
    if (!htmlString) return null;
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog not found</h1>
        <Link to="/blog" className="text-primary-600 hover:underline inline-flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" /> Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Blogs
        </Link>

        {/* Hero Image */}
        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
            <img 
              src={blog.featuredImage} 
              alt={blog.title} 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-4">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded-full text-sm capitalize">
            {blog.category}
          </span>
          {blog.isFeatured && (
            <span className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded-full text-sm">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(blog.publishedAt || blog.createdAt)}</span>
          <span className="flex items-center gap-1"><User className="h-4 w-4" /> {blog.author?.name || 'Admin'}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {blog.readTime || Math.ceil((blog.content?.length || 0) / 1000)} min read</span>
          <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {blog.views?.toLocaleString() || 0} views</span>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-primary-500">
            {blog.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {renderHTML(blog.content || '')}
        </div>

        {/* Gallery Images */}
        {blog.gallery && blog.gallery.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {blog.gallery.map((img, idx) => (
                <div key={idx} className="relative cursor-pointer group" onClick={() => setSelectedImage(img.url)}>
                  <img src={img.url} alt={img.caption || `Gallery ${idx + 1}`} className="w-full h-40 object-cover rounded-lg transition group-hover:scale-105" />
                  {img.caption && <p className="text-xs text-gray-500 mt-1 text-center">{img.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <Tag className="h-4 w-4 text-gray-400 mt-1" />
            {blog.tags.map((tag, idx) => (
              <Link key={idx} to={`/blog?tag=${tag}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Video Section */}
        {blog.videoUrl && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Watch Video</h3>
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
              <iframe 
                src={blog.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                className="w-full h-full" 
                allowFullScreen
                title="Blog Video"
              ></iframe>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} /> {blog.likes || 0}
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Share2 className="h-5 w-5" /> Share
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" /> Comments ({blog.comments?.filter(c => c.isApproved).length || 0})
          </h3>
          
          {user ? (
            <form onSubmit={handleComment} className="flex gap-3 mb-6">
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800" />
              <button type="submit" disabled={commentMutation.isPending} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition disabled:opacity-50">
                {commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          ) : (
            <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
              <p className="text-gray-600 dark:text-gray-400"><Link to="/login" className="text-primary-600 hover:underline">Login</Link> to leave a comment</p>
            </div>
          )}

          <div className="space-y-4">
            {blog.comments?.filter(c => c.isApproved).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments?.filter(c => c.isApproved).map((commentItem, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{commentItem.userName}</span>
                      <span className="text-xs text-gray-400">{formatDate(commentItem.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{commentItem.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related & Category Blogs */}
        {(sameCategoryBlogs.length > 0 || relatedBlogs.length > 0) && (
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...sameCategoryBlogs.filter(b => b._id !== blog._id), ...relatedBlogs.filter(b => b._id !== blog._id)].slice(0, 4).map((related, idx) => (
                <Link key={idx} to={`/blog/${related.slug}`} className="group">
                  <div className="flex gap-4">
                    {related.featuredImage && <img src={related.featuredImage} alt={related.title} className="w-24 h-24 rounded-lg object-cover" />}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition line-clamp-2">{related.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{related.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for Gallery */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30" onClick={() => setSelectedImage(null)}>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;