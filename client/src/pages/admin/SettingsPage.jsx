


// // client/src/pages/admin/SettingsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import {
//   Save, RefreshCw, Globe, Mail, Lock, Bell, Shield,
//   Database, Cloud, Server, Smartphone, Palette, Moon,
//   Sun, Monitor, Languages, DollarSign, Users, FileText,
//   Image, Video, Music, BookOpen, Headphones, Check,
//   AlertCircle, Loader2, Eye, EyeOff, X, Plus, Trash2,
//   Key, Upload, Link as LinkIcon, CreditCard, Zap
// } from 'lucide-react';
// import settingsAPI from '../../api/settingsAPI';

// const SettingsPage = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const [activeTab, setActiveTab] = useState('general');
//   const [saving, setSaving] = useState(false);
//   const [showSensitiveFields, setShowSensitiveFields] = useState({});
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [newApiKeyName, setNewApiKeyName] = useState('');

//   // Settings state
//   const [settings, setSettings] = useState({
//     // General Settings
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     contactEmail: 'admin@zauqapp.com',
//     contactPhone: '',
//     address: '',
    
//     // Content Settings
//     itemsPerPage: 12,
//     enableComments: true,
//     enableRatings: true,
//     autoApproveContent: false,
//     enableUserUploads: true,
    
//     // Media Settings
//     maxImageSize: 5,
//     maxVideoSize: 500,
//     maxAudioSize: 100,
//     allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
//     allowedVideoFormats: ['mp4', 'webm', 'mov'],
//     allowedAudioFormats: ['mp3', 'wav', 'ogg'],
    
//     // Security Settings
//     enableTwoFactor: false,
//     sessionTimeout: 60,
//     maxLoginAttempts: 5,
//     passwordExpiryDays: 90,
//     enableCaptcha: true,
    
//     // Email Settings
//     smtpHost: '',
//     smtpPort: 587,
//     smtpUser: '',
//     smtpPassword: '',
//     senderEmail: '',
//     senderName: '',
    
//     // API Settings
//     apiKeys: [],
//     webhookUrl: '',
    
//     // Payment Settings
//     currency: 'INR',
//     razorpayKey: '',
//     razorpaySecret: '',
//     stripeKey: '',
//     stripeSecret: '',
    
//     // Cache Settings
//     enableCache: true,
//     cacheDuration: 3600,
//     enableCDN: false,
//     cdnUrl: '',
    
//     // Maintenance Mode
//     maintenanceMode: false,
//     maintenanceMessage: 'Site is under maintenance. Please check back later.',
    
//     // Appearance
//     theme: 'light',
//     primaryColor: '#8B4513',
//     secondaryColor: '#DAA520',
//     fontFamily: 'Inter'
//   });

//   // Fetch settings
//   const { data: settingsData, isLoading, refetch } = useQuery({
//     queryKey: ['settings'],
//     queryFn: () => settingsAPI.getSettings(),
//     enabled: true
//   });

//   useEffect(() => {
//     if (settingsData?.data) {
//       setSettings(prev => ({ ...prev, ...settingsData.data }));
//     }
//   }, [settingsData]);

//   // Update settings mutation
//   const updateSettingsMutation = useMutation({
//     mutationFn: (data) => settingsAPI.updateSettings(data),
//     onSuccess: () => {
//       toast.success('Settings saved successfully');
//       queryClient.invalidateQueries(['settings']);
//       setSaving(false);
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to save settings');
//       setSaving(false);
//     }
//   });

//   const handleSave = async () => {
//     setSaving(true);
//     updateSettingsMutation.mutate(settings);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleArrayChange = (name, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [name]: value.split(',').map(item => item.trim())
//     }));
//   };

//   // File upload handlers
//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingLogo(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'logo');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteLogo: response.data.url }));
//         toast.success('Logo uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload logo');
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   const handleFaviconUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingFavicon(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'favicon');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteFavicon: response.data.url }));
//         toast.success('Favicon uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload favicon');
//     } finally {
//       setUploadingFavicon(false);
//     }
//   };

//   // API Key management
//   const handleGenerateApiKey = async () => {
//     if (!newApiKeyName.trim()) {
//       toast.error('Please enter an API key name');
//       return;
//     }
    
//     try {
//       const response = await settingsAPI.generateApiKey(newApiKeyName);
//       if (response.success) {
//         toast.success('API key generated successfully');
//         setNewApiKeyName('');
//         // Refresh settings
//         const newSettings = await settingsAPI.getSettings();
//         setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to generate API key');
//     }
//   };

//   const handleDeleteApiKey = async (keyId) => {
//     if (!window.confirm('Are you sure you want to delete this API key?')) return;
    
//     try {
//       await settingsAPI.deleteApiKey(keyId);
//       toast.success('API key deleted successfully');
//       // Refresh settings
//       const newSettings = await settingsAPI.getSettings();
//       setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete API key');
//     }
//   };

//   const toggleSensitiveField = (field) => {
//     setShowSensitiveFields(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const tabs = [
//     { id: 'general', label: 'General', icon: Globe },
//     { id: 'content', label: 'Content', icon: FileText },
//     { id: 'media', label: 'Media', icon: Image },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'email', label: 'Email', icon: Mail },
//     { id: 'api', label: 'API', icon: Cloud },
//     { id: 'payment', label: 'Payment', icon: DollarSign },
//     { id: 'cache', label: 'Cache', icon: Database },
//     { id: 'appearance', label: 'Appearance', icon: Palette }
//   ];

//   if (isLoading) {
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//           <p className="text-gray-500">Manage application settings and configurations</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => refetch()}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="h-5 w-5" />
//             <span>Reset</span>
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex overflow-x-auto scrollbar-hide gap-1 border-b border-gray-200">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? 'border-primary-600 text-primary-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Icon className="h-4 w-4" />
//               <span>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Settings Content */}
//       <div className="card p-6">
//         {/* General Settings */}
//         {activeTab === 'general' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
//                 <input
//                   type="text"
//                   name="siteName"
//                   value={settings.siteName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input
//                   type="email"
//                   name="contactEmail"
//                   value={settings.contactEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
//                 <textarea
//                   name="siteDescription"
//                   value={settings.siteDescription}
//                   onChange={handleInputChange}
//                   className="input-field h-24"
//                 />
//               </div>
              
//               {/* Site Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteLogo"
//                     value={settings.siteLogo}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleLogoUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingLogo}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingLogo}
//                     >
//                       {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteLogo && (
//                   <div className="mt-2">
//                     <img src={settings.siteLogo} alt="Logo preview" className="h-12 w-auto rounded border" />
//                   </div>
//                 )}
//               </div>
              
//               {/* Favicon Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteFavicon"
//                     value={settings.siteFavicon}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFaviconUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingFavicon}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingFavicon}
//                     >
//                       {uploadingFavicon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteFavicon && (
//                   <div className="mt-2">
//                     <img src={settings.siteFavicon} alt="Favicon preview" className="h-8 w-8 rounded" />
//                   </div>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input
//                   type="tel"
//                   name="contactPhone"
//                   value={settings.contactPhone}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                 <textarea
//                   name="address"
//                   value={settings.address}
//                   onChange={handleInputChange}
//                   className="input-field h-20"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Content Settings */}
//         {activeTab === 'content' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Content Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
//                 <select
//                   name="itemsPerPage"
//                   value={settings.itemsPerPage}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                   <option value={48}>48</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableComments"
//                     checked={settings.enableComments}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Comments</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableRatings"
//                     checked={settings.enableRatings}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Ratings & Reviews</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="autoApproveContent"
//                     checked={settings.autoApproveContent}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Auto-approve User Content</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableUserUploads"
//                     checked={settings.enableUserUploads}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable User Uploads</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Media Settings */}
//         {activeTab === 'media' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Media Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxImageSize"
//                   value={settings.maxImageSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Video Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxVideoSize"
//                   value={settings.maxVideoSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Audio Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxAudioSize"
//                   value={settings.maxAudioSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Image Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedImageFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedImageFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="jpg, jpeg, png, webp"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Video Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedVideoFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedVideoFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp4, webm, mov"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Audio Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedAudioFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedAudioFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp3, wav, ogg"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Security Settings */}
//         {activeTab === 'security' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
//                 <input
//                   type="number"
//                   name="sessionTimeout"
//                   value={settings.sessionTimeout}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
//                 <input
//                   type="number"
//                   name="maxLoginAttempts"
//                   value={settings.maxLoginAttempts}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
//                 <input
//                   type="number"
//                   name="passwordExpiryDays"
//                   value={settings.passwordExpiryDays}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableTwoFactor"
//                     checked={settings.enableTwoFactor}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCaptcha"
//                     checked={settings.enableCaptcha}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Captcha on Login/Register</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Email Settings */}
//         {activeTab === 'email' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Email Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
//                 <input
//                   type="text"
//                   name="smtpHost"
//                   value={settings.smtpHost}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="smtp.gmail.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
//                 <input
//                   type="number"
//                   name="smtpPort"
//                   value={settings.smtpPort}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
//                 <input
//                   type="text"
//                   name="smtpUser"
//                   value={settings.smtpUser}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.smtpPassword ? 'text' : 'password'}
//                     name="smtpPassword"
//                     value={settings.smtpPassword}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('smtpPassword')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.smtpPassword ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
//                 <input
//                   type="email"
//                   name="senderEmail"
//                   value={settings.senderEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
//                 <input
//                   type="text"
//                   name="senderName"
//                   value={settings.senderName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* API Settings */}
//         {activeTab === 'api' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">API Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
//                 <input
//                   type="url"
//                   name="webhookUrl"
//                   value={settings.webhookUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://your-domain.com/webhook"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">URL where webhook events will be sent</p>
//               </div>
              
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">API Keys</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Key name"
//                       value={newApiKeyName}
//                       onChange={(e) => setNewApiKeyName(e.target.value)}
//                       className="input-field text-sm py-1.5 w-40"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleGenerateApiKey}
//                       className="btn-secondary text-sm flex items-center gap-1"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Generate Key
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   {settings.apiKeys && settings.apiKeys.length > 0 ? (
//                     settings.apiKeys.map((key) => (
//                       <div key={key._id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                         <Key className="h-5 w-5 text-gray-400" />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-900">{key.name}</p>
//                           <p className="text-xs text-gray-500 font-mono">{key.key}</p>
//                           <p className="text-xs text-gray-400">
//                             Created: {new Date(key.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteApiKey(key._id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-6 bg-gray-50 rounded-lg">
//                       <Key className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-500">No API keys generated yet</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                   <h4 className="text-sm font-medium text-blue-800 mb-1">API Usage Instructions</h4>
//                   <p className="text-xs text-blue-600">
//                     Use your API key in the Authorization header: <code className="bg-blue-100 px-1 rounded">Bearer YOUR_API_KEY</code>
//                   </p>
//                   <p className="text-xs text-blue-600 mt-1">
//                     Webhook events will be sent for: payment.success, subscription.renewal, user.registered
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Payment Settings */}
//         {activeTab === 'payment' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Payment Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                 <select
//                   name="currency"
//                   value={settings.currency}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value="INR">Indian Rupee (INR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label>
//                 <input
//                   type="text"
//                   name="razorpayKey"
//                   value={settings.razorpayKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Secret</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.razorpaySecret ? 'text' : 'password'}
//                     name="razorpaySecret"
//                     value={settings.razorpaySecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('razorpaySecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.razorpaySecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
//                 <input
//                   type="text"
//                   name="stripeKey"
//                   value={settings.stripeKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.stripeSecret ? 'text' : 'password'}
//                     name="stripeSecret"
//                     value={settings.stripeSecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('stripeSecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.stripeSecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Cache Settings */}
//         {activeTab === 'cache' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Cache & CDN Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div className="flex flex-col gap-3">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCache"
//                     checked={settings.enableCache}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Caching</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCDN"
//                     checked={settings.enableCDN}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable CDN</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
//                 <input
//                   type="number"
//                   name="cacheDuration"
//                   value={settings.cacheDuration}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">How long to cache content (3600 seconds = 1 hour)</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL</label>
//                 <input
//                   type="url"
//                   name="cdnUrl"
//                   value={settings.cdnUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://cdn.example.com"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Appearance Settings */}
//         {activeTab === 'appearance' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Appearance Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
//                 <div className="flex gap-3">
//                   {['light', 'dark', 'system'].map((themeOption) => (
//                     <label
//                       key={themeOption}
//                       className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
//                         settings.theme === themeOption
//                           ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="theme"
//                         value={themeOption}
//                         checked={settings.theme === themeOption}
//                         onChange={handleInputChange}
//                         className="hidden"
//                       />
//                       {themeOption === 'light' && <Sun className="h-5 w-5" />}
//                       {themeOption === 'dark' && <Moon className="h-5 w-5" />}
//                       {themeOption === 'system' && <Monitor className="h-5 w-5" />}
//                       <span className="capitalize">{themeOption}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="primaryColor"
//                     value={settings.primaryColor}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="primaryColor"
//                     value={settings.primaryColor}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded" style={{ backgroundColor: settings.primaryColor }} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="secondaryColor"
//                     value={settings.secondaryColor}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="secondaryColor"
//                     value={settings.secondaryColor}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded" style={{ backgroundColor: settings.secondaryColor }} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
//                 <select
//                   name="fontFamily"
//                   value={settings.fontFamily}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   style={{ fontFamily: settings.fontFamily }}
//                 >
//                   <option value="Inter">Inter</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                   <option value="Open Sans">Open Sans</option>
//                   <option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu</option>
//                 </select>
//                 <p className="text-sm mt-2 text-gray-500" style={{ fontFamily: settings.fontFamily }}>
//                   Preview: The quick brown fox jumps over the lazy dog
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;




















// // client/src/pages/admin/SettingsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import {
//   Save, RefreshCw, Globe, Mail, Lock, Bell, Shield,
//   Database, Cloud, Server, Smartphone, Palette, Moon,
//   Sun, Monitor, Languages, DollarSign, Users, FileText,
//   Image, Video, Music, BookOpen, Headphones, Check,
//   AlertCircle, Loader2, Eye, EyeOff, X, Plus, Trash2,
//   Key, Upload, Link as LinkIcon, CreditCard, Zap
// } from 'lucide-react';
// import settingsAPI from '../../api/settingsAPI';

// const SettingsPage = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   //const [activeTab, setActiveTab] useState('general');
//   const [activeTab, setActiveTab] = useState('general');  // ✅ Correct
//   const [saving, setSaving] = useState(false);
//   const [showSensitiveFields, setShowSensitiveFields] = useState({});
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [newApiKeyName, setNewApiKeyName] = useState('');

//   // Settings state
//   const [settings, setSettings] = useState({
//     // General Settings
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     contactEmail: 'admin@zauqapp.com',
//     contactPhone: '',
//     address: '',
    
//     // Content Settings
//     itemsPerPage: 12,
//     enableComments: true,
//     enableRatings: true,
//     autoApproveContent: false,
//     enableUserUploads: true,
    
//     // Media Settings
//     maxImageSize: 5,
//     maxVideoSize: 500,
//     maxAudioSize: 100,
//     allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
//     allowedVideoFormats: ['mp4', 'webm', 'mov'],
//     allowedAudioFormats: ['mp3', 'wav', 'ogg'],
    
//     // Security Settings
//     enableTwoFactor: false,
//     sessionTimeout: 60,
//     maxLoginAttempts: 5,
//     passwordExpiryDays: 90,
//     enableCaptcha: true,
    
//     // Email Settings
//     smtpHost: '',
//     smtpPort: 587,
//     smtpUser: '',
//     smtpPassword: '',
//     senderEmail: '',
//     senderName: '',
    
//     // API Settings
//     apiKeys: [],
//     webhookUrl: '',
    
//     // Payment Settings
//     currency: 'INR',
//     razorpayKey: '',
//     razorpaySecret: '',
//     stripeKey: '',
//     stripeSecret: '',
    
//     // Cache Settings
//     enableCache: true,
//     cacheDuration: 3600,
//     enableCDN: false,
//     cdnUrl: '',
    
//     // Maintenance Mode
//     maintenanceMode: false,
//     maintenanceMessage: 'Site is under maintenance. Please check back later.',
    
//     // Appearance
//     theme: 'light',
//     primaryColor: '#8B4513',
//     secondaryColor: '#DAA520',
//     fontFamily: 'Inter'
//   });

//   // Fetch settings
//   const { data: settingsData, isLoading, refetch } = useQuery({
//     queryKey: ['settings'],
//     queryFn: () => settingsAPI.getSettings(),
//     enabled: true
//   });

//   // FIX 1: Improved data loading with better error handling and defaults
//   useEffect(() => {
//     if (settingsData?.data) {
//       const loadedData = settingsData.data;
//       console.log('✅ Settings loaded:', loadedData); // Debug log
      
//       setSettings(prev => ({
//         ...prev,
//         // General Settings
//         siteName: loadedData.siteName || prev.siteName,
//         siteDescription: loadedData.siteDescription || prev.siteDescription,
//         siteLogo: loadedData.siteLogo || '',
//         siteFavicon: loadedData.siteFavicon || '',
//         contactEmail: loadedData.contactEmail || prev.contactEmail,
//         contactPhone: loadedData.contactPhone || '',
//         address: loadedData.address || '',
        
//         // Content Settings
//         itemsPerPage: loadedData.itemsPerPage || 12,
//         enableComments: loadedData.enableComments !== undefined ? loadedData.enableComments : true,
//         enableRatings: loadedData.enableRatings !== undefined ? loadedData.enableRatings : true,
//         autoApproveContent: loadedData.autoApproveContent || false,
//         enableUserUploads: loadedData.enableUserUploads !== undefined ? loadedData.enableUserUploads : true,
        
//         // Media Settings
//         maxImageSize: loadedData.maxImageSize || 5,
//         maxVideoSize: loadedData.maxVideoSize || 500,
//         maxAudioSize: loadedData.maxAudioSize || 100,
//         allowedImageFormats: loadedData.allowedImageFormats || ['jpg', 'jpeg', 'png', 'webp'],
//         allowedVideoFormats: loadedData.allowedVideoFormats || ['mp4', 'webm', 'mov'],
//         allowedAudioFormats: loadedData.allowedAudioFormats || ['mp3', 'wav', 'ogg'],
        
//         // Security Settings
//         enableTwoFactor: loadedData.enableTwoFactor || false,
//         sessionTimeout: loadedData.sessionTimeout || 60,
//         maxLoginAttempts: loadedData.maxLoginAttempts || 5,
//         passwordExpiryDays: loadedData.passwordExpiryDays || 90,
//         enableCaptcha: loadedData.enableCaptcha !== undefined ? loadedData.enableCaptcha : true,
        
//         // Email Settings
//         smtpHost: loadedData.smtpHost || '',
//         smtpPort: loadedData.smtpPort || 587,
//         smtpUser: loadedData.smtpUser || '',
//         smtpPassword: loadedData.smtpPassword || '',
//         senderEmail: loadedData.senderEmail || '',
//         senderName: loadedData.senderName || '',
        
//         // API Settings
//         apiKeys: loadedData.apiKeys || [],
//         webhookUrl: loadedData.webhookUrl || '',
        
//         // Payment Settings
//         currency: loadedData.currency || 'INR',
//         razorpayKey: loadedData.razorpayKey || '',
//         razorpaySecret: loadedData.razorpaySecret || '',
//         stripeKey: loadedData.stripeKey || '',
//         stripeSecret: loadedData.stripeSecret || '',
        
//         // Cache Settings
//         enableCache: loadedData.enableCache !== undefined ? loadedData.enableCache : true,
//         cacheDuration: loadedData.cacheDuration || 3600,
//         enableCDN: loadedData.enableCDN || false,
//         cdnUrl: loadedData.cdnUrl || '',
        
//         // Maintenance Mode
//         maintenanceMode: loadedData.maintenanceMode || false,
//         maintenanceMessage: loadedData.maintenanceMessage || 'Site is under maintenance. Please check back later.',
        
//         // Appearance
//         theme: loadedData.theme || 'light',
//         primaryColor: loadedData.primaryColor || '#8B4513',
//         secondaryColor: loadedData.secondaryColor || '#DAA520',
//         fontFamily: loadedData.fontFamily || 'Inter'
//       }));
//     }
//   }, [settingsData]);

//   // Update settings mutation
//   const updateSettingsMutation = useMutation({
//     mutationFn: (data) => settingsAPI.updateSettings(data),
//     onSuccess: () => {
//       toast.success('Settings saved successfully');
//       queryClient.invalidateQueries(['settings']);
//       setSaving(false);
//     },
//     onError: (error) => {
//       console.error('Save error:', error);
//       toast.error(error.response?.data?.message || 'Failed to save settings');
//       setSaving(false);
//     }
//   });

//   const handleSave = async () => {
//     console.log('💾 Saving settings:', settings); // Debug log
//     setSaving(true);
//     updateSettingsMutation.mutate(settings);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     console.log(`📝 Field changed: ${name} = ${type === 'checkbox' ? checked : value}`); // Debug log
//     setSettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleArrayChange = (name, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [name]: value.split(',').map(item => item.trim())
//     }));
//   };

//   // File upload handlers
//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingLogo(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'logo');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteLogo: response.data.url }));
//         toast.success('Logo uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload logo');
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   const handleFaviconUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingFavicon(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'favicon');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteFavicon: response.data.url }));
//         toast.success('Favicon uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload favicon');
//     } finally {
//       setUploadingFavicon(false);
//     }
//   };

//   // API Key management
//   const handleGenerateApiKey = async () => {
//     if (!newApiKeyName.trim()) {
//       toast.error('Please enter an API key name');
//       return;
//     }
    
//     try {
//       const response = await settingsAPI.generateApiKey(newApiKeyName);
//       if (response.success) {
//         toast.success('API key generated successfully');
//         setNewApiKeyName('');
//         // Refresh settings
//         const newSettings = await settingsAPI.getSettings();
//         setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to generate API key');
//     }
//   };

//   const handleDeleteApiKey = async (keyId) => {
//     if (!window.confirm('Are you sure you want to delete this API key?')) return;
    
//     try {
//       await settingsAPI.deleteApiKey(keyId);
//       toast.success('API key deleted successfully');
//       // Refresh settings
//       const newSettings = await settingsAPI.getSettings();
//       setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete API key');
//     }
//   };

//   const toggleSensitiveField = (field) => {
//     setShowSensitiveFields(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const tabs = [
//     { id: 'general', label: 'General', icon: Globe },
//     { id: 'content', label: 'Content', icon: FileText },
//     { id: 'media', label: 'Media', icon: Image },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'email', label: 'Email', icon: Mail },
//     { id: 'api', label: 'API', icon: Cloud },
//     { id: 'payment', label: 'Payment', icon: DollarSign },
//     { id: 'cache', label: 'Cache', icon: Database },
//     { id: 'appearance', label: 'Appearance', icon: Palette }
//   ];

//   if (isLoading) {
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//           <p className="text-gray-500">Manage application settings and configurations</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => refetch()}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="h-5 w-5" />
//             <span>Reset</span>
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex overflow-x-auto scrollbar-hide gap-1 border-b border-gray-200">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? 'border-primary-600 text-primary-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Icon className="h-4 w-4" />
//               <span>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Settings Content */}
//       <div className="card p-6">
//         {/* General Settings */}
//         {activeTab === 'general' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
//                 <input
//                   type="text"
//                   name="siteName"
//                   value={settings.siteName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input
//                   type="email"
//                   name="contactEmail"
//                   value={settings.contactEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
//                 <textarea
//                   name="siteDescription"
//                   value={settings.siteDescription}
//                   onChange={handleInputChange}
//                   className="input-field h-24"
//                 />
//               </div>
              
//               {/* Site Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteLogo"
//                     value={settings.siteLogo}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleLogoUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingLogo}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingLogo}
//                     >
//                       {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteLogo && (
//                   <div className="mt-2">
//                     <img src={settings.siteLogo} alt="Logo preview" className="h-12 w-auto rounded border" />
//                   </div>
//                 )}
//               </div>
              
//               {/* Favicon Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteFavicon"
//                     value={settings.siteFavicon}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFaviconUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingFavicon}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingFavicon}
//                     >
//                       {uploadingFavicon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteFavicon && (
//                   <div className="mt-2">
//                     <img src={settings.siteFavicon} alt="Favicon preview" className="h-8 w-8 rounded" />
//                   </div>
//                 )}
//               </div>
              
//               {/* FIX 2: Contact Phone - Ensure value is properly bound */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input
//                   type="tel"
//                   name="contactPhone"
//                   value={settings.contactPhone || ''}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="+91 XXXXXXXXXX"
//                 />
//               </div>
              
//               {/* FIX 3: Address - Ensure value is properly bound */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                 <textarea
//                   name="address"
//                   value={settings.address || ''}
//                   onChange={handleInputChange}
//                   className="input-field h-20"
//                   placeholder="Enter full address"
//                   rows={3}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Content Settings - Keep as is */}
//         {activeTab === 'content' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Content Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
//                 <select
//                   name="itemsPerPage"
//                   value={settings.itemsPerPage}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                   <option value={48}>48</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableComments"
//                     checked={settings.enableComments}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Comments</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableRatings"
//                     checked={settings.enableRatings}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Ratings & Reviews</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="autoApproveContent"
//                     checked={settings.autoApproveContent}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Auto-approve User Content</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableUserUploads"
//                     checked={settings.enableUserUploads}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable User Uploads</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Media Settings - Keep as is */}
//         {activeTab === 'media' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Media Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxImageSize"
//                   value={settings.maxImageSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Video Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxVideoSize"
//                   value={settings.maxVideoSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Audio Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxAudioSize"
//                   value={settings.maxAudioSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Image Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedImageFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedImageFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="jpg, jpeg, png, webp"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Video Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedVideoFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedVideoFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp4, webm, mov"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Audio Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedAudioFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedAudioFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp3, wav, ogg"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Security Settings - Keep as is */}
//         {activeTab === 'security' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
//                 <input
//                   type="number"
//                   name="sessionTimeout"
//                   value={settings.sessionTimeout}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
//                 <input
//                   type="number"
//                   name="maxLoginAttempts"
//                   value={settings.maxLoginAttempts}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
//                 <input
//                   type="number"
//                   name="passwordExpiryDays"
//                   value={settings.passwordExpiryDays}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableTwoFactor"
//                     checked={settings.enableTwoFactor}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCaptcha"
//                     checked={settings.enableCaptcha}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Captcha on Login/Register</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Email Settings - Keep as is */}
//         {activeTab === 'email' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Email Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
//                 <input
//                   type="text"
//                   name="smtpHost"
//                   value={settings.smtpHost}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="smtp.gmail.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
//                 <input
//                   type="number"
//                   name="smtpPort"
//                   value={settings.smtpPort}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
//                 <input
//                   type="text"
//                   name="smtpUser"
//                   value={settings.smtpUser}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.smtpPassword ? 'text' : 'password'}
//                     name="smtpPassword"
//                     value={settings.smtpPassword}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('smtpPassword')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.smtpPassword ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
//                 <input
//                   type="email"
//                   name="senderEmail"
//                   value={settings.senderEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
//                 <input
//                   type="text"
//                   name="senderName"
//                   value={settings.senderName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* API Settings - Keep as is */}
//         {activeTab === 'api' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">API Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
//                 <input
//                   type="url"
//                   name="webhookUrl"
//                   value={settings.webhookUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://your-domain.com/webhook"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">URL where webhook events will be sent</p>
//               </div>
              
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">API Keys</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Key name"
//                       value={newApiKeyName}
//                       onChange={(e) => setNewApiKeyName(e.target.value)}
//                       className="input-field text-sm py-1.5 w-40"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleGenerateApiKey}
//                       className="btn-secondary text-sm flex items-center gap-1"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Generate Key
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   {settings.apiKeys && settings.apiKeys.length > 0 ? (
//                     settings.apiKeys.map((key) => (
//                       <div key={key._id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                         <Key className="h-5 w-5 text-gray-400" />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-900">{key.name}</p>
//                           <p className="text-xs text-gray-500 font-mono">{key.key}</p>
//                           <p className="text-xs text-gray-400">
//                             Created: {new Date(key.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteApiKey(key._id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-6 bg-gray-50 rounded-lg">
//                       <Key className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-500">No API keys generated yet</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                   <h4 className="text-sm font-medium text-blue-800 mb-1">API Usage Instructions</h4>
//                   <p className="text-xs text-blue-600">
//                     Use your API key in the Authorization header: <code className="bg-blue-100 px-1 rounded">Bearer YOUR_API_KEY</code>
//                   </p>
//                   <p className="text-xs text-blue-600 mt-1">
//                     Webhook events will be sent for: payment.success, subscription.renewal, user.registered
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Payment Settings - Keep as is */}
//         {activeTab === 'payment' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Payment Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                 <select
//                   name="currency"
//                   value={settings.currency}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value="INR">Indian Rupee (INR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label>
//                 <input
//                   type="text"
//                   name="razorpayKey"
//                   value={settings.razorpayKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Secret</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.razorpaySecret ? 'text' : 'password'}
//                     name="razorpaySecret"
//                     value={settings.razorpaySecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('razorpaySecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.razorpaySecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
//                 <input
//                   type="text"
//                   name="stripeKey"
//                   value={settings.stripeKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.stripeSecret ? 'text' : 'password'}
//                     name="stripeSecret"
//                     value={settings.stripeSecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('stripeSecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.stripeSecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Cache Settings - Keep as is */}
//         {activeTab === 'cache' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Cache & CDN Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div className="flex flex-col gap-3">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCache"
//                     checked={settings.enableCache}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Caching</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCDN"
//                     checked={settings.enableCDN}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable CDN</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
//                 <input
//                   type="number"
//                   name="cacheDuration"
//                   value={settings.cacheDuration}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">How long to cache content (3600 seconds = 1 hour)</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL</label>
//                 <input
//                   type="url"
//                   name="cdnUrl"
//                   value={settings.cdnUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://cdn.example.com"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* FIX 4: Appearance Settings - Ensure colors display correctly */}
//         {activeTab === 'appearance' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Appearance Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Theme Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
//                 <div className="flex gap-3">
//                   {['light', 'dark', 'system'].map((themeOption) => (
//                     <label
//                       key={themeOption}
//                       className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
//                         settings.theme === themeOption
//                           ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="theme"
//                         value={themeOption}
//                         checked={settings.theme === themeOption}
//                         onChange={handleInputChange}
//                         className="hidden"
//                       />
//                       {themeOption === 'light' && <Sun className="h-5 w-5" />}
//                       {themeOption === 'dark' && <Moon className="h-5 w-5" />}
//                       {themeOption === 'system' && <Monitor className="h-5 w-5" />}
//                       <span className="capitalize">{themeOption}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Primary Color - Fixed display */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="primaryColor"
//                     value={settings.primaryColor || '#8B4513'}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="primaryColor"
//                     value={settings.primaryColor || '#8B4513'}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="#8B4513"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.primaryColor || '#8B4513' }} />
//               </div>
              
//               {/* Secondary Color - Fixed display */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="secondaryColor"
//                     value={settings.secondaryColor || '#DAA520'}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="secondaryColor"
//                     value={settings.secondaryColor || '#DAA520'}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="#DAA520"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.secondaryColor || '#DAA520' }} />
//               </div>
              
//               {/* Font Family */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
//                 <select
//                   name="fontFamily"
//                   value={settings.fontFamily || 'Inter'}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   style={{ fontFamily: settings.fontFamily || 'Inter' }}
//                 >
//                   <option value="Inter">Inter</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                   <option value="Open Sans">Open Sans</option>
//                   <option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu</option>
//                 </select>
//                 <p className="text-sm mt-2 text-gray-500" style={{ fontFamily: settings.fontFamily || 'Inter' }}>
//                   Preview: The quick brown fox jumps over the lazy dog
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;



















// // client/src/pages/admin/SettingsPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import {
//   Save, RefreshCw, Globe, Mail, Lock, Bell, Shield,
//   Database, Cloud, Server, Smartphone, Palette, Moon,
//   Sun, Monitor, Languages, DollarSign, Users, FileText,
//   Image, Video, Music, BookOpen, Headphones, Check,
//   AlertCircle, Loader2, Eye, EyeOff, X, Plus, Trash2,
//   Key, Upload, Link as LinkIcon, CreditCard, Zap
// } from 'lucide-react';
// import settingsAPI from '../../api/settingsAPI';

// const SettingsPage = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const [activeTab, setActiveTab] = useState('general');
//   const [saving, setSaving] = useState(false);
//   const [showSensitiveFields, setShowSensitiveFields] = useState({});
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [newApiKeyName, setNewApiKeyName] = useState('');

//   // Settings state
//   const [settings, setSettings] = useState({
//     // General Settings
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     contactEmail: 'admin@zauqapp.com',
//     contactPhone: '',
//     address: '',
    
//     // Content Settings
//     itemsPerPage: 12,
//     enableComments: true,
//     enableRatings: true,
//     autoApproveContent: false,
//     enableUserUploads: true,
    
//     // Media Settings
//     maxImageSize: 5,
//     maxVideoSize: 500,
//     maxAudioSize: 100,
//     allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
//     allowedVideoFormats: ['mp4', 'webm', 'mov'],
//     allowedAudioFormats: ['mp3', 'wav', 'ogg'],
    
//     // Security Settings
//     enableTwoFactor: false,
//     sessionTimeout: 60,
//     maxLoginAttempts: 5,
//     passwordExpiryDays: 90,
//     enableCaptcha: true,
    
//     // Email Settings
//     smtpHost: '',
//     smtpPort: 587,
//     smtpUser: '',
//     smtpPassword: '',
//     senderEmail: '',
//     senderName: '',
    
//     // API Settings
//     apiKeys: [],
//     webhookUrl: '',
    
//     // Payment Settings
//     currency: 'INR',
//     razorpayKey: '',
//     razorpaySecret: '',
//     stripeKey: '',
//     stripeSecret: '',
    
//     // Cache Settings
//     enableCache: true,
//     cacheDuration: 3600,
//     enableCDN: false,
//     cdnUrl: '',
    
//     // Maintenance Mode
//     maintenanceMode: false,
//     maintenanceMessage: 'Site is under maintenance. Please check back later.',
    
//     // Appearance
//     theme: 'light',
//     primaryColor: '#8B4513',
//     secondaryColor: '#DAA520',
//     fontFamily: 'Inter'
//   });

//   // Fetch settings
//   const { data: settingsData, isLoading, refetch, error: fetchError } = useQuery({
//     queryKey: ['settings'],
//     queryFn: async () => {
//       console.log('🔵 Fetching settings...');
//       try {
//         const result = await settingsAPI.getSettings();
//         console.log('🟢 Settings fetched successfully:', result);
//         return result;
//       } catch (err) {
//         console.error('🔴 Failed to fetch settings:', err);
//         throw err;
//       }
//     },
//     enabled: true
//   });

//   // FIX 1: Improved data loading with better error handling and defaults
//   useEffect(() => {
//     if (fetchError) {
//       console.error('❌ Settings fetch error:', fetchError);
//       toast.error('Failed to load settings. Please refresh the page.');
//     }
    
//     if (settingsData?.data) {
//       const loadedData = settingsData.data;
//       console.log('✅ Settings loaded:', loadedData);
      
//       setSettings(prev => ({
//         ...prev,
//         siteName: loadedData.siteName || prev.siteName,
//         siteDescription: loadedData.siteDescription || prev.siteDescription,
//         siteLogo: loadedData.siteLogo || '',
//         siteFavicon: loadedData.siteFavicon || '',
//         contactEmail: loadedData.contactEmail || prev.contactEmail,
//         contactPhone: loadedData.contactPhone || '',
//         address: loadedData.address || '',
//         itemsPerPage: loadedData.itemsPerPage || 12,
//         enableComments: loadedData.enableComments !== undefined ? loadedData.enableComments : true,
//         enableRatings: loadedData.enableRatings !== undefined ? loadedData.enableRatings : true,
//         autoApproveContent: loadedData.autoApproveContent || false,
//         enableUserUploads: loadedData.enableUserUploads !== undefined ? loadedData.enableUserUploads : true,
//         maxImageSize: loadedData.maxImageSize || 5,
//         maxVideoSize: loadedData.maxVideoSize || 500,
//         maxAudioSize: loadedData.maxAudioSize || 100,
//         allowedImageFormats: loadedData.allowedImageFormats || ['jpg', 'jpeg', 'png', 'webp'],
//         allowedVideoFormats: loadedData.allowedVideoFormats || ['mp4', 'webm', 'mov'],
//         allowedAudioFormats: loadedData.allowedAudioFormats || ['mp3', 'wav', 'ogg'],
//         enableTwoFactor: loadedData.enableTwoFactor || false,
//         sessionTimeout: loadedData.sessionTimeout || 60,
//         maxLoginAttempts: loadedData.maxLoginAttempts || 5,
//         passwordExpiryDays: loadedData.passwordExpiryDays || 90,
//         enableCaptcha: loadedData.enableCaptcha !== undefined ? loadedData.enableCaptcha : true,
//         smtpHost: loadedData.smtpHost || '',
//         smtpPort: loadedData.smtpPort || 587,
//         smtpUser: loadedData.smtpUser || '',
//         smtpPassword: loadedData.smtpPassword || '',
//         senderEmail: loadedData.senderEmail || '',
//         senderName: loadedData.senderName || '',
//         apiKeys: loadedData.apiKeys || [],
//         webhookUrl: loadedData.webhookUrl || '',
//         currency: loadedData.currency || 'INR',
//         razorpayKey: loadedData.razorpayKey || '',
//         razorpaySecret: loadedData.razorpaySecret || '',
//         stripeKey: loadedData.stripeKey || '',
//         stripeSecret: loadedData.stripeSecret || '',
//         enableCache: loadedData.enableCache !== undefined ? loadedData.enableCache : true,
//         cacheDuration: loadedData.cacheDuration || 3600,
//         enableCDN: loadedData.enableCDN || false,
//         cdnUrl: loadedData.cdnUrl || '',
//         maintenanceMode: loadedData.maintenanceMode || false,
//         maintenanceMessage: loadedData.maintenanceMessage || 'Site is under maintenance. Please check back later.',
//         theme: loadedData.theme || 'light',
//         primaryColor: loadedData.primaryColor || '#8B4513',
//         secondaryColor: loadedData.secondaryColor || '#DAA520',
//         fontFamily: loadedData.fontFamily || 'Inter'
//       }));
//     }
//   }, [settingsData, fetchError]);

//   // ============================================
//   // 🔴 FIX: IMPROVED UPDATE SETTINGS MUTATION WITH BETTER ERROR HANDLING
//   // ============================================
//   const updateSettingsMutation = useMutation({
//     mutationFn: async (data) => {
//       console.log('🔵 Mutation: Sending update request with data:', JSON.stringify(data, null, 2));
//       console.log('🔵 Data keys being sent:', Object.keys(data));
      
//       try {
//         const result = await settingsAPI.updateSettings(data);
//         console.log('🟢 Mutation: API response:', result);
//         return result;
//       } catch (error) {
//         console.error('🔴 Mutation: API call failed:', error);
//         console.error('🔴 Error response data:', error.response?.data);
//         console.error('🔴 Error status:', error.response?.status);
//         console.error('🔴 Error headers:', error.response?.headers);
//         throw error;
//       }
//     },
//     onSuccess: (response) => {
//       console.log('✅ Mutation onSuccess - Settings saved successfully:', response);
      
//       if (response?.success) {
//         toast.success('Settings saved successfully!');
//         // Refresh the settings data
//         queryClient.invalidateQueries(['settings']);
//       } else {
//         console.warn('⚠️ Mutation onSuccess but success flag false:', response);
//         toast.warning(response?.message || 'Settings saved but with warnings');
//       }
//       setSaving(false);
//     },
//     onError: (error) => {
//       console.error('❌ Mutation onError - Failed to save settings:', error);
      
//       // Extract detailed error message
//       let errorMessage = 'Failed to save settings';
      
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       // Check for validation errors
//       if (error.response?.data?.errors) {
//         const validationErrors = Object.values(error.response.data.errors).join(', ');
//         errorMessage = `Validation failed: ${validationErrors}`;
//       }
      
//       // Check for network errors
//       if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout. Please check your network connection.';
//       } else if (error.message === 'Network Error') {
//         errorMessage = 'Network error. Please check if the server is running.';
//       }
      
//       toast.error(errorMessage);
//       setSaving(false);
//     }
//   });

//   const handleSave = async () => {
//     console.log('💾 ========================================');
//     console.log('💾 User clicked Save button');
//     console.log('💾 Current settings state:', JSON.stringify(settings, null, 2));
//     console.log('💾 ========================================');
    
//     // Validate required fields
//     if (!settings.siteName || settings.siteName.trim() === '') {
//       toast.error('Site Name is required');
//       return;
//     }
    
//     if (!settings.contactEmail || settings.contactEmail.trim() === '') {
//       toast.error('Contact Email is required');
//       return;
//     }
    
//     setSaving(true);
//     updateSettingsMutation.mutate(settings);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     console.log(`📝 Field changed: ${name} = ${type === 'checkbox' ? checked : value}`);
//     setSettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleArrayChange = (name, value) => {
//     console.log(`📝 Array field changed: ${name} = ${value}`);
//     setSettings(prev => ({
//       ...prev,
//       [name]: value.split(',').map(item => item.trim())
//     }));
//   };

//   // File upload handlers
//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingLogo(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'logo');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteLogo: response.data.url }));
//         toast.success('Logo uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload logo');
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   const handleFaviconUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }
    
//     setUploadingFavicon(true);
//     try {
//       const response = await settingsAPI.uploadLogo(file, 'favicon');
//       if (response.success) {
//         setSettings(prev => ({ ...prev, siteFavicon: response.data.url }));
//         toast.success('Favicon uploaded successfully');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to upload favicon');
//     } finally {
//       setUploadingFavicon(false);
//     }
//   };

//   // API Key management
//   const handleGenerateApiKey = async () => {
//     if (!newApiKeyName.trim()) {
//       toast.error('Please enter an API key name');
//       return;
//     }
    
//     try {
//       const response = await settingsAPI.generateApiKey(newApiKeyName);
//       if (response.success) {
//         toast.success('API key generated successfully');
//         setNewApiKeyName('');
//         // Refresh settings
//         const newSettings = await settingsAPI.getSettings();
//         setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to generate API key');
//     }
//   };

//   const handleDeleteApiKey = async (keyId) => {
//     if (!window.confirm('Are you sure you want to delete this API key?')) return;
    
//     try {
//       await settingsAPI.deleteApiKey(keyId);
//       toast.success('API key deleted successfully');
//       // Refresh settings
//       const newSettings = await settingsAPI.getSettings();
//       setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to delete API key');
//     }
//   };

//   const toggleSensitiveField = (field) => {
//     setShowSensitiveFields(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   const tabs = [
//     { id: 'general', label: 'General', icon: Globe },
//     { id: 'content', label: 'Content', icon: FileText },
//     { id: 'media', label: 'Media', icon: Image },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'email', label: 'Email', icon: Mail },
//     { id: 'api', label: 'API', icon: Cloud },
//     { id: 'payment', label: 'Payment', icon: DollarSign },
//     { id: 'cache', label: 'Cache', icon: Database },
//     { id: 'appearance', label: 'Appearance', icon: Palette }
//   ];

//   // Show loading state
//   if (isLoading) {
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
//           <p className="text-gray-500">Manage application settings and configurations</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => refetch()}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="h-5 w-5" />
//             <span>Reset</span>
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="btn-primary inline-flex items-center space-x-2"
//           >
//             {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex overflow-x-auto scrollbar-hide gap-1 border-b border-gray-200">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? 'border-primary-600 text-primary-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Icon className="h-4 w-4" />
//               <span>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Settings Content */}
//       <div className="card p-6">
//         {/* General Settings */}
//         {activeTab === 'general' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
//                 <input
//                   type="text"
//                   name="siteName"
//                   value={settings.siteName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//                 <input
//                   type="email"
//                   name="contactEmail"
//                   value={settings.contactEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
//                 <textarea
//                   name="siteDescription"
//                   value={settings.siteDescription}
//                   onChange={handleInputChange}
//                   className="input-field h-24"
//                 />
//               </div>
              
//               {/* Site Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteLogo"
//                     value={settings.siteLogo}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleLogoUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingLogo}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingLogo}
//                     >
//                       {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteLogo && (
//                   <div className="mt-2">
//                     <img src={settings.siteLogo} alt="Logo preview" className="h-12 w-auto rounded border" />
//                   </div>
//                 )}
//               </div>
              
//               {/* Favicon Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
//                 <div className="flex gap-2 items-start">
//                   <input
//                     type="url"
//                     name="siteFavicon"
//                     value={settings.siteFavicon}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="https://..."
//                   />
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFaviconUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                       disabled={uploadingFavicon}
//                     />
//                     <button
//                       type="button"
//                       className="btn-outline flex items-center gap-2"
//                       disabled={uploadingFavicon}
//                     >
//                       {uploadingFavicon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
//                       Upload
//                     </button>
//                   </div>
//                 </div>
//                 {settings.siteFavicon && (
//                   <div className="mt-2">
//                     <img src={settings.siteFavicon} alt="Favicon preview" className="h-8 w-8 rounded" />
//                   </div>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input
//                   type="tel"
//                   name="contactPhone"
//                   value={settings.contactPhone || ''}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="+91 XXXXXXXXXX"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                 <textarea
//                   name="address"
//                   value={settings.address || ''}
//                   onChange={handleInputChange}
//                   className="input-field h-20"
//                   placeholder="Enter full address"
//                   rows={3}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Content Settings */}
//         {activeTab === 'content' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Content Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
//                 <select
//                   name="itemsPerPage"
//                   value={settings.itemsPerPage}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value={6}>6</option>
//                   <option value={12}>12</option>
//                   <option value={24}>24</option>
//                   <option value={48}>48</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableComments"
//                     checked={settings.enableComments}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Comments</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableRatings"
//                     checked={settings.enableRatings}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Ratings & Reviews</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="autoApproveContent"
//                     checked={settings.autoApproveContent}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Auto-approve User Content</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableUserUploads"
//                     checked={settings.enableUserUploads}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable User Uploads</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Media Settings */}
//         {activeTab === 'media' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Media Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxImageSize"
//                   value={settings.maxImageSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Video Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxVideoSize"
//                   value={settings.maxVideoSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Audio Size (MB)</label>
//                 <input
//                   type="number"
//                   name="maxAudioSize"
//                   value={settings.maxAudioSize}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Image Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedImageFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedImageFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="jpg, jpeg, png, webp"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Video Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedVideoFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedVideoFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp4, webm, mov"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Audio Formats</label>
//                 <input
//                   type="text"
//                   value={settings.allowedAudioFormats.join(', ')}
//                   onChange={(e) => handleArrayChange('allowedAudioFormats', e.target.value)}
//                   className="input-field"
//                   placeholder="mp3, wav, ogg"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Security Settings */}
//         {activeTab === 'security' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
//                 <input
//                   type="number"
//                   name="sessionTimeout"
//                   value={settings.sessionTimeout}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
//                 <input
//                   type="number"
//                   name="maxLoginAttempts"
//                   value={settings.maxLoginAttempts}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
//                 <input
//                   type="number"
//                   name="passwordExpiryDays"
//                   value={settings.passwordExpiryDays}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div className="flex flex-col gap-3 pt-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableTwoFactor"
//                     checked={settings.enableTwoFactor}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCaptcha"
//                     checked={settings.enableCaptcha}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Captcha on Login/Register</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Email Settings */}
//         {activeTab === 'email' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Email Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
//                 <input
//                   type="text"
//                   name="smtpHost"
//                   value={settings.smtpHost}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="smtp.gmail.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
//                 <input
//                   type="number"
//                   name="smtpPort"
//                   value={settings.smtpPort}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
//                 <input
//                   type="text"
//                   name="smtpUser"
//                   value={settings.smtpUser}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.smtpPassword ? 'text' : 'password'}
//                     name="smtpPassword"
//                     value={settings.smtpPassword}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('smtpPassword')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.smtpPassword ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
//                 <input
//                   type="email"
//                   name="senderEmail"
//                   value={settings.senderEmail}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
//                 <input
//                   type="text"
//                   name="senderName"
//                   value={settings.senderName}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* API Settings */}
//         {activeTab === 'api' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">API Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
//                 <input
//                   type="url"
//                   name="webhookUrl"
//                   value={settings.webhookUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://your-domain.com/webhook"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">URL where webhook events will be sent</p>
//               </div>
              
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">API Keys</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Key name"
//                       value={newApiKeyName}
//                       onChange={(e) => setNewApiKeyName(e.target.value)}
//                       className="input-field text-sm py-1.5 w-40"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleGenerateApiKey}
//                       className="btn-secondary text-sm flex items-center gap-1"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Generate Key
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   {settings.apiKeys && settings.apiKeys.length > 0 ? (
//                     settings.apiKeys.map((key) => (
//                       <div key={key._id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                         <Key className="h-5 w-5 text-gray-400" />
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-900">{key.name}</p>
//                           <p className="text-xs text-gray-500 font-mono">{key.key}</p>
//                           <p className="text-xs text-gray-400">
//                             Created: {new Date(key.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteApiKey(key._id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-6 bg-gray-50 rounded-lg">
//                       <Key className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-500">No API keys generated yet</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                   <h4 className="text-sm font-medium text-blue-800 mb-1">API Usage Instructions</h4>
//                   <p className="text-xs text-blue-600">
//                     Use your API key in the Authorization header: <code className="bg-blue-100 px-1 rounded">Bearer YOUR_API_KEY</code>
//                   </p>
//                   <p className="text-xs text-blue-600 mt-1">
//                     Webhook events will be sent for: payment.success, subscription.renewal, user.registered
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Payment Settings */}
//         {activeTab === 'payment' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Payment Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                 <select
//                   name="currency"
//                   value={settings.currency}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 >
//                   <option value="INR">Indian Rupee (INR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label>
//                 <input
//                   type="text"
//                   name="razorpayKey"
//                   value={settings.razorpayKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Secret</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.razorpaySecret ? 'text' : 'password'}
//                     name="razorpaySecret"
//                     value={settings.razorpaySecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('razorpaySecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.razorpaySecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label>
//                 <input
//                   type="text"
//                   name="stripeKey"
//                   value={settings.stripeKey}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
//                 <div className="relative">
//                   <input
//                     type={showSensitiveFields.stripeSecret ? 'text' : 'password'}
//                     name="stripeSecret"
//                     value={settings.stripeSecret}
//                     onChange={handleInputChange}
//                     className="input-field pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => toggleSensitiveField('stripeSecret')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showSensitiveFields.stripeSecret ? 
//                       <EyeOff className="h-4 w-4 text-gray-400" /> : 
//                       <Eye className="h-4 w-4 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Cache Settings */}
//         {activeTab === 'cache' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Cache & CDN Settings</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div className="flex flex-col gap-3">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCache"
//                     checked={settings.enableCache}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable Caching</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="enableCDN"
//                     checked={settings.enableCDN}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                   />
//                   <span className="text-sm text-gray-700">Enable CDN</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
//                 <input
//                   type="number"
//                   name="cacheDuration"
//                   value={settings.cacheDuration}
//                   onChange={handleInputChange}
//                   className="input-field"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">How long to cache content (3600 seconds = 1 hour)</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">CDN URL</label>
//                 <input
//                   type="url"
//                   name="cdnUrl"
//                   value={settings.cdnUrl}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   placeholder="https://cdn.example.com"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Appearance Settings */}
//         {activeTab === 'appearance' && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Appearance Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
//                 <div className="flex gap-3">
//                   {['light', 'dark', 'system'].map((themeOption) => (
//                     <label
//                       key={themeOption}
//                       className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
//                         settings.theme === themeOption
//                           ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="theme"
//                         value={themeOption}
//                         checked={settings.theme === themeOption}
//                         onChange={handleInputChange}
//                         className="hidden"
//                       />
//                       {themeOption === 'light' && <Sun className="h-5 w-5" />}
//                       {themeOption === 'dark' && <Moon className="h-5 w-5" />}
//                       {themeOption === 'system' && <Monitor className="h-5 w-5" />}
//                       <span className="capitalize">{themeOption}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="primaryColor"
//                     value={settings.primaryColor || '#8B4513'}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="primaryColor"
//                     value={settings.primaryColor || '#8B4513'}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="#8B4513"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.primaryColor || '#8B4513' }} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="color"
//                     name="secondaryColor"
//                     value={settings.secondaryColor || '#DAA520'}
//                     onChange={handleInputChange}
//                     className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
//                   />
//                   <input
//                     type="text"
//                     name="secondaryColor"
//                     value={settings.secondaryColor || '#DAA520'}
//                     onChange={handleInputChange}
//                     className="input-field flex-1"
//                     placeholder="#DAA520"
//                   />
//                 </div>
//                 <div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.secondaryColor || '#DAA520' }} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
//                 <select
//                   name="fontFamily"
//                   value={settings.fontFamily || 'Inter'}
//                   onChange={handleInputChange}
//                   className="input-field"
//                   style={{ fontFamily: settings.fontFamily || 'Inter' }}
//                 >
//                   <option value="Inter">Inter</option>
//                   <option value="Roboto">Roboto</option>
//                   <option value="Poppins">Poppins</option>
//                   <option value="Open Sans">Open Sans</option>
//                   <option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu</option>
//                 </select>
//                 <p className="text-sm mt-2 text-gray-500" style={{ fontFamily: settings.fontFamily || 'Inter' }}>
//                   Preview: The quick brown fox jumps over the lazy dog
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
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
  AlertCircle, Loader2, Eye, EyeOff, X, Plus, Trash2,
  Key, Upload, Link as LinkIcon, CreditCard, Zap
} from 'lucide-react';
import settingsAPI from '../../api/settingsAPI';

const SettingsPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showSensitiveFields, setShowSensitiveFields] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');

  // Settings state
  const [settings, setSettings] = useState({
    siteName: 'ZauqApp',
    siteDescription: 'AI Powered Urdu Literary Ecosystem',
    siteLogo: '',
    siteFavicon: '',
    contactEmail: 'admin@zauqapp.com',
    contactPhone: '',
    address: '',
    itemsPerPage: 12,
    enableComments: true,
    enableRatings: true,
    autoApproveContent: false,
    enableUserUploads: true,
    maxImageSize: 5,
    maxVideoSize: 500,
    maxAudioSize: 100,
    allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
    allowedVideoFormats: ['mp4', 'webm', 'mov'],
    allowedAudioFormats: ['mp3', 'wav', 'ogg'],
    enableTwoFactor: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiryDays: 90,
    enableCaptcha: true,
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    senderEmail: '',
    senderName: '',
    apiKeys: [],
    webhookUrl: '',
    currency: 'INR',
    razorpayKey: '',
    razorpaySecret: '',
    stripeKey: '',
    stripeSecret: '',
    enableCache: true,
    cacheDuration: 3600,
    enableCDN: false,
    cdnUrl: '',
    maintenanceMode: false,
    maintenanceMessage: 'Site is under maintenance. Please check back later.',
    theme: 'light',
    primaryColor: '#8B4513',
    secondaryColor: '#DAA520',
    fontFamily: 'Inter'
  });

  // Fetch settings
  const { data: settingsData, isLoading, refetch, error: fetchError } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      console.log('🔵 Fetching settings...');
      try {
        const result = await settingsAPI.getSettings();
        console.log('🟢 Settings fetched successfully:', result);
        return result;
      } catch (err) {
        console.error('🔴 Failed to fetch settings:', err);
        throw err;
      }
    },
    enabled: true
  });

  // 🔴 FIX: Properly load settings into state
  useEffect(() => {
    if (fetchError) {
      console.error('❌ Settings fetch error:', fetchError);
      toast.error('Failed to load settings. Please refresh the page.');
    }
    
    if (settingsData?.data) {
      const loadedData = settingsData.data;
      console.log('✅ Settings loaded:', loadedData);
      console.log('🔍 contactPhone value:', loadedData.contactPhone);
      console.log('🔍 address value:', loadedData.address);
      
      // 🔴 CRITICAL FIX: Directly set the state with loaded data
      setSettings({
        ...settings,
        // General Settings
        siteName: loadedData.siteName || 'ZauqApp',
        siteDescription: loadedData.siteDescription || 'AI Powered Urdu Literary Ecosystem',
        siteLogo: loadedData.siteLogo || '',
        siteFavicon: loadedData.siteFavicon || '',
        contactEmail: loadedData.contactEmail || 'admin@zauqapp.com',
        // 🔴 Make sure these are set correctly
        contactPhone: loadedData.contactPhone || '',
        address: loadedData.address || '',
        // Content Settings
        itemsPerPage: loadedData.itemsPerPage || 12,
        enableComments: loadedData.enableComments !== undefined ? loadedData.enableComments : true,
        enableRatings: loadedData.enableRatings !== undefined ? loadedData.enableRatings : true,
        autoApproveContent: loadedData.autoApproveContent || false,
        enableUserUploads: loadedData.enableUserUploads !== undefined ? loadedData.enableUserUploads : true,
        // Media Settings
        maxImageSize: loadedData.maxImageSize || 5,
        maxVideoSize: loadedData.maxVideoSize || 500,
        maxAudioSize: loadedData.maxAudioSize || 100,
        allowedImageFormats: loadedData.allowedImageFormats || ['jpg', 'jpeg', 'png', 'webp'],
        allowedVideoFormats: loadedData.allowedVideoFormats || ['mp4', 'webm', 'mov'],
        allowedAudioFormats: loadedData.allowedAudioFormats || ['mp3', 'wav', 'ogg'],
        // Security Settings
        enableTwoFactor: loadedData.enableTwoFactor || false,
        sessionTimeout: loadedData.sessionTimeout || 60,
        maxLoginAttempts: loadedData.maxLoginAttempts || 5,
        passwordExpiryDays: loadedData.passwordExpiryDays || 90,
        enableCaptcha: loadedData.enableCaptcha !== undefined ? loadedData.enableCaptcha : true,
        // Email Settings
        smtpHost: loadedData.smtpHost || '',
        smtpPort: loadedData.smtpPort || 587,
        smtpUser: loadedData.smtpUser || '',
        smtpPassword: loadedData.smtpPassword || '',
        senderEmail: loadedData.senderEmail || '',
        senderName: loadedData.senderName || '',
        // API Settings
        apiKeys: loadedData.apiKeys || [],
        webhookUrl: loadedData.webhookUrl || '',
        // Payment Settings
        currency: loadedData.currency || 'INR',
        razorpayKey: loadedData.razorpayKey || '',
        razorpaySecret: loadedData.razorpaySecret || '',
        stripeKey: loadedData.stripeKey || '',
        stripeSecret: loadedData.stripeSecret || '',
        // Cache Settings
        enableCache: loadedData.enableCache !== undefined ? loadedData.enableCache : true,
        cacheDuration: loadedData.cacheDuration || 3600,
        enableCDN: loadedData.enableCDN || false,
        cdnUrl: loadedData.cdnUrl || '',
        // Maintenance Mode
        maintenanceMode: loadedData.maintenanceMode || false,
        maintenanceMessage: loadedData.maintenanceMessage || 'Site is under maintenance. Please check back later.',
        // Appearance
        theme: loadedData.theme || 'light',
        primaryColor: loadedData.primaryColor || '#8B4513',
        secondaryColor: loadedData.secondaryColor || '#DAA520',
        fontFamily: loadedData.fontFamily || 'Inter'
      });
    }
  }, [settingsData, fetchError]);

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (data) => {
      console.log('🔵 Mutation: Sending update request:', JSON.stringify(data, null, 2));
      const result = await settingsAPI.updateSettings(data);
      console.log('🟢 Mutation: API response:', result);
      return result;
    },
    onSuccess: (response) => {
      console.log('✅ Settings saved successfully:', response);
      toast.success('Settings saved successfully!');
      queryClient.invalidateQueries(['settings']);
      setSaving(false);
    },
    onError: (error) => {
      console.error('❌ Failed to save settings:', error);
      toast.error(error.response?.data?.message || 'Failed to save settings');
      setSaving(false);
    }
  });

  const handleSave = async () => {
    console.log('💾 Saving settings:', JSON.stringify(settings, null, 2));
    setSaving(true);
    updateSettingsMutation.mutate(settings);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`📝 Field changed: ${name} = ${type === 'checkbox' ? checked : value}`);
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

  // File upload handlers
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    setUploadingLogo(true);
    try {
      const response = await settingsAPI.uploadLogo(file, 'logo');
      if (response.success) {
        setSettings(prev => ({ ...prev, siteLogo: response.data.url }));
        toast.success('Logo uploaded successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    setUploadingFavicon(true);
    try {
      const response = await settingsAPI.uploadLogo(file, 'favicon');
      if (response.success) {
        setSettings(prev => ({ ...prev, siteFavicon: response.data.url }));
        toast.success('Favicon uploaded successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload favicon');
    } finally {
      setUploadingFavicon(false);
    }
  };

  // API Key management
  const handleGenerateApiKey = async () => {
    if (!newApiKeyName.trim()) {
      toast.error('Please enter an API key name');
      return;
    }
    
    try {
      const response = await settingsAPI.generateApiKey(newApiKeyName);
      if (response.success) {
        toast.success('API key generated successfully');
        setNewApiKeyName('');
        const newSettings = await settingsAPI.getSettings();
        setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate API key');
    }
  };

  const handleDeleteApiKey = async (keyId) => {
    if (!window.confirm('Are you sure you want to delete this API key?')) return;
    
    try {
      await settingsAPI.deleteApiKey(keyId);
      toast.success('API key deleted successfully');
      const newSettings = await settingsAPI.getSettings();
      setSettings(prev => ({ ...prev, apiKeys: newSettings.data?.apiKeys || [] }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete API key');
    }
  };

  const toggleSensitiveField = (field) => {
    setShowSensitiveFields(prev => ({ ...prev, [field]: !prev[field] }));
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
          <button onClick={() => refetch()} className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            <span>Reset</span>
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary inline-flex items-center space-x-2">
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
                <input type="text" name="siteName" value={settings.siteName} onChange={handleInputChange} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea name="siteDescription" value={settings.siteDescription} onChange={handleInputChange} className="input-field h-24" />
              </div>
              
              {/* Site Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
                <div className="flex gap-2 items-start">
                  <input type="url" name="siteLogo" value={settings.siteLogo} onChange={handleInputChange} className="input-field flex-1" placeholder="https://..." />
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploadingLogo} />
                    <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingLogo}>
                      {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      Upload
                    </button>
                  </div>
                </div>
                {settings.siteLogo && <div className="mt-2"><img src={settings.siteLogo} alt="Logo preview" className="h-12 w-auto rounded border" /></div>}
              </div>
              
              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                <div className="flex gap-2 items-start">
                  <input type="url" name="siteFavicon" value={settings.siteFavicon} onChange={handleInputChange} className="input-field flex-1" placeholder="https://..." />
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleFaviconUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploadingFavicon} />
                    <button type="button" className="btn-outline flex items-center gap-2" disabled={uploadingFavicon}>
                      {uploadingFavicon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      Upload
                    </button>
                  </div>
                </div>
                {settings.siteFavicon && <div className="mt-2"><img src={settings.siteFavicon} alt="Favicon preview" className="h-8 w-8 rounded" /></div>}
              </div>
              
              {/* 🔴 Contact Phone - Should now show the saved value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input type="tel" name="contactPhone" value={settings.contactPhone || ''} onChange={handleInputChange} className="input-field" placeholder="+91 XXXXXXXXXX" />
              </div>
              
              {/* 🔴 Address - Should now show the saved value */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea name="address" value={settings.address || ''} onChange={handleInputChange} className="input-field h-20" placeholder="Enter full address" rows={3} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Settings - Keep as is */}
        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Content Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
                <select name="itemsPerPage" value={settings.itemsPerPage} onChange={handleInputChange} className="input-field">
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="enableComments" checked={settings.enableComments} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-sm text-gray-700">Enable Comments</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="enableRatings" checked={settings.enableRatings} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-sm text-gray-700">Enable Ratings & Reviews</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="autoApproveContent" checked={settings.autoApproveContent} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-sm text-gray-700">Auto-approve User Content</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="enableUserUploads" checked={settings.enableUserUploads} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-sm text-gray-700">Enable User Uploads</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Settings - Keep as is */}
        {activeTab === 'media' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Media Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Max Image Size (MB)</label><input type="number" name="maxImageSize" value={settings.maxImageSize} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Max Video Size (MB)</label><input type="number" name="maxVideoSize" value={settings.maxVideoSize} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Max Audio Size (MB)</label><input type="number" name="maxAudioSize" value={settings.maxAudioSize} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Allowed Image Formats</label><input type="text" value={settings.allowedImageFormats.join(', ')} onChange={(e) => handleArrayChange('allowedImageFormats', e.target.value)} className="input-field" placeholder="jpg, jpeg, png, webp" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Allowed Video Formats</label><input type="text" value={settings.allowedVideoFormats.join(', ')} onChange={(e) => handleArrayChange('allowedVideoFormats', e.target.value)} className="input-field" placeholder="mp4, webm, mov" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Allowed Audio Formats</label><input type="text" value={settings.allowedAudioFormats.join(', ')} onChange={(e) => handleArrayChange('allowedAudioFormats', e.target.value)} className="input-field" placeholder="mp3, wav, ogg" /></div>
            </div>
          </motion.div>
        )}

        {/* Security Settings - Keep as is */}
        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label><input type="number" name="sessionTimeout" value={settings.sessionTimeout} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label><input type="number" name="maxLoginAttempts" value={settings.maxLoginAttempts} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label><input type="number" name="passwordExpiryDays" value={settings.passwordExpiryDays} onChange={handleInputChange} className="input-field" /></div>
              <div className="flex flex-col gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="enableTwoFactor" checked={settings.enableTwoFactor} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" /><span className="text-sm text-gray-700">Enable Two-Factor Authentication</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="enableCaptcha" checked={settings.enableCaptcha} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" /><span className="text-sm text-gray-700">Enable Captcha on Login/Register</span></label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Settings - Keep as is */}
        {activeTab === 'email' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label><input type="text" name="smtpHost" value={settings.smtpHost} onChange={handleInputChange} className="input-field" placeholder="smtp.gmail.com" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label><input type="number" name="smtpPort" value={settings.smtpPort} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label><input type="text" name="smtpUser" value={settings.smtpUser} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label><div className="relative"><input type={showSensitiveFields.smtpPassword ? 'text' : 'password'} name="smtpPassword" value={settings.smtpPassword} onChange={handleInputChange} className="input-field pr-10" placeholder="••••••••" /><button type="button" onClick={() => toggleSensitiveField('smtpPassword')} className="absolute right-3 top-1/2 -translate-y-1/2">{showSensitiveFields.smtpPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}</button></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label><input type="email" name="senderEmail" value={settings.senderEmail} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label><input type="text" name="senderName" value={settings.senderName} onChange={handleInputChange} className="input-field" /></div>
            </div>
          </motion.div>
        )}

        {/* API Settings - Keep as is */}
        {activeTab === 'api' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label><input type="url" name="webhookUrl" value={settings.webhookUrl} onChange={handleInputChange} className="input-field" placeholder="https://your-domain.com/webhook" /><p className="text-xs text-gray-500 mt-1">URL where webhook events will be sent</p></div>
              <div><div className="flex items-center justify-between mb-2"><label className="block text-sm font-medium text-gray-700">API Keys</label><div className="flex gap-2"><input type="text" placeholder="Key name" value={newApiKeyName} onChange={(e) => setNewApiKeyName(e.target.value)} className="input-field text-sm py-1.5 w-40" /><button type="button" onClick={handleGenerateApiKey} className="btn-secondary text-sm flex items-center gap-1"><Plus className="h-4 w-4" />Generate Key</button></div></div>
              <div className="space-y-2">{settings.apiKeys && settings.apiKeys.length > 0 ? settings.apiKeys.map((key) => (<div key={key._id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"><Key className="h-5 w-5 text-gray-400" /><div className="flex-1"><p className="text-sm font-medium text-gray-900">{key.name}</p><p className="text-xs text-gray-500 font-mono">{key.key}</p><p className="text-xs text-gray-400">Created: {new Date(key.createdAt).toLocaleDateString()}</p></div><button type="button" onClick={() => handleDeleteApiKey(key._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button></div>)) : (<div className="text-center py-6 bg-gray-50 rounded-lg"><Key className="h-8 w-8 text-gray-400 mx-auto mb-2" /><p className="text-sm text-gray-500">No API keys generated yet</p></div>)}</div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg"><h4 className="text-sm font-medium text-blue-800 mb-1">API Usage Instructions</h4><p className="text-xs text-blue-600">Use your API key in the Authorization header: <code className="bg-blue-100 px-1 rounded">Bearer YOUR_API_KEY</code></p><p className="text-xs text-blue-600 mt-1">Webhook events will be sent for: payment.success, subscription.renewal, user.registered</p></div></div>
            </div>
          </motion.div>
        )}

        {/* Payment Settings - Keep as is */}
        {activeTab === 'payment' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Currency</label><select name="currency" value={settings.currency} onChange={handleInputChange} className="input-field"><option value="INR">Indian Rupee (INR)</option><option value="USD">US Dollar (USD)</option><option value="EUR">Euro (EUR)</option><option value="GBP">British Pound (GBP)</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label><input type="text" name="razorpayKey" value={settings.razorpayKey} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Secret</label><div className="relative"><input type={showSensitiveFields.razorpaySecret ? 'text' : 'password'} name="razorpaySecret" value={settings.razorpaySecret} onChange={handleInputChange} className="input-field pr-10" placeholder="••••••••" /><button type="button" onClick={() => toggleSensitiveField('razorpaySecret')} className="absolute right-3 top-1/2 -translate-y-1/2">{showSensitiveFields.razorpaySecret ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}</button></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Stripe Publishable Key</label><input type="text" name="stripeKey" value={settings.stripeKey} onChange={handleInputChange} className="input-field" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label><div className="relative"><input type={showSensitiveFields.stripeSecret ? 'text' : 'password'} name="stripeSecret" value={settings.stripeSecret} onChange={handleInputChange} className="input-field pr-10" placeholder="••••••••" /><button type="button" onClick={() => toggleSensitiveField('stripeSecret')} className="absolute right-3 top-1/2 -translate-y-1/2">{showSensitiveFields.stripeSecret ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}</button></div></div>
            </div>
          </motion.div>
        )}

        {/* Cache Settings - Keep as is */}
        {activeTab === 'cache' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-3"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="enableCache" checked={settings.enableCache} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" /><span className="text-sm text-gray-700">Enable Caching</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="enableCDN" checked={settings.enableCDN} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-primary-600" /><span className="text-sm text-gray-700">Enable CDN</span></label></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label><input type="number" name="cacheDuration" value={settings.cacheDuration} onChange={handleInputChange} className="input-field" /><p className="text-xs text-gray-500 mt-1">How long to cache content (3600 seconds = 1 hour)</p></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">CDN URL</label><input type="url" name="cdnUrl" value={settings.cdnUrl} onChange={handleInputChange} className="input-field" placeholder="https://cdn.example.com" /></div>
            </div>
          </motion.div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Theme</label><div className="flex gap-3">{['light', 'dark', 'system'].map((themeOption) => (<label key={themeOption} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${settings.theme === themeOption ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-300'}`}><input type="radio" name="theme" value={themeOption} checked={settings.theme === themeOption} onChange={handleInputChange} className="hidden" />{themeOption === 'light' && <Sun className="h-5 w-5" />}{themeOption === 'dark' && <Moon className="h-5 w-5" />}{themeOption === 'system' && <Monitor className="h-5 w-5" />}<span className="capitalize">{themeOption}</span></label>))}</div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label><div className="flex gap-2"><input type="color" name="primaryColor" value={settings.primaryColor || '#8B4513'} onChange={handleInputChange} className="w-12 h-10 rounded border border-gray-300 cursor-pointer" /><input type="text" name="primaryColor" value={settings.primaryColor || '#8B4513'} onChange={handleInputChange} className="input-field flex-1" placeholder="#8B4513" /></div><div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.primaryColor || '#8B4513' }} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label><div className="flex gap-2"><input type="color" name="secondaryColor" value={settings.secondaryColor || '#DAA520'} onChange={handleInputChange} className="w-12 h-10 rounded border border-gray-300 cursor-pointer" /><input type="text" name="secondaryColor" value={settings.secondaryColor || '#DAA520'} onChange={handleInputChange} className="input-field flex-1" placeholder="#DAA520" /></div><div className="mt-2 h-8 rounded border" style={{ backgroundColor: settings.secondaryColor || '#DAA520' }} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label><select name="fontFamily" value={settings.fontFamily || 'Inter'} onChange={handleInputChange} className="input-field" style={{ fontFamily: settings.fontFamily || 'Inter' }}><option value="Inter">Inter</option><option value="Roboto">Roboto</option><option value="Poppins">Poppins</option><option value="Open Sans">Open Sans</option><option value="Noto Nastaliq Urdu">Noto Nastaliq Urdu</option></select><p className="text-sm mt-2 text-gray-500" style={{ fontFamily: settings.fontFamily || 'Inter' }}>Preview: The quick brown fox jumps over the lazy dog</p></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;