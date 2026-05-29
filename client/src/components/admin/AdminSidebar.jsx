// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import {
//   LayoutDashboard, Users, PenTool, BookOpen, Video,
//   Layout, FileText, BarChart3, Settings, ChevronLeft
// } from 'lucide-react'

// const AdminSidebar = () => {
//   const location = useLocation()

//   const menuItems = [
//     { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: PenTool, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
//     { path: '/admin/videos', icon: Video, label: 'Video CMS' },
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   return (
//     <aside className="hidden lg:flex flex-col w-72 bg-dark-900 text-gray-300 fixed h-full z-40">
//       <div className="p-6 border-b border-dark-700">
//         <Link to="/admin" className="flex items-center space-x-2">
//           <LayoutDashboard className="h-8 w-8 text-primary-400" />
//           <span className="text-xl font-bold text-white">Admin Panel</span>
//         </Link>
//       </div>

//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${isActive ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>

//       <div className="p-4 border-t border-dark-700">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
//         >
//           <ChevronLeft className="h-5 w-5" />
//           <span>Back to Site</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default AdminSidebar






// // client/src/components/layout/AdminSidebar.jsx
// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import {
//   LayoutDashboard, Users, PenTool, BookOpen, Video,
//   Layout, FileText, BarChart3, Settings, ChevronLeft,
//   Headphones, Mic, Music, Radio, TrendingUp, Upload,
//   ListMusic, Calendar, FolderTree, Star, Heart
// } from 'lucide-react'

// const AdminSidebar = () => {
//   const location = useLocation()
//   const [isAudioOpen, setIsAudioOpen] = useState(false)

//   const menuItems = [
//     { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: PenTool, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
//   ]

//   const audioMenuItems = [
//     { path: '/admin/audio', icon: Headphones, label: 'Audio Dashboard' },
//     { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
//     { path: '/admin/audio/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
//     { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
//     { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
//     { path: '/admin/audio/reports', icon: FileText, label: 'Reports' },
//   ]

//   const videoMenuItems = [
//     { path: '/admin/videos', icon: Video, label: 'Video CMS' },
//     { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
//   ]

//   const siteMenuItems = [
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS' },
//     { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/reports', icon: FileText, label: 'Reports' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/')
//   }

//   return (
//     <aside className="hidden lg:flex flex-col w-72 bg-dark-900 text-gray-300 fixed h-full z-40">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-dark-700">
//         <Link to="/admin" className="flex items-center space-x-2">
//           <LayoutDashboard className="h-8 w-8 text-primary-400" />
//           <span className="text-xl font-bold text-white">Admin Panel</span>
//         </Link>
//         <p className="text-xs text-gray-500 mt-2">Manage ZauqApp Platform</p>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {/* Main Menu Items */}
//           {menuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Audio Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio Management</p>
//             </div>
//           </li>

//           {audioMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                   {item.label === 'Audio Dashboard' && (
//                     <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
//                       New
//                     </span>
//                   )}
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Audio Quick Categories */}
//           <li className="px-3 pt-2">
//             <p className="text-xs text-gray-500 mb-2">Quick Categories</p>
//             <div className="grid grid-cols-2 gap-1">
//               <Link to="/admin/audio?type=nauha" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🎵 Nauha
//               </Link>
//               <Link to="/admin/audio?type=marsiya" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 💔 Marsiya
//               </Link>
//               <Link to="/admin/audio?type=majlis" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕌 Majlis
//               </Link>
//               <Link to="/admin/audio?type=soz" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🔥 Soz
//               </Link>
//               <Link to="/admin/audio?type=salam" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕊️ Salam
//               </Link>
//               <Link to="/admin/audio?type=naat" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 ⭐ Naat
//               </Link>
//               <Link to="/admin/audio?type=hamd" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕌 Hamd
//               </Link>
//               <Link to="/admin/audio?type=manqabat" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 ✨ Manqabat
//               </Link>
//             </div>
//           </li>

//           {/* Video Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Video Management</p>
//             </div>
//           </li>

//           {videoMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Site Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Site Management</p>
//             </div>
//           </li>

//           {siteMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>

//       {/* Audio Stats Summary */}
//       <div className="p-4 border-t border-dark-700 bg-dark-800/50">
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Audio Stats</p>
//           <div className="grid grid-cols-2 gap-2">
//             <div className="text-center p-2 rounded bg-dark-700">
//               <Headphones className="h-4 w-4 text-primary-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">1,234</p>
//               <p className="text-xs text-gray-500">Total Audio</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <TrendingUp className="h-4 w-4 text-green-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">89.2K</p>
//               <p className="text-xs text-gray-500">Total Plays</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <Mic className="h-4 w-4 text-purple-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">234</p>
//               <p className="text-xs text-gray-500">Nauha</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <Music className="h-4 w-4 text-orange-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">189</p>
//               <p className="text-xs text-gray-500">Marsiya</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-dark-700">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
//         >
//           <ChevronLeft className="h-5 w-5" />
//           <span>Back to Site</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default AdminSidebar











// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import {
//   LayoutDashboard, Users, PenTool, BookOpen, Video,
//   Layout, FileText, BarChart3, Settings, ChevronLeft,
//   Headphones, Mic, Music, Radio, TrendingUp, Upload,
//   ListMusic, Calendar, FolderTree, Star, Heart,
//   CreditCard, DollarSign, Gift, Zap
// } from 'lucide-react'

// const AdminSidebar = () => {
//   const location = useLocation()
//   const [isAudioOpen, setIsAudioOpen] = useState(false)
//   const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)

//   const menuItems = [
//     { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: PenTool, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
//   ]

//   // Subscription Management Items
//   const subscriptionMenuItems = [
//     { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscription Plans', badge: 'New' },
//     { path: '/admin/subscriptions/plans', icon: Gift, label: 'Manage Plans' },
//     { path: '/admin/subscriptions/users', icon: Users, label: 'Subscribers' },
//     { path: '/admin/subscriptions/transactions', icon: DollarSign, label: 'Transactions' },
//     { path: '/admin/subscriptions/analytics', icon: TrendingUp, label: 'Revenue Analytics' },
//     { path: '/admin/subscriptions/features', icon: Zap, label: 'Feature Toggles' },
//   ]

//   const audioMenuItems = [
//     { path: '/admin/audio', icon: Headphones, label: 'Audio Dashboard' },
//     { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
//     { path: '/admin/audio/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
//     { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
//     { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
//     { path: '/admin/audio/reports', icon: FileText, label: 'Reports' },
//   ]

//   const videoMenuItems = [
//     { path: '/admin/videos', icon: Video, label: 'Video CMS' },
//     { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
//   ]

//   const siteMenuItems = [
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS' },
//     { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/reports', icon: FileText, label: 'Reports' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/')
//   }

//   return (
//     <aside className="hidden lg:flex flex-col w-72 bg-dark-900 text-gray-300 fixed h-full z-40">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-dark-700">
//         <Link to="/admin" className="flex items-center space-x-2">
//           <LayoutDashboard className="h-8 w-8 text-primary-400" />
//           <span className="text-xl font-bold text-white">Admin Panel</span>
//         </Link>
//         <p className="text-xs text-gray-500 mt-2">Manage ZauqApp Platform</p>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {/* Main Menu Items */}
//           {menuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Subscription Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscription Management</p>
//             </div>
//           </li>

//           {subscriptionMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                   {item.badge && (
//                     <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
//                       {item.badge}
//                     </span>
//                   )}
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Quick Subscription Stats */}
//           <li className="px-3 pt-2">
//             <div className="bg-gradient-to-r from-primary-900/20 to-purple-900/20 rounded-lg p-3 border border-primary-800/30">
//               <p className="text-xs text-gray-400 mb-2">Subscription Summary</p>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-gray-400">Active Plans</span>
//                   <span className="text-sm font-bold text-white">4</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-gray-400">Total Subscribers</span>
//                   <span className="text-sm font-bold text-white">1,234</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-gray-400">Monthly Revenue</span>
//                   <span className="text-sm font-bold text-green-400">₹49,999</span>
//                 </div>
//                 <div className="mt-2 pt-2 border-t border-dark-700">
//                   <Link 
//                     to="/admin/subscriptions/analytics"
//                     className="text-xs text-primary-400 hover:text-primary-300 flex items-center justify-between"
//                   >
//                     <span>View Analytics</span>
//                     <TrendingUp className="h-3 w-3" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>

//           {/* Audio Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio Management</p>
//             </div>
//           </li>

//           {audioMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                   {item.label === 'Audio Dashboard' && (
//                     <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
//                       New
//                     </span>
//                   )}
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Audio Quick Categories */}
//           <li className="px-3 pt-2">
//             <p className="text-xs text-gray-500 mb-2">Quick Categories</p>
//             <div className="grid grid-cols-2 gap-1">
//               <Link to="/admin/audio?type=nauha" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🎵 Nauha
//               </Link>
//               <Link to="/admin/audio?type=marsiya" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 💔 Marsiya
//               </Link>
//               <Link to="/admin/audio?type=majlis" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕌 Majlis
//               </Link>
//               <Link to="/admin/audio?type=soz" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🔥 Soz
//               </Link>
//               <Link to="/admin/audio?type=salam" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕊️ Salam
//               </Link>
//               <Link to="/admin/audio?type=naat" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 ⭐ Naat
//               </Link>
//               <Link to="/admin/audio?type=hamd" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 🕌 Hamd
//               </Link>
//               <Link to="/admin/audio?type=manqabat" className="text-xs text-gray-400 hover:text-primary-400 px-2 py-1 rounded hover:bg-dark-800">
//                 ✨ Manqabat
//               </Link>
//             </div>
//           </li>

//           {/* Video Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Video Management</p>
//             </div>
//           </li>

//           {videoMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}

//           {/* Site Management Section */}
//           <li className="pt-4 mt-2 border-t border-dark-700">
//             <div className="px-3 py-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Site Management</p>
//             </div>
//           </li>

//           {siteMenuItems.map((item) => {
//             const active = isActive(item.path)
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     active
//                       ? 'bg-primary-900/50 text-primary-400'
//                       : 'text-gray-400 hover:bg-dark-800 hover:text-white'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>

//       {/* Subscription Stats Summary */}
//       <div className="p-4 border-t border-dark-700 bg-dark-800/50">
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue Summary</p>
//           <div className="grid grid-cols-2 gap-2">
//             <div className="text-center p-2 rounded bg-dark-700">
//               <CreditCard className="h-4 w-4 text-primary-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">1,234</p>
//               <p className="text-xs text-gray-500">Subscribers</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <DollarSign className="h-4 w-4 text-green-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">₹49.9K</p>
//               <p className="text-xs text-gray-500">Monthly Rev</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <Gift className="h-4 w-4 text-purple-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">4</p>
//               <p className="text-xs text-gray-500">Active Plans</p>
//             </div>
//             <div className="text-center p-2 rounded bg-dark-700">
//               <Zap className="h-4 w-4 text-orange-400 mx-auto mb-1" />
//               <p className="text-xs font-bold text-white">67%</p>
//               <p className="text-xs text-gray-500">Conversion</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-dark-700">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
//         >
//           <ChevronLeft className="h-5 w-5" />
//           <span>Back to Site</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default AdminSidebar















// client/src/components/layout/AdminSidebar.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, PenTool, BookOpen, Video,
  Layout, FileText, BarChart3, Settings, ChevronLeft,
  Headphones, Mic, Music, Radio, TrendingUp, Upload,
  ListMusic, Calendar, FolderTree, Star, Heart,
  CreditCard, DollarSign, Gift, Zap
} from 'lucide-react'

const AdminSidebar = () => {
  const location = useLocation()
  const [isAudioOpen, setIsAudioOpen] = useState(false)

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
    { path: '/admin/authors', icon: PenTool, label: 'Author CMS' },
    { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
  ]

  // Subscription Management Items
  const subscriptionMenuItems = [
    { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscription Plans', badge: 'New' },
    { path: '/admin/subscriptions/plans', icon: Gift, label: 'Manage Plans' },
    { path: '/admin/subscriptions/users', icon: Users, label: 'Subscribers' },
    { path: '/admin/subscriptions/transactions', icon: DollarSign, label: 'Transactions' },
    { path: '/admin/subscriptions/analytics', icon: TrendingUp, label: 'Revenue Analytics' },
    { path: '/admin/subscriptions/features', icon: Zap, label: 'Feature Toggles' },
  ]

  const audioMenuItems = [
    { path: '/admin/audio', icon: Headphones, label: 'Audio Dashboard' },
    { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
    { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
    { path: '/admin/audio/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
    { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
    { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
    { path: '/admin/audio/reports', icon: FileText, label: 'Reports' },
  ]

  const videoMenuItems = [
    { path: '/admin/videos', icon: Video, label: 'Video CMS' },
    { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
  ]

  const siteMenuItems = [
    { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS' },
    { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/seo', icon: FileText, label: 'SEO' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-dark-900 text-gray-300 fixed h-full z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-dark-700">
        <Link to="/admin" className="flex items-center space-x-2">
          <LayoutDashboard className="h-8 w-8 text-primary-400" />
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </Link>
        <p className="text-xs text-gray-500 mt-2">Manage ZauqApp Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {/* Main Menu Items */}
          {menuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-900/50 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* Subscription Management Section */}
          <li className="pt-4 mt-2 border-t border-dark-700">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscription Management</p>
            </div>
          </li>

          {subscriptionMenuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-900/50 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}

          {/* Quick Subscription Stats */}
          <li className="px-3 pt-2">
            <div className="bg-gradient-to-r from-primary-900/20 to-purple-900/20 rounded-lg p-3 border border-primary-800/30">
              <p className="text-xs text-gray-400 mb-2">Subscription Summary</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Active Plans</span>
                  <span className="text-sm font-bold text-white">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Total Subscribers</span>
                  <span className="text-sm font-bold text-white">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Monthly Revenue</span>
                  <span className="text-sm font-bold text-green-400">₹49,999</span>
                </div>
                <div className="mt-2 pt-2 border-t border-dark-700">
                  <Link 
                    to="/admin/subscriptions/analytics"
                    className="text-xs text-primary-400 hover:text-primary-300 flex items-center justify-between"
                  >
                    <span>View Analytics</span>
                    <TrendingUp className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* Audio Management Section */}
          <li className="pt-4 mt-2 border-t border-dark-700">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio Management</p>
            </div>
          </li>

          {audioMenuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-900/50 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                  {item.label === 'Audio Dashboard' && (
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                </Link>
              </li>
            )
          })}

          {/* Video Management Section */}
          <li className="pt-4 mt-2 border-t border-dark-700">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Video Management</p>
            </div>
          </li>

          {videoMenuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-900/50 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* Site Management Section */}
          <li className="pt-4 mt-2 border-t border-dark-700">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Site Management</p>
            </div>
          </li>

          {siteMenuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-900/50 text-primary-400'
                      : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-400' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Subscription Stats Summary */}
      <div className="p-4 border-t border-dark-700 bg-dark-800/50">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue Summary</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded bg-dark-700">
              <CreditCard className="h-4 w-4 text-primary-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">1,234</p>
              <p className="text-xs text-gray-500">Subscribers</p>
            </div>
            <div className="text-center p-2 rounded bg-dark-700">
              <DollarSign className="h-4 w-4 text-green-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">₹49.9K</p>
              <p className="text-xs text-gray-500">Monthly Rev</p>
            </div>
            <div className="text-center p-2 rounded bg-dark-700">
              <Gift className="h-4 w-4 text-purple-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">4</p>
              <p className="text-xs text-gray-500">Active Plans</p>
            </div>
            <div className="text-center p-2 rounded bg-dark-700">
              <Zap className="h-4 w-4 text-orange-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">67%</p>
              <p className="text-xs text-gray-500">Conversion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar