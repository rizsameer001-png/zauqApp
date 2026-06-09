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




















//woking  client/src/pages/public/BlogDetailPage.jsx
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











// // client/src/pages/public/BlogDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, ChevronLeft, Loader2, MessageCircle, Send, Image as ImageIcon, X } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';

// const BlogDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === 'ur';
//   const currentLang = i18n.language;
  
//   const [comment, setComment] = useState('');
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ['blog', slug],
//     queryFn: () => blogAPI.getBlog(slug),
//     enabled: !!slug
//   });

//   const blog = response?.data || response;

//   const { data: relatedResponse } = useQuery({
//     queryKey: ['related-blogs', blog?._id],
//     queryFn: () => blogAPI.getRelatedBlogs(blog?._id),
//     enabled: !!blog?._id
//   });

//   const { data: categoryBlogs } = useQuery({
//     queryKey: ['category-blogs', blog?.category],
//     queryFn: () => blogAPI.getBlogsByCategory(blog?.category, { limit: 4 }),
//     enabled: !!blog?.category
//   });

//   const relatedBlogs = relatedResponse?.data || relatedResponse || [];
//   const sameCategoryBlogs = categoryBlogs?.data?.data || categoryBlogs?.data || categoryBlogs || [];

//   const likeMutation = useMutation({
//     mutationFn: () => blogAPI.likeBlog(blog?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success(isLiked ? t('blog.removedLike') : t('blog.liked'));
//     },
//     onError: () => toast.error(t('blog.likeError'))
//   });

//   const commentMutation = useMutation({
//     mutationFn: () => blogAPI.addComment(blog?._id, { content: comment }),
//     onSuccess: () => {
//       setComment('');
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success(t('blog.commentAdded'));
//     },
//     onError: () => toast.error(t('blog.commentError'))
//   });

//   const handleLike = () => {
//     if (!user) {
//       toast.error(t('blog.loginToLike'));
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleComment = (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error(t('blog.loginToComment'));
//       navigate('/login');
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error(t('blog.writeComment'));
//       return;
//     }
//     commentMutation.mutate();
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       toast.success(t('blog.linkCopied'));
//     } catch (err) {
//       toast.error(t('blog.copyError'));
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return t('blog.recent');
//     return new Date(date).toLocaleDateString(currentLang === 'ur' ? 'ur-PK' : currentLang === 'hi' ? 'hi-IN' : 'en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Render HTML with proper styling for Nastaliq font and editor styles
//   const renderHTML = (htmlString) => {
//     if (!htmlString) return null;
    
//     // Add custom styling for blog content
//     const styledContent = `
//       <div class="blog-content ${currentLang === 'ur' ? 'nastaliq-font' : ''}" style="
//         font-family: ${currentLang === 'ur' ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Alvi Nastaleeq', serif" : "inherit"};
//         line-height: 1.8;
//         font-size: 1.125rem;
//       ">
//         ${htmlString}
//       </div>
//     `;
    
//     return <div dangerouslySetInnerHTML={{ __html: styledContent }} />;
//   };

//   // Apply Nastaliq font to Urdu content
//   useEffect(() => {
//     if (currentLang === 'ur') {
//       // Add Nastaliq font styles to document
//       const style = document.createElement('style');
//       style.textContent = `
//         @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap');
        
//         .nastaliq-font {
//           font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Alvi Nastaleeq', serif !important;
//         }
        
//         .blog-content {
//           font-size: 1.125rem;
//           line-height: 2;
//         }
        
//         .blog-content h1, .blog-content h2, .blog-content h3 {
//           font-family: inherit;
//           margin-top: 1.5em;
//           margin-bottom: 0.5em;
//         }
        
//         .blog-content p {
//           margin-bottom: 1.25em;
//         }
        
//         .blog-content ul, .blog-content ol {
//           margin: 1em 0;
//           padding-left: 1.5em;
//         }
        
//         .blog-content li {
//           margin-bottom: 0.5em;
//         }
        
//         .blog-content blockquote {
//           border-left: 4px solid #8B5CF6;
//           padding-left: 1rem;
//           margin: 1rem 0;
//           font-style: italic;
//           color: #4b5563;
//         }
        
//         .blog-content img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 0.5rem;
//           margin: 1rem 0;
//         }
        
//         .blog-content pre {
//           background-color: #1f2937;
//           color: #f3f4f6;
//           padding: 1rem;
//           border-radius: 0.5rem;
//           overflow-x: auto;
//         }
        
//         .blog-content code {
//           background-color: #f3f4f6;
//           padding: 0.2rem 0.4rem;
//           border-radius: 0.25rem;
//           font-size: 0.875em;
//         }
        
//         .dark .blog-content code {
//           background-color: #374151;
//           color: #f3f4f6;
//         }
        
//         .blog-content table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 1rem 0;
//         }
        
//         .blog-content th, .blog-content td {
//           border: 1px solid #e5e7eb;
//           padding: 0.5rem;
//           text-align: left;
//         }
        
//         .dark .blog-content th, .dark .blog-content td {
//           border-color: #374151;
//         }
//       `;
//       document.head.appendChild(style);
      
//       return () => {
//         document.head.removeChild(style);
//       };
//     }
//   }, [currentLang]);

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
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.notFound')}</h1>
//         <Link to="/blog" className="text-primary-600 hover:underline inline-flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> {t('blog.backToBlogs')}
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : 'ltr'}`}>
//         {/* Back Button */}
//         <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
//           <ChevronLeft className="h-4 w-4" /> {t('blog.backToBlogs')}
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
//             {blog.category}
//           </span>
//           {blog.isFeatured && (
//             <span className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded-full text-sm">
//               {t('blog.featured')}
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 ${currentLang === 'ur' ? 'nastaliq-font' : ''}`}>
//           {blog.title}
//         </h1>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
//           <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(blog.publishedAt || blog.createdAt)}</span>
//           <span className="flex items-center gap-1"><User className="h-4 w-4" /> {blog.author?.name || t('blog.admin')}</span>
//           <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {blog.readTime || Math.ceil((blog.content?.length || 0) / 1000)} {t('blog.minRead')}</span>
//           <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {blog.views?.toLocaleString() || 0} {t('blog.views')}</span>
//         </div>

//         {/* Excerpt */}
//         {blog.excerpt && (
//           <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-primary-500">
//             {blog.excerpt}
//           </div>
//         )}

//         {/* Content - with Nastaliq font support */}
//         <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
//           {renderHTML(blog.content || '')}
//         </div>

//         {/* Gallery Images */}
//         {blog.gallery && blog.gallery.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">{t('blog.gallery')}</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {blog.gallery.map((img, idx) => (
//                 <div key={idx} className="relative cursor-pointer group" onClick={() => setSelectedImage(img.url)}>
//                   <img src={img.url} alt={img.caption || `${t('blog.gallery')} ${idx + 1}`} className="w-full h-40 object-cover rounded-lg transition group-hover:scale-105" />
//                   {img.caption && <p className="text-xs text-gray-500 mt-1 text-center">{img.caption}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
//             <Tag className="h-4 w-4 text-gray-400 mt-1" />
//             {blog.tags.map((tag, idx) => (
//               <Link key={idx} to={`/blog?tag=${tag}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
//                 #{tag}
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Video Section */}
//         {blog.videoUrl && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">{t('blog.watchVideo')}</h3>
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

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
//           <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
//             <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} /> {blog.likes || 0}
//           </button>
//           <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
//             <Share2 className="h-5 w-5" /> {t('blog.share')}
//           </button>
//         </div>

//         {/* Comments Section */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <MessageCircle className="h-5 w-5" /> {t('blog.comments')} ({blog.comments?.filter(c => c.isApproved).length || 0})
//           </h3>
          
//           {user ? (
//             <form onSubmit={handleComment} className="flex gap-3 mb-6">
//               <input 
//                 type="text" 
//                 value={comment} 
//                 onChange={(e) => setComment(e.target.value)} 
//                 placeholder={t('blog.writeCommentPlaceholder')} 
//                 className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
//               />
//               <button type="submit" disabled={commentMutation.isPending} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition disabled:opacity-50">
//                 {commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
//               </button>
//             </form>
//           ) : (
//             <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
//               <p className="text-gray-600 dark:text-gray-400">
//                 <Link to="/login" className="text-primary-600 hover:underline">{t('blog.login')}</Link> {t('blog.loginToComment')}
//               </p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {blog.comments?.filter(c => c.isApproved).length === 0 ? (
//               <p className="text-gray-500 text-center py-8">{t('blog.noComments')}</p>
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

//         {/* Related & Category Blogs */}
//         {(sameCategoryBlogs.length > 0 || relatedBlogs.length > 0) && (
//           <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
//             <h3 className="text-xl font-bold mb-6">{t('blog.youMayAlsoLike')}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[...sameCategoryBlogs.filter(b => b._id !== blog._id), ...relatedBlogs.filter(b => b._id !== blog._id)].slice(0, 4).map((related, idx) => (
//                 <Link key={idx} to={`/blog/${related.slug}`} className="group">
//                   <div className="flex gap-4">
//                     {related.featuredImage && <img src={related.featuredImage} alt={related.title} className="w-24 h-24 rounded-lg object-cover" />}
//                     <div>
//                       <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition line-clamp-2">{related.title}</h4>
//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">{related.excerpt}</p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Lightbox for Gallery */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
//           <img src={selectedImage} alt="Full size" className="max-w-full max-h-full object-contain" />
//           <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" onClick={() => setSelectedImage(null)}>
//             <X className="h-6 w-6 text-white" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetailPage;

















// // client/src/pages/public/BlogDetailPage.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { 
//   Calendar, User, Eye, Heart, Share2, Bookmark, Clock, Tag, 
//   ChevronLeft, Loader2, MessageCircle, Send, Image as ImageIcon, 
//   X, Mic, Volume2, Pause, Play, Headphones, TrendingUp, 
//   ArrowRight, Sparkles, Award, PenTool
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';

// // Voice Search Component
// const VoiceSearchButton = ({ onResult, language = 'en-US', className = '' }) => {
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return;

//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = false;
//     recognitionRef.current.interimResults = false;
//     recognitionRef.current.lang = language;

//     recognitionRef.current.onstart = () => setIsListening(true);
//     recognitionRef.current.onend = () => setIsListening(false);
//     recognitionRef.current.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       if (onResult) onResult(transcript);
//     };
//     recognitionRef.current.onerror = () => setIsListening(false);

//     return () => recognitionRef.current?.abort();
//   }, [language, onResult]);

//   const toggleListening = () => {
//     if (!recognitionRef.current) {
//       toast.error('Voice search not supported in this browser');
//       return;
//     }
//     if (isListening) recognitionRef.current.stop();
//     else recognitionRef.current.start();
//   };

//   return (
//     <button
//       type="button"
//       onClick={toggleListening}
//       className={`relative p-2 rounded-lg transition-all duration-200 ${isListening ? 'bg-red-500 text-white ring-2 ring-red-300 animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//       title={isListening ? 'Listening...' : 'Voice Search'}
//     >
//       <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
//       {isListening && (
//         <span className="absolute -top-1 -right-1 flex h-3 w-3">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//         </span>
//       )}
//     </button>
//   );
// };

// // Text-to-Speech Component
// const TextToSpeech = ({ text, title, className = '' }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [supported, setSupported] = useState(true);
//   const utteranceRef = useRef(null);

//   useEffect(() => {
//     if (!('speechSynthesis' in window)) {
//       setSupported(false);
//     }
//     return () => {
//       if (utteranceRef.current) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   const speak = () => {
//     if (!supported) {
//       toast.error('Text-to-speech not supported in this browser');
//       return;
//     }

//     if (isPlaying) {
//       window.speechSynthesis.cancel();
//       setIsPlaying(false);
//       return;
//     }

//     const cleanText = text?.replace(/<[^>]*>/g, '') || '';
//     if (!cleanText.trim()) {
//       toast.error('No content to read');
//       return;
//     }

//     utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
//     utteranceRef.current.lang = document.documentElement.lang || 'en-US';
//     utteranceRef.current.onend = () => setIsPlaying(false);
//     utteranceRef.current.onerror = () => {
//       setIsPlaying(false);
//       toast.error('Failed to read aloud');
//     };
    
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utteranceRef.current);
//     setIsPlaying(true);
//   };

//   if (!supported) return null;

//   return (
//     <button
//       onClick={speak}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${className} ${isPlaying ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//       title={isPlaying ? 'Stop Reading' : 'Read Aloud'}
//     >
//       {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//       <span className="text-sm">{isPlaying ? 'Stop Reading' : 'Listen to Blog'}</span>
//     </button>
//   );
// };

// // Calculate reading time
// const calculateReadingTime = (content, wordsPerMinute = 200) => {
//   if (!content) return 0;
//   const cleanText = content.replace(/<[^>]*>/g, '');
//   const wordCount = cleanText.trim().split(/\s+/).length;
//   return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
// };

// // Get display name for author (alias for "Admin User")
// const getAuthorDisplayName = (author, t) => {
//   if (!author) return t('blog.admin');
//   const authorName = author.name || author;
//   if (authorName === 'Admin User' || authorName === 'Admin') {
//     return 'Aman';
//   }
//   return authorName;
// };

// const BlogDetailPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { user } = useSelector(state => state.auth);
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === 'ur';
//   const currentLang = i18n.language;
  
//   const [comment, setComment] = useState('');
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const contentRef = useRef(null);

//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ['blog', slug],
//     queryFn: () => blogAPI.getBlog(slug),
//     enabled: !!slug
//   });

//   const blog = response?.data || response;

//   // Fetch similar blogs by same author
//   const { data: authorBlogsResponse } = useQuery({
//     queryKey: ['author-blogs', blog?.author?._id],
//     queryFn: () => blogAPI.getBlogsByAuthor(blog?.author?._id, { limit: 5 }),
//     enabled: !!blog?.author?._id
//   });

//   // Fetch blogs by category
//   const { data: categoryBlogsResponse } = useQuery({
//     queryKey: ['category-blogs', blog?.category],
//     queryFn: () => blogAPI.getBlogsByCategory(blog?.category, { limit: 6 }),
//     enabled: !!blog?.category
//   });

//   // Fetch columnists (featured authors with blogs)
//   const { data: columnistsResponse } = useQuery({
//     queryKey: ['columnists'],
//     queryFn: () => blogAPI.getColumnists({ limit: 5 }),
//     enabled: true
//   });

//   const authorBlogs = authorBlogsResponse?.data?.data || authorBlogsResponse?.data || authorBlogsResponse || [];
//   const categoryBlogs = categoryBlogsResponse?.data?.data || categoryBlogsResponse?.data || categoryBlogsResponse || [];
//   const columnists = columnistsResponse?.data?.data || columnistsResponse?.data || columnistsResponse || [];

//   // Filter out current blog from recommendations
//   const similarByAuthor = authorBlogs.filter(b => b._id !== blog?._id).slice(0, 3);
//   const similarByCategory = categoryBlogs.filter(b => b._id !== blog?._id).slice(0, 4);

//   const readingTime = calculateReadingTime(blog?.content);

//   const likeMutation = useMutation({
//     mutationFn: () => blogAPI.likeBlog(blog?._id),
//     onSuccess: () => {
//       setIsLiked(!isLiked);
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success(isLiked ? t('blog.removedLike') : t('blog.liked'));
//     },
//     onError: () => toast.error(t('blog.likeError'))
//   });

//   const commentMutation = useMutation({
//     mutationFn: () => blogAPI.addComment(blog?._id, { content: comment }),
//     onSuccess: () => {
//       setComment('');
//       queryClient.invalidateQueries(['blog', slug]);
//       toast.success(t('blog.commentAdded'));
//     },
//     onError: () => toast.error(t('blog.commentError'))
//   });

//   const bookmarkMutation = useMutation({
//     mutationFn: () => blogAPI.bookmarkBlog(blog?._id),
//     onSuccess: () => {
//       setIsBookmarked(!isBookmarked);
//       toast.success(isBookmarked ? t('blog.removedBookmark') : t('blog.bookmarked'));
//     },
//     onError: () => toast.error(t('blog.bookmarkError'))
//   });

//   const handleLike = () => {
//     if (!user) {
//       toast.error(t('blog.loginToLike'));
//       navigate('/login');
//       return;
//     }
//     likeMutation.mutate();
//   };

//   const handleBookmark = () => {
//     if (!user) {
//       toast.error(t('blog.loginToBookmark'));
//       navigate('/login');
//       return;
//     }
//     bookmarkMutation.mutate();
//   };

//   const handleComment = (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error(t('blog.loginToComment'));
//       navigate('/login');
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error(t('blog.writeComment'));
//       return;
//     }
//     commentMutation.mutate();
//   };

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       toast.success(t('blog.linkCopied'));
//     } catch (err) {
//       toast.error(t('blog.copyError'));
//     }
//   };

//   const handleVoiceSearch = (transcript) => {
//     setSearchQuery(transcript);
//     performSearch(transcript);
//   };

//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       return;
//     }
//     try {
//       const response = await blogAPI.searchBlogs(query);
//       const results = response?.data?.data || response?.data || response || [];
//       setSearchResults(results.slice(0, 5));
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error('Search error:', error);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return t('blog.recent');
//     return new Date(date).toLocaleDateString(currentLang === 'ur' ? 'ur-PK' : currentLang === 'hi' ? 'hi-IN' : 'en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Render HTML with proper styling
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
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.notFound')}</h1>
//         <Link to="/blog" className="text-primary-600 hover:underline inline-flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> {t('blog.backToBlogs')}
//         </Link>
//       </div>
//     );
//   }

//   const authorDisplayName = getAuthorDisplayName(blog.author, t);

//   return (
//     <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
//           {/* Main Content */}
//           <div className="flex-1 min-w-0">
//             {/* Back Button */}
//             <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
//               <ChevronLeft className="h-4 w-4" /> {t('blog.backToBlogs')}
//             </Link>

//             {/* Hero Image */}
//             {blog.featuredImage && (
//               <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
//                 <img 
//                   src={blog.featuredImage} 
//                   alt={blog.title} 
//                   className="w-full h-[300px] md:h-[400px] object-cover"
//                 />
//               </div>
//             )}

//             {/* Category Badge */}
//             <div className="mb-4">
//               <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded-full text-sm capitalize">
//                 {blog.category}
//               </span>
//               {blog.isFeatured && (
//                 <span className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded-full text-sm">
//                   {t('blog.featured')}
//                 </span>
//               )}
//             </div>

//             {/* Title */}
//             <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4`}>
//               {blog.title}
//             </h1>

//             {/* Author Info */}
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
//               <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                 {authorDisplayName.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900 dark:text-white">{authorDisplayName}</p>
//                 <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
//                   <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(blog.publishedAt || blog.createdAt)}</span>
//                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime} {t('blog.minRead')}</span>
//                   <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {blog.views?.toLocaleString() || 0} {t('blog.views')}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons with Voice Search and TTS */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//               <div className="flex flex-wrap gap-3">
//                 <button onClick={handleLike} disabled={likeMutation.isPending} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isLiked ? 'bg-red-50 text-red-600 dark:bg-red-950/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
//                   <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} /> {blog.likes || 0}
//                 </button>
//                 <button onClick={handleBookmark} disabled={bookmarkMutation.isPending} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isBookmarked ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
//                   <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary-500' : ''}`} /> {t('blog.bookmark')}
//                 </button>
//                 <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
//                   <Share2 className="h-4 w-4" /> {t('blog.share')}
//                 </button>
//               </div>
//               <div className="flex gap-2">
//                 <TextToSpeech text={blog.content} title={blog.title} className="text-sm" />
//               </div>
//             </div>

//             {/* Excerpt */}
//             {blog.excerpt && (
//               <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-primary-500">
//                 {blog.excerpt}
//               </div>
//             )}

//             {/* Content */}
//             <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none mb-8">
//               {renderHTML(blog.content || '')}
//             </div>

//             {/* Gallery Images */}
//             {blog.gallery && blog.gallery.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-xl font-bold mb-4">{t('blog.gallery')}</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {blog.gallery.map((img, idx) => (
//                     <div key={idx} className="relative cursor-pointer group" onClick={() => setSelectedImage(img.url)}>
//                       <img src={img.url} alt={img.caption || `${t('blog.gallery')} ${idx + 1}`} className="w-full h-40 object-cover rounded-lg transition group-hover:scale-105" />
//                       {img.caption && <p className="text-xs text-gray-500 mt-1 text-center">{img.caption}</p>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Tags */}
//             {blog.tags && blog.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
//                 <Tag className="h-4 w-4 text-gray-400 mt-1" />
//                 {blog.tags.map((tag, idx) => (
//                   <Link key={idx} to={`/blog?tag=${tag}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
//                     #{tag}
//                   </Link>
//                 ))}
//               </div>
//             )}

//             {/* Video Section */}
//             {blog.videoUrl && (
//               <div className="mb-8">
//                 <h3 className="text-xl font-bold mb-4">{t('blog.watchVideo')}</h3>
//                 <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
//                   <iframe 
//                     src={blog.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
//                     className="w-full h-full" 
//                     allowFullScreen
//                     title="Blog Video"
//                   ></iframe>
//                 </div>
//               </div>
//             )}

//             {/* Similar Blogs by Same Author */}
//             {similarByAuthor.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                   <PenTool className="h-5 w-5 text-primary-600" />
//                   {t('blog.moreByAuthor', { author: authorDisplayName })}
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {similarByAuthor.map((related) => (
//                     <Link key={related._id} to={`/blog/${related.slug}`} className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
//                       <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition line-clamp-2">{related.title}</h4>
//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">{related.excerpt}</p>
//                       <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
//                         <Calendar className="h-3 w-3" />
//                         <span>{formatDate(related.publishedAt || related.createdAt)}</span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Comments Section */}
//             <div className="mb-8">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <MessageCircle className="h-5 w-5" /> {t('blog.comments')} ({blog.comments?.filter(c => c.isApproved).length || 0})
//               </h3>
              
//               {user ? (
//                 <form onSubmit={handleComment} className="flex gap-3 mb-6">
//                   <input 
//                     type="text" 
//                     value={comment} 
//                     onChange={(e) => setComment(e.target.value)} 
//                     placeholder={t('blog.writeCommentPlaceholder')} 
//                     className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
//                   />
//                   <button type="submit" disabled={commentMutation.isPending} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition disabled:opacity-50">
//                     {commentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
//                   </button>
//                 </form>
//               ) : (
//                 <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
//                   <p className="text-gray-600 dark:text-gray-400">
//                     <Link to="/login" className="text-primary-600 hover:underline">{t('blog.login')}</Link> {t('blog.loginToComment')}
//                   </p>
//                 </div>
//               )}

//               <div className="space-y-4">
//                 {blog.comments?.filter(c => c.isApproved).length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">{t('blog.noComments')}</p>
//                 ) : (
//                   blog.comments?.filter(c => c.isApproved).map((commentItem, idx) => (
//                     <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-amber-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                             {commentItem.userName?.charAt(0).toUpperCase() || 'U'}
//                           </div>
//                           <div>
//                             <span className="font-medium text-gray-900 dark:text-white">{commentItem.userName}</span>
//                             <span className="text-xs text-gray-400 ml-2">{formatDate(commentItem.createdAt)}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-700 dark:text-gray-300 ml-10">{commentItem.content}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="lg:w-80 flex-shrink-0">
//             <div className="sticky top-24 space-y-6">
//               {/* Search Bar with Voice */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                   <Search className="h-4 w-4 text-primary-600" />
//                   {t('blog.searchBlogs')}
//                 </h3>
//                 <div className="flex gap-2">
//                   <div className="flex-1 relative">
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       onFocus={() => searchQuery && setShowSearchResults(true)}
//                       placeholder={t('blog.searchPlaceholder')}
//                       className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-900"
//                     />
//                   </div>
//                   <VoiceSearchButton 
//                     onResult={handleVoiceSearch}
//                     language={currentLang === 'ur' ? 'ur-PK' : currentLang === 'hi' ? 'hi-IN' : 'en-US'}
//                     className="p-2"
//                   />
//                 </div>
//                 {showSearchResults && searchResults.length > 0 && (
//                   <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
//                     {searchResults.map((result) => (
//                       <Link
//                         key={result._id}
//                         to={`/blog/${result.slug}`}
//                         onClick={() => setShowSearchResults(false)}
//                         className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
//                       >
//                         <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{result.title}</p>
//                         <p className="text-xs text-gray-500 line-clamp-1">{result.excerpt}</p>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Columnists Section */}
//               {columnists.length > 0 && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                     <Award className="h-4 w-4 text-amber-500" />
//                     {t('blog.columnists')}
//                   </h3>
//                   <div className="space-y-3">
//                     {columnists.map((columnist) => {
//                       const columnistName = getAuthorDisplayName(columnist, t);
//                       return (
//                         <Link
//                           key={columnist._id}
//                           to={`/author/${columnist.slug || columnist._id}`}
//                           className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition group"
//                         >
//                           <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
//                             {columnistName.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition">
//                               {columnistName}
//                             </p>
//                             <p className="text-xs text-gray-500">{columnist.bio?.substring(0, 60) || t('blog.columnistBio')}</p>
//                           </div>
//                           <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Categories Section */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                   <Tag className="h-4 w-4 text-primary-600" />
//                   {t('blog.categories')}
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {['poetry', 'literature', 'interviews', 'reviews', 'news', 'tips'].map((cat) => (
//                     <Link
//                       key={cat}
//                       to={`/blog?category=${cat}`}
//                       className={`px-3 py-1 text-xs rounded-full transition capitalize ${
//                         blog.category === cat
//                           ? 'bg-primary-600 text-white'
//                           : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/50'
//                       }`}
//                     >
//                       {cat}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Similar by Category */}
//               {similarByCategory.length > 0 && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
//                   <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                     <TrendingUp className="h-4 w-4 text-primary-600" />
//                     {t('blog.similarInCategory')}
//                   </h3>
//                   <div className="space-y-3">
//                     {similarByCategory.map((related) => (
//                       <Link
//                         key={related._id}
//                         to={`/blog/${related.slug}`}
//                         className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
//                       >
//                         <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{related.title}</p>
//                         <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
//                           <Clock className="h-3 w-3" />
//                           <span>{calculateReadingTime(related.content)} {t('blog.minRead')}</span>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Lightbox for Gallery */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
//           <img src={selectedImage} alt="Full size" className="max-w-full max-h-full object-contain" />
//           <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" onClick={() => setSelectedImage(null)}>
//             <X className="h-6 w-6 text-white" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetailPage;