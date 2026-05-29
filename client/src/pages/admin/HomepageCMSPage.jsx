// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Layout, Image, Type, ArrowUp, ArrowDown, Trash2, Plus,
//   Eye, Save, RefreshCw
// } from 'lucide-react'

// const sections = [
//   { id: 'hero', name: 'Hero Banner', type: 'banner', enabled: true, order: 1 },
//   { id: 'trending', name: 'Trending Poems', type: 'content', enabled: true, order: 2 },
//   { id: 'authors', name: 'Featured Authors', type: 'content', enabled: true, order: 3 },
//   { id: 'books', name: 'Popular Books', type: 'content', enabled: true, order: 4 },
//   { id: 'videos', name: 'Video Highlights', type: 'content', enabled: true, order: 5 },
//   { id: 'quote', name: 'Daily Quote', type: 'widget', enabled: true, order: 6 },
//   { id: 'premium', name: 'Premium CTA', type: 'cta', enabled: true, order: 7 },
// ]

// const banners = [
//   { id: 1, title: 'Discover the Beauty of Words', subtitle: 'Explore Urdu poetry, Hindi literature...', image: 'banner1.jpg', active: true },
//   { id: 2, title: 'Classical Ghazals & Modern Poetry', subtitle: 'From Mir and Ghalib to contemporary...', image: 'banner2.jpg', active: true },
//   { id: 3, title: 'Rare Books & Literary Journals', subtitle: 'Access centuries of literary heritage...', image: 'banner3.jpg', active: false },
// ]

// const HomepageCMSPage = () => {
//   const [homepageSections, setHomepageSections] = useState(sections)
//   const [activeTab, setActiveTab] = useState('layout')

//   const moveSection = (index, direction) => {
//     const newSections = [...homepageSections]
//     const targetIndex = direction === 'up' ? index - 1 : index + 1
//     if (targetIndex >= 0 && targetIndex < newSections.length) {
//       [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]
//       setHomepageSections(newSections)
//     }
//   }

//   const toggleSection = (id) => {
//     setHomepageSections(homepageSections.map(s =>
//       s.id === id ? { ...s, enabled: !s.enabled } : s
//     ))
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Homepage CMS</h1>
//           <p className="text-gray-500">Manage homepage sections, banners, and layout</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Eye className="h-5 w-5" />
//             <span>Preview</span>
//           </button>
//           <button className="btn-primary inline-flex items-center space-x-2">
//             <Save className="h-5 w-5" />
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-1 border-b border-gray-200">
//         {[
//           { id: 'layout', label: 'Layout', icon: Layout },
//           { id: 'banners', label: 'Banners', icon: Image },
//           { id: 'content', label: 'Content', icon: Type },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === tab.id
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             <tab.icon className="h-4 w-4" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Layout Tab */}
//       {activeTab === 'layout' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
//           <h3 className="font-semibold text-gray-900 mb-4">Section Order</h3>
//           <div className="space-y-2">
//             {homepageSections.map((section, index) => (
//               <div
//                 key={section.id}
//                 className={`flex items-center justify-between p-4 rounded-lg border ${
//                   section.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-400 w-6">{index + 1}</span>
//                   <div>
//                     <p className={`font-medium ${section.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
//                       {section.name}
//                     </p>
//                     <p className="text-xs text-gray-500">{section.type}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => moveSection(index, 'up')}
//                     disabled={index === 0}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowUp className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => moveSection(index, 'down')}
//                     disabled={index === homepageSections.length - 1}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowDown className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => toggleSection(section.id)}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                       section.enabled
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-gray-100 text-gray-500'
//                     }`}
//                   >
//                     {section.enabled ? 'Enabled' : 'Disabled'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Banners Tab */}
//       {activeTab === 'banners' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//           {banners.map((banner) => (
//             <div key={banner.id} className="card p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{banner.title}</h3>
//                   <p className="text-sm text-gray-500">{banner.subtitle}</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                   }`}>
//                     {banner.active ? 'Active' : 'Inactive'}
//                   </span>
//                   <button className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600">
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//               <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <Image className="h-8 w-8 text-gray-400" />
//                 <span className="ml-2 text-gray-400">{banner.image}</span>
//               </div>
//             </div>
//           ))}
//           <button className="w-full card p-6 border-dashed border-2 border-gray-300 hover:border-primary-400 transition-colors flex items-center justify-center space-x-2 text-gray-500 hover:text-primary-600">
//             <Plus className="h-5 w-5" />
//             <span>Add Banner</span>
//           </button>
//         </motion.div>
//       )}

//       {/* Content Tab */}
//       {activeTab === 'content' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Featured Content</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Poem</label>
//                 <select className="input-field">
//                   <option>Hazaaron Khwahishein Aisi - Mirza Ghalib</option>
//                   <option>Gulon Mein Rang Bhare - Faiz Ahmed Faiz</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Author</label>
//                 <select className="input-field">
//                   <option>Mirza Ghalib</option>
//                   <option>Faiz Ahmed Faiz</option>
//                   <option>Allama Iqbal</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Book</label>
//                 <select className="input-field">
//                   <option>Diwan-e-Ghalib</option>
//                   <option>Bang-e-Dara</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Daily Quote Settings</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quote Source</label>
//                 <select className="input-field">
//                   <option>Auto-generate from popular poems</option>
//                   <option>Manual selection</option>
//                   <option>Random from collection</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
//                 <select className="input-field">
//                   <option>Daily</option>
//                   <option>Weekly</option>
//                   <option>Monthly</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   )
// }

// export default HomepageCMSPage














// // client/src/pages/admin/HomepageCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Layout, Image, Type, ArrowUp, ArrowDown, Trash2, Plus,
//   Eye, Save, RefreshCw, X, Loader2, AlertCircle, Upload,
//   Check, Copy, Edit, Heart, BookOpen, Users, Video, Quote
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import homepageAPI from '../../api/homepageAPI';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import bookAPI from '../../api/bookAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const HomepageCMSPage = () => {
//   const [homepageSections, setHomepageSections] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('layout');
//   const [showAddBannerModal, setShowAddBannerModal] = useState(false);
//   const [editingBanner, setEditingBanner] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [featuredContent, setFeaturedContent] = useState({
//     featuredPoem: '',
//     featuredAuthor: '',
//     featuredBook: '',
//     featuredAudio: '',
//     featuredVideo: ''
//   });
//   const [quoteSettings, setQuoteSettings] = useState({
//     source: 'auto',
//     frequency: 'daily'
//   });

//   // Available content for dropdowns
//   const [availablePoems, setAvailablePoems] = useState([]);
//   const [availableAuthors, setAvailableAuthors] = useState([]);
//   const [availableBooks, setAvailableBooks] = useState([]);
//   const [availableAudio, setAvailableAudio] = useState([]);
//   const [availableVideos, setAvailableVideos] = useState([]);

//   // Banner form state
//   const [bannerForm, setBannerForm] = useState({
//     title: '',
//     subtitle: '',
//     ctaText: 'Explore Now',
//     ctaUrl: '/explore',
//     image: '',
//     order: 0,
//     isActive: true
//   });

//   // Fetch homepage configuration
//   const fetchHomepageConfig = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await homepageAPI.getConfig();
//       const configData = response?.data?.data || response?.data || response || [];
      
//       if (Array.isArray(configData)) {
//         // Sort sections by order
//         const sortedSections = [...configData].sort((a, b) => a.order - b.order);
//         setHomepageSections(sortedSections);
        
//         // Extract banners from hero section
//         const heroSection = sortedSections.find(s => s.section === 'hero');
//         if (heroSection && heroSection.banners) {
//           setBanners(heroSection.banners);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching homepage config:', error);
//       toast.error('Failed to load homepage configuration');
//       // Set default sections if API fails
//       setHomepageSections([
//         { section: 'hero', title: 'Hero Banner', type: 'banner', isActive: true, order: 1, banners: [] },
//         { section: 'trending', title: 'Trending Poems', type: 'content', isActive: true, order: 2 },
//         { section: 'featured-authors', title: 'Featured Authors', type: 'content', isActive: true, order: 3 },
//         { section: 'featured-books', title: 'Popular Books', type: 'content', isActive: true, order: 4 },
//         { section: 'featured-audio', title: 'Audio Highlights', type: 'content', isActive: true, order: 5 },
//         { section: 'featured-videos', title: 'Video Highlights', type: 'content', isActive: true, order: 6 },
//         { section: 'daily-quote', title: 'Daily Quote', type: 'widget', isActive: true, order: 7 },
//         { section: 'premium-cta', title: 'Premium CTA', type: 'cta', isActive: true, order: 8 },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch featured content
//   const fetchFeaturedContent = useCallback(async () => {
//     try {
//       const [poemsRes, authorsRes, booksRes] = await Promise.all([
//         poemAPI.getFeaturedPoems(),
//         authorAPI.getFeaturedAuthors(),
//         bookAPI.getFeaturedBooks()
//       ]);
      
//       setAvailablePoems(poemsRes?.data || poemsRes || []);
//       setAvailableAuthors(authorsRes?.data || authorsRes || []);
//       setAvailableBooks(booksRes?.data || booksRes || []);
//     } catch (error) {
//       console.error('Error fetching featured content:', error);
//     }
//   }, []);

//   // Fetch available content for dropdowns
//   const fetchAvailableContent = useCallback(async () => {
//     try {
//       const [poemsRes, authorsRes, booksRes] = await Promise.all([
//         poemAPI.getPoems({ limit: 50 }),
//         authorAPI.getAuthors({ limit: 50 }),
//         bookAPI.getBooks({ limit: 50 })
//       ]);
      
//       setAvailablePoems(poemsRes?.data?.data || poemsRes?.data || poemsRes || []);
//       setAvailableAuthors(authorsRes?.data?.data || authorsRes?.data || authorsRes || []);
//       setAvailableBooks(booksRes?.data?.data || booksRes?.data || booksRes || []);
//     } catch (error) {
//       console.error('Error fetching available content:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHomepageConfig();
//     fetchFeaturedContent();
//     fetchAvailableContent();
//   }, [fetchHomepageConfig, fetchFeaturedContent, fetchAvailableContent]);

//   // Move section up/down
//   const moveSection = async (index, direction) => {
//     const newSections = [...homepageSections];
//     const targetIndex = direction === 'up' ? index - 1 : index + 1;
//     if (targetIndex >= 0 && targetIndex < newSections.length) {
//       [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
//       // Update order values
//       const updatedSections = newSections.map((section, idx) => ({
//         ...section,
//         order: idx + 1
//       }));
//       setHomepageSections(updatedSections);
//     }
//   };

//   // Toggle section visibility
//   const toggleSection = async (sectionId) => {
//     const section = homepageSections.find(s => s.section === sectionId);
//     if (!section) return;
    
//     setHomepageSections(prev => prev.map(s =>
//       s.section === sectionId ? { ...s, isActive: !s.isActive } : s
//     ));
    
//     try {
//       await homepageAPI.updateSection(sectionId, { isActive: !section.isActive });
//       toast.success(`${section.title} ${!section.isActive ? 'enabled' : 'disabled'}`);
//     } catch (error) {
//       toast.error('Failed to update section');
//       // Revert on error
//       setHomepageSections(prev => prev.map(s =>
//         s.section === sectionId ? { ...s, isActive: section.isActive } : s
//       ));
//     }
//   };

//   // Save all sections order
//   const saveSectionsOrder = async () => {
//     setSaving(true);
//     try {
//       const sectionsToSave = homepageSections.map(s => ({
//         id: s.section,
//         order: s.order
//       }));
//       await homepageAPI.reorderSections(sectionsToSave);
//       toast.success('Section order saved successfully');
//     } catch (error) {
//       toast.error('Failed to save section order');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle banner image upload
//   const handleBannerImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     setUploadingImage(true);
//     try {
//       const response = await uploadAPI.uploadImage(file);
//       if (response.data?.url) {
//         setBannerForm(prev => ({ ...prev, image: response.data.url }));
//         toast.success('Image uploaded successfully');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // Add or update banner
//   const handleSaveBanner = async () => {
//     if (!bannerForm.title || !bannerForm.image) {
//       toast.error('Please fill in title and image');
//       return;
//     }

//     setSaving(true);
//     try {
//       if (editingBanner) {
//         // Update existing banner
//         const updatedBanners = banners.map(b => 
//           b.id === editingBanner.id ? { ...bannerForm, id: b.id } : b
//         );
//         await homepageAPI.updateBanners(updatedBanners);
//         setBanners(updatedBanners);
//         toast.success('Banner updated successfully');
//       } else {
//         // Add new banner
//         const newBanner = {
//           ...bannerForm,
//           id: Date.now(),
//           order: banners.length
//         };
//         const updatedBanners = [...banners, newBanner];
//         await homepageAPI.addBanner(newBanner);
//         setBanners(updatedBanners);
//         toast.success('Banner added successfully');
//       }
//       resetBannerModal();
//       fetchHomepageConfig(); // Refresh config
//     } catch (error) {
//       toast.error('Failed to save banner');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete banner
//   const handleDeleteBanner = async (bannerId) => {
//     if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
//     try {
//       await homepageAPI.removeBanner(bannerId);
//       setBanners(banners.filter(b => b.id !== bannerId));
//       toast.success('Banner deleted successfully');
//       fetchHomepageConfig();
//     } catch (error) {
//       toast.error('Failed to delete banner');
//     }
//   };

//   // Edit banner
//   const handleEditBanner = (banner) => {
//     setEditingBanner(banner);
//     setBannerForm({
//       title: banner.title,
//       subtitle: banner.subtitle || '',
//       ctaText: banner.ctaText || 'Explore Now',
//       ctaUrl: banner.ctaUrl || '/explore',
//       image: banner.image,
//       order: banner.order || 0,
//       isActive: banner.isActive !== false
//     });
//     setShowAddBannerModal(true);
//   };

//   // Reset banner modal
//   const resetBannerModal = () => {
//     setShowAddBannerModal(false);
//     setEditingBanner(null);
//     setBannerForm({
//       title: '',
//       subtitle: '',
//       ctaText: 'Explore Now',
//       ctaUrl: '/explore',
//       image: '',
//       order: 0,
//       isActive: true
//     });
//   };

//   // Save featured content settings
//   const saveFeaturedContent = async () => {
//     setSaving(true);
//     try {
//       await homepageAPI.updateFeaturedContent(featuredContent);
//       toast.success('Featured content updated successfully');
//     } catch (error) {
//       toast.error('Failed to update featured content');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Save quote settings
//   const saveQuoteSettings = async () => {
//     setSaving(true);
//     try {
//       await homepageAPI.updateQuoteSettings(quoteSettings);
//       toast.success('Quote settings updated successfully');
//     } catch (error) {
//       toast.error('Failed to update quote settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Get icon for section type
//   const getSectionIcon = (type) => {
//     switch (type) {
//       case 'banner': return <Image className="h-4 w-4" />;
//       case 'content': return <Layout className="h-4 w-4" />;
//       case 'widget': return <Quote className="h-4 w-4" />;
//       case 'cta': return <Heart className="h-4 w-4" />;
//       default: return <Layout className="h-4 w-4" />;
//     }
//   };

//   if (loading && homepageSections.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Homepage CMS</h1>
//           <p className="text-gray-500">Manage homepage sections, banners, and layout</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Link to="/" target="_blank" className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Eye className="h-5 w-5" />
//             <span>Preview</span>
//           </Link>
//           <button 
//             onClick={saveSectionsOrder}
//             disabled={saving}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{homepageSections.length}</p>
//           <p className="text-sm text-gray-500">Active Sections</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {homepageSections.filter(s => s.isActive).length}
//           </p>
//           <p className="text-sm text-gray-500">Enabled</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {homepageSections.filter(s => !s.isActive).length}
//           </p>
//           <p className="text-sm text-gray-500">Disabled</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{banners.length}</p>
//           <p className="text-sm text-gray-500">Active Banners</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-1 border-b border-gray-200">
//         {[
//           { id: 'layout', label: 'Layout', icon: Layout },
//           { id: 'banners', label: 'Banners', icon: Image },
//           { id: 'content', label: 'Content', icon: Type },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === tab.id
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             <tab.icon className="h-4 w-4" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Layout Tab */}
//       {activeTab === 'layout' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-gray-900">Section Order & Visibility</h3>
//             <button 
//               onClick={saveSectionsOrder}
//               disabled={saving}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//             >
//               <RefreshCw className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
//               <span>Save Order</span>
//             </button>
//           </div>
//           <div className="space-y-2">
//             {homepageSections.map((section, index) => (
//               <div
//                 key={section.section}
//                 className={`flex items-center justify-between p-4 rounded-lg border ${
//                   section.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-400 w-6">{section.order}</span>
//                   <div className="flex items-center space-x-2">
//                     {getSectionIcon(section.type)}
//                     <div>
//                       <p className={`font-medium ${section.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
//                         {section.title}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize">{section.type}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => moveSection(index, 'up')}
//                     disabled={index === 0}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowUp className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => moveSection(index, 'down')}
//                     disabled={index === homepageSections.length - 1}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowDown className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => toggleSection(section.section)}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                       section.isActive
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-gray-100 text-gray-500'
//                     }`}
//                   >
//                     {section.isActive ? 'Enabled' : 'Disabled'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Banners Tab */}
//       {activeTab === 'banners' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//           {banners.map((banner) => (
//             <div key={banner.id} className="card p-6">
//               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="font-semibold text-gray-900">{banner.title}</h3>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       {banner.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500">{banner.subtitle}</p>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                     <span>CTA: {banner.ctaText}</span>
//                     <span>URL: {banner.ctaUrl}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {banner.image && (
//                     <img src={banner.image} alt={banner.title} className="h-16 w-24 object-cover rounded" />
//                   )}
//                   <button
//                     onClick={() => handleEditBanner(banner)}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteBanner(banner.id)}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             onClick={() => setShowAddBannerModal(true)}
//             className="w-full card p-6 border-dashed border-2 border-gray-300 hover:border-primary-400 transition-colors flex items-center justify-center space-x-2 text-gray-500 hover:text-primary-600"
//           >
//             <Plus className="h-5 w-5" />
//             <span>Add Banner</span>
//           </button>
//         </motion.div>
//       )}

//       {/* Content Tab */}
//       {activeTab === 'content' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           {/* Featured Content */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Star className="h-5 w-5 text-primary-600" />
//               Featured Content
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Poem</label>
//                 <select
//                   value={featuredContent.featuredPoem}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredPoem: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select a poem</option>
//                   {availablePoems.map(poem => (
//                     <option key={poem._id} value={poem._id}>{poem.title}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Author</label>
//                 <select
//                   value={featuredContent.featuredAuthor}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredAuthor: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select an author</option>
//                   {availableAuthors.map(author => (
//                     <option key={author._id} value={author._id}>{author.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Book</label>
//                 <select
//                   value={featuredContent.featuredBook}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredBook: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select a book</option>
//                   {availableBooks.map(book => (
//                     <option key={book._id} value={book._id}>{book.title}</option>
//                   ))}
//                 </select>
//               </div>
//               <button
//                 onClick={saveFeaturedContent}
//                 disabled={saving}
//                 className="btn-primary w-full md:w-auto"
//               >
//                 {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
//                 Save Featured Content
//               </button>
//             </div>
//           </div>

//           {/* Daily Quote Settings */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Quote className="h-5 w-5 text-primary-600" />
//               Daily Quote Settings
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quote Source</label>
//                 <select
//                   value={quoteSettings.source}
//                   onChange={(e) => setQuoteSettings(prev => ({ ...prev, source: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="auto">Auto-generate from popular poems</option>
//                   <option value="manual">Manual selection</option>
//                   <option value="random">Random from collection</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
//                 <select
//                   value={quoteSettings.frequency}
//                   onChange={(e) => setQuoteSettings(prev => ({ ...prev, frequency: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//               </div>
//               <button
//                 onClick={saveQuoteSettings}
//                 disabled={saving}
//                 className="btn-primary w-full md:w-auto"
//               >
//                 {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
//                 Save Quote Settings
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Add/Edit Banner Modal */}
//       <AnimatePresence>
//         {showAddBannerModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBanner ? 'Edit Banner' : 'Add New Banner'}
//                 </h2>
//                 <button onClick={resetBannerModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={bannerForm.title}
//                     onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
//                     className="input-field"
//                     placeholder="Enter banner title"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
//                   <input
//                     type="text"
//                     value={bannerForm.subtitle}
//                     onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
//                     className="input-field"
//                     placeholder="Enter banner subtitle"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
//                     <input
//                       type="text"
//                       value={bannerForm.ctaText}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, ctaText: e.target.value }))}
//                       className="input-field"
//                       placeholder="e.g., Explore Now"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
//                     <input
//                       type="text"
//                       value={bannerForm.ctaUrl}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, ctaUrl: e.target.value }))}
//                       className="input-field"
//                       placeholder="/explore"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Banner Image <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-3">
//                     <input
//                       type="url"
//                       value={bannerForm.image}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
//                       className="input-field flex-1"
//                       placeholder="https://..."
//                     />
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBannerImageUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingImage}
//                       />
//                       <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
//                         {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {bannerForm.image && (
//                     <div className="mt-3">
//                       <img src={bannerForm.image} alt="Banner preview" className="h-32 w-full object-cover rounded-lg" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={bannerForm.isActive}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Active</span>
//                   </label>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={handleSaveBanner}
//                     disabled={saving}
//                     className="btn-primary flex-1"
//                   >
//                     {saving ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBanner ? 'Update Banner' : 'Add Banner')}
//                   </button>
//                   <button onClick={resetBannerModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HomepageCMSPage;













// // client/src/pages/admin/HomepageCMSPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Layout, Image, Type, ArrowUp, ArrowDown, Trash2, Plus,
//   Eye, Save, RefreshCw, X, Loader2, AlertCircle, Upload,
//   Check, Copy, Edit, Heart, BookOpen, Users, Video, Quote,
//   GripVertical, Star, Settings, ImagePlus, Move
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import homepageAPI from '../../api/homepageAPI';
// import poemAPI from '../../api/poemAPI';
// import authorAPI from '../../api/authorAPI';
// import bookAPI from '../../api/bookAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const HomepageCMSPage = () => {
//   const [homepageSections, setHomepageSections] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [activeTab, setActiveTab] = useState('layout');
//   const [showAddBannerModal, setShowAddBannerModal] = useState(false);
//   const [editingBanner, setEditingBanner] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadingMultiple, setUploadingMultiple] = useState(false);
//   const [featuredContent, setFeaturedContent] = useState({
//     featuredPoem: '',
//     featuredAuthor: '',
//     featuredBook: '',
//     featuredAudio: '',
//     featuredVideo: ''
//   });
//   const [quoteSettings, setQuoteSettings] = useState({
//     source: 'auto',
//     frequency: 'daily'
//   });

//   // Available content for dropdowns
//   const [availablePoems, setAvailablePoems] = useState([]);
//   const [availableAuthors, setAvailableAuthors] = useState([]);
//   const [availableBooks, setAvailableBooks] = useState([]);

//   // Banner form state
//   const [bannerForm, setBannerForm] = useState({
//     title: '',
//     subtitle: '',
//     ctaText: 'Explore Now',
//     ctaUrl: '/explore',
//     image: '',
//     order: 0,
//     isActive: true
//   });

//   // Fetch homepage configuration
//   const fetchHomepageConfig = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await homepageAPI.getConfig();
//       const configData = response?.data?.data || response?.data || response || [];
      
//       if (Array.isArray(configData)) {
//         const sortedSections = [...configData].sort((a, b) => a.order - b.order);
//         setHomepageSections(sortedSections);
        
//         const heroSection = sortedSections.find(s => s.section === 'hero');
//         if (heroSection && heroSection.banners) {
//           setBanners(heroSection.banners);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching homepage config:', error);
//       toast.error('Failed to load homepage configuration');
//       setHomepageSections([
//         { section: 'hero', title: 'Hero Banner', type: 'banner', isActive: true, order: 1, banners: [] },
//         { section: 'trending', title: 'Trending Poems', type: 'content', isActive: true, order: 2 },
//         { section: 'featured-authors', title: 'Featured Authors', type: 'content', isActive: true, order: 3 },
//         { section: 'featured-books', title: 'Popular Books', type: 'content', isActive: true, order: 4 },
//         { section: 'featured-audio', title: 'Audio Highlights', type: 'content', isActive: true, order: 5 },
//         { section: 'featured-videos', title: 'Video Highlights', type: 'content', isActive: true, order: 6 },
//         { section: 'daily-quote', title: 'Daily Quote', type: 'widget', isActive: true, order: 7 },
//         { section: 'premium-cta', title: 'Premium CTA', type: 'cta', isActive: true, order: 8 },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch featured content
//   const fetchFeaturedContent = useCallback(async () => {
//     try {
//       const [poemsRes, authorsRes, booksRes] = await Promise.all([
//         poemAPI.getFeaturedPoems(),
//         authorAPI.getFeaturedAuthors(),
//         bookAPI.getFeaturedBooks()
//       ]);
      
//       setAvailablePoems(poemsRes?.data || poemsRes || []);
//       setAvailableAuthors(authorsRes?.data || authorsRes || []);
//       setAvailableBooks(booksRes?.data || booksRes || []);
//     } catch (error) {
//       console.error('Error fetching featured content:', error);
//     }
//   }, []);

//   // Fetch available content for dropdowns
//   const fetchAvailableContent = useCallback(async () => {
//     try {
//       const [poemsRes, authorsRes, booksRes] = await Promise.all([
//         poemAPI.getPoems({ limit: 50 }),
//         authorAPI.getAuthors({ limit: 50 }),
//         bookAPI.getBooks({ limit: 50 })
//       ]);
      
//       setAvailablePoems(poemsRes?.data?.data || poemsRes?.data || poemsRes || []);
//       setAvailableAuthors(authorsRes?.data?.data || authorsRes?.data || authorsRes || []);
//       setAvailableBooks(booksRes?.data?.data || booksRes?.data || booksRes || []);
//     } catch (error) {
//       console.error('Error fetching available content:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHomepageConfig();
//     fetchFeaturedContent();
//     fetchAvailableContent();
//   }, [fetchHomepageConfig, fetchFeaturedContent, fetchAvailableContent]);

//   // Move section up/down
//   const moveSection = async (index, direction) => {
//     const newSections = [...homepageSections];
//     const targetIndex = direction === 'up' ? index - 1 : index + 1;
//     if (targetIndex >= 0 && targetIndex < newSections.length) {
//       [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
//       const updatedSections = newSections.map((section, idx) => ({
//         ...section,
//         order: idx + 1
//       }));
//       setHomepageSections(updatedSections);
//     }
//   };

//   // Toggle section visibility
//   const toggleSection = async (sectionId) => {
//     const section = homepageSections.find(s => s.section === sectionId);
//     if (!section) return;
    
//     setHomepageSections(prev => prev.map(s =>
//       s.section === sectionId ? { ...s, isActive: !s.isActive } : s
//     ));
    
//     try {
//       await homepageAPI.updateSection(sectionId, { isActive: !section.isActive });
//       toast.success(`${section.title} ${!section.isActive ? 'enabled' : 'disabled'}`);
//     } catch (error) {
//       toast.error('Failed to update section');
//       setHomepageSections(prev => prev.map(s =>
//         s.section === sectionId ? { ...s, isActive: section.isActive } : s
//       ));
//     }
//   };

//   // Save all sections order
//   const saveSectionsOrder = async () => {
//     setSaving(true);
//     try {
//       const sectionsToSave = homepageSections.map(s => ({
//         id: s.section,
//         order: s.order
//       }));
//       await homepageAPI.reorderSections(sectionsToSave);
//       toast.success('Section order saved successfully');
//     } catch (error) {
//       toast.error('Failed to save section order');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle single banner image upload
//   const handleBannerImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     setUploadingImage(true);
//     setUploadProgress(0);
    
//     const interval = setInterval(() => {
//       setUploadProgress(prev => Math.min(prev + 10, 90));
//     }, 500);

//     try {
//       const response = await uploadAPI.uploadImage(file);
//       clearInterval(interval);
//       setUploadProgress(100);
      
//       if (response.data?.url) {
//         setBannerForm(prev => ({ ...prev, image: response.data.url }));
//         toast.success('Image uploaded successfully');
//       }
//     } catch (error) {
//       clearInterval(interval);
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setUploadingImage(false);
//       setTimeout(() => setUploadProgress(0), 1000);
//     }
//   };

//   // Handle multiple banner images upload
//   const handleMultipleBannerUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     setUploadingMultiple(true);
//     const uploadedBanners = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (!file.type.startsWith('image/')) {
//         toast.error(`Skipping ${file.name}: not an image`);
//         continue;
//       }

//       try {
//         const response = await uploadAPI.uploadImage(file);
//         if (response.data?.url) {
//           uploadedBanners.push({
//             title: file.name.split('.')[0],
//             subtitle: '',
//             ctaText: 'Explore Now',
//             ctaUrl: '/explore',
//             image: response.data.url,
//             order: banners.length + uploadedBanners.length,
//             isActive: true
//           });
//           toast.success(`Uploaded: ${file.name}`);
//         }
//       } catch (error) {
//         console.error(`Failed to upload ${file.name}:`, error);
//         toast.error(`Failed to upload: ${file.name}`);
//       }
//     }

//     if (uploadedBanners.length > 0) {
//       const updatedBanners = [...banners, ...uploadedBanners];
//       setBanners(updatedBanners);
      
//       // Save to API
//       try {
//         await homepageAPI.updateBanners(updatedBanners);
//         toast.success(`${uploadedBanners.length} banners added successfully`);
//       } catch (error) {
//         toast.error('Failed to save banners to database');
//       }
//     }
    
//     setUploadingMultiple(false);
//     e.target.value = '';
//   };

//   // Add or update single banner
//   const handleSaveBanner = async () => {
//     if (!bannerForm.title || !bannerForm.image) {
//       toast.error('Please fill in title and image');
//       return;
//     }

//     setSaving(true);
//     try {
//       let updatedBanners;
//       if (editingBanner) {
//         updatedBanners = banners.map(b => 
//           b.id === editingBanner.id ? { ...bannerForm, id: b.id } : b
//         );
//       } else {
//         const newBanner = {
//           ...bannerForm,
//           id: Date.now(),
//           order: banners.length
//         };
//         updatedBanners = [...banners, newBanner];
//       }
      
//       await homepageAPI.updateBanners(updatedBanners);
//       setBanners(updatedBanners);
//       toast.success(editingBanner ? 'Banner updated successfully' : 'Banner added successfully');
//       resetBannerModal();
//       fetchHomepageConfig();
//     } catch (error) {
//       toast.error('Failed to save banner');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete banner
//   const handleDeleteBanner = async (bannerId) => {
//     if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
//     try {
//       const updatedBanners = banners.filter(b => b.id !== bannerId);
//       await homepageAPI.removeBanner(bannerId);
//       setBanners(updatedBanners);
//       toast.success('Banner deleted successfully');
//       fetchHomepageConfig();
//     } catch (error) {
//       toast.error('Failed to delete banner');
//     }
//   };

//   // Edit banner
//   const handleEditBanner = (banner) => {
//     setEditingBanner(banner);
//     setBannerForm({
//       title: banner.title,
//       subtitle: banner.subtitle || '',
//       ctaText: banner.ctaText || 'Explore Now',
//       ctaUrl: banner.ctaUrl || '/explore',
//       image: banner.image,
//       order: banner.order || 0,
//       isActive: banner.isActive !== false
//     });
//     setShowAddBannerModal(true);
//   };

//   // Reset banner modal
//   const resetBannerModal = () => {
//     setShowAddBannerModal(false);
//     setEditingBanner(null);
//     setBannerForm({
//       title: '',
//       subtitle: '',
//       ctaText: 'Explore Now',
//       ctaUrl: '/explore',
//       image: '',
//       order: 0,
//       isActive: true
//     });
//     setSelectedFiles([]);
//   };

//   // Move banner order
//   const moveBanner = async (index, direction) => {
//     const newBanners = [...banners];
//     const targetIndex = direction === 'up' ? index - 1 : index + 1;
//     if (targetIndex >= 0 && targetIndex < newBanners.length) {
//       [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];
//       const updatedBanners = newBanners.map((banner, idx) => ({
//         ...banner,
//         order: idx
//       }));
//       setBanners(updatedBanners);
      
//       try {
//         await homepageAPI.updateBanners(updatedBanners);
//         toast.success('Banner order updated');
//       } catch (error) {
//         toast.error('Failed to update banner order');
//       }
//     }
//   };

//   // Toggle banner active status
//   const toggleBannerActive = async (bannerId) => {
//     const updatedBanners = banners.map(b => 
//       b.id === bannerId ? { ...b, isActive: !b.isActive } : b
//     );
//     setBanners(updatedBanners);
    
//     try {
//       await homepageAPI.updateBanners(updatedBanners);
//       toast.success('Banner status updated');
//     } catch (error) {
//       toast.error('Failed to update banner status');
//     }
//   };

//   // Save featured content settings
//   const saveFeaturedContent = async () => {
//     setSaving(true);
//     try {
//       await homepageAPI.updateFeaturedContent(featuredContent);
//       toast.success('Featured content updated successfully');
//     } catch (error) {
//       toast.error('Failed to update featured content');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Save quote settings
//   const saveQuoteSettings = async () => {
//     setSaving(true);
//     try {
//       await homepageAPI.updateQuoteSettings(quoteSettings);
//       toast.success('Quote settings updated successfully');
//     } catch (error) {
//       toast.error('Failed to update quote settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Get icon for section type
//   const getSectionIcon = (type) => {
//     switch (type) {
//       case 'banner': return <Image className="h-4 w-4" />;
//       case 'content': return <Layout className="h-4 w-4" />;
//       case 'widget': return <Quote className="h-4 w-4" />;
//       case 'cta': return <Heart className="h-4 w-4" />;
//       default: return <Layout className="h-4 w-4" />;
//     }
//   };

//   if (loading && homepageSections.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Homepage CMS</h1>
//           <p className="text-gray-500">Manage homepage sections, banners, and layout</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Link to="/" target="_blank" className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Eye className="h-5 w-5" />
//             <span>Preview</span>
//           </Link>
//           <button 
//             onClick={saveSectionsOrder}
//             disabled={saving}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-gray-900">{homepageSections.length}</p>
//           <p className="text-sm text-gray-500">Total Sections</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {homepageSections.filter(s => s.isActive).length}
//           </p>
//           <p className="text-sm text-gray-500">Enabled</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-yellow-600">
//             {homepageSections.filter(s => !s.isActive).length}
//           </p>
//           <p className="text-sm text-gray-500">Disabled</p>
//         </div>
//         <div className="card p-4 text-center">
//           <p className="text-2xl font-bold text-primary-600">{banners.length}</p>
//           <p className="text-sm text-gray-500">Banners</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-1 border-b border-gray-200">
//         {[
//           { id: 'layout', label: 'Layout', icon: Layout },
//           { id: 'banners', label: 'Banners', icon: Image },
//           { id: 'content', label: 'Content', icon: Type },
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === tab.id
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             <tab.icon className="h-4 w-4" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Layout Tab */}
//       {activeTab === 'layout' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-gray-900">Section Order & Visibility</h3>
//             <button 
//               onClick={saveSectionsOrder}
//               disabled={saving}
//               className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//             >
//               <RefreshCw className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
//               <span>Save Order</span>
//             </button>
//           </div>
//           <div className="space-y-2">
//             {homepageSections.map((section, index) => (
//               <div
//                 key={section.section}
//                 className={`flex items-center justify-between p-4 rounded-lg border ${
//                   section.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
//                 }`}
//               >
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-gray-400 w-6">{section.order}</span>
//                   <div className="flex items-center space-x-2">
//                     {getSectionIcon(section.type)}
//                     <div>
//                       <p className={`font-medium ${section.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
//                         {section.title}
//                       </p>
//                       <p className="text-xs text-gray-500 capitalize">{section.type}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => moveSection(index, 'up')}
//                     disabled={index === 0}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowUp className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => moveSection(index, 'down')}
//                     disabled={index === homepageSections.length - 1}
//                     className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
//                   >
//                     <ArrowDown className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => toggleSection(section.section)}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                       section.isActive
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-gray-100 text-gray-500'
//                     }`}
//                   >
//                     {section.isActive ? 'Enabled' : 'Disabled'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Banners Tab - With Multiple Upload */}
//       {activeTab === 'banners' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//           {/* Multiple Upload Section */}
//           <div className="card p-6 border-dashed border-2 border-gray-300 hover:border-primary-400 transition-colors">
//             <div className="text-center">
//               <ImagePlus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//               <h3 className="font-semibold text-gray-900 mb-2">Bulk Upload Banners</h3>
//               <p className="text-sm text-gray-500 mb-4">Upload multiple banner images at once</p>
//               <div className="relative inline-block">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleMultipleBannerUpload}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingMultiple}
//                 />
//                 <button className="btn-primary inline-flex items-center gap-2" disabled={uploadingMultiple}>
//                   {uploadingMultiple ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       <span>Uploading...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="h-4 w-4" />
//                       <span>Select Multiple Images</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WebP. Max 5MB each.</p>
//             </div>
//           </div>

//           {/* Existing Banners List */}
//           <div className="flex justify-between items-center">
//             <h3 className="font-semibold text-gray-900">Existing Banners ({banners.length})</h3>
//             <button
//               onClick={() => setShowAddBannerModal(true)}
//               className="text-sm btn-primary py-1.5 px-3"
//             >
//               <Plus className="h-4 w-4 inline mr-1" /> Add Single Banner
//             </button>
//           </div>

//           {banners.length === 0 ? (
//             <div className="card p-12 text-center text-gray-500">
//               <Image className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//               <p>No banners added yet. Click "Add Single Banner" or upload multiple images above.</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {banners.map((banner, index) => (
//                 <div key={banner.id} className="card p-4">
//                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                     <div className="flex items-start gap-4 flex-1">
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={() => moveBanner(index, 'up')}
//                           disabled={index === 0}
//                           className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
//                         >
//                           <ArrowUp className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => moveBanner(index, 'down')}
//                           disabled={index === banners.length - 1}
//                           className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
//                         >
//                           <ArrowDown className="h-4 w-4" />
//                         </button>
//                         <GripVertical className="h-4 w-4 text-gray-400" />
//                       </div>
//                       {banner.image && (
//                         <img src={banner.image} alt={banner.title} className="h-16 w-24 object-cover rounded" />
//                       )}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h4 className="font-medium text-gray-900">{banner.title}</h4>
//                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                             banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                           }`}>
//                             {banner.isActive ? 'Active' : 'Inactive'}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500">{banner.subtitle}</p>
//                         <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
//                           <span>CTA: {banner.ctaText}</span>
//                           <span>URL: {banner.ctaUrl}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => toggleBannerActive(banner.id)}
//                         className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
//                         title={banner.isActive ? 'Disable' : 'Enable'}
//                       >
//                         {banner.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
//                       </button>
//                       <button
//                         onClick={() => handleEditBanner(banner)}
//                         className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                         title="Edit"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBanner(banner.id)}
//                         className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                         title="Delete"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* Content Tab */}
//       {activeTab === 'content' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           {/* Featured Content */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Star className="h-5 w-5 text-primary-600" />
//               Featured Content
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Poem</label>
//                 <select
//                   value={featuredContent.featuredPoem}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredPoem: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select a poem</option>
//                   {availablePoems.map(poem => (
//                     <option key={poem._id} value={poem._id}>{poem.title}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Author</label>
//                 <select
//                   value={featuredContent.featuredAuthor}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredAuthor: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select an author</option>
//                   {availableAuthors.map(author => (
//                     <option key={author._id} value={author._id}>{author.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Book</label>
//                 <select
//                   value={featuredContent.featuredBook}
//                   onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredBook: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="">Select a book</option>
//                   {availableBooks.map(book => (
//                     <option key={book._id} value={book._id}>{book.title}</option>
//                   ))}
//                 </select>
//               </div>
//               <button
//                 onClick={saveFeaturedContent}
//                 disabled={saving}
//                 className="btn-primary w-full md:w-auto"
//               >
//                 {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
//                 Save Featured Content
//               </button>
//             </div>
//           </div>

//           {/* Daily Quote Settings */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Quote className="h-5 w-5 text-primary-600" />
//               Daily Quote Settings
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quote Source</label>
//                 <select
//                   value={quoteSettings.source}
//                   onChange={(e) => setQuoteSettings(prev => ({ ...prev, source: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="auto">Auto-generate from popular poems</option>
//                   <option value="manual">Manual selection</option>
//                   <option value="random">Random from collection</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
//                 <select
//                   value={quoteSettings.frequency}
//                   onChange={(e) => setQuoteSettings(prev => ({ ...prev, frequency: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//               </div>
//               <button
//                 onClick={saveQuoteSettings}
//                 disabled={saving}
//                 className="btn-primary w-full md:w-auto"
//               >
//                 {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
//                 Save Quote Settings
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Add/Edit Single Banner Modal */}
//       <AnimatePresence>
//         {showAddBannerModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingBanner ? 'Edit Banner' : 'Add Single Banner'}
//                 </h2>
//                 <button onClick={resetBannerModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={bannerForm.title}
//                     onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
//                     className="input-field"
//                     placeholder="Enter banner title"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
//                   <input
//                     type="text"
//                     value={bannerForm.subtitle}
//                     onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
//                     className="input-field"
//                     placeholder="Enter banner subtitle"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
//                     <input
//                       type="text"
//                       value={bannerForm.ctaText}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, ctaText: e.target.value }))}
//                       className="input-field"
//                       placeholder="e.g., Explore Now"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
//                     <input
//                       type="text"
//                       value={bannerForm.ctaUrl}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, ctaUrl: e.target.value }))}
//                       className="input-field"
//                       placeholder="/explore"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Banner Image <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-3">
//                     <input
//                       type="url"
//                       value={bannerForm.image}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
//                       className="input-field flex-1"
//                       placeholder="https://..."
//                     />
//                     <div className="relative">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleBannerImageUpload}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         disabled={uploadingImage}
//                       />
//                       <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
//                         {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                         <span>Upload</span>
//                       </button>
//                     </div>
//                   </div>
//                   {uploadingImage && (
//                     <div className="mt-2">
//                       <div className="w-full bg-gray-200 rounded-full h-1.5">
//                         <div 
//                           className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
//                           style={{ width: `${uploadProgress}%` }}
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
//                     </div>
//                   )}
//                   {bannerForm.image && (
//                     <div className="mt-3">
//                       <img src={bannerForm.image} alt="Banner preview" className="h-32 w-full object-cover rounded-lg" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={bannerForm.isActive}
//                       onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Active</span>
//                   </label>
//                 </div>

//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={handleSaveBanner}
//                     disabled={saving}
//                     className="btn-primary flex-1"
//                   >
//                     {saving ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBanner ? 'Update Banner' : 'Add Banner')}
//                   </button>
//                   <button onClick={resetBannerModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HomepageCMSPage;




















// client/src/pages/admin/HomepageCMSPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Image, Type, ArrowUp, ArrowDown, Trash2, Plus,
  Eye, EyeOff, Save, RefreshCw, X, Loader2, AlertCircle, Upload,
  Check, Copy, Edit, Heart, BookOpen, Users, Video, Quote,
  GripVertical, Star, Settings, ImagePlus, Move
} from 'lucide-react';
import { Link } from 'react-router-dom';
import homepageAPI from '../../api/homepageAPI';
import poemAPI from '../../api/poemAPI';
import authorAPI from '../../api/authorAPI';
import bookAPI from '../../api/bookAPI';
import uploadAPI from '../../api/uploadAPI';
import toast from 'react-hot-toast';

const HomepageCMSPage = () => {
  const [homepageSections, setHomepageSections] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('layout');
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingMultiple, setUploadingMultiple] = useState(false);
  const [featuredContent, setFeaturedContent] = useState({
    featuredPoem: '',
    featuredAuthor: '',
    featuredBook: '',
    featuredAudio: '',
    featuredVideo: ''
  });
  const [quoteSettings, setQuoteSettings] = useState({
    source: 'auto',
    frequency: 'daily'
  });

  // Available content for dropdowns
  const [availablePoems, setAvailablePoems] = useState([]);
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  // Banner form state
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    ctaText: 'Explore Now',
    ctaUrl: '/explore',
    image: '',
    order: 0,
    isActive: true
  });

  // Fetch homepage configuration
  const fetchHomepageConfig = useCallback(async () => {
    setLoading(true);
    try {
      const response = await homepageAPI.getConfig();
      const configData = response?.data?.data || response?.data || response || [];
      
      if (Array.isArray(configData)) {
        const sortedSections = [...configData].sort((a, b) => a.order - b.order);
        setHomepageSections(sortedSections);
        
        const heroSection = sortedSections.find(s => s.section === 'hero');
        if (heroSection && heroSection.banners) {
          // Ensure each banner has a valid id
          const bannersWithIds = heroSection.banners.map(banner => ({
            ...banner,
            id: banner.id || banner._id || Date.now() + Math.random()
          }));
          setBanners(bannersWithIds);
        }
      }
    } catch (error) {
      console.error('Error fetching homepage config:', error);
      toast.error('Failed to load homepage configuration');
      setHomepageSections([
        { section: 'hero', title: 'Hero Banner', type: 'banner', isActive: true, order: 1, banners: [] },
        { section: 'trending', title: 'Trending Poems', type: 'content', isActive: true, order: 2 },
        { section: 'featured-authors', title: 'Featured Authors', type: 'content', isActive: true, order: 3 },
        { section: 'featured-books', title: 'Popular Books', type: 'content', isActive: true, order: 4 },
        { section: 'featured-audio', title: 'Audio Highlights', type: 'content', isActive: true, order: 5 },
        { section: 'featured-videos', title: 'Video Highlights', type: 'content', isActive: true, order: 6 },
        { section: 'daily-quote', title: 'Daily Quote', type: 'widget', isActive: true, order: 7 },
        { section: 'premium-cta', title: 'Premium CTA', type: 'cta', isActive: true, order: 8 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch featured content
  const fetchFeaturedContent = useCallback(async () => {
    try {
      const [poemsRes, authorsRes, booksRes] = await Promise.all([
        poemAPI.getFeaturedPoems(),
        authorAPI.getFeaturedAuthors(),
        bookAPI.getFeaturedBooks()
      ]);
      
      setAvailablePoems(poemsRes?.data || poemsRes || []);
      setAvailableAuthors(authorsRes?.data || authorsRes || []);
      setAvailableBooks(booksRes?.data || booksRes || []);
    } catch (error) {
      console.error('Error fetching featured content:', error);
    }
  }, []);

  // Fetch available content for dropdowns
  const fetchAvailableContent = useCallback(async () => {
    try {
      const [poemsRes, authorsRes, booksRes] = await Promise.all([
        poemAPI.getPoems({ limit: 50 }),
        authorAPI.getAuthors({ limit: 50 }),
        bookAPI.getBooks({ limit: 50 })
      ]);
      
      setAvailablePoems(poemsRes?.data?.data || poemsRes?.data || poemsRes || []);
      setAvailableAuthors(authorsRes?.data?.data || authorsRes?.data || authorsRes || []);
      setAvailableBooks(booksRes?.data?.data || booksRes?.data || booksRes || []);
    } catch (error) {
      console.error('Error fetching available content:', error);
    }
  }, []);

  useEffect(() => {
    fetchHomepageConfig();
    fetchFeaturedContent();
    fetchAvailableContent();
  }, [fetchHomepageConfig, fetchFeaturedContent, fetchAvailableContent]);

  // Move section up/down
  const moveSection = async (index, direction) => {
    const newSections = [...homepageSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      const updatedSections = newSections.map((section, idx) => ({
        ...section,
        order: idx + 1
      }));
      setHomepageSections(updatedSections);
    }
  };

  // Toggle section visibility
  const toggleSection = async (sectionId) => {
    const section = homepageSections.find(s => s.section === sectionId);
    if (!section) return;
    
    setHomepageSections(prev => prev.map(s =>
      s.section === sectionId ? { ...s, isActive: !s.isActive } : s
    ));
    
    try {
      await homepageAPI.updateSection(sectionId, { isActive: !section.isActive });
      toast.success(`${section.title} ${!section.isActive ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update section');
      setHomepageSections(prev => prev.map(s =>
        s.section === sectionId ? { ...s, isActive: section.isActive } : s
      ));
    }
  };

  // Save all sections order
  const saveSectionsOrder = async () => {
    setSaving(true);
    try {
      const sectionsToSave = homepageSections.map(s => ({
        id: s.section,
        order: s.order
      }));
      await homepageAPI.reorderSections(sectionsToSave);
      toast.success('Section order saved successfully');
    } catch (error) {
      toast.error('Failed to save section order');
    } finally {
      setSaving(false);
    }
  };

  // Handle single banner image upload
  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingImage(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const response = await uploadAPI.uploadImage(file);
      clearInterval(interval);
      setUploadProgress(100);
      
      if (response.data?.url) {
        setBannerForm(prev => ({ ...prev, image: response.data.url }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      clearInterval(interval);
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle multiple banner images upload - FIXED
  const handleMultipleBannerUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingMultiple(true);
    const uploadedBanners = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`Skipping ${file.name}: not an image`);
        continue;
      }

      try {
        const response = await uploadAPI.uploadImage(file);
        if (response.data?.url) {
          const newBanner = {
            title: file.name.split('.')[0],
            subtitle: '',
            ctaText: 'Explore Now',
            ctaUrl: '/explore',
            image: response.data.url,
            order: banners.length + uploadedBanners.length,
            isActive: true,
            id: Date.now() + i + Math.random() // Generate unique ID
          };
          uploadedBanners.push(newBanner);
          toast.success(`Uploaded: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        toast.error(`Failed to upload: ${file.name}`);
      }
    }

    if (uploadedBanners.length > 0) {
      const updatedBanners = [...banners, ...uploadedBanners];
      setBanners(updatedBanners);
      
      try {
        await homepageAPI.updateBanners(updatedBanners);
        toast.success(`${uploadedBanners.length} banners added successfully`);
        fetchHomepageConfig();
      } catch (error) {
        console.error('Save error:', error);
        toast.error('Failed to save banners to database');
        // Revert on error
        setBanners(banners);
      }
    }
    
    setUploadingMultiple(false);
    e.target.value = '';
  };

  // Add or update single banner - FIXED
  const handleSaveBanner = async () => {
    if (!bannerForm.title || !bannerForm.image) {
      toast.error('Please fill in title and image');
      return;
    }

    setSaving(true);
    try {
      let updatedBanners;
      if (editingBanner) {
        // Update existing banner
        updatedBanners = banners.map(b => 
          b.id === editingBanner.id ? { ...bannerForm, id: editingBanner.id } : b
        );
      } else {
        // Add new banner with unique ID
        const newBanner = {
          ...bannerForm,
          id: Date.now(),
          order: banners.length
        };
        updatedBanners = [...banners, newBanner];
      }
      
      await homepageAPI.updateBanners(updatedBanners);
      setBanners(updatedBanners);
      toast.success(editingBanner ? 'Banner updated successfully' : 'Banner added successfully');
      resetBannerModal();
      fetchHomepageConfig();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.response?.data?.message || 'Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  // Delete banner - FIXED
  const handleDeleteBanner = async (bannerId) => {
    if (!bannerId) {
      toast.error('Invalid banner ID');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await homepageAPI.removeBanner(bannerId);
      const updatedBanners = banners.filter(b => b.id !== bannerId);
      setBanners(updatedBanners);
      toast.success('Banner deleted successfully');
      fetchHomepageConfig();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete banner');
    }
  };

  // Edit banner - FIXED
  const handleEditBanner = (banner) => {
    if (!banner || !banner.id) {
      toast.error('Invalid banner data');
      return;
    }
    
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      ctaText: banner.ctaText || 'Explore Now',
      ctaUrl: banner.ctaUrl || '/explore',
      image: banner.image || '',
      order: banner.order || 0,
      isActive: banner.isActive !== false
    });
    setShowAddBannerModal(true);
  };

  // Reset banner modal
  const resetBannerModal = () => {
    setShowAddBannerModal(false);
    setEditingBanner(null);
    setBannerForm({
      title: '',
      subtitle: '',
      ctaText: 'Explore Now',
      ctaUrl: '/explore',
      image: '',
      order: 0,
      isActive: true
    });
    setSelectedFiles([]);
  };

  // Move banner order - FIXED
  const moveBanner = async (index, direction) => {
    if (!banners[index] || !banners[index].id) {
      toast.error('Cannot move banner: Invalid banner data');
      return;
    }
    
    const newBanners = [...banners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBanners.length) {
      [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];
      const updatedBanners = newBanners.map((banner, idx) => ({
        ...banner,
        order: idx
      }));
      setBanners(updatedBanners);
      
      try {
        await homepageAPI.updateBanners(updatedBanners);
        toast.success('Banner order updated');
      } catch (error) {
        console.error('Reorder error:', error);
        toast.error('Failed to update banner order');
        fetchHomepageConfig(); // Revert on error
      }
    }
  };

  // Toggle banner active status - FIXED
  const toggleBannerActive = async (bannerId) => {
    if (!bannerId) {
      toast.error('Invalid banner ID');
      return;
    }
    
    const banner = banners.find(b => b.id === bannerId);
    if (!banner) return;
    
    const updatedBanners = banners.map(b => 
      b.id === bannerId ? { ...b, isActive: !b.isActive } : b
    );
    setBanners(updatedBanners);
    
    try {
      await homepageAPI.updateBanners(updatedBanners);
      toast.success('Banner status updated');
      fetchHomepageConfig();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update banner status');
      // Revert on error
      setBanners(banners);
    }
  };

  // Save featured content settings
  const saveFeaturedContent = async () => {
    setSaving(true);
    try {
      await homepageAPI.updateFeaturedContent(featuredContent);
      toast.success('Featured content updated successfully');
    } catch (error) {
      toast.error('Failed to update featured content');
    } finally {
      setSaving(false);
    }
  };

  // Save quote settings
  const saveQuoteSettings = async () => {
    setSaving(true);
    try {
      await homepageAPI.updateQuoteSettings(quoteSettings);
      toast.success('Quote settings updated successfully');
    } catch (error) {
      toast.error('Failed to update quote settings');
    } finally {
      setSaving(false);
    }
  };

  // Get icon for section type
  const getSectionIcon = (type) => {
    switch (type) {
      case 'banner': return <Image className="h-4 w-4" />;
      case 'content': return <Layout className="h-4 w-4" />;
      case 'widget': return <Quote className="h-4 w-4" />;
      case 'cta': return <Heart className="h-4 w-4" />;
      default: return <Layout className="h-4 w-4" />;
    }
  };

  if (loading && homepageSections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Homepage CMS</h1>
          <p className="text-gray-500">Manage homepage sections, banners, and layout</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/" target="_blank" className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-5 w-5" />
            <span>Preview</span>
          </Link>
          <button 
            onClick={saveSectionsOrder}
            disabled={saving}
            className="btn-primary inline-flex items-center space-x-2"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{homepageSections.length}</p>
          <p className="text-sm text-gray-500">Total Sections</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {homepageSections.filter(s => s.isActive).length}
          </p>
          <p className="text-sm text-gray-500">Enabled</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {homepageSections.filter(s => !s.isActive).length}
          </p>
          <p className="text-sm text-gray-500">Disabled</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{banners.length}</p>
          <p className="text-sm text-gray-500">Banners</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200">
        {[
          { id: 'layout', label: 'Layout', icon: Layout },
          { id: 'banners', label: 'Banners', icon: Image },
          { id: 'content', label: 'Content', icon: Type },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Section Order & Visibility</h3>
            <button 
              onClick={saveSectionsOrder}
              disabled={saving}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
              <span>Save Order</span>
            </button>
          </div>
          <div className="space-y-2">
            {homepageSections.map((section, index) => (
              <div
                key={section.section}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  section.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400 w-6">{section.order}</span>
                  <div className="flex items-center space-x-2">
                    {getSectionIcon(section.type)}
                    <div>
                      <p className={`font-medium ${section.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {section.title}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{section.type}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === homepageSections.length - 1}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleSection(section.section)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      section.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {section.isActive ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Banners Tab - With Multiple Upload */}
      {activeTab === 'banners' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Multiple Upload Section */}
          <div className="card p-6 border-dashed border-2 border-gray-300 hover:border-primary-400 transition-colors">
            <div className="text-center">
              <ImagePlus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Bulk Upload Banners</h3>
              <p className="text-sm text-gray-500 mb-4">Upload multiple banner images at once</p>
              <div className="relative inline-block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleBannerUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploadingMultiple}
                />
                <button className="btn-primary inline-flex items-center gap-2" disabled={uploadingMultiple}>
                  {uploadingMultiple ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Select Multiple Images</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WebP. Max 5MB each.</p>
            </div>
          </div>

          {/* Existing Banners List */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Existing Banners ({banners.length})</h3>
            <button
              onClick={() => setShowAddBannerModal(true)}
              className="text-sm btn-primary py-1.5 px-3"
            >
              <Plus className="h-4 w-4 inline mr-1" /> Add Single Banner
            </button>
          </div>

          {banners.length === 0 ? (
            <div className="card p-12 text-center text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No banners added yet. Click "Add Single Banner" or upload multiple images above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {banners.map((banner, index) => (
                <div key={banner.id || index} className="card p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveBanner(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveBanner(index, 'down')}
                          disabled={index === banners.length - 1}
                          className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </div>
                      {banner.image && (
                        <img src={banner.image} alt={banner.title} className="h-16 w-24 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{banner.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {banner.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{banner.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          <span>CTA: {banner.ctaText}</span>
                          <span>URL: {banner.ctaUrl}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBannerActive(banner.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                        title={banner.isActive ? 'Disable' : 'Enable'}
                      >
                        {banner.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleEditBanner(banner)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Featured Content */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary-600" />
              Featured Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Poem</label>
                <select
                  value={featuredContent.featuredPoem}
                  onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredPoem: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Select a poem</option>
                  {availablePoems.map(poem => (
                    <option key={poem._id} value={poem._id}>{poem.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Author</label>
                <select
                  value={featuredContent.featuredAuthor}
                  onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredAuthor: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Select an author</option>
                  {availableAuthors.map(author => (
                    <option key={author._id} value={author._id}>{author.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Book</label>
                <select
                  value={featuredContent.featuredBook}
                  onChange={(e) => setFeaturedContent(prev => ({ ...prev, featuredBook: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Select a book</option>
                  {availableBooks.map(book => (
                    <option key={book._id} value={book._id}>{book.title}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={saveFeaturedContent}
                disabled={saving}
                className="btn-primary w-full md:w-auto"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Featured Content
              </button>
            </div>
          </div>

          {/* Daily Quote Settings */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary-600" />
              Daily Quote Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote Source</label>
                <select
                  value={quoteSettings.source}
                  onChange={(e) => setQuoteSettings(prev => ({ ...prev, source: e.target.value }))}
                  className="input-field"
                >
                  <option value="auto">Auto-generate from popular poems</option>
                  <option value="manual">Manual selection</option>
                  <option value="random">Random from collection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                <select
                  value={quoteSettings.frequency}
                  onChange={(e) => setQuoteSettings(prev => ({ ...prev, frequency: e.target.value }))}
                  className="input-field"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button
                onClick={saveQuoteSettings}
                disabled={saving}
                className="btn-primary w-full md:w-auto"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Quote Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add/Edit Single Banner Modal */}
      <AnimatePresence>
        {showAddBannerModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBanner ? 'Edit Banner' : 'Add Single Banner'}
                </h2>
                <button onClick={resetBannerModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Enter banner title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="input-field"
                    placeholder="Enter banner subtitle"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                    <input
                      type="text"
                      value={bannerForm.ctaText}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, ctaText: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., Explore Now"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
                    <input
                      type="text"
                      value={bannerForm.ctaUrl}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, ctaUrl: e.target.value }))}
                      className="input-field"
                      placeholder="/explore"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
                      className="input-field flex-1"
                      placeholder="https://..."
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploadingImage}
                      />
                      <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingImage}>
                        {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                  {uploadingImage && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                    </div>
                  )}
                  {bannerForm.image && (
                    <div className="mt-3">
                      <img src={bannerForm.image} alt="Banner preview" className="h-32 w-full object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bannerForm.isActive}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveBanner}
                    disabled={saving}
                    className="btn-primary flex-1"
                  >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (editingBanner ? 'Update Banner' : 'Add Banner')}
                  </button>
                  <button onClick={resetBannerModal} className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomepageCMSPage;