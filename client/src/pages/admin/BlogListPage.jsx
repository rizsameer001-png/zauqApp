// // client/src/pages/admin/BlogListPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Loader2, Search,
//   Filter, ChevronLeft, ChevronRight, Calendar,
//   User, Eye as ViewIcon, CheckCircle, XCircle,
//   Newspaper, Clock, Tag, Star
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';

// const BlogListPage = () => {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [filterCategory, setFilterCategory] = useState('all');
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

//   const categories = [
//     'all', 'poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials', 'other'
//   ];

//   useEffect(() => {
//     fetchBlogs();
//   }, [pagination.page, filterStatus, filterCategory, searchQuery]);

//   const fetchBlogs = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...(searchQuery && { search: searchQuery }),
//         ...(filterCategory !== 'all' && { category: filterCategory }),
//         ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
//       };
      
//       const response = await blogAPI.getBlogs(params);
//       const data = response?.data?.data || response?.data || response || [];
//       const paginationData = response?.data?.pagination || { total: 0, totalPages: 1, page: pagination.page, limit: pagination.limit };
      
//       setBlogs(Array.isArray(data) ? data : []);
//       setPagination(prev => ({ ...prev, ...paginationData }));
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//       toast.error('Failed to load blogs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this blog?')) return;
//     try {
//       await blogAPI.deleteBlog(id);
//       toast.success('Blog deleted successfully');
//       fetchBlogs();
//     } catch (error) {
//       toast.error('Failed to delete blog');
//     }
//   };

//   const handleTogglePublish = async (blog) => {
//     try {
//       await blogAPI.updateBlog(blog._id, { isPublished: !blog.isPublished });
//       toast.success(`Blog ${!blog.isPublished ? 'published' : 'unpublished'}`);
//       fetchBlogs();
//     } catch (error) {
//       toast.error('Failed to update status');
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   if (loading && blogs.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
//           <p className="text-gray-500 mt-1">Manage your blog posts and articles</p>
//         </div>
//         <Link to="/admin/blog/new" className="btn-primary flex items-center gap-2">
//           <Plus className="h-5 w-5" /> Write New Post
//         </Link>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <Newspaper className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
//           <p className="text-sm text-gray-500">Total Posts</p>
//         </div>
//         <div className="card p-4 text-center">
//           <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold text-green-600">{blogs.filter(b => b.isPublished).length}</p>
//           <p className="text-sm text-gray-500">Published</p>
//         </div>
//         <div className="card p-4 text-center">
//           <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold text-yellow-600">{blogs.filter(b => !b.isPublished).length}</p>
//           <p className="text-sm text-gray-500">Drafts</p>
//         </div>
//         <div className="card p-4 text-center">
//           <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
//           <p className="text-2xl font-bold text-purple-600">{blogs.filter(b => b.isFeatured).length}</p>
//           <p className="text-sm text-gray-500">Featured</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search blogs by title..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field pl-9"
//           />
//         </div>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="input-field w-40"
//         >
//           {categories.map(cat => (
//             <option key={cat} value={cat}>
//               {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </option>
//           ))}
//         </select>
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="input-field w-36"
//         >
//           <option value="all">All Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//       </div>

//       {/* Blog Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-900 border-b">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blog Post</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {blogs.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
//                     <Newspaper className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//                     <p>No blogs found</p>
//                     <Link to="/admin/blog/new" className="text-primary-600 mt-2 inline-block">
//                       Create your first blog post →
//                     </Link>
//                   </td>
//                 </tr>
//               ) : (
//                 blogs.map((blog) => (
//                   <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         {blog.featuredImage ? (
//                           <img src={blog.featuredImage} alt={blog.title} className="w-10 h-10 rounded-lg object-cover" />
//                         ) : (
//                           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
//                             <Newspaper className="h-5 w-5 text-gray-400" />
//                           </div>
//                         )}
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-white">{blog.title}</p>
//                           <code className="text-xs text-gray-500">/{blog.slug}</code>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="badge-primary capitalize">{blog.category}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleTogglePublish(blog)}
//                         className={`px-2 py-1 text-xs rounded-full ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
//                       >
//                         {blog.isPublished ? 'Published' : 'Draft'}
//                       </button>
//                       {blog.isFeatured && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Featured</span>}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{blog.views || 0}</td>
//                     <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</td>
//                     <td className="px-6 py-4 text-right space-x-2">
//                       <Link to={`/blog/${blog.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-block">
//                         <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                       </Link>
//                       <Link to={`/admin/blog/edit/${blog._id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-block">
//                         <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                       </Link>
//                       <button onClick={() => handleDelete(blog._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
//                         <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex justify-between items-center px-6 py-4 border-t">
//             <p className="text-sm text-gray-500">
//               Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
//                 disabled={pagination.page === 1}
//                 className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>
//               <span className="px-3 py-1.5 bg-primary-600 text-white rounded-lg">
//                 {pagination.page} / {pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
//                 disabled={pagination.page === pagination.totalPages}
//                 className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogListPage;
























// client/src/pages/admin/BlogListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Eye, Loader2, Search,
  Filter, ChevronLeft, ChevronRight, Calendar,
  User, Eye as ViewIcon, CheckCircle, XCircle,
  Newspaper, Clock, Tag, Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import blogAPI from '../../api/blogAPI';

const BlogListPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

  const categories = [
    'all', 'poetry', 'authors', 'books', 'audio', 'events', 'interviews', 'reviews', 'news', 'tutorials', 'other'
  ];

  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, filterStatus, filterCategory, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(searchQuery && { search: searchQuery }),
        ...(filterCategory !== 'all' && { category: filterCategory }),
        ...(filterStatus !== 'all' && { isPublished: filterStatus === 'published' })
      };
      
      const response = await blogAPI.getBlogs(params);
      const data = response?.data?.data || response?.data || response || [];
      const paginationData = response?.data?.pagination || { total: 0, totalPages: 1, page: pagination.page, limit: pagination.limit };
      
      setBlogs(Array.isArray(data) ? data : []);
      setPagination(prev => ({ ...prev, ...paginationData }));
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogAPI.deleteBlog(id);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      await blogAPI.updateBlog(blog._id, { isPublished: !blog.isPublished });
      toast.success(`Blog ${!blog.isPublished ? 'published' : 'unpublished'}`);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500 mt-1">Manage your blog posts and articles</p>
        </div>
        <Link to="/admin/blog/new" className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" /> Write New Post
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <Newspaper className="h-6 w-6 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          <p className="text-sm text-gray-500">Total Posts</p>
        </div>
        <div className="card p-4 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{blogs.filter(b => b.isPublished).length}</p>
          <p className="text-sm text-gray-500">Published</p>
        </div>
        <div className="card p-4 text-center">
          <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">{blogs.filter(b => !b.isPublished).length}</p>
          <p className="text-sm text-gray-500">Drafts</p>
        </div>
        <div className="card p-4 text-center">
          <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{blogs.filter(b => b.isFeatured).length}</p>
          <p className="text-sm text-gray-500">Featured</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field w-40"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-36"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Blog Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blog Post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <Newspaper className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No blogs found</p>
                    <Link to="/admin/blog/new" className="text-primary-600 mt-2 inline-block">
                      Create your first blog post →
                    </Link>
                   </td>
                 </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.featuredImage ? (
                          <img src={blog.featuredImage} alt={blog.title} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Newspaper className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{blog.title}</p>
                          <code className="text-xs text-gray-500">/{blog.slug}</code>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge-primary capitalize">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`px-2 py-1 text-xs rounded-full ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                      >
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </button>
                      {blog.isFeatured && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{blog.views || 0}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link to={`/blog/${blog.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-block">
                        <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </Link>
                      <Link to={`/admin/blog/edit/${blog._id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-block">
                        <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </Link>
                      <button onClick={() => handleDelete(blog._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <p className="text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1.5 bg-primary-600 text-white rounded-lg">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;