// client/src/components/admin/BlogQuickActions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, List, Settings, Eye, Trash2 } from 'lucide-react';

const BlogQuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <Link
        to="/admin/blog/new"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary-600 transition">
          <Plus className="h-5 w-5 text-primary-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">New Post</span>
      </Link>

      <Link
        to="/admin/blog"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-600 transition">
          <List className="h-5 w-5 text-blue-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">All Posts</span>
      </Link>

      <Link
        to="/admin/blog/categories"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-600 transition">
          <Settings className="h-5 w-5 text-green-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">Categories</span>
      </Link>

      <Link
        to="/admin/blog/comments"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-600 transition">
          <Eye className="h-5 w-5 text-orange-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">Comments</span>
      </Link>

      <Link
        to="/blog"
        target="_blank"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-600 transition">
          <Eye className="h-5 w-5 text-purple-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">View Blog</span>
      </Link>

      <Link
        to="#"
        className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm('Clear blog cache?')) {
            // Implement cache clearing logic
            toast.success('Cache cleared');
          }
        }}
      >
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-600 transition">
          <Trash2 className="h-5 w-5 text-red-600 group-hover:text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">Clear Cache</span>
      </Link>
    </div>
  );
};

export default BlogQuickActions;