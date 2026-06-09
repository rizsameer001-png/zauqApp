
// working client/src/pages/admin/BlogCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Eye, Upload, X, Loader2,
  Image, Video, FileText, Tag, Calendar, User,
  Check, AlertCircle, ChevronLeft, ChevronRight, Save,
  GripVertical, Link as LinkIcon, Youtube, Search, Filter,
  Newspaper, CheckCircle, Clock, Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import blogAPI from '../../api/blogAPI';
import uploadAPI from '../../api/uploadAPI';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Simple RichTextEditor without image resize module
const RichTextEditor = ({ value, onChange, placeholder = 'Write your blog content here...' }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'check',
    'indent', 'align', 'blockquote', 'code-block',
    'link', 'image'
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className="bg-white dark:bg-gray-800 rounded-lg"
      style={{ height: '400px', marginBottom: '50px' }}
    />
  );
};

const BlogCMSPage = () => {
  const navigate = useNavigate();
  
  // List View States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'poetry',
    tags: [],
    featuredImage: '',
    gallery: [],
    videoUrl: '',
    pdfUrl: '',
    readTime: 5,
    isPublished: false,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    metaKeywords: ''
  });

  const categories = [
    { id: 'poetry', label: 'Poetry', icon: '📖' },
    { id: 'authors', label: 'Authors', icon: '👤' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'interviews', label: 'Interviews', icon: '🎙️' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
    { id: 'other', label: 'Other', icon: '📁' }
  ];

  // Fetch blogs for list view
  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, searchQuery, filterCategory, filterStatus]);

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
      setBlogs(Array.isArray(data) ? data : []);
      if (response?.data?.pagination) setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  // Image upload handlers
  const handleImageUpload = async (file, type = 'featured') => {
    if (!file) return;
    
    if (type === 'featured') {
      setUploadingImage(true);
    } else {
      setUploadingGallery(true);
    }
    
    try {
      const response = await uploadAPI.uploadImage(file);
      if (response.data?.url) {
        if (type === 'featured') {
          setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
          toast.success('Featured image uploaded successfully');
        } else {
          setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, { url: response.data.url, caption: '' }]
          }));
          toast.success('Gallery image uploaded successfully');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      if (type === 'featured') {
        setUploadingImage(false);
      } else {
        setUploadingGallery(false);
      }
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    toast.success('Image removed');
  };

  const updateGalleryCaption = (index, caption) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.map((img, i) => 
        i === index ? { ...img, caption } : img
      )
    }));
  };

  // Form handlers
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'poetry',
      tags: blog.tags || [],
      featuredImage: blog.featuredImage || '',
      gallery: blog.gallery || [],
      videoUrl: blog.videoUrl || '',
      pdfUrl: blog.pdfUrl || '',
      readTime: blog.readTime || 5,
      isPublished: blog.isPublished || false,
      isFeatured: blog.isFeatured || false,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });
    setActiveTab('content');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!formData.excerpt || !formData.excerpt.trim()) {
      toast.error('Please enter an excerpt');
      return;
    }
    if (!formData.content || !formData.content.trim()) {
      toast.error('Please enter content');
      return;
    }

    setLoading(true);
    try {
      let slug = formData.slug;
      if (!slug) {
        slug = formData.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      const blogData = {
        title: formData.title.trim(),
        slug,
        excerpt: formData.excerpt.trim(),
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        featuredImage: formData.featuredImage,
        gallery: formData.gallery,
        videoUrl: formData.videoUrl || '',
        pdfUrl: formData.pdfUrl || '',
        readTime: formData.readTime,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt,
        metaKeywords: formData.metaKeywords || ''
      };

      if (editingBlog) {
        await blogAPI.updateBlog(editingBlog._id, blogData);
        toast.success('Blog updated successfully');
      } else {
        await blogAPI.createBlog(blogData);
        toast.success('Blog created successfully');
      }
      resetModal();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      const errorMsg = error.response?.data?.message || 'Failed to save blog';
      toast.error(errorMsg);
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

  const resetModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'poetry',
      tags: [],
      featuredImage: '',
      gallery: [],
      videoUrl: '',
      pdfUrl: '',
      readTime: 5,
      isPublished: false,
      isFeatured: false,
      seoTitle: '',
      seoDescription: '',
      metaKeywords: ''
    });
    setActiveTab('content');
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const getSlugPreview = () => {
    const slug = formData.slug || (formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'blog-post');
    return `${window.location.origin}/blog/${slug}`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog CMS</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your blog posts, articles, and announcements</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" /> Write New Post
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <Newspaper className="h-6 w-6 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pagination.total}</p>
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
          <option value="all">All Categories</option>
          {categories.filter(c => c.id !== 'other').map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
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

      {/* Blog List Table */}
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
              {loading && blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <Newspaper className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No blogs found</p>
                    <button onClick={() => setShowModal(true)} className="text-primary-600 mt-2 inline-block">
                      Create your first blog post →
                    </button>
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
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
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
                      <button onClick={() => handleEdit(blog)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 inline-block">
                        <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </button>
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <button onClick={resetModal} className="p-2 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 border-b px-4">
              <button onClick={() => setActiveTab('content')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'content' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}>📝 Content</button>
              <button onClick={() => setActiveTab('media')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'media' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}>🖼️ Media</button>
              <button onClick={() => setActiveTab('seo')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'seo' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}>🔍 SEO</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Slug</label><input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} className="input-field" placeholder="auto-generated" /></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-1">Excerpt *</label><textarea rows="3" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="input-field" required /><p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p></div>
                  <div><label className="block text-sm font-medium mb-1">Content *</label><RichTextEditor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">{categories.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>)}</select></div>
                    <div><label className="block text-sm font-medium mb-1">Tags</label><input type="text" value={formData.tags.join(', ')} onChange={handleTagsChange} className="input-field" placeholder="comma, separated, tags" /></div>
                  </div>
                  <div className="flex gap-4"><label className="flex items-center gap-2"><input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="h-4 w-4" /> Publish immediately</label><label className="flex items-center gap-2"><input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="h-4 w-4" /> Feature this post</label></div>
                </>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <>
                  <div><label className="block text-sm font-medium mb-1">Featured Image</label><div className="flex gap-3"><input type="url" value={formData.featuredImage} onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} className="input-field flex-1" /><div className="relative"><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], 'featured')} className="absolute inset-0 opacity-0 cursor-pointer" /><button type="button" className="btn-outline flex items-center gap-2">{uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload</button></div></div>{formData.featuredImage && <img src={formData.featuredImage} alt="Featured" className="mt-2 h-40 w-full object-cover rounded-lg" />}</div>
                  <div><label className="block text-sm font-medium mb-1">Gallery Images</label><div className="flex gap-3 mb-3"><div className="relative"><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer" /><button type="button" className="btn-outline flex items-center gap-2">{uploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />} Add Image</button></div></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{formData.gallery.map((img, idx) => (<div key={idx} className="relative group border rounded-lg p-2"><img src={img.url} className="h-24 w-full object-cover rounded-lg" /><input type="text" value={img.caption} onChange={(e) => updateGalleryCaption(idx, e.target.value)} placeholder="Caption" className="mt-1 text-xs w-full p-1 border rounded" /><button onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"><X className="h-3 w-3 text-white" /></button></div>))}</div></div>
                  <div><label className="block text-sm font-medium mb-1">YouTube Video URL</label><input type="url" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} className="input-field" placeholder="https://youtube.com/watch?v=..." /></div>
                  <div><label className="block text-sm font-medium mb-1">PDF URL</label><input type="url" value={formData.pdfUrl} onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })} className="input-field" placeholder="https://..." /></div>
                  <div><label className="block text-sm font-medium mb-1">Read Time (minutes)</label><input type="number" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })} className="input-field" min="1" /></div>
                </>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <>
                  <div><label className="block text-sm font-medium mb-1">SEO Title</label><input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="input-field" placeholder="Leave empty to use blog title" /></div>
                  <div><label className="block text-sm font-medium mb-1">SEO Description</label><textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} className="input-field" placeholder="Brief description for search engines" /></div>
                  <div><label className="block text-sm font-medium mb-1">Meta Keywords</label><input type="text" value={formData.metaKeywords} onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })} className="input-field" placeholder="keyword1, keyword2, keyword3" /></div>
                  <div className="bg-gray-50 rounded-lg p-4"><h3 className="text-sm font-semibold mb-2">Search Preview</h3><p className="text-primary-600 text-lg font-medium">{formData.seoTitle || formData.title || 'Blog Title'}</p><p className="text-green-700 text-sm">{getSlugPreview()}</p><p className="text-gray-500 text-sm">{formData.seoDescription || formData.excerpt || 'Blog description...'}</p></div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3">{loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBlog ? 'Update Blog' : 'Publish Blog')}</button>
                <button type="button" onClick={resetModal} className="btn-outline px-6">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCMSPage;














// // client/src/pages/admin/BlogCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Upload, X, Loader2,
//   Image, Video, FileText, Tag, Calendar, User,
//   Check, AlertCircle, ChevronLeft, ChevronRight, Save
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';
// import uploadAPI from '../../api/uploadAPI';

// const BlogCMSPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     category: 'poetry',
//     tags: [],
//     featuredImage: '',
//     videoUrl: '',
//     isPublished: false,
//     isFeatured: false,
//     seoTitle: '',
//     seoDescription: ''
//   });

//   const categories = [
//     { id: 'poetry', label: 'Poetry' },
//     { id: 'authors', label: 'Authors' },
//     { id: 'books', label: 'Books' },
//     { id: 'audio', label: 'Audio' },
//     { id: 'events', label: 'Events' },
//     { id: 'interviews', label: 'Interviews' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'news', label: 'News' },
//     { id: 'tutorials', label: 'Tutorials' }
//   ];

//   useEffect(() => {
//     if (id && id !== 'new') {
//       setIsEditing(true);
//       fetchBlog(id);
//     }
//   }, [id]);

//   const fetchBlog = async (blogId) => {
//     setLoading(true);
//     try {
//       const response = await blogAPI.getBlogById?.(blogId) || await blogAPI.getBlogs().then(res => {
//         const blog = res?.data?.data?.find(b => b._id === blogId);
//         return { data: blog };
//       });
//       const blog = response?.data || response;
//       if (blog) {
//         setFormData({
//           title: blog.title || '',
//           slug: blog.slug || '',
//           excerpt: blog.excerpt || '',
//           content: blog.content || '',
//           category: blog.category || 'poetry',
//           tags: blog.tags || [],
//           featuredImage: blog.featuredImage || '',
//           videoUrl: blog.videoUrl || '',
//           isPublished: blog.isPublished || false,
//           isFeatured: blog.isFeatured || false,
//           seoTitle: blog.seoTitle || '',
//           seoDescription: blog.seoDescription || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       toast.error('Failed to load blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     setUploadingImage(true);
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
//         toast.success('Image uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.content) {
//       toast.error('Please fill title and content');
//       return;
//     }

//     setLoading(true);
//     try {
//       const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
//       const blogData = {
//         ...formData,
//         slug,
//         tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags
//       };

//       if (isEditing) {
//         await blogAPI.updateBlog(id, blogData);
//         toast.success('Blog updated successfully');
//       } else {
//         await blogAPI.createBlog(blogData);
//         toast.success('Blog created successfully');
//       }
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       toast.error('Failed to save blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagsChange = (e) => {
//     setFormData(prev => ({ ...prev, tags: e.target.value }));
//   };

//   if (loading && isEditing) {
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
//           <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
//           <p className="text-gray-500 mt-1">Write and publish engaging blog content</p>
//         </div>
//         <button onClick={() => navigate('/admin/blog')} className="btn-outline flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> Back
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Info */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Basic Information</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title *</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="input-field"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Slug (URL)</label>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
//                 className="input-field"
//                 placeholder="auto-generated-from-title"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Excerpt (Short description) *</label>
//             <textarea
//               rows="3"
//               value={formData.excerpt}
//               onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//               className="input-field"
//               placeholder="Brief summary of the blog post..."
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Content *</label>
//             <textarea
//               rows="12"
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="input-field font-mono"
//               placeholder="Write your blog content here... Supports HTML tags"
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting (e.g., &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;)</p>
//           </div>
//         </div>

//         {/* Media */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Media</h2>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Featured Image</label>
//             <div className="flex gap-3">
//               <input
//                 type="url"
//                 value={formData.featuredImage}
//                 onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
//                 className="input-field flex-1"
//                 placeholder="https://..."
//               />
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0])}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingImage}
//                 />
//                 <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
//                   {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload
//                 </button>
//               </div>
//             </div>
//             {formData.featuredImage && (
//               <img src={formData.featuredImage} alt="Featured" className="mt-3 h-40 w-full object-cover rounded-lg" />
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
//             <input
//               type="url"
//               value={formData.videoUrl}
//               onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
//               className="input-field"
//               placeholder="https://youtube.com/watch?v=..."
//             />
//           </div>
//         </div>

//         {/* Categories & Tags */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Categories & Tags</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Category</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="input-field"
//               >
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>{cat.label}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
//               <input
//                 type="text"
//                 value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//                 onChange={handleTagsChange}
//                 className="input-field"
//                 placeholder="poetry, urdu, literature"
//               />
//             </div>
//           </div>
//         </div>

//         {/* SEO */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">SEO Settings</h2>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Title</label>
//             <input
//               type="text"
//               value={formData.seoTitle}
//               onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
//               className="input-field"
//               placeholder="Leave empty to use blog title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Description</label>
//             <textarea
//               rows="2"
//               value={formData.seoDescription}
//               onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
//               className="input-field"
//               placeholder="Brief description for search engines"
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div className="card p-6">
//           <div className="flex flex-wrap gap-6">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isPublished}
//                 onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Publish immediately</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isFeatured}
//                 onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Feature this post</span>
//             </label>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex-1 flex items-center justify-center gap-2"
//           >
//             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/blog')}
//             className="btn-outline px-6"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogCMSPage;

























// // client/src/pages/admin/BlogCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Upload, X, Loader2,
//   Image, Video, FileText, Tag, Calendar, User,
//   Check, AlertCircle, ChevronLeft, ChevronRight, Save
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';
// import uploadAPI from '../../api/uploadAPI';

// const BlogCMSPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     category: 'poetry',
//     tags: [],
//     featuredImage: 'https://via.placeholder.com/800x400?text=Blog+Image', // Default image
//     videoUrl: '',
//     isPublished: false,
//     isFeatured: false,
//     seoTitle: '',
//     seoDescription: ''
//   });

//   const categories = [
//     { id: 'poetry', label: 'Poetry' },
//     { id: 'authors', label: 'Authors' },
//     { id: 'books', label: 'Books' },
//     { id: 'audio', label: 'Audio' },
//     { id: 'events', label: 'Events' },
//     { id: 'interviews', label: 'Interviews' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'news', label: 'News' },
//     { id: 'tutorials', label: 'Tutorials' }
//   ];

//   useEffect(() => {
//     if (id && id !== 'new') {
//       setIsEditing(true);
//       fetchBlog(id);
//     }
//   }, [id]);

//   const fetchBlog = async (blogId) => {
//     setLoading(true);
//     try {
//       const response = await blogAPI.getBlogById?.(blogId);
//       const blog = response?.data || response;
//       if (blog) {
//         setFormData({
//           title: blog.title || '',
//           slug: blog.slug || '',
//           excerpt: blog.excerpt || '',
//           content: blog.content || '',
//           category: blog.category || 'poetry',
//           tags: blog.tags || [],
//           featuredImage: blog.featuredImage || 'https://via.placeholder.com/800x400?text=Blog+Image',
//           videoUrl: blog.videoUrl || '',
//           isPublished: blog.isPublished || false,
//           isFeatured: blog.isFeatured || false,
//           seoTitle: blog.seoTitle || '',
//           seoDescription: blog.seoDescription || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       toast.error('Failed to load blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     setUploadingImage(true);
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
//         toast.success('Image uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.excerpt) {
//       toast.error('Please enter an excerpt');
//       return;
//     }
//     if (!formData.content) {
//       toast.error('Please enter content');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Generate slug if not provided
//       const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
//       const blogData = {
//         title: formData.title.trim(),
//         slug,
//         excerpt: formData.excerpt.trim(),
//         content: formData.content,
//         category: formData.category,
//         tags: typeof formData.tags === 'string' 
//           ? formData.tags.split(',').map(t => t.trim()).filter(t => t) 
//           : formData.tags,
//         featuredImage: formData.featuredImage || 'https://via.placeholder.com/800x400?text=Blog+Image',
//         videoUrl: formData.videoUrl || '',
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         seoTitle: formData.seoTitle || formData.title,
//         seoDescription: formData.seoDescription || formData.excerpt
//       };

//       if (isEditing) {
//         await blogAPI.updateBlog(id, blogData);
//         toast.success('Blog updated successfully');
//       } else {
//         await blogAPI.createBlog(blogData);
//         toast.success('Blog created successfully');
//       }
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       const errorMsg = error.response?.data?.message || 'Failed to save blog';
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagsChange = (e) => {
//     setFormData(prev => ({ ...prev, tags: e.target.value }));
//   };

//   if (loading && isEditing) {
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
//           <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
//           <p className="text-gray-500 mt-1">Write and publish engaging blog content</p>
//         </div>
//         <button onClick={() => navigate('/admin/blog')} className="btn-outline flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> Back
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Info */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Basic Information</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title *</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="input-field"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Slug (URL)</label>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
//                 className="input-field"
//                 placeholder="auto-generated-from-title"
//               />
//               <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Excerpt * (Short description)</label>
//             <textarea
//               rows="3"
//               value={formData.excerpt}
//               onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//               className="input-field"
//               placeholder="Brief summary of the blog post..."
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Content *</label>
//             <textarea
//               rows="12"
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="input-field font-mono"
//               placeholder="Write your blog content here... Supports HTML tags"
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting (e.g., &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;)</p>
//           </div>
//         </div>

//         {/* Media */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Media</h2>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Featured Image *</label>
//             <div className="flex gap-3">
//               <input
//                 type="url"
//                 value={formData.featuredImage}
//                 onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
//                 className="input-field flex-1"
//                 placeholder="https://..."
//                 required
//               />
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0])}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingImage}
//                 />
//                 <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
//                   {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload
//                 </button>
//               </div>
//             </div>
//             {formData.featuredImage && (
//               <div className="mt-3">
//                 <img src={formData.featuredImage} alt="Featured" className="h-40 w-full object-cover rounded-lg" />
//                 <button 
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
//                   className="text-xs text-red-500 mt-1 hover:underline"
//                 >
//                   Remove image
//                 </button>
//               </div>
//             )}
//             <p className="text-xs text-gray-500 mt-1">Upload a featured image or provide a URL</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
//             <input
//               type="url"
//               value={formData.videoUrl}
//               onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
//               className="input-field"
//               placeholder="https://youtube.com/watch?v=..."
//             />
//           </div>
//         </div>

//         {/* Categories & Tags */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Categories & Tags</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Category</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="input-field"
//               >
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>{cat.label}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
//               <input
//                 type="text"
//                 value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//                 onChange={handleTagsChange}
//                 className="input-field"
//                 placeholder="poetry, urdu, literature"
//               />
//             </div>
//           </div>
//         </div>

//         {/* SEO */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">SEO Settings</h2>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Title</label>
//             <input
//               type="text"
//               value={formData.seoTitle}
//               onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
//               className="input-field"
//               placeholder="Leave empty to use blog title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Description</label>
//             <textarea
//               rows="2"
//               value={formData.seoDescription}
//               onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
//               className="input-field"
//               placeholder="Brief description for search engines"
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div className="card p-6">
//           <div className="flex flex-wrap gap-6">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isPublished}
//                 onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Publish immediately</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isFeatured}
//                 onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Feature this post</span>
//             </label>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex-1 flex items-center justify-center gap-2"
//           >
//             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/blog')}
//             className="btn-outline px-6"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogCMSPage;


























// // client/src/pages/admin/BlogCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Upload, X, Loader2,
//   Image, Video, FileText, Tag, Calendar, User,
//   Check, AlertCircle, ChevronLeft, ChevronRight, Save,
//   GripVertical
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';
// import uploadAPI from '../../api/uploadAPI';

// const BlogCMSPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [uploadingGallery, setUploadingGallery] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     category: 'poetry',
//     tags: [],
//     featuredImage: '',
//     gallery: [],
//     videoUrl: '',
//     isPublished: false,
//     isFeatured: false,
//     seoTitle: '',
//     seoDescription: ''
//   });

//   const categories = [
//     { id: 'poetry', label: 'Poetry' },
//     { id: 'authors', label: 'Authors' },
//     { id: 'books', label: 'Books' },
//     { id: 'audio', label: 'Audio' },
//     { id: 'events', label: 'Events' },
//     { id: 'interviews', label: 'Interviews' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'news', label: 'News' },
//     { id: 'tutorials', label: 'Tutorials' }
//   ];

//   useEffect(() => {
//     if (id && id !== 'new') {
//       setIsEditing(true);
//       fetchBlog(id);
//     }
//   }, [id]);

//   const fetchBlog = async (blogId) => {
//     setLoading(true);
//     try {
//       const response = await blogAPI.getBlogById(blogId);
//       const blog = response?.data || response;
//       if (blog) {
//         setFormData({
//           title: blog.title || '',
//           slug: blog.slug || '',
//           excerpt: blog.excerpt || '',
//           content: blog.content || '',
//           category: blog.category || 'poetry',
//           tags: blog.tags || [],
//           featuredImage: blog.featuredImage || '',
//           gallery: blog.gallery || [],
//           videoUrl: blog.videoUrl || '',
//           isPublished: blog.isPublished || false,
//           isFeatured: blog.isFeatured || false,
//           seoTitle: blog.seoTitle || '',
//           seoDescription: blog.seoDescription || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       toast.error('Failed to load blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     setUploadingImage(true);
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
//         toast.success('Featured image uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleGalleryUpload = async (file) => {
//     if (!file) return;
//     setUploadingGallery(true);
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         setFormData(prev => ({
//           ...prev,
//           gallery: [...prev.gallery, { url: response.data.url, caption: '' }]
//         }));
//         toast.success('Gallery image uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload gallery image');
//     } finally {
//       setUploadingGallery(false);
//     }
//   };

//   const removeGalleryImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.filter((_, i) => i !== index)
//     }));
//     toast.success('Image removed');
//   };

//   const updateGalleryCaption = (index, caption) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.map((img, i) => 
//         i === index ? { ...img, caption } : img
//       )
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.excerpt) {
//       toast.error('Please enter an excerpt');
//       return;
//     }
//     if (!formData.content) {
//       toast.error('Please enter content');
//       return;
//     }

//     setLoading(true);
//     try {
//       const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
//       const blogData = {
//         title: formData.title.trim(),
//         slug,
//         excerpt: formData.excerpt.trim(),
//         content: formData.content,
//         category: formData.category,
//         tags: typeof formData.tags === 'string' 
//           ? formData.tags.split(',').map(t => t.trim()).filter(t => t) 
//           : formData.tags,
//         featuredImage: formData.featuredImage,
//         gallery: formData.gallery,
//         videoUrl: formData.videoUrl || '',
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         seoTitle: formData.seoTitle || formData.title,
//         seoDescription: formData.seoDescription || formData.excerpt
//       };

//       if (isEditing) {
//         await blogAPI.updateBlog(id, blogData);
//         toast.success('Blog updated successfully');
//       } else {
//         await blogAPI.createBlog(blogData);
//         toast.success('Blog created successfully');
//       }
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       const errorMsg = error.response?.data?.message || 'Failed to save blog';
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagsChange = (e) => {
//     setFormData(prev => ({ ...prev, tags: e.target.value }));
//   };

//   if (loading && isEditing) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
//           <p className="text-gray-500 mt-1">Write and publish engaging blog content</p>
//         </div>
//         <button onClick={() => navigate('/admin/blog')} className="btn-outline flex items-center gap-2">
//           <ChevronLeft className="h-4 w-4" /> Back to List
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Info */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Basic Information</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title *</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="input-field"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Slug (URL)</label>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
//                 className="input-field"
//                 placeholder="auto-generated-from-title"
//               />
//               <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Excerpt * (Short description)</label>
//             <textarea
//               rows="3"
//               value={formData.excerpt}
//               onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//               className="input-field"
//               placeholder="Brief summary of the blog post..."
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Content *</label>
//             <textarea
//               rows="12"
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="input-field font-mono"
//               placeholder="Write your blog content here... Supports HTML tags"
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting</p>
//           </div>
//         </div>

//         {/* Media */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Media</h2>
          
//           {/* Featured Image */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Featured Image</label>
//             <div className="flex gap-3">
//               <input
//                 type="url"
//                 value={formData.featuredImage}
//                 onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
//                 className="input-field flex-1"
//                 placeholder="https://..."
//               />
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0])}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingImage}
//                 />
//                 <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
//                   {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload
//                 </button>
//               </div>
//             </div>
//             {formData.featuredImage && (
//               <div className="mt-3">
//                 <img src={formData.featuredImage} alt="Featured" className="h-40 w-full object-cover rounded-lg" />
//                 <button 
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
//                   className="text-xs text-red-500 mt-1 hover:underline"
//                 >
//                   Remove image
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Gallery Images */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Gallery Images (for blog content)</label>
//             <div className="flex gap-3 mb-3">
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleGalleryUpload(e.target.files[0])}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingGallery}
//                 />
//                 <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingGallery}>
//                   {uploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />}
//                   Add Gallery Image
//                 </button>
//               </div>
//             </div>
            
//             {formData.gallery.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {formData.gallery.map((img, idx) => (
//                   <div key={idx} className="relative group border rounded-lg p-2">
//                     <img src={img.url} alt={img.caption || `Gallery ${idx + 1}`} className="h-24 w-full object-cover rounded-lg" />
//                     <input
//                       type="text"
//                       value={img.caption}
//                       onChange={(e) => updateGalleryCaption(idx, e.target.value)}
//                       placeholder="Caption"
//                       className="mt-1 text-xs w-full p-1 border rounded"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeGalleryImage(idx)}
//                       className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <X className="h-3 w-3 text-white" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
//             <input
//               type="url"
//               value={formData.videoUrl}
//               onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
//               className="input-field"
//               placeholder="https://youtube.com/watch?v=..."
//             />
//           </div>
//         </div>

//         {/* Categories & Tags */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">Categories & Tags</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Category</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="input-field"
//               >
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>{cat.label}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
//               <input
//                 type="text"
//                 value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//                 onChange={handleTagsChange}
//                 className="input-field"
//                 placeholder="poetry, urdu, literature"
//               />
//             </div>
//           </div>
//         </div>

//         {/* SEO */}
//         <div className="card p-6 space-y-4">
//           <h2 className="text-lg font-semibold">SEO Settings</h2>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Title</label>
//             <input
//               type="text"
//               value={formData.seoTitle}
//               onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
//               className="input-field"
//               placeholder="Leave empty to use blog title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">SEO Description</label>
//             <textarea
//               rows="2"
//               value={formData.seoDescription}
//               onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
//               className="input-field"
//               placeholder="Brief description for search engines"
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div className="card p-6">
//           <div className="flex flex-wrap gap-6">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isPublished}
//                 onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Publish immediately</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.isFeatured}
//                 onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm">Feature this post</span>
//             </label>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex-1 flex items-center justify-center gap-2"
//           >
//             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/blog')}
//             className="btn-outline px-6"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogCMSPage;























// // client/src/pages/admin/BlogCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Upload, X, Loader2,
//   Image, Video, FileText, Tag, Calendar, User,
//   Check, AlertCircle, ChevronLeft, ChevronRight, Save,
//   GripVertical, Link as LinkIcon, Youtube
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';
// import uploadAPI from '../../api/uploadAPI';

// const BlogCMSPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [uploadingGallery, setUploadingGallery] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('content');

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     category: 'poetry',
//     tags: [],
//     featuredImage: '',
//     gallery: [],
//     videoUrl: '',
//     isPublished: false,
//     isFeatured: false,
//     seoTitle: '',
//     seoDescription: ''
//   });

//   const categories = [
//     { id: 'poetry', label: 'Poetry', icon: '📖' },
//     { id: 'authors', label: 'Authors', icon: '👤' },
//     { id: 'books', label: 'Books', icon: '📚' },
//     { id: 'audio', label: 'Audio', icon: '🎵' },
//     { id: 'events', label: 'Events', icon: '📅' },
//     { id: 'interviews', label: 'Interviews', icon: '🎙️' },
//     { id: 'reviews', label: 'Reviews', icon: '⭐' },
//     { id: 'news', label: 'News', icon: '📰' },
//     { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
//     { id: 'other', label: 'Other', icon: '📁' }
//   ];

//   useEffect(() => {
//     if (id && id !== 'new') {
//       setIsEditing(true);
//       fetchBlog(id);
//     }
//   }, [id]);

//   const fetchBlog = async (blogId) => {
//     setLoading(true);
//     try {
//       const response = await blogAPI.getBlogById(blogId);
//       const blog = response?.data || response;
//       if (blog) {
//         setFormData({
//           title: blog.title || '',
//           slug: blog.slug || '',
//           excerpt: blog.excerpt || '',
//           content: blog.content || '',
//           category: blog.category || 'poetry',
//           tags: blog.tags || [],
//           featuredImage: blog.featuredImage || '',
//           gallery: blog.gallery || [],
//           videoUrl: blog.videoUrl || '',
//           isPublished: blog.isPublished || false,
//           isFeatured: blog.isFeatured || false,
//           seoTitle: blog.seoTitle || '',
//           seoDescription: blog.seoDescription || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       toast.error('Failed to load blog');
//       navigate('/admin/blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (file, type = 'featured') => {
//     if (!file) return;
    
//     if (type === 'featured') {
//       setUploadingImage(true);
//     } else {
//       setUploadingGallery(true);
//     }
    
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         if (type === 'featured') {
//           setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
//           toast.success('Featured image uploaded successfully');
//         } else {
//           setFormData(prev => ({
//             ...prev,
//             gallery: [...prev.gallery, { url: response.data.url, caption: '' }]
//           }));
//           toast.success('Gallery image uploaded successfully');
//         }
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       if (type === 'featured') {
//         setUploadingImage(false);
//       } else {
//         setUploadingGallery(false);
//       }
//     }
//   };

//   const removeGalleryImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.filter((_, i) => i !== index)
//     }));
//     toast.success('Image removed');
//   };

//   const updateGalleryCaption = (index, caption) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.map((img, i) => 
//         i === index ? { ...img, caption } : img
//       )
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.excerpt || !formData.excerpt.trim()) {
//       toast.error('Please enter an excerpt');
//       return;
//     }
//     if (!formData.content || !formData.content.trim()) {
//       toast.error('Please enter content');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Generate slug if not provided
//       let slug = formData.slug;
//       if (!slug) {
//         slug = formData.title.toLowerCase()
//           .replace(/[^a-z0-9]+/g, '-')
//           .replace(/^-|-$/g, '');
//       }
      
//       const blogData = {
//         title: formData.title.trim(),
//         slug,
//         excerpt: formData.excerpt.trim(),
//         content: formData.content,
//         category: formData.category,
//         tags: typeof formData.tags === 'string' 
//           ? formData.tags.split(',').map(t => t.trim()).filter(t => t) 
//           : formData.tags,
//         featuredImage: formData.featuredImage,
//         gallery: formData.gallery,
//         videoUrl: formData.videoUrl || '',
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         seoTitle: formData.seoTitle || formData.title,
//         seoDescription: formData.seoDescription || formData.excerpt
//       };

//       if (isEditing) {
//         await blogAPI.updateBlog(id, blogData);
//         toast.success('Blog updated successfully');
//       } else {
//         await blogAPI.createBlog(blogData);
//         toast.success('Blog created successfully');
//       }
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       const errorMsg = error.response?.data?.message || 'Failed to save blog';
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagsChange = (e) => {
//     setFormData(prev => ({ ...prev, tags: e.target.value }));
//   };

//   // Generate slug preview
//   const getSlugPreview = () => {
//     const slug = formData.slug || (formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'blog-post');
//     return `${window.location.origin}/blog/${slug}`;
//   };

//   if (loading && isEditing) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading blog post...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             {isEditing ? 'Modify your existing blog post' : 'Write and publish engaging blog content'}
//           </p>
//         </div>
//         <button 
//           onClick={() => navigate('/admin/blog')} 
//           className="btn-outline flex items-center gap-2"
//         >
//           <ChevronLeft className="h-4 w-4" /> Back to List
//         </button>
//       </div>

//       {/* Form Tabs */}
//       <div className="flex gap-2 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab('content')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'content' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           📝 Content
//         </button>
//         <button
//           onClick={() => setActiveTab('media')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'media' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           🖼️ Media
//         </button>
//         <button
//           onClick={() => setActiveTab('seo')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'seo' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           🔍 SEO
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Content Tab */}
//         {activeTab === 'content' && (
//           <div className="card p-6 space-y-5">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => {
//                   setFormData({ ...formData, title: e.target.value });
//                   if (!formData.slug) {
//                     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
//                     setFormData(prev => ({ ...prev, slug }));
//                   }
//                 }}
//                 className="input-field"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>

//             {/* Slug Preview */}
//             <div className="bg-gray-50 rounded-lg p-3">
//               <label className="block text-sm font-medium mb-1">Permalink</label>
//               <div className="flex items-center gap-2">
//                 <LinkIcon className="h-4 w-4 text-gray-400" />
//                 <code className="text-sm text-primary-600">{getSlugPreview()}</code>
//               </div>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
//                 className="mt-2 input-field text-sm"
//                 placeholder="custom-slug"
//               />
//               <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
//             </div>

//             {/* Excerpt */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Excerpt <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="3"
//                 value={formData.excerpt}
//                 onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//                 className="input-field"
//                 placeholder="Brief summary of the blog post..."
//                 required
//               />
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>Short description for blog listings</span>
//                 <span className={formData.excerpt.length > 200 ? 'text-red-500' : ''}>
//                   {formData.excerpt.length}/200 characters
//                 </span>
//               </div>
//             </div>

//             {/* Content */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="12"
//                 value={formData.content}
//                 onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                 className="input-field font-mono"
//                 placeholder="Write your blog content here... Supports HTML tags"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 You can use HTML tags for formatting: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;h2&gt;, &lt;h3&gt;
//               </p>
//             </div>

//             {/* Category & Tags */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Category</label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="input-field"
//                 >
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.icon} {cat.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Tags</label>
//                 <input
//                   type="text"
//                   value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//                   onChange={handleTagsChange}
//                   className="input-field"
//                   placeholder="poetry, urdu, literature (comma separated)"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex flex-wrap gap-4 pt-2">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.isPublished}
//                   onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//                   className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                 />
//                 <span className="text-sm">Publish immediately</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.isFeatured}
//                   onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                   className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                 />
//                 <span className="text-sm">Feature this post</span>
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Media Tab */}
//         {activeTab === 'media' && (
//           <div className="card p-6 space-y-5">
//             {/* Featured Image */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Featured Image</label>
//               <div className="flex gap-3">
//                 <input
//                   type="url"
//                   value={formData.featuredImage}
//                   onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
//                   className="input-field flex-1"
//                   placeholder="https://..."
//                 />
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     disabled={uploadingImage}
//                   />
//                   <button 
//                     type="button" 
//                     className="btn-outline flex items-center gap-2" 
//                     disabled={uploadingImage}
//                   >
//                     {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                     Upload
//                   </button>
//                 </div>
//               </div>
//               {formData.featuredImage && (
//                 <div className="mt-3 relative group">
//                   <img 
//                     src={formData.featuredImage} 
//                     alt="Featured" 
//                     className="h-48 w-full object-cover rounded-lg" 
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
//                     className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X className="h-4 w-4 text-white" />
//                   </button>
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Upload a featured image or provide a URL (recommended size: 1200x630px)</p>
//             </div>

//             {/* Gallery Images */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Gallery Images</label>
//               <div className="flex gap-3 mb-3">
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e.target.files[0], 'gallery')}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     disabled={uploadingGallery}
//                   />
//                   <button 
//                     type="button" 
//                     className="btn-outline flex items-center gap-2" 
//                     disabled={uploadingGallery}
//                   >
//                     {uploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />}
//                     Add Gallery Image
//                   </button>
//                 </div>
//               </div>
              
//               {formData.gallery.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   {formData.gallery.map((img, idx) => (
//                     <div key={idx} className="relative group border rounded-lg p-2">
//                       <img 
//                         src={img.url} 
//                         alt={img.caption || `Gallery ${idx + 1}`} 
//                         className="h-32 w-full object-cover rounded-lg" 
//                       />
//                       <input
//                         type="text"
//                         value={img.caption}
//                         onChange={(e) => updateGalleryCaption(idx, e.target.value)}
//                         placeholder="Caption"
//                         className="mt-1 text-xs w-full p-1 border rounded"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeGalleryImage(idx)}
//                         className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X className="h-3 w-3 text-white" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Add multiple images to create a gallery within your blog post</p>
//             </div>

//             {/* YouTube Video */}
//             <div>
//               <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
//               <div className="flex gap-3">
//                 <input
//                   type="url"
//                   value={formData.videoUrl}
//                   onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
//                   className="input-field flex-1"
//                   placeholder="https://youtube.com/watch?v=..."
//                 />
//                 {formData.videoUrl && (
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
//                     className="btn-outline"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>
//               {formData.videoUrl && (
//                 <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100">
//                   <iframe
//                     src={formData.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
//                     className="w-full h-full"
//                     allowFullScreen
//                     title="Blog Video"
//                   />
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Paste a YouTube video URL to embed in your blog post</p>
//             </div>
//           </div>
//         )}

//         {/* SEO Tab */}
//         {activeTab === 'seo' && (
//           <div className="card p-6 space-y-5">
//             <div>
//               <label className="block text-sm font-medium mb-1">SEO Title</label>
//               <input
//                 type="text"
//                 value={formData.seoTitle}
//                 onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
//                 className="input-field"
//                 placeholder="Leave empty to use blog title"
//               />
//               <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">SEO Description</label>
//               <textarea
//                 rows="2"
//                 value={formData.seoDescription}
//                 onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
//                 className="input-field"
//                 placeholder="Brief description for search engines"
//               />
//               <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//               <h3 className="text-sm font-semibold mb-2">Search Preview</h3>
//               <div className="space-y-1">
//                 <p className="text-primary-600 text-lg font-medium">
//                   {formData.seoTitle || formData.title || 'Blog Title'}
//                 </p>
//                 <p className="text-green-700 text-sm">{getSlugPreview()}</p>
//                 <p className="text-gray-500 text-sm">
//                   {formData.seoDescription || formData.excerpt || 'Blog description will appear here...'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
//           >
//             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/blog')}
//             className="btn-outline px-6"
//           >
//             Cancel
//           </button>
//         </div>

//         {/* Preview Link for Published Blogs */}
//         {isEditing && formData.isPublished && formData.slug && (
//           <div className="text-center">
//             <a 
//               href={`/blog/${formData.slug}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-primary-600 hover:underline text-sm"
//             >
//               <Eye className="h-4 w-4" />
//               View Live Blog Post
//             </a>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default BlogCMSPage;























// //working client/src/pages/admin/BlogCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Eye, Upload, X, Loader2,
//   Image, Video, FileText, Tag, Calendar, User,
//   Check, AlertCircle, ChevronLeft, ChevronRight, Save,
//   GripVertical, Link as LinkIcon, Youtube
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import blogAPI from '../../api/blogAPI';
// import uploadAPI from '../../api/uploadAPI';

// const BlogCMSPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [uploadingGallery, setUploadingGallery] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('content');

//   const [formData, setFormData] = useState({
//     title: '',
//     slug: '',
//     excerpt: '',
//     content: '',
//     category: 'poetry',
//     tags: [],
//     featuredImage: '',
//     gallery: [],
//     videoUrl: '',
//     isPublished: false,
//     isFeatured: false,
//     seoTitle: '',
//     seoDescription: ''
//   });

//   const categories = [
//     { id: 'poetry', label: 'Poetry', icon: '📖' },
//     { id: 'authors', label: 'Authors', icon: '👤' },
//     { id: 'books', label: 'Books', icon: '📚' },
//     { id: 'audio', label: 'Audio', icon: '🎵' },
//     { id: 'events', label: 'Events', icon: '📅' },
//     { id: 'interviews', label: 'Interviews', icon: '🎙️' },
//     { id: 'reviews', label: 'Reviews', icon: '⭐' },
//     { id: 'news', label: 'News', icon: '📰' },
//     { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
//     { id: 'other', label: 'Other', icon: '📁' }
//   ];

//   useEffect(() => {
//     if (id && id !== 'new') {
//       setIsEditing(true);
//       fetchBlog(id);
//     }
//   }, [id]);

//   const fetchBlog = async (blogId) => {
//     setLoading(true);
//     try {
//       const response = await blogAPI.getBlogById(blogId);
//       const blog = response?.data || response;
//       if (blog) {
//         setFormData({
//           title: blog.title || '',
//           slug: blog.slug || '',
//           excerpt: blog.excerpt || '',
//           content: blog.content || '',
//           category: blog.category || 'poetry',
//           tags: blog.tags || [],
//           featuredImage: blog.featuredImage || '',
//           gallery: blog.gallery || [],
//           videoUrl: blog.videoUrl || '',
//           isPublished: blog.isPublished || false,
//           isFeatured: blog.isFeatured || false,
//           seoTitle: blog.seoTitle || '',
//           seoDescription: blog.seoDescription || ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       toast.error('Failed to load blog');
//       navigate('/admin/blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (file, type = 'featured') => {
//     if (!file) return;
    
//     if (type === 'featured') {
//       setUploadingImage(true);
//     } else {
//       setUploadingGallery(true);
//     }
    
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         if (type === 'featured') {
//           setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
//           toast.success('Featured image uploaded successfully');
//         } else {
//           setFormData(prev => ({
//             ...prev,
//             gallery: [...prev.gallery, { url: response.data.url, caption: '' }]
//           }));
//           toast.success('Gallery image uploaded successfully');
//         }
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       if (type === 'featured') {
//         setUploadingImage(false);
//       } else {
//         setUploadingGallery(false);
//       }
//     }
//   };

//   const removeGalleryImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.filter((_, i) => i !== index)
//     }));
//     toast.success('Image removed');
//   };

//   const updateGalleryCaption = (index, caption) => {
//     setFormData(prev => ({
//       ...prev,
//       gallery: prev.gallery.map((img, i) => 
//         i === index ? { ...img, caption } : img
//       )
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title || !formData.title.trim()) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.excerpt || !formData.excerpt.trim()) {
//       toast.error('Please enter an excerpt');
//       return;
//     }
//     if (!formData.content || !formData.content.trim()) {
//       toast.error('Please enter content');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Generate slug if not provided
//       let slug = formData.slug;
//       if (!slug) {
//         slug = formData.title.toLowerCase()
//           .replace(/[^a-z0-9]+/g, '-')
//           .replace(/^-|-$/g, '');
//       }
      
//       const blogData = {
//         title: formData.title.trim(),
//         slug,
//         excerpt: formData.excerpt.trim(),
//         content: formData.content,
//         category: formData.category,
//         tags: typeof formData.tags === 'string' 
//           ? formData.tags.split(',').map(t => t.trim()).filter(t => t) 
//           : formData.tags,
//         featuredImage: formData.featuredImage,
//         gallery: formData.gallery,
//         videoUrl: formData.videoUrl || '',
//         isPublished: formData.isPublished,
//         isFeatured: formData.isFeatured,
//         seoTitle: formData.seoTitle || formData.title,
//         seoDescription: formData.seoDescription || formData.excerpt
//       };

//       if (isEditing) {
//         await blogAPI.updateBlog(id, blogData);
//         toast.success('Blog updated successfully');
//       } else {
//         await blogAPI.createBlog(blogData);
//         toast.success('Blog created successfully');
//       }
//       // ✅ IMPORTANT: Redirect to list page after successful save
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error saving blog:', error);
//       const errorMsg = error.response?.data?.message || 'Failed to save blog';
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagsChange = (e) => {
//     setFormData(prev => ({ ...prev, tags: e.target.value }));
//   };

//   // Generate slug preview
//   const getSlugPreview = () => {
//     const slug = formData.slug || (formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'blog-post');
//     return `${window.location.origin}/blog/${slug}`;
//   };

//   if (loading && isEditing) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-500">Loading blog post...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             {isEditing ? 'Modify your existing blog post' : 'Write and publish engaging blog content'}
//           </p>
//         </div>
//         <button 
//           onClick={() => navigate('/admin/blog')} 
//           className="btn-outline flex items-center gap-2"
//         >
//           <ChevronLeft className="h-4 w-4" /> Back to List
//         </button>
//       </div>

//       {/* Form Tabs */}
//       <div className="flex gap-2 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab('content')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'content' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           📝 Content
//         </button>
//         <button
//           onClick={() => setActiveTab('media')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'media' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           🖼️ Media
//         </button>
//         <button
//           onClick={() => setActiveTab('seo')}
//           className={`px-4 py-2 text-sm font-medium transition-colors ${
//             activeTab === 'seo' 
//               ? 'text-primary-600 border-b-2 border-primary-600' 
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           🔍 SEO
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Content Tab */}
//         {activeTab === 'content' && (
//           <div className="card p-6 space-y-5">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => {
//                   setFormData({ ...formData, title: e.target.value });
//                   if (!formData.slug) {
//                     const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
//                     setFormData(prev => ({ ...prev, slug }));
//                   }
//                 }}
//                 className="input-field"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>

//             {/* Slug Preview */}
//             <div className="bg-gray-50 rounded-lg p-3">
//               <label className="block text-sm font-medium mb-1">Permalink</label>
//               <div className="flex items-center gap-2">
//                 <LinkIcon className="h-4 w-4 text-gray-400" />
//                 <code className="text-sm text-primary-600">{getSlugPreview()}</code>
//               </div>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
//                 className="mt-2 input-field text-sm"
//                 placeholder="custom-slug"
//               />
//               <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
//             </div>

//             {/* Excerpt */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Excerpt <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="3"
//                 value={formData.excerpt}
//                 onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
//                 className="input-field"
//                 placeholder="Brief summary of the blog post..."
//                 required
//               />
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>Short description for blog listings</span>
//                 <span className={formData.excerpt.length > 200 ? 'text-red-500' : ''}>
//                   {formData.excerpt.length}/200 characters
//                 </span>
//               </div>
//             </div>

//             {/* Content */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="12"
//                 value={formData.content}
//                 onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                 className="input-field font-mono"
//                 placeholder="Write your blog content here... Supports HTML tags"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 You can use HTML tags for formatting: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;h2&gt;, &lt;h3&gt;
//               </p>
//             </div>

//             {/* Category & Tags */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Category</label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="input-field"
//                 >
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.icon} {cat.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Tags</label>
//                 <input
//                   type="text"
//                   value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//                   onChange={handleTagsChange}
//                   className="input-field"
//                   placeholder="poetry, urdu, literature (comma separated)"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex flex-wrap gap-4 pt-2">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.isPublished}
//                   onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//                   className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                 />
//                 <span className="text-sm">Publish immediately</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.isFeatured}
//                   onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//                   className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                 />
//                 <span className="text-sm">Feature this post</span>
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Media Tab */}
//         {activeTab === 'media' && (
//           <div className="card p-6 space-y-5">
//             {/* Featured Image */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Featured Image</label>
//               <div className="flex gap-3">
//                 <input
//                   type="url"
//                   value={formData.featuredImage}
//                   onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
//                   className="input-field flex-1"
//                   placeholder="https://..."
//                 />
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     disabled={uploadingImage}
//                   />
//                   <button 
//                     type="button" 
//                     className="btn-outline flex items-center gap-2" 
//                     disabled={uploadingImage}
//                   >
//                     {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                     Upload
//                   </button>
//                 </div>
//               </div>
//               {formData.featuredImage && (
//                 <div className="mt-3 relative group">
//                   <img 
//                     src={formData.featuredImage} 
//                     alt="Featured" 
//                     className="h-48 w-full object-cover rounded-lg" 
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
//                     className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X className="h-4 w-4 text-white" />
//                   </button>
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Upload a featured image or provide a URL (recommended size: 1200x630px)</p>
//             </div>

//             {/* Gallery Images */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Gallery Images</label>
//               <div className="flex gap-3 mb-3">
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e.target.files[0], 'gallery')}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     disabled={uploadingGallery}
//                   />
//                   <button 
//                     type="button" 
//                     className="btn-outline flex items-center gap-2" 
//                     disabled={uploadingGallery}
//                   >
//                     {uploadingGallery ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />}
//                     Add Gallery Image
//                   </button>
//                 </div>
//               </div>
              
//               {formData.gallery.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   {formData.gallery.map((img, idx) => (
//                     <div key={idx} className="relative group border rounded-lg p-2">
//                       <img 
//                         src={img.url} 
//                         alt={img.caption || `Gallery ${idx + 1}`} 
//                         className="h-32 w-full object-cover rounded-lg" 
//                       />
//                       <input
//                         type="text"
//                         value={img.caption}
//                         onChange={(e) => updateGalleryCaption(idx, e.target.value)}
//                         placeholder="Caption"
//                         className="mt-1 text-xs w-full p-1 border rounded"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeGalleryImage(idx)}
//                         className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X className="h-3 w-3 text-white" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Add multiple images to create a gallery within your blog post</p>
//             </div>

//             {/* YouTube Video */}
//             <div>
//               <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
//               <div className="flex gap-3">
//                 <input
//                   type="url"
//                   value={formData.videoUrl}
//                   onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
//                   className="input-field flex-1"
//                   placeholder="https://youtube.com/watch?v=..."
//                 />
//                 {formData.videoUrl && (
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
//                     className="btn-outline"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>
//               {formData.videoUrl && (
//                 <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100">
//                   <iframe
//                     src={formData.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
//                     className="w-full h-full"
//                     allowFullScreen
//                     title="Blog Video"
//                   />
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-1">Paste a YouTube video URL to embed in your blog post</p>
//             </div>
//           </div>
//         )}

//         {/* SEO Tab */}
//         {activeTab === 'seo' && (
//           <div className="card p-6 space-y-5">
//             <div>
//               <label className="block text-sm font-medium mb-1">SEO Title</label>
//               <input
//                 type="text"
//                 value={formData.seoTitle}
//                 onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
//                 className="input-field"
//                 placeholder="Leave empty to use blog title"
//               />
//               <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-1">SEO Description</label>
//               <textarea
//                 rows="2"
//                 value={formData.seoDescription}
//                 onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
//                 className="input-field"
//                 placeholder="Brief description for search engines"
//               />
//               <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//               <h3 className="text-sm font-semibold mb-2">Search Preview</h3>
//               <div className="space-y-1">
//                 <p className="text-primary-600 text-lg font-medium">
//                   {formData.seoTitle || formData.title || 'Blog Title'}
//                 </p>
//                 <p className="text-green-700 text-sm">{getSlugPreview()}</p>
//                 <p className="text-gray-500 text-sm">
//                   {formData.seoDescription || formData.excerpt || 'Blog description will appear here...'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
//           >
//             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Publish Blog')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/blog')}
//             className="btn-outline px-6"
//           >
//             Cancel
//           </button>
//         </div>

//         {/* Preview Link for Published Blogs */}
//         {isEditing && formData.isPublished && formData.slug && (
//           <div className="text-center">
//             <a 
//               href={`/blog/${formData.slug}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-primary-600 hover:underline text-sm"
//             >
//               <Eye className="h-4 w-4" />
//               View Live Blog Post
//             </a>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default BlogCMSPage;