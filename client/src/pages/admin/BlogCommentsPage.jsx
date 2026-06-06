// // client/src/pages/admin/BlogCommentsPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const BlogCommentsPage = () => {
//   return (
//     <div className="p-6">
//       <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4">
//         <ArrowLeft className="h-4 w-4" /> Back to Blog
//       </Link>
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Comments</h1>
//       <p className="text-gray-500">Comment moderation coming soon...</p>
//     </div>
//   );
// };

// export default BlogCommentsPage;










// client/src/pages/admin/BlogCommentsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Trash2, ArrowLeft, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogCommentsPage = () => {
  const [comments, setComments] = useState([
    { id: 1, post: 'Understanding Urdu Poetry', author: 'Ahmed Raza', content: 'Beautiful article! Very informative.', date: '2024-01-15', status: 'pending' },
    { id: 2, post: 'The Golden Era of Poetry', author: 'Fatima Khan', content: 'Loved reading this. Keep up the good work!', date: '2024-01-14', status: 'approved' },
    { id: 3, post: 'Modern Urdu Literature', author: 'Omar Siddiqui', content: 'Great insights about contemporary poetry.', date: '2024-01-13', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'approved' } : c));
    toast.success('Comment approved');
  };

  const handleReject = (id) => {
    setComments(comments.filter(c => c.id !== id));
    toast.success('Comment rejected');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(c => c.id !== id));
      toast.success('Comment deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Blog Comments</h1>
        <p className="text-gray-500 mt-1">Moderate blog post comments</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{comment.post}</td>
                <td className="px-6 py-4 text-sm max-w-xs truncate">{comment.content}</td>
                <td className="px-6 py-4 text-sm">{comment.author}</td>
                <td className="px-6 py-4 text-sm">{new Date(comment.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${comment.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {comment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  {comment.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(comment.id)} className="p-1 inline-block text-green-600 hover:bg-green-50 rounded" title="Approve">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleReject(comment.id)} className="p-1 inline-block text-red-600 hover:bg-red-50 rounded" title="Reject">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(comment.id)} className="p-1 inline-block text-gray-600 hover:bg-gray-100 rounded" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No comments yet</p>
        </div>
      )}
    </div>
  );
};

export default BlogCommentsPage;