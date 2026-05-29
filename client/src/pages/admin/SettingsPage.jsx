// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import {
//   Settings, Globe, Bell, Shield, Database, Server,
//   Save, ToggleLeft, ToggleRight
// } from 'lucide-react'

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = useState('general')
//   const [maintenanceMode, setMaintenanceMode] = useState(false)

//   const tabs = [
//     { id: 'general', label: 'General', icon: Settings },
//     { id: 'language', label: 'Language', icon: Globe },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'api', label: 'API Settings', icon: Database },
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//         <p className="text-gray-500">Configure platform settings and preferences</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-1 border-b border-gray-200">
//         {tabs.map((tab) => (
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

//       {/* General Settings */}
//       {activeTab === 'general' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Site Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
//                 <input type="text" defaultValue="ZauqApp" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
//                 <textarea
//                   defaultValue="AI Powered Urdu Literary Ecosystem Platform"
//                   className="input-field h-20"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input type="email" defaultValue="contact@zauqapp.com" className="input-field" />
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">Enable maintenance mode</p>
//                 <p className="text-xs text-gray-500">When enabled, the site will show a maintenance page to all users except admins</p>
//               </div>
//               <button
//                 onClick={() => setMaintenanceMode(!maintenanceMode)}
//                 className={`p-1 rounded-full transition-colors ${
//                   maintenanceMode ? 'bg-primary-600' : 'bg-gray-300'
//                 }`}
//               >
//                 <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${
//                   maintenanceMode ? 'translate-x-6' : 'translate-x-1'
//                 }`} />
//               </button>
//             </div>
//           </div>

//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Social Links</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
//                 <input type="url" defaultValue="https://facebook.com/zauqapp" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
//                 <input type="url" defaultValue="https://twitter.com/zauqapp" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
//                 <input type="url" defaultValue="https://instagram.com/zauqapp" className="input-field" />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Language Settings */}
//       {activeTab === 'language' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Default Language</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Primary Language</label>
//                 <select className="input-field">
//                   <option value="en">English</option>
//                   <option value="hi">Hindi</option>
//                   <option value="ur">Urdu</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Available Languages</label>
//                 <div className="space-y-2">
//                   {['English', 'Hindi', 'Urdu'].map((lang) => (
//                     <label key={lang} className="flex items-center space-x-3">
//                       <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
//                       <span className="text-sm text-gray-700">{lang}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* API Settings */}
//       {activeTab === 'api' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">API Configuration</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">API Base URL</label>
//                 <input type="url" defaultValue="https://api.zauqapp.com/v1" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cloudinary Cloud Name</label>
//                 <input type="text" defaultValue="zauqapp" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Redis URL</label>
//                 <input type="url" defaultValue="redis://localhost:6379" className="input-field" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">AI Service Endpoint</label>
//                 <input type="url" defaultValue="https://ai.zauqapp.com" className="input-field" />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       <div className="flex items-center space-x-4">
//         <button className="btn-primary inline-flex items-center space-x-2">
//           <Save className="h-5 w-5" />
//           <span>Save All Changes</span>
//         </button>
//         <button className="px-4 py-2.5 text-gray-600 hover:text-gray-800">
//           Reset to Defaults
//         </button>
//       </div>
//     </div>
//   )
// }

// export default SettingsPage








// // client/src/pages/admin/SettingsPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Settings, Globe, Bell, Shield, Database, Server,
//   Save, ToggleLeft, ToggleRight, Upload, X, Image as ImageIcon,
//   Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone,
//   MapPin, Clock, Award, Users, BookOpen, Headphones, Video
// } from 'lucide-react';
// import settingsAPI from '../../api/settingsAPI';
// import uploadAPI from '../../api/uploadAPI';
// import toast from 'react-hot-toast';

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
  
//   // General Settings
//   const [generalSettings, setGeneralSettings] = useState({
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem Platform',
//     contactEmail: 'contact@zauqapp.com',
//     contactPhone: '',
//     address: '',
//     timezone: 'Asia/Kolkata',
//     dateFormat: 'MM/DD/YYYY',
//     maintenanceMode: false,
//     logoNav: '',
//     logoFooter: '',
//     favicon: '',
//     bannerImage: '',
//     bannerTitle: 'Discover Urdu Poetry',
//     bannerSubtitle: 'Explore thousands of ghazals, nazms, and literary works',
//     bannerCtaText: 'Explore Now',
//     bannerCtaUrl: '/explore'
//   });

//   // Social Settings
//   const [socialSettings, setSocialSettings] = useState({
//     facebook: 'https://facebook.com/zauqapp',
//     twitter: 'https://twitter.com/zauqapp',
//     instagram: 'https://instagram.com/zauqapp',
//     youtube: '',
//     linkedin: '',
//     github: ''
//   });

//   // Language Settings
//   const [languageSettings, setLanguageSettings] = useState({
//     defaultLanguage: 'en',
//     availableLanguages: ['en', 'hi', 'ur'],
//     enableRTL: false
//   });

//   // Notification Settings
//   const [notificationSettings, setNotificationSettings] = useState({
//     emailNotifications: true,
//     pushNotifications: true,
//     newUserAlert: true,
//     newContentAlert: true,
//     systemAlert: true
//   });

//   // Security Settings
//   const [securitySettings, setSecuritySettings] = useState({
//     twoFactorAuth: false,
//     sessionTimeout: 60,
//     maxLoginAttempts: 5,
//     requireEmailVerification: true,
//     allowRegistration: true
//   });

//   // API Settings
//   const [apiSettings, setApiSettings] = useState({
//     apiBaseUrl: 'https://api.zauqapp.com/v1',
//     cloudinaryCloudName: '',
//     cloudinaryApiKey: '',
//     redisUrl: 'redis://localhost:6379',
//     aiServiceEndpoint: 'https://ai.zauqapp.com'
//   });

//   // Upload states
//   const [uploadingLogoNav, setUploadingLogoNav] = useState(false);
//   const [uploadingLogoFooter, setUploadingLogoFooter] = useState(false);
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [uploadingBanner, setUploadingBanner] = useState(false);

//   // Fetch settings on mount
//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     setLoading(true);
//     try {
//       const response = await settingsAPI.getSettings();
//       const data = response?.data || response;
      
//       if (data) {
//         setGeneralSettings(prev => ({ ...prev, ...data.general }));
//         setSocialSettings(prev => ({ ...prev, ...data.social }));
//         setLanguageSettings(prev => ({ ...prev, ...data.language }));
//         setNotificationSettings(prev => ({ ...prev, ...data.notifications }));
//         setSecuritySettings(prev => ({ ...prev, ...data.security }));
//         setApiSettings(prev => ({ ...prev, ...data.api }));
//       }
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//       toast.error('Failed to load settings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image upload to Cloudinary
//   const handleImageUpload = async (file, type) => {
//     const formData = new FormData();
//     formData.append('image', file);
    
//     let uploadFunction;
//     let setUploading;
//     let setUrl;
    
//     switch (type) {
//       case 'logoNav':
//         uploadFunction = uploadAPI.uploadImage;
//         setUploading = setUploadingLogoNav;
//         setUrl = (url) => setGeneralSettings(prev => ({ ...prev, logoNav: url }));
//         break;
//       case 'logoFooter':
//         uploadFunction = uploadAPI.uploadImage;
//         setUploading = setUploadingLogoFooter;
//         setUrl = (url) => setGeneralSettings(prev => ({ ...prev, logoFooter: url }));
//         break;
//       case 'favicon':
//         uploadFunction = uploadAPI.uploadImage;
//         setUploading = setUploadingFavicon;
//         setUrl = (url) => setGeneralSettings(prev => ({ ...prev, favicon: url }));
//         break;
//       case 'banner':
//         uploadFunction = uploadAPI.uploadImage;
//         setUploading = setUploadingBanner;
//         setUrl = (url) => setGeneralSettings(prev => ({ ...prev, bannerImage: url }));
//         break;
//       default:
//         return;
//     }
    
//     setUploading(true);
//     try {
//       const response = await uploadFunction(file);
//       const imageUrl = response.data?.url || response?.url;
//       if (imageUrl) {
//         setUrl(imageUrl);
//         toast.success(`${type} uploaded successfully`);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error(`Failed to upload ${type}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Handle save all settings
//   const handleSaveAll = async () => {
//     setSaving(true);
//     try {
//       const allSettings = {
//         general: generalSettings,
//         social: socialSettings,
//         language: languageSettings,
//         notifications: notificationSettings,
//         security: securitySettings,
//         api: apiSettings
//       };
      
//       await settingsAPI.updateSettings(allSettings);
//       toast.success('All settings saved successfully');
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       toast.error('Failed to save settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle reset to defaults
//   const handleResetDefaults = async () => {
//     if (!window.confirm('Are you sure you want to reset all settings to defaults?')) return;
    
//     setSaving(true);
//     try {
//       await settingsAPI.resetSettings();
//       await fetchSettings();
//       toast.success('Settings reset to defaults');
//     } catch (error) {
//       console.error('Error resetting settings:', error);
//       toast.error('Failed to reset settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const tabs = [
//     { id: 'general', label: 'General', icon: Settings },
//     { id: 'branding', label: 'Branding', icon: ImageIcon },
//     { id: 'social', label: 'Social Links', icon: Globe },
//     { id: 'language', label: 'Language', icon: Globe },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'api', label: 'API Settings', icon: Database },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//         <p className="text-gray-500">Configure platform settings and preferences</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex overflow-x-auto scrollbar-hide gap-1 border-b border-gray-200">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
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

//       {/* General Settings */}
//       {activeTab === 'general' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Site Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
//                 <input
//                   type="text"
//                   value={generalSettings.siteName}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input
//                   type="email"
//                   value={generalSettings.contactEmail}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input
//                   type="tel"
//                   value={generalSettings.contactPhone}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
//                   className="input-field"
//                   placeholder="+91 1234567890"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                 <input
//                   type="text"
//                   value={generalSettings.address}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
//                   className="input-field"
//                   placeholder="Company address"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
//                 <textarea
//                   value={generalSettings.siteDescription}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
//                   className="input-field h-20"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">Enable maintenance mode</p>
//                 <p className="text-xs text-gray-500">When enabled, the site will show a maintenance page to all users except admins</p>
//               </div>
//               <button
//                 onClick={() => setGeneralSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   generalSettings.maintenanceMode ? 'bg-primary-600' : 'bg-gray-300'
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Branding Settings - Logo Uploads */}
//       {activeTab === 'branding' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           {/* Navigation Logo */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Navigation Logo</h3>
//             <div className="flex items-start gap-6">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
//                 <input
//                   type="url"
//                   value={generalSettings.logoNav}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, logoNav: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://..."
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended size: 200x60px</p>
//               </div>
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0], 'logoNav')}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingLogoNav}
//                 />
//                 <button className="btn-outline flex items-center gap-2" disabled={uploadingLogoNav}>
//                   {uploadingLogoNav ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload Logo
//                 </button>
//               </div>
//             </div>
//             {generalSettings.logoNav && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg inline-block">
//                 <img src={generalSettings.logoNav} alt="Nav Logo" className="h-12 object-contain" />
//               </div>
//             )}
//           </div>

//           {/* Footer Logo */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Footer Logo</h3>
//             <div className="flex items-start gap-6">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
//                 <input
//                   type="url"
//                   value={generalSettings.logoFooter}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, logoFooter: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://..."
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended size: 150x50px</p>
//               </div>
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0], 'logoFooter')}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingLogoFooter}
//                 />
//                 <button className="btn-outline flex items-center gap-2" disabled={uploadingLogoFooter}>
//                   {uploadingLogoFooter ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload Logo
//                 </button>
//               </div>
//             </div>
//             {generalSettings.logoFooter && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg inline-block">
//                 <img src={generalSettings.logoFooter} alt="Footer Logo" className="h-10 object-contain" />
//               </div>
//             )}
//           </div>

//           {/* Favicon */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Favicon</h3>
//             <div className="flex items-start gap-6">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
//                 <input
//                   type="url"
//                   value={generalSettings.favicon}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, favicon: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://..."
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Recommended size: 32x32px</p>
//               </div>
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files[0], 'favicon')}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadingFavicon}
//                 />
//                 <button className="btn-outline flex items-center gap-2" disabled={uploadingFavicon}>
//                   {uploadingFavicon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                   Upload Favicon
//                 </button>
//               </div>
//             </div>
//             {generalSettings.favicon && (
//               <div className="mt-4">
//                 <img src={generalSettings.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
//               </div>
//             )}
//           </div>

//           {/* Homepage Banner */}
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Homepage Banner</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
//                 <div className="flex items-start gap-6">
//                   <div className="flex-1">
//                     <input
//                       type="url"
//                       value={generalSettings.bannerImage}
//                       onChange={(e) => setGeneralSettings(prev => ({ ...prev, bannerImage: e.target.value }))}
//                       className="input-field"
//                       placeholder="https://..."
//                     />
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e.target.files[0], 'banner')}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingBanner}
//                     />
//                     <button className="btn-outline flex items-center gap-2" disabled={uploadingBanner}>
//                       {uploadingBanner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload Banner
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
//                 <input
//                   type="text"
//                   value={generalSettings.bannerTitle}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, bannerTitle: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Banner Subtitle</label>
//                 <input
//                   type="text"
//                   value={generalSettings.bannerSubtitle}
//                   onChange={(e) => setGeneralSettings(prev => ({ ...prev, bannerSubtitle: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
//                   <input
//                     type="text"
//                     value={generalSettings.bannerCtaText}
//                     onChange={(e) => setGeneralSettings(prev => ({ ...prev, bannerCtaText: e.target.value }))}
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">CTA URL</label>
//                   <input
//                     type="text"
//                     value={generalSettings.bannerCtaUrl}
//                     onChange={(e) => setGeneralSettings(prev => ({ ...prev, bannerCtaUrl: e.target.value }))}
//                     className="input-field"
//                   />
//                 </div>
//               </div>
              
//               {generalSettings.bannerImage && (
//                 <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
//                   <img src={generalSettings.bannerImage} alt="Banner" className="w-full h-48 object-cover" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Social Settings */}
//       {activeTab === 'social' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Social Media Links</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Facebook className="h-4 w-4 text-blue-600" /> Facebook
//                 </label>
//                 <input
//                   type="url"
//                   value={socialSettings.facebook}
//                   onChange={(e) => setSocialSettings(prev => ({ ...prev, facebook: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://facebook.com/..."
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Twitter className="h-4 w-4 text-blue-400" /> Twitter/X
//                 </label>
//                 <input
//                   type="url"
//                   value={socialSettings.twitter}
//                   onChange={(e) => setSocialSettings(prev => ({ ...prev, twitter: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://twitter.com/..."
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Instagram className="h-4 w-4 text-pink-600" /> Instagram
//                 </label>
//                 <input
//                   type="url"
//                   value={socialSettings.instagram}
//                   onChange={(e) => setSocialSettings(prev => ({ ...prev, instagram: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://instagram.com/..."
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Youtube className="h-4 w-4 text-red-600" /> YouTube
//                 </label>
//                 <input
//                   type="url"
//                   value={socialSettings.youtube}
//                   onChange={(e) => setSocialSettings(prev => ({ ...prev, youtube: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://youtube.com/..."
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn
//                 </label>
//                 <input
//                   type="url"
//                   value={socialSettings.linkedin}
//                   onChange={(e) => setSocialSettings(prev => ({ ...prev, linkedin: e.target.value }))}
//                   className="input-field"
//                   placeholder="https://linkedin.com/..."
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Language Settings */}
//       {activeTab === 'language' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Language Settings</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
//                 <select
//                   value={languageSettings.defaultLanguage}
//                   onChange={(e) => setLanguageSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
//                   className="input-field"
//                 >
//                   <option value="en">English</option>
//                   <option value="hi">Hindi</option>
//                   <option value="ur">Urdu</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Available Languages</label>
//                 <div className="space-y-2">
//                   {[
//                     { code: 'en', label: 'English' },
//                     { code: 'hi', label: 'Hindi' },
//                     { code: 'ur', label: 'Urdu' }
//                   ].map((lang) => (
//                     <label key={lang.code} className="flex items-center space-x-3">
//                       <input
//                         type="checkbox"
//                         checked={languageSettings.availableLanguages.includes(lang.code)}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             setLanguageSettings(prev => ({
//                               ...prev,
//                               availableLanguages: [...prev.availableLanguages, lang.code]
//                             }));
//                           } else {
//                             setLanguageSettings(prev => ({
//                               ...prev,
//                               availableLanguages: prev.availableLanguages.filter(l => l !== lang.code)
//                             }));
//                           }
//                         }}
//                         className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                       />
//                       <span className="text-sm text-gray-700">{lang.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={languageSettings.enableRTL}
//                     onChange={(e) => setLanguageSettings(prev => ({ ...prev, enableRTL: e.target.checked }))}
//                     className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//                   />
//                   <span className="text-sm text-gray-700">Enable RTL Support (for Urdu/Arabic)</span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Notification Settings */}
//       {activeTab === 'notifications' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
//             <div className="space-y-4">
//               {[
//                 { key: 'emailNotifications', label: 'Email Notifications' },
//                 { key: 'pushNotifications', label: 'Push Notifications' },
//                 { key: 'newUserAlert', label: 'Alert on New User Registration' },
//                 { key: 'newContentAlert', label: 'Alert on New Content Upload' },
//                 { key: 'systemAlert', label: 'System Alerts' }
//               ].map((item) => (
//                 <label key={item.key} className="flex items-center justify-between cursor-pointer py-2">
//                   <span className="text-sm text-gray-700">{item.label}</span>
//                   <button
//                     onClick={() => setNotificationSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       notificationSettings[item.key] ? 'bg-primary-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                         notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-1'
//                       }`}
//                     />
//                   </button>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Security Settings */}
//       {activeTab === 'security' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
//                 <input
//                   type="number"
//                   value={securitySettings.sessionTimeout}
//                   onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
//                   className="input-field w-32"
//                   min="5"
//                   max="480"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
//                 <input
//                   type="number"
//                   value={securitySettings.maxLoginAttempts}
//                   onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
//                   className="input-field w-32"
//                   min="3"
//                   max="10"
//                 />
//               </div>
//               <div className="space-y-3">
//                 <label className="flex items-center justify-between cursor-pointer py-2">
//                   <span className="text-sm text-gray-700">Two-Factor Authentication</span>
//                   <button
//                     onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       securitySettings.twoFactorAuth ? 'bg-primary-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
//                   </button>
//                 </label>
//                 <label className="flex items-center justify-between cursor-pointer py-2">
//                   <span className="text-sm text-gray-700">Require Email Verification</span>
//                   <button
//                     onClick={() => setSecuritySettings(prev => ({ ...prev, requireEmailVerification: !prev.requireEmailVerification }))}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       securitySettings.requireEmailVerification ? 'bg-primary-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'}`} />
//                   </button>
//                 </label>
//                 <label className="flex items-center justify-between cursor-pointer py-2">
//                   <span className="text-sm text-gray-700">Allow New Registrations</span>
//                   <button
//                     onClick={() => setSecuritySettings(prev => ({ ...prev, allowRegistration: !prev.allowRegistration }))}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       securitySettings.allowRegistration ? 'bg-primary-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.allowRegistration ? 'translate-x-6' : 'translate-x-1'}`} />
//                   </button>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* API Settings */}
//       {activeTab === 'api' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//           <div className="card p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">API Configuration</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">API Base URL</label>
//                 <input
//                   type="url"
//                   value={apiSettings.apiBaseUrl}
//                   onChange={(e) => setApiSettings(prev => ({ ...prev, apiBaseUrl: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cloudinary Cloud Name</label>
//                 <input
//                   type="text"
//                   value={apiSettings.cloudinaryCloudName}
//                   onChange={(e) => setApiSettings(prev => ({ ...prev, cloudinaryCloudName: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cloudinary API Key</label>
//                 <input
//                   type="password"
//                   value={apiSettings.cloudinaryApiKey}
//                   onChange={(e) => setApiSettings(prev => ({ ...prev, cloudinaryApiKey: e.target.value }))}
//                   className="input-field"
//                   placeholder="Enter API key"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Redis URL</label>
//                 <input
//                   type="url"
//                   value={apiSettings.redisUrl}
//                   onChange={(e) => setApiSettings(prev => ({ ...prev, redisUrl: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">AI Service Endpoint</label>
//                 <input
//                   type="url"
//                   value={apiSettings.aiServiceEndpoint}
//                   onChange={(e) => setApiSettings(prev => ({ ...prev, aiServiceEndpoint: e.target.value }))}
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Save Buttons */}
//       <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//         <button
//           onClick={handleSaveAll}
//           disabled={saving}
//           className="btn-primary inline-flex items-center space-x-2"
//         >
//           {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//           <span>Save All Changes</span>
//         </button>
//         <button
//           onClick={handleResetDefaults}
//           disabled={saving}
//           className="px-4 py-2.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           Reset to Defaults
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;















// client/src/pages/admin/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  Save, RefreshCw, Globe, Mail, Lock, Bell, Shield,
  Database, Cloud, Server, Smartphone, Palette, Moon,
  Sun, Monitor, Languages, DollarSign, Users, FileText,
  Image, Video, Music, BookOpen, Headphones, Check,
  AlertCircle, Loader2, Eye, EyeOff, X, Plus, Trash2
} from 'lucide-react';
import adminAPI from '../../api/adminAPI';
import settingsAPI from '../../api/settingsAPI';

const SettingsPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'ZauqApp',
    siteDescription: 'AI Powered Urdu Literary Ecosystem',
    siteLogo: '',
    siteFavicon: '',
    contactEmail: 'admin@zauqapp.com',
    contactPhone: '',
    address: '',
    
    // Content Settings
    itemsPerPage: 12,
    enableComments: true,
    enableRatings: true,
    autoApproveContent: false,
    enableUserUploads: true,
    
    // Media Settings
    maxImageSize: 5,
    maxVideoSize: 500,
    maxAudioSize: 100,
    allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
    allowedVideoFormats: ['mp4', 'webm', 'mov'],
    allowedAudioFormats: ['mp3', 'wav', 'ogg'],
    
    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiryDays: 90,
    enableCaptcha: true,
    
    // Email Settings
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: '',
    
    // API Settings
    apiKeys: [],
    webhookUrl: '',
    
    // Payment Settings
    currency: 'INR',
    razorpayKey: '',
    razorpaySecret: '',
    stripeKey: '',
    stripeSecret: '',
    
    // Cache Settings
    enableCache: true,
    cacheDuration: 3600,
    
    // CDN Settings
    enableCDN: false,
    cdnUrl: '',
    
    // Maintenance Mode
    maintenanceMode: false,
    maintenanceMessage: 'Site is under maintenance. Please check back later.',
    
    // Appearance
    theme: 'light',
    primaryColor: '#8B4513',
    secondaryColor: '#DAA520',
    fontFamily: 'Inter'
  });

  // Fetch settings
  const { data: settingsData, isLoading, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: () => adminAPI.getSettings(),
    enabled: true
  });

  useEffect(() => {
    if (settingsData?.data) {
      setSettings(prev => ({ ...prev, ...settingsData.data }));
    }
  }, [settingsData]);

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (data) => adminAPI.updateSettings(data),
    onSuccess: () => {
      toast.success('Settings saved successfully');
      queryClient.invalidateQueries(['settings']);
      setSaving(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to save settings');
      setSaving(false);
    }
  });

  const handleSave = async () => {
    setSaving(true);
    updateSettingsMutation.mutate(settings);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'api', label: 'API', icon: Cloud },
    { id: 'payment', label: 'Payment', icon: DollarSign },
    { id: 'cache', label: 'Cache', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  if (isLoading) {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">Manage application settings and configurations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary inline-flex items-center space-x-2"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="card p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleInputChange}
                  className="input-field h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo URL</label>
                <input
                  type="url"
                  name="siteLogo"
                  value={settings.siteLogo}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
                <input
                  type="url"
                  name="siteFavicon"
                  value={settings.siteFavicon}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  className="input-field h-20"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Settings */}
        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Content Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
                <select
                  name="itemsPerPage"
                  value={settings.itemsPerPage}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableComments"
                    checked={settings.enableComments}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable Comments</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableRatings"
                    checked={settings.enableRatings}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable Ratings & Reviews</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoApproveContent"
                    checked={settings.autoApproveContent}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Auto-approve User Content</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableUserUploads"
                    checked={settings.enableUserUploads}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable User Uploads</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Settings */}
        {activeTab === 'media' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Media Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label>
                <input
                  type="number"
                  name="maxImageSize"
                  value={settings.maxImageSize}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Video Size (MB)</label>
                <input
                  type="number"
                  name="maxVideoSize"
                  value={settings.maxVideoSize}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Audio Size (MB)</label>
                <input
                  type="number"
                  name="maxAudioSize"
                  value={settings.maxAudioSize}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Image Formats</label>
                <input
                  type="text"
                  value={settings.allowedImageFormats.join(', ')}
                  onChange={(e) => handleArrayChange('allowedImageFormats', e.target.value)}
                  className="input-field"
                  placeholder="jpg, jpeg, png, webp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Video Formats</label>
                <input
                  type="text"
                  value={settings.allowedVideoFormats.join(', ')}
                  onChange={(e) => handleArrayChange('allowedVideoFormats', e.target.value)}
                  className="input-field"
                  placeholder="mp4, webm, mov"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Audio Formats</label>
                <input
                  type="text"
                  value={settings.allowedAudioFormats.join(', ')}
                  onChange={(e) => handleArrayChange('allowedAudioFormats', e.target.value)}
                  className="input-field"
                  placeholder="mp3, wav, ogg"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  name="maxLoginAttempts"
                  value={settings.maxLoginAttempts}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  name="passwordExpiryDays"
                  value={settings.passwordExpiryDays}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableTwoFactor"
                    checked={settings.enableTwoFactor}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableCaptcha"
                    checked={settings.enableCaptcha}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable Captcha on Login/Register</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Settings */}
        {activeTab === 'email' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Email Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input
                  type="text"
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input
                  type="number"
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                <input
                  type="text"
                  name="smtpUser"
                  value={settings.smtpUser}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    name="smtpPassword"
                    value={settings.smtpPassword}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={settings.senderEmail}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
                <input
                  type="text"
                  name="senderName"
                  value={settings.senderName}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* API Settings */}
        {activeTab === 'api' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">API Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="url"
                  name="webhookUrl"
                  value={settings.webhookUrl}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Keys</label>
                <div className="space-y-2">
                  {settings.apiKeys.map((key, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={key.name}
                        className="input-field flex-1"
                        placeholder="Key Name"
                      />
                      <input
                        type="text"
                        value={key.key}
                        className="input-field flex-1"
                        placeholder="API Key"
                      />
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add API Key
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label>
                <input
                  type="text"
                  name="razorpayKey"
                  value={settings.razorpayKey}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Secret</label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    name="razorpaySecret"
                    value={settings.razorpaySecret}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
                <input
                  type="text"
                  name="stripeKey"
                  value={settings.stripeKey}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    name="stripeSecret"
                    value={settings.stripeSecret}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cache Settings */}
        {activeTab === 'cache' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Cache Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableCache"
                    checked={settings.enableCache}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable Caching</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableCDN"
                    checked={settings.enableCDN}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">Enable CDN</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
                <input
                  type="number"
                  name="cacheDuration"
                  value={settings.cacheDuration}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL</label>
                <input
                  type="url"
                  name="cdnUrl"
                  value={settings.cdnUrl}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://cdn.example.com"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Appearance Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex gap-3">
                  <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${settings.theme === 'light' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={settings.theme === 'light'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${settings.theme === 'dark' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={settings.theme === 'dark'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${settings.theme === 'system' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={settings.theme === 'system'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Monitor className="h-5 w-5" />
                    <span>System</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleInputChange}
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleInputChange}
                    className="input-field flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={handleInputChange}
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={handleInputChange}
                    className="input-field flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                <select
                  name="fontFamily"
                  value={settings.fontFamily}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;