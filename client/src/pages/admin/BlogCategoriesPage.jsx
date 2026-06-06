// // client/src/pages/admin/BlogCategoriesPage.jsx
// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
// import toast from 'react-hot-toast';

// const BlogCategoriesPage = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: 'Poetry', slug: 'poetry', count: 12 },
//     { id: 2, name: 'Authors', slug: 'authors', count: 8 },
//     { id: 3, name: 'Books', slug: 'books', count: 6 },
//     { id: 4, name: 'Audio', slug: 'audio', count: 15 },
//     { id: 5, name: 'Events', slug: 'events', count: 4 },
//   ]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({ name: '', slug: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       toast.error('Category name is required');
//       return;
//     }
    
//     const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
//     if (editingCategory) {
//       setCategories(categories.map(cat => 
//         cat.id === editingCategory.id ? { ...cat, name: formData.name, slug } : cat
//       ));
//       toast.success('Category updated');
//     } else {
//       setCategories([...categories, { id: Date.now(), name: formData.name, slug, count: 0 }]);
//       toast.success('Category created');
//     }
//     resetModal();
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure?')) {
//       setCategories(categories.filter(cat => cat.id !== id));
//       toast.success('Category deleted');
//     }
//   };

//   const resetModal = () => {
//     setShowModal(false);
//     setEditingCategory(null);
//     setFormData({ name: '', slug: '' });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
//           <p className="text-gray-500 mt-1">Manage blog post categories</p>
//         </div>
//         <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
//           <Plus className="h-4 w-4" /> Add Category
//         </button>
//       </div>

//       <div className="card overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Slug</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Posts</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {categories.map((category) => (
//               <tr key={category.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 font-medium">{category.name}</td>
//                 <td className="px-6 py-4 text-gray-500">{category.slug}</td>
//                 <td className="px-6 py-4">{category.count}</td>
//                 <td className="px-6 py-4 text-right">
//                   <button onClick={() => { setEditingCategory(category); setFormData({ name: category.name, slug: category.slug }); setShowModal(true); }} className="p-1 mr-2 text-blue-600 hover:bg-blue-50 rounded">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button onClick={() => handleDelete(category.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
//               <button onClick={resetModal} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Name *</label>
//                 <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} className="input-field" required />
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium mb-1">Slug</label>
//                 <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="input-field" />
//               </div>
//               <div className="flex gap-3">
//                 <button type="submit" className="btn-primary flex-1">{editingCategory ? 'Update' : 'Create'}</button>
//                 <button type="button" onClick={resetModal} className="btn-outline flex-1">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogCategoriesPage;















// client/src/pages/admin/BlogCategoriesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogCategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Poetry', slug: 'poetry', count: 12 },
    { id: 2, name: 'Authors', slug: 'authors', count: 8 },
    { id: 3, name: 'Books', slug: 'books', count: 6 },
    { id: 4, name: 'Audio', slug: 'audio', count: 15 },
    { id: 5, name: 'Events', slug: 'events', count: 4 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Category name is required');
      return;
    }
    
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: formData.name, slug } : cat
      ));
      toast.success('Category updated');
    } else {
      setCategories([...categories, { id: Date.now(), name: formData.name, slug, count: 0 }]);
      toast.success('Category created');
    }
    resetModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success('Category deleted');
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
          <p className="text-gray-500 mt-1">Manage blog post categories</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Posts</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{category.name}</td>
                <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                <td className="px-6 py-4">{category.count}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => { setEditingCategory(category); setFormData({ name: category.name, slug: category.slug }); setShowModal(true); }} 
                    className="p-1 mr-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={resetModal} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} 
                  className="input-field" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input 
                  type="text" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
                  className="input-field" 
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name</p>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">{editingCategory ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetModal} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategoriesPage;